import React, { useState } from 'react';

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
      metrics: {
        input_images: "48 Overlapping Photos",
        camera_sensor: "Sony Full-Frame (42MP)",
        focal_length: "24-70mm Calibrated",
        overlap_ratio: "78.4% (Optimal)"
      },
      description: "Drone & terrestrial inspection photography ingested with GPS geotags, camera intrinsic calibration matrices, and exposure equalization."
    },
    {
      step: 2,
      name: "Feature Extraction & SIFT/ORB Matching",
      tag: "Stage 02: Keypoint Correspondence",
      status: "Matched",
      metrics: {
        keypoints_extracted: "184,250 SIFT points",
        matching_pairs: "1,128 Photo Pairs",
        ransac_inliers: "96.2% Inlier Ratio",
        feature_descriptors: "128-dim SIFT vectors"
      },
      description: "Extracts scale-invariant feature transform (SIFT) keypoints across adjacent photographs, applying RANSAC fundamental matrix filtering to reject outlier matches."
    },
    {
      step: 3,
      name: "Sparse Point Cloud (COLMAP SfM)",
      tag: "Stage 03: Structure-from-Motion",
      status: "Reconstructed",
      metrics: {
        sparse_points: "48,620 3D Points",
        bundle_adjustment: "Converged (14 iters)",
        reprojection_error: "0.58 pixels",
        camera_poses_solved: "48 / 48 (100%)"
      },
      description: "Structure-from-Motion (SfM) solves relative 3D camera poses in Euclidean space and triangulates a sparse point cloud representing the monument's geometric envelope."
    },
    {
      step: 4,
      name: "Dense Multi-View Stereo & Mesh Decimation",
      tag: "Stage 04: Dense Surface Reconstruction",
      status: "Meshed",
      metrics: {
        dense_point_cloud: "3.84 Million Points",
        raw_polygons: "1.42 Million Faces",
        decimated_mesh: "42,500 Triangles",
        lod_target: "WebGL Optimized (LOD 0-2)"
      },
      description: "Poisson surface reconstruction calculates continuous polygon topology, followed by Quadric Error Metric (QEM) decimation for instant WebGL loading."
    },
    {
      step: 5,
      name: "Component Segmentation & Twin Registration",
      tag: "Stage 05: Living Digital Twin Live",
      status: "Deployed",
      metrics: {
        segmented_nodes: "4 Architectural Nodes",
        spatial_identity_ids: "C-01 to C-04",
        coordinate_anchor: "WGS84 Aligned",
        twin_status: "Active in Heritage Shield"
      },
      description: "Curvature and planar normal clustering partitions the monument into persistent architectural components, anchoring historical damage logs directly to 3D coordinates."
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
    }, 800);
  };

  const activeStage = pipelineStages[currentStep - 1] || pipelineStages[0];

  return (
    <div className="w-full bg-black text-white space-y-6 pt-4 border-t border-[#1a1a1a]">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <div className="text-[11px] font-mono uppercase text-[#8052ff] font-semibold tracking-wider">
            Automated Photogrammetry Ingestion Pipeline
          </div>
          <h3 className="text-2xl font-normal tracking-[-0.03em] text-white mt-1">
            Drone & LiDAR Scan-to-Twin Reconstruction
          </h3>
        </div>

        <button
          onClick={handleRunSimulation}
          disabled={isRunning}
          className="iris-pill-btn text-xs"
        >
          <span>{isRunning ? 'Processing Photogrammetry...' : '⚡ Simulate Full Pipeline'}</span>
        </button>
      </div>

      {/* 5 Stage Step Navigation Pills */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
        {pipelineStages.map((stage) => {
          const isCurrent = currentStep === stage.step;
          return (
            <button
              key={stage.step}
              onClick={() => setCurrentStep(stage.step)}
              className={`p-3 rounded-2xl border text-left transition cursor-pointer ${
                isCurrent
                  ? 'bg-[#111111] border-[#8052ff] shadow-[0_0_14px_rgba(128,82,255,0.3)]'
                  : 'bg-black border-[#1a1a1a] text-[#9a9a9a] hover:border-[#333333]'
              }`}
            >
              <div className="text-[10px] font-mono uppercase text-[#8052ff] font-semibold">Stage 0{stage.step}</div>
              <div className="text-xs font-normal text-white mt-1 line-clamp-1">{stage.name}</div>
            </button>
          );
        })}
      </div>

      {/* Stage Detail Card */}
      <div className="p-6 bg-[#0a0a0a] rounded-3xl border border-[#1a1a1a] grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-6 space-y-3">
          <div className="text-[11px] font-mono uppercase text-[#8052ff] font-semibold">
            {activeStage.tag}
          </div>
          <h4 className="text-xl font-normal text-white tracking-[-0.02em]">
            {activeStage.name}
          </h4>
          <p className="body-copy-sm text-[#bdbdbd]">
            {activeStage.description}
          </p>
        </div>

        <div className="lg:col-span-6 grid grid-cols-2 gap-4">
          {Object.entries(activeStage.metrics).map(([key, val]) => (
            <div key={key} className="bg-black p-3.5 rounded-2xl border border-[#1a1a1a]">
              <span className="text-[10px] font-mono uppercase text-[#9a9a9a] block">
                {key.replace('_', ' ')}
              </span>
              <span className="text-sm font-mono text-white font-semibold mt-0.5 block">
                {val}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
