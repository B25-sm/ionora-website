'use client';

import { useEffect, useState } from 'react';

function usePrefersReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Realistic glossy water droplet (SVG)
 * - Radial fill (light top → deep blue bottom)
 * - Specular highlight
 * - Animated shine sweep (paused if prefers-reduced-motion)
 * - Gentle float animation
 * - Soft caustic glow under the drop
 */
export default function WaterDroplet() {
  const reduced = usePrefersReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="relative w-full h-full grid place-items-center pointer-events-none">
      {/* Caustic glow on the "floor" */}
      <div
        aria-hidden
        className="absolute -bottom-2 md:-bottom-3 w-40 md:w-56 h-10 md:h-14 rounded-full blur-2xl"
        style={{
          background:
            'radial-gradient(60% 60% at 50% 50%, rgba(56,189,248,0.28) 0%, rgba(59,130,246,0.15) 55%, rgba(59,130,246,0.00) 100%)',
          opacity: 0.9,
        }}
      />

      {/* Droplet */}
      <div
        className={[
          'relative',
          'w-[150px] md:w-[200px] lg:w-[230px]',
          'aspect-[200/260]',
          reduced ? '' : 'animate-float-slow',
        ].join(' ')}
      >
        <svg
          viewBox="0 0 200 260"
          className="w-full h-full"
          role="img"
          aria-label="Water droplet"
        >
          <defs>
            {/* Fill gradient: light aqua → deep blue */}
            <radialGradient id="dropFill" cx="50%" cy="28%" r="70%">
              <stop offset="0%" stopColor="#a8eaff" />
              <stop offset="35%" stopColor="#6fd3ff" />
              <stop offset="75%" stopColor="#2593d8" />
              <stop offset="100%" stopColor="#0b4c7a" />
            </radialGradient>

            {/* Subtle glow / shadow */}
            <filter id="dropGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="6" result="blur" />
              <feOffset dy="1" result="off" />
              <feMerge>
                <feMergeNode in="off" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Clip path matching droplet shape (for shine sweep) */}
            <clipPath id="dropClip">
              <path d="M100,0 C135,40 165,90 170,130 C176,176 148,220 100,220 C52,220 24,176 30,130 C35,90 65,40 100,0 Z" />
            </clipPath>

            {/* Shine gradient (white → transparent) */}
            <linearGradient id="shineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="white" stopOpacity="0.85" />
              <stop offset="50%" stopColor="white" stopOpacity="0.25" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Body */}
          <g filter="url(#dropGlow)">
            <path
              d="M100,0 C135,40 165,90 170,130 C176,176 148,220 100,220 C52,220 24,176 30,130 C35,90 65,40 100,0 Z"
              fill="url(#dropFill)"
            />
          </g>

          {/* Specular highlight (top-left) */}
          <ellipse cx="78" cy="58" rx="22" ry="14" fill="white" opacity="0.45" />
          <ellipse cx="85" cy="72" rx="10" ry="6" fill="white" opacity="0.35" />

          {/* Bottom refraction highlight */}
          <ellipse cx="110" cy="198" rx="24" ry="8" fill="white" opacity="0.08" />

          {/* Moving shine sweep */}
          <g clipPath="url(#dropClip)" style={{ mixBlendMode: 'screen' }}>
            <rect
              x="-220"
              y="-50"
              width="440"
              height="360"
              fill="url(#shineGrad)"
              className={mounted && !reduced ? 'animate-shine-sweep' : ''}
              transform="rotate(18)"
              opacity="0.55"
            />
          </g>

          {/* Subtle rim line */}
          <path
            d="M100,0 C135,40 165,90 170,130 C176,176 148,220 100,220 C52,220 24,176 30,130 C35,90 65,40 100,0 Z"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="1"
            fill="transparent"
          />
        </svg>
      </div>
    </div>
  );
}
