'use client';

import React from 'react';
import { 
  GraduationCap, 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles
} from 'lucide-react';
import { COSMIC_DATA } from '../data/cosmicPortfolioData';

export default function EducationJourney() {
  const { education, certifications } = COSMIC_DATA;

  return (
    <section id="experience" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/[0.08] border border-amber-200/20 text-[#E5C378] text-xs font-mono font-medium uppercase tracking-wider mb-4">
            <Award className="w-3.5 h-3.5" /> Provenance &amp; Credentials
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4 font-heading">
            Distinguished Academic &amp; Professional Foundation
          </h2>
          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed text-justify sm:text-center">
            Formal computer science academic grounding reinforced with national government certifications and intensive technical masteries.
          </p>
        </div>

        {/* Two Primary Panels: Left Education, Right Certifications */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Panel: Education (6 Cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-xl bg-amber-400/[0.08] border border-amber-200/25 flex items-center justify-center text-[#E5C378]">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white font-heading">
                Academic Pedigree
              </h3>
            </div>

            {education.map((edu, idx) => (
              <div
                key={idx}
                className="luxury-panel p-6 sm:p-7 border-l-2 border-l-[#E5C378] transition-all"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-mono font-medium text-[#E5C378] bg-amber-400/[0.08] px-2.5 py-1 rounded-md border border-amber-200/20">
                    {edu.period}
                  </span>
                  {edu.gpa && (
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                      GPA: {edu.gpa} / 4.00
                    </span>
                  )}
                </div>

                <h4 className="text-lg font-bold text-white font-heading mb-1">
                  {edu.degree}
                </h4>
                <div className="text-sm font-semibold text-[#E5C378] mb-1">
                  {edu.institution}
                </div>
                {edu.faculty && (
                  <div className="text-xs font-mono text-zinc-400 mb-3">
                    {edu.faculty}
                  </div>
                )}

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed text-justify mb-4">
                  {edu.description}
                </p>

                {edu.coursework && (
                  <div>
                    <span className="text-[11px] font-mono text-zinc-400 block mb-2 uppercase tracking-wider">
                      Selected Coursework:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {edu.coursework.map((course, cIdx) => (
                        <span
                          key={cIdx}
                          className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-white/[0.03] border border-amber-200/15 text-zinc-300"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Panel: Certifications & Continuous Learning (6 Cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-xl bg-amber-400/[0.08] border border-amber-200/25 flex items-center justify-center text-[#E5C378]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white font-heading">
                Credentials &amp; Certifications
              </h3>
            </div>

            <div className="space-y-3.5">
              {certifications.map((cert, idx) => (
                <div
                  key={idx}
                  className="luxury-card p-5 group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-1.5">
                      <h4 className="text-base font-bold text-white font-heading group-hover:text-[#E5C378] transition-colors">
                        {cert.title}
                      </h4>
                      <span className="text-xs font-mono font-medium text-[#E5C378] bg-amber-400/[0.08] px-2 py-0.5 rounded shrink-0 border border-amber-200/20">
                        {cert.year}
                      </span>
                    </div>

                    <div className="text-xs font-mono text-[#E5C378]/80 mb-2">
                      {cert.issuer} • <span className="text-zinc-400">{cert.type}</span>
                    </div>

                    <p className="text-xs text-zinc-300 leading-relaxed text-justify">
                      {cert.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
