'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Cpu,
  Scan,
  Layers,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { COSMIC_DATA } from '../data/cosmicPortfolioData';
import {
  useScrollReveal,
  fadeInUp,
  scaleIn,
  staggerContainer,
} from '../lib/animations';

export default function About() {
  const { capabilities } = COSMIC_DATA;
  const { ref, inView } = useScrollReveal();

  const iconMap: Record<string, React.ElementType> = {
    Cpu: Cpu,
    Scan: Scan,
    Layers: Layers,
    Sparkles: Sparkles
  };

  return (
    <section id="about" className="py-24 sm:py-32 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          variants={fadeInUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/[0.08] border border-amber-200/20 text-[#E5C378] text-xs font-mono font-medium uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" /> Core Disciplines
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4 font-heading">
            Engineering Systems with Purpose &amp; Precision
          </h2>
          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed text-justify sm:text-center font-normal">
            A focused practice across computer vision, predictive intelligence, and high-reliability fullstack engineering to solve intricate operational challenges.
          </p>
        </motion.div>

        {/* Four Capability Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {capabilities.map((cap, idx) => {
            const Icon = iconMap[cap.icon] || Cpu;
            return (
              <motion.div
                key={cap.id}
                variants={scaleIn}
                transition={{
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                  delay: idx * 0.1,
                }}
                whileHover={{
                  y: -6,
                  transition: { duration: 0.25, ease: 'easeOut' },
                }}
                className="luxury-card p-6 sm:p-7 flex flex-col justify-between group transition-all duration-300 relative overflow-hidden cursor-default"
              >
                {/* Subtle Champagne Backlight on Hover */}
                <div
                  className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-2xl pointer-events-none opacity-0 group-hover:opacity-40 transition-opacity duration-500 bg-[#E5C378]"
                />

                <div>
                  {/* Luxury Icon Box with Gold Rim */}
                  <div className="w-12 h-12 rounded-xl bg-[#121218] border border-amber-200/20 flex items-center justify-center text-[#E5C378] mb-5 shadow-md group-hover:border-amber-200/50 group-hover:shadow-[0_0_15px_rgba(229,195,120,0.15)] transition-all duration-300">
                    <Icon className="w-6 h-6" />
                  </div>

                  <span className="text-[11px] font-mono text-[#E5C378]/80 block uppercase tracking-wider mb-1">
                    {cap.subtitle}
                  </span>

                  <h3 className="text-xl font-bold text-white mb-3 font-heading group-hover:text-[#E5C378] transition-colors">
                    {cap.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed text-justify">
                    {cap.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.07] flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span className="flex items-center gap-1.5 text-zinc-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#E5C378]" />
                    <span>Applied Practice</span>
                  </span>
                  <span className="text-[#E5C378]/60 group-hover:text-[#E5C378] group-hover:translate-x-1 transition-all">
                    →
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
