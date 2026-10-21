'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useAnimation } from 'framer-motion';
import {
  ArrowRight,
  Download,
  Github,
  Linkedin,
  Mail,
  ChevronDown,
  Cpu,
  Layers,
  Activity,
  Shield,
  MapPin,
  Briefcase,
  Sparkles
} from 'lucide-react';
import { COSMIC_DATA } from '../data/cosmicPortfolioData';

export default function Hero() {
  const { profile, heroStats } = COSMIC_DATA;
  const controls = useAnimation();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    controls.start({
      y: ['-120%', '6%', '-2%', '1%', '0%'],
      rotate: [12, -6, 3, -1, 0],
      opacity: [0, 1, 1, 1, 1],
      transition: {
        duration: 2.2,
        ease: [0.22, 1, 0.36, 1],
        times: [0, 0.35, 0.55, 0.75, 1],
      },
    });
  }, [controls]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  return (
    <section
      id="home"
      className="relative min-h-[96vh] pt-28 pb-16 lg:pt-36 lg:pb-24 flex flex-col justify-center overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Two-Column Desktop Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center mb-16">
          {/* Left Column (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col items-start">
            
            {/* Eyebrow Label */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/[0.08] border border-amber-200/20 text-[#E5C378] text-xs font-mono font-medium uppercase tracking-wider mb-6 shadow-[0_0_20px_rgba(212,175,55,0.08)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E5C378] shadow-[0_0_6px_#E5C378]" />
              <span>AI SYSTEMS ARCHITECT • FULLSTACK ENGINEER</span>
            </div>

            {/* Main Headline with Editorial Luxury Typography */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.14] sm:leading-[1.12]">
              Architecting Intelligent Systems with{' '}
              <span className="gradient-text-gold font-serif-luxury italic font-medium">
                Distinction &amp; Rigor
              </span>.
            </h1>

            {/* Supporting Description */}
            <p className="text-base sm:text-lg text-zinc-300 mb-8 leading-relaxed text-justify sm:text-left max-w-2xl font-normal">
              {profile.supportingDesc}
            </p>

            {/* CTAs and Social Links */}
            <div className="flex flex-wrap items-center gap-4 mb-8 w-full sm:w-auto">
              <a
                href="#projects"
                className="btn-luxury-primary w-full sm:w-auto"
                id="hero-explore-projects"
              >
                <span>Curated Works</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="btn-luxury-secondary w-full sm:w-auto"
                id="hero-download-cv"
              >
                <Download className="w-4 h-4 text-[#E5C378]" />
                <span>Curriculum Vitae</span>
              </a>

              {/* Social Icon Links */}
              <div className="flex items-center gap-2 pt-2 sm:pt-0">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="w-11 h-11 min-h-[44px] min-w-[44px] rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-amber-200/15 text-zinc-300 hover:text-white flex items-center justify-center transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                  aria-label="GitHub Profile"
                  title="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>

                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="w-11 h-11 min-h-[44px] min-w-[44px] rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-amber-200/15 text-zinc-300 hover:text-white flex items-center justify-center transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                  aria-label="LinkedIn Profile"
                  title="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>

                <a
                  href={`mailto:${profile.email}`}
                  className="w-11 h-11 min-h-[44px] min-w-[44px] rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-amber-200/15 text-zinc-300 hover:text-white flex items-center justify-center transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                  aria-label="Send Direct Email"
                  title="Direct Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Executive Atelier Pass Credential Plaque (5 Cols) */}
          <div className="lg:col-span-5 flex justify-center items-start">
            <div
              className="relative flex flex-col items-center"
              style={{ perspective: '1200px' }}
            >
              {/* === SUSPENSION MOUNT === */}
              <div className="relative z-20 flex flex-col items-center">
                {/* Top Mounting Pin (Brushed Titanium & Gold) */}
                <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-[#D4AF37] via-[#8B7023] to-[#1A1A22] border border-amber-200/50 shadow-[0_0_12px_rgba(212,175,55,0.4)]" />

                {/* Suspension Cord */}
                <motion.div
                  animate={controls}
                  style={{ transformOrigin: 'top center' }}
                  className="flex flex-col items-center badge-sway"
                >
                  {/* Cord segment */}
                  <div className="w-[1.5px] h-16 sm:h-20 bg-gradient-to-b from-[#8B7023] via-[#E5C378]/70 to-[#D4AF37]/40 rounded-full shadow-[0_0_6px_rgba(229,195,120,0.3)]" />

                  {/* Brushed Gold Fastener Clasp */}
                  <div className="relative flex flex-col items-center -mt-0.5">
                    <div className="w-6 h-3 rounded-sm bg-gradient-to-b from-[#E5C378] to-[#9E7B34] border border-amber-100/40 shadow-md" />
                    <div className="w-4 h-1 bg-[#1A1A22] rounded-full" />
                  </div>

                  {/* === THE CREDENTIAL PLAQUE === */}
                  <motion.div
                    className="mt-1 relative cursor-pointer"
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => {
                      setIsHovered(false);
                      setMousePos({ x: 0, y: 0 });
                    }}
                    animate={{
                      rotateY: isHovered ? mousePos.x * 12 : 0,
                      rotateX: isHovered ? -mousePos.y * 8 : 0,
                    }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* Plaque Subtle Warm Specular Backlight */}
                    <div className="absolute -inset-3 sm:-inset-4 rounded-3xl bg-gradient-to-r from-amber-500/10 via-amber-300/5 to-amber-600/10 blur-2xl opacity-50 pointer-events-none" />

                    {/* Plaque Body */}
                    <div className="relative w-[265px] sm:w-[305px] rounded-2xl overflow-hidden border border-amber-200/25 bg-gradient-to-b from-[#14141B] via-[#0F0F15] to-[#0A0A0E] shadow-[0_24px_70px_-15px_rgba(0,0,0,0.9),0_0_35px_rgba(212,175,55,0.08)]">
                      
                      {/* Brushed Gold Header Strip */}
                      <div className="h-1.5 w-full bg-gradient-to-r from-[#9E7B34] via-[#F7E7C4] to-[#B89230]" />

                      {/* Plaque Lanyard Slot */}
                      <div className="flex justify-center pt-3 pb-1">
                        <div className="w-6 h-6 rounded-full border border-amber-200/25 bg-[#070709] shadow-inner flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-amber-200/40" />
                        </div>
                      </div>

                      {/* Profile Photo Section */}
                      <div className="px-5 sm:px-6 pt-2 pb-4 flex flex-col items-center">
                        <div className="relative mb-4">
                          {/* Concentric Gold Micro-Rim */}
                          <div className="absolute -inset-2 rounded-full border border-amber-200/20" />

                          <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-2 border-amber-200/40 shadow-[0_0_30px_rgba(212,175,55,0.15)] relative">
                            <Image
                              src={profile.avatar}
                              alt={profile.name}
                              fill
                              className="object-cover object-center"
                              priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-amber-200/[0.04] to-transparent" />
                          </div>

                          {/* Active Availability Dot (Emerald with Gold border) */}
                          <div className="absolute bottom-1 right-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-emerald-500 border-2 border-[#14141B] shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                        </div>

                        {/* Name & Title */}
                        <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight text-center font-heading">
                          {profile.name}
                        </h2>
                        <p className="text-xs sm:text-sm font-mono font-medium text-[#E5C378] mt-1 text-center">
                          AI &amp; Systems Engineer
                        </p>

                        {/* Location */}
                        <div className="flex items-center gap-1.5 mt-2 text-[11px] text-zinc-400">
                          <MapPin className="w-3 h-3 text-[#E5C378]/70" />
                          <span>{profile.location}</span>
                        </div>
                      </div>

                      {/* Hairline Divider */}
                      <div className="mx-5 sm:mx-6 h-px bg-gradient-to-r from-transparent via-amber-200/20 to-transparent" />

                      {/* Technical Credentials Panel */}
                      <div className="px-5 sm:px-6 py-4 space-y-2">
                        {/* Panel 1 */}
                        <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-amber-200/10 text-xs font-mono">
                          <div className="flex items-center gap-2">
                            <Cpu className="w-3.5 h-3.5 text-[#E5C378]" />
                            <span className="text-zinc-300">YOLOv11s CV Model</span>
                          </div>
                          <span className="text-[#F7E7C4] font-semibold">97.23%</span>
                        </div>

                        {/* Panel 2 */}
                        <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-amber-200/10 text-xs font-mono">
                          <div className="flex items-center gap-2">
                            <Layers className="w-3.5 h-3.5 text-zinc-400" />
                            <span className="text-zinc-300">Fullstack Architect</span>
                          </div>
                          <span className="text-zinc-300 font-semibold">10 Tables</span>
                        </div>

                        {/* Panel 3 */}
                        <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-amber-200/10 text-xs font-mono">
                          <div className="flex items-center gap-2">
                            <Activity className="w-3.5 h-3.5 text-[#E5C378]/80" />
                            <span className="text-zinc-300">Gemini LLM Pipeline</span>
                          </div>
                          <span className="text-[#E5C378] font-semibold">Active</span>
                        </div>
                      </div>

                      {/* Plaque Footer */}
                      <div className="px-5 sm:px-6 pb-4 pt-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <Shield className="w-3 h-3 text-[#E5C378]" />
                            <span className="text-[10px] font-mono text-[#E5C378]/90 uppercase tracking-widest">
                              BNSP Certified
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Briefcase className="w-3 h-3 text-emerald-400" />
                            <span className="text-[10px] font-mono text-emerald-400/90 uppercase tracking-wider">
                              Available
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Gold Accent */}
                      <div className="h-1 w-full bg-gradient-to-r from-[#9E7B34] via-[#F7E7C4] to-[#B89230]" />
                    </div>
                  </motion.div>

                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Statistics: Luxury Monolith Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-10 border-t border-amber-200/15">
          {heroStats.map((stat, idx) => (
            <div
              key={idx}
              className="luxury-card p-5 sm:p-6 flex flex-col justify-between group"
            >
              <div className="text-3xl sm:text-4xl font-extrabold font-heading text-white group-hover:text-[#E5C378] transition-colors">
                {stat.value}
              </div>
              <div className="mt-2.5">
                <div className="text-xs sm:text-sm font-semibold text-zinc-200 tracking-tight">
                  {stat.label}
                </div>
                <div className="text-[11px] text-zinc-400 font-mono mt-0.5">
                  {stat.sub}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Subtle Scroll Indicator */}
        <div className="flex justify-center mt-12">
          <a
            href="#about"
            className="inline-flex flex-col items-center gap-1 text-zinc-400 hover:text-[#E5C378] transition-colors group"
            aria-label="Scroll to Capabilities"
          >
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 group-hover:text-[#E5C378] transition-colors">
              Discover
            </span>
            <ChevronDown className="w-4 h-4 animate-bounce text-[#E5C378]" />
          </a>
        </div>
      </div>
    </section>
  );
}
