import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Compass } from 'lucide-react';
import HeritageShieldLogo from './HeritageShieldLogo';

export default function VerticalColumnsIntro({ onComplete }) {
  const [isEnteringPlatform, setIsEnteringPlatform] = useState(false);
  const containerRef = useRef(null);

  // ---------------------------------------------------------------------------
  // 1. 🪟 3D SPATIAL GYROSCOPE & MOUSE TRACKING
  // ---------------------------------------------------------------------------
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 120, mass: 0.8 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // 3D Perspective Rotation of the Gallery Canvas
  const canvasRotateX = useTransform(smoothMouseY, [-0.5, 0.5], [6, -6]);
  const canvasRotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-8, 8]);

  // Parallax Spatial Depth Shifting for Individual Columns
  const col1TranslateX = useTransform(smoothMouseX, [-0.5, 0.5], [-18, 18]);
  const col1TranslateY = useTransform(smoothMouseY, [-0.5, 0.5], [-12, 12]);

  const col2TranslateX = useTransform(smoothMouseX, [-0.5, 0.5], [0, 0]);
  const col2TranslateY = useTransform(smoothMouseY, [-0.5, 0.5], [14, -14]);

  const col3TranslateX = useTransform(smoothMouseX, [-0.5, 0.5], [18, -18]);
  const col3TranslateY = useTransform(smoothMouseY, [-0.5, 0.5], [-12, 12]);

  // Center Card Counter-Parallax
  const cardTranslateX = useTransform(smoothMouseX, [-0.5, 0.5], [10, -10]);
  const cardTranslateY = useTransform(smoothMouseY, [-0.5, 0.5], [8, -8]);
  const cardRotateX = useTransform(smoothMouseY, [-0.5, 0.5], [-3, 3]);
  const cardRotateY = useTransform(smoothMouseX, [-0.5, 0.5], [4, -4]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  useEffect(() => {
    // 🔒 Lock background scrolling completely on macOS & Mobile
    const originalOverflow = document.body.style.overflow;
    const originalTouchAction = document.body.style.touchAction;

    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';
    window.scrollTo(0, 0);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        handleEnterPlatform();
      }
    };

    const preventScroll = (e) => {
      e.preventDefault();
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('wheel', preventScroll, { passive: false });
    window.addEventListener('touchmove', preventScroll, { passive: false });

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.touchAction = originalTouchAction;
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    };
  }, [onComplete]);

  // ---------------------------------------------------------------------------
  // 4. 🚀 3D FLY-THROUGH WARP TRANSITION TRIGGER
  // ---------------------------------------------------------------------------
  const handleEnterPlatform = () => {
    if (isEnteringPlatform) return;
    setIsEnteringPlatform(true);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 700);
  };

  // ---------------------------------------------------------------------------
  // 3. ♾️ 12 DISTINCT MONUMENTS ACROSS 3 INFINITE SEAMLESS MARQUEE COLUMNS
  // ---------------------------------------------------------------------------
  const column1Base = [
    { name: "Taj Mahal", location: "Agra, Uttar Pradesh", era: "1632 CE", img: "/monuments/taj_mahal.jpg" },
    { name: "Qutub Minar", location: "New Delhi", era: "1192 CE", img: "/monuments/qutub_minar.jpg" },
    { name: "Hampi Monument Complex", location: "Vijayanagara, Karnataka", era: "1336 CE", img: "/monuments/hampi.jpg" },
    { name: "Sanchi Great Stupa", location: "Raisen, Madhya Pradesh", era: "3rd Century BCE", img: "/monuments/sanchi.jpg" }
  ];

  const column2Base = [
    { name: "Konark Sun Temple", location: "Puri, Odisha", era: "1250 CE", img: "/monuments/konark.jpg" },
    { name: "Khajuraho Monument Group", location: "Chhatarpur, Madhya Pradesh", era: "950 CE", img: "/monuments/khajuraho.jpg" },
    { name: "Ellora Rock-Cut Caves", location: "Aurangabad, Maharashtra", era: "600 CE", img: "/monuments/ellora.jpg" },
    { name: "Brihadisvara Great Temple", location: "Thanjavur, Tamil Nadu", era: "1010 CE", img: "/monuments/chola_temple.jpg" }
  ];

  const column3Base = [
    { name: "Golconda Fort Complex", location: "Hyderabad, Telangana", era: "1518 CE", img: "/monuments/golconda.jpg" },
    { name: "Ajanta Fresco Caves", location: "Aurangabad, Maharashtra", era: "2nd Century BCE", img: "/monuments/ajanta.jpg" },
    { name: "Rani Ki Vav Stepwell", location: "Patan, Gujarat", era: "1063 CE", img: "/monuments/rani_ki_vav.jpg" },
    { name: "Dholavira Harappan City", location: "Kutch, Gujarat", era: "3000 BCE", img: "/monuments/dholavira.jpg" }
  ];

  // Tripled for perfectly continuous, seamless looping without visual jumps
  const col1Items = [...column1Base, ...column1Base, ...column1Base];
  const col2Items = [...column2Base, ...column2Base, ...column2Base];
  const col3Items = [...column3Base, ...column3Base, ...column3Base];

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6 } }}
      className="fixed inset-0 z-[100000] bg-[#FDFBF7] flex items-center justify-center overflow-hidden select-none overscroll-none touch-none [perspective:1400px]"
    >
      {/* 🏛️ 3D ROTATING SPATIAL GALLERY CANVAS */}
      <motion.div 
        style={{ 
          rotateX: canvasRotateX, 
          rotateY: canvasRotateY,
          transformStyle: "preserve-3d"
        }}
        animate={isEnteringPlatform ? {
          scale: 2.2,
          opacity: 0,
          filter: "blur(14px)",
          transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
        } : {
          scale: 1,
          opacity: 1,
          filter: "blur(0px)"
        }}
        className="absolute inset-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 p-4 sm:p-8 opacity-45 pointer-events-none"
      >
        
        {/* ========================================================================= */}
        {/* COLUMN 1: Infinite Downward Gliding Marquee                                */}
        {/* ========================================================================= */}
        <motion.div 
          style={{ x: col1TranslateX, y: col1TranslateY }}
          className="flex flex-col gap-6"
        >
          <motion.div
            animate={{ y: ["-33.33%", "0%"] }}
            transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
            className="flex flex-col gap-6"
          >
            {col1Items.map((item, idx) => (
              <div 
                key={`c1-${idx}`} 
                className="rounded-3xl overflow-hidden shadow-md border border-[#EDE6DA] bg-white aspect-[4/3] relative"
              >
                <img 
                  src={item.img} 
                  alt={item.name} 
                  className="w-full h-full object-cover filter brightness-105 contrast-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E1B2E]/75 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 text-white">
                  <span className="text-[10px] font-mono text-[#E5C07B] uppercase font-bold tracking-wider block">
                    {item.location}
                  </span>
                  <h4 className="text-sm font-serif font-bold leading-snug">
                    {item.name}
                  </h4>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ========================================================================= */}
        {/* COLUMN 2: Infinite Upward Gliding Marquee                                  */}
        {/* ========================================================================= */}
        <motion.div 
          style={{ x: col2TranslateX, y: col2TranslateY }}
          className="flex flex-col gap-6 hidden sm:flex"
        >
          <motion.div
            animate={{ y: ["0%", "-33.33%"] }}
            transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
            className="flex flex-col gap-6"
          >
            {col2Items.map((item, idx) => (
              <div 
                key={`c2-${idx}`} 
                className="rounded-3xl overflow-hidden shadow-md border border-[#EDE6DA] bg-white aspect-[4/3] relative"
              >
                <img 
                  src={item.img} 
                  alt={item.name} 
                  className="w-full h-full object-cover filter brightness-105 contrast-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E1B2E]/75 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 text-white">
                  <span className="text-[10px] font-mono text-[#E5C07B] uppercase font-bold tracking-wider block">
                    {item.location}
                  </span>
                  <h4 className="text-sm font-serif font-bold leading-snug">
                    {item.name}
                  </h4>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ========================================================================= */}
        {/* COLUMN 3: Infinite Downward Gliding Marquee                                */}
        {/* ========================================================================= */}
        <motion.div 
          style={{ x: col3TranslateX, y: col3TranslateY }}
          className="flex flex-col gap-6 hidden lg:flex"
        >
          <motion.div
            animate={{ y: ["-33.33%", "0%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex flex-col gap-6"
          >
            {col3Items.map((item, idx) => (
              <div 
                key={`c3-${idx}`} 
                className="rounded-3xl overflow-hidden shadow-md border border-[#EDE6DA] bg-white aspect-[4/3] relative"
              >
                <img 
                  src={item.img} 
                  alt={item.name} 
                  className="w-full h-full object-cover filter brightness-105 contrast-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E1B2E]/75 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 text-white">
                  <span className="text-[10px] font-mono text-[#E5C07B] uppercase font-bold tracking-wider block">
                    {item.location}
                  </span>
                  <h4 className="text-sm font-serif font-bold leading-snug">
                    {item.name}
                  </h4>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

      </motion.div>

      {/* ========================================================================= */}
      {/* 🌟 4. CENTER FLOATING ROYAL IVORY EMBLEM CARD WITH 3D COUNTER-TILT        */}
      {/* ========================================================================= */}
      <motion.div
        style={{
          x: cardTranslateX,
          y: cardTranslateY,
          rotateX: cardRotateX,
          rotateY: cardRotateY
        }}
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={isEnteringPlatform ? {
          scale: 1.15,
          opacity: 0,
          filter: "blur(10px)",
          transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
        } : {
          opacity: 1,
          scale: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
        }}
        className="relative z-10 max-w-lg mx-6 p-8 sm:p-10 rounded-3xl bg-white/95 backdrop-blur-2xl border border-[#EDE6DA] shadow-2xl text-center space-y-6"
      >
        <div className="flex justify-center">
          <HeritageShieldLogo size="xl" showText={false} />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#0E1B2E] tracking-tight">
            HERITAGE <span className="text-[#E06D44]">SHIELD</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#334155] font-sans leading-relaxed max-w-sm mx-auto">
            Autonomous conservation intelligence uniting LiDAR digital twins, AI defect diagnostics, and structural physics.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleEnterPlatform}
          disabled={isEnteringPlatform}
          className="w-full py-4 rounded-2xl terracotta-btn font-mono text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2.5 cursor-pointer shadow-lg transition"
        >
          <span>{isEnteringPlatform ? 'Entering Platform...' : 'Enter Platform'}</span>
          <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${isEnteringPlatform ? 'translate-x-1' : ''}`} />
        </motion.button>
      </motion.div>

    </motion.div>
  );
}
