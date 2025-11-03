import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Scale, Droplets, Zap } from 'lucide-react';

export default function RoVsIonizedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/uses" 
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Uses
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
            <Scale className="h-10 w-10 text-purple-600" />
            Difference between RO and Ionized Water
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Understanding the key differences between reverse osmosis and ionized water systems
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          {/* Overview */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Overview</h2>
            <div className="space-y-6 text-gray-700">
              <p className="text-lg">
                Reverse Osmosis (RO) and Ionized Water are two different water treatment technologies that serve 
                different purposes and produce water with distinct properties.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3">Reverse Osmosis (RO)</h3>
                  <p className="text-blue-800 text-sm">
                    A filtration process that removes contaminants by forcing water through a semi-permeable membrane, 
                    producing clean, pure water.
                  </p>
                </div>
                
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-900 mb-3">Ionized Water</h3>
                  <p className="text-green-800 text-sm">
                    An electrolysis process that separates water into alkaline and acidic streams, 
                    producing water with enhanced properties and health benefits.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Process Comparison */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Process Comparison</h2>
            <div className="space-y-6 text-gray-700">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-red-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-red-900 mb-4">Reverse Osmosis Process</h3>
                  <div className="space-y-3 text-red-800">
                    <p><strong>1. Pre-filtration:</strong> Removes large particles and sediment</p>
                    <p><strong>2. Carbon filtration:</strong> Removes chlorine and organic compounds</p>
                    <p><strong>3. RO membrane:</strong> Removes dissolved solids and contaminants</p>
                    <p><strong>4. Post-filtration:</strong> Final polishing filter</p>
                    <p><strong>5. Storage:</strong> Clean water stored in tank</p>
                  </div>
                </div>
                
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-900 mb-4">Ionization Process</h3>
                  <div className="space-y-3 text-green-800">
                    <p><strong>1. Pre-filtration:</strong> Removes contaminants while preserving minerals</p>
                    <p><strong>2. Electrolysis:</strong> Water passes through charged electrodes</p>
                    <p><strong>3. Separation:</strong> Creates alkaline and acidic streams</p>
                    <p><strong>4. Collection:</strong> Two separate water outputs</p>
                    <p><strong>5. Immediate use:</strong> Best consumed fresh</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Water Properties */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Droplets className="h-8 w-8 text-blue-600" />
              Water Properties Comparison
            </h2>
            <div className="space-y-6 text-gray-700">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 px-4 py-2 text-left">Property</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Reverse Osmosis</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Ionized Water</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-semibold">pH Level</td>
                      <td className="border border-gray-300 px-4 py-2">Neutral (6.5-7.5)</td>
                      <td className="border border-gray-300 px-4 py-2">Alkaline (8-10) / Acidic (4-6)</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-semibold">ORP</td>
                      <td className="border border-gray-300 px-4 py-2">Neutral to positive</td>
                      <td className="border border-gray-300 px-4 py-2">Negative (alkaline) / Positive (acidic)</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-semibold">Mineral Content</td>
                      <td className="border border-gray-300 px-4 py-2">Very low (demineralized)</td>
                      <td className="border border-gray-300 px-4 py-2">Alkaline minerals (Ca, Mg, K, Na)</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-semibold">Molecular Structure</td>
                      <td className="border border-gray-300 px-4 py-2">Large clusters</td>
                      <td className="border border-gray-300 px-4 py-2">Micro-clustered molecules</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-semibold">Antioxidant Properties</td>
                      <td className="border border-gray-300 px-4 py-2">None</td>
                      <td className="border border-gray-300 px-4 py-2">High (molecular hydrogen)</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-semibold">Contaminant Removal</td>
                      <td className="border border-gray-300 px-4 py-2">Excellent</td>
                      <td className="border border-gray-300 px-4 py-2">Good (with pre-filtration)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Applications */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Applications</h2>
            <div className="space-y-6 text-gray-700">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3">Reverse Osmosis Uses</h3>
                  <ul className="space-y-2 text-blue-800">
                    <li>• Drinking water purification</li>
                    <li>• Aquarium water treatment</li>
                    <li>• Laboratory applications</li>
                    <li>• Industrial processes</li>
                    <li>• Medical device cleaning</li>
                    <li>• Pharmaceutical manufacturing</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-900 mb-3">Ionized Water Uses</h3>
                  <ul className="space-y-2 text-green-800">
                    <li>• Health and wellness drinking</li>
                    <li>• Cooking and food preparation</li>
                    <li>• Agriculture and irrigation</li>
                    <li>• Cleaning and disinfection</li>
                    <li>• Skin care and beauty</li>
                    <li>• Livestock hydration</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Advantages and Disadvantages */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Advantages and Disadvantages</h2>
            <div className="space-y-6 text-gray-700">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="bg-red-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-red-900 mb-3">Reverse Osmosis</h3>
                    <div className="space-y-3 text-red-800">
                      <div>
                        <p className="font-semibold text-green-700">Advantages:</p>
                        <ul className="ml-4 space-y-1">
                          <li>• Excellent contaminant removal</li>
                          <li>• Consistent water quality</li>
                          <li>• No chemical additives</li>
                          <li>• Long-term storage possible</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-red-700">Disadvantages:</p>
                        <ul className="ml-4 space-y-1">
                          <li>• Removes beneficial minerals</li>
                          <li>• Wastes significant water</li>
                          <li>• No health benefits</li>
                          <li>• Requires maintenance</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-green-900 mb-3">Ionized Water</h3>
                    <div className="space-y-3 text-green-800">
                      <div>
                        <p className="font-semibold text-green-700">Advantages:</p>
                        <ul className="ml-4 space-y-1">
                          <li>• Health and wellness benefits</li>
                          <li>• Antioxidant properties</li>
                          <li>• Better hydration</li>
                          <li>• Dual-purpose (alkaline/acidic)</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-red-700">Disadvantages:</p>
                        <ul className="ml-4 space-y-1">
                          <li>• Higher initial cost</li>
                          <li>• Requires electricity</li>
                          <li>• Best consumed fresh</li>
                          <li>• Limited contaminant removal</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Choosing the Right System */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Zap className="h-8 w-8 text-yellow-600" />
              Choosing the Right System
            </h2>
            <div className="space-y-6 text-gray-700">
              <p className="text-lg">
                The choice between RO and ionized water depends on your specific needs, water quality, and intended use.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3">Choose RO if you need:</h3>
                  <ul className="space-y-2 text-blue-800">
                    <li>• Maximum contaminant removal</li>
                    <li>• Pure, clean water</li>
                    <li>• Water storage capability</li>
                    <li>• Industrial applications</li>
                    <li>• Laboratory use</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-900 mb-3">Choose Ionized Water if you want:</h3>
                  <ul className="space-y-2 text-green-800">
                    <li>• Health and wellness benefits</li>
                    <li>• Antioxidant properties</li>
                    <li>• Better hydration</li>
                    <li>• Cooking and food prep</li>
                    <li>• Cleaning applications</li>
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


