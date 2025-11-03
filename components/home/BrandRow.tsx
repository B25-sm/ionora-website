'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import ProductCard from '@/components/ProductCard';
import type { Product } from '@/data/products';
import type { BrandId } from '@/data/schema';

type Props = {
  brandId: BrandId;
  title: string;
  products: Product[];
  ctaHref: string;
  maxProducts?: number;
};

export default function BrandRow({ brandId, title, products, ctaHref, maxProducts = 4 }: Props) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const displayProducts = products.slice(0, maxProducts);

  const handleScroll = (direction: 'left' | 'right') => {
    const container = document.getElementById(`brand-${brandId}`);
    if (!container) return;

    const scrollAmount = 320; // Width of one card + gap
    const newPosition = direction === 'left' 
      ? Math.max(0, scrollPosition - scrollAmount)
      : scrollPosition + scrollAmount;
    
    container.scrollTo({ left: newPosition, behavior: 'smooth' });
    setScrollPosition(newPosition);
  };

  const updateScrollButtons = () => {
    const container = document.getElementById(`brand-${brandId}`);
    if (!container) return;

    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth);
  };

  return (
    <section className="mb-12 sm:mb-16">
      {/* Brand Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-4">
        <div>
          <h2 id={`brand-${brandId}`} className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            {title}
          </h2>
          <p className="text-white/60 mt-1 text-sm sm:text-base">
            {products.length} premium models available
          </p>
        </div>
        <Link
          href={ctaHref}
          className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 transition-all duration-300 group text-sm sm:text-base"
          aria-label={`View all ${title} products`}
        >
          <span>View All</span>
          <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Products Row */}
      <div className="relative">
        {/* Scroll Buttons - Hidden on mobile */}
        <button
          onClick={() => handleScroll('left')}
          className={cn(
            "hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full border border-white/15 bg-white/10 backdrop-blur-xl items-center justify-center transition-all duration-300",
            canScrollLeft 
              ? "opacity-100 hover:bg-white/20 hover:scale-110" 
              : "opacity-0 pointer-events-none"
          )}
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>

        <button
          onClick={() => handleScroll('right')}
          className={cn(
            "hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full border border-white/15 bg-white/10 backdrop-blur-xl items-center justify-center transition-all duration-300",
            canScrollRight 
              ? "opacity-100 hover:bg-white/20 hover:scale-110" 
              : "opacity-0 pointer-events-none"
          )}
          aria-label="Scroll right"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>

        {/* Products Container */}
        <div
          id={`brand-${brandId}`}
          className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 px-1"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onScroll={updateScrollButtons}
        >
          {displayProducts.map((product) => (
            <div key={product.id} className="flex-shrink-0 w-[280px] sm:w-80">
              <ProductCard 
                product={product}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

