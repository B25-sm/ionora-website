'use client';

const TESTIMONIALS = [
  { name: "Aarav S.", text: "Installation in 24h and the water tastes amazing. My family loves it.", rating: 5 },
  { name: "Diya M.", text: "Clear pH/ORP info and great support. Highly recommend the MXL series.", rating: 5 },
  { name: "Raghav K.", text: "Best marketplace to compare models quickly. Design is gorgeous.", rating: 5 }
];

export default function Testimonials() {
  return (
    <section className="section-pad">
      <div className="page-wrap">
        <h2 className="text-3xl md:text-5xl font-extrabold text-white">Loved by Customers</h2>
        <p className="mt-3 text-white/70">Trusted by 600,000+ happy users.</p>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {TESTIMONIALS.map(t=>(
            <div key={t.name} className="rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur-xl">
              <div className="text-yellow-400 mb-2">{"★★★★★".slice(0,t.rating)}</div>
              <p className="text-white/90">{t.text}</p>
              <div className="mt-4 text-white/70 text-sm">— {t.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
