'use client';

import React, { useState, useEffect } from 'react';
import Intro from '../components/Intro';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Systems from '../components/Systems';
import Skills from '../components/Skills';
import Services from '../components/Services';
import Projects from '../components/Projects';
import Certificates from '../components/Certificates';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Home() {
  const [introCompleted, setIntroCompleted] = useState(false);

  useEffect(() => {
    // Check if intro has already run
    const seen = sessionStorage.getItem('ikhwan_intro_seen');
    if (seen) {
      setIntroCompleted(true);
    }
  }, []);

  return (
    <>
      {/* Intro / Preloader Screen */}
      <Intro onComplete={() => setIntroCompleted(true)} />

      {/* Main Experience */}
      <main
        className={`overflow-hidden relative z-10 flex flex-col items-center min-h-screen bg-[#0e0b0b] text-[#f3f3f6] transition-opacity duration-700 ${
          introCompleted ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Background Atmosphere Layers */}
        <div className="site-noise" />
        <div className="vignette" />
        <div className="global-grid" />
        <div className="global-orb" />
        <div className="global-stars" />
        <div className="global-stars-2" />

        {/* Floating Glass Navbar */}
        <Navbar />

        {/* Content Sections */}
        <div className="w-full relative z-10">
          <Hero />
          <About />
          <Systems />
          <Skills />
          <Services />
          <Projects />
          <Certificates />
          <Contact />
        </div>

        {/* Footer */}
        <Footer />
      </main>
    </>
  );
}
