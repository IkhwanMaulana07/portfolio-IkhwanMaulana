'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sectionIds = ['home', 'about', 'focus', 'systems', 'certifications', 'skills', 'services', 'contact'];
      const scrollPos = window.scrollY + 200;

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
    { label: 'HOME', href: '#home', id: 'home' },
    { label: 'ABOUT', href: '#about', id: 'about' },
    { label: 'FOCUS', href: '#focus', id: 'focus' },
    { label: 'SYSTEMS', href: '#systems', id: 'systems' },
    { label: 'CREDENTIALS', href: '#certifications', id: 'certifications' },
    { label: 'STACK', href: '#skills', id: 'skills' },
    { label: 'SERVICES', href: '#services', id: 'services' },
    { label: 'CONTACT', href: '#contact', id: 'contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#050508]/85 backdrop-blur-xl border-b border-white/[0.08] py-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
          : 'bg-transparent border-b border-transparent py-5 sm:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo & Monogram */}
        <a
          href="#home"
          className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded-xl"
          aria-label="Ikhwan Maulana Portfolio"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1C1C24] via-[#101015] to-[#0A0A0E] border border-orange-500/30 flex items-center justify-center font-techno font-bold text-sm text-orange-400 shadow-[0_0_15px_rgba(255,100,0,0.2)] group-hover:border-orange-500/60 group-hover:shadow-[0_0_20px_rgba(255,100,0,0.4)] transition-all duration-300 overflow-hidden relative">
            <span className="font-techno font-extrabold text-sm tracking-tighter text-orange-400 group-hover:text-white transition-colors">
              IM
            </span>
          </div>
          <span className="font-techno font-bold text-base tracking-wider text-white group-hover:text-orange-400 transition-colors">
            IKHWAN
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#0E0E14]/80 border border-white/[0.08] rounded-full px-5 py-2 backdrop-blur-xl shadow-inner">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-medium tracking-wider transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 ${
                  isActive
                    ? 'text-white bg-orange-500/20 font-semibold border border-orange-500/40 shadow-[0_0_12px_rgba(255,100,0,0.3)]'
                    : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right CTA Button */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="#contact"
            className="btn-orange-glow text-xs uppercase tracking-wider py-2.5 px-6"
          >
            <span>LET&apos;S TALK</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex sm:hidden items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-gray-300 hover:text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#07070B]/95 backdrop-blur-2xl border-b border-white/10 px-6 py-6 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-xl text-sm font-mono text-gray-300 hover:text-white hover:bg-white/[0.05] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="btn-orange-glow w-full text-center text-xs uppercase tracking-wider py-3 mt-4"
          >
            LET&apos;S TALK
          </a>
        </div>
      )}
    </header>
  );
}
