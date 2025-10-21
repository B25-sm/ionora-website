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
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl"></div>
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Search products, series, or specifications..."
                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/15 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400/50 transition-all"
                  />
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="p-3 rounded-xl bg-white/10 border border-white/15 hover:bg-white/15 transition-all"
                >
                  <Filter className="w-5 h-5 text-white/80" />
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
                    ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-400/50 text-white shadow-[0_0_30px_rgba(59,130,246,0.3)]' 
                    : 'bg-white/5 border-white/15 text-white/80 hover:bg-white/10 hover:border-white/25'
                  }
                `}
              >
                <div className="flex items-center gap-2">
                  <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-blue-300' : 'text-white/70'}`} />
                  <span className="font-medium">{brand.name}</span>
                </div>
                {isActive && (
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-pulse"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Hero Content */}
      <div className="max-w-7xl mx-auto px-4 text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-6">
          Next-Generation
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Water Ionizers
          </span>
        </h1>
        <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
          Experience the future of hydration with our premium collection of advanced water ionization systems, 
          engineered for optimal health and wellness.
        </p>
      </div>
    </div>
  );
}
