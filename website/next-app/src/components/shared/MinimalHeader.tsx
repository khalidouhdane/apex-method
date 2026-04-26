'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './MinimalHeader.module.css';

export default function MinimalHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          APEX METHOD
        </Link>
        <Link href="#cta" className={`btn btn-solid-bronze ${styles.ctaBtn}`}>
          Commencer
        </Link>
      </div>
    </header>
  );
}
