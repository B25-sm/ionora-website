'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import BrandProductsPage from '@/components/products/BrandProductsPage';

function BrandProductsContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category') || 'all';

  return <BrandProductsPage category={category} />;
}

export default function BrandProducts() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-[#0A2238] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#EBEBEB]/30 mx-auto mb-4"></div>
          <p className="text-[#EBEBEB]/60">Loading products...</p>
        </div>
      </main>
    }>
      <BrandProductsContent />
    </Suspense>
  );
}
