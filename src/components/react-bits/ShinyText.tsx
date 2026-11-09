'use client';

import React from 'react';

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

export default function ShinyText({
  text,
  disabled = false,
  speed = 4,
  className = '',
}: ShinyTextProps) {
  const animationDuration = `${speed}s`;

  return (
    <span
      className={`inline-block bg-clip-text text-transparent ${
        disabled
          ? 'text-neutral-200'
          : 'bg-gradient-to-r from-neutral-200 via-orange-400 to-neutral-200 bg-[length:200%_100%] animate-shiny-text'
      } ${className}`}
      style={{
        animationDuration,
      }}
    >
      {text}
    </span>
  );
}

