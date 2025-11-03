import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Droplets, Zap } from 'lucide-react';

export default function HydrationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/properties" 
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Properties
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
            <Droplets className="h-10 w-10 text-cyan-600" />
            Hydration
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Superior hydration properties for better cellular function and overall health
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          {/* Enhanced Hydration */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Enhanced Hydration Properties</h2>
            <div className="space-y-6 text-gray-700">
              <p className="text-lg">
                Ionized water provides superior hydration compared to regular water due to its unique molecular structure 
                and properties that enhance cellular absorption and function.
              </p>
              
              <div className="bg-cyan-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-cyan-900 mb-4">Key Hydration Benefits:</h3>
                <div className="grid md:grid-cols-2 gap-4 text-cyan-800">
                  <div>
                    <p><strong>Micro-clustered molecules</strong> for better absorption</p>
                    <p><strong>Higher pH</strong> helps water flow via aquaporins</p>
                  </div>
                  <div>
                    <p><strong>Negative ORP</strong> for cellular health</p>
                    <p><strong>Molecular hydrogen</strong> for antioxidant protection</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Zap className="h-8 w-8 text-blue-600" />
              How Ionized Water Enhances Hydration
            </h2>
            <div className="space-y-6 text-gray-700">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3">Micro-Clustered Structure</h3>
                  <div className="space-y-3 text-blue-800">
                    <p><strong>Smaller clusters</strong> (2-6 molecules vs 140+ in tap water)</p>
                    <p><strong>Better penetration</strong> through cell membranes</p>
                    <p><strong>Faster absorption</strong> into cells</p>
                    <p><strong>More efficient</strong> cellular hydration</p>
                  </div>
                </div>
                
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-900 mb-3">Aquaporin Enhancement</h3>
                  <div className="space-y-3 text-green-800">
                    <p><strong>Higher pH</strong> helps water flow via aquaporins</p>
                    <p><strong>Channel proteins</strong> in cell membranes</p>
                    <p><strong>Facilitated transport</strong> of water molecules</p>
                    <p><strong>Improved cellular</strong> water balance</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Health Benefits */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Health Benefits of Superior Hydration</h2>
            <div className="space-y-6 text-gray-700">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-900 mb-3">Supports Hydration</h3>
                  <p className="text-green-800 text-sm">
                    Advocates say electrolysis reduces 'cluster size' of water molecules, making water easier to absorb 
                    into cells, leading to quicker hydration.
                  </p>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3">May Improve Energy & Metabolism</h3>
                  <p className="text-blue-800 text-sm">
                    Better hydration and reduced acidity are linked with improved energy levels, stamina, and possibly 
                    supporting metabolism.
                  </p>
                </div>
                
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-purple-900 mb-3">Skin Health & Anti-Aging</h3>
                  <p className="text-purple-800 text-sm">
                    Rich hydration plus antioxidant properties are said to help keep skin clearer, softer, and younger-looking.
                  </p>
                </div>
                
                <div className="bg-orange-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-orange-900 mb-3">General Wellness & Balance</h3>
                  <p className="text-orange-800 text-sm">
                    Many people report feeling lighter, less bloated, and more energetic with consistent intake. 
                    It can encourage drinking more water overall, which itself is a big health win.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Cellular Function */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Cellular Function Benefits</h2>
            <div className="space-y-6 text-gray-700">
              <p className="text-lg">
                Proper hydration is essential for optimal cellular function, and ionized water provides enhanced hydration 
                at the cellular level.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-900 mb-3">Nutrient Transport</h3>
                  <p className="text-green-800 text-sm">
                    Better hydration facilitates the transport of nutrients and oxygen to cells throughout the body.
                  </p>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3">Waste Removal</h3>
                  <p className="text-blue-800 text-sm">
                    Enhanced hydration helps flush toxins and metabolic waste from cells more efficiently.
                  </p>
                </div>
                
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-purple-900 mb-3">Energy Production</h3>
                  <p className="text-purple-800 text-sm">
                    Proper cellular hydration supports mitochondrial function and energy production processes.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Comparison with Regular Water */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Ionized Water vs Regular Water</h2>
            <div className="space-y-6 text-gray-700">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-red-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-red-900 mb-3">Regular Water</h3>
                  <ul className="space-y-2 text-red-800">
                    <li>• Large molecular clusters (140+ molecules)</li>
                    <li>• Difficult to penetrate cell membranes</li>
                    <li>• Slower absorption rate</li>
                    <li>• May not hydrate cells effectively</li>
                    <li>• Neutral pH (7.0)</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-900 mb-3">Ionized Water</h3>
                  <ul className="space-y-2 text-green-800">
                    <li>• Micro-clustered molecules (2-6 molecules)</li>
                    <li>• Easy penetration through cell membranes</li>
                    <li>• Faster absorption rate</li>
                    <li>• Superior cellular hydration</li>
                    <li>• Alkaline pH (8-10)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


