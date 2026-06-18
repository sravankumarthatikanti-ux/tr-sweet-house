import React from 'react';

export default function RoyalCrestLogo({ size = 44, animated = false }) {
  return (
    <svg 
      viewBox="0 0 120 120" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className="logo-crest"
      style={{ 
        width: size, 
        height: size, 
        filter: 'drop-shadow(0 0 8px rgba(212,175,55,0.6))', 
        display: 'block' 
      }}
    >
      {/* Animated / Spin components */}
      <g style={animated ? { transformOrigin: '60px 60px', animation: 'spin-mandala 45s linear infinite' } : {}}>
        {/* Outer Glow / Accent ring */}
        <circle cx="60" cy="60" r="56" stroke="rgba(212, 175, 55, 0.15)" strokeWidth="1" />
        
        {/* Concentric dashed golden border */}
        <circle cx="60" cy="60" r="52" stroke="var(--gold-accent)" strokeWidth="1.5" strokeDasharray="4 3" />
        
        {/* Outer solid golden ring */}
        <circle cx="60" cy="60" r="48" stroke="var(--gold-light)" strokeWidth="1" />
        
        {/* 8 Radial Mandala Petals/Stars around the ring */}
        <g stroke="var(--gold-accent)" strokeWidth="1" fill="var(--gold-accent)" opacity="0.85">
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * 45 * Math.PI) / 180;
            const x = 60 + 48 * Math.cos(angle);
            const y = 60 + 48 * Math.sin(angle);
            return (
              <path
                key={i}
                d={`M ${x} ${y-3} L ${x+3} ${y} L ${x} ${y+3} L ${x-3} ${y} Z`}
              />
            );
          })}
        </g>
      </g>

      {/* Static Crest Shield */}
      <g>
        {/* Central maroon shield with golden outline */}
        <path
          d="M 60 22 C 77 22 83 27 83 55 C 83 82 60 96 60 96 C 60 96 37 82 37 55 C 37 27 43 22 60 22 Z"
          fill="var(--maroon-dark)"
          stroke="var(--gold-accent)"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Inner shield border */}
        <path
          d="M 60 26 C 73 26 78 30 78 54 C 78 77 60 89 60 89 C 60 89 42 77 42 54 C 42 30 47 26 60 26 Z"
          fill="none"
          stroke="var(--gold-light)"
          strokeWidth="1"
          opacity="0.6"
        />

        {/* Golden Crown on top of the shield */}
        <path
          d="M 48 24 L 51 15 L 56 19 L 60 12 L 64 19 L 69 15 L 72 24 Z"
          fill="var(--gold-accent)"
          stroke="var(--gold-light)"
          strokeWidth="0.5"
          strokeLinejoin="round"
        />
        {/* Little crown jewels */}
        <circle cx="51" cy="14" r="0.8" fill="white" />
        <circle cx="60" cy="11" r="1" fill="white" />
        <circle cx="69" cy="14" r="0.8" fill="white" />

        {/* Intersecting Serif Monogram "TR" */}
        <g strokeLinecap="round" strokeLinejoin="round">
          {/* Letter T */}
          <path
            d="M 43 43 H 63 M 53 43 V 73 M 48 73 H 58"
            stroke="var(--gold-light)"
            strokeWidth="3.5"
          />
          {/* Letter R */}
          <path
            d="M 60 51 V 75 M 60 51 H 70 C 75 51 75 62 70 62 H 60 M 66 62 L 73 75 M 70 75 H 75"
            stroke="var(--gold-accent)"
            strokeWidth="3.5"
          />
        </g>
        
        {/* Small decorative flourishes inside shield */}
        <path d="M 48 80 C 54 84 66 84 72 80" stroke="rgba(212, 175, 55, 0.4)" strokeWidth="1" fill="none" />
      </g>
    </svg>
  );
}
