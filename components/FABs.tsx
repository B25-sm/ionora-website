'use client';

import { useCallback } from 'react';
import WhatsAppButton from '@/components/common/WhatsAppButton';

const isBrowser = () => typeof window !== 'undefined';

export default function FABs(){
  const openCallbackModal = useCallback(() => {
    if (!isBrowser()) return;

    window.dispatchEvent(
      new CustomEvent('callback:open', {
        detail: { source: 'floating-action' },
      }),
    );
  }, []);

  return (
    <div className="fixed right-4 bottom-[calc(1rem+var(--safe-bottom))] z-[9999] flex flex-col gap-3 md:right-6">
      <WhatsAppButton variant="floating" size="md" />
      <button 
        onClick={openCallbackModal}
        className="group relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-primary/30 bg-gradient-to-br from-primary-500 via-primary-400 to-primary-600 text-white shadow-2xl backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:from-primary-400 hover:via-primary-500 hover:to-primary-600 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-transparent active:scale-95 md:h-14 md:w-14"
        aria-label="Request a callback"
        title="Request a callback"
        type="button"
      >
        <span className="absolute inset-0 -translate-y-full bg-white/25 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100" />
        <svg 
          className="relative z-10 h-6 w-6 md:h-7 md:w-7" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth={1.8}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round"
            d="M2 5.5C2 4.12 3.12 3 4.5 3h2.16c.96 0 1.79.67 1.97 1.61l.44 2.19c.12.6-.06 1.23-.5 1.66l-1.08 1.08a14.5 14.5 0 006.03 6.03l1.08-1.08c.43-.44 1.06-.62 1.66-.5l2.19.44A2 2 0 0121 18.34V20.5c0 1.38-1.12 2.5-2.5 2.5C9.94 23 2 15.06 2 5.5z"
          />
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M15 5c0-1.66 1.34-3 3-3"
          />
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M15 8c0-3 2.5-5.5 5.5-5.5"
          />
        </svg>
      </button>
      <span className="pointer-events-none select-none text-xs font-semibold uppercase tracking-wide text-white/75 drop-shadow md:text-sm">
        Callback
      </span>
    </div>
  );
}
