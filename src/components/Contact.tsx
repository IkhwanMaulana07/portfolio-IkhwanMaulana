'use client';

import React from 'react';
import { Mail, Linkedin, Github, Phone } from 'lucide-react';
import confetti from 'canvas-confetti';
import gsap from 'gsap';
import SectionHeading from './SectionHeading';
import { usePortfolio } from '../context/PortfolioContext';

interface ContactChannel {
  name: string;
  desc: string;
  href: string;
  icon: React.ReactNode;
}

export default function Contact() {
  const { t } = usePortfolio();

  const channels: ContactChannel[] = [
    {
      name: 'Email',
      desc: t.contact.channels.email,
      href: 'mailto:ikhwanmaulana0707@gmail.com',
      icon: <Mail className="w-9 h-9" />,
    },
    {
      name: 'LinkedIn',
      desc: t.contact.channels.linkedin,
      href: 'https://www.linkedin.com/in/ikhwan-maulana-22b9b4229/',
      icon: <Linkedin className="w-9 h-9" />,
    },
    {
      name: 'GitHub',
      desc: t.contact.channels.github,
      href: 'https://github.com/IkhwanMaulana07',
      icon: <Github className="w-9 h-9" />,
    },
    {
      name: 'WhatsApp',
      desc: t.contact.channels.whatsapp,
      href: 'https://wa.me/6281234567890',
      icon: <Phone className="w-9 h-9" />,
    },
  ];

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const card = e.currentTarget;
    const fill = card.querySelector('.contact-fill');
    const content = card.querySelector('.contact-content');
    const icon = card.querySelector('.contact-icon');

    if (fill) {
      gsap.to(fill, {
        height: '100%',
        borderRadius: '0%',
        duration: 0.45,
        ease: 'power2.out',
      });
    }

    if (content) {
      gsap.to(content, {
        color: '#000000',
        duration: 0.35,
        ease: 'power2.out',
      });
    }

    if (icon) {
      gsap.to(icon, {
        color: '#000000',
        scale: 1.15,
        rotation: 12,
        duration: 0.4,
        ease: 'back.out(1.7)',
      });
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const card = e.currentTarget;
    const fill = card.querySelector('.contact-fill');
    const content = card.querySelector('.contact-content');
    const icon = card.querySelector('.contact-icon');

    if (fill) {
      gsap.to(fill, {
        height: '0%',
        borderRadius: '50% 50% 0 0',
        duration: 0.4,
        ease: 'power2.inOut',
      });
    }

    if (content) {
      gsap.to(content, {
        color: '#ffffff',
        duration: 0.35,
        ease: 'power2.inOut',
      });
    }

    if (icon) {
      gsap.to(icon, {
        color: '#ff6000',
        scale: 1,
        rotation: 0,
        duration: 0.35,
        ease: 'power2.out',
      });
    }
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#ff5500', '#ff8c00', '#ff3b00', '#ffffff'],
    });
  };

  return (
    <section id="contact" className="relative py-16 sm:py-24 px-4 sm:px-8 md:px-16 text-white select-none">
      {/* Ambient Glows */}
      <div className="absolute top-20 left-10 w-[350px] sm:w-[450px] h-[350px] sm:h-[450px] bg-gradient-to-r from-yellow-500/30 to-orange-500/20 rounded-full blur-[140px] opacity-40 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[350px] sm:w-[450px] h-[350px] sm:h-[450px] bg-gradient-to-r from-orange-500/30 to-red-500/20 rounded-full blur-[140px] opacity-40 pointer-events-none" />

      <SectionHeading title={t.contact.title} className="text-orange-400" />

      <p className="text-center text-gray-400 max-w-2xl mx-auto mt-3 mb-10 sm:mb-14 text-xs sm:text-sm md:text-base font-sans px-2">
        {t.contact.subtitle}
      </p>

      {/* 4 Liquid-Rise Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 max-w-5xl mx-auto">
        {channels.map((ch, idx) => (
          <a
            key={idx}
            href={ch.href}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="group relative overflow-hidden p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-black/40 border border-white/10 backdrop-blur-xl transition-all duration-300 block shadow-xl min-h-[90px]"
          >
            {/* Rising orange liquid layer */}
            <div className="contact-fill absolute left-0 bottom-0 w-full h-0 bg-orange-500 rounded-[50%_50%_0_0] pointer-events-none z-0" />

            {/* Content that inverts to dark text */}
            <div className="contact-content relative z-10">
              <div className="contact-icon text-orange-500 mb-4 inline-block transition-transform">
                {ch.icon}
              </div>
              <h3 className="text-xl font-bold font-techno">{ch.name}</h3>
              <p className="mt-2 text-sm opacity-80 font-sans">{ch.desc}</p>
            </div>
          </a>
        ))}
      </div>

      {/* Start a Conversation CTA */}
      <div className="flex justify-center mt-14">
        <a
          href="mailto:ikhwanmaulana0707@gmail.com"
          onClick={triggerConfetti}
          className="bg-gradient-to-r from-[#FA6E00] to-[#E60026] text-white px-8 py-3.5 rounded-xl font-semibold shadow-[0_0_25px_rgba(250,110,0,0.5)] hover:scale-105 transition-all duration-300 font-mono tracking-wide"
        >
          Start a Conversation
        </a>
      </div>
    </section>
  );
}
