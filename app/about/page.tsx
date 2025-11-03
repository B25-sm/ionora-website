import { Metadata } from "next";
import EditorDesk from "@/components/about/EditorDesk";
import BrandPillars from "@/components/about/BrandPillars";
import StatsBar from "@/components/about/StatsBar";
import HeritageStrip from "@/components/about/HeritageStrip";
import ClosingCTA from "@/components/about/ClosingCTA";
import CertificatesShowcase from "@/components/CertificatesShowcase";

export const metadata: Metadata = {
  title: "About IONORA",
  description:
    "Ionora International Private Limited transforms water into life-enhancing energy through trusted alkaline water ionizers from Life Ionizers™, Mediqua™ and Medisoul™.",
};

export default function AboutPage() {
  return (
    <main className="relative min-h-screen">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-[#0A0F2C]">
        <div className="relative mx-auto max-w-7xl px-6 pt-24 pb-20 md:pt-32 md:pb-28">
          <div className="max-w-4xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EBEBEB] border border-[#EBEBEB] mb-8">
              <div className="w-2 h-2 bg-[#0A0F2C] rounded-full" />
              <span className="text-sm font-medium text-[#0A0F2C] tracking-wide">
                THE ELITE MARKETPLACE
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9] mb-6">
              <span className="text-white">
                About IONORA
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-[#E5E5E5] leading-relaxed max-w-2xl mb-8">
              Trusted alkaline water ionizers from Life Ionizers™, Mediqua™ and Medisoul™.
            </p>

            {/* Scroll Indicator */}
            <div className="flex items-center gap-3 text-[#E5E5E5] text-sm font-medium">
              <div className="w-6 h-10 border-2 border-[#E5E5E5] rounded-full flex justify-center">
                <div className="w-1 h-3 bg-[#EBEBEB] rounded-full mt-2 animate-bounce" />
              </div>
              <span>Scroll to explore</span>
            </div>
          </div>
        </div>
      </section>

      {/* EDITOR DESK */}
      <section className="relative -mt-16 md:-mt-20">
        <div className="mx-auto max-w-7xl px-6">
          <EditorDesk />
        </div>
      </section>

      {/* PILLARS */}
      <section className="relative py-20 md:py-28 bg-gradient-to-b from-[#E5E5E5]/5 to-transparent">
        <div className="mx-auto max-w-7xl px-6">
          <BrandPillars />
        </div>
      </section>

      {/* STATS */}
      <section className="relative py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <StatsBar />
        </div>
      </section>

      {/* HERITAGE */}
      <section className="relative py-16 md:py-20 bg-gradient-to-b from-transparent to-[#E5E5E5]/5">
        <div className="mx-auto max-w-7xl px-6">
          <HeritageStrip />
        </div>
      </section>

      {/* CERTIFICATES */}
      <section className="relative py-16 md:py-20">
        <CertificatesShowcase />
      </section>

      {/* CTA */}
      <section className="relative py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <ClosingCTA />
        </div>
      </section>
    </main>
  );
}