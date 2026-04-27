'use client';

import styles from '../QuizWizard.module.css';
import type { HealthConstraint } from '@/lib/quiz-engine';

interface Props {
  value: HealthConstraint[];
  onChange: (v: HealthConstraint[]) => void;
}

const OPTIONS: { key: HealthConstraint; label: string }[] = [
  { key: 'aucune', label: 'Aucune contrainte' },
  { key: 'articulaire', label: 'Douleurs articulaires' },
  { key: 'dos', label: 'Problèmes de dos' },
  { key: 'blessure', label: 'Blessure récente' },
  { key: 'autre', label: 'Autre' },
];

export default function StepHealth({ value, onChange }: Props) {
  const toggle = (key: HealthConstraint) => {
    if (key === 'aucune') {
      // "Aucune" deselects everything else
      onChange(['aucune']);
      return;
    }

    // Remove 'aucune' if selecting a constraint
    let next = value.filter((v) => v !== 'aucune');

    if (next.includes(key)) {
      next = next.filter((v) => v !== key);
    } else {
      next = [...next, key];
    }

    // If nothing selected, default to empty
    onChange(next.length > 0 ? next : []);
  };

  const stepNumber = 8; // This is the last step for men; step 7 for women (father step skipped)

  return (
    <div>
      <span className={styles.stepTag}>Dernière étape</span>
      <h2 className={styles.stepTitle}>Des contraintes physiques ?</h2>
      <p className={styles.stepSubtitle}>
        Si tu as des limitations, on adaptera la recommandation.
        Sélectionne tout ce qui s&apos;applique.
      </p>

      <div className={styles.checkGroup}>
        {OPTIONS.map((opt) => {
          const isChecked = value.includes(opt.key);
          return (
            <button
              key={opt.key}
              type="button"
              className={`${styles.checkOption} ${isChecked ? styles.checkOptionActive : ''}`}
              onClick={() => toggle(opt.key)}
            >
              <div className={`${styles.checkBox} ${isChecked ? styles.checkBoxChecked : ''}`}>
                {isChecked && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
              <span className={styles.checkLabel}>{opt.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
