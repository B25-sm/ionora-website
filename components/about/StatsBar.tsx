"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "20+", label: "Years of Innovation" },
  { value: "32+", label: "Countries Served" },
  { value: "11–15", label: "Models per Brand" },
  { value: "1M+", label: "Liters ionized daily" },
];

export default function StatsBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-4"
    >
      {stats.map((s) => (
        <div
          key={s.label}
          className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-5 py-6 text-center"
        >
          <div className="text-3xl md:text-4xl font-extrabold text-white">{s.value}</div>
          <div className="mt-1 text-xs md:text-sm text-white/70">{s.label}</div>
        </div>
      ))}
    </motion.div>
  );
}
