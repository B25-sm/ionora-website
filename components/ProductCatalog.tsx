import products from '@/data/products';
import ProductCard from '@/components/ProductCard';

export default function ProductCatalog() {
  return (
    <section className="page-wrap section-pad">
      <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-8">All Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}