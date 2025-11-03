'use client';

import { useMemo, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import type { Product } from '@/data/products';

type CategoryFilter = 'all' | 'Residential' | 'Commercial';

export default function BrandProductsFilter({ products }: { products: Product[] }) {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'all') {
      return products;
    }
    return products.filter(p => p.category === activeCategory);
  }, [products, activeCategory]);

  const categories: CategoryFilter[] = ['all', 'Residential', 'Commercial'];

  return (
    <div className="mt-12">
      {/* Filter Buttons */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <h2 className="text-3xl font-bold text-white">Products</h2>
        <div className="inline-flex gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-1">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-[#FFD100] to-[#FFD100]/80 text-[#0A0F2C] shadow-lg'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              {category === 'all' ? 'All' : category}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-12 text-center">
          <p className="text-white/70 text-lg">
            No {activeCategory === 'all' ? '' : activeCategory} products available for this brand.
          </p>
        </div>
      )}
    </div>
  );
}

