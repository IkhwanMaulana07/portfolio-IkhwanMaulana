import React, { useEffect } from 'react';
import { 
  X, 
  ExternalLink, 
  Github, 
  CheckCircle2, 
  Layers, 
  ShieldAlert,
  Lightbulb,
  Award,
  Sparkles
} from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!project) return null;

  const isMobileApp = project.category?.toLowerCase().includes('mobile') || 
                      project.id === 'bsf-larva-detection' || 
                      project.stack?.includes('Flutter');

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="glass-panel"
        style={{
          maxWidth: '840px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          background: 'rgba(8, 12, 24, 0.96)',
          border: '1px solid rgba(56, 189, 248, 0.3)',
          padding: '2.5rem',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.5rem',
            right: '1.5rem',
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid var(--border-glass)',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)')}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div style={{ marginBottom: '1.5rem', paddingRight: '2.5rem' }}>
          <div
            style={{
              display: 'inline-block',
              fontSize: '0.78rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              color: 'var(--accent-cyan)',
              marginBottom: '0.5rem',
              letterSpacing: '0.05em'
            }}
          >
            {project.category} • {project.role}
          </div>
          <h2 style={{ fontSize: '1.85rem', lineHeight: 1.3, marginBottom: '0.5rem' }}>
            {project.title}
          </h2>
          <p style={{ color: 'var(--accent-sky)', fontSize: '0.95rem', fontWeight: 500 }}>
            {project.tagline}
          </p>
        </div>

        {/* Tech Stack List */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.8rem' }}>
          {project.stack.map((item, idx) => (
            <span
              key={idx}
              style={{
                fontSize: '0.8rem',
                padding: '0.3rem 0.75rem',
                borderRadius: 'var(--radius-full)',
                background: 'rgba(6, 182, 212, 0.1)',
                border: '1px solid rgba(6, 182, 212, 0.25)',
                color: 'var(--accent-cyan-light)',
                fontWeight: 500
              }}
            >
              {item}
            </span>
          ))}
        </div>

        {/* Project Screenshot / Visual Preview (matching previous portfolio) */}
        {project.image && (
          <div
            style={{
              width: '100%',
              maxHeight: isMobileApp ? '380px' : '320px',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              border: '1px solid var(--border-glass)',
              marginBottom: '2rem',
              background: isMobileApp ? '#070f0b' : '#05070a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: isMobileApp ? '1.25rem 0' : '0'
            }}
          >
            <img
              src={project.image}
              alt={project.title}
              style={{
                maxHeight: isMobileApp ? '350px' : '320px',
                maxWidth: '100%',
                objectFit: 'contain',
                objectPosition: 'center',
                borderRadius: isMobileApp ? '12px' : '0',
                boxShadow: isMobileApp ? '0 12px 35px rgba(0,0,0,0.8)' : 'none'
              }}
            />
          </div>
        )}

        {/* System Overview (if provided) */}
        {project.overview && (
          <div style={{ marginBottom: '1.8rem' }}>
            <h4 style={{ fontSize: '1.05rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              System Overview
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.65, textAlign: 'justify', textJustify: 'inter-word' }}>
              {project.overview}
            </p>
          </div>
        )}

        {/* Metrics Grid */}
        {project.metrics && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '1rem',
              marginBottom: '2rem',
              padding: '1.2rem',
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-glass)'
            }}
          >
            {project.metrics.map((m, idx) => (
              <div key={idx}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>
                  {m.label}
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {m.value}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Problem & Solution Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.3rem', marginBottom: '2rem' }}>
          <div
            style={{
              padding: '1.3rem',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(244, 63, 94, 0.06)',
              border: '1px solid rgba(244, 63, 94, 0.2)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#fb7185', fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.4rem' }}>
              <ShieldAlert size={18} /> The Problem & Challenge
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.65, textAlign: 'justify', textJustify: 'inter-word' }}>
              {project.problem}
            </p>
          </div>

          <div
            style={{
              padding: '1.3rem',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(16, 185, 129, 0.06)',
              border: '1px solid rgba(16, 185, 129, 0.2)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--accent-emerald)', fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.4rem' }}>
              <Lightbulb size={18} /> Engineering Solution
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.65, textAlign: 'justify', textJustify: 'inter-word' }}>
              {project.solution}
            </p>
          </div>
        </div>

        {/* Core Features (matching previous portfolio) */}
        {project.features && (
          <div style={{ marginBottom: '2rem' }}>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles size={18} color="var(--accent-cyan)" /> Core Features
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {project.features.map((feat, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.7rem' }}>
                  <CheckCircle2 size={16} color="var(--accent-cyan)" style={{ marginTop: '0.25rem', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.5, textAlign: 'justify', textJustify: 'inter-word' }}>
                    {feat}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Architectural Highlights */}
        {project.architecturePoints && (
          <div style={{ marginBottom: '2rem' }}>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Layers size={18} color="var(--accent-cyan)" /> Key Architectural Implementations
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {project.architecturePoints.map((pt, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.7rem' }}>
                  <CheckCircle2 size={16} color="var(--accent-cyan)" style={{ marginTop: '0.25rem', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.5, textAlign: 'justify', textJustify: 'inter-word' }}>
                    {pt}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Results & Impact */}
        {project.results && (
          <div
            style={{
              padding: '1.2rem 1.4rem',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(6, 182, 212, 0.06)',
              border: '1px solid rgba(6, 182, 212, 0.25)',
              marginBottom: '2rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--accent-cyan)', fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.35rem' }}>
              <Award size={18} /> Results & Impact
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6, textAlign: 'justify', textJustify: 'inter-word' }}>
              {project.results}
            </p>
          </div>
        )}

        {/* Footer Actions */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', borderTop: '1px solid var(--border-glass)', paddingTop: '1.5rem' }}>
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="btn-secondary"
            style={{ padding: '0.65rem 1.3rem', fontSize: '0.88rem' }}
          >
            <Github size={16} />
            <span>Repository</span>
          </a>

          {project.demo && project.demo !== '#' ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
              style={{ padding: '0.65rem 1.3rem', fontSize: '0.88rem' }}
            >
              <ExternalLink size={16} />
              <span>Live Application</span>
            </a>
          ) : (
            <span
              style={{
                padding: '0.65rem 1.1rem',
                fontSize: '0.82rem',
                borderRadius: 'var(--radius-sm)',
                background: 'rgba(255, 255, 255, 0.05)',
                color: 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              {isMobileApp ? 'On-Device Android APK' : 'Local Deployment'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
