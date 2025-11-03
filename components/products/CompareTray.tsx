'use client';

import { X, Scale } from 'lucide-react';
import Image from 'next/image';

type Product = any;

type Props = {
  items: Product[];
  onRemove: (id: string) => void;
  onCompare: () => void;
};

export default function CompareTray({ items, onRemove, onCompare }: Props) {
  if (!items.length) return null;

  return (
    <div className="fixed bottom-4 sm:bottom-6 left-2 sm:left-1/2 sm:-translate-x-1/2 right-2 sm:right-auto z-[70] max-w-md sm:max-w-full">
      <div className="flex items-center gap-2 sm:gap-3 rounded-xl sm:rounded-2xl border border-[#0A2238]/20 bg-white/90 backdrop-blur-xl p-2 sm:p-3 text-[#0A2238] shadow-lg overflow-x-auto">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
          {items.map((p) => (
            <div key={p.id} className="relative flex items-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl border border-[#0A2238]/20 bg-white/80 p-1.5 sm:p-2 flex-shrink-0">
              <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-lg overflow-hidden border border-[#0A2238]/20 bg-white/80">
                <Image src={p.image} alt={p.name} fill sizes="40px" className="object-contain p-1" />
              </div>
              <span className="text-xs sm:text-sm max-w-[100px] sm:max-w-[160px] truncate text-[#0A2238]">{p.name}</span>
              <button
                className="p-0.5 sm:p-1 rounded-lg bg-[#0A2238]/10 hover:bg-[#0A2238]/20 border border-[#0A2238]/20 flex-shrink-0"
                onClick={() => onRemove(p.id)}
                aria-label={`Remove ${p.name}`}
              >
                <X className="w-3 h-3 sm:w-4 sm:h-4 text-[#0A2238]"/>
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={onCompare}
          className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl border border-[#0A2238]/50 text-white bg-[#0A2238] hover:bg-[#0A2238]/80 shadow-lg flex-shrink-0 text-xs sm:text-sm whitespace-nowrap"
        >
          <Scale className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Compare</span> {items.length}
        </button>
      </div>
    </div>
  );
}
