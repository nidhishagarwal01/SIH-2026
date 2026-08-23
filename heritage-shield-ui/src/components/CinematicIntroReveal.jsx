import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
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
  // 5. ✨ PULSING RUSTY TERRACOTTA LIGHT WAVE ON "ENTER PLATFORM" CLICK
  // ---------------------------------------------------------------------------
  const handleEnter = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 650);
  };

  // 12 Distinct Monuments arranged across Left and Right Split Shutters
  const leftMonuments = [
    { name: "Khajuraho Group", era: "950 CE", img: "/monuments/khajuraho.jpg" },
    { name: "Hampi Monument Complex", era: "1336 CE", img: "/monuments/hampi.jpg" },
    { name: "Ellora Rock Caves", era: "600 CE", img: "/monuments/ellora.jpg" },
    { name: "Ajanta Fresco Caves", era: "2nd BCE", img: "/monuments/ajanta.jpg" },
    { name: "Sanchi Great Stupa", era: "3rd BCE", img: "/monuments/sanchi.jpg" },
    { name: "Golconda Fort", era: "1518 CE", img: "/monuments/golconda.jpg" }
  ];

  const rightMonuments = [
    { name: "Taj Mahal", era: "1632 CE", img: "/monuments/taj_mahal.jpg" },
    { name: "Konark Sun Temple", era: "1250 CE", img: "/monuments/konark.jpg" },
    { name: "Brihadisvara Temple", era: "1010 CE", img: "/monuments/chola_temple.jpg" },
    { name: "Qutub Minar", era: "1192 CE", img: "/monuments/qutub_minar.jpg" },
    { name: "Rani Ki Vav Stepwell", era: "1063 CE", img: "/monuments/rani_ki_vav.jpg" },
    { name: "Dholavira Citadel", era: "3000 BCE", img: "/monuments/dholavira.jpg" }
  ];

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="fixed inset-0 z-[100000] bg-[#FAF6F0] flex items-center justify-center overflow-hidden select-none overscroll-none touch-none pointer-events-auto"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] } }}
      style={{ perspective: 1400 }}
    >
      {/* 5. ✨ Expanding Rusty Amber Light Wave Shockwave */}
      {isTransitioning && (
        <motion.div
          initial={{ scale: 0.1, opacity: 0.95 }}
          animate={{ scale: 4.8, opacity: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-r from-[#C85A32] via-[#E06D44] to-[#FAF6F0] pointer-events-none blur-2xl z-50"
        />
      )}

      {/* ========================================================================= */}
      {/* 🏛️ 1. 3D APERTURE SPLIT PANELS (12-MONUMENT RUSTY MOSAIC SHUTTERS)        */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 flex pointer-events-none z-10" style={{ transformStyle: 'preserve-3d' }}>
        
        {/* 🏛️ Left 3D Shutter (6 Monuments Mosaic) */}
        <motion.div
          className="w-1/2 h-full relative overflow-hidden bg-[#F5EDE4] border-r border-[#C85A32]/60 shadow-2xl origin-left"
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
          {/* Multi-Monument Mosaic Grid with 3. 🎬 Cinematic Ken Burns Push-In */}
          <motion.div 
            animate={isSplit ? { scale: 1.08 } : { scale: 1 }}
            transition={{ duration: 3.5, ease: "easeOut" }}
            className="absolute inset-0 grid grid-cols-2 grid-rows-3 h-full w-full gap-1 p-1 bg-[#23150D]"
          >
            {leftMonuments.map((mon, idx) => (
              <div key={idx} className="relative overflow-hidden bg-[#2B1810] border border-[#C85A32]/30 rounded-sm">
                <img
                  src={mon.img}
                  alt={mon.name}
                  className="w-full h-full object-cover filter brightness-[0.88] contrast-110 sepia-[0.25]"
                />
                {/* Rusty Terracotta Ambient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#23150D]/90 via-[#8B4513]/30 to-transparent" />
                <div className="absolute inset-0 bg-[#C85A32]/15 mix-blend-color-burn" />
                <div className="absolute bottom-2 left-2 right-2">
                  <span className="text-[8px] font-mono text-[#D4AF37] uppercase font-bold tracking-widest block">{mon.era}</span>
                  <span className="text-[11px] font-serif font-bold text-[#FAF6F0] leading-tight block truncate">{mon.name}</span>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Shutter Atmospheric Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#23150D]/70 via-transparent to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-[#C85A32]/12 mix-blend-color-burn pointer-events-none" />

          {/* Shutter Golden & Rusty Edge Glow Accent */}
          <motion.div
            className="absolute right-0 top-0 bottom-0 w-[2.5px] bg-gradient-to-b from-[#FFA57E] via-[#E06D44] via-[#C85A32] to-[#C5A059] shadow-[0_0_18px_#E06D44]"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* 4. 🧲 Cursor-Reactive Seam Flare */}
          {!isSplit && (
            <motion.div
              style={{ top: smoothMouseY }}
              className="absolute right-[-14px] w-7 h-28 rounded-full bg-gradient-to-b from-[#FFA57E] via-[#E06D44] to-[#C85A32] blur-md opacity-90 pointer-events-none -translate-y-1/2"
            />
          )}
        </motion.div>

        {/* 🏛️ Right 3D Shutter (6 Monuments Mosaic) */}
        <motion.div
          className="w-1/2 h-full relative overflow-hidden bg-[#F5EDE4] border-l border-[#C85A32]/60 shadow-2xl origin-right"
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
          {/* Multi-Monument Mosaic Grid with 3. 🎬 Cinematic Ken Burns Push-In */}
          <motion.div 
            animate={isSplit ? { scale: 1.08 } : { scale: 1 }}
            transition={{ duration: 3.5, ease: "easeOut" }}
            className="absolute inset-0 grid grid-cols-2 grid-rows-3 h-full w-full gap-1 p-1 bg-[#23150D]"
          >
            {rightMonuments.map((mon, idx) => (
              <div key={idx} className="relative overflow-hidden bg-[#2B1810] border border-[#C85A32]/30 rounded-sm">
                <img
                  src={mon.img}
                  alt={mon.name}
                  className="w-full h-full object-cover filter brightness-[0.88] contrast-110 sepia-[0.25]"
                />
                {/* Rusty Terracotta Ambient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#23150D]/90 via-[#8B4513]/30 to-transparent" />
                <div className="absolute inset-0 bg-[#C85A32]/15 mix-blend-color-burn" />
                <div className="absolute bottom-2 left-2 right-2">
                  <span className="text-[8px] font-mono text-[#D4AF37] uppercase font-bold tracking-widest block">{mon.era}</span>
                  <span className="text-[11px] font-serif font-bold text-[#FAF6F0] leading-tight block truncate">{mon.name}</span>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Shutter Atmospheric Overlays */}
          <div className="absolute inset-0 bg-gradient-to-l from-[#23150D]/70 via-transparent to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-[#C85A32]/12 mix-blend-color-burn pointer-events-none" />

          {/* Shutter Golden & Rusty Edge Glow Accent */}
          <motion.div
            className="absolute left-0 top-0 bottom-0 w-[2.5px] bg-gradient-to-b from-[#FFA57E] via-[#E06D44] via-[#C85A32] to-[#C5A059] shadow-[0_0_18px_#E06D44]"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* 4. 🧲 Cursor-Reactive Seam Flare */}
          {!isSplit && (
            <motion.div
              style={{ top: smoothMouseY }}
              className="absolute left-[-14px] w-7 h-28 rounded-full bg-gradient-to-b from-[#FFA57E] via-[#E06D44] to-[#C85A32] blur-md opacity-90 pointer-events-none -translate-y-1/2"
            />
          )}
        </motion.div>

      </div>

      {/* ========================================================================= */}
      {/* 🌟 2. RUSTY PARCHMENT AMBIENCE & RADIANT LIGHT FLARES                      */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 museum-spotlight opacity-80 pointer-events-none" />
      
      {/* Radial Sandstone Rust-Gold Flare */}
      <div 
        className="absolute w-[700px] h-[700px] rounded-full pointer-events-none blur-[110px] opacity-35 animate-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(200, 90, 50, 0.45) 0%, rgba(224, 109, 68, 0.25) 40%, rgba(197, 160, 89, 0.15) 60%, transparent 75%)'
        }}
      />

      {/* Floating 3D Heritage Amber Dust Motes */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(18)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#E06D44]"
            style={{
              width: (i % 3) + 2,
              height: (i % 3) + 2,
              top: `${(i * 17 + 5) % 100}%`,
              left: `${(i * 23 + 7) % 100}%`,
              opacity: 0.2 + (i % 3) * 0.15,
              boxShadow: '0 0 8px rgba(224, 109, 68, 0.7)'
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
      {/* 🛡️ 3. RISING RUSTY & IVORY EMBLEM CARD WITH ASHOKA MANDALA HALO           */}
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
            <svg viewBox="0 0 260 260" className="w-full h-full opacity-45 filter drop-shadow-[0_0_18px_rgba(200,90,50,0.5)]">
              <circle cx="130" cy="130" r="115" stroke="#C5A059" strokeWidth="1.2" strokeDasharray="4 4" fill="none" />
              <circle cx="130" cy="130" r="100" stroke="#C85A32" strokeWidth="1.8" fill="none" opacity="0.85" />
              <circle cx="130" cy="130" r="88" stroke="#D4AF37" strokeWidth="0.8" fill="none" opacity="0.65" />
              
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
                    strokeWidth="1.4"
                    opacity="0.8"
                  />
                );
              })}
            </svg>
          </motion.div>

          {/* Outer Pulsing Rusty Aura */}
          <div className="absolute -inset-8 rounded-full bg-gradient-to-r from-[#C85A32]/35 via-[#E06D44]/30 to-[#8B4513]/30 blur-2xl animate-pulse" />
          
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
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-[#23150D] tracking-tight leading-none">
            HERITAGE <span className="text-[#C85A32]">SHIELD</span>
          </h1>
          <p className="text-sm sm:text-lg text-[#5A3825] font-sans leading-relaxed max-w-2xl mx-auto font-medium">
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
          {/* Main High-Impact CTA Button in Rich Rusty Amber & Gold Foil Border */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleEnter}
            disabled={isTransitioning}
            className="px-10 py-4 rounded-2xl bg-gradient-to-r from-[#C85A32] via-[#E06D44] to-[#B84A28] text-white border border-[#D4AF37]/50 font-mono text-xs font-bold tracking-widest uppercase transition-all flex items-center gap-3 cursor-pointer shadow-xl relative overflow-hidden group hover:shadow-[#C85A32]/40"
          >
            {/* Shimmer Glint */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-1000 transition-transform bg-gradient-to-r from-transparent via-white/25 to-transparent" />
            
            <span>{isTransitioning ? 'Entering Platform...' : 'Enter Platform'}</span>
            <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${isTransitioning ? 'translate-x-1.5' : ''}`} />
          </motion.button>
        </motion.div>

      </div>
    </motion.div>
  );
}
