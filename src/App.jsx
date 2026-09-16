import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import TechStack from './components/TechStack';
import FullstackArchitecture from './components/FullstackArchitecture';
import Projects from './components/Projects';
import ProjectModal from './components/ProjectModal';
import EducationCertifications from './components/EducationCertifications';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ flexGrow: 1 }}>
        <Hero />
        <About />
        <TechStack />
        <FullstackArchitecture />
        <Projects onSelectProject={(project) => setSelectedProject(project)} />
        <EducationCertifications />
        <Contact />
      </main>
      <Footer />

      {/* Detail Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}
