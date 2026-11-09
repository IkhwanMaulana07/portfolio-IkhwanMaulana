'use client';

import React, { useEffect, useState, useRef } from 'react';

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  sequential?: boolean;
  revealDirection?: 'start' | 'end' | 'center';
  useOriginalCharsOnly?: boolean;
  characters?: string;
  className?: string;
  encryptedClassName?: string;
  parentClassName?: string;
  animateOn?: 'view' | 'hover';
}

export default function DecryptedText({
  text,
  speed = 50,
  maxIterations = 10,
  sequential = true,
  revealDirection = 'start',
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+',
  className = '',
  encryptedClassName = 'text-orange-400/80 font-mono',
  parentClassName = '',
  animateOn = 'view',
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const [isScrambling, setIsScrambling] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | number | undefined;
    let currentIteration = 0;

    const startScramble = () => {
      setIsScrambling(true);
      interval = setInterval(() => {
        setDisplayText(() => {
          return text
            .split('')
            .map((char, index) => {
              if (char === ' ') return ' ';
              if (sequential) {
                if (index < currentIteration) {
                  return char;
                }
              }
              const randomChar = characters[Math.floor(Math.random() * characters.length)];
              return randomChar;
            })
            .join('');
        });

        currentIteration++;
        if (currentIteration > text.length + maxIterations) {
          clearInterval(interval);
          setDisplayText(text);
          setIsScrambling(false);
        }
      }, speed);
    };

    if (animateOn === 'view') {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            startScramble();
            observer.disconnect();
          }
        },
        { threshold: 0.2 }
      );
      if (containerRef.current) observer.observe(containerRef.current);
      return () => observer.disconnect();
    } else if (animateOn === 'hover' && isHovering && !isScrambling) {
      startScramble();
    }

    return () => clearInterval(interval);
  }, [text, speed, maxIterations, sequential, characters, animateOn, isHovering]);

  return (
    <span
      ref={containerRef}
      className={`inline-block ${parentClassName}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <span className={isScrambling ? encryptedClassName : className}>
        {displayText}
      </span>
    </span>
  );
}

