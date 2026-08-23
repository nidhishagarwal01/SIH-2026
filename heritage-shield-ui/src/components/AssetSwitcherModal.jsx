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
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/85 backdrop-blur-xl p-4 overflow-y-auto">
      <div className="bg-black text-white border border-[#222222] rounded-3xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-black border-b border-[#1a1a1a] px-6 py-4 flex justify-between items-center">
          <div>
            <div className="text-[11px] font-mono text-[#8052ff] uppercase tracking-wider">
              National Monitored Asset Matrix
            </div>
            <h2 className="text-xl font-normal tracking-[-0.03em] text-white mt-0.5">
              Select Monument of National Importance
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#111111] border border-[#333333] text-[#9a9a9a] hover:text-white flex items-center justify-center font-mono text-xs cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-[#1a1a1a] bg-black flex flex-wrap gap-3 items-center">
          <div className="flex-1 min-w-[240px]">
            <input
              type="text"
              placeholder="Search by name, state, material typology, ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#111111] border border-[#262626] rounded-full px-4 py-2.5 text-xs font-mono text-white placeholder-[#666666] focus:outline-none focus:border-[#8052ff]"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-[#9a9a9a] uppercase">State:</span>
            <select
              value={filterState}
              onChange={(e) => setFilterState(e.target.value)}
              className="bg-[#111111] border border-[#262626] rounded-full px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-[#8052ff] cursor-pointer"
            >
              {states.map(st => (
                <option key={st} value={st} className="bg-black text-white">
                  {st}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Monument Grid */}
        <div className="p-5 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 flex-1 bg-black">
          {filtered.map((site) => {
            const isCurrent = site.index === activeSiteIndex;
            return (
              <button
                key={site.id}
                onClick={() => {
                  onSelectSite(site.index);
                  onClose();
                }}
                className={`p-4 rounded-2xl border text-left transition flex flex-col justify-between space-y-3 cursor-pointer ${
                  isCurrent
                    ? 'bg-[#111111] border-[#8052ff] shadow-[0_0_16px_rgba(128,82,255,0.3)]'
                    : 'bg-[#0a0a0a] border-[#1a1a1a] hover:border-[#333333]'
                }`}
              >
                <div>
                  <div className="flex justify-between items-center text-[10px] font-mono text-[#9a9a9a] mb-2">
                    <span className="text-[#8052ff] font-semibold">{site.id}</span>
                    <span className="bg-[#111111] px-2 py-0.5 rounded-full text-white">
                      {site.state}
                    </span>
                  </div>

                  <h4 className="text-sm font-normal text-white tracking-[-0.02em]">
                    {site.name}
                  </h4>
                  <p className="text-[11px] text-[#9a9a9a] font-mono mt-0.5">
                    {site.builtEra.split('(')[0]}
                  </p>

                  <div className="mt-3 space-y-1 text-[10px] font-mono text-[#bdbdbd]">
                    <div className="truncate">🧱 {site.material}</div>
                    <div className="truncate">🌋 {site.seismicZone}</div>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#1a1a1a] flex justify-between items-center text-[10px] font-mono">
                  <span className="text-[#9a9a9a]">
                    Health: <strong className="text-white">{site.healthScore}/100</strong>
                  </span>
                  <span className={`px-2 py-0.5 rounded-full uppercase font-semibold ${
                    site.status === 'Critical' ? 'text-[#ffb829] bg-[#ffb829]/10' : 'text-[#8052ff] bg-[#8052ff]/10'
                  }`}>
                    {site.status}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
}
