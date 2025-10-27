'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const link = (href: string) =>
    `px-4 py-3 text-primary hover:text-bg hover:bg-primary/10 transition rounded-lg ${
      pathname === href ? 'text-bg font-medium bg-primary/10' : ''
    }`;

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-bg shadow-lg">
      {/* Top accent bar */}
      <div className="h-1 bg-primary"></div>
      
      {/* Main navigation */}
      <div className="bg-bg border-b border-primary/20">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="relative flex items-center justify-center">
            {/* Center - Logo */}
            <Link
              href="/"
              aria-label="IONORA"
              className="flex items-center justify-center"
            >
            <Image
              src="/images/ionora-logo.png"
              alt="IONORA"
              width={200}
              height={60}
              className="h-12 w-auto"
              priority
            />
            </Link>

            {/* Right side - Menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="absolute right-0 p-3 text-primary hover:text-bg hover:bg-primary/10 transition rounded-lg"
              aria-label="Open menu"
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </nav>

          {/* Dropdown menu */}
          {menuOpen && (
            <div className="absolute right-4 top-full mt-2 w-64 bg-bg rounded-lg shadow-xl border border-primary/20 py-2 z-50">
              <div className="flex flex-col">
                <Link 
                  href="/products" 
                  className={link('/products')}
                  onClick={() => setMenuOpen(false)}
                >
                  Products
                </Link>
                <Link 
                  href="/brands" 
                  className={link('/brands')}
                  onClick={() => setMenuOpen(false)}
                >
                  Brands
                </Link>
                <Link 
                  href="/technology" 
                  className={link('/technology')}
                  onClick={() => setMenuOpen(false)}
                >
                  Technology
                </Link>
                <Link 
                  href="/about" 
                  className={link('/about')}
                  onClick={() => setMenuOpen(false)}
                >
                  About
                </Link>
                <div className="border-t border-primary/20 my-2"></div>
                <button className="px-4 py-3 text-primary hover:text-bg hover:bg-primary/10 transition rounded-lg flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5" />
                  Shopping Cart
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}