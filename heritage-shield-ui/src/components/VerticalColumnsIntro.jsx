import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import HeritageShieldLogo from './HeritageShieldLogo';

export default function VerticalColumnsIntro({ onComplete }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        if (onComplete) onComplete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onComplete]);

  // 12 Distinct Monuments arranged across 4 vertical columns
  const column1 = [
    { name: "Taj Mahal", location: "Agra, Uttar Pradesh", era: "1632 CE", img: "/monuments/taj_mahal.jpg" },
    { name: "Qutub Minar", location: "New Delhi", era: "1192 CE", img: "/monuments/qutub_minar.jpg" },
    { name: "Hampi Monument Complex", location: "Vijayanagara, Karnataka", era: "1336 CE", img: "/monuments/hampi.jpg" },
    { name: "Sanchi Great Stupa", location: "Raisen, Madhya Pradesh", era: "3rd Century BCE", img: "/monuments/sanchi.jpg" }
  ];

  const column2 = [
    { name: "Konark Sun Temple", location: "Puri, Odisha", era: "1250 CE", img: "/monuments/konark.jpg" },
    { name: "Khajuraho Monument Group", location: "Chhatarpur, Madhya Pradesh", era: "950 CE", img: "/monuments/khajuraho.jpg" },
    { name: "Ellora Rock-Cut Caves", location: "Aurangabad, Maharashtra", era: "600 CE", img: "/monuments/ellora.jpg" },
    { name: "Brihadisvara Great Temple", location: "Thanjavur, Tamil Nadu", era: "1010 CE", img: "/monuments/chola_temple.jpg" }
  ];

  const column3 = [
    { name: "Golconda Fort Complex", location: "Hyderabad, Telangana", era: "1518 CE", img: "/monuments/golconda.jpg" },
    { name: "Ajanta Fresco Caves", location: "Aurangabad, Maharashtra", era: "2nd Century BCE", img: "/monuments/ajanta.jpg" },
    { name: "Rani Ki Vav Stepwell", location: "Patan, Gujarat", era: "1063 CE", img: "/monuments/rani_ki_vav.jpg" },
    { name: "Dholavira Harappan City", location: "Kutch, Gujarat", era: "3000 BCE", img: "/monuments/dholavira.jpg" }
  ];

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.03, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }}
      className="fixed inset-0 z-[100000] bg-[#FDFBF7] flex items-center justify-center overflow-hidden select-none"
    >
      {/* ⚡ Top-Right Skip Button */}
      <div className="absolute top-6 right-6 z-[100002]">
        <button
          onClick={onComplete}
          className="px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-[#EDE6DA] text-xs font-mono font-bold text-[#0E1B2E] hover:text-[#E06D44] hover:border-[#E06D44] shadow-md transition cursor-pointer flex items-center gap-1.5"
        >
          <span>Skip Intro</span>
          <span>✕</span>
        </button>
      </div>

      {/* 🏛️ 3 VERTICAL PARALLAX IMAGE COLUMNS */}
      <div className="absolute inset-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 sm:p-6 opacity-40 hover:opacity-60 transition-opacity duration-700 pointer-events-none">
        
        {/* Column 1: Drifts Upwards */}
        <motion.div 
          animate={{ y: [0, -180, 0] }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          className="flex flex-col gap-6"
        >
          {column1.map((item, idx) => (
            <div key={idx} className="rounded-3xl overflow-hidden shadow-lg border border-[#EDE6DA] bg-white aspect-[4/3] relative group">
              <img src={item.img} alt={item.name} className="w-full h-full object-cover filter brightness-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E1B2E]/70 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 text-white">
                <span className="text-[10px] font-mono text-[#E5C07B] uppercase block">{item.location}</span>
                <h4 className="text-sm font-serif font-bold">{item.name}</h4>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Column 2: Drifts Downwards */}
        <motion.div 
          animate={{ y: [-180, 0, -180] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          className="flex flex-col gap-6 hidden sm:flex"
        >
          {column2.map((item, idx) => (
            <div key={idx} className="rounded-3xl overflow-hidden shadow-lg border border-[#EDE6DA] bg-white aspect-[4/3] relative group">
              <img src={item.img} alt={item.name} className="w-full h-full object-cover filter brightness-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E1B2E]/70 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 text-white">
                <span className="text-[10px] font-mono text-[#E5C07B] uppercase block">{item.location}</span>
                <h4 className="text-sm font-serif font-bold">{item.name}</h4>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Column 3: Drifts Upwards */}
        <motion.div 
          animate={{ y: [0, -180, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="flex flex-col gap-6 hidden lg:flex"
        >
          {column3.map((item, idx) => (
            <div key={idx} className="rounded-3xl overflow-hidden shadow-lg border border-[#EDE6DA] bg-white aspect-[4/3] relative group">
              <img src={item.img} alt={item.name} className="w-full h-full object-cover filter brightness-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E1B2E]/70 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 text-white">
                <span className="text-[10px] font-mono text-[#E5C07B] uppercase block">{item.location}</span>
                <h4 className="text-sm font-serif font-bold">{item.name}</h4>
              </div>
            </div>
          ))}
        </motion.div>

      </div>

      {/* 🌟 CENTER FLOATING ROYAL IVORY EMBLEM CARD */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
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

        <button
          onClick={onComplete}
          className="w-full py-4 rounded-2xl terracotta-btn font-mono text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:scale-105 transition"
        >
          <span>Enter Platform</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </motion.div>

    </motion.div>
  );
}
