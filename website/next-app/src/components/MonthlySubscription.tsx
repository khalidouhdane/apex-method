'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './MonthlySubscription.module.css';

export default function MonthlySubscription() {
  const [billing, setBilling] = useState<'annual' | 'monthly'>('annual');
  return (
    <section className={styles.section}>
      <div className={`container ${styles.container}`}>
        
        {/* Header Row */}
        <div className={styles.headerRow}>
          <h2 className={styles.title}>
            NOTRE ABONNEMENT<br/>
            <span className="text-gradient-prog" style={{ fontStyle: 'italic' }}>MENSUELLE</span>
          </h2>
          
          <div className={styles.toggleWrapper}>
            <div className={styles.toggle}>
              <button 
                className={billing === 'annual' ? styles.toggleBtnActive : styles.toggleBtn}
                onClick={() => setBilling('annual')}
              >
                ANNUELLE
              </button>
              <button 
                className={billing === 'monthly' ? styles.toggleBtnActive : styles.toggleBtn}
                onClick={() => setBilling('monthly')}
              >
                MENSUELLE
              </button>
            </div>
          </div>
        </div>

        {/* Content Row */}
        <div className={styles.contentRow}>
          
          {/* Left Column */}
          <div className={styles.leftCol}>
            <div className="pill-badge-new" style={{ marginBottom: '24px', width: 'fit-content' }}>
              <span className="pill-dot" />
              ABONNEMENT MENSUELLE
            </div>
            <h3 className={styles.planTitle}>
              APEX METHOD<br/>
              TRAINING
            </h3>
          </div>

          {/* Middle Column */}
          <div className={styles.midCol}>
            <p className={styles.description}>
              Réservé aux hommes et pères qui veulent une transformation radicale et encadrée de A à Z. Coaching privé, nutrition millimétrée et mentorat direct avec Alexandre.
            </p>
            <div className={styles.featuresGrid}>
              <div className={styles.featureItem}>
                <span className="icon-apex" />
                90 Jours de progression structurée
              </div>
              <div className={styles.featureItem}>
                <span className="icon-apex" />
                Format Maison ou Salle de sport
              </div>
              <div className={styles.featureItem}>
                <span className="icon-apex" />
                L&apos;expérience APEX complète
              </div>
              <div className={styles.featureItem}>
                <span className="icon-apex" />
                Access Complet a l&apos;app Apex.
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className={styles.rightCol}>
            {billing === 'annual' && <div className={styles.discount}>-12%</div>}
            <div className={styles.price}>{billing === 'annual' ? '49 Euro' : '59 Euro'}</div>
            <Link href="#abonnement" className={styles.ctaButton}>
              <span>Abonnement AMT</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
