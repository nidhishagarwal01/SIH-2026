import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import HeritageShieldLogo from './HeritageShieldLogo';

export default function CinematicIntroReveal({ onComplete }) {
  // Smooth split aperture animation immediately on mount
  const [isSplit, setIsSplit] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    // 🔒 Lock background scrolling completely on macOS & Mobile
    const originalOverflow = document.body.style.overflow;
    const originalTouchAction = document.body.style.touchAction;

    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';
    window.scrollTo(0, 0);

    const preventScroll = (e) => {
      e.preventDefault();
    };

    window.addEventListener('wheel', preventScroll, { passive: false });
    window.addEventListener('touchmove', preventScroll, { passive: false });

    // Start 3D split immediately upon load (100ms)
    const t1 = setTimeout(() => {
      setIsSplit(true);
    }, 100);

    // Reveal the Heritage Shield Center & Entrance (700ms)
    const t2 = setTimeout(() => {
      setIsRevealed(true);
    }, 700);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        if (onComplete) onComplete();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      document.body.style.overflow = originalOverflow;
      document.body.style.touchAction = originalTouchAction;
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    };
  }, [onComplete]);

  const handleEnter = () => {
    if (onComplete) onComplete();
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100000] bg-[#FDFBF7] flex items-center justify-center overflow-hidden select-none overscroll-none touch-none pointer-events-auto"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
      style={{ perspective: 1400 }}
    >
      {/* ========================================================================= */}
      {/* 🏛️ 1. 3D APERTURE SPLIT PANELS (HERITAGE MONUMENT MOSAIC SHUTTERS)        */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 flex pointer-events-none z-10" style={{ transformStyle: 'preserve-3d' }}>
        
        {/* 🏛️ Left 3D Shutter (Khajuraho & Hampi Heritage Imagery) */}
        <motion.div
          className="w-1/2 h-full relative overflow-hidden bg-[#FAF7F2] border-r border-[#E06D44]/40 shadow-2xl origin-left"
          initial={{ x: "0%", rotateY: 0, filter: "brightness(0.95)" }}
          animate={{
            x: isSplit ? "-102%" : "0%",
            rotateY: isSplit ? -20 : 0,
            filter: isSplit ? "brightness(0.7)" : "brightness(0.95)"
          }}
          transition={{
            duration: 1.6,
            ease: [0.76, 0, 0.24, 1]
          }}
        >
          {/* Dual Monument Composite */}
          <div className="absolute inset-0 grid grid-rows-2 h-full w-[200%] max-w-none">
            <div className="relative h-full overflow-hidden">
              <img
                src="/monuments/khajuraho.jpg"
                alt="Khajuraho Sandstone Relief"
                className="w-full h-full object-cover object-left filter brightness-[0.85] contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
            </div>
            <div className="relative h-full overflow-hidden">
              <img
                src="/monuments/hampi.jpg"
                alt="Hampi Stone Chariot"
                className="w-full h-full object-cover object-left filter brightness-[0.8] contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
            </div>
          </div>

          {/* Shutter Atmospheric Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0E1B2E]/60 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[#E06D44]/10 mix-blend-color-burn pointer-events-none" />

          {/* Shutter Golden Edge Glow Accent */}
          <motion.div
            className="absolute right-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#FFA57E] via-[#E06D44] to-[#C5A059] shadow-[0_0_15px_#E06D44]"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        {/* 🏛️ Right 3D Shutter (Taj Mahal & Konark Sun Temple Imagery) */}
        <motion.div
          className="w-1/2 h-full relative overflow-hidden bg-[#FAF7F2] border-l border-[#E06D44]/40 shadow-2xl origin-right"
          initial={{ x: "0%", rotateY: 0, filter: "brightness(0.95)" }}
          animate={{
            x: isSplit ? "102%" : "0%",
            rotateY: isSplit ? 20 : 0,
            filter: isSplit ? "brightness(0.7)" : "brightness(0.95)"
          }}
          transition={{
            duration: 1.6,
            ease: [0.76, 0, 0.24, 1]
          }}
        >
          {/* Dual Monument Composite */}
          <div className="absolute inset-0 grid grid-rows-2 h-full w-[200%] max-w-none -translate-x-1/2">
            <div className="relative h-full overflow-hidden">
              <img
                src="/monuments/taj_mahal.jpg"
                alt="Taj Mahal White Marble"
                className="w-full h-full object-cover object-right filter brightness-[0.85] contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-black/60 via-transparent to-transparent" />
            </div>
            <div className="relative h-full overflow-hidden">
              <img
                src="/monuments/konark.jpg"
                alt="Konark Sun Temple Wheel"
                className="w-full h-full object-cover object-right filter brightness-[0.8] contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-black/60 via-transparent to-transparent" />
            </div>
          </div>

          {/* Shutter Atmospheric Overlays */}
          <div className="absolute inset-0 bg-gradient-to-l from-[#0E1B2E]/60 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[#E06D44]/10 mix-blend-color-burn pointer-events-none" />

          {/* Shutter Golden Edge Glow Accent */}
          <motion.div
            className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#FFA57E] via-[#E06D44] to-[#C5A059] shadow-[0_0_15px_#E06D44]"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

      </div>

      {/* ========================================================================= */}
      {/* 🌟 2. CINEMATIC BACKGROUND AMBIENCE & RADIANT LIGHT RAYS                   */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 museum-spotlight opacity-70 pointer-events-none" />
      
      {/* Radial Sandstone Gold Flare */}
      <div 
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none blur-[90px] opacity-25 animate-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(224, 109, 68, 0.35) 0%, rgba(197, 160, 89, 0.15) 50%, transparent 75%)'
        }}
      />

      {/* Floating 3D Heritage Dust Motes */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(16)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#E06D44]"
            style={{
              width: (i % 3) + 2,
              height: (i % 3) + 2,
              top: `${(i * 17 + 5) % 100}%`,
              left: `${(i * 23 + 7) % 100}%`,
              opacity: 0.2 + (i % 3) * 0.15,
              boxShadow: '0 0 6px rgba(224, 109, 68, 0.6)'
            }}
            animate={{
              y: [0, -35, 0],
              x: [0, i % 2 === 0 ? 15 : -15, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 7 + (i % 4) * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* ========================================================================= */}
      {/* 🛡️ 3. RISING 3D HERITAGE SHIELD EMBLEM & USER CONTROLLED PORTAL CTA        */}
      {/* ========================================================================= */}
      <div className="relative z-30 flex flex-col items-center justify-center text-center px-6 max-w-4xl space-y-6">
        
        {/* 🏛️ Official Royal Logo Emblem */}
        <motion.div
          initial={{ opacity: 0, y: 80, scale: 0.7, rotateX: 20 }}
          animate={{
            opacity: isRevealed ? 1 : 0,
            y: isRevealed ? 0 : 80,
            scale: isRevealed ? 1 : 0.7,
            rotateX: isRevealed ? 0 : 20
          }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="relative group cursor-pointer"
          onClick={handleEnter}
        >
          {/* Outer Pulsing Halo */}
          <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-[#E06D44]/25 via-[#C5A059]/20 to-[#0E1B2E]/25 blur-2xl animate-pulse" />
          
          <HeritageShieldLogo size="2xl" showText={false} />
        </motion.div>

        {/* 🏛️ Grand Monolithic Title */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{
            opacity: isRevealed ? 1 : 0,
            y: isRevealed ? 0 : 60
          }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-3"
        >
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-[#0E1B2E] tracking-tight leading-none">
            HERITAGE <span className="text-[#E06D44]">SHIELD</span>
          </h1>
          <p className="text-sm sm:text-lg text-[#334155] font-sans leading-relaxed max-w-2xl mx-auto">
            Preserving India's Architectural Soul Through Living Digital Twins & Autonomous Intelligence
          </p>
        </motion.div>

        {/* 🚀 4. USER CONTROLLED TACTILE ACTION */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{
            opacity: isRevealed ? 1 : 0,
            y: isRevealed ? 0 : 40,
            scale: isRevealed ? 1 : 0.9
          }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="pt-4 flex flex-col sm:flex-row items-center gap-4"
        >
          {/* Main High-Impact CTA Button */}
          <button
            onClick={handleEnter}
            className="px-9 py-4 rounded-2xl terracotta-btn font-mono text-xs font-bold tracking-widest uppercase transition-all flex items-center gap-3 cursor-pointer shadow-lg hover:scale-105"
          >
            <span>Enter Platform</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>

      </div>
    </motion.div>
  );
}
