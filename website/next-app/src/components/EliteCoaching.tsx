'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './EliteCoaching.module.css';

const FEATURES = [
  {
    title: 'COACHING 1:1',
    desc: 'Un coaching personnalisé avec Alexandre. Pas de template. Un programme sur-mesure.',
  },
  {
    title: 'NUTRITION IA',
    desc: 'Calcul métabolique, plan alimentaire adapté et ajustements hebdomadaires.',
  },
  {
    title: 'SUIVI QUOTIDIEN',
    desc: 'Check-ins réguliers, ajustements en temps réel, accountability totale.',
  },
  {
    title: 'ACCÈS À VIE',
    desc: 'Tous les programmes APEX inclus. Application mobile. Communauté privée.',
  },
];

export default function EliteCoaching() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Card reveal
      gsap.fromTo(
        '[data-elite-card]',
        { opacity: 0, y: 30 },
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

      // Feature grid stagger
      gsap.fromTo(
        '[data-elite-feature]',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
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
        <div className={styles.card} data-elite-card>
          <div className={styles.bgGlow} />
          <div className={styles.content}>
            <div className={styles.header}>
              <div className="text-pill">
                <span className="pill-dot" />
                COACHING PREMIUM · PAPA STRONG
              </div>
              <div className={styles.priceTag}>
                <span className={styles.priceVal}>297€</span>
                <span className={styles.priceType}>/ mois · 4 mois</span>
              </div>
            </div>

            <h2 className={styles.title}>PAPA STRONG</h2>
            <p className={styles.desc}>
              Le coaching élite pour les pères qui veulent tout maîtriser. Corps,
              mental, énergie. Un accompagnement 1:1 avec Alexandre pendant 4
              mois pour une transformation radicale et définitive.
            </p>

            <div className={styles.grid}>
              {FEATURES.map((f, i) => (
                <div key={i} className={styles.feature} data-elite-feature>
                  <h4>{f.title}</h4>
                  <p>{f.desc}</p>
                </div>
              ))}
            </div>

            <div className={styles.ctaWrap}>
              <Link href="/quiz" className="btn btn-solid-bronze btn-large">
                Réserver un appel découverte
              </Link>
              <span className={styles.disclaimer}>
                Places limitées · Appel de qualification requis
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
