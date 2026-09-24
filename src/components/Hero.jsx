import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Layers, 
  CheckCircle2, 
  Code2, 
  Database, 
  Cpu, 
  MapPin,
  Send
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export default function Hero() {
  const { profile, stats } = PORTFOLIO_DATA;

  return (
    <header
      id="home"
      style={{
        position: 'relative',
        minHeight: '100vh',
        paddingTop: '8.5rem',
        paddingBottom: '4rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
    >
      {/* Background ambient orbs */}
      <div
        className="glow-orb glow-orb-cyan pulse-glow"
        style={{ width: '500px', height: '500px', top: '-10%', left: '-10%' }}
      />
      <div
        className="glow-orb glow-orb-indigo pulse-glow"
        style={{ width: '550px', height: '550px', top: '15%', right: '-15%', animationDelay: '2.5s' }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.15fr 0.85fr',
            gap: '3.5rem',
            alignItems: 'center'
          }}
          className="hero-grid"
        >
          {/* Left Column: Headline & Intro */}
          <div>
            {/* Status Pill */}
            <div
              className="glass-pill"
              style={{
                borderColor: 'rgba(16, 185, 129, 0.4)',
                background: 'rgba(16, 185, 129, 0.08)',
                marginBottom: '1.5rem',
                padding: '0.45rem 1rem'
              }}
            >
              <span
                style={{
                  width: '9px',
                  height: '9px',
                  borderRadius: '50%',
                  background: 'var(--accent-emerald)',
                  boxShadow: '0 0 10px var(--accent-emerald)'
                }}
              />
              <span style={{ color: '#a7f3d0', fontSize: '0.85rem', fontWeight: 600 }}>
                {profile.availability}
              </span>
            </div>

            {/* Main Greeting & Name */}
            <h1 style={{ fontSize: '3.2rem', fontWeight: 800, marginBottom: '0.8rem', letterSpacing: '-0.03em' }}>
              Hi, I'm <span className="gradient-text">{profile.name}</span>
            </h1>

            {/* Role Title */}
            <h2
              style={{
                fontSize: '1.45rem',
                fontWeight: 600,
                color: 'var(--accent-cyan-light)',
                marginBottom: '1.2rem',
                fontFamily: 'Inter',
                lineHeight: 1.4
              }}
            >
              {profile.subtitle}
            </h2>

            {/* Location & Quick Spec */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', marginBottom: '1.4rem', color: 'var(--text-muted)', fontSize: '0.92rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <MapPin size={16} color="var(--accent-cyan)" /> {profile.location}
              </span>
              <span>•</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Code2 size={16} color="var(--accent-sky)" /> React & Node.js Ecosystem
              </span>
              <span>•</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Database size={16} color="var(--accent-indigo)" /> Relational MySQL Design
              </span>
            </div>

            {/* Professional Summary */}
            <p
              style={{
                fontSize: '1.05rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
                marginBottom: '2.2rem',
                maxWidth: '650px',
                textAlign: 'justify',
                textJustify: 'inter-word'
              }}
            >
              {profile.summary}
            </p>

            {/* Call to Actions */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
              <a href="#projects" className="btn-primary">
                <span>View Full-Stack Projects</span>
                <ArrowRight size={17} />
              </a>


              <a href="#contact" className="btn-secondary">
                <Send size={16} />
                <span>Get In Touch</span>
              </a>
            </div>
          </div>

          {/* Right Column: Glass Profile Showcase Card */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div
              className="glass-panel"
              style={{
                padding: '2rem',
                maxWidth: '430px',
                width: '100%',
                position: 'relative',
                background: 'linear-gradient(145deg, rgba(14, 22, 42, 0.8), rgba(8, 12, 24, 0.95))',
                border: '1px solid rgba(56, 189, 248, 0.25)',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5), 0 0 35px rgba(6, 182, 212, 0.15)'
              }}
            >
              {/* Photo with glowing gradient border */}
              <div style={{ position: 'relative', width: '220px', height: '220px', margin: '0 auto 1.6rem auto' }}>
                <div
                  style={{
                    position: 'absolute',
                    inset: '-4px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-indigo), var(--accent-violet))',
                    animation: 'pulseGlow 4s infinite alternate',
                    filter: 'blur(3px)'
                  }}
                />
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '3px solid var(--bg-primary)',
                    display: 'block'
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>

              {/* Badges / Tech Highlights */}
              <div style={{ textAlign: 'center', marginBottom: '1.35rem', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '0.35rem', textAlign: 'center' }}>
                  {profile.name}
                </h3>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    fontSize: '0.88rem',
                    color: 'var(--accent-cyan-light)',
                    fontWeight: 500,
                    textAlign: 'center',
                    width: '100%'
                  }}
                >
                  <span style={{ fontWeight: 600 }}>Full Stack Engineer</span>
                  <span style={{ color: 'var(--text-dim)' }}>•</span>
                  <span style={{ color: 'var(--accent-emerald)', fontWeight: 600 }}>S.Kom (GPA 3.78)</span>
                </div>
              </div>

              {/* Floating feature pills inside card */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', alignItems: 'center', width: '100%' }}>
                <span className="glass-pill" style={{ fontSize: '0.8rem', padding: '0.42rem 1.1rem', background: 'rgba(6, 182, 212, 0.12)', borderColor: 'rgba(6, 182, 212, 0.28)', width: 'fit-content' }}>
                  <Code2 size={14} color="var(--accent-cyan)" /> React · Next.js · Vue
                </span>
                <span className="glass-pill" style={{ fontSize: '0.8rem', padding: '0.42rem 1.1rem', background: 'rgba(99, 102, 241, 0.12)', borderColor: 'rgba(99, 102, 241, 0.28)', width: 'fit-content' }}>
                  <Layers size={14} color="var(--accent-indigo)" /> Node.js · Express · PHP MVC
                </span>
                <span className="glass-pill" style={{ fontSize: '0.8rem', padding: '0.42rem 1.1rem', background: 'rgba(16, 185, 129, 0.12)', borderColor: 'rgba(16, 185, 129, 0.28)', width: 'fit-content' }}>
                  <Database size={14} color="var(--accent-emerald)" /> MySQL · PostgreSQL · Normalization
                </span>
                <span className="glass-pill" style={{ fontSize: '0.8rem', padding: '0.42rem 1.1rem', background: 'rgba(139, 92, 246, 0.12)', borderColor: 'rgba(139, 92, 246, 0.28)', width: 'fit-content' }}>
                  <Cpu size={14} color="var(--accent-violet)" /> Gemini API LLM · Python ML
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Key Stats Bar */}
        <div
          className="glass-panel"
          style={{
            marginTop: '4.5rem',
            padding: '1.8rem 2.2rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1.5rem',
            background: 'rgba(12, 18, 34, 0.65)'
          }}
        >
          {stats.map((item, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.2rem',
                borderLeft: idx !== 0 ? '1px solid var(--border-glass)' : 'none',
                paddingLeft: idx !== 0 ? '1.5rem' : '0'
              }}
              className="stat-card"
            >
              <div
                style={{
                  fontFamily: 'Outfit',
                  fontSize: '2rem',
                  fontWeight: 800,
                  color: idx % 2 === 0 ? 'var(--accent-cyan)' : 'var(--accent-sky)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1
                }}
              >
                {item.value}
              </div>
              <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                {item.label}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                {item.sub}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .hero-grid {
            grid-templateColumns: 1fr !important;
            gap: 2.5rem !important;
          }
          .hero-grid h1 {
            font-size: 2.4rem !important;
          }
          .stat-card {
            border-left: none !important;
            padding-left: 0 !important;
            border-bottom: 1px solid var(--border-glass);
            padding-bottom: 1rem;
          }
        }
      `}</style>
    </header>
  );
}
