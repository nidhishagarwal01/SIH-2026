import * as THREE from 'three';

// Brand chromatic palette for particle constellation
const BRAND_PALETTE = [
  new THREE.Color('#8052ff'), // Electric Iris
  new THREE.Color('#ffb829'), // Saffron Spark
  new THREE.Color('#15846e'), // Deep Verdant
  new THREE.Color('#a855f7'), // Purple Aura
  new THREE.Color('#38bdf8'), // Ice Blue
  new THREE.Color('#ffffff')  // Bone White
];

/**
 * Creates an InstancedMesh containing ~1800 ambient chromatic triangle particles
 * positioned strictly BELOW the monument base/plinth to provide a floating sub-surface
 * foundation without interfering with the upper structural visibility.
 */
export function createTriangleConstellation(count = 1800, radiusMin = 2.5, radiusMax = 15.0) {
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

  // 2. Material with additive blending and per-instance colors
  const material = new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.75,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  // 3. InstancedMesh
  const instancedMesh = new THREE.InstancedMesh(geometry, material, count);
  const dummy = new THREE.Object3D();

  // Store per-particle kinematic data for continuous animation
  const particleData = [];

  for (let i = 0; i < count; i++) {
    // Distribute horizontally across a planar disc below the monument
    const theta = Math.random() * 2.0 * Math.PI;
    const r = radiusMin + Math.sqrt(Math.random()) * (radiusMax - radiusMin);

    const x = r * Math.cos(theta);
    const z = r * Math.sin(theta);
    // Strictly negative Y coordinates (below ground plinth y: -0.3 to -3.8)
    const y = -0.35 - Math.random() * 3.2;

    dummy.position.set(x, y, z);
    dummy.rotation.set(
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2
    );
    const scale = Math.random() * 0.85 + 0.35;
    dummy.scale.set(scale, scale, scale);
    dummy.updateMatrix();

    instancedMesh.setMatrixAt(i, dummy.matrix);

    // Pick chromatic palette color
    const color = BRAND_PALETTE[Math.floor(Math.random() * BRAND_PALETTE.length)];
    instancedMesh.setColorAt(i, color);

    particleData.push({
      originalPos: new THREE.Vector3(x, y, z),
      driftSpeed: (Math.random() * 0.0008 + 0.0003) * (Math.random() > 0.5 ? 1 : -1),
      orbitRadius: r,
      currentAngle: theta,
      rotSpeedX: (Math.random() - 0.5) * 0.015,
      rotSpeedY: (Math.random() - 0.5) * 0.015,
      baseY: y,
      verticalPhase: Math.random() * Math.PI * 2,
      scale
    });
  }

  instancedMesh.instanceMatrix.needsUpdate = true;
  if (instancedMesh.instanceColor) {
    instancedMesh.instanceColor.needsUpdate = true;
  }

  // Animation update function called every render tick
  function updateConstellation(timeDelta = 0.016, time = 0) {
    for (let i = 0; i < count; i++) {
      const p = particleData[i];
      p.currentAngle += p.driftSpeed;

      const newX = Math.cos(p.currentAngle) * p.orbitRadius;
      const newZ = Math.sin(p.currentAngle) * p.orbitRadius;
      // Keep strictly below y = -0.2 at all times during wave animation
      const newY = Math.min(-0.2, p.baseY + Math.sin(time * 0.8 + p.verticalPhase) * 0.25);

      dummy.position.set(newX, newY, newZ);
      dummy.rotation.x += p.rotSpeedX;
      dummy.rotation.y += p.rotSpeedY;
      dummy.scale.set(p.scale, p.scale, p.scale);
      dummy.updateMatrix();

      instancedMesh.setMatrixAt(i, dummy.matrix);
    }
    instancedMesh.instanceMatrix.needsUpdate = true;
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
