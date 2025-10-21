'use client';

import { useState } from 'react';
import { Activity, Droplets, FlaskConical, Sparkles } from 'lucide-react';

const tabs = [
  { id: 'ionized', label: 'Ionized Water', icon: Droplets, content: 'Ionized water is produced via electrolysis, creating alkaline and acidic streams.' },
  { id: 'ph', label: 'pH Scale', icon: Activity, content: 'Adjustable pH from mildly acidic to highly alkaline for different use cases.' },
  { id: 'orp', label: 'ORP', icon: FlaskConical, content: 'Negative ORP indicates antioxidant potential measured in millivolts.' },
  { id: 'electrolysis', label: 'Electrolysis', icon: Sparkles, content: 'Water passes across charged plates separating ions to shift pH & ORP.' }
];

export default function TechnologySection() {
  const [active, setActive] = useState('ionized');

  return (
    <section className="relative section-pad">
      <div className="page-wrap">
        <h2 className="text-3xl md:text-5xl font-extrabold text-white">Technology</h2>
        <p className="mt-3 text-white/70">Understand pH, ORP and the electrolysis process.</p>

        <div className="mt-8 flex flex-wrap gap-3">
          {tabs.map(t => {
            const Icon = t.icon;
            const isActive = active === t.id;
            return (
              <button key={t.id} onClick={()=>setActive(t.id)} className={`flex items-center gap-2 rounded-xl px-4 py-2 border ${isActive ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-transparent' : 'bg-white/10 text-white/90 border-white/15 hover:bg-white/20'}`}>
                <Icon className="h-4 w-4" /> {t.label}
              </button>
            );
          })}
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur-xl text-white/90">
            <h3 className="text-xl font-semibold mb-2">{tabs.find(t=>t.id===active)?.label}</h3>
            <p>{tabs.find(t=>t.id===active)?.content}</p>
            <div className="mt-6 h-2 w-full rounded-full bg-white/10 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 animate-[gradient_3s_linear_infinite] w-1/2"></div>
            </div>
          </div>
          <div className="rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur-xl">
            <div className="aspect-video rounded-2xl border border-white/10 bg-gradient-to-br from-blue-900/40 to-purple-900/40 grid place-items-center text-white/70">
              Animated diagram placeholder
            </div>
            <ul className="mt-6 grid grid-cols-2 gap-3 text-sm text-white/80">
              {['Neutralizes Acidity','Reduces Acid Reflux','Antioxidant Properties','Superior Hydration','Detoxification','Energy & Metabolism','Bone Health','Skin Health & Anti-Aging','Cardio Support','General Wellness'].map(i=>(
                <li key={i} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">{i}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
