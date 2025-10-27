'use client';

import { useState, useMemo } from 'react';
import { Search, Filter, Sparkles } from 'lucide-react';
import { BRANDS } from '@/data/brands';

type Props = {
  activeBrand: string;
  onBrandChange: (brand: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
};

export default function ProductsHero({ activeBrand, onBrandChange, searchQuery, onSearchChange }: Props) {
  const [showFilters, setShowFilters] = useState(false);

  const brandTabs = useMemo(() => [
    { id: 'all', name: 'All Brands', icon: Sparkles },
    ...BRANDS.map(brand => ({ ...brand, icon: Sparkles }))
  ], []);

  return (
    <div className="relative">
      {/* Floating Search Bar */}
      <div className="sticky top-20 z-40 mb-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#B45253]/20 via-[#FFE797]/20 to-[#B45253]/20 rounded-2xl blur-xl"></div>
            <div className="relative bg-white/90 backdrop-blur-xl border border-[#B45253]/20 rounded-2xl p-4">
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#B45253]/60" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Search products, series, or specifications..."
                    className="w-full pl-12 pr-4 py-3 bg-white/80 border border-[#B45253]/20 rounded-xl text-[#B45253] placeholder-[#B45253]/50 focus:outline-none focus:ring-2 focus:ring-[#B45253]/50 focus:border-[#B45253]/50 transition-all"
                  />
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="p-3 rounded-xl bg-[#B45253]/10 border border-[#B45253]/20 hover:bg-[#B45253]/20 transition-all"
                >
                  <Filter className="w-5 h-5 text-[#B45253]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Brand Tabs */}
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <div className="flex flex-wrap gap-3 justify-center">
          {brandTabs.map((brand) => {
            const Icon = brand.icon;
            const isActive = activeBrand === brand.id;
            return (
              <button
                key={brand.id}
                onClick={() => onBrandChange(brand.id)}
                className={`
                  group relative px-6 py-3 rounded-2xl border backdrop-blur-xl transition-all duration-300
                  ${isActive 
                    ? 'bg-gradient-to-r from-[#B45253]/20 to-[#FFE797]/20 border-[#B45253]/50 text-[#B45253] shadow-[0_0_30px_rgba(180,82,83,0.3)]' 
                    : 'bg-white/80 border-[#B45253]/15 text-[#B45253] hover:bg-[#FFE797]/20 hover:border-[#B45253]/25'
                  }
                `}
              >
                <div className="flex items-center gap-2">
                  <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-[#B45253]' : 'text-[#B45253]/70'}`} />
                  <span className="font-medium">{brand.name}</span>
                </div>
                {isActive && (
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#B45253]/10 to-[#FFE797]/10 animate-pulse"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Hero Content */}
      <div className="max-w-7xl mx-auto px-4 text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-extrabold text-[#B45253] mb-6 drop-shadow-lg">
          Next-Generation
          <br />
          <span className="text-[#B45253]">
            Water Ionizers
          </span>
        </h1>
        <p className="text-xl text-[#B45253] max-w-3xl mx-auto leading-relaxed drop-shadow-md">
          Experience the future of hydration with our premium collection of advanced water ionization systems, 
          engineered for optimal health and wellness.
        </p>
      </div>
    </div>
  );
}
