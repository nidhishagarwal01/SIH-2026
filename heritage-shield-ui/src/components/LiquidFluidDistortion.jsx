import React, { useEffect, useRef } from 'react';

/**
 * 🌊 True Liquid Wave Distortion & Fluid Caustic Ripple Engine
 * Generates expanding hydrodynamic liquid surface waves, chromatic dispersion ripples,
 * and molten terracotta-gold fluid currents with 100% clean dissipation (ZERO residue/lingering marks).
 */
export default function LiquidFluidDistortion() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    }

    resize();
    window.addEventListener('resize', resize);

    // Active hydrodynamic ripples and fluid droplets
    const ripples = [];
    const droplets = [];
    const MAX_RIPPLES = 45;
    const MAX_DROPLETS = 60;

    let mouse = {
      x: -500,
      y: -500,
      px: -500,
      py: -500,
      moved: false,
      lastSpawn: 0
    };

    let colorCycle = 0;

    const onMouseMove = (e) => {
      const now = performance.now();
      mouse.px = mouse.x;
      mouse.py = mouse.y;
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      const speed = Math.hypot(mouse.x - mouse.px, mouse.y - mouse.py);

      if (!mouse.moved) {
        mouse.moved = true;
        mouse.px = mouse.x;
        mouse.py = mouse.y;
      }

      // Spawn hydrodynamic liquid wave rings on movement
      if (now - mouse.lastSpawn > 24 || speed > 12) {
        mouse.lastSpawn = now;
        colorCycle += 0.15;
        const isGold = Math.sin(colorCycle) > 0;

        if (ripples.length < MAX_RIPPLES) {
          ripples.push({
            x: mouse.x,
            y: mouse.y,
            radius: 8 + Math.min(speed * 0.2, 16),
            maxRadius: 65 + Math.min(speed * 2.2, 120),
            speed: 2.8 + Math.min(speed * 0.08, 4.5),
            strength: Math.min(0.6 + speed * 0.015, 0.95),
            life: 1.0,
            decay: 0.032,
            isGold
          });
        }

        // Spawn viscous liquid droplets along velocity vector
        if (speed > 5 && droplets.length < MAX_DROPLETS) {
          const angle = Math.atan2(mouse.y - mouse.py, mouse.x - mouse.px) + (Math.random() - 0.5) * 1.2;
          const dropSpeed = Math.random() * 2.5 + 1.2;
          droplets.push({
            x: mouse.x + (Math.random() - 0.5) * 10,
            y: mouse.y + (Math.random() - 0.5) * 10,
            vx: Math.cos(angle) * dropSpeed,
            vy: Math.sin(angle) * dropSpeed,
            size: Math.random() * 14 + 6,
            life: 1.0,
            decay: 0.04 + Math.random() * 0.02,
            isGold
          });
        }
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    let animId;

    function render() {
      // 1. Completely clear canvas on every single frame — ZERO residue left behind!
      ctx.clearRect(0, 0, width, height);

      // 2. Render Hydrodynamic Liquid Wave Distortion Rings
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += r.speed;
        r.life -= r.decay;

        if (r.life <= 0 || r.radius >= r.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }

        const alpha = r.life * r.strength;
        const primaryColor = r.isGold ? 'rgba(245, 196, 81,' : 'rgba(224, 109, 68,';
        const gleamColor = 'rgba(255, 240, 220,';

        // Outer Liquid Shockwave Ring
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.lineWidth = Math.max((1 - r.radius / r.maxRadius) * 4.5, 1.2);
        ctx.strokeStyle = `${primaryColor} ${alpha * 0.55})`;
        ctx.stroke();

        // Inner Chromatic Caustic Sheen (Refractive Liquid Glint)
        ctx.beginPath();
        ctx.arc(r.x, r.y, Math.max(r.radius - 3, 1), 0, Math.PI * 2);
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = `${gleamColor} ${alpha * 0.75})`;
        ctx.stroke();

        // Ambient fluid pressure wash
        const grad = ctx.createRadialGradient(r.x, r.y, 0, r.x, r.y, r.radius);
        grad.addColorStop(0, `${primaryColor} 0)`);
        grad.addColorStop(0.7, `${primaryColor} ${alpha * 0.12})`);
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // 3. Render Viscous Liquid Droplets & Fluid Micro-Currents
      for (let i = droplets.length - 1; i >= 0; i--) {
        const d = droplets[i];
        d.x += d.vx;
        d.y += d.vy;
        d.vx *= 0.92;
        d.vy *= 0.92;
        d.life -= d.decay;

        if (d.life <= 0) {
          droplets.splice(i, 1);
          continue;
        }

        const currentSize = d.size * d.life;
        const primaryColor = d.isGold ? 'rgba(245, 196, 81,' : 'rgba(224, 109, 68,';

        const grad = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, currentSize);
        grad.addColorStop(0, `rgba(255, 245, 230, ${d.life * 0.75})`);
        grad.addColorStop(0.4, `${primaryColor} ${d.life * 0.5})`);
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(d.x, d.y, currentSize, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    }

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[100005] w-full h-full mix-blend-screen"
    />
  );
}
