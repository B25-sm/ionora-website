import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Zap, AlertTriangle, Shield } from 'lucide-react';

export default function FreeRadicalsPage() {
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
            <Zap className="h-10 w-10 text-yellow-600" />
            Free Radicals
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Understanding free radicals, their sources, and how they affect human health
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          {/* What are Free Radicals */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">What are Free Radicals?</h2>
            <div className="space-y-6 text-gray-700">
              <p className="text-lg">
                <strong>Free radicals</strong> are unstable, highly reactive molecules with one or more unpaired electrons 
                in their outer shell. They are missing an electron and try to steal electrons from healthy cells — causing damage.
              </p>
              
              <div className="bg-red-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-red-900 mb-4">Examples of Free Radicals:</h3>
                <div className="grid md:grid-cols-3 gap-4 text-red-800">
                  <div>
                    <p><strong>Superoxide (O₂•⁻)</strong></p>
                    <p className="text-sm">Common oxygen radical</p>
                  </div>
                  <div>
                    <p><strong>Hydroxyl radical (•OH)</strong></p>
                    <p className="text-sm">Extremely damaging</p>
                  </div>
                  <div>
                    <p><strong>Hydrogen peroxide (H₂O₂)</strong></p>
                    <p className="text-sm">Reactive oxygen species</p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-yellow-900 mb-4">Why Free Radicals are Dangerous:</h3>
                <ul className="space-y-2 text-yellow-800">
                  <li>• <strong>Unstable:</strong> Missing electrons make them highly reactive</li>
                  <li>• <strong>Chain Reaction:</strong> Steal electrons from healthy molecules, creating more free radicals</li>
                  <li>• <strong>Cellular Damage:</strong> Attack DNA, proteins, and cell membranes</li>
                  <li>• <strong>Disease Link:</strong> Associated with aging, cancer, and chronic diseases</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Sources of Free Radicals */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-orange-600" />
              Sources of Free Radicals
            </h2>
            <div className="space-y-6 text-gray-700">
              <p className="text-lg">
                Free radicals come from both natural processes in the body and external environmental sources.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-green-900 mb-3">Naturally Produced During Normal Cellular Processes:</h3>
                    <ul className="space-y-2 text-green-800">
                      <li>• Metabolism</li>
                      <li>• Breathing</li>
                      <li>• Digestion</li>
                      <li>• Exercise</li>
                      <li>• Immune response</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-blue-900 mb-3">Environmental Toxins:</h3>
                    <ul className="space-y-2 text-blue-800">
                      <li>• Pollution</li>
                      <li>• Smoking</li>
                      <li>• UV radiation</li>
                      <li>• Radiation</li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-orange-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-orange-900 mb-3">Lifestyle Factors:</h3>
                    <ul className="space-y-2 text-orange-800">
                      <li>• Coffee & Energy drinks</li>
                      <li>• Alcohol Intake</li>
                      <li>• Poor Nutrition</li>
                      <li>• Stress</li>
                      <li>• Excessive Workload</li>
                      <li>• Smoking</li>
                      <li>• Infection/Illness</li>
                    </ul>
                  </div>
                  
                  <div className="bg-red-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-red-900 mb-3">Chemicals/Products:</h3>
                    <ul className="space-y-2 text-red-800">
                      <li>• Prescription & OTC medicines</li>
                      <li>• Processed & Junk Foods</li>
                      <li>• Environmental Toxins</li>
                      <li>• Road Dust, Fabric body creams</li>
                      <li>• Plastics, pesticides, paints</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Oxygen Free Radicals */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Oxygen Free Radicals</h2>
            <div className="space-y-6 text-gray-700">
              <p className="text-lg">
                <strong>Oxygen-free radicals</strong> are one of the most common types of free radicals. They are oxygen 
                atoms that are missing one or more electrons in their outer shell.
              </p>
              
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-900 mb-4">How Oxygen Free Radicals Work:</h3>
                <div className="space-y-3 text-blue-800">
                  <p><strong>Oxygen-free radicals cause oxidation</strong>, both in the air and in our bodies.</p>
                  <p><strong>Examples we can observe:</strong></p>
                  <ul className="space-y-2 ml-4">
                    <li>• A slice of apple that turns brown</li>
                    <li>• A piece of metal that rusts</li>
                    <li>• These are examples of oxidation in our daily lives</li>
                  </ul>
                </div>
              </div>

              <div className="bg-red-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-red-900 mb-4">Oxygen in the Human Body:</h3>
                <div className="space-y-3 text-red-800">
                  <p>
                    The oxygen we take into our lungs when we breathe is carried to every corner of our bodies and becomes 
                    a source of energy. However, as part of this process, <strong>'Oxygen radicals'</strong> are produced.
                  </p>
                  <p>
                    These oxygen radicals bond with unsaturated fatty acids to form lipid peroxides, which contribute to 
                    medical problems such as:
                  </p>
                  <ul className="space-y-1 ml-4">
                    <li>• Aging</li>
                    <li>• Cancer</li>
                    <li>• Hardening of the arteries</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* How Free Radicals Affect Health */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">How Free Radicals Affect Human Health</h2>
            <div className="space-y-6 text-gray-700">
              <p className="text-lg">
                Free radicals cause damage through a process called oxidative stress, leading to cellular damage and disease.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-red-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-red-900 mb-3">Direct Cellular Damage:</h3>
                  <ul className="space-y-2 text-red-800">
                    <li>• <strong>DNA Damage:</strong> Mutations that can lead to cancer</li>
                    <li>• <strong>Protein Damage:</strong> Disruption of enzyme function</li>
                    <li>• <strong>Cell Membrane Damage:</strong> Loss of cellular integrity</li>
                    <li>• <strong>Mitochondrial Damage:</strong> Impaired energy production</li>
                  </ul>
                </div>
                
                <div className="bg-orange-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-orange-900 mb-3">Disease Development:</h3>
                  <ul className="space-y-2 text-orange-800">
                    <li>• <strong>Aging:</strong> Accelerated cellular aging</li>
                    <li>• <strong>Inflammation:</strong> Chronic inflammatory conditions</li>
                    <li>• <strong>Cardiovascular Disease:</strong> Arterial damage</li>
                    <li>• <strong>Neurodegenerative Diseases:</strong> Brain cell damage</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Protection Against Free Radicals */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Shield className="h-8 w-8 text-green-600" />
              Protection Against Free Radicals
            </h2>
            <div className="space-y-6 text-gray-700">
              <p className="text-lg">
                The body has natural antioxidant systems, but we can enhance protection through diet, lifestyle, and ionized water.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-900 mb-3">Natural Protection:</h3>
                  <ul className="space-y-2 text-green-800">
                    <li>• <strong>Antioxidant Enzymes:</strong> Glutathione, catalase, superoxide dismutase</li>
                    <li>• <strong>Dietary Antioxidants:</strong> Vitamins C, E, beta-carotene</li>
                    <li>• <strong>Lifestyle:</strong> Regular exercise, stress management</li>
                    <li>• <strong>Healthy Diet:</strong> Fruits, vegetables, whole grains</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3">Ionized Water Benefits:</h3>
                  <ul className="space-y-2 text-blue-800">
                    <li>• <strong>Molecular Hydrogen (H₂):</strong> Selective antioxidant</li>
                    <li>• <strong>Negative ORP:</strong> Antioxidant potential</li>
                    <li>• <strong>Targets Harmful ROS:</strong> Hydroxyl radicals specifically</li>
                    <li>• <strong>Preserves Beneficial ROS:</strong> Maintains normal function</li>
                  </ul>
                </div>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-purple-900 mb-4">How Ionized Water Protects:</h3>
                <div className="space-y-3 text-purple-800">
                  <p><strong>Molecular hydrogen (H₂) in ionized water:</strong></p>
                  <ul className="space-y-2 ml-4">
                    <li>• Selectively neutralizes harmful free radicals like hydroxyl radicals (•OH)</li>
                    <li>• Converts them into harmless water: H₂ + 2•OH → 2H₂O</li>
                    <li>• Reduces oxidative stress without disturbing useful ROS</li>
                    <li>• Protects DNA, proteins, and lipids from oxidative damage</li>
                    <li>• May help prevent aging and chronic diseases</li>
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
