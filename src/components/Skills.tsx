'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import SectionHeading from './SectionHeading';
import {
  Code,
  Layers,
  Database,
  Cpu,
  Globe,
  Terminal,
  Server,
  Zap,
  Box,
  GitBranch,
  Flame,
  Layout,
  Workflow,
  Sparkles,
} from 'lucide-react';

interface SkillItem {
  name: string;
  color: string;
  icon: React.ReactNode;
}

function SkillCard({ skill }: { skill: SkillItem }) {
  const glowRef = useRef<HTMLDivElement>(null);
  const xQuick = useRef<((val: number) => void) | null>(null);
  const yQuick = useRef<((val: number) => void) | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!glowRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - 48;
    const y = e.clientY - rect.top - 48;

    if (!xQuick.current || !yQuick.current) {
      xQuick.current = gsap.quickTo(glowRef.current, 'x', { duration: 0.15, ease: 'none' });
      yQuick.current = gsap.quickTo(glowRef.current, 'y', { duration: 0.15, ease: 'none' });
    }

    xQuick.current(x);
    yQuick.current(y);
  };

  const handleMouseEnter = () => {
    if (glowRef.current) gsap.to(glowRef.current, { opacity: 0.45, duration: 0.2 });
  };

  const handleMouseLeave = () => {
    if (glowRef.current) gsap.to(glowRef.current, { opacity: 0, duration: 0.25 });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-36 h-36 sm:w-40 sm:h-40 backdrop-blur-xl bg-black/40 border border-white/10 rounded-2xl shadow-xl overflow-hidden flex flex-col items-center justify-center cursor-pointer will-change-transform transition-transform duration-300 hover:scale-[1.04]"
      style={{ '--glow-color': skill.color } as React.CSSProperties}
    >
      {/* Moving cursor glow */}
      <div
        ref={glowRef}
        style={{ background: skill.color, willChange: 'transform, opacity' }}
        className="absolute w-24 h-24 rounded-full blur-2xl pointer-events-none opacity-0"
      />

      {/* Glass reflections */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/20 via-transparent to-transparent opacity-10" />
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/30 via-white/5 to-transparent opacity-20 skew-y-[-8deg]" />
      </div>

      {/* Icon and label */}
      <div className="relative flex flex-col items-center space-y-2.5 z-10">
        <div className="text-4xl sm:text-5xl will-change-transform transition-transform duration-300 group-hover:scale-110" style={{ color: skill.color }}>
          {skill.icon}
        </div>
        <p className="text-xs sm:text-sm font-semibold tracking-wide will-change-transform font-mono" style={{ color: skill.color }}>
          {skill.name}
        </p>
      </div>
    </div>
  );
}

export default function Skills() {
  const skills: SkillItem[] = [
    { name: 'React JS', color: '#38bdf8', icon: <Code className="w-10 h-10" /> },
    { name: 'Next.js', color: '#ffffff', icon: <Layers className="w-10 h-10" /> },
    { name: 'JavaScript', color: '#facc15', icon: <Zap className="w-10 h-10" /> },
    { name: 'TypeScript', color: '#3b82f6', icon: <Code className="w-10 h-10" /> },
    { name: 'HTML5', color: '#f97316', icon: <Globe className="w-10 h-10" /> },
    { name: 'CSS3', color: '#38bdf8', icon: <Layout className="w-10 h-10" /> },
    { name: 'Tailwind', color: '#0ea5e9', icon: <Sparkles className="w-10 h-10" /> },
    { name: 'Golang', color: '#00add8', icon: <Cpu className="w-10 h-10" /> },
    { name: 'PHP', color: '#6366f1', icon: <Server className="w-10 h-10" /> },
    { name: 'Laravel', color: '#dc2626', icon: <Flame className="w-10 h-10" /> },
    { name: 'MySQL', color: '#38bdf8', icon: <Database className="w-10 h-10" /> },
    { name: 'PostgreSQL', color: '#60a5fa', icon: <Database className="w-10 h-10" /> },
    { name: 'Docker', color: '#2496ed', icon: <Box className="w-10 h-10" /> },
    { name: 'Git & GitHub', color: '#f05032', icon: <GitBranch className="w-10 h-10" /> },
    { name: 'GSAP', color: '#22c55e', icon: <Workflow className="w-10 h-10" /> },
    { name: 'REST APIs', color: '#f59e0b', icon: <Terminal className="w-10 h-10" /> },
    { name: 'Bootstrap', color: '#9333ea', icon: <Layout className="w-10 h-10" /> },
    { name: 'Python', color: '#3b82f6', icon: <Terminal className="w-10 h-10" /> },
    { name: 'Vite', color: '#a855f7', icon: <Zap className="w-10 h-10" /> },
    { name: 'Figma', color: '#ec4899', icon: <Layout className="w-10 h-10" /> },
  ];

  return (
    <section id="skills" className="relative py-20 px-6 text-center select-none">
      {/* Ambient background glows */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-orange-500/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute right-0 bottom-0 w-[250px] h-[250px] bg-yellow-500/10 blur-[120px] rounded-full pointer-events-none" />

      <SectionHeading title="TECHNICAL STACK" className="text-orange-400" />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8 place-items-center max-w-6xl mx-auto mt-12">
        {skills.map((skill, idx) => (
          <SkillCard key={idx} skill={skill} />
        ))}
      </div>
    </section>
  );
}
