'use client';

import React from 'react';
import { Globe, Cpu, Rocket, ArrowUpRight } from 'lucide-react';

export default function FocusPillars() {
  const pillars = [
    {
      num: '01',
      tag: 'DIGITAL FOUNDRY',
      title: 'WEBSITES',
      desc: 'Production-grade, search-optimized web experiences delivering brand presence and conversion at the speed of modern technology stacks.',
      icon: Globe,
    },
    {
      num: '02',
      tag: 'LIVE SYSTEMS',
      title: 'WEB APPS',
      desc: 'Clean architectures with modular workflows, reactive state management, and seamless real-time API integrations.',
      icon: Cpu,
    },
    {
      num: '03',
      tag: 'SCALING VALUE',
      title: 'SAAS & MVP',
      desc: 'Monorepo services and platforms built from the ground up for multi-tenant scalability, user retention, and long-term maintainability.',
      icon: Rocket,
    },
  ];

  return (
    <section id="focus" className="py-24 sm:py-32 relative overflow-hidden">
      {/* Subtle Glow */}
      <div className="absolute top-1/2 right-[-5%] w-[35vw] h-[35vw] max-w-[400px] max-h-[400px] rounded-full bg-orange-600/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-orange-400 block mb-3">
            CORE FOCUS / WORKFLOW
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-techno text-white tracking-tight mb-4">
            I DON&apos;T JUST BUILD.
          </h2>
          <p className="text-sm sm:text-base text-gray-400 leading-relaxed font-sans">
            I design digital ecosystems that accelerate scale, empower workflows, and transform technical intent into customer revenue.
          </p>
        </div>

        {/* 3 Pillar Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="card-cyber p-8 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Subtle Hover Backlight */}
                <div className="absolute -top-10 -right-10 w-28 h-28 bg-orange-500/10 rounded-full blur-2xl group-hover:bg-orange-500/20 transition-all pointer-events-none" />

                <div>
                  {/* Top Bar: Number & Icon */}
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-techno text-3xl sm:text-4xl font-black text-orange-500/80 group-hover:text-orange-400 group-hover:scale-105 transition-all">
                      {item.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-gray-400 group-hover:text-orange-400 group-hover:border-orange-500/30 transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Tag and Title */}
                  <span className="text-[11px] font-mono tracking-widest text-gray-500 uppercase block mb-1.5">
                    {item.tag}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold font-techno text-white mb-4 group-hover:text-orange-400 transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-sans">
                    {item.desc}
                  </p>
                </div>

                {/* Bottom Card Footer */}
                <div className="mt-8 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-gray-500 group-hover:text-orange-400 transition-colors">
                  <span>DISCOVER ARCHITECTURE</span>
                  <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

