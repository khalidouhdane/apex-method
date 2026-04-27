'use client';

import { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import styles from './QuizWizard.module.css';
import {
  getRecommendation,
  type Gender,
  type Experience,
  type Goal,
  type Availability,
  type Location,
  type HealthConstraint,
  type QuizAnswers,
  type QuizResult as QuizResultType,
} from '@/lib/quiz-engine';

import StepGender from './steps/StepGender';
import StepProfile from './steps/StepProfile';
import StepExperience from './steps/StepExperience';
import StepGoal from './steps/StepGoal';
import StepAvailability from './steps/StepAvailability';
import StepLocation from './steps/StepLocation';
import StepFather from './steps/StepFather';
import StepHealth from './steps/StepHealth';
import QuizResult from './QuizResult';

// ── Step IDs ──

type StepId =
  | 'gender'
  | 'profile'
  | 'experience'
  | 'goal'
  | 'availability'
  | 'location'
  | 'father'
  | 'health';

function getSteps(gender: Gender | null): StepId[] {
  const base: StepId[] = [
    'gender',
    'profile',
    'experience',
    'goal',
    'availability',
    'location',
  ];

  // Father question only for men
  if (gender === 'homme') {
    base.push('father');
  }

  base.push('health');
  return base;
}

// Auto-advance steps (single-select, no "Suivant" button needed)
const AUTO_ADVANCE_STEPS: StepId[] = [
  'gender',
  'experience',
  'goal',
  'availability',
  'location',
  'father',
];

// ── Default State ──

interface QuizState {
  gender: Gender | null;
  age: number;
  weight: number;
  height: number;
  experience: Experience | null;
  goal: Goal | null;
  availability: Availability | null;
  location: Location | null;
  isFather: boolean | null;
  healthConstraints: HealthConstraint[];
}

const DEFAULT_STATE: QuizState = {
  gender: null,
  age: 30,
  weight: 80,
  height: 175,
  experience: null,
  goal: null,
  availability: null,
  location: null,
  isFather: null,
  healthConstraints: [],
};

// ── Component ──

export default function QuizWizard() {
  const [state, setState] = useState<QuizState>(DEFAULT_STATE);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [result, setResult] = useState<QuizResultType | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const stepRef = useRef<HTMLDivElement>(null);

  const steps = getSteps(state.gender);
  const currentStep = steps[currentIndex];
  const totalSteps = steps.length;
  const isLastStep = currentIndex === totalSteps - 1;
  const showResult = result !== null;

  // ── Transitions ──

  const animateOut = useCallback((): Promise<void> => {
    return new Promise((resolve) => {
      if (!stepRef.current) {
        resolve();
        return;
      }
      gsap.to(stepRef.current, {
        opacity: 0,
        y: -30,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: resolve,
      });
    });
  }, []);

  const animateIn = useCallback(() => {
    if (!stepRef.current) return;
    gsap.fromTo(
      stepRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }
    );
  }, []);

  const goToStep = useCallback(
    async (nextIndex: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      await animateOut();
      setCurrentIndex(nextIndex);
      // Wait for React to render the new step
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          animateIn();
          setIsTransitioning(false);
        });
      });
    },
    [isTransitioning, animateOut, animateIn]
  );

  const goNext = useCallback(() => {
    if (isLastStep) {
      // Compute result
      const answers: QuizAnswers = {
        gender: state.gender!,
        age: state.age,
        weight: state.weight,
        height: state.height,
        experience: state.experience!,
        goal: state.goal!,
        availability: state.availability!,
        location: state.location!,
        isFather: state.gender === 'homme' ? !!state.isFather : false,
        healthConstraints: state.healthConstraints,
      };

      (async () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        await animateOut();
        setResult(getRecommendation(answers));
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            animateIn();
            setIsTransitioning(false);
          });
        });
      })();
      return;
    }
    goToStep(currentIndex + 1);
  }, [
    isLastStep,
    currentIndex,
    state,
    goToStep,
    isTransitioning,
    animateOut,
    animateIn,
  ]);

  const goBack = useCallback(() => {
    if (currentIndex > 0) {
      goToStep(currentIndex - 1);
    }
  }, [currentIndex, goToStep]);

  // ── Auto-advance handler ──

  const handleAutoAdvance = useCallback(
    <T,>(setter: (v: T) => void, value: T) => {
      setter(value);
      // Delay to show selection feedback before advancing
      setTimeout(() => {
        if (isLastStep) {
          // Don't auto-advance the last step
          return;
        }
        goToStep(currentIndex + 1);
      }, 350);
    },
    [currentIndex, isLastStep, goToStep]
  );

  // ── Restart ──

  const handleRestart = useCallback(async () => {
    setIsTransitioning(true);
    await animateOut();
    setState(DEFAULT_STATE);
    setResult(null);
    setCurrentIndex(0);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        animateIn();
        setIsTransitioning(false);
      });
    });
  }, [animateOut, animateIn]);

  // ── Can proceed validation ──

  const canProceed = (): boolean => {
    switch (currentStep) {
      case 'gender':
        return state.gender !== null;
      case 'profile':
        return true; // Sliders always have values
      case 'experience':
        return state.experience !== null;
      case 'goal':
        return state.goal !== null;
      case 'availability':
        return state.availability !== null;
      case 'location':
        return state.location !== null;
      case 'father':
        return state.isFather !== null;
      case 'health':
        return true; // Can proceed with empty (means no constraints)
      default:
        return false;
    }
  };

  const isAutoAdvanceStep = AUTO_ADVANCE_STEPS.includes(currentStep);
  const progressPercent = showResult
    ? 100
    : ((currentIndex + 1) / totalSteps) * 100;

  // ── Render Step ──

  const renderStep = () => {
    switch (currentStep) {
      case 'gender':
        return (
          <StepGender
            value={state.gender}
            onChange={(v) =>
              handleAutoAdvance(
                (val: Gender) => setState((s) => ({ ...s, gender: val })),
                v
              )
            }
          />
        );
      case 'profile':
        return (
          <StepProfile
            age={state.age}
            weight={state.weight}
            height={state.height}
            onChangeAge={(v) => setState((s) => ({ ...s, age: v }))}
            onChangeWeight={(v) => setState((s) => ({ ...s, weight: v }))}
            onChangeHeight={(v) => setState((s) => ({ ...s, height: v }))}
          />
        );
      case 'experience':
        return (
          <StepExperience
            value={state.experience}
            onChange={(v) =>
              handleAutoAdvance(
                (val: Experience) => setState((s) => ({ ...s, experience: val })),
                v
              )
            }
          />
        );
      case 'goal':
        return (
          <StepGoal
            value={state.goal}
            onChange={(v) =>
              handleAutoAdvance(
                (val: Goal) => setState((s) => ({ ...s, goal: val })),
                v
              )
            }
          />
        );
      case 'availability':
        return (
          <StepAvailability
            value={state.availability}
            onChange={(v) =>
              handleAutoAdvance(
                (val: Availability) =>
                  setState((s) => ({ ...s, availability: val })),
                v
              )
            }
          />
        );
      case 'location':
        return (
          <StepLocation
            value={state.location}
            onChange={(v) =>
              handleAutoAdvance(
                (val: Location) => setState((s) => ({ ...s, location: val })),
                v
              )
            }
          />
        );
      case 'father':
        return (
          <StepFather
            value={state.isFather}
            onChange={(v) =>
              handleAutoAdvance(
                (val: boolean) => setState((s) => ({ ...s, isFather: val })),
                v
              )
            }
          />
        );
      case 'health':
        return (
          <StepHealth
            value={state.healthConstraints}
            onChange={(v) =>
              setState((s) => ({ ...s, healthConstraints: v }))
            }
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.quizShell} data-quiz-page>
      {/* Top Bar */}
      <div className={styles.topBar}>
        <Link href="/" className={styles.logo}>
          APEX METHOD
        </Link>
        <Link href="/" className={styles.closeBtn} aria-label="Fermer le quiz">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </Link>
      </div>

      {/* Progress Bar */}
      {!showResult && (
        <div className={styles.progressWrap}>
          <div className={styles.progressTrack}>
            <div
              className={styles.progressFill}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className={styles.progressMeta}>
            <span>
              Étape {currentIndex + 1} / {totalSteps}
            </span>
            <span>~2 min</span>
          </div>
        </div>
      )}

      {/* Step Content */}
      <div className={styles.stepArea}>
        <div className={styles.stepInner} ref={stepRef}>
          {showResult ? (
            <QuizResult result={result} onRestart={handleRestart} />
          ) : (
            renderStep()
          )}
        </div>
      </div>

      {/* Navigation */}
      {!showResult && (
        <div className={styles.navRow}>
          {currentIndex > 0 ? (
            <button
              type="button"
              className={styles.btnBack}
              onClick={goBack}
              disabled={isTransitioning}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Retour
            </button>
          ) : (
            <div />
          )}

          {!isAutoAdvanceStep && (
            <button
              type="button"
              className={`${styles.btnNext} ${isLastStep ? styles.btnNextFinal : ''}`}
              onClick={goNext}
              disabled={!canProceed() || isTransitioning}
            >
              {isLastStep ? 'Voir mon programme' : 'Suivant'}
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
