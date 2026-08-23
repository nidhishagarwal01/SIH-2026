import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowDown, ArrowRight, Shield, Compass, Sparkles, Layers } from 'lucide-react';
import HeritageShieldLogo from './HeritageShieldLogo';

export default function SplitScreenIntroLanding({ onEnterSite }) {
  const containerRef = useRef(null);

  // Scroll tracking across the 200vh intro section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Transform parameters mimicking Webflow pioneer split-screen masked scroll
  // 1. Black/Dark Split panel slides upward / opens
  const splitY = useTransform(smoothProgress, [0, 0.7, 1], ["0%", "-100%", "-100%"]);
  
  // 2. Giant text displacement & horizontal mask shifting
  const textTranslateX = useTransform(smoothProgress, [0, 0.6], ["0%", "-15%"]);
  const textScale = useTransform(smoothProgress, [0, 0.6, 1], [1, 1.08, 0.95]);
  const textOpacity = useTransform(smoothProgress, [0, 0.75, 0.95], [1, 1, 0]);
  
  // 3. Sub-layer / Chapter 02 reveal elements
  const revealY = useTransform(smoothProgress, [0.3, 0.8, 1], ["60px", "0px", "-20px"]);
  const revealOpacity = useTransform(smoothProgress, [0.3, 0.7, 1], [0, 1, 1]);
  
  // 4. Background color / glow morph
  const bgOpacity = useTransform(smoothProgress, [0.6, 1], [1, 0]);

  const handleEnterClick = (e) => {
    e.preventDefault();
    if (onEnterSite) {
      onEnterSite();
    } else {
      const target = document.getElementById('main-site-content');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div ref={containerRef} className="relative w-full h-[220vh] bg-[#06070B] text-white z-30 select-none">
      
      {/* 📌 STICKY FULL-VIEWPORT VIEWPORT CONTAINER */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
        
        {/* 🌟 1. UNDERLYING REVEAL LAYER (Revealed as Split Panel Slides Away) */}
        <motion.div 
          style={{ opacity: revealOpacity, y: revealY }}
          className="absolute inset-0 z-0 bg-[#06070B] flex flex-col justify-between p-8 sm:p-14 lg:p-20 pointer-events-auto"
        >
          {/* Top Bar for Chapter 02 */}
          <div className="flex justify-between items-center text-xs font-mono text-[#C084FC] border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#38BDF8] animate-ping" />
              <span className="font-bold tracking-widest uppercase text-white">NATIONAL BUILT HERITAGE COMMAND CENTER</span>
            </div>
            <span className="text-sm font-bold text-white tracking-widest font-mono">(02)</span>
          </div>

          {/* Central Welcome Narrative */}
          <div className="max-w-4xl space-y-6 my-auto text-left">
            <span className="text-xs font-mono text-[#38BDF8] tracking-widest uppercase font-bold block">
              AUTONOMOUS SPATIAL INTELLIGENCE & PHYSICS ENGINE
            </span>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-white tracking-tight leading-[1.05]">
              PRESERVE ANCIENT ARCHITECTURE. <span className="dreamcore-gradient-text block mt-1">ENGINEER DIGITAL TWINS.</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-300 font-sans max-w-2xl leading-relaxed">
              India's 3,690+ protected monuments monitored in real-time through drone photogrammetry, AI crack diagnostics, and Paris-Erdogan fracture laws.
            </p>
            
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={handleEnterClick}
                className="px-8 py-4 rounded-2xl dreamcore-btn font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-3 cursor-pointer shadow-2xl hover:scale-105 transition"
              >
                <span>Enter National Platform</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Bottom Telemetry Strip */}
          <div className="flex justify-between items-center text-xs font-mono text-gray-400 border-t border-white/10 pt-4">
            <span>SMART INDIA HACKATHON 2026 · TEAM ID: 031</span>
            <span>ISRO BHUVAN · ISO 31000 · ASI AMASR COMPLIANT</span>
          </div>
        </motion.div>


        {/* 🎬 2. FOREGROUND SPLIT-SCREEN MASKED LAYER (Slides Upward on Scroll) */}
        <motion.div 
          style={{ y: splitY }}
          className="absolute inset-0 z-10 bg-[#0B0C14] border-b border-[#A855F7]/30 shadow-2xl flex flex-col justify-between p-8 sm:p-14 lg:p-20 overflow-hidden"
        >
          {/* Background Gradient Spotlights inside the Split Cover */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-gradient-to-b from-[#A855F7]/20 to-transparent blur-[100px]" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-[#38BDF8]/10 blur-[120px]" />
          </div>

          {/* Top Header of Split Layer: Logo & (01) */}
          <div className="relative z-20 flex justify-between items-center text-xs font-mono text-[#C084FC] border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <HeritageShieldLogo size="sm" showText={true} textClassName="text-sm font-bold font-serif text-white tracking-widest" />
            </div>
            <div className="flex items-center gap-4">
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 text-[10px] font-bold uppercase">
                SPLITSCREEN SCROLL INTRO
              </span>
              <span className="text-sm font-bold text-white tracking-widest font-mono">(01)</span>
            </div>
          </div>

          {/* Centerpiece: Giant Masked Hero Heading that Translates on Scroll */}
          <motion.div 
            style={{ 
              x: textTranslateX, 
              scale: textScale, 
              opacity: textOpacity 
            }}
            className="relative z-20 my-auto text-left space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#38BDF8] text-[11px] font-mono font-bold uppercase tracking-wider">
              <span>✨ Autonomous Digital Twin Platform</span>
            </div>

            {/* Giant Monolithic Masked Heading */}
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif font-black tracking-tighter text-white uppercase leading-[0.9] select-none">
              HERITAGE<br />
              <span className="dreamcore-gradient-text">SHIELD</span>
            </h1>

            <p className="text-sm sm:text-base text-gray-300 font-mono tracking-wider max-w-xl pt-2">
              [ SCROLL DOWN TO UNVEIL LIVING DIGITAL TWINS & SPATIAL ENGINE ]
            </p>
          </motion.div>

          {/* Bottom Bar: Scroll Indicator & Skip Button */}
          <div className="relative z-20 flex justify-between items-center text-xs font-mono text-gray-400 border-t border-white/10 pt-4">
            
            {/* Pulsating Scroll Down Cue */}
            <div className="flex items-center gap-2.5 text-[#C084FC] animate-bounce">
              <ArrowDown className="w-4 h-4" />
              <span className="font-bold tracking-widest uppercase">SCROLL DOWN TO SPLIT & ENTER</span>
            </div>

            {/* Direct Bypass Button */}
            <button
              onClick={handleEnterClick}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-mono font-bold uppercase tracking-wider transition flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <span>Skip to Studio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

          </div>

        </motion.div>

      </div>

    </div>
  );
}
