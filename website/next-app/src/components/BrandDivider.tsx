'use client';

import { useEffect, useRef, Fragment } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './BrandDivider.module.css';

const BrandIcon = () => (
  <svg className={styles.icon} viewBox="0 0 66 20">
    <path d="M11.7886 0H19.0049V20H8.99294L11.6787 15.342H14.5577V7.19908L5.64805 20H0L12.9704 1.3718L11.7886 0Z" fill="currentColor"/>
  </svg>
);

const STATEMENTS = [
  { text: "L'ADN DE LA ", highlight: "MÉTHODE", after: "" },
  { text: "LA TRANSFORMATION ", highlight: "ABSOLUE", after: "" },
  { text: "FORCE • ", highlight: "MENTAL", after: " • DISCIPLINE" },
  { text: "CONSTELLATION ", highlight: "APEX", after: "" },
  { text: "L'ÉLITE DU ", highlight: "PHYSIQUE", after: "" },
  { text: "DÉPASSER SES ", highlight: "LIMITES", after: "" },
];

export default function BrandDivider() {
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const track = trackRef.current;
    if (!track) return;

    const ctx = gsap.context(() => {
      // Infinite scroll: translate xPercent by -50% (since content is doubled)
      const loop = gsap.to(track, {
        xPercent: -50,
        repeat: -1,
        duration: 60,
        ease: 'none',
      });

      // Velocity-based skew effect
      const proxy = { skew: 0 };
      const skewSetter = gsap.quickSetter(track, 'skewX', 'deg');
      const clamp = gsap.utils.clamp(-15, 15);

      ScrollTrigger.create({
        onUpdate: (self) => {
          const skew = clamp(self.getVelocity() / -300);
          if (Math.abs(skew) > Math.abs(proxy.skew)) {
            proxy.skew = skew;
            gsap.to(proxy, {
              skew: 0,
              duration: 0.8,
              ease: 'power3',
              overwrite: true,
              onUpdate: () => skewSetter(proxy.skew),
            });
          }
        },
      });

      // Speed up loop when scrolled into view
      gsap.to(loop, {
        timeScale: 1.5,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className={styles.bar}>
      <div ref={trackRef} className={styles.track}>
        {/* Render items twice for seamless loop */}
        {[...STATEMENTS, ...STATEMENTS].map((item, i) => (
          <Fragment key={i}>
            <span className={styles.statement}>
              {item.text}
              <span className={styles.highlight}>{item.highlight}</span>
              {item.after}
            </span>
            <BrandIcon />
          </Fragment>
        ))}
      </div>
    </div>
  );
}
