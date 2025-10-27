'use client';
import { useEffect, useState } from 'react';
import products from '@/data/products';

interface SearchModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps){
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Use external control if provided, otherwise use internal state
  const isModalOpen = isOpen !== undefined ? isOpen : open;
  const closeModal = onClose || (() => setOpen(false));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { 
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { 
        e.preventDefault(); 
        if (isOpen === undefined) setOpen(true);
      }
      if (e.key === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', onKey); 
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, closeModal]);

  if (!isModalOpen) return null;

  // Filter products based on search query
  const filteredProducts = searchQuery 
    ? products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products.slice(0, 5);

  return (
    <div 
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm" 
      onClick={closeModal}
    >
      <div 
        className="mx-auto mt-24 w-full max-w-2xl rounded-2xl border border-primary/20 bg-bg p-4 shadow-xl" 
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 mb-4">
          <svg className="w-5 h-5 text-primary/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            autoFocus 
            placeholder="Search products, brands, or features..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-primary/20 bg-bg px-4 py-3 text-primary placeholder-primary/50 focus:outline-none focus:ring-2 focus:ring-accent" 
          />
          <button 
            onClick={closeModal}
            className="rounded-lg p-2 text-primary/60 hover:text-primary hover:bg-primary/10 transition-colors"
            aria-label="Close search"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="mt-3 max-h-64 overflow-auto">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(p => (
              <div 
                key={p.id} 
                className="rounded-lg border border-primary/20 bg-primary/10 px-3 py-2 text-primary hover:bg-primary/20 transition-colors cursor-pointer"
                onClick={() => {
                  // Navigate to product page
                  window.location.href = `/products/${p.id}`;
                }}
              >
                <div className="font-medium">{p.name}</div>
                <div className="text-sm text-primary/70">{p.brand}</div>
              </div>
            ))
          ) : searchQuery ? (
            <div className="rounded-lg border border-primary/20 bg-primary/10 px-3 py-2 text-primary/70 text-center">
              No products found for "{searchQuery}"
            </div>
          ) : (
            <div className="rounded-lg border border-primary/20 bg-primary/10 px-3 py-2 text-primary/70 text-center">
              Start typing to search products...
            </div>
          )}
        </div>
        
        <div className="mt-3 text-xs text-primary/50 text-center">
          Press <kbd className="px-1 py-0.5 bg-primary/20 rounded">Ctrl+K</kbd> to open search
        </div>
      </div>
    </div>
  );
}
