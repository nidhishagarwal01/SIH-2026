import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useScroll } from 'framer-motion';

/**
 * 🏛️ Fluid Interactive Circle Cursor & Submerged Museum Torch
 * Replaces the standard computer cursor with a smooth, fluid circular pointer that expands
 * when hovering over clickable elements and provides tactile click feedback.
 */
export default function MuseumCursorTorch() {
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

  // 1. High-precision instant dot (Zero-lag primary pointer)
  const dotSpring = { damping: 38, stiffness: 700, mass: 0.1 };
  const smoothDotX = useSpring(mouseX, dotSpring);
  const smoothDotY = useSpring(mouseY, dotSpring);

  // 2. Fluid trailing outer circle (Silky liquid response)
  const ringSpring = { damping: 26, stiffness: 220, mass: 0.4 };
  const smoothRingX = useSpring(mouseX, ringSpring);
  const smoothRingY = useSpring(mouseY, ringSpring);

  // 3. Submerged fluid liquid plasma aura
  const springLag = { damping: 48, stiffness: 60, mass: 1.6 };
  const lagX = useSpring(mouseX, springLag);
  const lagY = useSpring(mouseY, springLag);

  // Scroll Progress
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
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);

    // Interactive elements hover listener
    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive = target.closest('button, a, input, select, textarea, [role="button"], .cursor-pointer, [tabindex="0"]');
      setIsHovered(!!isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mouseX, mouseY, isVisible]);

  return (
    <>
      {/* 🌟 1. Top Luxury Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#BA532B] via-[#C29244] to-[#24160E] z-[99999] origin-left shadow-[0_0_12px_rgba(186,83,43,0.5)] pointer-events-none"
        style={{ scaleX }}
      />

      {/* ⭕ 2. High-Precision Custom Fluid Circle Cursor */}
      {isVisible && (
        <div className="fixed inset-0 pointer-events-none z-[999999] overflow-hidden select-none">
          
          {/* Inner Precision Point */}
          <motion.div
            className="fixed top-0 left-0 rounded-full bg-[#BA532B] shadow-[0_0_8px_rgba(186,83,43,0.8)]"
            style={{
              x: smoothDotX,
              y: smoothDotY,
              translateX: '-50%',
              translateY: '-50%',
              width: isHovered ? 6 : 4,
              height: isHovered ? 6 : 4,
              opacity: isMouseDown ? 0.9 : 1,
            }}
            transition={{ duration: 0.15 }}
          />

          {/* Fluid Outer Trailing Circle */}
          <motion.div
            className="fixed top-0 left-0 rounded-full border border-[#BA532B]/80 transition-all duration-200 ease-out"
            style={{
              x: smoothRingX,
              y: smoothRingY,
              translateX: '-50%',
              translateY: '-50%',
              width: isHovered ? 52 : (isMouseDown ? 28 : 36),
              height: isHovered ? 52 : (isMouseDown ? 28 : 36),
              backgroundColor: isHovered 
                ? 'rgba(186, 83, 43, 0.18)' 
                : (isMouseDown ? 'rgba(186, 83, 43, 0.22)' : 'rgba(186, 83, 43, 0.06)'),
              borderColor: isHovered ? '#BA532B' : 'rgba(186, 83, 43, 0.65)',
              backdropFilter: isHovered ? 'blur(1px)' : 'none',
              boxShadow: isHovered 
                ? '0 0 16px rgba(186, 83, 43, 0.35)' 
                : '0 0 8px rgba(186, 83, 43, 0.15)',
            }}
          />
        </div>
      )}

      {/* 🌊 3. Submerged Fluid Liquid Plasma Aura (Behind Content) */}
      {isVisible && (
        <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden select-none">
          {/* Flowing Mid-Liquid Plasma Wave */}
          <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
              x: lagX,
              y: lagY,
              translateX: '-50%',
              translateY: '-50%',
              width: 480,
              height: 480,
              background: 'radial-gradient(circle, rgba(186, 83, 43, 0.12) 0%, rgba(194, 146, 68, 0.05) 50%, transparent 75%)',
              filter: 'blur(55px)',
            }}
          />
        </div>
      )}
    </>
  );
}
