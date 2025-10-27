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
    <article className="bg-primary/10 rounded-xl xs:rounded-2xl sm:rounded-3xl md:rounded-3xl lg:rounded-3xl xl:rounded-3xl 2xl:rounded-3xl 3xl:rounded-3xl 4xl:rounded-3xl 5xl:rounded-3xl 6xl:rounded-3xl p-3 xs:p-4 sm:p-5 md:p-6 lg:p-7 xl:p-8 2xl:p-9 3xl:p-10 4xl:p-12 5xl:p-14 6xl:p-16 flex flex-col h-full shadow-lg border border-primary/20 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      {/* ✅ Product Image */}
      <div className="relative w-full h-40 xs:h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 2xl:h-88 3xl:h-96 4xl:h-104 5xl:h-112 6xl:h-120 mb-3 xs:mb-4 sm:mb-5 md:mb-6 lg:mb-7 xl:mb-8 2xl:mb-9 3xl:mb-10 4xl:mb-12 5xl:mb-14 6xl:mb-16 rounded-lg xs:rounded-xl sm:rounded-xl md:rounded-xl lg:rounded-xl xl:rounded-xl 2xl:rounded-xl 3xl:rounded-xl 4xl:rounded-xl 5xl:rounded-xl 6xl:rounded-xl overflow-hidden bg-bg flex items-center justify-center">
        <Image
          src={product.image}
          alt={product.name}
          fill
          priority
          sizes="(max-width: 360px) 100vw, (max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, (max-width: 1536px) 20vw, (max-width: 1920px) 16vw, (max-width: 2560px) 12vw, (max-width: 3840px) 10vw, 8vw"
          className="object-contain hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* ✅ Product Info */}
      <h3 className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl 3xl:text-5xl 4xl:text-6xl 5xl:text-7xl 6xl:text-8xl font-semibold text-primary mb-2 xs:mb-3 sm:mb-4 md:mb-5 lg:mb-6 xl:mb-7 2xl:mb-8 3xl:mb-9 4xl:mb-10 5xl:mb-12 6xl:mb-14 tracking-tight">
        {product.name}
      </h3>
      <p className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl 4xl:text-5xl 5xl:text-6xl 6xl:text-7xl text-primary/70 mb-3 xs:mb-4 sm:mb-5 md:mb-6 lg:mb-7 xl:mb-8 2xl:mb-9 3xl:mb-10 4xl:mb-12 5xl:mb-14 6xl:mb-16 leading-relaxed">
        {product.shortDescription || "Premium alkaline water ionizer engineered for performance and wellness."}
      </p>

      {/* ✅ Key Specs */}
      <div className="flex justify-between text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl 4xl:text-5xl 5xl:text-6xl 6xl:text-7xl mb-3 xs:mb-4 sm:mb-5 md:mb-6 lg:mb-7 xl:mb-8 2xl:mb-9 3xl:mb-10 4xl:mb-12 5xl:mb-14 6xl:mb-16">
        <div className="bg-bg/30 p-1 xs:p-2 sm:p-3 md:p-4 lg:p-5 xl:p-6 2xl:p-7 3xl:p-8 4xl:p-9 5xl:p-10 6xl:p-12 rounded-md text-center flex-1 mr-1 xs:mr-2 sm:mr-3 md:mr-4 lg:mr-5 xl:mr-6 2xl:mr-7 3xl:mr-8 4xl:mr-9 5xl:mr-10 6xl:mr-12">
          <div className="text-primary/70">Plates</div>
          <div className="text-primary font-semibold">{product.plates || "—"}</div>
        </div>
        <div className="bg-bg/30 p-1 xs:p-2 sm:p-3 md:p-4 lg:p-5 xl:p-6 2xl:p-7 3xl:p-8 4xl:p-9 5xl:p-10 6xl:p-12 rounded-md text-center flex-1 mr-1 xs:mr-2 sm:mr-3 md:mr-4 lg:mr-5 xl:mr-6 2xl:mr-7 3xl:mr-8 4xl:mr-9 5xl:mr-10 6xl:mr-12">
          <div className="text-primary/70">pH</div>
          <div className="text-primary font-semibold">{product.ph || "—"}</div>
        </div>
        <div className="bg-bg/30 p-1 xs:p-2 sm:p-3 md:p-4 lg:p-5 xl:p-6 2xl:p-7 3xl:p-8 4xl:p-9 5xl:p-10 6xl:p-12 rounded-md text-center flex-1">
          <div className="text-primary/70">ORP</div>
          <div className="text-primary font-semibold">{product.orp || "—"}</div>
        </div>
      </div>

      {/* ✅ Buttons */}
      <div className="flex gap-1 xs:gap-2 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-6 2xl:gap-7 3xl:gap-8 4xl:gap-9 5xl:gap-10 6xl:gap-12 mt-auto">
        <Link
          href={`/products/${product.id}`}
          className="flex-1 px-2 xs:px-3 sm:px-4 md:px-5 lg:px-6 xl:px-7 2xl:px-8 3xl:px-9 4xl:px-10 5xl:px-12 6xl:px-14 py-1 xs:py-2 sm:py-3 md:py-4 lg:py-5 xl:py-6 2xl:py-7 3xl:py-8 4xl:py-9 5xl:py-10 6xl:py-12 rounded-lg xs:rounded-xl sm:rounded-xl md:rounded-xl lg:rounded-xl xl:rounded-xl 2xl:rounded-xl 3xl:rounded-xl 4xl:rounded-xl 5xl:rounded-xl 6xl:rounded-xl bg-bg/30 text-primary text-center hover:bg-bg/40 transition text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl 4xl:text-5xl 5xl:text-6xl 6xl:text-7xl"
        >
          View Details
        </Link>

        <Link
          href={`/products/compare?products=${product.id}`}
          className="px-2 xs:px-3 sm:px-4 md:px-5 lg:px-6 xl:px-7 2xl:px-8 3xl:px-9 4xl:px-10 5xl:px-12 6xl:px-14 py-1 xs:py-2 sm:py-3 md:py-4 lg:py-5 xl:py-6 2xl:py-7 3xl:py-8 4xl:py-9 5xl:py-10 6xl:py-12 rounded-lg xs:rounded-xl sm:rounded-xl md:rounded-xl lg:rounded-xl xl:rounded-xl 2xl:rounded-xl 3xl:rounded-xl 4xl:rounded-xl 5xl:rounded-xl 6xl:rounded-xl bg-gradient-to-r from-[#EBEBEB] to-[#C9CFD7] text-[#0A2238] hover:from-[#C9CFD7] hover:to-[#EBEBEB] transition-all flex items-center justify-center"
          title="Add to Comparison"
        >
          <BarChart3 className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 2xl:w-9 2xl:h-9 3xl:w-10 3xl:h-10 4xl:w-12 4xl:h-12 5xl:w-14 5xl:h-14 6xl:w-16 6xl:h-16" />
        </Link>

        <button
          onClick={() => openWhatsApp(product.name)}
          className="flex-1 px-2 xs:px-3 sm:px-4 md:px-5 lg:px-6 xl:px-7 2xl:px-8 3xl:px-9 4xl:px-10 5xl:px-12 6xl:px-14 py-1 xs:py-2 sm:py-3 md:py-4 lg:py-5 xl:py-6 2xl:py-7 3xl:py-8 4xl:py-9 5xl:py-10 6xl:py-12 rounded-lg xs:rounded-xl sm:rounded-xl md:rounded-xl lg:rounded-xl xl:rounded-xl 2xl:rounded-xl 3xl:rounded-xl 4xl:rounded-xl 5xl:rounded-xl 6xl:rounded-xl bg-primary text-bg font-medium hover:scale-[1.02] transition text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl 4xl:text-5xl 5xl:text-6xl 6xl:text-7xl"
        >
          Enquire
        </button>
      </div>

      <p className="text-center text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl 4xl:text-5xl 5xl:text-6xl 6xl:text-7xl text-primary/70 mt-2 xs:mt-3 sm:mt-4 md:mt-5 lg:mt-6 xl:mt-7 2xl:mt-8 3xl:mt-9 4xl:mt-10 5xl:mt-12 6xl:mt-14">
        {product.price ? `₹${product.price.toLocaleString()}` : 'Contact for Price'}
      </p>
    </article>
  );
}