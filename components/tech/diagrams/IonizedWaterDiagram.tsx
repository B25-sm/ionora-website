'use client';

import { useMemo } from 'react';

const prefersReduced = () =>
  typeof window === 'undefined'
    ? false
    : window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function IonizedWaterDiagram() {
  const reduced = useMemo(prefersReduced, []);
  return (
    <div className="w-full h-[340px] md:h-[420px] relative grid place-items-center">
      <svg viewBox="0 0 700 420" className="w-full h-full" role="img" aria-label="Ionized water split diagram">
        {/* Background gradient card */}
        <defs>
          <linearGradient id="alkGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#4fd1c5" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="acidGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#fb7185" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#f472b6" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="pipe" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <filter id="softBlur">
            <feGaussianBlur stdDeviation="2" />
          </filter>
        </defs>

        {/* Central cell */}
        <rect x="310" y="110" width="80" height="200" rx="16" fill="url(#pipe)" stroke="#94a3b8" opacity="0.9" />

        {/* Inlet pipe */}
        <rect x="20" y="190" width="290" height="40" rx="20" fill="url(#pipe)" opacity="0.6" />

        {/* Outlets */}
        <rect x="400" y="140" width="280" height="40" rx="20" fill="url(#alkGrad)" opacity="0.25" />
        <rect x="400" y="240" width="280" height="40" rx="20" fill="url(#acidGrad)" opacity="0.25" />

        {/* Flow particles */}
        {Array.from({ length: 26 }).map((_, i) => {
          const delay = reduced ? 0 : i * 0.18;
          return (
            <circle
              key={'in-' + i}
              cx={40 + (i * 10) % 280}
              cy={210}
              r="4"
              fill="#9bd8ff"
              opacity="0.8"
              style={reduced ? {} : { animation: `iw-in 2.2s linear ${delay}s infinite` }}
            />
          );
        })}

        {Array.from({ length: 18 }).map((_, i) => {
          const delay = reduced ? 0 : i * 0.22;
          return (
            <circle
              key={'alk-' + i}
              cx={410}
              cy={160}
              r="4"
              fill="#8af9d2"
              opacity="0.9"
              style={reduced ? {} : { animation: `iw-alk 2.4s ease-in-out ${delay}s infinite` }}
            />
          );
        })}
        {Array.from({ length: 18 }).map((_, i) => {
          const delay = reduced ? 0 : i * 0.22;
          return (
            <circle
              key={'acid-' + i}
              cx={410}
              cy={260}
              r="4"
              fill="#fca5a5"
              opacity="0.95"
              style={reduced ? {} : { animation: `iw-acid 2.4s ease-in-out ${delay}s infinite` }}
            />
          );
        })}

        {/* Labels */}
        <text x="540" y="130" textAnchor="middle" fill="#bbf7d0" fontSize="14">Alkaline (Drink)</text>
        <text x="540" y="290" textAnchor="middle" fill="#fecaca" fontSize="14">Acidic (External)</text>
      </svg>

      <style jsx>{`
        @keyframes iw-in {
          0% { transform: translateX(0); opacity: 0.2; }
          40% { opacity: 1; }
          100% { transform: translateX(260px); opacity: 0.2; }
        }
        @keyframes iw-alk {
          0% { transform: translateX(0); filter: drop-shadow(0 0 0px rgba(134,239,172,0.0)); }
          50% { transform: translateX(240px); filter: drop-shadow(0 0 6px rgba(134,239,172,0.6)); }
          100% { transform: translateX(280px); filter: drop-shadow(0 0 0px rgba(134,239,172,0.0)); }
        }
        @keyframes iw-acid {
          0% { transform: translateX(0); filter: drop-shadow(0 0 0px rgba(252,165,165,0.0)); }
          50% { transform: translateX(240px); filter: drop-shadow(0 0 6px rgba(252,165,165,0.6)); }
          100% { transform: translateX(280px); filter: drop-shadow(0 0 0px rgba(252,165,165,0.0)); }
        }
      `}</style>
    </div>
  );
}
