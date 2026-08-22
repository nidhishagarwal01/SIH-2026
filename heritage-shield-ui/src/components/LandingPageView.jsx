import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  Layers,
  Eye,
  Clock,
  Compass,
  ArrowRight,
  ChevronRight,
  BarChart3,
  Globe,
  Radio,
  AlertTriangle,
  FileText,
  Activity,
  CheckCircle2,
  TrendingUp,
  MapPin,
  Sparkles
} from 'lucide-react';

export default function LandingPageView({ onEnterDashboard, onSelectMonument, sites = [] }) {
  const coreLoopSteps = [
    { 
      step: '01', 
      kicker: '01 · Heritage Digital Twin',
      title: 'A living model of the site, mapped down to the component.', 
      desc: 'Each hotspot is a structural or architectural component with its own condition history, spatial location and inspection trail — not just a photo of a monument.' 
    },
    { 
      step: '02', 
      kicker: '02 · AI Visual Condition Assessment',
      title: 'Upload a photo. AI flags what needs a closer look.', 
      desc: 'Computer vision identifies cracks, surface loss, discoloration, vegetation intrusion and dampness — every flag is a suggestion for review, never an automatic verdict.' 
    },
    { 
      step: '03', 
      kicker: '03 · Temporal Change Detection',
      title: 'The same wall, two inspection cycles apart.', 
      desc: 'Compare 2024 against 2026. The system aligns repeated observations to the same component so change is measured, not guessed.' 
    },
    { 
      step: '04', 
      kicker: '04 · Heritage Health Index',
      title: 'A transparent score, not a black box.', 
      desc: 'Every score comes with the factors that produced it, weighted by contribution — so authorities know why a number changed, not just that it did.' 
    },
    { 
      step: '05', 
      kicker: '05 · Risk & Disaster Layer',
      title: 'Not just "is it damaged" — could a hazard accelerate it?', 
      desc: 'Flood exposure, rainfall extremes, seismic vulnerability and other hazard layers sit alongside condition data, connecting conservation to disaster management.' 
    },
    { 
      step: '06', 
      kicker: '06 · Deterioration Prediction',
      title: 'Where is this component headed?', 
      desc: 'Historical condition combined with environmental and hazard variables produces a trajectory — shown with confidence, not false precision.' 
    },
    { 
      step: '07', 
      kicker: '07 · Intervention Priority Engine',
      title: 'Which component should receive attention first?', 
      desc: 'Ranked by condition × deterioration rate × hazard exposure × heritage significance — across every monitored asset, not one at a time.' 
    },
    { 
      step: '08', 
      kicker: '08 · Conservation Recommendation',
      title: 'Evidence in, a recommendation out — the decision stays human.', 
      desc: 'Problem detected → Probable factors → Recommended action → Final call with official ASI work-order generation.' 
    },
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
          
          {/* Clickable Home Brand */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 cursor-pointer group"
            title="Heritage Shield — Home"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#C5A059] via-[#8C6D38] to-[#38BDF8] p-[1px] shadow-lg shadow-amber-950/40 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#0E1013] rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-[#C5A059] group-hover:text-white transition-colors" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-black text-lg tracking-wide text-white group-hover:text-[#C5A059] transition-colors">
                  HERITAGE SHIELD
                </span>
              </div>
              <p className="text-[11px] text-gray-400 font-mono hidden md:block">
                Predictive Conservation Decision Platform
              </p>
            </div>
          </div>

          {/* Center Links */}
          <div className="hidden lg:flex items-center gap-6 text-xs font-mono text-gray-300">
            <a href="#twin" className="hover:text-[#C5A059] transition">Digital Twin</a>
            <a href="#assess" className="hover:text-[#C5A059] transition">Assessment</a>
            <a href="#temporal" className="hover:text-[#C5A059] transition">Change Detection</a>
            <a href="#health" className="hover:text-[#C5A059] transition">Health Index</a>
            <a href="#priority" className="hover:text-[#C5A059] transition">Priority Queue</a>
            <a href="#workflow" className="hover:text-[#C5A059] transition">8-Step Cycle</a>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onEnterDashboard}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#DFB76C] text-[#07080A] font-mono text-xs font-bold tracking-wide shadow-lg shadow-amber-950/40 hover:shadow-amber-500/20 transition flex items-center gap-2 group cursor-pointer"
            >
              <span>Authority Dashboard</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>

        </div>
      </motion.nav>

      {/* 🚀 2. HERO SECTION WITH EXACT PROTOTYPE COPY & 21st.dev AMBIENT GLOW */}
      <section className="relative pt-16 pb-24 px-6 overflow-hidden">
        
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-[#C5A059]/15 via-[#38BDF8]/10 to-transparent blur-[120px] pointer-events-none rounded-full" />
        <div className="absolute top-12 left-10 w-72 h-72 bg-amber-600/10 blur-[100px] pointer-events-none rounded-full" />
        <div className="absolute top-20 right-10 w-80 h-80 bg-sky-600/10 blur-[110px] pointer-events-none rounded-full" />

        <div className="max-w-[1400px] mx-auto text-center space-y-8 relative z-10">
          
          {/* Hero Main Headline (Exact words from sample prototype) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-6 max-w-5xl mx-auto"
          >
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-white leading-[1.08]">
              From fragmented heritage evidence to a{' '}
              <span className="italic font-normal bg-gradient-to-r from-[#F3EFE6] via-[#C5A059] to-[#38BDF8] bg-clip-text text-transparent">
                living, predictive
              </span>{' '}
              conservation decision system.
            </h1>
            
            <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto font-sans leading-relaxed">
              Heritage Shield turns scattered inspection photos, records, GIS data and hazard maps into a continuously updated digital twin — one that tracks deterioration over time and tells authorities which component needs attention first.
            </p>
          </motion.div>

          {/* Hero CTA Group */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-2"
          >
            <button
              onClick={onEnterDashboard}
              className="px-8 py-3.5 rounded-xl bg-[#C5A059] hover:bg-[#D8B46E] text-[#07080A] font-mono text-sm font-bold tracking-wide shadow-2xl shadow-amber-950/60 transition-all transform hover:-translate-y-0.5 flex items-center gap-3 cursor-pointer"
            >
              <Globe className="w-4 h-4" />
              <span>Explore the Digital Twin</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onEnterDashboard}
              className="px-6 py-3.5 rounded-xl bg-[#11141A] hover:bg-[#181C24] border border-[#232A36] text-gray-200 font-mono text-sm font-medium transition flex items-center gap-2 cursor-pointer"
            >
              <span>Jump to Authority Dashboard</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
          </motion.div>

          {/* 📊 High-Trust Metric Counters (Prototype Stat Strip) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto pt-8 text-left"
          >
            <div className="bg-[#0E1117]/80 backdrop-blur-md border border-[#1A1F29] p-5 rounded-2xl shadow-xl space-y-1">
              <div className="text-2xl sm:text-3xl font-serif font-bold text-[#C5A059]">3,696</div>
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">Protected Assets</span>
              <p className="text-[11px] text-gray-400 font-sans">Centrally Protected Monuments (CPMs)</p>
            </div>

            <div className="bg-[#0E1117]/80 backdrop-blur-md border border-[#1A1F29] p-5 rounded-2xl shadow-xl space-y-1">
              <div className="text-2xl sm:text-3xl font-serif font-bold text-white">61 / 100</div>
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">Avg. Health Index</span>
              <p className="text-[11px] text-gray-400 font-sans">Transparent Factor-Driven Score</p>
            </div>

            <div className="bg-[#0E1117]/80 backdrop-blur-md border border-[#1A1F29] p-5 rounded-2xl shadow-xl space-y-1">
              <div className="text-2xl sm:text-3xl font-serif font-bold text-sky-400">Sub-mm</div>
              <span className="text-[10px] font-mono text-sky-400 uppercase tracking-wider block">AI Computer Vision</span>
              <p className="text-[11px] text-gray-400 font-sans">Crack Aperture & Growth Velocity</p>
            </div>

            <div className="bg-[#0E1117]/80 backdrop-blur-md border border-[#1A1F29] p-5 rounded-2xl shadow-xl space-y-1">
              <div className="text-2xl sm:text-3xl font-serif font-bold text-emerald-400">2026</div>
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block">Active Inspection</span>
              <p className="text-[11px] text-gray-400 font-sans">Closed-Loop Predictive Trajectory</p>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 🔄 3. CORE 8-STEP VALUE LOOP (FROM PROTOTYPE 01–08) */}
      <section id="workflow" className="py-20 px-6 border-y border-[#161920] bg-[#090B0E]/60 relative">
        <div className="max-w-[1400px] mx-auto space-y-12">
          
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-xs font-mono text-[#C5A059] uppercase tracking-wider font-bold">
              Predictive Conservation Cycle
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
              The 8-Step Decision Architecture
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 font-sans">
              "The 3D model is the spatial interface; the real product is the decision workflow."
            </p>
          </div>

          {/* 8-Step Interactive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {coreLoopSteps.map((item) => (
              <motion.div
                key={item.step}
                whileHover={{ y: -4, borderColor: 'rgba(197, 160, 89, 0.5)' }}
                className="bg-[#0E1117] border border-[#1C212C] p-5 rounded-2xl space-y-3 transition shadow-lg relative group overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#C5A059] bg-[#C5A059]/10 px-2.5 py-1 rounded-lg border border-[#C5A059]/20">
                    STEP {item.step}
                  </span>
                  <span className="text-[10px] font-mono text-gray-500">{item.kicker.split('·')[0].trim()}</span>
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

      {/* 🏛️ 4. KEY CAPABILITIES BENTO GRID (WITH PROTOTYPE SECTION WORDS) */}
      <section id="twin" className="py-24 px-6 max-w-[1400px] mx-auto space-y-16">
        
        <div className="flex flex-wrap justify-between items-end gap-6 border-b border-[#1A1F29] pb-6">
          <div className="space-y-2">
            <span className="text-xs font-mono text-[#C5A059] uppercase tracking-wider font-bold">
              01 · Heritage Digital Twin
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
              A living model of the site, mapped down to the component.
            </h2>
            <p className="text-sm text-gray-400 max-w-2xl font-sans">
              Each hotspot is a structural or architectural component with its own condition history, spatial location and inspection trail — not just a photo of a monument.
            </p>
          </div>
          <button
            onClick={onEnterDashboard}
            className="text-xs font-mono text-[#C5A059] hover:underline flex items-center gap-1.5 cursor-pointer"
          >
            <span>Open Authority Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Bento Card 1: 02 AI Assessment */}
          <div id="assess" className="md:col-span-2 bg-[#0E1117] border border-[#1C212C] rounded-3xl p-8 space-y-6 relative overflow-hidden shadow-2xl group hover:border-sky-500/40 transition">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/25">
                <Eye className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-sky-400 uppercase tracking-wider block font-bold">02 · AI Visual Condition Assessment</span>
                <h3 className="text-xl font-serif font-bold text-white">Upload a photo. AI flags what needs a closer look.</h3>
              </div>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed font-sans">
              Computer vision identifies cracks, surface loss, discoloration, vegetation intrusion and dampness — every flag is a suggestion for review, never an automatic verdict.
            </p>
            <div className="bg-[#08090C] p-4 rounded-2xl border border-[#1A1F29] text-xs font-mono text-gray-400">
              <span className="text-amber-400 font-bold">Validation principle:</span> AI flags; a conservation professional validates. Confidence scores are shown so reviewers can prioritize what to check first.
            </div>
          </div>

          {/* Bento Card 2: 03 Temporal Change */}
          <div id="temporal" className="bg-[#0E1117] border border-[#1C212C] rounded-3xl p-8 space-y-6 shadow-2xl group hover:border-[#C5A059]/40 transition">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/25">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#C5A059] uppercase tracking-wider block font-bold">03 · Temporal Change Detection</span>
                <h3 className="text-lg font-serif font-bold text-white">The same wall, two inspection cycles apart.</h3>
              </div>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed font-sans">
              Drag to compare 2024 against 2026. The system aligns repeated observations to the same component so change is measured, not guessed.
            </p>
            <div className="space-y-1.5 font-mono text-xs text-gray-400">
              <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-rose-400" /> Crack length +38% since 2024</div>
              <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> New branching fracture detected</div>
              <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-sky-400" /> Classified: Deteriorating trend</div>
            </div>
          </div>

          {/* Bento Card 3: 04 Health Index */}
          <div id="health" className="bg-[#0E1117] border border-[#1C212C] rounded-3xl p-8 space-y-6 shadow-2xl group hover:border-emerald-500/40 transition">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block font-bold">04 · Heritage Health Index</span>
                <h3 className="text-lg font-serif font-bold text-white">A transparent score, not a black box.</h3>
              </div>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed font-sans">
              Every score comes with the factors that produced it, weighted by contribution — so authorities know why a number changed, not just that it did.
            </p>
            <div className="bg-[#08090C] p-3.5 rounded-xl border border-[#1A1F29] font-mono text-xs text-emerald-400">
              Structural condition + Moisture exposure + Material condition
            </div>
          </div>

          {/* Bento Card 4: 07 Priority Engine */}
          <div id="priority" className="md:col-span-2 bg-[#0E1117] border border-[#1C212C] rounded-3xl p-8 space-y-6 shadow-2xl group hover:border-amber-500/40 transition">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/25">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block font-bold">07 · Intervention Priority Engine</span>
                <h3 className="text-xl font-serif font-bold text-white">Which component should receive attention first?</h3>
              </div>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed font-sans">
              Ranked by <strong className="text-white">Condition × Deterioration Rate × Hazard Exposure × Heritage Significance</strong> — across every monitored asset, not one at a time.
            </p>
            <div className="p-4 bg-[#08090C] rounded-2xl border border-[#1A1F29] font-mono text-xs text-[#C5A059]">
              Priority Score = 0.30·Condition + 0.25·Velocity + 0.15·Hazard + 0.15·Weather + 0.15·Significance
            </div>
          </div>

        </div>

      </section>

      {/* 🧭 5. 08 CONSERVATION RECOMMENDATION FLOW (Exact Prototype Copy) */}
      <section className="py-20 px-6 bg-[#090B0E] border-t border-[#1A1F29]">
        <div className="max-w-[1400px] mx-auto space-y-12">
          
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-mono text-[#C5A059] uppercase tracking-wider font-bold">
              08 · Conservation Recommendation Flow
            </span>
            <h2 className="text-3xl font-serif font-bold text-white">
              Evidence in, a recommendation out — the decision stays human.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#0E1117] border border-[#1C212C] p-6 rounded-2xl space-y-2">
              <span className="text-[10px] font-mono text-[#C5A059] uppercase tracking-wider block font-bold">Problem Detected</span>
              <p className="text-xs text-gray-300 font-sans leading-relaxed">
                Branching crack on the north façade, expanding across two inspection cycles.
              </p>
            </div>

            <div className="bg-[#0E1117] border border-[#1C212C] p-6 rounded-2xl space-y-2">
              <span className="text-[10px] font-mono text-[#C5A059] uppercase tracking-wider block font-bold">Probable Factors</span>
              <p className="text-xs text-gray-300 font-sans leading-relaxed">
                Rising moisture ingress compounded by above-average monsoon rainfall this season.
              </p>
            </div>

            <div className="bg-[#0E1117] border border-[#1C212C] p-6 rounded-2xl space-y-2">
              <span className="text-[10px] font-mono text-[#C5A059] uppercase tracking-wider block font-bold">Recommended Action</span>
              <p className="text-xs text-gray-300 font-sans leading-relaxed">
                Structural inspection within 30 days; assess for moisture barrier repair before next monsoon.
              </p>
            </div>

            <div className="bg-[#0E1117] border border-[#1C212C] p-6 rounded-2xl space-y-2">
              <span className="text-[10px] font-mono text-[#C5A059] uppercase tracking-wider block font-bold">Final Call</span>
              <p className="text-xs text-gray-300 font-sans leading-relaxed">
                Routed to the assigned conservation architect for review and sign-off — Heritage Shield does not act on its own.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 🗺️ 6. MONUMENTS SHOWCASE */}
      <section className="py-20 px-6 bg-[#07080A] border-t border-[#1A1F29]">
        <div className="max-w-[1400px] mx-auto space-y-12">
          
          <div className="flex flex-wrap justify-between items-end gap-4">
            <div>
              <span className="text-xs font-mono text-[#C5A059] uppercase tracking-wider font-bold">
                Centrally Protected Heritage Network
              </span>
              <h2 className="text-3xl font-serif font-bold text-white">
                Living Heritage Digital Twins
              </h2>
            </div>
            <button
              onClick={onEnterDashboard}
              className="px-4 py-2 rounded-xl bg-[#14171E] hover:bg-[#C5A059] text-gray-200 hover:text-[#07080A] text-xs font-mono font-bold transition border border-[#252C3A] cursor-pointer"
            >
              View Full National Radar & Directory →
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
                    <div className="absolute top-3 right-3 flex items-center text-[10px] font-mono">
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

      {/* 🚀 7. FINAL CALL TO ACTION */}
      <section className="py-24 px-6 relative overflow-hidden bg-gradient-to-b from-[#090B0E] to-[#0E1117] border-t border-[#1A1F29] text-center">
        <div className="max-w-3xl mx-auto space-y-8 relative z-10">
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-white">
            Ready to explore the predictive conservation platform?
          </h2>
          <p className="text-sm text-gray-400 font-sans max-w-xl mx-auto">
            Experience the national geospatial radar, inspect sub-mm defects in real-time, and test predictive decay simulations.
          </p>
          <div className="pt-2">
            <button
              onClick={onEnterDashboard}
              className="px-10 py-4 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#DFB76C] text-[#07080A] font-mono text-base font-bold tracking-wide shadow-2xl shadow-amber-950/60 hover:shadow-amber-500/30 transition transform hover:-translate-y-1 cursor-pointer"
            >
              Enter Authority Dashboard 🚀
            </button>
          </div>
        </div>
      </section>

      {/* 🏛️ 8. FOOTER */}
      <footer className="border-t border-[#161920] bg-[#07080A] py-8 px-6 text-center font-mono text-xs text-gray-500 space-y-2">
        <div className="text-gray-400 font-medium">HERITAGE SHIELD · Predictive Conservation Decision Platform</div>
        <div className="text-[11px] text-gray-600">
          Archaeological Survey of India (ASI) & Ministry of Culture
        </div>
      </footer>

    </div>
  );
}

