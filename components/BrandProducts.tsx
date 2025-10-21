'use client';

import { useMemo, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import type { Product } from '@/data/schema';

export default function BrandProducts({
  brandName,
  products
}: {
  brandName: string;
  products: Product[];
}) {
  const [category, setCategory] = useState<'all' | 'Residential' | 'Commercial'>('all');

  const items = useMemo(() => {
    return products.filter(p => (category === 'all' ? true : p.category === category));
  }, [products, category]);

  return (
    <div className="rounded-3xl border border-white/15 bg-white/5 backdrop-blur-xl p-6 md:p-8 shadow-2xl">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl md:text-4xl font-extrabold text-white">{brandName} Models</h2>
          <p className="mt-1 text-white/70">Browse by use case or see the full lineup.</p>
        </div>
        <div className="inline-flex gap-2">
          {(['all','Residential','Commercial'] as const).map(key => (
            <button
              key={key}
              onClick={() => setCategory(key)}
              className={`rounded-xl border px-4 py-2 text-sm transition ${
                category === key
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-transparent'
                  : 'border-white/15 bg-white/10 text-white/90 hover:bg-white/20'
              }`}
            >
              {key}
            </button>
          ))}
        </div>
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-white/70">
          No products in this category yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}
