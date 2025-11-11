"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { products, Product } from '@/data/products';
import { BRANDS } from '@/data/brands';
import Image from 'next/image';
import Link from 'next/link';
import { X, Plus, Search, ArrowLeft } from 'lucide-react';

function ComparePageContent() {
  const searchParams = useSearchParams();
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [showProductSelector, setShowProductSelector] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPlates, setSelectedPlates] = useState<string>('all');
  const [selectedInstallation, setSelectedInstallation] = useState<string>('all');

  // Load products from URL params on mount
  useEffect(() => {
    const productIds = searchParams.get('products')?.split(',') || [];
    const productsToCompare = products.filter(p => productIds.includes(p.id));
    setSelectedProducts(productsToCompare);
  }, [searchParams]);

  // Update URL when products change
  useEffect(() => {
    if (selectedProducts.length > 0) {
      const productIds = selectedProducts.map(p => p.id).join(',');
      const newUrl = `/products/compare?products=${productIds}`;
      window.history.replaceState({}, '', newUrl);
    }
  }, [selectedProducts]);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBrand = selectedBrand === 'all' || product.brand === selectedBrand;
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesPlates = selectedPlates === 'all' || 
                         (product.plates && product.plates.toLowerCase().includes(selectedPlates.toLowerCase()));
    const matchesInstallation = selectedInstallation === 'all' || 
                               (product.installation && product.installation.toLowerCase().includes(selectedInstallation.toLowerCase()));
    
    return matchesSearch && matchesBrand && matchesCategory && matchesPlates && matchesInstallation;
  });

  const addProduct = (product: Product) => {
    if (selectedProducts.length < 3 && !selectedProducts.find(p => p.id === product.id)) {
      setSelectedProducts(prev => [...prev, product]);
    }
  };

  const removeProduct = (productId: string) => {
    setSelectedProducts(prev => prev.filter(p => p.id !== productId));
  };

  const clearAll = () => {
    setSelectedProducts([]);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedBrand('all');
    setSelectedCategory('all');
    setSelectedPlates('all');
    setSelectedInstallation('all');
  };

  const getBrandWithCountry = (brandId: string) => {
    const brand = BRANDS.find(b => b.id === brandId);
    return brand ? `${brand.name}, ${brand.country}` : brandId;
  };

  // Get unique plate options for dropdown
  const getPlateOptions = () => {
    const plateCounts = new Set<string>();
    products.forEach(product => {
      if (product.plates) {
        // Extract number from plates string (e.g., "5 XL Matrix GRID™ Plates" -> "5")
        const match = product.plates.match(/(\d+)/);
        if (match) {
          plateCounts.add(match[1]);
        }
      }
    });
    return Array.from(plateCounts).sort((a, b) => parseInt(a) - parseInt(b));
  };

  // Get unique installation options for dropdown
  const getInstallationOptions = () => {
    const installations = new Set<string>();
    products.forEach(product => {
      if (product.installation) {
        installations.add(product.installation);
      }
    });
    return Array.from(installations).sort();
  };

  const getBestValue = (specKey: string, products: Product[], currentProduct: Product) => {
    const values = products.map(p => p[specKey as keyof Product]).filter(v => v !== undefined && v !== null && v !== 'N/A' && !Array.isArray(v));
    
    if (values.length === 0) return false;
    
    // For price, lower is better
    if (specKey === 'price') {
      const numericValues = values.map(v => Number(v)).filter(n => !isNaN(n));
      if (numericValues.length === 0) return false;
      const minPrice = Math.min(...numericValues);
      return Number(currentProduct[specKey as keyof Product]) === minPrice;
    }
    
    // For numeric specs like ORP, higher absolute value is better
    if (specKey === 'orp' || specKey === 'orpDrink' || specKey === 'hydrogen') {
      const numericValues = values.map(v => {
        const str = String(v);
        const match = str.match(/-?\d+/);
        return match ? Math.abs(Number(match[0])) : 0;
      });
      if (numericValues.length === 0) return false;
      const maxValue = Math.max(...numericValues);
      const currentValue = String(currentProduct[specKey as keyof Product]);
      const currentMatch = currentValue.match(/-?\d+/);
      const currentNumeric = currentMatch ? Math.abs(Number(currentMatch[0])) : 0;
      return currentNumeric === maxValue;
    }
    
    // For warranty, longer is better
    if (specKey === 'warranty') {
      const warrantyValues = values.map(v => String(v).toLowerCase());
      const hasLifetime = warrantyValues.some(v => v.includes('lifetime'));
      const currentWarranty = String(currentProduct[specKey as keyof Product]).toLowerCase();
      return hasLifetime ? currentWarranty.includes('lifetime') : false;
    }
    
    return false;
  };

  const comparisonSpecs = [
    { key: 'name', label: 'Product Name' },
    { key: 'brand', label: 'Brand' },
    { key: 'price', label: 'Price' },
    { key: 'category', label: 'Category' },
    { key: 'plates', label: 'Plates' },
    { key: 'phRange', label: 'pH Range' },
    { key: 'orp', label: 'ORP' },
    { key: 'orpDrink', label: 'ORP (Drinking)' },
    { key: 'hydrogen', label: 'Hydrogen' },
    { key: 'power', label: 'Power' },
    { key: 'warranty', label: 'Warranty' },
    { key: 'installation', label: 'Installation' },
    { key: 'dimensions', label: 'Dimensions' },
    { key: 'internationalVoltage', label: 'Voltage' },
    { key: 'microMembrane', label: 'Micro Membrane' },
    { key: 'filters', label: 'Filters' },
    { key: 'oneClickFilter', label: 'One-Click Filter' },
    { key: 'cleaning', label: 'Cleaning' },
    { key: 'colorOptions', label: 'Color Options' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0F2C] via-[#1a1f3c] to-[#0A0F2C] text-white">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/products"
                className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Products</span>
              </Link>
              <div className="h-6 w-px bg-white/20"></div>
              <h1 className="text-3xl font-bold">Product Comparison</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {selectedProducts.length > 0 && (
                <button
                  onClick={clearAll}
                  className="px-4 py-2 text-sm text-white/70 hover:text-white transition-colors"
                >
                  Clear All
                </button>
              )}
              <button
                onClick={() => setShowProductSelector(true)}
                disabled={selectedProducts.length >= 3}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#EBEBEB] to-[#C9CFD7] text-[#0A2238] rounded-lg font-semibold hover:from-[#C9CFD7] hover:to-[#EBEBEB] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="w-5 h-5" />
                <span>Add Product ({selectedProducts.length}/3)</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Products Preview */}
      {selectedProducts.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectedProducts.map((product) => (
              <div key={product.id} className="relative bg-white/5 border border-white/10 rounded-xl p-6">
                <button
                  onClick={() => removeProduct(product.id)}
                  className="absolute top-4 right-4 p-1 text-white/50 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 relative">
                    <Image
                      src={product.image || '/images/products/life/MXL-5.png'}
                      alt={product.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{product.name}</h3>
                    <p className="text-sm text-white/70">{getBrandWithCountry(product.brand)}</p>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/70">Price:</span>
                    <span className="font-semibold">₹{product.price?.toLocaleString('en-IN') || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Category:</span>
                    <span>{product.category || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Plates:</span>
                    <span>{product.plates || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Installation:</span>
                    <span>{product.installation || 'N/A'}</span>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Empty slots */}
            {Array.from({ length: 3 - selectedProducts.length }).map((_, index) => (
              <div key={`empty-${index}`} className="border-2 border-dashed border-white/20 rounded-xl p-6 flex items-center justify-center">
                <button
                  onClick={() => setShowProductSelector(true)}
                  className="flex flex-col items-center space-y-2 text-white/50 hover:text-white transition-colors"
                >
                  <Plus className="w-8 h-8" />
                  <span>Add Product</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Comparison Table */}
      {selectedProducts.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 pb-12">
          <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="sticky left-0 z-10 bg-[#0A0F2C] px-6 py-4 text-left font-semibold">Specification</th>
                    {selectedProducts.map((product) => (
                      <th key={product.id} className="px-6 py-4 text-center min-w-[200px]">
                        <div className="flex flex-col items-center space-y-2">
                          <div className="w-12 h-12 relative">
                            <Image
                              src={product.image || '/images/products/life/MXL-5.png'}
                              alt={product.name}
                              fill
                              className="object-contain"
                            />
                          </div>
                          <div className="text-center">
                            <h3 className="font-semibold text-sm">{product.name}</h3>
                            <p className="text-xs text-white/70">{getBrandWithCountry(product.brand)}</p>
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonSpecs.map((spec, specIndex) => (
                    <tr key={spec.key} className={specIndex % 2 === 0 ? 'bg-white/5' : 'bg-transparent'}>
                      <td className="sticky left-0 z-10 bg-[#0A0F2C] px-6 py-4 font-medium border-r border-white/10">
                        {spec.label}
                      </td>
                      {selectedProducts.map((product) => {
                        const value = product[spec.key as keyof Product];
                        const isBestValue = getBestValue(spec.key, selectedProducts, product);
                        // Skip rendering if value is an array (like installationVariants)
                        if (Array.isArray(value)) {
                          return (
                            <td key={`${product.id}-${spec.key}`} className="px-6 py-4 text-center">
                              <span className="text-white/50">N/A</span>
                            </td>
                          );
                        }
                        // Handle object values (like specs with multiple properties)
                        const displayValue = typeof value === 'object' && value !== null && !Array.isArray(value)
                          ? Object.entries(value).map(([k, v]) => `${k}: ${v}`).join(', ')
                          : value;

                        return (
                          <td key={`${product.id}-${spec.key}`} className="px-6 py-4 text-center">
                            {spec.key === 'price' && value ? (
                              <span className={`font-semibold ${isBestValue ? 'text-green-400' : 'text-[#EBEBEB]'}`}>
                                ₹{Number(value).toLocaleString('en-IN')}
                                {isBestValue && <span className="ml-1 text-xs">✓</span>}
                              </span>
                            ) : spec.key === 'brand' ? (
                              <span className={`text-white/90 ${isBestValue ? 'text-green-400 font-semibold' : ''}`}>
                                {getBrandWithCountry(product.brand)}
                                {isBestValue && <span className="ml-1 text-xs">✓</span>}
                              </span>
                            ) : (
                              <span className={`text-white/90 ${isBestValue ? 'text-green-400 font-semibold' : ''}`}>
                                {displayValue || 'N/A'}
                                {isBestValue && <span className="ml-1 text-xs">✓</span>}
                              </span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {selectedProducts.length === 0 && (
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 mx-auto mb-6 bg-white/5 rounded-full flex items-center justify-center">
              <Plus className="w-12 h-12 text-white/50" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Start Comparing Products</h2>
            <p className="text-white/70 mb-8">
              Select up to 3 products to compare their specifications side by side
            </p>
            <button
              onClick={() => setShowProductSelector(true)}
              className="px-8 py-4 bg-gradient-to-r from-[#EBEBEB] to-[#C9CFD7] text-[#0A2238] rounded-lg font-semibold hover:from-[#C9CFD7] hover:to-[#EBEBEB] transition-all"
            >
              Add Products to Compare
            </button>
          </div>
        </div>
      )}

      {/* Product Selection Modal */}
      {showProductSelector && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0A0F2C] border border-white/10 rounded-xl w-full max-w-4xl max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Select Products to Compare</h2>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={clearFilters}
                    className="px-3 py-1 text-sm text-white/70 hover:text-white transition-colors"
                  >
                    Clear Filters
                  </button>
                  <button
                    onClick={() => setShowProductSelector(false)}
                    className="p-2 text-white/50 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              
              {/* Search and Filters */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#EBEBEB]"
                  />
                </div>
                
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#EBEBEB]"
                >
                  <option value="all">All Brands</option>
                  {BRANDS.filter(brand => brand.featured === true || brand.featured === undefined).map(brand => (
                    <option key={brand.id} value={brand.id}>{brand.name}, {brand.country}</option>
                  ))}
                </select>
                
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#EBEBEB]"
                >
                  <option value="all">All Categories</option>
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Accessory">Accessory</option>
                </select>

                <select
                  value={selectedPlates}
                  onChange={(e) => setSelectedPlates(e.target.value)}
                  className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#EBEBEB]"
                >
                  <option value="all">All Plates</option>
                  {getPlateOptions().map(plateCount => (
                    <option key={plateCount} value={plateCount}>{plateCount} Plates</option>
                  ))}
                </select>

                <select
                  value={selectedInstallation}
                  onChange={(e) => setSelectedInstallation(e.target.value)}
                  className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#EBEBEB]"
                >
                  <option value="all">All Installation</option>
                  {getInstallationOptions().map(installation => (
                    <option key={installation} value={installation}>{installation}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-96">
              {/* Filter Summary */}
              <div className="mb-4">
                <div className="text-sm text-white/70 mb-2">
                  Showing {filteredProducts.length} of {products.length} products
                  {(selectedBrand !== 'all' || selectedCategory !== 'all' || selectedPlates !== 'all' || selectedInstallation !== 'all' || searchTerm) && (
                    <span className="ml-2 text-[#EBEBEB]">
                      (filtered)
                    </span>
                  )}
                </div>
                
                {/* Active Filter Chips */}
                {(selectedBrand !== 'all' || selectedCategory !== 'all' || selectedPlates !== 'all' || selectedInstallation !== 'all' || searchTerm) && (
                  <div className="flex flex-wrap gap-2">
                    {searchTerm && (
                      <span className="px-2 py-1 bg-[#EBEBEB]/20 text-[#EBEBEB] text-xs rounded-full">
                        Search: &quot;{searchTerm}&quot;
                      </span>
                    )}
                    {selectedBrand !== 'all' && (
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full">
                        Brand: {getBrandWithCountry(selectedBrand)}
                      </span>
                    )}
                    {selectedCategory !== 'all' && (
                      <span className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded-full">
                        Category: {selectedCategory}
                      </span>
                    )}
                    {selectedPlates !== 'all' && (
                      <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full">
                        Plates: {selectedPlates}
                      </span>
                    )}
                    {selectedInstallation !== 'all' && (
                      <span className="px-2 py-1 bg-orange-500/20 text-orange-300 text-xs rounded-full">
                        Installation: {selectedInstallation}
                      </span>
                    )}
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredProducts.map((product) => {
                  const isSelected = selectedProducts.find(p => p.id === product.id);
                  const canAdd = selectedProducts.length < 3 && !isSelected;
                  
                  return (
                    <div
                      key={product.id}
                      className={`p-4 border rounded-lg transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#EBEBEB] bg-[#EBEBEB]/10'
                          : canAdd
                          ? 'border-white/10 hover:border-white/20 hover:bg-white/5'
                          : 'border-white/5 bg-white/5 opacity-50 cursor-not-allowed'
                      }`}
                      onClick={() => canAdd && addProduct(product)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 relative flex-shrink-0">
                          <Image
                            src={product.image || '/images/products/life/MXL-5.png'}
                            alt={product.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-lg truncate">{product.name}</h3>
                          <p className="text-sm text-white/70">{getBrandWithCountry(product.brand)}</p>
                          <p className="text-sm text-white/50">{product.category}</p>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="text-xs text-white/60">{product.plates || 'N/A'}</span>
                            <span className="text-xs text-white/60">{product.installation || 'N/A'}</span>
                          </div>
                          {product.price && (
                            <p className="text-sm font-semibold text-[#EBEBEB] mt-1">₹{product.price.toLocaleString('en-IN')}</p>
                          )}
                        </div>
                        {isSelected && (
                          <div className="w-6 h-6 bg-[#EBEBEB] rounded-full flex items-center justify-center">
                            <X className="w-4 h-4 text-[#0A0F2C]" />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="p-6 border-t border-white/10">
              <div className="flex items-center justify-between">
                <p className="text-sm text-white/70">
                  {selectedProducts.length} of 3 products selected
                </p>
                <button
                  onClick={() => setShowProductSelector(false)}
                  className="px-6 py-3 bg-gradient-to-r from-[#EBEBEB] to-[#C9CFD7] text-[#0A2238] rounded-lg font-semibold hover:from-[#C9CFD7] hover:to-[#EBEBEB] transition-all"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-[#0A0F2C] via-[#1a1f3c] to-[#0A0F2C] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white/70">Loading...</p>
        </div>
      </div>
    }>
      <ComparePageContent />
    </Suspense>
  );
}
