'use client';

import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Systems() {
  const sectionRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  // 8 Slide refs
  const slide1Ref = useRef<HTMLDivElement>(null);
  const slide2Ref = useRef<HTMLDivElement>(null);
  const slide3Ref = useRef<HTMLDivElement>(null);
  const slide4Ref = useRef<HTMLDivElement>(null);
  const slide5Ref = useRef<HTMLDivElement>(null);
  const slide6Ref = useRef<HTMLDivElement>(null);
  const slide7Ref = useRef<HTMLDivElement>(null);
  const slide8Ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || !pillRef.current) return;

    const ctx = gsap.context(() => {
      const section = sectionRef.current!;
      const pill = pillRef.current!;

      const prepStrokes = (elements: Element[]) => {
        elements.forEach((el) => {
          const svgEl = el as SVGGeometryElement;
          const len = svgEl.getTotalLength ? svgEl.getTotalLength() : 400;
          gsap.set(svgEl, { strokeDasharray: len, strokeDashoffset: len });
        });
      };

      // Set initial states for all 8 slides
      const allSlides = [
        slide1Ref.current,
        slide2Ref.current,
        slide3Ref.current,
        slide4Ref.current,
        slide5Ref.current,
        slide6Ref.current,
        slide7Ref.current,
        slide8Ref.current,
      ].filter(Boolean) as HTMLElement[];

      allSlides.forEach((s) => {
        gsap.set(s, {
          opacity: 0,
          clipPath: 'inset(100% 0% 0% 0%)',
          z: -500,
          rotateX: 55,
          yPercent: 10,
          transformOrigin: '50% 100%',
          force3D: true,
          backfaceVisibility: 'hidden',
          pointerEvents: 'none',
        });
      });

      // Prepare SVGs
      prepStrokes(Array.from(pill.querySelectorAll('.draw-path, .craft-arrow, .craft-draw, .website-line, .website-draw, .webapp-draw, .system-draw, .crm-draw, .ai-draw, .final-draw')));

      // Scroll hint bounce
      gsap.to('.scroll-hint-arrow', {
        y: 6,
        opacity: 0.55,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Helper slide transitions
      const slideIn = (target: HTMLElement | null, duration = 0.9) => {
        const tl = gsap.timeline();
        if (!target) return tl;
        tl.set(target, { pointerEvents: 'auto' })
          .to(target, {
            opacity: 1,
            clipPath: 'inset(0% 0% 0% 0%)',
            z: 0,
            rotateX: 0,
            rotateY: 0,
            yPercent: 0,
            duration,
            ease: 'expo.out',
          });
        return tl;
      };

      const slideOut = (target: HTMLElement | null, rotateY = -18) => {
        const tl = gsap.timeline();
        if (!target) return tl;
        tl.to(target, {
          opacity: 0,
          clipPath: 'inset(100% 0 0 0)',
          z: -600,
          rotateY,
          rotateX: -16,
          yPercent: -8,
          duration: 0.8,
          ease: 'power4.inOut',
        }).set(target, { pointerEvents: 'none' });
        return tl;
      };

      // Master Timeline
      const master = gsap.timeline({ paused: true, defaults: { overwrite: 'auto' } });

      // Step 0: Expand pill to full screen
      master.to(section, { padding: 0, height: '100vh', minHeight: '100vh', duration: 0.7, ease: 'power3.inOut' }, 0);
      master.to(
        pill,
        {
          width: '100%',
          height: '100%',
          maxWidth: '100%',
          maxHeight: '100%',
          borderRadius: 0,
          borderWidth: 0,
          borderColor: 'transparent',
          duration: 0.7,
          ease: 'power3.inOut',
        },
        0
      );
      if (hintRef.current) {
        master.to(hintRef.current, { opacity: 0, y: 10, duration: 0.25, ease: 'power2.out' }, 0.03);
      }

      // Slide 1: I DON'T JUST BUILD
      const s1 = gsap.timeline();
      s1.add(slideIn(slide1Ref.current, 0.95));
      s1.to('.intro-text-item', { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, stagger: 0.08, ease: 'expo.out' }, '<+=0.08');
      s1.to('.draw-path', { strokeDashoffset: 0, duration: 0.9, ease: 'power3.out' }, '<+=0.1');
      s1.to('.intro-orange-word', { color: '#ffffff', duration: 0.35, ease: 'power2.inOut' }, '+=0.1');
      s1.to('.intro-orange-word', { color: '#f97316', scaleX: 1.08, duration: 0.4, ease: 'power2.out' });
      s1.to({}, { duration: 0.35 });
      s1.add(slideOut(slide1Ref.current, 12));
      master.add(s1);

      // Slide 2: PROCESS / DELIVERY (IDEAS -> CODE)
      const s2 = gsap.timeline();
      s2.to(pill, { backgroundColor: 'rgba(249,115,22,0.08)', duration: 0.55, ease: 'power2.inOut' }, 0);
      s2.to('.craft-orb', { opacity: 0.9, scale: 1, duration: 0.8, ease: 'power3.out' }, 0);
      s2.add(slideIn(slide2Ref.current, 0.95), 0.05);
      s2.to('.craft-draw', { strokeDashoffset: 0, duration: 0.8, stagger: 0.16, ease: 'power3.out' }, '<+=0.08');
      s2.to('.craft-arrow', { strokeDashoffset: 0, duration: 1.1, ease: 'power4.inOut' }, '<+=0.15');
      s2.fromTo('.craft-arrow-head', { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.35, ease: 'back.out(2)' }, '-=0.2');
      s2.to({}, { duration: 0.5 });
      s2.add(slideOut(slide2Ref.current, -18));
      s2.to(pill, { backgroundColor: '#000000', duration: 0.75, ease: 'power3.inOut' }, '<+=0.05');
      s2.to('.craft-orb', { opacity: 0, scale: 1.4, duration: 0.65, ease: 'power3.inOut' }, '<');
      master.add(s2);

      // Slide 3: WEBSITES
      const s3 = gsap.timeline();
      s3.add(slideIn(slide3Ref.current, 0.95));
      s3.to('.website-draw', { strokeDashoffset: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }, '<+=0.05');
      s3.to('.website-line', { strokeDashoffset: 0, duration: 0.8, ease: 'power3.out' }, '<+=0.08');
      s3.to('.website-word-highlight', { color: '#f97316', scaleX: 1.06, duration: 0.35, ease: 'power2.out' }, '-=0.2');
      s3.to({}, { duration: 0.35 });
      s3.add(slideOut(slide3Ref.current, -35));
      master.add(s3);

      // Slide 4: WEB APPS
      const s4 = gsap.timeline();
      s4.add(slideIn(slide4Ref.current, 0.95));
      s4.to('.webapp-draw', { strokeDashoffset: 0, duration: 0.75, stagger: 0.1, ease: 'power3.out' }, '<+=0.05');
      s4.to('.webapp-ring', { strokeDashoffset: 0, rotate: 360, duration: 1.2, transformOrigin: '50% 50%', ease: 'power2.out' }, '<+=0.08');
      s4.to('.webapp-highlight', { color: '#ffffff', duration: 0.25 }, '-=0.2');
      s4.to('.webapp-highlight', { color: '#f97316', duration: 0.35 });
      s4.to({}, { duration: 0.35 });
      s4.add(slideOut(slide4Ref.current, 18));
      master.add(s4);

      // Slide 5: CORE SYSTEMS (NODE NETWORK)
      const s5 = gsap.timeline();
      s5.add(slideIn(slide5Ref.current, 0.95));
      s5.to('.system-draw', { strokeDashoffset: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out' }, '<+=0.05');
      s5.to('.system-node', { scale: 1.4, duration: 0.35, stagger: 0.08, repeat: 1, yoyo: true, ease: 'sine.inOut' }, '<+=0.2');
      s5.to('.systems-highlight', { color: '#f97316', duration: 0.35 });
      s5.to({}, { duration: 0.35 });
      s5.add(slideOut(slide5Ref.current, -20));
      master.add(s5);

      // Slide 6: CRM MANAGEMENT SYSTEM
      const s6 = gsap.timeline();
      s6.add(slideIn(slide6Ref.current, 0.95));
      s6.to('.crm-draw', { strokeDashoffset: 0, duration: 1.1, ease: 'power3.out' }, '<+=0.08');
      s6.to('.crm-dot', { scale: 1.5, duration: 0.35, stagger: 0.1, repeat: 1, yoyo: true }, '<+=0.2');
      s6.to('.crm-highlight', { color: '#f97316', duration: 0.35, ease: 'power2.out' });
      s6.to({}, { duration: 0.55 });
      s6.add(slideOut(slide6Ref.current, 22));
      master.add(s6);

      // Slide 7: INTELLIGENCE IN MOTION
      const s7 = gsap.timeline();
      s7.add(slideIn(slide7Ref.current, 0.95));
      s7.to('.ai-draw', { strokeDashoffset: 0, duration: 0.85, stagger: 0.08, ease: 'power3.out' }, '<+=0.08');
      s7.to('.ai-circle', { scale: 1.2, duration: 0.45, stagger: 0.08, repeat: 1, yoyo: true, ease: 'back.out(2)' }, '<+=0.1');
      s7.to('.ai-highlight', { color: '#f97316', duration: 0.35 });
      s7.to({}, { duration: 0.55 });
      s7.add(slideOut(slide7Ref.current, -18));
      master.add(s7);

      // Slide 8: DIGITAL SYSTEMS (FINAL)
      const s8 = gsap.timeline();
      s8.add(slideIn(slide8Ref.current, 1));
      s8.to('.final-draw', { strokeDashoffset: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out' }, '<+=0.05');
      s8.to('.final-highlight', { color: '#ffffff', scaleX: 0.96, duration: 0.3 });
      s8.to('.final-highlight', { color: '#f97316', scaleX: 1.04, duration: 0.4, ease: 'power2.out' });
      s8.to({}, { duration: 0.6 });
      master.add(s8);

      // Background ambient parallax movements
      master.to('.systems-grid', { backgroundPosition: '120px 80px', duration: 2, ease: 'none' }, 0);
      master.to('.systems-orb-left', { x: 180, y: -120, duration: 2, ease: 'none' }, 0);
      master.to('.systems-orb-right', { x: -160, y: 100, duration: 2, ease: 'none' }, 0);

      // Connect to ScrollTrigger Pin
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '+=6200',
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        scrub: 0.5,
        animation: master,
        invalidateOnRefresh: true,
        fastScrollEnd: false,
        onEnterBack: () => {
          gsap.set(section, { padding: 0, minHeight: '100vh', height: '100vh' });
          gsap.set(pill, {
            width: '100%',
            height: '100%',
            maxWidth: '100%',
            maxHeight: '100%',
            borderRadius: 0,
            borderWidth: 0,
            borderColor: 'transparent',
            backgroundColor: '#000000',
          });
          if (hintRef.current) gsap.set(hintRef.current, { autoAlpha: 0 });
        },
        onLeave: () => {
          gsap.set(pill, {
            borderWidth: 1,
            borderColor: 'rgba(249,115,22,.45)',
            boxShadow: 'inset 0 0 0 1px rgba(249,115,22,.15), 0 0 45px rgba(249,115,22,.08)',
          });
          if (hintRef.current) gsap.set(hintRef.current, { autoAlpha: 0 });
        },
        onLeaveBack: () => {
          gsap.set(section, { padding: '1.75rem', minHeight: '100vh', height: 'auto' });
          gsap.set(pill, {
            width: '100%',
            height: '3.5rem',
            maxWidth: '80rem',
            maxHeight: '4rem',
            borderRadius: '9999px',
            borderWidth: 1,
            borderColor: 'rgba(249,115,22,.25)',
            backgroundColor: '#000000',
          });
          if (hintRef.current) gsap.set(hintRef.current, { autoAlpha: 1 });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="systems"
      ref={sectionRef}
      className="relative min-h-screen w-full p-7 md:p-10 overflow-hidden bg-transparent text-white flex items-center justify-center select-none"
    >
      <div
        ref={pillRef}
        className="relative w-full max-w-7xl h-14 md:h-16 rounded-full border border-orange-500/25 overflow-hidden bg-black transition-all duration-300"
      >
        {/* Scroll To Play Hint */}
        <div
          ref={hintRef}
          className="absolute inset-0 z-[50] pointer-events-none flex items-center justify-center gap-3 text-gray-300"
        >
          <svg className="scroll-hint-icon scroll-hint-arrow w-5 h-7 md:w-6 md:h-8 shrink-0" viewBox="0 0 24 32" fill="none" aria-hidden="true">
            <rect x="4" y="2" width="16" height="28" rx="8" stroke="currentColor" strokeWidth="1.5" className="text-orange-500" />
            <path d="M12 7V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="scroll-draw text-orange-500" />
            <path d="M9 18L12 21L15 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="scroll-draw text-gray-400" />
          </svg>
          <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.35em] whitespace-nowrap font-mono">
            Scroll to play
          </span>
        </div>

        {/* Ambient Atmospheric Orbs */}
        <div className="systems-orb-left absolute left-[-15%] top-[15%] w-[45vw] h-[45vw] max-w-[520px] max-h-[520px] rounded-full bg-orange-500/10 blur-[140px] pointer-events-none" />
        <div className="systems-orb-right absolute right-[-15%] bottom-[5%] w-[42vw] h-[42vw] max-w-[480px] max-h-[480px] rounded-full bg-red-500/10 blur-[140px] pointer-events-none" />
        <div className="craft-orb absolute left-1/2 top-1/2 w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/[0.09] blur-[130px] opacity-0 pointer-events-none" />
        <div className="systems-grid absolute inset-0 opacity-[0.045] pointer-events-none bg-[linear-gradient(rgba(255,255,255,.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.2)_1px,transparent_1px)] bg-[size:80px_80px]" />

        {/* Container for the 8 Slides */}
        <div className="relative z-10 w-full h-full mx-auto px-5 sm:px-8 md:px-12 lg:px-16">

          {/* SLIDE 1: I DON'T JUST BUILD */}
          <div ref={slide1Ref} className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <p className="intro-text-item text-[10px] sm:text-xs md:text-base uppercase tracking-[0.3em] md:tracking-[0.45em] text-orange-400 mb-5 md:mb-8 font-mono">
              More than websites
            </p>
            <h2 className="intro-text-item font-techno font-black leading-[0.85] tracking-[-0.04em] whitespace-nowrap text-[clamp(2.4rem,8vw,6.5rem)]">
              I DON&apos;T JUST
            </h2>
            <div className="intro-text-item relative mt-2 md:mt-3">
              <h2 className="font-techno text-[clamp(2.6rem,9vw,6.5rem)] font-black leading-[0.85] tracking-[-0.04em] text-orange-500">
                <span className="intro-orange-word">BUILD.</span>
              </h2>
              <svg className="absolute left-1/2 -bottom-5 md:-bottom-7 -translate-x-1/2 w-[70%] h-4 md:h-6 overflow-visible" viewBox="0 0 300 20" fill="none">
                <path className="draw-path" d="M5 14C80 2 190 2 295 13" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
            <p className="intro-text-item mt-9 md:mt-12 max-w-2xl text-xs md:text-sm lg:text-base text-gray-400 tracking-[0.08em] leading-7 font-sans">
              I design digital experiences that become useful products, connected workflows, and systems that actually move a business forward.
            </p>
          </div>

          {/* SLIDE 2: PROCESS / DELIVERY */}
          <div ref={slide2Ref} className="absolute inset-0 flex items-center justify-center text-center px-5">
            <div className="relative w-full max-w-5xl">
              <span className="block text-[9px] md:text-xs tracking-[0.35em] uppercase text-gray-300/70 font-mono">
                PROCESS / DELIVERY
              </span>
              <h3 className="mt-4 md:mt-6 text-[clamp(2.2rem,7vw,5.2rem)] font-black leading-[0.9] tracking-[-0.04em] font-techno">
                <span className="craft-highlight text-orange-500">IDEAS</span>
                <span className="mx-3 md:mx-6 text-orange-500">→</span>
                <span>CODE</span>
              </h3>
              <p className="mt-6 md:mt-8 max-w-3xl mx-auto text-xs md:text-base text-gray-300/75 leading-6 md:leading-8 font-sans">
                I translate business intent into clean architecture, reliable implementation, and production-ready systems.
                <span className="text-white font-semibold"> Every decision has a purpose.</span>
              </p>
              <div className="flex items-center justify-center my-8 md:my-10">
                <svg viewBox="0 0 500 80" className="w-[60vw] max-w-[420px] h-auto overflow-visible" fill="none">
                  <path className="craft-arrow" d="M15 40C120 40 220 40 390 40" stroke="#f97316" strokeWidth="2" strokeLinecap="round" />
                  <path className="craft-arrow-head" d="M390 40L360 18M390 40L360 62" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="grid grid-cols-3 gap-3 md:gap-8 max-w-3xl mx-auto">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl border border-orange-500/20 bg-orange-500/[0.04] flex items-center justify-center">
                    <svg className="craft-icon w-6 h-6 md:w-8 md:h-8" viewBox="0 0 40 40" fill="none">
                      <path className="craft-draw" d="M20 5C12 5 7 10 7 17C7 22 10 25 13 28V34H27V28C30 25 33 22 33 17C33 10 28 5 20 5Z" stroke="#f97316" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      <path className="craft-draw" d="M14 34H26M16 38H24" stroke="#f97316" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  </div>
                  <span className="text-[9px] md:text-xs tracking-[0.3em] uppercase text-gray-400 font-mono">Concept</span>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl border border-orange-500/20 bg-orange-500/[0.04] flex items-center justify-center">
                    <svg className="craft-icon w-6 h-6 md:w-8 md:h-8" viewBox="0 0 40 40" fill="none">
                      <path className="craft-draw" d="M14 10L6 20L14 30" stroke="#f97316" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      <path className="craft-draw" d="M26 10L34 20L26 30" stroke="#f97316" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      <path className="craft-draw" d="M23 6L17 34" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" />
                    </svg>
                  </div>
                  <span className="text-[9px] md:text-xs tracking-[0.3em] uppercase text-gray-400 font-mono">Build</span>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl border border-orange-500/20 bg-orange-500/[0.04] flex items-center justify-center">
                    <svg className="craft-icon w-6 h-6 md:w-8 md:h-8" viewBox="0 0 40 40" fill="none">
                      <path className="craft-draw" d="M20 5L24 15L35 20L24 25L20 35L16 25L5 20L16 15L20 5Z" stroke="#f97316" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                      <path className="craft-draw" d="M29 7V11M27 9H31" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                  <span className="text-[9px] md:text-xs tracking-[0.3em] uppercase text-gray-400 font-mono">Ship</span>
                </div>
              </div>
            </div>
          </div>

          {/* SLIDE 3: 01 / WEBSITES */}
          <div ref={slide3Ref} className="absolute inset-0 flex items-center justify-center text-center px-5">
            <div className="relative w-full max-w-6xl">
              <span className="block text-[9px] md:text-xs tracking-[0.35em] uppercase text-gray-500 font-mono">
                01 / DIGITAL EXPERIENCE
              </span>
              <div className="relative mt-4 md:mt-6">
                <h3 className="text-[clamp(2.8rem,9.5vw,7rem)] font-black leading-[0.85] tracking-[-0.04em] whitespace-nowrap font-techno">
                  WEB<span className="website-word-highlight text-orange-500">SITES</span>
                </h3>
                <svg className="absolute -bottom-5 md:-bottom-8 left-1/2 -translate-x-1/2 w-[70%] h-5 md:h-8" viewBox="0 0 400 30" fill="none">
                  <path className="website-line" d="M10 15C100 4 300 4 390 15" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>
              <p className="mt-10 md:mt-14 text-xs md:text-base text-gray-400 tracking-[0.08em] leading-7 max-w-2xl mx-auto font-sans">
                Interfaces built to communicate, <span className="text-gray-200 font-semibold">convert attention</span>, and make a product feel as strong as the technology behind it.
              </p>
              <div className="mt-8 md:mt-10 flex justify-center gap-5 md:gap-9">
                <svg className="w-8 h-8 md:w-12 md:h-12" viewBox="0 0 48 48" fill="none">
                  <rect className="website-draw" x="5" y="8" width="38" height="30" rx="4" stroke="#f97316" strokeWidth="1.7" />
                  <path className="website-draw" d="M5 16H43" stroke="#f97316" strokeWidth="1.7" />
                  <circle className="website-draw" cx="11" cy="12" r="1.5" stroke="#fff" strokeWidth="1.3" />
                  <circle className="website-draw" cx="16" cy="12" r="1.5" stroke="#fff" strokeWidth="1.3" />
                </svg>
                <svg className="w-8 h-8 md:w-12 md:h-12" viewBox="0 0 48 48" fill="none">
                  <rect className="website-draw" x="13" y="5" width="22" height="38" rx="4" stroke="#f97316" strokeWidth="1.7" />
                  <path className="website-draw" d="M20 38H28" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
                <svg className="w-8 h-8 md:w-12 md:h-12" viewBox="0 0 48 48" fill="none">
                  <circle className="website-draw" cx="24" cy="24" r="17" stroke="#f97316" strokeWidth="1.7" />
                  <path className="website-draw" d="M7 24H41M24 7C30 13 30 35 24 41M24 7C18 13 18 35 24 41" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </div>

          {/* SLIDE 4: 02 / WEB APPS */}
          <div ref={slide4Ref} className="absolute inset-0 flex items-center justify-center text-center px-5">
            <div className="relative w-full max-w-5xl">
              <span className="block text-[9px] md:text-xs tracking-[0.35em] uppercase text-gray-500 font-mono">
                02 / APPLICATION
              </span>
              <h3 className="mt-5 text-[clamp(2.7rem,9vw,7rem)] font-black leading-[0.85] tracking-[-0.04em] font-techno">
                <span className="webapp-highlight text-orange-500">WEB</span> APPS
              </h3>
              <p className="mt-7 max-w-2xl mx-auto text-xs md:text-base text-gray-400 leading-7 font-sans">
                From dashboards to complex workflows, <span className="text-gray-200 font-semibold">every interaction is designed around real business action.</span>
              </p>
              <div className="relative mt-9 md:mt-12 mx-auto w-[min(78vw,500px)] aspect-[16/8] border border-white/10 rounded-2xl bg-white/[0.02] overflow-hidden">
                <svg viewBox="0 0 560 280" className="absolute inset-0 w-full h-full" fill="none">
                  <circle className="webapp-ring" cx="280" cy="140" r="42" stroke="#f97316" strokeWidth="2" />
                  <path className="webapp-draw" d="M280 98V60M280 182V220M238 140H200M322 140H360" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" />
                  <path className="webapp-draw" d="M250 110L215 75M310 110L345 75M250 170L215 205M310 170L345 205" stroke="rgba(255,255,255,.55)" strokeWidth="1.5" strokeLinecap="round" />
                  <rect className="webapp-draw" x="240" y="100" width="80" height="80" rx="16" stroke="#f97316" strokeWidth="1.3" />
                  <path className="webapp-draw" d="M260 135L275 150L300 125" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>

          {/* SLIDE 5: CORE SYSTEMS */}
          <div ref={slide5Ref} className="absolute inset-0 flex items-center justify-center text-center px-5">
            <div className="relative w-full max-w-5xl">
              <svg viewBox="0 0 700 420" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[82vw] max-w-[620px] h-auto pointer-events-none" fill="none">
                <path className="system-draw" d="M350 210H100" stroke="rgba(249,115,22,.65)" strokeWidth="1.5" />
                <path className="system-draw" d="M350 210H600" stroke="rgba(249,115,22,.65)" strokeWidth="1.5" />
                <path className="system-draw" d="M350 210L180 70" stroke="rgba(255,255,255,.22)" strokeWidth="1.2" />
                <path className="system-draw" d="M350 210L520 70" stroke="rgba(255,255,255,.22)" strokeWidth="1.2" />
                <path className="system-draw" d="M350 210L180 350" stroke="rgba(255,255,255,.22)" strokeWidth="1.2" />
                <path className="system-draw" d="M350 210L520 350" stroke="rgba(255,255,255,.22)" strokeWidth="1.2" />
                <circle className="system-node" cx="100" cy="210" r="6" fill="#f97316" />
                <circle className="system-node" cx="600" cy="210" r="6" fill="#f97316" />
                <circle className="system-node" cx="180" cy="70" r="5" fill="#fff" />
                <circle className="system-node" cx="520" cy="70" r="5" fill="#fff" />
                <circle className="system-node" cx="180" cy="350" r="5" fill="#fff" />
                <circle className="system-node" cx="520" cy="350" r="5" fill="#fff" />
              </svg>
              <div className="relative z-10 mx-auto w-24 h-24 md:w-32 md:h-32 rounded-full border border-orange-500/50 flex items-center justify-center bg-black/70 shadow-[0_0_50px_rgba(249,115,22,.2)]">
                <div className="absolute inset-3 md:inset-4 rounded-full border border-orange-500/20" />
                <span className="text-lg md:text-2xl font-black text-orange-500 font-techno">CORE</span>
              </div>
              <h3 className="mt-20 md:mt-28 text-[clamp(2.6rem,9vw,6.5rem)] font-black leading-[0.85] tracking-[-0.04em] font-techno">
                <span className="systems-highlight text-orange-500">SYSTEMS</span>
              </h3>
              <p className="mt-5 max-w-2xl mx-auto text-xs md:text-base text-gray-400 leading-7 font-sans">
                Websites are only one layer. <span className="text-gray-200 font-semibold">I connect interfaces, data, logic, users, and automation into one coherent digital architecture.</span>
              </p>
            </div>
          </div>

          {/* SLIDE 6: CRM MANAGEMENT SYSTEM */}
          <div ref={slide6Ref} className="absolute inset-0 flex items-center justify-center px-4 md:px-8">
            <div className="w-full max-w-4xl rounded-2xl md:rounded-3xl border border-white/10 bg-white/[0.035] backdrop-blur-xl overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between px-4 md:px-7 py-4 border-b border-white/10">
                <div>
                  <span className="text-orange-500 font-black text-sm md:text-base font-techno">ENTERPRISE</span>
                  <span className="ml-2 md:ml-3 text-[9px] md:text-xs text-gray-400 font-mono">MANAGEMENT SYSTEM</span>
                </div>
                <span className="text-[9px] md:text-xs text-green-400 font-mono font-semibold">● ONLINE</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 p-4 md:p-6">
                <div className="rounded-xl border border-white/10 p-4 md:p-5 bg-black/30">
                  <p className="text-[9px] md:text-xs text-gray-400 font-mono">ACTIVE SESSIONS</p>
                  <p className="mt-2 text-2xl md:text-3xl font-bold font-techno text-white">1,240+</p>
                </div>
                <div className="rounded-xl border border-white/10 p-4 md:p-5 bg-black/30">
                  <p className="text-[9px] md:text-xs text-gray-400 font-mono">THROUGHPUT</p>
                  <p className="mt-2 text-2xl md:text-3xl font-bold font-techno crm-highlight text-orange-500">&lt; 1ms</p>
                </div>
                <div className="rounded-xl border border-white/10 p-4 md:p-5 bg-black/30">
                  <p className="text-[9px] md:text-xs text-gray-400 font-mono">UPTIME</p>
                  <p className="mt-2 text-2xl md:text-3xl font-bold font-techno text-white">99.98%</p>
                </div>
              </div>
              <div className="mx-4 md:mx-6 mb-4 md:mb-6 h-32 md:h-40 rounded-xl border border-white/10 bg-black/20 overflow-hidden relative">
                <svg viewBox="0 0 700 160" className="w-full h-full" preserveAspectRatio="none" fill="none">
                  <path className="crm-draw" d="M0 130C70 118 90 120 150 105C220 88 245 112 300 80C355 48 390 70 440 55C500 38 535 58 580 35C625 15 655 25 700 10" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" />
                  <circle className="crm-dot" cx="150" cy="105" r="4.5" fill="#f97316" />
                  <circle className="crm-dot" cx="300" cy="80" r="4.5" fill="#f97316" />
                  <circle className="crm-dot" cx="440" cy="55" r="4.5" fill="#f97316" />
                  <circle className="crm-dot" cx="580" cy="35" r="4.5" fill="#f97316" />
                  <circle className="crm-dot" cx="700" cy="10" r="4.5" fill="#fff" />
                </svg>
              </div>
              <div className="mx-4 md:mx-6 mb-5 md:mb-6 min-h-16 md:h-20 rounded-xl border border-white/10 flex items-center px-4 md:px-5">
                <div className="w-2.5 h-2.5 rounded-full bg-orange-500 mr-4 shrink-0 animate-ping" />
                <span className="text-[10px] md:text-sm text-gray-300 leading-5 font-mono">
                  Real-time telemetry • Go REST APIs • Resilient database transactions
                </span>
              </div>
            </div>
          </div>

          {/* SLIDE 7: INTELLIGENCE IN MOTION */}
          <div ref={slide7Ref} className="absolute inset-0 flex items-center justify-center text-center px-5">
            <div className="relative w-full max-w-5xl">
              <svg viewBox="0 0 700 400" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[82vw] max-w-[620px] h-auto" fill="none">
                <path className="ai-draw" d="M350 200L180 80L100 180L190 300L350 200" stroke="rgba(249,115,22,.4)" strokeWidth="1.2" />
                <path className="ai-draw" d="M350 200L520 80L600 180L510 300L350 200" stroke="rgba(249,115,22,.4)" strokeWidth="1.2" />
                <path className="ai-draw" d="M180 80L520 80M100 180L600 180M190 300L510 300" stroke="rgba(255,255,255,.15)" strokeWidth="1" />
                <circle className="ai-circle" cx="350" cy="200" r="65" stroke="#f97316" strokeWidth="1.5" />
                <circle className="ai-circle" cx="180" cy="80" r="5" fill="#f97316" />
                <circle className="ai-circle" cx="520" cy="80" r="5" fill="#f97316" />
                <circle className="ai-circle" cx="100" cy="180" r="4" fill="#fff" />
                <circle className="ai-circle" cx="600" cy="180" r="4" fill="#fff" />
                <circle className="ai-circle" cx="190" cy="300" r="5" fill="#f97316" />
                <circle className="ai-circle" cx="510" cy="300" r="5" fill="#f97316" />
              </svg>
              <div className="relative z-10 mx-auto w-28 h-28 md:w-40 md:h-40 rounded-full border border-orange-500/40 bg-black/60 flex items-center justify-center shadow-[0_0_70px_rgba(249,115,22,.2)]">
                <div className="absolute inset-3 md:inset-5 rounded-full border border-orange-500/20" />
                <div className="absolute inset-8 md:inset-12 rounded-full border border-orange-500/30" />
                <span className="text-xl md:text-3xl font-black ai-highlight text-orange-500 font-techno">AI</span>
              </div>
              <h3 className="mt-20 md:mt-32 text-[clamp(2.3rem,6vw,4.3rem)] font-black leading-[0.9] tracking-[-0.04em] font-techno">
                INTELLIGENCE<br />
                <span className="text-orange-500">IN MOTION.</span>
              </h3>
              <p className="mt-5 max-w-2xl mx-auto text-xs md:text-base text-gray-400 leading-7 font-sans">
                AI becomes useful when it connects to the system around it.
                <span className="text-gray-200 font-semibold"> Automation, decision support, intelligent workflows, and real integrations.</span>
              </p>
            </div>
          </div>

          {/* SLIDE 8: DIGITAL SYSTEMS (FINAL) */}
          <div ref={slide8Ref} className="absolute inset-0 flex flex-col items-center justify-center text-center px-5">
            <p className="text-[10px] md:text-base uppercase tracking-[0.35em] md:tracking-[0.5em] text-gray-500 mb-6 md:mb-8 font-mono">
              That&apos;s what I build
            </p>
            <h3 className="text-[clamp(3.3rem,12vw,9rem)] font-black leading-[0.82] tracking-[-0.04em] font-techno">
              DIGITAL<br />
              <span className="final-highlight text-orange-500 inline-block">SYSTEMS.</span>
            </h3>
            <p className="mt-8 md:mt-10 max-w-2xl text-[10px] md:text-sm text-gray-400 tracking-[0.2em] md:tracking-[0.35em] leading-6 font-mono">
              WEB APPS • CRM • AI • AUTOMATION
            </p>
            <p className="mt-5 max-w-xl text-xs md:text-base text-gray-300 leading-6 md:leading-7 font-sans">
              Not isolated pages. <span className="text-white font-semibold">Connected experiences.</span><br />
              Not just features. <span className="text-orange-500 font-semibold">Complete systems.</span>
            </p>
            <svg className="mt-8 md:mt-10 w-24 md:w-36 h-5" viewBox="0 0 140 20" fill="none">
              <path className="final-draw" d="M5 10H135" stroke="#f97316" strokeWidth="1.8" strokeLinecap="round" />
              <path className="final-draw" d="M120 4L135 10L120 16" stroke="#f97316" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

        </div>
      </div>
    </section>
  );
}
