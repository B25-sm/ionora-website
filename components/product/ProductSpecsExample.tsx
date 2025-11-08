/*
EXAMPLE: How to render ProductSpecs in product detail page (app/products/[brand]/[slug]/page.tsx)

import { notFound } from "next/navigation";
import { loadBrandData } from "@/lib/products/dataLoader";
import ProductSpecs from "@/components/product/ProductSpecs";

export default async function ProductDetail({ params }: { params: { brand: string; slug: string }}) {
  const brand = params.brand; // 'life'|'mediqua'|'medisoul'|'kyron'|'tycoon'
  const data = await loadBrandData(brand);
  if (!data) return notFound();

  // find model; kyron uses copyFrom; simple resolution:
  const model = (data.models || []).find((m: any) => m.slug === params.slug);
  if (!model) return notFound();

  // if model has copyFrom (kyron), you can resolve it by loading medisoul data
  // for simplicity editors can copy medisoul models into kyron.json or use a small resolver.

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <ProductSpecs model={model} />
      {/* add gallery / specs table / downloads below */}
    </main>
  );
}

USAGE EXAMPLES:

1. For Life Ionizers:
   - URL: /products/life/mxl-9
   - Will load data/products/life.json and find model with slug "mxl-9"

2. For Mediqua:
   - URL: /products/mediqua/ak-9000
   - Will load data/products/mediqua.json and find model with slug "ak-9000"

3. For Medisoul:
   - URL: /products/medisoul/msl-11
   - Will load data/products/medisoul.json and find model with slug "msl-11"

4. For Kyron:
   - URL: /products/kyron/kyron-9
   - Will load data/products/kyron.json and find model with slug "kyron-9"

5. For Tycoon:
   - URL: /products/tycoon/tycoon-60
   - Will load data/products/tycoon.json and find model with slug "tycoon-60"

COMPONENT FEATURES:
- Responsive two-column layout for specifications
- Modern 2026 UI patterns with clear headings
- Subtle icons and badges
- WhatsApp integration for customer contact
- Copy product ID functionality for content editors
- Clean typography with proper contrast ratios
- Mobile-first responsive design
- Gradient CTA buttons with hover effects
- Glassmorphism design elements

STYLING NOTES:
- Uses Tailwind CSS classes
- Follows the color palette: Primary #0A0F2C (Midnight Blue), Accent #FFD100 (Warm Gold), Support #E5E5E5 (Soft Light Gray)
- Responsive breakpoints: mobile-first approach
- Modern glassmorphism effects with backdrop blur
- Proper accessibility with ARIA labels
*/

