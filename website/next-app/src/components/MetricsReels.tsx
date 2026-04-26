'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './MetricsReels.module.css';

const METRICS = [
  {
    number: '600+',
    targetVal: 600,
    suffix: '+',
    label: 'GRINDERS',
    video: '/reels/Alex_sprinting_towards_202604210947.mp4',
  },
  {
    number: '2100+',
    targetVal: 2100,
    suffix: '+',
    label: 'RECETTES',
    video: '/reels/Meal_prep_ingredients_202604210948.mp4',
  },
  {
    number: '200+',
    targetVal: 200,
    suffix: '+',
    label: 'ENTRAÎNEMENTS',
    video: '/reels/Chalked_hands_gripping_202604210949.mp4',
  },
];

export default function MetricsReels() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll('[data-metric-card]');
      if (!cards?.length) return;

      // 1. Staggered card reveal
      gsap.fromTo(
        cards,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );

      // 2. Animated counters
      const numbers = gridRef.current?.querySelectorAll('[data-metric-number]');
      numbers?.forEach((el, index) => {
        const targetVal = parseInt(el.getAttribute('data-target') || '0');
        const suffix = el.getAttribute('data-suffix') || '';
        const proxy = { val: 0 };

        gsap.to(proxy, {
          val: targetVal,
          duration: 2.5,
          delay: index * 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
            once: true,
          },
          onUpdate: () => {
            (el as HTMLElement).innerText = Math.floor(proxy.val) + suffix;
          },
        });
      });

      // 3. Title reveal
      const title = sectionRef.current?.querySelector('[data-metrics-title]');
      if (title) {
        gsap.fromTo(
          title,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className="container">
        <h2 className={styles.title} data-metrics-title>
          VOTRE<br />
          <span className="text-gradient-prog" style={{ fontStyle: 'italic' }}>ÉVOLUTION</span>
        </h2>
        <div ref={gridRef} className={styles.grid}>
          {METRICS.map((m, i) => (
            <div key={i} className={styles.card} data-metric-card>
              <video
                className={styles.videoBg}
                src={m.video}
                autoPlay
                muted
                loop
                playsInline
              />
              <div className={styles.content}>
                <span
                  className={styles.number}
                  data-metric-number
                  data-target={m.targetVal}
                  data-suffix={m.suffix}
                >
                  0
                </span>
                <span className={styles.label}>{m.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
