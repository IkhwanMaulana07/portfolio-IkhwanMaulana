'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Mail, 
  Phone, 
  Send, 
  Copy, 
  Check, 
  MessageCircle, 
  Github, 
  Linkedin, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { COSMIC_DATA } from '../data/cosmicPortfolioData';

const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please provide a valid email address.' }),
  subject: z.string().min(3, { message: 'Subject must be at least 3 characters.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const { profile } = COSMIC_DATA;

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [submittedData, setSubmittedData] = useState<ContactFormData | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(profile.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const onSubmit = async (data: ContactFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    setSubmittedData(data);
    reset();

    try {
      confetti({
        particleCount: 85,
        spread: 65,
        origin: { y: 0.7 },
        colors: ['#E5C378', '#D4AF37', '#F7E7C4', '#FFFFFF', '#9E7B34']
      });
    } catch {
      // Safe fallback
    }
  };

  return (
    <section id="contact" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/[0.08] border border-amber-200/20 text-[#E5C378] text-xs font-mono font-medium uppercase tracking-wider mb-4">
            <Send className="w-3.5 h-3.5" /> Direct Consultation
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4 font-heading">
            Initiate a Direct Strategic Dialogue
          </h2>
          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed text-justify sm:text-center">
            {profile.supportingDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Panel: Contact Details & Quick Copy (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="luxury-panel p-6 sm:p-8">
              <h3 className="text-xl font-bold text-white font-heading mb-3">
                Executive Channels
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed text-justify mb-6">
                Actively considering engineering roles, full-stack architectural projects, research initiatives, and strategic technical discussions.
              </p>

              {/* Email One-Click Copy */}
              <div className="mb-4">
                <span className="text-[11px] font-mono text-zinc-400 block mb-1">
                  Direct Email Address:
                </span>
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#070709] border border-amber-200/20 font-mono text-xs">
                  <div className="flex items-center gap-2.5 truncate">
                    <Mail className="w-4 h-4 text-[#E5C378] shrink-0" />
                    <span className="text-white truncate">{profile.email}</span>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="p-2 min-h-[44px] min-w-[44px] rounded-lg bg-white/[0.03] hover:bg-white/[0.08] text-zinc-300 hover:text-white flex items-center justify-center transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 shrink-0"
                    aria-label="Copy Email"
                    title="Copy Email"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-[#E5C378]" />}
                  </button>
                </div>
                {copiedEmail && (
                  <span className="text-[11px] font-mono text-emerald-400 mt-1 block">
                    ✓ Email address copied to clipboard!
                  </span>
                )}
              </div>

              {/* Phone One-Click Copy */}
              <div className="mb-6">
                <span className="text-[11px] font-mono text-zinc-400 block mb-1">
                  Telephone &amp; WhatsApp:
                </span>
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#070709] border border-amber-200/20 font-mono text-xs">
                  <div className="flex items-center gap-2.5 truncate">
                    <Phone className="w-4 h-4 text-[#E5C378] shrink-0" />
                    <span className="text-white truncate">{profile.phone}</span>
                  </div>
                  <button
                    onClick={handleCopyPhone}
                    className="p-2 min-h-[44px] min-w-[44px] rounded-lg bg-white/[0.03] hover:bg-white/[0.08] text-zinc-300 hover:text-white flex items-center justify-center transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 shrink-0"
                    aria-label="Copy Phone Number"
                    title="Copy Phone"
                  >
                    {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-[#E5C378]" />}
                  </button>
                </div>
                {copiedPhone && (
                  <span className="text-[11px] font-mono text-emerald-400 mt-1 block">
                    ✓ Telephone number copied to clipboard!
                  </span>
                )}
              </div>

              {/* WhatsApp Quick Chat CTA */}
              <a
                href={profile.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2.5 py-3 min-h-[44px] rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-200 text-xs font-semibold font-mono transition-all duration-200 hover:shadow-[0_0_20px_rgba(16,185,129,0.2)] mb-4"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Connect via WhatsApp</span>
              </a>

              {/* Social Channels */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 p-3 min-h-[44px] rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-amber-200/15 text-xs font-mono text-zinc-200 hover:text-white transition-all"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 p-3 min-h-[44px] rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-amber-200/15 text-xs font-mono text-zinc-200 hover:text-white transition-all"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              </div>

            </div>
          </div>

          {/* Right Panel: Validated Contact Form (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="luxury-panel p-6 sm:p-8">
              <h3 className="text-xl font-bold text-white font-heading mb-1.5">
                Dispatch an Inquiry
              </h3>
              <p className="text-xs text-zinc-400 mb-6">
                All submissions are validated in real time. Expect a prompt response within 24 hours.
              </p>

              {submittedData ? (
                <div className="p-8 text-center rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                  <h4 className="text-lg font-bold text-white font-heading mb-2">
                    Inquiry Received
                  </h4>
                  <p className="text-xs text-zinc-300 max-w-md mx-auto leading-relaxed mb-6">
                    Thank you, <span className="text-emerald-300 font-semibold">{submittedData.name}</span>. Your correspondence regarding <span className="text-[#E5C378] font-mono">"{submittedData.subject}"</span> has been dispatched.
                  </p>
                  <button
                    onClick={() => setSubmittedData(null)}
                    className="btn-luxury-secondary text-xs"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-mono text-zinc-300 mb-1.5" htmlFor="contact-name">
                        Your Full Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        {...register('name')}
                        placeholder="e.g. Alex Morgan"
                        className={`w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border ${
                          errors.name ? 'border-red-500' : 'border-amber-200/20'
                        } text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#E5C378] focus:ring-1 focus:ring-[#E5C378] transition-all font-mono min-h-[44px]`}
                      />
                      {errors.name && (
                        <span className="text-[11px] font-mono text-red-400 mt-1 block">
                          {errors.name.message}
                        </span>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-mono text-zinc-300 mb-1.5" htmlFor="contact-email">
                        Business Email Address *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        {...register('email')}
                        placeholder="e.g. alex@enterprise.com"
                        className={`w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border ${
                          errors.email ? 'border-red-500' : 'border-amber-200/20'
                        } text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#E5C378] focus:ring-1 focus:ring-[#E5C378] transition-all font-mono min-h-[44px]`}
                      />
                      {errors.email && (
                        <span className="text-[11px] font-mono text-red-400 mt-1 block">
                          {errors.email.message}
                        </span>
                      )}
                    </div>

                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-xs font-mono text-zinc-300 mb-1.5" htmlFor="contact-subject">
                      Subject / Engagement Scope *
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      {...register('subject')}
                      placeholder="e.g. AI Engineering Collaboration / Technical Architecture"
                      className={`w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border ${
                        errors.subject ? 'border-red-500' : 'border-amber-200/20'
                      } text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#E5C378] focus:ring-1 focus:ring-[#E5C378] transition-all font-mono min-h-[44px]`}
                    />
                    {errors.subject && (
                      <span className="text-[11px] font-mono text-red-400 mt-1 block">
                        {errors.subject.message}
                      </span>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-mono text-zinc-300 mb-1.5" htmlFor="contact-message">
                      Project Specifications / Details *
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      {...register('message')}
                      placeholder="Detail the technical requirements, timeline, or engineering objectives..."
                      className={`w-full px-4 py-3 rounded-xl bg-white/[0.03] border ${
                        errors.message ? 'border-red-500' : 'border-amber-200/20'
                      } text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#E5C378] focus:ring-1 focus:ring-[#E5C378] transition-all font-mono`}
                    />
                    {errors.message && (
                      <span className="text-[11px] font-mono text-red-400 mt-1 block">
                        {errors.message.message}
                      </span>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-luxury-primary w-full text-xs font-semibold py-3 justify-center"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Transmitting...' : 'Dispatch Inquiry'}</span>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
