'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useMemo } from 'react';
import Image from 'next/image';
import { ArrowLeft, Star, Filter } from 'lucide-react';
import { BRANDS } from '@/data/brands';
import products from '@/data/products';
import QuickViewModal from './QuickViewModal';
import { sortProductsByVersion, extractVersionNumber } from '@/lib/productSorting';

type Props = {
  category: string;
};

export default function BrandProductsPage({ category }: Props) {
  const params = useParams();
  const router = useRouter();
  const brandId = params.brandId as string;
  
  const [quickViewProduct, setQuickViewProduct] = useState<any | null>(null);
  const [sortBy, setSortBy] = useState('version');

  const brand = BRANDS.find(b => b.id === brandId);
  
  const filteredProducts = useMemo(() => {
    let filteredProducts = products;
    
    // Filter by brand
    const brandMap: Record<string, string> = {
      'life-ionizers-india': 'life',
      'mediqua-india': 'mediqua',
      'medisoul-india': 'medisoul'
    };
    const brandName = brandMap[brandId] || brandId;
    filteredProducts = filteredProducts.filter(p => p.brand === brandName);
    
    // Filter by category
    if (category !== 'all') {
      filteredProducts = filteredProducts.filter(p => p.category === category);
    }
    
    // Sort products
    switch (sortBy) {
      case 'name':
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'plates':
        filteredProducts.sort((a, b) => {
          const aPlates = parseInt(a.plates?.match(/\d+/)?.[0] || '0');
          const bPlates = parseInt(b.plates?.match(/\d+/)?.[0] || '0');
          return bPlates - aPlates;
        });
        break;
      case 'ph':
        filteredProducts.sort((a, b) => {
          const aPh = parseFloat(a.phRange?.split('–')[0] || '0');
          const bPh = parseFloat(b.phRange?.split('–')[0] || '0');
          return aPh - bPh;
        });
        break;
      case 'version':
      default:
        // Sort by version number (highest first) as default
        filteredProducts.sort((a, b) => {
          const versionA = extractVersionNumber(a.name);
          const versionB = extractVersionNumber(b.name);
          return versionB - versionA;
        });
        break;
    }
    
    return filteredProducts;
  }, [brandId, category, sortBy]);

  const handleViewDetails = (product: any) => {
    setQuickViewProduct(product);
  };

  const handleEnquire = (product: any) => {
    const message = `Hi! I'm interested in the ${product.name} water ionizer. Could you please provide more details about pricing and availability?`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/9230123451?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const goBack = () => {
    router.push('/products');
  };

  if (!brand) {
    return (
      <div className="min-h-screen bg-[#0A2238] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#EBEBEB] mb-4">Brand not found</h1>
          <button
            onClick={goBack}
            className="px-6 py-3 bg-[#EBEBEB] text-[#0A2238] rounded-lg font-medium hover:bg-[#EBEBEB]/90 transition-colors"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A2238]">
      {/* Header */}
      <div className="bg-[#0A2238] border-b border-[#EBEBEB]/10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={goBack}
                className="flex items-center gap-2 px-4 py-2 text-[#EBEBEB] hover:text-[#C9CFD7] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Products
              </button>
              <div className="h-6 w-px bg-[#EBEBEB]/20" />
              <div>
                <h1 className="text-2xl font-bold text-[#EBEBEB]">{brand.name}</h1>
                <p className="text-[#EBEBEB]/70">
                  {filteredProducts.length} products
                  {category !== 'all' && ` in ${category}`}
                </p>
              </div>
            </div>
            
            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#EBEBEB]/70" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#0A2238] border border-[#EBEBEB]/20 text-[#EBEBEB] rounded-lg px-3 py-2 focus:outline-none focus:border-[#EBEBEB]"
              >
                <option value="version">Sort by Version (High to Low)</option>
                <option value="name">Sort by Name</option>
                <option value="plates">Sort by Plates</option>
                <option value="ph">Sort by pH Range</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Image */}
      {brand.mainImage && (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="relative w-full h-64 rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={brand.mainImage}
              alt={`${brand.name} main product`}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <h2 className="text-3xl font-bold text-white mb-2">{brand.name}</h2>
              <p className="text-white/90">{brand.tagline}</p>
            </div>
          </div>
        </div>
      )}

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-[#0A2238]/50 backdrop-blur-sm border border-[#EBEBEB]/10 rounded-2xl p-6 hover:border-[#EBEBEB]/30 transition-all duration-300 hover:shadow-xl hover:shadow-[#EBEBEB]/10 flex flex-col h-full"
              >
                {/* Image - Fixed header */}
                <div className="w-full h-48 flex items-center justify-center mb-4 rounded-xl overflow-hidden flex-shrink-0 bg-white/5">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={240}
                    height={200}
                    className="object-contain rounded-lg group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                {/* Content Area - flex: 1 to push footer down */}
                <div className="flex flex-col flex-1 min-h-0">
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 bg-[#0A2238] text-[#EBEBEB] text-xs rounded-full mb-2 w-fit">
                      {product.brand}
                    </span>
                    <h3 className="text-lg font-semibold text-[#EBEBEB] line-clamp-2">
                      {product.name}
                    </h3>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#EBEBEB]/70">Plates:</span>
                      <span className="text-[#EBEBEB]">{product.plates}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#EBEBEB]/70">pH Range:</span>
                      <span className="text-[#EBEBEB]">{product.phRange}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#EBEBEB]/70">ORP:</span>
                      <span className="text-[#EBEBEB]">{product.orp}</span>
                    </div>
                    {product.power && (
                      <div className="flex justify-between text-sm">
                        <span className="text-[#EBEBEB]/70">Power:</span>
                        <span className="text-[#EBEBEB]">{product.power}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer - Pinned to bottom */}
                <div className="flex-shrink-0">
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleViewDetails(product)}
                      className="flex-1 px-4 py-2 bg-[#EBEBEB] text-[#0A2238] rounded-lg font-medium hover:bg-[#EBEBEB]/90 transition-colors"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleEnquire(product)}
                      className="flex-1 px-4 py-2 bg-[#EBEBEB] text-[#0A2238] rounded-lg font-medium hover:bg-[#EBEBEB]/90 transition-colors"
                    >
                      Enquire
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-[#EBEBEB] mb-2">No products found</h3>
            <p className="text-[#EBEBEB] mb-6">
              No products found for {brand.name}
              {category !== 'all' && ` in ${category} category`}
            </p>
            <button
              onClick={goBack}
              className="px-6 py-3 bg-[#EBEBEB] text-[#0A2238] rounded-lg font-medium hover:bg-[#EBEBEB]/90 transition-colors"
            >
              Back to Products
            </button>
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}
