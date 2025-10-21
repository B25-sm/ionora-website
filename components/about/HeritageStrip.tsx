"use client";

import { motion } from "framer-motion";

const items = [
  { year: "2004", text: "Early innovation era, R&D begins" },
  { year: "2012", text: "Medical-grade breakthroughs" },
  { year: "2018", text: "Global certifications & expansion" },
  { year: "2024", text: "IONORA marketplace launch" },
];

export default function HeritageStrip() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 md:p-7">
      <h3 className="text-xl md:text-2xl font-bold text-white/90 mb-5">
        Heritage
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 md:gap-6">
        {items.map((i, idx) => (
          <motion.div
            key={i.year}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: idx * 0.05, duration: 0.5 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-4"
          >
            <div className="text-2xl font-extrabold text-white">{i.year}</div>
            <div className="mt-1 text-sm text-white/75">{i.text}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
