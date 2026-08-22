import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeritageShieldLogo from './HeritageShieldLogo';
import ThemeToggle from './ThemeToggle';
import MonumentViewer3D from './MonumentViewer3D';
import HeritageGisMap from './HeritageGisMap';

import {
  Shield,
  Layers,
  Eye,
  Clock,
  Compass,
  ArrowRight,
  ChevronRight,
  ChevronDown,
  BarChart3,
  Globe,
  Radio,
  AlertTriangle,
  FileText,
  Activity,
  CheckCircle2,
  TrendingUp,
  MapPin,
  Sparkles,
  Sliders,
  Cpu,
  Search,
  Maximize2,
  Play,
  Pause,
  RefreshCw,
  Zap,
  Thermometer,
  Droplets,
  HelpCircle,
  Award,
  Box,
  Scan,
  Workflow
} from 'lucide-react';

export default function LandingPageView({ onEnterDashboard, onSelectMonument, sites = [] }) {
  // State for Interactive Hero Banner Display Mode
  const [heroMode, setHeroMode] = useState('split'); // 'split' | 'wireframe' | 'stone'
  const [activeWorkflowIndex, setActiveWorkflowIndex] = useState(0);
  
  // State for Interactive Sandbox Showcase
  const [showcaseTab, setShowcaseTab] = useState('twin'); // 'twin' | 'vision' | 'temporal' | 'gis'
  const [sliderPosition, setSliderPosition] = useState(50);
  const [selectedTwinSiteIdx, setSelectedTwinSiteIdx] = useState(0);
  
  // State for Environmental Stress Simulator
  const [simMonsoon, setSimMonsoon] = useState(35);
  const [simSeismic, setSimSeismic] = useState(1.25);
  
  // State for FAQ Accordion
  const [activeFaq, setActiveFaq] = useState(null);

  // Computed simulation values
  const simulatedHealth = Math.max(18, Math.round(100 - (simMonsoon * 0.45 + (simSeismic - 0.8) * 40)));
  const simulatedUrgency = simulatedHealth < 45 ? 'CRITICAL' : simulatedHealth < 70 ? 'WATCH' : 'STABLE';

  // 8 Process Steps for "The decision layer, module by module"
  const workflowSteps = [
    { 
      step: '01', 
      kicker: '01 · 3D Digital Twin',
      title: 'Interactive 3D Model of the Site', 
      desc: 'Instead of just looking at flat photos, explore a live 3D model of the monument. You can rotate, zoom in, and click directly on individual domes, walls, pillars, or foundations to check their condition.'
    },
    { 
      step: '02', 
      kicker: '02 · AI Defect Scanner',
      title: 'Smart Image Damage Detection', 
      desc: 'Upload an inspection photo and AI instantly scans for cracks, moisture patches, peeling stone, and erosion. It highlights subtle hairline defects that might otherwise be missed.'
    },
    { 
      step: '03', 
      kicker: '03 · Change Over Time',
      title: 'Tracking Damage Growth', 
      desc: 'Compare photos from previous years against today. The system clearly measures whether a crack has expanded or if dampness has spread after heavy monsoon rains.'
    },
    { 
      step: '04', 
      kicker: '04 · Health Score (0–100)',
      title: 'Simple, Transparent Health Rating', 
      desc: 'Every structural part gets a clear score from 0 to 100 with simple color codes: Green is safe, Yellow needs monitoring, and Red requires urgent repair.'
    },
    { 
      step: '05', 
      kicker: '05 · Disaster Risk Layer',
      title: 'Weather & Earthquake Exposure', 
      desc: 'We combine monument health with real-time weather, flood zones, and earthquake fault lines so authorities can protect vulnerable sites before disasters hit.'
    },
    { 
      step: '06', 
      kicker: '06 · Future Decay Prediction',
      title: 'Forecasting Decay Till 2030', 
      desc: 'See how cracks will grow over the next 4 to 6 years if left untreated. Fixing a minor crack today for ₹3 Lakhs prevents ₹70+ Lakhs in catastrophic rebuild costs later.'
    },
    { 
      step: '07', 
      kicker: '07 · Priority Ranking',
      title: 'National Priority To-Do List', 
      desc: 'Automatically ranks all monitored heritage structures across the country by urgency, ensuring funds and conservation teams are sent to the most endangered sites first.'
    },
    { 
      step: '08', 
      kicker: '08 · Official Action Plan',
      title: 'Actionable Conservation Reports', 
      desc: 'Generates formal ASI work orders with prescribed mortar mixtures, scaffolding instructions, and cost estimates ready for conservation architects to sign off.'
    }
  ];


  const processFlowItems = [
    { label: 'Observe', desc: 'Field Imagery & Drone Scans' },
    { label: 'Digitise', desc: '3D Point Cloud & BIM Mesh' },
    { label: 'Assess', desc: 'OpenCV Multi-Defect Extraction' },
    { label: 'Track', desc: 'Multi-Epoch Change Delta' },
    { label: 'Predict', desc: '2030 Non-Linear Physics Decay' },
    { label: 'Prioritise', desc: 'ISO 31000 Explainable Ranking' },
    { label: 'Act', desc: 'Official ASI Work-Order' }
  ];

  const faqs = [
    {
      q: 'How does Heritage Shield generate the 3D Digital Twin?',
      a: 'The system ingests high-resolution photogrammetric drone scans, LiDAR point clouds, and historical architectural blueprints to synthesize component-indexed 3D PBR models rendered with WebGL / Three.js at 60 FPS.'
    },
    {
      q: 'How does the 2030 temporal crack progression API work?',
      a: 'Rather than static formulas, Heritage Shield executes a physics-informed FastAPI prediction endpoint applying the Paris-Erdogan fracture mechanics law coupled with capillary moisture diffusion and localized seismic/monsoon hazard coefficients.'
    },
    {
      q: 'Does the AI replace human conservation architects?',
      a: 'Never. In accordance with the UNESCO Venice Charter and ASI conservation ethics, Heritage Shield acts purely as an assistive diagnostics and decision-support layer — providing auditable telemetry while reserving all intervention approvals for certified experts.'
    },
    {
      q: 'How is national geospatial telemetry integrated?',
      a: 'The platform links ISRO Bhuvan WGS84 GIS layers, IMD precipitation radar, and BIS IS 1893 seismic hazard fault lines to dynamically update monument vulnerability ratings across all 12 Centrally Protected Monuments.'
    }
  ];

  const flagshipSites = sites.slice(0, 6);

  return (
    <div className="min-h-screen bg-[#07080A] text-[#EDE8DE] font-sans selection:bg-[#C5A059] selection:text-[#07080A] overflow-x-hidden relative">
      
      {/* Background Ambient Dot Matrix */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(197, 160, 89, 0.12) 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
      />

      {/* 🌟 1. TOP LUXURY NAVIGATION BAR */}
      <motion.nav 
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 bg-[#090B0E]/90 backdrop-blur-xl border-b border-[#1C2029] px-6 py-3.5 shadow-2xl"
      >
        <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-4">
          
          {/* Logo Brand */}
          <HeritageShieldLogo
            size="md"
            showText={true}
            textClassName="text-lg"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          />

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center gap-7 text-xs font-mono text-gray-300">
            <a href="#hero-banner" className="hover:text-[#C5A059] transition">Overview</a>
            <a href="#workflow-ribbon" className="hover:text-[#C5A059] transition">Process Loop</a>
            <a href="#decision-modules" className="hover:text-[#C5A059] transition">Decision Architecture</a>
            <a href="#sandbox-showcase" className="hover:text-[#C5A059] transition">Live Twin Console</a>
            <a href="#climate-simulator" className="hover:text-[#C5A059] transition">2030 Predictor</a>
            <a href="#monument-registry" className="hover:text-[#C5A059] transition">Monuments</a>
            <a href="#faq" className="hover:text-[#C5A059] transition">FAQ</a>
          </div>

          {/* Right Action & Theme Toggle */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onEnterDashboard}
              className="px-5 py-2 rounded-xl bg-[#D97706] hover:bg-[#B45309] text-white font-mono text-xs font-bold tracking-wide shadow-lg shadow-amber-950/40 transition flex items-center gap-2 group cursor-pointer"
            >
              <span>Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>

        </div>
      </motion.nav>

      {/* ========================================================================= */}
      {/* 🚀 2. ICONIC HERO PANORAMIC BANNER (LOVABLE / 21ST.DEV STYLE)             */}
      {/* ========================================================================= */}
      <section id="hero-banner" className="relative pt-6 pb-12 px-4 sm:px-6 max-w-[1600px] mx-auto">
        
        <div className="relative rounded-3xl overflow-hidden border border-[#232A38] bg-[#0A0C10] shadow-2xl min-h-[540px] flex items-center">
          
          {/* Background Heritage Architectural Imagery & 3D Wireframe Split */}
          <div className="absolute inset-0 z-0 select-none">
            
            {/* Photographic Stone Background */}
            <img
              src="/monuments/khajuraho.jpg"
              alt="Indian Built Heritage Architecture"
              className={`absolute inset-0 w-full h-full object-cover object-center filter transition-all duration-700 ${
                heroMode === 'wireframe' ? 'opacity-10 brightness-50' : 'opacity-85 brightness-90 contrast-105'
              }`}
            />

            {/* Dark Radial Gradient Mask on Left for High Readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#07080A] via-[#07080A]/85 to-transparent z-10 w-full lg:w-[65%]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07080A] via-transparent to-transparent z-10" />

            {/* 🌐 3D Wireframe / LiDAR Scanning Mesh Overlay (Right Half) */}
            {(heroMode === 'split' || heroMode === 'wireframe') && (
              <div 
                className="absolute inset-y-0 right-0 w-full lg:w-[55%] z-10 pointer-events-none opacity-70"
                style={{
                  maskImage: 'linear-gradient(to right, transparent, black 25%)',
                  WebkitMaskImage: 'linear-gradient(to right, transparent, black 25%)'
                }}
              >
                {/* Wireframe Grid */}
                <div className="absolute inset-0 bg-wireframe-grid opacity-80" />
                <div className="absolute inset-0 bg-lidar-cyan-grid opacity-50" />

                {/* Sweeping Laser Scanline */}
                <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#38BDF8] to-transparent shadow-[0_0_15px_#38BDF8] animate-laser-scan z-20" />

                {/* Animated Pulsing Coordinate Nodes */}
                <div className="absolute top-1/4 right-1/4 w-3 h-3 rounded-full bg-[#C5A059] animate-ping" />
                <div className="absolute top-1/3 right-1/3 w-2.5 h-2.5 rounded-full bg-[#38BDF8] animate-pulse" />
                <div className="absolute bottom-1/3 right-1/5 w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                <div className="absolute bottom-1/4 right-2/5 w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              </div>
            )}

          </div>

          {/* Foreground Hero Content (Left Side) */}
          <div className="relative z-20 p-8 sm:p-12 lg:p-16 max-w-2xl space-y-6">
            
            {/* Main Editorial Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold text-white tracking-tight leading-[1.05]"
            >
              Heritage Shield
            </motion.h1>

            {/* Clean Subtitle Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-gray-300 font-sans leading-relaxed"
            >
              Heritage Shield turns fragmented photographs, inspections and hazard data into a living digital twin — then ranks exactly what conservation teams should attend to first.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <button
                onClick={onEnterDashboard}
                className="px-6 py-3 rounded-xl bg-[#C5A059] hover:bg-[#D8B46E] text-[#07080A] font-mono text-xs font-bold tracking-wide shadow-xl shadow-amber-950/40 transition flex items-center gap-2 cursor-pointer"
              >
                <span>Open Authority Studio</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#sandbox-showcase"
                className="px-5 py-3 rounded-xl bg-[#14171E] hover:bg-[#1C212B] border border-[#2B313D] text-gray-200 font-mono text-xs font-semibold transition flex items-center gap-2 cursor-pointer"
              >
                <Scan className="w-4 h-4 text-cyan-400" />
                <span>Explore Interactive Showcase</span>
              </a>
            </motion.div>

          </div>

        </div>

      </section>

      {/* ========================================================================= */}
      {/* 🏛️ 3. "THE DECISION LAYER, MODULE BY MODULE" (8 DETAILED MODULES)          */}
      {/* ========================================================================= */}
      <section id="decision-modules" className="py-20 px-6 max-w-[1600px] mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-mono text-[#C5A059] uppercase tracking-wider font-bold">
            Workflow & System Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#F3EFE6] tracking-tight">
            The decision layer, module by module
          </h2>
          <p className="text-base sm:text-lg text-gray-400 font-sans leading-relaxed">
            The 3D twin is the spatial interface. The real product is the workflow that connects evidence to an action a conservation authority can defend.
          </p>
        </div>

        {/* 8-Module Interactive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {workflowSteps.map((mod, idx) => {
            const isSelected = activeWorkflowIndex === idx;
            return (
              <div
                key={mod.step}
                onClick={() => setActiveWorkflowIndex(idx)}
                className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-4 group ${
                  isSelected
                    ? 'bg-[#12151D] border-[#C5A059] shadow-2xl shadow-amber-950/20 ring-1 ring-[#C5A059]/50 -translate-y-1'
                    : 'bg-[#0B0D12] border-[#1A1F29] hover:border-[#2B313D] hover:bg-[#0E1117]'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className={`font-bold px-2 py-0.5 rounded ${isSelected ? 'bg-[#C5A059] text-black' : 'bg-[#161922] text-[#C5A059]'}`}>
                      Step {mod.step}
                    </span>
                    <span className="text-gray-500 font-semibold">{mod.kicker.split('·')[1]}</span>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-[#F3EFE6] group-hover:text-white leading-snug">
                    {mod.title}
                  </h3>

                  <p className="text-xs text-gray-300 font-sans leading-relaxed">
                    {mod.desc}
                  </p>
                </div>

              </div>
            );
          })}
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 💻 4. INTERACTIVE LIVE CONSOLE SANDBOX SHOWCASE                           */}
      {/* ========================================================================= */}
      <section id="sandbox-showcase" className="py-16 px-6 bg-[#090B0E] border-y border-[#181C24]">
        <div className="max-w-[1600px] mx-auto space-y-8">
          
          <div className="flex flex-wrap justify-between items-end gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#F3EFE6] mt-1">
                Experience the 4 Core Intelligence Consoles
              </h2>
            </div>

            {/* Showcase Tabs */}
            <div className="bg-[#121418] p-1 rounded-xl border border-[#1E2228] flex items-center gap-1 font-mono text-xs overflow-x-auto">
              <button
                onClick={() => setShowcaseTab('twin')}
                className={`px-4 py-2 rounded-lg transition flex items-center gap-2 cursor-pointer ${
                  showcaseTab === 'twin' ? 'bg-[#C5A059] text-black font-bold shadow' : 'text-gray-400 hover:text-white'
                }`}
              >
                <span>🏛️</span>
                <span>3D Living Twin</span>
              </button>
              <button
                onClick={() => setShowcaseTab('vision')}
                className={`px-4 py-2 rounded-lg transition flex items-center gap-2 cursor-pointer ${
                  showcaseTab === 'vision' ? 'bg-cyan-600 text-white font-bold shadow' : 'text-gray-400 hover:text-white'
                }`}
              >
                <span>🔍</span>
                <span>AI Defect Vision</span>
              </button>
              <button
                onClick={() => setShowcaseTab('temporal')}
                className={`px-4 py-2 rounded-lg transition flex items-center gap-2 cursor-pointer ${
                  showcaseTab === 'temporal' ? 'bg-purple-600 text-white font-bold shadow' : 'text-gray-400 hover:text-white'
                }`}
              >
                <span>📈</span>
                <span>2030 Decay Predictor</span>
              </button>
              <button
                onClick={() => setShowcaseTab('gis')}
                className={`px-4 py-2 rounded-lg transition flex items-center gap-2 cursor-pointer ${
                  showcaseTab === 'gis' ? 'bg-emerald-600 text-white font-bold shadow' : 'text-gray-400 hover:text-white'
                }`}
              >
                <span>🗺️</span>
                <span>GIS Radar</span>
              </button>
            </div>
          </div>

          {/* Sandbox Showcase Display Container */}
          <div className="bg-[#0E1013] border border-[#1E2228] rounded-2xl overflow-hidden shadow-2xl p-6 sm:p-8">
            
            {showcaseTab === 'twin' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-5 space-y-4">
                  <span className="text-xs font-mono text-[#C5A059] uppercase font-bold">Interactive 3D Simulation</span>
                  <h3 className="text-2xl font-serif font-bold text-white">
                    Living 3D Digital Twin of the Monument
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed font-sans">
                    A realistic 3D model of the monument. You can rotate 360°, zoom in, and click directly on individual domes, balconies, pillars, or base walls to inspect their condition history.
                  </p>
                  
                  {/* Select 3D Twin Custom Dropdown */}
                  <div className="pt-2 space-y-1.5">
                    <label className="text-xs font-mono text-[#C5A059] block font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <span>🏛️</span>
                      <span>Select Monument:</span>
                    </label>
                    <div className="relative">
                      <select
                        value={selectedTwinSiteIdx}
                        onChange={(e) => setSelectedTwinSiteIdx(Number(e.target.value))}
                        className="w-full appearance-none bg-gradient-to-r from-[#12151B] to-[#181C24] border border-[#2B313D] hover:border-[#C5A059] text-gray-100 text-sm font-serif font-bold py-3 pl-4 pr-10 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#C5A059] focus:border-[#C5A059] cursor-pointer shadow-lg transition duration-200"
                      >
                        {sites.map((s, idx) => (
                          <option key={s.id || idx} value={idx} className="bg-[#0B0D11] text-gray-200 py-2">
                            {s.name} ({s.state})
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-[#C5A059]">
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => onSelectMonument ? onSelectMonument(selectedTwinSiteIdx) : onEnterDashboard()}
                      className="px-6 py-2.5 rounded-xl bg-[#C5A059] text-black font-mono text-xs font-bold hover:bg-[#D8B46E] transition cursor-pointer shadow-lg"
                    >
                      Open 3D Studio →
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-7 h-[530px] min-h-[530px] relative rounded-xl overflow-hidden border border-[#2B313D] shadow-2xl bg-[#060709]">
                  <MonumentViewer3D
                    siteIndex={selectedTwinSiteIdx}
                    siteData={sites[selectedTwinSiteIdx] || sites[0]}
                    activeComponent={0}
                    isEmbedded={true}
                  />
                </div>
              </div>
            )}

            {showcaseTab === 'vision' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-5 space-y-4">
                  <span className="text-xs font-mono text-cyan-400 uppercase font-bold">AI Image Scanner</span>
                  <h3 className="text-2xl font-serif font-bold text-white">
                    Automatic Damage & Crack Detection
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed font-sans">
                    Smart computer vision scans inspection photos to detect cracks, peeling stone, and water dampness. It measures the exact length and width of cracks to catch damage early.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={onEnterDashboard}
                      className="px-6 py-2.5 rounded-xl bg-cyan-600 text-white font-mono text-xs font-bold hover:bg-cyan-500 transition cursor-pointer"
                    >
                      Open AI Diagnostics Lab →
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-7 h-[480px] min-h-[480px] relative rounded-xl overflow-hidden border border-[#2B313D] shadow-2xl bg-black flex items-center justify-center">
                  <img
                    src="/monuments/taj_mahal.jpg"
                    alt="AI Defect Segmentation"
                    className="w-full h-full object-cover filter brightness-95"
                  />
                  <div className="absolute inset-16 border-2 border-rose-500 bg-rose-500/15 rounded-lg pointer-events-none">
                    <span className="absolute -top-6 left-0 bg-rose-500 text-black text-[11px] font-mono px-2 py-0.5 rounded font-bold">
                      DEF-01 · Micro-Fracture · 94.8% AI Confidence
                    </span>
                  </div>
                </div>
              </div>
            )}

            {showcaseTab === 'temporal' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-5 space-y-4">
                  <span className="text-xs font-mono text-purple-400 uppercase font-bold">Future Forecasting</span>
                  <h3 className="text-2xl font-serif font-bold text-white">
                    Predicting Structural Decay Till 2030
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed font-sans">
                    Forecasting how damage will worsen over the next 4 to 6 years if left untreated. It proves that fixing minor cracks early for ₹3 Lakhs avoids ₹70+ Lakhs in emergency rebuilds later.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={onEnterDashboard}
                      className="px-6 py-2.5 rounded-xl bg-purple-600 text-white font-mono text-xs font-bold hover:bg-purple-500 transition cursor-pointer"
                    >
                      Run 2030 Predictive Lab →
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-7 bg-[#090A0C] p-6 rounded-xl border border-[#2B313D] space-y-3 font-mono text-xs h-[480px] flex flex-col justify-center">
                  <div className="flex justify-between items-center text-gray-400 border-b border-[#1E2228] pb-3 text-sm">
                    <span>Forecast Year</span>
                    <span>Predicted Health Score</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-300 py-2 border-b border-[#14171E]">
                    <span>2020 Baseline Survey</span>
                    <span className="text-emerald-400 font-bold">91 / 100 (Safe)</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-300 py-2 border-b border-[#14171E]">
                    <span>2024 Interim Survey</span>
                    <span className="text-emerald-300 font-bold">82 / 100 (Stable)</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-300 py-2 border-b border-[#14171E]">
                    <span>2026 Today (Current Scan)</span>
                    <span className="text-amber-400 font-bold">62 / 100 (Needs Attention)</span>
                  </div>
                  <div className="flex justify-between items-center text-rose-400 font-bold py-2 border-b border-[#14171E]">
                    <span>2028 Projected (Untreated)</span>
                    <span>32 / 100 (Critical)</span>
                  </div>
                  <div className="flex justify-between items-center text-rose-500 font-bold py-2">
                    <span>2030 Projected (Failure Risk)</span>
                    <span>14 / 100 (Immediate Action Required)</span>
                  </div>
                </div>
              </div>
            )}

            {showcaseTab === 'gis' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-5 space-y-4">
                  <span className="text-xs font-mono text-emerald-400 uppercase font-bold">National GIS Map</span>
                  <h3 className="text-2xl font-serif font-bold text-white">
                    Live Map for All 12 Heritage Monuments
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed font-sans">
                    View all 12 Centrally Protected Monuments across India on an interactive map. Overlay live monsoon rainfall alerts and earthquake hazard zones to protect endangered sites in advance.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={onEnterDashboard}
                      className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-mono text-xs font-bold hover:bg-emerald-500 transition cursor-pointer"
                    >
                      Open National GIS Map →
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-7 h-[480px] min-h-[480px] relative rounded-xl overflow-hidden border border-[#2B313D] shadow-2xl bg-[#060709]">
                  <HeritageGisMap
                    activeSiteIndex={0}
                    onSelectSite={(idx) => onSelectMonument ? onSelectMonument(idx) : onEnterDashboard()}
                    filterSites={sites}
                    hideQuickJump={true}
                  />
                </div>
              </div>
            )}

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 🧪 6. INTERACTIVE ENVIRONMENTAL STRESS & SCENARIO SIMULATOR               */}
      {/* ========================================================================= */}
      <section id="climate-simulator" className="py-20 px-6 max-w-[1600px] mx-auto space-y-12">
        
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono text-[#C5A059] uppercase tracking-wider font-bold">
            Interactive Hazard Stressor Modeling
          </span>
          <h2 className="text-3xl font-serif font-bold text-[#F3EFE6]">
            Extreme Climate & Seismic Stress Simulator
          </h2>
          <p className="text-xs text-gray-400 font-sans">
            Adjust environmental parameters to see how climatic anomalies affect monument degradation in real-time.
          </p>
        </div>

        <div className="bg-[#0E1013] border border-[#1E2228] p-8 rounded-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono text-gray-300">
                <span>🌧️ Monsoon Cloudburst Anomaly:</span>
                <strong className="text-sky-400">+{simMonsoon}% Excess Precipitation</strong>
              </div>
              <input
                type="range"
                min="0"
                max="80"
                value={simMonsoon}
                onChange={(e) => setSimMonsoon(Number(e.target.value))}
                className="w-full accent-sky-400 h-2 bg-[#1A1D24] rounded-lg cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono text-gray-300">
                <span>🌋 Seismic Ground Motion Velocity:</span>
                <strong className="text-rose-400">{simSeismic.toFixed(2)}x (Peak Zone Factor)</strong>
              </div>
              <input
                type="range"
                min="0.85"
                max="1.75"
                step="0.05"
                value={simSeismic}
                onChange={(e) => setSimSeismic(Number(e.target.value))}
                className="w-full accent-rose-500 h-2 bg-[#1A1D24] rounded-lg cursor-pointer"
              />
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#14171E] border border-[#232A38] p-6 rounded-xl text-center space-y-3">
            <span className="text-[10px] font-mono uppercase text-gray-400">Simulated Health Score</span>
            <div className="text-5xl font-serif font-bold text-[#C5A059]">
              <span style={{ color: simulatedHealth < 45 ? '#F43F5E' : simulatedHealth < 70 ? '#F59E0B' : '#10B981' }}>
                {simulatedHealth}
              </span>
              <span className="text-xs text-gray-500"> / 100</span>
            </div>
            <div
              className="text-xs font-mono px-3 py-1 rounded-full font-bold uppercase inline-block"
              style={{
                backgroundColor: simulatedHealth < 45 ? '#F43F5E20' : simulatedHealth < 70 ? '#F59E0B20' : '#10B98120',
                color: simulatedHealth < 45 ? '#F43F5E' : simulatedHealth < 70 ? '#F59E0B' : '#10B981',
                border: `1px solid ${simulatedHealth < 45 ? '#F43F5E50' : simulatedHealth < 70 ? '#F59E0B50' : '#10B98150'}`
              }}
            >
              STATUS: {simulatedUrgency}
            </div>
            <button
              onClick={onEnterDashboard}
              className="w-full mt-4 py-2.5 rounded-xl bg-[#C5A059] text-black font-mono text-xs font-bold hover:bg-[#D8B46E] transition cursor-pointer"
            >
              Run 2030 Longitudinal Simulation →
            </button>
          </div>

        </div>

      </section>

      {/* ========================================================================= */}
      {/* 🏛️ 7. CENTRALLY PROTECTED MONUMENTS REGISTRY GALLERY                      */}
      {/* ========================================================================= */}
      <section id="monument-registry" className="py-20 px-6 max-w-[1600px] mx-auto space-y-12">
        
        <div className="flex flex-wrap justify-between items-end gap-4">
          <div>
            <h2 className="text-3xl font-serif font-bold text-[#F3EFE6] mt-1">
              Monitored UNESCO Heritage Sites
            </h2>
          </div>

          <button
            onClick={onEnterDashboard}
            className="px-4 py-2 rounded-xl bg-[#14171E] hover:bg-[#1E232E] border border-[#2B313D] text-xs font-mono text-gray-200 transition flex items-center gap-1.5 cursor-pointer"
          >
            <span>View All 12 Heritage Sites</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {flagshipSites.map((s, idx) => (
            <div
              key={s.id || idx}
              onClick={() => onSelectMonument ? onSelectMonument(idx) : onEnterDashboard()}
              className="bg-[#0E1013] border border-[#1E2228] rounded-2xl overflow-hidden shadow-xl hover:border-[#C5A059] transition-all duration-300 group cursor-pointer flex flex-col justify-between"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-black">
                <img
                  src={s.imageUrl || '/monuments/qutub_minar.jpg'}
                  alt={s.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
                />
              </div>

              <div className="p-5 space-y-3">
                <div>
                  <span className="text-[10px] font-mono text-gray-400 uppercase">{s.state} · {s.period}</span>
                  <h3 className="text-lg font-serif font-bold text-white group-hover:text-[#C5A059] transition">
                    {s.name}
                  </h3>
                </div>

                <div className="flex justify-between items-center text-xs font-mono pt-2 border-t border-[#1E2228]">
                  <span className="text-gray-400">Seismic: <strong className="text-amber-400">{s.seismicZone}</strong></span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <span>Explore 3D Twin</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* ========================================================================= */}
      {/* ❓ 8. FAQ ACCORDION                                                       */}
      {/* ========================================================================= */}
      <section id="faq" className="py-20 px-6 max-w-4xl mx-auto space-y-8">
        
        <div className="text-center space-y-2">
          <span className="text-xs font-mono text-[#C5A059] uppercase tracking-wider font-bold">
            Frequently Answered Questions
          </span>
          <h2 className="text-3xl font-serif font-bold text-[#F3EFE6]">
            Heritage Shield Technical Architecture
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="bg-[#0E1013] border border-[#1E2228] rounded-xl overflow-hidden transition"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex justify-between items-center gap-4 font-serif font-bold text-base text-gray-200 hover:text-white cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-[#C5A059] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-gray-400 font-sans leading-relaxed border-t border-[#181B22] pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 🛡️ 9. INSTITUTIONAL FOOTER                                                */}
      {/* ========================================================================= */}
      <footer className="border-t border-[#181C24] bg-[#050608] py-12 px-6">
        <div className="max-w-[1600px] mx-auto flex flex-wrap justify-between items-center gap-6 text-xs font-mono text-gray-400">
          
          <div className="flex items-center gap-3">
            <HeritageShieldLogo size="sm" showText={true} />
            <span className="text-gray-600">|</span>
            <span>Smart India Hackathon 2026 · Team Qualified (Team ID: 031)</span>
          </div>

          <div className="flex items-center gap-6">
            <span>Standard: ISRO Bhuvan WGS84</span>
            <span>Framework: ISO 31000:2018</span>
            <span>Authority: Archaeological Survey of India (ASI)</span>
          </div>

        </div>
      </footer>

    </div>
  );
}
