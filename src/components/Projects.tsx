'use client';

import React from 'react';
import Image from 'next/image';
import { 
  FolderGit2, 
  ExternalLink, 
  Github, 
  ArrowUpRight 
} from 'lucide-react';
import { COSMIC_DATA } from '../data/cosmicPortfolioData';
import { Project } from '../types/portfolio';

interface ProjectsProps {
  onSelectProject: (project: Project) => void;
}

export default function Projects({ onSelectProject }: ProjectsProps) {
  const { projects } = COSMIC_DATA;

  return (
    <section id="projects" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/[0.08] border border-amber-200/20 text-[#E5C378] text-xs font-mono font-medium uppercase tracking-wider mb-4">
            <FolderGit2 className="w-3.5 h-3.5" /> Curated Works
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4 font-heading">
            Architectures Engineered for Real-World Impact
          </h2>
          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed text-justify sm:text-center">
            Explore verified engineering deployments spanning on-device computer vision models, relational database web portals, and machine learning recommender systems.
          </p>
        </div>

        {/* 2-Column Balanced Luxury Grid (2x2 for 4 curated projects) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="luxury-card overflow-hidden flex flex-col justify-between group transition-all duration-300"
            >
              {/* Thumbnail Container with Consistent 16/9 Aspect Ratio */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#0A0A0E] border-b border-white/[0.06]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D12] via-transparent to-transparent opacity-85" />

                {/* Category Pill */}
                <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-[11px] font-mono font-medium bg-[#070709]/90 backdrop-blur-md border border-amber-200/30 text-[#E5C378]">
                    {project.category}
                  </span>
                  {project.id === 'veyora-technologies' && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-amber-400/20 backdrop-blur-md border border-amber-300/40 text-amber-200 shadow-[0_0_10px_rgba(229,195,120,0.25)]">
                      ★ Featured Atelier
                    </span>
                  )}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white font-heading mb-2 group-hover:text-[#E5C378] transition-colors line-clamp-2">
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed text-justify mb-5 line-clamp-3">
                    {project.summary}
                  </p>

                  {/* Technology Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.stack.slice(0, 4).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/[0.03] border border-amber-200/15 text-zinc-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.stack.length > 4 && (
                      <span className="px-2 py-1 rounded-md text-[11px] font-mono bg-amber-400/[0.08] border border-amber-200/20 text-[#E5C378]">
                        +{project.stack.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-4 border-t border-white/[0.07] flex items-center justify-between gap-3">
                  <button
                    onClick={() => onSelectProject(project)}
                    className="btn-luxury-primary text-xs py-2 px-4 flex-1 justify-center"
                    aria-label={`View Case Study Dossier for ${project.title}`}
                  >
                    <span>Case Study Dossier</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-1.5">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="w-9 h-9 min-h-[36px] min-w-[36px] rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-amber-200/15 text-zinc-300 hover:text-white flex items-center justify-center transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                      title="GitHub Repository"
                      aria-label="GitHub Repository"
                    >
                      <Github className="w-4 h-4" />
                    </a>

                    {project.demo && project.demo !== '#' && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="w-9 h-9 min-h-[36px] min-w-[36px] rounded-xl bg-amber-400/10 hover:bg-amber-400/20 border border-amber-200/30 text-[#E5C378] hover:text-white flex items-center justify-center transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                        title="Live Demonstration"
                        aria-label="Live Demonstration"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
