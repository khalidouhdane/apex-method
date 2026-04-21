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
   * Handles the Tous/Maison/Salle/Abonnement toggle logic for the program grid.
   */
  APEX.initProgramFilters = function() {
    const filterBtns = document.querySelectorAll('.filter-btn-new');
    const slider = document.querySelector('.filter-slider-new');
    
    // Select only the cards inside the slider
    const sliderCards = document.querySelectorAll('.programs-slider-new .prog-hero-card');

    if (filterBtns.length === 0) return;

    // Initialize slider position
    function updateSlider(btn) {
      if (slider) {
        slider.style.width = `${btn.offsetWidth}px`;
        slider.style.transform = `translateX(${btn.offsetLeft}px)`;
      }
    }

    // Set initial position based on active button
    const activeBtn = document.querySelector('.filter-btn-new.active') || filterBtns[0];
    if (activeBtn) {
      // Need a small timeout to let the DOM render the button widths
      setTimeout(() => updateSlider(activeBtn), 50);
    }

    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const loc = btn.getAttribute('data-location');
        
        // 1. Update UI Classes
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // 2. Move Slider
        updateSlider(btn);

        // 3. Filter Logic
        gsap.to(sliderCards, {
          opacity: 0,
          y: 10,
          duration: 0.3,
          ease: 'power2.inOut',
          onComplete: () => {
            
            // Hide everything first
            sliderCards.forEach(c => {
              c.classList.add('hidden');
              c.style.display = 'none';
            });
            
            // Logic based on filter selection
            if (loc === 'tous') {
              sliderCards.forEach(c => {
                c.classList.remove('hidden');
                c.style.display = '';
              });
            } 
            else {
              sliderCards.forEach(c => {
                if (c.dataset.locationType === loc) {
                  c.classList.remove('hidden');
                  c.style.display = '';
                }
              });
            }

            // Animate visible ones back in
            const visibleCards = Array.from(sliderCards).filter(c => !c.classList.contains('hidden'));
            
            // Scroll slider to start when filter changes
            const sliderContainer = document.querySelector('.programs-slider-new');
            if (sliderContainer) {
              sliderContainer.scrollTo({ left: 0, behavior: 'smooth' });
            }

            if (visibleCards.length > 0) {
              gsap.to(visibleCards, {
                opacity: 1,
                y: 0,
                duration: 0.4,
                stagger: 0.1,
                ease: 'power2.out',
                clearProps: 'all'
              });
            }
          }
        });
      });
    });

    // Add drag-to-scroll functionality for desktop
    const sliderContainer = document.querySelector('.programs-slider-new');
    if (sliderContainer) {
      let isDown = false;
      let startX;
      let scrollLeft;

      sliderContainer.addEventListener('mousedown', (e) => {
        isDown = true;
        sliderContainer.classList.add('dragging'); // Optional styling
        startX = e.pageX - sliderContainer.offsetLeft;
        scrollLeft = sliderContainer.scrollLeft;
        
        // Temporarily disable snap during drag for smooth feeling
        sliderContainer.style.scrollSnapType = 'none';
      });

      sliderContainer.addEventListener('mouseleave', () => {
        isDown = false;
        sliderContainer.style.scrollSnapType = 'x mandatory';
      });

      sliderContainer.addEventListener('mouseup', () => {
        isDown = false;
        sliderContainer.style.scrollSnapType = 'x mandatory';
      });

      sliderContainer.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - sliderContainer.offsetLeft;
        const walk = (x - startX) * 2; // Scroll speed multiplier
        sliderContainer.scrollLeft = scrollLeft - walk;
      });
    }
  };
})();
