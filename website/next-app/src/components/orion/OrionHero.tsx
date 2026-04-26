'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import styles from './OrionHero.module.css';

const FAN_CARDS = [
  { id: 'prog', label: 'PROGRAMME', type: 'image', src: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=600&auto=format&fit=crop', rot: -30, x: -300, y: 80, z: 1 },
  { id: 'moni', label: 'MONITORING', type: 'video', src: '/reels/Alex_sprinting_towards_202604210947.mp4', rot: -15, x: -150, y: 30, z: 2 },
  { id: 'coach', label: 'COACHING', type: 'video', src: '/reels/Chalked_hands_gripping_202604210949.mp4', rot: 0, x: 0, y: 0, z: 3 },
  { id: 'nutri', label: 'NUTRITION', type: 'video', src: '/reels/Meal_prep_ingredients_202604210948.mp4', rot: 15, x: 150, y: 30, z: 2 },
  { id: 'app', label: 'APPLICATION', type: 'image', src: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?q=80&w=600&auto=format&fit=crop', rot: 30, x: 300, y: 80, z: 1 },
];

const AVATARS = [
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&q=80&auto=format&fit=crop',
];

export default function OrionHero() {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return;
    const cards = cardsRef.current.filter(Boolean);
    if (cards.length === 0) return;

    let playAnimation: () => void;

    let ctx = gsap.context(() => {
      const isMobile = window.innerWidth <= 768;
      const isTablet = window.innerWidth <= 1024;
      
      const getX = (val: number) => {
        if (isMobile) return val * 0.6;
        if (isTablet) return val * 0.8;
        return val;
      };

      const getY = (val: number) => {
        if (isMobile) return val * 0.6;
        if (isTablet) return val * 0.8;
        return val;
      };

      // Set perspective for 3D flipping and hide cards while waiting for loader
      gsap.set(cards, { transformPerspective: 1000, opacity: 0 });

      playAnimation = () => {
        // Entrance Animation: Flipping in from bottom center
        gsap.fromTo(
          cards,
          { 
            x: 0,
            y: 400,
            z: -200,
            rotationY: -180, // Flipped backwards
            rotationZ: 0,
            opacity: 0, 
            scale: 0.5 
          },
          {
            x: (index) => getX(FAN_CARDS[index].x),
            y: (index) => getY(FAN_CARDS[index].y),
            z: 0,
            rotationY: 0, // Flip forward
            rotationZ: (index) => FAN_CARDS[index].rot,
            opacity: 1,
            scale: 1,
            duration: 1.5,
            stagger: {
              each: 0.15,
              from: "start" // Enter one after the other
            },
            ease: 'power3.out',
            onComplete: () => {
              // Attach GSAP hover events after entrance to prevent conflicts
              cards.forEach((card, index) => {
                const data = FAN_CARDS[index];
                const targetX = getX(data.x);
                const targetY = getY(data.y);
                
                card.addEventListener('mouseenter', () => {
                  gsap.to(card, {
                    y: targetY - 40,
                    rotationZ: data.rot, // Maintain fanned angle on hover
                    scale: 1.08,
                    zIndex: 20,
                    duration: 0.4,
                    ease: 'back.out(1.5)',
                    boxShadow: '0 30px 60px -15px rgba(192, 113, 51, 0.3)',
                    borderColor: 'rgba(192, 113, 51, 0.4)'
                  });
                });

                card.addEventListener('mouseleave', () => {
                  gsap.to(card, {
                    y: targetY,
                    rotationZ: data.rot,
                    scale: 1,
                    zIndex: data.z,
                    duration: 0.4,
                    ease: 'power2.out',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                    borderColor: 'rgba(255, 255, 255, 0.08)'
                  });
                });
              });
            }
          }
        );
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
          90 DAYS TRANSFORMATION
        </div>
        
        <h1 className={styles.title}>
          ORION <em style={{ color: 'var(--orion-accent)', fontStyle: 'italic', WebkitTextFillColor: 'initial' }}>GYM & MAISON</em>
        </h1>
        
        <p className={styles.subtitle}>
          Le programme de transformation ultime sur 90 jours avec la liberté de basculer entre les séances en salle de sport et à la maison.
        </p>
      </div>

      {/* Fan Layout */}
      <div className={styles.fanContainer}>
        {FAN_CARDS.map((card, index) => (
          <div
            key={card.id}
            ref={(el) => {
              cardsRef.current[index] = el;
            }}
            className={styles.fanCard}
            style={{
              zIndex: card.z,
            } as React.CSSProperties}
          >
            <div className={styles.cardMediaContainer}>
              {card.type === 'video' ? (
                <video src={card.src} className={styles.cardMedia} autoPlay muted loop playsInline />
              ) : (
                <img src={card.src} alt={card.label} className={styles.cardMedia} />
              )}
            </div>
            <div className={styles.cardLabel}>{card.label}</div>
          </div>
        ))}
      </div>

      {/* Center Play Button */}
      <div className={styles.playSection}>
        <button className={styles.playButton} aria-label="Play Trailer">
          <svg className={styles.playIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
          <span className={styles.playText}>PLAY</span>
        </button>
      </div>

      {/* Community & Action */}
      <div className={styles.communitySection}>
        <h3 className={styles.communityTitle}>Une Communauté Qui Pousse</h3>
        <p className={styles.communitySubtitle}>Vous êtes jamais dans ce chemin seul.</p>
        
        <div className={styles.avatarsRow}>
          {AVATARS.map((src, i) => (
            <img key={i} src={src} alt="Community Member" className={styles.avatar} style={{ zIndex: AVATARS.length - i }} />
          ))}
          <div className={styles.avatarCount}>+225</div>
        </div>
      </div>

      <div className={styles.actionSection}>
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
