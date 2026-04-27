'use client';

import styles from '../QuizWizard.module.css';
import type { Availability } from '@/lib/quiz-engine';

interface Props {
  value: Availability | null;
  onChange: (v: Availability) => void;
}

const OPTIONS: { key: Availability; icon: string; label: string; desc: string }[] = [
  { key: '2-3', icon: '📅', label: '2–3 séances', desc: 'Par semaine' },
  { key: '4', icon: '📅', label: '4 séances', desc: 'Par semaine' },
  { key: '5+', icon: '📅', label: '5+ séances', desc: 'Par semaine' },
];

export default function StepAvailability({ value, onChange }: Props) {
  return (
    <div>
      <span className={styles.stepTag}>Étape 5</span>
      <h2 className={styles.stepTitle}>Ta disponibilité</h2>
      <p className={styles.stepSubtitle}>
        Combien de séances par semaine peux-tu consacrer ?
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
