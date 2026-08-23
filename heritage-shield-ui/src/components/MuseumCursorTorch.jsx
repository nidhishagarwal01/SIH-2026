import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useScroll } from 'framer-motion';

/**
 * 🏛️ Submerged Silky Fluid Aura & Ambient Museum Torch
 * Submerges smoothly behind the glass panels and typography, illuminating the architectural obsidian
 * canvas with velvety terracotta-gold liquid plasma waves that feel organic, flowy, and 100% non-distracting.
 */
export default function MuseumCursorTorch() {
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

  // Ultra-silky fluid spring physics (submerged and flowy)
  const springPrimary = { damping: 36, stiffness: 120, mass: 0.8 };
  const smoothX = useSpring(mouseX, springPrimary);
  const smoothY = useSpring(mouseY, springPrimary);

  // Secondary lagging liquid wake (creates fluid wave trail behind cursor)
  const springLag = { damping: 48, stiffness: 60, mass: 1.6 };
  const lagX = useSpring(mouseX, springLag);
  const lagY = useSpring(mouseY, springLag);

  // Tertiary deep ambient pool
  const springDeep = { damping: 60, stiffness: 40, mass: 2.4 };
  const deepX = useSpring(mouseX, springDeep);
  const deepY = useSpring(mouseY, springDeep);

  // Page Scroll Progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mouseX, mouseY, isVisible]);

  return (
    <>
      {/* 🌟 1. Top Luxury Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#C85A32] via-[#E06D44] to-[#D4AF37] z-[99999] origin-left shadow-[0_0_12px_#E06D44]"
        style={{ scaleX }}
      />

      {/* 🌊 2. Submerged Fluid Liquid Plasma Aura (Behind Glass Cards, Non-Distracting) */}
      {isVisible && (
        <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden select-none">
          
          {/* Deep Viscous Fluid Pool (Lagging Ambient Warmth) */}
          <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
              x: deepX,
              y: deepY,
              translateX: '-50%',
              translateY: '-50%',
              width: 750,
              height: 750,
              background: 'radial-gradient(circle, rgba(200, 90, 50, 0.09) 0%, rgba(212, 175, 55, 0.04) 45%, transparent 70%)',
              filter: 'blur(75px)',
            }}
          />

          {/* Flowing Mid-Liquid Plasma Wave (Lagging Fluid Swirl) */}
          <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
              x: lagX,
              y: lagY,
              translateX: '-50%',
              translateY: '-50%',
              width: 440,
              height: 440,
              background: 'radial-gradient(circle, rgba(224, 109, 68, 0.14) 0%, rgba(245, 196, 81, 0.07) 50%, transparent 75%)',
              filter: 'blur(45px)',
            }}
          />

          {/* Primary Silky Smooth Torch Core (Follows Cursor Softly) */}
          <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
              x: smoothX,
              y: smoothY,
              translateX: '-50%',
              translateY: '-50%',
              width: 260,
              height: 260,
              background: 'radial-gradient(circle, rgba(255, 235, 205, 0.16) 0%, rgba(224, 109, 68, 0.09) 45%, transparent 75%)',
              filter: 'blur(25px)',
            }}
          />
        </div>
      )}

      {/* ✨ 3. Cinematic Atmospheric Floating Dust Particles */}
      <div className="fixed inset-0 pointer-events-none z-[2] overflow-hidden select-none">
        {[...Array(14)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#E5C07B]"
            style={{
              width: i % 3 === 0 ? 2.5 : 1.5,
              height: i % 3 === 0 ? 2.5 : 1.5,
              top: `${(i * 19 + 7) % 100}%`,
              left: `${(i * 23 + 11) % 100}%`,
              opacity: 0.18 + (i % 4) * 0.08,
              boxShadow: '0 0 6px rgba(229, 192, 123, 0.4)',
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, (i % 2 === 0 ? 12 : -12), 0],
              opacity: [0.15, 0.35, 0.15],
            }}
            transition={{
              duration: 9 + (i % 5) * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: (i % 7) * 1.2,
            }}
          />
        ))}
      </div>
    </>
  );
}
