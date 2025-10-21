import HeroSection from '@/components/HeroSection'
import BrandShowcase from '@/components/BrandShowcase'
import BrandRow from '@/components/home/BrandRow'
import TechCompact from '@/components/home/TechCompact'
import ComparisonTool from '@/components/ComparisonTool'
import Testimonials from '@/components/Testimonials'
import MythsFacts from '@/components/MythsFacts'
import products from '@/data/products'
import { BRANDS } from '@/data/brands'

export default function Home() {
  // Get products by brand
  const lifeProducts = products.filter(p => p.brand === 'life')
  const mediquaProducts = products.filter(p => p.brand === 'mediqua')
  const medisoulProducts = products.filter(p => p.brand === 'medisoul')

  return (
    <>
      <HeroSection />
      <div className="page-wrap">
        {/* Premium Brands Section */}
        <section className="relative z-0 py-14 md:py-20">
          <BrandShowcase />
        </section>
        
        {/* Featured Products by Brand - Detailed View */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-4">
                Featured by Brand
              </h2>
              <p className="text-white/70 text-lg max-w-2xl mx-auto">
                Discover our premium water ionizer collections from leading manufacturers
              </p>
            </div>

            <div className="space-y-20">
              <BrandRow
                brandId="life-ionizers-india"
                title="Life Ionizers India"
                products={lifeProducts}
                ctaHref="/products?brand=life-ionizers-india#brand-life-ionizers"
                maxProducts={4}
              />
              
              <BrandRow
                brandId="mediqua-india"
                title="Mediqua India"
                products={mediquaProducts}
                ctaHref="/products?brand=mediqua-india#brand-mediqua"
                maxProducts={4}
              />
              
              <BrandRow
                brandId="medisoul-india"
                title="Medisoul India"
                products={medisoulProducts}
                ctaHref="/products?brand=medisoul-india#brand-medisoul"
                maxProducts={4}
              />
            </div>
          </div>
        </section>

        {/* Compact Technology Section */}
        <TechCompact />
        
        <ComparisonTool />
        <Testimonials />
        <MythsFacts />
      </div>
    </>
  )
}