'use client';

import { useState, useEffect } from 'react';
import type { Product } from '@/data/products';

const COMPARISON_KEY = 'ionora-comparison';

export function useComparison() {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(COMPARISON_KEY);
    if (stored) {
      try {
        JSON.parse(stored);
        // You would need to fetch products by IDs here. For now, we clear the list to avoid stale data.
        setSelectedProducts([]);
      } catch (error) {
        console.error('Failed to load comparison from localStorage:', error);
      }
    }
  }, []);

  // Save to localStorage whenever selectedProducts changes
  useEffect(() => {
    const productIds = selectedProducts.map(p => p.id);
    localStorage.setItem(COMPARISON_KEY, JSON.stringify(productIds));
  }, [selectedProducts]);

  const addProduct = (product: Product) => {
    if (selectedProducts.length < 3 && !selectedProducts.find(p => p.id === product.id)) {
      setSelectedProducts(prev => [...prev, product]);
      return true;
    }
    return false;
  };

  const removeProduct = (productId: string) => {
    setSelectedProducts(prev => prev.filter(p => p.id !== productId));
  };

  const clearAll = () => {
    setSelectedProducts([]);
  };

  const isComparing = (productId: string) => {
    return selectedProducts.some(p => p.id === productId);
  };

  const canAddMore = selectedProducts.length < 3;

  return {
    selectedProducts,
    addProduct,
    removeProduct,
    clearAll,
    isComparing,
    canAddMore,
    count: selectedProducts.length
  };
}
