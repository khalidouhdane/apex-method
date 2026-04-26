'use client';

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

type MuscleGroup = 'head' | 'shoulders' | 'chest' | 'core' | 'arms' | 'forearms' | 'quads' | 'calves';

interface ScratchAnatomyProps {
  activeMuscles?: MuscleGroup[];
  focus?: 'full' | 'upper' | 'lower';
  interactive?: boolean;
}

// 100% mathematically coded from scratch. A high-fidelity geometric wireframe mesh.
const POLYGONS: Record<MuscleGroup, string[]> = {
  head: [
    "140,20 160,20 165,30 165,50 160,65 150,75 140,65 135,50 135,30", // skull/jaw
    "140,75 160,75 155,85 145,85" // neck
  ],
  shoulders: [
    "145,85 125,85 105,95 100,120 110,135 125,115", // L Deltoid
    "155,85 175,85 195,95 200,120 190,135 175,115"  // R Deltoid
  ],
  chest: [
    "150,95 125,100 120,130 150,135", // L Pec
    "150,95 175,100 180,130 150,135"  // R Pec
  ],
  core: [
    "150,135 135,135 135,155 150,160", // L Abs 1
    "150,135 165,135 165,155 150,160", // R Abs 1
    "150,160 135,155 135,180 150,185", // L Abs 2
    "150,160 165,155 165,180 150,185", // R Abs 2
    "150,185 138,180 140,205 150,210", // L Abs 3
    "150,185 162,180 160,205 150,210", // R Abs 3
    "135,135 120,145 125,180 138,180", // L Oblique
    "165,135 180,145 175,180 162,180", // R Oblique
    "150,210 140,230 150,240 160,230"  // Pelvis center
  ],
  arms: [
    "110,135 100,140 90,170 105,175 120,145", // L Bicep
    "100,120 85,130 80,165 90,170 100,140",   // L Tricep
    "190,135 200,140 210,170 195,175 180,145", // R Bicep
    "200,120 215,130 220,165 210,170 200,140"  // R Tricep
  ],
  forearms: [
    "90,170 80,165 65,210 75,225 90,200 105,175", // L Forearm
    "210,170 220,165 235,210 225,225 210,200 195,175" // R Forearm
  ],
  quads: [
    "140,230 130,240 125,300 135,340 145,340", // L Rectus
    "130,240 115,240 105,280 110,330 125,350 135,340", // L Vastus
    "160,230 170,240 175,300 165,340 155,340", // R Rectus
    "170,240 185,240 195,280 190,330 175,350 165,340"  // R Vastus
  ],
  calves: [
    "125,350 120,380 140,380 145,340", // L Knee
    "175,350 180,380 160,380 155,340", // R Knee
    "120,380 105,420 110,480 125,500 140,480 140,380", // L Calf
    "180,380 195,420 190,480 175,500 160,480 160,380", // R Calf
    "125,500 115,520 110,540 140,540 140,500", // L Foot
    "175,500 185,520 190,540 160,540 160,500"  // R Foot
  ]
};

export default function ScratchAnatomy({ 
  activeMuscles = [], 
  focus = 'full',
  interactive = true 
}: ScratchAnatomyProps) {
  const [hovered, setHovered] = useState<MuscleGroup | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // Focus ViewBox mapping
  let viewBox = "0 0 300 560";
  if (focus === 'upper') viewBox = "0 0 300 280";
  if (focus === 'lower') viewBox = "0 230 300 330";

  // Animation effect on mount
  useEffect(() => {
    if (!svgRef.current) return;
    const polygons = svgRef.current.querySelectorAll('polygon');
    
    gsap.fromTo(polygons, 
      { strokeDasharray: 400, strokeDashoffset: 400, opacity: 0 },
      { strokeDashoffset: 0, opacity: 1, duration: 2, ease: "power3.out", stagger: 0.02 }
    );
  }, []);

  const getFill = (muscle: MuscleGroup) => {
    if (activeMuscles.includes(muscle) || hovered === muscle) {
      return 'rgba(196, 107, 42, 0.4)'; // Orion bronze with opacity
    }
    return 'rgba(255,255,255,0.01)';
  };

  const getStroke = (muscle: MuscleGroup) => {
    if (activeMuscles.includes(muscle) || hovered === muscle) {
      return 'rgba(196, 107, 42, 1)'; // Solid bronze
    }
    return 'rgba(255,255,255,0.15)';
  };

  const handleEnter = (m: MuscleGroup) => interactive && setHovered(m);
  const handleLeave = () => interactive && setHovered(null);

  return (
    <div ref={containerRef} style={{
      width: '100%',
      aspectRatio: '1/1',
      background: 'radial-gradient(circle at center, rgba(30,30,30,1) 0%, rgba(15,13,11,1) 100%)',
      borderRadius: '24px',
      border: '1px solid rgba(255,255,255,0.08)',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      boxShadow: hovered ? '0 0 40px rgba(196, 107, 42, 0.15)' : 'inset 0 0 50px rgba(0,0,0,0.5)',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative'
    }}>
      
      {/* Background Tech Grid */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
        backgroundSize: '20px 20px',
        opacity: 0.5
      }} />

      <svg 
        ref={svgRef}
        viewBox={viewBox} 
        style={{ 
          width: '100%', 
          height: '100%', 
          filter: hovered ? 'drop-shadow(0px 0px 12px rgba(196,107,42,0.6))' : 'drop-shadow(0px 0px 8px rgba(0,0,0,0.8))',
          position: 'relative',
          zIndex: 2,
          transition: 'all 0.4s ease'
        }}
      >
        <g strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          {Object.entries(POLYGONS).map(([groupName, pointsArray]) => {
            const mGroup = groupName as MuscleGroup;
            return (
              <g 
                key={mGroup}
                fill={getFill(mGroup)} 
                stroke={getStroke(mGroup)} 
                style={{ 
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: interactive ? 'crosshair' : 'default'
                }}
                onMouseEnter={() => handleEnter(mGroup)} 
                onMouseLeave={handleLeave}
              >
                {pointsArray.map((pts, i) => (
                  <polygon key={i} points={pts} />
                ))}
              </g>
            );
          })}
        </g>
      </svg>
      
      {/* HUD Overlay */}
      {hovered && (
        <div style={{
          position: 'absolute',
          bottom: '24px',
          background: 'rgba(15,13,11,0.9)',
          color: 'var(--orion-accent)',
          padding: '6px 16px',
          borderRadius: '4px',
          fontSize: '11px',
          fontWeight: 'bold',
          letterSpacing: '3px',
          border: '1px solid rgba(196,107,42,0.4)',
          textTransform: 'uppercase',
          backdropFilter: 'blur(4px)',
          zIndex: 10,
          animation: 'pulse 2s infinite'
        }}>
          SYS.{hovered} // ACTIVE
        </div>
      )}
    </div>
  );
}
