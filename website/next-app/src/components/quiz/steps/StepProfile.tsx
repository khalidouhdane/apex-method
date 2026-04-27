'use client';

import styles from '../QuizWizard.module.css';

interface Props {
  age: number;
  weight: number;
  height: number;
  onChangeAge: (v: number) => void;
  onChangeWeight: (v: number) => void;
  onChangeHeight: (v: number) => void;
}

export default function StepProfile({
  age,
  weight,
  height,
  onChangeAge,
  onChangeWeight,
  onChangeHeight,
}: Props) {
  return (
    <div>
      <span className={styles.stepTag}>Étape 2</span>
      <h2 className={styles.stepTitle}>Ton profil</h2>
      <p className={styles.stepSubtitle}>
        Utilise les curseurs pour ajuster rapidement.
      </p>

      {/* Age */}
      <div className={styles.sliderGroup}>
        <div className={styles.sliderLabel}>
          <span className={styles.sliderLabelText}>Âge</span>
          <span className={styles.sliderValue}>{age} ans</span>
        </div>
        <input
          type="range"
          min={18}
          max={65}
          value={age}
          onChange={(e) => onChangeAge(Number(e.target.value))}
          className={styles.sliderInput}
        />
        <div className={styles.sliderRange}>
          <span>18</span>
          <span>65</span>
        </div>
      </div>

      {/* Weight */}
      <div className={styles.sliderGroup}>
        <div className={styles.sliderLabel}>
          <span className={styles.sliderLabelText}>Poids</span>
          <span className={styles.sliderValue}>{weight} kg</span>
        </div>
        <input
          type="range"
          min={45}
          max={150}
          value={weight}
          onChange={(e) => onChangeWeight(Number(e.target.value))}
          className={styles.sliderInput}
        />
        <div className={styles.sliderRange}>
          <span>45 kg</span>
          <span>150 kg</span>
        </div>
      </div>

      {/* Height */}
      <div className={styles.sliderGroup}>
        <div className={styles.sliderLabel}>
          <span className={styles.sliderLabelText}>Taille</span>
          <span className={styles.sliderValue}>{height} cm</span>
        </div>
        <input
          type="range"
          min={150}
          max={210}
          value={height}
          onChange={(e) => onChangeHeight(Number(e.target.value))}
          className={styles.sliderInput}
        />
        <div className={styles.sliderRange}>
          <span>150 cm</span>
          <span>210 cm</span>
        </div>
      </div>
    </div>
  );
}
