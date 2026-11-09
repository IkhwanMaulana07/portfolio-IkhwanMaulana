'use client';

import React, { useState } from 'react';
import { Mail, MessageCircle, ArrowRight, Check, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';
import gsap from 'gsap';
import SectionHeading from './SectionHeading';

export default function Contact() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2500);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.currentTarget;
    const fill = target.querySelector('.contact-fill');
    const content = target.querySelectorAll('.contact-content');
    const icon = target.querySelector('.contact-icon');
    if (!fill) return;

    gsap.killTweensOf([fill, content, icon]);
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    tl.to(fill, { height: '100%', borderRadius: '0%', duration: 0.65 }, 0);
    tl.to(content, { color: '#000000', y: -2, duration: 0.35, stagger: 0.03 }, 0.15);
    if (icon) {
      tl.to(icon, { color: '#000000', scale: 1.15, rotation: -6, duration: 0.35, ease: 'back.out(1.7)' }, 0.1);
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.currentTarget;
    const fill = target.querySelector('.contact-fill');
    const content = target.querySelectorAll('.contact-content');
    const icon = target.querySelector('.contact-icon');
    if (!fill) return;

    gsap.killTweensOf([fill, content, icon]);
    const tl = gsap.timeline({ defaults: { ease: 'power4.inOut' } });
    tl.to(content, { color: '', y: 0, duration: 0.3, stagger: 0.02 }, 0);
    if (icon) {
      tl.to(icon, { color: '#f97316', scale: 1, rotation: 0, duration: 0.3, ease: 'power3.out' }, 0);
    }
    tl.to(fill, { height: '0%', borderRadius: '50% 50% 0 0', duration: 0.55 }, 0.05);
  };

  const channels = [
    {
      name: 'Email (Direct)',
      handle: 'ikhwanmaulana796@gmail.com',
      action: () => handleCopy('ikhwanmaulana796@gmail.com', 'email'),
      copiedText: 'Copied!',
      icon: Mail,
    },
    {
      name: 'LinkedIn',
      handle: 'in/ikhwan-maulana-1700b842b',
      href: 'https://linkedin.com/in/ikhwan-maulana-1700b842b',
      icon: ExternalLink,
    },
    {
      name: 'WhatsApp (Direct)',
      handle: '+62 896-7367-4598',
      href: 'https://wa.me/6289673674598?text=Hello%20Ikhwan,%20I%20would%20like%20to%20discuss%20a%20project',
      icon: MessageCircle,
    },
    {
      name: 'GitHub',
      handle: 'github.com/IkhwanMaulana07',
      href: 'https://github.com/IkhwanMaulana07',
      icon: ExternalLink,
    },
  ];

  const handleConfetti = () => {
    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#ff5500', '#ff7700', '#ffa500', '#ffffff'],
      });
    } catch {}
  };

  return (
    <section id="contact" className="py-24 sm:py-32 relative overflow-hidden">
      {/* Background Center Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55vw] h-[55vw] max-w-[600px] max-h-[600px] rounded-full bg-orange-600/12 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <SectionHeading title="START A CONVERSATION" />
          <p className="text-sm sm:text-base text-gray-400 leading-relaxed font-sans -mt-8">
            Have a project in mind, a role to discuss, or want to explore collaboration? Reach out through any of the preferred channels below.
          </p>
        </div>

        {/* Central Contact Monolith Box */}
        <div className="max-w-4xl mx-auto rounded-[32px] border border-orange-500/30 bg-[#09090F]/90 backdrop-blur-2xl p-8 sm:p-12 md:p-16 shadow-[0_20px_70px_rgba(0,0,0,0.95),0_0_40px_rgba(255,100,0,0.15)] flex flex-col items-center text-center">
          
          {/* 4 Quick Reach Channels Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full mb-10">
            {channels.map((ch, idx) => {
              const Icon = ch.icon;
              return ch.href ? (
                <a
                  key={idx}
                  href={ch.href}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className="relative p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-orange-500/50 transition-all flex flex-col items-center text-center group overflow-hidden cursor-pointer"
                >
                  {/* Liquid fill overlay */}
                  <div className="contact-fill absolute bottom-0 left-0 right-0 h-0 bg-gradient-to-t from-orange-600 to-amber-400 rounded-t-[50%] pointer-events-none" />

                  <div className="relative z-10 flex flex-col items-center">
                    <Icon className="contact-icon w-6 h-6 text-orange-400 mb-2 transition-transform" />
                    <span className="contact-content text-xs font-techno font-bold text-white">
                      {ch.name}
                    </span>
                    <span className="contact-content text-[11px] font-mono text-gray-400 truncate max-w-full mt-1">
                      {ch.handle}
                    </span>
                  </div>
                </a>
              ) : (
                <button
                  key={idx}
                  onClick={ch.action}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className="relative p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-orange-500/50 transition-all flex flex-col items-center text-center group overflow-hidden cursor-pointer focus:outline-none"
                >
                  {/* Liquid fill overlay */}
                  <div className="contact-fill absolute bottom-0 left-0 right-0 h-0 bg-gradient-to-t from-orange-600 to-amber-400 rounded-t-[50%] pointer-events-none" />

                  <div className="relative z-10 flex flex-col items-center">
                    {copied === 'email' ? (
                      <Check className="contact-icon w-6 h-6 text-emerald-400 mb-2" />
                    ) : (
                      <Icon className="contact-icon w-6 h-6 text-orange-400 mb-2 transition-transform" />
                    )}
                    <span className="contact-content text-xs font-techno font-bold text-white">
                      {ch.name}
                    </span>
                    <span className="contact-content text-[11px] font-mono text-gray-400 truncate max-w-full mt-1">
                      {copied === 'email' ? 'Copied to Clipboard!' : ch.handle}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Large CTA Button */}
          <a
            href="https://wa.me/6289673674598?text=Hello%20Ikhwan,%20I'm%20interested%20in%20working%20together!"
            target="_blank"
            rel="noreferrer"
            onClick={handleConfetti}
            className="btn-orange-glow text-base sm:text-lg font-bold font-techno py-4 px-10 tracking-wider shadow-[0_0_35px_rgba(255,100,0,0.6)]"
          >
            <span>Let&apos;s Work Together</span>
            <ArrowRight className="w-5 h-5" />
          </a>

        </div>

      </div>
    </section>
  );
}
