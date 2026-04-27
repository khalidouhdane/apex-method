'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import styles from './QuizWizard.module.css';
import type { QuizResult as QuizResultType } from '@/lib/quiz-engine';

interface Props {
  result: QuizResultType;
  onRestart: () => void;
}

export default function QuizResult({ result, onRestart }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '[data-result-badge]',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 }
      )
        .fromTo(
          '[data-result-title]',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.3'
        )
        .fromTo(
          '[data-result-subtitle]',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5 },
          '-=0.3'
        )
        .fromTo(
          '[data-result-card]',
          { opacity: 0, y: 50, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7 },
          '-=0.2'
        )
        .fromTo(
          '[data-health-note]',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.4 },
          '-=0.3'
        )
        .fromTo(
          '[data-result-alt]',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
          '-=0.2'
        )
        .fromTo(
          '[data-result-actions]',
          { opacity: 0 },
          { opacity: 1, duration: 0.4 },
          '-=0.2'
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const { primary, alternatives, hasHealthConstraints } = result;

  return (
    <div ref={containerRef} className={styles.resultScreen}>
      {/* Badge */}
      <div className={styles.resultBadge} data-result-badge>
        🏆 Résultat
      </div>

      {/* Title */}
      <h2 className={styles.resultTitle} data-result-title>
        Ton programme APEX :{' '}
        <span className={styles.resultTitleAccent}>{primary.title}</span>
      </h2>
      <p className={styles.resultSubtitle} data-result-subtitle>
        {primary.description}
      </p>

      {/* Health constraint note */}
      {hasHealthConstraints && (
        <div className={styles.healthNote} data-health-note>
          <span className={styles.healthNoteIcon}>⚕️</span>
          <p className={styles.healthNoteText}>
            Tu as mentionné des contraintes physiques. On te recommande un appel
            avec Alex pour adapter le programme à tes besoins et t&apos;assurer
            un suivi personnalisé.
          </p>
        </div>
      )}

      {/* Primary Card */}
      <div className={styles.resultCard} data-result-card>
        <img
          src={primary.image}
          alt={primary.title}
          className={styles.resultCardImage}
        />
        <div className={styles.resultCardOverlay} />
        <div className={styles.resultCardBody}>
          <div className={styles.resultCardPills}>
            {primary.pills.map((pill, i) => (
              <span key={i} className={styles.resultCardPill}>
                {pill}
              </span>
            ))}
          </div>
          <h3 className={styles.resultCardName}>{primary.title}</h3>
          <p className={styles.resultCardSub}>{primary.subtitle}</p>

          <div className={styles.resultCardMeta}>
            <div className={styles.resultMetaItem}>
              <span className={styles.resultMetaLabel}>Durée</span>
              <span className={styles.resultMetaValue}>{primary.duration}</span>
            </div>
            <div className={styles.resultMetaItem}>
              <span className={styles.resultMetaLabel}>Lieu</span>
              <span className={styles.resultMetaValue}>{primary.location}</span>
            </div>
            <div className={styles.resultMetaItem}>
              <span className={styles.resultMetaLabel}>Prix</span>
              <span className={styles.resultMetaValue}>{primary.price}</span>
            </div>
          </div>

          <Link href={primary.ctaHref} className={styles.resultCardCta}>
            <span>{primary.ctaText}</span>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Alternatives */}
      {alternatives.length > 0 && (
        <>
          <p className={styles.altsLabel} data-result-alt>
            Aussi adapté pour toi
          </p>
          <div className={styles.altsGrid}>
            {alternatives.map((alt) => (
              <Link
                key={alt.id}
                href={alt.ctaHref}
                className={styles.altCard}
                data-result-alt
              >
                <h4 className={styles.altCardName}>{alt.title}</h4>
                <p className={styles.altCardMeta}>
                  {alt.duration} · {alt.location}
                </p>
                <span className={styles.altCardLink}>
                  Découvrir
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </>
      )}

      {/* Bottom Actions */}
      <div className={styles.resultActions} data-result-actions>
        <button
          type="button"
          onClick={onRestart}
          className={styles.resultLink}
        >
          Refaire le quiz
        </button>
        <Link href="/#programmes" className={styles.resultLink}>
          Voir tous les programmes
        </Link>
      </div>
    </div>
  );
}
