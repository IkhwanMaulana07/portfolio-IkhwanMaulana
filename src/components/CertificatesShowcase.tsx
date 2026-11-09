'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  ExternalLink, 
  ZoomIn, 
  X, 
  FileText, 
  ChevronRight,
  Layers,
  Sparkles,
  Calendar,
  Building,
  Hash
} from 'lucide-react';
import { BNSP_CERTIFICATES, BNSPCertificate } from '../data/bnspCertificatesData';

export default function CertificatesShowcase() {
  const [activeCertId, setActiveCertId] = useState<string>('programmer');
  const [activeSide, setActiveSide] = useState<'depan' | 'belakang'>('depan');
  const [lightboxImage, setLightboxImage] = useState<{ src: string; title: string } | null>(null);

  const activeCert: BNSPCertificate = 
    BNSP_CERTIFICATES.find((c) => c.id === activeCertId) || BNSP_CERTIFICATES[0];

  const currentDisplayImage = activeSide === 'depan' ? activeCert.frontImage : activeCert.backImage;

  return (
    <section id="certifications" className="py-24 sm:py-32 relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/3 left-[-10%] w-[45vw] h-[45vw] max-w-[500px] max-h-[500px] rounded-full bg-orange-600/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-[-10%] w-[40vw] h-[40vw] max-w-[450px] max-h-[450px] rounded-full bg-cyan-600/10 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-orange-400 mb-3 backdrop-blur-md">
            <Award className="w-3.5 h-3.5" />
            <span className="tracking-[0.25em] uppercase font-semibold">NATIONAL CREDENTIALS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-techno text-white tracking-tight mb-4">
            SERTIFIKASI BNSP
          </h2>
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-sans">
            Sertifikat kompetensi kerja resmi berstandar nasional yang diterbitkan oleh Badan Nasional Sertifikasi Profesi (BNSP), memvalidasi penguasaan teknis tingkat profesional di bidang Rekayasa Perangkat Lunak dan Jaringan Komputer.
          </p>
        </div>

        {/* Certificate Switcher Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {BNSP_CERTIFICATES.map((cert) => {
            const isSelected = activeCertId === cert.id;
            return (
              <button
                key={cert.id}
                onClick={() => {
                  setActiveCertId(cert.id);
                  setActiveSide('depan');
                }}
                className={`px-5 py-3 rounded-2xl font-techno text-xs sm:text-sm font-bold tracking-wider transition-all duration-300 flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 ${
                  isSelected
                    ? 'bg-gradient-to-r from-orange-600 to-amber-500 text-white shadow-[0_0_30px_rgba(255,100,0,0.45)] border border-orange-400/50 scale-[1.02]'
                    : 'bg-[#0E0E16]/80 text-gray-400 hover:text-white border border-white/10 hover:border-white/20 backdrop-blur-xl'
                }`}
              >
                <ShieldCheck className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-orange-400'}`} />
                <span>{cert.qualification}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Dual-Panel Showcase */}
        <div className="rounded-[32px] border border-white/10 bg-[#0A0A12]/90 backdrop-blur-2xl p-6 sm:p-10 md:p-12 shadow-[0_20px_70px_rgba(0,0,0,0.95)]">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column: Visual Certificate Preview Frame (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col items-center">
              
              {/* Page View Toggle Pill */}
              <div className="inline-flex items-center p-1 rounded-xl bg-black/60 border border-white/10 mb-5">
                <button
                  onClick={() => setActiveSide('depan')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                    activeSide === 'depan'
                      ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40 shadow-sm'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Halaman Depan
                </button>
                <button
                  onClick={() => setActiveSide('belakang')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                    activeSide === 'belakang'
                      ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40 shadow-sm'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Unit Kompetensi
                </button>
              </div>

              {/* Certificate Scan Container */}
              <div 
                className="relative w-full max-w-[340px] aspect-[1/1.414] rounded-2xl overflow-hidden border-2 border-white/15 bg-white shadow-[0_15px_50px_rgba(0,0,0,0.8),0_0_35px_rgba(255,100,0,0.2)] group cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
                onClick={() => setLightboxImage({ src: currentDisplayImage, title: `${activeCert.qualification} (${activeSide === 'depan' ? 'Halaman Depan' : 'Daftar Unit'})` })}
              >
                <Image
                  src={currentDisplayImage}
                  alt={activeCert.titleId}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-contain object-center"
                  priority
                />

                {/* Subtle Hover Inspection Badge */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-600 text-white font-mono text-xs font-bold shadow-lg">
                    <ZoomIn className="w-4 h-4" />
                    <span>Perbesar Dokumen</span>
                  </span>
                </div>

                {/* Bottom Barcode / Watermark Indicator */}
                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between pointer-events-none">
                  <span className="text-[9px] font-mono bg-black/75 text-orange-400 px-2 py-0.5 rounded backdrop-blur-md">
                    BARCODE: {activeCert.barcodeNumber}
                  </span>
                  <span className="text-[9px] font-mono bg-black/75 text-emerald-400 px-2 py-0.5 rounded backdrop-blur-md">
                    RESMI BNSP
                  </span>
                </div>
              </div>

              {/* Inspection CTA under visual */}
              <button
                onClick={() => setLightboxImage({ src: currentDisplayImage, title: `${activeCert.qualification} (${activeSide === 'depan' ? 'Halaman Depan' : 'Daftar Unit'})` })}
                className="mt-4 text-xs font-mono text-gray-400 hover:text-orange-400 transition-colors flex items-center gap-1.5"
              >
                <ZoomIn className="w-3.5 h-3.5" />
                <span>Klik untuk membaca sertifikat dalam resolusi penuh</span>
              </button>
            </div>

            {/* Right Column: Credential Dossier & Certified Unit(s) (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              
              <div>
                {/* Official Accreditation Seal Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10 mb-6">
                  <div className="flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                    <span className="font-mono text-xs text-emerald-400 font-bold uppercase tracking-wider">
                      {activeCert.statusText}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-gray-400">
                    Masa Berlaku: <strong className="text-white">{activeCert.validity}</strong>
                  </span>
                </div>

                {/* Certificate Title */}
                <h3 className="text-2xl sm:text-3xl font-black font-techno text-white mb-2 leading-tight">
                  {activeCert.titleId}
                </h3>
                <p className="text-xs sm:text-sm font-mono text-orange-400 mb-4">
                  {activeCert.titleEn}
                </p>

                {/* Summary */}
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans mb-6 text-justify">
                  {activeCert.summary}
                </p>

                {/* Metadata Strip Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-xs font-mono">
                  <div className="flex items-start gap-2.5">
                    <Hash className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-gray-500 block text-[10px] uppercase">No. Sertifikat:</span>
                      <span className="text-gray-200 font-semibold">{activeCert.certNumber}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Hash className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-gray-500 block text-[10px] uppercase">No. Registrasi TIK:</span>
                      <span className="text-gray-200 font-semibold">{activeCert.regNumber}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 sm:col-span-2">
                    <Building className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-gray-500 block text-[10px] uppercase">Lembaga Sertifikasi Profesi (LSP):</span>
                      <span className="text-gray-200">{activeCert.issuerLsp}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Calendar className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-gray-500 block text-[10px] uppercase">Tanggal Terbit:</span>
                      <span className="text-gray-200">{activeCert.issueDate}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Award className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-gray-500 block text-[10px] uppercase">Otoritas Pengesahan:</span>
                      <span className="text-gray-200">BNSP Indonesia</span>
                    </div>
                  </div>
                </div>

                {/* Certified Units List (Daftar Unit Kompetensi SKKNI) */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-techno font-bold text-white tracking-wider uppercase">
                      Daftar Unit Kompetensi Terverifikasi ({activeCert.competencyUnits.length} Unit)
                    </span>
                    <span className="text-[10px] font-mono text-orange-400">
                      Standar SKKNI
                    </span>
                  </div>

                  <div className="max-h-[260px] overflow-y-auto space-y-2 pr-2 no-scrollbar">
                    {activeCert.competencyUnits.map((unit, uIdx) => (
                      <div
                        key={uIdx}
                        className="p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.06] transition-colors flex items-start gap-3"
                      >
                        <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center justify-between gap-1 mb-0.5">
                            <span className="font-mono text-xs font-bold text-gray-200">
                              {unit.titleId}
                            </span>
                            <span className="text-[10px] font-mono text-gray-500 bg-black/40 px-2 py-0.5 rounded border border-white/[0.06]">
                              {unit.code}
                            </span>
                          </div>
                          <span className="text-[11px] font-mono text-gray-400 block italic">
                            {unit.titleEn}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Lightbox Fullscreen Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center p-4 sm:p-6"
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="w-full flex items-center justify-between pb-3 mb-2 border-b border-white/10 text-white">
              <span className="font-techno font-bold text-xs sm:text-sm text-orange-400">
                {lightboxImage.title}
              </span>
              <button
                onClick={() => setLightboxImage(null)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors focus:outline-none"
                aria-label="Tutup"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image */}
            <div className="relative w-full aspect-[1/1.414] max-h-[80vh] rounded-2xl overflow-hidden bg-white shadow-2xl">
              <Image
                src={lightboxImage.src}
                alt={lightboxImage.title}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

