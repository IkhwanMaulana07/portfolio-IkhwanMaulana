'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { audioSynth } from './AudioSynth';
import { WORLD_ZONES, TECH_BRICKS, SOCIAL_BILLBOARDS, WorldZone } from './WorldData';
import { Project } from '../../types/portfolio';
import { createBugattiChiron, BugattiWheels } from './BugattiChironMesh';

interface BrunoWorldProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onZoneChange: (zone: WorldZone | null) => void;
  isMuted: boolean;
  onSpeedChange: (speedKmh: number) => void;
}

export default function BrunoWorld({
  projects,
  onSelectProject,
  onZoneChange,
  isMuted,
  onSpeedChange
}: BrunoWorldProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Stable callback refs to prevent React state re-render loop
  const onSelectProjectRef = useRef(onSelectProject);
  const onZoneChangeRef = useRef(onZoneChange);
  const onSpeedChangeRef = useRef(onSpeedChange);

  useEffect(() => {
    onSelectProjectRef.current = onSelectProject;
    onZoneChangeRef.current = onZoneChange;
    onSpeedChangeRef.current = onSpeedChange;
  });

  // References across render frames
  const carBodyRef = useRef<CANNON.Body | null>(null);
  const carMeshRef = useRef<THREE.Group | null>(null);
  const wheelsMeshesRef = useRef<THREE.Mesh[]>([]);
  const headlightsRef = useRef<THREE.SpotLight[]>([]);
  const brakeLightsRef = useRef<THREE.Mesh[]>([]);
  const autopilotTargetRef = useRef<THREE.Vector3 | null>(null);
  const targetBeaconRef = useRef<THREE.Mesh | null>(null);
  const currentLookTarget = useRef(new THREE.Vector3(0, 0.7, -0.8));
  const lastSpeedUpdateRef = useRef<number>(0);

  // Keyboard state
  const keysPressed = useRef<{ [key: string]: boolean }>({});
  const activeZoneRef = useRef<string | null>(null);

  // Create tech brick canvas texture with text
  const createBrickTexture = (text: string, bgColor: string, textColor: string) => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = 'rgba(255,255,255,0.2)';
      ctx.lineWidth = 12;
      ctx.strokeRect(6, 6, canvas.width - 12, canvas.height - 12);

      ctx.fillStyle = textColor;
      ctx.font = 'bold 54px "Outfit", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, canvas.width / 2, canvas.height / 2);
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  };

  // Reset car position
  const resetCarPosition = useCallback(() => {
    const body = carBodyRef.current;
    if (!body) return;
    body.position.set(0, 1.5, 0);
    body.velocity.set(0, 0, 0);
    body.angularVelocity.set(0, 0, 0);
    body.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), 0);
    autopilotTargetRef.current = null;
    if (targetBeaconRef.current) {
      targetBeaconRef.current.visible = false;
    }
    audioSynth.playHorn();
  }, []);

  // Horn action
  const honkHorn = useCallback(() => {
    audioSynth.playHorn();
  }, []);

  // Expose reset / autopilot functions to window for HUD controls
  useEffect(() => {
    (window as unknown as { brunoResetCar: () => void }).brunoResetCar = resetCarPosition;
    (window as unknown as { brunoHonk: () => void }).brunoHonk = honkHorn;
    (window as unknown as { brunoDriveTo: (x: number, z: number) => void }).brunoDriveTo = (x: number, z: number) => {
      autopilotTargetRef.current = new THREE.Vector3(x, 0, z);
      if (targetBeaconRef.current) {
        targetBeaconRef.current.position.set(x, 0.1, z);
        targetBeaconRef.current.visible = true;
      }
      audioSynth.init();
    };

    return () => {
      delete (window as unknown as { brunoResetCar?: () => void }).brunoResetCar;
      delete (window as unknown as { brunoHonk?: () => void }).brunoHonk;
      delete (window as unknown as { brunoDriveTo?: (x: number, z: number) => void }).brunoDriveTo;
    };
  }, [resetCarPosition, honkHorn]);

  useEffect(() => {
    audioSynth.setMuted(isMuted);
  }, [isMuted]);

  // Main Three.js + Cannon-es Initialization
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. SCENE SETUP
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#0A0B10');
    scene.fog = new THREE.FogExp2('#0A0B10', 0.012);

    // Camera: Dynamic GTA 6 Hypercar Perspective
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      300
    );
    // Initial Front Three-Quarter View (matching the Bugatti reference photo)
    camera.position.set(-3.8, 1.8, -4.5);

    // Renderer - GPU Optimized for 60+ FPS
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      stencil: false,
      depth: true
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // 2. LIGHTING (Optimized)
    const ambientLight = new THREE.AmbientLight('#B0B6C6', 1.4);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight('#FFF7E6', 2.4);
    sunLight.position.set(30, 50, 25);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.camera.near = 10;
    sunLight.shadow.camera.far = 120;
    sunLight.shadow.camera.left = -50;
    sunLight.shadow.camera.right = 50;
    sunLight.shadow.camera.top = 50;
    sunLight.shadow.camera.bottom = -50;
    sunLight.shadow.bias = -0.0006;
    scene.add(sunLight);

    // Hemisphere ground bounce light
    const hemiLight = new THREE.HemisphereLight('#8A9BA8', '#1A1C24', 0.8);
    scene.add(hemiLight);

    // 3. CANNON PHYSICS WORLD
    const world = new CANNON.World();
    world.gravity.set(0, -18, 0); // Fast snappy arcade gravity
    world.defaultContactMaterial.friction = 0.4;
    world.defaultContactMaterial.restitution = 0.2;

    const groundMaterial = new CANNON.Material('ground');
    const wheelMaterial = new CANNON.Material('wheel');
    const carMaterial = new CANNON.Material('car');
    const brickMaterial = new CANNON.Material('brick');

    const wheelGroundContact = new CANNON.ContactMaterial(wheelMaterial, groundMaterial, {
      friction: 0.85,
      restitution: 0.05
    });
    world.addContactMaterial(wheelGroundContact);

    const carBrickContact = new CANNON.ContactMaterial(carMaterial, brickMaterial, {
      friction: 0.3,
      restitution: 0.4
    });
    world.addContactMaterial(carBrickContact);

    // 4. GROUND & ROADWAYS
    const groundBody = new CANNON.Body({
      type: CANNON.Body.STATIC,
      shape: new CANNON.Plane(),
      material: groundMaterial
    });
    groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
    world.addBody(groundBody);

    // Procedural Wet Cobblestone Pavement Canvas Texture (GTA 6 European Boulevard)
    const createCobblestoneTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#0D0F15';
        ctx.fillRect(0, 0, 512, 512);

        // Cobblestone Belgian paving blocks
        const blockW = 64;
        const blockH = 32;
        const rows = 512 / blockH;
        const cols = 512 / blockW + 1;
        const stoneShades = ['#161922', '#1C202B', '#12151D', '#222633', '#191D26'];

        for (let r = 0; r < rows; r++) {
          const offsetX = (r % 2 === 0) ? 0 : blockW / 2;
          for (let c = -1; c < cols; c++) {
            const x = c * blockW + offsetX;
            const y = r * blockH;
            const shade = stoneShades[(r * 7 + c * 13) % stoneShades.length];

            ctx.fillStyle = shade;
            ctx.fillRect(x + 2, y + 2, blockW - 4, blockH - 4);

            // Subtle wet edge highlight
            ctx.fillStyle = 'rgba(255, 255, 255, 0.035)';
            ctx.fillRect(x + 3, y + 3, blockW - 6, 3);

            // Mortar joint groove
            ctx.fillStyle = '#08090D';
            ctx.strokeRect(x + 1, y + 1, blockW - 2, blockH - 2);
          }
        }

        // Wet puddle reflection sheen
        const puddleGrad = ctx.createRadialGradient(256, 256, 40, 256, 256, 240);
        puddleGrad.addColorStop(0, 'rgba(38, 52, 75, 0.28)');
        puddleGrad.addColorStop(0.7, 'rgba(15, 23, 42, 0.12)');
        puddleGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = puddleGrad;
        ctx.fillRect(0, 0, 512, 512);
      }

      const texture = new THREE.CanvasTexture(canvas);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(30, 30);
      texture.colorSpace = THREE.SRGBColorSpace;
      return texture;
    };

    // Visual Ground Plane with GTA 6 wet reflections
    const groundGeo = new THREE.PlaneGeometry(260, 260);
    const groundMat = new THREE.MeshStandardMaterial({
      map: createCobblestoneTexture(),
      roughness: 0.28,
      metalness: 0.35
    });
    const groundMesh = new THREE.Mesh(groundGeo, groundMat);
    groundMesh.rotation.x = -Math.PI / 2;
    groundMesh.receiveShadow = true;
    scene.add(groundMesh);

    // Subtle 3D Navigation Grid on Floor
    const gridHelper = new THREE.GridHelper(260, 130, '#0080FF', '#1E293B');
    gridHelper.position.y = 0.02;
    scene.add(gridHelper);

    // Vintage European Streetlamp Posts along the boulevard (Matching reference photo)
    const createStreetLamp = (x: number, z: number) => {
      const lampGroup = new THREE.Group();
      lampGroup.position.set(x, 0, z);

      // Cast iron pole base
      const ironMat = new THREE.MeshStandardMaterial({ color: '#14161D', metalness: 0.85, roughness: 0.25 });
      const base = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.5, 0.9, 12), ironMat);
      base.position.y = 0.45;
      base.castShadow = true;
      lampGroup.add(base);

      // Slender fluted pole
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.16, 6.2, 12), ironMat);
      pole.position.y = 3.8;
      pole.castShadow = true;
      lampGroup.add(pole);

      // Ornate top bracket
      const bracket = new THREE.Mesh(new THREE.TorusGeometry(0.45, 0.05, 8, 16, Math.PI), ironMat);
      bracket.rotation.z = Math.PI;
      bracket.position.y = 6.8;
      lampGroup.add(bracket);

      // Vintage Glass Lantern Housing with warm amber glow
      const lanternMat = new THREE.MeshStandardMaterial({
        color: '#FFA726',
        emissive: '#FF9800',
        emissiveIntensity: 4.8,
        roughness: 0.1
      });
      const lantern = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.25, 0.7, 6), lanternMat);
      lantern.position.y = 6.9;
      lampGroup.add(lantern);

      scene.add(lampGroup);
    };

    // Streetlamp coordinates along main avenue and plaza perimeters
    const lampCoords = [
      [-16, -60], [16, -60],
      [-16, -30], [16, -30],
      [-16, 0],   [16, 0],
      [-16, 30],  [16, 30],
      [-16, 60],  [16, 60],
      [-55, -45], [55, -45],
      [-55, 45],  [55, 45]
    ];
    lampCoords.forEach(([x, z]) => createStreetLamp(x, z));

    // 2 Soft Warm Plaza Accent Lights (Optimized for 60fps, replaces 14 point lights)
    const plazaLight1 = new THREE.PointLight('#FFA726', 6, 45, 1.5);
    plazaLight1.position.set(-16, 7.5, -15);
    scene.add(plazaLight1);

    const plazaLight2 = new THREE.PointLight('#FFA726', 6, 45, 1.5);
    plazaLight2.position.set(16, 7.5, -15);
    scene.add(plazaLight2);

    // Neoclassical Boutique Facades lining the outer boulevard (like in the photo)
    const createBuildingFacade = (x: number, z: number, rotY: number, width: number, height: number) => {
      const facadeGroup = new THREE.Group();
      facadeGroup.position.set(x, 0, z);
      facadeGroup.rotation.y = rotY;

      // Stone Wall
      const wallMat = new THREE.MeshStandardMaterial({ color: '#1E222D', roughness: 0.8, metalness: 0.15 });
      const wall = new THREE.Mesh(new THREE.BoxGeometry(width, height, 4), wallMat);
      wall.position.y = height / 2;
      wall.castShadow = false;
      wall.receiveShadow = true;
      facadeGroup.add(wall);

      // Warm illuminated boutique windows
      const windowMat = new THREE.MeshStandardMaterial({
        color: '#FFE082',
        emissive: '#FFA726',
        emissiveIntensity: 1.6,
        roughness: 0.2
      });
      const rows = Math.floor(height / 4.5);
      const cols = Math.floor(width / 4.2);
      for (let r = 1; r <= rows; r++) {
        for (let c = -cols / 2 + 0.5; c < cols / 2; c++) {
          const win = new THREE.Mesh(new THREE.BoxGeometry(2.1, 2.6, 0.2), windowMat);
          win.position.set(c * 4.0, r * 4.2, 2.05);
          facadeGroup.add(win);
        }
      }

      scene.add(facadeGroup);
    };

    // Boulevard perimeter buildings
    createBuildingFacade(0, -115, 0, 180, 22);
    createBuildingFacade(0, 115, Math.PI, 180, 22);
    createBuildingFacade(-115, 0, Math.PI / 2, 180, 22);
    createBuildingFacade(115, 0, -Math.PI / 2, 180, 22);

    // 5. BUILD THE 3D BUGATTI CHIRON (GTA 6 Hypercar Quality)
    const { carGroup, wheels: bugattiWheels, taillightMesh, setBraking } = createBugattiChiron();
    scene.add(carGroup);
    carMeshRef.current = carGroup;

    // Cannon.js Car Rigid Body with realistic hypercar stance
    const carShape = new CANNON.Box(new CANNON.Vec3(1.1, 0.55, 2.25));
    const carBody = new CANNON.Body({
      mass: 150,
      material: carMaterial,
      position: new CANNON.Vec3(0, 1.2, 0),
      linearDamping: 0.12,
      angularDamping: 0.7
    });
    carBody.addShape(carShape);
    world.addBody(carBody);
    carBodyRef.current = carBody;

    // Sound on impact
    carBody.addEventListener('collide', (e: { contact: { getImpactVelocityAlongNormal: () => number } }) => {
      const impact = Math.abs(e.contact.getImpactVelocityAlongNormal());
      if (impact > 1.8) {
        audioSynth.playImpact(Math.min(1, impact / 12));
      }
    });

    // 6. TARGET BEACON (Raycast Cursor Waypoint)
    const beaconGeo = new THREE.CylinderGeometry(0.8, 0.8, 0.1, 24);
    const beaconMat = new THREE.MeshBasicMaterial({ color: '#E5C378', wireframe: true });
    const targetBeacon = new THREE.Mesh(beaconGeo, beaconMat);
    targetBeacon.visible = false;
    scene.add(targetBeacon);
    targetBeaconRef.current = targetBeacon;

    // 7. INTERACTIVE STATIONS & BILLBOARDS (Projects + Zones)
    const zoneMeshMap: { [id: string]: THREE.Group } = {};

    WORLD_ZONES.forEach((zone) => {
      const zoneGroup = new THREE.Group();
      zoneGroup.position.set(...zone.position);

      // Glowing Ground Ring
      const ringGeo = new THREE.RingGeometry(zone.radius - 0.4, zone.radius, 40);
      const ringMat = new THREE.MeshBasicMaterial({
        color: zone.color,
        side: THREE.DoubleSide
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = -Math.PI / 2;
      ringMesh.position.y = 0.05;
      zoneGroup.add(ringMesh);

      // Station Monument / Billboard
      const postMat = new THREE.MeshStandardMaterial({ color: '#181A24', metalness: 0.8, roughness: 0.3 });
      const postZ = zone.id === 'zone-start' ? (zone.radius - 1.2) : (-zone.radius + 1.5);
      const postL = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 5, 12), postMat);
      postL.position.set(-2.8, 2.5, postZ);
      postL.castShadow = true;
      zoneGroup.add(postL);

      const postR = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 5, 12), postMat);
      postR.position.set(2.8, 2.5, postZ);
      postR.castShadow = true;
      zoneGroup.add(postR);

      // Board Header Canvas
      const boardCanvas = document.createElement('canvas');
      boardCanvas.width = 512;
      boardCanvas.height = 256;
      const bCtx = boardCanvas.getContext('2d');
      if (bCtx) {
        bCtx.fillStyle = '#0F121C';
        bCtx.fillRect(0, 0, 512, 256);
        bCtx.strokeStyle = zone.color;
        bCtx.lineWidth = 14;
        bCtx.strokeRect(7, 7, 498, 242);

        bCtx.fillStyle = zone.color;
        bCtx.font = 'bold 36px "Outfit", sans-serif';
        bCtx.textAlign = 'center';
        bCtx.fillText(zone.title, 256, 90);

        bCtx.fillStyle = '#E2E8F0';
        bCtx.font = '22px "Inter", sans-serif';
        const subtitleText = zone.subtitle.length > 36 ? zone.subtitle.slice(0, 34) + '...' : zone.subtitle;
        bCtx.fillText(subtitleText, 256, 160);
      }
      const boardTex = new THREE.CanvasTexture(boardCanvas);
      const boardMat = new THREE.MeshStandardMaterial({
        map: boardTex,
        roughness: 0.3,
        emissive: new THREE.Color(zone.color),
        emissiveIntensity: 0.25
      });
      const boardMesh = new THREE.Mesh(new THREE.BoxGeometry(6, 3, 0.3), boardMat);
      boardMesh.position.set(0, 4.5, postZ);
      boardMesh.castShadow = true;
      zoneGroup.add(boardMesh);

      scene.add(zoneGroup);
      zoneMeshMap[zone.id] = zoneGroup;
    });

    // 8. DESTRUCTIBLE 3D TECH BRICK WALL (Bruno Simon Signature Knockdown Experience)
    const physicsBricks: Array<{ mesh: THREE.Mesh; body: CANNON.Body }> = [];
    const brickSize = { w: 3.2, h: 1.4, d: 1.4 };
    const wallStartX = -38;
    const wallStartZ = -32;

    TECH_BRICKS.forEach((brick, index) => {
      const row = Math.floor(index / 3);
      const col = index % 3;
      const posX = wallStartX + (col - 1) * (brickSize.w + 0.3);
      const posY = 0.8 + row * (brickSize.h + 0.1);
      const posZ = wallStartZ;

      // Physics Rigid Body
      const brickBody = new CANNON.Body({
        mass: 5.5,
        shape: new CANNON.Box(new CANNON.Vec3(brickSize.w / 2, brickSize.h / 2, brickSize.d / 2)),
        material: brickMaterial,
        position: new CANNON.Vec3(posX, posY, posZ)
      });
      world.addBody(brickBody);

      // Three.js Mesh
      const tex = createBrickTexture(brick.name, brick.color, brick.textColor);
      const mat = new THREE.MeshStandardMaterial({
        map: tex,
        roughness: 0.4,
        metalness: 0.2
      });
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(brickSize.w, brickSize.h, brickSize.d), mat);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      scene.add(mesh);

      physicsBricks.push({ mesh, body: brickBody });
    });

    // 9. RAMPS FOR AIRBORNE CAR JUMPS (Positioned in stunt zones off the main boulevard)
    const createRamp = (x: number, z: number, rotationY: number) => {
      const rampMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(0, 3, 1.2, 4),
        new THREE.MeshStandardMaterial({ color: '#1E2330', roughness: 0.6, metalness: 0.2 })
      );
      rampMesh.position.set(x, 0.6, z);
      rampMesh.rotation.y = rotationY;
      rampMesh.castShadow = true;
      rampMesh.receiveShadow = true;
      scene.add(rampMesh);

      // Approximate Cannon static box
      const rampBody = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Box(new CANNON.Vec3(1.8, 0.6, 1.8)),
        position: new CANNON.Vec3(x, 0.6, z)
      });
      rampBody.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), rotationY);
      world.addBody(rampBody);
    };

    // Stunt ramps placed away from the main avenue
    createRamp(48, -15, Math.PI / 4);
    createRamp(-48, -15, -Math.PI / 4);

    // 10. SOCIAL MEDIA PILLARS (Clickable or drivable into)
    SOCIAL_BILLBOARDS.forEach((social) => {
      const socGroup = new THREE.Group();
      socGroup.position.set(...social.pos);

      const pillar = new THREE.Mesh(
        new THREE.CylinderGeometry(0.3, 0.3, 3, 16),
        new THREE.MeshStandardMaterial({ color: '#27272A', metalness: 0.7 })
      );
      pillar.position.y = 1.5;
      pillar.castShadow = true;
      socGroup.add(pillar);

      const signTex = createBrickTexture(social.name, social.color, '#FFFFFF');
      const signMesh = new THREE.Mesh(
        new THREE.BoxGeometry(3.6, 1.8, 0.25),
        new THREE.MeshStandardMaterial({ map: signTex, roughness: 0.3 })
      );
      signMesh.position.y = 3.6;
      signMesh.castShadow = true;
      socGroup.add(signMesh);

      scene.add(socGroup);
    });

    // 11. KEYBOARD LISTENERS (WASD & ARROWS)
    const keysState = {
      up: false,
      down: false,
      left: false,
      right: false,
      space: false
    };

    const handleKey = (e: KeyboardEvent, isPressed: boolean) => {
      const activeTag = document.activeElement?.tagName;
      if (activeTag === 'INPUT' || activeTag === 'TEXTAREA') return;

      const key = e.key.toLowerCase();
      const code = e.code;

      let matched = false;
      if (key === 'w' || key === 'arrowup' || code === 'KeyW' || code === 'ArrowUp') {
        keysState.up = isPressed;
        matched = true;
      }
      if (key === 's' || key === 'arrowdown' || code === 'KeyS' || code === 'ArrowDown') {
        keysState.down = isPressed;
        matched = true;
      }
      if (key === 'a' || key === 'arrowleft' || code === 'KeyA' || code === 'ArrowLeft') {
        keysState.left = isPressed;
        matched = true;
      }
      if (key === 'd' || key === 'arrowright' || code === 'KeyD' || code === 'ArrowRight') {
        keysState.right = isPressed;
        matched = true;
      }
      if (key === ' ' || code === 'Space') {
        keysState.space = isPressed;
        matched = true;
      }

      if (matched && isPressed) {
        e.preventDefault();
        autopilotTargetRef.current = null;
        if (targetBeaconRef.current) targetBeaconRef.current.visible = false;
        audioSynth.init();
      }

      if (isPressed && (key === 'r' || code === 'KeyR')) {
        resetCarPosition();
      }
      if (isPressed && (key === 'h' || code === 'KeyH')) {
        audioSynth.playHorn();
      }
    };

    const onKeyDown = (e: KeyboardEvent) => handleKey(e, true);
    const onKeyUp = (e: KeyboardEvent) => handleKey(e, false);

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    // 12. RAYCAST CLICK-TO-DRIVE & 360-DEGREE CAMERA ORBIT DRAG
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let isPointerDragging = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let camOrbitAngle = 0;

    const onPointerDown = (e: PointerEvent) => {
      isPointerDragging = true;
      dragStartX = e.clientX;
      dragStartY = e.clientY;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isPointerDragging) return;
      const dx = e.clientX - dragStartX;
      dragStartX = e.clientX;
      dragStartY = e.clientY;
      camOrbitAngle += dx * 0.006;
    };

    const onPointerUp = (e: PointerEvent) => {
      if (isPointerDragging) {
        const moveDist = Math.hypot(e.clientX - dragStartX, e.clientY - dragStartY);
        if (moveDist < 6) {
          // Quick click without drag: Raycast Click-to-Drive
          const rect = renderer.domElement.getBoundingClientRect();
          mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
          mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

          raycaster.setFromCamera(mouse, camera);
          const intersects = raycaster.intersectObject(groundMesh);

          if (intersects.length > 0) {
            const point = intersects[0].point;
            autopilotTargetRef.current = point;
            if (targetBeaconRef.current) {
              targetBeaconRef.current.position.set(point.x, 0.05, point.z);
              targetBeaconRef.current.visible = true;
            }
            audioSynth.init();
          }
        }
      }
      isPointerDragging = false;
    };

    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // 13. RESIZE LISTENER
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // 14. ANIMATION & PHYSICS GAME LOOP
    let animId: number;
    const fixedTimeStep = 1 / 60;

    // Arcade Bugatti Chiron Physics State (1500 HP Hypercar feel)
    const carState = {
      angle: 0, // Facing forward along -Z into the boulevard
      speed: 0,
      maxSpeed: 34,
      reverseMax: -14,
      accel: 0.65,
      decel: 0.42,
      friction: 0.97,
      turnSpeed: 0.052
    };

    // Global Virtual Controls for Touch / Mouse HUD buttons
    const virtualControls: { [key: string]: boolean } = {
      up: false,
      down: false,
      left: false,
      right: false,
      brake: false
    };

    (window as unknown as { brunoSetControl: (ctrl: string, active: boolean) => void }).brunoSetControl = (ctrl: string, active: boolean) => {
      virtualControls[ctrl] = active;
      if (active) {
        autopilotTargetRef.current = null;
        if (targetBeaconRef.current) targetBeaconRef.current.visible = false;
        audioSynth.init();
      }
    };

    const clock = new THREE.Clock();
    const lastSunPos = new CANNON.Vec3(0, 0, 0);

    const tick = () => {
      // Step Cannon Physics with smooth delta time
      const delta = Math.min(clock.getDelta(), 0.05);
      world.step(fixedTimeStep, delta, 2);

      const body = carBodyRef.current;
      const keys = keysPressed.current;

      if (body) {
        // Controls Input State
        const isGas = keysState.up || virtualControls.up;
        const isBrake = keysState.down || virtualControls.down;
        const isLeft = keysState.left || virtualControls.left;
        const isRight = keysState.right || virtualControls.right;
        const isHandbrake = keysState.space || virtualControls.brake;

        // 1. AUTOPILOT / RAYCAST CURSOR TARGET NAVIGATION
        if (autopilotTargetRef.current) {
          const target = autopilotTargetRef.current;
          const dx = target.x - body.position.x;
          const dz = target.z - body.position.z;
          const distance = Math.hypot(dx, dz);

          if (distance > 2.0) {
            // Desired angle to target (0 = -Z, Math.PI/2 = -X, -Math.PI/2 = +X)
            const desiredHeading = Math.atan2(-dx, -dz);
            let diff = desiredHeading - carState.angle;
            while (diff > Math.PI) diff -= Math.PI * 2;
            while (diff < -Math.PI) diff += Math.PI * 2;

            // Turn towards target
            carState.angle += Math.sign(diff) * Math.min(Math.abs(diff), carState.turnSpeed * 1.8);

            // Accelerate towards target
            const targetSpeed = Math.min(carState.maxSpeed * 0.85, distance * 2.8);
            if (carState.speed < targetSpeed) {
              carState.speed = Math.min(carState.speed + carState.accel, targetSpeed);
            } else {
              carState.speed = Math.max(carState.speed - carState.decel, targetSpeed);
            }
          } else {
            // Reached target destination
            carState.speed *= 0.8;
            if (Math.abs(carState.speed) < 0.2) {
              carState.speed = 0;
              autopilotTargetRef.current = null;
              if (targetBeaconRef.current) targetBeaconRef.current.visible = false;
            }
          }
        } else {
          // 2. MANUAL KEYBOARD / VIRTUAL BUTTON DRIVING
          if (isGas) {
            carState.speed = Math.min(carState.speed + carState.accel, carState.maxSpeed);
          } else if (isBrake) {
            carState.speed = Math.max(carState.speed - carState.accel, carState.reverseMax);
          } else {
            // Friction damping
            carState.speed *= carState.friction;
            if (Math.abs(carState.speed) < 0.08) carState.speed = 0;
          }

          if (isHandbrake) {
            carState.speed *= 0.90;
          }

          // Steering (Responsive even at lower speed)
          const isReversing = carState.speed < -0.1;
          const steerDirection = isReversing ? -1 : 1;
          const steerResponsiveness = Math.abs(carState.speed) > 0.1 ? 1 : 0.65;

          if (isLeft) {
            carState.angle += carState.turnSpeed * steerResponsiveness * steerDirection;
          }
          if (isRight) {
            carState.angle -= carState.turnSpeed * steerResponsiveness * steerDirection;
          }
        }

        // Apply velocities to Cannon rigid body along car's forward heading
        body.velocity.x = -Math.sin(carState.angle) * carState.speed;
        body.velocity.z = -Math.cos(carState.angle) * carState.speed;

        // Apply yaw rotation to Cannon rigid body
        body.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), carState.angle);

        // Keep car within arena boundaries
        const arenaLimit = 110;
        if (Math.abs(body.position.x) > arenaLimit) {
          body.position.x = Math.sign(body.position.x) * arenaLimit;
          carState.speed *= -0.5;
        }
        if (Math.abs(body.position.z) > arenaLimit) {
          body.position.z = Math.sign(body.position.z) * arenaLimit;
          carState.speed *= -0.5;
        }


        // Clamp excessive roll or pitch so car doesn't easily stay on its roof
        const euler = new CANNON.Vec3();
        body.quaternion.toEuler(euler, 'YZX');
        if (Math.abs(euler.x) > 1.2 || Math.abs(euler.z) > 1.2) {
          // Soft upright recovery
          body.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), euler.y);
          body.position.y += 0.5;
        }

        // Sync Three.js Car Mesh with Cannon Body
        carGroup.position.copy(body.position as unknown as THREE.Vector3);
        carGroup.quaternion.copy(body.quaternion as unknown as THREE.Quaternion);

        // Rotate Bugatti wheels and turn front steering
        const steerAngle = isLeft ? 0.38 : isRight ? -0.38 : 0;
        bugattiWheels.frontSteer.forEach((steer) => {
          steer.rotation.y = steerAngle;
        });
        bugattiWheels.allSpin.forEach((spin) => {
          spin.rotation.x += carState.speed * 0.08;
        });

        // Dynamic Taillight Braking Reaction
        setBraking(isBrake || isHandbrake);

        // 1. Zero-latency direct DOM speedometer update (eliminates React 60fps render lag)
        const speedKmh = Math.round(Math.abs(carState.speed) * 3.6);
        const speedElem = document.getElementById('bruno-speed-val');
        if (speedElem) {
          speedElem.textContent = String(speedKmh);
        }

        // Throttled React state notification (once every 250ms, not 60 times/sec)
        const now = performance.now();
        if (now - lastSpeedUpdateRef.current > 250) {
          lastSpeedUpdateRef.current = now;
          onSpeedChangeRef.current(speedKmh);
        }

        audioSynth.updateEngine(Math.abs(carState.speed) / carState.maxSpeed);

        // 2. THIRD-PERSON CHASE CAMERA FOLLOWING CAR'S HEADING (GTA 6 Style)
        // Camera stays behind the car at all times, smoothly rotating with the car's direction!
        const effectiveAngle = carState.angle + camOrbitAngle;
        
        const camDist = 8.5;
        const camHeight = 3.2;

        // Position directly behind the car along its current heading
        const targetCamX = body.position.x + Math.sin(effectiveAngle) * camDist;
        const targetCamY = body.position.y + camHeight;
        const targetCamZ = body.position.z + Math.cos(effectiveAngle) * camDist;

        camera.position.lerp(new THREE.Vector3(targetCamX, targetCamY, targetCamZ), 0.09);

        // Look at point 5.5m ahead of the car along its current heading
        const lookDist = 5.5;
        const targetLookX = body.position.x - Math.sin(carState.angle) * lookDist;
        const targetLookY = body.position.y + 0.8;
        const targetLookZ = body.position.z - Math.cos(carState.angle) * lookDist;

        currentLookTarget.current.lerp(new THREE.Vector3(targetLookX, targetLookY, targetLookZ), 0.12);
        camera.lookAt(currentLookTarget.current);

        // Decay manual orbit back behind the car when driving
        if (Math.abs(carState.speed) > 0.3 && camOrbitAngle !== 0) {
          camOrbitAngle *= 0.94;
          if (Math.abs(camOrbitAngle) < 0.005) camOrbitAngle = 0;
        }

        // Optimized shadow light update: only recalculate when car moves > 3.5m
        if (body.position.distanceTo(lastSunPos) > 3.5) {
          sunLight.position.set(body.position.x + 30, 50, body.position.z + 25);
          sunLight.target.position.set(body.position.x, 0, body.position.z);
          sunLight.target.updateMatrixWorld();
          lastSunPos.copy(body.position);
        }

        // Check Zone Proximity
        let enteredZone: WorldZone | null = null;
        WORLD_ZONES.forEach((zone) => {
          const dist = Math.hypot(body.position.x - zone.position[0], body.position.z - zone.position[2]);
          if (dist <= zone.radius) {
            enteredZone = zone;
          }
        });

        if (enteredZone !== null && (enteredZone as WorldZone).id !== activeZoneRef.current) {
          activeZoneRef.current = (enteredZone as WorldZone).id;
          onZoneChangeRef.current(enteredZone);
          audioSynth.playCheckpoint();
        } else if (enteredZone === null && activeZoneRef.current !== null) {
          activeZoneRef.current = null;
          onZoneChangeRef.current(null);
        }
      }

      // Sync Tech Bricks Mesh with Cannon Bodies
      physicsBricks.forEach(({ mesh, body }) => {
        mesh.position.copy(body.position as unknown as THREE.Vector3);
        mesh.quaternion.copy(body.quaternion as unknown as THREE.Quaternion);
      });

      // Pulse Target Beacon if active
      if (targetBeaconRef.current && targetBeaconRef.current.visible) {
        targetBeaconRef.current.rotation.y += 0.05;
      }

      renderer.render(scene, camera);
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);

    // CLEANUP
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      renderer.dispose();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full overflow-hidden cursor-grab active:cursor-grabbing select-none"
    />
  );
}
