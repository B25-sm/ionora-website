'use client';
import { useEffect, useMemo, useRef, useState } from 'react';

type MFItem = { id: string; myth: string; fact: string };

const CARD_INTERVAL = 3500;

export default function MythsFacts() {
  // Replace with your real data source if present
  const items: MFItem[] = useMemo(() => [
    { id: 'm1', myth: 'Ionizers turn water into medicine', fact: 'They change pH/ORP; they are not medicines.' },
    { id: 'm2', myth: 'Any ionizer produces the same quality', fact: 'Plate design, power and flow impact results.' },
    { id: 'm3', myth: 'Alkaline water is dangerous', fact: 'Moderate alkaline levels are safe for daily use.' },
    { id: 'm4', myth: 'Tap water is enough', fact: 'Filtration+ionization can improve taste and ORP.' },
    { id: 'm5', myth: 'Ionizers are just expensive filters', fact: 'They perform electrolysis beyond standard filters.' },
  ], []);

  const [flippedIds, setFlippedIds] = useState<Set<string>>(new Set());
  const pauseRef = useRef(false);

  // Respect reduced motion
  const prefersReducedMotion = typeof window !== 'undefined'
    && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (prefersReducedMotion) return;
    let idx = 0;
    const ids = items.map(i => i.id);
    const t = setInterval(() => {
      if (pauseRef.current) return;
      setFlippedIds(prev => {
        const next = new Set(prev);
        const id = ids[idx];
        // toggle one card per tick
        if (next.has(id)) next.delete(id); else next.add(id);
        idx = (idx + 1) % ids.length;
        return next;
      });
    }, CARD_INTERVAL);
    return () => clearInterval(t);
  }, [items, prefersReducedMotion]);

  return (
    <section className="page-wrap section-pad">
      <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-8">Myths vs Facts</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {items.map(({ id, myth, fact }) => {
          const flipped = flippedIds.has(id);
          return (
            <div
              key={id}
              className="relative rounded-3xl border border-white/15 bg-white/5 overflow-hidden"
              onMouseEnter={() => { pauseRef.current = true; setFlippedIds(s => new Set(s).add(id)); }}
              onMouseLeave={() => { pauseRef.current = false; setFlippedIds(s => { const n = new Set(s); n.delete(id); return n; }); }}
            >
              <div className="relative perspective-1000">
                {/* Rotator */}
                <div
                  className={[
                    'relative h-full min-h-[220px] sm:min-h-[260px] md:min-h-[280px]',
                    'transition-transform duration-700 preserve-3d will-change-transform',
                    flipped ? 'rotate-y-180' : '',
                  ].join(' ')}
                >
                  {/* FRONT (Myth) */}
                  <div
                    aria-hidden={flipped}
                    className="absolute inset-0 backface-hidden p-6 md:p-8 flex flex-col justify-center"
                  >
                    <div className="text-rose-300 font-semibold mb-3 flex items-center gap-2">
                      <span>Myth</span> <span>✖</span>
                    </div>
                    <p className="text-white/90 text-lg md:text-xl leading-relaxed">{myth}</p>
                  </div>

                  {/* BACK (Fact) */}
                  <div
                    aria-hidden={!flipped}
                    className="absolute inset-0 backface-hidden rotate-y-180 p-6 md:p-8 flex flex-col justify-center"
                  >
                    <div className="text-emerald-300 font-semibold mb-3 flex items-center gap-2">
                      <span>Fact</span> <span>✓</span>
                    </div>
                    <p className="text-white/90 text-lg md:text-xl leading-relaxed">{fact}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
