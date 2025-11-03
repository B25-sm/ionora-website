import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Zap, Shield } from 'lucide-react';

export default function OrpPage() {
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
            <Zap className="h-10 w-10 text-blue-600" />
            What is ORP?
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Understanding Oxidation-Reduction Potential and its role in antioxidant properties
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">ORP Definition</h2>
            <div className="space-y-6 text-gray-700">
              <p className="text-lg">
                <strong>Oxidation-Reduction Potential (ORP)</strong> measures the ability of water to oxidize or reduce molecules around it, 
                or in other words, its potential to steal or donate electrons.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-red-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-red-900 mb-4">Positive ORP (+)</h3>
                  <div className="space-y-3 text-red-800">
                    <p><strong>Higher positive ORP</strong> indicates greater ability to oxidize</p>
                    <p>Acts as a <strong>pro-oxidant</strong></p>
                    <p>Steals electrons from other molecules</p>
                    <p>Can cause cellular damage</p>
                  </div>
                </div>
                
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-green-900 mb-4">Negative ORP (-)</h3>
                  <div className="space-y-3 text-green-800">
                    <p><strong>Lower negative ORP</strong> indicates greater ability to reduce</p>
                    <p>Acts as an <strong>antioxidant</strong></p>
                    <p>Donates electrons to other molecules</p>
                    <p>Protects against cellular damage</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-900 mb-4">Key ORP Facts:</h3>
                <ul className="space-y-2 text-blue-800">
                  <li>• Alkaline water must contain alkaline minerals and negative ORP</li>
                  <li>• ORP is the ability of water to act as a pro- or antioxidant</li>
                  <li>• The more negative the ORP value, the more anti-oxidizing it is</li>
                  <li>• Ionized water typically has negative ORP values (-200 to -800 mV)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* H2 Gas Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Shield className="h-8 w-8 text-green-600" />
              H₂ Gas in Ionized Water
            </h2>
            <div className="space-y-6 text-gray-700">
              <p className="text-lg">
                Alkaline Ionizers generate H₂ gas in the alkaline stream, which provides powerful antioxidant benefits.
              </p>
              
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-green-900 mb-4">How H₂ Works as an Antioxidant:</h3>
                <div className="space-y-4 text-green-800">
                  <p>
                    <strong>H₂ donates electrons to hydroxyl radicals (•OH)</strong> and converts them into harmless water:
                  </p>
                  <div className="bg-white p-4 rounded border-2 border-green-200 text-center">
                    <code className="text-lg font-mono">H₂ + 2•OH → 2H₂O</code>
                  </div>
                  <p>This reduces oxidative stress without disturbing other necessary ROS (used in cell signaling).</p>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-900 mb-4">Selective Antioxidant Properties:</h3>
                <ul className="space-y-2 text-blue-800">
                  <li>• <strong>Selective neutralization:</strong> H₂ selectively neutralizes harmful reactive oxygen species (ROS)</li>
                  <li>• <strong>Targets hydroxyl radicals:</strong> Especially the hydroxyl radical (•OH) — one of the most damaging ROS</li>
                  <li>• <strong>Preserves beneficial ROS:</strong> Doesn't disturb useful ROS needed for cell signaling</li>
                  <li>• <strong>Reduces oxidative stress:</strong> A major factor in aging and chronic diseases</li>
                  <li>• <strong>Protects cellular components:</strong> DNA, proteins, and lipids from oxidative damage</li>
                </ul>
              </div>
            </div>
          </div>

          {/* ORP in Ionized Water */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">ORP in Ionized Water</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-900 mb-4">Alkaline Ionized Water</h3>
                <div className="space-y-3 text-blue-800">
                  <p><strong>ORP Range:</strong> -200 to -800 mV</p>
                  <p><strong>Properties:</strong> Strong antioxidant capacity</p>
                  <p><strong>Benefits:</strong> Neutralizes free radicals, reduces oxidative stress</p>
                  <p><strong>Contains:</strong> Molecular hydrogen (H₂) and negative ORP</p>
                </div>
              </div>
              
              <div className="bg-red-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-red-900 mb-4">Acidic Ionized Water</h3>
                <div className="space-y-3 text-red-800">
                  <p><strong>ORP Range:</strong> +200 to +800 mV</p>
                  <p><strong>Properties:</strong> Oxidizing capacity</p>
                  <p><strong>Uses:</strong> Cleaning, disinfection, sterilization</p>
                  <p><strong>Contains:</strong> Oxygen gas (O₂) and positive ORP</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


