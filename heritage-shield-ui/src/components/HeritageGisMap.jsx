import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { UNESCO_SITES } from '../data/unescoSites';

export default function HeritageGisMap({
  activeSiteIndex,
  onSelectSite
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const tileLayerRef = useRef(null);
  const markersRef = useRef([]);
  const hazardLayersRef = useRef({});

  const [activeFilter, setActiveFilter] = useState('all');
  const [baseMapType, setBaseMapType] = useState('dark'); // 'dark' | 'satellite'
  const [showSeismicLayer, setShowSeismicLayer] = useState(true);
  const [showRainfallLayer, setShowRainfallLayer] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const heritageSites = UNESCO_SITES;

  // Initialize Map
  useEffect(() => {
    const container = mapContainerRef.current;
    if (!container || mapInstanceRef.current) return;

    // 1. Initialize Leaflet Map centered on India
    const map = L.map(container, {
      center: [21.5, 78.9],
      zoom: 4.8,
      minZoom: 4,
      maxZoom: 14,
      zoomControl: false
    });
    mapInstanceRef.current = map;

    // Zoom control at bottom-right
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // 2. Base Tile Layer (Dark Matter)
    const darkTile = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; OpenStreetMap',
      subdomains: 'abcd',
      maxZoom: 19
    });
    darkTile.addTo(map);
    tileLayerRef.current = darkTile;

    // 3. Add Hazard GeoJSON / Circles (Seismic and Monsoon zones)
    const seismicNorthernBelt = L.polygon([
      [31.5, 74.0], [32.0, 78.5], [29.5, 81.0], [27.5, 88.0], [26.0, 93.0],
      [24.5, 92.5], [26.0, 84.0], [27.5, 77.0], [28.5, 75.0]
    ], {
      color: '#e05a47',
      weight: 1,
      fillColor: '#e05a47',
      fillOpacity: 0.12,
      dashArray: '4, 6'
    });

    const kutchSeismicZoneV = L.circle([23.5, 70.5], {
      radius: 140000,
      color: '#e05a47',
      weight: 1.5,
      fillColor: '#e05a47',
      fillOpacity: 0.18
    });

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

    const rainfallGroup = L.layerGroup([monsoonWesternGhats, bayOfBengalCycloneBelt]);
    hazardLayersRef.current.rainfall = rainfallGroup;
    if (showRainfallLayer) rainfallGroup.addTo(map);

    return () => {
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
        attribution: 'ISRO Bhuvan / Esri High-Resolution Earth Imagery',
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

  // Update Markers
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear existing markers
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    const createCustomIcon = (site) => {
      const isSelected = activeSiteIndex === site.index;
      return L.divIcon({
        className: 'custom-gis-marker',
        html: `
          <div style="
            position: relative;
            width: ${isSelected ? '26px' : '20px'};
            height: ${isSelected ? '26px' : '20px'};
            background: ${site.color};
            border: 2px solid ${isSelected ? '#FFF' : '#121418'};
            border-radius: 50%;
            box-shadow: 0 0 ${isSelected ? '14px' : '6px'} ${site.color};
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.2s ease;
          ">
            <span style="font-size: 9px; font-weight: bold; color: #121418;">🏛️</span>
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
        zIndexOffset: isSelected ? 1000 : 0
      });

      const popupContent = `
        <div style="font-family: ui-monospace, SFMono-Regular, monospace; background: #0E1013; color: #EDE8DE; padding: 12px; border-radius: 8px; min-width: 220px; border: 1px solid #2B313D;">
          <div style="display: flex; justify-content: space-between; font-size: 10px; color: #C5A059; margin-bottom: 4px; font-weight: bold;">
            <span>${site.id}</span>
            <span>${site.state}</span>
          </div>
          <h4 style="font-size: 13px; font-weight: bold; margin: 0 0 6px 0; color: #FFF;">${site.name}</h4>
          <div style="font-size: 11px; margin-bottom: 6px; color: #AAA;">
            Risk: <strong style="color: ${site.color};">${site.riskScore}/100 (${site.status})</strong>
          </div>
          <div style="font-size: 10px; color: #888; margin-bottom: 8px; border-top: 1px solid #1E2228; padding-top: 4px;">
            🧱 ${site.material}<br/>
            🌋 ${site.seismicZone}
          </div>
          <button id="btn-select-${site.index}" style="
            width: 100%;
            background: #C5A059;
            color: #090A0C;
            border: none;
            border-radius: 4px;
            padding: 5px;
            font-size: 11px;
            font-weight: bold;
            cursor: pointer;
          ">Inspect in 3D Studio →</button>
        </div>
      `;

      marker.bindPopup(popupContent, {
        className: 'custom-leaflet-popup',
        closeButton: true
      });

      marker.on('popupopen', () => {
        const btn = document.getElementById(`btn-select-${site.index}`);
        if (btn) {
          btn.onclick = () => {
            if (onSelectSite) onSelectSite(site.index);
          };
        }
      });

      marker.on('click', () => {
        if (onSelectSite) onSelectSite(site.index);
      });

      marker.addTo(map);
      markersRef.current.push(marker);
    });
  }, [activeSiteIndex, heritageSites, onSelectSite]);

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

  // Center on active site when changed from outside
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || activeSiteIndex === undefined) return;
    const target = heritageSites[activeSiteIndex];
    if (target) {
      map.flyTo(target.coords, 8, { duration: 1.2 });
    }
  }, [activeSiteIndex]);

  return (
    <div className="relative w-full h-[540px] bg-[#090A0C] rounded-xl overflow-hidden border border-[#1E2228] shadow-2xl">
      
      {/* Map Control Overlay */}
      <div className="absolute top-4 left-4 z-[400] flex flex-col gap-2 max-w-sm">
        
        {/* Title & Stats */}
        <div className="bg-[#121418]/95 backdrop-blur border border-[#1E2228] p-3 rounded-xl shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-[#C5A059] uppercase tracking-wider font-bold">
              National Heritage Radar (ISRO/Bhuvan Grid)
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#C5A059]/15 text-[#C5A059] border border-[#C5A059]/30 font-bold">
              {heritageSites.length} UNESCO Sites Active
            </span>
          </div>
          <p className="text-xs text-gray-300 font-sans mt-1">
            WGS84 geospatial monitoring aligned with ISRO Bhuvan Heritage Buffer Standards & BIS IS 1893 seismic faults.
          </p>

          {/* Search Bar */}
          <div className="mt-2">
            <input
              type="text"
              placeholder="Search monument or circle..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0E1013] border border-[#2B313D] rounded-lg px-2.5 py-1 text-xs text-white font-mono placeholder-gray-500 focus:outline-none focus:border-[#C5A059]"
            />
          </div>
        </div>

        {/* Base Layer Switcher (Dark vs Satellite) */}
        <div className="bg-[#121418]/95 backdrop-blur border border-[#1E2228] p-2.5 rounded-xl shadow-xl flex items-center justify-between gap-2">
          <span className="text-[10px] font-mono text-gray-400 uppercase font-semibold">Base Imagery:</span>
          <div className="flex gap-1">
            <button
              onClick={() => setBaseMapType('dark')}
              className={`px-2.5 py-1 rounded text-xs font-mono transition ${
                baseMapType === 'dark'
                  ? 'bg-[#C5A059] text-[#090A0C] font-bold'
                  : 'bg-[#181B22] text-gray-400 hover:text-white border border-[#2B313D]'
              }`}
            >
              🌑 Dark Tactical
            </button>
            <button
              onClick={() => setBaseMapType('satellite')}
              className={`px-2.5 py-1 rounded text-xs font-mono transition ${
                baseMapType === 'satellite'
                  ? 'bg-sky-600 text-white font-bold'
                  : 'bg-[#181B22] text-gray-400 hover:text-white border border-[#2B313D]'
              }`}
            >
              🛰️ ISRO / Satellite
            </button>
          </div>
        </div>

        {/* Hazard Layer Toggles */}
        <div className="bg-[#121418]/95 backdrop-blur border border-[#1E2228] p-2.5 rounded-xl shadow-xl flex items-center gap-3">
          <span className="text-[10px] font-mono text-gray-400 uppercase font-semibold">Hazard Layers:</span>
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
  );
}
