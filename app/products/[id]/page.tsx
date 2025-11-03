"use client";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle, Star, Shield, Zap, Droplets, Settings, Award } from "lucide-react";
import Link from "next/link";
import products from "@/data/products";
import CompleteSpecifications from "@/components/CompleteSpecifications";

export default async function ProductDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);
  if (!product) return notFound();

  const openWhatsApp = () => {
    const message = encodeURIComponent(
      `Hi, I'm interested in ${product.name}. Please share more details about pricing and availability.`
    );
    window.open(`https://wa.me/9230123451?text=${message}`, "_blank");
  };

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
          {/* Product Image */}
          <div className="space-y-6">
            <div className="aspect-square bg-white/5 rounded-3xl p-8 border border-white/10">
              <Image
                src={product.image || '/images/placeholder.png'}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            
            {/* Price Display */}
            {product.price && (
              <div className="bg-gradient-to-r from-[#EBEBEB]/20 to-[#EBEBEB]/10 rounded-2xl p-6 border border-[#EBEBEB]/30">
                <div className="text-center">
                  <p className="text-[#EBEBEB] text-sm font-medium mb-2">Starting Price</p>
                  <p className="text-4xl font-bold text-white">₹{product.price.toLocaleString('en-IN')}</p>
                  <p className="text-white/70 text-sm mt-2">Including GST at 18%</p>
                </div>
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="space-y-8">
            {/* Product Title & Brand */}
            <div>
              <div className="inline-block px-4 py-2 bg-white/10 rounded-full text-sm font-medium mb-4">
                {product.brand?.toUpperCase() || 'PREMIUM BRAND'}
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                {product.name}
              </h1>
              <p className="text-xl text-white/70 leading-relaxed">
                {product.category === 'Commercial' 
                  ? 'Professional-grade water ionizer for commercial and institutional use'
                  : 'Advanced residential water ionizer for optimal health and wellness'
                }
              </p>
            </div>

            {/* Key Features */}
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

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={openWhatsApp}
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-4 rounded-xl font-semibold hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                Enquire on WhatsApp
              </button>
              
              <button className="px-8 py-4 rounded-xl border border-white/20 text-white hover:bg-white/10 transition-all duration-200">
                Add to Compare
              </button>
            </div>
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
