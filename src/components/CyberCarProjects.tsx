'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { 
  ArrowUpRight, 
  Github, 
  ExternalLink, 
  Compass, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  Navigation,
  ChevronRight,
  Radio,
  Sparkles,
  Zap
} from 'lucide-react';
import { Project } from '../types/portfolio';

interface CyberCarProjectsProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

interface Station {
  id: string;
  projectId: string;
  number: string;
  name: string;
  x: number;
  y: number;
  radius: number;
  color: string;
  accentColor: string;
}

// 4 Strategic Checkpoints on the Cyber Circuit
const STATIONS: Station[] = [
  {
    id: 'station-0',
    projectId: 'veyora-technologies',
    number: '01',
    name: 'Veyora Technologies',
    x: 230,
    y: 170,
    radius: 90,
    color: '#E5C378',
    accentColor: 'rgba(229, 195, 120, 0.4)'
  },
  {
    id: 'station-1',
    projectId: 'bsf-larvae-detection',
    number: '02',
    name: 'BSF Larvae Computer Vision Lab',
    x: 770,
    y: 170,
    radius: 90,
    color: '#06B6D4',
    accentColor: 'rgba(6, 182, 212, 0.4)'
  },
  {
    id: 'station-2',
    projectId: 'movie-recommender',
    number: '03',
    name: 'AI Movie Recommender & NLP',
    x: 770,
    y: 430,
    radius: 90,
    color: '#8B5CF6',
    accentColor: 'rgba(139, 92, 246, 0.4)'
  },
  {
    id: 'station-3',
    projectId: 'smp-islam-al-amin',
    number: '04',
    name: 'SMP Al-Amin Enterprise Portal',
    x: 230,
    y: 430,
    radius: 90,
    color: '#10B981',
    accentColor: 'rgba(16, 185, 129, 0.4)'
  }
];

export default function CyberCarProjects({ projects, onSelectProject }: CyberCarProjectsProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Game physics state
  const carRef = useRef({
    x: 230,
    y: 260,
    angle: 0, // facing east (radians)
    speed: 0,
    targetX: null as number | null,
    targetY: null as number | null,
    isAutopiloting: false
  });

  const keysPressed = useRef<{ [key: string]: boolean }>({});
  const trailsRef = useRef<Array<{ x: number; y: number; alpha: number; color: string }>>([]);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const engineGainRef = useRef<GainNode | null>(null);
  const engineOscRef = useRef<OscillatorNode | null>(null);

  // React state for HUD
  const [activeStationIndex, setActiveStationIndex] = useState<number>(0);
  const [currentSpeedKmh, setCurrentSpeedKmh] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [autopilotTargetStation, setAutopilotTargetStation] = useState<number | null>(null);
  const [showControlsHint, setShowControlsHint] = useState<boolean>(true);

  const activeStation = STATIONS[activeStationIndex];
  const activeProject = projects.find((p) => p.id === activeStation.projectId) || projects[0];

  // Sound synthesis via Web Audio API (no external asset downloads)
  const initAudio = useCallback(() => {
    if (audioCtxRef.current) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(45, ctx.currentTime);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();

      audioCtxRef.current = ctx;
      engineOscRef.current = osc;
      engineGainRef.current = gain;
    } catch {
      // AudioContext not supported or restricted by browser
    }
  }, []);

  const playStationChime = useCallback(() => {
    if (!soundEnabled || !audioCtxRef.current) return;
    try {
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.45);
    } catch {
      // Fail silently
    }
  }, [soundEnabled]);

  const toggleSound = () => {
    if (!soundEnabled) {
      initAudio();
      if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      setSoundEnabled(true);
    } else {
      if (engineGainRef.current && audioCtxRef.current) {
        engineGainRef.current.gain.setValueAtTime(0, audioCtxRef.current.currentTime);
      }
      setSoundEnabled(false);
    }
  };

  // Keyboard navigation listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeElement = document.activeElement;
      const isInput = activeElement?.tagName === 'INPUT' || activeElement?.tagName === 'TEXTAREA';
      if (isInput) return;

      const trackedKeys = [
        'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight',
        'KeyW', 'KeyA', 'KeyS', 'KeyD', 'Space'
      ];

      if (trackedKeys.includes(e.code)) {
        e.preventDefault();
        keysPressed.current[e.code] = true;
        // User manually controlling cancels autopilot
        carRef.current.isAutopiloting = false;
        carRef.current.targetX = null;
        carRef.current.targetY = null;
        setAutopilotTargetStation(null);
        setShowControlsHint(false);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current[e.code] = false;
    };

    window.addEventListener('keydown', handleKeyDown, { passive: false });
    window.addEventListener('keyup', handleKeyUp, { passive: true });

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Set car destination via Cursor / Click or Autopilot
  const driveToStation = (stationIdx: number) => {
    const target = STATIONS[stationIdx];
    if (!target) return;

    carRef.current.targetX = target.x;
    carRef.current.targetY = target.y;
    carRef.current.isAutopiloting = true;
    setAutopilotTargetStation(stationIdx);
    setShowControlsHint(false);

    if (soundEnabled && !audioCtxRef.current) {
      initAudio();
    }
  };

  // Click on canvas to steer car towards cursor
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const clickX = (e.clientX - rect.left) * scaleX;
    const clickY = (e.clientY - rect.top) * scaleY;

    carRef.current.targetX = clickX;
    carRef.current.targetY = clickY;
    carRef.current.isAutopiloting = true;
    setAutopilotTargetStation(null);
    setShowControlsHint(false);

    if (soundEnabled && !audioCtxRef.current) {
      initAudio();
    }
  };

  // Reset car position
  const resetCar = () => {
    carRef.current = {
      x: 230,
      y: 260,
      angle: 0,
      speed: 0,
      targetX: null,
      targetY: null,
      isAutopiloting: false
    };
    setActiveStationIndex(0);
    setAutopilotTargetStation(null);
  };

  // Main 60fps Game & Canvas Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let lastStationDetected = activeStationIndex;

    const virtualWidth = 1000;
    const virtualHeight = 600;

    canvas.width = virtualWidth;
    canvas.height = virtualHeight;

    const render = () => {
      const car = carRef.current;
      const keys = keysPressed.current;

      // 1. CAR PHYSICS SIMULATION
      const maxSpeed = 4.8;
      const reverseMax = -2.2;
      const acceleration = 0.16;
      const deceleration = 0.07;
      const turnSpeed = 0.052;

      // Handle Manual Keyboard Input
      const isAccelerating = keys['ArrowUp'] || keys['KeyW'];
      const isReversing = keys['ArrowDown'] || keys['KeyS'];
      const isTurningLeft = keys['ArrowLeft'] || keys['KeyA'];
      const isTurningRight = keys['ArrowRight'] || keys['KeyD'];
      const isBraking = keys['Space'];

      if (!car.isAutopiloting) {
        if (isAccelerating) {
          car.speed = Math.min(car.speed + acceleration, maxSpeed);
        } else if (isReversing) {
          car.speed = Math.max(car.speed - acceleration, reverseMax);
        } else {
          // Friction deceleration
          if (car.speed > 0) {
            car.speed = Math.max(0, car.speed - deceleration);
          } else if (car.speed < 0) {
            car.speed = Math.min(0, car.speed + deceleration);
          }
        }

        if (isBraking) {
          car.speed *= 0.88;
        }

        // Steer only when moving
        if (Math.abs(car.speed) > 0.1) {
          const dir = car.speed > 0 ? 1 : -1;
          if (isTurningLeft) {
            car.angle -= turnSpeed * dir * (Math.abs(car.speed) / maxSpeed + 0.3);
          }
          if (isTurningRight) {
            car.angle += turnSpeed * dir * (Math.abs(car.speed) / maxSpeed + 0.3);
          }
        }
      } else if (car.targetX !== null && car.targetY !== null) {
        // Autopilot / Cursor Drive Algorithm
        const dx = car.targetX - car.x;
        const dy = car.targetY - car.y;
        const dist = Math.hypot(dx, dy);

        if (dist > 18) {
          const desiredAngle = Math.atan2(dy, dx);
          let angleDiff = desiredAngle - car.angle;

          // Normalize angle difference to [-PI, PI]
          while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
          while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;

          // Smooth turn toward target
          car.angle += Math.sign(angleDiff) * Math.min(Math.abs(angleDiff), turnSpeed * 1.4);

          // Accelerate toward target with braking on approach
          const targetSpeed = Math.min(maxSpeed * 0.9, dist * 0.08);
          if (car.speed < targetSpeed) {
            car.speed = Math.min(car.speed + acceleration, targetSpeed);
          } else {
            car.speed = Math.max(car.speed - deceleration, targetSpeed);
          }
        } else {
          // Reached target
          car.speed *= 0.8;
          if (Math.abs(car.speed) < 0.2) {
            car.speed = 0;
            car.isAutopiloting = false;
            car.targetX = null;
            car.targetY = null;
            setAutopilotTargetStation(null);
          }
        }
      }

      // Update position
      car.x += Math.cos(car.angle) * car.speed;
      car.y += Math.sin(car.angle) * car.speed;

      // Keep car inside circuit bounds
      car.x = Math.max(40, Math.min(virtualWidth - 40, car.x));
      car.y = Math.max(40, Math.min(virtualHeight - 40, car.y));

      // 2. CHECKPOINT PROXIMITY DETECTION
      let closestStationIdx = lastStationDetected;
      let minDistance = Infinity;

      STATIONS.forEach((station, idx) => {
        const d = Math.hypot(car.x - station.x, car.y - station.y);
        if (d < station.radius && d < minDistance) {
          minDistance = d;
          closestStationIdx = idx;
        }
      });

      if (closestStationIdx !== lastStationDetected) {
        lastStationDetected = closestStationIdx;
        setActiveStationIndex(closestStationIdx);
        playStationChime();
      }

      // Update HUD speed display
      setCurrentSpeedKmh(Math.round(Math.abs(car.speed) * 18));

      // Audio frequency modulation
      if (soundEnabled && engineOscRef.current && engineGainRef.current && audioCtxRef.current) {
        const speedRatio = Math.abs(car.speed) / maxSpeed;
        const targetFreq = 45 + speedRatio * 90;
        engineOscRef.current.frequency.setTargetAtTime(targetFreq, audioCtxRef.current.currentTime, 0.05);
        const gainVal = 0.015 + speedRatio * 0.04;
        engineGainRef.current.gain.setTargetAtTime(gainVal, audioCtxRef.current.currentTime, 0.05);
      }

      // 3. TIRE TRAILS
      if (Math.abs(car.speed) > 1.5) {
        const backX = car.x - Math.cos(car.angle) * 16;
        const backY = car.y - Math.sin(car.angle) * 16;
        trailsRef.current.push({
          x: backX,
          y: backY,
          alpha: 0.35,
          color: car.speed > 3.5 ? '#E5C378' : '#06B6D4'
        });
      }

      if (trailsRef.current.length > 50) {
        trailsRef.current.shift();
      }

      trailsRef.current.forEach((t) => {
        t.alpha -= 0.007;
      });
      trailsRef.current = trailsRef.current.filter((t) => t.alpha > 0.01);

      // 4. DRAWING ON CANVAS
      // Clear background
      ctx.fillStyle = '#08080C';
      ctx.fillRect(0, 0, virtualWidth, virtualHeight);

      // Cyber Grid Lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let gx = 0; gx < virtualWidth; gx += gridSize) {
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, virtualHeight);
        ctx.stroke();
      }
      for (let gy = 0; gy < virtualHeight; gy += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(virtualWidth, gy);
        ctx.stroke();
      }

      // Cyber Highway Track (Continuous Rounded Loop)
      ctx.save();
      ctx.beginPath();
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';

      // Outer track border
      ctx.strokeStyle = '#151520';
      ctx.lineWidth = 140;
      ctx.strokeRect(170, 110, 660, 380);

      // Asphalt Surface
      ctx.strokeStyle = '#0F1018';
      ctx.lineWidth = 120;
      ctx.strokeRect(170, 110, 660, 380);

      // Neon Track Edge Lines
      ctx.strokeStyle = 'rgba(229, 195, 120, 0.25)';
      ctx.lineWidth = 2;
      ctx.strokeRect(110, 50, 780, 500);

      ctx.strokeStyle = 'rgba(6, 182, 212, 0.25)';
      ctx.lineWidth = 2;
      ctx.strokeRect(230, 170, 540, 260);

      // Dashed Highway Centerline
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
      ctx.lineWidth = 2;
      ctx.setLineDash([16, 16]);
      ctx.strokeRect(170, 110, 660, 380);
      ctx.setLineDash([]);
      ctx.restore();

      // Render Checkpoint Stations
      STATIONS.forEach((station, idx) => {
        const isCurrent = idx === lastStationDetected;

        // Outer pulsing radar ring
        ctx.save();
        ctx.beginPath();
        ctx.arc(station.x, station.y, station.radius, 0, Math.PI * 2);
        ctx.fillStyle = isCurrent ? station.accentColor : 'rgba(255, 255, 255, 0.03)';
        ctx.fill();

        ctx.strokeStyle = isCurrent ? station.color : 'rgba(255, 255, 255, 0.12)';
        ctx.lineWidth = isCurrent ? 3 : 1.5;
        if (isCurrent) {
          ctx.shadowColor = station.color;
          ctx.shadowBlur = 18;
        }
        ctx.stroke();

        // Inner Station Pad
        ctx.beginPath();
        ctx.arc(station.x, station.y, 44, 0, Math.PI * 2);
        ctx.fillStyle = isCurrent ? '#161622' : '#0E0F14';
        ctx.fill();
        ctx.strokeStyle = station.color;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Station Number Text
        ctx.fillStyle = station.color;
        ctx.font = 'bold 15px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`STATION ${station.number}`, station.x, station.y - 12);

        // Station Name Preview
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '600 11px Inter, sans-serif';
        const truncatedName = station.name.length > 20 ? station.name.slice(0, 18) + '...' : station.name;
        ctx.fillText(truncatedName, station.x, station.y + 10);

        ctx.restore();
      });

      // Render Tire Trails
      trailsRef.current.forEach((t) => {
        ctx.save();
        ctx.fillStyle = t.color;
        ctx.globalAlpha = t.alpha;
        ctx.beginPath();
        ctx.arc(t.x, t.y, 3.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Target Cursor Waypoint Indicator
      if (car.targetX !== null && car.targetY !== null) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(car.targetX, car.targetY, 9, 0, Math.PI * 2);
        ctx.strokeStyle = '#E5C378';
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(car.targetX, car.targetY, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#E5C378';
        ctx.fill();

        // Navigation line from car to target
        ctx.beginPath();
        ctx.moveTo(car.x, car.y);
        ctx.lineTo(car.targetX, car.targetY);
        ctx.strokeStyle = 'rgba(229, 195, 120, 0.2)';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
      }

      // RENDER THE CYBER CAR
      ctx.save();
      ctx.translate(car.x, car.y);
      ctx.rotate(car.angle);

      // Headlight Beam Cones (Cast light on the road in front)
      const headlightLength = 110;
      const headlightWidth = 45;
      const gradLeft = ctx.createRadialGradient(20, -10, 5, 20 + headlightLength, -10, headlightWidth);
      gradLeft.addColorStop(0, 'rgba(255, 245, 200, 0.45)');
      gradLeft.addColorStop(0.5, 'rgba(229, 195, 120, 0.15)');
      gradLeft.addColorStop(1, 'rgba(229, 195, 120, 0)');

      ctx.fillStyle = gradLeft;
      ctx.beginPath();
      ctx.moveTo(18, -10);
      ctx.lineTo(18 + headlightLength, -10 - headlightWidth);
      ctx.lineTo(18 + headlightLength, -10 + headlightWidth);
      ctx.closePath();
      ctx.fill();

      const gradRight = ctx.createRadialGradient(20, 10, 5, 20 + headlightLength, 10, headlightWidth);
      gradRight.addColorStop(0, 'rgba(255, 245, 200, 0.45)');
      gradRight.addColorStop(0.5, 'rgba(229, 195, 120, 0.15)');
      gradRight.addColorStop(1, 'rgba(229, 195, 120, 0)');

      ctx.fillStyle = gradRight;
      ctx.beginPath();
      ctx.moveTo(18, 10);
      ctx.lineTo(18 + headlightLength, 10 - headlightWidth);
      ctx.lineTo(18 + headlightLength, 10 + headlightWidth);
      ctx.closePath();
      ctx.fill();

      // Car Shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
      ctx.beginPath();
      ctx.ellipse(0, 0, 24, 15, 0, 0, Math.PI * 2);
      ctx.fill();

      // Car Wheels (4 tires)
      ctx.fillStyle = '#050508';
      // Front Left
      ctx.fillRect(10, -17, 10, 5);
      // Front Right
      ctx.fillRect(10, 12, 10, 5);
      // Rear Left
      ctx.fillRect(-17, -17, 10, 5);
      // Rear Right
      ctx.fillRect(-17, 12, 10, 5);

      // Car Chassis (Obsidian Cyber Body)
      ctx.fillStyle = '#14141C';
      ctx.strokeStyle = '#E5C378';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(-20, -13, 40, 26, 6);
      ctx.fill();
      ctx.stroke();

      // Hood Aerodynamic Decal
      ctx.fillStyle = '#090A0E';
      ctx.beginPath();
      ctx.moveTo(18, -8);
      ctx.lineTo(4, -5);
      ctx.lineTo(4, 5);
      ctx.lineTo(18, 8);
      ctx.closePath();
      ctx.fill();

      // Cockpit / Tinted Glass Canopy
      ctx.fillStyle = '#06B6D4';
      ctx.shadowColor = '#06B6D4';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.roundRect(-8, -8, 16, 16, 3);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Front Headlight Bulbs
      ctx.fillStyle = '#FFF5CC';
      ctx.shadowColor = '#FFEAA7';
      ctx.shadowBlur = 10;
      ctx.fillRect(18, -11, 3, 4);
      ctx.fillRect(18, 7, 3, 4);

      // Rear Red Taillights (Glow intense on braking)
      ctx.fillStyle = isBraking || isReversing ? '#FF2E55' : '#CC1133';
      ctx.shadowColor = '#FF2E55';
      ctx.shadowBlur = isBraking ? 15 : 6;
      ctx.fillRect(-20, -11, 2, 4);
      ctx.fillRect(-20, 7, 2, 4);

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeStationIndex, playStationChime, soundEnabled]);

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* 1. INTERACTIVE CYBER HIGHWAY GAME CONSOLE */}
      <div className="luxury-card overflow-hidden relative border border-amber-200/25 bg-[#09090D] shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
        
        {/* Top Game Bar: Telemetry, Audio, and Quick Jump Stations */}
        <div className="px-4 sm:px-6 py-3.5 bg-[#0E0E14] border-b border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
          
          {/* Left: Speedometer & Telemetry */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#10B981]" />
              <span className="font-mono text-xs font-semibold text-emerald-400 tracking-wider">
                DRIVE SIMULATOR
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-3 px-3 py-1 rounded-lg bg-black/40 border border-white/[0.06] font-mono text-xs">
              <span className="text-zinc-400">VELOCITY:</span>
              <span className="text-[#E5C378] font-bold text-sm w-12 text-right">
                {currentSpeedKmh} <span className="text-[10px] text-zinc-500">KM/H</span>
              </span>
            </div>

            <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-lg bg-black/40 border border-white/[0.06] font-mono text-xs text-zinc-300">
              <Navigation className="w-3.5 h-3.5 text-cyan-400" />
              <span>STATION:</span>
              <span className="text-cyan-400 font-bold">{activeStation.number} / 04</span>
            </div>
          </div>

          {/* Right: Station Quick Select & Sound Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleSound}
              className={`p-2 rounded-xl border text-xs font-mono flex items-center gap-1.5 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                soundEnabled
                  ? 'bg-amber-400/15 border-amber-300/40 text-amber-200 shadow-[0_0_12px_rgba(229,195,120,0.2)]'
                  : 'bg-white/[0.04] border-white/[0.08] text-zinc-400 hover:text-white'
              }`}
              title={soundEnabled ? 'Mute Synthetic Audio' : 'Enable Synthetic Audio'}
              aria-label={soundEnabled ? 'Mute Audio' : 'Enable Audio'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              <span className="hidden sm:inline">{soundEnabled ? 'AUDIO ON' : 'AUDIO OFF'}</span>
            </button>

            <button
              onClick={resetCar}
              className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-zinc-400 hover:text-white text-xs font-mono flex items-center gap-1.5 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              title="Reset Car Position"
              aria-label="Reset Car Position"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">RESET</span>
            </button>
          </div>
        </div>

        {/* Canvas Display Viewport */}
        <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-[#070709] cursor-crosshair select-none overflow-hidden">
          <canvas
            ref={canvasRef}
            onClick={handleCanvasClick}
            className="w-full h-full block"
          />

          {/* Controls Instruction Overlay Banner */}
          {showControlsHint && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2.5 rounded-2xl bg-[#09090D]/90 backdrop-blur-md border border-amber-200/30 text-center shadow-2xl pointer-events-none max-w-sm sm:max-w-md w-full mx-4">
              <p className="text-xs font-mono text-[#E5C378] font-semibold mb-1 flex items-center justify-center gap-2">
                <Sparkles className="w-3.5 h-3.5" /> CAR EXPLORATION CONTROLS
              </p>
              <p className="text-[11px] text-zinc-300 leading-snug">
                Gunakan <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-amber-300 border border-zinc-700">Panah Keyboard</kbd> / <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-amber-300 border border-zinc-700">W A S D</kbd> untuk mengemudi, atau <strong>klik di arena / pilih tombol stasiun dengan kursor</strong> untuk navigasi otomatis!
              </p>
            </div>
          )}

          {/* Autopilot Status Indicator */}
          {autopilotTargetStation !== null && (
            <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-cyan-300 font-mono text-[11px] flex items-center gap-2 backdrop-blur-md shadow-lg pointer-events-none animate-pulse">
              <Radio className="w-3.5 h-3.5 animate-spin" />
              <span>AUTOPILOT: MENGARAH KE STASIUN {STATIONS[autopilotTargetStation].number}</span>
            </div>
          )}
        </div>

        {/* Station Navigation Quick Bar (Click to navigate car with cursor) */}
        <div className="p-3 sm:p-4 bg-[#0B0B10] border-t border-white/[0.08] flex items-center justify-between flex-wrap gap-2">
          <span className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-[#E5C378]" /> PILIH STASIUN DENGAN KURSOR:
          </span>

          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {STATIONS.map((station, idx) => {
              const isSelected = idx === activeStationIndex;
              return (
                <button
                  key={station.id}
                  onClick={() => driveToStation(idx)}
                  className={`px-3 py-1.5 rounded-xl font-mono text-xs transition-all flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                    isSelected
                      ? 'bg-amber-400/20 text-[#F7E7C4] border border-amber-300/50 shadow-[0_0_12px_rgba(229,195,120,0.25)] font-bold'
                      : 'bg-white/[0.03] text-zinc-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.06]'
                  }`}
                  aria-label={`Drive to Station ${station.number}: ${station.name}`}
                >
                  <span className="text-[10px] opacity-75">{station.number}.</span>
                  <span>{station.name.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* 2. DISCOVERED PROJECT TELEMETRY CARD */}
      <div className="luxury-card p-6 sm:p-8 bg-gradient-to-br from-[#0D0D14] via-[#09090E] to-[#0D0D14] border border-amber-200/30 shadow-[0_15px_40px_rgba(0,0,0,0.8)] relative overflow-hidden">
        
        {/* Subtle Decorative Accent Glow */}
        <div 
          className="absolute -top-24 -right-24 w-80 h-80 rounded-full blur-[100px] pointer-events-none opacity-20"
          style={{ backgroundColor: activeStation.color }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Left: Project Image Preview */}
          <div className="lg:col-span-5 relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-black/60 border border-white/[0.08] group">
            <Image
              src={activeProject.image}
              alt={activeProject.title}
              fill
              className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

            <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#070709]/95 border border-amber-200/40 text-[#E5C378] shadow-md">
                STATION {activeStation.number}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-black/80 border border-white/20 text-zinc-300">
                {activeProject.category}
              </span>
            </div>
          </div>

          {/* Right: Technical Details & Actions */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-2">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>UNLOCKED CHECKPOINT // {activeProject.role}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading mb-2 leading-tight">
                {activeProject.title}
              </h3>

              <p className="text-xs sm:text-sm font-mono text-[#E5C378] mb-3">
                {activeProject.tagline}
              </p>

              <p className="text-sm text-zinc-300 leading-relaxed text-justify mb-5 line-clamp-3">
                {activeProject.summary}
              </p>

              {/* Stack Chips */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {activeProject.stack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg text-xs font-mono bg-white/[0.04] border border-amber-200/15 text-zinc-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3 flex-1 min-w-[200px]">
                <button
                  onClick={() => onSelectProject(activeProject)}
                  className="btn-luxury-primary text-xs py-2.5 px-5 flex-1 justify-center"
                  aria-label={`Inspect Case Study Dossier for ${activeProject.title}`}
                >
                  <span>Buka Dossier & Detail</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                {/* Drive to Next Project Button (User explicit requirement) */}
                <button
                  onClick={() => {
                    const nextIdx = (activeStationIndex + 1) % STATIONS.length;
                    driveToStation(nextIdx);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-amber-400/15 hover:bg-amber-400/25 border border-amber-300/40 text-amber-200 text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(229,195,120,0.15)] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                  title="Jalankan mobil ke project berikutnya dengan kursor"
                  aria-label="Drive to Next Project"
                >
                  <span>Lanjut Project Berikutnya</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* External Links */}
              <div className="flex items-center gap-2">
                <a
                  href={activeProject.github}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-amber-200/20 text-zinc-300 hover:text-white flex items-center justify-center transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                  title="GitHub Repository"
                  aria-label="GitHub Repository"
                >
                  <Github className="w-4 h-4" />
                </a>

                {activeProject.demo && activeProject.demo !== '#' && (
                  <a
                    href={activeProject.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-xl bg-amber-400/15 hover:bg-amber-400/25 border border-amber-200/35 text-[#E5C378] hover:text-white flex items-center justify-center transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                    title="Live Demo"
                    aria-label="Live Demo"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
