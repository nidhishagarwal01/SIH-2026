import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { UNESCO_SITES } from '../data/unescoSites';

export default function HeritageGisMap({
  activeSiteIndex,
  onSelectSite,
  filterSites,
  selectedStatus = 'ALL',
  searchQuery = ''
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const tileLayerRef = useRef(null);
  const markersRef = useRef([]);
  const hazardLayersRef = useRef({});

  const [baseMapType, setBaseMapType] = useState('dark'); // 'dark' | 'satellite'
  const [showSeismicLayer, setShowSeismicLayer] = useState(false); // Clean map by default
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
      scrollWheelZoom: false // Prevents hijacking page scroll when cursor is over the map
    });
    mapInstanceRef.current = map;

    // Enable scroll wheel zoom only on intentional click, disable immediately on mouseleave
    const handleMapClick = () => map.scrollWheelZoom.enable();
    const handleMapMouseLeave = () => map.scrollWheelZoom.disable();
    container.addEventListener('click', handleMapClick);
    container.addEventListener('mouseleave', handleMapMouseLeave);

    // Zoom control at bottom-right
    L.control.zoom({ position: 'bottomright' }).addTo(map);


    // Default Tile Layer (Dark Matter)
    const darkTile = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
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
      color: '#e05a47',
      weight: 1.5,
      fillColor: '#e05a47',
      fillOpacity: 0.14,
      dashArray: '4, 6'
    });
    seismicNorthernBelt.bindTooltip('🌋 BIS IS 1893: Himalayan Seismic Fault Zone IV', { sticky: true, className: 'font-mono text-xs' });

    // Kutch Zone V Seismic Ring (Dholavira Active Rift Basin)
    const kutchSeismicZoneV = L.circle([23.5, 70.5], {
      radius: 140000,
      color: '#e05a47',
      weight: 1.5,
      fillColor: '#e05a47',
      fillOpacity: 0.18
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
      color: '#3b82f6',
      weight: 1,
      fillColor: '#3b82f6',
      fillOpacity: 0.14,
      dashArray: '3, 5'
    });
    monsoonWesternGhats.bindTooltip('🌧️ IMD Western Ghats High Precipitation Belt (>2500mm/yr)', { sticky: true, className: 'font-mono text-xs' });

    const bayOfBengalCycloneBelt = L.polygon([
      [21.5, 87.0], [19.5, 86.0], [16.0, 81.5], [13.0, 80.5],
      [13.5, 82.5], [18.0, 85.5], [21.0, 89.0]
    ], {
      color: '#3b82f6',
      weight: 1,
      fillColor: '#3b82f6',
      fillOpacity: 0.14,
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


  // Handle Base Map Switching (Dark vs Bhuvan Satellite)
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }

    if (baseMapType === 'satellite') {
      const satelliteTile = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'ISRO Bhuvan / High-Resolution Earth Imagery',
        maxZoom: 19
      });
      satelliteTile.addTo(map);
      tileLayerRef.current = satelliteTile;
    } else {
      const darkTile = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; CARTO &copy; OpenStreetMap',
        subdomains: 'abcd',
        maxZoom: 19
      });
      darkTile.addTo(map);
      tileLayerRef.current = darkTile;
    }
  }, [baseMapType]);

  // Update Markers when filter changes (e.g. Critical, Watch, Search)
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear existing markers
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    const createCustomIcon = (site) => {
      const isSelected = activeSiteIndex === site.index;
      const isCritical = site.status === 'Critical';

      return L.divIcon({
        className: 'custom-gis-marker',
        html: `
          <div style="
            position: relative;
            width: ${isSelected || isCritical ? '30px' : '22px'};
            height: ${isSelected || isCritical ? '30px' : '22px'};
            background: ${site.color};
            border: 2px solid ${isSelected ? '#FFF' : '#121418'};
            border-radius: 50%;
            box-shadow: 0 0 ${isCritical ? '20px' : isSelected ? '16px' : '8px'} ${site.color};
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.2s ease;
          ">
            <span style="font-size: ${isSelected || isCritical ? '13px' : '10px'}; font-weight: bold; color: #121418;">🏛️</span>
          </div>
        `,
        iconSize: [30, 30],
        iconAnchor: [15, 15],
        popupAnchor: [0, -15]
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
        <div style="font-family: ui-sans-serif, system-ui, sans-serif; background: #0E1013; color: #EDE8DE; padding: 14px; border-radius: 12px; min-width: 250px; max-width: 280px; border: 1px solid #2B313D; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.5);">
          
          <div style="position: relative; width: 100%; height: 110px; border-radius: 8px; overflow: hidden; margin-bottom: 10px; border: 1px solid #2B313D; background: #14171C;">
            <img src="${site.imageUrl}" alt="${site.name}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.style.display='none'"/>
            <span style="position: absolute; top: 6px; right: 6px; background: rgba(14,16,19,0.85); color: #C5A059; font-family: monospace; font-size: 10px; font-weight: bold; padding: 2px 6px; border-radius: 4px; border: 1px solid rgba(197,160,89,0.3);">
              ${site.state}
            </span>
          </div>


          <h4 style="font-size: 14px; font-weight: bold; margin: 0 0 4px 0; color: #FFF; font-family: ui-serif, Georgia, serif;">${site.name}</h4>
          
          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 11px; font-family: monospace; margin-bottom: 8px;">
            <span style="color: #9CA3AF;">Risk Index:</span>
            <strong style="color: ${site.color}; background: ${site.color}20; padding: 2px 6px; border-radius: 4px; border: 1px solid ${site.color}40;">
              ${site.riskScore}/100 (${site.status})
            </strong>
          </div>

          <div style="font-size: 10px; font-family: monospace; color: #9CA3AF; margin-bottom: 12px; border-top: 1px solid #1E2228; padding-top: 6px; line-height: 1.5;">
            <div>🧱 <strong>${site.material}</strong></div>
            <div>🌋 <strong>${site.seismicZone}</strong></div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px;">
            <button id="btn-twin-${site.index}" style="
              background: #C5A059;
              color: #090A0C;
              border: none;
              border-radius: 6px;
              padding: 7px 4px;
              font-size: 10px;
              font-family: monospace;
              font-weight: bold;
              cursor: pointer;
              transition: all 0.2s;
            ">🏛️ 3D Twin →</button>
            <button id="btn-vision-${site.index}" style="
              background: #181B22;
              color: #38BDF8;
              border: 1px solid rgba(56,189,248,0.4);
              border-radius: 6px;
              padding: 7px 4px;
              font-size: 10px;
              font-family: monospace;
              font-weight: bold;
              cursor: pointer;
              transition: all 0.2s;
            ">🔍 AI Vision →</button>
          </div>

        </div>
      `;

      marker.bindPopup(popupContent, {
        className: 'custom-leaflet-popup',
        closeButton: true,
        maxWidth: 300
      });

      marker.on('popupopen', () => {
        const btnTwin = document.getElementById(`btn-twin-${site.index}`);
        if (btnTwin) {
          btnTwin.onclick = () => {
            if (onSelectSite) onSelectSite(site.index, 'twin');
          };
        }
        const btnVision = document.getElementById(`btn-vision-${site.index}`);
        if (btnVision) {
          btnVision.onclick = () => {
            if (onSelectSite) onSelectSite(site.index, 'vision');
          };
        }
      });

      marker.on('click', () => {
        map.flyTo(site.coords, 8, { duration: 0.8 });
      });

      marker.addTo(map);
      markersRef.current.push(marker);
    });
  }, [activeSiteIndex, heritageSites, onSelectSite, selectedStatus]);

  // Handle Hazard Layer Toggles
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (hazardLayersRef.current.seismic) {
      if (showSeismicLayer) {
        hazardLayersRef.current.seismic.addTo(map);
      } else {
        hazardLayersRef.current.seismic.remove();
      }
    }

    if (hazardLayersRef.current.rainfall) {
      if (showRainfallLayer) {
        hazardLayersRef.current.rainfall.addTo(map);
      } else {
        hazardLayersRef.current.rainfall.remove();
      }
    }
  }, [showSeismicLayer, showRainfallLayer]);

  const handleFlyToSite = (siteIndex) => {
    const map = mapInstanceRef.current;
    const target = heritageSites.find(s => s.index === siteIndex) || UNESCO_SITES.find(s => s.index === siteIndex);
    if (map && target) {
      map.flyTo(target.coords, 8, { duration: 1.0 });
      const marker = markersRef.current.find(m => m._siteIndex === siteIndex);
      if (marker) {
        marker.openPopup();
      }
    }
  };

  return (
    <div className="space-y-3">
      
      {/* 🚀 1. Quick-Select Monument Ribbon (Major Flagship Heritage Sites) */}
      <div className="bg-[#121418] border border-[#1E2228] p-2.5 rounded-xl shadow-lg flex items-center gap-2 overflow-x-auto">
        <span className="text-[10px] font-mono text-[#C5A059] uppercase font-bold tracking-wider whitespace-nowrap pl-1 flex items-center gap-1">
          <span>📍</span>
          <span>Quick Jump:</span>
        </span>
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          {majorQuickSites.map((s) => (
            <button
              key={s.index}
              onClick={() => handleFlyToSite(s.index)}
              className="px-3 py-1 rounded-lg bg-[#0E1013] hover:bg-[#181B22] border border-[#2B313D] hover:border-[#C5A059] text-xs font-mono text-gray-200 transition flex items-center gap-1.5 whitespace-nowrap group cursor-pointer shadow-sm"
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
              <span className="group-hover:text-[#C5A059] font-medium">{s.shortName}</span>
            </button>
          ))}
        </div>
      </div>


      {/* 🗺️ 2. Main Interactive Map Container */}
      <div className="relative w-full h-[540px] bg-[#090A0C] rounded-xl overflow-hidden border border-[#1E2228] shadow-2xl">
        
        {/* Map Control Overlay */}
        <div className="absolute top-4 left-4 z-[400] flex flex-col gap-2 max-w-sm">
          
          {/* Title & Stats */}
          <div className="bg-[#121418]/95 backdrop-blur border border-[#1E2228] p-3 rounded-xl shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-[#C5A059] uppercase tracking-wider font-bold">
                National Heritage Radar
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#C5A059]/15 text-[#C5A059] border border-[#C5A059]/30 font-bold">
                {selectedStatus !== 'ALL' ? `${selectedStatus} Urgency` : 'Active Sentinel'}
              </span>
            </div>

            <p className="text-xs text-gray-300 font-sans mt-1">
              {selectedStatus === 'Critical'
                ? 'Displaying high-urgency monuments requiring immediate conservation triage.'
                : 'Click any pin on the map of India to inspect its health, risk, and launch its 3D twin.'}
            </p>
          </div>

          {/* Base Layer Switcher (Dark vs Satellite) */}
          <div className="bg-[#121418]/95 backdrop-blur border border-[#1E2228] p-2.5 rounded-xl shadow-xl flex items-center justify-between gap-2">
            <span className="text-[10px] font-mono text-gray-400 uppercase font-semibold">Base Map:</span>
            <div className="flex gap-1">
              <button
                onClick={() => setBaseMapType('dark')}
                title="Switch to Dark GIS Grid Map with Carto tiles"
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition flex items-center gap-1.5 ${
                  baseMapType === 'dark'
                    ? 'bg-[#C5A059] text-[#090A0C] font-bold shadow'
                    : 'bg-[#181B22] text-gray-400 hover:text-white border border-[#2B313D]'
                }`}
              >
                <span>🗺️</span>
                <span>Dark GIS Grid</span>
              </button>
              <button
                onClick={() => setBaseMapType('satellite')}
                title="Switch to High-Resolution Satellite Imagery"
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition flex items-center gap-1.5 ${
                  baseMapType === 'satellite'
                    ? 'bg-sky-600 text-white font-bold shadow'
                    : 'bg-[#181B22] text-gray-400 hover:text-white border border-[#2B313D]'
                }`}
              >
                <span>🛰️</span>
                <span>Satellite Imagery</span>
              </button>

            </div>
          </div>

          {/* Hazard Layer Toggles */}
          <div className="bg-[#121418]/95 backdrop-blur border border-[#1E2228] p-2.5 rounded-xl shadow-xl flex items-center gap-3">
            <span className="text-[10px] font-mono text-gray-400 uppercase font-semibold">Overlays:</span>
            <label className="flex items-center gap-1.5 text-xs font-mono text-rose-300 cursor-pointer">
              <input
                type="checkbox"
                checked={showSeismicLayer}
                onChange={(e) => setShowSeismicLayer(e.target.checked)}
                className="rounded text-rose-500 focus:ring-0"
              />
              <span>Seismic Faults</span>
            </label>
            <label className="flex items-center gap-1.5 text-xs font-mono text-sky-300 cursor-pointer">
              <input
                type="checkbox"
                checked={showRainfallLayer}
                onChange={(e) => setShowRainfallLayer(e.target.checked)}
                className="rounded text-sky-500 focus:ring-0"
              />
              <span>Monsoon Belt</span>
            </label>
          </div>

        </div>

        {/* Map Container */}
        <div ref={mapContainerRef} className="w-full h-full" />

      </div>

    </div>
  );
}
