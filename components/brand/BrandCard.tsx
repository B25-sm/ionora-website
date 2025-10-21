"use client";

import React from "react";

type BrandCardProps = {
  brandKey?: string;
  title: string;
  subtitle?: string;
  modelsCount?: number | string;
  country?: string;
  logoSrc?: string; // public/images/products/<brand>/logo.png or similar
  onView?: () => void;
};

export default function BrandCard({
  brandKey,
  title,
  subtitle,
  modelsCount,
  country,
  logoSrc,
  onView,
}: BrandCardProps) {
  return (
    <article
      role="group"
      aria-labelledby={brandKey ? `brand-${brandKey}` : undefined}
      className="bg-white/4 border border-white/6 rounded-2xl p-6 md:p-8 transition-shadow hover:shadow-lg"
    >
      <div className="grid grid-cols-[64px_1fr] gap-4 items-start">
        {/* Logo column - fixed width so heading never overlaps */}
        <div className="w-16 h-16 rounded-xl overflow-hidden bg-gradient-to-br from-sky-500/20 to-violet-500/10 flex items-center justify-center border border-white/6">
          {logoSrc ? (
            // keep image contained so large source won't overflow
            <img
              src={logoSrc}
              alt={`${title} logo`}
              className="w-full h-full object-contain"
              loading="lazy"
              width={64}
              height={64}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-lg font-semibold text-white/90">
              {title?.[0]?.toUpperCase() ?? "B"}
            </div>
          )}
        </div>

        {/* Content column */}
        <div className="min-w-0">
          <div className="flex items-start gap-3">
            <div className="min-w-0">
              <h3
                id={brandKey ? `brand-${brandKey}` : undefined}
                className="text-2xl md:text-2xl font-extrabold text-white truncate"
                title={title}
              >
                {title}
              </h3>

              {subtitle && (
                <p className="mt-1 text-sm text-white/70 truncate" title={subtitle}>
                  {subtitle}
                </p>
              )}
            </div>

            {/* country badge */}
            {country && (
              <div className="ml-auto flex-shrink-0">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/6 text-white/90 border border-white/8">
                  {country}
                </span>
              </div>
            )}
          </div>

          <div className="mt-4 flex items-center gap-4">
            <div className="text-sm text-white/80">
              <span className="font-medium text-white">{modelsCount ?? "—"}</span>{" "}
              <span className="text-white/70">models</span>
            </div>

            <button
              onClick={onView}
              className="ml-auto px-4 py-2 rounded-lg bg-gradient-to-r from-sky-400 to-violet-500 text-white text-sm font-semibold shadow-sm hover:opacity-95"
              aria-label={`View products for ${title}`}
            >
              View Products
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

