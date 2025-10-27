'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { BRANDS } from '@/data/brands';

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [productsHovered, setProductsHovered] = useState(false);
  const [ionizerHovered, setIonizerHovered] = useState(false);
  const [propertiesHovered, setPropertiesHovered] = useState(false);
  const [usesHovered, setUsesHovered] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const ionizerTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const propertiesTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const usesTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
        setProductsHovered(false);
        setIonizerHovered(false);
        setPropertiesHovered(false);
        setUsesHovered(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      if (ionizerTimeoutRef.current) {
        clearTimeout(ionizerTimeoutRef.current);
      }
      if (propertiesTimeoutRef.current) {
        clearTimeout(propertiesTimeoutRef.current);
      }
      if (usesTimeoutRef.current) {
        clearTimeout(usesTimeoutRef.current);
      }
    };
  }, []);

  // Handle hover with delay
  const handleProductsMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setProductsHovered(true);
  };

  const handleProductsMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setProductsHovered(false);
    }, 150);
  };

  // Ionizer hover handlers
  const handleIonizerMouseEnter = () => {
    if (ionizerTimeoutRef.current) {
      clearTimeout(ionizerTimeoutRef.current);
    }
    setIonizerHovered(true);
  };

  const handleIonizerMouseLeave = () => {
    ionizerTimeoutRef.current = setTimeout(() => {
      setIonizerHovered(false);
    }, 150);
  };

  // Properties hover handlers
  const handlePropertiesMouseEnter = () => {
    if (propertiesTimeoutRef.current) {
      clearTimeout(propertiesTimeoutRef.current);
    }
    setPropertiesHovered(true);
  };

  const handlePropertiesMouseLeave = () => {
    propertiesTimeoutRef.current = setTimeout(() => {
      setPropertiesHovered(false);
    }, 150);
  };

  // Uses hover handlers
  const handleUsesMouseEnter = () => {
    if (usesTimeoutRef.current) {
      clearTimeout(usesTimeoutRef.current);
    }
    setUsesHovered(true);
  };

  const handleUsesMouseLeave = () => {
    usesTimeoutRef.current = setTimeout(() => {
      setUsesHovered(false);
    }, 150);
  };

  const link = (href: string) =>
    `px-4 py-3 text-white hover:text-accent hover:bg-white/10 transition rounded-lg ${
      pathname === href ? 'text-accent font-medium bg-white/10' : ''
    }`;


  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-transparent">
      {/* Main navigation */}
      <div className="w-full px-2 xs:px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 3xl:px-24 4xl:px-32 5xl:px-40 6xl:px-48 py-1">
          <nav className="relative flex items-center justify-between">
            {/* Left side - Logo */}
            <Link
              href="/"
              aria-label="IONORA"
              className="flex items-center"
            >
            <Image
              src="/images/ionora-logo.png"
              alt="IONORA"
              width={400}
              height={120}
              className="h-8 xs:h-10 sm:h-12 md:h-14 lg:h-16 xl:h-18 2xl:h-20 3xl:h-24 4xl:h-28 5xl:h-32 6xl:h-36 w-auto"
              priority
            />
            </Link>

          {/* Menu Button - Always visible */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 xs:p-3 sm:p-4 md:p-5 lg:p-6 xl:p-7 2xl:p-8 3xl:p-10 4xl:p-12 5xl:p-14 6xl:p-16 text-white hover:text-accent hover:bg-white/10 transition rounded-lg"
            aria-label="Open menu"
          >
            {menuOpen ? <X className="h-6 w-6 xs:h-7 xs:w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 lg:h-10 lg:w-10 xl:h-11 xl:w-11 2xl:h-12 2xl:w-12 3xl:h-14 3xl:w-14 4xl:h-16 4xl:w-16 5xl:h-18 5xl:w-18 6xl:h-20 6xl:w-20" /> : <Menu className="h-6 w-6 xs:h-7 xs:w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 lg:h-10 lg:w-10 xl:h-11 xl:w-11 2xl:h-12 2xl:w-12 3xl:h-14 3xl:w-14 4xl:h-16 4xl:w-16 5xl:h-18 5xl:w-18 6xl:h-20 6xl:w-20" />}
          </button>
          </nav>

        {/* Dropdown menu - Always visible when open */}
        {menuOpen && (
          <div ref={menuRef} className="absolute right-2 xs:right-4 sm:right-6 md:right-8 lg:right-12 xl:right-16 2xl:right-20 3xl:right-24 4xl:right-32 5xl:right-40 6xl:right-48 top-full mt-1 w-64 xs:w-72 sm:w-80 md:w-96 lg:w-[28rem] xl:w-[32rem] 2xl:w-[36rem] 3xl:w-[40rem] 4xl:w-[44rem] 5xl:w-[48rem] 6xl:w-[52rem] bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-white/20 py-1 z-50 animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col">
              {/* Products with Brands Dropdown */}
              <div 
                className="relative"
                onMouseEnter={handleProductsMouseEnter}
                onMouseLeave={handleProductsMouseLeave}
              >
                <Link 
                  href="/products" 
                className={`px-3 xs:px-4 sm:px-5 md:px-6 lg:px-7 xl:px-8 2xl:px-9 3xl:px-10 4xl:px-12 5xl:px-14 6xl:px-16 py-1.5 xs:py-2 sm:py-2.5 md:py-3 lg:py-3.5 xl:py-4 2xl:py-4.5 3xl:py-5 4xl:py-6 5xl:py-7 6xl:py-8 text-gray-800 hover:text-blue-600 hover:bg-white/20 transition-all duration-200 rounded-lg text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl 3xl:text-5xl 4xl:text-6xl 5xl:text-7xl 6xl:text-8xl ${
                  pathname === '/products' ? 'text-blue-600 font-medium bg-white/10' : ''
                }`}
                >
                  <span>Products</span>
                </Link>
                
                {/* Brands Dropdown */}
                {productsHovered && (
                  <div className="absolute right-full top-0 mr-2 w-64 xs:w-72 sm:w-80 md:w-96 lg:w-[28rem] xl:w-[32rem] 2xl:w-[36rem] 3xl:w-[40rem] 4xl:w-[44rem] 5xl:w-[48rem] 6xl:w-[52rem] bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-white/20 py-1 z-50 animate-in slide-in-from-right-2 duration-200">
                    <div className="flex flex-col">
                      {BRANDS.filter(brand => brand.featured === true || brand.featured === undefined).map((brand) => (
                        <div
                          key={brand.id}
                          className="relative"
                        >
                          <Link 
                            href={`/products?brand=${brand.id}`}
                            className="px-4 py-3 text-gray-800 hover:text-blue-600 hover:bg-white/20 transition-all duration-200 rounded-lg flex items-center justify-between group"
                            onClick={() => setMenuOpen(false)}
                          >
                            <div className="flex flex-col">
                              <span className="font-medium">{brand.name}</span>
                              <span className="text-xs text-gray-500">{brand.tagline}</span>
                            </div>
                          </Link>
                          
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link 
                href="/brands" 
                className={`px-3 xs:px-4 sm:px-5 md:px-6 lg:px-7 xl:px-8 2xl:px-9 3xl:px-10 4xl:px-12 5xl:px-14 6xl:px-16 py-1.5 xs:py-2 sm:py-2.5 md:py-3 lg:py-3.5 xl:py-4 2xl:py-4.5 3xl:py-5 4xl:py-6 5xl:py-7 6xl:py-8 text-gray-800 hover:text-blue-600 hover:bg-white/20 transition-all duration-200 rounded-lg text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl 3xl:text-5xl 4xl:text-6xl 5xl:text-7xl 6xl:text-8xl ${
                  pathname === '/brands' ? 'text-blue-600 font-medium bg-white/10' : ''
                }`}
                onClick={() => setMenuOpen(false)}
              >
                Brands
              </Link>
              <Link 
                href="/technology" 
                className={`px-3 xs:px-4 sm:px-5 md:px-6 lg:px-7 xl:px-8 2xl:px-9 3xl:px-10 4xl:px-12 5xl:px-14 6xl:px-16 py-1.5 xs:py-2 sm:py-2.5 md:py-3 lg:py-3.5 xl:py-4 2xl:py-4.5 3xl:py-5 4xl:py-6 5xl:py-7 6xl:py-8 text-gray-800 hover:text-blue-600 hover:bg-white/20 transition-all duration-200 rounded-lg text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl 3xl:text-5xl 4xl:text-6xl 5xl:text-7xl 6xl:text-8xl ${
                  pathname === '/technology' ? 'text-blue-600 font-medium bg-white/10' : ''
                }`}
                onClick={() => setMenuOpen(false)}
              >
                Technology
              </Link>
              <Link 
                href="/about" 
                className={`px-3 xs:px-4 sm:px-5 md:px-6 lg:px-7 xl:px-8 2xl:px-9 3xl:px-10 4xl:px-12 5xl:px-14 6xl:px-16 py-1.5 xs:py-2 sm:py-2.5 md:py-3 lg:py-3.5 xl:py-4 2xl:py-4.5 3xl:py-5 4xl:py-6 5xl:py-7 6xl:py-8 text-gray-800 hover:text-blue-600 hover:bg-white/20 transition-all duration-200 rounded-lg text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl 3xl:text-5xl 4xl:text-6xl 5xl:text-7xl 6xl:text-8xl ${
                  pathname === '/about' ? 'text-blue-600 font-medium bg-white/10' : ''
                }`}
                onClick={() => setMenuOpen(false)}
              >
                About
              </Link>
              {/* Ionizer with Dropdown */}
              <div 
                className="relative"
                onMouseEnter={handleIonizerMouseEnter}
                onMouseLeave={handleIonizerMouseLeave}
              >
                <Link 
                  href="/ionizer" 
                  className={`px-3 xs:px-4 sm:px-5 md:px-6 lg:px-7 xl:px-8 2xl:px-9 3xl:px-10 4xl:px-12 5xl:px-14 6xl:px-16 py-1.5 xs:py-2 sm:py-2.5 md:py-3 lg:py-3.5 xl:py-4 2xl:py-4.5 3xl:py-5 4xl:py-6 5xl:py-7 6xl:py-8 text-gray-800 hover:text-blue-600 hover:bg-white/20 transition-all duration-200 rounded-lg text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl 3xl:text-5xl 4xl:text-6xl 5xl:text-7xl 6xl:text-8xl ${
                    pathname === '/ionizer' ? 'text-blue-600 font-medium bg-white/10' : ''
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  Ionizer
                </Link>
                
                {/* Ionizer Dropdown */}
                {ionizerHovered && (
                  <div className="absolute right-full top-0 mr-2 w-64 xs:w-72 sm:w-80 md:w-96 lg:w-[28rem] xl:w-[32rem] 2xl:w-[36rem] 3xl:w-[40rem] 4xl:w-[44rem] 5xl:w-[48rem] 6xl:w-[52rem] bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-white/20 py-1 z-50 animate-in slide-in-from-right-2 duration-200">
                    <div className="flex flex-col">
                      <Link 
                        href="/ionizer/ph"
                        className="px-4 py-3 text-gray-800 hover:text-blue-600 hover:bg-white/20 transition-all duration-200 rounded-lg"
                        onClick={() => setMenuOpen(false)}
                      >
                        What is pH
                      </Link>
                      <Link 
                        href="/ionizer/orp"
                        className="px-4 py-3 text-gray-800 hover:text-blue-600 hover:bg-white/20 transition-all duration-200 rounded-lg"
                        onClick={() => setMenuOpen(false)}
                      >
                        What is ORP
                      </Link>
                      <Link 
                        href="/ionizer/what-is-ionizer"
                        className="px-4 py-3 text-gray-800 hover:text-blue-600 hover:bg-white/20 transition-all duration-200 rounded-lg"
                        onClick={() => setMenuOpen(false)}
                      >
                        What is Ionizer
                      </Link>
                      <Link 
                        href="/ionizer/how-it-works"
                        className="px-4 py-3 text-gray-800 hover:text-blue-600 hover:bg-white/20 transition-all duration-200 rounded-lg"
                        onClick={() => setMenuOpen(false)}
                      >
                        How Ionizer Works
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Properties with Dropdown */}
              <div 
                className="relative"
                onMouseEnter={handlePropertiesMouseEnter}
                onMouseLeave={handlePropertiesMouseLeave}
              >
                <Link 
                  href="/properties" 
                  className={`px-3 xs:px-4 sm:px-5 md:px-6 lg:px-7 xl:px-8 2xl:px-9 3xl:px-10 4xl:px-12 5xl:px-14 6xl:px-16 py-1.5 xs:py-2 sm:py-2.5 md:py-3 lg:py-3.5 xl:py-4 2xl:py-4.5 3xl:py-5 4xl:py-6 5xl:py-7 6xl:py-8 text-gray-800 hover:text-blue-600 hover:bg-white/20 transition-all duration-200 rounded-lg text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl 3xl:text-5xl 4xl:text-6xl 5xl:text-7xl 6xl:text-8xl ${
                    pathname === '/properties' ? 'text-blue-600 font-medium bg-white/10' : ''
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  Properties
                </Link>
                
                {/* Properties Dropdown */}
                {propertiesHovered && (
                  <div className="absolute right-full top-0 mr-2 w-64 xs:w-72 sm:w-80 md:w-96 lg:w-[28rem] xl:w-[32rem] 2xl:w-[36rem] 3xl:w-[40rem] 4xl:w-[44rem] 5xl:w-[48rem] 6xl:w-[52rem] bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-white/20 py-1 z-50 animate-in slide-in-from-right-2 duration-200">
                    <div className="flex flex-col">
                      <Link 
                        href="/properties/micro-cluster"
                        className="px-4 py-3 text-gray-800 hover:text-blue-600 hover:bg-white/20 transition-all duration-200 rounded-lg"
                        onClick={() => setMenuOpen(false)}
                      >
                        Micro Cluster
                      </Link>
                      <Link 
                        href="/properties/molecular-hydrogen"
                        className="px-4 py-3 text-gray-800 hover:text-blue-600 hover:bg-white/20 transition-all duration-200 rounded-lg"
                        onClick={() => setMenuOpen(false)}
                      >
                        Molecular Hydrogen
                      </Link>
                      <Link 
                        href="/properties/anti-oxidation"
                        className="px-4 py-3 text-gray-800 hover:text-blue-600 hover:bg-white/20 transition-all duration-200 rounded-lg"
                        onClick={() => setMenuOpen(false)}
                      >
                        Anti Oxidation (Oxidation and Oxidative stress)
                      </Link>
                      <Link 
                        href="/properties/alkalinization"
                        className="px-4 py-3 text-gray-800 hover:text-blue-600 hover:bg-white/20 transition-all duration-200 rounded-lg"
                        onClick={() => setMenuOpen(false)}
                      >
                        Alkalinization
                      </Link>
                      <Link 
                        href="/properties/detoxifying"
                        className="px-4 py-3 text-gray-800 hover:text-blue-600 hover:bg-white/20 transition-all duration-200 rounded-lg"
                        onClick={() => setMenuOpen(false)}
                      >
                        Detoxifying
                      </Link>
                      <Link 
                        href="/properties/hydration"
                        className="px-4 py-3 text-gray-800 hover:text-blue-600 hover:bg-white/20 transition-all duration-200 rounded-lg"
                        onClick={() => setMenuOpen(false)}
                      >
                        Hydration
                      </Link>
                      <Link 
                        href="/properties/anti-inflammatory"
                        className="px-4 py-3 text-gray-800 hover:text-blue-600 hover:bg-white/20 transition-all duration-200 rounded-lg"
                        onClick={() => setMenuOpen(false)}
                      >
                        Anti-Inflammatory
                      </Link>
                      <Link 
                        href="/properties/free-radicals"
                        className="px-4 py-3 text-gray-800 hover:text-blue-600 hover:bg-white/20 transition-all duration-200 rounded-lg"
                        onClick={() => setMenuOpen(false)}
                      >
                        Free-radicals (What is free radicals, How oxygen free-radicals affect human health)
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Uses/Applications with Dropdown */}
              <div 
                className="relative"
                onMouseEnter={handleUsesMouseEnter}
                onMouseLeave={handleUsesMouseLeave}
              >
                <Link 
                  href="/uses" 
                  className={`px-3 xs:px-4 sm:px-5 md:px-6 lg:px-7 xl:px-8 2xl:px-9 3xl:px-10 4xl:px-12 5xl:px-14 6xl:px-16 py-1.5 xs:py-2 sm:py-2.5 md:py-3 lg:py-3.5 xl:py-4 2xl:py-4.5 3xl:py-5 4xl:py-6 5xl:py-7 6xl:py-8 text-gray-800 hover:text-blue-600 hover:bg-white/20 transition-all duration-200 rounded-lg text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl 3xl:text-5xl 4xl:text-6xl 5xl:text-7xl 6xl:text-8xl ${
                    pathname === '/uses' ? 'text-blue-600 font-medium bg-white/10' : ''
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  Uses/Applications of Ionized Water
                </Link>
                
                {/* Uses Dropdown */}
                {usesHovered && (
                  <div className="absolute right-full top-0 mr-2 w-64 xs:w-72 sm:w-80 md:w-96 lg:w-[28rem] xl:w-[32rem] 2xl:w-[36rem] 3xl:w-[40rem] 4xl:w-[44rem] 5xl:w-[48rem] 6xl:w-[52rem] bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-white/20 py-1 z-50 animate-in slide-in-from-right-2 duration-200">
                    <div className="flex flex-col">
                      <Link 
                        href="/uses/food-livestock-agricultural"
                        className="px-4 py-3 text-gray-800 hover:text-blue-600 hover:bg-white/20 transition-all duration-200 rounded-lg"
                        onClick={() => setMenuOpen(false)}
                      >
                        Electrolysis Ionized Water for Food, Livestock and Agricultural
                      </Link>
                      <Link 
                        href="/uses/semiconductor-cleaning"
                        className="px-4 py-3 text-gray-800 hover:text-blue-600 hover:bg-white/20 transition-all duration-200 rounded-lg"
                        onClick={() => setMenuOpen(false)}
                      >
                        Ionized Water for High End Semiconductor Cleaning
                      </Link>
                      <Link 
                        href="/uses/ro-vs-ionized"
                        className="px-4 py-3 text-gray-800 hover:text-blue-600 hover:bg-white/20 transition-all duration-200 rounded-lg"
                        onClick={() => setMenuOpen(false)}
                      >
                        Difference between RO and Ionized Water
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              <Link 
                href="/products/compare" 
                className={`px-3 xs:px-4 sm:px-5 md:px-6 lg:px-7 xl:px-8 2xl:px-9 3xl:px-10 4xl:px-12 5xl:px-14 6xl:px-16 py-1.5 xs:py-2 sm:py-2.5 md:py-3 lg:py-3.5 xl:py-4 2xl:py-4.5 3xl:py-5 4xl:py-6 5xl:py-7 6xl:py-8 text-gray-800 hover:text-blue-600 hover:bg-white/20 transition-all duration-200 rounded-lg text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl 3xl:text-5xl 4xl:text-6xl 5xl:text-7xl 6xl:text-8xl ${
                  pathname === '/products/compare' ? 'text-blue-600 font-medium bg-white/10' : ''
                }`}
                onClick={() => setMenuOpen(false)}
              >
                Compare Products
              </Link>
              <div className="border-t border-gray-200 my-1"></div>
              <button 
                className="px-3 xs:px-4 sm:px-5 md:px-6 lg:px-7 xl:px-8 2xl:px-9 3xl:px-10 4xl:px-12 5xl:px-14 6xl:px-16 py-1.5 xs:py-2 sm:py-2.5 md:py-3 lg:py-3.5 xl:py-4 2xl:py-4.5 3xl:py-5 4xl:py-6 5xl:py-7 6xl:py-8 text-gray-800 hover:text-blue-600 hover:bg-white/20 transition-all duration-200 rounded-lg flex items-center gap-2 text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl 3xl:text-5xl 4xl:text-6xl 5xl:text-7xl 6xl:text-8xl"
                onClick={() => setMenuOpen(false)}
              >
                <ShoppingBag className="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 xl:h-9 xl:w-9 2xl:h-10 2xl:w-10 3xl:h-11 3xl:w-11 4xl:h-12 4xl:w-12 5xl:h-14 5xl:w-14 6xl:h-16 6xl:w-16" />
                Shopping Cart
              </button>
            </div>
          </div>
        )}
        </div>
    </header>
  );
}