'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitTextReveal from './shared/SplitTextReveal';
import styles from './PapaStrongPlan.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function PapaStrongPlan() {
  const [paymentPlan, setPaymentPlan] = useState<'unique' | 'split'>('unique');
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const infoBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        }
      });

      // Fade in info box
      tl.fromTo(infoBoxRef.current, 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        0.2
      );

      // Stagger features
      if (featuresRef.current) {
        const features = featuresRef.current.children;
        tl.fromTo(features,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" },
          "-=0.4"
        );
      }

      // Image Parallax
      if (imageRef.current) {
        gsap.fromTo(imageRef.current,
          { yPercent: 15 },
          {
            yPercent: -5,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={`container ${styles.container}`}>
        
        <div className={styles.leftCol}>
          <div className={styles.headerRow}>
            <h2 className={styles.title}>
              <SplitTextReveal as="span" delay={0}>L'EXPÉRIENCE</SplitTextReveal>
              <br/>
              <span className="text-gradient-prog" style={{ fontStyle: 'italic', display: 'inline-block' }}>
                <SplitTextReveal as="span" delay={0.2}>PREMIUM</SplitTextReveal>
              </span>
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

          <div className={styles.infoBox} ref={infoBoxRef}>
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

          <div className={styles.featuresGrid} ref={featuresRef}>
            <div className={styles.featureItem}>
              <div className={styles.featureNumber}>01</div>
              <div className={styles.featureContent}>
                <h4>STRUCTURE 4 MOIS</h4>
                <p>4 cycles progressifs : Fondation, Construction, Transformation, Évolution.</p>
              </div>
            </div>
            <div className={styles.featureItem}>
              <div className={styles.featureNumber}>02</div>
              <div className={styles.featureContent}>
                <h4>MENTORAT VIDÉO</h4>
                <p>Formation hebdomadaire exclusive : Mindset, Entraînement, Nutrition et Vie quotidienne.</p>
              </div>
            </div>
            <div className={styles.featureItem}>
              <div className={styles.featureNumber}>03</div>
              <div className={styles.featureContent}>
                <h4>NUTRITION MILLIMÉTRÉE</h4>
                <p>Plan alimentaire 100% personnalisé et ajusté en continu selon ton évolution.</p>
              </div>
            </div>
            <div className={styles.featureItem}>
              <div className={styles.featureNumber}>04</div>
              <div className={styles.featureContent}>
                <h4>ACCÈS DIRECT</h4>
                <p>Suivi personnel et ajustements tactiques pour garantir les résultats.</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.rightCol}>
          <div className={styles.imageCardWrapper}>
            <div className={styles.imageCardBg}></div>
            {/* 
              NOTE: Replace with a transparent .webp or .png of Alex without the green background.
              We removed the canvas processing for better performance. 
            */}
            <img 
              ref={imageRef}
              src="/images/papa_strong_coach.png" 
              alt="Alexandre APEX METHOD" 
              className={styles.alexImgOut} 
            />
          </div>
          
          <Link href="#appel" className={styles.ctaButton}>
            <span>Réserver Un Appel Stratégique</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </Link>
        </div>

      </div>
    </section>
  );
}
