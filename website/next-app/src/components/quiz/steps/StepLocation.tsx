'use client';

import styles from '../QuizWizard.module.css';
import type { Location } from '@/lib/quiz-engine';

interface Props {
  value: Location | null;
  onChange: (v: Location) => void;
}

const OPTIONS: { key: Location; icon: string; label: string; desc: string }[] = [
  { key: 'maison', icon: '🏠', label: 'Maison', desc: 'Chez toi, avec ou sans matériel' },
  { key: 'salle', icon: '🏋️', label: 'Salle de sport', desc: 'Machines, haltères, barres' },
  { key: 'outdoor', icon: '🌳', label: 'Extérieur', desc: 'Parcs, espaces ouverts' },
];

export default function StepLocation({ value, onChange }: Props) {
  return (
    <div>
      <span className={styles.stepTag}>Étape 6</span>
      <h2 className={styles.stepTitle}>Ton lieu d&apos;entraînement</h2>
      <p className={styles.stepSubtitle}>
        Où préfères-tu t&apos;entraîner au quotidien ?
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
