'use client';

import React from 'react';
import { Linkedin, Github, Phone, Mail } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function Footer() {
  const { t } = usePortfolio();
  const socials = [
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/ikhwan-maulana-22b9b4229/',
      icon: <Linkedin size={28} />,
    },
    {
      name: 'GitHub',
      href: 'https://github.com/IkhwanMaulana07',
      icon: <Github size={28} />,
    },
    {
      name: 'WhatsApp',
      href: 'https://wa.me/6281234567890',
      icon: <Phone size={28} />,
    },
    {
      name: 'Email',
      href: 'mailto:ikhwanmaulana0707@gmail.com',
      icon: <Mail size={28} />,
    },
  ];

  return (
    <footer className="relative w-full mt-16 sm:mt-24 overflow-hidden bg-[#0d0d10] text-white border-t border-white/[0.06] select-none">
      {/* Footer Orb */}
      <div className="footer-orb absolute top-[-180px] left-1/2 -translate-x-1/2 w-[350px] sm:w-[420px] h-[350px] sm:h-[420px] rounded-full bg-orange-500/[0.07] blur-[140px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-8 md:px-10 py-10 sm:py-16">
        {/* Top Accent Divider */}
        <div className="relative mb-6 sm:mb-10">
          <div className="h-px w-full bg-white/[0.05]" />
          <div className="footer-top-line absolute inset-x-0 top-0 h-px bg-gradient-to-r from-orange-500 via-orange-400/70 to-transparent" />
        </div>

        <div className="grid lg:grid-cols-[1.4fr_.6fr] gap-8 sm:gap-12 lg:gap-16">
          {/* Main Slogan & Mission */}
          <div>
            <div className="footer-eyebrow flex items-center gap-3 mb-4 sm:mb-5 text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-orange-400 font-mono">
              <span className="w-6 h-px bg-orange-500" />
              THE LAST FRAME
            </div>

            <div className="[perspective:1200px] overflow-visible">
              <h2 className="footer-title-line-1 text-[clamp(1.9rem,6.5vw,5.5rem)] font-black uppercase leading-[0.84] tracking-[-0.04em] font-techno text-white break-words">
                {t.footer.title1}
              </h2>
              <div className="mt-2 sm:mt-4 overflow-visible">
                <h2 className="footer-title-line-2 text-[clamp(1.9rem,6.5vw,5.5rem)] font-black uppercase leading-[0.84] tracking-[-0.04em] text-orange-500 font-techno break-words">
                  {t.footer.title2}
                </h2>
              </div>
            </div>

            <div className="max-w-xl mt-5 sm:mt-8">
              <p className="footer-description text-xs sm:text-sm lg:text-base text-gray-400 leading-6 md:leading-7 font-sans">
                {t.footer.desc}
              </p>
            </div>
          </div>

          {/* Navigation & Services Columns */}
          <div className="grid grid-cols-2 gap-8 lg:pt-8">
            <div>
              <div className="mb-4 text-[9px] md:text-[10px] uppercase tracking-[0.25em] text-gray-400 font-mono">
                NAVIGATION
              </div>
              <nav className="space-y-3 font-mono text-xs">
                {[
                  { name: 'Home', href: '#home' },
                  { name: 'About', href: '#about' },
                  { name: 'Systems', href: '#systems' },
                  { name: 'Skills', href: '#skills' },
                  { name: 'Services', href: '#services' },
                  { name: 'Projects', href: '#projects' },
                  { name: 'Certificates', href: '#certificates' },
                  { name: 'Contact', href: '#contact' },
                ].map((item, idx) => (
                  <a
                    key={idx}
                    href={item.href}
                    className="flex items-center justify-between text-gray-400 hover:text-orange-400 transition-colors group"
                  >
                    <span>{item.name}</span>
                    <span className="text-orange-500 opacity-30 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                      →
                    </span>
                  </a>
                ))}
              </nav>
            </div>

            <div>
              <div className="mb-4 text-[9px] md:text-[10px] uppercase tracking-[0.25em] text-gray-400 font-mono">
                WHAT I BUILD
              </div>
              <div className="space-y-4 font-mono text-xs text-gray-400">
                <div className="group cursor-default">
                  <span className="block group-hover:text-orange-400 transition-colors">Web Experiences</span>
                  <span className="block w-0 group-hover:w-8 h-px bg-orange-500 transition-all duration-300 mt-1" />
                </div>
                <div className="group cursor-default">
                  <span className="block group-hover:text-orange-400 transition-colors">Web Applications</span>
                  <span className="block w-0 group-hover:w-8 h-px bg-orange-500 transition-all duration-300 mt-1" />
                </div>
                <div className="group cursor-default">
                  <span className="block group-hover:text-orange-400 transition-colors">Digital Systems</span>
                  <span className="block w-0 group-hover:w-8 h-px bg-orange-500 transition-all duration-300 mt-1" />
                </div>
                <div className="group cursor-default">
                  <span className="block group-hover:text-orange-400 transition-colors">RESTful APIs</span>
                  <span className="block w-0 group-hover:w-8 h-px bg-orange-500 transition-all duration-300 mt-1" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="relative mt-12 md:mt-16">
          <div className="h-px w-full bg-white/[0.06]" />
          <div className="footer-divider absolute inset-x-0 top-0 h-px bg-gradient-to-r from-orange-500/70 via-orange-400/30 to-transparent" />
        </div>

        {/* Meta Line */}
        <div className="footer-meta mt-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-[9px] md:text-[10px] uppercase tracking-[0.18em] font-mono">
          <span className="text-gray-500">REACT • NEXT.JS • GSAP • TAILWIND • LENIS</span>
          <span className="text-gray-400">{t.footer.designedBy}</span>
        </div>

        {/* Social Icons (Large Glowing Rings) */}
        <div className="mt-14 md:mt-16">
          <div className="mb-6 text-[9px] md:text-[10px] uppercase tracking-[0.28em] text-gray-500 text-center font-mono">
            SOCIALS
          </div>
          <div className="flex items-center justify-center gap-4 sm:gap-8 flex-wrap">
            {socials.map((soc, idx) => (
              <a
                key={idx}
                href={soc.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={soc.name}
                className="relative group flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 min-w-[44px] min-h-[44px] rounded-full border border-orange-500/20 hover:border-orange-500 transition-all duration-300 hover:scale-110 shadow-lg text-orange-500 hover:text-white hover:bg-orange-500/20"
              >
                <span className="absolute inset-0 rounded-full bg-orange-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                {soc.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Closing Quote */}
        <div className="mt-12 md:mt-16 text-center">
          <p className="footer-closing max-w-3xl mx-auto text-[clamp(1.1rem,2vw,1.5rem)] font-medium tracking-tight text-gray-300 font-sans">
            Good design gets attention. Great digital experiences stay with you.
          </p>
        </div>
      </div>
    </footer>
  );
}
