'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { 
  X, 
  ExternalLink, 
  Github, 
  CheckCircle2, 
  AlertCircle, 
  Target
} from 'lucide-react';
import { Project } from '../types/portfolio';

interface CaseStudiesModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function CaseStudiesModal({ project, onClose }: CaseStudiesModalProps) {
  // Accessible keyboard control: Close on Escape key (R-32)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    if (project) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="luxury-modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] bg-[#0A0A0F] border border-amber-200/25 rounded-2xl overflow-y-auto shadow-[0_30px_70px_-15px_rgba(0,0,0,0.95)] p-4 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button (tap target >= 44px) */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 w-11 h-11 min-h-[44px] min-w-[44px] rounded-full bg-black/60 hover:bg-black/90 border border-amber-200/20 text-zinc-300 hover:text-white flex items-center justify-center transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          aria-label="Close Case Study"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Visual Banner */}
        <div className="relative aspect-[16/8] w-full rounded-xl overflow-hidden bg-[#070709] mb-6 border border-white/[0.06]">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-transparent to-transparent opacity-90" />
          
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2">
            <span className="px-3.5 py-1 rounded-full text-xs font-mono font-medium bg-amber-400/20 border border-amber-200/40 text-[#F7E7C4] backdrop-blur-md">
              {project.category}
            </span>
            <span className="text-xs font-mono text-zinc-300 bg-black/70 px-3.5 py-1 rounded-full border border-white/10 backdrop-blur-md">
              Role: <span className="text-white font-semibold">{project.role}</span>
            </span>
          </div>
        </div>

        {/* Header Title & Tagline */}
        <div className="mb-6">
          <h2 id="case-study-title" className="text-2xl sm:text-3xl font-extrabold text-white font-heading mb-2">
            {project.title}
          </h2>
          <p className="text-xs sm:text-sm font-mono text-[#E5C378] leading-relaxed">
            {project.tagline}
          </p>
        </div>

        {/* Verifiable Architecture Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8 bg-[#121217] p-4 rounded-xl border border-amber-200/15 font-mono text-xs">
          {project.metrics.map((m, idx) => (
            <div key={idx} className="p-2">
              <span className="text-zinc-400 text-[10px] block uppercase tracking-wider">{m.label}</span>
              <span className="text-[#E5C378] font-bold text-sm block mt-0.5">{m.value}</span>
            </div>
          ))}
        </div>

        {/* Problem Statement & Objectives */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          
          {/* Problem Statement */}
          <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.08]">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 mb-2">
              <AlertCircle className="w-4 h-4" /> Context &amp; Challenge
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed text-justify">
              {project.problem}
            </p>
          </div>

          {/* Objectives */}
          <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.08]">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#E5C378] mb-2">
              <Target className="w-4 h-4" /> Core Objectives
            </div>
            {project.objectives && project.objectives.length > 0 ? (
              <ul className="space-y-1.5 text-xs text-zinc-300">
                {project.objectives.map((obj, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#E5C378]">•</span>
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed text-justify">
                {project.solution}
              </p>
            )}
          </div>

        </div>

        {/* Architectural Highlights & Technical Decisions */}
        <div className="mb-8">
          <h3 className="text-xs font-mono font-bold text-[#E5C378] uppercase tracking-wider mb-4">
            Architectural Highlights &amp; Engineering Decisions
          </h3>
          <div className="space-y-3">
            {project.architecturePoints.map((point, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-amber-200/10 text-xs sm:text-sm text-zinc-200"
              >
                <CheckCircle2 className="w-4 h-4 text-[#E5C378] shrink-0 mt-0.5" />
                <span className="leading-relaxed text-justify">{point}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Technologies Applied */}
        <div className="mb-8">
          <h3 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider mb-3">
            Technologies &amp; Libraries Applied
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-lg text-xs font-mono bg-white/[0.03] border border-amber-200/15 text-[#F7E7C4]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Results & Lessons */}
        {project.results && (
          <div className="mb-8 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs sm:text-sm text-emerald-200 font-mono">
            <span className="font-bold block mb-1 uppercase tracking-wider">Results &amp; Impact:</span>
            <p className="text-zinc-300">{project.results}</p>
          </div>
        )}

        {/* Modal Action Controls */}
        <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="btn-luxury-primary text-xs justify-center"
            >
              <Github className="w-4 h-4" />
              <span>Inspect Source on GitHub</span>
            </a>

            {project.demo && project.demo !== '#' && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="btn-luxury-secondary text-xs justify-center"
              >
                <ExternalLink className="w-4 h-4 text-[#E5C378]" />
                <span>Launch Live Application</span>
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="text-xs font-mono text-zinc-400 hover:text-white py-2 text-center"
          >
            Close Dossier (Esc)
          </button>
        </div>

      </div>
    </div>
  );
}
