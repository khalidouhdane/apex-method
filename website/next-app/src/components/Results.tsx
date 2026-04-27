'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/dist/SplitText';
import styles from './Results.module.css';

const RESULTS = [
  {
    name: 'JOHN D.',
    program: 'ORION',
    story: '"Une transformation physique qui a redéfini mon mental. Alex m\'a donné les clés du succès."',
    stats: ['-10 kg', 'MG: 20% → 16%'],
    afterImg: '/images/results/after1.png',
    beforeImg: '/images/results/before1.png',
  },
  {
    name: 'MEHDI B.',
    program: 'ORION',
    story: '"La méthode Orion est d\'une efficacité redoutable. Je ne me suis jamais senti aussi fort."',
    stats: ['-12 kg en 90j', 'Programme Orion'],
    afterImg: '/images/results/after2.png',
    beforeImg: '/images/results/before2.png',
  },
  {
    name: 'THOMAS L.',
    program: 'PAPA STRONG',
    story: '"En tant que papa, Papa Strong m\'a permis de retrouver une forme athlétique pour mes enfants."',
    stats: ['Force multipliée', 'Discipline APEX'],
    afterImg: '/images/results/after1.png',
    beforeImg: '/images/results/before1.png',
  },
  {
    name: 'KARIM B.',
    program: 'PAPA STRONG',
    story: '"Père de 3 enfants. Papa Strong m\'a remis debout. Physiquement et mentalement."',
    stats: ['+8 kg muscles', 'Papa Strong'],
    afterImg: '/images/results/after2.png',
    beforeImg: '/images/results/before2.png',
  },
  {
    name: 'JULIEN P.',
    program: 'ORION',
    story: '"La discipline quotidienne a changé mon rapport à la nourriture et au sommeil."',
    stats: ['-10 kg', '90 Jours ORION'],
    afterImg: '/images/results/after1.png',
    beforeImg: '/images/results/before1.png',
  },
  {
    name: 'YOUSSEF K.',
    program: 'LÉO',
    story: '"Léo m\'a prouvé qu\'on peut se transformer n\'importe où. Les résultats sont là."',
    stats: ['-8 kg', 'Programme Léo'],
    afterImg: '/images/results/after2.png',
    beforeImg: '/images/results/before2.png',
  },
  {
    name: 'DAVID R.',
    program: 'ORION',
    story: '"De sédentaire à athlète. Le changement est radical."',
    stats: ['-15 kg', 'Transformation Totale'],
    afterImg: '/images/results/after1.png',
    beforeImg: '/images/results/before1.png',
  },
  {
    name: 'LUC M.',
    program: 'ORION',
    story: '"La rigueur d\'Alex est ce qui fait la différence. Pas de compromis."',
    stats: ['Puissance décuplée', 'Mentalité APEX'],
    afterImg: '/images/results/after2.png',
    beforeImg: '/images/results/before2.png',
  },
];

const ALL_FILTERS = ['TOUS', 'ORION', 'ATHENA', 'PAPA STRONG', 'LÉO'];
const FILTERS = ALL_FILTERS.filter(f => f === 'TOUS' || RESULTS.some(r => r.program === f));

export default function Results() {
  const [activeFilter, setActiveFilter] = useState('TOUS');
  const [activeIndex, setActiveIndex] = useState(0);
  
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const autoPlayTimer = useRef<NodeJS.Timeout | null>(null);
  
  const filterTrackRef = useRef<HTMLDivElement>(null);
  const sliderIndicatorRef = useRef<HTMLDivElement>(null);
  
  const isDragging = useRef(false);
  const startX = useRef(0);
  const currentX = useRef(0);
  
  const filteredResults = RESULTS.filter(
    r => activeFilter === 'TOUS' || r.program === activeFilter
  );
  
  const filteredLengthRef = useRef(filteredResults.length);
  filteredLengthRef.current = filteredResults.length;

  const startAutoPlay = useCallback(() => {
    if (autoPlayTimer.current) clearInterval(autoPlayTimer.current);
    autoPlayTimer.current = setInterval(() => {
      setActiveIndex(prev => {
        if (prev < filteredLengthRef.current - 1) return prev + 1;
        return 0; // loop back to start
      });
    }, 4000);
  }, []);

  const stopAutoPlay = useCallback(() => {
    if (autoPlayTimer.current) clearInterval(autoPlayTimer.current);
  }, []);

  // Handle Entrance Animation & Intersection
  useEffect(() => {
    if (typeof window === 'undefined' || !sectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger, SplitText);

    const ctx = gsap.context(() => {
      const title = sectionRef.current?.querySelector(`.${styles.title}`) as HTMLElement | null;
      const navBtnsEl = sectionRef.current?.querySelector(`.${styles.navButtons}`) as HTMLElement | null;
      const filterBtns = sectionRef.current?.querySelectorAll(`.${styles.filterBtn}`);
      const slider = sectionRef.current?.querySelector(`.${styles.sliderContainer}`) as HTMLElement | null;

      if (title && filterBtns && slider) {
        // 1. Temporarily switch to solid bronze so SplitText chars inherit a visible color
        title.style.background = 'none';
        title.style.webkitBackgroundClip = 'initial';
        title.style.webkitTextFillColor = 'initial';
        title.style.color = '#D18957';

        // 2. Now split — chars will have solid color, no gradient conflict
        const splitTitle = new SplitText(title, { type: 'chars' });

        // Pad each char to prevent italic edge clipping
        splitTitle.chars.forEach((c) => {
          const el = c as HTMLElement;
          el.style.paddingRight = '0.05em';
          el.style.marginRight = '-0.05em';
          el.style.display = 'inline-block';
          el.style.overflow = 'visible';
        });

        gsap.set(splitTitle.chars, { opacity: 0, y: 40, rotateX: -40 });
        gsap.set(filterBtns, { opacity: 0, y: 20 });
        if (navBtnsEl) gsap.set(navBtnsEl, { opacity: 0, y: 20 });
        gsap.set(slider, { opacity: 0, y: 60 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true,
            onEnter: () => startAutoPlay()
          }
        });

        tl.to(splitTitle.chars, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.7,
          stagger: 0.04,
          ease: 'power3.out',
          onComplete: () => {
            // 3. Revert SplitText — restores original DOM
            splitTitle.revert();
            // 4. Clear inline overrides so CSS module gradient takes over
            title.style.background = '';
            title.style.webkitBackgroundClip = '';
            title.style.webkitTextFillColor = '';
            title.style.color = '';
          }
        })
        .to(filterBtns, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.06,
          ease: 'power2.out'
        }, "-=0.3")
        .to(navBtnsEl ? [navBtnsEl] : [], {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: 'power2.out'
        }, "-=0.3")
        .to(slider, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out'
        }, "-=0.3");
      } else {
        // Fallback
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top 50%',
          onEnter: () => startAutoPlay(),
          once: true
        });
      }
    });

    return () => ctx.revert();
  }, []); // Only run once on mount

  // Handle slider indicator position
  const updateSliderPosition = useCallback(() => {
    if (!filterTrackRef.current || !sliderIndicatorRef.current) return;
    const activeBtn = filterTrackRef.current.querySelector(
      `.${styles.filterBtnActive}`
    ) as HTMLElement | null;
    if (!activeBtn) return;
    const indicator = sliderIndicatorRef.current;
    indicator.style.width = `${activeBtn.offsetWidth}px`;
    indicator.style.transform = `translateX(${activeBtn.offsetLeft - 4}px)`;
  }, []);

  useEffect(() => {
    const timer = setTimeout(updateSliderPosition, 60);
    return () => clearTimeout(timer);
  }, [activeFilter, updateSliderPosition]);

  // Reset index on filter change and restart autoplay
  useEffect(() => {
    setActiveIndex(0);
    startAutoPlay();
    return () => stopAutoPlay();
  }, [activeFilter, startAutoPlay, stopAutoPlay]);

  // Handle slide centering animation
  useEffect(() => {
    if (!trackRef.current || isDragging.current) return;
    
    const isMobile = window.innerWidth <= 768;
    const slideWidth = isMobile ? window.innerWidth * 0.85 : 551;
    const gap = isMobile ? 16 : 32;
    
    // Calculate offset to place active slide perfectly in center of screen
    const centerOffset = (window.innerWidth - slideWidth) / 2;
    const targetX = centerOffset - (activeIndex * (slideWidth + gap));
    
    gsap.to(trackRef.current, {
      x: targetX,
      duration: 0.8,
      ease: "power3.inOut",
      overwrite: "auto",
      onUpdate: () => {
         if (!trackRef.current) return;
         const transform = window.getComputedStyle(trackRef.current).transform;
         if (transform !== 'none') {
           const matrix = new DOMMatrix(transform);
           currentX.current = matrix.m41;
         }
      }
    });
  }, [activeIndex, filteredResults.length]);

  const handleNext = () => {
    stopAutoPlay();
    if (activeIndex < filteredResults.length - 1) setActiveIndex(activeIndex + 1);
  };

  const handlePrev = () => {
    stopAutoPlay();
    if (activeIndex > 0) setActiveIndex(activeIndex - 1);
  };

  // Drag mechanics
  const onPointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
    stopAutoPlay();
    gsap.killTweensOf(trackRef.current);
    
    if (trackRef.current) {
      const transform = window.getComputedStyle(trackRef.current).transform;
      if (transform !== 'none') {
        const matrix = new DOMMatrix(transform);
        currentX.current = matrix.m41;
      }
    }
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current || !trackRef.current) return;
    const delta = e.clientX - startX.current;
    gsap.set(trackRef.current, { x: currentX.current + delta });
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    
    const delta = e.clientX - startX.current;
    
    if (delta < -50 && activeIndex < filteredResults.length - 1) {
      setActiveIndex(prev => prev + 1);
    } else if (delta > 50 && activeIndex > 0) {
      setActiveIndex(prev => prev - 1);
    } else {
      // Snap back if threshold not met
      setActiveIndex(activeIndex); 
      
      const isMobile = window.innerWidth <= 768;
      const slideWidth = isMobile ? window.innerWidth * 0.85 : 551;
      const gap = isMobile ? 16 : 32;
      const centerOffset = (window.innerWidth - slideWidth) / 2;
      const targetX = centerOffset - (activeIndex * (slideWidth + gap));
      
      gsap.to(trackRef.current, {
        x: targetX,
        duration: 0.5,
        ease: "power3.out"
      });
    }
  };

  const onPointerLeave = (e: React.PointerEvent) => {
    if (isDragging.current) {
      onPointerUp(e);
    }
  };

  return (
    <section ref={sectionRef} id="resultats" className={styles.resultsSection}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>RESULTS</h2>
          
          <div className={styles.filters}>
            <div ref={filterTrackRef} className={styles.filterTrack}>
              <div ref={sliderIndicatorRef} className={styles.filterSlider} />
              {FILTERS.map(f => (
                <button 
                  key={f}
                  className={`${styles.filterBtn} ${activeFilter === f ? styles.filterBtnActive : ''}`}
                  onClick={() => setActiveFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.navButtons}>
            <button 
              className={styles.navBtn} 
              onClick={handlePrev} 
              disabled={activeIndex === 0}
              aria-label="Précédent"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <button 
              className={styles.navBtn} 
              onClick={handleNext} 
              disabled={activeIndex === filteredResults.length - 1}
              aria-label="Suivant"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>
        </div>
      </div>

      <div className={styles.sliderContainer}
           onPointerDown={onPointerDown}
           onPointerMove={onPointerMove}
           onPointerUp={onPointerUp}
           onPointerLeave={onPointerLeave}>
        <div className={styles.sliderTrack} ref={trackRef}>
          {filteredResults.map((r, i) => {
            const isActive = i === activeIndex;
            return (
              <div 
                key={`${r.name}-${i}`} 
                className={`${styles.slide} ${isActive ? styles.activeSlide : ''}`}
                onClick={() => {
                  stopAutoPlay();
                  setActiveIndex(i);
                }}
              >
                <div className={styles.imagesRow}>
                  <div className={styles.imgWrapper}>
                    <div className={styles.badgeBlack}>BEFORE</div>
                    <img src={r.beforeImg} alt={`Avant - ${r.name}`} draggable={false} className={styles.beforeImage} />
                  </div>
                  <div className={styles.imgWrapper}>
                    <div className={styles.badgeBronze}>AFTER</div>
                    <img src={r.afterImg} alt={`Après - ${r.name}`} draggable={false} />
                  </div>
                </div>
                
                <div className={styles.infoCard}>
                  <div className={styles.infoTop}>
                    <div className={styles.infoLeft}>
                      <h3 className={styles.name}>{r.name}</h3>
                      <p className={styles.programText}>{r.program}</p>
                    </div>
                    <p className={styles.story}>{r.story}</p>
                  </div>
                  <div className={styles.statsGrid}>
                    {r.stats.map((s, j) => (
                      <div key={j} className={styles.statItem}>
                         <div className={styles.dot}></div>
                        {s}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
