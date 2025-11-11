'use client';

import { useMemo, useState } from 'react';
import products, { type Product } from '@/data/products';
import BrandTabs from './BrandTabs';
import ProductCardV2 from './ProductCardV2';
import QuickViewModal from './QuickViewModal';
import CompareTray from './CompareTray';
import { Search } from 'lucide-react';

export default function ProductShowcase() {
  const [brand, setBrand] = useState<'all' | string>('all');
  const [query, setQuery] = useState('');
  const [quick, setQuick] = useState<Product | null>(null);
  const [tray, setTray] = useState<Product[]>([]);

  const filtered = useMemo(() => {
    let list = products;
    if (brand !== 'all') {
      // Map brand IDs to new brand names
      const brandMap: Record<string, string> = {
        'life-ionizers-india': 'life',
        'mediqua-india': 'mediqua',
        'medisoul-india': 'medisoul'
      };
      const brandName = brandMap[brand] || brand;
      list = list.filter(p => p.brand === brandName);
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        (p.brand || '').toLowerCase().includes(q) ||
        (p.category || '').toLowerCase().includes(q)
      );
    }
    return list;
  }, [brand, query]);

  const brandsList = useMemo<Record<string, Product[]>>(() => {
    if (brand === 'all') {
      const groups: Record<string, Product[]> = {};
      products.forEach(p => {
        groups[p.brand] = groups[p.brand] || [];
        groups[p.brand].push(p);
      });
      return groups;
    } else {
      return { [brand]: filtered };
    }
  }, [brand, filtered]);

  function toggleCompare(p: Product) {
    setTray((prev) => {
      const exists = prev.find((x) => x.id === p.id);
      if (exists) return prev.filter((x) => x.id !== p.id);
      if (prev.length >= 3) return prev; // cap at 3
      return [...prev, p];
    });
  }

  return (
    <section className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12 text-white">
      {/* HERO */}
      <div className="mb-8 md:mb-10">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.03] backdrop-blur-xl p-5 md:p-7">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">All Products</h1>
              <p className="text-white/70 mt-2">Explore by brand, compare models, and open quick view.</p>
            </div>
            {/* search */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/60" />
                <input
                  value={query}
                  onChange={(e)=>setQuery(e.target.value)}
                  placeholder="Search models, series…"
                  className="pl-9 pr-3 py-2 rounded-xl bg-white/5 border border-white/15 outline-none focus:border-white/30"
                />
              </div>
            </div>
          </div>
          <div className="mt-5">
            <BrandTabs active={brand} onChange={setBrand} />
          </div>
        </div>
      </div>

      {/* GROUPS */}
      <div className="space-y-10">
        {Object.entries(brandsList).map(([brandId, items]) => {
          const feature = items[0];
          const rest = items.slice(1);
          return (
            <div key={brandId} className="space-y-5">
              {/* Brand heading */}
              <div className="flex items-end justify-between">
                <h2 className="text-2xl md:text-3xl font-bold">
                  {brandId.replace(/-/g, ' ').replace(/\b\w/g, (c)=>c.toUpperCase())}
                </h2>
                <span className="text-white/60">{items.length} models</span>
              </div>

              {/* Featured Row */}
              {feature && (
                <div className="grid lg:grid-cols-[1.3fr_1fr] gap-5 items-stretch">
                  <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 md:p-6 flex flex-col">
                    <ProductCardV2
                      product={feature}
                      onQuickView={setQuick}
                      onCompare={toggleCompare}
                      isComparing={!!tray.find(t=>t.id===feature.id)}
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5 items-stretch">
                    {rest.slice(0,2).map((p)=>(
                      <ProductCardV2
                        key={p.id}
                        product={p}
                        onQuickView={setQuick}
                        onCompare={toggleCompare}
                        isComparing={!!tray.find(t=>t.id===p.id)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Grid for the rest */}
              {rest.length > 2 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
                  {rest.slice(2).map((p)=>(
                    <ProductCardV2
                      key={p.id}
                      product={p}
                      onQuickView={setQuick}
                      onCompare={toggleCompare}
                      isComparing={!!tray.find(t=>t.id===p.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Quick View */}
      <QuickViewModal product={quick} onClose={()=>setQuick(null)} />

      {/* Compare Tray */}
      <CompareTray
        items={tray}
        onRemove={(id)=>setTray(tray.filter((t)=>t.id!==id))}
        onCompare={()=>window.location.href='/products?compare=' + tray.map(t=>t.id).join(',')}
      />
    </section>
  );
}
