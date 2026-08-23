import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useScroll } from 'framer-motion';

export default function MuseumCursorTorch() {
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

  // Smooth spring physics for cursor follower
  const springConfig = { damping: 28, stiffness: 200, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Trailing larger ambient glow
  const ambientSpringConfig = { damping: 40, stiffness: 90, mass: 1.2 };
  const ambientX = useSpring(mouseX, ambientSpringConfig);
  const ambientY = useSpring(mouseY, ambientSpringConfig);

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
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#C85A32] via-[#E06D44] to-[#D4AF37] z-[99999] origin-left shadow-[0_0_12px_#E06D44]"
        style={{ scaleX }}
      />

      {/* 🔦 2. Interactive Cursor Torch & Ambient Spotlight (Follows Mouse Fluidly) */}
      {isVisible && (
        <div className="fixed inset-0 pointer-events-none z-[40] overflow-hidden">
          
          {/* Broad Ambient Terracotta Glow */}
          <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
              x: ambientX,
              y: ambientY,
              translateX: '-50%',
              translateY: '-50%',
              width: 550,
              height: 550,
              background: 'radial-gradient(circle, rgba(224, 109, 68, 0.12) 0%, rgba(212, 175, 55, 0.05) 45%, transparent 70%)',
              filter: 'blur(35px)',
            }}
          />

          {/* Precision Gold Spotlight Halo */}
          <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
              x: smoothX,
              y: smoothY,
              translateX: '-50%',
              translateY: '-50%',
              width: 220,
              height: 220,
              background: 'radial-gradient(circle, rgba(255, 235, 200, 0.16) 0%, rgba(224, 109, 68, 0.08) 50%, transparent 80%)',
              filter: 'blur(15px)',
            }}
          />

          {/* Micro Cursor Dot */}
          <motion.div
            className="absolute rounded-full pointer-events-none border border-[#E06D44]/40"
            style={{
              x: mouseX,
              y: mouseY,
              translateX: '-50%',
              translateY: '-50%',
              width: 28,
              height: 28,
              backgroundColor: 'rgba(224, 109, 68, 0.08)',
              boxShadow: '0 0 10px rgba(224, 109, 68, 0.4)',
            }}
          />
        </div>
      )}

      {/* ✨ 3. Cinematic Atmospheric Floating Dust Particles */}
      <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
        {[...Array(16)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#E5C07B]"
            style={{
              width: i % 3 === 0 ? 3 : i % 2 === 0 ? 2 : 1.5,
              height: i % 3 === 0 ? 3 : i % 2 === 0 ? 2 : 1.5,
              top: `${(i * 19 + 7) % 100}%`,
              left: `${(i * 23 + 11) % 100}%`,
              opacity: 0.25 + (i % 4) * 0.12,
              boxShadow: '0 0 6px rgba(229, 192, 123, 0.6)',
            }}
            animate={{
              y: [0, -35, 0],
              x: [0, (i % 2 === 0 ? 15 : -15), 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 8 + (i % 5) * 3,
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
