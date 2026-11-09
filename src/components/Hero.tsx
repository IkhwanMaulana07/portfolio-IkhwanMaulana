'use client';

import React, { useRef, useLayoutEffect } from 'react';
import { Linkedin, Github, Mail, Phone } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Typewriter from './Typewriter';
import HangingPhotoCard from './HangingPhotoCard';
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

      // Hanging Photo Card entrance reveal
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          {
            opacity: 0,
            y: 30,
            scale: 0.95,
            filter: 'blur(12px)',
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: 1.4,
            ease: 'expo.out',
            delay: 0.2,
          }
        );
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

          {/* Typewriter Display */}
          <div className="mt-4 sm:mt-5 min-h-[50px] sm:min-h-[55px] w-full max-w-[550px]">
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

        {/* Right Column: Interactive Hanging Photo Card with Rope & Spring Physics */}
        <div ref={cardRef} className="relative z-10 lg:w-[40%] flex justify-center max-w-full">
          <HangingPhotoCard
            photoSrc="/ikhwan_studio_hero.png"
            badgeText="Full-Stack Engineer"
          />
        </div>

      </div>
    </section>
  );
}
