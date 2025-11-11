'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import type { Product } from '@/data/products';
import type { InstallationType } from '@/data/schema';

type Props = {
  product: Product;
  onQuickView: (p: Product) => void;
  onCompare: (p: Product) => void;
  isComparing?: boolean;
};

export default function ProductCardV2({ product, onQuickView, onCompare, isComparing }: Props) {
  const [selectedInstallation, setSelectedInstallation] = useState<InstallationType | null>(null);

  // Check if product has installation variants
  const hasInstallationVariants = product.installationVariants && product.installationVariants.length > 0;
  
  // Get current display image
  const getDisplayImage = () => {
    if (selectedInstallation && product.installationVariants) {
      const variant = product.installationVariants.find(v => v.type === selectedInstallation);
      if (variant) return variant.image;
    }
    return product.image || '/images/placeholder.png';
  };

  // Get current display price
  const getDisplayPrice = () => {
    if (selectedInstallation && product.installationVariants) {
      const variant = product.installationVariants.find(v => v.type === selectedInstallation);
      if (variant && variant.price !== undefined) return variant.price;
    }
    return product.price;
  };

  return (
    <div className="rounded-3xl p-6 bg-gradient-to-b from-[#1b0b3f]/80 to-[#110028]/90 backdrop-blur-xl border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 flex flex-col h-full">
      {/* Product Image - Fixed header */}
      <div className="w-full h-48 flex items-center justify-center mb-5 flex-shrink-0">
        <Image
          src={getDisplayImage()}
          alt={product.name}
          width={240}
          height={200}
          className="object-contain rounded-lg transition-all duration-300"
        />
      </div>

      {/* Main Content Area - flex: 1 to push footer down */}
      <div className="flex flex-col flex-1 min-h-0">
        {/* Brand and Category Labels */}
        <div className="flex gap-2 mb-3 flex-wrap">
          <span className="inline-block px-3 py-1 text-xs font-semibold text-white/80 bg-white/10 rounded-full w-fit">
            {product.brand || 'Default Series'}
          </span>
          {product.category && (
            <span className="inline-block px-3 py-1 text-xs font-semibold text-white/90 bg-gradient-to-r from-indigo-500/20 to-violet-500/20 border border-indigo-400/30 rounded-full w-fit">
              {product.category}
            </span>
          )}
        </div>

        {/* Product Name */}
        <h3 className="text-lg font-bold text-white mb-4 leading-snug">
          {product.name}
        </h3>

        {/* Specification Chips */}
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="flex flex-col items-center px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-center">
            <span className="text-xs text-white/60">Plates</span>
            <span className="text-sm font-semibold text-white">
              {product.plates || "N/A"}
            </span>
          </div>

          <div className="flex flex-col items-center px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-center">
            <span className="text-xs text-white/60">pH</span>
            <span className="text-sm font-semibold text-white">
              {product.phRange || "N/A"}
            </span>
          </div>

          <div className="flex flex-col items-center px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-center">
            <span className="text-xs text-white/60">ORP</span>
            <span className="text-sm font-semibold text-white">
              {product.orp || "N/A"}
            </span>
          </div>
        </div>
      </div>

      {/* Footer Area - Pinned to bottom */}
      <div className="flex-shrink-0 mt-auto">
        {/* Action Buttons */}
        <div className="flex gap-3 mb-5">
          <button
            onClick={() => onQuickView(product)}
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
            onClick={() => onCompare(product)}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-medium transition ${
              isComparing 
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30' 
                : 'bg-gradient-to-r from-indigo-500 to-violet-500 text-white hover:scale-[1.02]'
            }`}
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
            {isComparing ? 'Remove from Compare' : 'Add to Compare'}
          </button>
        </div>

        {/* Counter/Undercounter Toggle */}
        {hasInstallationVariants && (
          <div className="flex gap-2 mb-4">
            {product.installationVariants?.map((variant) => (
              <button
                key={variant.type}
                onClick={() => setSelectedInstallation(variant.type as InstallationType)}
                className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  selectedInstallation === variant.type
                    ? 'bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-lg'
                    : 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10'
                }`}
              >
                {variant.type === 'counter' ? 'Counter-top' : 'Undercounter'}
              </button>
            ))}
          </div>
        )}

        {/* Price / CTA */}
        <p className="text-center text-sm text-white/90 font-semibold">
          {getDisplayPrice() ? `₹${getDisplayPrice()!.toLocaleString('en-IN')}` : 'Contact for Price'}
        </p>
      </div>
    </div>
  );
}
