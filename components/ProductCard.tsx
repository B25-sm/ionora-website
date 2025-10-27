"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Product = {
  id: string;
  name: string;
  image: string;
  shortDescription?: string;
  plates?: string;
  ph?: string;
  orp?: string;
};

export default function ProductCard({ product }: { product: Product }) {
  const openWhatsApp = (productName: string) => {
    const message = encodeURIComponent(
      `Hello, I'd like to know more about ${productName}. Could you please share the details?`
    );
    window.open(`https://wa.me/917993004900?text=${message}`, "_blank");
  };

  return (
    <article className="bg-primary/10 rounded-2xl p-5 flex flex-col h-full shadow-lg border border-primary/20 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      {/* ✅ Product Image */}
      <div className="relative w-full h-56 mb-4 rounded-xl overflow-hidden bg-bg flex items-center justify-center">
        <Image
          src={product.image}
          alt={product.name}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-contain hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* ✅ Product Info */}
      <h3 className="text-lg font-semibold text-primary mb-2 tracking-tight">
        {product.name}
      </h3>
      <p className="text-sm text-primary/70 mb-4 leading-relaxed">
        {product.shortDescription || "Premium alkaline water ionizer engineered for performance and wellness."}
      </p>

      {/* ✅ Key Specs */}
      <div className="flex justify-between text-xs mb-5">
        <div className="bg-bg/30 p-2 rounded-md text-center flex-1 mr-2">
          <div className="text-primary/70">Plates</div>
          <div className="text-primary font-semibold">{product.plates || "—"}</div>
        </div>
        <div className="bg-bg/30 p-2 rounded-md text-center flex-1 mr-2">
          <div className="text-primary/70">pH</div>
          <div className="text-primary font-semibold">{product.ph || "—"}</div>
        </div>
        <div className="bg-bg/30 p-2 rounded-md text-center flex-1">
          <div className="text-primary/70">ORP</div>
          <div className="text-primary font-semibold">{product.orp || "—"}</div>
        </div>
      </div>

      {/* ✅ Buttons */}
      <div className="flex gap-3 mt-auto">
        <Link
          href={`/products/${product.id}`}
          className="flex-1 px-4 py-2 rounded-xl bg-bg/30 text-primary text-center hover:bg-bg/40 transition"
        >
          View Details
        </Link>

        <button
          onClick={() => openWhatsApp(product.name)}
          className="flex-1 px-4 py-2 rounded-xl bg-primary text-bg font-medium hover:scale-[1.02] transition"
        >
          Enquire Now
        </button>
      </div>

      <p className="text-center text-sm text-primary/70 mt-3">
        ₹Contact for Price
      </p>
    </article>
  );
}