"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { use, useEffect, useMemo, useState } from "react";
import { ArrowLeft, CheckCircle, Star, Shield, Zap, Droplets, Settings, Award, Minus, Plus } from "lucide-react";
import Link from "next/link";
import products from "@/data/products";
import CompleteSpecifications from "@/components/CompleteSpecifications";
import { HAS_WHATSAPP_NUMBER, getWhatsAppUrlWithMessage } from "@/lib/contact";
import { useCart } from "@/components/cart/CartProvider";
import { cn } from "@/lib/utils";

export default function ProductDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { addItem, isAuthenticated } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [addStatus, setAddStatus] = useState<"idle" | "success" | "error">("idle");
  const [addError, setAddError] = useState<string | null>(null);

  const product = useMemo(() => products.find((p) => p.id === id), [id]);
  const variantOptions = useMemo(
    () => product?.installationVariants ?? null,
    [product?.installationVariants]
  );
  const [selectedVariantType, setSelectedVariantType] = useState<string | null>(
    () => variantOptions?.[0]?.type ?? null
  );
  const [quantity, setQuantity] = useState<number>(1);

const selectedVariant = useMemo(() => {
  if (!variantOptions || variantOptions.length === 0) return null;
  const match = variantOptions.find((variant) => variant.type === selectedVariantType);
  return match ?? variantOptions[0];
}, [selectedVariantType, variantOptions]);

const baseVariantOrProductPrice = selectedVariant?.price ?? product?.price;
const basePrice = typeof baseVariantOrProductPrice === "number" ? baseVariantOrProductPrice : undefined;

const formattedBasePrice = useMemo(() => {
  if (!basePrice) return null;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(basePrice);
}, [basePrice]);

const totalPrice = useMemo(() => {
  if (!basePrice) return null;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(basePrice * quantity);
}, [basePrice, quantity]);

  useEffect(() => {
    if (!variantOptions || variantOptions.length === 0) {
      setSelectedVariantType(null);
      return;
    }
    if (selectedVariantType && variantOptions.some((variant) => variant.type === selectedVariantType)) {
      return;
    }
    setSelectedVariantType(variantOptions[0]?.type ?? null);
  }, [variantOptions, selectedVariantType]);

  useEffect(() => {
    if (!product) {
      router.replace("/products");
    }
  }, [product, router]);

  if (!product) {
    return null;
  }

  const openWhatsApp = () => {
    if (!HAS_WHATSAPP_NUMBER) return;
    const message = `Hi, I'm interested in ${product.name}. Please share more details about pricing and availability.`;
    const whatsappUrl = getWhatsAppUrlWithMessage(message);
    if (!whatsappUrl) return;
    window.open(whatsappUrl, "_blank");
  };

  const getVariantLabel = (type: string) => {
    const normalized = type.toLowerCase();
    if (normalized.includes("counter") && normalized.includes("under")) {
      return "Counter & Under Counter";
    }
    if (normalized.includes("under")) {
      return "Under Counter";
    }
    if (normalized.includes("counter")) {
      return "Counter Top";
    }
    return type
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const displayImage = selectedVariant?.image ?? product.image ?? "/images/placeholder.png";

  const handleAddToCart = async () => {
    if (isAdding) return;

    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    setIsAdding(true);
    setAddStatus("idle");
    setAddError(null);

    try {
      const resolvedPrice = basePrice ?? 0;
      const descriptionParts = [
        product.plates ?? product.category ?? "",
        selectedVariant ? getVariantLabel(selectedVariant.type) : "",
      ]
        .map((part) => part?.trim())
        .filter(Boolean);

      await addItem({
        externalProduct: {
          external_id: product.id,
          name: product.name,
          final_price: resolvedPrice,
          description: descriptionParts.join(" • ") || undefined,
          category: product.category,
          images: [displayImage].filter(Boolean),
          stock_quantity: 999,
          specifications: selectedVariant
            ? {
                variant: selectedVariant.type,
              }
            : undefined,
        },
        quantity,
      });
      setAddStatus("success");
      setTimeout(() => setAddStatus("idle"), 2500);
    } catch (error) {
      setAddStatus("error");
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
    : addStatus === "success"
    ? "Added"
    : "Add to Cart";

  // Create comprehensive specifications array
  const specifications = [
    { label: "Plates", value: product.plates, icon: Settings },
    { label: "pH Range", value: product.phRange, icon: Droplets },
    { label: "ORP", value: product.orp, icon: Zap },
    { label: "Drinkable ORP", value: product.orpDrink, icon: Droplets },
    { label: "Power", value: product.power, icon: Zap },
    { label: "Warranty", value: product.warranty, icon: Shield },
    { label: "Installation", value: product.installation, icon: Settings },
    { label: "Dimensions", value: product.dimensions, icon: Settings },
    { label: "Voltage", value: product.internationalVoltage, icon: Zap },
    { label: "Membrane Technology", value: product.microMembrane, icon: Settings },
    { label: "Filtration", value: product.filters, icon: Droplets },
    { label: "Filter System", value: product.oneClickFilter, icon: Settings },
    { label: "Self-Cleaning", value: product.cleaning, icon: Settings },
    { label: "Color Options", value: product.colorOptions, icon: Star },
    { label: "Hydrogen Content", value: product.hydrogen, icon: Droplets },
  ].filter(spec => spec.value); // Only show specifications that have values

  const quantityOptions = [1, 2, 4, 8, 12];

  const adjustQuantity = (delta: number) => {
    setQuantity((prev) => {
      const next = prev + delta;
      if (next < 1) return 1;
      if (next > 12) return 12;
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0F2C] via-[#1a1f3c] to-[#0A0F2C] text-white">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link 
            href="/products" 
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Visual & Variant */}
          <div className="space-y-8">
            <div className="relative aspect-square bg-white/5 rounded-3xl p-8 border border-white/10 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 pointer-events-none rounded-3xl" />
              <Image
                src={displayImage}
                alt={product.name}
                width={720}
                height={720}
                className="relative z-10 w-full h-full object-contain drop-shadow-2xl"
                priority
              />
            </div>

            <div className="grid gap-6">
              {/* Variant Selector */}
              {variantOptions && variantOptions.length > 0 && (
                <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-white/60">Choose your variant</p>
                      <h3 className="text-lg font-semibold text-white">Installation Style</h3>
                    </div>
                    <span className="text-white/60 text-sm">Tailored to your setup</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {variantOptions.map((variant) => (
                      <button
                        key={variant.type}
                        onClick={() => setSelectedVariantType(variant.type)}
                        className={cn(
                          "relative overflow-hidden rounded-xl border px-4 py-4 text-left transition-all duration-200",
                          "hover:-translate-y-0.5 hover:shadow-lg",
                          selectedVariantType === variant.type
                            ? "border-blue-400/70 bg-blue-500/10 shadow-[0_0_0_1px] shadow-blue-400/30"
                            : "border-white/10 bg-white/5"
                        )}
                      >
                        <span className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/5 via-transparent to-white/10" />
                        <div className="relative z-10 space-y-2">
                          <p className="text-sm font-semibold text-white">
                            {getVariantLabel(variant.type)}
                          </p>
                          <p className="text-xs text-white/70 leading-relaxed">
                            {variant.type.toLowerCase().includes("under")
                              ? "Discrete under-counter faucet integration"
                              : "Elegant counter-top presence with quick access"}
                          </p>
                          {typeof variant.price === "number" && (
                            <p className="text-base font-semibold text-white/90">
                              {new Intl.NumberFormat("en-IN", {
                                style: "currency",
                                currency: "INR",
                                maximumFractionDigits: 0,
                              }).format(variant.price)}
                            </p>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-white/60">Choose your quantity</p>
                    <h3 className="text-lg font-semibold text-white">Optimize your deployment</h3>
                  </div>
                  <span className="text-emerald-300 text-sm font-medium">Ready to ship</span>
                </div>
                <div className="flex flex-wrap gap-3 mb-6">
                  {quantityOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => setQuantity(option)}
                      className={cn(
                        "px-4 py-2 rounded-full border text-sm font-semibold transition-all duration-200",
                        quantity === option
                          ? "border-blue-400/70 bg-blue-500/10 text-white shadow-[0_0_0_1px] shadow-blue-400/30"
                          : "border-white/10 text-white/70 hover:text-white hover:border-white/40"
                      )}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/30 px-4 py-3">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => adjustQuantity(-1)}
                      className="p-2 rounded-lg border border-white/10 hover:border-white/40 transition-colors"
                    >
                      <Minus className="w-4 h-4 text-white/70" />
                    </button>
                    <div className="w-12 text-center text-lg font-semibold text-white">{quantity}</div>
                    <button
                      onClick={() => adjustQuantity(1)}
                      className="p-2 rounded-lg border border-white/10 hover:border-white/40 transition-colors"
                    >
                      <Plus className="w-4 h-4 text-white/70" />
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="text-xs uppercase tracking-wide text-white/60">Bundle Value</p>
                    <p className="text-base font-semibold text-white">{totalPrice ?? "Get a quote"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-10">
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-white/80">
                  {product.brand?.toUpperCase() || "PREMIUM BRAND"}
                </span>
                <span className="text-white/60 text-sm">
                  {product.category ?? "Ionizer Solution"}
                </span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight text-white">
                {product.name}
              </h1>
              <p className="text-lg text-white/70 leading-relaxed max-w-2xl">
                {product.category === "Commercial"
                  ? "Professional-grade ionization technology engineered for high-demand commercial and institutional environments."
                  : "Premium residential water ionizer delivering balanced hydration, advanced filtration, and intelligent automation."}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-wide text-white/60">Configured price</p>
                  <p className="text-3xl font-semibold text-white">
                    {formattedBasePrice ?? "Contact for pricing"}
                  </p>
                </div>
                {selectedVariant && (
                  <div className="text-right">
                    <p className="text-xs uppercase tracking-wide text-white/60">Selected variant</p>
                    <p className="text-base font-semibold text-white">
                      {getVariantLabel(selectedVariant.type)}
                    </p>
                  </div>
                )}
              </div>
              <p className="text-sm text-white/60">
                Prices inclusive of GST. Installation assistance, calibration, and on-site training available
                on request.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="flex items-center gap-3 mb-2">
                  <Settings className="w-5 h-5 text-[#EBEBEB]" />
                  <span className="font-semibold">Plates</span>
                </div>
                <p className="text-white/80">{product.plates || "N/A"}</p>
              </div>

              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="flex items-center gap-3 mb-2">
                  <Droplets className="w-5 h-5 text-[#EBEBEB]" />
                  <span className="font-semibold">pH Range</span>
                </div>
                <p className="text-white/80">{product.phRange || "N/A"}</p>
              </div>

              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="flex items-center gap-3 mb-2">
                  <Zap className="w-5 h-5 text-[#EBEBEB]" />
                  <span className="font-semibold">ORP</span>
                </div>
                <p className="text-white/80">{product.orp || "N/A"}</p>
              </div>

              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="flex items-center gap-3 mb-2">
                  <Shield className="w-5 h-5 text-[#EBEBEB]" />
                  <span className="font-semibold">Warranty</span>
                </div>
                <p className="text-white/80">{product.warranty || "N/A"}</p>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-4">
              <button
                onClick={handleAddToCart}
                disabled={isAdding || !basePrice}
                className="flex-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 px-8 py-4 rounded-xl font-semibold hover:opacity-90 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {basePrice ? addButtonLabel : "Request a Quote"}
              </button>

              <button className="px-8 py-4 rounded-xl border border-white/20 text-white hover:bg-white/10 transition-all duration-200">
                Add to Compare
              </button>

              {HAS_WHATSAPP_NUMBER && (
                <button
                  onClick={openWhatsApp}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-4 rounded-xl font-semibold hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                  </svg>
                  Enquire on WhatsApp
                </button>
              )}
            </div>

            {addStatus === "error" && addError && (
              <p className="text-sm text-red-400">{addError}</p>
            )}
            {addStatus === "success" && (
              <p className="text-sm text-emerald-400">Added to cart</p>
            )}
          </div>
        </div>

        {/* Detailed Specifications */}
        <div className="mt-20">
          <CompleteSpecifications
            specifications={specifications.map((spec) => ({
              label: spec.label,
              value: spec.value as string,
              icon: spec.icon,
            }))}
            title="Complete Specifications"
          />
        </div>

        {/* Benefits Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Choose This Product?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-[#EBEBEB] to-[#EBEBEB]/80 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-[#0A0F2C]" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Advanced Technology</h3>
              <p className="text-white/70">State-of-the-art ionization technology for optimal water quality and health benefits.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-[#EBEBEB] to-[#EBEBEB]/80 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-[#0A0F2C]" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Reliable Warranty</h3>
              <p className="text-white/70">Comprehensive warranty coverage ensuring long-term peace of mind and support.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-[#EBEBEB] to-[#EBEBEB]/80 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-[#0A0F2C]" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Premium Quality</h3>
              <p className="text-white/70">Built with high-quality materials and components for exceptional durability and performance.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
