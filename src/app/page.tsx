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
import { Project } from '../types/portfolio';

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-[#070709] text-[#F8F8F9] relative selection:bg-amber-400/25 selection:text-amber-200">
      {/* 1. Ambient Obsidian & Champagne Gold Lighting Foundation */}
      <CosmicBackground />

      {/* 2. Haute Horlogerie / Atelier Navbar */}
      <Navbar />

      {/* 3. Architectural Sections */}
      <main className="flex-1 w-full relative z-10">
        {/* Section 1: Hero & Executive Presentation */}
        <Hero />

        {/* Section 2: Core Engineering Disciplines */}
        <About />

        {/* Section 3: Curated Works & Technical Monograph */}
        <Projects onSelectProject={(project: Project) => setSelectedProject(project)} />

        {/* Section 4: Technical Matrix & Stack Standards */}
        <CosmicTechStack />

        {/* Section 5: Engineering Lifecycle Timeline */}
        <Workflow />

        {/* Section 6: Provenance & Academic Credentials */}
        <EducationJourney />

        {/* Section 7: Editorial Articles & Perspectives */}
        <BlogInsights />

        {/* Section 8: Direct Strategic Consultation */}
        <Contact />
      </main>

      {/* 4. Refined Horizon Footer */}
      <Footer />

      {/* 5. Deep Architectural Case Studies Modal Dossier */}
      {selectedProject && (
        <CaseStudiesModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}
