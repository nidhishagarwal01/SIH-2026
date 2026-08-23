import React from 'react';

/**
 * 🏛️ HERITAGE SHIELD OFFICIAL ROYAL EMBLEM
 * Masterfully blends the sovereign protective shield, traditional Indian temple architecture,
 * Ashoka solar mandala rays, and digital twin triangulation mesh lines.
 */
export default function HeritageShieldLogo({ 
  size = 'md', // 'xs' (24px) | 'sm' (32px) | 'md' (40px) | 'lg' (56px) | 'xl' (72px) | '2xl' (96px)
  showText = false,
  textClassName = '',
  className = '',
  onClick
}) {
  const sizeMap = {
    xs: { icon: 24, text: 'text-xs', spacing: 'gap-1.5' },
    sm: { icon: 32, text: 'text-sm', spacing: 'gap-2' },
    md: { icon: 42, text: 'text-base', spacing: 'gap-3' },
    lg: { icon: 56, text: 'text-lg', spacing: 'gap-3.5' },
    xl: { icon: 72, text: 'text-xl', spacing: 'gap-4' },
    '2xl': { icon: 96, text: 'text-2xl', spacing: 'gap-5' },
  };

  const dim = sizeMap[size] || sizeMap.md;

  return (
    <div 
      onClick={onClick}
      className={`inline-flex items-center ${dim.spacing} select-none ${onClick ? 'cursor-pointer group' : ''} ${className}`}
      title="Heritage Shield · National Digital Twin"
    >
      {/* 🛡️ Royal Vector Shield Emblem */}
      <div 
        className="relative shrink-0 flex items-center justify-center transition-all duration-300 group-hover:scale-105"
        style={{ width: dim.icon, height: dim.icon }}
      >
        <svg 
          viewBox="0 0 100 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_8px_20px_rgba(224,109,68,0.35)] filter hover:drop-shadow-[0_8px_25px_rgba(212,175,55,0.45)] transition-all"
        >
          <defs>
            {/* 1. Terracotta to Royal Gold Imperial Gradient */}
            <linearGradient id="hsImperialGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFA57E" />
              <stop offset="25%" stopColor="#E06D44" />
              <stop offset="60%" stopColor="#C85A32" />
              <stop offset="85%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#F5E6CC" />
            </linearGradient>

            {/* 2. Bevel Accent Highlight */}
            <linearGradient id="hsBevelGleam" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFF2DC" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#E06D44" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#07080B" stopOpacity="0.8" />
            </linearGradient>

            {/* 3. Deep Obsidian Shield Bed */}
            <radialGradient id="hsObsidianBed" cx="50%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#1E2333" />
              <stop offset="50%" stopColor="#0E111A" />
              <stop offset="100%" stopColor="#06070A" />
            </radialGradient>

            {/* 4. Radiant AI Cyan / Topaz Pulse */}
            <linearGradient id="hsPulseApex" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>

            {/* 5. Gold Glow Filter */}
            <filter id="hsGlowEmblem" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* 1. Outer Majestic Heraldic Shield Rim */}
          <path
            d="M50 4 L88 18 C88 54 74 82 50 96 C26 82 12 54 12 18 Z"
            fill="url(#hsImperialGold)"
            stroke="#FFA57E"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />

          {/* 2. Inner Bevel Inset Layer */}
          <path
            d="M50 8 L84 21 C84 51 71 78 50 91 C29 78 16 51 16 21 Z"
            fill="url(#hsBevelGleam)"
            opacity="0.6"
          />

          {/* 3. Deep Obsidian Core Bed */}
          <path
            d="M50 11 L81 23 C81 49 69 74 50 86 C31 74 19 49 19 23 Z"
            fill="url(#hsObsidianBed)"
            stroke="#2B3347"
            strokeWidth="1.2"
          />

          {/* 4. Solar Radial Mandala Rays (Architecture & Heritage Soul) */}
          <g opacity="0.25" stroke="url(#hsImperialGold)" strokeWidth="0.8">
            <line x1="50" y1="48" x2="50" y2="24" />
            <line x1="50" y1="48" x2="68" y2="34" />
            <line x1="50" y1="48" x2="74" y2="48" />
            <line x1="50" y1="48" x2="68" y2="62" />
            <line x1="50" y1="48" x2="50" y2="72" />
            <line x1="50" y1="48" x2="32" y2="62" />
            <line x1="50" y1="48" x2="26" y2="48" />
            <line x1="50" y1="48" x2="32" y2="34" />
            <circle cx="50" cy="48" r="18" fill="none" strokeDasharray="1.5 2" />
          </g>

          {/* 5. Digital Twin Triangulation Mesh Grid (Structural Simulation) */}
          <path
            d="M32 64 L50 48 L68 64 M32 64 L50 76 L68 64 M32 64 L26 48 L50 48 L74 48 L68 64"
            stroke="#E06D44"
            strokeWidth="0.75"
            opacity="0.35"
            strokeDasharray="2 1.5"
          />

          {/* 6. Grand Indian Architectural Monument Silhouette (Mandapa / Shikhara Dome) */}
          {/* Main Monument Cusped Vault Arch */}
          <path
            d="M30 68 V46 C30 46 30 30 50 20 C70 30 70 46 70 46 V68"
            stroke="url(#hsImperialGold)"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          {/* Inner Cusped Gateway Arch */}
          <path
            d="M38 68 V50 C38 42 44 36 50 32 C56 36 62 42 62 50 V68"
            stroke="#F5E6CC"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="rgba(224, 109, 68, 0.12)"
          />

          {/* Foundation Stepped Plinths */}
          <path
            d="M24 72 H76 M20 76 H80"
            stroke="url(#hsImperialGold)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* 7. Apex Finial Star & Laser Sentinel Crown (Kalasha / Star) */}
          <path
            d="M50 14 L52.5 19 L57.5 21.5 L52.5 24 L50 29 L47.5 24 L42.5 21.5 L47.5 19 Z"
            fill="url(#hsPulseApex)"
            filter="url(#hsGlowEmblem)"
          />
          <circle cx="50" cy="21.5" r="1.8" fill="#FFFFFF" />

          {/* 8. Precision Structural Digital Twin Nodes */}
          <circle cx="30" cy="46" r="2.2" fill="#E06D44" stroke="#FFF2DC" strokeWidth="0.8" />
          <circle cx="70" cy="46" r="2.2" fill="#E06D44" stroke="#FFF2DC" strokeWidth="0.8" />
          <circle cx="50" cy="32" r="2" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="0.8" />
          <circle cx="38" cy="68" r="1.5" fill="#D4AF37" />
          <circle cx="62" cy="68" r="1.5" fill="#D4AF37" />
        </svg>
      </div>

      {/* Brand Typographic Wordmark */}
      {showText && (
        <div className="flex items-center text-left">
          <span className={`font-serif font-bold tracking-wider text-[#24160E] group-hover:text-[#BA532B] transition-colors leading-none ${dim.text} ${textClassName}`}>
            HERITAGE <span className="text-[#BA532B]">SHIELD</span>
          </span>
        </div>
      )}
    </div>
  );
}
