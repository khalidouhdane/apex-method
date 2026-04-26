'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import styles from './OrionHero.module.css';
import ApexAnatomyFront from './ApexAnatomyFront';
import ApexAnatomyBack from './ApexAnatomyBack';
import ScratchAnatomy from './ScratchAnatomy';

const AVATARS = [
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&q=80&auto=format&fit=crop',
];

export default function OrionHero2() {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  
  // Tester states to find the indices
  const [hoveredFrontIndex, setHoveredFrontIndex] = useState<number | null>(null);
  const [hoveredBackIndex, setHoveredBackIndex] = useState<number | null>(null);
  const [lockedFrontMuscles, setLockedFrontMuscles] = useState<number[]>([]);
  const [lockedBackMuscles, setLockedBackMuscles] = useState<number[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return;
    const cards = cardsRef.current.filter(Boolean);
    if (cards.length === 0) return;

    let playAnimation: () => void;

    let ctx = gsap.context(() => {
      // Set initial states
      gsap.set(cards, { y: 100, opacity: 0 });

      playAnimation = () => {
        gsap.to(cards, {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
        });
      };

      if ((window as any).isLoaderDone) {
        playAnimation();
      } else {
        window.addEventListener('loaderComplete', playAnimation);
      }
    }, containerRef);

    return () => {
      if (playAnimation) {
        window.removeEventListener('loaderComplete', playAnimation);
      }
      ctx.revert();
    };
  }, []);

  return (
    <section ref={containerRef} className={styles.heroContainer}>
      <div className={styles.ambientGlow} />

      {/* Header */}
      <div className={styles.headerSection}>
        <div className="text-pill" style={{ marginBottom: '1.5rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <span className="pill-dot" style={{ background: 'var(--orion-accent)' }} />
          FROM SCRATCH SVG
        </div>
        
        <h1 className={styles.title} style={{ fontSize: '3rem' }}>
          CODED <em style={{ color: 'var(--orion-accent)', fontStyle: 'italic', WebkitTextFillColor: 'initial' }}>BLIND</em>
        </h1>
        
        <p className={styles.subtitle}>
          Here is a 100% custom SVG drawn mathematically from scratch. No illustrator files used.
        </p>
      </div>

      {/* Body Map Layout */}
      <div className={styles.bodyMapContainer} style={{ display: 'flex', justifyContent: 'center', gap: '32px', marginBottom: '80px', flexWrap: 'wrap', position: 'relative', zIndex: 10 }}>
        
        <div ref={(el) => { cardsRef.current[0] = el; }} style={{ width: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ marginBottom: '1rem', color: '#fff', fontSize: '14px', letterSpacing: '2px' }}>
            FULL BODY (HOVER ME)
          </div>
          <ScratchAnatomy focus="full" />
        </div>
        
        <div ref={(el) => { cardsRef.current[1] = el; }} style={{ width: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ marginBottom: '1rem', color: '#fff', fontSize: '14px', letterSpacing: '2px' }}>
            UPPER CROP (1:1 RATIO)
          </div>
          <ScratchAnatomy focus="upper" activeMuscles={['chest', 'shoulders']} />
        </div>

        <div ref={(el) => { cardsRef.current[2] = el; }} style={{ width: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ marginBottom: '1rem', color: '#fff', fontSize: '14px', letterSpacing: '2px' }}>
            LOWER CROP (1:1 RATIO)
          </div>
          <ScratchAnatomy focus="lower" activeMuscles={['quads', 'calves']} />
        </div>

      </div>

      <div className={styles.actionSection} style={{ paddingBottom: '100px' }}>
        <Link href="#pricing" className="btn btn-outline-bronze btn-large" style={{ borderRadius: '30px', padding: '0 32px' }}>
          Devenir Un Orionist
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '8px' }}>
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </Link>
      </div>
    </section>
  );
}
