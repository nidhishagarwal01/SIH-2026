import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  MapPin, 
  Search, 
  Filter, 
  ChevronRight, 
  ExternalLink, 
  Activity, 
  AlertTriangle,
  ArrowRight,
  TrendingDown,
  Layers,
  Sparkles,
  Award
} from 'lucide-react';

import HeritageGisMap from './HeritageGisMap';
import HeritageShieldLogo from './HeritageShieldLogo';
import ThemeToggle from './ThemeToggle';

export default function MonumentPortalView({
  sites = [],
  onSelectMonument,
  onBackToLanding,
  currentUser
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [stateFilter, setStateFilter] = useState('ALL');

  const uniqueStates = ['ALL', ...Array.from(new Set(sites.map(s => s.state)))].sort();

  const filteredSites = sites.filter(site => {
    const matchesSearch = 
      site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      site.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      site.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      site.material.toLowerCase().includes(searchQuery.toLowerCase()) ||
      site.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = 
      statusFilter === 'ALL' ? true :
      statusFilter === 'Critical' ? site.status === 'Critical' :
      statusFilter === 'Watch' ? site.status === 'Watch' :
      statusFilter === 'Stable' ? site.status === 'Stable' :
      statusFilter === 'ZoneIV_V' ? (site.seismicZone.includes('Zone IV') || site.seismicZone.includes('Zone V')) :
      true;

    const matchesState = stateFilter === 'ALL' ? true : site.state === stateFilter;

    return matchesSearch && matchesStatus && matchesState;
  });

  const criticalCount = sites.filter(s => s.status === 'Critical').length;
  const watchCount = sites.filter(s => s.status === 'Watch').length;
  const stableCount = sites.filter(s => s.status === 'Stable').length;

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#181B1F] font-sans flex flex-col selection:bg-[#C85A32] selection:text-white museum-bg">
      
      {/* 🏛️ 1. TOP COMMAND BAR */}
      <header className="sticky top-0 z-[9999] bg-[#FAF8F5]/90 backdrop-blur-2xl border-b border-[#E6E1D8] px-6 py-4 shadow-sm">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-4">
          
          {/* Clickable Home Brand */}
          <HeritageShieldLogo
            size="md"
            showText={true}
            textClassName="text-lg tracking-wider font-serif font-bold text-[#181B1F]"
            onClick={onBackToLanding}
          />

          {/* Persistent Universal Search Bar */}
          <div className="relative flex-1 max-w-xl mx-2 sm:mx-6">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#C85A32] text-sm pointer-events-none">🔍</span>
            <input
              type="text"
              placeholder="Search by monument name, state, material, or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-[#E6E1D8] focus:border-[#C85A32] focus:ring-1 focus:ring-[#C85A32]/40 rounded-2xl pl-10 pr-20 py-2.5 text-xs sm:text-sm text-[#181B1F] placeholder-[#94A3B8] focus:outline-none transition shadow-sm font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-[#64748B] hover:text-[#181B1F] bg-[#FAF8F5] px-2 py-0.5 rounded cursor-pointer border border-[#E6E1D8]"
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
      <section className="bg-white border-b border-[#E6E1D8] px-6 py-3.5 shadow-sm">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            
            {/* Status Pills */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[#C85A32] uppercase text-[10px] mr-1 font-bold tracking-widest">Heritage Filter:</span>
              <button
                onClick={() => setStatusFilter('ALL')}
                className={`px-3.5 py-1.5 rounded-xl border transition cursor-pointer font-bold ${
                  statusFilter === 'ALL'
                    ? 'border-[#C85A32] bg-[#C85A32]/10 text-[#C85A32] shadow-sm'
                    : 'border-[#E6E1D8] bg-[#FAF8F5] text-[#4B5563] hover:text-[#181B1F] hover:bg-[#F4EFEA]'
                }`}
              >
                All Heritage Sites
              </button>

              <button
                onClick={() => setStatusFilter('Critical')}
                className={`px-3.5 py-1.5 rounded-xl border transition cursor-pointer font-bold flex items-center gap-1.5 ${
                  statusFilter === 'Critical'
                    ? 'border-rose-500 bg-rose-50 text-rose-700 shadow-sm'
                    : 'border-[#E6E1D8] bg-[#FAF8F5] text-rose-600 hover:bg-rose-50'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                <span>Critical Interventions ({criticalCount})</span>
              </button>

              <button
                onClick={() => setStatusFilter('Watch')}
                className={`px-3.5 py-1.5 rounded-xl border transition cursor-pointer font-bold flex items-center gap-1.5 ${
                  statusFilter === 'Watch'
                    ? 'border-amber-500 bg-amber-50 text-amber-800 shadow-sm'
                    : 'border-[#E6E1D8] bg-[#FAF8F5] text-amber-700 hover:bg-amber-50'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span>Watchlist ({watchCount})</span>
              </button>

              <button
                onClick={() => setStatusFilter('Stable')}
                className={`px-3.5 py-1.5 rounded-xl border transition cursor-pointer font-bold flex items-center gap-1.5 ${
                  statusFilter === 'Stable'
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-800 shadow-sm'
                    : 'border-[#E6E1D8] bg-[#FAF8F5] text-emerald-700 hover:bg-emerald-50'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Stable Sites ({stableCount})</span>
              </button>

              <button
                onClick={() => setStatusFilter('ZoneIV_V')}
                className={`px-3.5 py-1.5 rounded-xl border transition cursor-pointer font-bold flex items-center gap-1.5 ${
                  statusFilter === 'ZoneIV_V'
                    ? 'border-purple-500 bg-purple-50 text-purple-800 shadow-sm'
                    : 'border-[#E6E1D8] bg-[#FAF8F5] text-purple-700 hover:bg-purple-50'
                }`}
              >
                <span>🌋 High Seismic Zones (IV/V)</span>
              </button>
            </div>

            {/* State Filter Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-[#64748B] text-[10px] uppercase font-bold tracking-wider">State Jurisdiction:</span>
              <select
                value={stateFilter}
                onChange={(e) => setStateFilter(e.target.value)}
                className="bg-[#FAF8F5] border border-[#E6E1D8] text-[#181B1F] text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-[#C85A32] cursor-pointer shadow-sm"
              >
                {uniqueStates.map(state => (
                  <option key={state} value={state} className="bg-white text-[#181B1F]">
                    {state === 'ALL' ? 'All States (Pan-India)' : state}
                  </option>
                ))}
              </select>
            </div>

          </div>
        </div>
      </section>

      {/* 🗺️ 3. INTERACTIVE GEOSPATIAL MAP SECTION */}
      <section className="px-6 py-6 border-b border-[#E6E1D8] bg-[#FAF8F5]">
        <div className="max-w-[1600px] mx-auto space-y-3">
          
          <div className="flex flex-wrap justify-between items-center gap-3">
            <div>
              <h3 className="text-xl font-serif font-bold text-[#181B1F]">
                National Built Heritage Radar
              </h3>
            </div>
          </div>

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
            <h3 className="text-xl font-serif font-bold text-[#181B1F]">
              National Heritage Sites Directory
            </h3>
          </div>
          <span className="text-xs font-mono text-[#64748B]">
            Showing <strong className="text-[#181B1F] font-bold">{filteredSites.length}</strong> Protected Heritage Sites
          </span>
        </div>

        {filteredSites.length === 0 ? (
          <div className="bg-white border border-[#E6E1D8] rounded-3xl p-12 text-center space-y-3 shadow-sm">
            <div className="text-3xl">🏛️</div>
            <h3 className="text-base font-serif font-bold text-[#181B1F]">No Heritage Sites Found</h3>
            <p className="text-xs text-[#64748B] font-mono">No heritage sites match your current search or filter criteria.</p>
            <button
              onClick={() => { setSearchQuery(''); setStatusFilter('ALL'); setStateFilter('ALL'); }}
              className="mt-2 px-5 py-2.5 rounded-xl terracotta-btn text-xs font-mono font-bold uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSites.map((site, idx) => (
              <motion.div
                key={site.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.45, delay: (idx % 4) * 0.07, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => onSelectMonument(site.index)}
                className="group cursor-pointer bg-white border border-[#E6E1D8] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-[#C85A32]/50 transition-all duration-500 flex flex-col justify-between"
              >
                <div>
                  {/* Image Container with Badges */}
                  <div className="relative h-48 w-full bg-[#FAF8F5] overflow-hidden">
                    <img
                      src={site.imageUrl}
                      alt={site.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-100"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#181B1F]/80 via-transparent to-black/20" />

                    {/* Top Badges */}
                    <div className="absolute top-3 right-3 flex items-center text-[10px] font-mono">
                      <span
                        className="px-2.5 py-1 rounded-full backdrop-blur-md font-bold uppercase tracking-wider text-[9px] flex items-center gap-1.5 shadow-md border"
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
                      <span className="text-[10px] font-mono text-[#F5E6CC] font-semibold block mb-0.5 tracking-wide">
                        📍 {site.location}, {site.state}
                      </span>
                      <h3 className="text-base font-serif font-bold text-white group-hover:text-[#F5E6CC] transition drop-shadow-md leading-tight">
                        {site.name}
                      </h3>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                    <p className="text-[11px] text-[#4B5563] font-mono leading-relaxed bg-[#FAF8F5] p-2.5 rounded-xl border border-[#E6E1D8]">
                      🏛️ Built: <span className="text-[#181B1F] font-semibold">{site.builtEra}</span>
                    </p>

                    <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                      <div className="bg-[#FAF8F5] p-2.5 rounded-xl border border-[#E6E1D8] flex flex-col justify-between">
                        <span className="text-[#64748B] uppercase block text-[9px] font-bold tracking-wider">Material Typology</span>
                        <span className="text-[#181B1F] font-semibold block mt-1 leading-snug break-words">
                          {site.material}
                        </span>
                      </div>

                      <div className="bg-[#FAF8F5] p-2.5 rounded-xl border border-[#E6E1D8] flex flex-col justify-between">
                        <span className="text-[#64748B] uppercase block text-[9px] font-bold tracking-wider">Seismic Hazard</span>
                        <span className="text-amber-800 font-semibold block mt-1 leading-snug break-words">
                          {site.seismicZone}
                        </span>
                      </div>
                    </div>

                    <div className="bg-[#FAF8F5] p-2.5 rounded-xl border border-[#E6E1D8] text-[10px] font-mono flex justify-between items-center">
                      <span className="text-[#64748B] font-medium">Vulnerability Index:</span>
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
              </motion.div>
            ))}
          </div>
        )}
      </main>

      {/* 🏛️ NATIONAL HERITAGE SOVEREIGNTY FOOTER */}
      <footer className="border-t border-[#E6E1D8] bg-[#FAF8F5] py-8 px-6 mt-auto">
        <div className="max-w-[1600px] mx-auto flex flex-wrap justify-between items-center gap-6 text-xs font-mono text-[#64748B]">
          
          <div className="flex items-center gap-3">
            <HeritageShieldLogo size="sm" showText={true} />
            <span className="text-gray-400">|</span>
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
