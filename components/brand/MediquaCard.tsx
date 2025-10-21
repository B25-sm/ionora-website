"use client";

import React from "react";
import BrandCard from "./BrandCard"; // assumes the BrandCard from previous step exists

export default function MediquaCard({
  onView,
}: {
  onView?: () => void;
}) {
  // logo path - put your file at public/images/products/mediqua/mediqua-logo.png
  const logoSrc = "/images/products/mediqua/mediqua-logo.png";

  return (
    <BrandCard
      brandKey="mediqua"
      title="Mediqua India"
      subtitle="Clinical Precision"
      modelsCount={8}
      country="Korea"
      logoSrc={logoSrc}
      onView={onView}
    />
  );
}

