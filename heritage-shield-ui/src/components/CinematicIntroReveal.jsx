import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Compass, Shield, Eye } from 'lucide-react';
import HeritageShieldLogo from './HeritageShieldLogo';

export default function CinematicIntroReveal({ onComplete }) {
  // Directly trigger smooth split animation immediately upon mount (no dead pause)
  const [isSplit, setIsSplit] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    // Start 3D split immediately upon load (100ms)
    const t1 = setTimeout(() => {
      setIsSplit(true);
    }, 100);

    // Reveal the Heritage Shield Emblem & Portal Entrance (700ms)
    const t2 = setTimeout(() => {
      setIsRevealed(true);
    }, 700);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const handleEnter = () => {
    if (onComplete) onComplete();
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100000] bg-[#07080B] flex items-center justify-center overflow-hidden select-none pointer-events-auto"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
      style={{ perspective: 1400 }}
    >
      {/* ========================================================================= */}
      {/* 🏛️ 1. 3D APERTURE SPLIT PANELS (MULTI-MONUMENT MOSAIC SHUTTERS)            */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 flex pointer-events-none z-10" style={{ transformStyle: 'preserve-3d' }}>
        
        {/* 🏛️ Left 3D Shutter (Khajuraho & Hampi Heritage Imagery) */}
        <motion.div
          className="w-1/2 h-full relative overflow-hidden bg-[#0A0C12] border-r border-[#E06D44]/40 shadow-2xl origin-left"
          initial={{ x: "0%", rotateY: 0, filter: "brightness(0.9)" }}
          animate={{
            x: isSplit ? "-102%" : "0%",
            rotateY: isSplit ? -20 : 0,
            filter: isSplit ? "brightness(0.4)" : "brightness(0.9)"
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
                className="w-full h-full object-cover object-left filter brightness-[0.75] contrast-110 saturate-[0.95]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />
            </div>
            <div className="relative h-full overflow-hidden">
              <img
                src="/monuments/hampi.jpg"
                alt="Hampi Stone Chariot"
                className="w-full h-full object-cover object-left filter brightness-[0.7] contrast-110 saturate-[0.9]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />
            </div>
          </div>

          {/* Shutter Atmospheric Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#07080B]/90 via-[#07080B]/40 to-transparent" />
          <div className="absolute inset-0 bg-[#E06D44]/15 mix-blend-color-dodge" />

          {/* Shutter Laser Telemetry Line */}
          <motion.div
            className="absolute right-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#FFA57E] via-[#E06D44] to-[#D4AF37] shadow-[0_0_15px_#E06D44]"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        {/* 🏛️ Right 3D Shutter (Konark & Qutub Minar Heritage Imagery) */}
        <motion.div
          className="w-1/2 h-full relative overflow-hidden bg-[#0A0C12] border-l border-[#E06D44]/40 shadow-2xl origin-right"
          initial={{ x: "0%", rotateY: 0, filter: "brightness(0.9)" }}
          animate={{
            x: isSplit ? "102%" : "0%",
            rotateY: isSplit ? 20 : 0,
            filter: isSplit ? "brightness(0.4)" : "brightness(0.9)"
          }}
          transition={{
            duration: 1.6,
            ease: [0.76, 0, 0.24, 1]
          }}
        >
          {/* Dual Monument Composite */}
          <div className="absolute inset-0 -left-full grid grid-rows-2 h-full w-[200%] max-w-none">
            <div className="relative h-full overflow-hidden">
              <img
                src="/monuments/konark.jpg"
                alt="Konark Sun Temple Carvings"
                className="w-full h-full object-cover object-right filter brightness-[0.75] contrast-110 saturate-[0.95]"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-transparent to-transparent" />
            </div>
            <div className="relative h-full overflow-hidden">
              <img
                src="/monuments/qutub_minar.jpg"
                alt="Qutub Minar Fluted Masonry"
                className="w-full h-full object-cover object-right filter brightness-[0.7] contrast-110 saturate-[0.9]"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-transparent to-transparent" />
            </div>
          </div>

          {/* Shutter Atmospheric Overlays */}
          <div className="absolute inset-0 bg-gradient-to-l from-[#07080B]/90 via-[#07080B]/40 to-transparent" />
          <div className="absolute inset-0 bg-[#D4AF37]/15 mix-blend-color-dodge" />

          {/* Shutter Laser Telemetry Line */}
          <motion.div
            className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#FFA57E] via-[#E06D44] to-[#D4AF37] shadow-[0_0_15px_#E06D44]"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

      </div>

      {/* ========================================================================= */}
      {/* 🌟 2. CINEMATIC 3D BACKGROUND AMBIENCE & RADIANT LIGHT RAYS               */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 museum-spotlight opacity-95 pointer-events-none" />
      
      {/* Radial Gold Flare */}
      <div 
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none blur-[90px] opacity-40 animate-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(224, 109, 68, 0.35) 0%, rgba(212, 175, 55, 0.15) 50%, transparent 75%)'
        }}
      />

      {/* Floating 3D Heritage Dust Motes */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#FFA57E]"
            style={{
              width: (i % 3) + 2,
              height: (i % 3) + 2,
              top: `${(i * 17 + 5) % 100}%`,
              left: `${(i * 23 + 7) % 100}%`,
              opacity: 0.3 + (i % 3) * 0.2,
              boxShadow: '0 0 8px rgba(255, 165, 126, 0.8)'
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, i % 2 === 0 ? 20 : -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 6 + (i % 4) * 2,
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
        
        {/* 🏛️ Official Royal Logo Emblem (3D Floating with Radiant Aura) */}
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
          <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-[#C85A32]/40 via-[#E06D44]/30 to-[#D4AF37]/40 blur-2xl animate-pulse" />
          
          <HeritageShieldLogo size="2xl" showText={false} />
        </motion.div>

        {/* 🏛️ National Authority Badge */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{
            opacity: isRevealed ? 1 : 0,
            y: isRevealed ? 0 : 50
          }}
          transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/[0.06] border border-white/15 backdrop-blur-2xl shadow-xl"
        >
          <span className="w-2 h-2 rounded-full bg-[#E06D44] animate-ping" />
          <span className="text-[11px] font-mono text-[#F5E6CC] uppercase tracking-widest font-bold">
            Autonomous Digital Twin Architecture · SIH 2026
          </span>
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
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-[#FDFBF7] tracking-tight leading-none">
            HERITAGE <span className="gold-cream-text">SHIELD</span>
          </h1>
          <p className="text-sm sm:text-lg text-gray-300 font-sans leading-relaxed max-w-2xl mx-auto">
            Preserving India's Architectural Soul Through Living Digital Twins & Autonomous Intelligence
          </p>
        </motion.div>

        {/* 🚀 4. USER CONTROLLED TACTILE ACTION (NO AUTO TIMEOUT) */}
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
            className="px-9 py-4 rounded-2xl terracotta-btn font-mono text-xs font-bold tracking-widest uppercase transition-all flex items-center gap-3 cursor-pointer shadow-[0_0_35px_rgba(224,109,68,0.45)] hover:shadow-[0_0_50px_rgba(224,109,68,0.7)] hover:scale-105"
          >
            <span>Enter Command Portal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>

      </div>
    </motion.div>
  );
}
