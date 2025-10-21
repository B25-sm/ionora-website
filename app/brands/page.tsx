import BrandShowcase from '@/components/BrandShowcase';

export default function BrandsPage(){
  return (
    <main className="min-h-screen">
      <div className="page-wrap">
        <div className="mb-6">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white">Brands</h1>
          <p className="mt-2 text-white/70">Life Ionizers India, Mediqua India, Medisoul India.</p>
        </div>
        <BrandShowcase />
      </div>
    </main>
  );
}
