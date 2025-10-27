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
        <div className="relative z-10 p-4 xs:p-5 sm:p-6 md:p-7 lg:p-8 xl:p-9 2xl:p-10 3xl:p-12 4xl:p-14 5xl:p-16 6xl:p-18">
          {/* Top row: Country chip */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2 xs:gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-7 2xl:gap-8 3xl:gap-9 4xl:gap-10 5xl:gap-12 6xl:gap-14">
              {/* Floating logo */}
              <div
                className={cn(
                  "relative size-8 xs:size-10 sm:size-12 md:size-14 lg:size-16 xl:size-18 2xl:size-20 3xl:size-24 4xl:size-28 5xl:size-32 6xl:size-36 rounded-xl xs:rounded-2xl sm:rounded-2xl md:rounded-2xl lg:rounded-2xl xl:rounded-2xl 2xl:rounded-2xl 3xl:rounded-2xl 4xl:rounded-2xl 5xl:rounded-2xl 6xl:rounded-2xl",
                  "bg-gradient-to-br",
                  accentFrom,
                  accentTo,
                  "p-[2px] shadow-lg"
                )}
                style={{ transform: `translate3d(${offset.x}px, ${offset.y}px, 0)` }}
              >
                <div className="grid place-items-center size-full rounded-xl xs:rounded-2xl sm:rounded-2xl md:rounded-2xl lg:rounded-2xl xl:rounded-2xl 2xl:rounded-2xl 3xl:rounded-2xl 4xl:rounded-2xl 5xl:rounded-2xl 6xl:rounded-2xl bg-black/60 dark:bg-black/60">
                  {logoSrc ? (
                    <Image
                      src={logoSrc}
                      alt={`${name} logo`}
                      width={40}
                      height={40}
                      className="opacity-90 w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 xl:w-9 xl:h-9 2xl:w-10 2xl:h-10 3xl:w-12 3xl:h-12 4xl:w-14 4xl:h-14 5xl:w-16 5xl:h-16 6xl:w-18 6xl:h-18"
                    />
                  ) : (
                    <span className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl 4xl:text-5xl 5xl:text-6xl 6xl:text-7xl font-bold text-white">{name.charAt(0)}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="px-2 xs:px-3 sm:px-4 md:px-5 lg:px-6 xl:px-7 2xl:px-8 3xl:px-9 4xl:px-10 5xl:px-12 6xl:px-14 py-1 xs:py-1 sm:py-2 md:py-2 lg:py-3 xl:py-3 2xl:py-4 3xl:py-4 4xl:py-5 5xl:py-6 6xl:py-7 rounded-full bg-white/10 dark:bg-white/10 border border-white/15 text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl 4xl:text-5xl 5xl:text-6xl 6xl:text-7xl text-white/80">
              {country}
            </div>
          </div>

          {/* Title + tagline */}
          <div className="mt-4 xs:mt-5 sm:mt-6 md:mt-7 lg:mt-8 xl:mt-9 2xl:mt-10 3xl:mt-12 4xl:mt-14 5xl:mt-16 6xl:mt-18">
            <h3
              className={cn(
                "text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl 3xl:text-7xl 4xl:text-8xl 5xl:text-9xl 6xl:text-10xl font-extrabold leading-tight",
                "bg-clip-text text-transparent bg-gradient-to-r",
                accentFrom,
                accentTo
              )}
            >
              {name}
            </h3>
            <p className="mt-1 xs:mt-2 sm:mt-3 md:mt-4 lg:mt-5 xl:mt-6 2xl:mt-7 3xl:mt-8 4xl:mt-9 5xl:mt-10 6xl:mt-12 text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl 4xl:text-5xl 5xl:text-6xl 6xl:text-7xl text-white/70">{tagline}</p>
          </div>

          {/* Footer row */}
          <div className="mt-5 xs:mt-6 sm:mt-7 md:mt-8 lg:mt-9 xl:mt-10 2xl:mt-11 3xl:mt-12 4xl:mt-14 5xl:mt-16 6xl:mt-18 flex items-center justify-between">
            <div className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl 4xl:text-5xl 5xl:text-6xl 6xl:text-7xl text-white/70">
              <span className="font-semibold text-white">{productCount}</span> models
            </div>

            <button
              className={cn(
                "rounded-lg xs:rounded-xl sm:rounded-xl md:rounded-xl lg:rounded-xl xl:rounded-xl 2xl:rounded-xl 3xl:rounded-xl 4xl:rounded-xl 5xl:rounded-xl 6xl:rounded-xl px-3 xs:px-4 sm:px-5 md:px-6 lg:px-7 xl:px-8 2xl:px-9 3xl:px-10 4xl:px-12 5xl:px-14 6xl:px-16 py-1 xs:py-2 sm:py-3 md:py-4 lg:py-5 xl:py-6 2xl:py-7 3xl:py-8 4xl:py-9 5xl:py-10 6xl:py-12 text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl 4xl:text-5xl 5xl:text-6xl 6xl:text-7xl font-semibold tracking-wide text-white",
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
