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
    <div className="fixed inset-0 z-50 bg-[#181B1F]/60 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white border border-[#E6E1D8] w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-[#FAF8F5] border-b border-[#E6E1D8] px-6 py-4 flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-[#C85A32] uppercase font-bold tracking-wider">
                National Built Heritage Command Center
              </span>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-[#C85A32]/10 text-[#C85A32] border border-[#C85A32]/30 font-bold">
                {UNESCO_SITES.length} UNESCO Sites Active
              </span>
            </div>
            <h2 className="text-base font-serif font-bold text-[#181B1F] mt-0.5">
              Select Heritage Site of National Importance
            </h2>
          </div>

          <button
            onClick={onClose}
            className="text-[#7A5B49] hover:text-[#181B1F] text-xs font-mono px-3 py-1.5 rounded-xl bg-white border border-[#E6E1D8] cursor-pointer shadow-sm"
          >
            ✕
          </button>
        </div>

        {/* Search & State Filter Bar */}
        <div className="p-5 border-b border-[#E6E1D8] bg-white flex flex-wrap gap-3 items-center">
          <div className="flex-1 min-w-[240px]">
            <input
              type="text"
              placeholder="Search by name, state, material typology, ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#FAF8F5] border border-[#E6E1D8] rounded-xl px-3.5 py-2.5 text-xs font-mono text-[#181B1F] placeholder-[#94A3B8] focus:outline-none focus:border-[#C85A32]"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto">
            <span className="text-[10px] font-mono text-[#7A5B49] uppercase font-semibold">State:</span>
            <select
              value={filterState}
              onChange={(e) => setFilterState(e.target.value)}
              className="bg-[#FAF8F5] border border-[#E6E1D8] rounded-xl px-3 py-2 text-xs font-mono text-[#181B1F] focus:outline-none focus:border-[#C85A32] cursor-pointer"
            >
              {states.map(st => (
                <option key={st} value={st} className="bg-white text-[#181B1F]">
                  {st}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Monument Grid */}
        <div className="p-5 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 flex-1 bg-[#FAF8F5]">
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
                    ? 'bg-white border-[#C85A32] ring-1 ring-[#C85A32] shadow-md'
                    : 'bg-white border-[#E6E1D8] hover:border-[#C85A32]/50 hover:shadow-md'
                }`}
              >
                <div>
                  {/* Top Bar: ASI ID & State */}
                  <div className="flex justify-between items-center text-[10px] font-mono text-[#7A5B49] mb-2">
                    <span className="font-bold text-[#C85A32]">{site.id}</span>
                    <span className="bg-[#FAF8F5] px-2 py-0.5 rounded text-[#181B1F] border border-[#E6E1D8]">
                      {site.state}
                    </span>
                  </div>

                  {/* Thumbnail & Title */}
                  <div className="flex gap-3 items-center mb-3">
                    <div className="w-14 h-14 rounded-lg overflow-hidden border border-[#E6E1D8] shadow-sm flex-shrink-0 bg-[#FAF8F5] relative flex items-center justify-center">
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
                      <h4 className="text-xs font-serif font-bold text-[#181B1F] leading-snug group-hover:text-[#C85A32] transition">
                        {site.name}
                      </h4>
                      <p className="text-[10px] text-[#7A5B49] font-mono mt-0.5">
                        {site.builtEra.split('(')[0]}
                      </p>
                    </div>
                  </div>

                  {/* Hazard & Material tags */}
                  <div className="space-y-1 text-[10px] font-mono text-[#4B5563] bg-[#FAF8F5] p-2 rounded-lg border border-[#E6E1D8]">
                    <div className="truncate">🧱 {site.material}</div>
                    <div className="truncate">🌋 {site.seismicZone} · {site.monsoonRisk}</div>
                  </div>
                </div>

                {/* Bottom Stats Strip */}
                <div className="mt-3 pt-2.5 border-t border-[#E6E1D8] flex justify-between items-center text-[10px] font-mono">
                  <span className="text-[#7A5B49]">
                    Health: <strong className="text-[#181B1F]">{site.healthScore}/100</strong>
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
        <div className="bg-[#FAF8F5] border-t border-[#E6E1D8] px-6 py-3.5 flex justify-end items-center text-xs font-mono">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white border border-[#E6E1D8] text-[#181B1F] hover:text-[#C85A32] hover:border-[#C85A32] font-bold cursor-pointer shadow-sm transition"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
