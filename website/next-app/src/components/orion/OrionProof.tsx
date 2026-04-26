'use client';

import React from 'react';
import styles from './OrionProof.module.css';

// Placeholder for real before/after data
const proofs = [
  {
    id: 1,
    name: "Thomas D.",
    duration: "90 Jours",
    result: "-8kg / + Muscle sec",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop" // Placeholder
  },
  {
    id: 2,
    name: "Marc L.",
    duration: "90 Jours",
    result: "Recomposition totale",
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=800&auto=format&fit=crop" // Placeholder
  }
];

export default function OrionProof() {
  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className="section-title text-center" style={{ marginBottom: '64px' }}>
          LES <em className="text-accent">RÉSULTATS</em>
        </h2>

        <div className={styles.grid}>
          {proofs.map((proof) => (
            <div key={proof.id} className={styles.card}>
              <div className={styles.imageWrap}>
                <img src={proof.image} alt={`Transformation de ${proof.name}`} className={styles.image} />
                <div className={styles.badge}>AVANT / APRÈS</div>
              </div>
              <div className={styles.info}>
                <h3 className={styles.name}>{proof.name}</h3>
                <div className={styles.stats}>
                  <span className={styles.duration}>{proof.duration}</span>
                  <span className={styles.result}>{proof.result}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
