"use client";

import { motion } from "framer-motion";
import { Fragment } from "react";

const pillars = [
  {
    title: "Medical-grade Ionization",
    subtitle: "Clinically validated",
    from: "from-sky-400",
    to: "to-violet-500",
  },
  {
    title: "Design & Craft",
    subtitle: "Built for harmony and longevity",
    from: "from-emerald-400",
    to: "to-cyan-500",
  },
  {
    title: "Transparent Specs",
    subtitle: "Trust through clarity",
    from: "from-fuchsia-400",
    to: "to-indigo-500",
  },
  {
    title: "Global Support",
    subtitle: "Wherever you are",
    from: "from-amber-400",
    to: "to-pink-500",
  },
];

export default function BrandPillars() {
  return (
    <div>
      <h3 className="text-xl md:text-2xl font-bold text-[#B45253] mb-5 drop-shadow-sm">
        Our Pillars
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 md:gap-6">
        {pillars.map((p, idx) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: idx * 0.05, duration: 0.5 }}
            className="relative overflow-hidden rounded-2xl border border-[#B45253]/20 bg-white/90 backdrop-blur-xl p-5 shadow-lg"
          >
            <div className={`absolute inset-x-0 -top-1 h-[2px] bg-gradient-to-r from-[#B45253] to-[#FFE797] opacity-70`} />
            <div className="text-lg font-semibold text-[#B45253] drop-shadow-sm">{p.title}</div>
            <div className="mt-1 text-sm text-[#B45253]/80 drop-shadow-sm">{p.subtitle}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
