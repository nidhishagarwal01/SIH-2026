import React, { useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
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
import EpigraphicWatermarkDivider from './EpigraphicWatermarkDivider';

export default function MonumentPortalView({
  sites = [],
  onSelectMonument,
  onBackToLanding,
  currentUser
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [stateFilter, setStateFilter] = useState('ALL');

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001
  });

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
    <div className="min-h-screen bg-[#F0E7DA] text-[#24160E] font-sans flex flex-col selection:bg-[#BA532B] selection:text-white museum-bg">
      
      {/* 🚀 TOP SPRING-SMOOTHED SCROLL PROGRESS BAR */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3.5px] bg-gradient-to-r from-[#BA532B] via-[#C29244] to-[#24160E] z-[100001] origin-left shadow-sm pointer-events-none"
        style={{ scaleX }}
      />

      {/* 🏛️ 1. TOP COMMAND BAR */}
      <header className="sticky top-0 z-[9999] bg-[#FAF5ED]/90 backdrop-blur-2xl border-b border-[#DACDB8] px-6 py-4 shadow-sm">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-4">
          
          {/* Clickable Home Brand */}
          <HeritageShieldLogo
            size="md"
            showText={true}
            textClassName="text-lg tracking-wider font-serif font-bold text-[#24160E]"
            onClick={onBackToLanding}
          />

          {/* Persistent Universal Search Bar */}
          <div className="relative flex-1 max-w-xl mx-2 sm:mx-6">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#BA532B] text-sm pointer-events-none">🔍</span>
            <input
              type="text"
              placeholder="Search by monument name, state, material, or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-[#DACDB8] focus:border-[#BA532B] focus:ring-1 focus:ring-[#BA532B]/40 rounded-2xl pl-10 pr-20 py-2.5 text-xs sm:text-sm text-[#24160E] placeholder-[#94A3B8] focus:outline-none transition shadow-sm font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-[#7A5B49] hover:text-[#24160E] bg-[#FAF5ED] px-2 py-0.5 rounded cursor-pointer border border-[#DACDB8]"
              >
                Clear ✕
              </button>
            )}
          </div>

        </div>
      </header>

      {/* 🔍 2. QUICK FILTER BAR */}
      <section className="bg-white border-b border-[#DACDB8] px-6 py-3.5 shadow-sm">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            
            {/* Status Pills */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[#BA532B] uppercase text-[10px] mr-1 font-bold tracking-widest">Heritage Filter:</span>
              <button
                onClick={() => setStatusFilter('ALL')}
                className={`px-3.5 py-1.5 rounded-xl border transition cursor-pointer font-bold ${
                  statusFilter === 'ALL'
                    ? 'border-[#BA532B] bg-[#BA532B]/10 text-[#BA532B] shadow-sm'
                    : 'border-[#DACDB8] bg-[#FAF5ED] text-[#4D3425] hover:text-[#24160E] hover:bg-[#F2ECE1]'
                }`}
              >
                All Heritage Sites
              </button>

              <button
                onClick={() => setStatusFilter('Critical')}
                className={`px-3.5 py-1.5 rounded-xl border transition cursor-pointer font-bold flex items-center gap-1.5 ${
                  statusFilter === 'Critical'
                    ? 'border-rose-500 bg-rose-50 text-rose-700 shadow-sm'
                    : 'border-[#DACDB8] bg-[#FAF5ED] text-rose-600 hover:bg-rose-50'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                <span>Critical ({criticalCount})</span>
              </button>

              <button
                onClick={() => setStatusFilter('Watch')}
                className={`px-3.5 py-1.5 rounded-xl border transition cursor-pointer font-bold flex items-center gap-1.5 ${
                  statusFilter === 'Watch'
                    ? 'border-amber-500 bg-amber-50 text-amber-700 shadow-sm'
                    : 'border-[#DACDB8] bg-[#FAF5ED] text-amber-600 hover:bg-amber-50'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span>Watchlist ({watchCount})</span>
              </button>

              <button
                onClick={() => setStatusFilter('Stable')}
                className={`px-3.5 py-1.5 rounded-xl border transition cursor-pointer font-bold flex items-center gap-1.5 ${
                  statusFilter === 'Stable'
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm'
                    : 'border-[#DACDB8] bg-[#FAF5ED] text-emerald-600 hover:bg-emerald-50'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Stable ({stableCount})</span>
              </button>

              <button
                onClick={() => setStatusFilter('ZoneIV_V')}
                className={`px-3.5 py-1.5 rounded-xl border transition cursor-pointer font-bold ${
                  statusFilter === 'ZoneIV_V'
                    ? 'border-purple-500 bg-purple-50 text-purple-700 shadow-sm'
                    : 'border-[#DACDB8] bg-[#FAF5ED] text-purple-600 hover:bg-purple-50'
                }`}
              >
                ⚡ High Seismic Risk
              </button>
            </div>

            {/* State Dropdown Selector */}
            <div className="flex items-center gap-2">
              <span className="text-[#7A5B49] text-[11px] font-semibold">State:</span>
              <select
                value={stateFilter}
                onChange={(e) => setStateFilter(e.target.value)}
                className="bg-[#FAF5ED] border border-[#DACDB8] text-[#24160E] text-xs font-mono font-bold px-3 py-1.5 rounded-xl focus:outline-none focus:border-[#BA532B] cursor-pointer"
              >
                {uniqueStates.map(state => (
                  <option key={state} value={state}>
                    {state === 'ALL' ? 'All States (12 Assets)' : state}
                  </option>
                ))}
              </select>
            </div>

          </div>
        </div>
      </section>

      {/* 🗺️ 3. INTERACTIVE GIS RADAR & SPATIAL DISPATCH CONTAINER */}
      <section className="px-6 py-6 max-w-[1600px] w-full mx-auto">
        <div className="bg-white border border-[#DACDB8] rounded-3xl overflow-hidden shadow-sm p-4 sm:p-5 space-y-4">
          
          <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs px-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#BA532B] animate-ping" />
              <span className="font-serif font-bold text-sm sm:text-base text-[#24160E]">
                ISRO Bhuvan National GIS Heritage Radar
              </span>
            </div>
            
            <div className="flex items-center gap-4 text-[11px] text-[#7A5B49]">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                <span>Critical</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>Watch</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Stable</span>
              </span>
            </div>
          </div>

          {/* GIS Map Display */}
          <div className="h-[360px] sm:h-[400px] w-full rounded-2xl overflow-hidden border border-[#DACDB8] shadow-inner relative">
            <HeritageGisMap
              activeSiteIndex={0}
              onSelectSite={(idx) => onSelectMonument(idx)}
              filterSites={filteredSites}
              hideQuickJump={true}
            />
          </div>

        </div>
      </section>

      {/* 🏺 Ancient Inscription Divider */}
      <EpigraphicWatermarkDivider speed={52} />

      {/* 🏛️ 4. NATIONAL MONUMENTS REPOSITORY DIRECTORY */}
      <main className="flex-1 px-6 pb-20 max-w-[1600px] w-full mx-auto space-y-6">
        
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div>
            <h3 className="text-xl font-serif font-bold text-[#24160E]">
              National Heritage Sites Directory
            </h3>
          </div>
          <span className="text-xs font-mono text-[#7A5B49]">
            Showing <strong className="text-[#24160E] font-bold">{filteredSites.length}</strong> Protected Heritage Sites
          </span>
        </div>

        {filteredSites.length === 0 ? (
          <div className="bg-white border border-[#DACDB8] rounded-3xl p-12 text-center space-y-3 shadow-sm">
            <div className="text-3xl">🏛️</div>
            <h3 className="text-base font-serif font-bold text-[#24160E]">No Heritage Sites Found</h3>
            <p className="text-xs text-[#7A5B49] font-mono">No heritage sites match your current search or filter criteria.</p>
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
                initial={{ opacity: 0, y: 35, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, margin: "-40px" }}
                transition={{ duration: 0.5, delay: (idx % 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => onSelectMonument(site.index)}
                className="group cursor-pointer bg-white border border-[#DACDB8] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-[#BA532B]/50 transition-all duration-500 flex flex-col justify-between"
              >
                <div>
                  {/* Image Container with Badges */}
                  <div className="relative h-48 w-full bg-[#FAF5ED] overflow-hidden">
                    <img
                      src={site.imageUrl}
                      alt={site.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#24160E]/80 via-transparent to-black/20" />
                    
                    {/* Top Status & Hazard Badges */}
                    <div className="absolute top-3 left-3 right-3 flex justify-between items-center">
                      <span 
                        className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider backdrop-blur-md border shadow"
                        style={{
                          backgroundColor: `${site.color}25`,
                          color: site.color,
                          borderColor: `${site.color}60`
                        }}
                      >
                        ● {site.status}
                      </span>
                      
                      <span className="px-2 py-0.5 rounded-md bg-white/90 text-[#24160E] text-[9px] font-mono font-bold shadow">
                        {site.id}
                      </span>
                    </div>

                    {/* Bottom Location Pill */}
                    <div className="absolute bottom-2.5 left-3 right-3">
                      <span className="text-[10px] font-mono text-[#C29244] font-bold block">
                        📍 {site.location}, {site.state}
                      </span>
                    </div>
                  </div>

                  {/* Content Body */}
                  <div className="p-5 space-y-3">
                    <h4 className="font-serif font-bold text-base text-[#24160E] group-hover:text-[#BA532B] transition-colors leading-tight">
                      {site.name}
                    </h4>

                    <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-[#7A5B49] pt-1">
                      <div className="bg-[#FAF5ED] p-2 rounded-xl border border-[#DACDB8]">
                        <span className="block text-[9px] uppercase text-[#7A5B49]">Built Era</span>
                        <strong className="text-[#24160E] truncate block">{site.period}</strong>
                      </div>
                      <div className="bg-[#FAF5ED] p-2 rounded-xl border border-[#DACDB8]">
                        <span className="block text-[9px] uppercase text-[#7A5B49]">Material</span>
                        <strong className="text-[#24160E] truncate block">{site.material.split(',')[0]}</strong>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono pt-2 border-t border-[#DACDB8]">
                      <span className="text-[#7A5B49]">Seismic Risk: <strong className="text-[#24160E]">{site.seismicZone}</strong></span>
                      <span className="text-[#BA532B] font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        <span>Studio</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Action Strip */}
                <div className="px-5 pb-5 pt-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectMonument(site.index);
                    }}
                    className="w-full py-2.5 rounded-xl terracotta-btn font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <span>Launch 3D Studio</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </main>

      {/* 🏺 Ancient Inscription Divider */}
      <EpigraphicWatermarkDivider speed={46} reverse={true} />

      {/* 🛡️ FOOTER */}
      <footer className="border-t border-[#DACDB8] bg-[#FAF5ED] py-8 px-6 text-center text-xs font-mono text-[#7A5B49]">
        <div className="max-w-[1600px] mx-auto flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <HeritageShieldLogo size="xs" showText={true} />
            <span>| Smart India Hackathon 2026</span>
          </div>
          <div>
            <span>Archaeological Survey of India · Ministry of Culture</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
