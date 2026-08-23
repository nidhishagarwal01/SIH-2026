import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Sparkles, ArrowRight, Eye } from 'lucide-react';

export default function CinematicIntroReveal({ onComplete }) {
  const [stage, setStage] = useState('initial'); // 'initial' (monument presentation) -> 'splitting' (curtains open) -> 'revealed' (title rises) -> 'complete'

  useEffect(() => {
    // Stage 1: Full-screen monument appreciation (1.4s)
    const t1 = setTimeout(() => {
      setStage('splitting');
    }, 1400);

    // Stage 2: Heritage Shield rises from below (2.6s)
    const t2 = setTimeout(() => {
      setStage('revealed');
    }, 2600);

    // Stage 3: Smooth auto-dissolve into main page (6.2s total)
    const t3 = setTimeout(() => {
      handleFinish();
    }, 6200);

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
        exit={{ opacity: 0, transition: { duration: 0.9, ease: "easeInOut" } }}
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
              duration: 1.6,
              ease: [0.76, 0, 0.24, 1]
            }}
          >
            <img
              src="/monuments/khajuraho.jpg"
              alt="Monument Shutter Left"
              className="absolute inset-0 w-[200%] max-w-none h-full object-cover object-left filter brightness-[0.55] contrast-110 saturate-[0.9]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-[#07080B]" />
            <div className="absolute inset-0 bg-[#E06D44]/10 mix-blend-color-dodge" />

            {/* Initial Center Title Before Split */}
            {stage === 'initial' && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute inset-y-0 right-6 flex items-center justify-end text-right z-20"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-[#E06D44] tracking-widest uppercase font-bold block">
                    ARCHAEOLOGICAL MONUMENTS
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#FDFBF7]">
                    Living Built Heritage
                  </h3>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Right Shutter */}
          <motion.div
            className="w-1/2 h-full relative overflow-hidden bg-[#0A0C12] border-l border-[#E06D44]/30 shadow-2xl"
            initial={{ x: "0%" }}
            animate={{
              x: stage === 'splitting' || stage === 'revealed' ? "100%" : "0%"
            }}
            transition={{
              duration: 1.6,
              ease: [0.76, 0, 0.24, 1]
            }}
          >
            <img
              src="/monuments/khajuraho.jpg"
              alt="Monument Shutter Right"
              className="absolute inset-0 -left-full w-[200%] max-w-none h-full object-cover object-right filter brightness-[0.55] contrast-110 saturate-[0.9]"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-black/85 via-black/40 to-[#07080B]" />
            <div className="absolute inset-0 bg-[#D4AF37]/10 mix-blend-color-dodge" />

            {/* Initial Center Subtitle Before Split */}
            {stage === 'initial' && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute inset-y-0 left-6 flex items-center justify-start text-left z-20"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-[#E5C07B] tracking-widest uppercase font-bold block">
                    NATIONAL DIGITAL TWIN
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#FDFBF7]">
                    Autonomous Archive
                  </h3>
                </div>
              </motion.div>
            )}
          </motion.div>

        </div>

        {/* 🌟 2. BACKGROUND AMBIENT SPOTLIGHT */}
        <div className="absolute inset-0 museum-spotlight opacity-90 pointer-events-none" />

        {/* 🛡️ 3. RISING "HERITAGE SHIELD" FROM BELOW TO UP */}
        <div className="relative z-20 flex flex-col items-center justify-center text-center px-6 max-w-3xl space-y-6">
          
          {/* Emblem & Glow */}
          <motion.div
            initial={{ opacity: 0, y: 90, scale: 0.75 }}
            animate={{
              opacity: stage === 'splitting' || stage === 'revealed' ? 1 : 0,
              y: stage === 'splitting' || stage === 'revealed' ? 0 : 90,
              scale: stage === 'splitting' || stage === 'revealed' ? 1 : 0.75
            }}
            transition={{ duration: 1.1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#C85A32] via-[#E06D44] to-[#D4AF37] p-[1.5px] shadow-[0_0_60px_rgba(224,109,68,0.6)]">
              <div className="w-full h-full rounded-[22px] bg-[#07080B] flex items-center justify-center backdrop-blur-xl">
                <Shield className="w-12 h-12 text-[#E5C07B]" />
              </div>
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#E06D44] animate-ping" />
          </motion.div>

          {/* National Authority Badge */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{
              opacity: stage === 'splitting' || stage === 'revealed' ? 1 : 0,
              y: stage === 'splitting' || stage === 'revealed' ? 0 : 60
            }}
            transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.08] border border-white/15 backdrop-blur-xl shadow-lg"
          >
            <span className="w-2 h-2 rounded-full bg-[#E06D44] animate-pulse" />
            <span className="text-[11px] font-mono text-[#F5E6CC] uppercase tracking-widest font-bold">
              National Built Heritage Command · SIH 2026
            </span>
          </motion.div>

          {/* Rising Grand Title */}
          <motion.div
            initial={{ opacity: 0, y: 70 }}
            animate={{
              opacity: stage === 'splitting' || stage === 'revealed' ? 1 : 0,
              y: stage === 'splitting' || stage === 'revealed' ? 0 : 70
            }}
            transition={{ duration: 0.95, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
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
            transition={{ duration: 0.8, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
            className="pt-2 flex items-center gap-3"
          >
            <button
              onClick={handleFinish}
              className="px-7 py-3 rounded-xl terracotta-btn font-mono text-xs font-bold tracking-wider uppercase transition flex items-center gap-2 cursor-pointer shadow-2xl hover:scale-105"
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
          transition={{ duration: 6.2, ease: "linear" }}
        />
      </motion.div>
    </AnimatePresence>
  );
}
