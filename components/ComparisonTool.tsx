'use client';

import { useState } from 'react';
import productsData from '@/data/products';

export default function ComparisonTool() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) => {
    setSelected(prev => prev.includes(id)
      ? prev.filter(x=>x!==id)
      : prev.length < 3 ? [...prev, id] : prev
    );
  };

  const items = productsData.filter(p => selected.includes(p.id));

  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-3xl md:text-5xl font-extrabold text-white">Compare Products</h2>
        <p className="mt-3 text-white/70">Choose up to 3 models to compare side-by-side.</p>
        
        {selected.length > 0 && (
          <div className="mt-4">
            <a 
              href={`/products/compare?products=${selected.join(',')}`}
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-colors"
            >
              View Full Comparison →
            </a>
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-2">
          {productsData.slice(0,12).map(p=>(
            <button key={p.id} onClick={()=>toggle(p.id)}
              className={`rounded-xl border px-3 py-2 text-sm ${selected.includes(p.id) ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-transparent' : 'border-white/15 bg-white/10 text-white/90 hover:bg-white/20'}`}>
              {p.name}
            </button>
          ))}
        </div>

        {/* Desktop table */}
        <div className="mt-8 overflow-x-auto hidden md:block">
          <table className="min-w-[720px] w-full border-separate border-spacing-0 rounded-2xl overflow-hidden">
            <thead>
              <tr>
                <th className="sticky left-0 z-10 bg-slate-900/60 backdrop-blur px-4 py-3 text-left text-white/80 border-b border-white/10">Spec</th>
                {items.map(i=>(
                  <th key={i.id} className="px-4 py-3 text-left text-white border-b border-white/10">{i.name}</th>
                ))}
              </tr>
            </thead>
            <tbody className="text-white/80">
              {[
                ['Plates', (i:any)=>i.plates || 'N/A'],
                ['pH Range', (i:any)=>i.phRange || 'N/A'],
                ['ORP', (i:any)=>i.orp || 'N/A'],
                ['Power', (i:any)=>i.power || 'N/A'],
                ['Warranty', (i:any)=>i.warranty || 'N/A'],
                ['Installation', (i:any)=>i.installation || 'N/A'],
                ['Dimensions', (i:any)=>i.dimensions || 'N/A'],
                ['Brand', (i:any)=>i.brand || 'N/A'],
              ].map(([label,get]:any)=>(
                <tr key={label as string}>
                  <td className="sticky left-0 bg-slate-900/40 backdrop-blur px-4 py-3 border-b border-white/10">{label as string}</td>
                  {items.map(i=>(
                    <td key={i.id+label} className="px-4 py-3 border-b border-white/10">{get(i)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="mt-6 grid grid-cols-1 gap-4 md:hidden">
          {items.map(i => (
            <div key={i.id} className="rounded-2xl border border-white/15 bg-white/5 p-4">
              <div className="text-white font-semibold mb-2">{i.name}</div>
              <div className="grid grid-cols-2 gap-2 text-sm text-white/80">
                <div className="rounded-lg bg-white/5 border border-white/10 px-3 py-2">Plates: <b className="text-white">{i.plates || 'N/A'}</b></div>
                <div className="rounded-lg bg-white/5 border border-white/10 px-3 py-2">pH: <b className="text-white">{i.phRange || 'N/A'}</b></div>
                <div className="rounded-lg bg-white/5 border border-white/10 px-3 py-2">ORP: <b className="text-white">{i.orp || 'N/A'}</b></div>
                <div className="rounded-lg bg-white/5 border border-white/10 px-3 py-2">Power: <b className="text-white">{i.power || 'N/A'}</b></div>
                <div className="rounded-lg bg-white/5 border border-white/10 px-3 py-2">Warranty: <b className="text-white">{i.warranty || 'N/A'}</b></div>
                <div className="rounded-lg bg-white/5 border border-white/10 px-3 py-2">Install: <b className="text-white">{i.installation || 'N/A'}</b></div>
              </div>
              <div className="mt-2 text-white/80 text-sm">Brand: <b className="text-white">{i.brand}</b></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
