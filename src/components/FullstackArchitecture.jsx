import React, { useState } from 'react';
import { 
  Layers, 
  Layout, 
  Server, 
  Database, 
  Cpu, 
  Cloud, 
  CheckCircle2, 
  ArrowDown, 
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export default function FullstackArchitecture() {
  const { fullstackArchitecture } = PORTFOLIO_DATA;
  const [selectedLayer, setSelectedLayer] = useState(0);

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Layout': return Layout;
      case 'Server': return Server;
      case 'Database': return Database;
      case 'Cpu': return Cpu;
      case 'Cloud': return Cloud;
      default: return Layers;
    }
  };

  const current = fullstackArchitecture.layers[selectedLayer];
  const CurrentIcon = getIcon(current.icon);

  return (
    <section id="architecture" className="section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <Layers size={14} /> System Architecture
          </div>
          <h2 className="section-title">
            {fullstackArchitecture.title}
          </h2>
          <p className="section-subtitle">
            {fullstackArchitecture.description}
          </p>
        </div>

        {/* Architecture Interactive Flow */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.25fr',
            gap: '2.5rem',
            alignItems: 'start'
          }}
          className="arch-grid"
        >
          {/* Layer Selector Pipeline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
            {fullstackArchitecture.layers.map((layer, index) => {
              const Icon = getIcon(layer.icon);
              const isSelected = selectedLayer === index;

              return (
                <div
                  key={layer.id}
                  onClick={() => setSelectedLayer(index)}
                  style={{
                    padding: '1.15rem 1.4rem',
                    borderRadius: 'var(--radius-md)',
                    background: isSelected ? 'rgba(6, 182, 212, 0.12)' : 'rgba(14, 22, 40, 0.65)',
                    border: isSelected ? '1px solid var(--accent-cyan)' : '1px solid var(--border-glass)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.25s ease',
                    boxShadow: isSelected ? '0 0 20px rgba(6, 182, 212, 0.2)' : 'none'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '10px',
                        background: isSelected ? 'var(--accent-cyan)' : 'rgba(255, 255, 255, 0.05)',
                        color: isSelected ? '#fff' : 'var(--text-muted)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Icon size={20} />
                    </div>
                    <div>
                      <div style={{ fontSize: '1rem', fontWeight: 600, color: isSelected ? '#fff' : 'var(--text-primary)' }}>
                        {layer.title}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: isSelected ? 'var(--accent-cyan)' : 'var(--text-muted)' }}>
                        {layer.tech}
                      </div>
                    </div>
                  </div>
                  <ChevronRight size={18} color={isSelected ? 'var(--accent-cyan)' : 'var(--text-dim)'} />
                </div>
              );
            })}
          </div>

          {/* Deep Architectural Breakdown Display */}
          <div
            className="glass-panel"
            style={{
              padding: '2.4rem',
              background: 'linear-gradient(145deg, rgba(14, 22, 42, 0.9), rgba(6, 10, 20, 0.95))',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              minHeight: '400px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              {/* Header inside display */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-glass)', paddingBottom: '1.2rem' }}>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-indigo))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    boxShadow: '0 0 15px rgba(6, 182, 212, 0.35)'
                  }}
                >
                  <CurrentIcon size={24} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.4rem' }}>{current.title}</h3>
                  <div style={{ color: 'var(--accent-sky)', fontSize: '0.88rem', fontWeight: 500 }}>
                    Core Stack: {current.tech}
                  </div>
                </div>
              </div>

              {/* Bullet Details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem', marginBottom: '2rem' }}>
                {current.details.map((detail, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}>
                    <CheckCircle2 size={18} color="var(--accent-cyan)" style={{ marginTop: '0.2rem', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6, textAlign: 'justify', textJustify: 'inter-word' }}>
                      {detail}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom summary pill */}
            <div
              style={{
                padding: '0.8rem 1.2rem',
                borderRadius: 'var(--radius-sm)',
                background: 'rgba(6, 182, 212, 0.08)',
                border: '1px solid rgba(6, 182, 212, 0.2)',
                fontSize: '0.85rem',
                color: 'var(--accent-cyan-light)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem'
              }}
            >
              <Sparkles size={16} /> Designed for high throughput, maintainability, and clean cross-layer decoupling.
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 850px) {
          .arch-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
