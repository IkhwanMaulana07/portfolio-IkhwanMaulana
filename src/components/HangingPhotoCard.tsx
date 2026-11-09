'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Code2, Sparkles } from 'lucide-react';

interface HangingPhotoCardProps {
  photoSrc?: string;
  badgeText?: string;
}

export default function HangingPhotoCard({
  photoSrc = '/ikhwan_studio_hero.png',
  badgeText = 'Full-Stack Engineer',
}: HangingPhotoCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);

  // Layout measurements
  const [dimensions, setDimensions] = useState({
    width: 360,
    anchorX: 180,
    topHookY: 20, // where rope attaches to top anchor D-ring
    cardTopY: 105, // where card sits at rest (lowers the photo card ~85px)
    clipOffsetY: 8, // clip is 8px above card top
  });

  // Physics state stored in refs for direct 60/120fps calculation without React render lag
  const physics = useRef({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    prevX: 0,
    prevY: 0,
    rotation: 0,
    vRot: 0,
    isDragging: false,
    dragStartX: 0,
    dragStartY: 0,
    initialX: 0,
    initialY: 0,
  });

  // Default SVG path and transform for instant SSR match (no layout shift / hydration pop-in)
  const [ropePath, setRopePath] = useState(
    'M 180 20 C 180 50, 180 75, 180 97'
  );
  const [cardTransform, setCardTransform] = useState(
    'translate3d(0px, 0px, 0) rotate(0deg) rotateX(0deg) rotateY(0deg)'
  );
  const [isPulling, setIsPulling] = useState(false);
  const [showHint, setShowHint] = useState(true);

  // Update container dimensions accurately via ResizeObserver
  const updateDimensions = useCallback(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const w = rect.width || 360;
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
      const cardY = isMobile ? 85 : 105;
      setDimensions({
        width: w,
        anchorX: w / 2,
        topHookY: 20,
        cardTopY: cardY,
        clipOffsetY: 8,
      });
    }
  }, []);

  useEffect(() => {
    updateDimensions();
    if (!containerRef.current) return;
    const observer = new ResizeObserver(() => {
      updateDimensions();
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [updateDimensions]);

  // Compute Bezier rope curve and card 3D transform based on physics coordinates
  const updateRender = useCallback(
    (x: number, y: number, rotation: number) => {
      const { anchorX, topHookY, cardTopY, clipOffsetY } = dimensions;

      // Fixed top anchor point
      const x0 = anchorX;
      const y0 = topHookY;

      // Dynamic clip point at top-center of card
      // Since transform-origin is at top-center clip, clip translates directly by (x, y)
      const x1 = anchorX + x;
      const y1 = cardTopY - clipOffsetY + y;

      const dx = x1 - x0;
      const dy = y1 - y0;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const restLen = (cardTopY - clipOffsetY) - topHookY; // ~77px to 97px

      let path = '';
      if (dist < restLen) {
        // Slack rope: droops gracefully downwards under gravity
        const sag = Math.min(48, (restLen - dist) * 0.75);
        const cp1X = x0 + dx * 0.25;
        const cp1Y = y0 + dy * 0.45 + sag;
        const cp2X = x1 - dx * 0.25;
        const cp2Y = y1 - dy * 0.45 + sag;
        path = `M ${x0.toFixed(1)} ${y0.toFixed(1)} C ${cp1X.toFixed(1)} ${cp1Y.toFixed(1)}, ${cp2X.toFixed(1)} ${cp2Y.toFixed(1)}, ${x1.toFixed(1)} ${y1.toFixed(1)}`;
      } else {
        // Taut rope: stretched under tension with slight natural bend
        const cp1X = x0 + dx * 0.2;
        const cp1Y = y0 + dy * 0.42;
        const cp2X = x1 - dx * 0.18;
        const cp2Y = y1 - dy * 0.42;
        path = `M ${x0.toFixed(1)} ${y0.toFixed(1)} C ${cp1X.toFixed(1)} ${cp1Y.toFixed(1)}, ${cp2X.toFixed(1)} ${cp2Y.toFixed(1)}, ${x1.toFixed(1)} ${y1.toFixed(1)}`;
      }

      setRopePath(path);

      // Subtle 3D perspective tilt as the card is pulled
      const tiltY = Math.max(-14, Math.min(14, x * 0.08));
      const tiltX = Math.max(-12, Math.min(12, -y * 0.06));

      setCardTransform(
        `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) rotate(${rotation.toFixed(2)}deg) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg)`
      );
    },
    [dimensions]
  );

  // Physics animation loop (Spring simulation & ambient pendulum sway)
  useEffect(() => {
    let active = true;

    const tick = (now: number) => {
      if (!active) return;
      const p = physics.current;
      const restLen = (dimensions.cardTopY - dimensions.clipOffsetY) - dimensions.topHookY;

      if (p.isDragging) {
        // Compute pendulum angle toward anchor
        const dy = Math.max(30, restLen + p.y);
        const targetAngle = Math.atan2(p.x, dy) * (180 / Math.PI) * 0.72;
        const clampedAngle = Math.max(-28, Math.min(28, targetAngle));

        // Smoothly steer rotation to target angle
        p.rotation += (clampedAngle - p.rotation) * 0.3;

        // Record velocity for fling release
        p.vx = (p.x - p.prevX) * 0.6;
        p.vy = (p.y - p.prevY) * 0.6;
        p.prevX = p.x;
        p.prevY = p.y;

        updateRender(p.x, p.y, p.rotation);
      } else {
        // Spring physics towards equilibrium (0, 0)
        const stiffness = 0.082;
        const damping = 0.865;
        const rotStiffness = 0.088;
        const rotDamping = 0.86;

        const ax = -stiffness * p.x;
        const ay = -stiffness * p.y;
        p.vx = (p.vx + ax) * damping;
        p.vy = (p.vy + ay) * damping;
        p.x += p.vx;
        p.y += p.vy;

        // Pendulum rotation follows physical displacement angle
        const dy = Math.max(30, restLen + p.y);
        const targetAngle = Math.atan2(p.x, dy) * (180 / Math.PI) * 0.72;
        const clampedAngle = Math.max(-28, Math.min(28, targetAngle));

        const rotA = -rotStiffness * (p.rotation - clampedAngle);
        p.vRot = (p.vRot + rotA) * rotDamping;
        p.rotation += p.vRot;

        // Idle gentle sway when energy has settled down
        const energy = Math.abs(p.x) + Math.abs(p.y) + Math.abs(p.vx) + Math.abs(p.vy) + Math.abs(p.rotation);
        if (energy < 0.25) {
          const swayTime = now * 0.0016;
          const idleX = Math.sin(swayTime) * 3.5;
          const idleRot = Math.sin(swayTime) * 1.3;
          updateRender(idleX, 0, idleRot);
        } else {
          updateRender(p.x, p.y, p.rotation);
        }
      }

      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);

    return () => {
      active = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [dimensions, updateRender]);

  // Pointer Handlers: Unified Mouse & Mobile Touch
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;

    const target = e.currentTarget;
    try {
      target.setPointerCapture(e.pointerId);
    } catch {
      // Ignore fallback
    }

    const p = physics.current;
    p.isDragging = true;
    p.dragStartX = e.clientX;
    p.dragStartY = e.clientY;
    p.initialX = p.x;
    p.initialY = p.y;
    p.prevX = p.x;
    p.prevY = p.y;
    p.vx = 0;
    p.vy = 0;
    p.vRot = 0;

    setIsPulling(true);
    setShowHint(false);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const p = physics.current;
    if (!p.isDragging) return;

    const rawDx = e.clientX - p.dragStartX + p.initialX;
    const rawDy = e.clientY - p.dragStartY + p.initialY;

    // Asymptotic resistance function (simulates realistic elastic bungee cable limit)
    const resist = (val: number, maxPull: number) => {
      const sign = Math.sign(val);
      const abs = Math.abs(val);
      return sign * (abs / (1 + abs / maxPull));
    };

    const newX = resist(rawDx, 240);
    const newY = Math.max(-50, resist(rawDy, 190));

    p.x = newX;
    p.y = newY;
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const p = physics.current;
    if (!p.isDragging) return;

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Ignore fallback
    }

    p.isDragging = false;
    setIsPulling(false);
  };

  const handlePointerCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    handlePointerUp(e);
  };

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center justify-start w-full max-w-[360px] sm:max-w-[420px] select-none"
      style={{
        paddingTop: `${dimensions.cardTopY}px`,
        touchAction: 'pan-y', // page scrolls normally when dragging outside card
      }}
    >
      {/* Dynamic SVG Braided Rope Layer */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-20"
        aria-hidden="true"
      >
        <defs>
          {/* Lanyard gradient matching orange theme */}
          <linearGradient id="ropeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ff5500" />
            <stop offset="40%" stopColor="#ff781f" />
            <stop offset="75%" stopColor="#ea580c" />
            <stop offset="100%" stopColor="#ff4500" />
          </linearGradient>

          {/* Realistic 3D drop shadow */}
          <filter id="ropeShadow" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="0" dy="5" stdDeviation="4" floodColor="#000000" floodOpacity="0.7" />
          </filter>
        </defs>

        {ropePath && (
          <g filter="url(#ropeShadow)">
            {/* Outer dark cord casing */}
            <path
              d={ropePath}
              fill="none"
              stroke="#14100e"
              strokeWidth={isPulling ? 5.2 : 5.8}
              strokeLinecap="round"
            />
            {/* Vibrant orange woven core */}
            <path
              d={ropePath}
              fill="none"
              stroke="url(#ropeGradient)"
              strokeWidth={isPulling ? 3.6 : 4.2}
              strokeLinecap="round"
            />
            {/* Braided texture stitching */}
            <path
              d={ropePath}
              fill="none"
              stroke="#ffffff"
              strokeWidth="1.2"
              strokeDasharray="4 4"
              strokeOpacity="0.45"
              strokeLinecap="round"
            />
          </g>
        )}
      </svg>

      {/* Top Mounting Pin (Ceiling/Wall Bracket) */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center pointer-events-none"
        style={{ top: '6px' }}
      >
        {/* Metallic Wall Mount Bracket */}
        <div className="relative w-7 h-7 rounded-full bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-950 border border-orange-500/40 shadow-[0_0_15px_rgba(255,85,0,0.35)] flex items-center justify-center">
          {/* Center Rivet */}
          <div className="w-2.5 h-2.5 rounded-full bg-zinc-900 border border-zinc-500/60 shadow-inner flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-orange-500/90" />
          </div>
        </div>

        {/* Polished Steel D-Ring Loop */}
        <div className="w-3.5 h-3.5 -mt-1 rounded-b-md border-2 border-t-0 border-zinc-300 bg-transparent shadow-sm" />
      </div>

      {/* Interactive Floating Hint Tag (Auto fades on first drag) */}
      {showHint && (
        <div className="absolute top-5 left-1/2 -translate-x-1/2 z-40 pointer-events-none flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/15 border border-orange-500/40 backdrop-blur-md text-[11px] font-mono text-orange-400 font-medium animate-bounce shadow-lg">
          <Sparkles className="w-3 h-3 text-orange-400 animate-pulse" />
          <span>Tarik saya!</span>
        </div>
      )}

      {/* Draggable Hanging Card Frame */}
      <div
        ref={cardRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        className={`relative group w-fit [perspective:1200px] max-w-full ${
          isPulling ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        style={{
          transform: cardTransform,
          transformOrigin: '50% -8px', // pivots exactly around the top clip!
          touchAction: 'none', // smoothly captures touch gestures on the card
          willChange: 'transform',
        }}
      >
        {/* Metal Carabiner Clip at top-center of card */}
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center pointer-events-none">
          {/* Ring Loop */}
          <div className="w-3.5 h-3.5 rounded-full border-2 border-zinc-300 bg-zinc-900 shadow-sm" />
          {/* Metallic Bracket Clamp */}
          <div className="w-5 h-2 -mt-1.5 bg-gradient-to-r from-zinc-400 via-zinc-200 to-zinc-400 rounded-sm border border-zinc-300/80 shadow-md" />
        </div>

        {/* Background offset decorative card */}
        <div
          className={`absolute inset-0 translate-x-3 translate-y-3 sm:translate-x-4 sm:translate-y-4 rounded-3xl border border-orange-500/30 bg-orange-500/5 -z-10 transition-transform duration-500 ${
            isPulling ? 'translate-x-5 translate-y-5' : 'group-hover:translate-x-5 group-hover:translate-y-5'
          }`}
        />

        {/* Clean Portrait Image Container */}
        <div className="relative w-[240px] h-[310px] sm:w-[280px] sm:h-[360px] md:w-[320px] md:h-[400px] max-w-[85vw] rounded-3xl overflow-hidden border border-white/10 bg-[#0e0b0b] shadow-2xl">
          <Image
            src={photoSrc}
            alt="Ikhwan Maulana"
            fill
            priority
            sizes="(max-width: 768px) 280px, 320px"
            className={`rounded-3xl object-cover object-top filter contrast-105 transition-all duration-700 pointer-events-none select-none ${
              isPulling ? 'grayscale-0 scale-105' : 'grayscale group-hover:grayscale-0 group-hover:scale-105'
            }`}
            draggable={false}
          />

          {/* Inner Orange Border */}
          <div className="hero-inner-border absolute inset-3 rounded-[24px] border border-orange-500/20 pointer-events-none" />

          {/* 4 Animated Hover Border Lines */}
          <span
            className={`hero-hover-border absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-orange-500 to-orange-600 rounded-full origin-left transition-transform duration-500 ${
              isPulling ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
            }`}
          />
          <span
            className={`hero-hover-border absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-orange-500 to-orange-600 rounded-full origin-left transition-transform duration-500 ${
              isPulling ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
            }`}
          />
          <span
            className={`hero-hover-border absolute top-0 left-0 w-[3px] h-full bg-gradient-to-b from-orange-500 to-orange-600 rounded-full origin-top transition-transform duration-500 ${
              isPulling ? 'scale-y-100' : 'scale-y-0 group-hover:scale-y-100'
            }`}
          />
          <span
            className={`hero-hover-border absolute top-0 right-0 w-[3px] h-full bg-gradient-to-b from-orange-500 to-orange-600 rounded-full origin-top transition-transform duration-500 ${
              isPulling ? 'scale-y-100' : 'scale-y-0 group-hover:scale-y-100'
            }`}
          />
        </div>

        {/* Floating 3D Badge */}
        <div
          className="absolute -left-6 sm:-left-10 bottom-6 px-4 py-2.5 rounded-xl bg-black/80 backdrop-blur-xl border border-orange-500/30 text-white text-xs sm:text-sm font-mono font-medium flex items-center gap-2 shadow-[0_10px_30px_rgba(0,0,0,0.8)] z-20 pointer-events-none"
          style={{ transform: 'translateZ(60px)' }}
        >
          <Code2 className="text-orange-500 w-4 h-4 animate-pulse" />
          <span>{badgeText}</span>
        </div>
      </div>
    </div>
  );
}
