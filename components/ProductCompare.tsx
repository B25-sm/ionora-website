"use client";
import React, { useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import productsData, { type Product } from "@/data/products";
import { HAS_WHATSAPP_NUMBER, getWhatsAppUrlWithMessage } from "@/lib/contact";

const FIXED_ORDER: Array<keyof Product | string> = [
  "plates",
  "phRange",
  "orp",
  "orpDrink",
  "power",
  "hydrogen",
  "warranty",
  "installation",
  "dimensions",
  "internationalVoltage",
  "microMembrane",
  "filters",
  "oneClickFilter",
  "cleaning",
  "colorOptions",
];

function openWhatsApp(productName: string) {
  if (!HAS_WHATSAPP_NUMBER) return;
  const message = `Hello, I'm interested in ${productName}. Please share pricing and details.`;
  const whatsappUrl = getWhatsAppUrlWithMessage(message);
  if (!whatsappUrl) return;
  window.open(whatsappUrl, "_blank");
}

export default function ProductCompare() {
  const searchParams = useSearchParams();
  
  // Read product ids from query string
  const raw = searchParams.get("products") ?? "";
  const ids = raw ? raw.split(",").map((s) => s.trim()) : [];

  // fallback to first three products if no ids
  const selected = (ids.length ? ids : productsData.slice(0, 3).map((p) => p.id))
    .map((id) => productsData.find((p) => p.id === id))
    .filter(Boolean) as Product[];

  const specKeys = useMemo(() => {
    const allKeys = new Set<string>();
    selected.forEach((p) => Object.keys(p).forEach((k) => allKeys.add(k)));
    const ordered = FIXED_ORDER.filter((k) => allKeys.has(k as string)).concat(
      Array.from(allKeys).filter(
        (k) => !FIXED_ORDER.includes(k) && k !== "id" && k !== "name" && k !== "image" && k !== "brand"
      )
    );
    return ordered;
  }, [selected]);

  if (!selected.length) return <div className="p-8 text-white">No products selected.</div>;

  return (
    <section className="p-6 md:p-12 text-white">
      <h1 className="text-4xl font-bold mb-6">Compare Products</h1>

      <div className="flex gap-4 flex-wrap mb-8">
        {selected.map(p => (
          <div key={p.id} className="flex gap-3 items-center bg-white/5 rounded-full px-4 py-2">
            <div className="relative w-12 h-12 rounded-md overflow-hidden bg-white/10">
              <Image src={p.image || "/images/placeholder.png"} alt={p.name} fill className="object-contain p-2" />
            </div>
            <div>
              <div className="font-semibold">{p.name}</div>
              <div className="text-xs text-white/60">{p.brand}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="overflow-auto rounded-xl border border-white/10 bg-gradient-to-b from-black/5 to-transparent">
        <table className="min-w-full table-fixed">
          <thead className="bg-white/4">
            <tr>
              <th className="w-48 text-left p-4">Spec</th>
              {selected.map(p => (
                <th key={p.id} className="text-left p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 relative rounded-md overflow-hidden bg-white/5">
                      <Image src={p.image || "/images/placeholder.png"} alt={p.name} fill className="object-contain p-2" />
                    </div>
                    <div>
                      <div className="font-semibold">{p.name}</div>
                      <div className="text-xs text-white/60">{p.brand}</div>
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {specKeys.map(key => (
              <tr key={key} className="border-t border-white/5">
                <td className="p-4 font-medium text-white/80">{key.replace(/([A-Z])/g, " $1").replace(/_/g," ")}</td>
                {selected.map((p) => {
                  const value = p[key as keyof Product];
                  const displayValue = Array.isArray(value) ? value.join(", ") : value;
                  return (
                    <td key={p.id + key} className="p-4 align-top text-sm">
                      {displayValue ?? "N/A"}
                    </td>
                  );
                })}
              </tr>
            ))}

            <tr className="border-t border-white/5">
              <td className="p-4 font-medium">Actions</td>
              {selected.map(p => (
                <td key={p.id + "-actions"} className="p-4">
                  <div className="flex gap-3">
                    <Link href={`/products/${p.id}`} className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                      View Details
                    </Link>
                    {HAS_WHATSAPP_NUMBER && (
                      <button onClick={() => openWhatsApp(p.name)} className="px-4 py-2 bg-green-500 text-black rounded-lg font-semibold hover:bg-green-600 transition-colors">Enquire Now</button>
                    )}
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-xs mt-3 text-white/60">Tip: Add product IDs to the URL like <code className="bg-white/10 px-2 py-1 rounded">?products=mxl-5,mxl-9,lc-30</code></p>
    </section>
  );
}