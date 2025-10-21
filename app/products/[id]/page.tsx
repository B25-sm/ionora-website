"use client";
import Image from "next/image";
import { notFound } from "next/navigation";
import products from "@/data/products";

export default async function ProductDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);
  if (!product) return notFound();

  const openWhatsApp = () => {
    const message = encodeURIComponent(
      `Hi, I'm interested in ${product.name}. Please share more details.`
    );
    window.open(`https://wa.me/917993004900?text=${message}`, "_blank");
  };

  return (
    <section className="min-h-screen py-16 px-6 bg-gradient-to-b from-[#0b0520] to-[#1b0030] text-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="p-4 bg-white/5 rounded-2xl">
          <Image
            src={product.image || '/images/placeholder.png'}
            alt={product.name}
            width={600}
            height={500}
            className="rounded-xl object-contain"
          />
        </div>

        <div>
          <h1 className="text-4xl font-extrabold mb-3">{product.name}</h1>
          <p className="text-white/70 mb-6">
            Premium alkaline water ionizer with advanced technology
          </p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <span className="text-white/60 text-sm">Plates</span>
              <div className="text-lg font-semibold">{product.plates || "—"}</div>
            </div>
            <div>
              <span className="text-white/60 text-sm">pH Range</span>
              <div className="text-lg font-semibold">{product.phRange || "—"}</div>
            </div>
            <div>
              <span className="text-white/60 text-sm">ORP</span>
              <div className="text-lg font-semibold">{product.orp || "—"}</div>
            </div>
            <div>
              <span className="text-white/60 text-sm">Power</span>
              <div className="text-lg font-semibold">{product.power || "—"}</div>
            </div>
            <div>
              <span className="text-white/60 text-sm">Warranty</span>
              <div className="text-lg font-semibold">{product.warranty || "—"}</div>
            </div>
            <div>
              <span className="text-white/60 text-sm">Installation</span>
              <div className="text-lg font-semibold">{product.installation || "—"}</div>
            </div>
            <div>
              <span className="text-white/60 text-sm">Dimensions</span>
              <div className="text-lg font-semibold">{product.dimensions || "—"}</div>
            </div>
            <div>
              <span className="text-white/60 text-sm">Color Options</span>
              <div className="text-lg font-semibold">{product.colorOptions || "—"}</div>
            </div>
          </div>


          <button
            onClick={openWhatsApp}
            className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-3 rounded-full font-semibold hover:scale-105 transition"
          >
            Enquire on WhatsApp
          </button>
        </div>
      </div>
    </section>
  );
}
