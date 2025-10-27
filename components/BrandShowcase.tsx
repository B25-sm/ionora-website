"use client";
import Link from "next/link";
import React from "react";

const brands = [
  { id: "life", title: "Life Ionizers India", subtitle: "Pioneer of Innovation", models: 11, country: "India", colorFrom: "from-[#B45253]", colorTo: "to-[#B45253]/80" },
  { id: "mediqua", title: "Mediqua India", subtitle: "Clinical Precision", models: 8, country: "Korea", colorFrom: "from-[#FFE797]", colorTo: "to-[#B45253]" },
  { id: "medisoul", title: "Medisoul India", subtitle: "Wellness Engineering", models: 15, country: "India", colorFrom: "from-[#B45253]", colorTo: "to-[#FFE797]" },
];

function InitialBadge({ title, from, to }: { title: string; from: string; to: string }) {
  const initial = title.trim().split(" ").map(s => s[0]).slice(0,2).join("").toUpperCase();
  return (
    <div className={`w-16 h-16 rounded-xl flex items-center justify-center ring-1 ring-white/10 ${from} ${to} bg-gradient-to-br text-white font-bold shadow-md`}>
      <span className="text-lg">{initial}</span>
    </div>
  );
}

function BrandCard({ b }: { b: typeof brands[number] }) {
  return (
    <article
      aria-labelledby={`brand-${b.id}`}
      className="relative flex flex-col justify-between p-7 rounded-3xl border border-[#B45253]/20 backdrop-blur-sm bg-gradient-to-br from-white/90 to-[#FFE797]/30 hover:translate-y-[-6px] transition-transform duration-400 shadow-xl"
    >
      <div className="flex items-start gap-4">
        <InitialBadge title={b.title} from={b.colorFrom} to={b.colorTo} />
        <div className="flex-1">
          <h3 id={`brand-${b.id}`} className="text-2xl md:text-3xl font-extrabold text-[#B45253] leading-tight">
            {b.title}
          </h3>
          <p className="mt-1 text-sm text-[#B45253]/70">{b.subtitle}</p>
        </div>
        <div className="ml-4 self-start">
          <span className="inline-block text-xs px-3 py-1 rounded-full bg-[#B45253]/10 text-[#B45253] font-medium">{b.country}</span>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="flex flex-col">
          <span className="text-xs text-[#B45253]/60 uppercase tracking-wide">Models</span>
          <span className="text-xl font-semibold text-[#B45253] mt-1">{b.models}</span>
        </div>

        <Link
          href={`/products?brand=${b.id}`}
          className="ml-auto inline-flex items-center gap-3 bg-gradient-to-r from-[#B45253] to-[#B45253]/80 px-5 py-2.5 rounded-full text-white font-semibold shadow-lg hover:scale-[1.02] transition-transform duration-300"
          aria-label={`View products for ${b.title}`}
        >
          View Products
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </article>
  );
}

export default function ExplorePremiumBrandsModern() {
  return (
    <section className="py-20 px-6 md:px-12 bg-gradient-to-b from-[#FFE797] via-white to-[#FFE797]">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#B45253]">Explore Premium Brands</h2>
        <p className="mt-3 text-lg text-[#B45253]/70 max-w-2xl mx-auto">
          Hand-picked manufacturers powering the IONORA marketplace.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {brands.map(b => (
          <BrandCard key={b.id} b={b} />
        ))}
      </div>
    </section>
  );
}