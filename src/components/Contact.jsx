import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  MessageSquare, 
  Copy, 
  Check, 
  Github, 
  Linkedin, 
  FileText,
  Sparkles,
  Download,
  ExternalLink,
  Loader2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export default function Contact() {
  const { profile } = PORTFOLIO_DATA;
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch("https://formsubmit.co/ajax/ikhwanmaulana796@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          _subject: formData.subject || `[Portfolio Contact] Message from ${formData.name}`,
          message: formData.message,
          _template: "table",
          _captcha: "false"
        })
      });

      const data = await response.json();
      if (response.ok && (data.success === "true" || data.success === true || response.status === 200)) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error(data.message || 'Gagal mengirim pesan melalui server email.');
      }
    } catch (err) {
      console.error("Form submit error:", err);
      setSubmitStatus('error');
      setErrorMessage(err.message || 'Gagal mengirim pesan otomatis.');
    }
  };

  return (
    <section id="contact" className="section" style={{ background: 'rgba(6, 10, 20, 0.7)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <Mail size={14} /> Connect & Collaborate
          </div>
          <h2 className="section-title">
            Let's Build Something Impactful
          </h2>
          <p className="section-subtitle">
            Whether you have a full-stack engineering role, freelance project, or architectural inquiry, feel free to reach out directly.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.15fr',
            gap: '3rem',
            alignItems: 'start'
          }}
          className="contact-grid"
        >
          {/* Left Column: Direct Contact Info & Shortcuts */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
            {/* Email Card */}
            <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: 'rgba(6, 182, 212, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-cyan)'
                  }}
                >
                  <Mail size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Email Address</div>
                  <a
                    href={`mailto:${profile.email}`}
                    style={{ color: '#fff', textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem' }}
                  >
                    {profile.email}
                  </a>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(profile.email, 'email')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: copiedEmail ? 'var(--accent-emerald)' : 'var(--text-muted)',
                  cursor: 'pointer',
                  padding: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  fontSize: '0.78rem'
                }}
              >
                {copiedEmail ? <Check size={16} /> : <Copy size={16} />}
                <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* WhatsApp / Phone Card */}
            <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: 'rgba(16, 185, 129, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-emerald)'
                  }}
                >
                  <MessageSquare size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>WhatsApp & Phone</div>
                  <a
                    href={profile.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: '#fff', textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem' }}
                  >
                    {profile.phone}
                  </a>
                </div>
              </div>
              <a
                href={profile.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
                style={{
                  padding: '0.4rem 0.85rem',
                  fontSize: '0.78rem',
                  borderRadius: 'var(--radius-full)'
                }}
              >
                Chat WA
              </a>
            </div>

            {/* Location Card */}
            <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: 'rgba(99, 102, 241, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-indigo)'
                }}
              >
                <MapPin size={20} />
              </div>
              <div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Location</div>
                <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.95rem' }}>
                  {profile.location} (WIB / UTC+7)
                </div>
              </div>
            </div>

            {/* Download Resume Highlight */}
            <div
              className="glass-panel"
              style={{
                padding: '1.5rem',
                background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(99, 102, 241, 0.1))',
                border: '1px solid rgba(6, 182, 212, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <FileText size={28} color="var(--accent-cyan)" />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.98rem' }}>Official Curriculum Vitae</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>PDF Version • Updated 2026</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.6rem' }}>
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary"
                  style={{ padding: '0.55rem 1rem', fontSize: '0.84rem' }}
                >
                  <Download size={14} /> PDF
                </a>
                <a
                  href={profile.cvOnlineUrl || '/cv_ikhwan_maulana.html'}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary"
                  style={{ padding: '0.55rem 1rem', fontSize: '0.84rem' }}
                >
                  <ExternalLink size={14} /> Web
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Message Form */}
          <div
            className="glass-panel"
            style={{
              padding: '2.5rem',
              background: 'rgba(14, 22, 40, 0.85)',
              border: '1px solid var(--border-glass)'
            }}
          >
            <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>Send Direct Message</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.8rem' }}>
              Fill out the form below. Your message will be routed directly to <strong>ikhwanmaulana796@gmail.com</strong>.
            </p>

            {submitStatus === 'success' ? (
              <div
                style={{
                  padding: '2rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(16, 185, 129, 0.12)',
                  border: '1px solid var(--accent-emerald)',
                  textAlign: 'center',
                  color: 'var(--accent-emerald)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.8rem'
                }}
              >
                <div
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '50%',
                    background: 'rgba(16, 185, 129, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-emerald)',
                    boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)'
                  }}
                >
                  <CheckCircle2 size={32} />
                </div>
                <h4 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff' }}>Pesan Berhasil Terkirim!</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', maxWidth: '420px', lineHeight: 1.6, textAlign: 'center' }}>
                  Terima kasih sudah menghubungi. Pesan Anda telah diteruskan langsung ke <strong>ikhwanmaulana796@gmail.com</strong>. Saya akan segera membalasnya.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitStatus('idle')}
                  className="btn-secondary"
                  style={{ marginTop: '0.6rem', padding: '0.55rem 1.25rem', fontSize: '0.85rem' }}
                >
                  Kirim Pesan Lainnya
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                {submitStatus === 'error' && (
                  <div
                    style={{
                      padding: '1rem',
                      borderRadius: 'var(--radius-sm)',
                      background: 'rgba(239, 68, 68, 0.12)',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      color: '#fca5a5',
                      fontSize: '0.85rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.6rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
                      <AlertCircle size={16} color="#ef4444" />
                      <span>{errorMessage || 'Pengiriman otomatis gagal.'}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginTop: '0.2rem' }}>
                      <a
                        href={`mailto:${profile.email}?subject=${encodeURIComponent(formData.subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(`Halo Ikhwan,\n\nNama: ${formData.name}\nEmail: ${formData.email}\n\nPesan:\n${formData.message}`)}`}
                        className="btn-secondary"
                        style={{ padding: '0.4rem 0.8rem', fontSize: '0.78rem' }}
                      >
                        <Mail size={13} /> Buka di Gmail / Mail Client
                      </a>
                      <a
                        href={`https://wa.me/6289673674598?text=${encodeURIComponent(`Halo Ikhwan, saya ${formData.name || 'Pengunjung Website'}.\n\nPesan: ${formData.message}`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-primary"
                        style={{ padding: '0.4rem 0.8rem', fontSize: '0.78rem' }}
                      >
                        <MessageSquare size={13} /> Kirim via WhatsApp
                      </a>
                    </div>
                  </div>
                )}

                <div>
                  <label style={{ display: 'block', fontSize: '0.84rem', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                    Nama Anda *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. John Doe / Tech Recruiter"
                    style={{
                      width: '100%',
                      padding: '0.8rem 1.1rem',
                      borderRadius: 'var(--radius-sm)',
                      background: 'rgba(6, 10, 20, 0.8)',
                      border: '1px solid var(--border-glass)',
                      color: '#fff',
                      fontSize: '0.9rem',
                      outline: 'none',
                      transition: 'border-color 0.2s ease'
                    }}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--accent-cyan)')}
                    onBlur={(e) => (e.target.style.borderColor = 'var(--border-glass)')}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.84rem', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                    Email Anda *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@company.com"
                    style={{
                      width: '100%',
                      padding: '0.8rem 1.1rem',
                      borderRadius: 'var(--radius-sm)',
                      background: 'rgba(6, 10, 20, 0.8)',
                      border: '1px solid var(--border-glass)',
                      color: '#fff',
                      fontSize: '0.9rem',
                      outline: 'none',
                      transition: 'border-color 0.2s ease'
                    }}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--accent-cyan)')}
                    onBlur={(e) => (e.target.style.borderColor = 'var(--border-glass)')}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.84rem', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                    Subjek / Perihal (Opsional)
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="e.g. Tawaran Kolaborasi Full-Stack / Interview"
                    style={{
                      width: '100%',
                      padding: '0.8rem 1.1rem',
                      borderRadius: 'var(--radius-sm)',
                      background: 'rgba(6, 10, 20, 0.8)',
                      border: '1px solid var(--border-glass)',
                      color: '#fff',
                      fontSize: '0.9rem',
                      outline: 'none',
                      transition: 'border-color 0.2s ease'
                    }}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--accent-cyan)')}
                    onBlur={(e) => (e.target.style.borderColor = 'var(--border-glass)')}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.84rem', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                    Pesan / Detail Kebutuhan *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Halo Ikhwan, saya tertarik untuk mendiskusikan peluang proyek web..."
                    style={{
                      width: '100%',
                      padding: '0.8rem 1.1rem',
                      borderRadius: 'var(--radius-sm)',
                      background: 'rgba(6, 10, 20, 0.8)',
                      border: '1px solid var(--border-glass)',
                      color: '#fff',
                      fontSize: '0.9rem',
                      outline: 'none',
                      resize: 'vertical',
                      transition: 'border-color 0.2s ease'
                    }}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--accent-cyan)')}
                    onBlur={(e) => (e.target.style.borderColor = 'var(--border-glass)')}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitStatus === 'loading'}
                  className="btn-primary"
                  style={{
                    width: '100%',
                    padding: '0.85rem',
                    fontSize: '0.95rem',
                    marginTop: '0.5rem',
                    opacity: submitStatus === 'loading' ? 0.75 : 1,
                    cursor: submitStatus === 'loading' ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                >
                  {submitStatus === 'loading' ? (
                    <>
                      <Loader2 size={18} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
                      <span>Mengirim Pesan ke Email...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Kirim Pesan ke Email</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @media (max-width: 850px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
