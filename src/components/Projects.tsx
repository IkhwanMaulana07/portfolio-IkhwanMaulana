'use client';

import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import Image from 'next/image';
import { X, Layers, Cpu, CheckCircle2, ArrowUpRight, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeading from './SectionHeading';

gsap.registerPlugin(ScrollTrigger);

interface MetricItem {
  label: string;
  value: string;
}

interface ProjectItem {
  id: string;
  title: string;
  role: string;
  category: string;
  tagline: string;
  description: string;
  image: string;
  tags: string[];
  metrics: MetricItem[];
  architecturePoints: string[];
}

export default function Projects() {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  const projects: ProjectItem[] = [
    {
      id: 'veyora-portal',
      title: 'Veyora Technologies',
      role: 'Full Stack Software Engineer',
      category: 'Enterprise Platform',
      tagline: 'F&B Digital Infrastructure Platform & 0% Commission Direct-Ordering Monorepo',
      description:
        'Architected and engineered a full-stack decoupled monorepo web platform delivering 0% commission direct-ordering infrastructure for F&B businesses, reducing client operational costs while boosting digital presence.',
      image: '/projects/veyora_technologies.jpg',
      tags: ['Next.js 16', 'React 19', 'Golang (Gin Gonic)', 'Redux Toolkit', 'TypeScript', 'Tailwind CSS', 'Docker', 'Docker Compose'],
      metrics: [
        { label: 'Commission Toll', value: '0% Direct Order' },
        { label: 'API Latency', value: '< 1ms (Go Gin)' },
        { label: 'Docker Footprint', value: '-60% Optimized' },
        { label: 'Localization', value: 'Trilingual (ID/EN/ZH)' },
      ],
      architecturePoints: [
        'Built with Next.js 16 and React 19 featuring custom interactive micro-animations (React Bits) and internationalization (i18n) across 3 languages (Indonesian, English, Mandarin).',
        'Implemented Redux Toolkit for centralized client-side state management, supporting dynamic order tracking, menu filtering, and seamless multi-step checkout workflows.',
        'Designed and deployed sub-millisecond RESTful APIs using Go (Gin Gonic) in a modular domain-driven architecture, featuring CORS security, structured JSON logging, and multi-environment configuration.',
        'Configured Next.js dynamic runtime reverse proxy to seamlessly bridge client requests to backend API services under a unified domain.',
        'Implemented Docker multi-stage builds and Docker Compose orchestration, reducing production container image footprint by ~60% and enabling one-command development environments.',
      ],
    },
    {
      id: 'umkm-portal',
      title: 'Malaka Jaya Digital MSME Community Web Portal',
      role: 'Full Stack Developer',
      category: 'Community E-Commerce & AI',
      tagline: 'Enterprise Community Catalog with Golang Backend, RBAC & Google Gemini AI Assistant',
      description:
        'Designed and developed a full-stack community enterprise & product catalog platform connecting local micro-businesses with residents, featuring role-based access control (Admin, Merchant, Resident) and direct WhatsApp-integrated ordering with 0% commission.',
      image: '/projects/umkm_malakajaya.jpg',
      tags: ['Go (Golang)', 'Gin-Gonic', 'GORM', 'SQLite / MySQL', 'JWT', 'Vanilla CSS', 'Google Gemini API'],
      metrics: [
        { label: 'Access Control', value: '3-Tier RBAC' },
        { label: 'AI Assistant', value: 'Gemini 1.5 Flash' },
        { label: 'Direct Ordering', value: '0% Commission' },
        { label: 'Authentication', value: 'HTTP-Only JWT' },
      ],
      architecturePoints: [
        'Implemented persistent database storage using GORM with SQLite (development) and MySQL (production), abstracting data operations through clean repository patterns.',
        'Engineered secure authentication and session management using HTTP-Only JWT tokens with role-based route middleware, securing administrative and merchant-specific actions.',
        'Built mobile-first responsive interfaces using semantic HTML and vanilla CSS, featuring product showcase directories, merchant store management, and administrative audit dashboards.',
        'Integrated Google Gemini API (gemini-1.5-flash) to power an intelligent interactive AI chatbot assistant capable of answering resident inquiries about local MSME products and community information.',
      ],
    },
    {
      id: 'smp-alamin',
      title: 'Al-Amin Academic Information & Grading System',
      role: 'Fullstack Web Developer',
      category: 'Institutional Academic SPA',
      tagline: 'High-Performance Academic Platform with Laravel 11 Backend & Next.js 14 SPA',
      description:
        'Architected and deployed an institution-scale full-stack web platform for academic management and automated student grading across 3 user roles (Admin, Teacher, Student).',
      image: '/projects/smp_alamin_nilai.png',
      tags: ['Next.js 14', 'React 18', 'TypeScript', 'Redux Toolkit', 'Laravel 11', 'PHP 8.3', 'SQLite', 'Docker', 'GitHub Actions'],
      metrics: [
        { label: 'Grading Formula', value: '30% + 30% + 40%' },
        { label: 'Backend Core', value: 'Laravel 11 Sanctum' },
        { label: 'Client State', value: 'Redux Toolkit' },
        { label: 'CI/CD Pipeline', value: 'GitHub Actions' },
      ],
      architecturePoints: [
        'Built a high-performance Single Page Application (SPA) with Next.js 14 (App Router) and React 18, utilizing TypeScript for end-to-end type safety and Redux Toolkit for unified global state management across authentication, grading workflows, and academic records.',
        'Designed robust RESTful APIs in Laravel 11 powered by Sanctum token-based authentication and role-based access control middleware, enforcing granular data-access boundaries.',
        'Implemented dynamic weighted grading calculation engine (30% Assignments + 30% Midterm + 40% Final Exam) with automatic letter-grade assignments, class ranking, and comprehensive academic status reporting.',
        'Developed self-service digital report cards allowing students and parents to view real-time academic progression, download standardized grade sheets, and export report cards to Excel (.xls).',
        'Containerized the full-stack system using Docker Compose for isolated dev environments, and configured GitHub Actions CI/CD workflows for automated PHPUnit test suites and linting on every push.',
      ],
    },
    {
      id: 'movie-ai',
      title: 'AI-Powered Movie Recommender & Image Classification Apps',
      role: 'Machine Learning & Frontend Engineer',
      category: 'Machine Learning & Vision',
      tagline: 'Interactive ML Discovery & Inference Applications with Sub-Second Retrieval',
      description:
        'Designed and developed two interactive machine learning web applications using Streamlit, demonstrating applied AI techniques for content discovery and computer vision tasks.',
      image: '/projects/movie_recommender.png',
      tags: ['Python', 'Streamlit', 'TensorFlow/Keras', 'TF-IDF', 'Cosine Similarity', 'Scikit-Learn', 'TMDB API'],
      metrics: [
        { label: 'Search Latency', value: '< 200ms Vector' },
        { label: 'Algorithm', value: 'TF-IDF & Cosine' },
        { label: 'Deep Learning', value: 'TensorFlow/Keras' },
        { label: 'Deployment', value: 'Streamlit Cloud' },
      ],
      architecturePoints: [
        'Movie Recommendation System: Implemented content-based filtering algorithms using TF-IDF vectorization and cosine similarity over movie metadata, generating dynamic personalized recommendations with interactive poster fetching via external APIs.',
        'Image Classification App: Built and deployed deep learning inference pipelines using TensorFlow/Keras, featuring real-time image upload, preprocessing, model prediction with confidence scoring, and interactive visual feedback.',
        'Engineered intuitive, responsive user interfaces with real-time search, category filtering, and dynamic content rendering directly within Streamlit’s reactive framework.',
      ],
    },
    {
      id: 'bsf-mobile',
      title: "Black Soldier Fly (BSF) Larva Detection & Classification System",
      role: "Lead Computer Vision & Mobile Developer (Bachelor's Thesis)",
      category: 'Edge AI & Mobile Vision',
      tagline: 'End-to-End Deep Learning Computer Vision Pipeline Deployed On-Device via Flutter',
      description:
        'Researched, designed, and deployed an end-to-end computer vision system to detect and classify Black Soldier Fly (BSF) larvae across four developmental stages (Eggs, Larvae, Pupae, Adults) to support automated insect farming.',
      image: '/projects/bsf_mobile_app.png',
      tags: ['Python', 'YOLOv11s', 'TensorFlow Lite', 'Flutter', 'OpenCV', 'PyTorch'],
      metrics: [
        { label: 'Precision Score', value: '0.9723 Precision' },
        { label: 'Detection Accuracy', value: '0.8720 mAP50' },
        { label: 'Recall Rate', value: '0.8315 Recall' },
        { label: 'Curated Dataset', value: '21,974 Images' },
      ],
      architecturePoints: [
        'Built and curated a comprehensive dataset of 21,974 annotated images, applying spatial transformations and contrast augmentations to maximize model generalization in variable real-world lighting conditions.',
        'Trained, fine-tuned, and benchmarked object detection models using YOLOv11s architecture, achieving 0.9723 precision, 0.8315 recall, and 0.8720 mAP50.',
        'Quantized and optimized trained models into lightweight TensorFlow Lite (.tflite) formats for efficient on-device inference with low-latency mobile deployment.',
        'Developed an intuitive mobile front-end using Flutter, integrating device camera feeds for real-time inference, bounding-box visualization, confidence display, and cultivation monitoring.',
      ],
    },
  ];

  // GSAP Entrance
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

  // Escape key handler for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveProject(null);
      }
    };
    if (activeProject) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeProject]);

  return (
    <section id="projects" ref={containerRef} className="relative w-full px-6 md:px-16 py-24 text-white select-none">
      <SectionHeading title="FEATURED PROJECTS" className="text-orange-400" />

      {/* Subheading info */}
      <div className="max-w-3xl mx-auto text-center mt-3 mb-10">
        <p className="text-sm md:text-base text-gray-400 font-sans leading-relaxed">
          Production systems, enterprise monorepo architectures, and applied machine learning models engineered with high performance, scalability, and modern standards.
        </p>
      </div>

      {/* Ambient center blur */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-orange-500/10 blur-[220px] rounded-full pointer-events-none" />

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mt-6">
        {projects.map((proj, idx) => (
          <div
            key={proj.id}
            ref={(el) => {
              cardsRef.current[idx] = el;
            }}
            className="group relative rounded-3xl overflow-hidden bg-black/40 backdrop-blur-xl border border-white/10 hover:border-orange-500/40 hover:-translate-y-2 transition-all duration-500 shadow-2xl flex flex-col cursor-pointer"
            onClick={() => setActiveProject(proj)}
          >
            {/* Project Image */}
            <div className="relative w-full h-56 overflow-hidden bg-[#0a0a0f]">
              <Image
                src={proj.image}
                alt={proj.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-top filter grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0b0b] via-[#0e0b0b]/40 to-transparent opacity-90" />

              {/* Category Badge & Role */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-black/80 border border-orange-500/30 text-orange-400 backdrop-blur-md">
                  {proj.category}
                </span>
                <span className="px-2.5 py-1 rounded-full text-[9px] font-sans text-gray-300 bg-white/10 backdrop-blur-md truncate max-w-[150px]">
                  {proj.role}
                </span>
              </div>

              {/* Click to inspect cue on hover */}
              <div className="absolute bottom-3 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1.5 text-xs text-orange-300 font-mono bg-black/80 px-2.5 py-1 rounded-full border border-orange-500/30">
                <span>View Architecture</span>
                <ArrowUpRight size={13} />
              </div>
            </div>

            {/* Project Body */}
            <div className="p-6 flex flex-col flex-grow justify-between">
              <div>
                <h3 className="text-lg font-bold font-techno text-white group-hover:text-orange-400 transition-colors line-clamp-1">
                  {proj.title}
                </h3>
                <p className="mt-1 text-xs text-orange-400/80 font-mono line-clamp-1">
                  {proj.tagline}
                </p>
                <p className="mt-2.5 text-xs sm:text-sm text-gray-400 leading-relaxed font-sans line-clamp-3">
                  {proj.description}
                </p>
              </div>

              {/* Quick Metrics preview */}
              <div className="mt-4 grid grid-cols-2 gap-2 pt-3 border-t border-white/[0.06]">
                {proj.metrics.slice(0, 2).map((m, mIdx) => (
                  <div key={mIdx} className="bg-white/[0.03] border border-white/5 rounded-xl px-2.5 py-1.5">
                    <span className="block text-[9px] font-mono text-gray-400 uppercase tracking-wider">{m.label}</span>
                    <span className="block text-xs font-semibold text-orange-400 font-sans truncate">{m.value}</span>
                  </div>
                ))}
              </div>

              {/* Tags & Action Cue */}
              <div className="mt-5 pt-4 border-t border-white/[0.08] flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5 max-w-[75%]">
                  {proj.tags.slice(0, 3).map((tag, tIdx) => (
                    <span key={tIdx} className="text-[10px] font-mono text-gray-300 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                      {tag}
                    </span>
                  ))}
                  {proj.tags.length > 3 && (
                    <span className="text-[10px] font-mono text-orange-400/80 bg-orange-500/10 px-1.5 py-0.5 rounded">
                      +{proj.tags.length - 3}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1 text-xs text-orange-400 font-mono group-hover:translate-x-1 transition-transform">
                  <span>Specs</span>
                  <ArrowUpRight size={14} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Detail Modal */}
      {activeProject && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 md:p-6 overflow-y-auto"
          onClick={() => setActiveProject(null)}
        >
          <div
            className="relative w-full max-w-3xl my-auto bg-[#110e14] border border-orange-500/30 rounded-3xl p-6 md:p-8 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Close Button */}
            <button
              onClick={() => setActiveProject(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-orange-500 text-gray-300 hover:text-white transition-colors z-20"
              aria-label="Close details modal"
            >
              <X size={18} />
            </button>

            {/* Modal Header */}
            <div className="flex flex-wrap items-center gap-2 mb-2 pr-12">
              <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-orange-500/20 text-orange-400 border border-orange-500/40">
                {activeProject.category}
              </span>
              <span className="px-3 py-1 rounded-full text-[10px] font-mono text-gray-300 bg-white/5 border border-white/10">
                {activeProject.role}
              </span>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold font-techno text-white text-gradient">
              {activeProject.title}
            </h2>
            <p className="text-xs md:text-sm text-orange-400/90 font-mono mt-1">
              {activeProject.tagline}
            </p>

            {/* Scrollable Content */}
            <div className="overflow-y-auto mt-6 pr-2 space-y-6 flex-grow custom-scrollbar">
              {/* Image Preview Banner */}
              <div className="relative w-full h-56 md:h-64 rounded-2xl overflow-hidden border border-white/10">
                <Image
                  src={activeProject.image}
                  alt={activeProject.title}
                  fill
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
              </div>

              {/* Key Metrics Grid */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-gray-400 flex items-center gap-2 mb-3">
                  <Sparkles size={14} className="text-orange-400" /> Key Architectural Metrics
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {activeProject.metrics.map((m, idx) => (
                    <div key={idx} className="bg-white/[0.04] border border-orange-500/20 rounded-2xl p-3 text-center">
                      <span className="block text-[10px] font-mono text-gray-400 uppercase tracking-wider mb-1">{m.label}</span>
                      <span className="block text-sm font-bold text-orange-400">{m.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Overview */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-gray-400 flex items-center gap-2 mb-2">
                  <Layers size={14} className="text-orange-400" /> Project Scope & Overview
                </h4>
                <p className="text-sm text-gray-300 leading-relaxed font-sans">
                  {activeProject.description}
                </p>
              </div>

              {/* Architecture & Engineering Highlights */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-gray-400 flex items-center gap-2 mb-3">
                  <Cpu size={14} className="text-orange-400" /> Engineering Specifications (From CV)
                </h4>
                <div className="space-y-2.5">
                  {activeProject.architecturePoints.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-3">
                      <CheckCircle2 size={16} className="text-orange-400 shrink-0 mt-0.5" />
                      <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans">
                        {point}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Full Tech Stack */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-2">
                  Technology Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeProject.tags.map((tag, idx) => (
                    <span key={idx} className="text-xs font-mono text-orange-300 bg-orange-500/10 border border-orange-500/20 px-3 py-1 rounded-lg">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-gray-400 font-mono">Press Esc or click outside to dismiss</span>
              <button
                onClick={() => setActiveProject(null)}
                className="px-5 py-2 rounded-xl bg-white/10 hover:bg-orange-500 text-white text-xs font-mono uppercase tracking-wider transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
