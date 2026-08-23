import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { UNESCO_SITES } from '../data/unescoSites';

export default function HeritageGisMap({
  activeSiteIndex,
  onSelectSite,
  filterSites,
  selectedStatus = 'ALL',
  searchQuery = '',
  hideQuickJump = false
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const tileLayerRef = useRef(null);
  const markersRef = useRef([]);
  const hazardLayersRef = useRef({});

  const [baseMapType, setBaseMapType] = useState('dark'); // 'dark' | 'satellite'
  const [showSeismicLayer, setShowSeismicLayer] = useState(true);
  const [showRainfallLayer, setShowRainfallLayer] = useState(false);

  // Use filtered sites from parent if provided
  const heritageSites = (filterSites && Array.isArray(filterSites)) ? filterSites : UNESCO_SITES;

  // Major Flagship Heritage Sites for Quick Jump
  const MAJOR_QUICK_IDS = ['ASI-UP-001', 'ASI-DL-001', 'ASI-OD-001', 'ASI-KA-001', 'ASI-TS-018', 'ASI-MH-001'];
  const majorQuickSites = UNESCO_SITES.filter(s => MAJOR_QUICK_IDS.includes(s.id));

  // Initialize Leaflet Map
  useEffect(() => {
    const container = mapContainerRef.current;
    if (!container || mapInstanceRef.current) return;

    const map = L.map(container, {
      center: [21.5, 78.9],
      zoom: 4.8,
      minZoom: 4,
      maxZoom: 15,
      zoomControl: false,
      scrollWheelZoom: false
    });
    mapInstanceRef.current = map;

    const handleMapClick = () => map.scrollWheelZoom.enable();
    const handleMapMouseLeave = () => map.scrollWheelZoom.disable();
    container.addEventListener('click', handleMapClick);
    container.addEventListener('mouseleave', handleMapMouseLeave);

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Default Tile Layer: CartoDB Dark Matter No Labels
    const darkTile = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/dark_nolabels/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; OpenStreetMap',
      subdomains: 'abcd',
      maxZoom: 19
    });
    darkTile.addTo(map);
    tileLayerRef.current = darkTile;

    // Seismic Northern Active Fault Belt (BIS IS 1893:2016)
    const seismicNorthernBelt = L.polygon([
      [31.5, 74.0], [32.0, 78.5], [29.5, 81.0], [27.5, 88.0], [26.0, 93.0],
      [24.5, 92.5], [26.0, 84.0], [27.5, 77.0], [28.5, 75.0]
    ], {
      color: '#8052ff',
      weight: 1.5,
      fillColor: '#8052ff',
      fillOpacity: 0.12,
      dashArray: '4, 6'
    });
    seismicNorthernBelt.bindTooltip('🌋 BIS IS 1893: Himalayan Seismic Fault Zone IV', { sticky: true, className: 'font-mono text-xs' });

    // Kutch Zone V Seismic Ring (Dholavira Active Rift Basin)
    const kutchSeismicZoneV = L.circle([23.5, 70.5], {
      radius: 140000,
      color: '#ffb829',
      weight: 1.5,
      fillColor: '#ffb829',
      fillOpacity: 0.15
    });
    kutchSeismicZoneV.bindTooltip('🌋 BIS IS 1893: Kutch Active Rift (Zone V - Very High Seismic Risk)', { sticky: true, className: 'font-mono text-xs' });

    const seismicGroup = L.layerGroup([seismicNorthernBelt, kutchSeismicZoneV]);
    hazardLayersRef.current.seismic = seismicGroup;
    if (showSeismicLayer) seismicGroup.addTo(map);

    // High Monsoon Coastal / Delta Belt
    const monsoonWesternGhats = L.polygon([
      [19.0, 72.5], [15.0, 73.5], [10.0, 76.0], [8.5, 77.5],
      [11.0, 77.0], [15.5, 75.0], [19.5, 74.0]
    ], {
      color: '#38bdf8',
      weight: 1,
      fillColor: '#38bdf8',
      fillOpacity: 0.12,
      dashArray: '3, 5'
    });
    monsoonWesternGhats.bindTooltip('🌧️ IMD Western Ghats High Precipitation Belt (>2500mm/yr)', { sticky: true, className: 'font-mono text-xs' });

    const bayOfBengalCycloneBelt = L.polygon([
      [21.5, 87.0], [19.5, 86.0], [16.0, 81.5], [13.0, 80.5],
      [13.5, 82.5], [18.0, 85.5], [21.0, 89.0]
    ], {
      color: '#38bdf8',
      weight: 1,
      fillColor: '#38bdf8',
      fillOpacity: 0.12,
      dashArray: '3, 5'
    });
    bayOfBengalCycloneBelt.bindTooltip('🌊 IMD Bay of Bengal Coastal Cyclone & Storm Surge Corridor', { sticky: true, className: 'font-mono text-xs' });

    const rainfallGroup = L.layerGroup([monsoonWesternGhats, bayOfBengalCycloneBelt]);
    hazardLayersRef.current.rainfall = rainfallGroup;
    if (showRainfallLayer) rainfallGroup.addTo(map);

    return () => {
      container.removeEventListener('click', handleMapClick);
      container.removeEventListener('mouseleave', handleMapMouseLeave);
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Handle Base Map Switching (Dark vs Satellite)
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }

    if (baseMapType === 'satellite') {
      const satelliteTile = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'ISRO Bhuvan / Earth Imagery',
        maxZoom: 19
      });
      satelliteTile.addTo(map);
      tileLayerRef.current = satelliteTile;
    } else {
      const darkTile = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/dark_nolabels/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; CARTO &copy; OpenStreetMap',
        subdomains: 'abcd',
        maxZoom: 19
      });
      darkTile.addTo(map);
      tileLayerRef.current = darkTile;
    }
  }, [baseMapType]);

  // Update Markers when filter changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    const createCustomIcon = (site) => {
      const isSelected = activeSiteIndex === site.index;
      const isCritical = site.status === 'Critical';
      const nodeColor = isCritical ? '#ffb829' : isSelected ? '#8052ff' : '#15846e';

      return L.divIcon({
        className: 'custom-gis-marker',
        html: `
          <div style="
            position: relative;
            width: ${isSelected || isCritical ? '24px' : '18px'};
            height: ${isSelected || isCritical ? '24px' : '18px'};
            background: ${nodeColor};
            border-radius: 50%;
            box-shadow: 0 0 ${isCritical ? '20px #ffb829' : isSelected ? '18px #8052ff' : '8px #15846e'};
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.2s ease;
          ">
            <div style="width: 6px; height: 6px; border-radius: 50%; background: #ffffff;"></div>
          </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
        popupAnchor: [0, -12]
      });
    };

    heritageSites.forEach((site) => {
      const isSelected = activeSiteIndex === site.index;
      const marker = L.marker(site.coords, {
        icon: createCustomIcon(site),
        zIndexOffset: isSelected ? 1000 : site.status === 'Critical' ? 500 : 0
      });
      marker._siteIndex = site.index;

      const popupContent = `
        <div style="font-family: 'Inter', system-ui, sans-serif; background: #000000; color: #ffffff; padding: 14px; border-radius: 12px; min-width: 250px; max-width: 280px; border: 1px solid #262626;">
          
          <div style="position: relative; width: 100%; height: 110px; border-radius: 8px; overflow: hidden; margin-bottom: 10px; background: #111111;">
            <img src="${site.imageUrl}" alt="${site.name}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.style.display='none'"/>
            <span style="position: absolute; top: 6px; right: 6px; background: rgba(0,0,0,0.85); color: #8052ff; font-family: monospace; font-size: 10px; font-weight: 600; padding: 2px 8px; border-radius: 9999px;">
              ${site.state}
            </span>
          </div>

          <h4 style="font-size: 15px; font-weight: 400; letter-spacing: -0.02em; margin: 0 0 6px 0; color: #ffffff;">${site.name}</h4>
          
          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 11px; font-family: monospace; margin-bottom: 8px;">
            <span style="color: #9a9a9a;">Vulnerability:</span>
            <strong style="color: ${site.status === 'Critical' ? '#ffb829' : '#8052ff'};">
              ${site.riskScore}/100 · ${site.status}
            </strong>
          </div>

          <div style="font-size: 11px; font-family: monospace; color: #bdbdbd; margin-bottom: 12px; border-top: 1px solid #1a1a1a; padding-top: 6px; line-height: 1.6;">
            <div>Typology: ${site.material}</div>
            <div>Hazard: ${site.seismicZone}</div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
            <button id="btn-twin-${site.index}" style="
              background: #8052ff;
              color: #ffffff;
              border: none;
              border-radius: 9999px;
              padding: 8px 6px;
              font-size: 11px;
              font-family: monospace;
              font-weight: 600;
              text-transform: uppercase;
              cursor: pointer;
            ">3D Twin</button>
            <button id="btn-vision-${site.index}" style="
              background: transparent;
              color: #ffffff;
              border: 1px solid #333333;
              border-radius: 9999px;
              padding: 8px 6px;
              font-size: 11px;
              font-family: monospace;
              font-weight: 600;
              text-transform: uppercase;
              cursor: pointer;
            ">AI Vision</button>
          </div>

        </div>
      `;

      marker.bindPopup(popupContent, {
        closeButton: false,
        className: 'custom-gis-popup'
      });

      marker.on('popupopen', () => {
        const twinBtn = document.getElementById(`btn-twin-${site.index}`);
        const visionBtn = document.getElementById(`btn-vision-${site.index}`);

        if (twinBtn) {
          twinBtn.onclick = () => {
            if (typeof onSelectSite === 'function') {
              onSelectSite(site.index, 'twin');
            }
          };
        }

        if (visionBtn) {
          visionBtn.onclick = () => {
            if (typeof onSelectSite === 'function') {
              onSelectSite(site.index, 'vision');
            }
          };
        }
      });

      marker.on('click', () => {
        if (typeof onSelectSite === 'function') {
          onSelectSite(site.index);
        }
      });

      marker.addTo(map);
      markersRef.current.push(marker);
    });
  }, [heritageSites, activeSiteIndex]);

  // Pan to selected site
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || activeSiteIndex === undefined || activeSiteIndex === null) return;

    const currentSite = UNESCO_SITES[activeSiteIndex];
    if (currentSite && currentSite.coords) {
      map.flyTo(currentSite.coords, 8.5, {
        animate: true,
        duration: 1.2
      });
    }
  }, [activeSiteIndex]);

  const toggleLayer = (layerKey) => {
    const map = mapInstanceRef.current;
    const layer = hazardLayersRef.current[layerKey];
    if (!map || !layer) return;

    if (layerKey === 'seismic') {
      if (showSeismicLayer) {
        map.removeLayer(layer);
        setShowSeismicLayer(false);
      } else {
        map.addLayer(layer);
        setShowSeismicLayer(true);
      }
    } else if (layerKey === 'rainfall') {
      if (showRainfallLayer) {
        map.removeLayer(layer);
        setShowRainfallLayer(false);
      } else {
        map.addLayer(layer);
        setShowRainfallLayer(true);
      }
    }
  };

  return (
    <div className="relative w-full h-[580px] bg-black overflow-hidden flex flex-col justify-between">
      {/* Leaflet Map Canvas */}
      <div ref={mapContainerRef} className="absolute inset-0 w-full h-full" />

      {/* Floating Header Overlay */}
      <div className="relative z-10 p-5 flex flex-wrap items-center justify-between gap-4 pointer-events-none">
        <div className="flex items-center gap-3 pointer-events-auto">
          <span className="w-2 h-2 rounded-full bg-[#8052ff] animate-void-pulse" />
          <div>
            <span className="text-[11px] font-mono text-[#8052ff] uppercase tracking-wider block">
              Module 00 · National Geospatial Radar
            </span>
            <h3 className="text-xl font-normal tracking-[-0.03em] text-white">
              ISRO Bhuvan WGS84 Seismic & Monsoon Matrix
            </h3>
          </div>
        </div>

        {/* Layer Controls */}
        <div className="flex items-center gap-2 pointer-events-auto font-mono text-xs flex-wrap">
          <div className="flex items-center gap-1 bg-black/75 backdrop-blur-md p-1 rounded-full">
            <button
              onClick={() => setBaseMapType('dark')}
              className={`px-3 py-1.5 rounded-full text-[11px] uppercase transition cursor-pointer ${
                baseMapType === 'dark' ? 'bg-[#8052ff] text-white font-semibold' : 'text-[#9a9a9a] hover:text-white'
              }`}
            >
              Void Radar
            </button>
            <button
              onClick={() => setBaseMapType('satellite')}
              className={`px-3 py-1.5 rounded-full text-[11px] uppercase transition cursor-pointer ${
                baseMapType === 'satellite' ? 'bg-[#8052ff] text-white font-semibold' : 'text-[#9a9a9a] hover:text-white'
              }`}
            >
              Satellite
            </button>
          </div>

          <button
            onClick={() => toggleLayer('seismic')}
            className={`px-3.5 py-2 rounded-full text-[11px] font-mono transition cursor-pointer flex items-center gap-1.5 ${
              showSeismicLayer ? 'bg-[#ffb829] text-black font-bold' : 'bg-black/75 text-[#9a9a9a] hover:text-white'
            }`}
          >
            <span>🌋</span>
            <span>Seismic Faults</span>
          </button>

          <button
            onClick={() => toggleLayer('rainfall')}
            className={`px-3.5 py-2 rounded-full text-[11px] font-mono transition cursor-pointer flex items-center gap-1.5 ${
              showRainfallLayer ? 'bg-[#38bdf8] text-black font-bold' : 'bg-black/75 text-[#9a9a9a] hover:text-white'
            }`}
          >
            <span>🌧️</span>
            <span>Monsoon Radar</span>
          </button>
        </div>
      </div>

      {/* Quick Jump Bar at Bottom */}
      {!hideQuickJump && (
        <div className="relative z-10 p-5 mt-auto pointer-events-none">
          <div className="flex items-center gap-2 overflow-x-auto py-2 pointer-events-auto scrollbar-none">
            <span className="text-[11px] font-mono text-[#9a9a9a] uppercase tracking-wider shrink-0 mr-1">Quick Select:</span>
            {majorQuickSites.map((site) => (
              <button
                key={site.id}
                onClick={() => {
                  if (typeof onSelectSite === 'function') {
                    onSelectSite(site.index);
                  }
                }}
                className={`px-3 py-1.5 rounded-full text-[12px] font-mono whitespace-nowrap transition cursor-pointer ${
                  activeSiteIndex === site.index
                    ? 'bg-[#8052ff] text-white font-semibold shadow-[0_0_14px_rgba(128,82,255,0.4)]'
                    : 'bg-black/75 text-[#bdbdbd] hover:text-white'
                }`}
              >
                {site.name.split(',')[0]}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
