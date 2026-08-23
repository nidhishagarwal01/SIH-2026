import React from 'react';

/**
 * 🛡️ HERITAGE SHIELD OFFICIAL EMBLEM — Dark Void Edition
 * Masterfully blends the protective shield, traditional monument silhouette,
 * and Electric Iris `#8052ff` digital twin triangulation vectors.
 */
export default function HeritageShieldLogo({ 
  size = 'md',
  showText = false,
  textClassName = '',
  className = '',
  onClick
}) {
  const sizeMap = {
    xs: { icon: 22, text: 'text-xs', spacing: 'gap-1.5' },
    sm: { icon: 28, text: 'text-sm', spacing: 'gap-2' },
    md: { icon: 38, text: 'text-base', spacing: 'gap-3' },
    lg: { icon: 50, text: 'text-lg', spacing: 'gap-3.5' },
    xl: { icon: 64, text: 'text-xl', spacing: 'gap-4' },
    '2xl': { icon: 84, text: 'text-2xl', spacing: 'gap-5' },
  };

  const dim = sizeMap[size] || sizeMap.md;

  return (
    <div 
      onClick={onClick}
      className={`inline-flex items-center ${dim.spacing} select-none ${onClick ? 'cursor-pointer group' : ''} ${className}`}
      title="Heritage Shield · National Digital Twin"
    >
      {/* 🛡️ Vector Shield Emblem */}
      <div 
        className="relative shrink-0 flex items-center justify-center transition-all duration-300 group-hover:scale-105"
        style={{ width: dim.icon, height: dim.icon }}
      >
        <svg 
          viewBox="0 0 100 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_0_18px_rgba(128,82,255,0.4)] transition-all"
        >
          <defs>
            <linearGradient id="hsIrisGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="50%" stopColor="#8052ff" />
              <stop offset="100%" stopColor="#ffb829" />
            </linearGradient>

            <radialGradient id="hsVoidBed" cx="50%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#181424" />
              <stop offset="100%" stopColor="#000000" />
            </radialGradient>
          </defs>

          {/* 1. Outer Shield Rim */}
          <path
            d="M50 4 L88 18 C88 54 74 82 50 96 C26 82 12 54 12 18 Z"
            fill="url(#hsIrisGradient)"
            stroke="#ffffff"
            strokeWidth="0.8"
            strokeLinejoin="round"
          />

          {/* 2. Void Core Bed */}
          <path
            d="M50 9 L83 22 C83 50 70 76 50 89 C30 76 17 50 17 22 Z"
            fill="url(#hsVoidBed)"
            stroke="#262626"
            strokeWidth="1.0"
          />

          {/* 3. Triangulation Mesh Grid */}
          <path
            d="M32 64 L50 48 L68 64 M32 64 L50 76 L68 64 M32 64 L26 48 L50 48 L74 48 L68 64"
            stroke="#8052ff"
            strokeWidth="0.8"
            opacity="0.5"
            strokeDasharray="2 1.5"
          />

          {/* 4. Architectural Monument Silhouette */}
          <path
            d="M30 68 V46 C30 46 30 30 50 20 C70 30 70 46 70 46 V68"
            stroke="#ffffff"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          {/* Inner Arch */}
          <path
            d="M38 68 V50 C38 42 44 36 50 32 C56 36 62 42 62 50 V68"
            stroke="#8052ff"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="rgba(128, 82, 255, 0.15)"
          />

          {/* Foundation Base Plinths */}
          <path
            d="M24 72 H76 M20 76 H80"
            stroke="#ffffff"
            strokeWidth="1.8"
            strokeLinecap="round"
          />

          {/* 5. Apex Saffron Crown */}
          <circle cx="50" cy="20" r="2.5" fill="#ffb829" />
          <circle cx="30" cy="46" r="2.0" fill="#8052ff" />
          <circle cx="70" cy="46" r="2.0" fill="#8052ff" />
        </svg>
      </div>

      {/* Wordmark */}
      {showText && (
        <div className="flex items-center text-left">
          <span className={`font-normal tracking-[-0.03em] text-white group-hover:text-[#8052ff] transition-colors leading-none ${dim.text} ${textClassName}`}>
            HERITAGE <span className="text-[#8052ff] font-medium">SHIELD</span>
          </span>
        </div>
      )}
    </div>
  );
}
