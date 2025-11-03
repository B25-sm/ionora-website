import products from '@/data/products';
import ProductCard from '@/components/ProductCard';

export default function ProductCatalog() {
  return (
    <section className="page-wrap section-pad">
      <h2 className="text-responsive-3xl xs:text-responsive-4xl sm:text-responsive-5xl md:text-responsive-6xl lg:text-responsive-7xl xl:text-responsive-8xl font-extrabold text-white mb-6 xs:mb-8 sm:mb-10 md:mb-12 lg:mb-14 xl:mb-16 2xl:mb-18 3xl:mb-20 4xl:mb-24 5xl:mb-28 6xl:mb-32">All Products</h2>
      <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 4xl:grid-cols-7 5xl:grid-cols-8 6xl:grid-cols-10 gap-2 xs:gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-7 2xl:gap-8 3xl:gap-9 4xl:gap-10 5xl:gap-12 6xl:gap-14 items-stretch">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}