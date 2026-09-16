import React, { useState } from 'react';
import { 
  FolderGit2, 
  ExternalLink, 
  Github, 
  Info, 
  Sparkles,
  Smartphone,
  Globe
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export default function Projects({ onSelectProject }) {
  const [filter, setFilter] = useState('All');
  const { projects } = PORTFOLIO_DATA;

  const categories = ['All', 'Full-Stack Web', 'AI-Integrated', 'Mobile AI & Computer Vision'];

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter || (p.categories && p.categories.includes(filter)));

  return (
    <section id="projects" className="section" style={{ background: 'rgba(6, 10, 20, 0.5)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <FolderGit2 size={14} /> Production Portfolio
          </div>
          <h2 className="section-title">
            Featured Full-Stack & AI Projects
          </h2>
          <p className="section-subtitle">
            Engineered systems demonstrating relational database design, role-based security, on-device mobile AI inference, and intelligent web applications.
          </p>
        </div>

        {/* Category Filters */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.6rem',
            marginBottom: '3rem',
            justifyContent: 'center'
          }}
        >
          {categories.map((cat) => {
            const isActive = filter === cat;
            return (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                style={{
                  padding: '0.55rem 1.25rem',
                  borderRadius: 'var(--radius-full)',
                  border: isActive ? '1px solid var(--accent-cyan)' : '1px solid var(--border-glass)',
                  background: isActive ? 'rgba(6, 182, 212, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                  color: isActive ? '#fff' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  transition: 'all 0.25s ease',
                  boxShadow: isActive ? '0 0 15px rgba(6, 182, 212, 0.25)' : 'none'
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
            gap: '2rem'
          }}
          className="projects-grid"
        >
          {filteredProjects.map((project) => {
            const isMobileApp = project.category?.toLowerCase().includes('mobile') || 
                                project.id === 'bsf-larva-detection' || 
                                project.stack?.includes('Flutter');

            const displayUrl =
              project.demo && project.demo !== '#'
                ? project.demo.replace(/^https?:\/\//, '')
                : project.title.includes('Malaka')
                ? 'localhost/umkm malaka jaya/'
                : project.title.includes('Al-Amin')
                ? 'localhost/web data alamin/'
                : 'android://bsf-classifier.app';

            return (
              <div
                key={project.id}
                className="glass-panel"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border-glass)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
              >
                {/* Top Window / App Chrome bar matching previous portfolio style */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 14px',
                    background: '#131822',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                    fontSize: '0.72rem',
                    fontFamily: 'monospace'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff5f56' }} />
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ffbd2e' }} />
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#27c93f' }} />
                  </div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '170px' }}>
                    {displayUrl}
                  </span>
                  <span
                    style={{
                      fontSize: '0.68rem',
                      fontWeight: 600,
                      color: isMobileApp ? '#34d399' : 'var(--accent-cyan)',
                      background: isMobileApp ? 'rgba(52, 211, 153, 0.12)' : 'rgba(6, 182, 212, 0.12)',
                      padding: '2px 8px',
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    {isMobileApp ? <Smartphone size={11} /> : <Globe size={11} />}
                    {isMobileApp ? 'Mobile APK' : 'Web App'}
                  </span>
                </div>

                {/* Project Image Preview with Overlay */}
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '220px',
                    background: isMobileApp ? '#0b140e' : 'var(--bg-tertiary)',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: isMobileApp ? '8px 0' : 0
                  }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: isMobileApp ? 'contain' : 'cover',
                      objectPosition: isMobileApp ? 'center' : 'top center',
                      transition: 'transform 0.4s ease'
                    }}
                    onMouseEnter={(e) => (e.target.style.transform = isMobileApp ? 'scale(1.03)' : 'scale(1.05)')}
                    onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />

                  {/* Category Pill on Image */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '0.8rem',
                      left: '0.8rem',
                      padding: '0.3rem 0.75rem',
                      borderRadius: 'var(--radius-full)',
                      background: 'rgba(6, 10, 20, 0.85)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      color: isMobileApp ? '#34d399' : 'var(--accent-cyan)'
                    }}
                  >
                    {project.category}
                  </div>

                  {project.featured && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '0.8rem',
                        right: '0.8rem',
                        padding: '0.3rem 0.75rem',
                        borderRadius: 'var(--radius-full)',
                        background: 'rgba(99, 102, 241, 0.85)',
                        backdropFilter: 'blur(8px)',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem'
                      }}
                    >
                      <Sparkles size={12} /> Featured
                    </div>
                  )}
                </div>

                {/* Project Content */}
                <div style={{ padding: '1.6rem', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '0.45rem', lineHeight: 1.35 }}>
                      {project.title}
                    </h3>
                    <p style={{ color: 'var(--accent-sky)', fontSize: '0.82rem', fontWeight: 500, marginBottom: '0.85rem' }}>
                      {project.tagline}
                    </p>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1.2rem', textAlign: 'justify', textJustify: 'inter-word' }}>
                      {project.summary}
                    </p>

                    {/* Tech stack badges */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.4rem' }}>
                      {project.stack.slice(0, 5).map((tech, idx) => (
                        <span
                          key={idx}
                          style={{
                            fontSize: '0.72rem',
                            padding: '0.22rem 0.6rem',
                            borderRadius: 'var(--radius-sm)',
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.06)',
                            color: 'var(--text-muted)'
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                      {project.stack.length > 5 && (
                        <span
                          style={{
                            fontSize: '0.72rem',
                            padding: '0.22rem 0.6rem',
                            borderRadius: 'var(--radius-sm)',
                            background: 'rgba(6, 182, 212, 0.1)',
                            color: 'var(--accent-cyan)'
                          }}
                        >
                          +{project.stack.length - 5} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderTop: '1px solid var(--border-glass)',
                      paddingTop: '1.1rem'
                    }}
                  >
                    <button
                      onClick={() => onSelectProject(project)}
                      className="btn-primary"
                      style={{
                        padding: '0.5rem 1.05rem',
                        fontSize: '0.84rem'
                      }}
                    >
                      <Info size={15} />
                      <span>Architecture & Details</span>
                    </button>

                    <div style={{ display: 'flex', gap: '0.6rem' }}>
                      {project.demo && project.demo !== '#' && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noreferrer"
                          className="glass-pill"
                          style={{ padding: '0.5rem', borderRadius: '50%' }}
                          title="Live Demo"
                        >
                          <ExternalLink size={16} color="var(--accent-cyan)" />
                        </a>
                      )}
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="glass-pill"
                        style={{ padding: '0.5rem', borderRadius: '50%' }}
                        title="GitHub Repository"
                      >
                        <Github size={16} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .projects-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
