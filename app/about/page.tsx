import { Metadata } from "next";
import EditorDesk from "@/components/about/EditorDesk";
import BrandPillars from "@/components/about/BrandPillars";
import StatsBar from "@/components/about/StatsBar";
import HeritageStrip from "@/components/about/HeritageStrip";
import ClosingCTA from "@/components/about/ClosingCTA";

export const metadata: Metadata = {
  title: "About IONORA",
  description:
    "IONORA is a curated marketplace connecting global ionizer brands with customers—delivering premium hydration experiences with transparent specs and beautiful design.",
};

export default function AboutPage() {
  return (
    <main className="relative">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-accent pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-14 md:pt-28 md:pb-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.1]">
              <span className="text-white drop-shadow-2xl">
                About IONORA
              </span>
            </h1>
            <p className="mt-4 text-lg md:text-xl text-white drop-shadow-xl">
              Curated excellence in water ionization, design and wellness.
            </p>
          </div>
        </div>
      </section>

      {/* EDITOR DESK */}
      <section className="relative -mt-8 md:-mt-10">
        <div className="mx-auto max-w-7xl px-6">
          <EditorDesk />
        </div>
      </section>

      {/* PILLARS */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
          <BrandPillars />
        </div>
      </section>

      {/* STATS */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-6 pb-10 md:pb-14">
          <StatsBar />
        </div>
      </section>

      {/* HERITAGE */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-6 pb-8 md:pb-12">
          <HeritageStrip />
        </div>
      </section>

      {/* CTA */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-6 pb-20">
          <ClosingCTA />
        </div>
      </section>
    </main>
  );
}