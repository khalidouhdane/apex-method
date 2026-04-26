'use client';

import { useEffect, useRef, useCallback, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import styles from './Loader.module.css';

// Prevent Next.js SSR warnings for useLayoutEffect
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

interface LoaderProps {
  onComplete?: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const loaderRef = useRef<HTMLDivElement>(null);
  const logoSvgRef = useRef<SVGSVGElement>(null);
  const percentRef = useRef<HTMLDivElement>(null);
  const trailLeftRef = useRef<SVGPathElement>(null);
  const trailRightRef = useRef<SVGPathElement>(null);
  const hasPlayed = useRef(false);

  const runAnimation = useCallback(() => {
    if (hasPlayed.current) return;
    hasPlayed.current = true;

    gsap.registerPlugin(DrawSVGPlugin);

    const loader = loaderRef.current;
    const loaderSvg = logoSvgRef.current;
    const logoPaths = loaderSvg?.querySelectorAll(`.${styles.loaderLogoPath}`);
    const trailPaths = [trailLeftRef.current, trailRightRef.current].filter(Boolean) as SVGPathElement[];
    const percent = percentRef.current;

    if (!loader || !loaderSvg || !logoPaths || !percent) return;

    const tl = gsap.timeline();

    // Initial states
    gsap.set(logoPaths, { opacity: 0 });
    gsap.set(percent, { opacity: 1 });
    gsap.set(trailPaths, { drawSVG: '0% 0%', opacity: 0 });

    // Trail lines draw in
    tl.to(trailPaths, { opacity: 1, duration: 0.1 }, 0.2);
    tl.fromTo(
      trailPaths,
      { drawSVG: '0% 0%' },
      { drawSVG: '0% 100%', duration: 1.3, ease: 'power2.inOut' },
      0.2
    );
    tl.to(trailPaths, { filter: 'drop-shadow(0 0 15px #CC8E66)', strokeWidth: 4, duration: 0.3 }, 1.2);
    tl.to(trailPaths, { opacity: 0, duration: 0.4 }, 1.5);

    // Percentage counter
    const p = { val: 0 };
    tl.to(
      p,
      {
        val: 100,
        duration: 1.5,
        ease: 'power1.inOut',
        onUpdate: () => {
          if (percent) percent.innerText = Math.round(p.val) + '%';
        },
      },
      0.1
    );

    // Logo letter-by-letter flicker reveal
    logoPaths.forEach((path, i) => {
      const d = 0.3 + i * 0.1;
      tl.to(path, { opacity: 0.2, duration: 0.1 }, d);
      tl.to(path, { opacity: 1, duration: 0.05 }, d + 0.2);
      tl.to(path, { opacity: 0.5, duration: 0.05 }, d + 0.25);
      tl.to(path, { opacity: 1, duration: 0.1 }, d + 0.3);
    });

    // Fade percentage
    tl.to(percent, { opacity: 0, duration: 0.4 }, 1.8);

    // Morph logo from center to navbar position
    tl.add(() => {
      const navLogo = document.querySelector('[class*="navLogo"]') as HTMLElement;
      if (!navLogo || !loaderSvg) return;

      const s = loaderSvg.getBoundingClientRect();
      const e = navLogo.getBoundingClientRect();

      gsap.to(loaderSvg, {
        x: e.left + e.width / 2 - (s.left + s.width / 2),
        y: e.top + e.height / 2 - (s.top + s.height / 2),
        scale: e.width / s.width,
        duration: 0.9,
        ease: 'power4.inOut',
      });
    }, 2.0);

    // Fade out loader
    tl.to(loader, {
      opacity: 0,
      duration: 0.5,
      onStart: () => {
        // Show navbar
        const nav = document.getElementById('nav');
        const navPaths = nav?.querySelectorAll('svg path');
        if (nav) {
          gsap.set(nav, { visibility: 'visible', opacity: 1 });
        }
        if (navPaths) {
          gsap.set(navPaths, { opacity: 1, y: 0 });
        }
        if (loaderSvg) {
          gsap.set(loaderSvg, { opacity: 0 });
        }
      },
      onComplete: () => {
        if (loader) {
          loader.style.display = 'none';
          loader.classList.add(styles.loaderHidden);
        }
        (window as any).isLoaderDone = true;
        window.dispatchEvent(new Event('loaderComplete'));
        onComplete?.();
      },
    }, 2.9);
  }, [onComplete]);

  useIsomorphicLayoutEffect(() => {
    const hasSeen = sessionStorage.getItem('hasSeenLoader');
    if (hasSeen === 'true') {
      if (loaderRef.current) {
        loaderRef.current.style.display = 'none';
        loaderRef.current.classList.add(styles.loaderHidden);
      }
      const nav = document.getElementById('nav');
      if (nav) {
        gsap.set(nav, { visibility: 'visible', opacity: 1 });
        const navPaths = nav.querySelectorAll('svg path');
        if (navPaths) gsap.set(navPaths, { opacity: 1, y: 0 });
      }
      (window as any).isLoaderDone = true;
      window.dispatchEvent(new Event('loaderComplete'));
    } else {
      sessionStorage.setItem('hasSeenLoader', 'true');
      const timer = setTimeout(runAnimation, 100);
      return () => clearTimeout(timer);
    }
  }, [runAnimation]);

  return (
    <div ref={loaderRef} className={styles.loader} id="loader">
      {/* Background trail lines */}
      <div className={styles.trailContainer}>
        <svg
          viewBox="0 0 1000 1000"
          preserveAspectRatio="none"
          className={styles.trailSvg}
        >
          <defs>
            <linearGradient id="trail-grad" x1="0%" y1="100%" x2="50%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="100%" stopColor="#CC8E66" />
            </linearGradient>
          </defs>
          <path
            ref={trailLeftRef}
            className={styles.trailPath}
            d="M 200 800 L 500 200"
            fill="none"
            stroke="url(#trail-grad)"
            strokeWidth="2"
          />
          <path
            ref={trailRightRef}
            className={styles.trailPath}
            d="M 800 800 L 500 200"
            fill="none"
            stroke="url(#trail-grad)"
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* Logo + Percent */}
      <div className={styles.loaderInner}>
        <svg
          ref={logoSvgRef}
          width="140"
          height="42"
          viewBox="0 0 66 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.loaderLogoSvg}
        >
          <path
            className={styles.loaderLogoPath}
            d="M11.7886 0H19.0049V20H8.99294L11.6787 15.342H14.5577V7.19908L5.64805 20H0L12.9704 1.3718L11.7886 0Z"
            fill="white"
          />
          <path
            className={styles.loaderLogoPath}
            d="M29.5851 0H21.1414L22.7665 1.88766V20H27.5243V12.0214H29.6154C31.5246 12.0214 33.0398 11.475 34.1573 10.3745C35.2748 9.2778 35.8316 7.80283 35.8316 5.95338C35.8316 4.10394 35.3051 2.57929 34.2558 1.54757C33.2065 0.515858 31.6496 0 29.5851 0ZM30.445 7.35575C30.1419 7.69201 29.7214 7.86397 29.1835 7.86397H27.5243V4.16507H29.1835C29.7214 4.16507 30.1419 4.32556 30.445 4.65418C30.7518 4.9828 30.9033 5.42606 30.9033 5.98395C30.9033 6.54184 30.7518 7.01949 30.445 7.35575Z"
            fill="white"
          />
          <path
            className={styles.loaderLogoPath}
            d="M41.9607 15.491H46.658V20H37.1801V1.88766L35.5513 0H46.5746V4.50898H41.9607V7.60413H46.4345V12.052H41.9607V15.491Z"
            fill="white"
          />
          <path
            className={styles.loaderLogoPath}
            d="M66 20H60.4694L56.5449 13.9014C55.9312 14.807 55.3592 15.6859 54.8251 16.5304C54.291 17.3787 53.8137 18.1391 53.3932 18.8154C52.9727 19.488 52.7227 19.8854 52.647 20H47.2906L53.7948 9.68284L47.5217 0H53.3364L56.8025 5.49102L60.155 0H65.7689L59.5527 9.82805L66 20Z"
            fill="white"
          />
        </svg>
        <div ref={percentRef} className={styles.loaderPercent}>
          0%
        </div>
      </div>
    </div>
  );
}
