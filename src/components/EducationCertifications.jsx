import React, { useState } from 'react';
import { 
  GraduationCap, 
  Award, 
  Users, 
  BookOpen, 
  Calendar, 
  CheckCircle2, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export default function EducationCertifications() {
  const [activeTab, setActiveTab] = useState('education');
  const { education, certifications, conferences, organization } = PORTFOLIO_DATA;

  return (
    <section id="education" className="section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <GraduationCap size={14} /> Credentials & Growth
          </div>
          <h2 className="section-title">
            Education, Certifications & Leadership
          </h2>
          <p className="section-subtitle">
            Formal computer science degree with honors, national BNSP programmer credentials, intensive vendor training (Golang & Oracle), and tech community involvement.
          </p>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.8rem', marginBottom: '3rem' }}>
          <button
            onClick={() => setActiveTab('education')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.65rem 1.3rem',
              borderRadius: 'var(--radius-full)',
              border: activeTab === 'education' ? '1px solid var(--accent-cyan)' : '1px solid var(--border-glass)',
              background: activeTab === 'education' ? 'rgba(6, 182, 212, 0.15)' : 'rgba(255, 255, 255, 0.04)',
              color: activeTab === 'education' ? '#fff' : 'var(--text-secondary)',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.9rem',
              transition: 'all 0.2s ease'
            }}
          >
            <GraduationCap size={18} /> Education & Academics
          </button>

          <button
            onClick={() => setActiveTab('certs')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.65rem 1.3rem',
              borderRadius: 'var(--radius-full)',
              border: activeTab === 'certs' ? '1px solid var(--accent-cyan)' : '1px solid var(--border-glass)',
              background: activeTab === 'certs' ? 'rgba(6, 182, 212, 0.15)' : 'rgba(255, 255, 255, 0.04)',
              color: activeTab === 'certs' ? '#fff' : 'var(--text-secondary)',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.9rem',
              transition: 'all 0.2s ease'
            }}
          >
            <Award size={18} /> Certifications & Training
          </button>

          <button
            onClick={() => setActiveTab('leadership')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.65rem 1.3rem',
              borderRadius: 'var(--radius-full)',
              border: activeTab === 'leadership' ? '1px solid var(--accent-cyan)' : '1px solid var(--border-glass)',
              background: activeTab === 'leadership' ? 'rgba(6, 182, 212, 0.15)' : 'rgba(255, 255, 255, 0.04)',
              color: activeTab === 'leadership' ? '#fff' : 'var(--text-secondary)',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.9rem',
              transition: 'all 0.2s ease'
            }}
          >
            <Users size={18} /> Seminars & Leadership
          </button>
        </div>

        {/* Content Panel */}
        <div>
          {/* TAB 1: EDUCATION */}
          {activeTab === 'education' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {education.map((edu, idx) => (
                <div
                  key={idx}
                  className="glass-panel"
                  style={{
                    padding: '2.2rem',
                    borderLeft: '4px solid var(--accent-cyan)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <h3 style={{ fontSize: '1.4rem', marginBottom: '0.3rem' }}>{edu.degree}</h3>
                      <div style={{ color: 'var(--accent-cyan-light)', fontSize: '1rem', fontWeight: 600 }}>
                        {edu.institution}
                      </div>
                      {edu.faculty && (
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                          {edu.faculty}
                        </div>
                      )}
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span className="glass-pill" style={{ color: 'var(--accent-sky)', fontWeight: 600 }}>
                        <Calendar size={14} /> {edu.period}
                      </span>
                      {edu.gpa && (
                        <div style={{ marginTop: '0.6rem', color: 'var(--accent-emerald)', fontWeight: 700, fontSize: '0.95rem' }}>
                          GPA: {edu.gpa}
                        </div>
                      )}
                    </div>
                  </div>

                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1.4rem', textAlign: 'justify', textJustify: 'inter-word' }}>
                    {edu.description}
                  </p>

                  {edu.coursework && (
                    <div>
                      <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '0.6rem', textTransform: 'uppercase' }}>
                        Relevant Academic Coursework:
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {edu.coursework.map((c, i) => (
                          <span
                            key={i}
                            style={{
                              fontSize: '0.8rem',
                              padding: '0.25rem 0.75rem',
                              borderRadius: 'var(--radius-sm)',
                              background: 'rgba(255, 255, 255, 0.05)',
                              border: '1px solid var(--border-glass)',
                              color: 'var(--text-primary)'
                            }}
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: CERTIFICATIONS */}
          {activeTab === 'certs' && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '1.5rem'
              }}
            >
              {certifications.map((cert, idx) => (
                <div
                  key={idx}
                  className="glass-card"
                  style={{
                    padding: '1.8rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                      <span
                        style={{
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          padding: '0.25rem 0.6rem',
                          borderRadius: 'var(--radius-full)',
                          background: 'rgba(6, 182, 212, 0.12)',
                          color: 'var(--accent-cyan)',
                          border: '1px solid rgba(6, 182, 212, 0.3)'
                        }}
                      >
                        {cert.type}
                      </span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                        {cert.year}
                      </span>
                    </div>

                    <h4 style={{ fontSize: '1.2rem', marginBottom: '0.4rem', fontFamily: 'Outfit' }}>
                      {cert.title}
                    </h4>
                    <div style={{ color: 'var(--accent-sky)', fontSize: '0.88rem', fontWeight: 500, marginBottom: '0.9rem' }}>
                      {cert.issuer}
                    </div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6, textAlign: 'justify', textJustify: 'inter-word' }}>
                      {cert.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: LEADERSHIP & SEMINARS */}
          {activeTab === 'leadership' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {/* Organization Card */}
              <div
                className="glass-panel"
                style={{
                  padding: '2rem',
                  borderLeft: '4px solid var(--accent-indigo)'
                }}
              >
                <div style={{ fontSize: '0.78rem', color: 'var(--accent-indigo-light)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  Organizational Leadership
                </div>
                <h3 style={{ fontSize: '1.35rem', marginBottom: '0.4rem' }}>{organization.role}</h3>
                <div style={{ color: 'var(--accent-sky)', fontSize: '0.95rem', fontWeight: 500, marginBottom: '0.8rem' }}>
                  {organization.org}
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.65, textAlign: 'justify', textJustify: 'inter-word' }}>
                  {organization.desc}
                </p>
              </div>

              {/* Seminars */}
              <h4 style={{ fontSize: '1.2rem', marginTop: '1rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                Conferences & Tech Talks
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
                {conferences.map((conf, idx) => (
                  <div key={idx} className="glass-card" style={{ padding: '1.6rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>Seminar</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{conf.year}</span>
                    </div>
                    <h5 style={{ fontSize: '1.05rem', marginBottom: '0.4rem', fontFamily: 'Outfit' }}>{conf.title}</h5>
                    <div style={{ color: 'var(--accent-sky)', fontSize: '0.85rem', marginBottom: '0.7rem' }}>{conf.organizer}</div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', lineHeight: 1.55, textAlign: 'justify', textJustify: 'inter-word' }}>{conf.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
