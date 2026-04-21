/* ==========================================================================
   APEX METHOD — Animations
   Hero Story, Scroll Sequence, and Section Reveals
   ========================================================================== */

(function() {
  const { FRAME_COUNT } = APEX.CONFIG;
  const { STATE } = APEX;

  /**
   * APEX.initHeroStory (The Entrance)
   * Plays ONCE when the loader finishes.
   * On completion, it MUST trigger initScrollSequence.
   */
  APEX.initHeroStory = function() {
    const headlines = document.querySelectorAll('[data-split]');
    const splitInstances = Array.from(headlines).map(h => new SplitText(h, { type: 'chars', charsClass: 'split-char' }));
    splitInstances.forEach(s => gsap.set(s.chars, { opacity: 0, y: 40, rotateX: -40 }));

    gsap.set('.hero-text-block', { opacity: 1 });
    gsap.set('.text-pill', { opacity: 0, y: 15, scale: 0.9 });
    gsap.set('.stat-card, .pillar-hero-card', { opacity: 0, scale: 0.95 });
    
    // Initial hidden state for cards to prevent flashing
    gsap.set('.result-card', { opacity: 0, y: 50 });

    const entryTl = gsap.timeline({
      onComplete: () => {
        APEX.initScrollSequence(); 
      }
    });

    entryTl.fromTo('.character-wrap, .orbital-rings', 
      { autoAlpha: 0, scale: 0.6 },
      { autoAlpha: 1, scale: 0.75, duration: 1.5, ease: 'power3.out' }, 0
    );
    
    const trailNames = ['.tx-b1', '.tx-f1', '.tx-b2', '.tx-f2', '.tx-b3', '.tx-f3'];
    trailNames.forEach((path, i) => {
       const start = 0.4 + (i * 0.15);
       const proxy = { head: 0, tail: 0 };
       const elements = document.querySelectorAll(path);
       gsap.set(elements, { drawSVG: "0% 0%", opacity: 1 });
       entryTl.to(proxy, { head: 100, duration: 0.8, ease: 'power2.inOut', onUpdate: () => gsap.set(elements, { drawSVG: `${proxy.tail}% ${proxy.head}%` }) }, start);
       entryTl.to(proxy, { tail: 100, duration: 0.8, ease: 'power2.inOut', onUpdate: () => gsap.set(elements, { drawSVG: `${proxy.tail}% ${proxy.head}%` }) }, start + 0.4);
       entryTl.to(elements, { opacity: 0, duration: 0.3 }, start + 1.2);
    });

    entryTl.to('.text-top-center .text-pill', { opacity: 1, y: 0, scale: 1 }, 0.5);
    if (splitInstances[0]) entryTl.to(splitInstances[0].chars, { opacity: 1, y: 0, rotateX: 0, stagger: 0.02 }, 0.6);
    
    entryTl.to('.text-right-middle .text-pill', { opacity: 1, y: 0, scale: 1 }, 0.7);
    if (splitInstances[1]) entryTl.to(splitInstances[1].chars, { opacity: 1, y: 0, rotateX: 0, stagger: 0.02 }, 0.8);
    
    entryTl.to('.text-bottom-left .text-pill', { opacity: 1, y: 0, scale: 1 }, 0.9);
    if (splitInstances[2]) entryTl.to(splitInstances[2].chars, { opacity: 1, y: 0, rotateX: 0, stagger: 0.02 }, 1.0);
  };

  APEX.initScrollSequence = function() {
    const heroSection = document.getElementById('hero-scroll');
    const phaseText = document.getElementById('phase-text');
    const phaseStats = document.getElementById('phase-stats');
    const phasePillars = document.getElementById('phase-pillars');
    if (!heroSection) return;

    const mainTl = gsap.timeline({
      scrollTrigger: {
        id: "heroScroll",
        trigger: heroSection,
        start: 'top top',
        end: '+=180%',
        pin: true,
        scrub: 0.6
      }
    });

    mainTl.to(STATE.frameObj, { 
      frame: FRAME_COUNT - 1, 
      snap: "frame", 
      ease: "none", 
      duration: 6, 
      onUpdate: () => APEX.drawFrame(Math.floor(STATE.frameObj.frame)) 
    }, 0);
    
    mainTl.to(['.character-wrap', '.orbital-rings'], { scale: 0.85, duration: 6, ease: "none" }, 0);
    mainTl.to(phaseText, { opacity: 0, duration: 1 }, 0);

    const trailNames = ['.tx-b1', '.tx-f1', '.tx-b2', '.tx-f2', '.tx-b3', '.tx-f3'];
    gsap.set(trailNames, { opacity: 1, drawSVG: '0% 0%' });
    trailNames.forEach((t, i) => {
      mainTl.to(t, { drawSVG: '0% 100%', duration: 1.2, ease: "power1.inOut" }, 0.2 + (i * 0.4));
    });

    mainTl.set(phaseStats, { opacity: 1 }, 1.2);
    mainTl.fromTo('.stat-card', 
      { opacity: 0, scale: 0.85, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 1.2, stagger: 0.2, ease: "expo.out" }, 1.3);
    mainTl.fromTo('.stat-card .reveal-mask > *',
      { y: '110%' },
      { y: '0%', duration: 1, stagger: 0.1, ease: "power4.out" }, 1.5);
    mainTl.to(phaseStats, { opacity: 0, duration: 0.8 }, 3.2);

    mainTl.set(phasePillars, { opacity: 1 }, 3.8);
    mainTl.fromTo('.pillar-hero-card',
      { opacity: 0, scale: 0.9, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 1.2, stagger: 0.15, ease: "expo.out" }, 3.9);
    mainTl.fromTo('.pillar-hero-card .ph-icon',
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 0.8, stagger: 0.15, ease: "back.out(1.7)" }, 4.1);
    mainTl.fromTo('.pillar-hero-card .reveal-mask > *',
      { y: '110%' },
      { y: '0%', duration: 1, stagger: 0.08, ease: "power4.out" }, 4.3);

    APEX.initSectionAnimations();
    APEX.initMetricsAnimations();
    APEX.initBrandDivider();
    APEX.initResultsSlider();
    APEX.initStyleStudio();
  };

  APEX.initResultsSlider = function() {
    const cards = document.querySelectorAll('.result-card');
    if (!cards.length) return;

    // Flip hint: only fires AFTER cards are visible in viewport
    ScrollTrigger.create({
      trigger: '.results-grid',
      start: 'top 60%',
      once: true,
      onEnter: () => {
        const hintCards = [cards[1], cards[3]];
        hintCards.forEach((c, i) => {
          if (!c) return;
          gsap.to(c.querySelector('.card-inner'), {
            rotateY: 180,
            duration: 1.2,
            delay: 0.5 + (i * 0.3),
            repeat: 1,
            yoyo: true,
            ease: 'expo.inOut',
          });
        });
      }
    });

    cards.forEach(card => {
      const slider = card.querySelector('.split-slider');
      const flipBtn = card.querySelector('.flip-btn');      
      
      if (flipBtn) {
        flipBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          card.classList.toggle('is-flipped');
        });
      }

      if (slider) {
        const beforeImg = slider.querySelector('.img-before');
        const handle = slider.querySelector('.slider-handle');
        
        // 1. Initial Scroll Hint
        gsap.fromTo(handle, 
          { left: '50%' },
          {
            left: '65%',
            duration: 1.2,
            ease: 'power2.inOut',
            repeat: 1,
            yoyo: true,
            scrollTrigger: {
              trigger: slider,
              start: 'top 80%',
              once: true
            },
            onUpdate: function() {
              const pos = parseFloat(handle.style.left);
              beforeImg.style.clipPath = `inset(0 ${100 - pos}% 0 0)`;
            }
          }
        );

        // 2. Smooth Mouse Tracking with inertia
        let targetX = 50;
        let currentX = 50;

        slider.addEventListener('mousemove', (e) => {
          if (card.classList.contains('is-flipped')) return;
          const rect = slider.getBoundingClientRect();
          targetX = ((e.clientX - rect.left) / rect.width) * 100;
        });

        // Loop for smooth inertia
        function updateSlider() {
          if (!card.classList.contains('is-flipped')) {
            currentX += (targetX - currentX) * 0.15; // Inertia factor
            if (handle) handle.style.left = `${currentX}%`;
            if (beforeImg) beforeImg.style.clipPath = `inset(0 ${100 - currentX}% 0 0)`;
          }
          requestAnimationFrame(updateSlider);
        }
        requestAnimationFrame(updateSlider);

        // Reset on leave
        slider.addEventListener('mouseleave', () => {
          targetX = 50;
        });
      }
    });
  };

  APEX.initBrandDivider = function() {
    const track = document.querySelector('.divider-track');
    if (!track) return;

    const loop = gsap.to(track, {
      xPercent: -50,
      repeat: -1,
      duration: 60,
      ease: "none"
    });

    let proxy = { skew: 0 };
    let skewSetter = gsap.quickSetter(track, "skewX", "deg");
    let clamp = gsap.utils.clamp(-15, 15);

    ScrollTrigger.create({
      onUpdate: (self) => {
        let skew = clamp(self.getVelocity() / -300);
        if (Math.abs(skew) > Math.abs(proxy.skew)) {
          proxy.skew = skew;
          gsap.to(proxy, {
            skew: 0,
            duration: 0.8,
            ease: "power3",
            onUpdate: () => skewSetter(proxy.skew)
          });
        }
      }
    });

    gsap.to(loop, {
      timeScale: 1.5,
      scrollTrigger: {
        trigger: '.brand-divider-bar',
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  };

  APEX.initSectionAnimations = function() {
    const progTitle = document.querySelector('[data-split-prog]');
    if (progTitle) {
      const split = new SplitText(progTitle, { type: 'chars, words' });
      gsap.set(split.chars, { opacity: 0, y: 30, rotateX: -60 });
      
      const progTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.programs',
          start: 'top 75%',
          once: true
        }
      });

      progTl.to(split.chars, { opacity: 1, y: 0, rotateX: 0, stagger: 0.02, duration: 0.8, ease: 'power3.out' });
      progTl.from('.program-filters-new', { opacity: 0, y: 20, duration: 0.8, ease: 'power3.out' }, 0.4);
    }

    // Scroll reveal for program tiers
    APEX.reveal('.prog-tier-label', { trigger: '.programs', stagger: 0.2 });
    APEX.reveal('.prog-hero-card', { trigger: '.programs', stagger: 0.15 });
    APEX.reveal('.prog-elite-card', { trigger: '.programs', y: 30 });
    APEX.reveal('.app-text-col', { trigger: '.app-section-new' });
    APEX.reveal('.phone-mockup-new', { trigger: '.app-visual-col', fromRotation: 5 });
    
    // Explicit Reveal for Result Cards
    APEX.reveal('.result-card', { trigger: '.results-grid', stagger: 0.1 });
    
    APEX.reveal('.about-img-frame', { trigger: '.about' });
    APEX.reveal('.quiz-card', { trigger: '.quiz-section' });
  };

  APEX.initMetricsAnimations = function() {
    const section = document.querySelector('.apex-metrics-section');
    if (!section) return;

    // 1. Reveal cards with stagger
    gsap.fromTo('.metric-card', 
      { opacity: 0, y: 60 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1.2, 
        stagger: 0.15, 
        ease: 'expo.out',
        scrollTrigger: {
          trigger: '.metrics-grid',
          start: 'top 85%',
          once: true
        }
      }
    );

    // 2. Animate Counters
    const numbers = document.querySelectorAll('.metric-number');
    numbers.forEach((el, index) => {
      const text = el.innerText;
      const targetVal = parseInt(text.replace(/[^0-9]/g, ''));
      const suffix = text.replace(/[0-9]/g, '');

      if (!isNaN(targetVal)) {
        let proxy = { val: 0 };
        gsap.to(proxy, {
          val: targetVal,
          duration: 2.5,
          delay: index * 0.15, // Sync with card stagger
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.metrics-grid',
            start: 'top 85%',
            once: true
          },
          onUpdate: () => {
            el.innerText = Math.floor(proxy.val) + suffix;
          }
        });
      }
    });
    
    // 3. Header Animation
    const headerText = document.querySelector('.apex-metrics-section .nos-offres');
    if (headerText && typeof SplitText !== 'undefined') {
      const split = new SplitText(headerText, { type: 'chars, words' });
      gsap.set(split.chars, { opacity: 0, y: 30, rotateX: -60 });
      gsap.to(split.chars, {
        opacity: 1, 
        y: 0, 
        rotateX: 0, 
        stagger: 0.02, 
        duration: 0.8, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.apex-metrics-section',
          start: 'top 85%',
          once: true
        }
      });
    }
  };

  APEX.reveal = function(selector, vars = {}) {
    const elements = gsap.utils.toArray(selector);
    if (!elements.length) return;
    gsap.fromTo(elements, 
      { y: vars.fromY || 50, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: 1, stagger: vars.stagger || 0, ease: 'power3.out',
        scrollTrigger: { trigger: vars.trigger || elements[0], start: 'top 85%', once: true }
      }
    );
  };
})();
