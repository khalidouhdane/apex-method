'use client';

import styles from '../QuizWizard.module.css';

interface Props {
  value: boolean | null;
  onChange: (v: boolean) => void;
}

export default function StepFather({ value, onChange }: Props) {
  return (
    <div>
      <span className={styles.stepTag}>Étape 7</span>
      <h2 className={styles.stepTitle}>Es-tu père ?</h2>
      <p className={styles.stepSubtitle}>
        On a un programme spécialement conçu pour les papas qui veulent
        reprendre le contrôle.
      </p>

      <div className={`${styles.optionGrid} ${styles.optionGrid2}`}>
        <button
          type="button"
          className={`${styles.optionCard} ${value === true ? styles.optionCardActive : ''}`}
          onClick={() => onChange(true)}
        >
          <span className={styles.optionIcon}>👨‍👧‍👦</span>
          <span className={styles.optionLabel}>Oui, je suis père</span>
        </button>
        <button
          type="button"
          className={`${styles.optionCard} ${value === false ? styles.optionCardActive : ''}`}
          onClick={() => onChange(false)}
        >
          <span className={styles.optionIcon}>🙅‍♂️</span>
          <span className={styles.optionLabel}>Non</span>
        </button>
      </div>
    </div>
  );
}
