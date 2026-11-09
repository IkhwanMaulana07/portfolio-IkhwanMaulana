'use client';

import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import FocusPillars from '../components/FocusPillars';
import SystemsShowcase from '../components/SystemsShowcase';
import CertificatesShowcase from '../components/CertificatesShowcase';
import Skills from '../components/Skills';
import Services from '../components/Services';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#030304] text-[#F3F3F6] relative selection:bg-orange-500/30 selection:text-orange-200 overflow-x-hidden">
      {/* Subtle Ambient Background Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-orange-600/[0.04] rounded-full blur-[180px]" />
        <div className="absolute top-[40%] left-[-10%] w-[500px] h-[500px] bg-orange-500/[0.03] rounded-full blur-[160px]" />
        <div className="absolute bottom-1/4 right-[-5%] w-[600px] h-[600px] bg-orange-600/[0.04] rounded-full blur-[180px]" />
      </div>

      {/* Floating Glass Navbar */}
      <Navbar />

      {/* Main Sections Matching Reference Mockup */}
      <main className="flex-1 w-full relative z-10">
        {/* Section 1: Hero */}
        <Hero />

        {/* Section 2: About Me */}
        <About />

        {/* Section 3: I Don't Just Build (Focus Pillars) */}
        <FocusPillars />

        {/* Section 4: Core Systems (Telemetry & Chart) */}
        <SystemsShowcase />

        {/* Section 5: Sertifikasi BNSP (Credentials) */}
        <CertificatesShowcase />

        {/* Section 6: Technical Stack */}
        <Skills />

        {/* Section 7: Specialized Services */}
        <Services />

        {/* Section 8: Start a Conversation (Contact) */}
        <Contact />
      </main>

      {/* Section 9: Footer */}
      <Footer />
    </div>
  );
}
