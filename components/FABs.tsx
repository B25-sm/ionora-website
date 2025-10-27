'use client';

import { useState } from 'react';
import WhatsAppButton from '@/components/common/WhatsAppButton';
import SearchModal from '@/components/SearchModal';

export default function FABs(){
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const openSearch = () => {
    setIsSearchOpen(true);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
  };

  return (
    <>
      <div className="fixed right-4 bottom-[calc(1rem+var(--safe-bottom))] z-[9999] flex flex-col gap-3 md:right-6">
        <WhatsAppButton variant="floating" size="md" />
        <button 
          onClick={openSearch}
          className="rounded-full border border-primary/20 bg-bg w-12 h-12 flex items-center justify-center text-primary hover:bg-primary/10 transition-colors shadow-lg backdrop-blur-sm hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-transparent"
          aria-label="Search products"
          title="Search products (Ctrl+K)"
        >
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </svg>
        </button>
      </div>
      
      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={closeSearch} />
    </>
  );
}
