"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function ClosingCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8 }}
      className="relative overflow-hidden rounded-3xl border border-[#EBEBEB] bg-[#EBEBEB]/10 p-12 md:p-16 shadow-2xl"
    >

      <div className="relative text-center max-w-4xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EBEBEB] border border-[#EBEBEB] mb-8"
        >
          <div className="w-2 h-2 bg-[#0A0F2C] rounded-full" />
          <span className="text-sm font-bold text-[#0A0F2C] tracking-wide">
            READY TO BEGIN?
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-4xl md:text-6xl lg:text-7xl font-black text-[#0A0F2C] leading-tight mb-6"
        >
          Start Your{" "}
          <span className="text-[#EBEBEB]">
            Hydration
          </span>{" "}
          Upgrade
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-xl md:text-2xl text-[#0A0F2C]/70 leading-relaxed mb-12 max-w-2xl mx-auto"
        >
          Explore premium ionizers from trusted brands and discover the perfect water solution for your home.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            href="/products"
            className="group relative inline-flex items-center gap-3 rounded-2xl px-8 py-4 text-lg font-bold text-white bg-[#0A0F2C] shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <span>Explore Products</span>
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </Link>

          <a
            href="https://wa.me/9230123451"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="group inline-flex items-center gap-3 rounded-2xl px-8 py-4 text-lg font-bold text-[#0A2238] border-2 border-[#EBEBEB] bg-white hover:bg-[#EBEBEB] hover:text-[#0A2238] transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95"
          >
            <span className="text-2xl">💬</span>
            <span>WhatsApp</span>
          </a>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-12 flex flex-wrap justify-center items-center gap-8 text-sm text-[#0A0F2C]/60"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#EBEBEB] rounded-full" />
            <span>Free Consultation</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#EBEBEB] rounded-full" />
            <span>Global Shipping</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#EBEBEB] rounded-full" />
            <span>24/7 Support</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
