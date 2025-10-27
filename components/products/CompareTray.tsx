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
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[70]">
      <div className="flex items-center gap-3 rounded-2xl border border-[#B45253]/20 bg-white/90 backdrop-blur-xl p-3 text-[#B45253] shadow-lg">
        {items.map((p) => (
          <div key={p.id} className="relative flex items-center gap-2 rounded-xl border border-[#B45253]/20 bg-white/80 p-2">
            <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-[#B45253]/20 bg-white/80">
              <Image src={p.image} alt={p.name} fill sizes="40px" className="object-contain p-1" />
            </div>
            <span className="text-sm max-w-[160px] truncate text-[#B45253]">{p.name}</span>
            <button
              className="p-1 rounded-lg bg-[#B45253]/10 hover:bg-[#B45253]/20 border border-[#B45253]/20"
              onClick={() => onRemove(p.id)}
              aria-label={`Remove ${p.name}`}
            >
              <X className="w-4 h-4 text-[#B45253]"/>
            </button>
          </div>
        ))}
        <button
          onClick={onCompare}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[#B45253]/50 text-white bg-[#B45253] hover:bg-[#B45253]/80 shadow-lg"
        >
          <Scale className="w-4 h-4" />
          Compare {items.length}
        </button>
      </div>
    </div>
  );
}
