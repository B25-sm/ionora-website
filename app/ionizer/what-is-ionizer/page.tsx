import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Settings, Droplets, Zap } from 'lucide-react';

export default function WhatIsIonizerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/ionizer" 
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Ionizer
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
            <Settings className="h-10 w-10 text-blue-600" />
            What is an Ionizer?
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Understanding water ionizer machines and their technology
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          {/* What is an Ionizer */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">What is a Water Ionizer?</h2>
            <div className="space-y-6 text-gray-700">
              <p className="text-lg">
                A <strong>water ionizer</strong> is an electrical device that uses electrolysis to separate tap water into two distinct streams: 
                alkaline ionized water and acidic ionized water. This process transforms ordinary tap water into powerful, 
                health-promoting water with unique properties.
              </p>
              
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-900 mb-4">Key Components:</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-2">Electrodes</h4>
                    <p className="text-blue-700">Platinum-coated titanium plates that conduct electricity</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-2">Electrolyzer Chamber</h4>
                    <p className="text-blue-700">Where the electrolysis process occurs</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-2">Pre-filtration System</h4>
                    <p className="text-blue-700">Removes contaminants while preserving minerals</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-2">Control Panel</h4>
                    <p className="text-blue-700">Allows adjustment of pH and ORP levels</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* The Ionization Process */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Zap className="h-8 w-8 text-green-600" />
              The Ionization Process
            </h2>
            <div className="space-y-6 text-gray-700">
              <p className="text-lg">
                The ionization process involves several stages that transform tap water into ionized water with enhanced properties.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-green-50 p-6 rounded-lg text-center">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-green-600">1</span>
                  </div>
                  <h3 className="text-lg font-semibold text-green-900 mb-3">Pre-Filtration</h3>
                  <p className="text-green-800 text-sm">
                    Multi-stage purification removes chlorine, VOCs, and heavy metals while retaining essential minerals
                  </p>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-lg text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-blue-600">2</span>
                  </div>
                  <h3 className="text-lg font-semibold text-blue-900 mb-3">Electrolysis</h3>
                  <p className="text-blue-800 text-sm">
                    Purified water passes through platinum-coated titanium electrodes with controlled DC current
                  </p>
                </div>
                
                <div className="bg-purple-50 p-6 rounded-lg text-center">
                  <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-purple-600">3</span>
                  </div>
                  <h3 className="text-lg font-semibold text-purple-900 mb-3">Separation</h3>
                  <p className="text-purple-800 text-sm">
                    Water divides into two streams: alkaline (cathodic) and acidic (anodic) with different properties
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Two Water Streams */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Droplets className="h-8 w-8 text-blue-600" />
              Two Distinct Water Streams
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-900 mb-4">Alkaline Ionized Water (Cathode -)</h3>
                <div className="space-y-3 text-blue-800">
                  <p><strong>pH:</strong> 8-10 (alkaline)</p>
                  <p><strong>ORP:</strong> Negative (-200 to -800 mV)</p>
                  <p><strong>Properties:</strong> Antioxidant-rich, mineral-rich</p>
                  <p><strong>Contains:</strong> Molecular hydrogen (H₂), OH⁻ ions, alkaline minerals</p>
                  <p><strong>Benefits:</strong> Hydration, detoxification, antioxidant protection</p>
                </div>
              </div>
              
              <div className="bg-red-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-red-900 mb-4">Acidic Ionized Water (Anode +)</h3>
                <div className="space-y-3 text-red-800">
                  <p><strong>pH:</strong> 4-6 (acidic)</p>
                  <p><strong>ORP:</strong> Positive (+200 to +800 mV)</p>
                  <p><strong>Properties:</strong> Oxidizing, disinfectant</p>
                  <p><strong>Contains:</strong> Oxygen gas (O₂), H⁺ ions, acid-forming minerals</p>
                  <p><strong>Uses:</strong> Cleaning, disinfection, skin care</p>
                </div>
              </div>
            </div>
          </div>

          {/* Types of Ionizers */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Types of Water Ionizers</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Countertop Models</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Compact units that sit on your kitchen counter, perfect for home use
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Easy installation</li>
                  <li>• Space-efficient</li>
                  <li>• Multiple pH levels</li>
                </ul>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Under-Counter Models</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Built-in units installed under the kitchen sink for a clean look
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Hidden installation</li>
                  <li>• More capacity</li>
                  <li>• Professional appearance</li>
                </ul>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Portable Models</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Compact, battery-powered units for travel and office use
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Portable design</li>
                  <li>• Battery powered</li>
                  <li>• Travel-friendly</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


