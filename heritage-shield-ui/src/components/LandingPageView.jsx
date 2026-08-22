import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  Activity,
  Layers,
  Eye,
  Clock,
  Compass,
  FileCheck2,
  Cpu,
  ArrowRight,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Database,
  BarChart3,
  MapPin,
  CheckCircle2,
  Lock,
  Globe,
  Radio
} from 'lucide-react';

export default function LandingPageView({ onEnterDashboard, onSelectMonument, sites = [] }) {
  const [activeTab, setActiveTab] = useState('loop'); // 'loop' | 'twin' | 'vision' | 'risk'

  const coreLoopSteps = [
    { step: '01', title: 'OBSERVE', desc: 'Ingest historical archival photos, LiDAR point clouds, drone photogrammetry & real-time weather.' },
    { step: '02', title: 'DIGITISE', desc: 'Generate component-level 3D Living Twin (C-01 to C-04) with PBR stone materials and WGS84 GPS anchor.' },
    { step: '03', title: 'ASSESS', desc: 'OpenCV 4.10 bilateral filter + Canny edge segmentation to extract sub-mm crack aperture, length & dampness.' },
    { step: '04', title: 'TRACK', desc: 'Temporal forensic delta comparison between 2024 Baseline vs 2026 Inspection (+38.2% growth rate).' },
    { step: '05', title: 'PREDICT', desc: 'Multi-year stochastic time-series decay forecasting (2020–2028) with confidence uncertainty bands.' },
    { step: '06', title: 'PRIORITISE', desc: 'ISO 31000 explainable multi-factor vulnerability ranking (Condition, Velocity, Seismic Hazard, Significance).' },
    { step: '07', title: 'ACT', desc: 'Generate official ASI Form HS-2026 Conservation Work-Order with officer PIN authentication (PIN 2026).' },
    { step: '08', title: 'LEARN', desc: 'Closed-loop feedback: post-intervention monitoring updates the asset historical degradation model.' },
  ];

  const flagshipSites = sites.slice(0, 6);

  return (
    <div className="min-h-screen bg-[#07080A] text-[#EDE8DE] font-sans selection:bg-[#C5A059] selection:text-[#07080A] overflow-x-hidden">
      
      {/* 🌟 1. TOP 21st.dev GLASSMORPHIC NAVIGATION BAR */}
      <motion.nav 
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="sticky top-0 z-50 bg-[#0A0C10]/85 backdrop-blur-xl border-b border-[#1A1E26] px-6 py-3.5 shadow-2xl"
      >
        <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-4">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#C5A059] via-[#8C6D38] to-[#38BDF8] p-[1px] shadow-lg shadow-amber-950/40">
              <div className="w-full h-full bg-[#0E1013] rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-[#C5A059]" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-black text-lg tracking-wide text-white">HERITAGE SHIELD</span>
                <span className="hidden sm:inline-block text-[9px] font-mono uppercase px-2 py-0.5 rounded-full bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/30 font-bold">
                  SIH '26 · Team 031
                </span>
              </div>
              <p className="text-[11px] text-gray-400 font-mono hidden md:block">
                Archaeological Survey of India · Ministry of Culture
              </p>
            </div>
          </div>

          {/* Center Links */}
          <div className="hidden lg:flex items-center gap-6 text-xs font-mono text-gray-300">
            <a href="#features" className="hover:text-[#C5A059] transition">Capabilities</a>
            <a href="#workflow" className="hover:text-[#C5A059] transition">8-Step Decision Loop</a>
            <a href="#twin" className="hover:text-[#C5A059] transition">3D Digital Twin</a>
            <a href="#radar" className="hover:text-[#C5A059] transition">GIS Radar</a>
            <a href="#architecture" className="hover:text-[#C5A059] transition">Architecture</a>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-[#12151B] border border-[#222834] px-3 py-1.5 rounded-xl text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-gray-300">12 Flagship Nodes</span>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onEnterDashboard}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#DFB76C] text-[#07080A] font-mono text-xs font-bold tracking-wide shadow-lg shadow-amber-950/40 hover:shadow-amber-500/20 transition flex items-center gap-2 group cursor-pointer"
            >
              <span>National GIS Dashboard</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>

        </div>
      </motion.nav>

      {/* 🚀 2. HERO SECTION WITH 21st.dev AMBIENT GLOW & TYPOGRAPHY */}
      <section className="relative pt-16 pb-24 px-6 overflow-hidden">
        
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-[#C5A059]/15 via-[#38BDF8]/10 to-transparent blur-[120px] pointer-events-none rounded-full" />
        <div className="absolute top-12 left-10 w-72 h-72 bg-amber-600/10 blur-[100px] pointer-events-none rounded-full" />
        <div className="absolute top-20 right-10 w-80 h-80 bg-sky-600/10 blur-[110px] pointer-events-none rounded-full" />

        <div className="max-w-[1400px] mx-auto text-center space-y-8 relative z-10">
          
          {/* Badge Pill */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#12151B]/90 border border-[#C5A059]/30 text-xs font-mono text-gray-200 shadow-xl backdrop-blur-md"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C5A059] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C5A059]"></span>
            </span>
            <span className="text-[#C5A059] font-bold">Smart India Hackathon '26</span>
            <span className="text-gray-500">|</span>
            <span>Simulation and Digital Twin Category</span>
          </motion.div>

          {/* Hero Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-4 max-w-5xl mx-auto"
          >
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-black tracking-tight text-white leading-[1.1]">
              AI-Assisted Digital Twin for <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-[#F3EFE6] via-[#C5A059] to-[#38BDF8] bg-clip-text text-transparent">
                Predictive Conservation
              </span>{' '}
              of India's Heritage
            </h1>
            <p className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto font-sans leading-relaxed">
              Transforming fragmented historical photographs, drone photogrammetry, and meteorological sensors into an explainable, component-level living 3D decision platform for the Archaeological Survey of India.
            </p>
          </motion.div>

          {/* Hero CTA Group */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-2"
          >
            <button
              onClick={onEnterDashboard}
              className="px-8 py-3.5 rounded-xl bg-[#C5A059] hover:bg-[#D8B46E] text-[#07080A] font-mono text-sm font-bold tracking-wide shadow-2xl shadow-amber-950/60 transition-all transform hover:-translate-y-0.5 flex items-center gap-3 cursor-pointer"
            >
              <Globe className="w-4 h-4" />
              <span>Launch National GIS Radar (12 Sites)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="#workflow"
              className="px-6 py-3.5 rounded-xl bg-[#11141A] hover:bg-[#181C24] border border-[#232A36] text-gray-200 font-mono text-sm font-medium transition flex items-center gap-2"
            >
              <span>Explore Technical Architecture</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </a>
          </motion.div>

          {/* 📊 High-Trust Metric Counters (21st.dev Bento Ribbon) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto pt-8 text-left"
          >
            <div className="bg-[#0E1117]/80 backdrop-blur-md border border-[#1A1F29] p-5 rounded-2xl shadow-xl space-y-1">
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">Protected Assets</span>
              <div className="text-2xl sm:text-3xl font-mono font-bold text-white">3,696</div>
              <p className="text-[11px] text-gray-400 font-sans">Centrally Protected Monuments (CPMs)</p>
            </div>

            <div className="bg-[#0E1117]/80 backdrop-blur-md border border-[#1A1F29] p-5 rounded-2xl shadow-xl space-y-1">
              <span className="text-[10px] font-mono text-[#C5A059] uppercase tracking-wider block">Living Digital Twins</span>
              <div className="text-2xl sm:text-3xl font-mono font-bold text-[#C5A059]">12 Nodes</div>
              <p className="text-[11px] text-gray-400 font-sans">Full PBR 3D Component Models</p>
            </div>

            <div className="bg-[#0E1117]/80 backdrop-blur-md border border-[#1A1F29] p-5 rounded-2xl shadow-xl space-y-1">
              <span className="text-[10px] font-mono text-sky-400 uppercase tracking-wider block">AI Computer Vision</span>
              <div className="text-2xl sm:text-3xl font-mono font-bold text-sky-400">Sub-mm</div>
              <p className="text-[11px] text-gray-400 font-sans">OpenCV 4.10 Metric Calibration</p>
            </div>

            <div className="bg-[#0E1117]/80 backdrop-blur-md border border-[#1A1F29] p-5 rounded-2xl shadow-xl space-y-1">
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block">Spatial Framework</span>
              <div className="text-2xl sm:text-3xl font-mono font-bold text-emerald-400">ISRO Bhuvan</div>
              <p className="text-[11px] text-gray-400 font-sans">WGS84 + BIS IS 1893 Seismic Layers</p>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 🔄 3. CORE DECISION WORKFLOW (OBSERVE → ACT) */}
      <section id="workflow" className="py-20 px-6 border-y border-[#161920] bg-[#090B0E]/60 relative">
        <div className="max-w-[1400px] mx-auto space-y-12">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-mono text-[#C5A059] uppercase tracking-wider font-bold">
              SIH '26 Core Value Loop
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
              The 8-Step Predictive Conservation Cycle
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 font-sans">
              "The 3D model is the spatial interface; the real product is the decision workflow."
            </p>
          </div>

          {/* 8-Step Interactive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {coreLoopSteps.map((item, idx) => (
              <motion.div
                key={item.step}
                whileHover={{ y: -4, borderColor: 'rgba(197, 160, 89, 0.5)' }}
                className="bg-[#0E1117] border border-[#1C212C] p-5 rounded-2xl space-y-3 transition shadow-lg relative group overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#C5A059] bg-[#C5A059]/10 px-2.5 py-1 rounded-lg border border-[#C5A059]/20">
                    STEP {item.step}
                  </span>
                  <span className="text-[10px] font-mono text-gray-500">PHASE {Math.floor(idx / 2) + 1}</span>
                </div>
                <h3 className="text-base font-serif font-bold text-white group-hover:text-[#C5A059] transition">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-400 font-sans leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 🏛️ 4. KEY CAPABILITIES BENTO GRID (21st.dev Style) */}
      <section id="features" className="py-24 px-6 max-w-[1400px] mx-auto space-y-16">
        
        <div className="flex flex-wrap justify-between items-end gap-6 border-b border-[#1A1F29] pb-6">
          <div className="space-y-2">
            <span className="text-xs font-mono text-[#C5A059] uppercase tracking-wider font-bold">
              Autonomous Heritage Intelligence
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
              End-to-End Enterprise Architecture
            </h2>
          </div>
          <button
            onClick={onEnterDashboard}
            className="text-xs font-mono text-[#C5A059] hover:underline flex items-center gap-1.5"
          >
            <span>Open Live Interactive Platform</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Bento Card 1: 3D Twin */}
          <div className="md:col-span-2 bg-[#0E1117] border border-[#1C212C] rounded-3xl p-8 space-y-6 relative overflow-hidden shadow-2xl group hover:border-[#C5A059]/40 transition">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/25">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-white">Component-Level 3D Digital Twin Engine</h3>
                <p className="text-xs text-gray-400 font-mono">Three.js PBR Shaders · Mesh Segmentation · Sub-Structure Telemetry</p>
              </div>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed font-sans">
              Precision geometric representations of monuments (Taj Mahal, Qutub Minar, Konark, Sanchi) mapped to granular architectural sub-components (<code className="text-[#C5A059] bg-[#07080A] px-1.5 py-0.5 rounded">C-01</code> Apex to <code className="text-[#C5A059] bg-[#07080A] px-1.5 py-0.5 rounded">C-04</code> Foundation Plinth). Supports PBR Stone, LiDAR Point Cloud, and Thermographic Stress Map view modes.
            </p>
            <div className="grid grid-cols-3 gap-3 pt-2 font-mono text-xs text-gray-400">
              <div className="bg-[#08090C] p-3 rounded-xl border border-[#1A1F29]">
                <span className="text-[#C5A059] block font-bold">60 FPS</span>
                <span>WebGL Rendering</span>
              </div>
              <div className="bg-[#08090C] p-3 rounded-xl border border-[#1A1F29]">
                <span className="text-sky-400 block font-bold">PBR Stone</span>
                <span>Procedural Textures</span>
              </div>
              <div className="bg-[#08090C] p-3 rounded-xl border border-[#1A1F29]">
                <span className="text-emerald-400 block font-bold">Live Sync</span>
                <span>Open-Meteo Weather</span>
              </div>
            </div>
          </div>

          {/* Bento Card 2: AI Vision */}
          <div className="bg-[#0E1117] border border-[#1C212C] rounded-3xl p-8 space-y-6 shadow-2xl group hover:border-sky-500/40 transition">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/25">
                <Eye className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-white">AI Vision Defect Lab</h3>
                <p className="text-xs text-gray-400 font-mono">OpenCV 4.10 + PyTorch</p>
              </div>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed font-sans">
              Bilateral noise filtering, Canny edge detection, and metric contour approximations quantify crack length (<code className="text-sky-300 bg-[#07080A] px-1 py-0.5 rounded">25.1 cm</code>), aperture (<code className="text-sky-300 bg-[#07080A] px-1 py-0.5 rounded">2.2 mm</code>), and dampness zones.
            </p>
            <div className="bg-[#08090C] p-4 rounded-2xl border border-[#1A1F29] font-mono text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Detection Confidence:</span>
                <span className="text-emerald-400 font-bold">96.8%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Defect Classification:</span>
                <span className="text-amber-300 font-bold">Tensile Fissure</span>
              </div>
            </div>
          </div>

          {/* Bento Card 3: Temporal Scrubbing */}
          <div className="bg-[#0E1117] border border-[#1C212C] rounded-3xl p-8 space-y-6 shadow-2xl group hover:border-amber-500/40 transition">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/25">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-white">Temporal Forensic Scrubbing</h3>
                <p className="text-xs text-gray-400 font-mono">2024 Baseline vs 2026 Inspection</p>
              </div>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed font-sans">
              Interactive temporal split-slider tracking longitudinal deterioration velocity (<code className="text-amber-300 bg-[#07080A] px-1 py-0.5 rounded">3.45 cm/yr</code>) and cross-epoch surface expansion.
            </p>
            <div className="bg-[#08090C] p-4 rounded-2xl border border-[#1A1F29] font-mono text-xs flex justify-between items-center">
              <span className="text-gray-400">Progression Delta:</span>
              <span className="text-rose-400 font-bold text-sm">+38.2% Growth</span>
            </div>
          </div>

          {/* Bento Card 4: Explainable Risk */}
          <div className="md:col-span-2 bg-[#0E1117] border border-[#1C212C] rounded-3xl p-8 space-y-6 shadow-2xl group hover:border-emerald-500/40 transition">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-white">Explainable ISO 31000 Risk Formula</h3>
                <p className="text-xs text-gray-400 font-mono">Dynamic Multi-Factor Weighting & Calibration</p>
              </div>
            </div>
            <div className="p-4 bg-[#08090C] rounded-2xl border border-[#1A1F29] font-mono text-xs text-[#C5A059]">
              Risk Score = 0.30·Condition + 0.25·Velocity + 0.15·Hazard + 0.15·Weather + 0.15·Significance
            </div>
            <p className="text-sm text-gray-300 leading-relaxed font-sans">
              Every score is fully interpretable with exposed factor sliders. Evaluators can simulate what-if scenarios (e.g. monsoon moisture surge, seismic shock) and watch vulnerability scores dynamically recalibrate in real-time.
            </p>
          </div>

        </div>

      </section>

      {/* 🗺️ 5. FLAGSHIP MONUMENTS SHOWCASE */}
      <section id="radar" className="py-20 px-6 bg-[#090B0E] border-t border-[#1A1F29]">
        <div className="max-w-[1400px] mx-auto space-y-12">
          
          <div className="flex flex-wrap justify-between items-end gap-4">
            <div>
              <span className="text-xs font-mono text-[#C5A059] uppercase tracking-wider font-bold">
                Centrally Protected Flagship Network
              </span>
              <h2 className="text-3xl font-serif font-bold text-white">
                12 Living Heritage Digital Twins
              </h2>
            </div>
            <button
              onClick={onEnterDashboard}
              className="px-4 py-2 rounded-xl bg-[#14171E] hover:bg-[#C5A059] text-gray-200 hover:text-[#07080A] text-xs font-mono font-bold transition border border-[#252C3A]"
            >
              View Full National Radar & All 12 Sites →
            </button>
          </div>

          {/* Monuments Card Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {flagshipSites.map((site) => (
              <div
                key={site.id}
                onClick={onEnterDashboard}
                className="group cursor-pointer bg-[#0E1117] hover:bg-[#12161F] border border-[#1A1F29] hover:border-[#C5A059]/60 rounded-2xl overflow-hidden transition-all duration-300 shadow-xl hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 w-full bg-[#181C24] overflow-hidden">
                    <img
                      src={site.imageUrl}
                      alt={site.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0E1117] via-transparent to-black/60" />
                    <div className="absolute top-3 left-3 right-3 flex justify-between items-center text-[10px] font-mono">
                      <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[#C5A059] font-bold border border-[#C5A059]/30">
                        {site.id}
                      </span>
                      <span
                        className="px-2 py-0.5 rounded backdrop-blur-md font-bold uppercase text-[9px]"
                        style={{ backgroundColor: `${site.color}25`, color: site.color, border: `1px solid ${site.color}50` }}
                      >
                        {site.status}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <span className="text-[10px] font-mono text-gray-300 block mb-0.5">📍 {site.location}, {site.state}</span>
                      <h4 className="text-lg font-serif font-bold text-white group-hover:text-[#C5A059] transition drop-shadow">
                        {site.name}
                      </h4>
                    </div>
                  </div>

                  <div className="p-4 space-y-2.5 font-mono text-xs text-gray-400">
                    <div className="flex justify-between">
                      <span>Typology:</span>
                      <span className="text-gray-200">{site.material.split('&')[0]}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Vulnerability:</span>
                      <strong style={{ color: site.color }}>{site.riskScore} / 100</strong>
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <button className="w-full py-2.5 rounded-xl bg-[#161A22] group-hover:bg-[#C5A059] text-gray-200 group-hover:text-[#07080A] text-xs font-mono font-bold transition flex items-center justify-center gap-1.5">
                    <span>Inspect 3D Twin & AI Vision</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 🚀 6. FINAL CALL TO ACTION */}
      <section className="py-24 px-6 relative overflow-hidden bg-gradient-to-b from-[#090B0E] to-[#0E1117] border-t border-[#1A1F29] text-center">
        <div className="max-w-3xl mx-auto space-y-8 relative z-10">
          <span className="px-3.5 py-1.5 rounded-full bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/30 text-xs font-mono font-bold uppercase">
            Smart India Hackathon 2026 Ready
          </span>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-white">
            Experience the Future of Heritage Conservation
          </h2>
          <p className="text-sm text-gray-400 font-sans max-w-xl mx-auto">
            Ready to explore the national geospatial radar, inspect sub-mm defects in real-time, and test predictive decay simulations?
          </p>
          <div className="pt-2">
            <button
              onClick={onEnterDashboard}
              className="px-10 py-4 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#DFB76C] text-[#07080A] font-mono text-base font-bold tracking-wide shadow-2xl shadow-amber-950/60 hover:shadow-amber-500/30 transition transform hover:-translate-y-1 cursor-pointer"
            >
              Enter National GIS Dashboard & Studio 🚀
            </button>
          </div>
        </div>
      </section>

      {/* 🏛️ 7. FOOTER */}
      <footer className="border-t border-[#161920] bg-[#07080A] py-8 px-6 text-center font-mono text-xs text-gray-500 space-y-2">
        <div className="text-gray-400 font-medium">HERITAGE SHIELD · Smart India Hackathon '26 · Team ID: 031 (Qualified)</div>
        <div className="text-[11px] text-gray-600">
          Somaiya Vidyavihar University · Archaeological Survey of India (ASI) & Ministry of Culture
        </div>
      </footer>

    </div>
  );
}
