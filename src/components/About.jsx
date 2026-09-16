import React from 'react';
import { 
  CheckCircle2, 
  Code, 
  Database, 
  Server, 
  Cpu, 
  Layers, 
  ShieldCheck, 
  Workflow,
  Sparkles,
  Terminal,
  Cloud,
  GitBranch
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export default function About() {
  const { softwareEngineeringExperience } = PORTFOLIO_DATA;

  const pillars = [
    {
      icon: Code,
      title: "Frontend Engineering",
      color: "var(--accent-cyan)",
      desc: "Building highly responsive, accessible user interfaces using React.js, Next.js, Vue.js, and Tailwind CSS. Obsessed with slick micro-interactions, clean component hierarchies, and fast render loops."
    },
    {
      icon: Server,
      title: "Backend & API Architecture",
      color: "var(--accent-indigo)",
      desc: "Architecting modular backend services with Node.js/Express and structured PHP Native MVC. Experienced designing secure RESTful API contracts, Fetch/AJAX asynchronous data handling, and role-gated RBAC."
    },
    {
      icon: Database,
      title: "Database Modeling & Integrity",
      color: "var(--accent-emerald)",
      desc: "Mastery over relational schemas (MySQL up to 3NF, PostgreSQL) and NoSQL (MongoDB). Implementing transaction safety, database upsert logic, foreign key constraints, and automated Excel/TSV exports."
    },
    {
      icon: Cpu,
      title: "AI & ML Workflows Integration",
      color: "var(--accent-violet)",
      desc: "Directly embedding AI capabilities into production applications: Google Gemini API (LLM chatbots & automated drafting), Python ML model inference, and on-device computer vision via TensorFlow Lite."
    }
  ];

  const expIcons = {
    Server: Server,
    Layers: Layers,
    Cpu: Cpu,
    Cloud: Cloud
  };

  return (
    <section id="about" className="section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <Sparkles size={14} /> Full-Stack Philosophy
          </div>
          <h2 className="section-title">
            Owning the Entire Application Lifecycle
          </h2>
          <p className="section-subtitle" style={{ textAlign: 'justify', textJustify: 'inter-word' }}>
            From normalized relational database design and secure API gateways through to polished, reactive interfaces and intelligent AI integrations.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.5rem',
            marginBottom: '3.5rem'
          }}
        >
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div key={idx} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid var(--border-glass)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: pillar.color,
                    boxShadow: `0 0 15px ${pillar.color}22`
                  }}
                >
                  <Icon size={24} />
                </div>
                <h3 style={{ fontSize: '1.2rem', fontFamily: 'Outfit' }}>{pillar.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.65, textAlign: 'justify', textJustify: 'inter-word' }}>
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Software Engineering Experience (Directly from CV) */}
        <div style={{ marginBottom: '3.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'rgba(6, 182, 212, 0.12)',
                border: '1px solid rgba(6, 182, 212, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-cyan)'
              }}
            >
              <Terminal size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.45rem', letterSpacing: '-0.01em' }}>
                Software Engineering Experience
              </h3>
              <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                Core competencies and execution practices from official CV
              </div>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.25rem'
            }}
          >
            {softwareEngineeringExperience.map((exp) => {
              const IconComponent = expIcons[exp.icon] || CheckCircle2;
              return (
                <div
                  key={exp.id}
                  className="glass-panel"
                  style={{
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                    borderLeft: '3px solid var(--accent-cyan)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <IconComponent size={18} color="var(--accent-cyan)" />
                    <h4 style={{ fontSize: '1.02rem', fontFamily: 'Outfit', color: 'var(--text-primary)' }}>
                      {exp.title}
                    </h4>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.65, textAlign: 'justify', textJustify: 'inter-word' }}>
                    {exp.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Deep Dive Box */}
        <div
          className="glass-panel"
          style={{
            padding: '2.5rem',
            background: 'linear-gradient(135deg, rgba(14, 22, 42, 0.8) 0%, rgba(8, 12, 24, 0.9) 100%)',
            border: '1px solid rgba(56, 189, 248, 0.2)'
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 0.8fr',
              gap: '2.5rem',
              alignItems: 'center'
            }}
            className="about-deepdive"
          >
            <div>
              <h3 style={{ fontSize: '1.6rem', marginBottom: '1rem' }}>
                Engineering Mindset: <span className="gradient-text-cyan">Modular, Robust, Scalable</span>
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', lineHeight: 1.75, marginBottom: '1.2rem', textAlign: 'justify', textJustify: 'inter-word' }}>
                Throughout my academic career at Universitas Gunadarma (graduated with a <strong>3.78 / 4.00 GPA</strong>) and production project builds, I've honed the ability to decouple the presentation layer from backend business logic cleanly. Whether developing enterprise grade management systems with weighted mathematical recapitulation or community portals serving local MSME businesses with Leaflet maps and Gemini AI assistants, every layer is designed for maintainability and reliability.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.8rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  <CheckCircle2 size={16} color="var(--accent-cyan)" /> Strict Model-View-Controller
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  <CheckCircle2 size={16} color="var(--accent-cyan)" /> Zero-Reload Fetch/AJAX UI
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  <CheckCircle2 size={16} color="var(--accent-cyan)" /> Normalized Relational Schemas
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  <CheckCircle2 size={16} color="var(--accent-cyan)" /> Role-Based Access Control (RBAC)
                </div>
              </div>
            </div>

            {/* Quick Profile Summary Card */}
            <div
              style={{
                background: 'rgba(6, 10, 20, 0.7)',
                padding: '1.8rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-glass)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}
            >
              <div style={{ fontSize: '0.82rem', color: 'var(--accent-cyan)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Developer Snapshot
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', paddingBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Primary Focus</span>
                <span style={{ fontWeight: 600, fontSize: '0.88rem' }}>Full Stack & AI Web Apps</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', paddingBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Main Stack</span>
                <span style={{ fontWeight: 600, fontSize: '0.88rem' }}>React, Node.js, PHP, MySQL</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', paddingBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Certification</span>
                <span style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--accent-emerald)' }}>BNSP Certified Programmer</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Spoken Languages</span>
                <span style={{ fontWeight: 600, fontSize: '0.88rem' }}>Indonesian (Native), English</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 850px) {
          .about-deepdive {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
