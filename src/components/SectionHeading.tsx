'use client';

import React, { useRef, useLayoutEffect, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface SectionHeadingProps {
  title: string;
  className?: string;
}

export default function SectionHeading({
  title,
  className = '',
}: SectionHeadingProps) {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const words = useMemo(() => title.split(' '), [title]);

  useLayoutEffect(() => {
    if (!textRef.current || !containerRef.current) return;

    const letters = textRef.current.querySelectorAll('.letter');
    if (!letters.length) return;

    // Set animated initial state
    gsap.set(letters, {
      y: 70,
      opacity: 0,
      scale: 1.1,
      filter: 'blur(8px)',
    });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          once: true,
        },
      });

      tl.to(letters, {
        y: 0,
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        ease: 'expo.out',
        duration: 1.2,
        stagger: {
          each: 0.03,
          from: 'center',
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [words]);

  return (
    <section
      ref={containerRef}
      className={`w-full py-16 md:py-20 flex justify-center items-center select-none ${className}`}
    >
      <div className="relative overflow-visible text-center">
        <h2
          ref={textRef}
          className="text-4xl md:text-6xl xl:text-7xl font-bold text-orange-400 tracking-tight leading-[1.15] text-center font-michroma"
        >
          {words.map((word, wIdx) => (
            <span key={wIdx} className="word">
              {word.split('').map((char, cIdx) => (
                <span key={cIdx} className="letter-wrapper">
                  <span className="letter inline-block">
                    {char}
                  </span>
                </span>
              ))}
            </span>
          ))}
        </h2>
      </div>
    </section>
  );
}
