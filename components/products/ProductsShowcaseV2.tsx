'use client';

import { useState, useMemo, useEffect } from 'react';
import products from '@/data/products';
import ProductsHero from './ProductsHero';
import ProductCarousel from './ProductCarousel';
import QuickViewModal from './QuickViewModal';
import CompareTray from './CompareTray';

type Props = {
  initialBrand?: string | null;
};

export default function ProductsShowcaseV2({ initialBrand }: Props) {
  const [activeBrand, setActiveBrand] = useState(initialBrand || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [quickViewProduct, setQuickViewProduct] = useState<any | null>(null);
  const [compareTray, setCompareTray] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const filteredProducts = useMemo(() => {
    let filteredProducts = products;
    
    // Filter by brand
    if (activeBrand !== 'all') {
      // Map brand IDs to new brand names
      const brandMap: Record<string, string> = {
        'life-ionizers-india': 'life',
        'mediqua-india': 'mediqua',
        'medisoul-india': 'medisoul'
      };
      const brandName = brandMap[activeBrand] || activeBrand;
      filteredProducts = filteredProducts.filter(p => p.brand === brandName);
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filteredProducts = filteredProducts.filter(p =>
        p.name.toLowerCase().includes(query) ||
        (p.brand || '').toLowerCase().includes(query) ||
        (p.plates || '').toLowerCase().includes(query) ||
        (p.phRange || '').toLowerCase().includes(query)
      );
    }
    
    return filteredProducts;
  }, [activeBrand, searchQuery]);

  const productsByBrand = useMemo(() => {
    const groups: Record<string, any[]> = {};
    filteredProducts.forEach(product => {
      if (!groups[product.brand]) {
        groups[product.brand] = [];
      }
      groups[product.brand].push(product);
    });
    return groups;
  }, [filteredProducts]);

  const handleViewDetails = (product: any) => {
    setQuickViewProduct(product);
  };

  const handleEnquire = (product: any) => {
    // Open WhatsApp with product enquiry message
    const message = `Hi! I'm interested in the ${product.name} water ionizer. Could you please provide more details about pricing and availability?`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/917993004900?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const toggleCompare = (product: any) => {
    setCompareTray(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) {
        return prev.filter(p => p.id !== product.id);
      }
      if (prev.length >= 3) {
        return prev; // Max 3 products
      }
      return [...prev, product];
    });
  };

  const removeFromCompare = (productId: string) => {
    setCompareTray(prev => prev.filter(p => p.id !== productId));
  };

  const handleCompare = () => {
    const productIds = compareTray.map(p => p.id).join(',');
    window.location.href = `/products?compare=${productIds}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FFE797] via-white to-[#B45253] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B45253]/30 mx-auto mb-4"></div>
          <p className="text-[#B45253]/60">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFE797] via-white to-[#B45253]">
      {/* Hero Section */}
      <ProductsHero
        activeBrand={activeBrand}
        onBrandChange={setActiveBrand}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Products by Brand */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        {Object.entries(productsByBrand).map(([brandId, products]) => (
          <div key={brandId} className="mb-20">
            {/* Brand Header */}
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-[#B45253] mb-4 drop-shadow-lg">
                {brandId.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
              </h2>
              <p className="text-[#B45253] text-lg drop-shadow-md">
                {products.length} premium models available
              </p>
            </div>

            {/* Product Carousel */}
            <ProductCarousel
              products={products}
              onViewDetails={handleViewDetails}
              onEnquire={handleEnquire}
            />
          </div>
        ))}

        {/* No Results */}
        {Object.keys(productsByBrand).length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-[#B45253] mb-2 drop-shadow-lg">No products found</h3>
            <p className="text-[#B45253] drop-shadow-md">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />

      {/* Compare Tray */}
      <CompareTray
        items={compareTray}
        onRemove={removeFromCompare}
        onCompare={handleCompare}
      />
    </div>
  );
}
