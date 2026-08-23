import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useScroll } from 'framer-motion';

/**
 * 🏛️ Zero-Latency Fluid Hollow Circle Cursor & Submerged Museum Torch
 * - Primary Pointer: Responsive, crisp hollow circle with instant 120Hz responsiveness.
 * - Submerged Aura: Flowing liquid amber wake that floats underneath glass panels and text.
 */
export default function MuseumCursorTorch() {
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

  // 1. Zero-latency primary hollow circle pointer (Ultra-crisp, instant response)
  const pointerSpring = { damping: 40, stiffness: 1400, mass: 0.03 };
  const smoothPointerX = useSpring(mouseX, pointerSpring);
  const smoothPointerY = useSpring(mouseY, pointerSpring);

  // 2. Secondary fluid trailing liquid aura (The classic submerged flowing wake)
  const wakeSpring = { damping: 36, stiffness: 140, mass: 0.8 };
  const smoothWakeX = useSpring(mouseX, wakeSpring);
  const smoothWakeY = useSpring(mouseY, wakeSpring);

  // 3. Deep ambient fluid pool
  const deepSpring = { damping: 50, stiffness: 80, mass: 1.6 };
  const smoothDeepX = useSpring(mouseX, deepSpring);
  const smoothDeepY = useSpring(mouseY, deepSpring);

  // Scroll Progress Bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Direct high-performance coordinate update
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);

    // Interactive element detection
    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive = target && target.closest && target.closest('button, a, input, select, textarea, [role="button"], .cursor-pointer, [tabindex="0"]');
      setIsHovered(Boolean(isInteractive));
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY, isVisible]);

  return (
    <>
      {/* 🌟 1. Top Luxury Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#BA532B] via-[#C29244] to-[#24160E] z-[99999] origin-left shadow-[0_0_12px_rgba(186,83,43,0.5)] pointer-events-none"
        style={{ scaleX }}
      />

      {/* ⭕ 2. Main Fluid Hollow Circle Pointer (Zero-Latency, Crisp & Interactive) */}
      {isVisible && (
        <div className="fixed inset-0 pointer-events-none z-[999999] overflow-hidden select-none">
          <motion.div
            className="fixed top-0 left-0 rounded-full pointer-events-none"
            style={{
              x: smoothPointerX,
              y: smoothPointerY,
              translateX: '-50%',
              translateY: '-50%',
              width: isHovered ? 54 : (isMouseDown ? 26 : 34),
              height: isHovered ? 54 : (isMouseDown ? 26 : 34),
              borderWidth: isHovered ? '2px' : '1.5px',
              borderStyle: 'solid',
              borderColor: isHovered ? '#BA532B' : 'rgba(186, 83, 43, 0.85)',
              backgroundColor: isHovered 
                ? 'rgba(186, 83, 43, 0.16)' 
                : (isMouseDown ? 'rgba(186, 83, 43, 0.22)' : 'rgba(186, 83, 43, 0.04)'),
              backdropFilter: isHovered ? 'blur(1px)' : 'none',
              boxShadow: isHovered 
                ? '0 0 20px rgba(186, 83, 43, 0.35), inset 0 0 10px rgba(186, 83, 43, 0.15)' 
                : '0 0 10px rgba(186, 83, 43, 0.18)',
              transition: 'width 0.18s cubic-bezier(0.16, 1, 0.3, 1), height 0.18s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease'
            }}
          />
        </div>
      )}

      {/* 🌊 3. Submerged Fluid Liquid Plasma Ambient Wake (Beneath Cards & Content) */}
      {isVisible && (
        <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden select-none">
          
          {/* Deep Viscous Pool (Lagging Ambient Warmth) */}
          <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
              x: smoothDeepX,
              y: smoothDeepY,
              translateX: '-50%',
              translateY: '-50%',
              width: 580,
              height: 580,
              background: 'radial-gradient(circle, rgba(186, 83, 43, 0.09) 0%, rgba(194, 146, 68, 0.04) 45%, transparent 70%)',
              filter: 'blur(75px)',
            }}
          />

          {/* Flowing Mid-Liquid Plasma Wave (Smooth Fluid Swirl) */}
          <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
              x: smoothWakeX,
              y: smoothWakeY,
              translateX: '-50%',
              translateY: '-50%',
              width: 360,
              height: 360,
              background: 'radial-gradient(circle, rgba(186, 83, 43, 0.15) 0%, rgba(194, 146, 68, 0.07) 50%, transparent 75%)',
              filter: 'blur(45px)',
            }}
          />
        </div>
      )}
    </>
  );
}
