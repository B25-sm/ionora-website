'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Eye, MessageCircle, Palette } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { Product, Variant } from '@/data/schema';

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
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 transition-all"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 transition-all"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Carousel Container */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {products.map((product, index) => {
          const isHovered = hoveredProduct === product.id;
          const selectedVariant = selectedVariants[product.id] || product.variants?.[0];
          const currentImage = selectedVariant?.image || product.image || '/images/placeholder.png';

          return (
            <div
              key={product.id}
              className="group relative flex-shrink-0 w-80 snap-center"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {/* Card Container */}
              <div className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 transition-all duration-500 hover:scale-105 hover:shadow-[0_25px_50px_rgba(0,0,0,0.25)] hover:shadow-blue-500/10">
                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Product Image */}
                <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-white/10 bg-white/5 mb-4">
                  <Image
                    src={currentImage}
                    alt={product.name}
                    fill
                    className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                    sizes="320px"
                  />
                </div>

                {/* Series Badge */}
                {product.series && (
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 text-blue-200 mb-3">
                    {product.series}
                  </div>
                )}

                {/* Product Name */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-100 transition-colors">
                  {product.name}
                </h3>

                {/* Specification Chips */}
                <div className="flex flex-wrap gap-3 mb-6">
                  <div className="flex flex-col items-center px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-center">
                    <span className="text-xs text-white/60">Plates</span>
                    <span className="text-sm font-semibold text-white">
                      {product.specs?.plates || "N/A"}
                    </span>
                  </div>

                  <div className="flex flex-col items-center px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-center">
                    <span className="text-xs text-white/60">pH</span>
                    <span className="text-sm font-semibold text-white">
                      {product.specs?.phRange || "N/A"}
                    </span>
                  </div>

                  <div className="flex flex-col items-center px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-center">
                    <span className="text-xs text-white/60">ORP</span>
                    <span className="text-sm font-semibold text-white">
                      {product.specs?.orpMax || "N/A"}
                    </span>
                  </div>
                </div>

                {/* Color Variants */}
                {product.variants && product.variants.length > 1 && (
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Palette className="w-4 h-4 text-white/60" />
                      <span className="text-sm text-white/80">Colors</span>
                    </div>
                    <div className="flex gap-2">
                      {product.variants.map((variant) => (
                        <button
                          key={variant.color}
                          onClick={() => selectVariant(product.id, variant)}
                          className={cn(
                            "w-8 h-8 rounded-full border-2 transition-all",
                            selectedVariant?.color === variant.color
                              ? 'border-blue-400 scale-110'
                              : 'border-white/30 hover:border-white/50'
                          )}
                          title={variant.color}
                        >
                          <span
                            className={cn(
                              "block w-full h-full rounded-full",
                              variant.color === "black" ? "bg-black" : "bg-white"
                            )}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 mb-5">
                  <button
                    onClick={() => onViewDetails(product)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition"
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
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-medium hover:scale-[1.02] transition"
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
                <p className="text-center text-sm text-white/90 font-semibold">
                  {product.price ? `₹${product.price}` : "Contact for Price"}
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
                ? 'bg-blue-400 scale-125'
                : 'bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
