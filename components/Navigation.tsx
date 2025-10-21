'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Search, Sun, Moon, ChevronDown } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const pathname = usePathname();

  const link = (href: string) =>
    `px-3 py-2 rounded-lg text-white/80 hover:text-white transition ${
      pathname === href ? 'text-white font-semibold' : ''
    }`;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* nav bar */}
      <div className="page-wrap px-3 md:px-4 py-3 md:py-4">
        <nav className="glass-nav px-3 md:px-6 py-2.5 md:py-3">
          <div className="flex items-center justify-between gap-3">
            {/* LEFT: logo only (no old logo/text removed) */}
            <Link
              href="/"
              aria-label="IONORA – The Elite Market Place"
              className="flex items-center"
            >
              {/* clamp width: 160–240 based on viewport; height follows */}
              <div className="relative h-10 md:h-12" style={{ width: 'clamp(160px, 18vw, 240px)' }}>
                <Image
                  src="/images/ionora-logo.png"
                  alt="IONORA Logo"
                  fill
                  sizes="clamp(160px, 18vw, 240px)"
                  className="object-contain"
                  priority
                />
              </div>
            </Link>

            {/* CENTER: primary nav (desktop) */}
            <div className="hidden lg:flex items-center gap-2">
              <Link href="/" className={link('/')}>Home</Link>
              <Link href="/brands" className={link('/brands')}>Brands</Link>
              
              {/* Products Dropdown */}
              <div className="relative">
                <button
                  onMouseEnter={() => setProductsDropdownOpen(true)}
                  onMouseLeave={() => setProductsDropdownOpen(false)}
                  className="flex items-center gap-1 px-3 py-2 rounded-lg text-white/80 hover:text-white transition"
                >
                  Products
                  <ChevronDown className="h-4 w-4" />
                </button>
                
                {productsDropdownOpen && (
                  <div 
                    className="absolute top-full left-0 mt-2 w-64 bg-white/10 backdrop-blur-xl border border-white/15 rounded-xl shadow-xl z-50"
                    onMouseEnter={() => setProductsDropdownOpen(true)}
                    onMouseLeave={() => setProductsDropdownOpen(false)}
                  >
                    <div className="p-2">
                      <Link 
                        href="/products" 
                        className="block px-4 py-3 rounded-lg text-white/90 hover:bg-white/10 transition"
                        onMouseEnter={() => {
                          // Prefetch /products on hover
                          const link = document.createElement('link');
                          link.rel = 'prefetch';
                          link.href = '/products';
                          document.head.appendChild(link);
                        }}
                      >
                        All Products
                      </Link>
                      <Link 
                        href="/products/compare" 
                        className="block px-4 py-3 rounded-lg text-white/90 hover:bg-white/10 transition"
                      >
                        Compare Products
                      </Link>
                      <div className="border-t border-white/10 my-2"></div>
                      <Link 
                        href="/#brand-life-ionizers" 
                        className="block px-4 py-3 rounded-lg text-white/90 hover:bg-white/10 transition"
                      >
                        Life Ionizers India
                      </Link>
                      <Link 
                        href="/#brand-mediqua" 
                        className="block px-4 py-3 rounded-lg text-white/90 hover:bg-white/10 transition"
                      >
                        Mediqua India
                      </Link>
                      <Link 
                        href="/#brand-medisoul" 
                        className="block px-4 py-3 rounded-lg text-white/90 hover:bg-white/10 transition"
                      >
                        Medisoul India
                      </Link>
                      <div className="border-t border-white/10 my-2"></div>
                      <Link 
                        href="/products?brand=life-ionizers-india" 
                        className="block px-4 py-3 rounded-lg text-white/90 hover:bg-white/10 transition"
                      >
                        Life Ionizers (Products Page)
                      </Link>
                      <Link 
                        href="/products?brand=mediqua-india" 
                        className="block px-4 py-3 rounded-lg text-white/90 hover:bg-white/10 transition"
                      >
                        Mediqua (Products Page)
                      </Link>
                      <Link 
                        href="/products?brand=medisoul-india" 
                        className="block px-4 py-3 rounded-lg text-white/90 hover:bg-white/10 transition"
                      >
                        Medisoul (Products Page)
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              
              <Link href="/technology" className={link('/technology')}>Technology</Link>
              <Link href="/about" className={link('/about')}>About</Link>
            </div>

            {/* RIGHT: actions */}
            <div className="hidden md:flex items-center gap-2">
              <button className="p-2.5 rounded-xl hover:bg-white/10" aria-label="Search">
                <Search className="h-5 w-5 text-white" />
              </button>
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2.5 rounded-xl hover:bg-white/10"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="h-5 w-5 text-white" /> : <Moon className="h-5 w-5 text-white" />}
              </button>
              <Link
                href="/contact"
                className="px-4 md:px-5 py-2 rounded-xl text-sm md:text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg hover:shadow-blue-500/40 transition"
              >
                Book Demo
              </Link>
            </div>

            {/* MOBILE toggler */}
            <button
              onClick={() => setMobileOpen(v => !v)}
              className="lg:hidden p-2.5 rounded-xl hover:bg-white/10"
              aria-label="Open menu"
            >
              {mobileOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
            </button>
          </div>

          {/* MOBILE drawer */}
          {mobileOpen && (
            <div className="lg:hidden mt-3 border-t border-white/10 pt-3 max-h-[70vh] overflow-y-auto">
              <div className="grid gap-1">
                <Link href="/" className="px-3 py-2 rounded-lg text-white/90 hover:bg-white/10">Home</Link>
                <Link href="/brands" className="px-3 py-2 rounded-lg text-white/90 hover:bg-white/10">Brands</Link>
                
                {/* Mobile Products Section */}
                <div className="px-3 py-2">
                  <div className="text-white/70 text-sm font-medium mb-2">Products</div>
                  <div className="ml-4 space-y-1">
                    <Link href="/products" className="block px-3 py-2 rounded-lg text-white/90 hover:bg-white/10">All Products</Link>
                    <Link href="/products/compare" className="block px-3 py-2 rounded-lg text-white/90 hover:bg-white/10">Compare Products</Link>
                    <Link href="/#brand-life-ionizers" className="block px-3 py-2 rounded-lg text-white/90 hover:bg-white/10">Life Ionizers India</Link>
                    <Link href="/#brand-mediqua" className="block px-3 py-2 rounded-lg text-white/90 hover:bg-white/10">Mediqua India</Link>
                    <Link href="/#brand-medisoul" className="block px-3 py-2 rounded-lg text-white/90 hover:bg-white/10">Medisoul India</Link>
                    <Link href="/products?brand=life-ionizers-india" className="block px-3 py-2 rounded-lg text-white/90 hover:bg-white/10">Life Ionizers (Products)</Link>
                    <Link href="/products?brand=mediqua-india" className="block px-3 py-2 rounded-lg text-white/90 hover:bg-white/10">Mediqua (Products)</Link>
                    <Link href="/products?brand=medisoul-india" className="block px-3 py-2 rounded-lg text-white/90 hover:bg-white/10">Medisoul (Products)</Link>
                  </div>
                </div>
                
                <Link href="/technology" className="px-3 py-2 rounded-lg text-white/90 hover:bg-white/10">Technology</Link>
                <Link href="/about" className="px-3 py-2 rounded-lg text-white/90 hover:bg-white/10">About</Link>
                <Link href="/contact" className="mt-1 px-3 py-2 rounded-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 text-center font-semibold">
                  Book Demo
                </Link>
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}