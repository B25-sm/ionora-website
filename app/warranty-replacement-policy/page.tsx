import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Warranty & Replacement Policy | IONORA',
  description:
    'Understand the warranty coverage, replacement eligibility, and service commitments for Ionora water ionizers, filters, cartridges, and accessories.',
}

export default function WarrantyReplacementPolicyPage() {
  return (
    <section className="relative py-16 sm:py-20 md:py-24 bg-bg text-primary">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-0">
        <header className="mb-10 sm:mb-12">
          <span className="inline-flex items-center rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-accent">
            Warranty & Replacement Policy
          </span>
          <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-primary">
            Warranty & Replacement Policy
          </h1>
          <div className="mt-4 space-y-2 text-sm sm:text-base text-primary/70">
            <p>Effective Date: 04.08.2025</p>
            <p>Last Updated: 09.11.2025</p>
            <p>
              Operated by: M/s Ionora International Private Limited (&ldquo;Ionora&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;)
            </p>
            <p>
              Website:{' '}
              <Link href="https://ionora.in" className="text-accent hover:text-accent/80 transition">
                https://ionora.in
              </Link>
            </p>
          </div>
          <p className="mt-6 text-base sm:text-lg leading-7 text-primary/80">
            This Warranty & Replacement Policy (&ldquo;Policy&rdquo;) governs all products sold by M/s Ionora International Private
            Limited, including Ionora-branded and partner-brand alkaline water ionizers, filters, cartridges, accessories (&ldquo;Products&rdquo;)
            and other products. It explains the terms under which warranty coverage, repairs, and replacements are provided to customers
            who have purchased directly from Ionora or through its authorized dealers, distributors, or e-commerce partners.
          </p>
        </header>

        <div className="space-y-10 sm:space-y-12">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">1. Purpose and Scope</h2>
            <p className="text-primary/80 leading-7">
              This Policy applies to every Ionora product and partner-brand alkaline water ionizer, filter, cartridge, accessory, and
              related component sold through Ionora or its authorized channels.
            </p>
          </section>

          <section className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-primary">2. Warranty Coverage</h2>
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-primary">a. Standard Warranty</h3>
                <p className="text-primary/80 leading-7">
                  All new Ionora products come with a limited manufacturer’s warranty covering manufacturing defects in material or
                  workmanship under normal domestic use and service conditions.
                </p>
              </div>

              <div className="overflow-hidden rounded-2xl border border-primary/10 bg-support/20 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-4 bg-primary/5 text-sm sm:text-base font-semibold text-primary uppercase tracking-wide">
                  <div className="px-4 py-3 border-b md:border-b-0 md:border-r border-primary/10">Product Category</div>
                  <div className="px-4 py-3 border-b md:border-b-0 md:border-r border-primary/10">Warranty Period</div>
                  <div className="md:col-span-2 px-4 py-3">Coverage Details</div>
                </div>
                <div className="divide-y divide-primary/10 text-sm sm:text-base text-primary/80">
                  <div className="grid grid-cols-1 md:grid-cols-4">
                    <div className="px-4 py-4 font-medium text-primary">Ionora Water Ionizers</div>
                    <div className="px-4 py-4">12 to 36 months (depending on model)</div>
                    <div className="md:col-span-2 px-4 py-4">
                      Covers internal electrical and mechanical components including power supply, electrodes, PCB, display, and body frame.
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4">
                    <div className="px-4 py-4 font-medium text-primary">Filters &amp; Cartridges</div>
                    <div className="px-4 py-4">6 months or as specified by usage life</div>
                    <div className="md:col-span-2 px-4 py-4">Covers defects in materials at the time of delivery. Filter life varies with local water quality.</div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4">
                    <div className="px-4 py-4 font-medium text-primary">Accessories / Pumps / Pre-filters</div>
                    <div className="px-4 py-4">6 months</div>
                    <div className="md:col-span-2 px-4 py-4">Covers manufacturing defects only.</div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4">
                    <div className="px-4 py-4 font-medium text-primary">Commercial Units</div>
                    <div className="px-4 py-4">As per specific agreement</div>
                    <div className="md:col-span-2 px-4 py-4">Subject to separate commercial service contract.</div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-primary">b. Extended Warranty</h3>
                <p className="text-primary/80 leading-7">
                  Ionora may offer optional extended-warranty plans or annual maintenance contracts (AMC) for an additional fee. Extended
                  warranties must be purchased within the original warranty period.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">3. Warranty Terms and Conditions</h2>
            <ol className="list-decimal pl-5 space-y-2 text-primary/80 leading-7">
              <li>Warranty is applicable only to the original purchaser and is non-transferable.</li>
              <li>Products must be purchased from Ionora or its authorized resellers and registered with a valid proof of purchase (invoice).</li>
              <li>
                Installation must be performed by an Ionora-authorized technician. Self-installation or third-party installation voids the
                warranty.
              </li>
              <li>The warranty period begins from the date of purchase or installation, whichever is earlier.</li>
              <li>
                During the warranty period, Ionora will, at its discretion, repair or replace defective components using new or refurbished parts,
                or replace the unit if repairs are not economically feasible.
              </li>
              <li>All replaced parts become the property of Ionora.</li>
              <li>Warranty service is provided on-site in major cities and carry-in in other regions, depending on service coverage.</li>
              <li>Warranty does not include consumables such as filters, membranes, or cartridges whose life depends on local water quality.</li>
            </ol>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">4. Exclusions – Warranty Does Not Cover</h2>
            <ol className="list-decimal pl-5 space-y-2 text-primary/80 leading-7">
              <li>Damage due to improper installation, mishandling, or misuse.</li>
              <li>Damage caused by power fluctuations, voltage surges, lightning, or water pressure variations.</li>
              <li>Product tampering, modification, or repair by unauthorized persons.</li>
              <li>Physical damage, cracks, scratches, dents, or chemical corrosion.</li>
              <li>Usage with non-genuine Ionora filters or accessories.</li>
              <li>Routine maintenance, filter replacement, or cleaning services.</li>
              <li>Issues arising from poor water quality, high TDS, or use of non-recommended pre-filters.</li>
              <li>Damage during transportation or relocation not arranged by Ionora.</li>
              <li>Any software updates or calibration beyond warranty scope.</li>
              <li>Consumables such as filters, cartridges, tubing, and connectors.</li>
            </ol>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">5. Warranty Claim Procedure</h2>
            <ol className="list-decimal pl-5 space-y-3 text-primary/80 leading-7">
              <li>
                Contact Ionora Customer Support via:
                <ul className="mt-2 list-disc pl-6 space-y-1">
                  <li>Email: <Link href="mailto:info@ionora.in" className="text-accent hover:text-accent/80 transition">info@ionora.in</Link></li>
                  <li>Phone: [Insert Service Number]</li>
                  <li>Website Form: <Link href="https://ionora.in" className="text-accent hover:text-accent/80 transition">https://ionora.in</Link></li>
                </ul>
              </li>
              <li>
                Provide:
                <ul className="mt-2 list-disc pl-6 space-y-1">
                  <li>Product model &amp; serial number</li>
                  <li>Date of purchase / invoice copy</li>
                  <li>Description of issue and photos (if applicable)</li>
                </ul>
              </li>
              <li>Ionora’s service team will assess the issue remotely or schedule a technician visit.</li>
              <li>After inspection, Ionora will confirm warranty eligibility and advise next steps.</li>
              <li>
                Service timelines:
                <ul className="mt-2 list-disc pl-6 space-y-1">
                  <li>Metro areas: within 48 working hours</li>
                  <li>Non-metro areas: within 2 working days (subject to spares availability)</li>
                </ul>
              </li>
            </ol>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-primary">6. Replacement Policy</h2>
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-primary">a. Eligibility for Replacement</h3>
              <ul className="list-disc pl-5 space-y-2 text-primary/80 leading-7">
                <li>The product arrives damaged, defective, or non-functional on delivery.</li>
                <li>The issue is reported within 7 days of purchase or installation.</li>
                <li>The product is in original packaging with all accessories, manuals, and invoice.</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-primary">b. Process</h3>
              <ol className="list-decimal pl-5 space-y-2 text-primary/80 leading-7">
                <li>Contact Ionora support with proof of purchase and images/videos of the issue.</li>
                <li>Ionora will arrange inspection or pickup.</li>
                <li>Upon verification, a replacement will be shipped within 7–10 business days.</li>
              </ol>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-primary">c. Exclusions</h3>
              <ul className="list-disc pl-5 space-y-2 text-primary/80 leading-7">
                <li>Products damaged due to incorrect installation or external causes.</li>
                <li>Consumable items (filters, cartridges, etc.) once opened or used.</li>
                <li>Products beyond the initial 7-day period.</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">7. Service and Transport Charges</h2>
            <ul className="list-disc pl-5 space-y-2 text-primary/80 leading-7">
              <li>Within warranty: Repair or replacement is free of cost for covered parts and labour. Transportation or visit charges may apply for remote locations.</li>
              <li>Out of warranty: All spares, filters, and service visits are chargeable as per current Ionora rates.</li>
              <li>Customers will receive an official estimate before out-of-warranty work is performed.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">8. Customer Responsibilities</h2>
            <ul className="list-disc pl-5 space-y-2 text-primary/80 leading-7">
              <li>Maintain the product as per Ionora guidelines in the user manual.</li>
              <li>Use genuine Ionora filters and parts only.</li>
              <li>Ensure clean and adequate input water pressure and quality.</li>
              <li>Retain invoice and service records for future claims.</li>
              <li>Allow safe and timely access for technician visits.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">9. Limitation of Liability</h2>
            <p className="text-primary/80 leading-7">
              Ionora’s liability under this warranty is strictly limited to repair or replacement of defective components. Under no circumstances
              shall Ionora be liable for any indirect, incidental, or consequential loss including loss of profit, data, or use. The total liability
              shall not exceed the original purchase price of the product.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">10. Force Majeure</h2>
            <p className="text-primary/80 leading-7">
              Ionora shall not be responsible for delays or failures caused by events beyond its reasonable control, including natural
              disasters, pandemics, strikes, or supply-chain disruptions.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">11. Dispute Resolution</h2>
            <p className="text-primary/80 leading-7">
              Any dispute arising out of or in connection with this policy shall be governed by the laws of India and subject to the exclusive
              jurisdiction of the courts at [Insert City, e.g., Mumbai, Maharashtra, Bengaluru, Karnataka].
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">12. Contact Information</h2>
            <div className="rounded-2xl border border-primary/10 bg-support/40 p-6 text-sm sm:text-base text-primary/80">
              <p className="text-primary font-medium">M/s Ionora International Private Limited</p>
              <ul className="mt-3 space-y-2">
                <li>Email: <Link href="mailto:info@ionora.in" className="text-accent hover:text-accent/80 transition">info@ionora.in</Link></li>
                <li>Phone: [Insert Customer Care Number]</li>
                <li>Website: <Link href="https://ionora.in" className="text-accent hover:text-accent/80 transition">https://ionora.in</Link></li>
                <li>Registered Office: [Insert Full Address – City, State, PIN]</li>
              </ul>
            </div>
          </section>

          <section className="space-y-6">
            <div className="rounded-2xl border border-accent/40 bg-accent/10 p-6">
              <h2 className="text-2xl font-semibold text-primary">✅ Quick Summary</h2>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm sm:text-base text-primary/80">
                <div className="rounded-xl border border-primary/10 bg-white/40 p-4 shadow-sm">
                  <p className="font-semibold text-primary">Type</p>
                  <p className="mt-2">Manufacturing Defects - 5 Years</p>
                  <p className="mt-1 text-primary/70">Full warranty as per model</p>
                </div>
                <div className="rounded-xl border border-primary/10 bg-white/40 p-4 shadow-sm">
                  <p className="font-semibold text-primary">Filters &amp; Plates</p>
                  <p className="mt-2">Warranty on plates - 15 years</p>
                  <p className="mt-1 text-primary/70">Labour service - 3 years (2 visits per year)</p>
                </div>
                <div className="rounded-xl border border-primary/10 bg-white/40 p-4 shadow-sm">
                  <p className="font-semibold text-primary">Replacement Window</p>
                  <p className="mt-2">7 days from delivery</p>
                  <p className="mt-1 text-primary/70">For DOA (Dead on Arrival) units</p>
                </div>
              </div>
              <div className="mt-4 rounded-xl border border-primary/10 bg-white/40 p-4 shadow-sm text-sm sm:text-base text-primary/80">
                <p className="font-semibold text-primary">Extended Warranty</p>
                <p className="mt-2">Optional add-on plans available at additional cost within the original warranty period.</p>
              </div>
            </div>

            <div className="rounded-2xl border border-primary/10 bg-primary/5 p-6">
              <h2 className="text-2xl font-semibold text-primary">💧 Our Commitment</h2>
              <p className="mt-3 text-primary/80 leading-7">
                At Ionora, customer satisfaction and long-term service reliability are our highest priorities. Every Ionora product is
                engineered to meet premium quality standards, and our nationwide support team ensures professional service and genuine
                replacement parts for years of healthy, alkaline hydration.
              </p>
            </div>
          </section>
        </div>
      </div>
    </section>
  )
}


