import React, { useState } from 'react';
import { UNESCO_SITES } from '../data/unescoSites';

export default function AssetSwitcherModal({
  isOpen,
  onClose,
  activeSiteIndex,
  onSelectSite
}) {
  const [search, setSearch] = useState('');
  const [filterState, setFilterState] = useState('ALL');

  if (!isOpen) return null;

  const states = ['ALL', ...new Set(UNESCO_SITES.map(s => s.state))];

  const filtered = UNESCO_SITES.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.location.toLowerCase().includes(search.toLowerCase()) ||
      s.id.toLowerCase().includes(search.toLowerCase()) ||
      s.material.toLowerCase().includes(search.toLowerCase());
    const matchesState = filterState === 'ALL' || s.state === filterState;
    return matchesSearch && matchesState;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4">
      <div className="bg-[#0C0E16] border border-white/15 w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-[#07080B] border-b border-white/10 px-6 py-4 flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-[#E06D44] uppercase font-bold tracking-wider">
                National Built Heritage Command Center
              </span>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-[#E06D44]/15 text-[#E06D44] border border-[#E06D44]/30 font-bold">
                {UNESCO_SITES.length} UNESCO Sites Active
              </span>
            </div>
            <h2 className="text-base font-serif font-bold text-[#FDFBF7] mt-0.5">
              Select Heritage Site of National Importance
            </h2>
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-xs font-mono px-3 py-1.5 rounded-xl frosted-btn cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Search & State Filter Bar */}
        <div className="p-5 border-b border-white/10 bg-[#07080B]/60 flex flex-wrap gap-3 items-center">
          <div className="flex-1 min-w-[240px]">
            <input
              type="text"
              placeholder="Search by name, state, material typology, ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#121522] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs font-mono text-[#FDFBF7] placeholder-gray-500 focus:outline-none focus:border-[#E06D44]"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto">
            <span className="text-[10px] font-mono text-gray-400 uppercase font-semibold">State:</span>
            <select
              value={filterState}
              onChange={(e) => setFilterState(e.target.value)}
              className="bg-[#121522] border border-white/15 rounded-xl px-3 py-2 text-xs font-mono text-gray-300 focus:outline-none focus:border-[#E06D44] cursor-pointer"
            >
              {states.map(st => (
                <option key={st} value={st} className="bg-[#0C0E16] text-gray-200">
                  {st}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Monument Grid */}
        <div className="p-5 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 flex-1">
          {filtered.map((site) => {
            const isCurrent = site.index === activeSiteIndex;
            return (
              <button
                key={site.id}
                onClick={() => {
                  onSelectSite(site.index);
                  onClose();
                }}
                className={`p-3.5 rounded-2xl border text-left transition flex flex-col justify-between space-y-2.5 cursor-pointer ${
                  isCurrent
                    ? 'bg-[#181D2E] border-[#E06D44] ring-1 ring-[#E06D44]/50 shadow-xl'
                    : 'frosted-glass-card hover:border-[#E06D44]/50 hover:bg-white/[0.06]'
                }`}
              >
                <div>
                  {/* Top Bar: ASI ID & State */}
                  <div className="flex justify-between items-center text-[10px] font-mono text-gray-400 mb-2">
                    <span className="font-bold text-[#C5A059]">{site.id}</span>
                    <span className="bg-[#181B22] px-2 py-0.5 rounded text-gray-300 border border-[#2B313D]">
                      {site.state}
                    </span>
                  </div>

                  {/* Thumbnail & Title */}
                  <div className="flex gap-3 items-center mb-3">
                    <div className="w-14 h-14 rounded-lg overflow-hidden border border-[#2B313D] shadow flex-shrink-0 bg-[#1A1D24] relative flex items-center justify-center">
                      <img
                        src={site.imageUrl}
                        alt={site.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                      <span className="text-xl select-none">🏛️</span>
                    </div>
                    <div>
                      <h4 className="text-xs font-serif font-bold text-[#F3EFE6] leading-snug group-hover:text-[#C5A059] transition">
                        {site.name}
                      </h4>
                      <p className="text-[10px] text-gray-400 font-mono mt-0.5">
                        {site.builtEra.split('(')[0]}
                      </p>
                    </div>
                  </div>


                  {/* Hazard & Material tags */}
                  <div className="space-y-1 text-[10px] font-mono text-gray-400 bg-[#121418] p-2 rounded-lg border border-[#1E2228]">
                    <div className="truncate">🧱 {site.material}</div>
                    <div className="truncate">🌋 {site.seismicZone} · {site.monsoonRisk}</div>
                  </div>
                </div>

                {/* Bottom Stats Strip */}
                <div className="mt-3 pt-2.5 border-t border-white/10 flex justify-between items-center text-[10px] font-mono">
                  <span className="text-gray-400">
                    Health: <strong className="text-[#FDFBF7]">{site.healthScore}/100</strong>
                  </span>
                  <span
                    className="px-2.5 py-0.5 rounded-full font-bold uppercase"
                    style={{
                      backgroundColor: `${site.color}20`,
                      color: site.color,
                      border: `1px solid ${site.color}40`
                    }}
                  >
                    {site.status}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="bg-[#07080B] border-t border-white/10 px-6 py-3.5 flex justify-end items-center text-xs font-mono">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl frosted-btn text-gray-300 hover:text-white font-bold cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
