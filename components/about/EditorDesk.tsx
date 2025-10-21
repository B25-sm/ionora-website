"use client";

import { motion } from "framer-motion";

export default function EditorDesk() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)] p-6 md:p-10"
    >
      {/* top label */}
      <div className="flex items-center gap-3">
        <div className="rounded-full px-3 py-1 text-xs font-semibold tracking-wide bg-white/10 border border-white/15 text-white/90">
          FROM THE EDITOR'S DESK
        </div>
        <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
      </div>

      <h2 className="mt-4 text-2xl md:text-[28px] font-extrabold text-white">
        WELCOME to Life Ionizers
      </h2>

      <div className="prose prose-invert max-w-none mt-4 md:mt-6 leading-relaxed text-white/90">
        <p>
          At Life Ionizers, we believe that the essence of true health, vitality, and longevity flows
          from the purest gift of nature – water. For over two decades, we have stood as pioneers of
          innovation, transforming simple drinking water into a source of extraordinary power – rich
          in antioxidants, alkaline in nature, and crafted to nourish the body, awaken the mind, and
          uplift the soul. Our vision is bold yet simple – to redefine wellness at its very core. With
          cutting-edge ionization technology, every drop becomes more than just hydration; it becomes
          a fountain of purity, balance, and rejuvenation. Each glass of Life Ionized Water is a
          promise of stronger immunity, renewed energy, and a vibrant lifestyle for families across
          the globe.
        </p>
        <p>
          Guided by excellence, our mission is unwavering: to bring clean, safe, and life-enhancing
          ionized water solutions at home. From advanced research to flawless design, from trusted
          quality to global recognition, Life Ionizers continues to be a symbol of innovation,
          wellness, and unmatched perfection. Step into a new age of health, vitality, and boundless
          energy.
        </p>
        <p className="font-semibold">
          Welcome to Life Ionizers – where every sip is the beginning of true wellness.
        </p>
      </div>
    </motion.article>
  );
}
