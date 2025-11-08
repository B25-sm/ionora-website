import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Shield, Zap, Heart } from 'lucide-react';

export default function AntiOxidationPage() {
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
            <Shield className="h-10 w-10 text-purple-600" />
            Anti-Oxidation
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Understanding oxidation, oxidative stress, and how ionized water provides powerful antioxidant protection
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          {/* What is Oxidation */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="grid lg:grid-cols-[1.05fr,0.95fr] gap-6 lg:gap-10 items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">What is Oxidation?</h2>
                <div className="space-y-6 text-gray-700">
                  <p className="text-lg">
                    <strong>Oxidation</strong> means loss of electrons. In the human body, oxidation is a normal and essential 
                    chemical process where molecules lose electrons. It's part of how we generate energy from food — but when 
                    uncontrolled, it can become harmful.
                  </p>
                  
                  <div className="bg-red-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-red-900 mb-4">Oxidation in the Human Body:</h3>
                    <div className="space-y-3 text-red-800">
                      <p><strong>Normal Process:</strong> Essential for energy production and cellular function</p>
                      <p><strong>Uncontrolled Oxidation:</strong> Can cause cellular damage and disease</p>
                      <p><strong>Involves:</strong> Oxygen reacting with other substances to form free radicals</p>
                      <p><strong>Result:</strong> Reactive Oxygen Species (ROS) that can damage cells</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-green-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-green-900 mb-3">Normal Oxidation (Good)</h3>
                      <ul className="space-y-2 text-green-800">
                        <li>• Energy production from food</li>
                        <li>• Immune system function</li>
                        <li>• Cell signaling</li>
                        <li>• Detoxification processes</li>
                      </ul>
                    </div>
                    
                    <div className="bg-orange-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-orange-900 mb-3">Excessive Oxidation (Bad)</h3>
                      <ul className="space-y-2 text-orange-800">
                        <li>• DNA damage and mutations</li>
                        <li>• Cell membrane damage</li>
                        <li>• Protein dysfunction</li>
                        <li>• Accelerated aging</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/Ionized water images/oxidation.jpeg"
                  alt="Visualization of oxidation and reactive oxygen species"
                  width={960}
                  height={720}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Oxidative Stress */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Zap className="h-8 w-8 text-red-600" />
              Oxidative Stress
            </h2>
            <div className="space-y-6 text-gray-700">
              <p className="text-lg">
                <strong>Oxidative stress</strong> occurs when the production of ROS exceeds the body's ability to neutralize 
                them using antioxidants (like glutathione, vitamin C, etc.).
              </p>
              
              <div className="bg-red-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-red-900 mb-4">Damages Caused by Oxidative Stress:</h3>
                <div className="grid md:grid-cols-2 gap-4 text-red-800">
                  <div>
                    <ul className="space-y-2">
                      <li>• DNA mutations (linked to cancer)</li>
                      <li>• Cell membrane damage</li>
                      <li>• Protein dysfunction</li>
                    </ul>
                  </div>
                  <div>
                    <ul className="space-y-2">
                      <li>• Accelerated aging</li>
                      <li>• Inflammation</li>
                      <li>• Cellular death</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-orange-900 mb-4">Diseases Linked to Oxidative Stress:</h3>
                <div className="grid md:grid-cols-2 gap-4 text-orange-800">
                  <div>
                    <ul className="space-y-2">
                      <li>• Cardiovascular disease</li>
                      <li>• Diabetes</li>
                      <li>• Neurodegenerative diseases</li>
                    </ul>
                  </div>
                  <div>
                    <ul className="space-y-2">
                      <li>• Alzheimer's, Parkinson's</li>
                      <li>• Cancer</li>
                      <li>• Autoimmune conditions</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Antioxidants */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Shield className="h-8 w-8 text-green-600" />
              Antioxidants
            </h2>
            <div className="space-y-6 text-gray-700">
              <p className="text-lg">
                <strong>Antioxidants</strong> are substances that neutralize free radicals by donating electrons, 
                preventing damage to cells, DNA, and tissues, and helping the body reduce oxidative stress.
              </p>
              
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-green-900 mb-4">Examples of Antioxidants:</h3>
                <div className="grid md:grid-cols-2 gap-6 text-green-800">
                  <div>
                    <h4 className="font-semibold mb-2">Vitamins:</h4>
                    <ul className="space-y-1">
                      <li>• Vitamin C</li>
                      <li>• Vitamin E</li>
                    </ul>
                    
                    <h4 className="font-semibold mb-2 mt-4">Minerals:</h4>
                    <ul className="space-y-1">
                      <li>• Selenium</li>
                      <li>• Zinc</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Enzymes:</h4>
                    <ul className="space-y-1">
                      <li>• Glutathione</li>
                      <li>• Catalase</li>
                    </ul>
                    
                    <h4 className="font-semibold mb-2 mt-4">Gases:</h4>
                    <ul className="space-y-1">
                      <li>• Molecular Hydrogen (H₂)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Ionized Water as Antioxidant */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Ionized Water as a Powerful Antioxidant</h2>
            <div className="space-y-6 text-gray-700">
              <p className="text-lg">
                Water ionizers produce antioxidant-rich water during the ionization process. The molecular hydrogen (H₂) 
                acts as a selective antioxidant that neutralizes harmful free radicals like hydroxyl radicals (•OH).
              </p>
              
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-900 mb-4">The Antioxidant Reaction:</h3>
                <div className="space-y-4 text-blue-800">
                  <p>H₂ neutralizes harmful free radicals by converting them into harmless water:</p>
                  <div className="bg-white p-4 rounded border-2 border-blue-200 text-center">
                    <code className="text-lg font-mono">H₂ + 2•OH → 2H₂O</code>
                  </div>
                  <p>This process reduces oxidative stress without disturbing other necessary ROS used in cell signaling.</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-900 mb-3">Benefits of Ionized Water Antioxidants:</h3>
                  <ul className="space-y-2 text-green-800">
                    <li>• Selective targeting of harmful free radicals</li>
                    <li>• Preserves beneficial ROS for normal function</li>
                    <li>• Reduces oxidative stress throughout the body</li>
                    <li>• Protects DNA, proteins, and cell membranes</li>
                    <li>• May help prevent chronic diseases</li>
                  </ul>
                </div>
                
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-purple-900 mb-3">Unique Properties:</h3>
                  <ul className="space-y-2 text-purple-800">
                    <li>• Molecular hydrogen is the smallest antioxidant</li>
                    <li>• Can penetrate cell membranes easily</li>
                    <li>• No known side effects or toxicity</li>
                    <li>• Works synergistically with other antioxidants</li>
                    <li>• Provides immediate antioxidant protection</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Health Benefits */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Heart className="h-8 w-8 text-red-600" />
              Health Benefits of Anti-Oxidation
            </h2>
            <div className="space-y-6 text-gray-700">
              <p className="text-lg">
                The antioxidant properties of ionized water provide numerous health benefits by reducing oxidative stress 
                and protecting against cellular damage.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-900 mb-3">Anti-Aging</h3>
                  <p className="text-green-800 text-sm">
                    Reduces oxidative damage that contributes to aging and helps maintain youthful cellular function.
                  </p>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3">Disease Prevention</h3>
                  <p className="text-blue-800 text-sm">
                    May help prevent chronic diseases linked to oxidative stress like cancer, diabetes, and heart disease.
                  </p>
                </div>
                
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-purple-900 mb-3">Immune Support</h3>
                  <p className="text-purple-800 text-sm">
                    Protects immune cells from oxidative damage and supports overall immune system function.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


