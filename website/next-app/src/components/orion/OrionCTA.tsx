import React from 'react';
import Link from 'next/link';
import styles from './OrionCTA.module.css';

export default function OrionCTA() {
  return (
    <section className={styles.section} id="pricing">
      <div className={`container ${styles.container}`}>
        
        <div className={styles.glow} />
        
        <div className={styles.content}>
          <div className="section-tag" style={{ margin: '0 auto 24px' }}>L'HEURE EST VENUE</div>
          
          <h2 className={styles.title}>
            DÉMARRE TA <br />
            <em className="text-accent">TRANSFORMATION</em>
          </h2>
          
          <p className={styles.desc}>
            90 jours d'entraînement structuré. Recomposition corporelle totale. Accès à vie.
          </p>
          
          <div className={styles.priceWrap}>
            {/* Price is kept here as requested but can be conditionally hidden if business strategy changes */}
            <span className={styles.price}>97€</span>
            <span className={styles.priceLabel}>Paiement unique. Accès à vie.</span>
          </div>
          
          <div className={styles.actions}>
            <Link href="/checkout/orion" className="btn btn-solid-bronze btn-large" style={{ width: '100%', justifyContent: 'center' }}>
              Rejoindre ORION
            </Link>
            <p className={styles.guarantee}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              Paiement sécurisé via Stripe
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
