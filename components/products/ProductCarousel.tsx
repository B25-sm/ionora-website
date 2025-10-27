'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Eye, MessageCircle, Palette } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { Product } from '@/data/products';
import type { Variant } from '@/data/schema';

type Props = {
  products: Product[];
  onViewDetails: (product: Product) => void;
  onEnquire: (product: Product) => void;
};

export default function ProductCarousel({ products, onViewDetails, onEnquire }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, Variant>>({});
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const itemWidth = container.children[0]?.clientWidth || 0;
      const gap = 24; // gap-6 = 24px
      const scrollPosition = index * (itemWidth + gap);
      container.scrollTo({ left: scrollPosition, behavior: 'smooth' });
    }
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    const nextIndex = (currentIndex + 1) % products.length;
    scrollToIndex(nextIndex);
  };

  const prevSlide = () => {
    const prevIndex = currentIndex === 0 ? products.length - 1 : currentIndex - 1;
    scrollToIndex(prevIndex);
  };

  const selectVariant = (productId: string, variant: Variant) => {
    setSelectedVariants(prev => ({ ...prev, [productId]: variant }));
  };

  return (
    <div className="relative">
      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/90 backdrop-blur-xl border border-[#B45253]/20 hover:bg-[#FFE797]/20 transition-all shadow-lg"
      >
        <ChevronLeft className="w-6 h-6 text-[#B45253]" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/90 backdrop-blur-xl border border-[#B45253]/20 hover:bg-[#FFE797]/20 transition-all shadow-lg"
      >
        <ChevronRight className="w-6 h-6 text-[#B45253]" />
      </button>

      {/* Carousel Container */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {products.map((product, index) => {
          const isHovered = hoveredProduct === product.id;
          const currentImage = product.image || '/images/placeholder.png';

          return (
            <div
              key={product.id}
              className="group relative flex-shrink-0 w-80 snap-center"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {/* Card Container */}
              <div className="relative rounded-3xl border border-[#B45253]/20 bg-white/90 backdrop-blur-xl p-6 transition-all duration-500 hover:scale-105 hover:shadow-[0_25px_50px_rgba(180,82,83,0.15)] hover:shadow-[#B45253]/10">
                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#B45253]/10 via-[#FFE797]/10 to-[#B45253]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Product Image */}
                <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-[#B45253]/20 bg-white/80 mb-4">
                  <Image
                    src={currentImage}
                    alt={product.name}
                    fill
                    className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                    sizes="320px"
                  />
                </div>

                {/* Brand Badge */}
                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-[#B45253]/20 to-[#FFE797]/20 border border-[#B45253]/30 text-[#B45253] mb-3">
                  {product.brand}
                </div>

                {/* Product Name */}
                <h3 className="text-xl font-bold text-[#B45253] mb-3 group-hover:text-[#B45253]/80 transition-colors drop-shadow-sm">
                  {product.name}
                </h3>

                {/* Specification Chips */}
                <div className="flex flex-wrap gap-3 mb-6">
                  <div className="flex flex-col items-center px-4 py-2 rounded-xl bg-[#B45253]/10 border border-[#B45253]/20 text-center">
                    <span className="text-xs text-[#B45253]/70">Plates</span>
                    <span className="text-sm font-semibold text-[#B45253]">
                      {product.plates || "N/A"}
                    </span>
                  </div>

                  <div className="flex flex-col items-center px-4 py-2 rounded-xl bg-[#B45253]/10 border border-[#B45253]/20 text-center">
                    <span className="text-xs text-[#B45253]/70">pH</span>
                    <span className="text-sm font-semibold text-[#B45253]">
                      {product.phRange || "N/A"}
                    </span>
                  </div>

                  <div className="flex flex-col items-center px-4 py-2 rounded-xl bg-[#B45253]/10 border border-[#B45253]/20 text-center">
                    <span className="text-xs text-[#B45253]/70">ORP</span>
                    <span className="text-sm font-semibold text-[#B45253]">
                      {product.orp || "N/A"}
                    </span>
                  </div>
                </div>


                {/* Action Buttons */}
                <div className="flex gap-3 mb-5">
                  <button
                    onClick={() => onViewDetails(product)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#B45253]/10 text-[#B45253] hover:bg-[#B45253]/20 transition border border-[#B45253]/20"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    View Details
                  </button>

                  <button
                    onClick={() => onEnquire(product)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#B45253] to-[#B45253]/80 text-white font-medium hover:scale-[1.02] transition shadow-lg"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 10h.01M12 14l9-5-9-5-9 5 9 5zm0 0v6"
                      />
                    </svg>
                    Enquire Now
                  </button>
                </div>

                {/* Price / CTA */}
                <p className="text-center text-sm text-[#B45253] font-semibold">
                  Contact for Price
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-6">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex
                ? 'bg-[#B45253] scale-125'
                : 'bg-[#B45253]/30 hover:bg-[#B45253]/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
