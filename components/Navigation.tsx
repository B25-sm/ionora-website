'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ShoppingBag, ChevronDown } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { BRANDS } from '@/data/brands';

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [productsHovered, setProductsHovered] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [ionizerHovered, setIonizerHovered] = useState(false);
  const [ionizerOpen, setIonizerOpen] = useState(false);
  const [propertiesHovered, setPropertiesHovered] = useState(false);
  const [propertiesOpen, setPropertiesOpen] = useState(false);
  const [usesHovered, setUsesHovered] = useState(false);
  const [usesOpen, setUsesOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const ionizerTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const propertiesTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const usesTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Reset dropdown states when menu closes
  useEffect(() => {
    if (!menuOpen) {
      setProductsOpen(false);
      setProductsHovered(false);
      setIonizerOpen(false);
      setIonizerHovered(false);
      setPropertiesOpen(false);
      setPropertiesHovered(false);
      setUsesOpen(false);
      setUsesHovered(false);
    }
  }, [menuOpen]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
        setProductsHovered(false);
        setProductsOpen(false);
        setIonizerOpen(false);
        setIonizerHovered(false);
        setPropertiesOpen(false);
        setPropertiesHovered(false);
        setUsesOpen(false);
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
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-2">
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
              width={200}
              height={60}
              className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto"
              priority
            />
            </Link>

          {/* Menu Button - Always visible */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 text-white hover:text-accent hover:bg-white/10 transition rounded-lg"
            aria-label="Open menu"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          </nav>

        {/* Dropdown menu - Always visible when open */}
        {menuOpen && (
          <div ref={menuRef} className="absolute right-0 top-full mt-2 w-full max-w-sm sm:w-80 bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl border border-white/20 py-2 z-50 animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col">
              {/* Products with Brands Dropdown */}
              <div 
                className="relative"
                onMouseEnter={(e) => {
                  // Only enable hover on desktop (screen width >= 640px)
                  if (typeof window !== 'undefined' && window.innerWidth >= 640) {
                    handleProductsMouseEnter();
                  }
                }}
                onMouseLeave={(e) => {
                  // Only enable hover on desktop
                  if (typeof window !== 'undefined' && window.innerWidth >= 640) {
                    handleProductsMouseLeave();
                  }
                }}
              >
                <div className="flex items-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const newState = !productsOpen;
                      setProductsOpen(newState);
                      // Close other dropdowns when opening this one
                      if (newState) {
                        setIonizerOpen(false);
                        setPropertiesOpen(false);
                        setUsesOpen(false);
                      }
                    }}
                    className="sm:hidden flex-1 flex items-center justify-between px-4 py-3 text-gray-800 hover:text-blue-600 hover:bg-white/20 transition-all duration-200 rounded-lg text-sm font-medium text-left"
                    aria-label="Toggle products menu"
                  >
                    <span className={pathname === '/products' ? 'text-blue-600' : ''}>Products</span>
                    <ChevronDown 
                      className={`h-5 w-5 transition-transform duration-200 ${
                        productsOpen ? 'transform rotate-180' : ''
                      }`} 
                    />
                  </button>
                  {/* Desktop: Link with hover dropdown */}
                  <Link 
                    href="/products" 
                    className={`hidden sm:flex flex-1 px-4 py-3 text-gray-800 hover:text-blue-600 hover:bg-white/20 transition-all duration-200 rounded-lg text-sm sm:text-base font-medium ${
                      pathname === '/products' ? 'text-blue-600 bg-blue-50' : ''
                    }`}
                  >
                    Products
                  </Link>
                </div>
                
                {/* Brands Dropdown - Mobile: Inline, Desktop: Absolute */}
                {/* Mobile: Only show when productsOpen is true */}
                <div className={`sm:hidden ${productsOpen ? 'block' : 'hidden'}`}>
                  <div className="w-full bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-white/20 py-1 mt-1">
                    <div className="flex flex-col">
                      {BRANDS.filter(brand => brand.featured === true || brand.featured === undefined).map((brand) => (
                        <div
                          key={brand.id}
                          className="relative"
                        >
                          <Link 
                            href={`/products?brand=${brand.id}`}
                            className="px-4 py-3 text-gray-800 hover:text-blue-600 hover:bg-white/20 transition-all duration-200 rounded-lg flex items-center justify-between group"
                            onClick={() => {
                              setMenuOpen(false);
                              setProductsOpen(false);
                            }}
                          >
                            <div className="flex flex-col">
                              <span className="font-medium text-sm sm:text-base">{brand.name}</span>
                              <span className="text-xs text-gray-500">{brand.tagline}</span>
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Desktop: Show on hover */}
                {productsHovered && (
                  <div className="hidden sm:block absolute right-full mr-2 top-0 w-64 w-72 bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-white/20 py-1 z-50 animate-in slide-in-from-right-2 duration-200 max-h-[80vh] overflow-y-auto">
                    <div className="flex flex-col">
                      {BRANDS.filter(brand => brand.featured === true || brand.featured === undefined).map((brand) => (
                        <div
                          key={brand.id}
                          className="relative"
                        >
                          <Link 
                            href={`/products?brand=${brand.id}`}
                            className="px-4 py-3 text-gray-800 hover:text-blue-600 hover:bg-white/20 transition-all duration-200 rounded-lg flex items-center justify-between group"
                            onClick={() => {
                              setMenuOpen(false);
                              setProductsOpen(false);
                            }}
                          >
                            <div className="flex flex-col">
                              <span className="font-medium text-sm sm:text-base">{brand.name}</span>
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
                className={`px-4 py-3 text-gray-800 hover:text-blue-600 hover:bg-white/20 transition-all duration-200 rounded-lg text-sm sm:text-base font-medium ${
                  pathname === '/brands' ? 'text-blue-600 bg-blue-50' : ''
                }`}
                onClick={() => setMenuOpen(false)}
              >
                Brands
              </Link>
              <Link 
                href="/technology" 
                className={`px-4 py-3 text-gray-800 hover:text-blue-600 hover:bg-white/20 transition-all duration-200 rounded-lg text-sm sm:text-base font-medium ${
                  pathname === '/technology' ? 'text-blue-600 bg-blue-50' : ''
                }`}
                onClick={() => setMenuOpen(false)}
              >
                Technology
              </Link>
              <Link 
                href="/about" 
                className={`px-4 py-3 text-gray-800 hover:text-blue-600 hover:bg-white/20 transition-all duration-200 rounded-lg text-sm sm:text-base font-medium ${
                  pathname === '/about' ? 'text-blue-600 bg-blue-50' : ''
                }`}
                onClick={() => setMenuOpen(false)}
              >
                About
              </Link>
              {/* Ionizer with Dropdown */}
              <div 
                className="relative"
                onMouseEnter={(e) => {
                  // Only enable hover on desktop (screen width >= 640px)
                  if (typeof window !== 'undefined' && window.innerWidth >= 640) {
                    handleIonizerMouseEnter();
                  }
                }}
                onMouseLeave={(e) => {
                  // Only enable hover on desktop
                  if (typeof window !== 'undefined' && window.innerWidth >= 640) {
                    handleIonizerMouseLeave();
                  }
                }}
              >
                <div className="flex items-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const newState = !ionizerOpen;
                      setIonizerOpen(newState);
                      // Close other dropdowns when opening this one
                      if (newState) {
                        setProductsOpen(false);
                        setPropertiesOpen(false);
                        setUsesOpen(false);
                      }
                    }}
                    className="sm:hidden flex-1 flex items-center justify-between px-4 py-3 text-gray-800 hover:text-blue-600 hover:bg-white/20 transition-all duration-200 rounded-lg text-sm font-medium text-left"
                    aria-label="Toggle ionizer menu"
                  >
                    <span className={pathname === '/ionizer' ? 'text-blue-600' : ''}>Ionizer</span>
                    <ChevronDown 
                      className={`h-5 w-5 transition-transform duration-200 ${
                        ionizerOpen ? 'transform rotate-180' : ''
                      }`} 
                    />
                  </button>
                  {/* Desktop: Link with hover dropdown */}
                  <Link 
                    href="/ionizer" 
                    className={`hidden sm:flex flex-1 px-4 py-3 text-gray-800 hover:text-blue-600 hover:bg-white/20 transition-all duration-200 rounded-lg text-sm sm:text-base font-medium ${
                      pathname === '/ionizer' ? 'text-blue-600 bg-blue-50' : ''
                    }`}
                  >
                    Ionizer
                  </Link>
                </div>
                
                {/* Ionizer Dropdown - Mobile: Inline, Desktop: Absolute */}
                {/* Mobile: Only show when ionizerOpen is true */}
                <div className={`sm:hidden ${ionizerOpen ? 'block' : 'hidden'}`}>
                  <div className="w-full bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-white/20 py-1 mt-1">
                    <div className="flex flex-col">
                      <Link 
                        href="/ionizer/ph"
                        className="px-4 py-3 text-gray-800 hover:text-blue-600 hover:bg-white/20 transition-all duration-200 rounded-lg text-sm sm:text-base"
                        onClick={() => {
                          setMenuOpen(false);
                          setIonizerOpen(false);
                        }}
                      >
                        What is pH
                      </Link>
                      <Link 
                        href="/ionizer/orp"
                        className="px-4 py-3 text-gray-800 hover:text-blue-600 hover:bg-white/20 transition-all duration-200 rounded-lg text-sm sm:text-base"
                        onClick={() => {
                          setMenuOpen(false);
                          setIonizerOpen(false);
                        }}
                      >
                        What is ORP
                      </Link>
                      <Link 
                        href="/ionizer/what-is-ionizer"
                        className="px-4 py-3 text-gray-800 hover:text-blue-600 hover:bg-white/20 transition-all duration-200 rounded-lg text-sm sm:text-base"
                        onClick={() => {
                          setMenuOpen(false);
                          setIonizerOpen(false);
                        }}
                      >
                        What is Ionizer
                      </Link>
                      <Link 
                        href="/ionizer/how-it-works"
                        className="px-4 py-3 text-gray-800 hover:text-blue-600 hover:bg-white/20 transition-all duration-200 rounded-lg text-sm sm:text-base"
                        onClick={() => {
                          setMenuOpen(false);
                          setIonizerOpen(false);
                        }}
                      >
                        How Ionizer Works
                      </Link>
                    </div>
                  </div>
                </div>
                
                {/* Desktop: Show on hover */}
                {ionizerHovered && (
                  <div className="hidden sm:block absolute right-full mr-2 top-0 w-64 w-72 bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-white/20 py-1 z-50 animate-in slide-in-from-right-2 duration-200 max-h-[80vh] overflow-y-auto">
                    <div className="flex flex-col">
                      <Link 
                        href="/ionizer/ph"
                        className="px-4 py-3 text-gray-800 hover:text-blue-600 hover:bg-white/20 transition-all duration-200 rounded-lg text-sm sm:text-base"
                        onClick={() => {
                          setMenuOpen(false);
                          setIonizerOpen(false);
                        }}
                      >
                        What is pH
                      </Link>
                      <Link 
                        href="/ionizer/orp"
                        className="px-4 py-3 text-gray-800 hover:text-blue-600 hover:bg-white/20 transition-all duration-200 rounded-lg text-sm sm:text-base"
                        onClick={() => {
                          setMenuOpen(false);
                          setIonizerOpen(false);
                        }}
                      >
                        What is ORP
                      </Link>
                      <Link 
                        href="/ionizer/what-is-ionizer"
                        className="px-4 py-3 text-gray-800 hover:text-blue-600 hover:bg-white/20 transition-all duration-200 rounded-lg text-sm sm:text-base"
                        onClick={() => {
                          setMenuOpen(false);
                          setIonizerOpen(false);
                        }}
                      >
                        What is Ionizer
                      </Link>
                      <Link 
                        href="/ionizer/how-it-works"
                        className="px-4 py-3 text-gray-800 hover:text-blue-600 hover:bg-white/20 transition-all duration-200 rounded-lg text-sm sm:text-base"
                        onClick={() => {
                          setMenuOpen(false);
                          setIonizerOpen(false);
                        }}
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
                onMouseEnter={(e) => {
                  // Only enable hover on desktop (screen width >= 640px)
                  if (typeof window !== 'undefined' && window.innerWidth >= 640) {
                    handlePropertiesMouseEnter();
                  }
                }}
                onMouseLeave={(e) => {
                  // Only enable hover on desktop
                  if (typeof window !== 'undefined' && window.innerWidth >= 640) {
                    handlePropertiesMouseLeave();
                  }
                }}
              >
                <div className="flex items-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const newState = !propertiesOpen;
                      setPropertiesOpen(newState);
                      // Close other dropdowns when opening this one
                      if (newState) {
                        setProductsOpen(false);
                        setIonizerOpen(false);
                        setUsesOpen(false);
                      }
                    }}
                    className="sm:hidden flex-1 flex items-center justify-between px-4 py-3 text-gray-800 hover:text-blue-600 hover:bg-white/20 transition-all duration-200 rounded-lg text-sm font-medium text-left"
                    aria-label="Toggle properties menu"
                  >
                    <span className={pathname === '/properties' ? 'text-blue-600' : ''}>Properties</span>
                    <ChevronDown 
                      className={`h-5 w-5 transition-transform duration-200 ${
                        propertiesOpen ? 'transform rotate-180' : ''
                      }`} 
                    />
                  </button>
                  {/* Desktop: Link with hover dropdown */}
                  <Link 
                    href="/properties" 
                    className={`hidden sm:flex flex-1 px-4 py-3 text-gray-800 hover:text-blue-600 hover:bg-white/20 transition-all duration-200 rounded-lg text-sm sm:text-base font-medium ${
                      pathname === '/properties' ? 'text-blue-600 bg-blue-50' : ''
                    }`}
                  >
                    Properties
                  </Link>
                </div>
                
                {/* Properties Dropdown - Mobile: Inline, Desktop: Absolute */}
                {/* Mobile: Only show when propertiesOpen is true */}
                <div className={`sm:hidden ${propertiesOpen ? 'block' : 'hidden'}`}>
                  <div className="w-full bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-white/20 py-1 mt-1">
                    <div className="flex flex-col">
                      <Link 
                        href="/properties/micro-cluster"
                        className="px-4 py-3 text-gray-800 hover:text-blue-600 hover:bg-white/20 transition-all duration-200 rounded-lg text-sm sm:text-base"
                        onClick={() => {
                          setMenuOpen(false);
                          setPropertiesOpen(false);
                        }}
                      >
                        Micro Cluster
                      </Link>
                      <Link 
                        href="/properties/molecular-hydrogen"
                        className="px-4 py-3 text-gray-800 hover:text-blue-600 hover:bg-white/20 transition-all duration-200 rounded-lg text-sm sm:text-base"
                        onClick={() => {
                          setMenuOpen(false);
                          setPropertiesOpen(false);
                        }}
                      >
                        Molecular Hydrogen
                      </Link>
                      <Link 
                        href="/properties/anti-oxidation"
                        className="px-4 py-3 text-gray-800 hover:text-blue-600 hover:bg-white/20 transition-all duration-200 rounded-lg text-sm sm:text-base"
                        onClick={() => {
                          setMenuOpen(false);
                          setPropertiesOpen(false);
                        }}
                      >
                        Anti Oxidation (Oxidation and Oxidative stress)
                      </Link>
                      <Link 
                        href="/properties/alkalinization"
                        className="px-4 py-3 text-gray-800 hover:text-blue-600 hover:bg-white/20 transition-all duration-200 rounded-lg text-sm sm:text-base"
                        onClick={() => {
                          setMenuOpen(false);
                          setPropertiesOpen(false);
                        }}
                      >
                        Alkalinization
                      </Link>
                      <Link 
                        href="/properties/detoxifying"
                        className="px-4 py-3 text-gray-800 hover:text-blue-600 hover:bg-white/20 transition-all duration-200 rounded-lg text-sm sm:text-base"
                        onClick={() => {
                          setMenuOpen(false);
                          setPropertiesOpen(false);
                        }}
                      >
                        Detoxifying
                      </Link>
                      <Link 
                        href="/properties/hydration"
                        className="px-4 py-3 text-gray-800 hover:text-blue-600 hover:bg-white/20 transition-all duration-200 rounded-lg text-sm sm:text-base"
                        onClick={() => {
                          setMenuOpen(false);
                          setPropertiesOpen(false);
                        }}
                      >
                        Hydration
                      </Link>
                      <Link 
                        href="/properties/anti-inflammatory"
                        className="px-4 py-3 text-gray-800 hover:text-blue-600 hover:bg-white/20 transition-all duration-200 rounded-lg text-sm sm:text-base"
                        onClick={() => {
                          setMenuOpen(false);
                          setPropertiesOpen(false);
                        }}
                      >
                        Anti-Inflammatory
                      </Link>
                      <Link 
                        href="/properties/free-radicals"
                        className="px-4 py-3 text-gray-800 hover:text-blue-600 hover:bg-white/20 transition-all duration-200 rounded-lg text-sm sm:text-base"
                        onClick={() => {
                          setMenuOpen(false);
                          setPropertiesOpen(false);
                        }}
                      >
                        Free-radicals (What is free radicals, How oxygen free-radicals affect human health)
                      </Link>
                    </div>
                  </div>
                </div>
                
                {/* Desktop: Show on hover */}
                {propertiesHovered && (
                  <div className="hidden sm:block absolute right-full mr-2 top-0 w-64 w-72 bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-white/20 py-1 z-50 animate-in slide-in-from-right-2 duration-200 max-h-[80vh] overflow-y-auto">
                    <div className="flex flex-col">
                      <Link 
                        href="/properties/micro-cluster"
                        className="px-4 py-3 text-gray-800 hover:text-blue-600 hover:bg-white/20 transition-all duration-200 rounded-lg text-sm sm:text-base"
                        onClick={() => {
                          setMenuOpen(false);
                          setPropertiesOpen(false);
                        }}
                      >
                        Micro Cluster
                      </Link>
                      <Link 
                        href="/properties/molecular-hydrogen"
                        className="px-4 py-3 text-gray-800 hover:text-blue-600 hover:bg-white/20 transition-all duration-200 rounded-lg text-sm sm:text-base"
                        onClick={() => {
                          setMenuOpen(false);
                          setPropertiesOpen(false);
                        }}
                      >
                        Molecular Hydrogen
                      </Link>
                      <Link 
                        href="/properties/anti-oxidation"
                        className="px-4 py-3 text-gray-800 hover:text-blue-600 hover:bg-white/20 transition-all duration-200 rounded-lg text-sm sm:text-base"
                        onClick={() => {
                          setMenuOpen(false);
                          setPropertiesOpen(false);
                        }}
                      >
                        Anti Oxidation (Oxidation and Oxidative stress)
                      </Link>
                      <Link 
                        href="/properties/alkalinization"
                        className="px-4 py-3 text-gray-800 hover:text-blue-600 hover:bg-white/20 transition-all duration-200 rounded-lg text-sm sm:text-base"
                        onClick={() => {
                          setMenuOpen(false);
                          setPropertiesOpen(false);
                        }}
                      >
                        Alkalinization
                      </Link>
                      <Link 
                        href="/properties/detoxifying"
                        className="px-4 py-3 text-gray-800 hover:text-blue-600 hover:bg-white/20 transition-all duration-200 rounded-lg text-sm sm:text-base"
                        onClick={() => {
                          setMenuOpen(false);
                          setPropertiesOpen(false);
                        }}
                      >
                        Detoxifying
                      </Link>
                      <Link 
                        href="/properties/hydration"
                        className="px-4 py-3 text-gray-800 hover:text-blue-600 hover:bg-white/20 transition-all duration-200 rounded-lg text-sm sm:text-base"
                        onClick={() => {
                          setMenuOpen(false);
                          setPropertiesOpen(false);
                        }}
                      >
                        Hydration
                      </Link>
                      <Link 
                        href="/properties/anti-inflammatory"
                        className="px-4 py-3 text-gray-800 hover:text-blue-600 hover:bg-white/20 transition-all duration-200 rounded-lg text-sm sm:text-base"
                        onClick={() => {
                          setMenuOpen(false);
                          setPropertiesOpen(false);
                        }}
                      >
                        Anti-Inflammatory
                      </Link>
                      <Link 
                        href="/properties/free-radicals"
                        className="px-4 py-3 text-gray-800 hover:text-blue-600 hover:bg-white/20 transition-all duration-200 rounded-lg text-sm sm:text-base"
                        onClick={() => {
                          setMenuOpen(false);
                          setPropertiesOpen(false);
                        }}
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
                onMouseEnter={(e) => {
                  // Only enable hover on desktop (screen width >= 640px)
                  if (typeof window !== 'undefined' && window.innerWidth >= 640) {
                    handleUsesMouseEnter();
                  }
                }}
                onMouseLeave={(e) => {
                  // Only enable hover on desktop
                  if (typeof window !== 'undefined' && window.innerWidth >= 640) {
                    handleUsesMouseLeave();
                  }
                }}
              >
                <div className="flex items-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const newState = !usesOpen;
                      setUsesOpen(newState);
                      // Close other dropdowns when opening this one
                      if (newState) {
                        setProductsOpen(false);
                        setIonizerOpen(false);
                        setPropertiesOpen(false);
                      }
                    }}
                    className="sm:hidden flex-1 flex items-center justify-between px-4 py-3 text-gray-800 hover:text-blue-600 hover:bg-white/20 transition-all duration-200 rounded-lg text-sm font-medium text-left"
                    aria-label="Toggle uses menu"
                  >
                    <span className={pathname === '/uses' ? 'text-blue-600' : ''}>Uses/Applications of Ionized Water</span>
                    <ChevronDown 
                      className={`h-5 w-5 transition-transform duration-200 ${
                        usesOpen ? 'transform rotate-180' : ''
                      }`} 
                    />
                  </button>
                  {/* Desktop: Link with hover dropdown */}
                  <Link 
                    href="/uses" 
                    className={`hidden sm:flex flex-1 px-4 py-3 text-gray-800 hover:text-blue-600 hover:bg-white/20 transition-all duration-200 rounded-lg text-sm sm:text-base font-medium ${
                      pathname === '/uses' ? 'text-blue-600 bg-blue-50' : ''
                    }`}
                  >
                    Uses/Applications of Ionized Water
                  </Link>
                </div>
                
                {/* Uses Dropdown - Mobile: Inline, Desktop: Absolute */}
                {/* Mobile: Only show when usesOpen is true */}
                <div className={`sm:hidden ${usesOpen ? 'block' : 'hidden'}`}>
                  <div className="w-full bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-white/20 py-1 mt-1">
                    <div className="flex flex-col">
                      <Link 
                        href="/uses/food-livestock-agricultural"
                        className="px-4 py-3 text-gray-800 hover:text-blue-600 hover:bg-white/20 transition-all duration-200 rounded-lg text-sm sm:text-base"
                        onClick={() => {
                          setMenuOpen(false);
                          setUsesOpen(false);
                        }}
                      >
                        Electrolysis Ionized Water for Food, Livestock and Agricultural
                      </Link>
                      <Link 
                        href="/uses/semiconductor-cleaning"
                        className="px-4 py-3 text-gray-800 hover:text-blue-600 hover:bg-white/20 transition-all duration-200 rounded-lg text-sm sm:text-base"
                        onClick={() => {
                          setMenuOpen(false);
                          setUsesOpen(false);
                        }}
                      >
                        Ionized Water for High End Semiconductor Cleaning
                      </Link>
                      <Link 
                        href="/uses/ro-vs-ionized"
                        className="px-4 py-3 text-gray-800 hover:text-blue-600 hover:bg-white/20 transition-all duration-200 rounded-lg text-sm sm:text-base"
                        onClick={() => {
                          setMenuOpen(false);
                          setUsesOpen(false);
                        }}
                      >
                        Difference between RO and Ionized Water
                      </Link>
                    </div>
                  </div>
                </div>
                
                {/* Desktop: Show on hover */}
                {usesHovered && (
                  <div className="hidden sm:block absolute right-full mr-2 top-0 w-64 w-72 bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-white/20 py-1 z-50 animate-in slide-in-from-right-2 duration-200 max-h-[80vh] overflow-y-auto">
                    <div className="flex flex-col">
                      <Link 
                        href="/uses/food-livestock-agricultural"
                        className="px-4 py-3 text-gray-800 hover:text-blue-600 hover:bg-white/20 transition-all duration-200 rounded-lg text-sm sm:text-base"
                        onClick={() => {
                          setMenuOpen(false);
                          setUsesOpen(false);
                        }}
                      >
                        Electrolysis Ionized Water for Food, Livestock and Agricultural
                      </Link>
                      <Link 
                        href="/uses/semiconductor-cleaning"
                        className="px-4 py-3 text-gray-800 hover:text-blue-600 hover:bg-white/20 transition-all duration-200 rounded-lg text-sm sm:text-base"
                        onClick={() => {
                          setMenuOpen(false);
                          setUsesOpen(false);
                        }}
                      >
                        Ionized Water for High End Semiconductor Cleaning
                      </Link>
                      <Link 
                        href="/uses/ro-vs-ionized"
                        className="px-4 py-3 text-gray-800 hover:text-blue-600 hover:bg-white/20 transition-all duration-200 rounded-lg text-sm sm:text-base"
                        onClick={() => {
                          setMenuOpen(false);
                          setUsesOpen(false);
                        }}
                      >
                        Difference between RO and Ionized Water
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              <Link 
                href="/products/compare" 
                className={`px-4 py-3 text-gray-800 hover:text-blue-600 hover:bg-white/20 transition-all duration-200 rounded-lg text-sm sm:text-base font-medium ${
                  pathname === '/products/compare' ? 'text-blue-600 bg-blue-50' : ''
                }`}
                onClick={() => setMenuOpen(false)}
              >
                Compare Products
              </Link>
              <div className="border-t border-gray-200 my-1"></div>
              <button 
                className="px-4 py-3 text-gray-800 hover:text-blue-600 hover:bg-white/20 transition-all duration-200 rounded-lg flex items-center gap-2 text-sm sm:text-base font-medium"
                onClick={() => setMenuOpen(false)}
              >
                <ShoppingBag className="h-5 w-5" />
                Shopping Cart
              </button>
            </div>
          </div>
        )}
        </div>
    </header>
  );
}