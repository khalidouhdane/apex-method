'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

interface SplitTextRevealProps {
  children: React.ReactNode;
  as?: React.ElementType;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  triggerStart?: string;
  staggerAmount?: number;
  /**
   * 'chars' = character-level stagger (default, most cinematic)
   * 'words' = word-level stagger
   */
  splitType?: 'chars' | 'words';
}

export default function SplitTextReveal({
  children,
  as: Component = 'div',
  className = '',
  style,
  delay = 0,
  triggerStart = 'top 85%',
  staggerAmount = 0.03,
  splitType = 'chars',
}: SplitTextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger, SplitText);

    const ctx = gsap.context(() => {
      const el = containerRef.current!;

      // Detect if element uses CSS gradient text (background-clip: text)
      const computedStyle = window.getComputedStyle(el);
      const hasGradientText =
        computedStyle.webkitTextFillColor === 'transparent' ||
        computedStyle.backgroundClip === 'text' ||
        (computedStyle as any).webkitBackgroundClip === 'text';

      // REVERT PATTERN: temporarily override gradient to solid color before splitting
      if (hasGradientText) {
        el.style.background = 'none';
        el.style.webkitBackgroundClip = 'initial';
        el.style.webkitTextFillColor = 'initial';
        el.style.color = '#D18957';
      }

      const split = new SplitText(el, {
        type: 'lines,words,chars',
        linesClass: 'split-line',
      });

      // Prevent italic edge clipping on all wrappers
      split.chars.forEach((c) => {
        (c as HTMLElement).style.overflow = 'visible';
      });
      split.lines.forEach((line) => {
        (line as HTMLElement).style.overflow = 'visible';
      });
      split.words.forEach((w) => {
        (w as HTMLElement).style.overflow = 'visible';
      });

      const targets = splitType === 'chars' ? split.chars : split.words;

      gsap.fromTo(
        targets,
        { yPercent: 100, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          stagger: staggerAmount,
          delay,
          scrollTrigger: {
            trigger: el,
            start: triggerStart,
            once: true,
          },
          onComplete: () => {
            // Revert SplitText → restores original DOM (single text node)
            split.revert();
            // Clear inline overrides so CSS gradient renders again
            if (hasGradientText) {
              el.style.background = '';
              el.style.webkitBackgroundClip = '';
              el.style.webkitTextFillColor = '';
              el.style.color = '';
            }
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [delay, triggerStart, staggerAmount, splitType]);

  return (
    <Component ref={containerRef} className={className} style={style}>
      {children}
    </Component>
  );
}
