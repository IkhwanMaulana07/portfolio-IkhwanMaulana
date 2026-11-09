'use client';

import React, { useRef, useEffect } from 'react';
import SectionHeading from './SectionHeading';
import { Server } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SystemsShowcase() {
  const containerRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const path = pathRef.current;
    if (!card) return;

    const ctx = gsap.context(() => {
      // 3D card perspective entrance
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 70,
          scale: 0.95,
          filter: 'blur(10px)',
        },
        {
          scrollTrigger: {
            trigger: card,
            start: 'top 82%',
            once: true,
          },
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1.1,
          ease: 'expo.out',
        }
      );

      // SVG Chart line drawing animation
      if (path) {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(path, {
          scrollTrigger: {
            trigger: card,
            start: 'top 75%',
            once: true,
          },
          strokeDashoffset: 0,
          duration: 1.8,
          ease: 'power3.out',
          delay: 0.3,
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="systems" className="py-24 sm:py-32 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55vw] h-[55vw] max-w-[650px] max-h-[650px] rounded-full bg-orange-600/8 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Kinetic Letters */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <SectionHeading title="CORE SYSTEMS" />
          <p className="text-sm sm:text-base text-gray-400 leading-relaxed font-sans -mt-8">
            Relational persistence layers, sub-millisecond response times, and automated failure-tolerant dispatch pipelines.
          </p>
        </div>

        {/* Central Telemetry Card */}
        <div
          ref={cardRef}
          className="max-w-5xl mx-auto rounded-[32px] border border-orange-500/25 bg-[#09090F]/90 backdrop-blur-2xl p-6 sm:p-10 md:p-12 shadow-[0_20px_70px_rgba(0,0,0,0.9),0_0_40px_rgba(255,100,0,0.12)] relative overflow-hidden transition-transform duration-500 hover:scale-[1.01]"
        >
          
          {/* Card Top Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/[0.08] gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
                <Server className="w-4 h-4" />
              </div>
              <div>
                <span className="font-techno text-xs sm:text-sm font-bold text-white tracking-wider">
                  SYSTEM PERFORMANCE MONITOR
                </span>
                <span className="text-[10px] font-mono text-gray-500 ml-2">v2.4</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[11px] font-mono text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                99.98% ONLINE
              </span>
            </div>
          </div>

          {/* 3 Metric Tiles Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col justify-between">
              <span className="text-[11px] font-mono text-gray-400 uppercase tracking-wider block mb-2">
                API LATENCY
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-techno text-3xl sm:text-4xl font-extrabold text-white">
                  &lt; 1ms
                </span>
                <span className="text-xs font-mono text-emerald-400">Golang Gin</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col justify-between">
              <span className="text-[11px] font-mono text-gray-400 uppercase tracking-wider block mb-2">
                PERSISTENCE UPTIME
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-techno text-3xl sm:text-4xl font-extrabold text-white">
                  99.98%
                </span>
                <span className="text-xs font-mono text-orange-400">ACID Safe</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col justify-between">
              <span className="text-[11px] font-mono text-gray-400 uppercase tracking-wider block mb-2">
                COMMISSION TOLL
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-techno text-3xl sm:text-4xl font-extrabold text-orange-500">
                  0%
                </span>
                <span className="text-xs font-mono text-gray-400">Direct Order</span>
              </div>
            </div>
          </div>

          {/* Glowing Sparkline Chart Visualization */}
          <div className="relative p-4 sm:p-6 rounded-2xl bg-black/50 border border-white/[0.06] mb-8 overflow-hidden">
            <div className="h-44 sm:h-52 w-full relative flex items-end">
              <svg
                viewBox="0 0 800 200"
                preserveAspectRatio="none"
                className="w-full h-full overflow-visible"
              >
                <defs>
                  <linearGradient id="orangeChartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ff5500" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#ff5500" stopOpacity="0.0" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Grid Lines */}
                <line x1="0" y1="40" x2="800" y2="40" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
                <line x1="0" y1="90" x2="800" y2="90" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
                <line x1="0" y1="140" x2="800" y2="140" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />

                {/* Fill Area Under Curve */}
                <path
                  d="M 0 160 Q 150 145, 300 120 T 600 70 L 800 40 L 800 200 L 0 200 Z"
                  fill="url(#orangeChartGradient)"
                />

                {/* Glowing Stroke Curve */}
                <path
                  d="M 0 160 Q 150 145, 300 120 T 600 70 L 800 40"
                  fill="none"
                  stroke="#ff5500"
                  strokeWidth="3.5"
                  filter="url(#glow)"
                  className="transition-all duration-700"
                />

                {/* Data Points */}
                <circle cx="0" cy="160" r="4" fill="#ff5500" />
                <circle cx="300" cy="120" r="5" fill="#ff6b00" />
                <circle cx="600" cy="70" r="5" fill="#ff7a00" />
                <circle cx="800" cy="40" r="6" fill="#ffffff" stroke="#ff5500" strokeWidth="3" />
              </svg>
            </div>

            {/* Labels Under Chart */}
            <div className="flex justify-between items-center text-[10px] sm:text-xs font-mono text-gray-500 mt-4 pt-3 border-t border-white/[0.04]">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                CLIENT DISPATCH
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                DATABASE RESILIENCE
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_#ffffff]" />
                PRODUCTION RUNTIME
              </span>
            </div>
          </div>

          {/* Bottom Banner: Intelligence in Motion */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-orange-500/10 via-white/[0.02] to-transparent border border-orange-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="font-techno text-xs sm:text-sm font-bold text-white tracking-wider block">
                INTELLIGENCE IN MOTION
              </span>
              <p className="text-xs text-gray-400 mt-1 font-sans">
                End-to-end event loops with sub-second execution, automated container routing, and contextual AI assistants.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-mono text-orange-400 font-semibold px-3 py-1 rounded-lg bg-orange-500/10 border border-orange-500/30">
                ACTIVE PIPELINE
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
