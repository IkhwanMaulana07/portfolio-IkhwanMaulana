'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import SectionHeading from './SectionHeading';
import { Layers, Smartphone, Sparkles, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const portraitRef = useRef<HTMLDivElement>(null);

  const highlights = [
    {
      title: 'React & Next.js',
      sub: 'Modern Front-End Architecture',
      icon: Layers,
    },
    {
      title: 'Go & REST APIs',
      sub: 'Robust Backend & Database',
      icon: Smartphone,
    },
    {
      title: 'BNSP Certified',
      sub: 'Programmer & Network Technician',
      icon: Sparkles,
    },
    {
      title: 'Available',
      sub: 'Open for Full-Stack Roles',
      icon: CheckCircle2,
    },
  ];

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);
    const portrait = portraitRef.current;
    if (!cards.length && !portrait) return;

    const ctx = gsap.context(() => {
      // 3D perspective entrance on feature cards
      gsap.set(cards, {
        yPercent: 90,
        opacity: 0,
        rotateX: -40,
        skewY: 4,
        filter: 'blur(8px)',
        transformOrigin: '0% 100%',
        transformPerspective: 1000,
      });

      cards.forEach((card, idx) => {
        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            once: true,
          },
          yPercent: 0,
          opacity: 1,
          rotateX: 0,
          skewY: 0,
          filter: 'blur(0px)',
          duration: 0.95,
          ease: 'expo.out',
          delay: idx * 0.08,
        });
      });

      if (portrait) {
        gsap.fromTo(
          portrait,
          { opacity: 0, scale: 0.88, filter: 'blur(10px)' },
          {
            scrollTrigger: {
              trigger: portrait,
              start: 'top 80%',
              once: true,
            },
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
            duration: 1.2,
            ease: 'expo.out',
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-24 sm:py-32 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-[-10%] w-[40vw] h-[40vw] max-w-[450px] max-h-[450px] rounded-full bg-orange-600/10 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <SectionHeading title="ABOUT ME" />
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Bio copy & 2x2 cards (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed text-justify">
              Experienced full-stack developer with hands-on experience in React.js, Next.js, and modern web technologies. Passionate about creating high-performance, accessible, and visually engaging web applications that combine aesthetic elegance with technical precision.
            </p>

            <p className="text-gray-300 text-sm sm:text-base leading-relaxed text-justify">
              Comfortable working across the entire stack, from component-driven frontend interfaces to high-concurrency backend APIs, relational database design, and production cloud deployments. Strong analytical thinking, adaptability to commercial technical constraints, and collaborative delivery.
            </p>

            <p className="text-gray-300 text-sm sm:text-base leading-relaxed text-justify">
              High focus on building intuitive user experiences, writing clean maintainable code that scales, and continuously integrating emerging web technologies—including AI orchestration and real-time streaming—without compromise.
            </p>

            {/* 2x2 Feature Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {highlights.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    ref={(el) => { cardsRef.current[idx] = el; }}
                    className="card-cyber p-5 flex items-start gap-4 group transition-transform duration-300 hover:scale-[1.03]"
                  >
                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 group-hover:scale-105 group-hover:border-orange-500/40 transition-all shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-techno font-bold text-sm text-white group-hover:text-orange-400 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-xs font-mono text-gray-400 mt-0.5">
                        {item.sub}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Portrait Card with Orange Backlight (5 Cols) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div ref={portraitRef} className="relative w-full max-w-[340px] sm:max-w-[380px]">
              {/* Warm Orange Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-600/35 to-amber-500/20 rounded-[32px] blur-2xl -z-10 transform scale-105 opacity-80" />

              <div className="relative aspect-[3/4] w-full rounded-[28px] overflow-hidden border border-orange-500/30 bg-[#09090F] shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_35px_rgba(255,100,0,0.15)] group transition-transform duration-500 hover:scale-[1.02]">
                <Image
                  src="/ikhwan_studio_about.png"
                  alt="Ikhwan Maulana - About"
                  fill
                  className="object-cover object-top filter grayscale contrast-115 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent opacity-85" />

                {/* Bottom Tag */}
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="p-3 rounded-xl bg-black/85 border border-orange-500/30 backdrop-blur-md">
                    <span className="text-[10px] font-mono text-orange-400 uppercase tracking-widest block mb-0.5">
                      FULL-STACK LAB
                    </span>
                    <p className="text-xs text-gray-200 font-sans">
                      Ready to Build Scalable Systems Everywhere.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
