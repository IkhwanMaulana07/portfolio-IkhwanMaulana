'use client';

import React, { useState } from 'react';
import { Mail, MessageCircle, Send, ArrowRight, Check, Copy, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Contact() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2500);
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
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-orange-400 block mb-3">
            GET IN TOUCH
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-techno text-white tracking-tight mb-4">
            Start a Conversation
          </h2>
          <p className="text-sm sm:text-base text-gray-400 leading-relaxed font-sans">
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
                  className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-orange-500/40 hover:bg-white/[0.05] transition-all flex flex-col items-center text-center group"
                >
                  <Icon className="w-5 h-5 text-gray-400 group-hover:text-orange-400 mb-2 transition-colors" />
                  <span className="text-xs font-techno font-bold text-white group-hover:text-orange-400">
                    {ch.name}
                  </span>
                  <span className="text-[11px] font-mono text-gray-400 truncate max-w-full mt-1">
                    {ch.handle}
                  </span>
                </a>
              ) : (
                <button
                  key={idx}
                  onClick={ch.action}
                  className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-orange-500/40 hover:bg-white/[0.05] transition-all flex flex-col items-center text-center group focus:outline-none"
                >
                  {copied === 'email' ? (
                    <Check className="w-5 h-5 text-emerald-400 mb-2" />
                  ) : (
                    <Icon className="w-5 h-5 text-gray-400 group-hover:text-orange-400 mb-2 transition-colors" />
                  )}
                  <span className="text-xs font-techno font-bold text-white group-hover:text-orange-400">
                    {ch.name}
                  </span>
                  <span className="text-[11px] font-mono text-gray-400 truncate max-w-full mt-1">
                    {copied === 'email' ? 'Copied to Clipboard!' : ch.handle}
                  </span>
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
