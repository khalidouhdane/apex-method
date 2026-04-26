'use client';

import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import styles from './HeroScroll.module.css';

/* ============================
   Frame Processor Constants
   (migrated from config.js)
   ============================ */
const FRAME_COUNT = 97;
const CANVAS_WIDTH = 1080;
const CANVAS_HEIGHT = 1920;

/**
 * HeroScroll — Scroll-Pinned 3-Phase Canvas Sequence
 *
 * Character frames: 97 green-screen PNGs, chroma-keyed at runtime,
 * drawn to a <canvas>, scrubbed by ScrollTrigger.
 *
 * Phase 1: Three hero text blocks
 * Phase 2: Glassmorphism stat cards
 * Phase 3: Pillar cards
 */
export default function HeroScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const characterRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);
  const phaseTextRef = useRef<HTMLDivElement>(null);
  const phaseStatsRef = useRef<HTMLDivElement>(null);
  const phasePillarsRef = useRef<HTMLDivElement>(null);

  // Persistent frame storage (survives re-renders)
  const framesRef = useRef<(HTMLImageElement | null)[]>(new Array(FRAME_COUNT).fill(null));
  const frameObjRef = useRef({ frame: 0 });

  /* ============================
     Frame Processor
     (migrated from frame-processor.js)
     ============================ */
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas || !framesRef.current[index]) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(framesRef.current[index]!, 0, 0, canvas.width, canvas.height);
  }, []);

  const processFrame = useCallback((rawImg: HTMLImageElement, index: number, isFirst = false) => {
    // Offscreen canvas for chroma keying
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = CANVAS_WIDTH;
    tempCanvas.height = CANVAS_HEIGHT;
    const tCtx = tempCanvas.getContext('2d', { willReadFrequently: true });
    if (!tCtx) return;

    tCtx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    tCtx.drawImage(rawImg, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    const imgData = tCtx.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    const data = imgData.data;

    // Chroma Key: remove green-screen background
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i], g = data[i + 1], b = data[i + 2];
      if (g > 40 && g > r * 1.1 && g > b * 1.1) {
        const diff = g - Math.max(r, b);
        data[i + 3] = diff > 25 ? 0 : Math.max(0, 255 - diff * 10);
        if (data[i + 3] > 0) data[i + 1] = Math.min(g, Math.floor((r + b) / 2));
      }
    }
    tCtx.putImageData(imgData, 0, 0);

    const processed = new Image();
    processed.onload = () => {
      framesRef.current[index] = processed;
      if (isFirst) {
        // Hide placeholder, show canvas with first frame
        if (placeholderRef.current) placeholderRef.current.style.display = 'none';
        if (canvasRef.current) canvasRef.current.style.display = 'block';
        drawFrame(0);
      }
    };
    processed.src = tempCanvas.toDataURL('image/png');
  }, [drawFrame]);

  const preloadFrames = useCallback(() => {
    // Load frame 1 first (shows character immediately)
    const firstImg = new Image();
    firstImg.src = '/Assets/frames/ezgif-frame-001.png';
    firstImg.onload = () => {
      processFrame(firstImg, 0, true);
      // Then lazy-load remaining 96 frames
      for (let i = 2; i <= FRAME_COUNT; i++) {
        const img = new Image();
        img.src = `/Assets/frames/ezgif-frame-${String(i).padStart(3, '0')}.png`;
        img.onload = () => processFrame(img, i - 1);
      }
    };
  }, [processFrame]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // ===== 1. ENTRANCE ANIMATION (plays once on mount) =====
      const headlines = section.querySelectorAll('[data-split]');
      const textBlocks = section.querySelectorAll(`.${styles.heroTextBlock}`);
      const pills = section.querySelectorAll(`.${styles.textPill}`);
      const trailNames = ['.tx-b1', '.tx-f1', '.tx-b2', '.tx-f2', '.tx-b3', '.tx-f3'];

      // Initial states
      gsap.set(textBlocks, { opacity: 1 });
      gsap.set(pills, { opacity: 0, y: 15, scale: 0.9 });
      gsap.set(headlines, { opacity: 0, y: 40 });
      gsap.set(`.${styles.statCard}, .${styles.pillarCard}`, { opacity: 0, scale: 0.95 });

      // CRITICAL: Lock character + rings hidden & anchored to bottom before timeline starts
      // (prevents FOUC during 3.5s loader delay — matches legacy main.js initial state)
      gsap.set([characterRef.current, `.${styles.orbitalRings}`], {
        autoAlpha: 0,
        scale: 0.6,
        transformOrigin: 'center bottom',
      });

      const entryTl = gsap.timeline({
        delay: 3.5, // Wait for loader to finish
        onComplete: () => {
          initScrollSequence();
        },
      });

      // Character + orbital rings entrance (grows from bottom, matching legacy)
      entryTl.fromTo(
        [characterRef.current, `.${styles.orbitalRings}`],
        { autoAlpha: 0, scale: 0.6, transformOrigin: 'center bottom' },
        { autoAlpha: 1, scale: 0.75, duration: 1.5, ease: 'power3.out', transformOrigin: 'center bottom' },
        0
      );

      // DrawSVG trail entrance — staggered head/tail draw
      trailNames.forEach((path, i) => {
        const start = 0.4 + i * 0.15;
        const proxy = { head: 0, tail: 0 };
        const elements = section.querySelectorAll(path);
        if (!elements.length) return;
        gsap.set(elements, { drawSVG: '0% 0%', opacity: 1 });

        entryTl.to(
          proxy,
          {
            head: 100,
            duration: 0.8,
            ease: 'power2.inOut',
            onUpdate: () => gsap.set(elements, { drawSVG: `${proxy.tail}% ${proxy.head}%` }),
          },
          start
        );
        entryTl.to(
          proxy,
          {
            tail: 100,
            duration: 0.8,
            ease: 'power2.inOut',
            onUpdate: () => gsap.set(elements, { drawSVG: `${proxy.tail}% ${proxy.head}%` }),
          },
          start + 0.4
        );
        entryTl.to(elements, { opacity: 0, duration: 0.3 }, start + 1.2);
      });

      // Phase 1 text entrance — pills then headlines
      entryTl.to(pills[0], { opacity: 1, y: 0, scale: 1 }, 0.5);
      entryTl.to(headlines[0], { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.6);

      entryTl.to(pills[1], { opacity: 1, y: 0, scale: 1 }, 0.7);
      entryTl.to(headlines[1], { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.8);

      entryTl.to(pills[2], { opacity: 1, y: 0, scale: 1 }, 0.9);
      entryTl.to(headlines[2], { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 1.0);

      // ===== 2. SCROLL SEQUENCE (scrubbed by scroll position) =====
      function initScrollSequence() {
        const phaseText = phaseTextRef.current;
        const phaseStats = phaseStatsRef.current;
        const phasePillars = phasePillarsRef.current;
        if (!phaseText || !phaseStats || !phasePillars) return;

        const mainTl = gsap.timeline({
          scrollTrigger: {
            id: 'heroScroll',
            trigger: section,
            start: 'top top',
            end: '+=180%',
            pin: true,
            scrub: 0.6,
          },
        });

        // Frame scrubbing: animate through 97 chroma-keyed frames
        mainTl.to(
          frameObjRef.current,
          {
            frame: FRAME_COUNT - 1,
            snap: 'frame',
            ease: 'none',
            duration: 6,
            onUpdate: () => drawFrame(Math.floor(frameObjRef.current.frame)),
          },
          0
        );

        // Scale character during scroll
        mainTl.to(
          [characterRef.current, `.${styles.orbitalRings}`],
          { scale: 0.85, duration: 6, ease: 'none' },
          0
        );

        // Fade out Phase 1 text
        mainTl.to(phaseText, { opacity: 0, duration: 1 }, 0);

        // DrawSVG orbital trails during scroll
        gsap.set(trailNames.map(t => section!.querySelectorAll(t)).flat(), {
          opacity: 1,
          drawSVG: '0% 0%',
        });
        trailNames.forEach((t, i) => {
          const els = section!.querySelectorAll(t);
          if (!els.length) return;
          mainTl.to(els, { drawSVG: '0% 100%', duration: 1.2, ease: 'power1.inOut' }, 0.2 + i * 0.4);
        });

        // Phase 2: Stat cards reveal
        mainTl.set(phaseStats, { opacity: 1 }, 1.2);
        mainTl.fromTo(
          section!.querySelectorAll(`.${styles.statCard}`),
          { opacity: 0, scale: 0.85, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 1.2, stagger: 0.2, ease: 'expo.out' },
          1.3
        );
        mainTl.fromTo(
          section!.querySelectorAll(`.${styles.statCard} .${styles.revealMask} > *`),
          { y: '110%' },
          { y: '0%', duration: 1, stagger: 0.1, ease: 'power4.out' },
          1.5
        );
        mainTl.to(phaseStats, { opacity: 0, duration: 0.8 }, 3.2);

        // Phase 3: Pillar cards reveal
        mainTl.set(phasePillars, { opacity: 1 }, 3.8);
        mainTl.fromTo(
          section!.querySelectorAll(`.${styles.pillarCard}`),
          { opacity: 0, scale: 0.9, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 1.2, stagger: 0.15, ease: 'expo.out' },
          3.9
        );
        mainTl.fromTo(
          section!.querySelectorAll(`.${styles.phIcon}`),
          { opacity: 0, scale: 0.5 },
          { opacity: 1, scale: 1, duration: 0.8, stagger: 0.15, ease: 'back.out(1.7)' },
          4.1
        );
        mainTl.fromTo(
          section!.querySelectorAll(`.${styles.pillarCard} .${styles.revealMask} > *`),
          { y: '110%' },
          { y: '0%', duration: 1, stagger: 0.08, ease: 'power4.out' },
          4.3
        );
      }

      // Start preloading frames (chroma-keyed canvas)
      preloadFrames();
    }, sectionRef);

    return () => ctx.revert();
  }, [drawFrame, preloadFrames]);

  return (
    <section ref={sectionRef} id="hero-scroll" className={styles.heroScroll}>
      <div ref={sceneRef} className={styles.heroScene}>

        {/* ===== ORBITAL RINGS — BACK HALF ===== */}
        <div className={`${styles.orbitalRings} ${styles.orbitalBack}`}>
          <svg viewBox="0 0 1080 1920" preserveAspectRatio="xMidYMax meet" className={styles.trailSvg}>
            <defs>
              <linearGradient id="back-core-grad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1080" y2="0">
                <stop offset="10%" stopColor="#A66840" stopOpacity="0.1" />
                <stop offset="50%" stopColor="#CC8E66" stopOpacity="0.5" />
                <stop offset="90%" stopColor="#A66840" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            {/* B1: Top loop behind neck */}
            <path className={`tx-b1 ${styles.trailGlow2}`} d="M 1130 500 C 1130 400, -50 550, -50 650" stroke="url(#back-core-grad)" />
            <path className={`tx-b1 ${styles.trailCore}`} d="M 1130 500 C 1130 400, -50 550, -50 650" stroke="url(#back-core-grad)" />
            {/* B2: Middle loop behind torso */}
            <path className={`tx-b2 ${styles.trailGlow2}`} d="M 1130 800 C 1130 700, -50 850, -50 950" stroke="url(#back-core-grad)" />
            <path className={`tx-b2 ${styles.trailCore}`} d="M 1130 800 C 1130 700, -50 850, -50 950" stroke="url(#back-core-grad)" />
            {/* B3: Bottom loop behind legs */}
            <path className={`tx-b3 ${styles.trailGlow2}`} d="M 1130 1100 C 1130 1000, -50 1150, -50 1250" stroke="url(#back-core-grad)" />
            <path className={`tx-b3 ${styles.trailCore}`} d="M 1130 1100 C 1130 1000, -50 1150, -50 1250" stroke="url(#back-core-grad)" />
          </svg>
        </div>

        {/* ===== CHARACTER — Canvas + Fallback Placeholder ===== */}
        <div ref={characterRef} className={styles.characterWrap}>
          {/* Canvas: displays chroma-keyed frames, hidden until first frame loads */}
          <canvas
            ref={canvasRef}
            className={styles.heroCanvas}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            style={{ display: 'none' }}
          />

          {/* Placeholder silhouette: shown until real frames arrive */}
          <div ref={placeholderRef} className={styles.characterPlaceholder}>
            <svg viewBox="0 0 500 750" className={styles.silhouetteSvg} aria-hidden="true">
              <defs>
                <linearGradient id="silGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2a2420" />
                  <stop offset="40%" stopColor="#1e1a16" />
                  <stop offset="100%" stopColor="#121010" />
                </linearGradient>
                <radialGradient id="edgeGlow" cx="50%" cy="30%" r="60%">
                  <stop offset="0%" stopColor="rgba(204,142,102,0.06)" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>
              </defs>
              {/* Body / Hoodie */}
              <path d="M 100 280 Q 100 235 170 235 L 220 235 L 220 230 L 280 230 L 280 235 L 330 235 Q 400 235 400 280 L 410 750 L 90 750 Z" fill="url(#silGrad)" />
              {/* Neck */}
              <rect x="222" y="197" width="56" height="38" rx="12" fill="url(#silGrad)" />
              {/* Head */}
              <ellipse cx="250" cy="135" rx="62" ry="72" fill="url(#silGrad)" />
              {/* Headphone band */}
              <path d="M 188 105 Q 250 30 312 105" stroke="rgba(204,142,102,0.15)" strokeWidth="5" fill="none" strokeLinecap="round" />
              {/* Headphone cups */}
              <rect x="168" y="100" width="28" height="42" rx="10" fill="#1a1714" stroke="rgba(204,142,102,0.1)" strokeWidth="1" />
              <rect x="304" y="100" width="28" height="42" rx="10" fill="#1a1714" stroke="rgba(204,142,102,0.1)" strokeWidth="1" />
              {/* Hoodie collar line */}
              <path d="M 220 235 L 250 280 L 280 235" stroke="rgba(204,142,102,0.08)" strokeWidth="1.5" fill="none" />
              {/* Glow overlay */}
              <ellipse cx="250" cy="300" rx="200" ry="300" fill="url(#edgeGlow)" />
            </svg>
            <div className={styles.placeholderLabel}>
              <span className={styles.placeholderInitials}>AM</span>
              <span className={styles.placeholderNote}>Alexandre Monteiro</span>
            </div>
          </div>
        </div>

        {/* ===== ORBITAL RINGS — FRONT HALF ===== */}
        <div className={`${styles.orbitalRings} ${styles.orbitalFront}`}>
          <svg viewBox="0 0 1080 1920" preserveAspectRatio="xMidYMax meet" className={styles.trailSvg}>
            <defs>
              <linearGradient id="front-core-grad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1080" y2="0">
                <stop offset="12%" stopColor="#CC8E66" stopOpacity="0.2" />
                <stop offset="25%" stopColor="#FFF2E0" stopOpacity="1" />
                <stop offset="75%" stopColor="#FFF2E0" stopOpacity="1" />
                <stop offset="88%" stopColor="#CC8E66" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="front-glow-grad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1080" y2="0">
                <stop offset="10%" stopColor="#A66840" stopOpacity="0" />
                <stop offset="25%" stopColor="#E6B599" stopOpacity="0.8" />
                <stop offset="75%" stopColor="#E6B599" stopOpacity="0.8" />
                <stop offset="90%" stopColor="#A66840" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="front-wide-grad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1080" y2="0">
                <stop offset="0%" stopColor="#A66840" stopOpacity="0" />
                <stop offset="20%" stopColor="#CC8E66" stopOpacity="0.5" />
                <stop offset="80%" stopColor="#CC8E66" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#A66840" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* F1: Front loop across chest */}
            <path className={`tx-f1 ${styles.trailGlow3}`} d="M -50 650 C -50 750, 1130 700, 1130 800" stroke="url(#front-wide-grad)" />
            <path className={`tx-f1 ${styles.trailGlow2}`} d="M -50 650 C -50 750, 1130 700, 1130 800" stroke="url(#front-glow-grad)" />
            <path className={`tx-f1 ${styles.trailGlow1}`} d="M -50 650 C -50 750, 1130 700, 1130 800" stroke="url(#front-glow-grad)" />
            <path className={`tx-f1 ${styles.trailCore}`} d="M -50 650 C -50 750, 1130 700, 1130 800" stroke="url(#front-core-grad)" />
            <path className={`tx-f1 ${styles.trailStardust}`} d="M -50 650 C -50 750, 1130 700, 1130 800" />
            {/* F2: Front loop across waist */}
            <path className={`tx-f2 ${styles.trailGlow3}`} d="M -50 950 C -50 1050, 1130 1000, 1130 1100" stroke="url(#front-wide-grad)" />
            <path className={`tx-f2 ${styles.trailGlow2}`} d="M -50 950 C -50 1050, 1130 1000, 1130 1100" stroke="url(#front-glow-grad)" />
            <path className={`tx-f2 ${styles.trailGlow1}`} d="M -50 950 C -50 1050, 1130 1000, 1130 1100" stroke="url(#front-glow-grad)" />
            <path className={`tx-f2 ${styles.trailCore}`} d="M -50 950 C -50 1050, 1130 1000, 1130 1100" stroke="url(#front-core-grad)" />
            <path className={`tx-f2 ${styles.trailStardust}`} d="M -50 950 C -50 1050, 1130 1000, 1130 1100" />
            {/* F3: Bottom trail */}
            <path className={`tx-f3 ${styles.trailGlow2}`} d="M -50 1250 C -50 1350, 1130 1300, 1130 1400" stroke="url(#front-glow-grad)" />
            <path className={`tx-f3 ${styles.trailCore}`} d="M -50 1250 C -50 1350, 1130 1300, 1130 1400" stroke="url(#front-core-grad)" />
          </svg>
        </div>

        {/* ===== PHASE 1: HERO TEXT ===== */}
        <div ref={phaseTextRef} className={`${styles.phase} ${styles.phaseText}`} id="phase-text">
          <div className={`${styles.heroTextBlock} ${styles.textTopCenter}`}>
            <span className={styles.textPill}>
              <span className={styles.pillDot} />
              L&apos;identification
            </span>
            <h2 className={styles.heroHeadline} data-split>
              UN CORPS <em>FORT</em>
            </h2>
          </div>
          <div className={`${styles.heroTextBlock} ${styles.textRightMiddle}`}>
            <span className={styles.textPill}>
              <span className={styles.pillDot} />
              L&apos;identification
            </span>
            <h2 className={styles.heroHeadline} data-split>
              UN MENTAL <em>SOLIDE</em>
            </h2>
          </div>
          <div className={`${styles.heroTextBlock} ${styles.textBottomLeft}`}>
            <span className={styles.textPill}>
              <span className={styles.pillDot} />
              L&apos;identification
            </span>
            <h2 className={styles.heroHeadline} data-split>
              UNE VIE <em>MAÎTRISÉE</em>
            </h2>
          </div>
        </div>

        {/* ===== PHASE 2: STAT CARDS ===== */}
        <div ref={phaseStatsRef} className={`${styles.phase} ${styles.phaseStats}`} id="phase-stats">
          <div className={`${styles.glassCard} ${styles.statCard} ${styles.cardTopRight}`}>
            <div className={styles.cardPattern} />
            <div className={styles.cardContent}>
              <div className={styles.revealMask}>
                <span className={styles.statBig}>
                  90 <span className={styles.statUnit}>JOURS</span>
                </span>
              </div>
              <div className={styles.revealMask}>
                <span className={styles.statDesc}>DE TRANSFORMATION</span>
              </div>
            </div>
          </div>
          <div className={`${styles.glassCard} ${styles.statCard} ${styles.cardLeftMiddle}`}>
            <div className={styles.cardPattern} />
            <div className={styles.cardContent}>
              <div className={styles.revealMask}>
                <span className={styles.statBig}>230+</span>
              </div>
              <div className={styles.revealMask}>
                <span className={styles.statDesc}>VIDÉOS D&apos;ENTRAÎNEMENT</span>
              </div>
            </div>
          </div>
          <div className={`${styles.glassCard} ${styles.statCard} ${styles.cardBottomRight}`}>
            <div className={styles.cardPattern} />
            <div className={styles.cardContent}>
              <div className={styles.revealMask}>
                <span className={styles.statBig}>100%</span>
              </div>
              <div className={styles.revealMask}>
                <span className={styles.statDesc}>MACROS PERSONNALISÉS</span>
              </div>
            </div>
          </div>
        </div>

        {/* ===== PHASE 3: PILLAR CARDS ===== */}
        <div ref={phasePillarsRef} className={`${styles.phase} ${styles.phasePillars}`} id="phase-pillars">
          <div className={`${styles.glassCard} ${styles.pillarCard} ${styles.cardTL}`}>
            <div className={styles.cardPattern} />
            <div className={styles.cardContent}>
              <div className={styles.phIcon}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6.5 6.5a4 4 0 1 1 5 6.2l-.3.2A4 4 0 0 1 6.5 6.5Zm7 0a4 4 0 0 1 5.3 5.8M7.5 14.1A6 6 0 0 0 3 20h8m5-6a6 6 0 0 1 6 6h-6" />
                </svg>
              </div>
              <div className={styles.revealMask}><h3>CORPS</h3></div>
              <div className={styles.revealMask}><p>Entraînements structurés. Supersets, circuits, AMRAP, TABATA.</p></div>
            </div>
          </div>

          <div className={`${styles.glassCard} ${styles.pillarCard} ${styles.cardTR}`}>
            <div className={styles.cardPattern} />
            <div className={styles.cardContent}>
              <div className={styles.phIcon}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <div className={styles.revealMask}><h3>VIE</h3></div>
              <div className={styles.revealMask}><p>Deviens le pilier que ta famille mérite. Père. Homme. Leader.</p></div>
            </div>
          </div>

          <div className={`${styles.glassCard} ${styles.pillarCard} ${styles.cardBL}`}>
            <div className={styles.cardPattern} />
            <div className={styles.cardContent}>
              <div className={styles.phIcon}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </div>
              <div className={styles.revealMask}><h3>MENTAL</h3></div>
              <div className={styles.revealMask}><p>Discipline. Constance. Résilience. Le changement commence dans la tête.</p></div>
            </div>
          </div>

          <div className={`${styles.glassCard} ${styles.pillarCard} ${styles.cardBR}`}>
            <div className={styles.cardPattern} />
            <div className={styles.cardContent}>
              <div className={styles.phIcon}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <div className={styles.revealMask}><h3>NUTRITION</h3></div>
              <div className={styles.revealMask}><p>Plans 100% personnalisés. Macros, recettes, grammages exacts.</p></div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
