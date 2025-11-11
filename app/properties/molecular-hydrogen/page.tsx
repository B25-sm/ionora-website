import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Zap, Shield, Atom } from 'lucide-react';

export default function MolecularHydrogenPage() {
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
            <Zap className="h-10 w-10 text-green-600" />
            Molecular Hydrogen (H₂)
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            The powerful antioxidant gas that makes ionized water so beneficial for health
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          {/* What is Molecular Hydrogen */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">What is Molecular Hydrogen?</h2>
            <div className="space-y-6 text-gray-700">
              <p className="text-lg">
                <strong>Molecular Hydrogen (H₂)</strong> is a colorless, odorless gas that acts as a selective antioxidant. 
                It&apos;s generated during the water ionization process and is one of the most powerful and beneficial components of ionized water.
              </p>
              
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-green-900 mb-4">Key Characteristics:</h3>
                <div className="grid md:grid-cols-2 gap-4 text-green-800">
                  <div>
                    <p><strong>Chemical Formula:</strong> H₂</p>
                    <p><strong>State:</strong> Gas at room temperature</p>
                    <p><strong>Solubility:</strong> Dissolves in water</p>
                  </div>
                  <div>
                    <p><strong>Antioxidant Type:</strong> Selective</p>
                    <p><strong>Target:</strong> Harmful free radicals</p>
                    <p><strong>Safety:</strong> Non-toxic, natural</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* How H₂ is Generated */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Atom className="h-8 w-8 text-blue-600" />
              How H₂ is Generated in Ionized Water
            </h2>
            <div className="space-y-6 text-gray-700">
              <p className="text-lg">
                Molecular hydrogen is produced at the cathode (negative electrode) during the electrolysis process in water ionizers.
              </p>
              
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-900 mb-4">Chemical Reaction:</h3>
                <div className="bg-white p-4 rounded border-2 border-blue-200 text-center mb-4">
                  <code className="text-lg font-mono">2H₂O + 2e⁻ → H₂(g) + 2OH⁻</code>
                </div>
                <div className="space-y-2 text-blue-800">
                  <p><strong>Process:</strong> Water molecules gain electrons at the cathode</p>
                  <p><strong>Result:</strong> Hydrogen gas (H₂) bubbles form and dissolve in the water</p>
                  <p><strong>Location:</strong> Alkaline stream of ionized water</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-900 mb-3">In the Alkaline Stream:</h3>
                  <ul className="space-y-2 text-green-800">
                    <li>• H₂ gas is generated and dissolved</li>
                    <li>• Creates antioxidant-rich water</li>
                    <li>• Provides selective antioxidant benefits</li>
                    <li>• Safe for consumption</li>
                  </ul>
                </div>
                
                <div className="bg-red-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-red-900 mb-3">In the Acidic Stream:</h3>
                  <ul className="space-y-2 text-red-800">
                    <li>• O₂ gas is generated instead</li>
                    <li>• Creates oxidizing water</li>
                    <li>• Used for cleaning and disinfection</li>
                    <li>• Not for consumption</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* How H₂ Works as an Antioxidant */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Shield className="h-8 w-8 text-purple-600" />
              How H₂ Works as an Antioxidant
            </h2>
            <div className="space-y-6 text-gray-700">
              <p className="text-lg">
                Molecular hydrogen is unique because it&apos;s a <strong>selective antioxidant</strong> that targets only the most harmful 
                free radicals while preserving beneficial reactive oxygen species needed for normal cellular function.
              </p>
              
              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-purple-900 mb-4">The Antioxidant Mechanism:</h3>
                <div className="space-y-4 text-purple-800">
                  <p><strong>H₂ donates electrons to hydroxyl radicals (•OH)</strong> and converts them into harmless water:</p>
                  <div className="bg-white p-4 rounded border-2 border-purple-200 text-center">
                    <code className="text-lg font-mono">H₂ + 2•OH → 2H₂O</code>
                  </div>
                  <p>This reaction reduces oxidative stress without disturbing other necessary ROS used in cell signaling.</p>
                </div>
              </div>

              <div className="bg-yellow-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-yellow-900 mb-4">Selective Targeting:</h3>
                <div className="space-y-3 text-yellow-800">
                  <p><strong>H₂ selectively neutralizes harmful reactive oxygen species (ROS), especially:</strong></p>
                  <ul className="space-y-2 ml-4">
                    <li>• Hydroxyl radical (•OH) — one of the most damaging ROS</li>
                    <li>• Peroxynitrite (ONOO⁻) — highly reactive nitrogen species</li>
                    <li>• Other harmful free radicals</li>
                  </ul>
                  <p><strong>H₂ preserves beneficial ROS needed for:</strong></p>
                  <ul className="space-y-2 ml-4">
                    <li>• Cell signaling pathways</li>
                    <li>• Immune system function</li>
                    <li>• Normal cellular processes</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Health Benefits */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Health Benefits of Molecular Hydrogen</h2>
            <div className="space-y-6 text-gray-700">
              <p className="text-lg">
                Molecular hydrogen has been extensively studied and shown to provide numerous health benefits through its 
                selective antioxidant properties.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-green-900 mb-2">Reduces Oxidative Stress</h3>
                    <p className="text-green-800 text-sm">A major factor in aging and chronic diseases</p>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-900 mb-2">Protects Cellular Components</h3>
                    <p className="text-blue-800 text-sm">DNA, proteins, and lipids from oxidative damage</p>
                  </div>
                  
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-purple-900 mb-2">Anti-Inflammatory Effects</h3>
                    <p className="text-purple-800 text-sm">Reduces inflammation throughout the body</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-orange-900 mb-2">Neuroprotective Properties</h3>
                    <p className="text-orange-800 text-sm">May help protect against neurodegenerative diseases</p>
                  </div>
                  
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-red-900 mb-2">Cardiovascular Support</h3>
                    <p className="text-red-800 text-sm">May improve blood flow and circulation</p>
                  </div>
                  
                  <div className="bg-pink-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-pink-900 mb-2">Metabolic Benefits</h3>
                    <p className="text-pink-800 text-sm">May support healthy metabolism and energy production</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Safety and Research */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Safety and Research</h2>
            <div className="space-y-6 text-gray-700">
              <p className="text-lg">
                Molecular hydrogen is completely safe for consumption and has been extensively researched for its health benefits.
              </p>
              
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-green-900 mb-4">Safety Profile:</h3>
                <ul className="space-y-2 text-green-800">
                  <li>• <strong>Non-toxic:</strong> H₂ is naturally produced in the body and is completely safe</li>
                  <li>• <strong>No side effects:</strong> No known adverse effects from H₂ consumption</li>
                  <li>• <strong>Natural:</strong> Found in natural spring water and produced by gut bacteria</li>
                  <li>• <strong>Selective:</strong> Only targets harmful free radicals, preserving beneficial ones</li>
                </ul>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-900 mb-4">Research Status:</h3>
                <div className="space-y-3 text-blue-800">
                  <p>Molecular hydrogen has been the subject of over 1,000 scientific studies, with research showing:</p>
                  <ul className="space-y-2 ml-4">
                    <li>• Potent antioxidant and anti-inflammatory effects</li>
                    <li>• Neuroprotective and cardioprotective properties</li>
                    <li>• Potential benefits for metabolic syndrome and diabetes</li>
                    <li>• Protective effects against radiation damage</li>
                    <li>• Anti-aging and longevity benefits</li>
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


