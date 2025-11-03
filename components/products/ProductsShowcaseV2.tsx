'use client';

import { useState, useMemo, useEffect } from 'react';
import products from '@/data/products';
import ProductsHero from './ProductsHero';
import ProductCarousel from './ProductCarousel';
import QuickViewModal from './QuickViewModal';
import CompareTray from './CompareTray';
import BrandShowcaseSection from './BrandShowcaseSection';
import { sortProductsByVersion } from '@/lib/productSorting';

type Props = {
  initialBrand?: string | null;
};

export default function ProductsShowcaseV2({ initialBrand }: Props) {
  const [activeBrand, setActiveBrand] = useState(initialBrand || 'all');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeInstallation, setActiveInstallation] = useState('all');
  const [quickViewProduct, setQuickViewProduct] = useState<any | null>(null);
  const [compareTray, setCompareTray] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const filteredProducts = useMemo(() => {
    let filteredProducts = products;
    
    // Filter by category
    if (activeCategory !== 'all') {
      filteredProducts = filteredProducts.filter(p => p.category === activeCategory);
    }
    
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
    
    // Filter by installation type
    if (activeInstallation !== 'all') {
      filteredProducts = filteredProducts.filter(p => {
        if (!p.installation) return false;
        const installation = p.installation.toLowerCase();
        if (activeInstallation === 'Counter Top') {
          return installation.includes('counter top');
        } else if (activeInstallation === 'Under Counter') {
          return installation.includes('under counter');
        }
        return true;
      });
    }
    
    // Sort by version number (highest first)
    return sortProductsByVersion(filteredProducts);
  }, [activeBrand, activeCategory, activeInstallation]);

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
    window.location.href = `/products/${product.id}`;
  };

  const handleEnquire = (product: any) => {
    // Open WhatsApp with product enquiry message
    const message = `Hi! I'm interested in the ${product.name} water ionizer. Could you please provide more details about pricing and availability?`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/9230123451?text=${encodedMessage}`;
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
      <div className="min-h-screen bg-[#0A2238] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#EBEBEB]/30 mx-auto mb-4"></div>
          <p className="text-[#EBEBEB]/60">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A2238]">
      {/* Hero Section */}
      <ProductsHero
        activeBrand={activeBrand}
        onBrandChange={setActiveBrand}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        activeInstallation={activeInstallation}
        onInstallationChange={setActiveInstallation}
      />

      {/* Products by Brand */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        {Object.entries(productsByBrand).map(([brandId, products]) => {
          // Check if both brand and category are selected (not 'all')
          const isSpecificSelection = activeBrand !== 'all' && activeCategory !== 'all';
          
          return (
            <div key={brandId} className="mb-20">
              {isSpecificSelection ? (
                // Show brand showcase with main image and recommended products
                <BrandShowcaseSection
                  brandId={activeBrand}
                  products={products}
                  category={activeCategory}
                  onViewDetails={handleViewDetails}
                  onEnquire={handleEnquire}
                />
              ) : (
                // Show regular brand header
                <div className="text-center mb-12">
                  <h2 className="text-4xl md:text-5xl font-bold text-[#EBEBEB] mb-4">
                    {brandId === 'life' ? 'Lifeionizers' : brandId.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                  </h2>
                  <p className="text-[#EBEBEB] text-lg">
                    {products.length} premium models available
                  </p>
                </div>
              )}

              {/* Product Carousel - Only show when not in specific selection mode */}
              {!isSpecificSelection && (
                <div data-product-carousel>
                  <ProductCarousel
                    products={products}
                    onViewDetails={handleViewDetails}
                    onEnquire={handleEnquire}
                  />
                </div>
              )}
            </div>
          );
        })}

        {/* No Results */}
        {Object.keys(productsByBrand).length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-[#EBEBEB] mb-2">No products found</h3>
            <p className="text-[#EBEBEB]">Try adjusting your search or filter criteria</p>
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
