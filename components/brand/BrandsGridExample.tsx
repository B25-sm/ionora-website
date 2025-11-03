"use client";

import React from "react";
import { useRouter } from "next/navigation";
import MediquaCard from "./MediquaCard";
import BrandCard from "./BrandCard"; // generic
// Example logos for other brands:
const lifeLogo = "/images/ionora-logo.png"; // adjust if different
const medisoulLogo = "/images/products/medisoul/medisoul-logo.png";

export default function BrandsGridExample() {
  const router = useRouter();
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <BrandCard
        brandKey="life"
        title="Life Ionizers™ India"
        subtitle="Pioneer of Innovation"
        modelsCount={11}
        country="India"
        logoSrc={lifeLogo}
        onView={() => router.push("/products/life")}
      />

      {/* Mediqua card (consistent style) */}
      <MediquaCard onView={() => router.push("/products/mediqua")} />

      <BrandCard
        brandKey="medisoul"
        title="Medisoul™ India"
        subtitle="Wellness Engineering"
        modelsCount={15}
        country="India"
        logoSrc={medisoulLogo}
        onView={() => router.push("/products/medisoul")}
      />
    </section>
  );
}

