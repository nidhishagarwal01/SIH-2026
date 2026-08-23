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
  // 1. 🧭 INTERACTIVE 3D CURSOR PARALLAX & TILT SPRINGS
  // ---------------------------------------------------------------------------
  const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 600);
  const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 400);
  
  const smoothMouseY = useSpring(mouseY, { damping: 25, stiffness: 120 });
  const tiltX = useSpring(0, { damping: 22, stiffness: 110 });
  const tiltY = useSpring(0, { damping: 22, stiffness: 110 });

  const handleMouseMove = (e) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);

    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const xOffset = (e.clientX - centerX) / centerX;
      const yOffset = (e.clientY - centerY) / centerY;
      tiltY.set(xOffset * 8); // Rotate Y +/- 8 deg
      tiltX.set(-yOffset * 8); // Rotate X +/- 8 deg
    }
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

  // 12 Distinct Monuments arranged seamlessly with ZERO gaps
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
      className="fixed inset-0 z-[100000] bg-[#F0E7DA] flex items-center justify-center overflow-hidden select-none overscroll-none touch-none pointer-events-auto"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] } }}
      style={{ perspective: 1400 }}
    >
      {/* 5. ✨ Expanding Terracotta-Rust Light Wave Shockwave */}
      {isTransitioning && (
        <motion.div
          initial={{ scale: 0.1, opacity: 0.95 }}
          animate={{ scale: 4.8, opacity: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-r from-[#BA532B] via-[#C29244] to-[#F0E7DA] pointer-events-none blur-2xl z-50"
        />
      )}

      {/* ========================================================================= */}
      {/* 🏛️ 1. 3D APERTURE SPLIT PANELS (DARK RUSTY BROWN ORANGISH MOSAIC)         */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 flex pointer-events-none z-10" style={{ transformStyle: 'preserve-3d' }}>
        
        {/* 🏛️ Left 3D Shutter (6 Monuments - Dark Rusty Brownish-Orangish Tone) */}
        <motion.div
          className="w-1/2 h-full relative overflow-hidden bg-[#140B07] border-r-2 border-[#BA532B] shadow-2xl origin-left"
          initial={{ x: "0%", rotateY: 0, filter: "brightness(0.92)" }}
          animate={{
            x: isSplit ? "-102%" : "0%",
            rotateY: isSplit ? -20 : 0,
            filter: isSplit ? "brightness(0.7)" : "brightness(0.92)"
          }}
          transition={{
            duration: 1.6,
            ease: [0.76, 0, 0.24, 1]
          }}
        >
          {/* Seamless Multi-Monument Grid with Cinematic Ken Burns Push-In */}
          <motion.div 
            animate={isSplit ? { scale: 1.08 } : { scale: 1 }}
            transition={{ duration: 3.5, ease: "easeOut" }}
            className="absolute inset-0 grid grid-cols-2 grid-rows-3 h-full w-full gap-0 p-0 m-0"
          >
            {leftMonuments.map((mon, idx) => (
              <div key={idx} className="relative overflow-hidden w-full h-full p-0 m-0 bg-[#140B07]">
                <img
                  src={mon.img}
                  alt="Heritage Monument"
                  className="w-full h-full object-cover filter brightness-[0.78] contrast-[1.28] sepia-[0.38] saturate-[1.45]"
                />
                {/* Deep Rusty Brown & Terracotta Warmth Overlays */}
                <div className="absolute inset-0 bg-[#8A3816]/25 mix-blend-color-burn pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#140B07]/90 via-[#4A2010]/30 to-black/35 pointer-events-none" />
              </div>
            ))}
          </motion.div>

          {/* Shutter Atmospheric Dark Sandstone Rust Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#140B07]/75 via-[#8A3816]/20 to-transparent pointer-events-none" />

          {/* Shutter Rusty Terracotta & Bronze Laser Edge */}
          <motion.div
            className="absolute right-0 top-0 bottom-0 w-[3.5px] bg-gradient-to-b from-[#FFA57E] via-[#BA532B] via-[#C86036] to-[#C29244] shadow-[0_0_18px_#BA532B]"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Cursor-Reactive Seam Flare */}
          {!isSplit && (
            <motion.div
              style={{ top: smoothMouseY }}
              className="absolute right-[-14px] w-7 h-28 rounded-full bg-gradient-to-b from-[#FFA57E] via-[#BA532B] to-[#C29244] blur-md opacity-95 pointer-events-none -translate-y-1/2"
            />
          )}
        </motion.div>

        {/* 🏛️ Right 3D Shutter (6 Monuments - Dark Rusty Brownish-Orangish Tone) */}
        <motion.div
          className="w-1/2 h-full relative overflow-hidden bg-[#140B07] border-l-2 border-[#BA532B] shadow-2xl origin-right"
          initial={{ x: "0%", rotateY: 0, filter: "brightness(0.92)" }}
          animate={{
            x: isSplit ? "102%" : "0%",
            rotateY: isSplit ? 20 : 0,
            filter: isSplit ? "brightness(0.7)" : "brightness(0.92)"
          }}
          transition={{
            duration: 1.6,
            ease: [0.76, 0, 0.24, 1]
          }}
        >
          {/* Seamless Multi-Monument Grid with Cinematic Ken Burns Push-In */}
          <motion.div 
            animate={isSplit ? { scale: 1.08 } : { scale: 1 }}
            transition={{ duration: 3.5, ease: "easeOut" }}
            className="absolute inset-0 grid grid-cols-2 grid-rows-3 h-full w-full gap-0 p-0 m-0"
          >
            {rightMonuments.map((mon, idx) => (
              <div key={idx} className="relative overflow-hidden w-full h-full p-0 m-0 bg-[#140B07]">
                <img
                  src={mon.img}
                  alt="Heritage Monument"
                  className="w-full h-full object-cover filter brightness-[0.78] contrast-[1.28] sepia-[0.38] saturate-[1.45]"
                />
                {/* Deep Rusty Brown & Terracotta Warmth Overlays */}
                <div className="absolute inset-0 bg-[#8A3816]/25 mix-blend-color-burn pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#140B07]/90 via-[#4A2010]/30 to-black/35 pointer-events-none" />
              </div>
            ))}
          </motion.div>

          {/* Shutter Atmospheric Dark Sandstone Rust Overlay */}
          <div className="absolute inset-0 bg-gradient-to-l from-[#140B07]/75 via-[#8A3816]/20 to-transparent pointer-events-none" />

          {/* Shutter Rusty Terracotta & Bronze Laser Edge */}
          <motion.div
            className="absolute left-0 top-0 bottom-0 w-[3.5px] bg-gradient-to-b from-[#FFA57E] via-[#BA532B] via-[#C86036] to-[#C29244] shadow-[0_0_18px_#BA532B]"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Cursor-Reactive Seam Flare */}
          {!isSplit && (
            <motion.div
              style={{ top: smoothMouseY }}
              className="absolute left-[-14px] w-7 h-28 rounded-full bg-gradient-to-b from-[#FFA57E] via-[#BA532B] to-[#C29244] blur-md opacity-95 pointer-events-none -translate-y-1/2"
            />
          )}
        </motion.div>

      </div>

      {/* ========================================================================= */}
      {/* 🌟 2. MEDIUM-TONE TERRACOTTA OCHRE & 3. 📜 BRAHMI EPIGRAPHIC WATERMARK    */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 museum-spotlight opacity-80 pointer-events-none" />
      
      {/* 3. 📜 Ancient Brahmi Epigraphic Motif Shimmer Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-15 overflow-hidden">
        <svg viewBox="0 0 1000 600" className="w-full h-full text-[#BA532B]" fill="none" stroke="currentColor">
          {/* Ancient Temple Geometries & Epigraphic Watermark Grid */}
          <circle cx="500" cy="300" r="280" strokeWidth="0.8" strokeDasharray="6 6" />
          <circle cx="500" cy="300" r="210" strokeWidth="1.2" strokeDasharray="3 3" />
          <polygon points="500,120 656,390 344,390" strokeWidth="0.8" opacity="0.6" />
          <polygon points="500,480 656,210 344,210" strokeWidth="0.8" opacity="0.6" />
          {/* Sanskrit/Brahmi Style Inscription Ring Lines */}
          <path d="M 200,300 Q 500,220 800,300" strokeWidth="0.8" strokeDasharray="4 8" />
          <path d="M 200,300 Q 500,380 800,300" strokeWidth="0.8" strokeDasharray="4 8" />
        </svg>
      </div>

      {/* Radial Sandstone Amber-Rust Flare */}
      <div 
        className="absolute w-[680px] h-[680px] rounded-full pointer-events-none blur-[100px] opacity-35 animate-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(186, 83, 43, 0.45) 0%, rgba(194, 146, 68, 0.25) 45%, transparent 75%)'
        }}
      />

      {/* Floating 3D Heritage Terracotta Dust Motes */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(16)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#BA532B]"
            style={{
              width: (i % 3) + 2,
              height: (i % 3) + 2,
              top: `${(i * 17 + 5) % 100}%`,
              left: `${(i * 23 + 7) % 100}%`,
              opacity: 0.25 + (i % 3) * 0.15,
              boxShadow: '0 0 6px rgba(186, 83, 43, 0.6)'
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
      {/* 🛡️ 3. RISING CARD WITH 1. 🧭 3D CURSOR PARALLAX & TILT & SPECULAR SHEEN    */}
      {/* ========================================================================= */}
      <motion.div 
        style={{
          rotateX: tiltX,
          rotateY: tiltY,
          transformStyle: "preserve-3d"
        }}
        className="relative z-30 flex flex-col items-center justify-center text-center px-6 max-w-4xl space-y-6"
      >
        
        {/* 🏛️ Official Royal Logo Emblem with Rotating Ashoka Solar Mandala Halo */}
        <motion.div
          initial={{ opacity: 0, y: 80, scale: 0.7, rotateX: 20 }}
          animate={{
            opacity: isRevealed ? 1 : 0,
            y: isRevealed ? 0 : 80,
            scale: isRevealed ? 1 : 0.7,
            rotateX: isRevealed ? 0 : 20
          }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="relative group cursor-pointer z-10"
          onClick={handleEnter}
        >
          {/* Rotating Ashoka Solar Mandala Ray Halo (Layered Behind) */}
          <motion.div
            className="absolute -inset-10 pointer-events-none flex items-center justify-center -z-10"
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          >
            <svg viewBox="0 0 220 220" className="w-full h-full opacity-40 filter drop-shadow-[0_0_12px_rgba(186,83,43,0.4)]">
              <circle cx="110" cy="110" r="95" stroke="#C29244" strokeWidth="1.2" strokeDasharray="4 4" fill="none" />
              <circle cx="110" cy="110" r="82" stroke="#BA532B" strokeWidth="1.5" fill="none" opacity="0.8" />
              <circle cx="110" cy="110" r="70" stroke="#C29244" strokeWidth="0.8" fill="none" opacity="0.6" />
              
              {/* 24 Radiant Ashoka Sun Wheel Spoke Rays */}
              {[...Array(24)].map((_, idx) => {
                const angle = (idx * 360) / 24;
                const rad = (angle * Math.PI) / 180;
                return (
                  <line
                    key={idx}
                    x1="110"
                    y1="110"
                    x2={110 + 82 * Math.cos(rad)}
                    y2={110 + 82 * Math.sin(rad)}
                    stroke="#C29244"
                    strokeWidth="1.2"
                    opacity="0.75"
                  />
                );
              })}
            </svg>
          </motion.div>

          {/* Outer Pulsing Aura */}
          <div className="absolute -inset-6 rounded-full bg-gradient-to-r from-[#BA532B]/30 via-[#C29244]/25 to-[#24160E]/25 blur-2xl animate-pulse -z-10" />
          
          <HeritageShieldLogo size="2xl" showText={false} />
        </motion.div>

        {/* 🏛️ Grand Monolithic Title with 1. 🧭 Specular Gold Light Sweep */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{
            opacity: isRevealed ? 1 : 0,
            y: isRevealed ? 0 : 60
          }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-3 relative z-20"
        >
          <div className="relative inline-block">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-[#24160E] tracking-tight leading-none drop-shadow-sm">
              HERITAGE <span className="text-[#BA532B]">SHIELD</span>
            </h1>
            {/* Specular Glint Reflection Sweeping Across */}
            <motion.div
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
              className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/35 to-transparent skew-x-12 pointer-events-none"
            />
          </div>

          <p className="text-sm sm:text-lg text-[#4D3425] font-sans leading-relaxed max-w-2xl mx-auto font-medium">
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
          {/* Main High-Impact CTA Button in Option B Terracotta-Rust & Bronze Gold Border */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleEnter}
            disabled={isTransitioning}
            className="px-10 py-4 rounded-2xl bg-gradient-to-r from-[#BA532B] via-[#C86036] to-[#A84520] text-white border border-[#C29244]/50 font-mono text-xs font-bold tracking-widest uppercase transition-all flex items-center gap-3 cursor-pointer shadow-xl relative overflow-hidden group hover:shadow-[#BA532B]/40"
          >
            {/* Shimmer Glint */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-1000 transition-transform bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            
            <span>{isTransitioning ? 'Entering Platform...' : 'Enter Platform'}</span>
            <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${isTransitioning ? 'translate-x-1.5' : ''}`} />
          </motion.button>
        </motion.div>

      </motion.div>
    </motion.div>
  );
}
