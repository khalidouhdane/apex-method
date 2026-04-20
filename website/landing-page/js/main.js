/* ==========================================================================
   APEX METHOD — Main Entry Point
   Orchestrates the cinematic sequence: Loader -> Entrance -> Scroll
   
   CRITICAL HANDOVER RULE: 
   To prevent "Jumping" glitches, the Scroll Timeline (initScrollSequence) 
   must NEVER initialize before the Entrance (initHeroStory) is finished.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Plugins Registration
  gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, SplitText);

  // 2. Initial State Lock (Prevents FOUC/Jumps before GSAP takes over)
  gsap.set('.character-wrap, .orbital-rings', { autoAlpha: 0, scale: 0.6, transformOrigin: 'center bottom' });
  gsap.set('.hero-text-block', { opacity: 0 }); 

  // 3. Sub-modules Setup
  APEX.initCursor();
  APEX.initMobileMenu();
  APEX.initNavbarScroll();
  APEX.initProgramFilters();
  APEX.preloadFrames(); // Lazy loads chroma-keyed canvas frames

  // 4. Start the chain
  APEX.initLoader();
});

APEX.initLoader = function() {
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

  loaderTl.to(trailPaths, { opacity: 1, duration: 0.1 }, 0.2);
  loaderTl.fromTo(trailPaths, { drawSVG: "0% 0%" }, { drawSVG: "0% 100%", duration: 1.3, ease: 'power2.inOut' }, 0.2);
  loaderTl.to(trailPaths, { filter: "drop-shadow(0 0 15px #CC8E66)", strokeWidth: 4, duration: 0.3 }, 1.2);
  loaderTl.to(trailPaths, { opacity: 0, duration: 0.4 }, 1.5);

  const p = { val: 0 };
  loaderTl.to(p, { val: 100, duration: 1.5, ease: 'power1.inOut', onUpdate: () => percent.innerText = Math.round(p.val) + "%" }, 0.1);

  logoPaths.forEach((path, i) => {
    const d = 0.3 + (i * 0.1);
    loaderTl.to(path, { opacity: 0.2, duration: 0.1 }, d);
    loaderTl.to(path, { opacity: 1, duration: 0.05 }, d + 0.2);
    loaderTl.to(path, { opacity: 0.5, duration: 0.05 }, d + 0.25);
    loaderTl.to(path, { opacity: 1, duration: 0.1 }, d + 0.3);
  });

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
      APEX.initHeroStory(); 
    }
  }, 2.9);
};
