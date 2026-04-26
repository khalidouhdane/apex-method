'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './OrionFeatures.module.css';

const features = [
  {
    title: "SÉANCES VIDÉO GUIDÉES",
    desc: "Chaque exercice de la programmation est accompagné d'une vidéo démonstrative de 10-15s pour assurer une technique parfaite.",
    icon: "🎥",
    size: "large"
  },
  {
    title: "IA NUTRITION",
    desc: "Génération automatique de tes macros et repas selon ton métabolisme et ton objectif.",
    icon: "🍽️",
    size: "small"
  },
  {
    title: "SUIVI INTÉGRÉ",
    desc: "Track tes charges, tes répétitions et ton évolution.",
    icon: "📊",
    size: "small"
  },
  {
    title: "PROGRESSION",
    desc: "4 cycles distincts pour forcer ton corps à s'adapter continuellement.",
    icon: "🔄",
    size: "small"
  },
  {
    title: "MÉTHODES",
    desc: "Supersets, Trisets, EMOM... tout est paramétré.",
    icon: "💪",
    size: "small"
  },
  {
    title: "MULTI-SUPPORT",
    desc: "Accède à tes séances depuis l'app web ou mobile n'importe où. Tes données sont synchronisées en temps réel.",
    icon: "📱",
    size: "large"
  }
];

export default function OrionFeatures() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      gsap.registerPlugin(ScrollTrigger);

      if (!gridRef.current) return;
      const cards = gridRef.current.querySelectorAll('.feature-card');

      gsap.fromTo(
        cards,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
          }
        }
      );
    });
  }, []);

  return (
    <section className={styles.section}>
      <div className="container">
        <div className="section-tag text-center" style={{ display: 'block' }}>L'ARSENAL</div>
        <h2 className={`section-title text-center ${styles.title}`}>
          TOUT CE DONT <br />TU AS BESOIN
        </h2>

        <div ref={gridRef} className={styles.grid}>
          {features.map((feat, idx) => (
            <div 
              key={idx} 
              className={`feature-card glass-card ${styles.card} ${feat.size === 'large' ? styles.cardLarge : styles.cardSmall}`}
            >
              <div className={styles.icon}>{feat.icon}</div>
              <h3 className={styles.cardTitle}>{feat.title}</h3>
              <p className={styles.cardDesc}>{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
