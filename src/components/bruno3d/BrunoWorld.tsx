'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { audioSynth } from './AudioSynth';
import { WORLD_ZONES, TECH_BRICKS, SOCIAL_BILLBOARDS, WorldZone } from './WorldData';
import { Project } from '../../types/portfolio';

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

    // Camera: Isometric Top-down Perspective (Bruno Simon style)
    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      250
    );
    camera.position.set(0, 26, 22);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // 2. LIGHTING
    const ambientLight = new THREE.AmbientLight('#B0B6C6', 1.4);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight('#FFF7E6', 2.4);
    sunLight.position.set(30, 50, 25);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 5;
    sunLight.shadow.camera.far = 120;
    sunLight.shadow.camera.left = -45;
    sunLight.shadow.camera.right = 45;
    sunLight.shadow.camera.top = 45;
    sunLight.shadow.camera.bottom = -45;
    sunLight.shadow.bias = -0.0005;
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

    // Visual Ground Plane
    const groundGeo = new THREE.PlaneGeometry(240, 240);
    const groundMat = new THREE.MeshStandardMaterial({
      color: '#0E1017',
      roughness: 0.85,
      metalness: 0.1
    });
    const groundMesh = new THREE.Mesh(groundGeo, groundMat);
    groundMesh.rotation.x = -Math.PI / 2;
    groundMesh.receiveShadow = true;
    scene.add(groundMesh);

    // Subtle 3D Grid on Floor
    const gridHelper = new THREE.GridHelper(240, 120, '#E5C378', '#202432');
    gridHelper.position.y = 0.02;
    scene.add(gridHelper);

    // 5. BUILD THE 3D TOY CAR (Bruno Simon signature red sports coupe)
    const carGroup = new THREE.Group();
    scene.add(carGroup);
    carMeshRef.current = carGroup;

    // Car Body Mesh
    const chassisGeo = new THREE.BoxGeometry(2.1, 0.75, 4.2);
    const chassisMat = new THREE.MeshStandardMaterial({
      color: '#E11D48', // Vibrant Bruno Simon Crimson
      roughness: 0.25,
      metalness: 0.5
    });
    const chassisMesh = new THREE.Mesh(chassisGeo, chassisMat);
    chassisMesh.position.y = 0.7;
    chassisMesh.castShadow = true;
    chassisMesh.receiveShadow = true;
    carGroup.add(chassisMesh);

    // Cabin / Windshield
    const cabinGeo = new THREE.BoxGeometry(1.7, 0.65, 2.0);
    const cabinMat = new THREE.MeshStandardMaterial({
      color: '#0B0F19',
      roughness: 0.1,
      metalness: 0.9
    });
    const cabinMesh = new THREE.Mesh(cabinGeo, cabinMat);
    cabinMesh.position.set(0, 1.25, -0.3);
    cabinMesh.castShadow = true;
    carGroup.add(cabinMesh);

    // Rear Spoiler
    const spoilerWing = new THREE.Mesh(
      new THREE.BoxGeometry(2.0, 0.1, 0.5),
      chassisMat
    );
    spoilerWing.position.set(0, 1.35, 1.85);
    carGroup.add(spoilerWing);

    const spoilerStandL = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.35, 0.1), cabinMat);
    spoilerStandL.position.set(-0.7, 1.15, 1.85);
    carGroup.add(spoilerStandL);
    const spoilerStandR = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.35, 0.1), cabinMat);
    spoilerStandR.position.set(0.7, 1.15, 1.85);
    carGroup.add(spoilerStandR);

    // 4 Wheels
    const wheelGeo = new THREE.CylinderGeometry(0.48, 0.48, 0.38, 18);
    const wheelMat = new THREE.MeshStandardMaterial({ color: '#18181B', roughness: 0.7 });
    const rimMat = new THREE.MeshStandardMaterial({ color: '#D4D4D8', metalness: 0.8, roughness: 0.2 });

    const wheelPositions = [
      [-1.15, 0.48, -1.3], // Front Left
      [1.15, 0.48, -1.3],  // Front Right
      [-1.15, 0.48, 1.3],  // Rear Left
      [1.15, 0.48, 1.3]    // Rear Right
    ];

    const wheelMeshes: THREE.Mesh[] = [];
    wheelPositions.forEach((pos) => {
      const wheelHolder = new THREE.Mesh(wheelGeo, wheelMat);
      wheelHolder.rotation.z = Math.PI / 2;
      wheelHolder.position.set(pos[0], pos[1], pos[2]);
      wheelHolder.castShadow = true;

      // Rim cap
      const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.4, 12), rimMat);
      wheelHolder.add(rim);

      carGroup.add(wheelHolder);
      wheelMeshes.push(wheelHolder);
    });
    wheelsMeshesRef.current = wheelMeshes;

    // Headlight SpotLights & Bulbs
    const headlightL = new THREE.SpotLight('#FFFBEB', 8, 32, Math.PI / 6, 0.4, 1);
    headlightL.position.set(-0.75, 0.75, -2.1);
    headlightL.target.position.set(-0.75, 0, -12);
    carGroup.add(headlightL);
    carGroup.add(headlightL.target);

    const headlightR = new THREE.SpotLight('#FFFBEB', 8, 32, Math.PI / 6, 0.4, 1);
    headlightR.position.set(0.75, 0.75, -2.1);
    headlightR.target.position.set(0.75, 0, -12);
    carGroup.add(headlightR);
    carGroup.add(headlightR.target);
    headlightsRef.current = [headlightL, headlightR];

    // Red Taillight indicators
    const brakeMat = new THREE.MeshBasicMaterial({ color: '#FF1133' });
    const brakeL = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.15, 0.1), brakeMat);
    brakeL.position.set(-0.75, 0.8, 2.15);
    carGroup.add(brakeL);
    const brakeR = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.15, 0.1), brakeMat);
    brakeR.position.set(0.75, 0.8, 2.15);
    carGroup.add(brakeR);
    brakeLightsRef.current = [brakeL, brakeR];

    // Cannon.js Car Rigid Body
    const carShape = new CANNON.Box(new CANNON.Vec3(1.05, 0.65, 2.1));
    const carBody = new CANNON.Body({
      mass: 140,
      material: carMaterial,
      position: new CANNON.Vec3(0, 1.2, 0),
      linearDamping: 0.15,
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
      const postL = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 5, 12), postMat);
      postL.position.set(-2.8, 2.5, -zone.radius + 1.5);
      postL.castShadow = true;
      zoneGroup.add(postL);

      const postR = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 5, 12), postMat);
      postR.position.set(2.8, 2.5, -zone.radius + 1.5);
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
      boardMesh.position.set(0, 4.5, -zone.radius + 1.5);
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

    // 9. RAMPS FOR AIRBORNE CAR JUMPS
    const createRamp = (x: number, z: number, rotationY: number) => {
      const rampMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(0, 3, 1.2, 4),
        new THREE.MeshStandardMaterial({ color: '#E5C378', roughness: 0.4 })
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

    createRamp(0, -18, Math.PI / 4);
    createRamp(18, 0, Math.PI / 4);
    createRamp(-18, 0, -Math.PI / 4);

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

    // 12. RAYCAST CLICK-TO-DRIVE ON THREE.JS CANVAS (Cursor Steering)
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onCanvasPointerDown = (e: MouseEvent) => {
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
    };

    renderer.domElement.addEventListener('pointerdown', onCanvasPointerDown);

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

    // Arcade Car Physics State
    const carState = {
      angle: Math.PI, // Facing forward (-Z)
      speed: 0,
      maxSpeed: 26,
      reverseMax: -12,
      accel: 0.55,
      decel: 0.35,
      friction: 0.965,
      turnSpeed: 0.048
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

    const tick = () => {
      // Step Cannon Physics
      world.step(fixedTimeStep);

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
            // Desired angle to target
            const desiredHeading = Math.atan2(dx, dz);
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

        // Apply velocities to Cannon rigid body (maintaining Y velocity from gravity & ramps)
        body.velocity.x = Math.sin(carState.angle) * carState.speed;
        body.velocity.z = Math.cos(carState.angle) * carState.speed;

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

        // Rotate wheels
        wheelMeshes.forEach((wheel, idx) => {
          wheel.rotation.x += carState.speed * 0.08;
          // Turn front wheels visually when steering
          if (idx < 2) {
            wheel.rotation.y = isLeft ? 0.35 : isRight ? -0.35 : 0;
          }
        });

        // Speedometer update
        const speedKmh = Math.round(Math.abs(carState.speed) * 3.6);
        onSpeedChangeRef.current(speedKmh);
        audioSynth.updateEngine(Math.abs(carState.speed) / carState.maxSpeed);

        // Camera Follow (Smooth Damping Interpolation)
        const cameraOffset = new THREE.Vector3(0, 24, 22);
        const targetCamPos = body.position.vadd(cameraOffset as unknown as CANNON.Vec3);
        camera.position.lerp(targetCamPos as unknown as THREE.Vector3, 0.065);
        camera.lookAt(body.position.x, body.position.y + 1, body.position.z);

        // Sun light shadows follow car
        sunLight.position.set(body.position.x + 30, 50, body.position.z + 25);
        sunLight.target.position.set(body.position.x, 0, body.position.z);
        sunLight.target.updateMatrixWorld();

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
      renderer.domElement.removeEventListener('pointerdown', onCanvasPointerDown);
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
