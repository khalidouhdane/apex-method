'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins once on the client
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * GSAPProvider
 * Wraps the app content and handles global GSAP setup + cleanup.
 * Place once in the root layout.
 */
export default function GSAPProvider({ children }: { children: ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Refresh ScrollTrigger after all components have rendered
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      clearTimeout(timer);
      // Kill all ScrollTriggers on unmount to prevent memory leaks
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return <div ref={wrapperRef}>{children}</div>;
}

/**
 * Shared reveal utility — use inside component useEffect hooks
 * Replicates the legacy APEX.reveal() function
 */
export function createReveal(
  elements: string | Element | Element[],
  options: {
    trigger?: string | Element;
    stagger?: number;
    fromY?: number;
    delay?: number;
    duration?: number;
  } = {}
) {
  const targets = typeof elements === 'string'
    ? gsap.utils.toArray(elements)
    : Array.isArray(elements) ? elements : [elements];

  if (!targets.length) return null;

  return gsap.fromTo(
    targets,
    { y: options.fromY ?? 50, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: options.duration ?? 1,
      stagger: options.stagger ?? 0,
      delay: options.delay ?? 0,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: (options.trigger as Element) ?? (targets[0] as Element),
        start: 'top 85%',
        once: true,
      },
    }
  );
}
