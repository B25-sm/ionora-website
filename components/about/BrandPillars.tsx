"use client";

import { motion } from "framer-motion";
import { Fragment } from "react";

const pillars = [
  {
    title: "Medical-grade Ionization",
    subtitle: "Clinically validated technology",
    description: "Advanced electrolysis with medical-grade precision",
    icon: "⚕️",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Design & Craft",
    subtitle: "Built for harmony and longevity",
    description: "Premium materials and timeless aesthetics",
    icon: "✨",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    title: "Transparent Specs",
    subtitle: "Trust through clarity",
    description: "Complete transparency in every specification",
    icon: "🔍",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "Global Support",
    subtitle: "Wherever you are",
    description: "Worldwide service and support network",
    icon: "🌍",
    gradient: "from-amber-500 to-orange-500",
  },
];

export default function BrandPillars() {
  return (
    <div className="text-center">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-black text-[#0A0F2C] mb-4">
          Our <span className="text-[#EBEBEB]">Pillars</span>
        </h2>
        <p className="text-xl text-[#0A0F2C]/70 max-w-2xl mx-auto">
          The foundation of excellence that drives everything we do
        </p>
      </motion.div>

      {/* Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8">
        {pillars.map((pillar, idx) => (
          <motion.div
            key={pillar.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: idx * 0.1, duration: 0.6 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group relative"
          >
            <div className="relative overflow-hidden rounded-3xl border border-[#EBEBEB] bg-white p-8 shadow-xl hover:shadow-2xl transition-all duration-300 h-full">
              {/* Icon */}
              <div className="relative mb-6">
                <div className="w-16 h-16 rounded-2xl bg-[#EBEBEB] flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {pillar.icon}
                </div>
              </div>

              {/* Content */}
              <div className="relative">
                <h3 className="text-xl font-bold text-[#0A2238] mb-2 group-hover:text-[#EBEBEB] transition-colors duration-300">
                  {pillar.title}
                </h3>
                <p className="text-[#EBEBEB] font-semibold text-sm mb-3">
                  {pillar.subtitle}
                </p>
                <p className="text-[#0A0F2C]/70 text-sm leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              {/* Hover Effect Line */}
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-[#EBEBEB] group-hover:w-full transition-all duration-500" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
