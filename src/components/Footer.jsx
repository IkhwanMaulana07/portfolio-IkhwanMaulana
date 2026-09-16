import React from 'react';
import { Terminal, ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export default function Footer() {
  const { profile } = PORTFOLIO_DATA;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        borderTop: '1px solid var(--border-glass)',
        background: 'rgba(4, 7, 15, 0.95)',
        padding: '3rem 0 2rem 0',
        position: 'relative'
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}
        >
          {/* Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-indigo))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Terminal size={18} color="#fff" />
            </div>
            <div>
              <span style={{ fontWeight: 700, fontSize: '1rem', fontFamily: 'Outfit' }}>{profile.name}</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginLeft: '0.5rem' }}>
                Full Stack Developer
              </span>
            </div>
          </div>

          {/* Socials & Back To Top */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="glass-pill"
              style={{ padding: '0.45rem', borderRadius: '50%' }}
              title="GitHub"
            >
              <Github size={16} />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="glass-pill"
              style={{ padding: '0.45rem', borderRadius: '50%' }}
              title="LinkedIn"
            >
              <Linkedin size={16} />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="glass-pill"
              style={{ padding: '0.45rem', borderRadius: '50%' }}
              title="Email"
            >
              <Mail size={16} />
            </a>

            <button
              onClick={scrollToTop}
              className="glass-pill"
              style={{
                padding: '0.5rem 0.9rem',
                cursor: 'pointer',
                fontSize: '0.82rem',
                fontWeight: 600
              }}
            >
              <ArrowUp size={15} color="var(--accent-cyan)" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>

        {/* Copyright */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            paddingTop: '1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.8rem',
            fontSize: '0.82rem',
            color: 'var(--text-dim)'
          }}
        >
          <div>
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </div>
          <div>
            Built with React & Vite • Modern Dark Glassmorphism
          </div>
        </div>
      </div>
    </footer>
  );
}
