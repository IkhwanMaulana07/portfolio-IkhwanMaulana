'use client';

import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import gsap from 'gsap';

interface IntroProps {
  onComplete: () => void;
}

export default function Intro({ onComplete }: IntroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasRun, setHasRun] = useState(false);

  useLayoutEffect(() => {
    // Check if user already saw intro in current session
    const seen = sessionStorage.getItem('ikhwan_intro_seen');
    if (seen) {
      onComplete();
      setHasRun(true);
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: 'power3.out' },
      });

      // Background stars continuous float
      gsap.to('.stars-layer', { y: -120, duration: 20, repeat: -1, ease: 'none' });
      gsap.to('.stars-layer-2', { y: -220, duration: 12, repeat: -1, ease: 'none' });

      // Prepare SVG path stroke dashes
      const strokes = gsap.utils.toArray<SVGGeometryElement>('.logo-wing-stroke, .logo-body-stroke');
      strokes.forEach((el) => {
        const len = el.getTotalLength ? el.getTotalLength() : 800;
        gsap.set(el, { strokeDasharray: len, strokeDashoffset: len });
      });

      // Initial element states
      gsap.set(['.logo-svg', '.logo-wing-fill', '.logo-body-fill'], { opacity: 0 });
      gsap.set('.logo-svg', { opacity: 0, scale: 1 });
      gsap.set('.tito-text', { opacity: 1, y: 0, scale: 1, transformOrigin: '50% 50%' });
      gsap.set('.tito-letter', {
        opacity: 0,
        y: 14,
        x: 0,
        scaleX: 1,
        scaleY: 1,
        skewX: 0,
        filter: 'blur(7px)',
        transformOrigin: '50% 50%',
        willChange: 'transform, opacity, filter',
      });
      gsap.set('.tito-fill', { opacity: 0 });
      gsap.set('.subtitle', { opacity: 0, y: 16, filter: 'blur(7px)' });
      gsap.set(['.glitch-red', '.glitch-cyan', '.glitch-line'], { opacity: 0 });

      // 1. Logo reveals
      tl.to('.logo-svg', { opacity: 1, duration: 0.2, ease: 'power2.out' });
      tl.to('.logo-wing-stroke', { strokeDashoffset: 0, duration: 1.15, ease: 'power2.inOut' });
      tl.to('.logo-wing-fill', { opacity: 1, duration: 0.3, ease: 'power2.out' });
      tl.to('.logo-body-stroke', { strokeDashoffset: 0, duration: 1.35, ease: 'power2.inOut' }, '-=0.2');
      tl.to('.logo-body-fill', { opacity: 1, duration: 0.3, ease: 'power2.out' });

      // 2. Logo glow pulse
      tl.to('.logo-svg', {
        filter: 'brightness(1.14) drop-shadow(0 0 7px rgba(255,140,20,.25)) drop-shadow(0 0 18px rgba(255,100,0,.12))',
        duration: 0.5,
        ease: 'sine.inOut',
      }, '-=0.1');

      // 3. Letters entrance
      tl.to('.tito-letter', {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.24,
        stagger: { each: 0.075, from: 'center' },
        ease: 'expo.out',
      }, '-=0.08');

      // 4. Glitch jitter
      tl.to('.tito-letter', {
        x: (i) => (i % 2 === 0 ? -7 : 7),
        y: (i) => (i % 2 === 0 ? 2 : -2),
        skewX: (i) => (i % 2 === 0 ? -12 : 12),
        scaleX: (i) => (i % 2 === 0 ? 0.95 : 1.05),
        duration: 0.085,
        stagger: { each: 0.02, from: 'center' },
        ease: 'none',
      }, '-=0.1');

      tl.to('.tito-letter', {
        x: 0,
        y: 0,
        skewX: 0,
        scaleX: 1,
        duration: 0.14,
        stagger: { each: 0.025, from: 'center' },
        ease: 'power3.out',
      });

      // 5. Glitch color overlays
      tl.set(['.glitch-red', '.glitch-cyan', '.glitch-line'], { opacity: 1 }, '-=0.03');
      tl.to('.glitch-red', { x: -12, skewX: -18, opacity: 1, duration: 0.055, ease: 'none' }, '<');
      tl.to('.glitch-cyan', { x: 12, skewX: 18, opacity: 1, duration: 0.055, ease: 'none' }, '<');
      tl.to('.tito-text', { x: 3, skewX: -3, duration: 0.055, ease: 'none' }, '<');
      tl.to('.glitch-line', {
        opacity: 1,
        scaleX: 1.25,
        scaleY: 2,
        x: () => gsap.utils.random(-15, 15),
        y: () => gsap.utils.random(-8, 8),
        duration: 0.05,
        ease: 'none',
      }, '<');

      // 6. Orange fill reveal
      tl.set('.tito-fill', { opacity: 1, color: '#ff6a00', clipPath: 'inset(0 0% 0 0)' }, '<');
      tl.set('.tito-base', { opacity: 0 }, '<');
      tl.set(['.glitch-red', '.glitch-cyan', '.glitch-line'], { opacity: 0, x: 0, y: 0, skewX: 0, scaleX: 1, scaleY: 1 });

      // 7. Subtitle reveal
      tl.fromTo('.subtitle', { opacity: 0, y: 18, filter: 'blur(8px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.45, ease: 'power3.out' }, '-=0.02');

      // 8. Glow burst & transition sweep
      tl.to(['.logo-svg', '.tito-text'], { scale: 0.985, duration: 0.12, ease: 'power2.out' });
      tl.to(['.logo-svg', '.tito-text'], { scale: 1, duration: 0.18, ease: 'power2.out' });
      tl.to('.logo-glow', { scale: 1.7, opacity: 0.5, duration: 0.35, ease: 'power2.out' }, '<');
      tl.to('.logo-glow', { scale: 2.8, opacity: 0.8, duration: 0.35, ease: 'power3.in' });
      tl.to('.logo-glow', { scale: 7, opacity: 1, duration: 0.3, ease: 'expo.in' });

      gsap.set('.transition-wash', { autoAlpha: 0 });
      gsap.set('.transition-sweep', { autoAlpha: 0, xPercent: -160 });

      tl.to('.transition-wash', { autoAlpha: 1, duration: 0.12, ease: 'power1.out' }, '-=0.12');
      tl.to('.transition-sweep', { autoAlpha: 1, xPercent: 190, duration: 0.42, ease: 'power3.inOut' }, '<');

      tl.to(['.logo-svg', '.tito-text', '.subtitle'], { opacity: 0, scale: 0.985, y: -4, duration: 0.3, ease: 'power2.inOut' }, '<+=0.04');
      tl.to('.transition-wash', { autoAlpha: 0, duration: 0.22, ease: 'power2.out' }, '-=0.08');
      tl.to('.transition-sweep', { autoAlpha: 0, duration: 0.16, ease: 'power2.out' }, '-=0.16');

      tl.set(containerRef.current, { opacity: 0, pointerEvents: 'none' });

      tl.call(() => {
        sessionStorage.setItem('ikhwan_intro_seen', 'true');
        gsap.killTweensOf('.stars-layer');
        gsap.killTweensOf('.stars-layer-2');
        onComplete();
      });

      tl.play();
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  if (hasRun) return null;

  const letters = ['I', 'K', 'H', 'W', 'A', 'N'];

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] overflow-hidden bg-[#090909] flex items-center justify-center select-none"
    >
      <div className="absolute inset-0 bg-[#090909]" />
      <div className="aurora absolute inset-0 opacity-40" />
      <div className="stars-layer will-change-transform" />
      <div className="stars-layer-2 will-change-transform" />
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.2)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="logo-glow will-change-transform absolute w-[350px] h-[350px] rounded-full bg-orange-500/15 blur-[90px]" />

      <div className="relative z-20 flex flex-col items-center">
        {/* Futuristic SVG Logo */}
        <div className="relative">
          <svg
            style={{ opacity: 0 }}
            className="logo-svg will-change-transform w-[150px] md:w-[220px]"
            viewBox="0 0 600 600"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter id="intro-shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="12" stdDeviation="10" floodColor="#f25f00" floodOpacity="0.2" />
              </filter>
              <linearGradient id="intro-orange-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffb347" />
                <stop offset="50%" stopColor="#f25f00" />
                <stop offset="100%" stopColor="#731d00" />
              </linearGradient>
            </defs>
            <g filter="url(#intro-shadow)" fill="url(#intro-orange-grad)">
              {/* Outer chevron wings */}
              <path className="logo-wing-fill" d="M 80,130 Q 300,75 520,130 Q 300,110 80,130 Z" />
              <path
                className="logo-wing-stroke"
                fill="none"
                stroke="#ff8c00"
                strokeWidth="5"
                strokeLinecap="round"
                d="M 80,130 Q 300,75 520,130 Q 300,110 80,130 Z"
              />
              {/* Central crest */}
              <path
                className="logo-body-fill"
                d="M 100,170 Q 300,215 500,170 L 450,225 Q 350,250 350,260 L 350,470 Q 350,500 320,500 L 280,500 Q 250,500 250,470 L 250,260 Q 250,250 150,225 Z"
              />
              <path
                className="logo-body-stroke"
                fill="none"
                stroke="#ff8c00"
                strokeWidth="5"
                strokeLinecap="round"
                d="M 100,170 Q 300,215 500,170 L 450,225 Q 350,250 350,260 L 350,470 Q 350,500 320,500 L 280,500 Q 250,500 250,470 L 250,260 Q 250,250 150,225 Z"
              />
            </g>
          </svg>
        </div>

        {/* Glitch & Text */}
        <div className="relative inline-block mt-8 [perspective:3000px]">
          <div className="glitch-red absolute inset-0 pointer-events-none z-20 opacity-0 text-7xl md:text-[9rem] font-black tracking-[18px] uppercase text-red-500 mix-blend-screen will-change-transform">
            IKHWAN
          </div>
          <div className="glitch-cyan absolute inset-0 pointer-events-none z-20 opacity-0 text-7xl md:text-[9rem] font-black tracking-[18px] uppercase text-cyan-400 mix-blend-screen will-change-transform">
            IKHWAN
          </div>
          <div className="glitch-line absolute left-0 top-1/2 -translate-y-1/2 h-[2px] w-full bg-orange-300 pointer-events-none z-[50] opacity-0 origin-left shadow-[0_0_8px_rgba(255,140,40,.8)]" />
          <div className="glitch-line absolute left-0 top-[42%] h-[2px] w-full bg-white/60 pointer-events-none z-[50] opacity-0 origin-left shadow-[0_0_10px_rgba(0,240,255,.55)]" />
          <div className="glitch-line absolute left-0 top-[58%] h-[2px] w-full bg-red-500/60 pointer-events-none z-[50] opacity-0 origin-left shadow-[0_0_10px_rgba(255,0,70,.55)]" />

          <h1 className="tito-text will-change-transform opacity-0 text-7xl md:text-[9rem] font-black tracking-[18px] leading-none uppercase flex overflow-visible">
            {letters.map((char, idx) => (
              <span key={idx} className="tito-letter relative inline-block">
                <span className="tito-base block text-gray-200">{char}</span>
                <span className="tito-fill absolute inset-0 block text-orange-500 pointer-events-none will-change-[clip-path]">
                  {char}
                </span>
              </span>
            ))}
          </h1>
        </div>

        <p className="subtitle opacity-0 mt-5 text-orange-400 tracking-[6px] uppercase text-sm md:text-base font-mono">
          Full-Stack Developer
        </p>
      </div>

      {/* Sweep and wash effects */}
      <div className="transition-wash absolute inset-0 z-[99990] pointer-events-none opacity-0 bg-[radial-gradient(circle_at_50%_45%,rgba(249,115,22,0.28),transparent_55%),linear-gradient(115deg,rgba(249,115,22,0.18),transparent_70%)]" />
      <div className="transition-sweep absolute -inset-y-[35%] left-[-35%] w-[70%] rotate-[-12deg] z-[99995] pointer-events-none opacity-0 mix-blend-screen will-change-transform bg-[linear-gradient(90deg,transparent,rgba(249,115,22,0.85),rgba(255,255,255,0.75),rgba(249,115,22,0.85),transparent)]" />
    </div>
  );
}

