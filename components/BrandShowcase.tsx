"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";

const brands = [
  { 
    id: "life-ionizers-india", 
    title: "LIFE IONIZERS USA", 
    subtitle: "Pioneer of Innovation", 
    models: 11, 
    country: "USA",
    logo: "/images/life/life-logo.png"
  },
  { 
    id: "mediqua-india", 
    title: "MEDIQUA KOREA", 
    subtitle: "Clinical Precision", 
    models: 8, 
    country: "Korea",
    logo: "/images/products/mediqua/mediqua logo.avif"
  },
  { 
    id: "medisoul-india", 
    title: "MEDISOUL KOREA", 
    subtitle: "Wellness Engineering (incl. Kyron & Tycoon)", 
    models: 24, 
    country: "Korea",
    logo: "/images/products/medisoul/medisoul-logo.png"
  },
];

function BrandCard({ b }: { b: typeof brands[number] }) {
  return (
    <article
      aria-labelledby={`brand-${b.id}`}
      className="relative flex flex-col justify-between p-7 rounded-3xl border border-primary/20 backdrop-blur-sm bg-primary/10 hover:translate-y-[-6px] transition-transform duration-400 shadow-xl"
    >
      <div className="flex items-start gap-4">
        {/* Logo image */}
        <div className="w-16 h-16 rounded-xl overflow-hidden bg-bg/30 border border-primary/10 flex items-center justify-center flex-shrink-0">
          {b.logo ? (
            <Image
              src={b.logo}
              alt={`${b.title} logo`}
              width={64}
              height={64}
              className="w-full h-full object-contain"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-lg font-semibold text-primary">
              {b.title.split(" ").map(s => s[0]).slice(0, 2).join("")}
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 id={`brand-${b.id}`} className="text-2xl md:text-3xl font-extrabold text-primary leading-tight">
            {b.title}
          </h3>
          <p className="mt-1 text-sm text-primary/70">{b.subtitle}</p>
        </div>
        <div className="ml-4 self-start flex-shrink-0">
          <span className="inline-block text-xs px-3 py-1 rounded-full bg-bg/30 text-primary font-medium">{b.country}</span>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="flex flex-col">
          <span className="text-xs text-primary/70 uppercase tracking-wide">Models</span>
          <span className="text-xl font-semibold text-primary mt-1">{b.models}</span>
        </div>

        <Link
          href={`/products?brand=${b.id}`}
          className="ml-auto inline-flex items-center gap-3 bg-primary px-5 py-2.5 rounded-full text-bg font-semibold shadow-lg hover:scale-[1.02] transition-transform duration-300"
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
    <section className="py-20 px-6 md:px-12 bg-bg">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold text-primary">Explore Premium Brands</h2>
        <p className="mt-3 text-lg text-primary/70 max-w-2xl mx-auto">
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