'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductsShowcaseV2 from '@/components/products/ProductsShowcaseV2';

function ProductsContent() {
  const searchParams = useSearchParams();
  const brand = searchParams.get('brand');

  useEffect(() => {
    // Handle hash anchors like #brand-mediqua
    const handleHashScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
        }
      }
    };

    // Handle initial hash
    if (window.location.hash) {
      handleHashScroll();
    }

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashScroll);
    
    return () => {
      window.removeEventListener('hashchange', handleHashScroll);
    };
  }, []);

  return (
    <main className="min-h-screen">
      <ProductsShowcaseV2 initialBrand={brand} />
    </main>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent/30"></div>
      </main>
    }>
      <ProductsContent />
    </Suspense>
  );
}
