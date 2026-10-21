'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  Sparkles, 
  ArrowUpRight, 
  Github, 
  ExternalLink, 
  ChevronRight, 
  Navigation,
  Layers,
  MapPin,
  FileText
} from 'lucide-react';
import { WorldZone, WORLD_ZONES } from './WorldData';
import { Project } from '../../types/portfolio';

interface BrunoHUDProps {
  currentSpeed: number;
  activeZone: WorldZone | null;
  projects: Project[];
  onSelectProject: (project: Project) => void;
  isMuted: boolean;
  onToggleMute: () => void;
  onSwitchToClassic: () => void;
}

export default function BrunoHUD({
  currentSpeed,
  activeZone,
  projects,
  onSelectProject,
  isMuted,
  onToggleMute,
  onSwitchToClassic
}: BrunoHUDProps) {
  const [showHelp, setShowHelp] = useState<boolean>(true);

  // Find project if current active zone is a project
  const currentProject = activeZone?.projectId 
    ? projects.find((p) => p.id === activeZone.projectId) 
    : null;

  const handleResetCar = () => {
    const fn = (window as unknown as { brunoResetCar?: () => void }).brunoResetCar;
    if (fn) fn();
  };

  const handleHonk = () => {
    const fn = (window as unknown as { brunoHonk?: () => void }).brunoHonk;
    if (fn) fn();
  };

  const handleDriveTo = (x: number, z: number) => {
    const fn = (window as unknown as { brunoDriveTo?: (x: number, z: number) => void }).brunoDriveTo;
    if (fn) fn(x, z);
    setShowHelp(false);
  };

  // Find next project zone in sequence
  const projectZones = WORLD_ZONES.filter((z) => z.type === 'project');
  const currentProjIdx = projectZones.findIndex((z) => z.id === activeZone?.id);
  const nextProjZone = projectZones[(currentProjIdx + 1) % projectZones.length];

  return (
    <div className="pointer-events-none fixed inset-0 z-40 flex flex-col justify-between p-3 sm:p-6 overflow-hidden">
      
      {/* 1. TOP TELEMETRY BAR */}
      <div className="flex items-center justify-between gap-3 w-full">
        
        {/* Brand Plaque & Speedometer */}
        <div className="pointer-events-auto flex items-center gap-2 sm:gap-3 bg-[#0B0D14]/90 backdrop-blur-xl border border-amber-200/25 rounded-2xl px-3.5 py-2 shadow-2xl">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#1C1F2E] to-[#0A0B10] border border-amber-200/30 flex items-center justify-center font-bold text-xs text-[#E5C378]">
            IM
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-extrabold text-xs sm:text-sm text-white tracking-tight">
              IKHWAN MAULANA
            </span>
            <span className="text-[9px] font-mono tracking-widest text-[#E5C378]/90 uppercase">
              3D PLAYGROUND
            </span>
          </div>

          <div className="h-6 w-[1px] bg-white/10 mx-1 hidden sm:block" />

          {/* Real-time Velocity Gauge */}
          <div className="flex items-center gap-1.5 font-mono text-xs">
            <span className="text-zinc-500 text-[10px]">SPEED:</span>
            <span className="text-[#E5C378] font-bold text-sm w-10 text-right">
              {currentSpeed}
            </span>
            <span className="text-[9px] text-zinc-500">KM/H</span>
          </div>
        </div>

        {/* Action Controls: Horn, Reset, Audio, Switch to Dossier */}
        <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2">
          {/* Honk Horn Button */}
          <button
            onClick={handleHonk}
            className="px-3 py-2 rounded-xl bg-[#0B0D14]/90 hover:bg-amber-400/20 border border-amber-200/25 text-[#E5C378] text-xs font-mono font-bold flex items-center gap-1.5 backdrop-blur-xl transition-all shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            title="Klakson Mobil (Tombol H)"
            aria-label="Klakson Mobil"
          >
            <span>📢 HORN</span>
          </button>

          {/* Reset / Flip Car Button */}
          <button
            onClick={handleResetCar}
            className="p-2 sm:px-3 sm:py-2 rounded-xl bg-[#0B0D14]/90 hover:bg-white/[0.08] border border-white/15 text-zinc-300 hover:text-white text-xs font-mono flex items-center gap-1.5 backdrop-blur-xl transition-all shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            title="Reset / Balikkan Posisi Mobil (Tombol R)"
            aria-label="Reset Mobil"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">RESET</span>
          </button>

          {/* Audio Toggle */}
          <button
            onClick={onToggleMute}
            className={`p-2 sm:px-3 sm:py-2 rounded-xl border text-xs font-mono flex items-center gap-1.5 backdrop-blur-xl transition-all shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
              !isMuted
                ? 'bg-amber-400/20 border-amber-300/40 text-amber-200 shadow-[0_0_15px_rgba(229,195,120,0.2)]'
                : 'bg-[#0B0D14]/90 border-white/15 text-zinc-400 hover:text-white'
            }`}
            title={!isMuted ? 'Mute Suara Mesin' : 'Nyalakan Suara Mesin'}
            aria-label={!isMuted ? 'Mute Suara' : 'Nyalakan Suara'}
          >
            {!isMuted ? <Volume2 className="w-3.5 h-3.5 text-amber-300" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{!isMuted ? 'AUDIO ON' : 'MUTED'}</span>
          </button>

          {/* Switch to Classic Dossier Portfolio */}
          <button
            onClick={onSwitchToClassic}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-400/20 to-amber-200/10 hover:from-amber-400/30 hover:to-amber-200/20 border border-amber-300/40 text-[#F7E7C4] text-xs font-mono font-bold flex items-center gap-1.5 backdrop-blur-xl transition-all shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            title="Beralih ke Tampilan Dokumen Portfolio Lengkap"
            aria-label="Tampilan Dokumen Klasik"
          >
            <FileText className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden md:inline">Tampilan Portfolio Lengkap</span>
          </button>
        </div>

      </div>

      {/* 2. CENTER / BOTTOM POPUP: ACTIVE ZONE DISCOVERY CARD */}
      <div className="w-full flex justify-center items-center pointer-events-none">
        {activeZone && (
          <div className="pointer-events-auto max-w-xl w-full mx-auto p-5 sm:p-6 rounded-3xl bg-[#0D0F18]/95 backdrop-blur-2xl border border-amber-200/35 shadow-[0_25px_60px_rgba(0,0,0,0.9)] animate-in fade-in zoom-in-95 duration-200">
            
            <div className="flex items-center justify-between gap-3 mb-2">
              <div className="flex items-center gap-2">
                <span 
                  className="w-2.5 h-2.5 rounded-full animate-ping"
                  style={{ backgroundColor: activeZone.color }}
                />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#E5C378]">
                  {activeZone.type.toUpperCase()} ZONE REACHED
                </span>
              </div>

              {nextProjZone && (
                <button
                  onClick={() => handleDriveTo(nextProjZone.position[0], nextProjZone.position[2])}
                  className="px-3 py-1 rounded-xl bg-amber-400/15 hover:bg-amber-400/25 border border-amber-300/40 text-amber-200 text-xs font-mono font-semibold flex items-center gap-1 transition-all"
                  title="Arahkan mobil ke project berikutnya dengan kursor"
                >
                  <span>Project Berikutnya</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-white font-heading mb-1.5">
              {activeZone.title}
            </h3>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-4">
              {activeZone.subtitle}
            </p>

            {/* If Project: Display Detailed Specs & Buttons */}
            {currentProject && (
              <div className="flex flex-col gap-4 pt-3 border-t border-white/[0.08]">
                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5">
                  {currentProject.stack.slice(0, 5).map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-white/[0.05] border border-amber-200/15 text-zinc-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onSelectProject(currentProject)}
                    className="btn-luxury-primary text-xs py-2.5 px-4 flex-1 justify-center"
                    aria-label={`Buka Case Study ${currentProject.title}`}
                  >
                    <span>Buka Case Study Lengkap</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={currentProject.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 text-zinc-300 hover:text-white transition-all"
                    title="GitHub Repository"
                  >
                    <Github className="w-4 h-4" />
                  </a>

                  {currentProject.demo && currentProject.demo !== '#' && (
                    <a
                      href={currentProject.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 rounded-xl bg-amber-400/15 hover:bg-amber-400/25 border border-amber-300/40 text-[#E5C378] hover:text-white transition-all"
                      title="Live Demo"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* If Skills Zone: Prompt to smash bricks */}
            {activeZone.type === 'skills' && (
              <div className="p-3 rounded-2xl bg-cyan-950/40 border border-cyan-400/30 text-cyan-200 text-xs font-mono flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-300 flex-shrink-0" />
                <span>Tekan pedal gas dan tabrak tumpukan balok 3D untuk melihat efek simulasi fisika Cannon.js!</span>
              </div>
            )}

          </div>
        )}
      </div>

      {/* 3. BOTTOM BAR: INSTRUCTIONS & QUICK WAYPOINT DOCK */}
      <div className="flex flex-col gap-3 w-full">
        
        {/* Help Bubble */}
        {showHelp && (
          <div className="pointer-events-auto self-center px-4 py-2 rounded-2xl bg-[#0B0D14]/90 backdrop-blur-md border border-amber-200/25 text-center shadow-xl text-xs font-mono text-zinc-300 max-w-md w-full">
            <span className="text-[#E5C378] font-bold">KONTROL 3D:</span> Gunakan <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-amber-300 border border-zinc-700">W A S D</kbd> / <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-amber-300 border border-zinc-700">Panah Keyboard</kbd> untuk mengemudi, atau <strong>klik lantai di mana saja dengan kursor</strong> untuk navigasi otomatis!
          </div>
        )}

        {/* Quick Waypoint Navigation Dock (Click with cursor to autopilot) */}
        <div className="pointer-events-auto w-full max-w-3xl mx-auto p-2 sm:p-2.5 rounded-2xl bg-[#090B12]/95 backdrop-blur-xl border border-amber-200/25 shadow-2xl flex items-center justify-between gap-2 overflow-x-auto">
          <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 whitespace-nowrap pl-2">
            <Navigation className="w-3.5 h-3.5 text-[#E5C378]" />
            <span className="hidden sm:inline">AUTOPILOT:</span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
            {WORLD_ZONES.map((zone) => {
              const isSelected = activeZone?.id === zone.id;
              return (
                <button
                  key={zone.id}
                  onClick={() => handleDriveTo(zone.position[0], zone.position[2])}
                  className={`px-3 py-1.5 rounded-xl font-mono text-xs whitespace-nowrap transition-all flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                    isSelected
                      ? 'bg-amber-400/25 text-[#F7E7C4] border border-amber-300/50 shadow-[0_0_12px_rgba(229,195,120,0.3)] font-bold'
                      : 'bg-white/[0.04] text-zinc-300 hover:text-white hover:bg-white/[0.08] border border-white/[0.06]'
                  }`}
                  title={`Arahkan mobil ke ${zone.title} dengan kursor`}
                  aria-label={`Arahkan mobil ke ${zone.title}`}
                >
                  <span 
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: zone.color }}
                  />
                  <span>{zone.title.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}
