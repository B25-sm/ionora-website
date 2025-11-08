import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms & Conditions | IONORA',
  description:
    'Review the terms and conditions that govern your use of IONORA and the premium water ionizer solutions we provide.',
}

const sections = [
  {
    title: '1. Acceptance of Terms',
    points: [
      'By accessing or using the IONORA website, you agree to comply with and be bound by these Terms & Conditions.',
      'If you do not agree with any part of these terms, you should discontinue use of the website immediately.',
    ],
  },
  {
    title: '2. Products & Services',
    points: [
      'All product imagery, specifications, and pricing are provided for guidance and may change without prior notice.',
      'Product availability is subject to regional regulations and distributor inventory.',
    ],
  },
  {
    title: '3. Intellectual Property',
    points: [
      'All content, branding, and creative assets are the property of IONORA INTERNATIONAL PRIVATE LIMITED or its licensors.',
      'You may not reproduce, distribute, or modify any material without explicit written permission.',
    ],
  },
  {
    title: '4. User Responsibilities',
    points: [
      'You agree to provide accurate information when submitting enquiries or service requests.',
      'You are responsible for maintaining the confidentiality of any account credentials used on this platform.',
    ],
  },
  {
    title: '5. Limitation of Liability',
    points: [
      'IONORA shall not be liable for indirect, incidental, or consequential damages arising from the use of this website or products.',
      'Water quality outcomes depend on installation, maintenance, and local water conditions.',
    ],
  },
  {
    title: '6. Service & Warranty',
    points: [
      'Warranty and replacement coverage are detailed in our dedicated policy pages and may vary by product line.',
      'Service turnaround times depend on location, spare part availability, and authorized service partner schedules.',
    ],
  },
  {
    title: '7. Updates to These Terms',
    points: [
      'We may update these Terms & Conditions periodically to reflect business, legal, or regulatory changes.',
      'Continued use of the website after changes signifies your acceptance of the updated terms.',
    ],
  },
  {
    title: '8. Contact',
    points: [
      'For questions regarding these Terms & Conditions, write to info@ionora.in or contact our customer success team via the Service page.',
    ],
  },
]

export default function TermsPage() {
  return (
    <div className="bg-bg text-primary min-h-screen pb-20">
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0F2C] via-[#0d153f] to-[#0A0F2C] opacity-90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,209,0,0.22)_0%,rgba(10,15,44,0)_55%)]" />
        <div className="relative max-w-6xl mx-auto px-6 sm:px-10 md:px-12 lg:px-16 py-24 sm:py-28 md:py-32 text-white">
          <span className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.3em] font-semibold text-[#FFD100]">
            Terms & Conditions
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
            Guiding Principles for a Trusted Marketplace
          </h1>
          <p className="mt-6 max-w-2xl text-base sm:text-lg text-white/70">
            These terms outline how you can engage with IONORA, ensuring transparency, safety, and confidence
            when exploring premium water ionizers engineered for modern wellness needs.
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 -mt-12">
        <div className="rounded-3xl bg-white shadow-xl shadow-[#0A0F2C]/5 border border-[#0A0F2C]/10 overflow-hidden">
          <div className="p-6 sm:p-8 md:p-10 lg:p-12 space-y-10">
            {sections.map((section) => (
              <section key={section.title} className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-semibold text-[#0A0F2C]">{section.title}</h2>
                <ul className="space-y-3 text-base sm:text-lg text-primary/80 leading-relaxed">
                  {section.points.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-[#FFD100]" aria-hidden />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>

        <aside className="mt-12 rounded-2xl border border-[#FFD100]/40 bg-[#FFD100]/10 backdrop-blur-sm px-6 sm:px-8 py-8 sm:py-10">
          <h3 className="text-xl sm:text-2xl font-semibold text-[#0A0F2C]">Need tailored guidance?</h3>
          <p className="mt-3 text-primary/70 text-base sm:text-lg">
            Our specialists can help you match the right ionizer to your water profile, installation constraints,
            and hydration goals. Reach out via the Service page or WhatsApp assistant for immediate support.
          </p>
        </aside>
      </main>
    </div>
  )
}

