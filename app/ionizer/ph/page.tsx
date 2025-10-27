import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Activity } from 'lucide-react';

export default function PhPage() {
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
            <Activity className="h-10 w-10 text-blue-600" />
            What is pH?
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Understanding pH levels and their significance in water ionization
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">pH Definition</h2>
            <div className="space-y-6 text-gray-700">
              <p className="text-lg">
                <strong>pH</strong> means <em>potentiality of hydrogen</em>. The pH unit value represents the concentration of hydrogen ions in the water.
              </p>
              
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-900 mb-4">Key pH Concepts:</h3>
                <ul className="space-y-3 text-blue-800">
                  <li className="flex items-start gap-3">
                    <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">0-6</span>
                    <div>
                      <strong>Acidic solutions</strong> have higher concentrations of hydrogen (H⁺) ions and lower pH values
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-green-500 text-white px-2 py-1 rounded text-sm font-bold">7</span>
                    <div>
                      <strong>Neutral pH</strong> - water has an equal number of hydrogen ions (H⁺) and hydroxyl ions (OH⁻)
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm font-bold">8-14</span>
                    <div>
                      <strong>Alkaline solutions</strong> have lower concentrations of hydrogen ions and higher pH values
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-green-900 mb-4">pH Scale Mathematics:</h3>
                <div className="space-y-3 text-green-800">
                  <p>
                    At a pH of <strong>8</strong>, water has a <strong>tenfold greater</strong> concentration of OH⁻ ions than H⁺ ions.
                  </p>
                  <p>
                    At a pH of <strong>9</strong>, water has a <strong>hundredfold greater</strong> concentration of OH⁻ ions than H⁺ ions.
                  </p>
                  <p className="font-semibold">
                    Each pH unit represents a tenfold difference between hydrogen ion (H⁺) and hydroxyl ion (OH⁻) concentrations.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* pH in Ionized Water */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">pH in Ionized Water</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-900 mb-4">Alkaline Ionized Water</h3>
                <div className="space-y-3 text-blue-800">
                  <p><strong>pH Range:</strong> 8-10</p>
                  <p><strong>Properties:</strong> Higher concentration of OH⁻ ions</p>
                  <p><strong>Benefits:</strong> Antioxidant-rich, better hydration</p>
                  <p><strong>Source:</strong> Cathode (-) electrode stream</p>
                </div>
              </div>
              
              <div className="bg-red-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-red-900 mb-4">Acidic Ionized Water</h3>
                <div className="space-y-3 text-red-800">
                  <p><strong>pH Range:</strong> 4-6</p>
                  <p><strong>Properties:</strong> Higher concentration of H⁺ ions</p>
                  <p><strong>Uses:</strong> Cleaning, disinfection, skin care</p>
                  <p><strong>Source:</strong> Anode (+) electrode stream</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
