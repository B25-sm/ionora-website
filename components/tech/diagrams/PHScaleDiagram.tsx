'use client';

export default function PHScaleDiagram() {
  const stops = [
    { c:'#ef4444', p:0 },   // acidic
    { c:'#f59e0b', p:16 },
    { c:'#22c55e', p:50 },  // neutral
    { c:'#38bdf8', p:84 },
    { c:'#6366f1', p:100 }  // alkaline
  ];
  const marks = Array.from({length:15}).map((_,i)=>i); // 0..14

  return (
    <div className="w-full h-[340px] md:h-[420px] grid place-items-center">
      <svg viewBox="0 0 700 420" className="w-full h-full" role="img" aria-label="pH scale bar">
        <defs>
          <linearGradient id="phbar" x1="0" y1="0" x2="1" y2="0">
            {stops.map((s,i)=>(
              <stop key={i} offset={`${s.p}%`} stopColor={s.c}/>
            ))}
          </linearGradient>
        </defs>
        <rect x="80" y="180" width="540" height="36" rx="18" fill="url(#phbar)" opacity="0.9"/>
        {marks.map((m)=>(
          <g key={m}>
            <line x1={80 + (m*(540/14))} y1="170" x2={80 + (m*(540/14))} y2="230" stroke="white" strokeOpacity="0.15"/>
            <text x={80 + (m*(540/14))} y="250" fill="white" opacity="0.8" fontSize="12" textAnchor="middle">{m}</text>
          </g>
        ))}
        <text x="80" y="165" fill="#fecaca" fontSize="13">Acidic</text>
        <text x="350" y="165" fill="#bbf7d0" fontSize="13" textAnchor="middle">Neutral (7)</text>
        <text x="620" y="165" fill="#c7d2fe" fontSize="13" textAnchor="end">Alkaline</text>
      </svg>
    </div>
  );
}
