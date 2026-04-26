'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './BrandDivider.module.css';

const ITEMS = [
  'DISCIPLINE', 'FORCE', 'NUTRITION', 'MENTAL',
  'STRUCTURE', 'RÉSULTATS', 'APEX',
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
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <span key={i} className={styles.item}>
            <span className={styles.dot}>◆</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
