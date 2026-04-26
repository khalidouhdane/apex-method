'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface CounterAnimationProps {
  end: number;
  duration?: number;
  delay?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export default function CounterAnimation({
  end,
  duration = 2,
  delay = 0,
  prefix = '',
  suffix = '',
  className = '',
}: CounterAnimationProps) {
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    // Use GSAP ScrollTrigger if available, otherwise just animate
    import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      gsap.registerPlugin(ScrollTrigger);

      gsap.fromTo(
        node,
        { innerHTML: 0 },
        {
          innerHTML: end,
          duration: duration,
          delay: delay,
          ease: 'power2.out',
          snap: { innerHTML: 1 },
          scrollTrigger: {
            trigger: node,
            start: 'top 85%',
          },
          onUpdate: function () {
            node.innerHTML = `${prefix}${Math.round(Number(this.targets()[0].innerHTML))}${suffix}`;
          },
        }
      );
    });
  }, [end, duration, delay, prefix, suffix]);

  return (
    <span ref={nodeRef} className={className}>
      {prefix}0{suffix}
    </span>
  );
}
