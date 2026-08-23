import React, { useState } from 'react';
import { motion } from 'framer-motion';
import HeritageGisMap from './HeritageGisMap';
import HeritageShieldLogo from './HeritageShieldLogo';

export default function MonumentPortalView({
  sites = [],
  onSelectMonument,
  onBackToLanding,
  liveWeather
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
      true;

    const matchesState = stateFilter === 'ALL' ? true : site.state === stateFilter;

    return matchesSearch && matchesStatus && matchesState;
  });

  const criticalCount = sites.filter(s => s.status === 'Critical').length;
  const watchCount = sites.filter(s => s.status === 'Watch').length;
  const stableCount = sites.filter(s => s.status === 'Stable').length;

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col selection:bg-[#8052ff] selection:text-white">
      
      {/* 1. Top Command Bar */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-[#141414] px-6 sm:px-10 py-4">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-6">
          <HeritageShieldLogo
            size="md"
            showText={true}
            onClick={onBackToLanding}
          />

          {/* Search Input */}
          <div className="relative flex-1 max-w-xl">
            <input
              type="text"
              placeholder="Search monument by name, state, material typology, or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#111111] border border-[#262626] focus:border-[#8052ff] rounded-full pl-5 pr-12 py-2.5 text-xs sm:text-sm text-white placeholder-[#666666] focus:outline-none transition font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-[#9a9a9a] hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

          <button
            onClick={onBackToLanding}
            className="ghost-pill-btn text-xs font-mono uppercase"
          >
            ← Overview
          </button>
        </div>
      </header>

      {/* 2. Filter Pills */}
      <section className="bg-black border-b border-[#141414] px-6 sm:px-10 py-3">
        <div className="max-w-[1600px] mx-auto flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setStatusFilter('ALL')}
              className={`px-4 py-1.5 rounded-full transition cursor-pointer ${
                statusFilter === 'ALL' ? 'bg-[#8052ff] text-white font-semibold' : 'text-[#9a9a9a] hover:text-white'
              }`}
            >
              All Assets ({sites.length})
            </button>

            <button
              onClick={() => setStatusFilter('Critical')}
              className={`px-4 py-1.5 rounded-full transition cursor-pointer flex items-center gap-1.5 ${
                statusFilter === 'Critical' ? 'bg-[#ffb829] text-black font-bold' : 'text-[#ffb829] hover:text-white'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#ffb829]" />
              <span>Critical ({criticalCount})</span>
            </button>

            <button
              onClick={() => setStatusFilter('Watch')}
              className={`px-4 py-1.5 rounded-full transition cursor-pointer flex items-center gap-1.5 ${
                statusFilter === 'Watch' ? 'bg-[#8052ff] text-white font-semibold' : 'text-[#8052ff] hover:text-white'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#8052ff]" />
              <span>Watchlist ({watchCount})</span>
            </button>

            <button
              onClick={() => setStatusFilter('Stable')}
              className={`px-4 py-1.5 rounded-full transition cursor-pointer flex items-center gap-1.5 ${
                statusFilter === 'Stable' ? 'bg-[#15846e] text-white font-semibold' : 'text-[#15846e] hover:text-white'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#15846e]" />
              <span>Stable ({stableCount})</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[#9a9a9a] uppercase text-[11px]">Jurisdiction:</span>
            <select
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
              className="bg-[#111111] border border-[#262626] text-white text-xs font-mono px-3 py-1.5 rounded-full focus:outline-none focus:border-[#8052ff] cursor-pointer"
            >
              {uniqueStates.map(state => (
                <option key={state} value={state} className="bg-black text-white">
                  {state === 'ALL' ? 'All States (12 Sites)' : state}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* 3. National GIS Radar Map */}
      <section className="px-6 sm:px-10 py-6 max-w-[1600px] w-full mx-auto">
        <div className="h-[400px] w-full rounded-3xl overflow-hidden relative">
          <HeritageGisMap
            activeSiteIndex={0}
            onSelectSite={(idx, tab) => onSelectMonument(idx, tab)}
            filterSites={filteredSites}
            hideQuickJump={true}
          />
        </div>
      </section>

      {/* 4. National Monuments Directory */}
      <main className="flex-1 px-6 sm:px-10 pb-20 max-w-[1600px] w-full mx-auto space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <div>
            <h3 className="text-2xl font-normal tracking-[-0.03em] text-white">
              Centrally Protected Built Heritage Directory
            </h3>
          </div>
          <span className="text-xs font-mono text-[#9a9a9a]">
            Displaying <strong className="text-white">{filteredSites.length}</strong> Heritage Profiles
          </span>
        </div>

        {filteredSites.length === 0 ? (
          <div className="p-16 text-center space-y-4">
            <h3 className="text-xl font-normal text-white">No Heritage Assets Matched</h3>
            <p className="text-sm font-light text-[#9a9a9a]">Try adjusting your search terms or filter selection.</p>
            <button
              onClick={() => { setSearchQuery(''); setStatusFilter('ALL'); setStateFilter('ALL'); }}
              className="iris-pill-btn text-xs"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSites.map((site, idx) => (
              <motion.div
                key={site.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (idx % 4) * 0.05 }}
                onClick={() => onSelectMonument(site.index, 'twin')}
                className="group cursor-pointer p-5 rounded-3xl bg-[#0a0a0a] border border-[#141414] hover:border-[#8052ff] transition-all duration-300 flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="relative h-44 w-full rounded-2xl overflow-hidden bg-[#111111] mb-3">
                    <img
                      src={site.imageUrl}
                      alt={site.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    <div className="absolute top-3 left-3 right-3 flex justify-between items-center">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase ${
                        site.status === 'Critical' ? 'bg-[#ffb829] text-black' : 'bg-[#8052ff] text-white'
                      }`}>
                        {site.status}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-black/80 text-[10px] font-mono text-white">
                        {site.state}
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] font-mono text-[#9a9a9a] uppercase">{site.id}</span>
                    <h4 className="text-lg font-normal tracking-[-0.02em] text-white mt-0.5 group-hover:text-[#8052ff] transition-colors leading-snug">
                      {site.name}
                    </h4>
                    <p className="text-xs text-[#bdbdbd] font-light mt-1 line-clamp-1">
                      {site.material}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#1a1a1a] flex justify-between items-center text-xs font-mono">
                  <span className="text-[#9a9a9a]">Risk: <strong className="text-white">{site.riskScore}/100</strong></span>
                  <span className="text-[#8052ff] font-semibold group-hover:translate-x-1 transition-transform">
                    Studio →
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
