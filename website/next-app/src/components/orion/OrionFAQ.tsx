'use client';

import React, { useState } from 'react';
import styles from './OrionFAQ.module.css';

const faqs = [
  {
    q: "Dois-je avoir un bon niveau pour commencer ORION ?",
    a: "Non. Le programme est évolutif. Le quiz d'orientation initial nous permettra de calibrer les charges et la fréquence selon ton niveau de départ, que tu sois débutant ou intermédiaire avancé."
  },
  {
    q: "J'ai un emploi du temps chargé, puis-je réussir avec ORION ?",
    a: "Absolument. Tu peux choisir une fréquence de 3 à 5 séances par semaine. Les séances durent entre 45 et 60 minutes si tu respectes les temps de repos indiqués."
  },
  {
    q: "Est-ce que j'ai accès au programme à vie ?",
    a: "Oui, une fois acheté, le programme ORION (90 jours) reste accessible à vie sur ton espace membre, avec toutes les futures mises à jour."
  },
  {
    q: "Et si je n'ai pas accès à une salle de sport ?",
    a: "C'est pour cela que nous avons créé la variante ORION MAISON. Tu auras seulement besoin d'un kit d'élastiques de résistance et d'une barre de traction."
  },
  {
    q: "Comment fonctionne l'aspect nutrition ?",
    a: "L'application inclut un calculateur intelligent. Tu rentres tes mensurations et ton objectif (recomposition, prise de masse), et elle te donne tes macros cibles avec des exemples de repas."
  }
];

export default function OrionFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={styles.section}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <h2 className="section-title text-center" style={{ marginBottom: '64px' }}>
          QUESTIONS <em className="text-accent">FRÉQUENTES</em>
        </h2>

        <div className={styles.faqList}>
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className={`${styles.faqItem} ${openIndex === idx ? styles.active : ''}`}
            >
              <button 
                className={styles.faqButton} 
                onClick={() => toggle(idx)}
                aria-expanded={openIndex === idx}
              >
                <span className={styles.question}>{faq.q}</span>
                <span className={styles.icon}>+</span>
              </button>
              
              <div 
                className={styles.answerWrapper}
                style={{ 
                  maxHeight: openIndex === idx ? '200px' : '0',
                  opacity: openIndex === idx ? 1 : 0
                }}
              >
                <div className={styles.answer}>
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
