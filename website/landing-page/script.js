/* ==========================================================================
   APEX METHOD — MASTER LANDING PAGE SCRIPT
   ==========================================================================
   
   ANIMATION ARCHITECTURE (For Developers & AI Agents):
   1. STATE LOCK: Elements are locked via GSAP at t=0 to prevent FOUC/Jumps.
   2. LOADER: Cinematic intro + pixel-perfect SVG handover to the Navbar.
   3. ENTRANCE (entryTl): A "One-Shot" cinematic rise of the character (0.6 -> 0.75 scale).
   4. SCROLL HANDOVER: initScrollSequence() is ONLY called on entryTl.onComplete.
   5. SCROLL SEQUENCE (mainTl): Pinned 3-phase story (0.75 -> 0.85 scale) driven by scroll.
   
   CRITICAL HANDOVER RULE: 
   To prevent "Jumping" glitches, the Scroll Timeline (mainTl) must NEVER 
   initialize before the Entrance (entryTl) is finished.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, SplitText);

  /**
   * 0. INITIAL STATE LOCK
   * Prevents elements from appearing at their final CSS size before animations start.
   */
  gsap.set('.character-wrap, .orbital-rings', { autoAlpha: 0, scale: 0.6, transformOrigin: 'center bottom' });
  gsap.set('.hero-text-block', { opacity: 0 }); 

  /* ==========================================================================
     MODULE 1: IMAGE SEQUENCE & FRAME PROCESSING
     Handles lazy loading and Chroma Keying of video frames for the Hero Canvas.
     ========================================================================== */
  const FRAME_COUNT = 97;
  const frames = [];
  const frameObj = { frame: 0 }; // Scrubbed by GSAP ScrollTrigger
  
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = 1080; tempCanvas.height = 1920;
  const tCtx = tempCanvas.getContext('2d', { willReadFrequently: true });

  /**
   * processFrame: Removes green-screen background from raw frames.
   */
  function processFrame(rawImg, index, isFirst = false) {
    tCtx.clearRect(0, 0, 1080, 1920);
    tCtx.drawImage(rawImg, 0, 0, 1080, 1920);
    const imgData = tCtx.getImageData(0, 0, 1080, 1920);
    const data = imgData.data;
    
    // Chroma Key logic: Target green range and spill
    for (let i = 0; i < data.length; i += 4) {
      let r = data[i], g = data[i+1], b = data[i+2];
      if (g > 40 && g > r * 1.1 && g > b * 1.1) {
        let diff = g - Math.max(r, b);
        data[i+3] = diff > 25 ? 0 : Math.max(0, 255 - (diff * 10));
        if (data[i+3] > 0) data[i+1] = Math.min(g, Math.floor((r + b) / 2));
      }
    }
    tCtx.putImageData(imgData, 0, 0);
    
    const processed = new Image();
    processed.onload = () => {
      frames[index] = processed;
      if (isFirst) {
        // Switch from CSS silhouette to processed canvas frame
        document.getElementById('character-placeholder').style.display = 'none';
        document.getElementById('hero-canvas').style.display = 'block';
        drawFrame(0);
      }
    };
    processed.src = tempCanvas.toDataURL('image/png');
  }

  // Preloading sequence (Frame 1 has priority)
  const firstImg = new Image();
  firstImg.src = `./Assets/frames/ezgif-frame-001.png`;
  firstImg.onload = () => {
    processFrame(firstImg, 0, true);
    for (let i = 2; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = `./Assets/frames/ezgif-frame-${String(i).padStart(3, '0')}.png`;
      img.onload = () => processFrame(img, i - 1);
    }
  };

  function drawFrame(index) {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas || !frames[index]) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(frames[index], 0, 0, canvas.width, canvas.height);
  }


  /* ==========================================================================
     MODULE 2: UI HANDOVER & LOADER ANIMATION
     Handles the initial cinematic bronze ascent and navbar logo "flight".
     ========================================================================== */
  function initLoader() {
    const loader = document.getElementById('loader');
    const loaderSvg = document.querySelector('.loader-logo-svg');
    const logoPaths = document.querySelectorAll('.loader-logo-path');
    const trailPaths = document.querySelectorAll('.trail-path');
    const percent = document.getElementById('loader-percent');
    const navbarLogo = document.querySelector('.nav-logo');
    const navPaths = document.querySelectorAll('.apex-svg-logo path');

    const loaderTl = gsap.timeline();
    
    gsap.set(logoPaths, { opacity: 0 });
    gsap.set(navPaths, { opacity: 0 });
    gsap.set(percent, { opacity: 1 });
    gsap.set(trailPaths, { drawSVG: "0% 0%", opacity: 0 });

    // Step 1: Ascent
    loaderTl.to(trailPaths, { opacity: 1, duration: 0.1 }, 0.2);
    loaderTl.fromTo(trailPaths, { drawSVG: "0% 0%" }, { drawSVG: "0% 100%", duration: 1.3, ease: 'power2.inOut' }, 0.2);
    loaderTl.to(trailPaths, { filter: "drop-shadow(0 0 15px #CC8E66)", strokeWidth: 4, duration: 0.3 }, 1.2);
    loaderTl.to(trailPaths, { opacity: 0, duration: 0.4 }, 1.5);

    const p = { val: 0 };
    loaderTl.to(p, { val: 100, duration: 1.5, ease: 'power1.inOut', onUpdate: () => percent.innerText = Math.round(p.val) + "%" }, 0.1);

    // Step 2: Logo Reveal
    logoPaths.forEach((path, i) => {
      const d = 0.3 + (i * 0.1);
      loaderTl.to(path, { opacity: 0.2, duration: 0.1 }, d);
      loaderTl.to(path, { opacity: 1, duration: 0.05 }, d + 0.2);
      loaderTl.to(path, { opacity: 0.5, duration: 0.05 }, d + 0.25);
      loaderTl.to(path, { opacity: 1, duration: 0.1 }, d + 0.3);
    });

    // Step 3: Logo "Flight" to Navbar
    loaderTl.to(percent, { opacity: 0, duration: 0.4 }, 1.8);
    loaderTl.add(() => {
      const s = loaderSvg.getBoundingClientRect();
      const e = navbarLogo.getBoundingClientRect();
      gsap.to(loaderSvg, {
        x: (e.left + e.width/2) - (s.left + s.width/2),
        y: (e.top + e.height/2) - (s.top + s.height/2),
        scale: e.width / s.width,
        duration: 0.9, ease: 'power4.inOut'
      });
    }, 2.0);

    loaderTl.to(loader, {
      opacity: 0, duration: 0.5,
      onStart: () => { 
        gsap.set('#nav', { visibility: 'visible', opacity: 1 }); 
        gsap.set(navPaths, { opacity: 1, y: 0 }); 
        gsap.set(loaderSvg, { opacity: 0 }); 
      },
      onComplete: () => { 
        loader.style.display = 'none'; 
        initHeroStory(); 
      }
    }, 2.9);
  }


  /* ==========================================================================
     MODULE 3: HERO STORY — INITIAL PAGE ENTRY (ENTRANCE)
     Plays ONCE when the loader finishes.
     ========================================================================== */
  function initHeroStory() {
    const headlines = document.querySelectorAll('[data-split]');
    const splitInstances = Array.from(headlines).map(h => new SplitText(h, { type: 'chars', charsClass: 'split-char' }));
    splitInstances.forEach(s => gsap.set(s.chars, { opacity: 0, y: 40, rotateX: -40 }));

    gsap.set('.hero-text-block', { opacity: 1 });
    gsap.set('.text-pill', { opacity: 0, y: 15, scale: 0.9 });
    gsap.set('.stat-card, .pillar-hero-card', { opacity: 0, scale: 0.95 });
    
    /**
     * entryTl: One-shot timeline.
     * Handover to Scroll Sequence happens in onComplete to avoid race conditions.
     */
    const entryTl = gsap.timeline({
      onComplete: () => {
        initScrollSequence(); 
      }
    });

    // 1. CHARACTER GROW (The Rise: 0.6 -> 0.75)
    entryTl.fromTo('.character-wrap, .orbital-rings', 
      { autoAlpha: 0, scale: 0.6 },
      { autoAlpha: 1, scale: 0.75, duration: 1.5, ease: 'power3.out' }, 0
    );
    
    // 2. SHOOTING TRAILS (Rapid intro reveal)
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

    // 3. HEADLINES REVEAL
    entryTl.to('.text-top-center .text-pill', { opacity: 1, y: 0, scale: 1 }, 0.5);
    if (splitInstances[0]) entryTl.to(splitInstances[0].chars, { opacity: 1, y: 0, rotateX: 0, stagger: 0.02 }, 0.6);
    
    entryTl.to('.text-right-middle .text-pill', { opacity: 1, y: 0, scale: 1 }, 0.7);
    if (splitInstances[1]) entryTl.to(splitInstances[1].chars, { opacity: 1, y: 0, rotateX: 0, stagger: 0.02 }, 0.8);
    
    entryTl.to('.text-bottom-left .text-pill', { opacity: 1, y: 0, scale: 1 }, 0.9);
    if (splitInstances[2]) entryTl.to(splitInstances[2].chars, { opacity: 1, y: 0, rotateX: 0, stagger: 0.02 }, 1.0);
  }


  /* ==========================================================================
     MODULE 4: HERO STORY — SCROLL-PINNED SEQUENCE
     Instantiated only AFTER the Entrance finishes to prevent "jump" glitches.
     ========================================================================== */
  function initScrollSequence() {
    const heroSection = document.getElementById('hero-scroll');
    const phaseText = document.getElementById('phase-text');
    const phaseStats = document.getElementById('phase-stats');
    const phasePillars = document.getElementById('phase-pillars');
    const heroGlow = document.getElementById('hero-glow');
    if (!heroSection) return;

    /**
     * mainTl: Scroll-scrubbed timeline.
     * Starts from the end-state of initHeroStory() (0.75 scale).
     */
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

    // 1. CORE VISUALS SCRUB
    // Controls Canvas frame index (0-96) based on scroll depth.
    mainTl.to(frameObj, { frame: FRAME_COUNT - 1, snap: "frame", ease: "none", duration: 6, onUpdate: () => drawFrame(Math.floor(frameObj.frame)) }, 0);
    
    // Scale Growth: Pick up from 0.75 and go to 0.85 as user scrolls down.
    mainTl.to(['.character-wrap', '.orbital-rings'], { scale: 0.85, duration: 6, ease: "none" }, 0);
    
    // Phase 1 Transition: Headlines fade out, background glow intensifies.
    mainTl.to(phaseText, { opacity: 0, duration: 1 }, 0);
    mainTl.to(heroGlow, { opacity: 0.7, scale: 1.3, duration: 1.5 }, 0);

    // Light Trails Build-up: Visible but empty trails are "drawn" via scroll.
    const trailNames = ['.tx-b1', '.tx-f1', '.tx-b2', '.tx-f2', '.tx-b3', '.tx-f3'];
    gsap.set(trailNames, { opacity: 1, drawSVG: '0% 0%' });
    trailNames.forEach((t, i) => {
      mainTl.to(t, { drawSVG: '0% 100%', duration: 1.2, ease: "power1.inOut" }, 0.2 + (i * 0.4));
    });

    // Phase 2: Performance Stats Reveal (Layered Reveal)
    mainTl.set(phaseStats, { opacity: 1 }, 1.2);
    
    // 1. Cards expansion
    mainTl.fromTo('.stat-card', 
      { opacity: 0, scale: 0.85, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 1.2, stagger: 0.2, ease: "expo.out" }, 1.3);
    
    // 2. Internal elements sliding up through masks
    mainTl.fromTo('.stat-card .reveal-mask > *',
      { y: '110%' },
      { y: '0%', duration: 1, stagger: 0.1, ease: "power4.out" }, 1.5);

    mainTl.to(phaseStats, { opacity: 0, duration: 0.8 }, 3.2);

    // Phase 3: Brand Pillars Reveal (Layered Reveal)
    mainTl.to(heroGlow, { opacity: 1, scale: 1.6, duration: 1.5 }, 3.2);
    mainTl.set(phasePillars, { opacity: 1 }, 3.8);
    
    // 1. Cards expansion
    mainTl.fromTo('.pillar-hero-card',
      { opacity: 0, scale: 0.9, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 1.2, stagger: 0.15, ease: "expo.out" }, 3.9);

    // 2. Icon Bloom
    mainTl.fromTo('.pillar-hero-card .ph-icon',
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 0.8, stagger: 0.15, ease: "back.out(1.7)" }, 4.1);

    // 3. Headlines & Descriptions sliding up
    mainTl.fromTo('.pillar-hero-card .reveal-mask > *',
      { y: '110%' },
      { y: '0%', duration: 1, stagger: 0.08, ease: "power4.out" }, 4.3);

    initSectionAnimations();
  }


  /* ==========================================================================
     MODULE 5: SECTION REVEALS & UTILITY HELPERS
     Standard scroll-triggered entrance reveals for lower sections.
     ========================================================================== */
  function initSectionAnimations() {
    // 1. PROGRAMS SECTION (Enhanced Reveal)
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
      progTl.from('.prog-char-wrap', { scale: 0.8, opacity: 0, duration: 1.2, ease: 'power4.out' }, 0.2);
      progTl.from('.prog-light-ring', { scale: 0.5, opacity: 0, duration: 1.5, ease: 'expo.out' }, 0.4);
      progTl.from('.prog-card-featured', { x: 40, opacity: 0, duration: 1, ease: 'power3.out' }, 0.6);
    }

    // 2. OTHER SECTIONS (Generic Reveal)
    reveal('.prog-card-grid', { trigger: '.programs-grid-new', stagger: 0.15 });
    reveal('.app-text', { trigger: '.app-section' });
    reveal('.phone-mockup', { trigger: '.app-visual', fromRotation: 5 });
    reveal('.testimonial', { trigger: '.testimonials-track', stagger: 0.1 });
    reveal('.about-img-frame', { trigger: '.about' });
    reveal('.quiz-card', { trigger: '.quiz-section' });
  }

  function reveal(selector, vars = {}) {
    const elements = gsap.utils.toArray(selector);
    if (!elements.length) return;
    gsap.from(elements, {
      y: vars.fromY || 50, opacity: 0,
      duration: 1, stagger: vars.stagger || 0, ease: 'power3.out',
      scrollTrigger: { trigger: vars.trigger || elements[0], start: 'top 85%', once: true }
    });
  }

  // Custom Cursor Logic
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');
  let mx = 0, my = 0, fx = 0, fy = 0;
  document.addEventListener('mousemove', e => { 
    mx = e.clientX; my = e.clientY; 
    if (cursor) cursor.style.transform = `translate(${mx-4}px, ${my-4}px)`; 
  });
  function animCursor() { 
    fx += (mx-fx)*0.1; fy += (my-fy)*0.1; 
    if (follower) follower.style.transform = `translate(${fx-18}px, ${fy-18}px)`; 
    requestAnimationFrame(animCursor); 
  }
  animCursor();

  // Mobile Menu Utility
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const nav = document.getElementById('nav');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      mobileMenu.classList.toggle('open');
    });
  }

  // Navbar Scroll State
  window.addEventListener('scroll', () => {
    if (nav) {
      if (window.scrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }
  });

  // Initialization Kickoff
  initLoader();
});