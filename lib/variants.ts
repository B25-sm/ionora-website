import type { Product } from '@/data/products';
import type { Variant } from '@/data/schema';

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
  // Since products don't have variants, just return the product image
  return product.image || '/images/placeholder.png';
}

/**
 * Get unique color variants from a product
 */
export function getUniqueColors(product: Product): Variant[] {
  // Since products don't have variants, return empty array
  return [];
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
  // Since products don't have variants, return false
  return false;
}
