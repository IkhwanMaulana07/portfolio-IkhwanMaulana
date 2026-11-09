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
      y: 90,
      opacity: 0,
      scale: 1.15,
      filter: 'blur(10px)',
      letterSpacing: '-0.02em',
    });
    gsap.set('.title-mask', { scaleX: 0, transformOrigin: 'left center' });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 78%',
          toggleActions: 'play none none reverse',
        },
      });

      tl.to('.title-mask', { scaleX: 1, duration: 0.8, ease: 'power4.out' })
        .to(letters, {
          y: 0,
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          ease: 'expo.out',
          duration: 1.4,
          stagger: {
            each: 0.04,
            from: 'center',
          },
        }, '-=0.35');
    }, containerRef);

    return () => ctx.revert();
  }, [words]);

  return (
    <section
      ref={containerRef}
      className={`w-full py-10 sm:py-16 md:py-20 flex justify-center items-center select-none px-2 ${className}`}
    >
      <div className="relative overflow-visible text-center max-w-full">
        <h2
          ref={textRef}
          className="text-2xl sm:text-4xl md:text-6xl xl:text-7xl font-bold text-orange-400 tracking-tight leading-[1.2] text-center font-michroma break-words"
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
