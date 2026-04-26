'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import styles from './OrionVariants.module.css';

const variants = [
  {
    id: 'salle',
    title: 'ORION SALLE',
    desc: 'La transformation absolue. Utilise tout l\'arsenal de ta salle de sport pour sculpter un physique d\'élite.',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1000&auto=format&fit=crop',
    points: [
      'Machines & poids libres',
      'Hypertrophie maximale',
      'Travail d\'isolation'
    ]
  },
  {
    id: 'maison',
    title: 'ORION MAISON',
    desc: 'Le moteur principal adapté pour la maison ou l\'extérieur avec un simple kit d\'élastiques.',
    image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1000&auto=format&fit=crop',
    points: [
      'Élastiques de résistance',
      'Tension continue',
      'Flexibilité totale'
    ]
  }
];

export default function OrionVariants() {
  const [active, setActive] = useState('salle');
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      gsap.registerPlugin(ScrollTrigger);

      if (!sectionRef.current) return;
      const cards = sectionRef.current.querySelectorAll('.variant-card');

      gsap.fromTo(
        cards,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          }
        }
      );
    });
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className="container">
        <div className="section-tag text-center" style={{ display: 'block' }}>CHOISIS TON ARÈNE</div>
        <h2 className="section-title text-center" style={{ marginBottom: '64px' }}>
          SALLE OU <em className="text-accent">MAISON</em>
        </h2>

        {/* Mobile Toggle */}
        <div className={styles.mobileToggle}>
          <button 
            className={`${styles.toggleBtn} ${active === 'salle' ? styles.active : ''}`}
            onClick={() => setActive('salle')}
          >
            SALLE
          </button>
          <button 
            className={`${styles.toggleBtn} ${active === 'maison' ? styles.active : ''}`}
            onClick={() => setActive('maison')}
          >
            MAISON
          </button>
        </div>

        <div className={styles.grid}>
          {variants.map((v) => (
            <div 
              key={v.id} 
              className={`variant-card ${styles.card} ${active === v.id ? styles.cardActive : ''}`}
              onMouseEnter={() => setActive(v.id)}
            >
              <div className={styles.imageWrap}>
                <img src={v.image} alt={v.title} className={styles.image} />
                <div className={styles.overlay} />
              </div>
              <div className={styles.content}>
                <h3 className={styles.cardTitle}>{v.title}</h3>
                <p className={styles.cardDesc}>{v.desc}</p>
                <ul className={styles.list}>
                  {v.points.map((pt, i) => (
                    <li key={i}>
                      <span className="icon-apex" />
                      {pt}
                    </li>
                  ))}
                </ul>
                <div className={styles.actionWrap}>
                  <span className={styles.fakeBtn}>SÉLECTIONNER</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
