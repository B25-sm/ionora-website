"use client";

import React from "react";
import { HAS_WHATSAPP_NUMBER, WHATSAPP_URL } from "@/lib/contact";

type Model = {
  slug: string;
  title: string;
  subtitle?: string;
  summary?: string;
  features: Record<string, string | string[]>;
};

export default function ProductSpecs({ model }: { model: Model }) {
  const leftKeys = [
    "Installation",
    "Plates",
    "Power",
    "Membrane",
    "pH Range",
    "Max ORP",
    "Drinkable ORP at 9.5 pH",
  ];
  const rightKeys = [
    "Warranty",
    "Filters",
    "Auto Clean",
    "Colors",
    "Dimensions",
    "Voltage",
    "Design",
  ];

  return (
    <section className="my-6">
      <div className="bg-white/4 border border-white/8 rounded-2xl p-6 md:p-8">
        <div className="md:flex md:items-start md:justify-between gap-6">
          <div className="md:flex-1">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">
              {model.title}
            </h2>
            {model.subtitle && (
              <p className="text-sm text-white/70 mt-1">{model.subtitle}</p>
            )}
            {model.summary && (
              <p className="text-white/80 mt-4 max-w-3xl leading-relaxed">
                {model.summary}
              </p>
            )}
          </div>

          <div className="mt-4 md:mt-0 w-full md:w-[420px]">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-3">
                {leftKeys.map((k) => {
                  const val = model.features?.[k];
                  if (!val) return null;
                  return (
                    <div key={k} className="text-sm">
                      <div className="text-[13px] text-white/70">{k}</div>
                      <div className="text-white/90 font-medium">{Array.isArray(val) ? val.join(", ") : val}</div>
                    </div>
                  );
                })}
              </div>
              <div className="space-y-3">
                {rightKeys.map((k) => {
                  const val = model.features?.[k];
                  if (!val) return null;
                  return (
                    <div key={k} className="text-sm">
                      <div className="text-[13px] text-white/70">{k}</div>
                      <div className="text-white/90 font-medium">{Array.isArray(val) ? val.join(", ") : val}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* CTA area */}
        <div className="mt-6 flex gap-3 flex-wrap">
          <a
            href="/products"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-sky-400 to-violet-500 text-white font-semibold shadow"
          >
            Explore Products
          </a>

          {HAS_WHATSAPP_NUMBER && (
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/15 text-white/90 bg-white/5"
              aria-label="Chat on WhatsApp"
            >
              Chat on WhatsApp
            </a>
          )}

          <button
            type="button"
            className="ml-auto rounded-lg px-3 py-2 border border-white/10 text-white/90 bg-white/3"
            onClick={() => {
              // small UX: copy slug to clipboard for content editors
              navigator.clipboard?.writeText(model.slug);
              // show a non-blocking toast if you have one (not required)
            }}
            title="Copy product id"
          >
            Copy product id
          </button>
        </div>
      </div>
    </section>
  );
}

