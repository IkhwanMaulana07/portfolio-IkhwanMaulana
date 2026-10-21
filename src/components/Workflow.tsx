'use client';

import React from 'react';
import { 
  CheckCircle2, 
  Workflow as WorkflowIcon,
  Search,
  PenTool,
  Code2,
  TrendingUp
} from 'lucide-react';
import { COSMIC_DATA } from '../data/cosmicPortfolioData';

export default function Workflow() {
  const { workflowSteps } = COSMIC_DATA;
  const stepIcons = [Search, PenTool, Code2, TrendingUp];

  return (
    <section id="workflow" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/[0.08] border border-amber-200/20 text-[#E5C378] text-xs font-mono font-medium uppercase tracking-wider mb-4">
            <WorkflowIcon className="w-3.5 h-3.5" /> Engineering Lifecycle
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4 font-heading">
            From Conceptual Architecture to Production Rigor
          </h2>
          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed text-justify sm:text-center">
            A disciplined, iterative engineering methodology bridging data modeling, API contracts, AI inference, and production deployment.
          </p>
        </div>

        {/* Desktop: Horizontal Timeline with Champagne Connecting Line */}
        <div className="relative">
          
          {/* Champagne Connecting Hairline for Desktop */}
          <div className="hidden lg:block absolute top-[45px] left-[6%] right-[6%] h-[1.5px] bg-gradient-to-r from-amber-200/10 via-amber-300/40 to-amber-200/10 z-0 pointer-events-none shadow-[0_0_8px_rgba(229,195,120,0.3)]" />

          {/* Steps Grid: 4 Columns on Desktop, Vertical on Mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {workflowSteps.map((step, idx) => {
              const StepIcon = stepIcons[idx] || Code2;
              return (
                <div
                  key={step.step}
                  className="luxury-panel p-6 sm:p-7 flex flex-col justify-between group transition-all duration-300 relative"
                >
                  <div>
                    {/* Circular Marker with Step Number */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1E1E26] via-[#14141B] to-[#0A0A0E] border border-amber-200/30 flex items-center justify-center text-[#E5C378] shadow-[0_0_15px_rgba(212,175,55,0.15)] group-hover:scale-105 group-hover:border-amber-300/60 transition-transform">
                        <StepIcon className="w-5 h-5" />
                      </div>
                      <span className="text-2xl font-extrabold font-mono text-[#E5C378]/40 group-hover:text-[#E5C378] transition-colors">
                        0{step.step}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2 font-heading group-hover:text-[#E5C378] transition-colors">
                      {step.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed text-justify mb-5">
                      {step.desc}
                    </p>

                    {/* Step Details Bullet Points */}
                    <div className="space-y-2 pt-2 border-t border-white/[0.07] font-mono text-xs text-zinc-300">
                      {step.details.map((detail, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#E5C378] shrink-0 mt-0.5" />
                          <span className="text-[11px] leading-snug">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-zinc-400">
                    <span className="text-[#E5C378]/80">Phase 0{step.step}</span>
                    <span className="text-zinc-500">Methodology</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
