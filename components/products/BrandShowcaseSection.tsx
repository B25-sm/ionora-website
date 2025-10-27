'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowRight, Star } from 'lucide-react';
import { BRANDS } from '@/data/brands';

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

  const handleViewMore = () => {
    const categoryParam = category !== 'all' ? `?category=${encodeURIComponent(category)}` : '';
    router.push(`/products/brand/${brandId}${categoryParam}`);
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
          {brand.name}
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
            {recommendedProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-[#0A2238]/50 backdrop-blur-sm border border-[#EBEBEB]/10 rounded-2xl p-6 hover:border-[#EBEBEB]/30 transition-all duration-300 hover:shadow-xl hover:shadow-[#EBEBEB]/10"
              >
                <div className="relative h-48 mb-4 rounded-xl overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
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

                <div className="flex gap-3">
                  <button
                    onClick={() => onViewDetails(product)}
                    className="flex-1 px-4 py-2 bg-[#EBEBEB] text-[#0A2238] rounded-lg font-medium hover:bg-[#EBEBEB]/90 transition-colors"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => onEnquire(product)}
                    className="flex-1 px-4 py-2 bg-[#EBEBEB] text-[#0A2238] rounded-lg font-medium hover:bg-[#EBEBEB]/90 transition-colors"
                  >
                    Enquire
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
