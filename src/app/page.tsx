'use client';

import React, { useState } from 'react';
import CosmicBackground from '../components/CosmicBackground';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import CosmicTechStack from '../components/CosmicTechStack';
import Workflow from '../components/Workflow';
import EducationJourney from '../components/EducationJourney';
import BlogInsights from '../components/BlogInsights';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import CaseStudiesModal from '../components/CaseStudiesModal';
import BrunoWorld from '../components/bruno3d/BrunoWorld';
import BrunoHUD from '../components/bruno3d/BrunoHUD';
import { WorldZone } from '../components/bruno3d/WorldData';
import { COSMIC_DATA } from '../data/cosmicPortfolioData';
import { Project } from '../types/portfolio';

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [displayMode, setDisplayMode] = useState<'3d' | 'classic'>('3d');
  const [currentSpeed, setCurrentSpeed] = useState<number>(0);
  const [activeZone, setActiveZone] = useState<WorldZone | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#070709] text-[#F8F8F9] relative selection:bg-amber-400/25 selection:text-amber-200">
      
      {/* FULL 3D BRUNO SIMON PLAYGROUND MODE */}
      {displayMode === '3d' ? (
        <div className="fixed inset-0 z-30 w-full h-full bg-[#0A0B10] overflow-hidden">
          {/* 3D WebGL Canvas Engine (Three.js + Cannon-es) */}
          <BrunoWorld
            projects={COSMIC_DATA.projects}
            onSelectProject={(project: Project) => setSelectedProject(project)}
            onZoneChange={(zone: WorldZone | null) => setActiveZone(zone)}
            isMuted={isMuted}
            onSpeedChange={(speedKmh: number) => setCurrentSpeed(speedKmh)}
          />

          {/* Interactive HUD Telemetry & Navigation Overlay */}
          <BrunoHUD
            currentSpeed={currentSpeed}
            activeZone={activeZone}
            projects={COSMIC_DATA.projects}
            onSelectProject={(project: Project) => setSelectedProject(project)}
            isMuted={isMuted}
            onToggleMute={() => setIsMuted(!isMuted)}
            onSwitchToClassic={() => setDisplayMode('classic')}
          />
        </div>
      ) : (
        /* CLASSIC HIGH-IMPACT ARCHITECTURAL PORTFOLIO MODE */
        <>
          {/* Ambient Lighting Foundation */}
          <CosmicBackground />

          {/* Haute Atelier Navbar with 3D Playground shortcut */}
          <div className="relative z-50">
            <Navbar />
            <div className="fixed top-20 right-4 sm:right-8 z-50">
              <button
                onClick={() => setDisplayMode('3d')}
                className="px-4 py-2 rounded-2xl bg-amber-400/20 hover:bg-amber-400/30 border border-amber-300/40 text-amber-200 font-mono text-xs font-bold shadow-[0_0_20px_rgba(229,195,120,0.3)] backdrop-blur-xl flex items-center gap-2 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              >
                <span>🏎️ Masuk ke Full 3D Playground</span>
              </button>
            </div>
          </div>

          {/* Architectural Sections */}
          <main className="flex-1 w-full relative z-10">
            <Hero />
            <About />
            <Projects onSelectProject={(project: Project) => setSelectedProject(project)} />
            <CosmicTechStack />
            <Workflow />
            <EducationJourney />
            <BlogInsights />
            <Contact />
          </main>

          <Footer />
        </>
      )}

      {/* Deep Architectural Case Studies Modal Dossier */}
      {selectedProject && (
        <CaseStudiesModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}

