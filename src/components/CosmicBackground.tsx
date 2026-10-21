'use client';

import React from 'react';

export default function CosmicBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* 1. Deep Obsidian Velvet Base */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-[#070709] via-[#0D0D12] to-[#070709]" 
      />

      {/* 2. Architectural Luxury Hairline Grid Pattern (Very subtle 2% opacity) */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
        }}
      />

      {/* 3. Subtle Warm Champagne & Antique Gold Ambient Spotlights */}
      {/* Top Hero Ambient Spotlight */}
      <div 
        className="luxury-ambient-light light-champagne w-[800px] h-[600px] -top-64 left-1/2 -translate-x-1/2 opacity-30" 
      />

      {/* Subtle Right Specular Aura */}
      <div 
        className="luxury-ambient-light light-gold w-[650px] h-[650px] top-1/3 -right-60 opacity-20" 
      />

      {/* Subtle Left Platinum Warm Wash */}
      <div 
        className="luxury-ambient-light light-champagne w-[700px] h-[700px] top-2/3 -left-64 opacity-20" 
      />

      {/* Vignette Edge Shading for Depth */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(7,7,9,0.7)_100%)]" 
      />
    </div>
  );
}
