import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Maximize2, Sparkles, Layers, Compass, Play } from 'lucide-react';

export default function CinematicScrollShowcase() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <div className="relative w-full rounded-3xl overflow-hidden border border-[#DACDB8] bg-[#0C0E16] shadow-2xl">
      {/* Header Bar */}
      <div className="bg-[#07080B] border-b border-white/10 px-6 py-4 flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#BA532B]/20 border border-[#BA532B]/40 flex items-center justify-center text-lg">
            🏛️
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[#BA532B] font-bold uppercase tracking-wider">
                Immersive 3D Spatial Storytelling
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-950/70 text-amber-300 border border-amber-800/60 font-semibold">
                ● 7-Layer Parallax Engine
              </span>
            </div>
            <h3 className="text-base font-serif font-bold text-[#F0E7DA]">
              Konark Sun Temple · 3D Spatial Cinematic Scroll Experience
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/konark-cinematic/index.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono px-4 py-2 rounded-xl bg-[#BA532B] text-white font-bold hover:bg-[#A34520] transition flex items-center gap-2 shadow-lg cursor-pointer"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Launch Standalone Experience ↗</span>
          </a>
        </div>
      </div>

      {/* Embedded Live Parallax Stage */}
      <div className="relative w-full h-[620px] bg-[#0B1110] overflow-hidden">
        <iframe
          src="/konark-cinematic/index.html"
          title="Konark Sun Temple Cinematic 3D Experience"
          className="w-full h-full border-0"
          loading="lazy"
        />
      </div>

      {/* Bottom Telemetry Bar */}
      <div className="bg-[#07080B] border-t border-white/10 px-6 py-3 flex flex-wrap justify-between items-center gap-4 text-xs font-mono text-gray-400">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5 text-gray-300">
            <Compass className="w-3.5 h-3.5 text-[#BA532B]" />
            <span>Scrub to fly through layers (0–3700px)</span>
          </span>
          <span className="flex items-center gap-1.5 text-gray-300">
            <Layers className="w-3.5 h-3.5 text-[#C29244]" />
            <span>Ogg Medium Typography · Dynamic Multi-Epoch Sights</span>
          </span>
        </div>

        <div className="flex items-center gap-3 text-[11px]">
          <span className="text-emerald-400 font-semibold">✔ 60fps Native GPU Shading</span>
          <span>•</span>
          <span>Zero External Frameworks</span>
        </div>
      </div>
    </div>
  );
}
