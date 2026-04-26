'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './AppPreview.module.css';

const FEATURES = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
    title: 'PROGRAMMES',
    desc: 'Tous tes entraînements structurés, accessibles en un seul endroit.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
    title: 'NUTRITION IA',
    desc: 'Calcul métabolique, plan alimentaire et analyse de tes repas par photo.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: 'SUIVI EN TEMPS RÉEL',
    desc: 'Graphiques de progression, historique et performances à portée de main.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: 'TIMER INTÉGRÉ',
    desc: 'AMRAP, EMOM, Tabata — tous les formats de chrono directement dans l\'app.',
    fullWidth: true,
  },
];

export default function AppPreview() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Text column reveal
      gsap.fromTo(
        '[data-app-text]',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );

      // Phone mockup reveal with rotation
      gsap.fromTo(
        '[data-app-phone]',
        { opacity: 0, y: 60, rotate: 18 },
        {
          opacity: 1,
          y: 0,
          rotate: 12,
          duration: 1.2,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true,
          },
        }
      );

      // Feature cards stagger
      gsap.fromTo(
        '[data-app-feature]',
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          delay: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className="container">
        <div className={styles.layout}>
          {/* Left: Content */}
          <div className={styles.contentCol} data-app-text>
            <span className="section-tag">L&apos;application</span>
            <h2 className={styles.title}>
              TON COACH
              <br />
              DANS TA <span className="text-accent">POCHE</span>
            </h2>
            <p className={styles.desc}>
              L&apos;application APEX METHOD centralise tes entraînements, ta
              nutrition et ton suivi. Disponible sur iOS et Android.
            </p>

            <div className={styles.featuresGrid}>
              {FEATURES.map((f, i) => (
                <div
                  key={i}
                  data-app-feature
                  className={`${styles.featureCard} ${f.fullWidth ? styles.fullWidth : ''}`}
                >
                  <div className={styles.featureIcon}>{f.icon}</div>
                  <h4 className={styles.featureTitle}>{f.title}</h4>
                  <p className={styles.featureDesc}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Phone Mockup */}
          <div className={styles.visualCol}>
            <div className={styles.backdrop} />
            <div className={styles.phoneMockup} data-app-phone>
              <div className={styles.phoneScreen}>
                <div className={styles.mockHeroImg}>
                  <img
                    src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
                    alt="App preview"
                  />
                  <div className={styles.mockHeroGradient} />
                </div>
                <div className={styles.mockContent}>
                  <h3 className={styles.mockTitle}>ORION</h3>
                  <div className={styles.mockDatePill}>
                    📅 Semaine 3 — Jour 2
                  </div>
                  <div className={styles.mockTagsRow}>
                    <span className={styles.mockTag}>PUSH</span>
                    <span className={styles.mockTag}>45 MIN</span>
                  </div>
                  <div className={styles.mockSectionLabel}>PROGRESSION</div>
                  <div className={styles.mockStatsGrid}>
                    <div className={styles.mockStatCard}>
                      <span className={styles.mscLabel}>Poids</span>
                      <span className={styles.mscVal}>
                        78<span className={styles.mscUnit}> kg</span>
                      </span>
                    </div>
                    <div className={styles.mockStatCard}>
                      <span className={styles.mscLabel}>Séances</span>
                      <span className={styles.mscVal}>12</span>
                    </div>
                  </div>
                  <div className={styles.mockBtnBronze}>
                    Commencer la séance
                  </div>
                </div>
                <div className={styles.mockTabBar}>
                  <div className={`${styles.tabItem} ${styles.tabActive}`}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    </svg>
                  </div>
                  <div className={styles.tabItem}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <div className={styles.tabItem}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
