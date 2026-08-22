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
  const markersRef = useRef([]);
  const hazardLayersRef = useRef({});

  const [activeFilter, setActiveFilter] = useState('all');
  const [showSeismicLayer, setShowSeismicLayer] = useState(true);
  const [showRainfallLayer, setShowRainfallLayer] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const heritageSites = UNESCO_SITES;

  useEffect(() => {
    const container = mapContainerRef.current;
    if (!container || mapInstanceRef.current) return;

    // 1. Initialize Leaflet Map centered on India
    const map = L.map(container, {
      center: [21.5, 78.9],
      zoom: 4.8,
      minZoom: 4,
      maxZoom: 12,
      zoomControl: false
    });
    mapInstanceRef.current = map;

    // Zoom control at bottom-right
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // 2. Add CartoDB Dark Matter tile layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; OpenStreetMap',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);

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

    // 4. Custom Marker Icons for Monuments
    const createCustomIcon = (site) => {
      const isCritical = site.status === 'High Urgency';
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
            box-shadow: 0 0 ${isSelected ? '16px' : '8px'} ${site.color};
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: transform 0.2s ease;
          ">
            ${isCritical ? `<div style="position:absolute; inset:-4px; border-radius:50%; border:1.5px solid ${site.color}; animation: ping 1.5s cubic-bezier(0,0,0.2,1) infinite;"></div>` : ''}
            <div style="width: 6px; height: 6px; background: #FFF; border-radius: 50%;"></div>
          </div>
        `,
        iconSize: [26, 26],
        iconAnchor: [13, 13]
      });
    };

    // 5. Add Markers for All UNESCO World Heritage Monuments
    heritageSites.forEach((site) => {
      const marker = L.marker(site.coords, {
        icon: createCustomIcon(site)
      }).addTo(map);

      const popupContent = `
        <div style="background:#121418; color:#E8E6E3; padding:12px; border-radius:10px; font-family:sans-serif; min-width:230px; border:1px solid #2B313D; box-shadow:0 10px 25px rgba(0,0,0,0.7);">
          <div style="font-size:10px; color:#C5A059; font-family:monospace; text-transform:uppercase; font-weight:bold;">${site.id} · ${site.state}</div>
          <div style="font-size:14px; font-weight:bold; margin-top:2px; color:#F3EFE6;">${site.name}</div>
          
          <div style="display:flex; justify-content:space-between; margin:8px 0; padding:6px 8px; background:#0E1013; border-radius:6px; font-size:11px; font-family:monospace; border:1px solid #1E2228;">
            <span>Health: <strong style="color:${site.color}">${site.healthScore}/100</strong></span>
            <span>Risk: <strong style="color:${site.color}">${site.riskScore}/100</strong></span>
          </div>

          <div style="font-size:11px; color:#A09C94; line-height:1.4; margin-bottom:8px;">
            ⚠️ <strong>Hazard Exposure:</strong> ${site.hazard}
          </div>

          <button id="btn-select-site-${site.index}" style="width:100%; background:linear-gradient(to right, #C5A059, #D4AF37); color:#090A0C; border:none; padding:7px; border-radius:6px; font-size:11px; font-weight:bold; cursor:pointer; font-family:monospace; text-transform:uppercase; box-shadow:0 2px 8px rgba(197,160,89,0.3);">
            🚀 Load 3D Twin & Live Telemetry
          </button>
        </div>
      `;

      marker.bindPopup(popupContent, {
        className: 'custom-leaflet-popup',
        closeButton: false
      });

      marker.on('popupopen', () => {
        const btn = document.getElementById(`btn-select-site-${site.index}`);
        if (btn) {
          btn.onclick = () => {
            onSelectSite(site.index);
          };
        }
      });

      markersRef.current.push({ marker, site });
    });

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Hazard Layers visibility
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

  // Filter markers
  const filteredSites = heritageSites.filter(s => {
    const matchesFilter = activeFilter === 'all' || (activeFilter === 'critical' ? s.status === 'High Urgency' : s.status === 'Watch');
    const matchesSearch = searchQuery === '' || s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.state.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="relative w-full h-[520px] bg-[#090A0C] rounded-xl overflow-hidden border border-[#1E2228] shadow-2xl">
      
      {/* Map Control Overlay */}
      <div className="absolute top-4 left-4 z-[400] flex flex-col gap-2 max-w-sm">
        
        {/* Title & Stats */}
        <div className="bg-[#121418]/95 backdrop-blur border border-[#1E2228] p-3 rounded-xl shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-[#C5A059] uppercase tracking-wider font-bold">
              National Heritage Radar
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#C5A059]/15 text-[#C5A059] border border-[#C5A059]/30 font-bold">
              {heritageSites.length} UNESCO Sites Active
            </span>
          </div>
          <p className="text-xs text-gray-300 font-sans mt-1">
            Real-time geospatial monitoring with live BIS IS 1893 seismic faults and IMD hazard overlays.
          </p>

          {/* Search Bar */}
          <div className="mt-2">
            <input
              type="text"
              placeholder="Search by monument or state..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0E1013] border border-[#2B313D] rounded-lg px-2.5 py-1 text-xs text-white font-mono placeholder-gray-500 focus:outline-none focus:border-[#C5A059]"
            />
          </div>
        </div>

        {/* Hazard Layer Toggles */}
        <div className="bg-[#121418]/95 backdrop-blur border border-[#1E2228] p-2.5 rounded-xl shadow-xl flex items-center gap-3">
          <span className="text-[10px] font-mono text-gray-400 uppercase font-semibold">GIS Overlays:</span>
          
          <label className="flex items-center gap-1.5 text-xs font-mono text-gray-200 cursor-pointer">
            <input
              type="checkbox"
              checked={showSeismicLayer}
              onChange={(e) => setShowSeismicLayer(e.target.checked)}
              className="accent-[#E05A47] rounded"
            />
            <span className="text-rose-400">🌋 Seismic IV/V</span>
          </label>

          <label className="flex items-center gap-1.5 text-xs font-mono text-gray-200 cursor-pointer">
            <input
              type="checkbox"
              checked={showRainfallLayer}
              onChange={(e) => setShowRainfallLayer(e.target.checked)}
              className="accent-[#3B82F6] rounded"
            />
            <span className="text-blue-400">🌧️ Monsoon Flood</span>
          </label>
        </div>

      </div>

      {/* Filter Tabs on Right */}
      <div className="absolute top-4 right-4 z-[400] bg-[#121418]/95 backdrop-blur border border-[#1E2228] p-1.5 rounded-xl shadow-xl flex gap-1 font-mono text-xs">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-2.5 py-1 rounded-lg transition ${
            activeFilter === 'all' ? 'bg-[#C5A059] text-[#090A0C] font-bold' : 'text-gray-400 hover:text-white'
          }`}
        >
          All ({heritageSites.length})
        </button>
        <button
          onClick={() => setActiveFilter('critical')}
          className={`px-2.5 py-1 rounded-lg transition ${
            activeFilter === 'critical' ? 'bg-rose-500 text-white font-bold' : 'text-gray-400 hover:text-white'
          }`}
        >
          Critical ({heritageSites.filter(s => s.status === 'High Urgency').length})
        </button>
        <button
          onClick={() => setActiveFilter('watch')}
          className={`px-2.5 py-1 rounded-lg transition ${
            activeFilter === 'watch' ? 'bg-amber-500 text-black font-bold' : 'text-gray-400 hover:text-white'
          }`}
        >
          Watch ({heritageSites.filter(s => s.status === 'Watch').length})
        </button>
      </div>

      {/* Main Leaflet Map Container */}
      <div ref={mapContainerRef} className="w-full h-full" />

      {/* Quick Select Monument Strip at Bottom */}
      <div className="absolute bottom-4 left-4 right-4 z-[400] bg-[#121418]/95 backdrop-blur border border-[#1E2228] p-2.5 rounded-xl shadow-2xl flex items-center justify-between gap-3 overflow-x-auto">
        <span className="text-[11px] font-mono text-gray-400 uppercase whitespace-nowrap font-bold">
          Quick Jump:
        </span>
        <div className="flex gap-1.5 overflow-x-auto py-0.5">
          {filteredSites.slice(0, 8).map((site) => (
            <button
              key={site.index}
              onClick={() => onSelectSite(site.index)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono whitespace-nowrap transition flex items-center gap-1.5 border ${
                activeSiteIndex === site.index
                  ? 'border-[#C5A059] bg-[#C5A059]/20 text-[#C5A059] font-bold shadow-sm'
                  : 'border-[#1E2228] bg-[#0E1013] text-gray-300 hover:border-gray-600'
              }`}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: site.color }} />
              <span>{site.name.split(',')[0].split('(')[0]}</span>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
