import React, { useState } from 'react';
import HeritageGisMap from './HeritageGisMap';
import HeritageShieldLogo from './HeritageShieldLogo';
import ThemeToggle from './ThemeToggle';

export default function MonumentPortalView({ sites, onSelectMonument, onBackToLanding, liveWeather }) {


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
    <div className="min-h-screen bg-[#07080B] text-[#EDE8DE] font-sans flex flex-col selection:bg-[#E06D44] selection:text-[#07080B] museum-bg">
      
      {/* 🏛️ 1. TOP ENTERPRISE GOVT / ASI COMMAND BAR (Sticky Top Header with Persistent Search) */}
      <header className="sticky top-0 z-[9999] bg-[#07080B]/85 backdrop-blur-2xl border-b border-white/[0.08] px-6 py-4 shadow-2xl">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-4">
          
          {/* Clickable Home Brand */}
          <HeritageShieldLogo
            size="md"
            showText={true}
            textClassName="text-lg tracking-wider font-serif font-bold text-[#FDFBF7]"
            onClick={onBackToLanding}
          />

          {/* Persistent Universal Search Bar (Always Visible on Scroll) */}
          <div className="relative flex-1 max-w-xl mx-2 sm:mx-6">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#E06D44] text-sm pointer-events-none">🔍</span>
            <input
              type="text"
              placeholder="Search by monument name, state, material, or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#121522]/80 border border-white/15 focus:border-[#E06D44] focus:ring-1 focus:ring-[#E06D44]/50 rounded-2xl pl-10 pr-20 py-2.5 text-xs sm:text-sm text-[#FDFBF7] placeholder-gray-400 focus:outline-none transition shadow-inner font-sans backdrop-blur-md"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-gray-400 hover:text-white bg-white/10 px-2 py-0.5 rounded cursor-pointer"
              >
                Clear ✕
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 text-xs font-mono shrink-0">
            <ThemeToggle />
          </div>

        </div>
      </header>

      {/* 🔍 2. QUICK FILTER BAR */}
      <section className="bg-[#0C0E16]/80 border-b border-white/[0.08] px-6 py-3.5 shadow-md backdrop-blur-xl">
        <div className="max-w-[1600px] mx-auto">
          {/* Quick Filters Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            
            {/* Status Pills */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[#E06D44] uppercase text-[10px] mr-1 font-bold tracking-widest">Heritage Filter:</span>
              <button
                onClick={() => setStatusFilter('ALL')}
                className={`px-3.5 py-1.5 rounded-xl border transition cursor-pointer font-bold ${
                  statusFilter === 'ALL'
                    ? 'border-[#E06D44] bg-[#E06D44]/20 text-[#FDFBF7] shadow-sm'
                    : 'border-white/10 bg-[#121522]/60 text-gray-400 hover:text-gray-200 hover:border-white/25'
                }`}
              >
                All Heritage Sites
              </button>

              <button
                onClick={() => setStatusFilter('Critical')}
                className={`px-3.5 py-1.5 rounded-xl border transition cursor-pointer font-bold flex items-center gap-1.5 ${
                  statusFilter === 'Critical'
                    ? 'border-rose-500 bg-rose-500/25 text-rose-300 shadow-sm'
                    : 'border-white/10 bg-[#121522]/60 text-rose-400 hover:bg-rose-950/30'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                <span>Critical Interventions ({criticalCount})</span>
              </button>

              <button
                onClick={() => setStatusFilter('Watch')}
                className={`px-3.5 py-1.5 rounded-xl border transition cursor-pointer font-bold flex items-center gap-1.5 ${
                  statusFilter === 'Watch'
                    ? 'border-amber-500 bg-amber-500/25 text-amber-300 shadow-sm'
                    : 'border-white/10 bg-[#121522]/60 text-amber-400 hover:bg-amber-950/30'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Watchlist ({watchCount})</span>
              </button>

              <button
                onClick={() => setStatusFilter('Stable')}
                className={`px-3.5 py-1.5 rounded-xl border transition cursor-pointer font-bold flex items-center gap-1.5 ${
                  statusFilter === 'Stable'
                    ? 'border-emerald-500 bg-emerald-500/25 text-emerald-300 shadow-sm'
                    : 'border-white/10 bg-[#121522]/60 text-emerald-400 hover:bg-emerald-950/30'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Stable Sites ({stableCount})</span>
              </button>

              <button
                onClick={() => setStatusFilter('ZoneIV_V')}
                className={`px-3.5 py-1.5 rounded-xl border transition cursor-pointer font-bold flex items-center gap-1.5 ${
                  statusFilter === 'ZoneIV_V'
                    ? 'border-purple-500 bg-purple-500/25 text-purple-300 shadow-sm'
                    : 'border-white/10 bg-[#121522]/60 text-purple-400 hover:bg-purple-950/30'
                }`}
              >
                <span>🌋 High Seismic Zones (IV/V)</span>
              </button>
            </div>

            {/* State Filter Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">State Jurisdiction:</span>
              <select
                value={stateFilter}
                onChange={(e) => setStateFilter(e.target.value)}
                className="bg-[#121522] border border-white/15 text-gray-200 text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-[#E06D44] cursor-pointer shadow-sm"
              >
                {uniqueStates.map(state => (
                  <option key={state} value={state} className="bg-[#0C0E16] text-gray-200">
                    {state === 'ALL' ? 'All States (Pan-India)' : state}
                  </option>
                ))}
              </select>
            </div>

          </div>
        </div>
      </section>

      {/* 🗺️ 3. INTERACTIVE GEOSPATIAL MAP SECTION */}
      <section className="px-6 py-6 border-b border-[#1E2228] bg-[#090A0C]">
        <div className="max-w-[1600px] mx-auto space-y-3">
          
          <div className="flex flex-wrap justify-between items-center gap-3">
            <div>
              <h3 className="text-xl font-serif font-bold text-[#F3EFE6]">
                National Built Heritage Radar
              </h3>
            </div>
          </div>


          {/* Leaflet Interactive Map Component (Synchronized with Top Filters) */}
          <HeritageGisMap
            filterSites={filteredSites}
            selectedStatus={statusFilter}
            searchQuery={searchQuery}
            onSelectSite={(idx, targetTab = 'twin') => {
              if (onSelectMonument) onSelectMonument(idx, targetTab);
            }}
          />


        </div>
      </section>

      {/* 📋 4. MONUMENT REGISTRY DIRECTORY CARDS */}
      <main className="max-w-[1600px] mx-auto px-6 py-8 flex-1 space-y-6">
        
        <div className="flex flex-wrap justify-between items-end gap-3">
          <div>
            <h3 className="text-xl font-serif font-bold text-[#F3EFE6]">
              National Heritage Sites Directory
            </h3>
          </div>
          <span className="text-xs font-mono text-gray-400">
            Showing <strong className="text-white font-bold">{filteredSites.length}</strong> Protected Heritage Sites
          </span>
        </div>

        {filteredSites.length === 0 ? (
          <div className="frosted-glass-card rounded-3xl p-12 text-center space-y-3">
            <div className="text-3xl">🏛️</div>
            <h3 className="text-base font-serif font-bold text-gray-300">No Heritage Sites Found</h3>
            <p className="text-xs text-gray-500 font-mono">No heritage sites match your current search or filter criteria.</p>
            <button
              onClick={() => { setSearchQuery(''); setStatusFilter('ALL'); setStateFilter('ALL'); }}
              className="mt-2 px-5 py-2.5 rounded-xl terracotta-btn text-xs font-mono font-bold uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSites.map((site) => (
              <div
                key={site.id}
                onClick={() => onSelectMonument(site.index)}
                className="group cursor-pointer frosted-glass-card rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                <div>
                  {/* Image Container with Badges */}
                  <div className="relative h-48 w-full bg-[#1A1D24] overflow-hidden">
                    <img
                      src={site.imageUrl}
                      alt={site.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0C0E16] via-[#0C0E16]/30 to-black/60" />

                    {/* Top Badges */}
                    <div className="absolute top-3 right-3 flex items-center text-[10px] font-mono">
                      <span
                        className="px-2.5 py-1 rounded-full backdrop-blur-md font-bold uppercase tracking-wider text-[9px] flex items-center gap-1.5 shadow-lg border"
                        style={{
                          backgroundColor: `${site.color}25`,
                          color: site.color,
                          borderColor: `${site.color}60`
                        }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: site.color }} />
                        <span>{site.status}</span>
                      </span>
                    </div>

                    {/* Bottom overlay text */}
                    <div className="absolute bottom-3 left-3 right-3">
                      <span className="text-[10px] font-mono text-[#E5C07B] font-semibold block mb-0.5 tracking-wide">
                        📍 {site.location}, {site.state}
                      </span>
                      <h3 className="text-base font-serif font-bold text-[#FDFBF7] group-hover:text-[#E06D44] transition drop-shadow-md leading-tight">
                        {site.name}
                      </h3>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                    <p className="text-[11px] text-gray-300 font-mono leading-relaxed bg-[#121522]/80 p-2.5 rounded-xl border border-white/10">
                      🏛️ Built: <span className="text-[#FDFBF7] font-semibold">{site.builtEra}</span>
                    </p>

                    <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                      <div className="bg-[#121522]/80 p-2.5 rounded-xl border border-white/10 flex flex-col justify-between">
                        <span className="text-gray-400 uppercase block text-[9px] font-bold tracking-wider">Material Typology</span>
                        <span className="text-gray-200 font-semibold block mt-1 leading-snug break-words">
                          {site.material}
                        </span>
                      </div>

                      <div className="bg-[#121522]/80 p-2.5 rounded-xl border border-white/10 flex flex-col justify-between">
                        <span className="text-gray-400 uppercase block text-[9px] font-bold tracking-wider">Seismic Hazard</span>
                        <span className="text-amber-300 font-semibold block mt-1 leading-snug break-words">
                          {site.seismicZone}
                        </span>
                      </div>
                    </div>

                    <div className="bg-[#121522]/80 p-2.5 rounded-xl border border-white/10 text-[10px] font-mono flex justify-between items-center">
                      <span className="text-gray-400 font-medium">Vulnerability Index:</span>
                      <span className="font-bold text-xs font-mono" style={{ color: site.color }}>
                        {site.riskScore} / 100
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer Action Buttons */}
                <div className="p-4 pt-0 grid grid-cols-2 gap-2 text-xs font-mono">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectMonument(site.index, 'twin');
                    }}
                    className="w-full py-2 rounded-xl terracotta-btn font-bold transition flex items-center justify-center gap-1 cursor-pointer text-[11px]"
                  >
                    <span>🏛️ 3D Twin</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectMonument(site.index, 'vision');
                    }}
                    className="w-full py-2 rounded-xl frosted-btn font-bold transition flex items-center justify-center gap-1 cursor-pointer text-[11px]"
                  >
                    <span>🔍 AI Vision</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* 🏛️ NATIONAL HERITAGE SOVEREIGNTY FOOTER */}
      <footer className="border-t border-[#1E2228] bg-[#07080A] py-8 px-6 mt-auto">
        <div className="max-w-[1600px] mx-auto flex flex-wrap justify-between items-center gap-6 text-xs font-mono text-gray-400">
          
          <div className="flex items-center gap-3">
            <HeritageShieldLogo size="sm" showText={true} />
            <span className="text-gray-600">|</span>
            <span>Smart India Hackathon 2026 · Team Qualified (Team ID: 031)</span>
          </div>

          <div className="flex items-center gap-6 flex-wrap">
            <span>Standard: ISRO Bhuvan WGS84</span>
            <span>Framework: ISO 31000:2018</span>
            <span>Authority: Archaeological Survey of India (ASI)</span>
          </div>

        </div>
      </footer>

    </div>
  );
}
