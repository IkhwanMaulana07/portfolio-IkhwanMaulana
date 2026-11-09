'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, Award, CheckCircle2, Maximize2 } from 'lucide-react';
import SectionHeading from './SectionHeading';

interface CertData {
  id: string;
  title: string;
  regNumber: string;
  certNumber: string;
  lsp: string;
  frontImage: string;
  backImage: string;
  date: string;
  competencies: string[];
}

export default function Certificates() {
  const [activeSides, setActiveSides] = useState<Record<string, 'front' | 'back'>>({
    programmer: 'front',
    jaringan: 'front',
  });
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const certificates: CertData[] = [
    {
      id: 'programmer',
      title: 'BNSP Programmer (Software Programming)',
      regNumber: 'No. Reg. TIK 1735 00130 2024',
      certNumber: 'No. Sertifikat: 62019 2514 3 0000130 2024',
      lsp: 'LSP Teknologi Digital / BNSP Republik Indonesia',
      frontImage: '/certificates/bnsp_programmer_depan.png',
      backImage: '/certificates/bnsp_programmer_belakang.png',
      date: '2024 - 2027',
      competencies: [
        'Mengimplementasikan Algoritma Pemrograman',
        'Membuat Struktur Data & Dokumentasi Kode',
        'Menggunakan Library / Framework Pemrograman',
        'Mengimplementasikan Pemrograman Berorientasi Objek',
        'Melakukan Debugging & Code Review',
      ],
    },
    {
      id: 'jaringan',
      title: 'BNSP Teknisi Jaringan (Computer & Network)',
      regNumber: 'No. Reg. TIK. 194. 00329 2022',
      certNumber: 'No. Sertifikat: 62090 3513 2 0002879 2022',
      lsp: 'LSP SMKN 2 Cikarang Barat / BNSP Republik Indonesia',
      frontImage: '/certificates/bnsp_teknisi_jaringan_depan.png',
      backImage: '/certificates/bnsp_teknisi_jaringan_belakang.png',
      date: '2022 - 2025',
      competencies: [
        'Merancang Topologi Jaringan Komputer',
        'Memasang & Mengonfigurasi Perangkat Jaringan (Router/Switch)',
        'Mengonfigurasi Routing & Subnetting IPv4/IPv6',
        'Melakukan Monitoring & Keamanan Jaringan',
        'Troubleshooting Gangguan Konektivitas & Sistem',
      ],
    },
  ];

  const toggleSide = (id: string) => {
    setActiveSides((prev) => ({
      ...prev,
      [id]: prev[id] === 'front' ? 'back' : 'front',
    }));
  };

  return (
    <section id="certificates" className="relative overflow-hidden w-full px-6 md:px-16 py-24 text-white select-none">
      <SectionHeading title="NATIONAL CERTIFICATIONS" className="text-orange-400" />

      {/* Ambient Glow */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-orange-500/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto mt-14">
        {certificates.map((cert) => {
          const currentSide = activeSides[cert.id];
          const currentImg = currentSide === 'front' ? cert.frontImage : cert.backImage;

          return (
            <div
              key={cert.id}
              className="cert-card group relative rounded-3xl overflow-hidden bg-black/40 backdrop-blur-xl border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.4)] hover:shadow-[0_20px_50px_rgba(255,120,50,0.25)] hover:border-orange-500/40 transition-all duration-500 flex flex-col justify-between"
            >
              {/* Top certificate visual */}
              <div className="relative w-full h-64 sm:h-72 overflow-hidden bg-[#0c0c12]">
                <Image
                  src={currentImg}
                  alt={cert.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />

                {/* Side switcher overlay */}
                <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
                  <button
                    onClick={() => toggleSide(cert.id)}
                    className="px-3 py-1.5 rounded-full text-[10px] font-mono tracking-wider bg-black/80 border border-orange-500/40 text-orange-400 hover:bg-orange-500 hover:text-white transition-all backdrop-blur-md"
                  >
                    TAMPILKAN {currentSide === 'front' ? 'BELAKANG' : 'DEPAN'}
                  </button>
                  <button
                    onClick={() => setLightboxImage(currentImg)}
                    className="p-1.5 rounded-full bg-black/80 border border-white/20 text-gray-300 hover:text-white hover:border-orange-500 transition-all backdrop-blur-md"
                    aria-label="Enlarge certificate"
                  >
                    <Maximize2 size={14} />
                  </button>
                </div>

                <div className="absolute bottom-4 left-4 z-20">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono bg-black/80 border border-green-500/40 text-green-400 backdrop-blur-md">
                    <CheckCircle2 size={12} />
                    BNSP TERVERIFIKASI
                  </span>
                </div>
              </div>

              {/* Certificate Details */}
              <div className="p-6 md:p-8 flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex items-center gap-2 text-orange-400 text-xs font-mono mb-2">
                    <Award size={16} />
                    <span>{cert.lsp}</span>
                  </div>

                  <h3 className="text-xl font-bold font-techno text-white group-hover:text-orange-400 transition-colors">
                    {cert.title}
                  </h3>

                  <div className="mt-3 text-xs font-mono text-gray-400 space-y-1">
                    <p>{cert.certNumber}</p>
                    <p>{cert.regNumber}</p>
                    <p className="text-orange-500/90">Masa Berlaku: {cert.date}</p>
                  </div>

                  {/* Competencies */}
                  <div className="mt-5 pt-4 border-t border-white/[0.08]">
                    <p className="text-[11px] font-mono uppercase tracking-wider text-gray-400 mb-2">
                      Unit Kompetensi Utama:
                    </p>
                    <ul className="space-y-1.5">
                      {cert.competencies.map((c, cIdx) => (
                        <li key={cIdx} className="text-xs text-gray-300 flex items-start gap-2">
                          <span className="text-orange-500 mt-0.5">•</span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.08]">
                  <button
                    onClick={() => setLightboxImage(currentImg)}
                    className="w-full py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-orange-500 hover:border-orange-500 hover:text-white text-xs font-mono font-semibold tracking-wider transition-all duration-300"
                  >
                    LIHAT SERTIFIKAT LENGKAP
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-[99999] p-4"
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] w-full h-[80vh] rounded-2xl overflow-hidden border border-orange-500/30"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightboxImage}
              alt="BNSP Certificate"
              fill
              className="object-contain"
            />
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/70 hover:bg-orange-500 text-white flex items-center justify-center transition-all duration-300 border border-white/20"
              aria-label="Close lightbox"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

