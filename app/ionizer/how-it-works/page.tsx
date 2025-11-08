import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Zap, Beaker, Atom } from 'lucide-react';

export default function HowItWorksPage() {
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
            How Ionizer Works
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Detailed explanation of the electrolysis process and chemical reactions in water ionization
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          {/* The Science Behind Ionization */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Beaker className="h-8 w-8 text-green-600" />
              The Science Behind Ionization
            </h2>
            <div className="space-y-6 text-gray-700">
              <p className="text-lg">
                Water ionization occurs through <strong>electrolysis</strong>, a process where electrical energy causes chemical reactions 
                that separate water into its ionic components. This happens at two electrodes: the cathode (negative) and anode (positive).
              </p>
              
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-900 mb-4">Pre-Filtration Phase</h3>
                <div className="space-y-3 text-blue-800">
                  <p>Before electrolysis, tap water undergoes multi-stage purification:</p>
                  <ul className="space-y-2 ml-4">
                    <li>• Removal of chlorine, volatile organic compounds (VOCs), and heavy metals</li>
                    <li>• Retention of essential electrolytic minerals like calcium, magnesium, and potassium</li>
                    <li>• Preparation of clean water with the right mineral content for effective ionization</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Electrolysis Process */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Electrolysis Process</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Cathode Process */}
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-green-900 mb-4 flex items-center gap-2">
                  <Atom className="h-6 w-6" />
                  Cathode (-) - Alkaline Stream
                </h3>
                <div className="space-y-4 text-green-800">
                  <div className="rounded-lg overflow-hidden shadow-md">
                    <Image
                      src="/Ionized water images/Cathode electrode(Alkaline water).jpeg"
                      alt="Cathode electrode producing alkaline ionized water"
                      width={800}
                      height={600}
                      className="h-48 w-full object-cover"
                    />
                  </div>
                  <p><strong>Process:</strong> Water is reduced (gains electrons)</p>
                  <div className="bg-white p-4 rounded border-2 border-green-200 text-center">
                    <code className="text-lg font-mono">2H₂O + 2e⁻ → H₂(g) + 2OH⁻</code>
                  </div>
                  <div className="space-y-2">
                    <p><strong>Results:</strong></p>
                    <ul className="space-y-1 ml-4">
                      <li>• Hydrogen gas (H₂) forms bubbles</li>
                      <li>• Hydroxide ions (OH⁻) make water alkaline</li>
                      <li>• Higher pH (8-10)</li>
                      <li>• Negative ORP (antioxidant properties)</li>
                    </ul>
                  </div>
                  <div className="bg-green-100 p-3 rounded">
                    <p className="text-sm"><strong>Contains:</strong> Dissolved H₂ gas, OH⁻ ions, alkaline minerals (Ca²⁺, Mg²⁺)</p>
                  </div>
                </div>
              </div>

              {/* Anode Process */}
              <div className="bg-red-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-red-900 mb-4 flex items-center gap-2">
                  <Atom className="h-6 w-6" />
                  Anode (+) - Acidic Stream
                </h3>
                <div className="space-y-4 text-red-800">
                  <div className="rounded-lg overflow-hidden shadow-md">
                    <Image
                      src="/Ionized water images/Anode.jpeg"
                      alt="Anode electrode releasing oxygen bubbles"
                      width={800}
                      height={600}
                      className="h-48 w-full object-cover"
                    />
                  </div>
                  <p><strong>Process:</strong> Water is oxidized (loses electrons)</p>
                  <div className="bg-white p-4 rounded border-2 border-red-200 text-center">
                    <code className="text-lg font-mono">2H₂O → O₂(g) + 4H⁺ + 4e⁻</code>
                  </div>
                  <div className="space-y-2">
                    <p><strong>Results:</strong></p>
                    <ul className="space-y-1 ml-4">
                      <li>• Oxygen gas (O₂) forms bubbles</li>
                      <li>• Hydrogen ions (H⁺) make water acidic</li>
                      <li>• Lower pH (4-6)</li>
                      <li>• Positive ORP (oxidizing properties)</li>
                    </ul>
                  </div>
                  <div className="bg-red-100 p-3 rounded">
                    <p className="text-sm"><strong>Contains:</strong> H⁺ ions, O₂ gas, acid-forming minerals (Cl⁻, SO₄²⁻)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Chemical Reactions */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Detailed Chemical Reactions</h2>
            <div className="space-y-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">At the Cathode (Negative Electrode):</h3>
                <div className="space-y-3 text-blue-800">
                  <p>Water molecules gain electrons and are reduced:</p>
                  <div className="bg-white p-4 rounded border-2 border-blue-200 text-center">
                    <code className="text-lg font-mono">2H₂O + 2e⁻ → H₂(gas) + 2OH⁻</code>
                  </div>
                  <p>This creates:</p>
                  <ul className="space-y-1 ml-4">
                    <li>• <strong>Hydrogen gas (H₂):</strong> Forms bubbles, provides antioxidant benefits</li>
                    <li>• <strong>Hydroxide ions (OH⁻):</strong> Make the water alkaline (higher pH)</li>
                    <li>• <strong>Alkaline minerals:</strong> Ca²⁺, Mg²⁺, K⁺, Na⁺ are attracted to the cathode</li>
                  </ul>
                </div>
              </div>

              <div className="bg-orange-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-orange-900 mb-3">At the Anode (Positive Electrode):</h3>
                <div className="space-y-3 text-orange-800">
                  <p>Water molecules lose electrons and are oxidized:</p>
                  <div className="bg-white p-4 rounded border-2 border-orange-200 text-center">
                    <code className="text-lg font-mono">2H₂O → O₂(gas) + 4H⁺ + 4e⁻</code>
                  </div>
                  <p>This creates:</p>
                  <ul className="space-y-1 ml-4">
                    <li>• <strong>Oxygen gas (O₂):</strong> Forms bubbles, provides oxidizing properties</li>
                    <li>• <strong>Hydrogen ions (H⁺):</strong> Make the water acidic (lower pH)</li>
                    <li>• <strong>Acid-forming minerals:</strong> Cl⁻, SO₄²⁻, HCO₃⁻ are attracted to the anode</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Water Stream Properties */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Resulting Water Stream Properties</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-900 mb-4">Alkaline Ionized Water</h3>
                <div className="space-y-3 text-blue-800">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p><strong>pH:</strong> 8-10</p>
                      <p><strong>ORP:</strong> -200 to -800 mV</p>
                    </div>
                    <div>
                      <p><strong>H₂ Content:</strong> High</p>
                      <p><strong>Minerals:</strong> Alkaline</p>
                    </div>
                  </div>
                  <div className="bg-blue-100 p-3 rounded">
                    <p className="text-sm"><strong>Benefits:</strong> Antioxidant-rich, better hydration, detoxification support, bone health</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-red-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-red-900 mb-4">Acidic Ionized Water</h3>
                <div className="space-y-3 text-red-800">
                  <div className="grid grid-cols-2 gap-4">
                    <p><strong>pH:</strong> 4-6</p>
                    <p><strong>ORP:</strong> +200 to +800 mV</p>
                    <p><strong>O₂ Content:</strong> High</p>
                    <p><strong>Minerals:</strong> Acid-forming</p>
                  </div>
                  <div className="bg-red-100 p-3 rounded">
                    <p className="text-sm"><strong>Uses:</strong> Cleaning, disinfection, skin care, hair rinse, gardening</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


