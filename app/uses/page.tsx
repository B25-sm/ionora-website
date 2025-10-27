import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Droplets, Leaf, Cpu, Scale } from 'lucide-react';

export default function UsesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Uses/Applications of Ionized Water</h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Discover the diverse applications of ionized water across various industries and sectors
          </p>
        </div>

        {/* Main Applications Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Link 
            href="/uses/food-livestock-agricultural" 
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all group"
          >
            <div className="flex items-center gap-3 mb-4">
              <Leaf className="h-8 w-8 text-green-600" />
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-green-600">Food, Livestock & Agricultural</h3>
            </div>
            <p className="text-gray-600">Electrolysis ionized water applications in agriculture, livestock, and food production</p>
          </Link>

          <Link 
            href="/uses/semiconductor-cleaning" 
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all group"
          >
            <div className="flex items-center gap-3 mb-4">
              <Cpu className="h-8 w-8 text-blue-600" />
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600">High-End Semiconductor Cleaning</h3>
            </div>
            <p className="text-gray-600">Ionized water for precision cleaning in semiconductor manufacturing</p>
          </Link>

          <Link 
            href="/uses/ro-vs-ionized" 
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all group"
          >
            <div className="flex items-center gap-3 mb-4">
              <Scale className="h-8 w-8 text-purple-600" />
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-purple-600">RO vs Ionized Water</h3>
            </div>
            <p className="text-gray-600">Understanding the differences between reverse osmosis and ionized water</p>
          </Link>
        </div>

        {/* General Applications */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">General Applications of Ionized Water</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">Alkaline Ionized Water Uses:</h3>
                <ul className="space-y-2 text-blue-800">
                  <li>• Drinking water for health benefits</li>
                  <li>• Cooking and food preparation</li>
                  <li>• Plant watering and agriculture</li>
                  <li>• Livestock hydration</li>
                  <li>• Aquaculture applications</li>
                </ul>
              </div>
              
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-green-900 mb-3">Acidic Ionized Water Uses:</h3>
                <ul className="space-y-2 text-green-800">
                  <li>• Surface cleaning and disinfection</li>
                  <li>• Skin care and hair rinse</li>
                  <li>• Food preservation</li>
                  <li>• Medical device sterilization</li>
                  <li>• Industrial cleaning applications</li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-purple-900 mb-3">Industrial Applications:</h3>
                <ul className="space-y-2 text-purple-800">
                  <li>• Semiconductor manufacturing</li>
                  <li>• Electronics cleaning</li>
                  <li>• Pharmaceutical production</li>
                  <li>• Food processing</li>
                  <li>• Water treatment systems</li>
                </ul>
              </div>
              
              <div className="bg-orange-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-orange-900 mb-3">Health & Wellness:</h3>
                <ul className="space-y-2 text-orange-800">
                  <li>• Hydration and detoxification</li>
                  <li>• Antioxidant protection</li>
                  <li>• pH balance support</li>
                  <li>• Anti-inflammatory effects</li>
                  <li>• Enhanced nutrient absorption</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Overview */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Benefits Across Applications</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-green-900 mb-3">Superior Cleaning</h3>
              <p className="text-green-800 text-sm">
                Ionized water provides effective cleaning and disinfection without harsh chemicals, making it ideal for various applications.
              </p>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">Health Benefits</h3>
              <p className="text-blue-800 text-sm">
                Alkaline ionized water offers antioxidant properties, better hydration, and pH balance support for improved health.
              </p>
            </div>
            
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-900 mb-3">Environmental Safety</h3>
              <p className="text-purple-800 text-sm">
                Chemical-free cleaning and treatment options that are safe for the environment and reduce chemical waste.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
