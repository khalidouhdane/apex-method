'use client';

import styles from '../QuizWizard.module.css';
import type { Experience } from '@/lib/quiz-engine';

interface Props {
  value: Experience | null;
  onChange: (v: Experience) => void;
}

const OPTIONS: { key: Experience; icon: string; label: string; desc: string }[] = [
  { key: 'debutant', icon: '🟢', label: 'Débutant', desc: '0 à 1 séance par semaine' },
  { key: 'intermediaire', icon: '🟡', label: 'Intermédiaire', desc: '2 à 3 séances par semaine' },
  { key: 'confirme', icon: '🔴', label: 'Confirmé', desc: '4+ séances par semaine' },
];

export default function StepExperience({ value, onChange }: Props) {
  return (
    <div>
      <span className={styles.stepTag}>Étape 3</span>
      <h2 className={styles.stepTitle}>Ton expérience</h2>
      <p className={styles.stepSubtitle}>
        Quel est ton niveau actuel en entraînement ?
      </p>

      <div className={styles.optionGrid}>
        {OPTIONS.map((opt) => (
          <button
            key={opt.key}
            type="button"
            className={`${styles.optionCard} ${styles.optionCardRow} ${value === opt.key ? styles.optionCardActive : ''}`}
            onClick={() => onChange(opt.key)}
          >
            <span className={styles.optionIcon}>{opt.icon}</span>
            <div>
              <span className={styles.optionLabel}>{opt.label}</span>
              <span className={styles.optionDesc}>{opt.desc}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
