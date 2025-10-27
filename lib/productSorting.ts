/**
 * Utility functions for sorting products by version number
 */

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  [key: string]: any;
}

/**
 * Extracts version number from product name
 * Handles patterns like:
 * - "LIFE WATER IONIZER MXL-11" -> 11
 * - "Mediqua AK - 2000" -> 2000
 * - "MSL-15" -> 15
 * - "Tycoon-90" -> 90
 */
export function extractVersionNumber(productName: string): number {
  // Try to find version numbers in various patterns
  const patterns = [
    // Pattern: MXL-11, MSL-15, etc.
    /-(\d+)(?:\s|$)/,
    // Pattern: AK - 2000, etc.
    /\s-\s(\d+)(?:\s|$)/,
    // Pattern: Tycoon-90, etc.
    /-(\d+)$/,
    // Pattern: any number at the end
    /(\d+)$/,
    // Pattern: any number in the name
    /(\d+)/
  ];

  for (const pattern of patterns) {
    const match = productName.match(pattern);
    if (match) {
      return parseInt(match[1], 10);
    }
  }

  // If no version number found, return 0 (will be sorted last)
  return 0;
}

/**
 * Sorts products by version number in descending order (highest first)
 */
export function sortProductsByVersion(products: Product[]): Product[] {
  return [...products].sort((a, b) => {
    const versionA = extractVersionNumber(a.name);
    const versionB = extractVersionNumber(b.name);
    
    // Sort in descending order (highest version first)
    return versionB - versionA;
  });
}

/**
 * Sorts products by multiple criteria:
 * 1. Version number (descending)
 * 2. Brand name (ascending)
 * 3. Product name (ascending)
 */
export function sortProductsByVersionAndBrand(products: Product[]): Product[] {
  return [...products].sort((a, b) => {
    const versionA = extractVersionNumber(a.name);
    const versionB = extractVersionNumber(b.name);
    
    // First sort by version (descending)
    if (versionA !== versionB) {
      return versionB - versionA;
    }
    
    // Then by brand (ascending)
    const brandComparison = a.brand.localeCompare(b.brand);
    if (brandComparison !== 0) {
      return brandComparison;
    }
    
    // Finally by product name (ascending)
    return a.name.localeCompare(b.name);
  });
}
