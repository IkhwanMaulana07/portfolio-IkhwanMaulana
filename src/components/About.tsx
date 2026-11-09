'use client';

import React, { useRef, useLayoutEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeading from './SectionHeading';
import { usePortfolio } from '../context/PortfolioContext';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLElement>(null);
  const linesRef = useRef<(HTMLParagraphElement | null)[]>([]);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const portraitRef = useRef<HTMLDivElement>(null);
  const { t } = usePortfolio();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 3D perspective unroll for bio lines
      const validLines = linesRef.current.filter(Boolean);
      gsap.set(validLines, {
        yPercent: 120,
        opacity: 0,
        rotateX: -55,
        skewY: 6,
        filter: 'blur(10px)',
        transformOrigin: '0% 100%',
        transformPerspective: 1000,
        willChange: 'transform, opacity, filter',
      });

      validLines.forEach((line) => {
        if (!line) return;
        gsap.to(line, {
          yPercent: 0,
          opacity: 1,
          rotateX: 0,
          skewY: 0,
          filter: 'blur(0px)',
          duration: 0.9,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: line,
            start: 'top 85%',
            once: true,
          },
        });
      });

      // Stat cards 3D entrance
      const validCards = cardsRef.current.filter(Boolean);
      gsap.fromTo(
        validCards,
        {
          opacity: 0,
          y: 50,
          rotateX: -30,
          filter: 'blur(8px)',
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          filter: 'blur(0px)',
          duration: 0.8,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            once: true,
          },
        }
      );

      // Portrait reveal
      if (portraitRef.current) {
        gsap.fromTo(
          portraitRef.current,
          {
            scale: 0.88,
            opacity: 0,
            filter: 'blur(12px)',
          },
          {
            scale: 1,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 1.2,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: portraitRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const stats = t.about.stats;

  return (
    <section id="about" ref={containerRef} className="w-full px-4 sm:px-8 md:px-16 py-16 sm:py-20 text-white relative">
      <SectionHeading title={t.about.title} className="text-orange-400" />

      <div className="relative flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24 max-w-7xl mx-auto mt-12">
        {/* Ambient Glow */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-orange-500/15 blur-[140px] rounded-full pointer-events-none" />

        {/* Left Section: Bio Lines & 2x2 Stat Cards */}
        <div className="flex-1 max-w-2xl z-20">
          <div className="text-gray-300 leading-relaxed text-base sm:text-lg md:text-xl space-y-6">
            <div className="about-line-mask overflow-hidden [perspective:1000px]">
              <p ref={(el) => { linesRef.current[0] = el; }} className="about-line">
                {t.about.bio1}
              </p>
            </div>

            <div className="about-line-mask overflow-hidden [perspective:1000px]">
              <p ref={(el) => { linesRef.current[1] = el; }} className="about-line">
                {t.about.bio2}
              </p>
            </div>

            <div className="about-line-mask overflow-hidden [perspective:1000px]">
              <p ref={(el) => { linesRef.current[2] = el; }} className="about-line">
                {t.about.bio3}
              </p>
            </div>
          </div>

          {/* 2x2 Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10 relative z-30">
            {stats.map((s, idx) => (
              <div
                key={idx}
                ref={(el) => { cardsRef.current[idx] = el; }}
                className="stat-card bg-white/5 backdrop-blur-md border border-orange-500/10 rounded-xl p-5 hover:border-orange-500/40 hover:-translate-y-1 transition-all duration-300"
              >
                <h3 className="text-orange-500 text-xl font-bold font-techno">{s.title}</h3>
                <p className="text-gray-400 text-sm mt-2">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section: Portrait Image with Glow */}
        <div
          ref={portraitRef}
          className="relative overflow-hidden origin-center rounded-3xl w-[240px] h-[390px] sm:w-[280px] sm:h-[460px] md:w-[320px] md:h-[500px] max-w-[85vw] shadow-2xl shadow-orange-700/20 z-20 shrink-0 border border-white/10"
        >
          <div className="absolute inset-0 bg-orange-500/20 blur-[90px] scale-110 rounded-full -z-10" />
          <div className="imageGlow" />
          <Image
            src="/ikhwan_studio_about.png"
            alt="Ikhwan Maulana"
            fill
            sizes="(max-width: 768px) 280px, 320px"
            className="object-cover object-top filter grayscale contrast-105 hover:grayscale-0 hover:scale-105 transition-all duration-700"
          />
        </div>
      </div>
    </section>
  );
}
