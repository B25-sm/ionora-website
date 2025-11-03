import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Heart, Activity } from 'lucide-react';

export default function AlkalinizationPage() {
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
            <Heart className="h-10 w-10 text-red-600" />
            Alkalinization
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            How higher pH helps balance body acidity and supports optimal health
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          {/* What is Alkalinization */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">What is Alkalinization?</h2>
            <div className="space-y-6 text-gray-700">
              <p className="text-lg">
                <strong>Alkalinization</strong> refers to the process of increasing the pH level of water, making it more alkaline. 
                Ionized water typically has a pH of 8-10, which helps balance the body's acid-base levels and supports optimal health.
              </p>
              
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-900 mb-4">pH Scale in Ionized Water:</h3>
                <div className="space-y-3 text-blue-800">
                  <p><strong>Alkaline Ionized Water:</strong> pH 8-10 (alkaline)</p>
                  <p><strong>Neutral Water:</strong> pH 7 (neutral)</p>
                  <p><strong>Acidic Water:</strong> pH 4-6 (acidic)</p>
                  <p><strong>Body's Optimal pH:</strong> Slightly alkaline (7.35-7.45)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Health Benefits */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Activity className="h-8 w-8 text-green-600" />
              Health Benefits of Alkalinization
            </h2>
            <div className="space-y-6 text-gray-700">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-900 mb-3">Neutralizes Excess Acidity</h3>
                  <p className="text-green-800 text-sm">
                    With a higher pH (8-10), alkaline water may help balance excess acid from diet (spicy foods, soda, junk food) 
                    and supports people prone to acid reflux or acidity issues.
                  </p>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3">May Reduce Acid Reflux Symptoms</h3>
                  <p className="text-blue-800 text-sm">
                    Some studies suggest alkaline water can deactivate pepsin, the enzyme that triggers acid reflux, 
                    providing relief from heartburn.
                  </p>
                </div>
                
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-purple-900 mb-3">Bone Health Support</h3>
                  <p className="text-purple-800 text-sm">
                    Some early evidence suggests alkaline water may help reduce calcium loss from bones, 
                    potentially supporting bone density over time.
                  </p>
                </div>
                
                <div className="bg-orange-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-orange-900 mb-3">Acid-Base Balance</h3>
                  <p className="text-orange-800 text-sm">
                    Higher pH helps water flow via aquaporins and protects bone minerals from excess acid, 
                    supporting overall body balance.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">How Alkalinization Works</h2>
            <div className="space-y-6 text-gray-700">
              <p className="text-lg">
                The alkalinization process in water ionizers occurs at the cathode (negative electrode) during electrolysis.
              </p>
              
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-green-900 mb-4">The Process:</h3>
                <div className="space-y-3 text-green-800">
                  <p><strong>1. Electrolysis:</strong> Water passes through platinum-coated titanium electrodes</p>
                  <p><strong>2. Cathode Reaction:</strong> Water is reduced, gaining electrons</p>
                  <p><strong>3. Hydroxide Formation:</strong> OH⁻ ions are created, making water alkaline</p>
                  <p><strong>4. Mineral Attraction:</strong> Alkaline minerals (Ca²⁺, Mg²⁺, K⁺, Na⁺) are attracted to the cathode</p>
                  <p><strong>5. Result:</strong> Alkaline ionized water with pH 8-10</p>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-900 mb-4">Chemical Reaction:</h3>
                <div className="bg-white p-4 rounded border-2 border-blue-200 text-center">
                  <code className="text-lg font-mono">2H₂O + 2e⁻ → H₂(g) + 2OH⁻</code>
                </div>
                <p className="text-center text-blue-800 mt-2">Water + electrons → Hydrogen gas + Hydroxide ions</p>
              </div>
            </div>
          </div>

          {/* Body pH Balance */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Body pH Balance</h2>
            <div className="space-y-6 text-gray-700">
              <p className="text-lg">
                The human body maintains a delicate pH balance, and modern diets often create excess acidity that alkaline water can help neutralize.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-red-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-red-900 mb-3">Acid-Forming Foods:</h3>
                  <ul className="space-y-2 text-red-800">
                    <li>• Processed foods</li>
                    <li>• Meat and dairy products</li>
                    <li>• Refined sugars</li>
                    <li>• Coffee and alcohol</li>
                    <li>• Soft drinks</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-900 mb-3">Alkaline-Forming Foods:</h3>
                  <ul className="space-y-2 text-green-800">
                    <li>• Fresh fruits and vegetables</li>
                    <li>• Leafy greens</li>
                    <li>• Nuts and seeds</li>
                    <li>• Legumes</li>
                    <li>• Alkaline water</li>
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-yellow-900 mb-4">Optimal Body pH:</h3>
                <div className="space-y-3 text-yellow-800">
                  <p><strong>Blood pH:</strong> 7.35-7.45 (slightly alkaline)</p>
                  <p><strong>Urine pH:</strong> 6.0-7.5 (varies with diet)</p>
                  <p><strong>Stomach pH:</strong> 1.5-3.5 (very acidic for digestion)</p>
                  <p><strong>Small Intestine pH:</strong> 6.0-7.4 (slightly acidic to neutral)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Benefits */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Additional Benefits</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-green-900 mb-3">Better Hydration</h3>
                <p className="text-green-800 text-sm">
                  Higher pH helps water flow via aquaporins, leading to improved cellular hydration and function.
                </p>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">Mineral Absorption</h3>
                <p className="text-blue-800 text-sm">
                  Alkaline water contains bioavailable minerals like calcium and magnesium that are easily absorbed by the body.
                </p>
              </div>
              
              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-purple-900 mb-3">Energy & Metabolism</h3>
                <p className="text-purple-800 text-sm">
                  Better hydration and reduced acidity are linked with improved energy levels, stamina, and metabolism.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


