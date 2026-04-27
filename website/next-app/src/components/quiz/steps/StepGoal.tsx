'use client';

import styles from '../QuizWizard.module.css';
import type { Goal } from '@/lib/quiz-engine';

interface Props {
  value: Goal | null;
  onChange: (v: Goal) => void;
}

const OPTIONS: { key: Goal; icon: string; label: string; desc: string }[] = [
  { key: 'perte', icon: '🔥', label: 'Perte de gras', desc: 'Sécher et dessiner le physique' },
  { key: 'masse', icon: '💪', label: 'Prise de masse', desc: 'Construire du muscle et du volume' },
  { key: 'les-deux', icon: '⚖️', label: 'Les deux', desc: 'Recomposition corporelle complète' },
];

export default function StepGoal({ value, onChange }: Props) {
  return (
    <div>
      <span className={styles.stepTag}>Étape 4</span>
      <h2 className={styles.stepTitle}>Ton objectif</h2>
      <p className={styles.stepSubtitle}>
        Qu&apos;est-ce que tu veux accomplir en priorité ?
      </p>

      <div className={`${styles.optionGrid} ${styles.optionGrid3}`}>
        {OPTIONS.map((opt) => (
          <button
            key={opt.key}
            type="button"
            className={`${styles.optionCard} ${value === opt.key ? styles.optionCardActive : ''}`}
            onClick={() => onChange(opt.key)}
          >
            <span className={styles.optionIcon}>{opt.icon}</span>
            <span className={styles.optionLabel}>{opt.label}</span>
            <span className={styles.optionDesc}>{opt.desc}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
