import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Cpu, Droplets, Zap } from 'lucide-react';

export default function SemiconductorCleaningPage() {
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
            <Cpu className="h-10 w-10 text-blue-600" />
            Ionized Water for High-End Semiconductor Cleaning
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Precision cleaning applications in semiconductor manufacturing and electronics
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          {/* Semiconductor Industry Requirements */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Semiconductor Industry Requirements</h2>
            <div className="space-y-6 text-gray-700">
              <p className="text-lg">
                The semiconductor industry requires ultra-pure water for cleaning processes to ensure the highest quality 
                and reliability of electronic components. Ionized water provides an effective solution for precision cleaning.
              </p>
              
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-900 mb-4">Critical Requirements:</h3>
                <div className="grid md:grid-cols-2 gap-4 text-blue-800">
                  <div>
                    <p><strong>Ultra-Pure Water:</strong> Minimal contaminants</p>
                    <p><strong>Precise pH Control:</strong> Consistent cleaning performance</p>
                    <p><strong>Particle Removal:</strong> Effective contaminant elimination</p>
                  </div>
                  <div>
                    <p><strong>Chemical-Free:</strong> No residue left behind</p>
                    <p><strong>Consistent Quality:</strong> Reliable cleaning results</p>
                    <p><strong>Cost-Effective:</strong> Reduced chemical usage</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cleaning Applications */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Cleaning Applications</h2>
            <div className="space-y-6 text-gray-700">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-900 mb-3">Wafer Cleaning</h3>
                  <ul className="space-y-2 text-green-800">
                    <li>• <strong>Pre-Processing:</strong> Initial wafer preparation</li>
                    <li>• <strong>Post-Processing:</strong> Final cleaning steps</li>
                    <li>• <strong>Contaminant Removal:</strong> Organic and inorganic particles</li>
                    <li>• <strong>Surface Preparation:</strong> Optimal surface conditions</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3">Equipment Cleaning</h3>
                  <ul className="space-y-2 text-blue-800">
                    <li>• <strong>Chamber Cleaning:</strong> Process chamber maintenance</li>
                    <li>• <strong>Tool Cleaning:</strong> Manufacturing equipment</li>
                    <li>• <strong>Component Cleaning:</strong> Individual parts and assemblies</li>
                    <li>• <strong>Preventive Maintenance:</strong> Regular cleaning protocols</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Ionized Water Properties */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Droplets className="h-8 w-8 text-purple-600" />
              Ionized Water Properties for Semiconductor Cleaning
            </h2>
            <div className="space-y-6 text-gray-700">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-purple-900 mb-3">Alkaline Ionized Water (pH 8-10)</h3>
                  <ul className="space-y-2 text-purple-800">
                    <li>• <strong>Organic Removal:</strong> Effective at removing organic contaminants</li>
                    <li>• <strong>Particle Suspension:</strong> Keeps particles in suspension</li>
                    <li>• <strong>Surface Activation:</strong> Prepares surfaces for further processing</li>
                    <li>• <strong>Rinsing:</strong> Final rinse to remove cleaning residues</li>
                  </ul>
                </div>
                
                <div className="bg-red-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-red-900 mb-3">Acidic Ionized Water (pH 4-6)</h3>
                  <ul className="space-y-2 text-red-800">
                    <li>• <strong>Inorganic Removal:</strong> Effective at removing metal ions</li>
                    <li>• <strong>Disinfection:</strong> Microbial contamination control</li>
                    <li>• <strong>Oxide Removal:</strong> Native oxide layer removal</li>
                    <li>• <strong>Etching:</strong> Controlled surface modification</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Advantages */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Zap className="h-8 w-8 text-yellow-600" />
              Advantages of Ionized Water
            </h2>
            <div className="space-y-6 text-gray-700">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-900 mb-3">Environmental Benefits</h3>
                  <ul className="space-y-2 text-green-800">
                    <li>• Reduced chemical usage</li>
                    <li>• Lower waste generation</li>
                    <li>• Safer disposal</li>
                    <li>• Sustainable processes</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3">Economic Benefits</h3>
                  <ul className="space-y-2 text-blue-800">
                    <li>• Lower operating costs</li>
                    <li>• Reduced chemical expenses</li>
                    <li>• Less waste treatment</li>
                    <li>• Improved efficiency</li>
                  </ul>
                </div>
                
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-purple-900 mb-3">Quality Benefits</h3>
                  <ul className="space-y-2 text-purple-800">
                    <li>• Consistent cleaning results</li>
                    <li>• No chemical residues</li>
                    <li>• Better surface quality</li>
                    <li>• Improved yield rates</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Process Integration */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Process Integration</h2>
            <div className="space-y-6 text-gray-700">
              <p className="text-lg">
                Integrating ionized water into semiconductor manufacturing processes requires careful planning and optimization.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-yellow-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-yellow-900 mb-3">Implementation Steps:</h3>
                  <ul className="space-y-2 text-yellow-800">
                    <li>• <strong>System Design:</strong> Customized for specific processes</li>
                    <li>• <strong>Quality Control:</strong> Continuous monitoring systems</li>
                    <li>• <strong>Staff Training:</strong> Proper operation procedures</li>
                    <li>• <strong>Process Validation:</strong> Performance verification</li>
                  </ul>
                </div>
                
                <div className="bg-orange-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-orange-900 mb-3">Monitoring Requirements:</h3>
                  <ul className="space-y-2 text-orange-800">
                    <li>• <strong>pH Levels:</strong> Continuous pH monitoring</li>
                    <li>• <strong>Water Quality:</strong> Purity measurements</li>
                    <li>• <strong>Flow Rates:</strong> Process optimization</li>
                    <li>• <strong>Temperature:</strong> Optimal operating conditions</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Future Applications */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Future Applications</h2>
            <div className="space-y-6 text-gray-700">
              <p className="text-lg">
                As semiconductor technology advances, ionized water applications continue to evolve and expand.
              </p>
              
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-900 mb-4">Emerging Applications:</h3>
                <div className="grid md:grid-cols-2 gap-4 text-blue-800">
                  <div>
                    <ul className="space-y-2">
                      <li>• Advanced node manufacturing</li>
                      <li>• 3D packaging applications</li>
                      <li>• MEMS device cleaning</li>
                      <li>• Photovoltaic manufacturing</li>
                    </ul>
                  </div>
                  <div>
                    <ul className="space-y-2">
                      <li>• Flexible electronics</li>
                      <li>• Quantum device fabrication</li>
                      <li>• Biomedical device manufacturing</li>
                      <li>• Space-grade electronics</li>
                    </ul>
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
