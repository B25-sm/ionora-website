'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import type { Product } from '@/data/products';

type Props = {
  product: Product;
  onQuickView: (p: Product) => void;
  onCompare: (p: Product) => void;
  isComparing?: boolean;
};

export default function ProductCardV2({ product, onQuickView, onCompare, isComparing }: Props) {
  return (
    <div className="rounded-3xl p-6 bg-gradient-to-b from-[#1b0b3f]/80 to-[#110028]/90 backdrop-blur-xl border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
      {/* Product Image */}
      <div className="w-full h-48 flex items-center justify-center mb-5">
        <Image
          src={product.image || '/images/placeholder.png'}
          alt={product.name}
          width={240}
          height={200}
          className="object-contain rounded-lg"
        />
      </div>

      {/* Series Label */}
      <span className="inline-block px-3 py-1 text-xs font-semibold text-white/80 bg-white/10 rounded-full mb-3">
        {product.series || 'Default Series'}
      </span>

      {/* Product Name */}
      <h3 className="text-lg font-bold text-white mb-4 leading-snug">
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

      {/* Price / CTA */}
      <p className="text-center text-sm text-white/90 font-semibold">
        {product.price ? `₹${product.price}` : "Contact for Price"}
      </p>
    </div>
  );
}
