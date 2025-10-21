"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type BrandCardProps = {
  id: string;
  name: string;
  country?: string;
  tagline?: string;
  productCount?: number;
  href: string;
  logoSrc?: string;
  accentFrom?: string;
  accentTo?: string;
};

export default function BrandCard({
  id,
  name,
  country = "India",
  tagline = "Premium Hydration Engineering",
  productCount = 0,
  href,
  logoSrc,
  accentFrom = "from-indigo-400",
  accentTo = "to-violet-500",
}: BrandCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  function onMouseMove(e: React.MouseEvent) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16; // -8..8
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 16;
    setOffset({ x, y });
  }

  function onMouseLeave() {
    setOffset({ x: 0, y: 0 });
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={cn(
        "relative group rounded-3xl overflow-hidden",
        "border border-white/10 bg-white/5 dark:bg-white/5 backdrop-blur-xl",
        "shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]"
      )}
    >
      {/* Gradient border glow */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 rounded-3xl",
          "before:absolute before:inset-[-1px] before:rounded-[1.6rem]",
          "before:bg-gradient-to-r",
          `before:${accentFrom} before:${accentTo}`,
          "before:opacity-0 group-hover:before:opacity-40",
          "before:transition-opacity before:duration-500"
        )}
      />

      {/* Ambient sweep */}
      <div className="pointer-events-none absolute -inset-x-20 -top-20 h-32 bg-gradient-to-r from-white/10 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      <Link href={href} aria-label={`View products for ${name}`}>
        <div className="relative z-10 p-6 md:p-7 lg:p-8">
          {/* Top row: Country chip */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              {/* Floating logo */}
              <div
                className={cn(
                  "relative size-12 md:size-14 rounded-2xl",
                  "bg-gradient-to-br",
                  accentFrom,
                  accentTo,
                  "p-[2px] shadow-lg"
                )}
                style={{ transform: `translate3d(${offset.x}px, ${offset.y}px, 0)` }}
              >
                <div className="grid place-items-center size-full rounded-2xl bg-black/60 dark:bg-black/60">
                  {logoSrc ? (
                    <Image
                      src={logoSrc}
                      alt={`${name} logo`}
                      width={40}
                      height={40}
                      className="opacity-90"
                    />
                  ) : (
                    <span className="text-xl font-bold text-white">{name.charAt(0)}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="px-3 py-1 rounded-full bg-white/10 dark:bg-white/10 border border-white/15 text-sm text-white/80">
              {country}
            </div>
          </div>

          {/* Title + tagline */}
          <div className="mt-6">
            <h3
              className={cn(
                "text-2xl md:text-[28px] font-extrabold leading-tight",
                "bg-clip-text text-transparent bg-gradient-to-r",
                accentFrom,
                accentTo
              )}
            >
              {name}
            </h3>
            <p className="mt-2 text-sm md:text-base text-white/70">{tagline}</p>
          </div>

          {/* Footer row */}
          <div className="mt-7 flex items-center justify-between">
            <div className="text-sm text-white/70">
              <span className="font-semibold text-white">{productCount}</span> models
            </div>

            <button
              className={cn(
                "rounded-xl px-4 py-2 text-sm font-semibold tracking-wide text-white",
                "bg-gradient-to-r",
                accentFrom,
                accentTo,
                "shadow-md hover:shadow-xl transition-all duration-300",
                "hover:scale-[1.02] active:scale-[0.99]"
              )}
            >
              View Products
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
