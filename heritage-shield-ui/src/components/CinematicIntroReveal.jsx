import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import HeritageShieldLogo from './HeritageShieldLogo';

export default function CinematicIntroReveal({ onComplete }) {
  // 3D Split Aperture States
  const [isSplit, setIsSplit] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef(null);

  // ---------------------------------------------------------------------------
  // 4. 🧲 INTERACTIVE CURSOR-REACTIVE SEAM GLOW
  // ---------------------------------------------------------------------------
  const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 400);
  const smoothMouseY = useSpring(mouseY, { damping: 25, stiffness: 120 });

  const handleMouseMove = (e) => {
    mouseY.set(e.clientY);
  };

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
        handleEnter();
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

  // ---------------------------------------------------------------------------
  // 5. ✨ PULSING LIGHT WAVE ON "ENTER PLATFORM" CLICK
  // ---------------------------------------------------------------------------
  const handleEnter = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 650);
  };

  // 12 Distinct Monuments arranged across Left and Right Split Shutters (Pure Imagery)
  const leftMonuments = [
    { img: "/monuments/khajuraho.jpg" },
    { img: "/monuments/hampi.jpg" },
    { img: "/monuments/ellora.jpg" },
    { img: "/monuments/ajanta.jpg" },
    { img: "/monuments/sanchi.jpg" },
    { img: "/monuments/golconda.jpg" }
  ];

  const rightMonuments = [
    { img: "/monuments/taj_mahal.jpg" },
    { img: "/monuments/konark.jpg" },
    { img: "/monuments/chola_temple.jpg" },
    { img: "/monuments/qutub_minar.jpg" },
    { img: "/monuments/rani_ki_vav.jpg" },
    { img: "/monuments/dholavira.jpg" }
  ];

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="fixed inset-0 z-[100000] bg-[#FDFBF7] flex items-center justify-center overflow-hidden select-none overscroll-none touch-none pointer-events-auto"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] } }}
      style={{ perspective: 1400 }}
    >
      {/* 5. ✨ Expanding Amber Light Wave Shockwave */}
      {isTransitioning && (
        <motion.div
          initial={{ scale: 0.1, opacity: 0.95 }}
          animate={{ scale: 4.8, opacity: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-r from-[#E06D44] via-[#C5A059] to-[#FDFBF7] pointer-events-none blur-2xl z-50"
        />
      )}

      {/* ========================================================================= */}
      {/* 🏛️ 1. 3D APERTURE SPLIT PANELS (12-MONUMENT GALLERY MOSAIC SHUTTERS)      */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 flex pointer-events-none z-10" style={{ transformStyle: 'preserve-3d' }}>
        
        {/* 🏛️ Left 3D Shutter (6 Monuments Mosaic) */}
        <motion.div
          className="w-1/2 h-full relative overflow-hidden bg-[#FAF7F2] border-r border-[#E06D44]/40 shadow-2xl origin-left"
          initial={{ x: "0%", rotateY: 0, filter: "brightness(0.98)" }}
          animate={{
            x: isSplit ? "-102%" : "0%",
            rotateY: isSplit ? -20 : 0,
            filter: isSplit ? "brightness(0.75)" : "brightness(0.98)"
          }}
          transition={{
            duration: 1.6,
            ease: [0.76, 0, 0.24, 1]
          }}
        >
          {/* Multi-Monument Mosaic Grid with 3. 🎬 Cinematic Ken Burns Push-In */}
          <motion.div 
            animate={isSplit ? { scale: 1.08 } : { scale: 1 }}
            transition={{ duration: 3.5, ease: "easeOut" }}
            className="absolute inset-0 grid grid-cols-2 grid-rows-3 h-full w-full gap-1.5 p-1.5 bg-[#FAF7F2]"
          >
            {leftMonuments.map((mon, idx) => (
              <div key={idx} className="relative overflow-hidden bg-[#FAF7F2] border border-[#EDE6DA] rounded-lg shadow-sm">
                <img
                  src={mon.img}
                  alt="Heritage Monument"
                  className="w-full h-full object-cover filter brightness-[0.95] contrast-105 hover:scale-105 transition-transform duration-700"
                />
                {/* Subtle Amber Edge Shadow */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />
              </div>
            ))}
          </motion.div>

          {/* Shutter Atmospheric Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0E1B2E]/40 via-transparent to-transparent pointer-events-none" />

          {/* Shutter Golden & Amber Edge Glow Accent */}
          <motion.div
            className="absolute right-0 top-0 bottom-0 w-[2.5px] bg-gradient-to-b from-[#FFA57E] via-[#E06D44] to-[#C5A059] shadow-[0_0_15px_#E06D44]"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* 4. 🧲 Cursor-Reactive Seam Flare */}
          {!isSplit && (
            <motion.div
              style={{ top: smoothMouseY }}
              className="absolute right-[-14px] w-7 h-28 rounded-full bg-gradient-to-b from-[#FFA57E] via-[#E06D44] to-[#C5A059] blur-md opacity-90 pointer-events-none -translate-y-1/2"
            />
          )}
        </motion.div>

        {/* 🏛️ Right 3D Shutter (6 Monuments Mosaic) */}
        <motion.div
          className="w-1/2 h-full relative overflow-hidden bg-[#FAF7F2] border-l border-[#E06D44]/40 shadow-2xl origin-right"
          initial={{ x: "0%", rotateY: 0, filter: "brightness(0.98)" }}
          animate={{
            x: isSplit ? "102%" : "0%",
            rotateY: isSplit ? 20 : 0,
            filter: isSplit ? "brightness(0.75)" : "brightness(0.98)"
          }}
          transition={{
            duration: 1.6,
            ease: [0.76, 0, 0.24, 1]
          }}
        >
          {/* Multi-Monument Mosaic Grid with 3. 🎬 Cinematic Ken Burns Push-In */}
          <motion.div 
            animate={isSplit ? { scale: 1.08 } : { scale: 1 }}
            transition={{ duration: 3.5, ease: "easeOut" }}
            className="absolute inset-0 grid grid-cols-2 grid-rows-3 h-full w-full gap-1.5 p-1.5 bg-[#FAF7F2]"
          >
            {rightMonuments.map((mon, idx) => (
              <div key={idx} className="relative overflow-hidden bg-[#FAF7F2] border border-[#EDE6DA] rounded-lg shadow-sm">
                <img
                  src={mon.img}
                  alt="Heritage Monument"
                  className="w-full h-full object-cover filter brightness-[0.95] contrast-105 hover:scale-105 transition-transform duration-700"
                />
                {/* Subtle Amber Edge Shadow */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />
              </div>
            ))}
          </motion.div>

          {/* Shutter Atmospheric Overlays */}
          <div className="absolute inset-0 bg-gradient-to-l from-[#0E1B2E]/40 via-transparent to-transparent pointer-events-none" />

          {/* Shutter Golden & Amber Edge Glow Accent */}
          <motion.div
            className="absolute left-0 top-0 bottom-0 w-[2.5px] bg-gradient-to-b from-[#FFA57E] via-[#E06D44] to-[#C5A059] shadow-[0_0_15px_#E06D44]"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* 4. 🧲 Cursor-Reactive Seam Flare */}
          {!isSplit && (
            <motion.div
              style={{ top: smoothMouseY }}
              className="absolute left-[-14px] w-7 h-28 rounded-full bg-gradient-to-b from-[#FFA57E] via-[#E06D44] to-[#C5A059] blur-md opacity-90 pointer-events-none -translate-y-1/2"
            />
          )}
        </motion.div>

      </div>

      {/* ========================================================================= */}
      {/* 🌟 2. AMBIENCE & RADIANT LIGHT FLARES                                      */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 museum-spotlight opacity-75 pointer-events-none" />
      
      {/* Radial Amber-Gold Flare */}
      <div 
        className="absolute w-[650px] h-[650px] rounded-full pointer-events-none blur-[100px] opacity-25 animate-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(224, 109, 68, 0.4) 0%, rgba(197, 160, 89, 0.2) 50%, transparent 75%)'
        }}
      />

      {/* Floating 3D Heritage Amber Dust Motes */}
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
      {/* 🛡️ 3. RISING ROYAL IVORY EMBLEM CARD WITH ASHOKA MANDALA HALO              */}
      {/* ========================================================================= */}
      <div className="relative z-30 flex flex-col items-center justify-center text-center px-6 max-w-4xl space-y-6">
        
        {/* 🏛️ Official Royal Logo Emblem with 1. ☀️ Ashoka Solar Mandala Halo */}
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
          {/* 1. ☀️ Rotating Ashoka Solar Mandala Ray Halo */}
          <motion.div
            className="absolute -inset-24 pointer-events-none flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          >
            <svg viewBox="0 0 260 260" className="w-full h-full opacity-40 filter drop-shadow-[0_0_15px_rgba(224,109,68,0.45)]">
              <circle cx="130" cy="130" r="115" stroke="#C5A059" strokeWidth="1.2" strokeDasharray="4 4" fill="none" />
              <circle cx="130" cy="130" r="100" stroke="#E06D44" strokeWidth="1.6" fill="none" opacity="0.8" />
              <circle cx="130" cy="130" r="88" stroke="#D4AF37" strokeWidth="0.8" fill="none" opacity="0.6" />
              
              {/* 24 Radiant Ashoka Sun Wheel Spoke Rays */}
              {[...Array(24)].map((_, idx) => {
                const angle = (idx * 360) / 24;
                const rad = (angle * Math.PI) / 180;
                return (
                  <line
                    key={idx}
                    x1="130"
                    y1="130"
                    x2={130 + 100 * Math.cos(rad)}
                    y2={130 + 100 * Math.sin(rad)}
                    stroke="#D4AF37"
                    strokeWidth="1.2"
                    opacity="0.75"
                  />
                );
              })}
            </svg>
          </motion.div>

          {/* Outer Pulsing Aura */}
          <div className="absolute -inset-8 rounded-full bg-gradient-to-r from-[#E06D44]/25 via-[#C5A059]/20 to-[#0E1B2E]/25 blur-2xl animate-pulse" />
          
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
          <p className="text-sm sm:text-lg text-[#334155] font-sans leading-relaxed max-w-2xl mx-auto font-normal">
            Preserving India's Architectural Soul Through Living Digital Twins & Autonomous Intelligence
          </p>
        </motion.div>

        {/* 🚀 4. USER CONTROLLED TACTILE ACTION WITH PULSING LIGHT WAVE */}
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
          {/* Main High-Impact CTA Button in Clean Terracotta & Ivory Palette */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleEnter}
            disabled={isTransitioning}
            className="px-10 py-4 rounded-2xl terracotta-btn font-mono text-xs font-bold tracking-widest uppercase transition-all flex items-center gap-3 cursor-pointer shadow-lg relative overflow-hidden group"
          >
            {/* Shimmer Glint */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-1000 transition-transform bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            
            <span>{isTransitioning ? 'Entering Platform...' : 'Enter Platform'}</span>
            <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${isTransitioning ? 'translate-x-1.5' : ''}`} />
          </motion.button>
        </motion.div>

      </div>
    </motion.div>
  );
}
