'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './PapaStrongPlan.module.css';

export default function PapaStrongPlan() {
  const [paymentPlan, setPaymentPlan] = useState<'unique' | 'split'>('unique');
  return (
    <section className={styles.section}>
      <div className={`container ${styles.container}`}>
        
        <div className={styles.leftCol}>
          <div className={styles.headerRow}>
            <h2 className={styles.title}>
              LE PLAN<br/>
              <span className="text-gradient-prog" style={{ fontStyle: 'italic' }}>EXCLUSIF</span>
            </h2>
            
            <div className={styles.priceBlock}>
              <div className={styles.toggle}>
                <button 
                  className={paymentPlan === 'unique' ? styles.toggleBtnActive : styles.toggleBtn}
                  onClick={() => setPaymentPlan('unique')}
                >
                  PAIEMENT UNIQUE
                </button>
                <button 
                  className={paymentPlan === 'split' ? styles.toggleBtnActive : styles.toggleBtn}
                  onClick={() => setPaymentPlan('split')}
                >
                  PAIEMENT EN 3 FOIS
                </button>
              </div>
              <div className={styles.price}>{paymentPlan === 'unique' ? '590 Euro' : '197 Euro / mois'}</div>
            </div>
          </div>

          <div className={styles.infoBox}>
            <div className={styles.infoBoxLeft}>
              <span className="pill-badge-new">
                <span className="pill-dot" />
                1:1 COACHING
              </span>
              <h3 className={styles.infoBoxTitle}>PAPA STRONG</h3>
            </div>
            <div className={styles.infoBoxRight}>
              <p>Réservé aux hommes et pères qui veulent une transformation radicale et encadrée de A à Z. Coaching privé, nutrition millimétrée et mentorat direct avec Alexandre.</p>
            </div>
          </div>

          <div className={styles.featuresGrid}>
            <div className={styles.featureItem}>
              <h4>STRUCTURE 4 MOIS</h4>
              <p>4 cycles progressifs : Fondation, Construction, Transformation, Évolution.</p>
            </div>
            <div className={styles.featureItem}>
              <h4>MENTORAT VIDÉO</h4>
              <p>Formation hebdomadaire exclusive : Mindset, Entraînement, Nutrition et Vie quotidienne.</p>
            </div>
            <div className={styles.featureItem}>
              <h4>NUTRITION MILLIMÉTRÉE</h4>
              <p>Plan alimentaire 100% personnalisé et ajusté en continu selon ton évolution.</p>
            </div>
            <div className={styles.featureItem}>
              <h4>ACCÈS DIRECT</h4>
              <p>Suivi personnel et ajustements tactiques pour garantir les résultats.</p>
            </div>
          </div>
        </div>

        <div className={styles.rightCol}>
          <div className={styles.imageCard}>
            {/* Temporary image representing Alex in hoodie */}
            <img 
              src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=800&auto=format&fit=crop" 
              alt="Alexandre" 
              className={styles.alexImg} 
            />
          </div>
          <Link href="#appel" className={styles.ctaButton}>
            <span>Reserver Un Appel Stratégique</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </Link>
        </div>

      </div>
    </section>
  );
}
