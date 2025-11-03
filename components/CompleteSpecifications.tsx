"use client";

import React from "react";
import {
  Settings,
  Zap,
  Droplets,
  Shield,
  Star,
  Gauge,
  Power,
  Box,
  Filter,
  Palette,
  Plug,
  Wrench,
  Sparkles,
} from "lucide-react";

type Specification = {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
};

type CompleteSpecificationsProps = {
  specifications: Specification[];
  title?: string;
};

const DEFAULT_ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Plates: Settings,
  Power: Zap,
  "pH Range": Droplets,
  ORP: Zap,
  Warranty: Shield,
  Installation: Wrench,
  Dimensions: Box,
  Voltage: Plug,
  "Membrane Technology": Sparkles,
  Filtration: Filter,
  "Filter System": Filter,
  "Self-Cleaning": Sparkles,
  "Color Options": Palette,
  "Drinkable ORP": Droplets,
  "Hydrogen Content": Droplets,
};

export default function CompleteSpecifications({
  specifications,
  title = "Complete Specifications",
}: CompleteSpecificationsProps) {
  // Map specifications with icons
  const specsWithIcons = specifications.map((spec) => ({
    ...spec,
    icon: spec.icon || DEFAULT_ICON_MAP[spec.label] || Settings,
  }));

  return (
    <section className="py-12 px-6 md:px-12 bg-[#0A0F2C]">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-10">
          {title}
        </h2>

        {/* Specifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {specsWithIcons.map((spec, index) => {
            const IconComponent = spec.icon;
            return (
              <div
                key={index}
                className="bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-200 group"
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-[#FFD100]/30 transition-all duration-200">
                    <IconComponent className="w-6 h-6 text-[#87CEEB] group-hover:text-[#FFD100] transition-colors duration-200" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white mb-2 text-lg">
                      {spec.label}
                    </h3>
                    <p className="text-white/80 leading-relaxed text-sm md:text-base">
                      {spec.value}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

