'use client';

import React from 'react';
import SectionHeading from './SectionHeading';

interface SkillItem {
  name: string;
  category: string;
  color: string;
  iconSvg: React.ReactNode;
}

const SKILLS_LIST: SkillItem[] = [
  {
    name: 'React.js',
    category: 'UI Library',
    color: '#38bdf8',
    iconSvg: (
      <svg viewBox="0 0 115.3 100" fill="currentColor" className="w-7 h-7">
        <path d="M57.65 42.5c-4.14 0-7.5 3.36-7.5 7.5s3.36 7.5 7.5 7.5 7.5-3.36 7.5-7.5-3.36-7.5-7.5-7.5zm0-42.5c-15.68 0-29.74 5.39-39.6 14.54-9.87 9.15-15.55 22.09-15.55 35.46 0 13.37 5.68 26.31 15.55 35.46 9.86 9.15 23.92 14.54 39.6 14.54 15.68 0 29.74-5.39 39.6-14.54 9.87-9.15 15.55-22.09 15.55-35.46 0-13.37-5.68-26.31-15.55-35.46-9.86-9.15-23.92-14.54-39.6-14.54zm0 88.5c-29.28 0-53-17.24-53-38.5s23.72-38.5 53-38.5 53 17.24 53 38.5-23.72 38.5-53 38.5z" />
      </svg>
    ),
  },
  {
    name: 'Next.js',
    category: 'Full-Stack Framework',
    color: '#ffffff',
    iconSvg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M11.998 0C5.372 0 0 5.373 0 12c0 6.628 5.372 12 11.998 12C18.626 12 24 6.628 24 12c0-6.627-5.374-12-12.002-12zm6.05 18.238l-6.425-8.23v8.23H9.418V5.762h2.205l6.425 8.23V5.762h2.205v12.476z" />
      </svg>
    ),
  },
  {
    name: 'JavaScript',
    category: 'Language Core',
    color: '#facc15',
    iconSvg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.017-.888-1.798-2.827-2.585-.68-.276-1.397-.563-1.636-.93-.243-.373-.243-.728-.243-1.049 0-.874.526-1.503 1.583-1.503.714 0 1.258.261 1.63.858.268.423.414.939.467 1.63l2.846-.37c-.126-1.284-.666-2.317-1.587-2.997-.919-.68-2.119-1.01-3.6-1.01-1.319 0-2.457.348-3.414 1.045-.956.697-1.434 1.673-1.434 2.929 0 1.157.432 2.079 1.296 2.766.864.687 2.053 1.173 3.567 1.458.747.142 1.393.385 1.939.73.545.344.818.847.818 1.509 0 .614-.247 1.144-.741 1.59-.494.446-1.257.669-2.289.669-1.082 0-1.895-.276-2.438-.829-.544-.552-.862-1.378-.956-2.477l-2.883.33c.159 1.687.828 2.973 2.007 3.859 1.179.886 2.659 1.329 4.441 1.329 1.58 0 2.946-.376 4.098-1.127 1.151-.752 1.727-1.849 1.727-3.292 0-1.048-.378-1.928-1.134-2.639zM8.328 10.334H4.992v7.795c0 1.394.312 2.378.937 2.953.624.575 1.52.862 2.688.862.628 0 1.23-.085 1.807-.255v-2.348c-.37.079-.728.118-1.074.118-.553 0-.936-.129-1.149-.387-.213-.258-.32-.714-.32-1.368v-7.37z" />
      </svg>
    ),
  },
  {
    name: 'TypeScript',
    category: 'Type Safety',
    color: '#60a5fa',
    iconSvg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm10.5 4.5h-8v3h2.5v12h3v-12H12v-3zm3 0h3l3 9v-9h3v15h-3l-3-9v9h-3v-15z" />
      </svg>
    ),
  },
  {
    name: 'HTML5 & CSS3',
    category: 'Web Standards',
    color: '#ea580c',
    iconSvg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.236-2.672H5.433l.698 8.059h8.925l-.375 4.148-2.705.728-2.698-.732-.172-1.93H7.078l.334 3.785 4.564 1.268 4.578-1.268.618-6.883H8.531z" />
      </svg>
    ),
  },
  {
    name: 'Tailwind CSS',
    category: 'Design Systems',
    color: '#06b6d4',
    iconSvg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
      </svg>
    ),
  },
  {
    name: 'Bootstrap',
    category: 'Responsive Grid',
    color: '#9333ea',
    iconSvg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm1.758 17.5H8.5V6.5h5.178c1.688 0 2.822.95 2.822 2.455 0 1.055-.613 1.875-1.558 2.203v.095c1.19.297 1.968 1.234 1.968 2.477 0 1.765-1.344 2.77-3.152 2.77zm-3.08-9.422v2.445h2.822c.969 0 1.547-.547 1.547-1.226 0-.711-.578-1.219-1.547-1.219H10.678zm0 3.867v2.797h3.047c1.078 0 1.688-.586 1.688-1.398 0-.844-.61-1.399-1.688-1.399H10.678z" />
      </svg>
    ),
  },
  {
    name: 'PHP',
    category: 'Server Engine',
    color: '#818cf8',
    iconSvg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-5.5 16l1.2-5h2.8c1.5 0 2.5.8 2.5 2s-1 2.5-2.5 2.5H8.7l-.5 2H6.5zm8 0l1.2-5h2.8c1.5 0 2.5.8 2.5 2s-1 2.5-2.5 2.5h-1.8l-.5 2h-1.7z" />
      </svg>
    ),
  },
  {
    name: 'Laravel',
    category: 'Backend Framework',
    color: '#ef4444',
    iconSvg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M8.286 0L0 4.79v14.42l8.286 4.79 8.286-4.79v-5.26l-3.328 1.92v2.36l-4.958 2.87-4.958-2.87V7.15l4.958-2.87 4.958 2.87v2.36l3.328-1.92V4.79L8.286 0zm7.428 5.75l-4.957 2.87v4.72l4.957-2.87V5.75z" />
      </svg>
    ),
  },
  {
    name: 'Golang',
    category: 'High-Concurrency API',
    color: '#00add8',
    iconSvg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M1.5 8.5C1.5 4.91 4.41 2 8 2h8c3.59 0 6.5 2.91 6.5 6.5v7c0 3.59-2.91 6.5-6.5 6.5H8c-3.59 0-6.5-2.91-6.5-6.5v-7zm14.5 1.5h-2v2h2v-2zm-6 0H8v2h2v-2zm6 4h-2v2h2v-2zm-6 0H8v2h2v-2z" />
      </svg>
    ),
  },
  {
    name: 'GORM',
    category: 'Data Persistence',
    color: '#10b981',
    iconSvg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
      </svg>
    ),
  },
  {
    name: 'Python',
    category: 'AI & Data Scripts',
    color: '#38bdf8',
    iconSvg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M11.91 0C6.18 0 6.5 2.5 6.5 2.5l.02 2.58h5.5v.8H3.85S0 5.43 0 11.23c0 5.8 3.36 5.6 3.36 5.6h2v-2.8s-.11-3.36 3.3-3.36h5.66s3.19.05 3.19-3.13V2.5S17.64 0 11.91 0zm-2.3 1.8a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm2.48 22.2c5.73 0 5.41-2.5 5.41-2.5l-.02-2.58h-5.5v-.8h8.17s3.85.45 3.85-5.35c0-5.8-3.36-5.6-3.36-5.6h-2v2.8s.11 3.36-3.3 3.36H10.9s-3.19-.05-3.19 3.13V21.5s-.13 2.5 5.6 2.5zm2.3-1.8a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
      </svg>
    ),
  },
  {
    name: 'Docker',
    category: 'Containerization',
    color: '#38bdf8',
    iconSvg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.186.185.186m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.186.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186m-2.954 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.145a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186m14.938 3.52c-.37-.22-1.393-.314-2.164-.233-.14-.727-.61-1.34-1.228-1.745l-.47-.306-.356.43c-.417.502-.68 1.15-.765 1.836h-9.97c-.15-.774-.63-1.424-1.272-1.848l-.47-.306-.357.43c-.417.502-.68 1.15-.764 1.836h-.4c-1.12 0-2.028.91-2.028 2.03 0 4.184 3.252 7.576 7.25 7.576 4.965 0 9.25-3.08 10.963-7.518.66.12 1.344.024 1.892-.303.454-.27.75-.72.827-1.24a1.85 1.85 0 00-.476-1.57" />
      </svg>
    ),
  },
  {
    name: 'Vite',
    category: 'Build Tooling',
    color: '#a855f7',
    iconSvg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M23.909 3.918L12.492 24 .09 3.918l11.442 3.037L23.91 3.918zM12.5 10l-4.5 4h3.5v5l5.5-6h-4.5v-3z" />
      </svg>
    ),
  },
  {
    name: 'MySQL',
    category: 'Relational DB (3NF)',
    color: '#38bdf8',
    iconSvg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
      </svg>
    ),
  },
  {
    name: 'Figma & Motion',
    category: 'UI/UX & Prototyping',
    color: '#ec4899',
    iconSvg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M12 12a4 4 0 104 4 4 4 0 00-4-4zm-4-8a4 4 0 00-4 4 4 4 0 004 4h4V4H8zm0 8a4 4 0 00-4 4 4 4 0 004 4h4v-8H8zm8-8h-4v8h4a4 4 0 004-4 4 4 0 00-4-4z" />
      </svg>
    ),
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 sm:py-32 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-[-5%] w-[40vw] h-[40vw] max-w-[450px] max-h-[450px] rounded-full bg-orange-600/10 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading with Kinetic Letter Animation */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <SectionHeading title="TECHNICAL STACK" />
          <p className="text-sm sm:text-base text-gray-400 leading-relaxed font-sans -mt-8">
            Production-tested technologies engineered for scalable and resilient modern software solutions.
          </p>
        </div>

        {/* 16 Badges Grid with Interactive Glow */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-5">
          {SKILLS_LIST.map((skill, idx) => (
            <div
              key={idx}
              className="card-cyber p-5 sm:p-6 flex flex-col items-center text-center justify-between group cursor-default relative overflow-hidden transition-all duration-300 hover:scale-[1.03]"
            >
              {/* Subtle Ambient Backlight on Hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
                style={{ backgroundColor: skill.color }}
              />

              <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:border-orange-500/40 transition-all duration-300">
                <div style={{ color: skill.color }}>{skill.iconSvg}</div>
              </div>

              <h4 className="font-techno font-bold text-sm sm:text-base text-white group-hover:text-orange-400 transition-colors">
                {skill.name}
              </h4>

              <span className="text-[11px] font-mono text-gray-400 mt-1">
                {skill.category}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
