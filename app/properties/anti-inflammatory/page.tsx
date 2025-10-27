import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Heart, Shield } from 'lucide-react';

export default function AntiInflammatoryPage() {
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
            <Heart className="h-10 w-10 text-pink-600" />
            Anti-Inflammatory
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Reduces inflammation and supports immune system function
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          {/* Anti-Inflammatory Properties */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Anti-Inflammatory Properties</h2>
            <div className="space-y-6 text-gray-700">
              <p className="text-lg">
                Ionized water contains molecular hydrogen (H₂) and other compounds that have been shown to have 
                anti-inflammatory effects, helping to reduce inflammation throughout the body.
              </p>
              
              <div className="bg-pink-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-pink-900 mb-4">How Ionized Water Reduces Inflammation:</h3>
                <div className="space-y-3 text-pink-800">
                  <p><strong>Molecular Hydrogen (H₂):</strong> Selective antioxidant that reduces oxidative stress</p>
                  <p><strong>Negative ORP:</strong> Antioxidant potential that neutralizes inflammatory free radicals</p>
                  <p><strong>Alkaline pH:</strong> Helps maintain optimal cellular pH balance</p>
                  <p><strong>Enhanced Hydration:</strong> Supports cellular function and waste removal</p>
                </div>
              </div>
            </div>
          </div>

          {/* Inflammation and Health */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Inflammation and Health</h2>
            <div className="space-y-6 text-gray-700">
              <p className="text-lg">
                Chronic inflammation is linked to many health conditions, and reducing inflammation can have 
                significant benefits for overall health and wellness.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-red-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-red-900 mb-3">Conditions Linked to Inflammation:</h3>
                  <ul className="space-y-2 text-red-800">
                    <li>• Cardiovascular disease</li>
                    <li>• Diabetes</li>
                    <li>• Arthritis</li>
                    <li>• Autoimmune disorders</li>
                    <li>• Neurodegenerative diseases</li>
                    <li>• Digestive issues</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-900 mb-3">Benefits of Reducing Inflammation:</h3>
                  <ul className="space-y-2 text-green-800">
                    <li>• Improved immune function</li>
                    <li>• Better joint health</li>
                    <li>• Enhanced cardiovascular health</li>
                    <li>• Reduced pain and discomfort</li>
                    <li>• Better overall wellness</li>
                    <li>• Slower aging process</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Molecular Hydrogen Effects */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Shield className="h-8 w-8 text-blue-600" />
              Molecular Hydrogen Anti-Inflammatory Effects
            </h2>
            <div className="space-y-6 text-gray-700">
              <p className="text-lg">
                Molecular hydrogen (H₂) in ionized water has been extensively studied for its anti-inflammatory properties 
                and ability to reduce oxidative stress.
              </p>
              
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-900 mb-4">Mechanisms of Action:</h3>
                <div className="space-y-3 text-blue-800">
                  <p><strong>Selective Antioxidant:</strong> Targets harmful free radicals that cause inflammation</p>
                  <p><strong>NF-κB Inhibition:</strong> Reduces activation of inflammatory pathways</p>
                  <p><strong>Cytokine Modulation:</strong> Helps balance pro-inflammatory and anti-inflammatory cytokines</p>
                  <p><strong>Cellular Protection:</strong> Protects cells from inflammatory damage</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-900 mb-3">Research Findings:</h3>
                  <ul className="space-y-2 text-green-800">
                    <li>• Reduces markers of inflammation</li>
                    <li>• Decreases oxidative stress</li>
                    <li>• Improves cellular function</li>
                    <li>• Supports immune system balance</li>
                  </ul>
                </div>
                
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-purple-900 mb-3">Safety Profile:</h3>
                  <ul className="space-y-2 text-purple-800">
                    <li>• No known side effects</li>
                    <li>• Natural and non-toxic</li>
                    <li>• Selective targeting</li>
                    <li>• Preserves beneficial processes</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Health Benefits */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Health Benefits</h2>
            <div className="space-y-6 text-gray-700">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-900 mb-3">Joint Health</h3>
                  <p className="text-green-800 text-sm">
                    May help reduce joint inflammation and support better joint function and mobility.
                  </p>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3">Cardiovascular Support</h3>
                  <p className="text-blue-800 text-sm">
                    Anti-inflammatory effects may help support cardiovascular health and reduce disease risk.
                  </p>
                </div>
                
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-purple-900 mb-3">Immune Function</h3>
                  <p className="text-purple-800 text-sm">
                    Helps balance immune system function and may reduce excessive inflammatory responses.
                  </p>
                </div>
                
                <div className="bg-orange-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-orange-900 mb-3">Digestive Health</h3>
                  <p className="text-orange-800 text-sm">
                    May help reduce digestive inflammation and support better gut health and function.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Usage Recommendations */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Usage Recommendations</h2>
            <div className="space-y-6 text-gray-700">
              <p className="text-lg">
                For optimal anti-inflammatory benefits, consider these usage recommendations for ionized water.
              </p>
              
              <div className="bg-yellow-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-yellow-900 mb-4">Best Practices:</h3>
                <div className="space-y-3 text-yellow-800">
                  <p><strong>Consistent Intake:</strong> Drink ionized water regularly throughout the day</p>
                  <p><strong>Fresh Water:</strong> Use water immediately after ionization for maximum H₂ content</p>
                  <p><strong>Proper pH:</strong> Use pH 8-9 for optimal anti-inflammatory benefits</p>
                  <p><strong>Combined Approach:</strong> Combine with anti-inflammatory diet and lifestyle</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
