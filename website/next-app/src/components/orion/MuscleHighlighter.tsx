'use client';

import React from 'react';
import Model from 'react-body-highlighter';
import styles from './MuscleHighlighter.module.css';

interface MuscleHighlighterProps {
  title: string;
  muscles: string[];
  type?: 'anterior' | 'posterior';
  highlightColor?: string;
  className?: string;
}

export default function MuscleHighlighter({
  title,
  muscles,
  type = 'anterior',
  highlightColor = '#c07133', // Default to Orion accent bronze
  className = '',
}: MuscleHighlighterProps) {
  const highlightData = [
    {
      name: title,
      muscles: muscles,
    },
  ];

  return (
    <div className={`${styles.card} ${className}`}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.modelWrapper}>
        <Model
          data={highlightData as React.ComponentProps<typeof Model>['data']}
          style={{ width: '100%', padding: '10px' }}
          highlightedColors={[highlightColor]}
          type={type}
        />
      </div>
    </div>
  );
}
