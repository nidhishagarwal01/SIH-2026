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
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#121418] border border-[#1E2228] w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-[#0E1013] border-b border-[#1E2228] px-6 py-4 flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-[#C5A059] uppercase font-bold tracking-wider">
                National Built Heritage Command Center
              </span>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#C5A059]/15 text-[#C5A059] border border-[#C5A059]/30 font-bold">
                {UNESCO_SITES.length} UNESCO Sites Active
              </span>
            </div>
            <h2 className="text-base font-serif font-bold text-[#F3EFE6] mt-0.5">
              Select Heritage Site of National Importance
            </h2>
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-lg font-mono p-1 rounded-lg hover:bg-[#181B22]"
          >
            ✕
          </button>
        </div>

        {/* Search & State Filter Bar */}
        <div className="p-5 border-b border-[#1E2228] bg-[#0E1013]/60 flex flex-wrap gap-3 items-center">
          <div className="flex-1 min-w-[240px]">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#121418] border border-[#2B313D] rounded-xl px-4 py-2 text-xs font-mono text-white placeholder-gray-500 focus:outline-none focus:border-[#C5A059]"
            />

          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto">
            <span className="text-[10px] font-mono text-gray-400 uppercase font-semibold">State:</span>
            {states.slice(0, 6).map((st) => (
              <button
                key={st}
                onClick={() => setFilterState(st)}
                className={`text-[11px] font-mono px-2.5 py-1 rounded-lg transition ${
                  filterState === st
                    ? 'bg-[#C5A059] text-[#090A0C] font-bold shadow'
                    : 'bg-[#181B22] text-gray-400 hover:text-white border border-[#2B313D]'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Monuments Grid */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((site) => {
            const isSelected = activeSiteIndex === site.index;
            return (
              <div
                key={site.index}
                onClick={() => {
                  onSelectSite(site.index);
                  onClose();
                }}
                className={`group cursor-pointer rounded-xl border p-4 transition-all duration-200 flex flex-col justify-between hover:scale-[1.02] ${
                  isSelected
                    ? 'border-[#C5A059] bg-[#C5A059]/10 shadow-lg shadow-amber-950/20 ring-1 ring-[#C5A059]'
                    : 'border-[#1E2228] bg-[#0E1013] hover:border-[#3A4250] hover:bg-[#14171C]'
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
                <div className="mt-3 pt-2.5 border-t border-[#1E2228] flex justify-between items-center text-[10px] font-mono">
                  <span className="text-gray-400">
                    Health: <strong className="text-white">{site.healthScore}/100</strong>
                  </span>
                  <span
                    className="px-2 py-0.5 rounded font-bold uppercase"
                    style={{
                      backgroundColor: `${site.color}20`,
                      color: site.color,
                      border: `1px solid ${site.color}40`
                    }}
                  >
                    {site.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="bg-[#0E1013] border-t border-[#1E2228] px-6 py-3 flex justify-end items-center text-xs font-mono">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#181B22] border border-[#2B313D] text-gray-300 hover:text-white"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
