'use client';

import React, { useRef, useLayoutEffect } from 'react';
import Image from 'next/image';
import { Linkedin, Github, Mail, Phone, Code2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Typewriter from './Typewriter';
import { usePortfolio } from '../context/PortfolioContext';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const contentRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const { t } = usePortfolio();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Content staggered entrance
      if (contentRef.current) {
        gsap.from(contentRef.current.children, {
          y: 40,
          opacity: 0,
          filter: 'blur(8px)',
          stagger: 0.1,
          duration: 1,
          ease: 'power3.out',
        });
      }

      // 3D Card circular entrance & float
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          {
            clipPath: 'circle(0% at 50% 50%)',
            scale: 0.85,
            rotate: 4,
            filter: 'blur(20px)',
          },
          {
            clipPath: 'circle(150% at 50% 50%)',
            scale: 1,
            rotate: 0,
            filter: 'blur(0px)',
            duration: 1.6,
            ease: 'expo.out',
            delay: 0.2,
          }
        );

        // Continuous subtle float
        gsap.to(cardRef.current, {
          y: '+=8',
          rotationZ: '-=0.5',
          duration: 3.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });

        // Parallax scroll scrub
        gsap.to(cardRef.current, {
          yPercent: -8,
          ease: 'none',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top center',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="home" className="relative pt-24 pb-12 md:py-28 overflow-visible px-4 sm:px-6 md:px-10">
      <div className="relative overflow-visible flex flex-col-reverse lg:flex-row items-center justify-between gap-10 lg:gap-20 xl:gap-32 w-full max-w-7xl mx-auto">
        
        {/* Right Ambient Radial Blur */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-orange-500/20 blur-[140px] sm:blur-[180px] rounded-full pointer-events-none" />

        {/* Left Column: Identity, Typewriter, Socials & CTAs */}
        <div ref={contentRef} className="flex flex-col z-10 text-white w-full lg:w-[60%] text-left items-start">
          <p className="text-gray-400 text-base sm:text-lg md:text-xl font-medium tracking-wide">
            {t.hero.greeting}
          </p>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-orange-500 tracking-wide leading-tight sm:leading-none mt-2 font-techno break-words max-w-full">
            {t.hero.name}
          </h1>

          <h2 className="text-lg sm:text-2xl text-gray-300 font-semibold mt-1 sm:mt-2">
            (Ikhwan)
          </h2>

          {/* Typewriter Display */}
          <div className="mt-3 min-h-[50px] sm:min-h-[55px] w-full max-w-[550px]">
            <Typewriter
              words={t.hero.typewriterRoles}
              typingSpeed={80}
              deletingSpeed={40}
              pauseTime={1800}
              className="text-lg sm:text-2xl lg:text-3xl font-semibold text-gray-200"
            />
          </div>

          <p className="text-gray-400 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl mt-3">
            {t.hero.tagline}
          </p>

          {/* Social Links with exact orange color */}
          <div className="flex items-center gap-3 sm:gap-4 mt-5 sm:mt-6 flex-wrap">
            <a
              href="https://www.linkedin.com/in/ikhwan-maulana-22b9b4229/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#ff6000] hover:text-white hover:bg-orange-500 hover:border-orange-500 transition-all duration-300 hover:scale-110 shadow-lg min-w-[40px] min-h-[40px]"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://github.com/IkhwanMaulana07"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#ff6000] hover:text-white hover:bg-orange-500 hover:border-orange-500 transition-all duration-300 hover:scale-110 shadow-lg min-w-[40px] min-h-[40px]"
              aria-label="GitHub Profile"
            >
              <Github size={20} />
            </a>
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#ff6000] hover:text-white hover:bg-orange-500 hover:border-orange-500 transition-all duration-300 hover:scale-110 shadow-lg min-w-[40px] min-h-[40px]"
              aria-label="WhatsApp Contact"
            >
              <Phone size={20} />
            </a>
            <a
              href="mailto:ikhwanmaulana0707@gmail.com"
              className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#ff6000] hover:text-white hover:bg-orange-500 hover:border-orange-500 transition-all duration-300 hover:scale-110 shadow-lg min-w-[40px] min-h-[40px]"
              aria-label="Email Me"
            >
              <Mail size={20} />
            </a>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 sm:gap-4 mt-6 sm:mt-8 flex-wrap">
            <a
              href="#contact"
              className="bg-gradient-to-r from-[#FA6E00] to-[#E60026] text-white py-2.5 sm:py-3 px-6 sm:px-7 rounded-xl font-semibold text-xs sm:text-sm shadow-[0_0_20px_rgba(250,110,0,0.5)] hover:scale-105 transition-all duration-300 min-h-[44px] flex items-center justify-center"
            >
              {t.hero.hireMe}
            </a>
            <a
              href="/CV_Ikhwan_Maulana_FullStack_Developer.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-gray-600 text-gray-300 font-semibold py-2.5 sm:py-3 px-6 sm:px-7 rounded-xl text-xs sm:text-sm hover:bg-white/10 hover:border-gray-400 hover:text-white transition-all duration-300 min-h-[44px] flex items-center justify-center"
            >
              {t.hero.downloadCv}
            </a>
          </div>
        </div>

        {/* Right Column: 3D Photo with Perspective & Hover Borders */}
        <div className="relative z-10 lg:w-[40%] flex justify-center max-w-full">
          <div ref={cardRef} className="relative group w-fit [perspective:1200px] max-w-full">
            {/* Background offset card */}
            <div className="absolute inset-0 translate-x-3 translate-y-3 sm:translate-x-4 sm:translate-y-4 rounded-3xl border border-orange-500/30 bg-orange-500/5 -z-10 transition-transform duration-500 group-hover:translate-x-5 group-hover:translate-y-5" />

            {/* Clean Portrait Image */}
            <div className="relative w-[240px] h-[310px] sm:w-[280px] sm:h-[360px] md:w-[320px] md:h-[400px] max-w-[85vw] rounded-3xl overflow-hidden border border-white/10 bg-[#0e0b0b] shadow-2xl">
              <Image
                src="/ikhwan_studio_hero.png"
                alt="Ikhwan Maulana"
                fill
                priority
                sizes="(max-width: 768px) 280px, 320px"
                className="rounded-3xl object-cover object-top filter grayscale contrast-105 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              />

              {/* Inner Border */}
              <div className="hero-inner-border absolute inset-3 rounded-[24px] border border-orange-500/20 pointer-events-none" />

              {/* 4 Animated Hover Border Lines */}
              <span className="hero-hover-border absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-orange-500 to-orange-600 rounded-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              <span className="hero-hover-border absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-orange-500 to-orange-600 rounded-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              <span className="hero-hover-border absolute top-0 left-0 w-[3px] h-full bg-gradient-to-b from-orange-500 to-orange-600 rounded-full origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500" />
              <span className="hero-hover-border absolute top-0 right-0 w-[3px] h-full bg-gradient-to-b from-orange-500 to-orange-600 rounded-full origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500" />
            </div>

            {/* Floating 3D Badge */}
            <div
              className="absolute -left-6 sm:-left-10 bottom-6 px-4 py-2.5 rounded-xl bg-black/75 backdrop-blur-xl border border-orange-500/30 text-white text-xs sm:text-sm font-mono font-medium flex items-center gap-2 shadow-[0_10px_30px_rgba(0,0,0,0.8)] z-20"
              style={{ transform: 'translateZ(60px)' }}
            >
              <Code2 className="text-orange-500 w-4 h-4 animate-pulse" />
              <span>Full-Stack Engineer</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
