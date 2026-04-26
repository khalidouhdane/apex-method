'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './About.module.css';

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Image frame reveal
      gsap.fromTo(
        '[data-about-img]',
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

      // Float card reveal
      gsap.fromTo(
        '[data-about-float]',
        { opacity: 0, scale: 0.85 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          delay: 0.4,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );

      // Text content reveal
      gsap.fromTo(
        '[data-about-text]',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className={styles.about}>
      <div className="container">
        <div className={styles.layout}>
          <div className={styles.imageCol}>
            <div className={styles.imgFrame} data-about-img>
              {/* Placeholder until real image is provided */}
              <div className={styles.imgPlaceholder}>
                <span className={styles.initials}>AM</span>
                <span className={styles.role}>FONDATEUR</span>
              </div>
            </div>
            <div className={styles.floatCard} data-about-float>
              <span className={styles.floatNumber}>500+</span>
              <span className={styles.floatLabel}>Vies transformées</span>
            </div>
          </div>

          <div className={styles.textCol} data-about-text>
            <span className="section-tag">Le fondateur</span>
            <h2 className="section-title">
              Alexandre
              <br />
              <span className="text-accent">Monteiro</span>
            </h2>

            <div className={styles.story}>
              <p>
                APEX, c&apos;est le sommet. Le niveau le plus haut que tu
                puisses atteindre.
              </p>
              <p>
                Alexandre a créé APEX METHOD avec une conviction simple :{' '}
                <strong>chaque homme a un potentiel inexploité</strong>. Pas
                seulement physique — mental, émotionnel, dans sa vie de père,
                de leader.
              </p>
              <p>
                Sa méthode ne te vend pas du rêve. Elle te donne un cadre. Des
                entraînements structurés. Une nutrition personnalisée. Un
                accompagnement qui ne te lâche pas.
              </p>
              <blockquote className={styles.quote}>
                &quot;Je ne forme pas des sportifs. Je forge des hommes qui
                maîtrisent leur vie.&quot;
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
