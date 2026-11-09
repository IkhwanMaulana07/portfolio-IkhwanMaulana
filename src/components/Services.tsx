'use client';

import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeading from './SectionHeading';
import {
  Code,
  Sparkles,
  Server,
  Database,
  Rocket,
  Wrench,
  Cpu,
  Brain,
  Workflow,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ServiceItem {
  title: string;
  desc: string;
  icon: React.ReactNode;
  iconColor: string;
  theme: string;
}

export default function Services() {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const services: ServiceItem[] = [
    {
      title: 'Full-Stack Web Development',
      desc: 'Building fast, scalable, production-ready applications using React, Next.js, Go & modern full-stack workflows.',
      icon: <Code className="text-4xl" />,
      iconColor: 'text-orange-400',
      theme: 'rgba(255,140,0,.9)',
    },
    {
      title: 'Front-End UI/UX Crafting',
      desc: 'Pixel-perfect, animated, accessible user interfaces created with Tailwind CSS, GSAP, and smooth micro-interactions.',
      icon: <Sparkles className="text-4xl" />,
      iconColor: 'text-pink-400',
      theme: 'rgba(255,0,150,.9)',
    },
    {
      title: 'Back-End & API Architecture',
      desc: 'High-performance, secure RESTful APIs engineered with Go (Gin/Fiber) and PHP Laravel with clean domain architecture.',
      icon: <Server className="text-4xl" />,
      iconColor: 'text-blue-400',
      theme: 'rgba(0,120,255,.9)',
    },
    {
      title: 'Database Optimization',
      desc: 'Relational & NoSQL database schema design, index optimization, caching strategies, and transaction ACID resilience.',
      icon: <Database className="text-4xl" />,
      iconColor: 'text-green-400',
      theme: 'rgba(0,255,120,.9)',
    },
    {
      title: 'Performance & SEO',
      desc: 'Core Web Vitals optimization, server-side rendering, asset compression, edge caching, and semantic search visibility.',
      icon: <Rocket className="text-4xl" />,
      iconColor: 'text-yellow-400',
      theme: 'rgba(255,255,0,.9)',
    },
    {
      title: 'Maintenance & Support',
      desc: 'Proactive bug fixes, legacy codebase refactoring, security patching, and ongoing engineering lifecycle support.',
      icon: <Wrench className="text-4xl" />,
      iconColor: 'text-cyan-300',
      theme: 'rgba(0,255,255,.9)',
    },
    {
      title: 'System Development',
      desc: 'Building bespoke web-based business management software, admin control panels, and custom operational portals.',
      icon: <Cpu className="text-4xl" />,
      iconColor: 'text-purple-400',
      theme: 'rgba(168,85,247,.9)',
    },
    {
      title: 'AI Integration',
      desc: 'Connecting intelligent AI capabilities, decision-support models, and LLM-assisted workflows into digital systems.',
      icon: <Brain className="text-4xl" />,
      iconColor: 'text-violet-400',
      theme: 'rgba(139,92,246,.9)',
    },
    {
      title: 'Automation & Workflows',
      desc: 'Automating repetitive enterprise processes and multi-system data synchronization to maximize operational efficiency.',
      icon: <Workflow className="text-4xl" />,
      iconColor: 'text-emerald-400',
      theme: 'rgba(16,185,129,.9)',
    },
  ];

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const validCards = cardsRef.current.filter(Boolean);
      if (!validCards.length) return;

      // Initial card entrance state with polygonal clipPath
      gsap.set(validCards, {
        opacity: 0,
        y: 80,
        scale: 0.9,
        rotationX: 14,
        filter: 'blur(10px)',
        clipPath: 'polygon(50% 0%, 58% 8%, 68% 4%, 72% 14%, 84% 10%, 82% 22%, 94% 28%, 88% 38%, 100% 50%, 88% 62%, 94% 72%, 82% 78%, 84% 90%, 72% 86%, 68% 96%, 58% 92%, 50% 100%, 42% 92%, 32% 96%, 28% 86%, 16% 90%, 18% 78%, 6% 72%, 12% 62%, 0% 50%, 12% 38%, 6% 28%, 18% 22%, 16% 10%, 28% 14%, 32% 4%, 42% 8%)',
        transformOrigin: '50% 100%',
        transformPerspective: 1200,
        force3D: true,
      });

      validCards.forEach((card, idx) => {
        if (!card) return;
        const delay = (idx % 3) * 0.1;
        gsap.to(card, {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          filter: 'blur(0px)',
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          duration: 0.9,
          delay,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            once: true,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const normX = (x / rect.width - 0.5) * 2;
    const normY = (y / rect.height - 0.5) * 2;

    // 3D Tilt
    gsap.to(card, {
      rotateX: -10 * normY,
      rotateY: 10 * normX,
      duration: 0.25,
      ease: 'power1.out',
    });

    // Parallax sub-layers
    const layers = card.querySelectorAll<HTMLElement>('.parallax-l');
    layers.forEach((layer) => {
      const depth = Number(layer.dataset.depth || 15);
      gsap.to(layer, {
        x: normX * depth,
        y: normY * depth,
        duration: 0.25,
        ease: 'power1.out',
      });
    });

    // Spotlight gradient position
    card.style.setProperty('--x', `${x}px`);
    card.style.setProperty('--y', `${y}px`);
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.45,
      ease: 'power2.out',
    });

    const layers = card.querySelectorAll<HTMLElement>('.parallax-l');
    layers.forEach((layer) => {
      gsap.to(layer, {
        x: 0,
        y: 0,
        duration: 0.45,
        ease: 'power2.out',
      });
    });
  };

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative w-full px-6 md:px-16 py-24 text-white [contain:layout_paint] select-none"
    >
      <SectionHeading title="SPECIALIZED SERVICES" className="text-orange-400" />

      {/* Ambient glows */}
      <div className="absolute left-[-150px] top-[30%] w-[400px] h-[400px] rounded-full bg-orange-500/10 blur-[180px] pointer-events-none" />
      <div className="absolute right-[-150px] bottom-[10%] w-[350px] h-[350px] rounded-full bg-red-500/10 blur-[160px] pointer-events-none" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mt-14">
        {services.map((svc, idx) => (
          <div
            key={idx}
            ref={(el) => { cardsRef.current[idx] = el; }}
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
            className="service-card relative p-8 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl cursor-pointer transform-gpu will-change-transform shadow-xl group hover:border-orange-500/40 transition-colors duration-300"
            style={
              {
                '--maskColor': 'rgba(255, 120, 0, 0.08)',
                '--maskSize': '35%',
                backgroundImage: 'radial-gradient(circle at var(--x, 50%) var(--y, 50%), var(--maskColor, rgba(255,120,0,0.08)) var(--maskSize, 35%), rgba(0,0,0,0.4) 100%)',
                transformStyle: 'preserve-3d',
              } as React.CSSProperties
            }
          >
            {/* Parallax Icon */}
            <div className={`parallax-l mb-5 will-change-transform ${svc.iconColor}`} data-depth="25">
              {svc.icon}
            </div>

            {/* Parallax Title */}
            <h3 className="parallax-l text-xl font-bold font-techno mb-3 text-white will-change-transform group-hover:text-orange-400 transition-colors" data-depth="16">
              {svc.title}
            </h3>

            {/* Parallax Description */}
            <p className="parallax-l text-gray-300 text-sm leading-relaxed opacity-85 will-change-transform font-sans" data-depth="8">
              {svc.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
