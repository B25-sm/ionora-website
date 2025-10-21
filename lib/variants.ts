import type { Product, Variant } from '@/data/schema';

export type VariantColor = "black" | "white";

/**
 * Get the initial variant for a product (black for MSL/Kyron if available, otherwise white)
 */
export function getInitialVariant(productId: string): VariantColor {
  // MSL and Kyron series default to black if available
  if (productId.includes('msl') || productId.includes('kyron')) {
    return "black";
  }
  return "white";
}

/**
 * Check if a product has a specific variant
 */
export function hasVariant(productId: string, variant: VariantColor): boolean {
  // MSL and Kyron series have both black and white variants
  if (productId.includes('msl') || productId.includes('kyron')) {
    return true;
  }
  // Other products typically only have white or single image
  return variant === "white";
}

/**
 * Get the variant image for a product
 */
export function getVariantImage(product: Product, variant: VariantColor): string {
  if (!Array.isArray(product.variants) || product.variants.length === 0) {
    return product.image || '/images/placeholder.png';
  }

  // Find the variant with the matching color
  const matchingVariant = product.variants.find(v => v.color === variant);
  if (matchingVariant?.image) {
    return matchingVariant.image;
  }

  // Fallback to product image or placeholder
  return product.image || '/images/placeholder.png';
}

/**
 * Get unique color variants from a product
 */
export function getUniqueColors(product: Product): Variant[] {
  if (!Array.isArray(product.variants) || product.variants.length === 0) {
    return [];
  }
  
  const map = new Map<string, Variant>();
  product.variants.forEach(v => { 
    if (!map.has(v.color)) map.set(v.color, v); 
  });
  return Array.from(map.values());
}

/**
 * Get the display image for a product based on selected variant
 */
export function getDisplayImage(product: Product, selectedVariant: Variant | null): string {
  if (selectedVariant?.image) return selectedVariant.image;
  return product.image || '/images/placeholder.png';
}

/**
 * Check if a product has color variants
 */
export function hasColorVariants(product: Product): boolean {
  return Array.isArray(product.variants) && product.variants.length > 0;
}
