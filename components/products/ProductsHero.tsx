'use client';

import { useMemo } from 'react';
import { Sparkles, Home, Building2, LayoutGrid, Underline } from 'lucide-react';
import { BRANDS } from '@/data/brands';

type Props = {
  activeBrand: string;
  onBrandChange: (brand: string) => void;
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  activeInstallation?: string;
  onInstallationChange?: (installation: string) => void;
};

export default function ProductsHero({ activeBrand, onBrandChange, activeCategory, onCategoryChange, activeInstallation = 'all', onInstallationChange }: Props) {

  const categoryTabs = useMemo(() => [
    { id: 'all', name: 'All Categories', icon: Sparkles },
    { id: 'Residential', name: 'Residential', icon: Home },
    { id: 'Commercial', name: 'Commercial', icon: Building2 }
  ], []);

  const installationTabs = useMemo(() => [
    { id: 'all', name: 'All Types', icon: Sparkles },
    { id: 'Counter Top', name: 'Counter Top', icon: LayoutGrid },
    { id: 'Under Counter', name: 'Under Counter', icon: Underline }
  ], []);

  const brandTabs = useMemo(() => [
    { id: 'all', name: 'All Brands', icon: Sparkles },
    ...BRANDS.filter(brand => brand.featured === true || brand.featured === undefined).map(brand => ({ ...brand, icon: Sparkles }))
  ], []);

  return (
    <div className="relative">
      {/* Brand Tabs */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <div className="flex flex-wrap gap-3 justify-center">
          {brandTabs.map((brand) => {
            const Icon = brand.icon;
            const isActive = activeBrand === brand.id;
            return (
              <button
                key={brand.id}
                onClick={() => onBrandChange(brand.id)}
                className={`
                  group relative px-6 py-3 rounded-2xl border transition-all duration-300
                  ${isActive 
                    ? 'bg-[#EBEBEB] border-[#0A2238] text-[#0A2238]' 
                    : 'bg-[#0A2238] border-[#0A2238] text-[#EBEBEB] hover:bg-[#EBEBEB] hover:text-[#0A2238]'
                  }
                `}
              >
                <div className="flex items-center gap-2">
                  <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-[#0A2238]' : 'text-[#EBEBEB]'}`} />
                  <span className="font-medium">{brand.name}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Category Tabs */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <div className="flex flex-wrap gap-3 justify-center">
          {categoryTabs.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`
                  group relative px-6 py-3 rounded-2xl border transition-all duration-300
                  ${isActive 
                    ? 'bg-[#EBEBEB] border-[#0A2238] text-[#0A2238]' 
                    : 'bg-[#0A2238] border-[#0A2238] text-[#EBEBEB] hover:bg-[#EBEBEB] hover:text-[#0A2238]'
                  }
                `}
              >
                <div className="flex items-center gap-2">
                  <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-[#0A2238]' : 'text-[#EBEBEB]'}`} />
                  <span className="font-medium">{category.name}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Installation Type Tabs */}
      {onInstallationChange && (
        <div className="max-w-7xl mx-auto px-4 mb-12">
          <div className="flex flex-wrap gap-3 justify-center">
            {installationTabs.map((installation) => {
              const Icon = installation.icon;
              const isActive = activeInstallation === installation.id;
              return (
                <button
                  key={installation.id}
                  onClick={() => onInstallationChange(installation.id)}
                  className={`
                    group relative px-6 py-3 rounded-2xl border transition-all duration-300
                    ${isActive 
                      ? 'bg-[#EBEBEB] border-[#0A2238] text-[#0A2238]' 
                      : 'bg-[#0A2238] border-[#0A2238] text-[#EBEBEB] hover:bg-[#EBEBEB] hover:text-[#0A2238]'
                    }
                  `}
                >
                  <div className="flex items-center gap-2">
                    <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-[#0A2238]' : 'text-[#EBEBEB]'}`} />
                    <span className="font-medium">{installation.name}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Hero Content */}
      <div className="max-w-7xl mx-auto px-4 text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-extrabold text-[#EBEBEB] mb-6">
          Next-Generation
          <br />
          <span className="text-[#EBEBEB]">
            Water Ionizers
          </span>
        </h1>
        <p className="text-xl text-[#EBEBEB] max-w-3xl mx-auto leading-relaxed">
          Experience the future of hydration with our premium collection of advanced water ionization systems, 
          engineered for optimal health and wellness.
        </p>
      </div>
    </div>
  );
}
