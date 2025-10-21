"use client";

import dynamic from "next/dynamic";

const ProductCompare = dynamic(() => import("@/components/ProductCompare"), { 
  ssr: false,
  loading: () => (
    <div className="p-8 text-center text-white">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
      <p>Loading product comparison...</p>
    </div>
  )
});

export default function ComparePage() {
  return <ProductCompare />;
}
