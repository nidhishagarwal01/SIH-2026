import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Procedural PBR Stone & Marble Texture Generator
function createProceduralTexture(type = 'sandstone') {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  if (type === 'marble') {
    ctx.fillStyle = '#E8E8E6';
    ctx.fillRect(0, 0, 512, 512);
    // Veins
    for (let i = 0; i < 18; i++) {
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(160, 160, 165, 0.25)';
      ctx.lineWidth = Math.random() * 3 + 1;
      let x = Math.random() * 512;
      let y = 0;
      ctx.moveTo(x, y);
      while (y < 512) {
        x += (Math.random() - 0.5) * 40;
        y += Math.random() * 30 + 10;
        ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
  } else if (type === 'granite') {
    ctx.fillStyle = '#7A7C80';
    ctx.fillRect(0, 0, 512, 512);
    // Granite Flecks
    for (let i = 0; i < 4000; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      const radius = Math.random() * 2 + 0.5;
      ctx.fillStyle = Math.random() > 0.5 ? 'rgba(230,230,235,0.4)' : 'rgba(30,30,35,0.5)';
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (type === 'basalt') {
    ctx.fillStyle = '#3E3B38';
    ctx.fillRect(0, 0, 512, 512);
    // Volcanic Pores
    for (let i = 0; i < 3000; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      ctx.fillStyle = 'rgba(20,20,20,0.6)';
      ctx.beginPath();
      ctx.arc(x, y, Math.random() * 2.5 + 0.5, 0, Math.PI * 2);
      ctx.fill();
    }
  } else {
    // Sandstone (Default)
    ctx.fillStyle = '#A88258';
    ctx.fillRect(0, 0, 512, 512);
    // Sedimentary Layers
    for (let y = 0; y < 512; y += 4) {
      const alpha = Math.sin(y * 0.08) * 0.15 + 0.15;
      ctx.fillStyle = `rgba(80, 50, 20, ${alpha})`;
      ctx.fillRect(0, y, 512, 2);
    }
    for (let i = 0; i < 2000; i++) {
      ctx.fillStyle = 'rgba(240, 210, 160, 0.15)';
      ctx.fillRect(Math.random() * 512, Math.random() * 512, 2, 2);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  return texture;
}

export default function MonumentViewer3D({
  siteIndex = 0,
  siteData = null,
  activeComponent = 0,
  onSelectComponent,
  components = [],
  isEmbedded = false,
  availableSites = [],
  onSelectSite
}) {
  const mountRef = useRef(null);
  const [viewMode, setViewMode] = useState('stone'); // 'stone' | 'lidar' | 'heatmap'
  const [autoRotate, setAutoRotate] = useState(true);
  const [cameraView, setCameraView] = useState('iso'); // 'iso' | 'front' | 'top'

  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const monumentGroupRef = useRef(null);
  const activeMeshesRef = useRef([]);
  const animFrameIdRef = useRef(null);

  const activeComponentRef = useRef(activeComponent);
  const onSelectComponentRef = useRef(onSelectComponent);

  useEffect(() => {
    activeComponentRef.current = activeComponent;
    onSelectComponentRef.current = onSelectComponent;
  }, [activeComponent, onSelectComponent]);

  const currentTitle = siteData?.name
    ? `${siteData.name}`
    : `Qutub Minar Complex`;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x08090C);
    scene.fog = new THREE.FogExp2(0x08090C, 0.025);

    const width = container.clientWidth;
    const height = container.clientHeight || (isEmbedded ? 380 : 520);

    // 2. Camera with generous framing to ensure full monument is in view
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    const initDist = isEmbedded ? 14.5 : 12.0;
    camera.position.set(0, 3.2, initDist);
    cameraRef.current = camera;


    // 3. Renderer with high-fidelity soft shadows
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    rendererRef.current = renderer;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 4. OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 + 0.02;
    controls.minDistance = 3.0;
    controls.maxDistance = 30;
    controls.target.set(0, 2.0, 0);
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 0.8;
    // Disable scroll wheel zoom when embedded so scrolling the page doesn't zoom 3D model
    controls.enableZoom = !isEmbedded;
    controlsRef.current = controls;

    // 5. Cinematic Heritage Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xFFF7EB, 0.85);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xFFE8D0, 2.2);
    sunLight.position.set(10, 16, 8);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 35;
    sunLight.shadow.camera.left = -8;
    sunLight.shadow.camera.right = 8;
    sunLight.shadow.camera.top = 8;
    sunLight.shadow.camera.bottom = -8;
    sunLight.shadow.bias = -0.0005;
    scene.add(sunLight);

    const cyanRimLight = new THREE.DirectionalLight(0x38BDF8, 0.9);
    cyanRimLight.position.set(-9, 5, -8);
    scene.add(cyanRimLight);

    const warmFillLight = new THREE.PointLight(0xC5A059, 1.0, 14, 1.2);
    warmFillLight.position.set(0, 2.5, 5);
    scene.add(warmFillLight);

    // 6. Ground Telemetry Compass & Grid
    const groundGroup = new THREE.Group();
    scene.add(groundGroup);

    // Shadow receiver disc
    const shadowGeo = new THREE.CircleGeometry(6.5, 48);
    const shadowMat = new THREE.ShadowMaterial({ opacity: 0.45 });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -0.01;
    shadowMesh.receiveShadow = true;
    groundGroup.add(shadowMesh);

    // Circular scanning ring
    const ringGeo = new THREE.RingGeometry(5.2, 5.25, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xC5A059, opacity: 0.25, transparent: true, side: THREE.DoubleSide });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = -Math.PI / 2;
    ringMesh.position.y = 0.005;
    groundGroup.add(ringMesh);

    // Grid Floor
    const grid = new THREE.GridHelper(12, 24, 0xC5A059, 0x1E2228);
    grid.position.y = 0;
    grid.material.opacity = 0.35;
    grid.material.transparent = true;
    groundGroup.add(grid);

    // 7. Procedural PBR Material Palette
    const sandstoneTexture = createProceduralTexture('sandstone');
    const marbleTexture = createProceduralTexture('marble');
    const graniteTexture = createProceduralTexture('granite');
    const basaltTexture = createProceduralTexture('basalt');

    const materials = {
      redSandstone: new THREE.MeshStandardMaterial({
        color: 0xBF754B,
        roughness: 0.82,
        metalness: 0.05,
        bumpMap: sandstoneTexture,
        bumpScale: 0.08
      }),
      ochreSandstone: new THREE.MeshStandardMaterial({
        color: 0xC9A15C,
        roughness: 0.75,
        metalness: 0.1,
        bumpMap: sandstoneTexture,
        bumpScale: 0.06
      }),
      makranaMarble: new THREE.MeshStandardMaterial({
        color: 0xF5F4F0,
        roughness: 0.28,
        metalness: 0.12,
        bumpMap: marbleTexture,
        bumpScale: 0.03
      }),
      deccanBasalt: new THREE.MeshStandardMaterial({
        color: 0x46423E,
        roughness: 0.92,
        metalness: 0.08,
        bumpMap: basaltTexture,
        bumpScale: 0.12
      }),
      graniteStone: new THREE.MeshStandardMaterial({
        color: 0x8C8A84,
        roughness: 0.85,
        metalness: 0.08,
        bumpMap: graniteTexture,
        bumpScale: 0.09
      }),
      goldFinial: new THREE.MeshStandardMaterial({
        color: 0xE8B931,
        roughness: 0.22,
        metalness: 0.85
      }),
      ancientBrick: new THREE.MeshStandardMaterial({
        color: 0x9E5A3C,
        roughness: 0.95,
        bumpMap: sandstoneTexture,
        bumpScale: 0.1
      }),
      khondalite: new THREE.MeshStandardMaterial({
        color: 0x857564,
        roughness: 0.9,
        bumpMap: graniteTexture,
        bumpScale: 0.1
      })
    };

    // 8. Build Ultra-Detailed Procedural Architecture
    const monumentGroup = new THREE.Group();
    scene.add(monumentGroup);
    monumentGroupRef.current = monumentGroup;

    let activeMeshes = [];
    const typology = siteData?.typology || (
      siteIndex === 0 ? 'qutub_minar' :
      siteIndex === 1 ? 'hampi_chariot' :
      siteIndex === 2 ? 'golconda_citadel' :
      siteIndex === 3 ? 'konark_temple' :
      siteIndex === 4 ? 'ajanta_caves' :
      siteIndex === 5 ? 'taj_mahal' :
      siteIndex === 6 ? 'ellora_kailasa' :
      siteIndex === 7 ? 'khajuraho_temple' :
      siteIndex === 8 ? 'sanchi_stupa' :
      siteIndex === 9 ? 'chola_temple' :
      siteIndex === 10 ? 'rani_ki_vav' :
      'dholavira_citadel'
    );

    // =========================================================================
    // 1. QUTUB MINAR (Delhi) — Fluted 5-Tier Sandstone Minaret with Stalactite Balconies
    // =========================================================================
    if (typology === 'qutub_minar') {
      // 1. Polygon Plinth
      const plinthMesh = new THREE.Mesh(new THREE.CylinderGeometry(2.1, 2.4, 0.6, 24), materials.redSandstone.clone());
      plinthMesh.position.y = 0.3;
      plinthMesh.castShadow = true;
      plinthMesh.receiveShadow = true;
      plinthMesh.userData = { componentIndex: 3, name: 'Octagonal Plinth & Substructure', baseColor: 0xBF754B };
      monumentGroup.add(plinthMesh);

      // 2. Tier 1 (Alternating Angular & Rounded Flutings)
      const tier1Group = new THREE.Group();
      const shaft1 = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.95, 1.8, 32), materials.redSandstone.clone());
      shaft1.position.y = 1.5;
      shaft1.castShadow = true;
      tier1Group.add(shaft1);
      for (let i = 0; i < 24; i++) {
        const angle = (i / 24) * Math.PI * 2;
        const radius = 1.78;
        const fluting = new THREE.Mesh(
          i % 2 === 0 ? new THREE.CylinderGeometry(0.1, 0.1, 1.8, 8) : new THREE.BoxGeometry(0.12, 1.8, 0.12),
          materials.redSandstone
        );
        fluting.position.set(Math.cos(angle) * radius, 1.5, Math.sin(angle) * radius);
        fluting.rotation.y = -angle;
        fluting.castShadow = true;
        tier1Group.add(fluting);
      }
      tier1Group.userData = { componentIndex: 2, name: 'Storey I Shaft (Fluted Sandstone)', baseColor: 0xBF754B };
      monumentGroup.add(tier1Group);

      // 3. Balcony Gallery 1
      const balcony1 = new THREE.Mesh(new THREE.CylinderGeometry(1.9, 1.55, 0.35, 32), materials.ochreSandstone.clone());
      balcony1.position.y = 2.5;
      balcony1.castShadow = true;
      balcony1.userData = { componentIndex: 1, name: 'Storey II Balcony Gallery', baseColor: 0xC9A15C };
      monumentGroup.add(balcony1);

      // 4. Tier 2 & 3 (Tapering shafts with white marble bands)
      const tier2 = new THREE.Mesh(new THREE.CylinderGeometry(1.25, 1.55, 1.6, 32), materials.redSandstone);
      tier2.position.y = 3.45;
      tier2.castShadow = true;
      monumentGroup.add(tier2);

      const balcony2 = new THREE.Mesh(new THREE.CylinderGeometry(1.45, 1.2, 0.25, 32), materials.ochreSandstone);
      balcony2.position.y = 4.35;
      monumentGroup.add(balcony2);

      const tier4 = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 1.15, 1.2, 32), materials.makranaMarble);
      tier4.position.y = 5.05;
      tier4.castShadow = true;
      monumentGroup.add(tier4);

      // 5. Cupola & Apex Finial
      const apexGroup = new THREE.Group();
      const cupola = new THREE.Mesh(new THREE.SphereGeometry(0.65, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2), materials.makranaMarble.clone());
      cupola.position.y = 5.65;
      apexGroup.add(cupola);
      const brassFinial = new THREE.Mesh(new THREE.ConeGeometry(0.15, 0.8, 16), materials.goldFinial);
      brassFinial.position.y = 6.45;
      brassFinial.castShadow = true;
      apexGroup.add(brassFinial);
      apexGroup.userData = { componentIndex: 0, name: 'Finial & Apex Cupola (+72.5m)', baseColor: 0xE8B931 };
      monumentGroup.add(apexGroup);

      activeMeshes = [apexGroup, balcony1, tier1Group, plinthMesh];
    }

    // =========================================================================
    // 2. TAJ MAHAL (Agra) — Symmetrical White Makrana Marble Mausoleum & 4 Minarets
    // =========================================================================
    else if (typology === 'taj_mahal') {
      // 1. Giant Square Plinth with chamfered corners
      const plinthMesh = new THREE.Mesh(new THREE.BoxGeometry(5.6, 0.5, 5.6), materials.makranaMarble.clone());
      plinthMesh.position.y = 0.25;
      plinthMesh.castShadow = true;
      plinthMesh.receiveShadow = true;
      plinthMesh.userData = { componentIndex: 3, name: 'Chamfered Marble Plinth', baseColor: 0xF5F4F0 };
      monumentGroup.add(plinthMesh);

      // 2. Four Corner Minarets (Three-stage tapering minars with chhatris)
      const minaretCoords = [[-2.5, -2.5], [2.5, -2.5], [-2.5, 2.5], [2.5, 2.5]];
      minaretCoords.forEach(([mx, mz]) => {
        const mGroup = new THREE.Group();
        const base = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.32, 0.5, 16), materials.makranaMarble);
        base.position.set(mx, 0.75, mz);
        mGroup.add(base);
        const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.24, 3.2, 16), materials.makranaMarble);
        shaft.position.set(mx, 2.6, mz);
        shaft.castShadow = true;
        mGroup.add(shaft);
        // Balconies
        [1.8, 2.9, 3.9].forEach(by => {
          const bRing = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.22, 0.08, 16), materials.makranaMarble);
          bRing.position.set(mx, by, mz);
          mGroup.add(bRing);
        });
        // Chhatri Dome
        const chhatri = new THREE.Mesh(new THREE.SphereGeometry(0.22, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2), materials.makranaMarble);
        chhatri.position.set(mx, 4.3, mz);
        mGroup.add(chhatri);
        const finial = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.3, 8), materials.goldFinial);
        finial.position.set(mx, 4.6, mz);
        mGroup.add(finial);
        monumentGroup.add(mGroup);
      });

      // 3. Central Cubic Body with Chamfered Corners & Grand Pishtaq Arches
      const bodyGroup = new THREE.Group();
      const mainCube = new THREE.Mesh(new THREE.BoxGeometry(3.2, 2.2, 3.2), materials.makranaMarble.clone());
      mainCube.position.y = 1.6;
      mainCube.castShadow = true;
      bodyGroup.add(mainCube);

      // Four Grand Iwan Portals (Front, Back, Left, Right recessed niches)
      [[0, 0, 1.62], [0, 0, -1.62], [1.62, 0, 0], [-1.62, 0, 0]].forEach(([px, py, pz], idx) => {
        const iwan = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.7, 0.15), materials.ochreSandstone);
        iwan.position.set(px, 1.5, pz);
        if (idx >= 2) iwan.rotation.y = Math.PI / 2;
        bodyGroup.add(iwan);
      });
      bodyGroup.userData = { componentIndex: 2, name: 'North & South Pishtaq Iwan Façades', baseColor: 0xF5F4F0 };
      monumentGroup.add(bodyGroup);

      // 4. Four Roof Chhatris
      [[-1.1, -1.1], [1.1, -1.1], [-1.1, 1.1], [1.1, 1.1]].forEach(([cx, cz]) => {
        const cGroup = new THREE.Group();
        const dome = new THREE.Mesh(new THREE.SphereGeometry(0.35, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2), materials.makranaMarble);
        dome.position.set(cx, 3.0, cz);
        dome.castShadow = true;
        cGroup.add(dome);
        monumentGroup.add(cGroup);
      });

      // 5. Grand Bulbous Onion Dome with Lotus Collar & Golden Kalasha
      const domeGroup = new THREE.Group();
      const drum = new THREE.Mesh(new THREE.CylinderGeometry(1.25, 1.25, 0.7, 32), materials.makranaMarble);
      drum.position.y = 3.05;
      domeGroup.add(drum);

      // Bulbous Dome geometry (expanded sphere profile)
      const domeGeo = new THREE.SphereGeometry(1.45, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.62);
      const mainDome = new THREE.Mesh(domeGeo, materials.makranaMarble.clone());
      mainDome.position.y = 3.4;
      mainDome.castShadow = true;
      domeGroup.add(mainDome);

      // Lotus Crown & Golden Finial
      const lotusCollar = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.5, 0.2, 16), materials.makranaMarble);
      lotusCollar.position.y = 4.8;
      domeGroup.add(lotusCollar);

      const goldenFinial = new THREE.Mesh(new THREE.ConeGeometry(0.12, 1.1, 16), materials.goldFinial);
      goldenFinial.position.y = 5.4;
      goldenFinial.castShadow = true;
      domeGroup.add(goldenFinial);

      domeGroup.userData = { componentIndex: 0, name: 'Grand Bulbous White Marble Dome', baseColor: 0xF5F4F0 };
      monumentGroup.add(domeGroup);

      activeMeshes = [domeGroup, bodyGroup, plinthMesh];
    }

    // =========================================================================
    // 3. KONARK SUN TEMPLE (Odisha) — Jagamohana Stepped Pyramid & 24 Carved Wheels
    // =========================================================================
    else if (typology === 'konark_temple') {
      // 1. Sprawling Jagati Plinth
      const plinthMesh = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.8, 5.2), materials.khondalite.clone());
      plinthMesh.position.y = 0.4;
      plinthMesh.castShadow = true;
      plinthMesh.receiveShadow = true;
      plinthMesh.userData = { componentIndex: 3, name: 'Sculpted Jagati Platform', baseColor: 0x857564 };
      monumentGroup.add(plinthMesh);

      // 2. 12 Carved Sun Wheels (Chariot of Surya)
      const wheelGroup = new THREE.Group();
      [-2.1, -0.7, 0.7, 2.1].forEach(wx => {
        [2.65, -2.65].forEach(wz => {
          const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.15, 24), materials.khondalite);
          wheel.rotation.x = Math.PI / 2;
          wheel.position.set(wx, 0.55, wz);
          wheelGroup.add(wheel);
        });
      });
      wheelGroup.userData = { componentIndex: 2, name: '24 Monolithic Chariot Wheels', baseColor: 0x857564 };
      monumentGroup.add(wheelGroup);

      // 3. 3-Tiered Stepped Pyramidal Pidha Deula Roof
      const jagamohanaGroup = new THREE.Group();
      const tier1 = new THREE.Mesh(new THREE.CylinderGeometry(2.4, 3.2, 0.9, 8), materials.khondalite.clone());
      tier1.position.y = 1.35;
      tier1.castShadow = true;
      jagamohanaGroup.add(tier1);

      const tier2 = new THREE.Mesh(new THREE.CylinderGeometry(1.7, 2.4, 0.8, 8), materials.khondalite.clone());
      tier2.position.y = 2.2;
      tier2.castShadow = true;
      jagamohanaGroup.add(tier2);

      const tier3 = new THREE.Mesh(new THREE.CylinderGeometry(1.0, 1.7, 0.7, 8), materials.khondalite.clone());
      tier3.position.y = 2.95;
      tier3.castShadow = true;
      jagamohanaGroup.add(tier3);

      jagamohanaGroup.userData = { componentIndex: 1, name: 'Jagamohana Stepped Pyramid Roof', baseColor: 0x857564 };
      monumentGroup.add(jagamohanaGroup);

      // 4. Ribbed Amalaka Disc & Kalasha Pot
      const amalakaGroup = new THREE.Group();
      const amalaka = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.95, 0.35, 24), materials.ochreSandstone.clone());
      amalaka.position.y = 3.5;
      amalaka.castShadow = true;
      amalakaGroup.add(amalaka);

      const kalasha = new THREE.Mesh(new THREE.SphereGeometry(0.4, 16, 12), materials.ochreSandstone);
      kalasha.position.y = 3.9;
      amalakaGroup.add(kalasha);

      amalakaGroup.userData = { componentIndex: 0, name: 'Amalaka & Kalasha Finial', baseColor: 0xC9A15C };
      monumentGroup.add(amalakaGroup);

      activeMeshes = [amalakaGroup, jagamohanaGroup, wheelGroup, plinthMesh];
    }

    // =========================================================================
    // 4. HAMPI STONE CHARIOT (Karnataka) — Monolithic Shrine on Carved Wheels
    // =========================================================================
    else if (typology === 'hampi_chariot') {
      const plinthMesh = new THREE.Mesh(new THREE.BoxGeometry(4.0, 0.7, 4.8), materials.graniteStone.clone());
      plinthMesh.position.y = 0.35;
      plinthMesh.castShadow = true;
      plinthMesh.receiveShadow = true;
      plinthMesh.userData = { componentIndex: 3, name: 'Adhisthana Stepped Plinth', baseColor: 0x8C8A84 };
      monumentGroup.add(plinthMesh);

      // 4 Carved Wheels
      const wheelGroup = new THREE.Group();
      [[-1.8, 0.7, 1.5], [1.8, 0.7, 1.5], [-1.8, 0.7, -1.5], [1.8, 0.7, -1.5]].forEach(([wx, wy, wz]) => {
        const wMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.6, 0.28, 24), materials.graniteStone.clone());
        wMesh.rotation.z = Math.PI / 2;
        wMesh.position.set(wx, wy, wz);
        wMesh.castShadow = true;
        wheelGroup.add(wMesh);
      });
      wheelGroup.userData = { componentIndex: 2, name: 'Monolithic Carved Wheels', baseColor: 0x8C8A84 };
      monumentGroup.add(wheelGroup);

      // Garuda Sanctum with 16 Pillars
      const sanctumGroup = new THREE.Group();
      const floor = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.3, 3.4), materials.graniteStone);
      floor.position.y = 1.15;
      sanctumGroup.add(floor);

      [[-1.2, 1.3], [1.2, 1.3], [-1.2, -1.3], [1.2, -1.3], [0, 1.3], [0, -1.3]].forEach(([px, pz]) => {
        const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 1.4, 12), materials.graniteStone);
        pillar.position.set(px, 1.95, pz);
        pillar.castShadow = true;
        sanctumGroup.add(pillar);
      });
      sanctumGroup.userData = { componentIndex: 1, name: 'Garuda Sanctum & Fluted Pillars', baseColor: 0x8C8A84 };
      monumentGroup.add(sanctumGroup);

      // Dravidian Vimana Shikhara
      const vimanaGroup = new THREE.Group();
      const t1 = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.6, 3.0), materials.ochreSandstone.clone());
      t1.position.y = 2.9;
      t1.castShadow = true;
      vimanaGroup.add(t1);

      const t2 = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.6, 2.2), materials.ochreSandstone);
      t2.position.y = 3.5;
      t2.castShadow = true;
      vimanaGroup.add(t2);

      const stupi = new THREE.Mesh(new THREE.ConeGeometry(0.4, 0.9, 16), materials.goldFinial);
      stupi.position.y = 4.25;
      vimanaGroup.add(stupi);
      vimanaGroup.userData = { componentIndex: 0, name: 'Stepped Vimana Shikhara', baseColor: 0xC9A15C };
      monumentGroup.add(vimanaGroup);

      activeMeshes = [vimanaGroup, sanctumGroup, wheelGroup, plinthMesh];
    }

    // =========================================================================
    // 5. SANCHI STUPA (Madhya Pradesh) — Hemispherical Anda Dome, Harmika & Toranas
    // =========================================================================
    else if (typology === 'sanchi_stupa') {
      const terraceMesh = new THREE.Mesh(new THREE.CylinderGeometry(4.2, 4.4, 0.8, 48), materials.ochreSandstone.clone());
      terraceMesh.position.y = 0.4;
      terraceMesh.castShadow = true;
      terraceMesh.receiveShadow = true;
      terraceMesh.userData = { componentIndex: 3, name: 'Circular Medhi Terrace', baseColor: 0xC9A15C };
      monumentGroup.add(terraceMesh);

      // Giant Hemispherical Dome (Anda)
      const andaMesh = new THREE.Mesh(new THREE.SphereGeometry(3.2, 36, 24, 0, Math.PI * 2, 0, Math.PI / 2), materials.ochreSandstone.clone());
      andaMesh.position.y = 0.8;
      andaMesh.castShadow = true;
      andaMesh.userData = { componentIndex: 2, name: 'Hemispherical Solid Masonry Dome (Anda)', baseColor: 0xC9A15C };
      monumentGroup.add(andaMesh);

      // Four Carved Torana Gateways (North, South, East, West)
      const toranaGroup = new THREE.Group();
      [[0, 4.6, 0], [0, -4.6, Math.PI], [4.6, 0, Math.PI / 2], [-4.6, 0, -Math.PI / 2]].forEach(([tx, tz, trot]) => {
        const t = new THREE.Group();
        const p1 = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 2.6, 12), materials.ochreSandstone);
        p1.position.set(-0.8, 1.3, 0);
        const p2 = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 2.6, 12), materials.ochreSandstone);
        p2.position.set(0.8, 1.3, 0);
        const arch1 = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.15, 0.15), materials.ochreSandstone);
        arch1.position.y = 2.4;
        const arch2 = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.15, 0.15), materials.ochreSandstone);
        arch2.position.y = 2.7;
        t.add(p1, p2, arch1, arch2);
        t.position.set(tx, 0, tz);
        t.rotation.y = trot;
        toranaGroup.add(t);
      });
      toranaGroup.userData = { componentIndex: 1, name: 'Four Carved Torana Gateways', baseColor: 0xC9A15C };
      monumentGroup.add(toranaGroup);

      // Harmika Balcony & Triple Chattras
      const harmikaGroup = new THREE.Group();
      const balcony = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.5, 1.2), materials.ochreSandstone);
      balcony.position.y = 4.15;
      harmikaGroup.add(balcony);

      [4.55, 4.9, 5.25].forEach((cy, idx) => {
        const disc = new THREE.Mesh(new THREE.CylinderGeometry(0.7 - idx * 0.15, 0.7 - idx * 0.15, 0.08, 24), materials.goldFinial);
        disc.position.y = cy;
        harmikaGroup.add(disc);
      });
      harmikaGroup.userData = { componentIndex: 0, name: 'Harmika & Triple Honorific Chattras', baseColor: 0xE8B931 };
      monumentGroup.add(harmikaGroup);

      activeMeshes = [harmikaGroup, toranaGroup, andaMesh, terraceMesh];
    }

    // =========================================================================
    // 6. GOLCONDA CITADEL (Telangana) — Concentric Fortress Ramparts & Bala Hissar
    // =========================================================================
    else if (typology === 'golconda_citadel') {
      // 1. Lower Polygonal Curtain Wall & Outer Ramparts
      const rampartGroup = new THREE.Group();
      const outerWall = new THREE.Mesh(new THREE.CylinderGeometry(4.8, 5.2, 1.2, 8), materials.graniteStone.clone());
      outerWall.position.y = 0.6;
      outerWall.castShadow = true;
      outerWall.receiveShadow = true;
      rampartGroup.add(outerWall);

      // Bastions on polygon vertices
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const bastion = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.75, 1.4, 16), materials.graniteStone);
        bastion.position.set(Math.cos(angle) * 5.0, 0.7, Math.sin(angle) * 5.0);
        bastion.castShadow = true;
        rampartGroup.add(bastion);
      }
      rampartGroup.userData = { componentIndex: 3, name: 'Outer Polygonal Fort Ramparts & Bastions', baseColor: 0x8C8A84 };
      monumentGroup.add(rampartGroup);

      // 2. Fateh Darwaza Arched Acoustic Gatehouse
      const gateGroup = new THREE.Group();
      const gateBody = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.8, 2.0), materials.graniteStone.clone());
      gateBody.position.set(0, 1.5, 4.0);
      gateBody.castShadow = true;
      gateGroup.add(gateBody);

      const archPortal = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.6, 2.2, 16, 1, false, 0, Math.PI), materials.ochreSandstone);
      archPortal.rotation.z = Math.PI / 2;
      archPortal.rotation.y = Math.PI / 2;
      archPortal.position.set(0, 1.2, 4.0);
      gateGroup.add(archPortal);
      gateGroup.userData = { componentIndex: 2, name: 'Fateh Darwaza Acoustic Gatehouse', baseColor: 0x8C8A84 };
      monumentGroup.add(gateGroup);

      // 3. Middle Tier Citadel Fortifications & Arsenal
      const middleFort = new THREE.Mesh(new THREE.CylinderGeometry(3.0, 3.8, 1.6, 8), materials.graniteStone.clone());
      middleFort.position.y = 2.0;
      middleFort.castShadow = true;
      middleFort.userData = { componentIndex: 1, name: 'Middle Tier Fortress & Armory Walls', baseColor: 0x8C8A84 };
      monumentGroup.add(middleFort);

      // 4. Bala Hissar Royal Summit Pavilion (+120m Peak)
      const balaHissarGroup = new THREE.Group();
      const summitPlinth = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.4, 2.0), materials.graniteStone);
      summitPlinth.position.y = 3.0;
      balaHissarGroup.add(summitPlinth);

      const darbarHall = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.2, 1.6), materials.ochreSandstone);
      darbarHall.position.y = 3.8;
      darbarHall.castShadow = true;
      balaHissarGroup.add(darbarHall);

      const summitDome = new THREE.Mesh(new THREE.SphereGeometry(0.7, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2), materials.goldFinial);
      summitDome.position.y = 4.4;
      summitDome.castShadow = true;
      balaHissarGroup.add(summitDome);
      balaHissarGroup.userData = { componentIndex: 0, name: 'Bala Hissar Royal Summit Pavilion', baseColor: 0xE8B931 };
      monumentGroup.add(balaHissarGroup);

      activeMeshes = [balaHissarGroup, middleFort, gateGroup, rampartGroup];
    }

    // =========================================================================
    // 7. AJANTA CAVES (Maharashtra) — Horseshoe Basalt Cliff & Chaitya Sun Window
    // =========================================================================
    else if (typology === 'ajanta_caves') {
      // 1. Curved Horseshoe Basalt Cliff Amphitheatre
      const cliffMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(5.2, 5.6, 4.2, 32, 1, false, Math.PI * 0.25, Math.PI * 1.5),
        materials.deccanBasalt.clone()
      );
      cliffMesh.material.side = THREE.BackSide;
      cliffMesh.position.y = 2.1;
      cliffMesh.receiveShadow = true;
      cliffMesh.userData = { componentIndex: 3, name: 'Waghora Horseshoe Basalt Cliff Canyon', baseColor: 0x46423E };
      monumentGroup.add(cliffMesh);

      // 2. Rock-Cut Entrance Courtyard & Plinth Terrace
      const plinthMesh = new THREE.Mesh(new THREE.BoxGeometry(4.8, 0.6, 3.6), materials.deccanBasalt.clone());
      plinthMesh.position.set(0, 0.3, 0.5);
      plinthMesh.castShadow = true;
      plinthMesh.userData = { componentIndex: 2, name: 'Cave 19 Rock-Cut Courtyard Terrace', baseColor: 0x46423E };
      monumentGroup.add(plinthMesh);

      // 3. Pillared Rock-Cut Colonnade Verandah
      const verandahGroup = new THREE.Group();
      [-1.6, -0.8, 0, 0.8, 1.6].forEach(px => {
        const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.15, 2.2, 8), materials.deccanBasalt);
        pillar.position.set(px, 1.7, 1.8);
        pillar.castShadow = true;
        verandahGroup.add(pillar);
      });
      const beam = new THREE.Mesh(new THREE.BoxGeometry(4.0, 0.3, 0.5), materials.deccanBasalt);
      beam.position.set(0, 2.85, 1.8);
      verandahGroup.add(beam);
      verandahGroup.userData = { componentIndex: 1, name: 'Octagonal Rock-Hewn Colonnade Verandah', baseColor: 0x46423E };
      monumentGroup.add(verandahGroup);

      // 4. Chaitya Horseshoe Sun-Window & Interior Stupa
      const chaityaGroup = new THREE.Group();
      const sunWindow = new THREE.Mesh(new THREE.TorusGeometry(0.9, 0.25, 16, 32, Math.PI), materials.ochreSandstone);
      sunWindow.position.set(0, 3.3, 1.2);
      sunWindow.castShadow = true;
      chaityaGroup.add(sunWindow);

      const interiorStupa = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.6, 1.6, 16), materials.ochreSandstone);
      interiorStupa.position.set(0, 1.4, -0.5);
      interiorStupa.castShadow = true;
      chaityaGroup.add(interiorStupa);

      const stupaDome = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2), materials.goldFinial);
      stupaDome.position.set(0, 2.2, -0.5);
      chaityaGroup.add(stupaDome);

      chaityaGroup.userData = { componentIndex: 0, name: 'Chaitya Horseshoe Arch & Sanctum Stupa', baseColor: 0xC9A15C };
      monumentGroup.add(chaityaGroup);

      activeMeshes = [chaityaGroup, verandahGroup, plinthMesh, cliffMesh];
    }

    // =========================================================================
    // 8. ELLORA KAILASA TEMPLE (Maharashtra) — Monolithic Excavation & Victory Pillars
    // =========================================================================
    else if (typology === 'ellora_kailasa') {
      // 1. Excavated Basalt Quarry Trench Pit & High Vertical Rock Walls
      const quarryGroup = new THREE.Group();
      const leftWall = new THREE.Mesh(new THREE.BoxGeometry(0.8, 4.5, 6.0), materials.deccanBasalt);
      leftWall.position.set(-3.2, 2.25, 0);
      quarryGroup.add(leftWall);
      const rightWall = new THREE.Mesh(new THREE.BoxGeometry(0.8, 4.5, 6.0), materials.deccanBasalt);
      rightWall.position.set(3.2, 2.25, 0);
      quarryGroup.add(rightWall);
      const rearWall = new THREE.Mesh(new THREE.BoxGeometry(7.0, 4.5, 0.8), materials.deccanBasalt);
      rearWall.position.set(0, 2.25, -3.2);
      quarryGroup.add(rearWall);
      quarryGroup.userData = { componentIndex: 3, name: 'Monolithic Top-Down Basalt Excavation Pit', baseColor: 0x46423E };
      monumentGroup.add(quarryGroup);

      // 2. Elephant Sculpted High Base Plinth
      const plinthGroup = new THREE.Group();
      const baseBox = new THREE.Mesh(new THREE.BoxGeometry(3.6, 1.0, 4.4), materials.deccanBasalt.clone());
      baseBox.position.set(0, 0.5, 0);
      baseBox.castShadow = true;
      plinthGroup.add(baseBox);

      // Life-size elephant sculpt friezes along base
      [-1.85, 1.85].forEach(ex => {
        [-1.2, 0, 1.2].forEach(ez => {
          const elephant = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.7, 0.55), materials.deccanBasalt);
          elephant.position.set(ex, 0.5, ez);
          plinthGroup.add(elephant);
        });
      });
      plinthGroup.userData = { componentIndex: 2, name: 'Elephant Frieze Monolithic Base Plinth', baseColor: 0x46423E };
      monumentGroup.add(plinthGroup);

      // 3. Two Freestanding Dhwaja Stambha Victory Pillar Columns
      const pillarGroup = new THREE.Group();
      [-1.8, 1.8].forEach(px => {
        const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 3.4, 16), materials.deccanBasalt);
        pillar.position.set(px, 1.7, 2.0);
        pillar.castShadow = true;
        const cap = new THREE.Mesh(new THREE.SphereGeometry(0.28, 12, 12), materials.goldFinial);
        cap.position.set(px, 3.5, 2.0);
        pillarGroup.add(pillar, cap);
      });
      pillarGroup.userData = { componentIndex: 1, name: 'Two Monolithic Dhwaja Stambha Columns', baseColor: 0x46423E };
      monumentGroup.add(pillarGroup);

      // 4. Central Dravidian Vimana Sanctuary & Shikhara Tower
      const vimanaGroup = new THREE.Group();
      const mandapa = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.6, 2.6), materials.deccanBasalt.clone());
      mandapa.position.set(0, 1.8, -0.4);
      mandapa.castShadow = true;
      vimanaGroup.add(mandapa);

      const shikhara1 = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.8, 1.2, 8), materials.deccanBasalt);
      shikhara1.position.set(0, 3.2, -0.6);
      vimanaGroup.add(shikhara1);

      const octDome = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 1.0, 0.8, 8), materials.ochreSandstone);
      octDome.position.set(0, 4.2, -0.6);
      vimanaGroup.add(octDome);

      const stupi = new THREE.Mesh(new THREE.ConeGeometry(0.25, 0.6, 16), materials.goldFinial);
      stupi.position.set(0, 4.8, -0.6);
      vimanaGroup.add(stupi);

      vimanaGroup.userData = { componentIndex: 0, name: 'Dravidian Vimana Sanctum & Octagonal Shikhara', baseColor: 0xC9A15C };
      monumentGroup.add(vimanaGroup);

      activeMeshes = [vimanaGroup, pillarGroup, plinthGroup, quarryGroup];
    }

    // =========================================================================
    // 9. KHAJURAHO TEMPLE (Madhya Pradesh) — Nagara Curvilinear Shikhara Mountain Spire
    // =========================================================================
    else if (typology === 'khajuraho_temple') {
      // 1. High Sandstone Jagati Terrace
      const plinthMesh = new THREE.Mesh(new THREE.BoxGeometry(4.8, 0.8, 6.2), materials.ochreSandstone.clone());
      plinthMesh.position.y = 0.4;
      plinthMesh.castShadow = true;
      plinthMesh.receiveShadow = true;
      plinthMesh.userData = { componentIndex: 3, name: 'Elevated Jagati Terrace & Carved Friezes', baseColor: 0xC9A15C };
      monumentGroup.add(plinthMesh);

      // 2. Ardha-Mandapa & Mandapa Pyramidal Halls (Samvarana Roofs)
      const mandapaGroup = new THREE.Group();
      const porch = new THREE.Mesh(new THREE.ConeGeometry(1.0, 1.4, 4), materials.ochreSandstone.clone());
      porch.position.set(0, 1.5, 2.0);
      porch.rotation.y = Math.PI / 4;
      porch.castShadow = true;
      mandapaGroup.add(porch);

      const mahaMandapa = new THREE.Mesh(new THREE.ConeGeometry(1.5, 2.2, 4), materials.ochreSandstone.clone());
      mahaMandapa.position.set(0, 1.9, 0.6);
      mahaMandapa.rotation.y = Math.PI / 4;
      mahaMandapa.castShadow = true;
      mandapaGroup.add(mahaMandapa);
      mandapaGroup.userData = { componentIndex: 2, name: 'Ardha-Mandapa & Maha-Mandapa Halls', baseColor: 0xC9A15C };
      monumentGroup.add(mandapaGroup);

      // 3. Clustered Urushringas (Miniature Spires clinging to main tower)
      const urushringaGroup = new THREE.Group();
      [[-0.9, -1.0], [0.9, -1.0], [-0.9, -1.8], [0.9, -1.8]].forEach(([ux, uz]) => {
        const miniSpire = new THREE.Mesh(new THREE.ConeGeometry(0.55, 2.4, 8), materials.ochreSandstone);
        miniSpire.position.set(ux, 2.0, uz);
        miniSpire.castShadow = true;
        urushringaGroup.add(miniSpire);
      });
      urushringaGroup.userData = { componentIndex: 1, name: 'Clustered Miniature Spires (Urushringas)', baseColor: 0xC9A15C };
      monumentGroup.add(urushringaGroup);

      // 4. Main Curvilinear Garbhagriha Shikhara Tower (31m Peak)
      const shikharaGroup = new THREE.Group();
      const mainTower = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 1.8, 3.6, 12), materials.ochreSandstone.clone());
      mainTower.position.set(0, 2.6, -1.4);
      mainTower.castShadow = true;
      shikharaGroup.add(mainTower);

      const amalaka = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.9, 0.35, 24), materials.ochreSandstone);
      amalaka.position.set(0, 4.5, -1.4);
      shikharaGroup.add(amalaka);

      const kalasha = new THREE.Mesh(new THREE.ConeGeometry(0.3, 0.9, 16), materials.goldFinial);
      kalasha.position.set(0, 5.1, -1.4);
      shikharaGroup.add(kalasha);

      shikharaGroup.userData = { componentIndex: 0, name: 'Kandariya Curvilinear Shikhara & Kalasha', baseColor: 0xE8B931 };
      monumentGroup.add(shikharaGroup);

      activeMeshes = [shikharaGroup, urushringaGroup, mandapaGroup, plinthMesh];
    }

    // =========================================================================
    // 10. CHOLA BRIHADEESWARA TEMPLE (Tamil Nadu) — 13-Tier 66m Granite Vimana Tower
    // =========================================================================
    else if (typology === 'chola_temple') {
      // 1. Long Dravidian Granite Courtyard Plinth
      const plinthMesh = new THREE.Mesh(new THREE.BoxGeometry(4.6, 0.7, 6.4), materials.graniteStone.clone());
      plinthMesh.position.y = 0.35;
      plinthMesh.castShadow = true;
      plinthMesh.receiveShadow = true;
      plinthMesh.userData = { componentIndex: 3, name: 'Upapitha Granite Platform (Rajarajeswaram)', baseColor: 0x8C8A84 };
      monumentGroup.add(plinthMesh);

      // 2. Frontal Nandi Mandapam Pavilion
      const nandiGroup = new THREE.Group();
      const nandiPlinth = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.4, 1.8), materials.graniteStone);
      nandiPlinth.position.set(0, 0.9, 2.0);
      nandiGroup.add(nandiPlinth);

      const nandiBull = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.7, 1.2), materials.deccanBasalt);
      nandiBull.position.set(0, 1.45, 2.0);
      nandiBull.castShadow = true;
      nandiGroup.add(nandiBull);
      nandiGroup.userData = { componentIndex: 2, name: 'Monolithic Nandi Mandapam Shrine', baseColor: 0x8C8A84 };
      monumentGroup.add(nandiGroup);

      // 3. Soaring 13-Tiered Pyramidal Dravidian Vimana
      const vimanaGroup = new THREE.Group();
      const baseSanctum = new THREE.Mesh(new THREE.BoxGeometry(3.2, 1.4, 3.2), materials.graniteStone.clone());
      baseSanctum.position.set(0, 1.4, -0.8);
      baseSanctum.castShadow = true;
      vimanaGroup.add(baseSanctum);

      // 6 stepped pyramid tiers representing the 13 tiers
      for (let t = 0; t < 6; t++) {
        const tw = 2.8 - t * 0.38;
        const tier = new THREE.Mesh(new THREE.BoxGeometry(tw, 0.5, tw), materials.graniteStone);
        tier.position.set(0, 2.35 + t * 0.48, -0.8);
        tier.castShadow = true;
        vimanaGroup.add(tier);
      }
      vimanaGroup.userData = { componentIndex: 1, name: '13-Storey Granite Pyramidal Vimana (+66m)', baseColor: 0x8C8A84 };
      monumentGroup.add(vimanaGroup);

      // 4. Monolithic 80-Tonne Kumbam Capstone Dome & Golden Stupi
      const apexGroup = new THREE.Group();
      const kumbam = new THREE.Mesh(new THREE.SphereGeometry(0.75, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2), materials.graniteStone);
      kumbam.position.set(0, 5.2, -0.8);
      apexGroup.add(kumbam);

      const stupiFinial = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.9, 16), materials.goldFinial);
      stupiFinial.position.set(0, 6.0, -0.8);
      stupiFinial.castShadow = true;
      apexGroup.add(stupiFinial);
      apexGroup.userData = { componentIndex: 0, name: '80-Tonne Monolithic Kumbam & Golden Stupi', baseColor: 0xE8B931 };
      monumentGroup.add(apexGroup);

      activeMeshes = [apexGroup, vimanaGroup, nandiGroup, plinthMesh];
    }

    // =========================================================================
    // 11. RANI KI VAV STEPWELL (Gujarat) — 7-Tiered Subterranean Inverted Temple
    // =========================================================================
    else if (typology === 'rani_ki_vav') {
      // 1. Ground Surrounding Surface
      const groundMesh = new THREE.Mesh(new THREE.BoxGeometry(6.4, 0.4, 6.8), materials.ochreSandstone.clone());
      groundMesh.position.y = 2.8;
      groundMesh.userData = { componentIndex: 3, name: 'Ground Entrance Plinth & Pavilion', baseColor: 0xC9A15C };
      monumentGroup.add(groundMesh);

      // 2. Subterranean Stepped Terrace Well Canyon
      const terraceGroup = new THREE.Group();
      for (let s = 0; s < 5; s++) {
        const stepWidth = 4.2 - s * 0.4;
        const step = new THREE.Mesh(new THREE.BoxGeometry(stepWidth, 0.45, 1.2), materials.ochreSandstone);
        step.position.set(0, 2.4 - s * 0.55, 2.2 - s * 0.9);
        step.receiveShadow = true;
        terraceGroup.add(step);
      }
      terraceGroup.userData = { componentIndex: 2, name: '7-Storey Subterranean Stepped Terraces', baseColor: 0xC9A15C };
      monumentGroup.add(terraceGroup);

      // 3. Multi-Storeyed Carved Colonnade Pillars
      const pillarColonnade = new THREE.Group();
      [-1.4, -0.7, 0.7, 1.4].forEach(px => {
        [0.8, -0.4, -1.6].forEach(pz => {
          const col = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 1.6, 8), materials.ochreSandstone);
          col.position.set(px, 1.2, pz);
          col.castShadow = true;
          pillarColonnade.add(col);
        });
      });
      pillarColonnade.userData = { componentIndex: 1, name: 'Sculptural Colonnades & 500+ Avatar Niches', baseColor: 0xC9A15C };
      monumentGroup.add(pillarColonnade);

      // 4. Deep Cylindrical Water Well Reservoir Shaft
      const wellGroup = new THREE.Group();
      const wellShaft = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.4, 3.2, 24, 1, true), materials.ochreSandstone);
      wellShaft.position.set(0, 1.2, -2.6);
      wellGroup.add(wellShaft);

      const waterDisc = new THREE.Mesh(
        new THREE.CircleGeometry(1.35, 24),
        new THREE.MeshStandardMaterial({ color: 0x1E5E7A, roughness: 0.1, metalness: 0.85 })
      );
      waterDisc.rotation.x = -Math.PI / 2;
      waterDisc.position.set(0, 0.1, -2.6);
      wellGroup.add(waterDisc);
      wellGroup.userData = { componentIndex: 0, name: 'Deep Circular Water Well Reservoir Shaft', baseColor: 0x1E5E7A };
      monumentGroup.add(wellGroup);

      activeMeshes = [wellGroup, pillarColonnade, terraceGroup, groundMesh];
    }

    // =========================================================================
    // 12. DHOLAVIRA HARAPPAN CITADEL (Gujarat) — Bronze Age Reservoir & Ramparts
    // =========================================================================
    else {
      // 1. Massive Dressed-Stone Fortified Ramparts & Corner Bastions
      const citadelGroup = new THREE.Group();
      const ramparts = new THREE.Mesh(new THREE.BoxGeometry(5.2, 1.2, 5.2), materials.ancientBrick.clone());
      ramparts.position.y = 0.6;
      ramparts.castShadow = true;
      ramparts.receiveShadow = true;
      citadelGroup.add(ramparts);

      [[-2.4, -2.4], [2.4, -2.4], [-2.4, 2.4], [2.4, 2.4]].forEach(([bx, bz]) => {
        const bastion = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.6, 1.4), materials.ancientBrick);
        bastion.position.set(bx, 0.8, bz);
        bastion.castShadow = true;
        citadelGroup.add(bastion);
      });
      citadelGroup.userData = { componentIndex: 3, name: 'Massive Dressed-Stone Outer Ramparts & Bastions', baseColor: 0x9E5A3C };
      monumentGroup.add(citadelGroup);

      // 2. Stepped Stone-Masonry Water Reservoir Tank
      const tankGroup = new THREE.Group();
      const reservoirWall = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.8, 3.2), materials.ochreSandstone.clone());
      reservoirWall.position.set(0, 1.2, -0.6);
      tankGroup.add(reservoirWall);

      const water = new THREE.Mesh(
        new THREE.PlaneGeometry(2.1, 2.9),
        new THREE.MeshStandardMaterial({ color: 0x2A7E8C, roughness: 0.15, metalness: 0.8 })
      );
      water.rotation.x = -Math.PI / 2;
      water.position.set(0, 1.4, -0.6);
      tankGroup.add(water);
      tankGroup.userData = { componentIndex: 2, name: 'Monolithic Stepped Water Reservoir & Inlets', baseColor: 0x2A7E8C };
      monumentGroup.add(tankGroup);

      // 3. Monumental Northern Gateway & Ceremonial Steps
      const gatewayGroup = new THREE.Group();
      const leftGate = new THREE.Mesh(new THREE.BoxGeometry(0.8, 1.8, 1.0), materials.ancientBrick);
      leftGate.position.set(-1.0, 1.5, 2.2);
      const rightGate = new THREE.Mesh(new THREE.BoxGeometry(0.8, 1.8, 1.0), materials.ancientBrick);
      rightGate.position.set(1.0, 1.5, 2.2);
      const lintel = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.4, 1.0), materials.ochreSandstone);
      lintel.position.set(0, 2.5, 2.2);
      gatewayGroup.add(leftGate, rightGate, lintel);
      gatewayGroup.userData = { componentIndex: 1, name: 'Monumental Northern Ceremonial Gateway', baseColor: 0x9E5A3C };
      monumentGroup.add(gatewayGroup);

      // 4. Acropolis Castle Summit & Signboard Pillar Mounts
      const acropolisGroup = new THREE.Group();
      const acropolisMound = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.6, 1.0, 8), materials.ochreSandstone);
      acropolisMound.position.set(0, 2.1, 0);
      acropolisMound.castShadow = true;
      acropolisGroup.add(acropolisMound);

      const signPillar = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.3, 0.15), materials.makranaMarble);
      signPillar.position.set(0, 2.8, 0.6);
      acropolisGroup.add(signPillar);
      acropolisGroup.userData = { componentIndex: 0, name: 'Acropolis Royal Castle & Signboard Chamber', baseColor: 0xC9A15C };
      monumentGroup.add(acropolisGroup);

      activeMeshes = [acropolisGroup, gatewayGroup, tankGroup, citadelGroup];
    }

    // Ensure all meshes in each component group have componentIndex tagged
    activeMeshes.forEach((meshGroup, idx) => {
      meshGroup.userData = meshGroup.userData || {};
      meshGroup.userData.componentIndex = idx;
      meshGroup.traverse(child => {
        if (child.isMesh) {
          child.userData = child.userData || {};
          child.userData.componentIndex = idx;
        }
      });
    });

    activeMeshesRef.current = activeMeshes;

    // 8.5 Interactive Pointer Raycasting Setup (Click on 3D structure to select part)
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let pointerDownPos = { x: 0, y: 0 };

    const handlePointerDown = (e) => {
      pointerDownPos = { x: e.clientX, y: e.clientY };
    };

    const handlePointerUp = (e) => {
      // Differentiate between camera drag orbit and an intentional component click
      const dragDist = Math.hypot(e.clientX - pointerDownPos.x, e.clientY - pointerDownPos.y);
      if (dragDist > 6) return;

      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObjects(monumentGroup.children, true);

      if (intersects.length > 0) {
        let currentObj = intersects[0].object;
        let foundIdx = null;
        while (currentObj && currentObj !== monumentGroup && currentObj !== scene) {
          if (currentObj.userData && typeof currentObj.userData.componentIndex === 'number') {
            foundIdx = currentObj.userData.componentIndex;
            break;
          }
          currentObj = currentObj.parent;
        }

        if (foundIdx !== null && typeof onSelectComponentRef.current === 'function') {
          onSelectComponentRef.current(foundIdx);
        }
      }
    };

    const handlePointerMove = (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObjects(monumentGroup.children, true);

      if (intersects.length > 0) {
        let currentObj = intersects[0].object;
        let foundIdx = null;
        while (currentObj && currentObj !== monumentGroup && currentObj !== scene) {
          if (currentObj.userData && typeof currentObj.userData.componentIndex === 'number') {
            foundIdx = currentObj.userData.componentIndex;
            break;
          }
          currentObj = currentObj.parent;
        }
        if (foundIdx !== null) {
          renderer.domElement.style.cursor = 'pointer';
          return;
        }
      }
      renderer.domElement.style.cursor = 'grab';
    };

    renderer.domElement.addEventListener('pointerdown', handlePointerDown);
    renderer.domElement.addEventListener('pointerup', handlePointerUp);
    renderer.domElement.addEventListener('pointermove', handlePointerMove);

    // 9. Animation & Render Loop
    let clock = new THREE.Clock();
    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      controls.update();

      // Pulsating golden highlight on selected component
      const time = clock.getElapsedTime();
      activeMeshes.forEach((meshGroup, idx) => {
        const isSelected = activeComponentRef.current === idx;
        meshGroup.traverse(child => {
          if (child.isMesh && child.material) {
            if (viewMode === 'lidar') {
              child.material.wireframe = true;
              child.material.color.setHex(isSelected ? 0x00FFCC : 0x38BDF8);
            } else if (viewMode === 'heatmap') {
              child.material.wireframe = false;
              // False color thermographic stress
              const stressColor = idx === 2 ? 0xFF3333 : idx === 1 ? 0xFFA500 : 0x2288EE;
              child.material.color.setHex(stressColor);
            } else {
              child.material.wireframe = false;
              if (isSelected) {
                const pulse = (Math.sin(time * 4) + 1) * 0.5;
                child.material.emissive = new THREE.Color(0xC5A059);
                child.material.emissiveIntensity = 0.35 + pulse * 0.45;
              } else {
                child.material.emissive = new THREE.Color(0x000000);
                child.material.emissiveIntensity = 0;
              }
            }
          }
        });
      });

      renderer.render(scene, camera);
    };
    animate();

    // 10. Window Resize Listener
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 520;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (renderer?.domElement) {
        renderer.domElement.removeEventListener('pointerdown', handlePointerDown);
        renderer.domElement.removeEventListener('pointerup', handlePointerUp);
        renderer.domElement.removeEventListener('pointermove', handlePointerMove);
      }
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      renderer.dispose();
      scene.clear();
    };
  }, [siteIndex, siteData, autoRotate, viewMode]);


  // Set Camera View Presets
  const setPresetView = (preset) => {
    setCameraView(preset);
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    if (!camera || !controls) return;

    const dist = isEmbedded ? 14.5 : 12.0;
    if (preset === 'top') {
      camera.position.set(0, dist * 1.05, 0.1);
      controls.target.set(0, 2.0, 0);
    } else if (preset === 'front') {
      camera.position.set(0, 2.8, dist);
      controls.target.set(0, 2.0, 0);
    } else {
      camera.position.set(dist * 0.55, dist * 0.35, dist * 0.75);
      controls.target.set(0, 2.0, 0);
    }
  };

  const handleZoom = (direction) => {
    const camera = cameraRef.current;
    if (!camera) return;
    const factor = direction === 'in' ? 0.85 : 1.15;
    camera.position.multiplyScalar(factor);
  };

  if (isEmbedded) {
    return (
      <div className="flex flex-col h-full w-full bg-[#08090C] rounded-2xl overflow-hidden border border-[#1E2228] shadow-2xl">
        
        {/* Top Header Outside 3D Canvas (Single Row, No Overlap) */}
        <div className="bg-[#0E1013] border-b border-[#1E2228] px-4 py-2.5 flex items-center justify-between gap-3 z-10 shrink-0">
          <div className="flex items-center gap-2">
            <h3 className="text-sm sm:text-base font-serif font-bold text-[#F3EFE6] tracking-wide truncate">
              {siteData?.name || "Qutub Minar Complex"} · 3D Twin
            </h3>
          </div>

          {/* Mode Switcher Buttons */}
          <div className="flex items-center gap-1.5 font-mono text-xs shrink-0">
            <button
              onClick={() => setViewMode('stone')}
              className={`px-3 py-1 rounded-lg transition flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'stone'
                  ? 'bg-[#C5A059] text-[#090A0C] font-bold shadow'
                  : 'text-gray-400 hover:text-white bg-[#14171E] border border-[#2B313D]'
              }`}
            >
              <span>🧱</span>
              <span>Realistic 3D Stone</span>
            </button>
            <button
              onClick={() => setViewMode('lidar')}
              className={`px-3 py-1 rounded-lg transition flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'lidar'
                  ? 'bg-cyan-600 text-white font-bold shadow'
                  : 'text-gray-400 hover:text-white bg-[#14171E] border border-[#2B313D]'
              }`}
            >
              <span>🌐</span>
              <span>LiDAR Wireframe</span>
            </button>
            <button
              onClick={() => setViewMode('heatmap')}
              className={`px-3 py-1 rounded-lg transition flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'heatmap'
                  ? 'bg-rose-600 text-white font-bold shadow'
                  : 'text-gray-400 hover:text-white bg-[#14171E] border border-[#2B313D]'
              }`}
            >
              <span>🔥</span>
              <span>Heatmap</span>
            </button>
          </div>
        </div>

        {/* Pure 3D Canvas Mount (100% Unobstructed) */}
        <div className="relative flex-1 w-full min-h-[360px] bg-[#08090C] overflow-hidden">
          <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
        </div>

        {/* Bottom Control Ribbon Outside 3D Canvas */}
        <div className="bg-[#0E1013] border-t border-[#1E2228] px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 font-mono text-xs z-10">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              className={`px-3 py-1 rounded-lg border transition cursor-pointer flex items-center gap-1.5 ${
                autoRotate
                  ? 'border-[#C5A059] bg-[#C5A059]/20 text-[#C5A059] font-bold'
                  : 'border-[#1E2228] text-gray-400 hover:text-white'
              }`}
            >
              <span>{autoRotate ? '⏸ Pause 360° Orbit' : '▶ Play 360° Orbit'}</span>
            </button>

            {/* Manual Zoom In / Out Buttons */}
            <div className="flex items-center bg-[#14171E] border border-[#2B313D] rounded-lg">
              <button
                onClick={() => handleZoom('in')}
                title="Zoom In (Intentional)"
                className="px-2.5 py-1 text-gray-300 hover:text-white hover:bg-[#1E232E] rounded-l-lg transition font-bold"
              >
                +
              </button>
              <span className="text-[10px] text-gray-500 px-1">Zoom</span>
              <button
                onClick={() => handleZoom('out')}
                title="Zoom Out (Intentional)"
                className="px-2.5 py-1 text-gray-300 hover:text-white hover:bg-[#1E232E] rounded-r-lg transition font-bold"
              >
                −
              </button>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setPresetView('iso')}
              className={`px-2.5 py-1 rounded-lg transition text-xs ${
                cameraView === 'iso' ? 'bg-[#1E2228] text-[#C5A059] font-bold border border-[#C5A059]/40' : 'text-gray-400 hover:text-white'
              }`}
            >
              📐 3D Angle
            </button>
            <button
              onClick={() => setPresetView('front')}
              className={`px-2.5 py-1 rounded-lg transition text-xs ${
                cameraView === 'front' ? 'bg-[#1E2228] text-[#C5A059] font-bold border border-[#C5A059]/40' : 'text-gray-400 hover:text-white'
              }`}
            >
              🏛️ Front
            </button>
            <button
              onClick={() => setPresetView('top')}
              className={`px-2.5 py-1 rounded-lg transition text-xs ${
                cameraView === 'top' ? 'bg-[#1E2228] text-[#C5A059] font-bold border border-[#C5A059]/40' : 'text-gray-400 hover:text-white'
              }`}
            >
              🗺️ Top
            </button>
          </div>
        </div>

      </div>
    );
  }

  return (
    <div className="relative w-full h-[520px] bg-[#08090C] rounded-2xl overflow-hidden border border-[#1E2228] shadow-2xl">
      
      {/* 3D Canvas Mount */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Left Title & Telemetry Header */}
      <div className="absolute top-4 left-4 z-10 space-y-1 max-w-sm pointer-events-none">
        <div className="bg-[#0E1013]/90 backdrop-blur-md border border-[#1E2228] p-3 rounded-xl shadow-xl pointer-events-auto">
          <div className="flex items-center justify-between gap-3">
            <span className="text-[10px] font-mono text-[#C5A059] uppercase font-bold tracking-wider">
              3D Digital Twin Engine · Three.js PBR
            </span>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/50 font-bold">
              ● 60 FPS SYNC
            </span>
          </div>
          <h3 className="text-base font-serif font-bold text-[#F3EFE6] mt-0.5">
            {currentTitle}
          </h3>
          <p className="text-[11px] text-gray-400 font-sans mt-1">
            Component-mapped architectural twin. Click components below or rotate with mouse.
          </p>
        </div>
      </div>

      {/* Top Right View Mode Switcher (PBR Stone / LiDAR Cloud / Heatmap) */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <div className="bg-[#0E1013]/90 backdrop-blur-md border border-[#1E2228] p-1.5 rounded-xl shadow-xl flex items-center gap-1 font-mono text-xs">
          <button
            onClick={() => setViewMode('stone')}
            title="Switch to Realistic 3D Stone Texture view with historical material rendering"
            className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
              viewMode === 'stone'
                ? 'bg-[#C5A059] text-[#090A0C] font-bold shadow'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <span>🧱</span>
            <span>Realistic 3D Stone</span>
          </button>
          <button
            onClick={() => setViewMode('lidar')}
            title="Switch to LiDAR Wireframe Mesh view to inspect point geometry"
            className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
              viewMode === 'lidar'
                ? 'bg-cyan-600 text-white font-bold shadow'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <span>🌐</span>
            <span>LiDAR Wireframe</span>
          </button>
          <button
            onClick={() => setViewMode('heatmap')}
            title="Switch to Infrared Stress Heatmap to visualize defect vulnerability"
            className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
              viewMode === 'heatmap'
                ? 'bg-rose-600 text-white font-bold shadow'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <span>🔥</span>
            <span>Stress Heatmap</span>
          </button>
        </div>

        {/* Camera Angles */}
        <div className="bg-[#0E1013]/90 backdrop-blur-md border border-[#1E2228] p-1.5 rounded-xl shadow-xl flex items-center justify-between gap-1 font-mono text-xs">
          <button
            onClick={() => setPresetView('iso')}
            title="View monument in 3D Isometric Perspective"
            className={`px-2.5 py-1 rounded-lg transition ${
              cameraView === 'iso' ? 'bg-[#1E2228] text-[#C5A059] font-bold border border-[#C5A059]/40' : 'text-gray-400 hover:text-white'
            }`}
          >
            📐 3D Angle
          </button>
          <button
            onClick={() => setPresetView('front')}
            title="View front elevation at eye-level"
            className={`px-2.5 py-1 rounded-lg transition ${
              cameraView === 'front' ? 'bg-[#1E2228] text-[#C5A059] font-bold border border-[#C5A059]/40' : 'text-gray-400 hover:text-white'
            }`}
          >
            🏛️ Front Elevation
          </button>
          <button
            onClick={() => setPresetView('top')}
            title="View aerial top-down structural plan"
            className={`px-2.5 py-1 rounded-lg transition ${
              cameraView === 'top' ? 'bg-[#1E2228] text-[#C5A059] font-bold border border-[#C5A059]/40' : 'text-gray-400 hover:text-white'
            }`}
          >
            🗺️ Top-Down Plan
          </button>
        </div>
      </div>

      {/* Interactive Component Quick Switcher Ribbon on 3D Canvas */}
      {components && components.length > 0 && (
        <div className="absolute top-28 left-4 z-10 flex flex-wrap gap-1.5 max-w-lg pointer-events-auto">
          {components.map((comp, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (typeof onSelectComponent === 'function') onSelectComponent(idx);
              }}
              className={`px-2.5 py-1 rounded-lg border text-xs font-mono transition flex items-center gap-1.5 shadow-md cursor-pointer ${
                activeComponent === idx
                  ? 'bg-[#C5A059] text-[#07080A] font-bold border-[#DFB76C] ring-2 ring-[#C5A059]/50 scale-105'
                  : 'bg-[#0E1013]/90 hover:bg-[#181B22] text-gray-300 border-[#2B313D] hover:border-[#C5A059]'
              }`}
              title={`Click to focus and inspect ${comp.name}`}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: comp.color }} />
              <span>{comp.name}</span>
              <span className="text-[10px] opacity-80 font-bold">[{comp.code}]</span>
            </button>
          ))}
        </div>
      )}

      {/* Bottom Controls & Telemetry Bar */}
      <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-wrap justify-between items-center gap-3 bg-[#0E1013]/95 backdrop-blur-md border border-[#1E2228] px-4 py-2.5 rounded-xl shadow-xl font-mono text-xs">
        <div className="flex items-center gap-2">
          <span className="text-gray-400">360° Orbit:</span>
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            title="Toggle continuous 360-degree rotation of the 3D twin"
            className={`px-3 py-1 rounded-lg border transition cursor-pointer ${
              autoRotate
                ? 'border-[#C5A059] bg-[#C5A059]/20 text-[#C5A059] font-bold'
                : 'border-[#1E2228] text-gray-400 hover:text-white'
            }`}
          >
            {autoRotate ? '⏸ Pause 360° Rotation' : '▶ Play 360° Rotation'}
          </button>
        </div>

        {/* Selected Component Status */}
        <div className="flex items-center gap-2.5">
          <span className="text-gray-400">Selected Node:</span>
          <div className="flex items-center gap-2 bg-[#14171C] px-3 py-1 rounded-lg border border-[#2B313D]">
            <span
              className="w-2 h-2 rounded-full animate-ping"
              style={{ backgroundColor: components[activeComponent]?.color || '#C5A059' }}
            />
            <span className="text-[#F3EFE6] font-bold">
              {components[activeComponent]?.name || `Node C-0${activeComponent + 1}`}
            </span>
            <span
              className="text-[10px] px-1.5 py-0.2 rounded font-bold uppercase"
              style={{
                backgroundColor: `${components[activeComponent]?.color || '#C5A059'}25`,
                color: components[activeComponent]?.color || '#C5A059'
              }}
            >
              {components[activeComponent]?.status || 'Active'} · Health {components[activeComponent]?.score || 75}/100
            </span>
          </div>
        </div>
      </div>


    </div>
  );
}
