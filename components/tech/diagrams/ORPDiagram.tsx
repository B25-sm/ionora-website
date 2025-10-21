'use client';

export default function ORPDiagram() {
  return (
    <div className="w-full h-[340px] md:h-[420px] grid place-items-center">
      <svg viewBox="0 0 700 420" className="w-full h-full" role="img" aria-label="ORP visualization">
        {/* Axis */}
        <line x1="80" y1="340" x2="620" y2="340" stroke="white" strokeOpacity="0.2"/>
        <line x1="350" y1="80" x2="350" y2="360" stroke="white" strokeOpacity="0.2"/>
        <text x="350" y="75" fill="#93c5fd" fontSize="12" textAnchor="middle">0 mV</text>

        {/* Negative area */}
        <rect x="80" y="240" width="270" height="100" fill="#60a5fa" opacity="0.2"/>
        <text x="215" y="230" fill="#93c5fd" fontSize="12" textAnchor="middle">Antioxidant (−)</text>

        {/* Positive area */}
        <rect x="350" y="120" width="270" height="220" fill="#f87171" opacity="0.15"/>
        <text x="485" y="110" fill="#fecaca" fontSize="12" textAnchor="middle">Oxidizing (+)</text>

        {/* Indicator pulse (negative) */}
        <circle cx="210" cy="300" r="9" fill="#93c5fd">
          <animate attributeName="r" values="8;12;8" dur="2.2s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="1;0.6;1" dur="2.2s" repeatCount="indefinite"/>
        </circle>
        <text x="210" y="320" fill="#93c5fd" fontSize="12" textAnchor="middle">-600 mV</text>

        {/* Indicator (positive) */}
        <circle cx="490" cy="220" r="8" fill="#fca5a5"/>
        <text x="490" y="240" fill="#fecaca" fontSize="12" textAnchor="middle">+300 mV</text>
      </svg>
    </div>
  );
}
