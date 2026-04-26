'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import styles from './OrionWeekly.module.css';

// Using distinct plans based on session frequency
const plan3x = [
  {
    day: 'SÉANCE 1',
    focus: 'FULL BODY - FOCUS PUSH',
    methods: ['Superset', 'Lourd'],
    exercises: ['Squat', 'Bench press + Barbell row', 'Overhead press + Lat pulldown', 'Push-ups + Plank']
  },
  {
    day: 'SÉANCE 2',
    focus: 'FULL BODY - FOCUS PULL',
    methods: ['Triset', 'Hypertrophie'],
    exercises: ['Deadlift', 'Pull-ups + Incline press', 'Face pulls + Bicep curl', 'Leg press + Calf raises']
  },
  {
    day: 'SÉANCE 3',
    focus: 'FULL BODY - ATHLÉTIQUE',
    methods: ['Circuit', 'Finisher'],
    exercises: ['Walking lunges', 'Dips + Chin-ups', 'Kettlebell swings', 'Ab wheel + 1min burpees']
  }
];

const plan4x = [
  {
    day: 'SÉANCE 1',
    focus: 'UPPER BODY 1',
    methods: ['Superset', 'Lourd'],
    exercises: ['Bench press + Weighted pull-ups', 'Incline press + Barbell row', 'Cable flies + Rear delt']
  },
  {
    day: 'SÉANCE 2',
    focus: 'LOWER BODY 1',
    methods: ['Triset', 'Force'],
    exercises: ['Squat', 'Leg press + Calf raises', 'Leg extension + Leg curl', 'Weighted V-ups']
  },
  {
    day: 'SÉANCE 3',
    focus: 'UPPER BODY 2',
    methods: ['Superset', 'Hypertrophie'],
    exercises: ['Military press + Chin-ups', 'Dips + Face pulls', 'Bicep curl + Tricep extension']
  },
  {
    day: 'SÉANCE 4',
    focus: 'LOWER BODY 2 + ABS',
    methods: ['Circuit', 'Finisher'],
    exercises: ['Deadlift', 'Walking lunges', 'Ab wheel + Russian twists', '1min burpees']
  }
];

const plan5x = [
  {
    day: 'SÉANCE 1',
    focus: 'CHEST / BACK',
    methods: ['Superset', 'Triset'],
    exercises: ['Bench press + Weighted pull-ups', 'Incline press + Barbell row', 'Cable flies + Rear delt', 'Push-ups + Inverted row + Plank', 'Ab wheel']
  },
  {
    day: 'SÉANCE 2',
    focus: 'SHOULDERS / ARMS',
    methods: ['Triset', 'Superset'],
    exercises: ['Clean & jerk', 'Military press', 'Lateral raises + Front raises + Bicep curl', 'Bicep curl + Tricep extension']
  },
  {
    day: 'SÉANCE 3',
    focus: 'LEGS / ABS',
    methods: ['Triset', 'Finisher'],
    exercises: ['Deadlift', 'Walking lunges', 'Leg press + Jump squats + Tyson push-ups', 'Weighted V-ups', '1min burpees']
  },
  {
    day: 'SÉANCE 4',
    focus: 'UPPER BODY',
    methods: ['Superset', 'Circuit'],
    exercises: ['Dips + Pull-ups', 'Push-ups + Neutral grip pull-ups', 'Circuit: Arnold press, Reverse fly, Hammer curl, Leg raises']
  },
  {
    day: 'SÉANCE 5',
    focus: 'LOWER BODY + CARDIO',
    methods: ['Superset', 'Cardio'],
    exercises: ['Bulgarian split squats', 'Leg extension + Leg curl', '20min run or incline walk']
  }
];
export default function OrionWeekly() {
  const [frequency, setFrequency] = useState(5);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      gsap.registerPlugin(ScrollTrigger);

      if (!containerRef.current) return;
      const cards = containerRef.current.querySelectorAll('.weekly-card');

      gsap.fromTo(
        cards,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
          }
        }
      );
    });
  }, []);

  const visibleSessions = frequency === 3 ? plan3x : frequency === 4 ? plan4x : plan5x;

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <div>
            <div className="section-tag">STRUCTURE</div>
            <h2 className="section-title">
              UNE SEMAINE <br /><em className="text-accent">TYPE</em>
            </h2>
          </div>

          <div className={styles.frequencySelector}>
            <span className={styles.freqLabel}>Fréquence :</span>
            <div className={styles.freqButtons}>
              {[3, 4, 5].map((num) => (
                <button
                  key={num}
                  className={`${styles.freqBtn} ${frequency === num ? styles.freqActive : ''}`}
                  onClick={() => setFrequency(num)}
                >
                  {num}X
                </button>
              ))}
            </div>
          </div>
        </div>

        <div ref={containerRef} className={styles.cardsContainer}>
          {visibleSessions.map((session, idx) => (
            <div key={idx} className={`weekly-card glass-card ${styles.card}`}>
              <div className={styles.cardHeader}>
                <span className={styles.dayNum}>{session.day}</span>
                <h3 className={styles.focus}>{session.focus}</h3>
              </div>
              
              <div className={styles.methodsRow}>
                {session.methods.map((m, i) => (
                  <span key={i} className={styles.methodBadge}>{m}</span>
                ))}
              </div>

              <div className={styles.exerciseList}>
                <div className={styles.listTitle}>Mouvements clés :</div>
                <ul>
                  {session.exercises.map((ex, i) => (
                    <li key={i}>{ex}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        
        {frequency === 3 && (
          <p className={styles.adaptNote}>
            *En format 3x par semaine, les séances sont adaptées pour toucher chaque groupe musculaire avec la bonne intensité (ex: Full Body / Upper / Lower).
          </p>
        )}
      </div>
    </section>
  );
}
