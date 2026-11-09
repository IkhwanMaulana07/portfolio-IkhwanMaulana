'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { ArrowRight, Github, Linkedin, Mail, FileText } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const contentRef = useRef<HTMLDivElement>(null);
  const heroCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = heroCardRef.current;
    const content = contentRef.current;
    if (!card || !content) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // Dramatic circular reveal & de-blur on card
      tl.fromTo(
        card,
        {
          opacity: 0,
          scale: 0.8,
          rotate: 6,
          filter: 'blur(30px)',
          clipPath: 'circle(0% at 50% 50%)',
          force3D: true,
        },
        {
          opacity: 1,
          scale: 1.04,
          rotate: -1.5,
          filter: 'blur(6px)',
          clipPath: 'circle(150% at 50% 50%)',
          duration: 1.6,
          ease: 'expo.out',
          force3D: true,
        }
      ).to(card, {
        scale: 1,
        rotate: 0,
        filter: 'blur(0px)',
        duration: 1.1,
        ease: 'power3.out',
        force3D: true,
      });

      // Content staggered entrance
      tl.fromTo(
        content,
        { opacity: 0, y: 40, filter: 'blur(12px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.3 },
        '-=1.4'
      );

      tl.from(
        Array.from(content.children),
        { y: 30, opacity: 0, stagger: 0.1, duration: 0.9, ease: 'power3.out' },
        '-=1.0'
      );

      // Continuous subtle ambient float
      gsap.to(card, {
        y: '+=10',
        duration: 3.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Parallax scroll
      gsap.to(card, {
        yPercent: -6,
        ease: 'none',
        scrollTrigger: {
          trigger: card,
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-[92vh] pt-32 pb-20 flex flex-col justify-center overflow-hidden"
    >
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/4 right-[5%] w-[45vw] h-[45vw] max-w-[550px] max-h-[550px] rounded-full bg-orange-600/10 blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 left-[-10%] w-[35vw] h-[35vw] max-w-[400px] max-h-[400px] rounded-full bg-orange-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column (7 Cols) */}
          <div ref={contentRef} className="lg:col-span-7 flex flex-col items-start">
            
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-gray-300 mb-6 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_8px_#ff5500] animate-pulse" />
              <span className="text-[11px] tracking-widest uppercase">ONLINE • AVAILABLE FOR WORK</span>
            </div>

            {/* Display Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black font-techno tracking-tight text-white mb-2 leading-[1.05]">
              Ikhwan Maulana
            </h1>

            {/* Sub-label & Role */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-6">
              <span className="font-techno text-xl sm:text-2xl font-bold text-orange-500 drop-shadow-[0_0_20px_rgba(255,100,0,0.5)]">
                [Full Stack Developer]
              </span>
              <span className="hidden sm:inline-block text-gray-600">•</span>
              <span className="font-techno text-xs sm:text-sm tracking-[0.25em] text-gray-400 uppercase font-semibold">
                SOFTWARE ENGINEER
              </span>
            </div>

            {/* Bio Description */}
            <p className="text-base sm:text-lg text-gray-300 mb-8 leading-relaxed max-w-2xl font-sans font-normal">
              Full Stack Developer &amp; Software Engineer with hands-on experience designing, building, and deploying end-to-end web applications with Go, PHP/Laravel, and React/Next.js. Certified by BNSP in Software Programming and Network Engineering.
            </p>

            {/* Social Links Row */}
            <div className="flex items-center gap-3 mb-8">
              <a
                href="https://github.com/IkhwanMaulana07"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-gray-400 hover:text-white flex items-center justify-center transition-all hover:border-orange-500/40 hover:shadow-[0_0_15px_rgba(255,100,0,0.2)]"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/in/ikhwan-maulana-1700b842b"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-gray-400 hover:text-white flex items-center justify-center transition-all hover:border-orange-500/40 hover:shadow-[0_0_15px_rgba(255,100,0,0.2)]"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:ikhwanmaulana796@gmail.com"
                className="w-10 h-10 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-gray-400 hover:text-white flex items-center justify-center transition-all hover:border-orange-500/40 hover:shadow-[0_0_15px_rgba(255,100,0,0.2)]"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <a
                href="#contact"
                className="btn-orange-glow w-full sm:w-auto text-sm uppercase tracking-wider"
              >
                <span>HIRE ME</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="/CV_Ikhwan_Maulana_FullStack_Developer.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-dark-glass w-full sm:w-auto text-sm uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4 text-orange-400" />
                <span>CURRICULUM VITAE</span>
              </a>
            </div>

          </div>

          {/* Right Column (5 Cols) — Glowing Hero Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div ref={heroCardRef} className="relative w-full max-w-[340px] sm:max-w-[400px]">
              
              {/* Backlight Glow Behind Card */}
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-600/30 to-amber-500/20 rounded-[32px] blur-2xl -z-10 transform scale-105 opacity-80" />

              {/* Main Photo Card Frame */}
              <div className="relative aspect-[4/5] w-full rounded-[28px] overflow-hidden border border-orange-500/30 bg-[#0A0A10] shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_40px_rgba(255,100,0,0.15)] group transition-transform duration-500 hover:scale-[1.02]">
                <Image
                  src="/ikhwan_studio_hero.png"
                  alt="Ikhwan Maulana - Full Stack Developer"
                  fill
                  priority
                  className="object-cover object-top filter grayscale contrast-110 brightness-95 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />

                {/* Subtle Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent opacity-85" />
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-transparent to-transparent opacity-50" />

                {/* Bottom Badge Tag */}
                <div className="absolute bottom-5 right-5 left-5 flex justify-between items-center">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/85 border border-orange-500/40 text-[10px] font-mono text-orange-400 backdrop-blur-md shadow-lg">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                    FULL STACK DEVELOPER
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
