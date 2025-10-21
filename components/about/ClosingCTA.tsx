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
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-500/10 via-fuchsia-500/10 to-sky-500/10 p-7 md:p-10 backdrop-blur-xl"
    >
      <div className="absolute -top-16 -right-16 size-56 rounded-full bg-gradient-to-tr from-indigo-500/30 to-fuchsia-500/30 blur-3xl" />
      <div className="relative">
        <h3 className="text-2xl md:text-[28px] font-extrabold text-white">
          Start your hydration upgrade
        </h3>
        <p className="mt-2 text-white/80">
          Explore premium ionizers from trusted brands.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/products"
            className="inline-flex items-center rounded-xl px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-sky-400 to-violet-500 shadow-md hover:shadow-xl hover:scale-[1.02] active:scale-[0.99] transition"
          >
            Explore Products
          </Link>

          <a
            href="https://wa.me/917993004900"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="inline-flex items-center rounded-xl px-5 py-2.5 text-sm font-semibold text-white/90 border border-white/20 bg-white/5 backdrop-blur-md hover:bg-white/10 transition"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </motion.div>
  );
}
