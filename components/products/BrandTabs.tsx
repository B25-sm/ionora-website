'use client';
import { useMemo } from 'react';
import { BRANDS } from '@/data/brands';

type Props = {
  active: string | 'all';
  onChange: (id: string | 'all') => void;
};

export default function BrandTabs({ active, onChange }: Props) {
  const tabs = useMemo(() => [{ id: 'all' as const, name: 'All Brands' }, ...BRANDS], []);

  return (
    <div className="flex flex-wrap gap-2 md:gap-3">
      {tabs.map((b) => {
        const isActive = active === b.id;
        return (
          <button
            key={b.id}
            onClick={() => onChange(b.id)}
            className={[
              'px-4 py-2 rounded-2xl border backdrop-blur-xl transition-all',
              isActive
                ? 'bg-white/10 border-white/30 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.08)]'
                : 'bg-white/5 border-white/15 text-white/80 hover:bg-white/10',
            ].join(' ')}
          >
            {b.name}
          </button>
        );
      })}
    </div>
  );
}
