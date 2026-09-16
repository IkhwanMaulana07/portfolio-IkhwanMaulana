import React, { useState } from 'react';
import { 
  Code2, 
  Layers, 
  Database, 
  Terminal, 
  Cpu, 
  Sparkles,
  Smartphone,
  CheckCircle2,
  Workflow,
  Server,
  Eye,
  ShieldCheck,
  GitBranch,
  ExternalLink
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export default function TechStack() {
  const [activeTab, setActiveTab] = useState('all');
  const { skills } = PORTFOLIO_DATA;

  // 4 Core Engineering Pillars
  const pillars = [
    {
      number: '01',
      title: 'Full-Stack Web Architecture',
      category: 'Web Systems & APIs',
      icon: Server,
      color: 'var(--accent-cyan)',
      description: 'Architecting resilient multi-tier web applications: modular PHP Native MVC, asynchronous client-server communication, session authentication, and Role-Based Access Control (RBAC).',
      highlights: ['React.js & SPAs', 'PHP Native MVC', 'Node.js & Express', 'RESTful API Architecture', 'RBAC Security'],
      appliedIn: 'SMP Al-Amin Academic System & Malaka Jaya MSME Portal'
    },
    {
      number: '02',
      title: 'AI & Generative LLM Integration',
      category: 'Machine Learning Systems',
      icon: Cpu,
      color: 'var(--accent-sky)',
      description: 'Engineering intelligent capabilities into software: Google Gemini API integration for automated assistants, Content-Based recommendation engines, TF-IDF vectorization, and Cosine Similarity.',
      highlights: ['Google Gemini API', 'Content-Based Filtering', 'TF-IDF & Cosine Similarity', 'Streamlit Apps', 'Scikit-Learn'],
      appliedIn: 'Movie Recommender System & Malaka Jaya AI Assistant'
    },
    {
      number: '03',
      title: 'Computer Vision & Edge ML',
      category: 'Deep Learning & Mobile',
      icon: Eye,
      color: '#34d399',
      description: 'End-to-end computer vision pipelines: curating & annotating 21,974 images across 4 growth stages, fine-tuning YOLOv11s, model weight quantization to TensorFlow Lite, and cross-platform Flutter deployment.',
      highlights: ['YOLOv11s & YOLOv8', 'TensorFlow Lite', 'Flutter & Dart', '21K+ Annotated Dataset', 'OpenCV Pipelines'],
      appliedIn: 'BSF Larva Growth Classification Mobile App'
    },
    {
      number: '04',
      title: 'Database Design & Engineering Workflow',
      category: 'Data & Infrastructure',
      icon: Database,
      color: 'var(--accent-indigo)',
      description: 'Designing normalized relational databases (3NF), foreign key constraints, transactional consistency, paired with modern Git branching workflows, Postman API testing, and automated Vite build pipelines.',
      highlights: ['MySQL 3NF Normalization', 'PostgreSQL & Relational DBs', 'Git & GitHub Workflows', 'Postman API Validation', 'Vite & Modern Tooling'],
      appliedIn: 'All Multi-Role Databases & Source Repositories'
    }
  ];

  const tabs = [
    { id: 'all', label: 'All Technologies', icon: Sparkles },
    { id: 'frontend', label: 'Frontend & UI', icon: Code2 },
    { id: 'backend', label: 'Backend & APIs', icon: Layers },
    { id: 'languages', label: 'Core Languages', icon: Terminal },
    { id: 'ai', label: 'AI & Machine Learning', icon: Cpu },
    { id: 'databases', label: 'Databases & Storage', icon: Database },
    { id: 'devops', label: 'DevOps & Tooling', icon: Workflow }
  ];

  // Helper to compile skills
  const getFilteredSkills = () => {
    if (activeTab === 'all') {
      return [
        ...(skills.languages || []).map(s => ({ ...s, group: 'Languages' })),
        ...(skills.frontend || []).map(s => ({ ...s, group: 'Frontend' })),
        ...(skills.styling || []).map(s => ({ ...s, group: 'Frontend & Styling' })),
        ...(skills.backend || []).map(s => ({ ...s, group: 'Backend' })),
        ...(skills.api || []).map(s => ({ ...s, group: 'API & Real-Time' })),
        ...(skills.databases || []).map(s => ({ ...s, group: 'Databases' })),
        ...(skills.ai || []).map(s => ({ ...s, group: 'AI & ML' })),
        ...(skills.tools || []).map(s => ({ ...s, group: 'Tools & Testing' })),
        ...(skills.devops || []).map(s => ({ ...s, group: 'DevOps & Cloud' }))
      ];
    }
    if (activeTab === 'frontend') {
      return [
        ...(skills.frontend || []).map(s => ({ ...s, group: 'Frontend' })),
        ...(skills.styling || []).map(s => ({ ...s, group: 'Styling & UI' }))
      ];
    }
    if (activeTab === 'backend') {
      return [
        ...(skills.backend || []).map(s => ({ ...s, group: 'Backend' })),
        ...(skills.api || []).map(s => ({ ...s, group: 'API & Real-Time' }))
      ];
    }
    if (activeTab === 'devops') {
      return [
        ...(skills.tools || []).map(s => ({ ...s, group: 'Tools & Testing' })),
        ...(skills.devops || []).map(s => ({ ...s, group: 'DevOps & Deployment' }))
      ];
    }
    return (skills[activeTab] || []).map(s => ({ ...s, group: activeTab }));
  };

  const filtered = getFilteredSkills();

  return (
    <section id="skills" className="section" style={{ background: 'rgba(6, 10, 20, 0.65)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <Workflow size={14} /> Technical Arsenal & Competencies
          </div>
          <h2 className="section-title">
            Engineering Domains & Core Capabilities
          </h2>
          <p className="section-subtitle">
            A practical, production-focused breakdown of software architecture, intelligent algorithms, edge deployment, and full-stack systems engineered across production projects.
          </p>
        </div>

        {/* 4 Strategic Capability Pillars */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            marginBottom: '4.5rem'
          }}
        >
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.number}
                className="glass-panel"
                style={{
                  padding: '2rem',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border-glass)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'transform 0.3s ease, border-color 0.3s ease'
                }}
              >
                {/* Accent Top Border Glow */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: pillar.color
                  }}
                />

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: 'var(--radius-md)',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid var(--border-glass)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Icon size={22} color={pillar.color} />
                    </div>
                    <span
                      style={{
                        fontFamily: 'monospace',
                        fontSize: '1.2rem',
                        fontWeight: 700,
                        color: 'rgba(255, 255, 255, 0.25)'
                      }}
                    >
                      {pillar.number}
                    </span>
                  </div>

                  <div
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      color: pillar.color,
                      marginBottom: '0.35rem'
                    }}
                  >
                    {pillar.category}
                  </div>

                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.8rem', lineHeight: 1.3 }}>
                    {pillar.title}
                  </h3>

                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.4rem', textAlign: 'justify', textJustify: 'inter-word' }}>
                    {pillar.description}
                  </p>

                  {/* Highlights List */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
                    {pillar.highlights.map((hl, i) => (
                      <span
                        key={i}
                        style={{
                          fontSize: '0.72rem',
                          padding: '0.25rem 0.6rem',
                          borderRadius: 'var(--radius-sm)',
                          background: 'rgba(255, 255, 255, 0.04)',
                          border: '1px solid rgba(255, 255, 255, 0.07)',
                          color: 'var(--text-primary)'
                        }}
                      >
                        {hl}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Proof / Applied in footer */}
                <div
                  style={{
                    borderTop: '1px solid rgba(255, 255, 255, 0.07)',
                    paddingTop: '0.9rem',
                    fontSize: '0.75rem',
                    color: 'var(--accent-cyan)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}
                >
                  <CheckCircle2 size={13} />
                  <span>Applied: {pillar.appliedIn}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sub-header for Detailed Stack Explorer */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h3 style={{ fontSize: '1.45rem', marginBottom: '0.5rem' }}>
            Interactive Technology Stack & Implementations
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Filter across the ecosystem to inspect practical use cases and engineering roles for each technology.
          </p>
        </div>

        {/* Tab Filters */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.55rem',
            justifyContent: 'center',
            marginBottom: '2.5rem'
          }}
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.55rem 1.15rem',
                  borderRadius: 'var(--radius-full)',
                  border: isActive ? '1px solid var(--accent-cyan)' : '1px solid var(--border-glass)',
                  background: isActive ? 'rgba(6, 182, 212, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                  color: isActive ? '#fff' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  fontSize: '0.86rem',
                  fontWeight: 600,
                  transition: 'all 0.25s ease',
                  boxShadow: isActive ? '0 0 15px rgba(6, 182, 212, 0.25)' : 'none'
                }}
              >
                <Icon size={15} color={isActive ? 'var(--accent-cyan)' : 'currentColor'} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.25rem'
          }}
        >
          {filtered.map((skill, idx) => (
            <div
              key={idx}
              className="glass-card"
              style={{
                padding: '1.4rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-glass)',
                background: 'rgba(13, 19, 36, 0.5)',
                transition: 'transform 0.2s ease, border-color 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.4)';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-glass)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem', gap: '0.5rem' }}>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {skill.name}
                  </h4>
                  <span
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      padding: '0.2rem 0.55rem',
                      borderRadius: 'var(--radius-full)',
                      background: 'rgba(6, 182, 212, 0.1)',
                      color: 'var(--accent-cyan)',
                      border: '1px solid rgba(6, 182, 212, 0.25)',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {skill.role}
                  </span>
                </div>

                <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.55, marginBottom: '1.1rem', textAlign: 'justify', textJustify: 'inter-word' }}>
                  {skill.desc}
                </p>
              </div>

              {skill.applied && (
                <div
                  style={{
                    borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                    paddingTop: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontSize: '0.74rem',
                    color: 'var(--text-muted)'
                  }}
                >
                  <span style={{ color: 'var(--accent-emerald)', fontWeight: 600 }}>•</span>
                  <span>{skill.applied}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
