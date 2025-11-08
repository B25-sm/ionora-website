'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowRight, Star } from 'lucide-react';
import { BRANDS } from '@/data/brands';
import { useState } from 'react';
import type { InstallationType } from '@/data/schema';
import { HAS_WHATSAPP_NUMBER } from '@/lib/contact';

type Props = {
  brandId: string;
  products: any[];
  category: string;
  onViewDetails: (product: any) => void;
  onEnquire: (product: any) => void;
};

export default function BrandShowcaseSection({ 
  brandId, 
  products, 
  category,
  onViewDetails, 
  onEnquire
}: Props) {
  const router = useRouter();
  const brand = BRANDS.find(b => b.id === brandId);
  const recommendedProducts = products.slice(0, 3);
  const hasMoreProducts = products.length > 3;
  const [selectedInstallations, setSelectedInstallations] = useState<Record<string, InstallationType>>({});

  const handleViewMore = () => {
    const categoryParam = category !== 'all' ? `?category=${encodeURIComponent(category)}` : '';
    router.push(`/products/brand/${brandId}${categoryParam}`);
  };

  const selectInstallation = (productId: string, installationType: InstallationType) => {
    setSelectedInstallations(prev => ({ ...prev, [productId]: installationType }));
  };

  // Get current display image for a product
  const getProductImage = (product: any) => {
    const selectedInstallation = selectedInstallations[product.id];
    if (selectedInstallation && product.installationVariants) {
      const variant = product.installationVariants.find((v: any) => v.type === selectedInstallation);
      if (variant) return variant.image;
    }
    return product.image || '/images/placeholder.png';
  };

  // Get current display price for a product
  const getProductPrice = (product: any) => {
    const selectedInstallation = selectedInstallations[product.id];
    if (selectedInstallation && product.installationVariants) {
      const variant = product.installationVariants.find((v: any) => v.type === selectedInstallation);
      if (variant && variant.price !== undefined) return variant.price;
    }
    return product.price;
  };

  if (!brand) return null;

  return (
    <div className="mb-20">
      {/* Brand Header with Main Image */}
      <div className="text-center mb-12">
        <div className="relative mb-8">
          {brand.mainImage && (
            <div className="relative w-full max-w-2xl mx-auto h-80 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={brand.mainImage}
                alt={`${brand.name} main product`}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          )}
        </div>
        
        <h2 className="text-4xl md:text-5xl font-bold text-[#EBEBEB] mb-4">
          {brandId === 'life-ionizers-india' ? 'Lifeionizers' : brand.name}
        </h2>
        <p className="text-[#EBEBEB] text-lg mb-2">
          {products.length} premium models available
        </p>
        <p className="text-[#EBEBEB]/70 text-sm">
          {brand.tagline}
        </p>
      </div>

      {/* Recommended Products Section */}
      {recommendedProducts.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-[#EBEBEB] flex items-center gap-2">
              <Star className="w-6 h-6 text-[#EBEBEB]" />
              Recommended Products
            </h3>
            {hasMoreProducts && (
              <button
                onClick={handleViewMore}
                className="group flex items-center gap-2 px-6 py-3 bg-[#EBEBEB] text-[#0A2238] rounded-xl font-medium hover:bg-[#EBEBEB]/90 transition-colors"
              >
                View More
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedProducts.map((product) => {
              const hasInstallationVariants = product.installationVariants && product.installationVariants.length > 0;
              
              return (
                <div
                  key={product.id}
                  className="group bg-[#0A2238]/50 backdrop-blur-sm border border-[#EBEBEB]/10 rounded-2xl p-6 hover:border-[#EBEBEB]/30 transition-all duration-300 hover:shadow-xl hover:shadow-[#EBEBEB]/10 flex flex-col"
                >
                  {/* Image - Fixed header */}
                  <div className="w-full h-48 flex items-center justify-center mb-4 rounded-xl overflow-hidden flex-shrink-0 bg-white/5">
                    <Image
                      src={getProductImage(product)}
                      alt={product.name}
                      width={240}
                      height={200}
                      className="object-contain rounded-lg group-hover:scale-105 transition-all duration-300"
                    />
                  </div>
                
                {/* Content area - flex: 1 to push footer down */}
                <div className="flex flex-col flex-1 min-h-0">
                  <div className="flex gap-2 mb-2 flex-wrap">
                    {product.category && (
                      <span className="inline-block px-2 py-1 text-[10px] sm:text-xs font-medium text-[#EBEBEB]/90 bg-[#EBEBEB]/10 border border-[#EBEBEB]/30 rounded-md w-fit">
                        {product.category}
                      </span>
                    )}
                  </div>
                  <h4 className="text-lg font-semibold text-[#EBEBEB] mb-2 line-clamp-2">
                    {product.name}
                  </h4>
                  
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
                  </div>
                </div>

                {/* Footer - Pinned to bottom */}
                <div className="flex-shrink-0">
                  <div className="flex gap-3 mb-4">
                    <button
                      onClick={() => onViewDetails(product)}
                      className="flex-1 px-4 py-2 bg-[#EBEBEB] text-[#0A2238] rounded-lg font-medium hover:bg-[#EBEBEB]/90 transition-colors"
                    >
                      View Details
                    </button>
                    {HAS_WHATSAPP_NUMBER && (
                      <button
                        onClick={() => onEnquire(product)}
                        className="flex-1 px-4 py-2 bg-[#EBEBEB] text-[#0A2238] rounded-lg font-medium hover:bg-[#EBEBEB]/90 transition-colors"
                      >
                        Enquire
                      </button>
                    )}
                  </div>

                  {/* Counter/Undercounter Toggle */}
                  {hasInstallationVariants && (
                    <div className="flex gap-2 mb-4">
                      {product.installationVariants?.map((variant: any) => (
                        <button
                          key={variant.type}
                          onClick={() => selectInstallation(product.id, variant.type as InstallationType)}
                          className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                            selectedInstallations[product.id] === variant.type
                              ? 'bg-[#EBEBEB] text-[#0A2238] shadow-lg'
                              : 'bg-[#0A2238]/50 border border-[#EBEBEB]/20 text-[#EBEBEB]/70 hover:bg-[#EBEBEB]/10'
                          }`}
                        >
                          {variant.type === 'counter' ? 'Counter-top' : 'Undercounter'}
                        </button>
                      ))}
                    </div>
                  )}

                  <div className="mb-4">
                    <p className="text-center text-lg font-bold text-[#EBEBEB]">
                      {getProductPrice(product) ? `₹${getProductPrice(product)!.toLocaleString('en-IN')}` : 'Contact for Price'}
                    </p>
                  </div>
                </div>
              </div>
            );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
