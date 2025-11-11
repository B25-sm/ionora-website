"use client";

import React from "react";
import Image from "next/image";
import { Award, Shield, CheckCircle2, FileCheck } from "lucide-react";
import { BRANDS } from "@/data/brands";

const CERTIFICATION_ICONS = [
  { name: "ISO 13485", icon: Award, color: "text-[#FFD100]" },
  { name: "ISO 9001", icon: Shield, color: "text-[#FFD100]" },
  { name: "ISO 14001", icon: CheckCircle2, color: "text-[#FFD100]" },
  { name: "ISO 45001", icon: Shield, color: "text-[#FFD100]" },
  { name: "CE", icon: FileCheck, color: "text-[#FFD100]" },
  { name: "GMP", icon: CheckCircle2, color: "text-[#FFD100]" },
  { name: "WQA", icon: Award, color: "text-[#FFD100]" },
  { name: "FDA", icon: Shield, color: "text-[#FFD100]" },
];

function parseCertifications(certString: string): string[] {
  return certString.split(",").map((cert) => cert.trim());
}

function getCertIcon(certName: string) {
  const cert = CERTIFICATION_ICONS.find(
    (c) => certName.toLowerCase().includes(c.name.toLowerCase().split(" ")[0])
  );
  return cert || { icon: Award, color: "text-[#FFD100]" };
}

export default function CertificatesShowcase() {
  // Get all unique certifications from all brands
  const allCertifications = BRANDS.filter(
    (brand) => brand.certifications
  ).flatMap((brand) => parseCertifications(brand.certifications!));

  // Get unique certifications
  const uniqueCertifications = Array.from(new Set(allCertifications));

  // Group certifications by brand
  const brandCertifications = BRANDS.filter(
    (brand) => brand.certifications && brand.featured
  ).map((brand) => ({
    brandName: brand.name,
    brandCountry: brand.country,
    certifications: parseCertifications(brand.certifications!),
    logo: brand.logo,
  }));

  return (
    <section className="py-20 px-6 md:px-12 bg-gradient-to-b from-[#0A0F2C] via-[#1a1f3c] to-[#0A0F2C]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Certifications & Quality Standards
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Our undertaking brands are certified by world-leading quality and safety standards
          </p>
        </div>

        {/* All Certifications Grid */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            Our Certifications
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
            {uniqueCertifications.map((cert, index) => {
              const { icon: Icon, color } = getCertIcon(cert);
              return (
                <div
                  key={index}
                  className="bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-200 flex flex-col items-center text-center group"
                >
                  <div className={`${color} mb-3 group-hover:scale-110 transition-transform duration-200`}>
                    <Icon className="w-10 h-10 md:w-12 md:h-12" />
                  </div>
                  <span className="text-white font-semibold text-sm md:text-base">
                    {cert}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Brand Certifications */}
        <div className="space-y-8">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            Certifications by Brand
          </h3>
          {brandCertifications.map((brand, brandIndex) => (
            <div
              key={brandIndex}
              className="bg-white/5 rounded-2xl p-6 md:p-8 border border-white/10"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 mb-6">
                {brand.logo && (
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center">
                    <Image
                      src={brand.logo}
                      alt={brand.brandName}
                      className="w-full h-full object-contain"
                      width={64}
                      height={64}
                    />
                  </div>
                )}
                <div>
                  <h4 className="text-xl md:text-2xl font-bold text-white mb-1">
                    {brand.brandName}
                  </h4>
                  <p className="text-white/60 text-sm">
                    {brand.brandCountry}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
                {brand.certifications.map((cert, certIndex) => {
                  const { icon: Icon, color } = getCertIcon(cert);
                  return (
                    <div
                      key={certIndex}
                      className="bg-white/3 rounded-lg p-4 border border-white/5 hover:border-[#FFD100]/30 transition-all duration-200 flex flex-col items-center text-center"
                    >
                      <div className={`${color} mb-2`}>
                        <Icon className="w-6 h-6 md:w-8 md:h-8" />
                      </div>
                      <span className="text-white/90 font-medium text-xs md:text-sm">
                        {cert}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

