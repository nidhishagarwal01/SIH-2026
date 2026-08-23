import React, { useState, useEffect } from 'react';

export default function PhotogrammetryPipeline() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(100);

  const pipelineStages = [
    {
      step: 1,
      name: "Image Set Ingestion & EXIF Validation",
      tag: "Stage 01: Capture Ingestion",
      status: "Validated",
      icon: "📸",
      metrics: {
        input_images: "48 Overlapping Photos",
        camera_sensor: "Sony Full-Frame (42MP)",
        focal_length: "24-70mm Calibrated",
        overlap_ratio: "78.4% (Optimal)"
      },
      description: "Drone & terrestrial inspection photography ingested with GPS geotags, camera intrinsic calibration matrices, and exposure equalization.",
      visualState: "photos"
    },
    {
      step: 2,
      name: "Feature Extraction & SIFT/ORB Matching",
      tag: "Stage 02: Keypoint Correspondence",
      status: "Matched",
      icon: "🔍",
      metrics: {
        keypoints_extracted: "184,250 SIFT points",
        matching_pairs: "1,128 Photo Pairs",
        ransac_inliers: "96.2% Inlier Ratio",
        feature_descriptors: "128-dim SIFT vectors"
      },
      description: "Extracts scale-invariant feature transform (SIFT) keypoints across adjacent photographs, applying RANSAC fundamental matrix filtering to reject outlier matches.",
      visualState: "features"
    },
    {
      step: 3,
      name: "Sparse Point Cloud (COLMAP SfM)",
      tag: "Stage 03: Structure-from-Motion",
      status: "Reconstructed",
      icon: "🌐",
      metrics: {
        sparse_points: "48,620 3D Points",
        bundle_adjustment: "Converged (14 iters)",
        reprojection_error: "0.58 pixels",
        camera_poses_solved: "48 / 48 (100%)"
      },
      description: "Structure-from-Motion (SfM) solves relative 3D camera poses in Euclidean space and triangulates a sparse point cloud representing the monument's geometric envelope.",
      visualState: "sparse"
    },
    {
      step: 4,
      name: "Dense Multi-View Stereo & Mesh Decimation",
      tag: "Stage 04: Dense Surface Reconstruction",
      status: "Meshed",
      icon: "🧱",
      metrics: {
        dense_point_cloud: "3.84 Million Points",
        raw_polygons: "1.42 Million Faces",
        decimated_mesh: "42,500 Triangles",
        lod_target: "WebGL Optimized (LOD 0-2)"
      },
      description: "Poisson surface reconstruction calculates continuous polygon topology, followed by Quadric Error Metric (QEM) decimation for instant WebGL loading without visual fidelity loss.",
      visualState: "mesh"
    },
    {
      step: 5,
      name: "Component Segmentation & Twin Registration",
      tag: "Stage 05: Living Digital Twin Live",
      status: "Deployed",
      icon: "🏛️",
      metrics: {
        segmented_nodes: "4 Architectural Nodes",
        spatial_identity_ids: "C-01 to C-04",
        coordinate_anchor: "WGS84 Aligned",
        twin_status: "Active in Heritage Shield"
      },
      description: "Curvature and planar normal clustering partitions the monument into persistent architectural components, anchoring historical damage logs directly to 3D coordinates.",
      visualState: "twin"
    }
  ];

  const handleRunSimulation = () => {
    setIsRunning(true);
    setCurrentStep(1);
    setProgress(20);

    let step = 1;
    const interval = setInterval(() => {
      step += 1;
      if (step <= 5) {
        setCurrentStep(step);
        setProgress(step * 20);
      } else {
        clearInterval(interval);
        setIsRunning(false);
      }
    }, 1200);
  };

  const activeStageData = pipelineStages[currentStep - 1];

  return (
    <div className="bg-[#0C0E16] border border-white/15 rounded-3xl overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="bg-[#07080B] border-b border-white/10 px-6 py-4 flex flex-wrap justify-between items-center gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[#BA532B] uppercase font-bold tracking-wider">Automation & Scalability Engine</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/60 text-cyan-300 border border-cyan-800/40 font-bold">
              Automated Scan-to-Twin
            </span>
          </div>
          <h3 className="text-base font-serif font-bold text-[#EBE2D3] mt-0.5">
            Automated Photogrammetry & 3D Reconstruction Pipeline
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRunSimulation}
            disabled={isRunning}
            className="px-5 py-2.5 rounded-xl terracotta-btn text-xs font-mono font-bold transition flex items-center gap-2 shadow-md disabled:opacity-50 cursor-pointer"
          >
            <span>{isRunning ? "⚙️ Processing Photogrammetry..." : "▶ Run Ingestion Simulation"}</span>
          </button>
        </div>
      </div>

      {/* 5-Step Pipeline Progress Bar */}
      <div className="bg-[#07080B]/80 px-6 py-4 border-b border-white/10 backdrop-blur-md">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {pipelineStages.map((st) => (
            <button
              key={st.step}
              onClick={() => setCurrentStep(st.step)}
              className={`text-left p-3 rounded-xl border transition cursor-pointer ${
                currentStep === st.step
                  ? 'border-[#BA532B] bg-[#181D2E] text-[#EBE2D3] shadow-lg ring-1 ring-[#BA532B]/40'
                  : currentStep > st.step
                  ? 'border-emerald-800/60 bg-emerald-950/20 text-emerald-300'
                  : 'border-white/10 bg-[#121522]/80 text-gray-400 hover:border-white/20 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold">STAGE 0{st.step}</span>
                <span className="text-sm">{st.icon}</span>
              </div>
              <div className="text-xs font-semibold mt-1 truncate">{st.name.split('&')[0]}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Visualizer & Telemetry Grid */}
      <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Visual Pipeline Simulation Canvas */}
        <div className="lg:col-span-7 bg-[#090A0C] border border-[#1E2228] rounded-xl p-5 relative flex flex-col justify-between min-h-[380px] overflow-hidden select-none">
          
          {/* Top Canvas Tag */}
          <div className="flex justify-between items-center z-10">
            <span className="text-xs font-mono text-[#B88636] bg-[#121418] px-3 py-1 rounded border border-[#1E2228]">
              {activeStageData.tag}
            </span>
            <span className="text-xs font-mono text-emerald-400 bg-[#121418] px-3 py-1 rounded border border-[#1E2228]">
              Status: {activeStageData.status}
            </span>
          </div>


          {/* Visual Stage Representations */}
          <div className="flex-1 flex items-center justify-center my-4">
            
            {/* Stage 1: Overlapping Photo Grid */}
            {currentStep === 1 && (
              <div className="grid grid-cols-4 gap-2 w-full max-w-md p-2">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="aspect-square bg-gradient-to-br from-[#3b2b1d] to-[#241a12] border border-[#33353B] rounded flex flex-col items-center justify-center p-2 text-center relative group">
                    <span className="text-lg">📷</span>
                    <span className="text-[9px] font-mono text-gray-400 mt-1">IMG_{1040 + i}.RAW</span>
                    <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                  </div>
                ))}
              </div>
            )}

            {/* Stage 2: SIFT Keypoint Cloud */}
            {currentStep === 2 && (
              <div className="relative w-full max-w-md aspect-video bg-[#141310] border border-cyan-900/60 rounded-lg overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.15)_0,transparent_70%)]" />
                <svg className="w-full h-full" viewBox="0 0 400 220">
                  {[...Array(60)].map((_, i) => {
                    const x = 50 + (i * 17) % 300;
                    const y = 30 + (i * 23) % 160;
                    return (
                      <g key={i}>
                        <circle cx={x} cy={y} r="2" fill="#06b6d4" />
                        {i % 3 === 0 && (
                          <line x1={x} y1={y} x2={x + 25} y2={y + 15} stroke="#06b6d4" strokeWidth="0.5" strokeDasharray="2,2" opacity="0.6" />
                        )}
                      </g>
                    );
                  })}
                </svg>
                <div className="absolute bottom-2 text-center text-cyan-300 font-mono text-[11px]">
                  184,250 SIFT Keypoints Matched via Epipolar Geometry
                </div>
              </div>
            )}

            {/* Stage 3: Sparse Structure-from-Motion Point Cloud */}
            {currentStep === 3 && (
              <div className="relative w-full max-w-md aspect-video bg-[#141310] border border-amber-900/60 rounded-lg overflow-hidden flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 400 220">
                  {/* Minaret outline in 3D dots */}
                  {[...Array(90)].map((_, i) => {
                    const angle = (i / 90) * Math.PI * 6;
                    const radius = 25 + (i * 0.4);
                    const cx = 200 + Math.cos(angle) * radius * 0.8;
                    const cy = 190 - i * 1.8;
                    return (
                      <circle key={i} cx={cx} cy={cy} r="1.5" fill="#f59e0b" opacity="0.85" />
                    );
                  })}
                </svg>
                <div className="absolute bottom-2 text-center text-amber-300 font-mono text-[11px]">
                  COLMAP Sparse Point Cloud (Reprojection Error: 0.58px)
                </div>
              </div>
            )}

            {/* Stage 4: Dense Polygonal Surface Mesh */}
            {currentStep === 4 && (
              <div className="relative w-full max-w-md aspect-video bg-[#141310] border border-emerald-900/60 rounded-lg overflow-hidden flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 400 220">
                  {/* Triangular Mesh Wireframe */}
                  {[...Array(18)].map((_, i) => {
                    const y1 = 40 + i * 8;
                    const y2 = 40 + (i + 1) * 8;
                    const w1 = 30 + i * 3;
                    const w2 = 30 + (i + 1) * 3;
                    return (
                      <polygon
                        key={i}
                        points={`${200 - w1},${y1} ${200 + w1},${y1} ${200 + w2},${y2} ${200 - w2},${y2}`}
                        fill="rgba(16, 185, 129, 0.08)"
                        stroke="#10b981"
                        strokeWidth="0.8"
                      />
                    );
                  })}
                </svg>
                <div className="absolute bottom-2 text-center text-emerald-300 font-mono text-[11px]">
                  Poisson Surface Mesh · QEM Decimated (42,500 Triangles)
                </div>
              </div>
            )}

            {/* Stage 5: Segmented Digital Twin Live */}
            {currentStep === 5 && (
              <div className="relative w-full max-w-md aspect-video bg-[#141310] border border-[#C9A15C]/60 rounded-lg overflow-hidden flex flex-col items-center justify-center text-center p-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#C9A15C] via-[#9E6347] to-[#63917E] flex items-center justify-center text-2xl shadow-xl shadow-amber-950/40">
                  🏛️
                </div>
                <div className="text-sm font-serif font-bold text-gray-100 mt-3">
                  Digital Twin Successfully Segmented & Registered
                </div>
                <div className="text-xs font-mono text-[#C9A15C] mt-1">
                  Ready for AI Condition Assessment & Multi-Year Temporal Monitoring
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Right Column: Technical Stage Telemetry & Explanation */}
        <div className="lg:col-span-5 bg-[#121418] border border-[#1E2228] rounded-xl p-5 flex flex-col justify-between space-y-4">
          
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-mono uppercase text-[#B88636] font-bold">
                Step 0{activeStageData.step} Technical Specification:
              </span>
              <h4 className="text-base font-serif font-bold text-[#F3EFE6] mt-0.5">
                {activeStageData.name}
              </h4>
              <p className="text-xs text-gray-300 mt-2 leading-relaxed font-sans">
                {activeStageData.description}
              </p>
            </div>

            {/* Telemetry Metrics Grid */}
            <div className="grid grid-cols-2 gap-2.5 bg-[#0E1013] p-3.5 rounded-lg border border-[#1E2228]">
              {Object.entries(activeStageData.metrics).map(([key, val]) => (
                <div key={key} className="bg-[#121418] p-2.5 rounded border border-[#1E2228]">
                  <div className="text-[10px] font-mono text-gray-400 uppercase">
                    {key.replace(/_/g, ' ')}
                  </div>
                  <div className="font-mono font-bold text-gray-200 mt-0.5 text-xs">
                    {val}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scalability Defense Box */}
          <div className="bg-[#0E1013] p-3.5 rounded-lg border-l-4 border-l-[#B88636] border-[#1E2228] text-xs leading-relaxed space-y-1">
            <div className="text-[10px] font-mono text-[#B88636] uppercase font-bold">
              Why This Solves Scalability at National Scale:
            </div>
            <p className="text-gray-300 text-[11px]">
              Humans are <strong>never</strong> manually creating 3D meshes for 3,690+ monuments. Any standard smartphone or drone photo batch passes through this automated headless cloud pipeline in under 5 minutes.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

