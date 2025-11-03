import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Droplets, ArrowRight } from 'lucide-react';

export default function MicroClusterPage() {
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
            <Droplets className="h-10 w-10 text-blue-600" />
            Micro Cluster
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Understanding how ionization creates smaller water molecule clusters for better cellular absorption
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          {/* What are Micro Clusters */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">What are Micro Clusters?</h2>
            <div className="space-y-6 text-gray-700">
              <p className="text-lg">
                Water molecules naturally exist in clusters rather than as single molecules. The size of these clusters 
                significantly affects how well water can penetrate cell membranes and hydrate the body.
              </p>
              
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-900 mb-4">Water Molecule Structure</h3>
                <div className="space-y-3 text-blue-800">
                  <p>A water molecule (H₂O) consists of two hydrogen atoms and one oxygen atom.</p>
                  <p>Water exists in clusters of H₂O molecules, not as individual molecules.</p>
                  <p>These clusters can vary significantly in size, affecting their biological properties.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tap Water vs Ionized Water */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Tap Water vs Ionized Water Clusters</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-red-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-red-900 mb-4">Large Clusters in Tap Water</h3>
                <div className="space-y-4 text-red-800">
                  <p><strong>Size:</strong> Very large clusters of H₂O molecules — as large as 140 Herz</p>
                  <p><strong>Structure:</strong> Dense, tightly packed molecular clusters</p>
                  <p><strong>Penetration:</strong> Difficulty permeating body cell membranes</p>
                  <p><strong>Hydration:</strong> Hinders efficient hydration at the cellular level</p>
                </div>
                <div className="mt-4 bg-red-100 p-3 rounded">
                  <p className="text-sm font-semibold">Result: Less effective hydration despite drinking adequate water</p>
                </div>
              </div>
              
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-green-900 mb-4">Micro Clusters in Ionized Water</h3>
                <div className="space-y-4 text-green-800">
                  <p><strong>Size:</strong> Restructured down to tiny micro clusters (2-6 molecules)</p>
                  <p><strong>Structure:</strong> Smaller, more dispersed molecular clusters</p>
                  <p><strong>Penetration:</strong> Can effectively and quickly penetrate cell membranes</p>
                  <p><strong>Hydration:</strong> Super hydrates the body at the cellular level</p>
                </div>
                <div className="mt-4 bg-green-100 p-3 rounded">
                  <p className="text-sm font-semibold">Result: Superior hydration and cellular absorption</p>
                </div>
              </div>
            </div>
          </div>

          {/* The Ionization Process */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">How Ionization Creates Micro Clusters</h2>
            <div className="space-y-6 text-gray-700">
              <p className="text-lg">
                The ionization process breaks the electrical bonding of water molecules and restructures them into 
                smaller, more bioavailable clusters.
              </p>
              
              <div className="flex items-center justify-center my-8">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="bg-red-100 p-4 rounded-lg mb-2">
                      <p className="text-sm font-semibold text-red-800">Tap Water</p>
                      <p className="text-xs text-red-600">Large Clusters</p>
                    </div>
                  </div>
                  <ArrowRight className="h-6 w-6 text-gray-400" />
                  <div className="text-center">
                    <div className="bg-blue-100 p-4 rounded-lg mb-2">
                      <p className="text-sm font-semibold text-blue-800">Ionization</p>
                      <p className="text-xs text-blue-600">Process</p>
                    </div>
                  </div>
                  <ArrowRight className="h-6 w-6 text-gray-400" />
                  <div className="text-center">
                    <div className="bg-green-100 p-4 rounded-lg mb-2">
                      <p className="text-sm font-semibold text-green-800">Ionized Water</p>
                      <p className="text-xs text-green-600">Micro Clusters</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-900 mb-4">The Process:</h3>
                <ol className="space-y-3 text-blue-800">
                  <li className="flex items-start gap-3">
                    <span className="bg-blue-600 text-white px-2 py-1 rounded text-sm font-bold">1</span>
                    <p>Tap water enters the ionizer with large molecular clusters</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-blue-600 text-white px-2 py-1 rounded text-sm font-bold">2</span>
                    <p>Electrical current breaks the electrical bonding between water molecules</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-blue-600 text-white px-2 py-1 rounded text-sm font-bold">3</span>
                    <p>Water molecules are restructured into smaller micro clusters</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-blue-600 text-white px-2 py-1 rounded text-sm font-bold">4</span>
                    <p>Resulting water can effectively penetrate cell membranes</p>
                  </li>
                </ol>
              </div>
            </div>
          </div>

          {/* Benefits of Micro Clusters */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Benefits of Micro-Clustered Water</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-green-900 mb-3">Superior Hydration</h3>
                <p className="text-green-800 text-sm">
                  Micro-clustered water super hydrates the body by penetrating cells more effectively than regular water.
                </p>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">Exquisite Solubility</h3>
                <p className="text-blue-800 text-sm">
                  Smaller clusters have better solubility properties, allowing for better nutrient absorption.
                </p>
              </div>
              
              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-purple-900 mb-3">Enhanced Permeability</h3>
                <p className="text-purple-800 text-sm">
                  Micro clusters can more easily pass through cell membranes and aquaporins for better cellular function.
                </p>
              </div>
            </div>
          </div>

          {/* Scientific Evidence */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Scientific Understanding</h2>
            <div className="space-y-6 text-gray-700">
              <p>
                The concept of micro-clustered water is based on the principle that water molecules form hydrogen bonds 
                with each other, creating clusters of varying sizes. The ionization process disrupts these bonds, 
                creating smaller, more uniform clusters.
              </p>
              
              <div className="bg-yellow-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-yellow-900 mb-3">Key Points:</h3>
                <ul className="space-y-2 text-yellow-800">
                  <li>• Water molecules naturally cluster together through hydrogen bonding</li>
                  <li>• Cluster size affects biological properties and cellular absorption</li>
                  <li>• Ionization breaks large clusters into smaller, more bioavailable ones</li>
                  <li>• Smaller clusters can more easily penetrate cell membranes</li>
                  <li>• This leads to improved hydration and cellular function</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


