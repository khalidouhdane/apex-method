'use client';

import React from 'react';
import Image from 'next/image';
import styles from './OrionPromise.module.css';
import SplitTextReveal from '../shared/SplitTextReveal';

const promises = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
    title: 'Gain Musculaire Structuré',
    desc: 'Un protocole hyper-structuré basé sur la surcharge progressive.'
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    title: 'Recomposition Corporelle',
    desc: 'Brûle du gras tout en construisant un physique athlétique.'
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
    title: 'Discipline Intégrée',
    desc: 'Des habitudes ancrées pour une transformation mentale.'
  }
];

export default function OrionPromise() {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.container}`}>
        <div className={styles.grid}>
          {/* Visual Column */}
          <div className={styles.visualCol}>
            <div className={styles.imageWrapper}>
              <div className={styles.imageGlow} />
              <img 
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop" 
                alt="ORION Transformation" 
                className={styles.image}
              />
              <div className={styles.imageOverlay} />
            </div>
          </div>

          {/* Text Column */}
          <div className={styles.textCol}>
            <h2 className={styles.title}>
              <SplitTextReveal as="div">90 JOURS POUR DEVENIR LA</SplitTextReveal>
              <SplitTextReveal as="em" style={{ color: 'var(--orion-accent)', fontStyle: 'italic', WebkitTextFillColor: 'initial' }} delay={0.1}>VERSION LA PLUS FORTE</SplitTextReveal>
              <SplitTextReveal as="div" delay={0.2}>DE TOI-MÊME.</SplitTextReveal>
            </h2>
            
            <p className={styles.intro}>
              ORION n&apos;est pas un simple PDF. C&apos;est un système complet conçu pour briser tes plateaux,
              forcer l&apos;adaptation de ton corps, et bâtir une discipline à toute épreuve.
            </p>

            <div className={styles.promisesList}>
              {promises.map((p, idx) => (
                <div key={idx} className={styles.promiseItem}>
                  <div className={styles.iconBox}>
                    {p.icon}
                  </div>
                  <div className={styles.promiseContent}>
                    <h3 className={styles.promiseTitle}>{p.title}</h3>
                    <p className={styles.promiseDesc}>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
