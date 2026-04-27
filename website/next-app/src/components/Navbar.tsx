'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ApexLogo from './ApexLogo';
import styles from './Navbar.module.css';

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const nav = navRef.current;
    if (!nav) return;

    // Reveal nav with a smooth fade
    gsap.to(nav, {
      visibility: 'visible',
      opacity: 1,
      duration: 0.6,
      delay: 0.3,
      ease: 'power2.out',
    });

    let lastScrollY = window.scrollY;
    let scrollUpDistance = 0;

    // Scroll-triggered glassmorphism and hide/show logic
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;

      // 1. Glassmorphism state
      if (currentScrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }

      // 2. Hide/Show based on scroll direction with threshold
      if (currentScrollY <= 100) {
        nav.classList.remove('hidden');
        scrollUpDistance = 0;
      } else if (delta > 0) {
        // Scrolling down
        nav.classList.add('hidden');
        scrollUpDistance = 0;
      } else if (delta < 0) {
        // Scrolling up
        scrollUpDistance += Math.abs(delta);
        if (scrollUpDistance > 300) {
          nav.classList.remove('hidden');
        }
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <nav ref={navRef} className={styles.nav} id="nav">
        <div className={styles.navLeft}>
          <Link href="#programmes" className={styles.navLink}>
            Programmes
          </Link>
          <Link href="#methode" className={styles.navLink}>
            La Méthode
          </Link>
          <Link href="#blog" className={styles.navLink}>
            Blog
          </Link>
        </div>
        <Link href="/" className={styles.navLogo}>
          <ApexLogo className={styles.logoSvg} />
        </Link>
        <div className={styles.navRight}>
          <Link href="/quiz" className={styles.navCta}>
            Trouver mon programme
          </Link>
        </div>
        <button
          className={`${styles.menuToggle} ${mobileOpen ? styles.menuOpen : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          <span />
          <span />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${mobileOpen ? styles.mobileMenuOpen : ''}`}>
        <div className={styles.mobileMenuInner}>
          <Link
            href="#programmes"
            className={styles.mobileLink}
            onClick={() => setMobileOpen(false)}
          >
            Programmes
          </Link>
          <Link
            href="#methode"
            className={styles.mobileLink}
            onClick={() => setMobileOpen(false)}
          >
            La Méthode
          </Link>
          <Link
            href="#blog"
            className={styles.mobileLink}
            onClick={() => setMobileOpen(false)}
          >
            Blog
          </Link>
          <Link
            href="/quiz"
            className={styles.mobileCta}
            onClick={() => setMobileOpen(false)}
          >
            Trouver mon programme
          </Link>
        </div>
      </div>
    </>
  );
}
