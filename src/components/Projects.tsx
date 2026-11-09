'use client';

import React, { useRef, useLayoutEffect, useState } from 'react';
import Image from 'next/image';
import { ExternalLink, Github } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeading from './SectionHeading';

gsap.registerPlugin(ScrollTrigger);

interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export default function Projects() {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const projects: ProjectItem[] = [
    {
      id: 'veyora-portal',
      title: 'Veyora Technologies',
      category: 'Corporate Platform',
      description: 'High-conversion technological ecosystem portal engineered with ultra-smooth GSAP animations, optimized server-side rendering, and responsive design.',
      image: '/projects/veyora_technologies.jpg',
      tags: ['React', 'TypeScript', 'Tailwind CSS', 'GSAP'],
      liveUrl: 'https://github.com/IkhwanMaulana07',
      githubUrl: 'https://github.com/IkhwanMaulana07',
    },
    {
      id: 'umkm-marketplace',
      title: 'UMKM Malakajaya Platform',
      category: 'E-Commerce',
      description: 'Digital marketplace and product showcase connecting community-driven micro-enterprises with payment gateways and order administration.',
      image: '/projects/umkm_malakajaya.jpg',
      tags: ['PHP', 'Laravel', 'MySQL', 'Bootstrap'],
      liveUrl: 'https://github.com/IkhwanMaulana07',
      githubUrl: 'https://github.com/IkhwanMaulana07',
    },
    {
      id: 'smp-alamin',
      title: 'SMP Al-Amin Academic System',
      category: 'Academic Management',
      description: 'Institutional school grading and student academic report generator, automating semester computations and parent communication.',
      image: '/projects/smp_alamin_nilai.png',
      tags: ['Laravel', 'MySQL', 'Blade', 'Chart.js'],
      liveUrl: 'https://github.com/IkhwanMaulana07',
      githubUrl: 'https://github.com/IkhwanMaulana07',
    },
    {
      id: 'movie-ai',
      title: 'AI Movie Recommender',
      category: 'Machine Learning',
      description: 'Content-based machine learning recommendation engine computing vectorized feature cosine similarities for personalized user discovery.',
      image: '/projects/movie_recommender.png',
      tags: ['Python', 'Scikit-Learn', 'FastAPI', 'React'],
      liveUrl: 'https://github.com/IkhwanMaulana07',
      githubUrl: 'https://github.com/IkhwanMaulana07',
    },
    {
      id: 'bsf-mobile',
      title: 'BSF Cultivation Monitoring',
      category: 'Mobile & IoT',
      description: 'Mobile application dashboard monitoring Black Soldier Fly ecological variables, harvest cycles, and automated environmental readings.',
      image: '/projects/bsf_mobile_app.png',
      tags: ['React Native', 'Node.js', 'Firebase', 'IoT'],
      liveUrl: 'https://github.com/IkhwanMaulana07',
      githubUrl: 'https://github.com/IkhwanMaulana07',
    },
  ];

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const valid = cardsRef.current.filter(Boolean);
      gsap.fromTo(
        valid,
        {
          opacity: 0,
          y: 60,
          filter: 'blur(8px)',
        },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.8,
          stagger: 0.12,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={containerRef} className="relative w-full px-6 md:px-16 py-24 text-white select-none">
      <SectionHeading title="FEATURED PROJECTS" className="text-orange-400" />

      {/* Ambient center blur */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-orange-500/10 blur-[220px] rounded-full pointer-events-none" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mt-14">
        {projects.map((proj, idx) => (
          <div
            key={proj.id}
            ref={(el) => { cardsRef.current[idx] = el; }}
            className="group relative rounded-3xl overflow-hidden bg-black/40 backdrop-blur-xl border border-white/10 hover:border-orange-500/40 hover:-translate-y-2 transition-all duration-500 shadow-2xl flex flex-col"
          >
            {/* Project Image */}
            <div className="relative w-full h-52 overflow-hidden bg-[#0a0a0f]">
              <Image
                src={proj.image}
                alt={proj.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-top filter grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80" />

              {/* Category Badge */}
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-black/75 border border-orange-500/30 text-orange-400 backdrop-blur-md">
                  {proj.category}
                </span>
              </div>
            </div>

            {/* Project Body */}
            <div className="p-6 flex flex-col flex-grow justify-between">
              <div>
                <h3 className="text-lg font-bold font-techno text-white group-hover:text-orange-400 transition-colors">
                  {proj.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-gray-400 leading-relaxed font-sans line-clamp-3">
                  {proj.description}
                </p>
              </div>

              {/* Tags & Action Links */}
              <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5 max-w-[70%]">
                  {proj.tags.slice(0, 3).map((tag, tIdx) => (
                    <span key={tIdx} className="text-[10px] font-mono text-gray-400 bg-white/5 px-2 py-0.5 rounded">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-orange-400 transition-colors"
                      aria-label="View source code on GitHub"
                    >
                      <Github size={18} />
                    </a>
                  )}
                  {proj.liveUrl && (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-orange-400 transition-colors"
                      aria-label="View live project"
                    >
                      <ExternalLink size={18} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
