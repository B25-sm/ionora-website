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
      <section className="relative py-20 md:py-28 bg-[#0A0F2C]">
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

      {/* TEAM */}
      <section className="relative py-20 md:py-28 bg-[#F7F7F8] text-[#0A0F2C]">
        <div className="mx-auto max-w-5xl px-6 space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">
              Meet Our Team
            </h2>
            <p className="text-lg md:text-xl leading-relaxed">
              At IONORA INTERNATIONAL PRIVATE LIMITED, our strength lies in our
              team. Our team is a blend of highly qualified professionals,
              industry experts, and dedicated support specialists who work
              together with one mission: to deliver smart, reliable, and
              seamless solutions to our customers. We are more than just a
              company — we are a team of people who truly care about health,
              wellness, and the quality of water people drink every day.
            </p>
            <p className="text-lg md:text-xl leading-relaxed">
              Our team consists of highly trained professionals, product
              specialists, and dedicated service experts who understand alkaline
              ionized water technology deeply. We guide our customers with
              clarity and honesty, helping them choose the right water ionizer
              for their home, family, and lifestyle.
            </p>
            <p className="text-lg md:text-xl leading-relaxed">
              We don’t just sell a product — we help you adopt a healthier way
              of living.
            </p>
            <p className="text-lg md:text-xl leading-relaxed">
              We’re proud to offer One-Touch Service within a day through our
              mobile app — our support is always with you. Whether it’s
              installation, guidance, maintenance, or after-sales service, our
              team responds quickly and with genuine care.
            </p>
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-semibold">
              We stand for:
            </h3>
            <ul className="list-disc list-inside text-lg md:text-xl leading-relaxed space-y-2">
              <li>Transparency in information</li>
              <li>Quality in products</li>
              <li>Commitment in service</li>
              <li>Long-term trust with every customer</li>
            </ul>
          </div>
          <div className="space-y-4">
            <p className="text-lg md:text-xl leading-relaxed">
              Every day, we come together with one purpose: to make healthy,
              alkaline, hydrogen-rich drinking water easily accessible to every
              home.
            </p>
            <p className="text-lg md:text-xl leading-relaxed">
              Welcome to Ionora.
            </p>
            <p className="text-lg md:text-xl leading-relaxed">
              Where knowledge meets care.
              <br />
              Where technology meets wellness.
            </p>
          </div>
        </div>
      </section>

      {/* HERITAGE */}
      <section className="relative py-16 md:py-20 bg-[#0A0F2C]">
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