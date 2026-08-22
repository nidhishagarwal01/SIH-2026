import React, { useState } from 'react';
import HeritageGisMap from './HeritageGisMap';

export default function MonumentPortalView({ sites, onSelectMonument, liveWeather }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL'); // 'ALL' | 'Critical' | 'Watch' | 'Stable' | 'ZoneIV_V'
  const [stateFilter, setStateFilter] = useState('ALL');

  // Extract unique states
  const uniqueStates = ['ALL', ...new Set(sites.map(s => s.state))];

  // Filtered sites
  const filteredSites = sites.filter(site => {
    const matchesSearch =
      site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      site.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      site.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      site.material.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === 'ALL' ? true :
      statusFilter === 'ZoneIV_V' ? (site.seismicZone.includes('IV') || site.seismicZone.includes('V')) :
      site.status === statusFilter;

    const matchesState = stateFilter === 'ALL' ? true : site.state === stateFilter;

    return matchesSearch && matchesStatus && matchesState;
  });

  const criticalCount = sites.filter(s => s.status === 'Critical').length;
  const watchCount = sites.filter(s => s.status === 'Watch').length;
  const stableCount = sites.filter(s => s.status === 'Stable').length;

  return (
    <div className="min-h-screen bg-[#090A0C] text-[#E8E6E3] font-sans flex flex-col">
      {/* 🏛️ 1. GOVT OF INDIA / ASI HEADER */}
      <header className="sticky top-0 z-50 bg-[#0E1013]/95 backdrop-blur-md border-b border-[#1E2228] px-6 py-3 shadow-2xl">
        <div className="max-w-[1600px] mx-auto flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-b from-[#C5A059] via-[#8C6D38] to-[#4E878C] p-[1px] shadow-lg shadow-amber-950/30">
              <div className="w-full h-full bg-[#0E1013] rounded-lg flex items-center justify-center">
                <span className="font-serif font-black text-[#C5A059] text-base tracking-tighter">HS</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-serif font-bold tracking-wide text-[#F3EFE6]">HERITAGE SHIELD</h1>
                <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/25 font-bold tracking-wider">
                  ASI · NMMA · SIH '26 (Team 031)
                </span>
              </div>
              <p className="text-[11px] text-gray-400 font-sans tracking-tight">
                National Built Heritage Command Center · Predictive Digital Twin & AI Conservation
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <div className="bg-[#14171C] border border-[#2B313D] px-3.5 py-1.5 rounded-lg flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-gray-300">National Sentinel: <strong className="text-emerald-400">12 Flagship Nodes Active</strong></span>
            </div>
          </div>
        </div>
      </header>

      {/* 🌟 2. PORTAL HERO BANNER */}
      <section className="bg-gradient-to-b from-[#111317] via-[#0E1013] to-[#090A0C] border-b border-[#1E2228] px-6 py-8">
        <div className="max-w-[1600px] mx-auto space-y-6">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#C5A059] font-bold bg-[#C5A059]/10 px-3 py-1 rounded-full border border-[#C5A059]/20">
              National Geospatial Heritage Radar & Interactive Directory
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#F3EFE6] tracking-tight">
              Select a Heritage Monument to Launch Conservation Studio
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed font-sans">
              Click any monument on the interactive map of India below or select from the national registry cards to open its dedicated 3D living digital twin, run AI defect diagnostics, evaluate multi-hazard vulnerability, and synthesize official ASI work orders.
            </p>
          </div>

          {/* Key Metric Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl pt-1">
            <div className="bg-[#14171C] border border-[#1E2228] p-3.5 rounded-xl">
              <div className="text-[10px] font-mono text-gray-500 uppercase">Monitored UNESCO Sites</div>
              <div className="text-xl font-serif font-bold text-[#C5A059] mt-0.5">12 Flagship Assets</div>
            </div>
            <div className="bg-[#14171C] border border-[#1E2228] p-3.5 rounded-xl">
              <div className="text-[10px] font-mono text-gray-500 uppercase">Spatial Component IDs</div>
              <div className="text-xl font-serif font-bold text-sky-400 mt-0.5">54 Active Nodes</div>
            </div>
            <div className="bg-[#14171C] border border-[#1E2228] p-3.5 rounded-xl">
              <div className="text-[10px] font-mono text-gray-500 uppercase">Multi-Hazard Standard</div>
              <div className="text-xl font-serif font-bold text-amber-400 mt-0.5">ISRO Bhuvan GIS</div>
            </div>
            <div className="bg-[#14171C] border border-[#1E2228] p-3.5 rounded-xl">
              <div className="text-[10px] font-mono text-gray-500 uppercase">Preventive Conservation ROI</div>
              <div className="text-xl font-serif font-bold text-emerald-400 mt-0.5">93.4% Cost Savings</div>
            </div>
          </div>
        </div>
      </section>

      {/* 🗺️ 3. INTERACTIVE GEOSPATIAL MAP SECTION */}
      <section className="px-6 py-6 border-b border-[#1E2228] bg-[#090A0C]">
        <div className="max-w-[1600px] mx-auto space-y-3">
          <div className="flex flex-wrap justify-between items-center gap-3">
            <div>
              <span className="text-[10px] font-mono text-[#C5A059] uppercase tracking-wider font-bold">
                ISRO Bhuvan Geospatial Framework · WGS84 Spatial Radar
              </span>
              <h3 className="text-xl font-serif font-bold text-[#F3EFE6]">
                National Built Heritage Geospatial Radar
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-gray-400 bg-[#121418] px-3 py-1.5 rounded-lg border border-[#1E2228]">
                Grid: <strong className="text-sky-400">ISRO Bhuvan Geospatial Standard</strong>
              </span>
            </div>

          </div>

          {/* Leaflet Interactive Map Component */}
          <HeritageGisMap
            onSelectSite={(idx, targetTab = 'twin') => {
              if (onSelectMonument) onSelectMonument(idx, targetTab);
            }}
          />
        </div>
      </section>

      {/* 📋 4. MONUMENT REGISTRY GRID SECTION */}
      <main className="max-w-[1600px] mx-auto px-6 py-8 flex-1 space-y-6">
        
        {/* Section Header & Filters */}
        <div className="space-y-4">
          <div className="flex flex-wrap justify-between items-end gap-3">
            <div>
              <span className="text-[10px] font-mono text-[#C5A059] uppercase tracking-wider font-bold">
                Centrally Protected Monuments Grid
              </span>
              <h3 className="text-xl font-serif font-bold text-[#F3EFE6]">
                National Heritage Registry Directory
              </h3>
            </div>
            <span className="text-xs font-mono text-gray-400">
              Showing <strong className="text-white">{filteredSites.length}</strong> of {sites.length} Protected Heritage Assets
            </span>
          </div>

          {/* Search & Filtering Bar */}
          <div className="bg-[#14171C] border border-[#2B313D] p-4 rounded-2xl flex flex-wrap gap-4 items-center justify-between shadow-xl">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[280px]">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
              <input
                type="text"
                placeholder="Search by monument name, state, material, or ASI code (e.g. Qutub, Hampi, ASI-DL-001)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0E1013] border border-[#1E2228] focus:border-[#C5A059] rounded-xl pl-10 pr-4 py-2.5 text-xs text-gray-200 placeholder-gray-500 focus:outline-none transition font-sans"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 text-xs font-mono"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Quick Status Filter Pills */}
            <div className="flex items-center gap-1.5 flex-wrap text-xs font-mono">
              <button
                onClick={() => setStatusFilter('ALL')}
                className={`px-3 py-1.5 rounded-lg border transition ${
                  statusFilter === 'ALL'
                    ? 'border-[#C5A059] bg-[#C5A059]/20 text-[#C5A059] font-bold'
                    : 'border-[#1E2228] bg-[#0E1013] text-gray-400 hover:text-gray-200'
                }`}
              >
                All Sites ({sites.length})
              </button>

              <button
                onClick={() => setStatusFilter('Critical')}
                className={`px-3 py-1.5 rounded-lg border transition flex items-center gap-1.5 ${
                  statusFilter === 'Critical'
                    ? 'border-rose-500 bg-rose-500/20 text-rose-300 font-bold'
                    : 'border-[#1E2228] bg-[#0E1013] text-gray-400 hover:text-gray-200'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                <span>Critical Urgency ({criticalCount})</span>
              </button>

              <button
                onClick={() => setStatusFilter('Watch')}
                className={`px-3 py-1.5 rounded-lg border transition flex items-center gap-1.5 ${
                  statusFilter === 'Watch'
                    ? 'border-amber-500 bg-amber-500/20 text-amber-300 font-bold'
                    : 'border-[#1E2228] bg-[#0E1013] text-gray-400 hover:text-gray-200'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                <span>Watch List ({watchCount})</span>
              </button>

              <button
                onClick={() => setStatusFilter('Stable')}
                className={`px-3 py-1.5 rounded-lg border transition flex items-center gap-1.5 ${
                  statusFilter === 'Stable'
                    ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300 font-bold'
                    : 'border-[#1E2228] bg-[#0E1013] text-gray-400 hover:text-gray-200'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Stable ({stableCount})</span>
              </button>

              <button
                onClick={() => setStatusFilter('ZoneIV_V')}
                className={`px-3 py-1.5 rounded-lg border transition flex items-center gap-1.5 ${
                  statusFilter === 'ZoneIV_V'
                    ? 'border-orange-500 bg-orange-500/20 text-orange-300 font-bold'
                    : 'border-[#1E2228] bg-[#0E1013] text-gray-400 hover:text-gray-200'
                }`}
              >
                <span>🌋 High Seismic (Zone IV/V)</span>
              </button>
            </div>

            {/* State Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-gray-500 uppercase">State:</span>
              <select
                value={stateFilter}
                onChange={(e) => setStateFilter(e.target.value)}
                className="bg-[#0E1013] border border-[#1E2228] text-xs font-mono text-gray-200 px-3 py-1.5 rounded-lg focus:outline-none focus:border-[#C5A059]"
              >
                {uniqueStates.map(st => (
                  <option key={st} value={st}>{st === 'ALL' ? 'All States (National)' : st}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* 12 Monument Cards Grid */}
        {filteredSites.length === 0 ? (
          <div className="bg-[#121418] border border-[#1E2228] rounded-2xl p-12 text-center space-y-3">
            <div className="text-3xl">🏛️</div>
            <h3 className="text-base font-serif font-bold text-gray-300">No Heritage Monuments Found</h3>
            <p className="text-xs text-gray-500 font-mono">No monuments match your current search or filter criteria.</p>
            <button
              onClick={() => { setSearchQuery(''); setStatusFilter('ALL'); setStateFilter('ALL'); }}
              className="mt-2 px-4 py-2 rounded-lg bg-[#C5A059] text-[#090A0C] text-xs font-mono font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredSites.map((site) => (
              <div
                key={site.id}
                onClick={() => onSelectMonument(site.index)}
                className="group cursor-pointer bg-[#121418] hover:bg-[#15181E] border border-[#1E2228] hover:border-[#C5A059]/60 rounded-2xl overflow-hidden transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-amber-950/20 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  {/* Image Container with Badges */}
                  <div className="relative h-44 w-full bg-[#1A1D24] overflow-hidden">
                    <img
                      src={site.imageUrl}
                      alt={site.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121418] via-transparent to-black/60" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex justify-between items-center text-[10px] font-mono">
                      <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[#C5A059] border border-[#C5A059]/30 font-bold">
                        {site.id}
                      </span>
                      <span
                        className="px-2 py-0.5 rounded backdrop-blur-md font-bold uppercase tracking-wider text-[9px] flex items-center gap-1 shadow"
                        style={{
                          backgroundColor: `${site.color}25`,
                          color: site.color,
                          border: `1px solid ${site.color}50`
                        }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: site.color }} />
                        <span>{site.status}</span>
                      </span>
                    </div>

                    {/* Bottom overlay text */}
                    <div className="absolute bottom-3 left-3 right-3">
                      <span className="text-[10px] font-mono text-gray-300 block mb-0.5">
                        📍 {site.location}, {site.state}
                      </span>
                      <h3 className="text-base font-serif font-bold text-white group-hover:text-[#C5A059] transition drop-shadow">
                        {site.name}
                      </h3>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 space-y-3">
                    <p className="text-[11px] text-gray-400 font-mono line-clamp-1">
                      🏛️ Built: {site.builtEra}
                    </p>

                    <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                      <div className="bg-[#0E1013] p-2 rounded-lg border border-[#1E2228]">
                        <span className="text-gray-500 uppercase block text-[9px]">Material Typology</span>
                        <span className="text-gray-200 font-semibold truncate block mt-0.5">
                          {site.material.split('&')[0]}
                        </span>
                      </div>

                      <div className="bg-[#0E1013] p-2 rounded-lg border border-[#1E2228]">
                        <span className="text-gray-500 uppercase block text-[9px]">Seismic Exposure</span>
                        <span className="text-amber-300 font-semibold truncate block mt-0.5">
                          {site.seismicZone.split('(')[0]}
                        </span>
                      </div>
                    </div>

                    <div className="bg-[#0E1013] p-2.5 rounded-lg border border-[#1E2228] text-[10px] font-mono flex justify-between items-center">
                      <span className="text-gray-400">Vulnerability Index:</span>
                      <span className="font-bold text-xs" style={{ color: site.color }}>
                        {site.riskScore} / 100
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Action Button */}
                <div className="p-4 pt-0">
                  <button
                    className="w-full py-2.5 rounded-xl bg-[#181B22] group-hover:bg-[#C5A059] border border-[#2B313D] group-hover:border-[#C5A059] text-gray-200 group-hover:text-[#090A0C] text-xs font-mono font-bold transition-all flex items-center justify-center gap-2 shadow"
                  >
                    <span>Enter Monument Studio</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* 🏛️ FOOTER */}
      <footer className="border-t border-[#1E2228] bg-[#0E1013] py-6 px-6 text-center text-xs text-gray-500 font-mono mt-auto space-y-1">
        <div>HERITAGE SHIELD · Smart India Hackathon '26 · Team ID: 031 (Qualified)</div>
        <div className="text-[11px] text-gray-600">
          Domain: Simulation and Digital Twin · Ministry of Culture & Archaeological Survey of India (ASI)
        </div>
      </footer>
    </div>
  );
}
