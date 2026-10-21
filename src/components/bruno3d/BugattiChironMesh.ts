import * as THREE from 'three';

export interface BugattiWheels {
  allSpin: THREE.Group[];
  frontSteer: THREE.Group[];
  frontLeftSteer: THREE.Group;
  frontRightSteer: THREE.Group;
}

export interface BugattiChironInstance {
  carGroup: THREE.Group;
  wheels: BugattiWheels;
  headlights: THREE.SpotLight[];
  taillightMesh: THREE.Mesh;
  setBraking: (braking: boolean) => void;
}

/**
 * Creates an ultra-detailed procedural 3D Bugatti Chiron model matching
 * the reference photo: two-tone French Racing Blue & Gloss Carbon Black,
 * iconic Chrome C-Line, Horseshoe Grille with red Bugatti badge,
 * Quad Crystal LED Headlights (4 LEDs on each side), 10-Spoke Alloy Rims
 * with vibrant Bugatti Blue Calipers, Active Rear Wing, and Full-Width Red Taillight.
 */
export function createBugattiChiron(): BugattiChironInstance {
  const car = new THREE.Group();

  // ==========================================
  // 1. PBR AUTOMOTIVE HYPERCAR MATERIALS
  // ==========================================

  // French Racing Blue - Front Fenders, Hood, Bumper, and Door Panels
  const bluePaint = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#0078F2'),
    metalness: 0.35,
    roughness: 0.12,
    clearcoat: 1.0,
    clearcoatRoughness: 0.03,
    reflectivity: 0.98
  });

  // Gloss Carbon Black - Rear Haunches, Roof, Aero Splitters & Diffuser
  const carbonBlack = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#07080B'),
    metalness: 0.65,
    roughness: 0.16,
    clearcoat: 0.95,
    clearcoatRoughness: 0.05
  });

  // Polished Aluminum / Chrome for the iconic Bugatti C-Line & Grille Surround
  const chromeSilver = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#F8FAFC'),
    metalness: 0.98,
    roughness: 0.05
  });

  // Aerodynamic Tinted Cockpit Glass
  const cockpitGlass = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#090D18'),
    transmission: 0.65,
    opacity: 0.92,
    transparent: true,
    roughness: 0.03,
    metalness: 0.2,
    clearcoat: 1.0
  });

  // Matte Dark Honeycomb Mesh for Intakes
  const meshBlackMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#101217'),
    roughness: 0.9,
    metalness: 0.2
  });

  // Performance Tire Rubber
  const tireMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#121418'),
    roughness: 0.85,
    metalness: 0.05
  });

  // Gunmetal Satin Inner Rim
  const rimDarkMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#1E2129'),
    metalness: 0.9,
    roughness: 0.22
  });

  // Diamond-Cut Polished Alloy Spokes & Lip
  const rimSilverMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#E2E8F0'),
    metalness: 0.96,
    roughness: 0.08
  });

  // Carbon-Ceramic Cross-Drilled Brake Rotor
  const rotorMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#64748B'),
    metalness: 0.92,
    roughness: 0.28
  });

  // Bugatti Blue Performance Brake Caliper
  const caliperMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#0080FF'),
    emissive: new THREE.Color('#0047AB'),
    emissiveIntensity: 0.6,
    roughness: 0.2,
    metalness: 0.4
  });

  // Quad Crystal LED Headlight Projectors (Glowing 6000K Ice-White)
  const quadLedMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#FFFFFF'),
    emissive: new THREE.Color('#BAE6FD'),
    emissiveIntensity: 6.5
  });

  // Thin LED DRL Eyebrow
  const drlMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#FFFFFF'),
    emissive: new THREE.Color('#E0F2FE'),
    emissiveIntensity: 4.5
  });

  // Continuous Full-Width Red LED Taillight Blade
  const taillightMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#FF0033'),
    emissive: new THREE.Color('#FF0033'),
    emissiveIntensity: 3.2
  });

  // Quad Titanium Exhaust Tips
  const exhaustMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#3B4252'),
    metalness: 0.95,
    roughness: 0.18
  });

  // ==========================================
  // 2. FRONT FASCIA & NOSE (French Racing Blue)
  // ==========================================

  // Front Nose Core
  const noseCoreGeo = new THREE.BoxGeometry(2.1, 0.46, 1.8);
  const noseCore = new THREE.Mesh(noseCoreGeo, bluePaint);
  noseCore.position.set(0, 0.54, -1.35);
  noseCore.castShadow = true;
  noseCore.receiveShadow = true;
  car.add(noseCore);

  // Slanted Hood Wedge with Center Bugatti Crease
  const hoodGeo = new THREE.BoxGeometry(1.86, 0.26, 1.55);
  const hood = new THREE.Mesh(hoodGeo, bluePaint);
  hood.position.set(0, 0.74, -1.1);
  hood.rotation.x = 0.13;
  hood.castShadow = true;
  car.add(hood);

  // Hood central spine ridge (Bugatti Atlantic tribute)
  const hoodSpineGeo = new THREE.BoxGeometry(0.04, 0.05, 1.55);
  const hoodSpine = new THREE.Mesh(hoodSpineGeo, bluePaint);
  hoodSpine.position.set(0, 0.88, -1.1);
  hoodSpine.rotation.x = 0.13;
  car.add(hoodSpine);

  // Front Arched Fenders (Muscular curves flanking the hood)
  const createFrontFender = (isRight: boolean) => {
    const sign = isRight ? 1 : -1;
    const fenderGeo = new THREE.BoxGeometry(0.32, 0.42, 1.75);
    const fender = new THREE.Mesh(fenderGeo, bluePaint);
    fender.position.set(sign * 1.02, 0.68, -1.32);
    fender.rotation.z = sign * -0.08;
    fender.castShadow = true;
    return fender;
  };
  car.add(createFrontFender(false));
  car.add(createFrontFender(true));

  // Iconic Bugatti Horseshoe Center Grille
  const grilleSurroundGeo = new THREE.TorusGeometry(0.44, 0.052, 16, 32, Math.PI);
  const grilleSurround = new THREE.Mesh(grilleSurroundGeo, chromeSilver);
  grilleSurround.rotation.z = Math.PI;
  grilleSurround.position.set(0, 0.58, -2.35);
  car.add(grilleSurround);

  const grilleBackGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.08, 24);
  const grilleBack = new THREE.Mesh(grilleBackGeo, meshBlackMat);
  grilleBack.rotation.x = Math.PI / 2;
  grilleBack.position.set(0, 0.55, -2.33);
  car.add(grilleBack);

  // Red Oval Bugatti Emblem on Grille
  const emblemGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.03, 20);
  const emblemMat = new THREE.MeshStandardMaterial({
    color: '#E11D48',
    metalness: 0.3,
    roughness: 0.1,
    emissive: '#BE123C',
    emissiveIntensity: 1.4
  });
  const emblem = new THREE.Mesh(emblemGeo, emblemMat);
  emblem.rotation.x = Math.PI / 2;
  emblem.position.set(0, 0.72, -2.37);
  car.add(emblem);

  // Front Lateral Air Intakes with Horizontal Aerodynamic Splitter Blades
  const createFrontIntake = (isRight: boolean) => {
    const intakeGroup = new THREE.Group();
    const sign = isRight ? 1 : -1;

    const pocketGeo = new THREE.BoxGeometry(0.58, 0.3, 0.25);
    const pocket = new THREE.Mesh(pocketGeo, meshBlackMat);
    intakeGroup.add(pocket);

    const vaneGeo = new THREE.BoxGeometry(0.6, 0.03, 0.28);
    const vane = new THREE.Mesh(vaneGeo, carbonBlack);
    vane.position.set(0, 0, 0.04);
    intakeGroup.add(vane);

    intakeGroup.position.set(sign * 0.74, 0.44, -2.25);
    intakeGroup.rotation.y = sign * -0.15;
    return intakeGroup;
  };
  car.add(createFrontIntake(false));
  car.add(createFrontIntake(true));

  // Front Carbon Fiber Chin Splitter
  const splitterGeo = new THREE.BoxGeometry(2.26, 0.07, 0.65);
  const splitter = new THREE.Mesh(splitterGeo, carbonBlack);
  splitter.position.set(0, 0.26, -2.15);
  splitter.castShadow = true;
  car.add(splitter);

  // ==========================================
  // 3. QUAD CRYSTAL LED HEADLIGHTS (Exact Photo Match)
  // ==========================================
  const createHeadlightUnit = (isRight: boolean) => {
    const unit = new THREE.Group();
    const sign = isRight ? 1 : -1;

    // Slanted aerodynamic housing
    const houseGeo = new THREE.BoxGeometry(0.64, 0.18, 0.2);
    const house = new THREE.Mesh(houseGeo, carbonBlack);
    unit.add(house);

    // 4 Crystal LED projector cubes in a precise horizontal row (forward facing!)
    for (let i = 0; i < 4; i++) {
      const ledGeo = new THREE.BoxGeometry(0.1, 0.1, 0.1);
      const led = new THREE.Mesh(ledGeo, quadLedMat);
      led.position.set(-0.22 + i * 0.145, -0.01, 0.11);
      unit.add(led);
    }

    // Upper DRL light strip eyebrow
    const drlGeo = new THREE.BoxGeometry(0.58, 0.03, 0.05);
    const drl = new THREE.Mesh(drlGeo, drlMat);
    drl.position.set(0, 0.07, 0.12);
    unit.add(drl);

    unit.position.set(sign * 0.78, 0.68, -2.28);
    unit.rotation.y = sign * -0.22;
    unit.rotation.z = sign * -0.04;
    return unit;
  };

  car.add(createHeadlightUnit(false));
  car.add(createHeadlightUnit(true));

  // ==========================================
  // 4. COCKPIT & GREENHOUSE
  // ==========================================

  // Cabin Main Base (Blue door section)
  const cabinBaseGeo = new THREE.BoxGeometry(2.14, 0.56, 1.7);
  const cabinBase = new THREE.Mesh(cabinBaseGeo, bluePaint);
  cabinBase.position.set(0, 0.66, 0.05);
  cabinBase.castShadow = true;
  car.add(cabinBase);

  // Aerodynamic Tinted Cockpit Glass (Windshield, Side & Rear Windows)
  const roofGlassGeo = new THREE.BoxGeometry(1.72, 0.56, 1.88);
  const roofGlass = new THREE.Mesh(roofGlassGeo, cockpitGlass);
  roofGlass.position.set(0, 1.08, -0.12);
  roofGlass.castShadow = true;
  car.add(roofGlass);

  // Gloss Carbon Roof Cap
  const roofTopGeo = new THREE.BoxGeometry(1.62, 0.06, 1.6);
  const roofTop = new THREE.Mesh(roofTopGeo, carbonBlack);
  roofTop.position.set(0, 1.37, 0.02);
  car.add(roofTop);

  // Central Carbon Dorsal Fin Spine (Bugatti Atlantic Lineage)
  const dorsalFinGeo = new THREE.BoxGeometry(0.06, 0.09, 2.3);
  const dorsalFin = new THREE.Mesh(dorsalFinGeo, carbonBlack);
  dorsalFin.position.set(0, 1.4, 0.2);
  car.add(dorsalFin);

  // Carbon Aerodynamic Side Mirrors
  const createMirror = (isRight: boolean) => {
    const mirrorGroup = new THREE.Group();
    const sign = isRight ? 1 : -1;

    const stalkGeo = new THREE.CylinderGeometry(0.022, 0.022, 0.24, 8);
    const stalk = new THREE.Mesh(stalkGeo, carbonBlack);
    stalk.rotation.z = sign * -0.58;
    mirrorGroup.add(stalk);

    const capGeo = new THREE.BoxGeometry(0.26, 0.13, 0.15);
    const cap = new THREE.Mesh(capGeo, carbonBlack);
    cap.position.set(sign * 0.14, 0.1, 0);
    cap.castShadow = true;
    mirrorGroup.add(cap);

    mirrorGroup.position.set(sign * 1.0, 1.04, -0.65);
    return mirrorGroup;
  };
  car.add(createMirror(false));
  car.add(createMirror(true));

  // ==========================================
  // 5. THE SIGNATURE CHIRON "C-LINE" & SIDE SCOOPS
  // ==========================================
  const createCLine = (isRight: boolean) => {
    const cGroup = new THREE.Group();
    const sign = isRight ? 1 : -1;

    // Sweeping 3D curve tracing the iconic Bugatti C-line
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(sign * 1.02, 0.94, -0.95),  // Front A-pillar root
      new THREE.Vector3(sign * 1.04, 1.34, -0.35),  // Up along windshield pillar
      new THREE.Vector3(sign * 1.05, 1.36, 0.35),   // Over roof edge
      new THREE.Vector3(sign * 1.14, 1.06, 1.15),   // Down C-pillar around rear
      new THREE.Vector3(sign * 1.14, 0.46, 0.78),   // Bottom scoop turn
      new THREE.Vector3(sign * 1.10, 0.36, -0.2),   // Forward along rocker sill
      new THREE.Vector3(sign * 1.05, 0.48, -0.75)   // Upward return
    ], false);

    const tubeGeo = new THREE.TubeGeometry(curve, 38, 0.055, 12, false);
    const tubeMesh = new THREE.Mesh(tubeGeo, chromeSilver);
    cGroup.add(tubeMesh);

    // Recessed dark side air scoop mesh inside the C-loop
    const scoopGeo = new THREE.BoxGeometry(0.14, 0.52, 0.85);
    const scoop = new THREE.Mesh(scoopGeo, meshBlackMat);
    scoop.position.set(sign * 1.06, 0.72, 0.45);
    cGroup.add(scoop);

    return cGroup;
  };
  car.add(createCLine(false));
  car.add(createCLine(true));

  // ==========================================
  // 6. REAR SECTION, ENGINE DECK & WING
  // ==========================================

  // Muscular Rear Haunches (Gloss Carbon Black, flared wider than front)
  const rearBodyGeo = new THREE.BoxGeometry(2.28, 0.68, 1.68);
  const rearBody = new THREE.Mesh(rearBodyGeo, carbonBlack);
  rearBody.position.set(0, 0.7, 1.48);
  rearBody.castShadow = true;
  rearBody.receiveShadow = true;
  car.add(rearBody);

  // Twin Carbon Air Induction Scoops on Rear Deck
  const scoopL = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.16, 0.9), carbonBlack);
  scoopL.position.set(-0.52, 1.22, 0.95);
  car.add(scoopL);

  const scoopR = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.16, 0.9), carbonBlack);
  scoopR.position.set(0.52, 1.22, 0.95);
  car.add(scoopR);

  // Exposed Engine Deck / W16 Manifolds
  const engineDeckGeo = new THREE.BoxGeometry(0.68, 0.12, 0.8);
  const engineDeck = new THREE.Mesh(engineDeckGeo, meshBlackMat);
  engineDeck.position.set(0, 1.15, 1.1);
  car.add(engineDeck);

  // Active Aerodynamic Rear Wing Spoiler
  const wingGeo = new THREE.BoxGeometry(2.18, 0.08, 0.46);
  const wing = new THREE.Mesh(wingGeo, carbonBlack);
  wing.position.set(0, 1.32, 2.15);
  wing.rotation.x = -0.06;
  wing.castShadow = true;
  car.add(wing);

  // Dual Aerodynamic Wing Stanchions
  const stanchionL = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.38, 0.16), carbonBlack);
  stanchionL.position.set(-0.68, 1.12, 2.05);
  car.add(stanchionL);

  const stanchionR = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.38, 0.16), carbonBlack);
  stanchionR.position.set(0.68, 1.12, 2.05);
  car.add(stanchionR);

  // Full-Width Continuous Red LED Blade Taillight (Single 2.05m Lightbar)
  const taillightGeo = new THREE.BoxGeometry(2.05, 0.055, 0.08);
  const taillightMesh = new THREE.Mesh(taillightGeo, taillightMat);
  taillightMesh.position.set(0, 0.74, 2.33);
  car.add(taillightMesh);

  // Quad Central Exhaust Outlets
  const exhaustGeo = new THREE.CylinderGeometry(0.085, 0.085, 0.18, 16);
  for (let i = 0; i < 4; i++) {
    const pipe = new THREE.Mesh(exhaustGeo, exhaustMat);
    pipe.rotation.x = Math.PI / 2;
    pipe.position.set(-0.255 + i * 0.17, 0.4, 2.32);
    car.add(pipe);
  }

  // Rear Downforce Diffuser with Vertical Aero Fins
  const diffuserGeo = new THREE.BoxGeometry(2.2, 0.12, 0.55);
  const diffuser = new THREE.Mesh(diffuserGeo, carbonBlack);
  diffuser.position.set(0, 0.25, 2.2);
  car.add(diffuser);

  for (let i = 0; i < 4; i++) {
    const fin = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.18, 0.5), carbonBlack);
    fin.position.set(-0.6 + i * 0.4, 0.22, 2.2);
    car.add(fin);
  }

  // ==========================================
  // 7. 10-SPOKE ALLOY WHEELS & BUGATTI BLUE CALIPERS
  // ==========================================
  const wheelRadius = 0.46;
  const wheelWidth = 0.38;

  const createWheel = (isRight: boolean) => {
    const sign = isRight ? 1 : -1;

    // Steer Group: Handles steering rotation around Y axis
    const steerGroup = new THREE.Group();

    // Spin Group: Handles rolling rotation around X axis
    const spinGroup = new THREE.Group();
    steerGroup.add(spinGroup);

    // Treaded Rubber Tire
    const tireGeo = new THREE.CylinderGeometry(wheelRadius, wheelRadius, wheelWidth, 26);
    const tire = new THREE.Mesh(tireGeo, tireMat);
    tire.rotation.z = Math.PI / 2;
    tire.castShadow = true;
    spinGroup.add(tire);

    // Diamond-Cut Outer Rim Lip (on outer face!)
    const rimLipGeo = new THREE.TorusGeometry(wheelRadius * 0.82, 0.026, 14, 28);
    const rimLip = new THREE.Mesh(rimLipGeo, rimSilverMat);
    rimLip.position.x = sign * (wheelWidth / 2);
    rimLip.rotation.y = Math.PI / 2;
    spinGroup.add(rimLip);

    // Gunmetal Multi-Spoke Inner Disc
    const rimFaceGeo = new THREE.CylinderGeometry(wheelRadius * 0.78, wheelRadius * 0.78, 0.05, 20);
    const rimFace = new THREE.Mesh(rimFaceGeo, rimDarkMat);
    rimFace.position.x = sign * (wheelWidth / 2 - 0.02);
    rimFace.rotation.z = Math.PI / 2;
    spinGroup.add(rimFace);

    // 10 Diamond-Cut Radial Wheel Spokes (prominently facing outwards!)
    for (let s = 0; s < 10; s++) {
      const spokeAngle = (s / 10) * Math.PI * 2;
      const spokeGeo = new THREE.BoxGeometry(0.035, wheelRadius * 0.72, 0.05);
      const spoke = new THREE.Mesh(spokeGeo, rimSilverMat);
      spoke.position.set(
        sign * (wheelWidth / 2 + 0.012),
        Math.cos(spokeAngle) * wheelRadius * 0.38,
        Math.sin(spokeAngle) * wheelRadius * 0.38
      );
      spoke.rotation.x = -spokeAngle;
      spinGroup.add(spoke);
    }

    // Bugatti Center Cap Emblem
    const capGeo = new THREE.CylinderGeometry(0.11, 0.11, 0.04, 18);
    const cap = new THREE.Mesh(capGeo, chromeSilver);
    cap.position.x = sign * (wheelWidth / 2 + 0.02);
    cap.rotation.z = Math.PI / 2;
    spinGroup.add(cap);

    // Cross-Drilled Brake Rotor Disc
    const rotorGeo = new THREE.CylinderGeometry(wheelRadius * 0.7, wheelRadius * 0.7, 0.04, 20);
    const rotor = new THREE.Mesh(rotorGeo, rotorMat);
    rotor.position.x = sign * (wheelWidth / 2 - 0.06);
    rotor.rotation.z = Math.PI / 2;
    spinGroup.add(rotor);

    // Bugatti Blue Performance Brake Caliper (Stationary inside rim, prominently visible!)
    const caliperGeo = new THREE.BoxGeometry(0.14, 0.26, 0.16);
    const caliper = new THREE.Mesh(caliperGeo, caliperMat);
    caliper.position.set(sign * (wheelWidth / 2 - 0.03), 0.22, 0.05);
    steerGroup.add(caliper);

    return { steerGroup, spinGroup };
  };

  const frontLeft = createWheel(false);
  frontLeft.steerGroup.position.set(-1.14, wheelRadius, -1.35);
  car.add(frontLeft.steerGroup);

  const frontRight = createWheel(true);
  frontRight.steerGroup.position.set(1.14, wheelRadius, -1.35);
  car.add(frontRight.steerGroup);

  const rearLeft = createWheel(false);
  rearLeft.steerGroup.position.set(-1.18, wheelRadius, 1.42);
  car.add(rearLeft.steerGroup);

  const rearRight = createWheel(true);
  rearRight.steerGroup.position.set(1.18, wheelRadius, 1.42);
  car.add(rearRight.steerGroup);

  const wheels: BugattiWheels = {
    allSpin: [
      frontLeft.spinGroup,
      frontRight.spinGroup,
      rearLeft.spinGroup,
      rearRight.spinGroup
    ],
    frontSteer: [frontLeft.steerGroup, frontRight.steerGroup],
    frontLeftSteer: frontLeft.steerGroup,
    frontRightSteer: frontRight.steerGroup
  };

  // ==========================================
  // 8. REAL GTA 6 HEADLIGHT SPOTLIGHTS
  // ==========================================
  const leftSpot = new THREE.SpotLight('#F0F9FF', 18, 55, Math.PI / 5.2, 0.42, 1.2);
  leftSpot.position.set(-0.78, 0.7, -2.3);
  leftSpot.target.position.set(-0.78, 0, -25);
  car.add(leftSpot);
  car.add(leftSpot.target);

  const rightSpot = new THREE.SpotLight('#F0F9FF', 18, 55, Math.PI / 5.2, 0.42, 1.2);
  rightSpot.position.set(0.78, 0.7, -2.3);
  rightSpot.target.position.set(0.78, 0, -25);
  car.add(rightSpot);
  car.add(rightSpot.target);

  // Soft Contact Ambient Occlusion Shadow Disc under car
  const shadowCanvas = document.createElement('canvas');
  shadowCanvas.width = 128;
  shadowCanvas.height = 128;
  const shadowCtx = shadowCanvas.getContext('2d');
  if (shadowCtx) {
    const grad = shadowCtx.createRadialGradient(64, 64, 10, 64, 64, 60);
    grad.addColorStop(0, 'rgba(0, 0, 0, 0.85)');
    grad.addColorStop(0.6, 'rgba(0, 0, 0, 0.45)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    shadowCtx.fillStyle = grad;
    shadowCtx.fillRect(0, 0, 128, 128);
  }
  const shadowTex = new THREE.CanvasTexture(shadowCanvas);
  const shadowPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(3.0, 5.2),
    new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false })
  );
  shadowPlane.rotation.x = -Math.PI / 2;
  shadowPlane.position.y = 0.04;
  car.add(shadowPlane);

  return {
    carGroup: car,
    wheels,
    headlights: [leftSpot, rightSpot],
    taillightMesh,
    setBraking: (braking: boolean) => {
      (taillightMat as THREE.MeshStandardMaterial).emissiveIntensity = braking ? 6.5 : 3.2;
    }
  };
}
