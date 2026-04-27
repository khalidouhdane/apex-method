'use client';

import styles from '../QuizWizard.module.css';
import type { Gender } from '@/lib/quiz-engine';

interface Props {
  value: Gender | null;
  onChange: (v: Gender) => void;
}

export default function StepGender({ value, onChange }: Props) {
  return (
    <div>
      <span className={styles.stepTag}>Étape 1</span>
      <h2 className={styles.stepTitle}>Tu es…</h2>
      <p className={styles.stepSubtitle}>
        Sélectionne ton genre pour qu&apos;on adapte les programmes.
      </p>

      <div className={`${styles.optionGrid} ${styles.optionGrid2}`}>
        <button
          type="button"
          className={`${styles.optionCard} ${value === 'homme' ? styles.optionCardActive : ''}`}
          onClick={() => onChange('homme')}
        >
          <span className={styles.optionIcon}>🧔</span>
          <span className={styles.optionLabel}>Homme</span>
        </button>
        <button
          type="button"
          className={`${styles.optionCard} ${value === 'femme' ? styles.optionCardActive : ''}`}
          onClick={() => onChange('femme')}
        >
          <span className={styles.optionIcon}>👩</span>
          <span className={styles.optionLabel}>Femme</span>
        </button>
      </div>
    </div>
  );
}
