'use client';

import React, { useState } from 'react';
import { 
  Cpu, 
  Code2, 
  Layers, 
  Server, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck,
  Terminal,
  Zap
} from 'lucide-react';
import { COSMIC_DATA } from '../data/cosmicPortfolioData';
import { SkillItem } from '../types/portfolio';

export default function CosmicTechStack() {
  const { techStack } = COSMIC_DATA;
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof techStack>('programming');

  const categories: { id: keyof typeof techStack; label: string; icon: React.ElementType; focus: string }[] = [
    { id: 'programming', label: 'Languages', icon: Code2, focus: 'High-Level Core Syntax & Scripting' },
    { id: 'frontend', label: 'Frontend Architecture', icon: Layers, focus: 'Component Systems & User Experience' },
    { id: 'backend', label: 'Backend & Cloud', icon: Server, focus: 'Relational Schemas & API Contracts' },
    { id: 'ai', label: 'AI & Machine Learning', icon: Cpu, focus: 'Model Training, Computer Vision & Edge Inference' },
    { id: 'automation', label: 'Automation & APIs', icon: Sparkles, focus: 'LLM Orchestration & Enterprise Workflows' },
  ];

  const currentSkills: SkillItem[] = techStack[selectedCategory] || [];
  const activeCategoryMeta = categories.find(c => c.id === selectedCategory);

  return (
    <section id="tech-stack" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/[0.08] border border-amber-200/20 text-[#E5C378] text-xs font-mono font-medium uppercase tracking-wider mb-4">
            <Layers className="w-3.5 h-3.5" /> Technical Matrix
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4 font-heading">
            Curated Technical Stack &amp; Standards
          </h2>
          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed text-justify sm:text-center">
            A balanced ecosystem of production-grade frameworks, high-throughput database architectures, and verified machine learning pipelines.
          </p>
        </div>

        {/* Category Navigation Tabs */}
        <div className="flex items-center sm:justify-center justify-start gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none px-4 sm:px-0">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#B89230] text-[#070709] font-bold shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                    : 'bg-[#101016]/80 border border-amber-200/15 text-zinc-300 hover:text-white hover:bg-[#181822]'
                }`}
                aria-pressed={isSelected}
              >
                <Icon className="w-4 h-4" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Executive Atelier Spotlight Banner */}
        <div className="luxury-panel p-6 sm:p-8 mb-10 border border-amber-200/25 bg-gradient-to-r from-[#14141B] via-[#0F0F15] to-[#14141B]">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#070709] border border-amber-200/30 flex items-center justify-center text-[#E5C378] shadow-inner">
                {activeCategoryMeta && <activeCategoryMeta.icon className="w-6 h-6" />}
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#E5C378]">
                  Architectural Pillar
                </span>
                <h3 className="text-xl font-bold text-white font-heading mt-0.5">
                  {activeCategoryMeta?.label}
                </h3>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
              <div className="px-3.5 py-1.5 rounded-lg bg-white/[0.03] border border-amber-200/15 text-zinc-300 flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-[#E5C378]" />
                <span>{activeCategoryMeta?.focus}</span>
              </div>
              <div className="px-3.5 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Production Standard</span>
              </div>
            </div>
          </div>
        </div>

        {/* Responsive Grid for All Screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {currentSkills.map((skill) => (
            <div
              key={skill.name}
              className="luxury-card p-5 sm:p-6 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#E5C378] transition-colors font-heading">
                    {skill.name}
                  </h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-amber-400/[0.08] border border-amber-200/20 text-[#E5C378] shrink-0">
                    {skill.level}
                  </span>
                </div>

                <div className="text-xs font-mono text-[#E5C378]/80 mb-3">
                  {skill.role} • <span className="text-zinc-400">{skill.applied}</span>
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed text-justify">
                  {skill.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/[0.07] flex items-center gap-1.5 text-[11px] font-mono text-zinc-400">
                <CheckCircle2 className="w-3 h-3 text-[#E5C378]" />
                <span>Verified in Production</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
