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
  if (product.variants) {
    const colorMatch = product.variants.find((v) => v.color === variant);
    if (colorMatch?.image) {
      return colorMatch.image;
    }
  }

  return product.image || '/images/placeholder.png';
}

/**
 * Get unique color variants from a product
 */
export function getUniqueColors(product: Product): Variant[] {
  if (product.variants && product.variants.length > 0) {
    return product.variants;
  }

  if (product.colorOptions) {
    const rawColors = Array.isArray(product.colorOptions)
      ? product.colorOptions
      : product.colorOptions.split(/[,\/]/);
    const normalized = Array.from(
      new Set(
        rawColors
          .map((color) => color.trim().toLowerCase())
          .filter(Boolean)
      )
    );

    return normalized.map((color) => ({
      color: color.includes('black') ? 'black' : 'white',
      image: product.image || '/images/placeholder.png',
    }));
  }

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
  if (product.variants && product.variants.length > 0) {
    return true;
  }

  if (product.colorOptions) {
    const rawColors = Array.isArray(product.colorOptions)
      ? product.colorOptions
      : product.colorOptions.split(/[,\/]/);
    return rawColors.filter((color) => color.trim().length > 0).length > 1;
  }

  return false;
}
