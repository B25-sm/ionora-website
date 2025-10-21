'use client';

import { useState } from 'react';
import IonizedWaterDiagram from './diagrams/IonizedWaterDiagram';
import PHScaleDiagram from './diagrams/PHScaleDiagram';
import ORPDiagram from './diagrams/ORPDiagram';
import ElectrolysisDiagram from './diagrams/ElectrolysisDiagram';
import { Beaker, Activity, Zap, Shuffle } from 'lucide-react';

type TabKey = 'ionized' | 'ph' | 'orp' | 'electro';

const TABS: { key: TabKey; label: string; icon: any; }[] = [
  { key: 'ionized', label: 'Ionized Water', icon: Beaker },
  { key: 'ph', label: 'pH Scale', icon: Activity },
  { key: 'orp', label: 'ORP', icon: Zap },
  { key: 'electro', label: 'Electrolysis', icon: Shuffle },
];

export default function TechTabs() {
  const [tab, setTab] = useState<TabKey>('ionized');

  return (
    <section className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
      <header className="mb-6 md:mb-8">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
          Technology
        </h2>
        <p className="text-white/70 mt-2 md:mt-3">
          Understand pH, ORP and the electrolysis process.
        </p>
      </header>

      {/* Tabs */}
      <div className="flex flex-wrap gap-3 mb-6">
        {TABS.map(({ key, label, icon: Icon }) => {
          const active = tab === key;
          return (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={[
                'inline-flex items-center gap-2 px-4 py-2 rounded-2xl border',
                'backdrop-blur-xl transition-all',
                active
                  ? 'bg-white/10 border-white/30 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.08)]'
                  : 'bg-white/5 border-white/15 text-white/80 hover:bg-white/10',
              ].join(' ')}
              aria-pressed={active}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </button>
          );
        })}
      </div>

      {/* Content grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left: Explainer */}
        <article className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 md:p-8 text-white">
          {tab === 'ionized' && <IonizedCopy />}
          {tab === 'ph' && <PHCopy />}
          {tab === 'orp' && <ORPCopy />}
          {tab === 'electro' && <ElectroCopy />}
        </article>

        {/* Right: Animated diagram */}
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 md:p-6">
          {tab === 'ionized' && <IonizedWaterDiagram />}
          {tab === 'ph' && <PHScaleDiagram />}
          {tab === 'orp' && <ORPDiagram />}
          {tab === 'electro' && <ElectrolysisDiagram />}
        </div>
      </div>
    </section>
  );
}

function IonizedCopy() {
  return (
    <div>
      <h3 className="text-2xl md:text-3xl font-bold">Ionized Water</h3>
      <p className="text-white/80 mt-3">
        Ionized water is produced via electrolysis, separating incoming water
        into alkaline and acidic streams. The alkaline stream contains dissolved
        hydrogen (H₂) and negative ORP, while the acidic stream is suitable for
        cleaning and skincare.
      </p>
      <ul className="mt-4 space-y-2 text-white/80">
        <li>• Better hydration via micro-clustering</li>
        <li>• Antioxidant-rich (H₂) with negative ORP</li>
        <li>• Adjustable pH for use-cases (drinking, cooking, cleaning)</li>
      </ul>
    </div>
  );
}

function PHCopy() {
  return (
    <div>
      <h3 className="text-2xl md:text-3xl font-bold">pH Scale</h3>
      <p className="text-white/80 mt-3">
        pH measures acidity/alkalinity from 0–14. Neutral is 7. Ionizers allow
        choosing mildly alkaline water for drinking (e.g., 8.5–9.5), while
        acidic water (e.g., 5–6) can be used for external applications.
      </p>
    </div>
  );
}

function ORPCopy() {
  return (
    <div>
      <h3 className="text-2xl md:text-3xl font-bold">ORP (Oxidation Reduction Potential)</h3>
      <p className="text-white/80 mt-3">
        ORP indicates the tendency to donate or accept electrons (antioxidant vs
        oxidizing). Ionized water often shows negative ORP (e.g., −200 to −800mV),
        signaling antioxidant potential due to dissolved hydrogen.
      </p>
    </div>
  );
}

function ElectroCopy() {
  return (
    <div>
      <h3 className="text-2xl md:text-3xl font-bold">Electrolysis</h3>
      <p className="text-white/80 mt-3">
        During electrolysis, water passes through ion-selective plates with a DC
        potential applied. H⁺ and OH⁻ ions separate into acidic and alkaline streams.
        Plate area, power, and flow-rate influence final pH and ORP.
      </p>
      <ul className="mt-4 space-y-2 text-white/80">
        <li>• Larger plate area → higher throughput</li>
        <li>• Controlled power → stable pH/ORP</li>
        <li>• Proper flow rate → consistent results</li>
      </ul>
    </div>
  );
}
