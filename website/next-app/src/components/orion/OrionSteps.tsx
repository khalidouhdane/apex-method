'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './OrionSteps.module.css';

const steps = [
  {
    num: '01',
    title: 'ÉVALUATION',
    desc: 'Passe le quiz d\'orientation pour définir ton profil, ton niveau et le nombre de séances par semaine.'
  },
  {
    num: '02',
    title: 'PROGRAMMATION',
    desc: 'Accède à tes 90 jours structurés. 4 cycles évolutifs pour forcer l\'adaptation sans brûler ton système.'
  },
  {
    num: '03',
    title: 'TRANSFORMATION',
    desc: 'Suis tes perfs, maîtrise ta nutrition avec notre IA, et construis la discipline d\'un athlète.'
  }
];

export default function OrionSteps() {
  const containerRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      gsap.registerPlugin(ScrollTrigger);

      const container = containerRef.current;
      const line = lineRef.current;
      if (!container || !line) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 70%',
        }
      });

      // Animate line drawing
      tl.fromTo(
        line,
        { scaleX: 0, transformOrigin: 'left' },
        { scaleX: 1, duration: 1.5, ease: 'power2.inOut' }
      );

      // Animate steps appearing
      const stepElements = container.querySelectorAll('.step-item');
      tl.fromTo(
        stepElements,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.3, duration: 0.8, ease: 'power3.out' },
        '-=1'
      );
    });
  }, []);

  return (
    <section ref={containerRef} className={styles.section}>
      <div className="container">
        <div className="section-tag">COMMENT ÇA MARCHE</div>
        <h2 className="section-title" style={{ marginBottom: '80px' }}>
          LA <em className="text-accent">MÉTHODE</em>
        </h2>

        <div className={styles.stepsContainer}>
          {/* Background line */}
          <div className={styles.track}>
            <div ref={lineRef} className={styles.trackFill} />
          </div>

          <div className={styles.stepsList}>
            {steps.map((step, idx) => (
              <div key={idx} className={`step-item ${styles.step}`}>
                <div className={styles.stepNum}>{step.num}</div>
                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
