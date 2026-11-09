'use client';

import React, { useRef, useEffect } from 'react';
import SectionHeading from './SectionHeading';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Code,
  Palette,
  Server,
  Database,
  Gauge,
  Wrench,
  Cpu,
  Bot,
  Users,
  Workflow,
  ArrowUpRight
} from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ServiceItem {
  id: number;
  title: string;
  desc: string;
  icon: React.ReactNode;
  tag: string;
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: 1,
    title: 'Full-Stack Web Development',
    desc: 'Building fast, scalable web applications using React, Next.js, Golang Gin, and Laravel.',
    icon: <Code className="w-6 h-6 text-orange-400" />,
    tag: 'Web & Full-Stack',
  },
  {
    id: 2,
    title: 'Front-End UI/UX Crafting',
    desc: 'Pixel-perfect, micro-animated user interfaces using Tailwind CSS, GSAP, and Framer Motion.',
    icon: <Palette className="w-6 h-6 text-pink-400" />,
    tag: 'Interface Systems',
  },
  {
    id: 3,
    title: 'Back-End & API Architecture',
    desc: 'High-throughput, secure RESTful APIs with sub-millisecond latency using Go & Node.js.',
    icon: <Server className="w-6 h-6 text-blue-400" />,
    tag: 'APIs & Microservices',
  },
  {
    id: 4,
    title: 'Database Optimization',
    desc: 'Normalized 3NF relational schemas, indexing strategies, and query performance tuning in MySQL & Oracle SQL.',
    icon: <Database className="w-6 h-6 text-emerald-400" />,
    tag: 'Relational DBs',
  },
  {
    id: 5,
    title: 'Performance & SEO',
    desc: 'Core Web Vitals optimization, edge caching, server-side rendering, and technical SEO architectures.',
    icon: <Gauge className="w-6 h-6 text-yellow-400" />,
    tag: 'Speed & Conversion',
  },
  {
    id: 6,
    title: 'Maintenance & Support',
    desc: 'Bug diagnosis, code refactoring, container updates, and long-term production application reliability.',
    icon: <Wrench className="w-6 h-6 text-cyan-400" />,
    tag: 'Operations',
  },
  {
    id: 7,
    title: 'System Development',
    desc: 'Engineering complex commercial systems tailored precisely to business logic and user operations.',
    icon: <Cpu className="w-6 h-6 text-purple-400" />,
    tag: 'Custom Logic',
  },
  {
    id: 8,
    title: 'AI Integration',
    desc: 'Embedding Google Gemini LLM API, prompt engineering, and intelligent chatbots into live web platforms.',
    icon: <Bot className="w-6 h-6 text-rose-400" />,
    tag: 'Smart Workflows',
  },
  {
    id: 9,
    title: 'Automation & Workflows',
    desc: 'Automating repetitive business processes, lead dispatching, and asynchronous multi-step pipeline funnels.',
    icon: <Workflow className="w-6 h-6 text-amber-400" />,
    tag: 'Automation',
  },
];

export default function Services() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);
    if (!cards.length) return;

    const ctx = gsap.context(() => {
      cards.forEach((card, idx) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 45,
            rotateX: -20,
            filter: 'blur(8px)',
          },
          {
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              once: true,
            },
            opacity: 1,
            y: 0,
            rotateX: 0,
            filter: 'blur(0px)',
            duration: 0.85,
            ease: 'expo.out',
            delay: (idx % 3) * 0.09,
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" className="py-24 sm:py-32 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 right-[-10%] w-[45vw] h-[45vw] max-w-[500px] max-h-[500px] rounded-full bg-orange-600/10 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading with Kinetic Letters */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <SectionHeading title="SPECIALIZED SERVICES" />
          <p className="text-sm sm:text-base text-gray-400 leading-relaxed font-sans -mt-8">
            High-performance software interfaces, scalable backend systems, and data-driven infrastructure.
          </p>
        </div>

        {/* 3x3 Grid of Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_DATA.map((service, idx) => (
            <div
              key={service.id}
              ref={(el) => { cardsRef.current[idx] = el; }}
              className="card-cyber p-7 flex flex-col justify-between group relative overflow-hidden transition-all duration-300 hover:scale-[1.02]"
            >
              <div>
                {/* Icon & Tag */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center group-hover:border-orange-500/40 group-hover:scale-105 transition-all">
                    {service.icon}
                  </div>
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">
                    {service.tag}
                  </span>
                </div>

                <h3 className="font-techno font-bold text-lg text-white mb-3 group-hover:text-orange-400 transition-colors">
                  {service.title}
                </h3>

                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-sans">
                  {service.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-gray-500 group-hover:text-orange-400 transition-colors">
                <span>INQUIRE SERVICE</span>
                <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
