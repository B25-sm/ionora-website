"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BarChart3 } from "lucide-react";

type Product = {
  id: string;
  name: string;
  image: string;
  shortDescription?: string;
  plates?: string;
  ph?: string;
  orp?: string;
  price?: number;
  brand?: string;
};

export default function ProductCard({ product }: { product: Product }) {
  const openWhatsApp = (productName: string) => {
    const message = encodeURIComponent(
      `Hello, I'd like to know more about ${productName}. Could you please share the details?`
    );
    window.open(`https://wa.me/9230123451?text=${message}`, "_blank");
  };

  return (
    <article className="bg-primary/10 rounded-xl sm:rounded-2xl md:rounded-3xl p-3 sm:p-4 md:p-5 lg:p-6 flex flex-col h-full shadow-lg border border-primary/20 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      {/* ✅ Product Image - Fixed header */}
      <div className="relative w-full h-40 sm:h-48 md:h-56 lg:h-64 mb-3 sm:mb-4 rounded-lg sm:rounded-xl overflow-hidden bg-bg flex items-center justify-center flex-shrink-0">
        <Image
          src={product.image}
          alt={product.name}
          fill
          priority
          sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-contain hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* ✅ Content Area - flex: 1 to push footer down */}
      <div className="flex flex-col flex-1 min-h-0">
        {/* ✅ Product Info */}
        <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-primary mb-2 sm:mb-3 tracking-tight">
          {product.name}
        </h3>
        <p className="text-xs sm:text-sm md:text-base text-primary/70 mb-3 sm:mb-4 leading-relaxed line-clamp-2">
          {product.shortDescription || "Premium alkaline water ionizer engineered for performance and wellness."}
        </p>

        {/* ✅ Key Specs */}
        <div className="flex justify-between text-xs sm:text-sm mb-3 sm:mb-4 gap-1 sm:gap-2">
          <div className="bg-bg/30 p-2 sm:p-3 rounded-md text-center flex-1">
            <div className="text-primary/70 text-[10px] sm:text-xs">Plates</div>
            <div className="text-primary font-semibold">{product.plates || "—"}</div>
          </div>
          <div className="bg-bg/30 p-2 sm:p-3 rounded-md text-center flex-1">
            <div className="text-primary/70 text-[10px] sm:text-xs">pH</div>
            <div className="text-primary font-semibold">{product.ph || "—"}</div>
          </div>
          <div className="bg-bg/30 p-2 sm:p-3 rounded-md text-center flex-1">
            <div className="text-primary/70 text-[10px] sm:text-xs">ORP</div>
            <div className="text-primary font-semibold">{product.orp || "—"}</div>
          </div>
        </div>
      </div>

      {/* ✅ Footer - Pinned to bottom */}
      <div className="flex-shrink-0 mt-auto">
        {/* ✅ Buttons */}
        <div className="flex gap-2 sm:gap-3">
        <Link
          href={`/products/${product.id}`}
          className="flex-1 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 rounded-lg bg-bg/30 text-primary text-center hover:bg-bg/40 transition text-xs sm:text-sm"
        >
          View Details
        </Link>

        <Link
          href={`/products/compare?products=${product.id}`}
          className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-gradient-to-r from-[#EBEBEB] to-[#C9CFD7] text-[#0A2238] hover:from-[#C9CFD7] hover:to-[#EBEBEB] transition-all flex items-center justify-center"
          title="Add to Comparison"
        >
          <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5" />
        </Link>

        <button
          onClick={() => openWhatsApp(product.name)}
          className="flex-1 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 rounded-lg bg-primary text-bg font-medium hover:scale-[1.02] transition text-xs sm:text-sm"
        >
          Enquire
        </button>
        </div>

        <p className="text-center text-xs sm:text-sm text-primary/70 mt-2 sm:mt-3">
          {product.price ? `₹${product.price.toLocaleString('en-IN')}` : 'Contact for Price'}
        </p>
      </div>
    </article>
  );
}