"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { BarChart3 } from "lucide-react";
import { useRouter } from "next/navigation";
import type { Product } from "@/data/products";
import type { InstallationType } from "@/data/schema";
import { HAS_WHATSAPP_NUMBER, getWhatsAppUrlWithMessage } from "@/lib/contact";
import { useCart } from "@/components/cart/CartProvider";

export default function ProductCard({ product }: { product: Product }) {
  const [selectedInstallation, setSelectedInstallation] = useState<InstallationType | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [addStatus, setAddStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [addError, setAddError] = useState<string | null>(null);
  const router = useRouter();
  const { addItem, isAuthenticated } = useCart();

  const openWhatsApp = (productName: string) => {
    if (!HAS_WHATSAPP_NUMBER) return;
    const message = `Hello, I'd like to know more about ${productName}. Could you please share the details?`;
    const whatsappUrl = getWhatsAppUrlWithMessage(message);
    if (!whatsappUrl) return;
    window.open(whatsappUrl, "_blank");
  };

  // Check if product has installation variants
  const hasInstallationVariants = product.installationVariants && product.installationVariants.length > 0;
  
  // Get current display image
  const displayImage = useMemo(() => {
    if (selectedInstallation && product.installationVariants) {
      const variant = product.installationVariants.find(v => v.type === selectedInstallation);
      if (variant) return variant.image;
    }
    return product.image || '';
  }, [product.image, product.installationVariants, selectedInstallation]);

  // Get current display price
  const displayPrice = useMemo(() => {
    if (selectedInstallation && product.installationVariants) {
      const variant = product.installationVariants.find(v => v.type === selectedInstallation);
      if (variant && variant.price !== undefined) return variant.price;
    }
    return product.price;
  }, [product.installationVariants, product.price, selectedInstallation]);

  const handleAddToCart = async () => {
    if (isAdding) return;

    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    setIsAdding(true);
    setAddStatus('idle');
    setAddError(null);

    try {
      const resolvedPrice = typeof displayPrice === "number" ? displayPrice : 0;
      await addItem({
        externalProduct: {
          external_id: product.id,
          name: product.name,
          final_price: resolvedPrice,
          description: product.plates ?? product.category,
          category: product.category,
          images: displayImage ? [displayImage] : undefined,
          stock_quantity: 999,
        },
      });
      setAddStatus('success');
      setTimeout(() => setAddStatus('idle'), 2500);
    } catch (error) {
      setAddStatus('error');
      const message =
        error instanceof Error ? error.message : "Unable to add the product to cart right now.";
      setAddError(message);
    } finally {
      setIsAdding(false);
    }
  };

  const addButtonLabel = !isAuthenticated
    ? "Sign in to add"
    : isAdding
    ? "Adding..."
    : addStatus === 'success'
    ? "Added"
    : "Add to Cart";

  return (
    <article className="bg-primary/10 rounded-xl sm:rounded-2xl md:rounded-3xl p-3 sm:p-4 md:p-5 lg:p-6 flex flex-col h-full shadow-lg border border-primary/20 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      {/* ✅ Product Image - Fixed header */}
      <div className="relative w-full h-40 sm:h-48 md:h-56 lg:h-64 mb-3 sm:mb-4 rounded-lg sm:rounded-xl overflow-hidden bg-bg flex items-center justify-center flex-shrink-0">
        <Image
          src={displayImage}
          alt={product.name}
          fill
          priority
          sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-contain hover:scale-105 transition-all duration-300"
        />
      </div>

      {/* ✅ Content Area - flex: 1 to push footer down */}
      <div className="flex flex-col flex-1 min-h-0">
        {/* ✅ Product Info */}
        <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-primary mb-2 sm:mb-3 tracking-tight">
          {product.name}
        </h3>

        {/* Category Badge */}
        {product.category && (
          <span className="inline-block px-2 py-1 text-[10px] sm:text-xs font-medium text-primary/90 bg-primary/10 border border-primary/30 rounded-md mb-2 sm:mb-3 w-fit">
            {product.category}
          </span>
        )}

        {/* ✅ Key Specs */}
        <div className="flex justify-between text-xs sm:text-sm mb-3 sm:mb-4 gap-1 sm:gap-2">
          <div className="bg-bg/30 p-2 sm:p-3 rounded-md text-center flex-1">
            <div className="text-primary/70 text-[10px] sm:text-xs">Plates</div>
            <div className="text-primary font-semibold">{product.plates || "—"}</div>
          </div>
          <div className="bg-bg/30 p-2 sm:p-3 rounded-md text-center flex-1">
            <div className="text-primary/70 text-[10px] sm:text-xs">pH</div>
            <div className="text-primary font-semibold">{product.phRange || "—"}</div>
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

        </div>

        <div className="mt-2 flex gap-2 sm:gap-3">
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className="flex-1 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 rounded-lg bg-gradient-to-r from-[#3A6FF8] to-[#5F8CFF] text-white font-medium hover:opacity-95 transition text-xs sm:text-sm disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {addButtonLabel}
          </button>
          {HAS_WHATSAPP_NUMBER && (
            <button
              onClick={() => openWhatsApp(product.name)}
              className="flex-1 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 rounded-lg bg-primary text-bg font-medium hover:scale-[1.02] transition text-xs sm:text-sm"
            >
              Enquire
            </button>
          )}
        </div>

        {addStatus === 'error' && addError && (
          <p className="mt-2 text-[11px] sm:text-xs text-red-500">{addError}</p>
        )}
        {addStatus === 'success' && (
          <p className="mt-2 text-[11px] sm:text-xs text-emerald-500">Added to cart</p>
        )}

        {/* Counter/Undercounter Toggle */}
        {hasInstallationVariants && (
          <div className="flex gap-2 mb-3">
            {product.installationVariants?.map((variant) => (
              <button
                key={variant.type}
                onClick={() => setSelectedInstallation(variant.type as InstallationType)}
                className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  selectedInstallation === variant.type
                    ? 'bg-primary text-bg shadow-lg'
                    : 'bg-bg/30 border border-primary/20 text-primary/70 hover:bg-bg/40'
                }`}
              >
                {variant.type === 'counter' ? 'Counter-top' : 'Undercounter'}
              </button>
            ))}
          </div>
        )}

        <p className="text-center text-xs sm:text-sm text-primary/70 mt-2 sm:mt-3">
          {getDisplayPrice() ? `₹${getDisplayPrice()!.toLocaleString('en-IN')}` : 'Contact for Price'}
        </p>
      </div>
    </article>
  );
}