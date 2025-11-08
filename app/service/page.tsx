import type { Metadata } from 'next'

const pageTitle = 'Service Policy | Ionora International Private Limited'
const pageDescription =
  'Review the comprehensive service policy, installation guidelines, warranty coverage, and customer service commitments offered by Ionora International Private Limited.'

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: 'https://ionora.in/service',
  },
}

export default function ServicePolicyPage() {
  return (
    <div className="bg-bg text-primary">
      <header className="relative overflow-hidden bg-primary/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-16 sm:py-20 md:py-24">
          <p className="text-sm uppercase tracking-[0.35em] text-accent mb-4">Service Policy</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight text-primary">
            Ionora International Private Limited Service Policy
          </h1>
          <div className="mt-6 grid gap-2 text-sm sm:text-base text-primary/70 sm:grid-cols-2">
            <span>Effective Date: 04 August 2025</span>
            <span>Last Updated: 09 November 2025</span>
            <span>Operated by: M/s Ionora International Private Limited</span>
            <span>
              Website:{' '}
              <a href="https://ionora.in" className="text-accent hover:underline">
                https://ionora.in
              </a>
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-12 sm:py-16 md:py-20 space-y-10 sm:space-y-12">
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-primary">1. Overview</h2>
          <p className="text-primary/80 leading-relaxed">
            This website and associated services are operated by M/s Ionora International Private Limited. Throughout the
            site, the terms “we”, “us”, and “our” refer to Ionora. Ionora offers this website, including all information,
            tools, and services available from this site to you, the user, conditioned upon your acceptance of all the
            terms, conditions, policies, and notices stated herein.
          </p>
          <p className="text-primary/80 leading-relaxed">
            By visiting our site and/or purchasing something from us, you engage in our “Service” and agree to be bound by
            these Terms of Service (“Terms”), including additional terms and policies referenced herein and/or available by
            hyperlink. These Terms apply to all users of the website, including but not limited to browsers, customers,
            vendors, merchants, and contributors of content. Please read these Terms carefully before accessing or using
            our website. By accessing or using any part of the website, you agree to be bound by these Terms. If you do not
            agree, please refrain from using the website or our services.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-primary">2. Online Store Terms</h2>
          <p className="text-primary/80 leading-relaxed">
            By agreeing to these Terms, you represent that you are at least the age of majority in your state or province
            of residence, or that you have given consent to any minor dependents using this site. You agree not to use our
            products for any illegal or unauthorized purpose, nor violate any applicable laws. A breach or violation of any
            of these Terms will result in immediate suspension or termination of service.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-primary">3. General Conditions</h2>
          <p className="text-primary/80 leading-relaxed">
            We reserve the right to refuse service to anyone, at any time, for any reason. You understand that your
            non-financial data may be transferred unencrypted over networks and may involve:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-primary/80 leading-relaxed">
            <li>Transmissions across multiple networks; and</li>
            <li>Adaptation to technical requirements of connecting systems.</li>
          </ul>
          <p className="text-primary/80 leading-relaxed">
            Financial information, including credit or debit card details, is always encrypted during transfer. You agree
            not to reproduce, duplicate, copy, sell, or exploit any part of the service or website without express written
            permission from Ionora.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-primary">4. Accuracy, Completeness, and Timeliness of Information</h2>
          <p className="text-primary/80 leading-relaxed">
            We make every effort to provide accurate and updated information. However, we do not guarantee that all content
            on the site is complete, current, or error-free. The materials on this site are for general informational
            purposes and should not be relied upon as the sole basis for making decisions. Ionora reserves the right to
            modify website content at any time without obligation to update previous information.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-primary">5. Modifications to Service and Prices</h2>
          <p className="text-primary/80 leading-relaxed">
            Prices of our products and services are subject to change without notice. We reserve the right to modify,
            suspend, or discontinue any part of our service at any time. Ionora shall not be liable for any modification,
            price change, or discontinuation of any product or service.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-primary">6. Products and Services</h2>
          <p className="text-primary/80 leading-relaxed">
            Certain products or services may be available exclusively online through our website or through authorized
            Ionora partners and distributors. Products are subject to limited quantities and availability. Returns,
            exchanges, and warranties are governed by our Refund &amp; Warranty Policy.
          </p>
          <p className="text-primary/80 leading-relaxed">We reserve the right to:</p>
          <ul className="list-disc pl-6 space-y-2 text-primary/80 leading-relaxed">
            <li>Limit the sale of products or services to specific persons, geographic regions, or jurisdictions.</li>
            <li>Restrict quantities available for purchase.</li>
            <li>Discontinue any product without notice.</li>
          </ul>
          <p className="text-primary/80 leading-relaxed">
            Images of products are for representational purposes only; actual product appearance may vary slightly. We do
            not warrant that product quality or performance will meet all customer expectations beyond the manufacturer’s
            specifications.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-primary">7. Billing, Orders, and Account Information</h2>
          <p className="text-primary/80 leading-relaxed">
            You agree to provide current, complete, and accurate billing, contact, and account details for all purchases
            made with Ionora. We reserve the right to cancel or limit orders that appear irregular, duplicate, or
            fraudulent. If an order is modified or cancelled, we will notify you using the contact information provided at
            the time of order. Ionora may refuse service if billing and shipping details do not match or if information is
            found to be inaccurate or incomplete.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-primary">8. Installation and After-Sales Service</h2>
          <ol className="list-decimal pl-6 space-y-3 text-primary/80 leading-relaxed">
            <li>
              <span className="font-semibold text-primary">Installation –</span> All Ionora and partner-brand products are
              installed by trained and authorized technicians. Customers are responsible for ensuring water and electrical
              supply compatibility at the installation site.
            </li>
            <li>
              <span className="font-semibold text-primary">Maintenance –</span> Regular maintenance and filter replacement
              are essential for product performance. These may be chargeable if not covered under warranty or an active
              service plan.
            </li>
            <li>
              <span className="font-semibold text-primary">Service Response Time –</span> Service requests are usually
              attended within 48–72 business hours, subject to location and technician availability.
            </li>
            <li>
              <span className="font-semibold text-primary">Warranty and Repairs –</span> Warranty covers manufacturing
              defects only. It excludes damage caused by:
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Improper installation or use,</li>
                <li>Unauthorized repairs or alterations,</li>
                <li>Electrical surges, or</li>
                <li>Usage of non-genuine filters or accessories.</li>
              </ul>
              <p className="mt-3 text-primary/80 leading-relaxed">
                For full coverage details, refer to our Warranty &amp; Replacement Policy.
              </p>
            </li>
          </ol>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-primary">9. Communication, Lead, and CRM Consent</h2>
          <p className="text-primary/80 leading-relaxed">
            By submitting your contact details through our website, WhatsApp, email, telecalling, social media channels, or
            partner websites, you consent to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-primary/80 leading-relaxed">
            <li>
              Being contacted by M/s Ionora International Pvt. Ltd., its employees, or authorized representatives through
              call, SMS, WhatsApp, email, or CRM notifications regarding your inquiries, purchases, service, or promotional
              offers.
            </li>
            <li>
              Your data being stored securely in our Customer Relationship Management (CRM) systems for follow-ups, service
              scheduling, or future offers.
            </li>
            <li>
              Receiving updates or reminders regarding demos, maintenance, new launches, or promotions.
            </li>
          </ul>
          <p className="text-primary/80 leading-relaxed">
            You may withdraw your consent at any time by writing to{' '}
            <a href="mailto:info@ionora.in" className="text-accent hover:underline">
              info@ionora.in
            </a>{' '}
            or replying “STOP” to WhatsApp messages.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-primary">10. Third-Party Links and Components</h2>
          <p className="text-primary/80 leading-relaxed">
            Some Ionora products may include parts or accessories sourced from third parties (such as pre-filters, booster
            pumps, or RO membranes). Ionora does not provide warranty or liability for third-party components not
            manufactured by us. Third-party links provided on our website are for convenience only. We are not responsible
            for their accuracy, availability, or content.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-primary">11. Customer Feedback and Submissions</h2>
          <p className="text-primary/80 leading-relaxed">
            You may provide feedback, reviews, or suggestions via our website or social media channels. By doing so, you
            agree that Ionora may use such content for promotional, testimonial, or improvement purposes without
            compensation, unless otherwise agreed in writing. You warrant that your submissions do not violate any
            intellectual property or privacy rights of others.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-primary">12. Prohibited Uses</h2>
          <p className="text-primary/80 leading-relaxed">You are prohibited from using our site or services for:</p>
          <ul className="list-disc pl-6 space-y-2 text-primary/80 leading-relaxed">
            <li>Unlawful or fraudulent purposes,</li>
            <li>Violating intellectual property rights,</li>
            <li>Uploading malicious code or software,</li>
            <li>Defaming or harassing any person or organization, or</li>
            <li>Circumventing website security or access controls.</li>
          </ul>
          <p className="text-primary/80 leading-relaxed">
            Violation of these conditions may lead to suspension of service or legal action.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-primary">13. Disclaimer of Warranties and Limitation of Liability</h2>
          <p className="text-primary/80 leading-relaxed">
            All products and services provided by Ionora are offered “as is” and “as available.” We do not warrant that:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-primary/80 leading-relaxed">
            <li>Our website or service will operate without interruptions or errors, or</li>
            <li>All information provided is free from inaccuracies.</li>
          </ul>
          <p className="text-primary/80 leading-relaxed">
            In no event shall M/s Ionora International Pvt. Ltd., its directors, employees, affiliates, or service
            partners be liable for any direct, indirect, incidental, or consequential damages, including but not limited to
            loss of data, profit, or goodwill, arising from:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-primary/80 leading-relaxed">
            <li>Product misuse or failure to follow installation guidelines,</li>
            <li>Delayed service due to uncontrollable circumstances, or</li>
            <li>Unauthorized product modifications.</li>
          </ul>
          <p className="text-primary/80 leading-relaxed">
            Liability, if any, shall not exceed the product’s purchase value.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-primary">14. Indemnification</h2>
          <p className="text-primary/80 leading-relaxed">
            You agree to indemnify, defend, and hold harmless M/s Ionora International Pvt. Ltd., its affiliates,
            officers, employees, agents, and partners from any claim or demand, including reasonable legal fees, arising
            from your breach of these Terms or violation of any law or third-party rights.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-primary">15. Severability</h2>
          <p className="text-primary/80 leading-relaxed">
            If any clause or portion of these Terms is deemed invalid or unenforceable under applicable law, the remaining
            portions shall remain in full force and effect.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-primary">16. Termination</h2>
          <p className="text-primary/80 leading-relaxed">
            Ionora reserves the right to terminate or suspend access to its website or services without prior notice in
            case of violation of these Terms. All obligations, including payments or indemnities accrued prior to
            termination, shall survive such termination.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-primary">17. Entire Agreement</h2>
          <p className="text-primary/80 leading-relaxed">
            These Terms constitute the entire agreement between you and M/s Ionora International Pvt. Ltd., superseding
            all prior communications or agreements, written or oral, relating to the subject matter herein.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-primary">18. Governing Law and Jurisdiction</h2>
          <p className="text-primary/80 leading-relaxed">
            These Terms and all related transactions shall be governed by and construed in accordance with the laws of
            India. Any disputes shall be subject to the exclusive jurisdiction of the courts in [Insert City, e.g.,
            Bengaluru, Karnataka].
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-primary">19. Changes to the Service Policy</h2>
          <p className="text-primary/80 leading-relaxed">
            We reserve the right to update, change, or replace any part of this Service Policy at any time. Updates will
            be posted on this page, and continued use of our website or services will constitute acceptance of such
            changes.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-primary">20. Contact Information</h2>
          <p className="text-primary/80 leading-relaxed">
            For questions, service requests, or clarifications about these Terms, please contact:
          </p>
          <div className="space-y-2 text-primary/80 leading-relaxed">
            <p>M/s Ionora International Private Limited</p>
            <p>
              Email:{' '}
              <a href="mailto:info@ionora.in" className="text-accent hover:underline">
                info@ionora.in
              </a>
            </p>
            <p>Phone: [Insert Official Service Number]</p>
            <p>Website: https://ionora.in</p>
            <p>Registered Office: [Insert Full Address]</p>
          </div>
        </section>

        <section className="space-y-4 rounded-xl border border-primary/10 bg-primary/5 p-6 sm:p-8">
          <h2 className="text-2xl font-semibold text-primary flex items-center gap-3">
            <span role="img" aria-label="check">
              ✅
            </span>
            Optional Add-on: Customer Service Commitment
          </h2>
          <p className="text-primary/80 leading-relaxed">
            At Ionora, we are dedicated to ensuring our customers receive world-class service and complete satisfaction.
            Our certified service engineers and support team work to maintain your water ionizer’s performance and provide
            healthy, alkaline water that supports your family’s wellness.
          </p>
        </section>
      </main>
    </div>
  )
}

