'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Programs.module.css';

type LocationFilter = 'tous' | 'maison' | 'salle';

const PROGRAMS = [
  {
    id: 'orion-salle',
    title: 'ORION SALLE',
    desc: "La transformation absolue en salle. Machines, haltères et poids du corps pour sculpter un physique d'élite.",
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1000&auto=format&fit=crop',
    location: 'salle' as const,
    tier: 'fondation',
    size: 'large',
    price: '97€',
    priceType: 'Paiement unique',
    duration: '90 JOURS',
    pills: ['FONDATION', 'SALLE', '90 JOURS'],
    features: [
      'Machines & poids libres',
      'Analyse morpho-anatomique',
      'IA Nutrition intégrée',
      'Suivi métabolique',
      '3, 4 ou 5 séances par semaine',
    ],
    ctaText: 'Découvrir ORION Salle',
    ctaStyle: 'solid',
  },
  {
    id: 'orion-maison',
    title: 'ORION MAISON',
    desc: "Le moteur principal de la méthode APEX adapté pour la maison ou l'extérieur avec des élastiques de résistance.",
    image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1000&auto=format&fit=crop',
    location: 'maison' as const,
    tier: 'fondation',
    size: 'large',
    price: '97€',
    priceType: 'Paiement unique',
    duration: '90 JOURS',
    pills: ['FONDATION', 'MAISON / OUTDOOR', '90 JOURS'],
    features: [
      'Élastiques de résistance',
      'Masterclass mensuelle',
      'IA Nutrition + Analyse repas',
      '3, 4 ou 5 séances par semaine',
      'Progression Débutant à Avancé',
    ],
    ctaText: 'Découvrir ORION Maison',
    ctaStyle: 'solid',
  },
  {
    id: 'leo-grizzly',
    title: 'LÉO / GRIZZLY',
    desc: "L'intensif \"Home\". Brise tes plateaux et relance ton métabolisme avec un format court et brutal. 100% poids du corps.",
    image: 'https://images.unsplash.com/photo-1598136490937-f77b0ce520fe?q=80&w=800&auto=format&fit=crop',
    location: 'maison' as const,
    tier: 'intensifs',
    size: 'medium',
    price: '49€',
    priceType: undefined,
    duration: '28 JOURS',
    pills: ['INTENSIF (HOMMES)', '28 JOURS'],
    features: [
      'Sans matériel (poids du corps)',
      '20 vidéos live follow-along',
      'Séances courtes (30 min)',
      'Nutrition & Calcul BMR inclus',
    ],
    ctaText: 'Découvrir LÉO / GRIZZLY',
    ctaStyle: 'outline',
  },
  {
    id: 'athena',
    title: 'ATHENA',
    desc: "La puissance au féminin. Une méthode structurée pour sculpter un physique fort et dessiné, avec la philosophie APEX.",
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop',
    location: 'maison' as const,
    tier: 'intensifs',
    size: 'medium',
    price: '49€',
    priceType: undefined,
    duration: '28 JOURS',
    pills: ['INTENSIF (FEMMES)', '28 JOURS'],
    features: [
      'Programmation Force & Tonicité',
      'Élastiques de résistance',
      '4 à 5 séances par semaine',
      'Philosophie APEX adaptée',
    ],
    ctaText: 'Découvrir ATHENA',
    ctaStyle: 'outline',
  },
];

export default function Programs() {
  const [filter, setFilter] = useState<LocationFilter>('tous');
  const sectionRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const filterTrackRef = useRef<HTMLDivElement>(null);
  const sliderIndicatorRef = useRef<HTMLDivElement>(null);

  const filtered =
    filter === 'tous'
      ? PROGRAMS
      : PROGRAMS.filter((p) => p.location === filter);

  const filters: { key: LocationFilter; label: string }[] = [
    { key: 'tous', label: 'TOUS' },
    { key: 'maison', label: 'MAISON' },
    { key: 'salle', label: 'SALLE' },
  ];

  // Update slider indicator position based on the active button
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

  // Measure and position the slider after render
  useEffect(() => {
    const timer = setTimeout(updateSliderPosition, 60);
    return () => clearTimeout(timer);
  }, [filter, updateSliderPosition]);

  // GSAP filter transition
  const handleFilter = (key: LocationFilter) => {
    if (key === filter) return;
    const cards = sliderRef.current?.querySelectorAll('[data-prog-card]');
    if (!cards?.length) {
      setFilter(key);
      return;
    }

    // Fade out current cards
    gsap.to(cards, {
      opacity: 0,
      y: 10,
      duration: 0.3,
      ease: 'power2.inOut',
      onComplete: () => {
        setFilter(key);
        // After React re-renders with the new filter, fade in
        requestAnimationFrame(() => {
          const newCards = sliderRef.current?.querySelectorAll('[data-prog-card]');
          if (newCards?.length) {
            gsap.fromTo(
              newCards,
              { opacity: 0, y: 15 },
              {
                opacity: 1,
                y: 0,
                duration: 0.4,
                stagger: 0.1,
                ease: 'power2.out',
              }
            );
          }
          // Scroll slider back to start
          if (sliderRef.current) {
            sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
          }
        });
      },
    });
  };

  // Scroll reveal on section enter
  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Section title reveal
      const heading = sectionRef.current?.querySelector('[data-prog-heading]');
      if (heading) {
        gsap.fromTo(
          heading,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              once: true,
            },
          }
        );
      }

      // Filter bar reveal
      const filterBar = sectionRef.current?.querySelector('[data-prog-filters]');
      if (filterBar) {
        gsap.fromTo(
          filterBar,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              once: true,
            },
          }
        );
      }

      // Card reveals
      const cards = sliderRef.current?.querySelectorAll('[data-prog-card]');
      if (cards?.length) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sliderRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Drag-to-scroll with momentum for the slider
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let isDown = false;
    let startX: number;
    let scrollLeft: number;
    let velX = 0;
    let momentumID: number;
    let lastX = 0;

    const beginMomentumTracking = () => {
      cancelAnimationFrame(momentumID);
    };

    const applyMomentum = () => {
      if (isDown) return;
      if (Math.abs(velX) > 0.5) {
        slider.scrollLeft -= velX * 1.5; // Apply velocity
        velX *= 0.92; // Friction
        momentumID = requestAnimationFrame(applyMomentum);
      } else {
        // Snap back on when momentum finishes (optional)
        // slider.style.scrollSnapType = 'x mandatory';
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      isDown = true;
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
      lastX = e.pageX;
      velX = 0;
      slider.style.scrollSnapType = 'none';
      beginMomentumTracking();
    };
    
    const onMouseLeave = () => {
      if (!isDown) return;
      isDown = false;
      momentumID = requestAnimationFrame(applyMomentum);
    };
    
    const onMouseUp = () => {
      if (!isDown) return;
      isDown = false;
      momentumID = requestAnimationFrame(applyMomentum);
    };
    
    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2;
      
      velX = e.pageX - lastX;
      lastX = e.pageX;
      
      slider.scrollLeft = scrollLeft - walk;
    };

    slider.addEventListener('mousedown', onMouseDown);
    slider.addEventListener('mouseleave', onMouseLeave);
    slider.addEventListener('mouseup', onMouseUp);
    slider.addEventListener('mousemove', onMouseMove);

    return () => {
      cancelAnimationFrame(momentumID);
      slider.removeEventListener('mousedown', onMouseDown);
      slider.removeEventListener('mouseleave', onMouseLeave);
      slider.removeEventListener('mouseup', onMouseUp);
      slider.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <section ref={sectionRef} id="programmes" className={styles.programs}>
      <div className="container">
        {/* Header Row */}
        <div className={styles.headerLayout}>
          <div className={styles.headerText} data-prog-heading>
            <h2 className={styles.heading}>
              NOS
              <br />
              <span className="text-gradient-prog" style={{ fontStyle: 'italic' }}>
                PROGRAMMES
              </span>
            </h2>
            <p className={styles.introText}>
              Trouve la méthode qui correspond à ton niveau d&apos;engagement.
              Maison, salle, abonnement ou coaching élite.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className={styles.filters} data-prog-filters>
            <div ref={filterTrackRef} className={styles.filterTrack}>
              <div ref={sliderIndicatorRef} className={styles.filterSlider} />
              {filters.map((f) => (
                <button
                  key={f.key}
                  className={`${styles.filterBtn} ${filter === f.key ? styles.filterBtnActive : ''}`}
                  onClick={() => handleFilter(f.key)}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Program Cards */}
        <div ref={sliderRef} className={styles.slider}>
          {filtered.map((prog) => (
            <div
              key={prog.id}
              data-prog-card
              className={`${styles.card} ${
                prog.size === 'large' ? styles.cardLarge : styles.cardMedium
              }`}
            >
              <div className={styles.cardImg}>
                <img src={prog.image} alt={prog.title} />
                <div className={styles.cardOverlay} />
              </div>
              <div className={`${styles.cardContent} flex-col`}>
                <div className={styles.cardHeader}>
                  <div className="pill-row-new">
                    {prog.pills.map((pill, i) => (
                      <span key={i} className="pill-badge-new">
                        {i === 0 && <span className="pill-dot" />}
                        {pill}
                      </span>
                    ))}
                  </div>
                  <div className={styles.priceTag}>
                    <span className={styles.priceVal}>{prog.price}</span>
                    {prog.priceType && (
                      <span className={styles.priceType}>{prog.priceType}</span>
                    )}
                  </div>
                </div>
                <h3 className={`${styles.cardTitle} mt-auto`}>{prog.title}</h3>
                <p className={styles.cardDesc}>{prog.desc}</p>
                <ul className={styles.featuresList}>
                  {prog.features.map((feat, i) => (
                    <li key={i}>
                      <span className="icon-apex" />
                      {feat}
                    </li>
                  ))}
                </ul>
                <Link
                  href="#quiz"
                  className={`btn ${
                    prog.ctaStyle === 'solid'
                      ? 'btn-solid-bronze'
                      : 'btn-outline-bronze'
                  } w-full text-center mt-4`}
                >
                  {prog.ctaText}
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
