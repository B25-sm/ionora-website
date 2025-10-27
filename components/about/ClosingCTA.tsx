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
      className="relative overflow-hidden rounded-3xl border border-[#B45253]/20 bg-gradient-to-br from-[#B45253]/10 via-[#FFE797]/10 to-[#B45253]/10 p-7 md:p-10 backdrop-blur-xl shadow-xl"
    >
      <div className="absolute -top-16 -right-16 size-56 rounded-full bg-gradient-to-tr from-[#B45253]/30 to-[#FFE797]/30 blur-3xl" />
      <div className="relative">
        <h3 className="text-2xl md:text-[28px] font-extrabold text-[#B45253] drop-shadow-sm">
          Start your hydration upgrade
        </h3>
        <p className="mt-2 text-[#B45253]/80 drop-shadow-sm">
          Explore premium ionizers from trusted brands.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/products"
            className="inline-flex items-center rounded-xl px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[#B45253] to-[#B45253]/80 shadow-md hover:shadow-xl hover:scale-[1.02] active:scale-[0.99] transition"
          >
            Explore Products
          </Link>

          <a
            href="https://wa.me/917993004900"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="inline-flex items-center rounded-xl px-5 py-2.5 text-sm font-semibold text-[#B45253] border border-[#B45253]/20 bg-white/80 backdrop-blur-md hover:bg-[#FFE797]/20 transition shadow-md"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </motion.div>
  );
}
