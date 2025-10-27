"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function ClosingCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55 }}
      className="relative overflow-hidden rounded-3xl border border-accent/20 bg-accent/10 p-7 md:p-10 backdrop-blur-xl shadow-xl"
    >
      <div className="absolute -top-16 -right-16 size-56 rounded-full bg-accent/30 blur-3xl" />
      <div className="relative">
        <h3 className="text-2xl md:text-[28px] font-extrabold text-accent drop-shadow-sm">
          Start your hydration upgrade
        </h3>
        <p className="mt-2 text-accent/80 drop-shadow-sm">
          Explore premium ionizers from trusted brands.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/products"
            className="inline-flex items-center rounded-xl px-5 py-2.5 text-sm font-semibold text-white bg-accent shadow-md hover:shadow-xl hover:scale-[1.02] active:scale-[0.99] transition"
          >
            Explore Products
          </Link>

          <a
            href="https://wa.me/917993004900"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="inline-flex items-center rounded-xl px-5 py-2.5 text-sm font-semibold text-accent border border-accent/20 bg-white/80 backdrop-blur-md hover:bg-primary/20 transition shadow-md"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </motion.div>
  );
}
