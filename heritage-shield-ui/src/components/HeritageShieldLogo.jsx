import React from 'react';

/**
 * 🏛️ HERITAGE SHIELD OFFICIAL LOGO
 * Unifies the heraldic protective shield silhouette with traditional Indian
 * architectural cusped arches and modern digital twin vertex geometry.
 */
export default function HeritageShieldLogo({ 
  size = 'md', // 'xs' (24px) | 'sm' (32px) | 'md' (40px) | 'lg' (52px) | 'xl' (64px)
  showText = false,
  textClassName = '',
  className = '',
  onClick
}) {
  const sizeMap = {
    xs: { icon: 24, text: 'text-xs', spacing: 'gap-1.5' },
    sm: { icon: 32, text: 'text-sm', spacing: 'gap-2' },
    md: { icon: 40, text: 'text-base', spacing: 'gap-3' },
    lg: { icon: 52, text: 'text-lg', spacing: 'gap-3.5' },
    xl: { icon: 64, text: 'text-xl', spacing: 'gap-4' },
  };

  const dim = sizeMap[size] || sizeMap.md;

  return (
    <div 
      onClick={onClick}
      className={`inline-flex items-center ${dim.spacing} select-none ${onClick ? 'cursor-pointer group' : ''} ${className}`}
      title="Heritage Shield"
    >
      {/* Vector Shield Emblem */}
      <div 
        className="relative shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
        style={{ width: dim.icon, height: dim.icon }}
      >
        <svg 
          viewBox="0 0 100 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_4px_12px_rgba(197,160,89,0.3)]"
        >
          <defs>
            {/* Outer Gold Gradient */}
            <linearGradient id="hsGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#DFB76C" />
              <stop offset="35%" stopColor="#C5A059" />
              <stop offset="70%" stopColor="#8C6D38" />
              <stop offset="100%" stopColor="#4A3718" />
            </linearGradient>

            {/* Inner Dark Radial */}
            <radialGradient id="hsInnerRadial" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#1A1E26" />
              <stop offset="75%" stopColor="#0E1013" />
              <stop offset="100%" stopColor="#07080A" />
            </radialGradient>

            {/* Patina & Cyan Sentinel Accent */}
            <linearGradient id="hsCyanPatina" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="50%" stopColor="#63917E" />
              <stop offset="100%" stopColor="#C5A059" />
            </linearGradient>

            {/* Glow Filter */}
            <filter id="hsGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* 1. Outer Shield Silhouette Frame */}
          <path
            d="M50 6 L86 20 C86 52 72 78 50 94 C28 78 14 52 14 20 Z"
            fill="url(#hsGoldGrad)"
            stroke="#DFB76C"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />

          {/* 2. Inner Dark Shield Bed */}
          <path
            d="M50 11 L81 23 C81 50 69 73 50 87 C31 73 19 50 19 23 Z"
            fill="url(#hsInnerRadial)"
            stroke="#2B313D"
            strokeWidth="1"
          />

          {/* 3. Subtle Digital Grid Lines */}
          <path
            d="M30 46 L70 46 M50 25 L50 78 M36 60 L64 60"
            stroke="#C5A059"
            strokeWidth="0.75"
            strokeDasharray="2 2"
            opacity="0.35"
          />

          {/* 4. Heritage Architectural Monument Arch & Dome */}
          {/* Main Cusped Monument Gateway / Dome */}
          <path
            d="M32 68 V46 C32 46 32 32 50 22 C68 32 68 46 68 46 V68"
            stroke="url(#hsGoldGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          {/* Inner Cusped Arch Portal */}
          <path
            d="M40 68 V52 C40 44 45 38 50 34 C55 38 60 44 60 52 V68"
            stroke="#DFB76C"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="rgba(197, 160, 89, 0.08)"
          />

          {/* Base Plinth / Foundation Steps */}
          <path
            d="M26 73 H74 M22 78 H78"
            stroke="url(#hsGoldGrad)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* 5. Central AI Sentinel Pulse Apex (Finial / Star) */}
          <path
            d="M50 16 L52 20 L56 22 L52 24 L50 28 L48 24 L44 22 L48 20 Z"
            fill="#38BDF8"
            filter="url(#hsGlow)"
          />
          <circle cx="50" cy="22" r="1.5" fill="#FFFFFF" />

          {/* 6. Precision Digital Twin Vertex Nodes */}
          <circle cx="32" cy="46" r="2" fill="#C5A059" stroke="#0E1013" strokeWidth="0.75" />
          <circle cx="68" cy="46" r="2" fill="#C5A059" stroke="#0E1013" strokeWidth="0.75" />
          <circle cx="50" cy="34" r="2" fill="#38BDF8" stroke="#0E1013" strokeWidth="0.75" />
          <circle cx="40" cy="52" r="1.5" fill="#C5A059" />
          <circle cx="60" cy="52" r="1.5" fill="#C5A059" />
        </svg>
      </div>

      {/* Brand Typographic Wordmark */}
      {showText && (
        <div className="flex flex-col">
          <span className={`font-serif font-black tracking-wide text-white group-hover:text-[#C5A059] transition-colors leading-none ${dim.text} ${textClassName}`}>
            HERITAGE SHIELD
          </span>
        </div>
      )}
    </div>
  );
}
