import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Sparkles, ArrowRight } from 'lucide-react';

export default function CinematicIntroReveal({ onComplete }) {
  const [stage, setStage] = useState('initial'); // 'initial' -> 'splitting' -> 'revealed' -> 'complete'

  useEffect(() => {
    // Stage 1: Brief presentation (0.4s)
    const t1 = setTimeout(() => {
      setStage('splitting');
    }, 600);

    // Stage 2: Heritage Shield rises from below (1.6s)
    const t2 = setTimeout(() => {
      setStage('revealed');
    }, 1600);

    // Stage 3: Smooth dissolve into main page (3.0s)
    const t3 = setTimeout(() => {
      handleFinish();
    }, 3200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const handleFinish = () => {
    setStage('complete');
    if (onComplete) onComplete();
  };

  if (stage === 'complete') return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100000] bg-[#07080B] flex items-center justify-center overflow-hidden select-none pointer-events-auto"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
      >
        {/* 🏛️ 1. SPLIT CURTAIN REVEAL PANELS (Left & Right Monument Imagery Shutters) */}
        <div className="absolute inset-0 flex pointer-events-none z-10">
          
          {/* Left Shutter */}
          <motion.div
            className="w-1/2 h-full relative overflow-hidden bg-[#0A0C12] border-r border-[#E06D44]/30 shadow-2xl"
            initial={{ x: "0%" }}
            animate={{
              x: stage === 'splitting' || stage === 'revealed' ? "-100%" : "0%"
            }}
            transition={{
              duration: 1.2,
              ease: [0.77, 0, 0.175, 1]
            }}
          >
            <img
              src="/monuments/khajuraho.jpg"
              alt="Monument Shutter Left"
              className="absolute inset-0 w-[200%] max-w-none h-full object-cover object-left filter brightness-[0.5] contrast-110 saturate-[0.85]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-[#07080B]" />
            <div className="absolute inset-0 bg-[#E06D44]/10 mix-blend-color-dodge" />
          </motion.div>

          {/* Right Shutter */}
          <motion.div
            className="w-1/2 h-full relative overflow-hidden bg-[#0A0C12] border-l border-[#E06D44]/30 shadow-2xl"
            initial={{ x: "0%" }}
            animate={{
              x: stage === 'splitting' || stage === 'revealed' ? "100%" : "0%"
            }}
            transition={{
              duration: 1.2,
              ease: [0.77, 0, 0.175, 1]
            }}
          >
            <img
              src="/monuments/khajuraho.jpg"
              alt="Monument Shutter Right"
              className="absolute inset-0 -left-full w-[200%] max-w-none h-full object-cover object-right filter brightness-[0.5] contrast-110 saturate-[0.85]"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/40 to-[#07080B]" />
            <div className="absolute inset-0 bg-[#D4AF37]/10 mix-blend-color-dodge" />
          </motion.div>

        </div>

        {/* 🌟 2. BACKGROUND AMBIENT SPOTLIGHT */}
        <div className="absolute inset-0 museum-spotlight opacity-90 pointer-events-none" />

        {/* 🛡️ 3. RISING "HERITAGE SHIELD" FROM BELOW TO UP */}
        <div className="relative z-20 flex flex-col items-center justify-center text-center px-6 max-w-3xl space-y-6">
          
          {/* Emblem & Glow */}
          <motion.div
            initial={{ opacity: 0, y: 70, scale: 0.8 }}
            animate={{
              opacity: stage === 'splitting' || stage === 'revealed' ? 1 : 0,
              y: stage === 'splitting' || stage === 'revealed' ? 0 : 70,
              scale: stage === 'splitting' || stage === 'revealed' ? 1 : 0.8
            }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#C85A32] via-[#E06D44] to-[#D4AF37] p-[1.5px] shadow-[0_0_50px_rgba(224,109,68,0.5)]">
              <div className="w-full h-full rounded-[22px] bg-[#07080B] flex items-center justify-center backdrop-blur-xl">
                <Shield className="w-12 h-12 text-[#E5C07B]" />
              </div>
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#E06D44] animate-ping" />
          </motion.div>

          {/* National Authority Badge */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{
              opacity: stage === 'splitting' || stage === 'revealed' ? 1 : 0,
              y: stage === 'splitting' || stage === 'revealed' ? 0 : 50
            }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.08] border border-white/15 backdrop-blur-xl shadow-lg"
          >
            <span className="w-2 h-2 rounded-full bg-[#E06D44] animate-pulse" />
            <span className="text-[11px] font-mono text-[#F5E6CC] uppercase tracking-widest font-bold">
              National Built Heritage Command · SIH 2026
            </span>
          </motion.div>

          {/* Rising Grand Title */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{
              opacity: stage === 'splitting' || stage === 'revealed' ? 1 : 0,
              y: stage === 'splitting' || stage === 'revealed' ? 0 : 60
            }}
            transition={{ duration: 0.85, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-2"
          >
            <h1 className="text-4xl sm:text-6xl font-serif font-bold text-[#FDFBF7] tracking-tight">
              HERITAGE <span className="gold-cream-text">SHIELD</span>
            </h1>
            <p className="text-sm sm:text-base text-gray-300 font-sans leading-relaxed max-w-xl">
              Preserving India's Architectural Soul Through Living Digital Twins
            </p>
          </motion.div>

          {/* Skip / Enter Action */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{
              opacity: stage === 'splitting' || stage === 'revealed' ? 1 : 0,
              y: stage === 'splitting' || stage === 'revealed' ? 0 : 40
            }}
            transition={{ duration: 0.7, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="pt-2 flex items-center gap-3"
          >
            <button
              onClick={handleFinish}
              className="px-6 py-2.5 rounded-xl terracotta-btn font-mono text-xs font-bold tracking-wider uppercase transition flex items-center gap-2 cursor-pointer shadow-xl"
            >
              <span>Enter Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>

        </div>

        {/* Bottom Loading Shimmer Line */}
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#C85A32] via-[#E06D44] to-[#D4AF37]"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 3.2, ease: "easeInOut" }}
        />
      </motion.div>
    </AnimatePresence>
  );
}
