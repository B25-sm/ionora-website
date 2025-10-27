import { BRANDS } from '@/data/brands';
import { productsByBrand } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import Image from 'next/image';

export default async function BrandPage({ params }: { params: Promise<{ brandId: string }> }) {
  const { brandId } = await params;
  const brand = BRANDS.find(b => b.id === brandId as any);
  if (!brand) return <div className="page-wrap section-pad text-white">Brand not found.</div>;
  const items = productsByBrand(brand.id);

  return (
    <section className="page-wrap section-pad">
      {/* Brand Header */}
      <div className="mb-12">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Brand Image */}
          {brand.mainImage && (
            <div className="relative w-full md:w-1/3 aspect-square rounded-2xl overflow-hidden bg-white/5 border border-white/10">
              <Image
                src={brand.mainImage}
                alt={`${brand.name} product`}
                fill
                className="object-contain p-6"
              />
            </div>
          )}
          
          {/* Brand Info */}
          <div className="flex-1 space-y-6">
            <div>
              <div className="inline-block px-4 py-2 rounded-full bg-[#FFD100] text-[#0A0F2C] text-sm font-bold mb-3">
                {brand.country}
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-3">{brand.name}</h1>
              <p className="text-xl text-[#E5E5E5] mb-6">{brand.tagline}</p>
            </div>

            {/* Description */}
            {brand.description && (
              <div className="prose prose-invert max-w-none">
                <p className="text-[#E5E5E5] leading-relaxed text-lg">
                  {brand.description}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Vision */}
        {brand.vision && (
          <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-[#FFD100]/10 to-transparent border border-[#FFD100]/20">
            <h2 className="text-2xl font-bold text-white mb-3">Vision</h2>
            <p className="text-[#E5E5E5] leading-relaxed">{brand.vision}</p>
          </div>
        )}

        {/* Mission */}
        {brand.mission && brand.mission.length > 0 && (
          <div className="mt-6 p-6 rounded-2xl bg-white/5 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4">Mission</h2>
            <ul className="space-y-3">
              {brand.mission.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-[#FFD100] font-bold mt-1">•</span>
                  <span className="text-[#E5E5E5] leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Certifications */}
        {brand.certifications && (
          <div className="mt-6 p-6 rounded-2xl bg-white/5 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-3">Certifications</h2>
            <p className="text-[#E5E5E5]">{brand.certifications}</p>
          </div>
        )}
      </div>

      {/* Products Section */}
      <div className="mt-12">
        <h2 className="text-3xl font-bold text-white mb-8">Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-6">
          {items.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}