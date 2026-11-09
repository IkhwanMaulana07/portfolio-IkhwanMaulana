'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Sun, Moon, Globe, Check } from 'lucide-react';
import gsap from 'gsap';
import { usePortfolio } from '../context/PortfolioContext';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const itemsRef = useRef<(HTMLLIElement | null)[]>([]);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  const { lang, setLang, theme, toggleTheme, t } = usePortfolio();

  const navLinks = [
    { label: t.nav.home, href: '#home', id: 'home' },
    { label: t.nav.about, href: '#about', id: 'about' },
    { label: t.nav.systems, href: '#systems', id: 'systems' },
    { label: t.nav.skills, href: '#skills', id: 'skills' },
    { label: t.nav.services, href: '#services', id: 'services' },
    { label: t.nav.projects, href: '#projects', id: 'projects' },
    { label: t.nav.certificates, href: '#certificates', id: 'certificates' },
    { label: t.nav.contact, href: '#contact', id: 'contact' },
  ];

  // Active section spy
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 250;
      for (const item of navLinks) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close lang dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target as Node)) {
        setLangMenuOpen(false);
      }
    };
    if (langMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [langMenuOpen]);

  // GSAP roll-over letter swap on hover
  useEffect(() => {
    const cleanups: (() => void)[] = [];

    itemsRef.current.forEach((item) => {
      if (!item) return;
      const topLetters = item.querySelectorAll('.letter-top');
      const bottomLetters = item.querySelectorAll('.letter-bottom');
      const underline = item.querySelector('.underline');

      const onEnter = () => {
        gsap.to(topLetters, { y: '100%', stagger: 0.03, duration: 0.35, ease: 'power2.out' });
        gsap.to(bottomLetters, { y: '0%', stagger: 0.03, duration: 0.35, ease: 'power2.out' });
        if (underline) gsap.to(underline, { scaleX: 1, duration: 0.4, ease: 'expo.out' });
      };

      const onLeave = () => {
        gsap.to(topLetters, { y: '0%', stagger: 0.03, duration: 0.35, ease: 'power2.inOut' });
        gsap.to(bottomLetters, { y: '-100%', stagger: 0.03, duration: 0.35, ease: 'power2.inOut' });
        if (underline) gsap.to(underline, { scaleX: 0, duration: 0.3, ease: 'power2.inOut' });
      };

      item.addEventListener('mouseenter', onEnter);
      item.addEventListener('mouseleave', onLeave);

      cleanups.push(() => {
        item.removeEventListener('mouseenter', onEnter);
        item.removeEventListener('mouseleave', onLeave);
      });
    });

    return () => cleanups.forEach((c) => c());
  }, [lang]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <nav className="navbar-container group text-white">
        {/* Sweeping Shine Overlay */}
        <div className="shine-wrapper">
          <div className="navbar-shine" />
        </div>

        {/* Brand Logo */}
        <a href="#home" className="flex items-center gap-2.5 z-10" aria-label="Ikhwan Maulana">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center font-techno font-extrabold text-xs text-white shadow-[0_0_15px_rgba(255,100,0,0.5)]">
            IM
          </div>
          <span className="font-techno font-bold text-sm tracking-wider text-white hidden sm:inline-block">
            IKHWAN
          </span>
        </a>

        {/* Desktop Links with Roll-over letter swap */}
        <ul className="hidden lg:flex items-center gap-6 xl:gap-7 z-10">
          {navLinks.map((item, idx) => {
            const isActive = activeSection === item.id;
            return (
              <li
                key={`${item.id}-${lang}`}
                ref={(el) => { itemsRef.current[idx] = el; }}
                className="relative cursor-pointer will-change-transform overflow-hidden py-1 px-0.5"
              >
                <a href={item.href} className="inline-block text-xs uppercase tracking-wider font-medium font-sans">
                  {item.label.split('').map((char, cIdx) => (
                    <span key={cIdx} className="relative inline-block overflow-hidden align-top">
                      <span className={`letter-top block transition-colors duration-200 ${isActive ? 'text-orange-400 font-semibold' : 'text-gray-300'}`}>
                        {char === ' ' ? '\u00A0' : char}
                      </span>
                      <span className="letter-bottom absolute top-0 left-0 block -translate-y-full text-orange-500 font-semibold">
                        {char === ' ' ? '\u00A0' : char}
                      </span>
                    </span>
                  ))}
                </a>
                <span
                  className={`underline absolute bottom-0 left-0 w-full h-[2px] bg-orange-500 transition-transform origin-left ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </li>
            );
          })}
        </ul>

        {/* Controls: Language + Theme + CTA + Mobile Toggle */}
        <div className="flex items-center gap-2.5 sm:gap-3 z-10">
          {/* Language Switcher */}
          <div className="relative" ref={langDropdownRef}>
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-mono text-gray-200 transition-colors"
              aria-label="Select Language"
            >
              <Globe size={13} className="text-orange-400" />
              <span className="font-semibold uppercase tracking-wider">
                {lang === 'id' ? 'ID' : lang === 'zh' ? '中文' : 'EN'}
              </span>
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-2 py-1.5 w-32 bg-[#110e14] border border-orange-500/30 rounded-2xl shadow-2xl backdrop-blur-xl z-50 overflow-hidden">
                <button
                  onClick={() => { setLang('id'); setLangMenuOpen(false); }}
                  className={`w-full px-3 py-2 text-left text-xs font-mono flex items-center justify-between hover:bg-orange-500/20 transition-colors ${
                    lang === 'id' ? 'text-orange-400 font-bold bg-orange-500/10' : 'text-gray-300'
                  }`}
                >
                  <span>🇮🇩 Indonesia</span>
                  {lang === 'id' && <Check size={12} className="text-orange-400" />}
                </button>
                <button
                  onClick={() => { setLang('en'); setLangMenuOpen(false); }}
                  className={`w-full px-3 py-2 text-left text-xs font-mono flex items-center justify-between hover:bg-orange-500/20 transition-colors ${
                    lang === 'en' ? 'text-orange-400 font-bold bg-orange-500/10' : 'text-gray-300'
                  }`}
                >
                  <span>🇬🇧 English</span>
                  {lang === 'en' && <Check size={12} className="text-orange-400" />}
                </button>
                <button
                  onClick={() => { setLang('zh'); setLangMenuOpen(false); }}
                  className={`w-full px-3 py-2 text-left text-xs font-mono flex items-center justify-between hover:bg-orange-500/20 transition-colors ${
                    lang === 'zh' ? 'text-orange-400 font-bold bg-orange-500/10' : 'text-gray-300'
                  }`}
                >
                  <span>🇨🇳 中文</span>
                  {lang === 'zh' && <Check size={12} className="text-orange-400" />}
                </button>
              </div>
            )}
          </div>

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            className="p-1.5 sm:p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-gray-200 hover:text-orange-400 transition-all duration-300 hover:scale-105"
            aria-label="Toggle Light/Dark Mode"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? (
              <Sun size={15} className="text-yellow-400" />
            ) : (
              <Moon size={15} className="text-orange-400" />
            )}
          </button>

          {/* CTA Button */}
          <a
            href="#contact"
            className="contact-btn text-xs font-mono font-semibold uppercase tracking-wider hidden sm:inline-flex items-center gap-1.5"
          >
            {t.nav.hireMe}
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 text-gray-300 hover:text-white focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mx-auto w-[92%] bg-[#0e0b0b]/95 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 mt-2 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
          <ul className="flex flex-col gap-3">
            {navLinks.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-2 text-sm uppercase tracking-wider font-mono ${
                    activeSection === item.id ? 'text-orange-500 font-bold' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}

            {/* Mobile Language Selection Row */}
            <li className="pt-3 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono text-gray-400">Language:</span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setLang('id')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono ${
                    lang === 'id' ? 'bg-orange-500 text-white font-bold' : 'bg-white/5 text-gray-300'
                  }`}
                >
                  ID
                </button>
                <button
                  onClick={() => setLang('en')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono ${
                    lang === 'en' ? 'bg-orange-500 text-white font-bold' : 'bg-white/5 text-gray-300'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLang('zh')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono ${
                    lang === 'zh' ? 'bg-orange-500 text-white font-bold' : 'bg-white/5 text-gray-300'
                  }`}
                >
                  中文
                </button>
              </div>
            </li>

            <li className="pt-2">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="contact-btn w-full text-center block text-xs uppercase tracking-wider"
              >
                {t.nav.startConversation}
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
