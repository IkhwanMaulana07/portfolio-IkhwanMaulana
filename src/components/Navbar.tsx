'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Github, Linkedin } from 'lucide-react';
import { COSMIC_DATA } from '../data/cosmicPortfolioData';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const sectionIds = [
        'home',
        'about',
        'projects',
        'tech-stack',
        'workflow',
        'experience',
        'blog',
        'contact'
      ];

      const scrollPos = window.scrollY + 180;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Overview', href: '#home', id: 'home' },
    { label: 'Capabilities', href: '#about', id: 'about' },
    { label: 'Works', href: '#projects', id: 'projects' },
    { label: 'Architecture', href: '#tech-stack', id: 'tech-stack' },
    { label: 'Lifecycle', href: '#workflow', id: 'workflow' },
    { label: 'Provenance', href: '#experience', id: 'experience' },
    { label: 'Perspectives', href: '#blog', id: 'blog' },
    { label: 'Consultation', href: '#contact', id: 'contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#070709]/90 backdrop-blur-2xl border-b border-amber-200/15 shadow-[0_12px_40px_-15px_rgba(0,0,0,0.9)] py-3.5'
          : 'bg-transparent border-b border-transparent py-5 sm:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand: Monogram Plaque + Name */}
        <a
          href="#home"
          className="flex items-center gap-3.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-xl p-1"
          aria-label="Ikhwan Maulana Home"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1E1E26] via-[#14141B] to-[#0A0A0E] border border-amber-200/30 flex items-center justify-center font-display-luxury font-bold text-sm text-[#E5C378] shadow-[0_0_15px_rgba(212,175,55,0.15)] group-hover:border-amber-300/60 group-hover:shadow-[0_0_22px_rgba(229,195,120,0.3)] group-hover:scale-105 transition-all duration-300">
            {COSMIC_DATA.profile.monogram}
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-bold text-sm tracking-tight text-white group-hover:text-[#E5C378] transition-colors">
              {COSMIC_DATA.profile.name}
            </span>
            <span className="text-[10px] font-mono tracking-widest text-[#E5C378]/80 uppercase">
              AI &amp; Systems Atelier
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1 bg-[#101016]/80 border border-amber-200/15 rounded-full px-4 py-1.5 backdrop-blur-lg shadow-inner">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                className={`relative px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                  isActive
                    ? 'text-[#F7E7C4] bg-amber-400/15 font-semibold shadow-[0_0_15px_rgba(229,195,120,0.2)]'
                    : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#E5C378] shadow-[0_0_8px_#E5C378]" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Actions & Mobile Menu Toggle */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          
          {/* Quick Social Profile Links */}
          <a
            href={COSMIC_DATA.profile.github}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-amber-200/15 text-zinc-300 hover:text-white transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            title="GitHub Profile"
            aria-label="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>

          <a
            href={COSMIC_DATA.profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-amber-200/15 text-zinc-300 hover:text-white transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            title="LinkedIn Profile"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>

          {/* Luxury CTA Button */}
          <a
            href="#contact"
            className="btn-luxury-primary text-xs py-2 px-4.5 rounded-full"
            id="nav-consultation-btn"
          >
            <span>Consultation</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden inline-flex items-center justify-center w-11 h-11 min-h-[44px] min-w-[44px] rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-amber-200/20 text-zinc-200 hover:text-white transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0A0A0F]/95 backdrop-blur-2xl border-b border-amber-200/20 px-5 py-6 mt-3 shadow-2xl transition-all">
          <nav className="flex flex-col gap-1.5">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-4 py-3 min-h-[44px] rounded-xl text-sm font-medium text-zinc-200 hover:text-[#E5C378] hover:bg-white/[0.04] transition-all"
              >
                <span>{link.label}</span>
                <span className="text-xs font-mono text-amber-200/60">→</span>
              </a>
            ))}
          </nav>
          
          <div className="flex items-center gap-3 pt-5 mt-4 border-t border-white/10">
            <a
              href={COSMIC_DATA.profile.github}
              target="_blank"
              rel="noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 min-h-[44px] rounded-xl bg-white/[0.03] border border-amber-200/20 text-xs font-medium text-zinc-200 hover:text-white"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <a
              href={COSMIC_DATA.profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 min-h-[44px] rounded-xl bg-white/[0.03] border border-amber-200/20 text-xs font-medium text-zinc-200 hover:text-white"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
