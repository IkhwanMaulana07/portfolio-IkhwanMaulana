'use client';

import React from 'react';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { COSMIC_DATA } from '../data/cosmicPortfolioData';

export default function Footer() {
  const { profile } = COSMIC_DATA;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-amber-200/15 bg-[#070709] py-12 relative overflow-hidden z-10">
      
      {/* Subtle Warm Specular Horizon Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-28 bg-gradient-to-t from-amber-400/[0.06] via-amber-200/[0.02] to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/[0.07]">
          
          {/* Brand & Monogram */}
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1E1E26] via-[#14141B] to-[#0A0A0E] border border-amber-200/30 flex items-center justify-center font-display-luxury font-bold text-sm text-[#E5C378] shadow-[0_0_15px_rgba(212,175,55,0.15)]">
              {profile.monogram}
            </div>
            <div>
              <span className="font-heading font-bold text-sm text-white tracking-tight">
                {profile.name}
              </span>
              <p className="text-[11px] font-mono text-[#E5C378]/90">
                {profile.headline}
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-zinc-400">
            <a href="#home" className="hover:text-[#E5C378] transition-colors">Overview</a>
            <a href="#about" className="hover:text-[#E5C378] transition-colors">Capabilities</a>
            <a href="#projects" className="hover:text-[#E5C378] transition-colors">Works</a>
            <a href="#tech-stack" className="hover:text-[#E5C378] transition-colors">Architecture</a>
            <a href="#workflow" className="hover:text-[#E5C378] transition-colors">Lifecycle</a>
            <a href="#experience" className="hover:text-[#E5C378] transition-colors">Provenance</a>
            <a href="#blog" className="hover:text-[#E5C378] transition-colors">Perspectives</a>
            <a href="#contact" className="hover:text-[#E5C378] transition-colors">Consultation</a>
          </div>

          {/* Back to Top Button */}
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-4 py-2 min-h-[44px] rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-amber-200/15 text-xs font-mono text-zinc-300 hover:text-white transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            aria-label="Back to top"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#E5C378]" />
          </button>
        </div>

        {/* Bottom Credits & Dynamic Year */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-400">
          <p>
            &copy; {new Date().getFullYear()} {profile.name}. All rights reserved. Crafted with architectural distinction.
          </p>
          <div className="flex items-center gap-4 text-zinc-400">
            <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-[#E5C378] transition-colors">
              GitHub
            </a>
            <span>•</span>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-[#E5C378] transition-colors">
              LinkedIn
            </a>
            <span>•</span>
            <a href={`mailto:${profile.email}`} className="hover:text-[#E5C378] transition-colors">
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
