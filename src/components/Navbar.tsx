'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import gsap from 'gsap';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const itemsRef = useRef<(HTMLLIElement | null)[]>([]);

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Systems', href: '#systems', id: 'systems' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Services', href: '#services', id: 'services' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Certificates', href: '#certificates', id: 'certificates' },
    { label: 'Contact', href: '#contact', id: 'contact' },
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
  }, []);

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
        <ul className="hidden lg:flex items-center gap-7 z-10">
          {navLinks.map((item, idx) => {
            const isActive = activeSection === item.id;
            return (
              <li
                key={item.id}
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

        {/* CTA Button & Mobile Toggle */}
        <div className="flex items-center gap-3 z-10">
          <a
            href="#contact"
            className="contact-btn text-xs font-mono font-semibold uppercase tracking-wider hidden sm:inline-flex items-center gap-1.5"
          >
            Hire Me
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-300 hover:text-white focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mx-auto w-[90%] bg-[#0e0b0b]/95 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 mt-2 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
          <ul className="flex flex-col gap-4">
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
            <li className="pt-2">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="contact-btn w-full text-center block text-xs uppercase tracking-wider"
              >
                Start a Conversation
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
