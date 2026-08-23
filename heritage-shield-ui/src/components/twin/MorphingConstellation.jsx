import * as THREE from 'three';

// Refined chromatic palette with high contrast against the void
const BRAND_COLORS = [
  new THREE.Color('#8052ff'), // Electric Iris
  new THREE.Color('#a855f7'), // Radiant Purple
  new THREE.Color('#ffb829'), // Saffron Spark
  new THREE.Color('#38bdf8'), // Ice Cyan
  new THREE.Color('#15846e'), // Deep Emerald
  new THREE.Color('#ffffff')  // Star White
];

const SAFFRON_COLOR = new THREE.Color('#ffb829');

/**
 * Creates an InstancedMesh containing ~2,000 chromatic triangular particles
 * with high opacity (0.82), a celestial star twinkling effect with ~1s staggered delay,
 * and an inwards-centered Taj Mahal silhouette that never collides with UI indicators.
 */
export function createMorphingConstellation(count = 2000) {
  // 1. Create a 2D triangle geometry
  const geometry = new THREE.BufferGeometry();
  const size = 0.085;
  const vertices = new Float32Array([
    0, size, 0,
    -size * 0.866, -size * 0.5, 0,
    size * 0.866, -size * 0.5, 0
  ]);
  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
  geometry.computeVertexNormals();

  // 2. Clear material with reduced opacity (0.65) and soft alpha blending
  const material = new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.65,
    blending: THREE.NormalBlending,
    depthWrite: false
  });

  const instancedMesh = new THREE.InstancedMesh(geometry, material, count);
  const dummy = new THREE.Object3D();

  const stage1Positions = [];
  const stage2Positions = [];
  const stage3Positions = [];
  const stage4Positions = [];
  const particleMeta = [];

  const smoothstep = (min, max, value) => {
    const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
    return x * x * (3 - 2 * x);
  };

  // Center the monument comfortably in the right half (x = 2.4) with clearance from screen edges
  const MONUMENT_X = 2.4;

  // ---------------------------------------------------------------------------
  // STAGE 1: ACCURATELY PROPORTIONED, WIDE & ICONIC TAJ MAHAL GEOMETRY
  // ---------------------------------------------------------------------------
  let pIdx = 0;

  // 1. Grand Bulbous Onion Dome (480 particles)
  const DOME_COUNT = 480;
  const domeRings = 20;
  for (let r = 0; r < domeRings; r++) {
    const v = (r + 0.5) / domeRings;
    const h = 1.0 + v * 1.65;
    const radius = 1.65 * Math.sin(v * Math.PI * 0.78 + 0.22);
    const ptsInRing = Math.floor(DOME_COUNT / domeRings);

    for (let j = 0; j < ptsInRing && pIdx < DOME_COUNT; j++) {
      const theta = (j / ptsInRing) * Math.PI * 2 + (r % 2) * (Math.PI / ptsInRing);
      const x = MONUMENT_X + radius * Math.cos(theta);
      const y = h;
      const z = radius * Math.sin(theta) * 0.85;
      stage1Positions.push(new THREE.Vector3(x, y, z));
      pIdx++;
    }
  }

  // 2. Cylindrical Dome Drum Base (120 particles)
  const DRUM_COUNT = 120;
  for (let i = 0; i < DRUM_COUNT; i++) {
    const row = Math.floor(i / 30);
    const col = i % 30;
    const theta = (col / 30) * Math.PI * 2;
    const y = 0.6 + (row / 3) * 0.4;
    const x = MONUMENT_X + 1.35 * Math.cos(theta);
    const z = 1.35 * Math.sin(theta) * 0.85;
    stage1Positions.push(new THREE.Vector3(x, y, z));
    pIdx++;
  }

  // 3. Compact Lotus Finial Spire (40 particles)
  const SPIRE_COUNT = 40;
  for (let i = 0; i < SPIRE_COUNT; i++) {
    const t = i / SPIRE_COUNT;
    const h = 2.65 + t * 0.5;
    const r = (1 - t) * 0.12 + 0.02;
    const theta = t * Math.PI * 6;
    const x = MONUMENT_X + r * Math.cos(theta);
    const y = h;
    const z = r * Math.sin(theta);
    stage1Positions.push(new THREE.Vector3(x, y, z));
    pIdx++;
  }

  // 4. Four Symmetrical Roof Chhatris (200 particles)
  const chhatriCoords = [
    { cx: MONUMENT_X - 1.6, cz: 0.75 },
    { cx: MONUMENT_X + 1.6, cz: 0.75 },
    { cx: MONUMENT_X - 1.6, cz: -0.75 },
    { cx: MONUMENT_X + 1.6, cz: -0.75 }
  ];
  for (let c = 0; c < 4; c++) {
    const { cx, cz } = chhatriCoords[c];
    for (let i = 0; i < 50; i++) {
      const v = i / 50;
      const h = 0.6 + v * 0.75;
      const r = 0.32 * Math.sin(v * Math.PI * 0.8 + 0.2);
      const theta = (i % 8) * (Math.PI / 4);
      const x = cx + r * Math.cos(theta);
      const y = h;
      const z = cz + r * Math.sin(theta);
      stage1Positions.push(new THREE.Vector3(x, y, z));
      pIdx++;
    }
  }

  // 5. Main Mausoleum Facade & Pointed Iwan Arch (460 particles)
  const IWAN_COUNT = 460;
  for (let i = 0; i < IWAN_COUNT; i++) {
    const col = i % 23;
    const row = Math.floor(i / 23);
    const u = (col / 22) * 2 - 1;
    const v = row / 19;

    const x = MONUMENT_X + u * 2.4;
    const y = -1.8 + v * 2.4;

    const isCentralArch = Math.abs(u) < 0.45 && v < 0.85;
    const isSideNiche = Math.abs(u) > 0.55 && Math.abs(u) < 0.85;
    const z = isCentralArch ? -0.45 : isSideNiche ? -0.2 : 0.05;

    stage1Positions.push(new THREE.Vector3(x, y, z));
    pIdx++;
  }

  // 6. Four Slender Corner Minarets (440 particles) - Placed safely at MONUMENT_X ± 3.4
  const minaretCoords = [
    { mx: MONUMENT_X - 3.4, mz: 1.5 },
    { mx: MONUMENT_X + 3.4, mz: 1.5 },
    { mx: MONUMENT_X - 3.4, mz: -1.5 },
    { mx: MONUMENT_X + 3.4, mz: -1.5 }
  ];
  for (let m = 0; m < 4; m++) {
    const { mx, mz } = minaretCoords[m];
    for (let i = 0; i < 110; i++) {
      const t = i / 110;
      const h = -1.8 + t * 4.2;
      const isBalcony = Math.abs(h - (-0.6)) < 0.1 || Math.abs(h - 0.4) < 0.1 || Math.abs(h - 1.4) < 0.1;
      const isCupola = h > 2.1;
      const r = isBalcony ? 0.30 : isCupola ? 0.20 : (1 - t * 0.15) * 0.13;
      const theta = (i % 8) * (Math.PI / 4);
      const x = mx + r * Math.cos(theta);
      const y = h;
      const z = mz + r * Math.sin(theta);
      stage1Positions.push(new THREE.Vector3(x, y, z));
      pIdx++;
    }
  }

  // 7. Wide Stepped Marble Plinth Foundation (Remaining particles)
  while (pIdx < count) {
    const i = pIdx;
    const col = (i % 160) % 32;
    const row = Math.floor((i % 160) / 32);
    const u = (col / 31) * 2 - 1;
    const v = (row / 4) * 2 - 1;
    const x = MONUMENT_X + u * 3.8;
    const y = -1.85 - Math.floor(i / 160) * 0.22;
    const z = v * 2.0;
    stage1Positions.push(new THREE.Vector3(x, y, z));
    pIdx++;
  }

  // ---------------------------------------------------------------------------
  // STAGES 2, 3, 4 TARGET POSITIONS
  // ---------------------------------------------------------------------------
  for (let i = 0; i < count; i++) {
    // STAGE 2: Volumetric Scatter
    const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    const r2 = 2.2 + Math.cbrt(i / count) * 4.4;
    const s2x = r2 * Math.sin(phi) * Math.cos(theta);
    const s2y = r2 * Math.sin(phi) * Math.sin(theta) * 0.8;
    const s2z = r2 * Math.cos(phi) * 0.7;
    stage2Positions.push(new THREE.Vector3(s2x, s2y, s2z));

    // STAGE 3: Analytical Defect Mesh
    let s3x, s3y, s3z;
    const isCrackNode = i % 6 === 0;

    if (isCrackNode) {
      const t = (i % 300) / 300;
      s3x = -3.4 + Math.sin(t * 6) * 0.45;
      s3y = -2.6 + t * 5.2;
      s3z = (i % 2 === 0 ? 0.08 : -0.08);
    } else {
      const col = (i % 30) / 29;
      const row = Math.floor((i % 1500) / 30) / 49;
      s3x = -5.6 + col * 4.2;
      s3y = -2.8 + row * 5.6;
      s3z = ((i % 3) - 1) * 0.15;
    }
    stage3Positions.push(new THREE.Vector3(s3x, s3y, s3z));

    // STAGE 4: Orbital Celestial Mandala
    const ringTier = i % 3;
    const ringPts = Math.floor(count / 3);
    const ringAngle = ((i % ringPts) / ringPts) * Math.PI * 2;
    let s4Radius, s4Y;

    if (ringTier === 0) {
      s4Radius = 3.6;
      s4Y = Math.sin(ringAngle * 3) * 0.3;
    } else if (ringTier === 1) {
      s4Radius = 4.8;
      s4Y = Math.cos(ringAngle * 2) * 0.5;
    } else {
      s4Radius = 5.8;
      s4Y = Math.sin(ringAngle * 4) * 0.7;
    }

    const s4x = s4Radius * Math.cos(ringAngle);
    const s4z = s4Radius * Math.sin(ringAngle) * 0.85;
    stage4Positions.push(new THREE.Vector3(s4x, s4Y, s4z));

    // Setup initial Mesh Matrix
    const p1 = stage1Positions[i];
    dummy.position.copy(p1);
    dummy.rotation.set(0, 0, (i % 4) * (Math.PI / 4));
    dummy.scale.set(0.7, 0.7, 0.7);
    dummy.updateMatrix();

    instancedMesh.setMatrixAt(i, dummy.matrix);

    const baseColor = BRAND_COLORS[i % BRAND_COLORS.length];
    instancedMesh.setColorAt(i, baseColor);

    // Staggered twinkle phase: offsets stars so they twinkle with a ~1-second natural delay
    particleMeta.push({
      baseColor,
      isCrackNode,
      baseScale: 0.65 + (i % 5) * 0.05,
      twinklePhase: (i * 1.618033) % (Math.PI * 2),
      twinkleSpeed: 1.2 + (i % 3) * 0.3
    });
  }

  instancedMesh.instanceMatrix.needsUpdate = true;
  if (instancedMesh.instanceColor) {
    instancedMesh.instanceColor.needsUpdate = true;
  }

  const currentPos = new THREE.Vector3();
  const finalPos = new THREE.Vector3();
  const tempColor = new THREE.Color();

  /**
   * Updates constellation morphology with smooth scroll interpolation and
   * celestial star twinkling with a staggered ~1-second delay.
   */
  function updateConstellation(p = 0, time = 0, pointerX = 0, pointerY = 0) {
    const tiltX = pointerX * 0.35;
    const tiltY = pointerY * 0.22;

    // Cinematic initial entrance reveal: materializes smoothly right after the headline text at t = 0.70s
    const entranceRaw = Math.max(0, Math.min(1, (time - 0.70) / 1.2));
    const entranceEase = entranceRaw * entranceRaw * (3 - 2 * entranceRaw);
    material.opacity = 0.65 * entranceEase;

    for (let i = 0; i < count; i++) {
      const meta = particleMeta[i];
      const p1 = stage1Positions[i];
      const p2 = stage2Positions[i];
      const p3 = stage3Positions[i];
      const p4 = stage4Positions[i];

      // Multi-stage interpolation
      if (p <= 0.22) {
        currentPos.copy(p1);
      } else if (p <= 0.48) {
        const t = smoothstep(0.22, 0.48, p);
        currentPos.lerpVectors(p1, p2, t);
      } else if (p <= 0.74) {
        const t = smoothstep(0.48, 0.74, p);
        currentPos.lerpVectors(p2, p3, t);
      } else {
        const t = smoothstep(0.74, 1.00, p);
        currentPos.lerpVectors(p3, p4, t);

        if (t > 0.15) {
          const angle = time * 0.08 * t;
          const cosA = Math.cos(angle);
          const sinA = Math.sin(angle);
          const rx = currentPos.x * cosA - currentPos.z * sinA;
          const rz = currentPos.x * sinA + currentPos.z * cosA;
          currentPos.x = rx;
          currentPos.z = rz;
        }
      }

      // Smooth pointer parallax offset
      finalPos.set(
        currentPos.x + tiltX * 0.35,
        currentPos.y + tiltY * 0.25,
        currentPos.z
      );

      // Celestial Star Twinkling Calculation (with initial entrance reveal scaling)
      const twinkle = 0.58 + 0.42 * Math.sin(time * meta.twinkleSpeed + meta.twinklePhase);
      const currentScale = meta.baseScale * (0.65 + 0.45 * twinkle) * entranceEase;

      dummy.position.copy(finalPos);
      dummy.rotation.set(0, 0, (i % 4) * (Math.PI / 4));
      dummy.scale.set(currentScale, currentScale, currentScale);
      dummy.updateMatrix();

      instancedMesh.setMatrixAt(i, dummy.matrix);

      if (p > 0.48 && p <= 0.74 && meta.isCrackNode) {
        const t = smoothstep(0.48, 0.74, p);
        tempColor.lerpColors(meta.baseColor, SAFFRON_COLOR, t * 0.85);
      } else {
        tempColor.copy(meta.baseColor).multiplyScalar(0.72 + 0.38 * twinkle);
      }
      instancedMesh.setColorAt(i, tempColor);
    }

    instancedMesh.instanceMatrix.needsUpdate = true;
    if (instancedMesh.instanceColor) {
      instancedMesh.instanceColor.needsUpdate = true;
    }
  }

  return {
    mesh: instancedMesh,
    update: updateConstellation,
    dispose: () => {
      geometry.dispose();
      material.dispose();
    }
  };
}
