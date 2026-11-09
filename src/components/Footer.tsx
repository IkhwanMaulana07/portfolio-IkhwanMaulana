'use client';

import React from 'react';
import { ArrowUp, Github, Linkedin, Mail, Twitter } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/[0.08] bg-[#030305] pt-20 pb-12 relative overflow-hidden z-10">
      
      {/* Warm Ambient Horizon Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-24 bg-gradient-to-b from-orange-600/10 via-transparent to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Big Display Banner */}
        <div className="pb-16 border-b border-white/[0.08]">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-techno text-white tracking-tight mb-4 leading-tight">
            LET&apos;S BUILD SOMETHING THAT MATTERS.
          </h2>
          <p className="text-sm sm:text-base text-gray-400 max-w-2xl leading-relaxed font-sans">
            High-impact design, client-validated architecture, and production-tested software engineering that deliver lasting competitive advantage.
          </p>
        </div>

        {/* 4-Column Footer Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 py-12 border-b border-white/[0.08]">
          
          {/* Col 1: Identity */}
          <div>
            <span className="font-techno font-bold text-sm tracking-wider text-orange-400 block mb-3 uppercase">
              IKHWAN MAULANA
            </span>
            <p className="text-xs text-gray-400 leading-relaxed font-sans mb-4">
              Full Stack Developer &amp; Software Engineer crafting scalable, high-performance web systems and certified national technical solutions.
            </p>
            <div className="flex items-center gap-2">
              <a
                href="https://github.com/IkhwanMaulana07"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-orange-500/40 transition-all"
                aria-label="GitHub"
              >
                <Github className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://linkedin.com/in/ikhwan-maulana-1700b842b"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-orange-500/40 transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <a
                href="mailto:ikhwanmaulana796@gmail.com"
                className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-orange-500/40 transition-all"
                aria-label="Email"
              >
                <Mail className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <span className="font-techno font-bold text-xs tracking-wider text-white block mb-3 uppercase">
              NAVIGATION
            </span>
            <ul className="space-y-2 text-xs font-mono text-gray-400">
              <li><a href="#home" className="hover:text-orange-400 transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-orange-400 transition-colors">About</a></li>
              <li><a href="#focus" className="hover:text-orange-400 transition-colors">Focus</a></li>
              <li><a href="#systems" className="hover:text-orange-400 transition-colors">Systems</a></li>
              <li><a href="#certifications" className="hover:text-orange-400 transition-colors">BNSP Credentials</a></li>
              <li><a href="#skills" className="hover:text-orange-400 transition-colors">Technical Stack</a></li>
              <li><a href="#services" className="hover:text-orange-400 transition-colors">Services</a></li>
              <li><a href="#contact" className="hover:text-orange-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Col 3: What I Build */}
          <div>
            <span className="font-techno font-bold text-xs tracking-wider text-white block mb-3 uppercase">
              WHAT I BUILD
            </span>
            <ul className="space-y-2 text-xs font-mono text-gray-400">
              <li>Web Applications (SPAs)</li>
              <li>High-Concurrency REST APIs</li>
              <li>SaaS &amp; Monorepo Platforms</li>
              <li>Normalized Relational DBs</li>
              <li>AI Chatbot Integrations</li>
            </ul>
          </div>

          {/* Col 4: Availability */}
          <div>
            <span className="font-techno font-bold text-xs tracking-wider text-white block mb-3 uppercase">
              AVAILABILITY
            </span>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono text-emerald-400 font-semibold">Available for Work</span>
              </div>
              <p className="text-[11px] text-gray-400 font-sans leading-relaxed">
                Open to Full Stack Developer and Software Engineer opportunities.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Credits & Back To Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} Ikhwan Maulana • All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-gray-300 hover:text-white transition-all text-xs"
            aria-label="Back to top"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-orange-400" />
          </button>
        </div>

      </div>
    </footer>
  );
}
