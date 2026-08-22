import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeritageShieldLogo from './HeritageShieldLogo';
import ThemeToggle from './ThemeToggle';
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
      kicker: '01 · Heritage Digital Twin',
      title: 'A living model of the site, mapped down to the component.', 
      desc: 'Each hotspot is a structural or architectural component with its own condition history, spatial location and inspection trail — not just a photo of a monument.',
      input: 'Photogrammetry LiDAR + Spatial BIM Models',
      output: 'Component-Indexed Interactive 3D Mesh',
      action: 'Select and isolate stone blocks, arches, or spires'
    },
    { 
      step: '02', 
      kicker: '02 · AI Visual Condition Assessment',
      title: 'Upload a photo. AI flags what needs a closer look.', 
      desc: 'Computer vision identifies cracks, surface loss, discoloration, vegetation intrusion and dampness — every flag is a suggestion for review, never an automatic verdict.',
      input: 'High-Res Drone & Inspection Imagery',
      output: 'OpenCV Defect Aperture & Bounding Vectors',
      action: 'Flags 0.42mm micro-fractures with 94.8% confidence'
    },
    { 
      step: '03', 
      kicker: '03 · Temporal Change Detection',
      title: 'The same wall, two inspection cycles apart.', 
      desc: 'Compare 2024 against 2026. The system aligns repeated observations to the same component so change is measured, not guessed.',
      input: 'Historical 2024 Baseline vs 2026 Cycle',
      output: 'Component Delta Heatmap & Vector Expansion',
      action: 'Calculates +38% crack elongation rate'
    },
    { 
      step: '04', 
      kicker: '04 · Heritage Health Index',
      title: 'A transparent score, not a black box.', 
      desc: 'Every score comes with the factors that produced it, weighted by contribution — so authorities know why a number changed, not just that it did.',
      input: 'Structural + Moisture + Material Weights',
      output: 'Formula-Driven Health Index (0–100)',
      action: 'Score = 61/100 (Decay trajectory quantified)'
    },
    { 
      step: '05', 
      kicker: '05 · Risk & Disaster Layer',
      title: 'Not just "is it damaged" — could a hazard accelerate it?', 
      desc: 'Flood exposure, rainfall extremes, seismic vulnerability and other hazard layers sit alongside condition data, connecting conservation to disaster management.',
      input: 'ISRO Bhuvan + IMD Radar + BIS IS 1893:2016',
      output: 'Multi-Hazard Risk Vulnerability Matrix',
      action: 'Cross-references Zone V seismic fault line proximity'
    },
    { 
      step: '06', 
      kicker: '06 · Deterioration Prediction',
      title: 'Where is this component headed till 2030?', 
      desc: 'Historical condition combined with environmental and hazard variables produces a non-linear trajectory — shown with confidence, not false precision.',
      input: 'Physics-Informed Fracture Mechanics (2020–2030)',
      output: 'Predictive 48-Month Degradation Trajectory',
      action: 'Forecasts critical breach window by 2027–2030'
    },
    { 
      step: '07', 
      kicker: '07 · Intervention Priority Engine',
      title: 'Which component should receive attention first?', 
      desc: 'Ranked by condition × deterioration rate × hazard exposure × heritage significance — across every monitored asset, not one at a time.',
      input: 'Multi-Criteria Decision Analysis (ISO 31000)',
      output: 'Ranked National Intervention Queue',
      action: 'Ranks North Façade as Priority #1 nationwide'
    },
    { 
      step: '08', 
      kicker: '08 · Conservation Recommendation',
      title: 'Evidence in, a recommendation out — the decision stays human.', 
      desc: 'Problem detected → Probable factors → Recommended action → Final call with official ASI work-order generation.',
      input: 'Synthesized Diagnostics & Heritage Norms',
      output: 'Formal ASI Work-Order & Grout Formula',
      action: 'Conservation architect one-click sign-off'
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
      a: 'The platform links ISRO Bhuvan WGS84 GIS layers, IMD precipitation radar, and BIS IS 1893 seismic hazard fault lines to dynamically update monument vulnerability ratings across all 3,696 Centrally Protected Monuments.'
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

                {/* Floating Telemetry Coordinates Tag */}
                <div className="absolute top-6 right-6 bg-[#0E1117]/90 backdrop-blur-md border border-[#2B313D] px-3 py-1.5 rounded-lg text-[10px] font-mono text-[#C5A059] shadow-xl">
                  <span>LiDAR Mesh · 0.8mm Point Resolution</span>
                </div>
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

            {/* Hero Interactive View Mode Selector */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center gap-2 pt-4 font-mono text-[11px]"
            >
              <span className="text-gray-500">Visual Mode:</span>
              <div className="bg-[#0E1013]/90 p-1 rounded-lg border border-[#222733] flex items-center gap-1">
                <button
                  onClick={() => setHeroMode('split')}
                  className={`px-2.5 py-1 rounded transition ${heroMode === 'split' ? 'bg-[#C5A059] text-black font-bold' : 'text-gray-400 hover:text-white'}`}
                >
                  ⚡ Dual Split
                </button>
                <button
                  onClick={() => setHeroMode('stone')}
                  className={`px-2.5 py-1 rounded transition ${heroMode === 'stone' ? 'bg-[#C5A059] text-black font-bold' : 'text-gray-400 hover:text-white'}`}
                >
                  🧱 Stone Facade
                </button>
                <button
                  onClick={() => setHeroMode('wireframe')}
                  className={`px-2.5 py-1 rounded transition ${heroMode === 'wireframe' ? 'bg-cyan-600 text-white font-bold' : 'text-gray-400 hover:text-white'}`}
                >
                  🌐 3D LiDAR Mesh
                </button>
              </div>
            </motion.div>

          </div>

        </div>

      </section>

      {/* ========================================================================= */}
      {/* 🧭 3. PROCESS FLOW RIBBON (OBSERVE → DIGITISE → ... → ACT)                 */}
      {/* ========================================================================= */}
      <section id="workflow-ribbon" className="border-y border-[#181C24] bg-[#0A0C10] py-4 px-6">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-2 overflow-x-auto">
          
          <div className="flex items-center gap-2 sm:gap-3 flex-nowrap text-xs font-mono">
            {processFlowItems.map((item, idx) => (
              <React.Fragment key={item.label}>
                <div
                  onClick={() => setActiveWorkflowIndex(idx)}
                  className={`px-3 py-1.5 rounded-lg border transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                    activeWorkflowIndex === idx
                      ? 'border-[#C5A059] bg-[#C5A059]/15 text-[#F3EFE6] font-bold shadow'
                      : 'border-[#1E232E] bg-[#0E1013] text-gray-400 hover:border-gray-500 hover:text-gray-200'
                  }`}
                >
                  <span className="text-[10px] text-[#C5A059] font-bold">0{idx + 1}.</span>
                  <span>{item.label}</span>
                </div>

                {idx < processFlowItems.length - 1 && (
                  <span className="text-gray-600 font-bold text-xs select-none">→</span>
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="hidden xl:flex items-center gap-2 text-[11px] font-mono text-[#C5A059] bg-[#14171E] px-3 py-1 rounded-lg border border-[#2B313D] whitespace-nowrap">
            <span>⚡ Continuous Closed-Loop Feedback Architecture</span>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 🏛️ 4. "THE DECISION LAYER, MODULE BY MODULE" (8 DETAILED MODULES)          */}
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

                  <p className="text-xs text-gray-400 font-sans leading-relaxed">
                    {mod.desc}
                  </p>
                </div>

                {/* Module Technical Payload Box */}
                <div className="bg-[#08090C] border border-[#1A1F29] p-3 rounded-xl space-y-1.5 text-[11px] font-mono">
                  <div className="flex justify-between text-gray-500">
                    <span>Input:</span>
                    <span className="text-gray-300 truncate max-w-[180px]">{mod.input}</span>
                  </div>
                  <div className="flex justify-between text-[#C5A059]">
                    <span>Output:</span>
                    <span className="font-semibold truncate max-w-[180px]">{mod.output}</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 💻 5. INTERACTIVE LIVE CONSOLE SANDBOX SHOWCASE                           */}
      {/* ========================================================================= */}
      <section id="sandbox-showcase" className="py-16 px-6 bg-[#090B0E] border-y border-[#181C24]">
        <div className="max-w-[1600px] mx-auto space-y-8">
          
          <div className="flex flex-wrap justify-between items-end gap-4">
            <div>
              <span className="text-xs font-mono text-[#C5A059] uppercase tracking-wider font-bold">
                Live Interactive Sandbox
              </span>
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
                <div className="lg:col-span-7 space-y-4">
                  <span className="text-xs font-mono text-[#C5A059] uppercase font-bold">WebGL Three.js PBR Engine</span>
                  <h3 className="text-2xl font-serif font-bold text-white">
                    Component-Mapped 3D Structural Digital Twin
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed font-sans">
                    Every monument is decomposed into persistent architectural nodes (Finials, Balconies, Main Shafts, and Base Plinths). Inspect geometry, toggle realistic stone textures vs wireframe LiDAR point clouds, and click any component to inspect its condition history.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2 text-xs font-mono">
                    <span className="bg-[#14171E] text-emerald-400 px-3 py-1 rounded-lg border border-[#2B313D]">● 60 FPS Hardware Accelerated</span>
                    <span className="bg-[#14171E] text-sky-400 px-3 py-1 rounded-lg border border-[#2B313D]">● Raycast Part Selection</span>
                    <span className="bg-[#14171E] text-[#C5A059] px-3 py-1 rounded-lg border border-[#2B313D]">● 360° Continuous Orbit</span>
                  </div>
                  <div className="pt-4">
                    <button
                      onClick={onEnterDashboard}
                      className="px-6 py-2.5 rounded-xl bg-[#C5A059] text-black font-mono text-xs font-bold hover:bg-[#D8B46E] transition cursor-pointer"
                    >
                      Launch Full 3D Studio →
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-5 relative aspect-square rounded-xl overflow-hidden border border-[#2B313D] shadow-2xl bg-black">
                  <img
                    src="/monuments/qutub_minar.jpg"
                    alt="Qutub Minar 3D Model"
                    className="w-full h-full object-cover filter brightness-90 contrast-110"
                  />
                  <div className="absolute inset-0 bg-wireframe-grid opacity-60" />
                  <div className="absolute bottom-3 left-3 right-3 bg-[#090A0C]/90 backdrop-blur border border-[#1E2228] p-3 rounded-lg text-xs font-mono flex justify-between items-center">
                    <span className="text-[#C5A059] font-bold">Node C-01: Main Shaft</span>
                    <span className="text-rose-400 font-bold">Score: 62/100</span>
                  </div>
                </div>
              </div>
            )}

            {showcaseTab === 'vision' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <span className="text-xs font-mono text-cyan-400 uppercase font-bold">OpenCV 4.10 + YOLOv8 Vision</span>
                  <h3 className="text-2xl font-serif font-bold text-white">
                    Sub-Millimeter AI Defect Aperture & Vector Extraction
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed font-sans">
                    Automatically segment structural cracks, surface spalling, moisture capillary dampness, and biological patina from drone photography with normalized pixel metrics and growth velocities.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2 text-xs font-mono">
                    <span className="bg-[#14171E] text-rose-400 px-3 py-1 rounded-lg border border-[#2B313D]">🔴 Crack Aperture: 0.85 mm</span>
                    <span className="bg-[#14171E] text-amber-400 px-3 py-1 rounded-lg border border-[#2B313D]">🟡 Moisture: 14.8% Area</span>
                    <span className="bg-[#14171E] text-cyan-400 px-3 py-1 rounded-lg border border-[#2B313D]">🔵 Growth Velocity: 3.45 cm/yr</span>
                  </div>
                  <div className="pt-4">
                    <button
                      onClick={onEnterDashboard}
                      className="px-6 py-2.5 rounded-xl bg-cyan-600 text-white font-mono text-xs font-bold hover:bg-cyan-500 transition cursor-pointer"
                    >
                      Open AI Diagnostics Lab →
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-5 relative aspect-square rounded-xl overflow-hidden border border-[#2B313D] shadow-2xl bg-black">
                  <img
                    src="/monuments/taj_mahal.jpg"
                    alt="AI Defect Segmentation"
                    className="w-full h-full object-cover filter brightness-95"
                  />
                  <div className="absolute inset-10 border-2 border-rose-500 bg-rose-500/15 rounded">
                    <span className="absolute -top-5 left-0 bg-rose-500 text-black text-[10px] font-mono px-1.5 py-0.5 rounded font-bold">
                      DEF-01 · Crack · 94.2%
                    </span>
                  </div>
                </div>
              </div>
            )}

            {showcaseTab === 'temporal' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <span className="text-xs font-mono text-purple-400 uppercase font-bold">FastAPI Non-Linear Decay Engine</span>
                  <h3 className="text-2xl font-serif font-bold text-white">
                    Physics-Informed 2020–2030 Longitudinal Forecasting
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed font-sans">
                    Simulates crack expansion trajectories and moisture degradation through 2030 using the Paris-Erdogan fracture mechanics law coupled with localized weather stress and seismic variables.
                  </p>
                  <div className="grid grid-cols-2 gap-3 text-xs font-mono pt-2">
                    <div className="bg-[#14171E] p-3 rounded-lg border border-rose-900/50">
                      <span className="text-rose-400 font-bold block">Path A (No Action by 2030):</span>
                      <span className="text-gray-300 text-[11px]">Crack reaches 72.5 cm · ₹72.8L Repair Cost</span>
                    </div>
                    <div className="bg-[#14171E] p-3 rounded-lg border border-emerald-900/50">
                      <span className="text-emerald-400 font-bold block">Path B (2026 Sealing):</span>
                      <span className="text-gray-300 text-[11px]">Arrests growth at 25.1 cm · 95.6% Budget Saved</span>
                    </div>
                  </div>
                  <div className="pt-4">
                    <button
                      onClick={onEnterDashboard}
                      className="px-6 py-2.5 rounded-xl bg-purple-600 text-white font-mono text-xs font-bold hover:bg-purple-500 transition cursor-pointer"
                    >
                      Run 2030 Predictive Lab →
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-[#090A0C] p-6 rounded-xl border border-[#2B313D] space-y-3 font-mono text-xs">
                  <div className="flex justify-between items-center text-gray-400 border-b border-[#1E2228] pb-2">
                    <span>Epoch Timeline</span>
                    <span>Projected Health Index</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-300">
                    <span>2020 Baseline</span>
                    <span className="text-emerald-400 font-bold">91/100</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-300">
                    <span>2026 Current Scan</span>
                    <span className="text-amber-400 font-bold">62/100</span>
                  </div>
                  <div className="flex justify-between items-center text-rose-400 font-bold">
                    <span>2028 Unmitigated</span>
                    <span>32/100 (Critical)</span>
                  </div>
                  <div className="flex justify-between items-center text-rose-500 font-bold">
                    <span>2030 Horizon</span>
                    <span>14/100 (Failure Risk)</span>
                  </div>
                </div>
              </div>
            )}

            {showcaseTab === 'gis' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <span className="text-xs font-mono text-emerald-400 uppercase font-bold">ISRO Bhuvan + IMD + BIS Hazard Grid</span>
                  <h3 className="text-2xl font-serif font-bold text-white">
                    National Built Heritage GIS Radar
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed font-sans">
                    Geospatial monitoring across all 3,696 Centrally Protected Monuments. Layer live seismic fault lines, monsoon rainfall anomalies, and urban traffic vibration radii.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2 text-xs font-mono">
                    <span className="bg-[#14171E] text-sky-400 px-3 py-1 rounded-lg border border-[#2B313D]">● ISRO Bhuvan Satellite Layer</span>
                    <span className="bg-[#14171E] text-amber-400 px-3 py-1 rounded-lg border border-[#2B313D]">● BIS Seismic Fault Buffer</span>
                    <span className="bg-[#14171E] text-emerald-400 px-3 py-1 rounded-lg border border-[#2B313D]">● Quick Jump to Major Sites</span>
                  </div>
                  <div className="pt-4">
                    <button
                      onClick={onEnterDashboard}
                      className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-mono text-xs font-bold hover:bg-emerald-500 transition cursor-pointer"
                    >
                      Open National GIS Radar →
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-5 relative aspect-square rounded-xl overflow-hidden border border-[#2B313D] shadow-2xl bg-black">
                  <img
                    src="/monuments/konark.jpg"
                    alt="Konark GIS Site"
                    className="w-full h-full object-cover filter brightness-90"
                  />
                  <div className="absolute top-4 left-4 bg-[#090A0C]/90 px-3 py-1 rounded border border-[#1E2228] text-xs font-mono text-[#C5A059]">
                    📍 Konark · 19.8876° N, 86.0945° E
                  </div>
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
              {simHealthColor => null}
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
            <span className="text-xs font-mono text-[#C5A059] uppercase tracking-wider font-bold">
              Flagship Heritage Portfolio
            </span>
            <h2 className="text-3xl font-serif font-bold text-[#F3EFE6] mt-1">
              Monitored UNESCO Heritage Sites
            </h2>
          </div>

          <button
            onClick={onEnterDashboard}
            className="px-4 py-2 rounded-xl bg-[#14171E] hover:bg-[#1E232E] border border-[#2B313D] text-xs font-mono text-gray-200 transition flex items-center gap-1.5 cursor-pointer"
          >
            <span>View All 3,696 Monuments</span>
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
                <div className="absolute top-3 right-3 bg-black/80 backdrop-blur px-2.5 py-1 rounded text-[10px] font-mono font-bold text-[#C5A059] border border-[#C5A059]/40">
                  {s.id || `ASI-${idx + 1}`}
                </div>
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
            <span>SIH 2026 Team Qualified · Somaiya Vidyavihar University</span>
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
