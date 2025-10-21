'use client';

export default function ElectrolysisDiagram() {
  return (
    <div className="w-full h-[340px] md:h-[420px] grid place-items-center">
      <svg viewBox="0 0 700 420" className="w-full h-full" role="img" aria-label="Electrolysis cell">
        {/* Cell */}
        <rect x="180" y="100" width="340" height="220" rx="16" fill="rgba(148,163,184,0.15)" stroke="rgba(255,255,255,0.25)"/>
        {/* Anode / Cathode */}
        <rect x="220" y="120" width="40" height="180" rx="6" fill="#fca5a5" opacity="0.8"/>
        <rect x="440" y="120" width="40" height="180" rx="6" fill="#93c5fd" opacity="0.8"/>
        <text x="240" y="315" fill="#fecaca" fontSize="12" textAnchor="middle">Anode (+)</text>
        <text x="460" y="315" fill="#93c5fd" fontSize="12" textAnchor="middle">Cathode (−)</text>

        {/* Ion drift */}
        {Array.from({length:10}).map((_,i)=>(
          <text key={'h'+i} x={250 + i*18} y={180 + (i%2)*18} fill="#bbf7d0" fontSize="12">H⁺</text>
        ))}
        {Array.from({length:10}).map((_,i)=>(
          <text key={'oh'+i} x={440 - i*18} y={200 + (i%2)*18} fill="#c7d2fe" fontSize="12">OH⁻</text>
        ))}
        {/* Animation of small bubbles near cathode */}
        <circle cx="460" cy="180" r="4" fill="#a5f3fc">
          <animate attributeName="cy" values="180;150" dur="2s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="1;0" dur="2s" repeatCount="indefinite"/>
        </circle>
        <circle cx="475" cy="200" r="3" fill="#a5f3fc">
          <animate attributeName="cy" values="200;165" dur="2.2s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="1;0" dur="2.2s" repeatCount="indefinite"/>
        </circle>
      </svg>
    </div>
  );
}
