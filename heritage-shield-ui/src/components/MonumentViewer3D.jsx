import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default function MonumentViewer3D({
  siteIndex = 0,
  siteData = null,
  activeComponent = 0,
  onSelectComponent,
  components = []
}) {
  const mountRef = useRef(null);
  const [viewMode, setViewMode] = useState('stone'); // 'stone' | 'lidar' | 'heatmap'
  const [autoRotate, setAutoRotate] = useState(true);

  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const meshesRef = useRef([]);

  const currentTitle = siteData?.name
    ? `${siteData.name} 3D Digital Twin`
    : `3D Digital Twin Model (Site #${siteIndex + 1})`;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x090A0C);
    scene.fog = new THREE.FogExp2(0x090A0C, 0.035);

    const width = container.clientWidth;
    const height = container.clientHeight || 460;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(6.5, 4.8, 8.5);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 4. OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 + 0.05;
    controls.minDistance = 3.5;
    controls.maxDistance = 24;
    controls.target.set(0, 1.8, 0);
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 1.0;
    controlsRef.current = controls;

    // 5. Lighting
    const ambientLight = new THREE.AmbientLight(0xfff5e6, 0.75);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffeedd, 1.8);
    keyLight.position.set(8, 14, 6);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x4e878c, 0.9);
    rimLight.position.set(-8, 6, -6);
    scene.add(rimLight);

    const pointLight = new THREE.PointLight(0xc9a15c, 0.8, 12);
    pointLight.position.set(0, 2, 4);
    scene.add(pointLight);

    // 6. Build Architectural Monument Digital Twin based on Architectural Typology
    const monumentGroup = new THREE.Group();
    scene.add(monumentGroup);

    let activeMeshes = [];

    // Determine typology from siteData or siteIndex
    const typology = siteData?.typology || (
      siteIndex === 0 ? 'fluted_minaret' :
      siteIndex === 1 ? 'dravidian_temple' :
      siteIndex === 2 ? 'fort_citadel' :
      siteIndex === 3 ? 'nagara_temple' :
      siteIndex === 4 ? 'rock_cut_cave' :
      'mughal_dome'
    );

    // =========================================================================
    // TYPOLOGY 1: FLUTED VICTORY MINARET (e.g. Qutub Minar, Ashoka Pillars)
    // =========================================================================
    if (typology === 'fluted_minaret') {
      const redSandstoneMat = new THREE.MeshStandardMaterial({ color: 0xb58852, roughness: 0.85 });
      const deterioratingMat = new THREE.MeshStandardMaterial({ color: 0x9e6347, roughness: 0.95 });
      const balconyMat = new THREE.MeshStandardMaterial({ color: 0x8a6438, roughness: 0.75 });
      const apexMat = new THREE.MeshStandardMaterial({ color: 0xc9a15c, roughness: 0.4, metalness: 0.3 });

      const baseGeo = new THREE.CylinderGeometry(1.7, 2.1, 0.8, 24);
      const baseMesh = new THREE.Mesh(baseGeo, redSandstoneMat.clone());
      baseMesh.position.y = 0.4;
      baseMesh.castShadow = true;
      baseMesh.userData = { componentIndex: 3, name: 'Base Plinth', baseColor: 0xb58852 };
      monumentGroup.add(baseMesh);

      const wallGeo = new THREE.CylinderGeometry(1.2, 1.65, 2.2, 24, 8);
      const wallMesh = new THREE.Mesh(wallGeo, deterioratingMat.clone());
      wallMesh.position.y = 1.9;
      wallMesh.castShadow = true;
      wallMesh.userData = { componentIndex: 2, name: 'Main Shaft Wall', baseColor: 0x9e6347 };
      monumentGroup.add(wallMesh);

      const balconyGeo = new THREE.CylinderGeometry(1.4, 1.1, 0.4, 24);
      const balconyMesh = new THREE.Mesh(balconyGeo, balconyMat.clone());
      balconyMesh.position.y = 3.2;
      balconyMesh.castShadow = true;
      balconyMesh.userData = { componentIndex: 1, name: 'Balcony Gallery', baseColor: 0x8a6438 };
      monumentGroup.add(balconyMesh);

      const apexGeo = new THREE.ConeGeometry(0.8, 1.6, 24);
      const apexMesh = new THREE.Mesh(apexGeo, apexMat.clone());
      apexMesh.position.y = 4.2;
      apexMesh.castShadow = true;
      apexMesh.userData = { componentIndex: 0, name: 'Finial & Apex', baseColor: 0xc9a15c };
      monumentGroup.add(apexMesh);

      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2;
        const ribGeo = new THREE.BoxGeometry(0.08, 2.1, 0.08);
        const ribMesh = new THREE.Mesh(ribGeo, deterioratingMat);
        ribMesh.position.set(Math.cos(angle) * 1.45, 1.9, Math.sin(angle) * 1.45);
        ribMesh.rotation.y = -angle;
        monumentGroup.add(ribMesh);
      }

      activeMeshes = [apexMesh, balconyMesh, wallMesh, baseMesh];
    }

    // =========================================================================
    // TYPOLOGY 2: DRAVIDIAN VIMANA & GOPURAM (Hampi, Chola, Pattadakal, Mahabalipuram, Hoysalas, Ramappa)
    // =========================================================================
    else if (typology === 'dravidian_temple') {
      const graniteMat = new THREE.MeshStandardMaterial({ color: 0x828489, roughness: 0.9 });
      const chariotBodyMat = new THREE.MeshStandardMaterial({ color: 0x9b9383, roughness: 0.85 });
      const wheelMat = new THREE.MeshStandardMaterial({ color: 0x5a554c, roughness: 0.95 });
      const dravidianRoofMat = new THREE.MeshStandardMaterial({ color: 0xbfa770, roughness: 0.6 });

      const plinthGeo = new THREE.BoxGeometry(3.6, 0.6, 4.4);
      const plinthMesh = new THREE.Mesh(plinthGeo, graniteMat.clone());
      plinthMesh.position.y = 0.3;
      plinthMesh.castShadow = true;
      plinthMesh.userData = { componentIndex: 3, name: 'Adhisthana Stepped Plinth', baseColor: 0x828489 };
      monumentGroup.add(plinthMesh);

      const wheelGroup = new THREE.Group();
      const wheelPositions = [[-1.7, 0.6, 1.4], [1.7, 0.6, 1.4], [-1.7, 0.6, -1.4], [1.7, 0.6, -1.4]];
      wheelPositions.forEach(([wx, wy, wz]) => {
        const wGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.25, 24);
        const wMesh = new THREE.Mesh(wGeo, wheelMat.clone());
        wMesh.rotation.z = Math.PI / 2;
        wMesh.position.set(wx, wy, wz);
        wMesh.castShadow = true;
        wheelGroup.add(wMesh);
      });
      wheelGroup.userData = { componentIndex: 2, name: 'Carved Columns & Wheels', baseColor: 0x5a554c };
      monumentGroup.add(wheelGroup);

      const sanctumGeo = new THREE.BoxGeometry(2.4, 1.6, 3.0);
      const sanctumMesh = new THREE.Mesh(sanctumGeo, chariotBodyMat.clone());
      sanctumMesh.position.y = 1.4;
      sanctumMesh.castShadow = true;
      sanctumMesh.userData = { componentIndex: 1, name: 'Mandapa Sanctum', baseColor: 0x9b9383 };
      monumentGroup.add(sanctumMesh);

      const vimanaGroup = new THREE.Group();
      const tier1 = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.5, 2.6), dravidianRoofMat.clone());
      tier1.position.y = 2.45;
      vimanaGroup.add(tier1);
      const tier2 = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.5, 2.0), dravidianRoofMat.clone());
      tier2.position.y = 2.95;
      vimanaGroup.add(tier2);
      const stupi = new THREE.Mesh(new THREE.ConeGeometry(0.4, 0.8, 16), dravidianRoofMat.clone());
      stupi.position.y = 3.6;
      vimanaGroup.add(stupi);
      vimanaGroup.userData = { componentIndex: 0, name: 'Vimana Shikhara Tower', baseColor: 0xbfa770 };
      monumentGroup.add(vimanaGroup);

      activeMeshes = [vimanaGroup, sanctumMesh, wheelGroup, plinthMesh];
    }

    // =========================================================================
    // TYPOLOGY 3: NAGARA SHIKHARA & SUN TEMPLE (Konark, Khajuraho, Jantar Mantar, Mahabodhi)
    // =========================================================================
    else if (typology === 'nagara_temple') {
      const khondaliteMat = new THREE.MeshStandardMaterial({ color: 0x7c6d5e, roughness: 0.95 });
      const carvedStoneMat = new THREE.MeshStandardMaterial({ color: 0x9e8c78, roughness: 0.85 });
      const amalakaMat = new THREE.MeshStandardMaterial({ color: 0xb59a68, roughness: 0.6 });

      const plinthMesh = new THREE.Mesh(new THREE.BoxGeometry(4.4, 0.8, 4.4), khondaliteMat.clone());
      plinthMesh.position.y = 0.4;
      plinthMesh.userData = { componentIndex: 3, name: 'Carved Chariot Plinth', baseColor: 0x7c6d5e };
      monumentGroup.add(plinthMesh);

      const wheelGroup = new THREE.Group();
      [[-2.1, 0.7, 1.2], [2.1, 0.7, 1.2], [-2.1, 0.7, -1.2], [2.1, 0.7, -1.2]].forEach(([wx, wy, wz]) => {
        const wMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.65, 0.2, 16), carvedStoneMat);
        wMesh.rotation.z = Math.PI / 2;
        wMesh.position.set(wx, wy, wz);
        wheelGroup.add(wMesh);
      });
      wheelGroup.userData = { componentIndex: 2, name: '12-Spoke Sun Wheels & Pillars', baseColor: 0x9e8c78 };
      monumentGroup.add(wheelGroup);

      const deulGroup = new THREE.Group();
      const jagamohana = new THREE.Mesh(new THREE.BoxGeometry(2.8, 1.8, 2.8), carvedStoneMat.clone());
      jagamohana.position.y = 1.7;
      deulGroup.add(jagamohana);
      deulGroup.userData = { componentIndex: 1, name: 'Jagamohana Assembly Hall', baseColor: 0x9e8c78 };
      monumentGroup.add(deulGroup);

      const amalakaGroup = new THREE.Group();
      const pida1 = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.6, 0.6, 16), amalakaMat.clone());
      pida1.position.y = 2.9;
      amalakaGroup.add(pida1);
      const pida2 = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 1.1, 0.6, 16), amalakaMat.clone());
      pida2.position.y = 3.5;
      amalakaGroup.add(pida2);
      const kalasa = new THREE.Mesh(new THREE.SphereGeometry(0.4, 16, 16), amalakaMat.clone());
      kalasa.position.y = 4.1;
      amalakaGroup.add(kalasa);
      amalakaGroup.userData = { componentIndex: 0, name: 'Amalaka & Shikhara Crown', baseColor: 0xb59a68 };
      monumentGroup.add(amalakaGroup);

      activeMeshes = [amalakaGroup, deulGroup, wheelGroup, plinthMesh];
    }

    // =========================================================================
    // TYPOLOGY 4: ROCK-CUT CAVE SANCTUARIES (Ajanta, Ellora, Elephanta)
    // =========================================================================
    else if (typology === 'rock_cut_cave') {
      const basaltRockMat = new THREE.MeshStandardMaterial({ color: 0x48494e, roughness: 0.98 });
      const chaityaArchMat = new THREE.MeshStandardMaterial({ color: 0x726e67, roughness: 0.85 });
      const stupaInteriorMat = new THREE.MeshStandardMaterial({ color: 0xa89f91, roughness: 0.6 });

      const cliffMesh = new THREE.Mesh(new THREE.BoxGeometry(4.8, 3.8, 2.2), basaltRockMat.clone());
      cliffMesh.position.set(0, 1.9, -0.6);
      cliffMesh.userData = { componentIndex: 3, name: 'Basalt Rock Escarpment', baseColor: 0x48494e };
      monumentGroup.add(cliffMesh);

      const porticoMesh = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.6, 1.8), basaltRockMat.clone());
      porticoMesh.position.set(0, 0.3, 0.8);
      porticoMesh.userData = { componentIndex: 2, name: 'Pillared Entrance Verandah', baseColor: 0x48494e };
      monumentGroup.add(porticoMesh);

      const archMesh = new THREE.Mesh(new THREE.TorusGeometry(1.2, 0.3, 16, 32, Math.PI), chaityaArchMat.clone());
      archMesh.position.set(0, 2.2, 0.45);
      archMesh.userData = { componentIndex: 1, name: 'Horseshoe Chaitya Sun-Window', baseColor: 0x726e67 };
      monumentGroup.add(archMesh);

      const stupaMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.9, 1.6, 16), stupaInteriorMat.clone());
      stupaMesh.position.set(0, 1.2, 0.1);
      stupaMesh.userData = { componentIndex: 0, name: 'Rock-Cut Stupa Sanctuary', baseColor: 0xa89f91 };
      monumentGroup.add(stupaMesh);

      activeMeshes = [stupaMesh, archMesh, porticoMesh, cliffMesh];
    }

    // =========================================================================
    // TYPOLOGY 5: HILL FORTS & CITADELS (Golconda, Chittorgarh, Red Fort, Agra Fort, Jaipur)
    // =========================================================================
    else if (typology === 'fort_citadel') {
      const fortStoneMat = new THREE.MeshStandardMaterial({ color: 0x6e685f, roughness: 0.95 });
      const rampartMat = new THREE.MeshStandardMaterial({ color: 0x544e47, roughness: 0.9 });
      const gateMat = new THREE.MeshStandardMaterial({ color: 0x8a7d6b, roughness: 0.85 });
      const durbarDomeMat = new THREE.MeshStandardMaterial({ color: 0xc4b48f, roughness: 0.5 });

      const escarpmentGeo = new THREE.CylinderGeometry(3.2, 4.0, 0.9, 8);
      const escarpmentMesh = new THREE.Mesh(escarpmentGeo, fortStoneMat.clone());
      escarpmentMesh.position.y = 0.45;
      escarpmentMesh.castShadow = true;
      escarpmentMesh.userData = { componentIndex: 3, name: 'Substructure Escarpment', baseColor: 0x6e685f };
      monumentGroup.add(escarpmentMesh);

      const rampartGeo = new THREE.CylinderGeometry(2.4, 3.0, 1.6, 8);
      const rampartMesh = new THREE.Mesh(rampartGeo, rampartMat.clone());
      rampartMesh.position.y = 1.7;
      rampartMesh.castShadow = true;
      rampartMesh.userData = { componentIndex: 2, name: 'Rampart Walls & Battlements', baseColor: 0x544e47 };
      monumentGroup.add(rampartMesh);

      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const merlon = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.4, 0.4), rampartMat);
        merlon.position.set(Math.cos(angle) * 2.35, 2.7, Math.sin(angle) * 2.35);
        monumentGroup.add(merlon);
      }

      const gateMesh = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.4, 1.8), gateMat.clone());
      gateMesh.position.set(0, 2.7, 0.8);
      gateMesh.castShadow = true;
      gateMesh.userData = { componentIndex: 1, name: 'Fortified Arched Gate', baseColor: 0x8a7d6b };
      monumentGroup.add(gateMesh);

      const durbarGroup = new THREE.Group();
      const domeMesh = new THREE.Mesh(new THREE.SphereGeometry(1.2, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2), durbarDomeMat.clone());
      domeMesh.position.y = 3.3;
      durbarGroup.add(domeMesh);
      const spire = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.6, 12), durbarDomeMat);
      spire.position.y = 4.7;
      durbarGroup.add(spire);
      durbarGroup.userData = { componentIndex: 0, name: 'Durbar Acoustic Hall & Dome', baseColor: 0xc4b48f };
      monumentGroup.add(durbarGroup);

      activeMeshes = [durbarGroup, gateMesh, rampartMesh, escarpmentMesh];
    }

    // =========================================================================
    // TYPOLOGY 6: STUPAS & TORANAS (Sanchi, Santiniketan)
    // =========================================================================
    else if (typology === 'stupa') {
      const stoneMat = new THREE.MeshStandardMaterial({ color: 0x968c7e, roughness: 0.9 });
      const goldMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, roughness: 0.4, metalness: 0.5 });

      const terraceMesh = new THREE.Mesh(new THREE.CylinderGeometry(3.6, 3.8, 0.6, 32), stoneMat.clone());
      terraceMesh.position.y = 0.3;
      terraceMesh.userData = { componentIndex: 3, name: 'Medhi Circular Terrace', baseColor: 0x968c7e };
      monumentGroup.add(terraceMesh);

      const toranaGroup = new THREE.Group();
      [-2.4, 2.4].forEach(tx => {
        const pillar = new THREE.Mesh(new THREE.BoxGeometry(0.3, 3.0, 0.3), stoneMat);
        pillar.position.set(tx, 1.8, 2.0);
        toranaGroup.add(pillar);
      });
      const architrave = new THREE.Mesh(new THREE.BoxGeometry(5.4, 0.3, 0.3), stoneMat);
      architrave.position.set(0, 3.2, 2.0);
      toranaGroup.add(architrave);
      toranaGroup.userData = { componentIndex: 2, name: 'Carved Torana Gateway', baseColor: 0x968c7e };
      monumentGroup.add(toranaGroup);

      const domeMesh = new THREE.Mesh(new THREE.SphereGeometry(2.2, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2), stoneMat.clone());
      domeMesh.position.y = 0.6;
      domeMesh.userData = { componentIndex: 1, name: 'Anda Hemispherical Mound', baseColor: 0x968c7e };
      monumentGroup.add(domeMesh);

      const harmikaGroup = new THREE.Group();
      const harmikaBox = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.4, 0.8), stoneMat);
      harmikaBox.position.y = 2.8;
      harmikaGroup.add(harmikaBox);
      const chhatra = new THREE.Mesh(new THREE.ConeGeometry(0.6, 0.8, 16), goldMat);
      chhatra.position.y = 3.4;
      harmikaGroup.add(chhatra);
      harmikaGroup.userData = { componentIndex: 0, name: 'Harmika & Tri-Chhatra Finial', baseColor: 0xd4af37 };
      monumentGroup.add(harmikaGroup);

      activeMeshes = [harmikaGroup, domeMesh, toranaGroup, terraceMesh];
    }

    // =========================================================================
    // TYPOLOGY 7: SUBTERRANEAN STEPWELL / BAOLI (Rani ki Vav)
    // =========================================================================
    else if (typology === 'stepwell') {
      const stepStoneMat = new THREE.MeshStandardMaterial({ color: 0x8a7a68, roughness: 0.95 });
      const waterMat = new THREE.MeshStandardMaterial({ color: 0x224855, roughness: 0.1, metalness: 0.8, transparent: true, opacity: 0.85 });

      const outerFrame = new THREE.Mesh(new THREE.BoxGeometry(4.8, 2.4, 3.2), stepStoneMat.clone());
      outerFrame.position.y = 1.2;
      outerFrame.userData = { componentIndex: 3, name: 'Pavilion Torana Terraces', baseColor: 0x8a7a68 };
      monumentGroup.add(outerFrame);

      const tiersGroup = new THREE.Group();
      for (let t = 0; t < 4; t++) {
        const step = new THREE.Mesh(new THREE.BoxGeometry(3.6 - t * 0.6, 0.4, 2.4 - t * 0.4), stepStoneMat);
        step.position.set(0, 2.0 - t * 0.5, 0);
        tiersGroup.add(step);
      }
      tiersGroup.userData = { componentIndex: 2, name: 'Multi-Storeyed Pillared Gallery', baseColor: 0x8a7a68 };
      monumentGroup.add(tiersGroup);

      const shaftMesh = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.2, 2.2, 16), stepStoneMat.clone());
      shaftMesh.position.set(-1.4, 1.1, 0);
      shaftMesh.userData = { componentIndex: 1, name: 'Deep Circular Well Shaft', baseColor: 0x8a7a68 };
      monumentGroup.add(shaftMesh);

      const poolMesh = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.2, 1.6), waterMat);
      poolMesh.position.set(0.6, 0.2, 0);
      poolMesh.userData = { componentIndex: 0, name: 'Subterranean Groundwater Ingress', baseColor: 0x224855 };
      monumentGroup.add(poolMesh);

      activeMeshes = [poolMesh, shaftMesh, tiersGroup, outerFrame];
    }

    // =========================================================================
    // TYPOLOGY 8: ARCHAEOLOGICAL EXCAVATION & CITADEL (Dholavira, Nalanda)
    // =========================================================================
    else if (typology === 'excavation_citadel') {
      const mudBrickMat = new THREE.MeshStandardMaterial({ color: 0x8a583e, roughness: 0.95 });
      const reservoirMat = new THREE.MeshStandardMaterial({ color: 0x3d5c66, roughness: 0.2 });

      const bailey = new THREE.Mesh(new THREE.BoxGeometry(4.6, 0.6, 3.8), mudBrickMat.clone());
      bailey.position.y = 0.3;
      bailey.userData = { componentIndex: 3, name: 'Middle Town Mud-Brick Bailey', baseColor: 0x8a583e };
      monumentGroup.add(bailey);

      const reservoir = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.4, 1.8), reservoirMat);
      reservoir.position.set(-1.0, 0.5, 0.8);
      reservoir.userData = { componentIndex: 2, name: 'Rock-Cut Water Reservoir', baseColor: 0x3d5c66 };
      monumentGroup.add(reservoir);

      const castle = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.4, 2.0), mudBrickMat.clone());
      castle.position.set(0.8, 1.2, -0.6);
      castle.userData = { componentIndex: 1, name: 'Fortified Acropolis Castle', baseColor: 0x8a583e };
      monumentGroup.add(castle);

      const bastion = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.8, 2.0, 12), mudBrickMat.clone());
      bastion.position.set(1.8, 1.4, -1.6);
      bastion.userData = { componentIndex: 0, name: 'North Gateway & Bastion', baseColor: 0x8a583e };
      monumentGroup.add(bastion);

      activeMeshes = [bastion, castle, reservoir, bailey];
    }

    // =========================================================================
    // TYPOLOGY 9: MUGHAL & INDO-ISLAMIC DOME (Taj Mahal, Humayun's Tomb, Fatehpur Sikri, CSMT, Goa)
    // =========================================================================
    else {
      const whiteMarbleMat = new THREE.MeshStandardMaterial({ color: 0xf5f3ee, roughness: 0.3, metalness: 0.1 });
      const iwanArchMat = new THREE.MeshStandardMaterial({ color: 0xe8e4db, roughness: 0.4 });
      const goldFinialMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, roughness: 0.3, metalness: 0.6 });
      const redSandstonePlinth = new THREE.MeshStandardMaterial({ color: 0x8a4533, roughness: 0.9 });

      const plinthGroup = new THREE.Group();
      const lowerPlinth = new THREE.Mesh(new THREE.BoxGeometry(5.8, 0.4, 5.8), redSandstonePlinth);
      lowerPlinth.position.y = 0.2;
      lowerPlinth.receiveShadow = true;
      plinthGroup.add(lowerPlinth);

      const upperMarblePlinth = new THREE.Mesh(new THREE.BoxGeometry(4.8, 0.4, 4.8), whiteMarbleMat);
      upperMarblePlinth.position.y = 0.6;
      upperMarblePlinth.castShadow = true;
      plinthGroup.add(upperMarblePlinth);
      plinthGroup.userData = { componentIndex: 3, name: 'Terraced Base Plinth', baseColor: 0x8a4533 };
      monumentGroup.add(plinthGroup);

      const minaretGroup = new THREE.Group();
      const minaretCoords = [[-2.2, -2.2], [2.2, -2.2], [-2.2, 2.2], [2.2, 2.2]];
      minaretCoords.forEach(([mx, mz]) => {
        const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.24, 3.4, 16), whiteMarbleMat);
        shaft.position.set(mx, 2.5, mz);
        shaft.castShadow = true;
        minaretGroup.add(shaft);

        const balcony1 = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.22, 0.1, 16), whiteMarbleMat);
        balcony1.position.set(mx, 1.8, mz);
        minaretGroup.add(balcony1);

        const chatri = new THREE.Mesh(new THREE.SphereGeometry(0.22, 12, 12, 0, Math.PI * 2, 0, Math.PI / 2), whiteMarbleMat);
        chatri.position.set(mx, 4.25, mz);
        minaretGroup.add(chatri);
      });
      minaretGroup.userData = { componentIndex: 2, name: '4 Freestanding Corner Minarets', baseColor: 0xf5f3ee };
      monumentGroup.add(minaretGroup);

      const tombBlock = new THREE.Group();
      const mainCube = new THREE.Mesh(new THREE.BoxGeometry(2.8, 2.2, 2.8), whiteMarbleMat.clone());
      mainCube.position.y = 1.9;
      mainCube.castShadow = true;
      tombBlock.add(mainCube);

      const iwanRecess = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.6, 0.5), iwanArchMat);
      iwanRecess.position.set(0, 1.8, 1.25);
      tombBlock.add(iwanRecess);
      tombBlock.userData = { componentIndex: 1, name: 'Mausoleum Main Iwan Portal', baseColor: 0xe8e4db };
      monumentGroup.add(tombBlock);

      const domeGroup = new THREE.Group();
      const drum = new THREE.Mesh(new THREE.CylinderGeometry(0.95, 0.95, 0.6, 24), whiteMarbleMat);
      drum.position.y = 3.3;
      domeGroup.add(drum);

      const domeMesh = new THREE.Mesh(new THREE.SphereGeometry(1.25, 32, 24, 0, Math.PI * 2, 0, Math.PI / 1.7), whiteMarbleMat.clone());
      domeMesh.position.y = 3.55;
      domeMesh.castShadow = true;
      domeGroup.add(domeMesh);

      const finial = new THREE.Mesh(new THREE.ConeGeometry(0.12, 1.2, 16), goldFinialMat);
      finial.position.y = 5.2;
      domeGroup.add(finial);
      domeGroup.userData = { componentIndex: 0, name: 'Bulbous Onion Dome & Finial', baseColor: 0xf5f3ee };
      monumentGroup.add(domeGroup);

      activeMeshes = [domeGroup, tombBlock, minaretGroup, plinthGroup];
    }

    // Ground platform & Grid
    const groundGeo = new THREE.CylinderGeometry(5.8, 6.2, 0.15, 32);
    const groundMat = new THREE.MeshStandardMaterial({ color: 0x14161a, roughness: 0.95 });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.position.y = -0.075;
    ground.receiveShadow = true;
    scene.add(ground);

    const grid = new THREE.GridHelper(16, 32, 0x4e878c, 0x1e2228);
    grid.position.y = 0.01;
    scene.add(grid);

    meshesRef.current = activeMeshes;

    // 7. Raycaster for 3D clicks
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerDown = (event) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(monumentGroup.children, true);

      if (intersects.length > 0) {
        let currentObj = intersects[0].object;
        while (currentObj && currentObj !== monumentGroup) {
          if (currentObj.userData && typeof currentObj.userData.componentIndex === 'number') {
            onSelectComponent(currentObj.userData.componentIndex);
            break;
          }
          currentObj = currentObj.parent;
        }
      }
    };

    renderer.domElement.addEventListener('pointerdown', handlePointerDown);

    // 8. Animation loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      controls.update();

      const time = Date.now() * 0.003;
      meshesRef.current.forEach((m, idx) => {
        if (!m) return;
        const isSelected = activeComponent === idx;
        const targetColor = new THREE.Color(
          viewMode === 'lidar'
            ? 0x22d3ee
            : viewMode === 'heatmap'
            ? (idx === 2 || idx === 0 ? 0xf43f5e : 0x10b981)
            : (m.userData?.baseColor || 0xb58852)
        );

        m.traverse((child) => {
          if (child.isMesh && child.material) {
            child.material.wireframe = viewMode === 'lidar';
            if (isSelected) {
              const pulse = (Math.sin(time) + 1) * 0.15;
              child.material.color.setHex(0xe05a47).lerp(targetColor, 0.4 + pulse);
            } else {
              child.material.color.copy(targetColor);
            }
          }
        });
      });

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 460;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('pointerdown', handlePointerDown);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
    };
  }, [siteIndex, siteData, viewMode, autoRotate, activeComponent]);

  const resetCamera = () => {
    if (cameraRef.current && controlsRef.current) {
      cameraRef.current.position.set(6.5, 4.8, 8.5);
      controlsRef.current.target.set(0, 1.8, 0);
      controlsRef.current.update();
    }
  };

  return (
    <div className="relative w-full h-[460px] bg-[#090A0C] border border-[#1E2228] rounded-xl overflow-hidden shadow-2xl">
      
      {/* Top Floating Badge */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
        <div className="bg-[#121418]/90 backdrop-blur border border-[#1E2228] px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-[11px] font-mono font-bold text-gray-200 uppercase tracking-wide">
            {currentTitle}
          </span>
        </div>
      </div>

      {/* View Mode Switcher Pills */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 bg-[#121418]/90 backdrop-blur p-1 rounded-lg border border-[#1E2228] shadow-lg">
        <button
          onClick={() => setViewMode('stone')}
          className={`text-xs font-mono px-3 py-1 rounded transition font-bold ${
            viewMode === 'stone'
              ? 'bg-[#C5A059] text-[#090A0C] shadow'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          🏛️ Stone Texture
        </button>
        <button
          onClick={() => setViewMode('lidar')}
          className={`text-xs font-mono px-3 py-1 rounded transition font-bold ${
            viewMode === 'lidar'
              ? 'bg-cyan-500 text-[#090A0C] shadow'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          🌐 LiDAR Wireframe
        </button>
        <button
          onClick={() => setViewMode('heatmap')}
          className={`text-xs font-mono px-3 py-1 rounded transition font-bold ${
            viewMode === 'heatmap'
              ? 'bg-rose-500 text-white shadow'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          🔥 Moisture Heatmap
        </button>
      </div>

      {/* 3D WebGL Canvas Mount */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Bottom Floating Hotspot Indicators */}
      <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-wrap justify-between items-center bg-[#121418]/90 backdrop-blur px-4 py-2.5 rounded-xl border border-[#1E2228] shadow-xl">
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400 font-mono hidden sm:inline font-semibold">Interactive Nodes:</span>
          <div className="flex gap-1.5 flex-wrap">
            {components.map((comp, idx) => (
              <button
                key={idx}
                onClick={() => onSelectComponent(idx)}
                className={`text-xs px-2.5 py-1 rounded-lg border font-mono transition flex items-center gap-1.5 ${
                  activeComponent === idx
                    ? 'border-[#C5A059] bg-[#C5A059]/20 text-[#F3EFE6] font-bold shadow-sm'
                    : 'border-[#1E2228] bg-[#0E1013] text-gray-400 hover:border-gray-600'
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: comp.color }}
                />
                {comp.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* View Controls */}
        <div className="flex items-center gap-2 mt-2 sm:mt-0">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`text-xs px-2.5 py-1 rounded-lg border font-mono transition ${
              autoRotate
                ? 'border-emerald-700 bg-emerald-950/40 text-emerald-300'
                : 'border-[#1E2228] bg-[#0E1013] text-gray-400'
            }`}
            title="Toggle 360 Turntable Auto-Rotation"
          >
            {autoRotate ? '⏸ Pause' : '▶ Spin'}
          </button>
          <button
            onClick={resetCamera}
            className="text-xs px-2.5 py-1 rounded-lg border border-[#1E2228] bg-[#0E1013] text-gray-300 hover:text-white font-mono"
            title="Reset Camera View"
          >
            🎯 Reset
          </button>
        </div>
      </div>
    </div>
  );
}
