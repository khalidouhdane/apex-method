/* ==========================================================================
   APEX METHOD — UI Features
   Cursor, Mobile Menu, Style Studio, Navbar Scroll
   ========================================================================== */

(function() {
  APEX.initCursor = function() {
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
  };

  APEX.initMobileMenu = function() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    if (menuToggle && mobileMenu) {
      menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('open');
      });
    }
  };

  APEX.initNavbarScroll = function() {
    const nav = document.getElementById('nav');
    window.addEventListener('scroll', () => {
      if (nav) {
        if (window.scrollY > 50) {
          nav.classList.add('scrolled');
        } else {
          nav.classList.remove('scrolled');
        }
      }
    });
  };

  APEX.initStyleStudio = function() {
    const trigger = document.getElementById('studio-trigger');
    const panel = document.getElementById('studio-panel');
    const buttons = document.querySelectorAll('.studio-btn');
    const glassGroup = document.querySelectorAll('.studio-group')[1];

    if (!trigger || !panel) return;

    trigger.addEventListener('click', () => {
      panel.classList.toggle('active');
    });

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const theme = btn.getAttribute('data-theme-set');
        const glass = btn.getAttribute('data-glass-set');

        if (theme) {
          document.documentElement.setAttribute('data-theme', theme);
          updateActiveButton('[data-theme-set]', btn);
          if (theme === 'light') {
             if (glassGroup) glassGroup.style.display = 'none';
          } else {
             if (glassGroup) glassGroup.style.display = 'flex';
          }
        }

        if (glass) {
          document.documentElement.setAttribute('data-glass', glass);
          updateActiveButton('[data-glass-set]', btn);
        }
      });
    });

    function updateActiveButton(attr, activeBtn) {
      const group = activeBtn.parentElement;
      group.querySelectorAll('.studio-btn').forEach(b => b.classList.remove('active'));
      activeBtn.classList.add('active');
    }

    document.addEventListener('click', (e) => {
      if (!panel.contains(e.target) && !trigger.contains(e.target)) {
        panel.classList.remove('active');
      }
    });
  };

  /**
   * initProgramFilters
   * Handles the Salle/Maison toggle logic for the program grid.
   */
  APEX.initProgramFilters = function() {
    const filterBtns = document.querySelectorAll('.filter-btn-new');
    const slider = document.querySelector('.filter-slider-new');
    const subCards = document.querySelectorAll('.sub-card');
    
    // ORION Dynamic Content
    const orionDesc = document.getElementById('orion-desc');
    const orionSpec1 = document.getElementById('orion-spec-1');
    const orionSpec2 = document.getElementById('orion-spec-2');

    const contentMap = {
      salle: {
        desc: "Que tu sois chez toi ou en salle, ORION est le moteur principal de la méthode APEX. 3 cycles de progression pour détruire tes limites, fondre le gras superflu et forger un corps athlétique et fonctionnel. C'est la fondation.",
        spec1: "Programmation Force & Hypertrophie",
        spec2: "Optimisation morpho-anatomique",
        sliderX: 'calc(100% + 6px)'
      },
      maison: {
        desc: "L'efficacité APEX sans quitter ton salon. Une programmation optimisée pour des résultats maximum avec un minimum de matériel (haltères/élastiques).",
        spec1: "Focus Conditionnement & Tonicité",
        spec2: "Flexibilité d'entraînement totale",
        sliderX: '0'
      }
    };

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const loc = btn.getAttribute('data-location');
        
        // 1. Update UI Classes
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // 2. Move Slider
        if (slider) {
          slider.style.transform = loc === 'salle' ? 'translateX(calc(100% + 4px))' : 'translateX(0)';
        }

        // 3. Filter Secondary Cards (LÉO hide/show) smoothly
        subCards.forEach(card => {
          const type = card.getAttribute('data-location-type');
          if (type === 'maison' && loc === 'salle') {
             gsap.to(card, { 
               opacity: 0, 
               scale: 0.95, 
               minWidth: 0, 
               flexBasis: 0, 
               padding: 0, 
               margin: 0, 
               borderWidth: 0, 
               duration: 0.4, 
               ease: 'power2.inOut',
               onComplete: () => card.classList.add('hidden') 
             });
          } else if (type === 'maison' && loc === 'maison') {
             card.classList.remove('hidden');
             gsap.fromTo(card, 
               { opacity: 0, scale: 0.95, minWidth: 0, flexBasis: 0, padding: 0, margin: 0, borderWidth: 0 }, 
               { opacity: 1, scale: 1, minWidth: 300, flexBasis: '100%', padding: 40, margin: 0, borderWidth: 1, duration: 0.4, ease: 'power2.inOut', clearProps: 'all' }
             );
          }
        });

        // 4. Swap ORION Content with cinematic transition
        const data = contentMap[loc];
        const targets = [orionDesc, orionSpec1, orionSpec2];
        
        gsap.to(targets, { 
          opacity: 0, y: 10, duration: 0.2, stagger: 0.05, 
          onComplete: () => {
            orionDesc.innerText = data.desc;
            orionSpec1.innerText = data.spec1;
            orionSpec2.innerText = data.spec2;
            gsap.to(targets, { opacity: 1, y: 0, duration: 0.4, stagger: 0.05 });
          } 
        });
      });
    });
  };
})();
