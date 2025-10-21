import { BRANDS } from '@/data/brands';
import { productsByBrand } from '@/data/products';
import ProductCard from '@/components/ProductCard';

export default async function BrandPage({ params }: { params: Promise<{ brandId: string }> }) {
  const { brandId } = await params;
  const brand = BRANDS.find(b => b.id === brandId as any);
  if (!brand) return <div className="page-wrap section-pad text-white">Brand not found.</div>;
  const items = productsByBrand(brand.id);

  return (
    <section className="page-wrap section-pad">
      <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-8">{brand.name}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-6">
        {items.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}