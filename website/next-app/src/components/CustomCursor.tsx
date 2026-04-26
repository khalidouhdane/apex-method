'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './CustomCursor.module.css';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if it's a touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let fx = mx;
    let fy = my;
    let animationFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      mx = e.clientX;
      my = e.clientY;

      if (cursorRef.current) {
        // Direct update for the dot for zero latency
        cursorRef.current.style.transform = `translate(${mx - 4}px, ${my - 4}px)`;
      }
    };

    const animateFollower = () => {
      // Lerp for smooth inertia
      fx += (mx - fx) * 0.15;
      fy += (my - fy) * 0.15;

      if (followerRef.current) {
        followerRef.current.style.transform = `translate(${fx - 18}px, ${fy - 18}px)`;
      }

      animationFrameId = requestAnimationFrame(animateFollower);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if we are hovering over an interactive element
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('interactive') ||
        target.closest('.interactive')
      ) {
        setIsHovering(true);
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('interactive') ||
        target.closest('.interactive')
      ) {
        setIsHovering(false);
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    animateFollower();

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  // If not visible yet, return null (prevents cursor from sitting in top left on initial load)
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      <div 
        ref={cursorRef} 
        className={`${styles.customCursor} ${isVisible ? styles.visible : ''}`} 
      />
      <div 
        ref={followerRef} 
        className={`${styles.cursorFollower} ${isVisible ? styles.visible : ''} ${isHovering ? styles.hovering : ''}`} 
      />
    </>
  );
}
