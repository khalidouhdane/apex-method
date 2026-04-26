'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './QuizCTA.module.css';

export default function QuizCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-quiz-card]',
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="quiz" className={styles.section}>
      <div className="container">
        <div className={styles.card} data-quiz-card>
          <div className={styles.bgPattern} />
          <div className={styles.content}>
            <span className="section-tag section-tag-light">
              Quiz d&apos;orientation
            </span>
            <h2 className={styles.title}>
              Quel programme
              <br />
              est fait pour <span className="text-accent">toi</span> ?
            </h2>
            <p className={styles.desc}>
              Réponds à 7 questions simples. On t&apos;oriente vers le programme
              qui correspond à ton profil, tes objectifs, et ton mode de vie.
            </p>

            <div className={styles.steps}>
              <div className={styles.step}>
                <div className={styles.stepNum}>1</div>
                <span>Ton profil</span>
              </div>
              <div className={styles.stepLine} />
              <div className={styles.step}>
                <div className={styles.stepNum}>2</div>
                <span>Tes objectifs</span>
              </div>
              <div className={styles.stepLine} />
              <div className={styles.step}>
                <div className={styles.stepNum}>3</div>
                <span>Ton programme</span>
              </div>
            </div>

            <Link href="#" className="btn btn-solid-bronze btn-large" id="quiz-cta">
              <span>Commencer le quiz</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <p className={styles.note}>
              2 minutes · 100% gratuit · Résultat immédiat
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
