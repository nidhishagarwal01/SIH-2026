import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { createMorphingConstellation } from '../twin/MorphingConstellation';
import HeritageShieldLogo from '../HeritageShieldLogo';

export default function ScrollytellingLanding({
  onLaunchTwin,
  onOpenDossier,
  onExplorePlatform,
  currentUser,
  onOpenAuth,
  onLogout
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollProgressRef = useRef(0);
  const pointerRef = useRef({ x: 0, y: 0 });

  // Direct 60fps window scroll listener with 0 delay
  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const totalScroll = el.offsetHeight - window.innerHeight;
      const currentScroll = -rect.top;
      const p = Math.max(0, Math.min(1, currentScroll / Math.max(1, totalScroll)));
      scrollProgressRef.current = p;
      setScrollProgress(p);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Pointer move handler for interactive 3D parallax tilt
  useEffect(() => {
    const handlePointerMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      pointerRef.current = { x, y };
    };

    window.addEventListener('pointermove', handlePointerMove);
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  // Initialize Three.js Scene and Morphing Particle Constellation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 11.5);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambientLight);

    const irisLight = new THREE.PointLight(0x8052ff, 1.8, 25);
    irisLight.position.set(3, 2, 6);
    scene.add(irisLight);

    const saffronLight = new THREE.PointLight(0xffb829, 1.4, 25);
    saffronLight.position.set(-3, -2, 6);
    scene.add(saffronLight);

    // Create the 4-stage morphing constellation
    const constellation = createMorphingConstellation(2400);
    scene.add(constellation.mesh);

    let animationFrameId;
    const clock = new THREE.Clock();

    const renderLoop = () => {
      const time = clock.getElapsedTime();
      const p = scrollProgressRef.current;
      const { x: px, y: py } = pointerRef.current;

      constellation.update(p, time, px, py);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      constellation.dispose();
      renderer.dispose();
    };
  }, []);

  // Jump to specific stage on indicator click
  const scrollToStage = (stageIdx) => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const containerHeight = containerRef.current.offsetHeight - window.innerHeight;
    const targets = [0.0, 0.35, 0.62, 0.90];
    const targetY = containerTop + containerHeight * targets[stageIdx];
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  };

  // Helper function to calculate smooth opacity & translateY for typographic steps
  const getStageStyle = (start, peakStart, peakEnd, end) => {
    const p = scrollProgress;
    let opacity = 0;
    let translateY = 20;

    if (p >= start && p <= end) {
      if (p < peakStart) {
        // Fade in
        const t = (p - start) / Math.max(0.001, peakStart - start);
        opacity = t;
        translateY = 20 * (1 - t);
      } else if (p <= peakEnd) {
        // Full visibility
        opacity = 1;
        translateY = 0;
      } else {
        // Fade out
        const t = (p - peakEnd) / Math.max(0.001, end - peakEnd);
        opacity = 1 - t;
        translateY = -20 * t;
      }
    }

    return {
      opacity,
      transform: `translateY(${translateY}px)`,
      pointerEvents: opacity > 0.2 ? 'auto' : 'none',
      visibility: opacity > 0.01 ? 'visible' : 'hidden'
    };
  };

  const activeStageIndex = scrollProgress < 0.24 ? 0 : scrollProgress < 0.49 ? 1 : scrollProgress < 0.74 ? 2 : 3;

  return (
    <div ref={containerRef} className="relative w-full h-[320vh] bg-black selection:bg-[#8052ff] selection:text-white">
      
      {/* 🌌 STICKY VIEWPORT CONTAINER */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black flex flex-col justify-between">
        
        {/* 1. Global Navigation Bar */}
        <nav className="relative z-30 w-full max-w-[1500px] mx-auto px-6 sm:px-10 h-20 flex items-center justify-between pointer-events-auto">
          <HeritageShieldLogo
            size="md"
            showText={true}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          />

          <div className="hidden md:flex items-center gap-8 text-[13px] uppercase tracking-wider font-semibold font-mono">
            <button onClick={() => scrollToStage(0)} className="void-link cursor-pointer">01 Digital Twin</button>
            <button onClick={() => scrollToStage(1)} className="void-link cursor-pointer">02 The Problem</button>
            <button onClick={() => scrollToStage(2)} className="void-link cursor-pointer">03 AI Vision</button>
            <button onClick={() => scrollToStage(3)} className="void-link cursor-pointer">04 ASI Action</button>
          </div>

          <div className="flex items-center gap-4">
            {currentUser ? (
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-[#8052ff]">{currentUser.name}</span>
                <button
                  onClick={onLogout}
                  className="ghost-pill-btn text-xs font-mono"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="ghost-pill-btn text-xs font-mono uppercase"
              >
                Officer 2FA
              </button>
            )}

            <button
              onClick={onExplorePlatform}
              className="iris-pill-btn text-xs"
            >
              <span>Launch Studio</span>
              <span className="text-xs">→</span>
            </button>
          </div>
        </nav>

        {/* 2. Full-Screen Three.js Morphing Constellation Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-10 animate-canvas-entrance"
        />

        {/* 3. Scrollytelling Typographic Content Overlay */}
        <div className="relative z-20 flex-1 max-w-[1500px] w-full mx-auto px-6 sm:px-10 flex items-center justify-center">
          
          {/* ========================================================================= */}
          {/* STAGE 1 (p in [0.00, 0.25]): Living Digital Twin (Left Asymmetric Column) */}
          {/* ========================================================================= */}
          <div
            style={getStageStyle(0.0, 0.0, 0.17, 0.25)}
            className="absolute left-6 sm:left-10 max-w-2xl space-y-6 transition-opacity duration-200 p-8 sm:p-10 rounded-[40px] bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.85)_0%,_rgba(0,0,0,0)_75%)] backdrop-blur-[2px]"
          >
            <div className="animate-premium-1 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111111] text-[11px] font-mono uppercase tracking-wider text-[#ffb829]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ffb829] animate-void-pulse" />
              <span>BUILT HERITAGE INTELLIGENCE · SIH 2026</span>
            </div>

            <h1 className="animate-premium-2 display-title font-normal tracking-[-0.045em] text-white">
              Living Digital Twin.
            </h1>

            <p className="animate-premium-3 body-copy text-[#bdbdbd] max-w-xl">
              Bridging isolated data into a persistent 3D spatial twin linking historical inspection captures and live telemetry directly to monument component identities.
            </p>

            <div className="animate-premium-4 flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onLaunchTwin}
                className="iris-pill-btn px-6 py-4 text-sm cursor-pointer"
              >
                <span>Launch Digital Twin</span>
                <span className="text-sm">→</span>
              </button>

              <button
                onClick={() => scrollToStage(1)}
                className="ghost-pill-btn text-sm cursor-pointer"
              >
                <span>Scroll to Discover ↓</span>
              </button>
            </div>

            <div className="animate-premium-5 pt-6 border-t border-[#1a1a1a] flex gap-8 text-xs font-mono text-[#9a9a9a]">
              <div>
                <strong className="text-white block text-sm font-semibold">3,690+</strong>
                Centrally Protected
              </div>
              <div>
                <strong className="text-[#8052ff] block text-sm font-semibold">8 Class</strong>
                Neural Vision AI
              </div>
              <div>
                <strong className="text-[#ffb829] block text-sm font-semibold">2030</strong>
                Decay Horizon
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* STAGE 2 (p in [0.20, 0.52]): The Problem — Isolated Silos & Chaos        */}
          {/* ========================================================================= */}
          <div
            style={getStageStyle(0.20, 0.26, 0.44, 0.52)}
            className="absolute left-1/2 -translate-x-1/2 w-full max-w-3xl text-center space-y-6 transition-opacity duration-200 px-6 sm:px-12 py-8 sm:py-12 rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.88)_0%,_rgba(0,0,0,0)_75%)] backdrop-blur-[2px]"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111111] text-[11px] font-mono uppercase tracking-wider text-[#ffb829]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ffb829]" />
              <span>THE BOTTLENECK · EPISODIC SURVEILLANCE</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-[-0.04em] text-white leading-tight">
              Conservation in India is reactive, episodic, and siloed.
            </h2>

            <p className="body-copy text-[#bdbdbd] max-w-2xl mx-auto">
              Capillary moisture ingress, sub-surface salt efflorescence, and tensile micro-cracks develop invisibly for years between periodic inspection reports.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-xs font-mono text-left max-w-2xl mx-auto">
              <div className="p-4 rounded-2xl bg-[#0a0a0a]/90 backdrop-blur-md border border-[#1a1a1a]">
                <span className="text-[#ffb829] block font-bold mb-1">01 Data Silos</span>
                <span className="text-[#9a9a9a]">Drone photos & LIDAR scans trapped in local drives</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#0a0a0a]/90 backdrop-blur-md border border-[#1a1a1a]">
                <span className="text-[#8052ff] block font-bold mb-1">02 Hidden Decay</span>
                <span className="text-[#9a9a9a]">Sub-surface shear cracks remain unmonitored</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#0a0a0a]/90 backdrop-blur-md border border-[#1a1a1a]">
                <span className="text-[#15846e] block font-bold mb-1">03 Reactive Cost</span>
                <span className="text-[#9a9a9a]">Emergency repairs cost 15x preventive sealing</span>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* STAGE 3 (p in [0.46, 0.76]): AI Vision & Physics-Informed Prediction      */}
          {/* ========================================================================= */}
          <div
            style={getStageStyle(0.46, 0.52, 0.69, 0.76)}
            className="absolute right-6 sm:right-10 lg:right-52 xl:right-60 max-w-xl space-y-6 text-left transition-opacity duration-200 ml-auto p-8 sm:p-10 rounded-[40px] bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.85)_0%,_rgba(0,0,0,0)_75%)] backdrop-blur-[2px]"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111111] text-[11px] font-mono uppercase tracking-wider text-[#ffb829]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ffb829] animate-pulse" />
              <span>CLOSED-LOOP INTELLIGENCE</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-[-0.04em] text-white leading-tight">
              Multi-Scale Vision & ISO 31000 Triage.
            </h2>

            <p className="body-copy text-[#bdbdbd]">
              OpenCV bilateral edge extraction calculates crack aperture (mm) and moisture masks, forecasting decay trajectories up to 2030 via coupled fracture mechanics.
            </p>

            <div className="space-y-3 pt-2 font-mono text-xs">
              <div className="flex justify-between items-center py-2 border-b border-[#1a1a1a]">
                <span className="text-[#9a9a9a]">OpenCV Aperture Measurement:</span>
                <span className="text-[#ffb829] font-bold">2.20 mm (Tensile Fissure)</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-[#1a1a1a]">
                <span className="text-[#9a9a9a]">Paris-Erdogan Growth Rate:</span>
                <span className="text-[#8052ff] font-bold">3.45 cm / yr Expansion</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-[#1a1a1a]">
                <span className="text-[#9a9a9a]">ISO 31000 Risk Formula:</span>
                <span className="text-white font-bold">74 / 100 · High Urgency</span>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* STAGE 4 (p in [0.70, 1.00]): Actionable ASI Work Order & Intervention    */}
          {/* ========================================================================= */}
          <div
            style={getStageStyle(0.70, 0.76, 0.98, 1.0)}
            className="absolute left-1/2 -translate-x-1/2 w-full max-w-3xl text-center space-y-6 transition-opacity duration-200 px-6 sm:px-12 py-8 sm:py-12 rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.88)_0%,_rgba(0,0,0,0)_75%)] backdrop-blur-[2px]"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111111] text-[11px] font-mono uppercase tracking-wider text-[#8052ff]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8052ff] animate-pulse" />
              <span>NATIONAL MISSION ON MONUMENTS & ANTIQUITIES</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-[-0.04em] text-white leading-tight">
              Act before damage becomes irreversible.
            </h2>

            <p className="body-copy text-[#bdbdbd] max-w-2xl mx-auto">
              Automate official ASI Form HS-2026 Conservation Work Orders and evidence-based intervention ranking.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                onClick={onOpenDossier}
                className="iris-pill-btn px-6 py-4 text-sm cursor-pointer"
              >
                <span>Generate ASI Work Order</span>
                <span className="text-sm">→</span>
              </button>

              <button
                onClick={onExplorePlatform}
                className="ghost-pill-btn text-sm border border-[#333333] cursor-pointer"
              >
                <span>Explore Full Platform & Radar</span>
              </button>
            </div>

            <p className="text-[11px] font-mono text-[#9a9a9a] pt-2">
              AMASR Act 1958 Compliant · 2FA Officer Digital Sign-Off · ISO 31000 Auditable
            </p>
          </div>

        </div>

        {/* 4. Floating Stage Indicator (Right Edge) */}
        <div className="fixed right-6 sm:right-10 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3.5 font-mono text-xs pointer-events-auto p-4 rounded-2xl bg-[#000000]/90 backdrop-blur-xl border border-[#222222] shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
          {[
            { idx: 0, label: '01 Living Twin' },
            { idx: 1, label: '02 Problem' },
            { idx: 2, label: '03 AI Vision' },
            { idx: 3, label: '04 ASI Action' }
          ].map(s => {
            const isActive = activeStageIndex === s.idx;
            return (
              <button
                key={s.idx}
                onClick={() => scrollToStage(s.idx)}
                className={`flex items-center justify-between gap-4 text-right transition-all cursor-pointer group ${
                  isActive ? 'text-white font-medium' : 'text-[#888888] hover:text-white'
                }`}
              >
                <span className={`text-[12px] transition-colors ${isActive ? 'text-[#8052ff] font-bold' : ''}`}>
                  {s.label}
                </span>
                <span
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'bg-[#8052ff] scale-125 shadow-[0_0_12px_#8052ff]'
                      : 'bg-[#444444] group-hover:bg-[#888888]'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* 5. Minimal Bottom Scroll Cue */}
        <div className="relative z-30 w-full max-w-[1500px] mx-auto px-6 sm:px-10 h-16 flex items-center justify-between text-xs font-mono text-[#666666] pointer-events-auto">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8052ff] animate-ping" />
            <span>Progress: {Math.round(scrollProgress * 100)}%</span>
          </div>

          <div className="animate-bounce text-[#9a9a9a]">
            {scrollProgress < 0.9 ? '↓ Scroll to experience morphing telemetry' : '↓ Scroll into platform modules'}
          </div>
        </div>

      </div>

    </div>
  );
}
