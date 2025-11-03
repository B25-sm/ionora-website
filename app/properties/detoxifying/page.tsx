import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Droplets, Shield } from 'lucide-react';

export default function DetoxifyingPage() {
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
            <Droplets className="h-10 w-10 text-orange-600" />
            Detoxifying
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Enhanced ability to flush toxins and waste from the body
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          {/* Detoxification Support */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Detoxification Support</h2>
            <div className="space-y-6 text-gray-700">
              <p className="text-lg">
                By hydrating deeply and flushing waste, ionized water may help the body eliminate toxins more efficiently 
                through urine and sweat, supporting the body's natural detoxification processes.
              </p>
              
              <div className="bg-orange-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-orange-900 mb-4">How Ionized Water Supports Detoxification:</h3>
                <div className="space-y-3 text-orange-800">
                  <p><strong>Deep Hydration:</strong> Micro-clustered molecules penetrate cells more effectively</p>
                  <p><strong>Enhanced Blood Flow:</strong> Better circulation helps transport toxins to elimination organs</p>
                  <p><strong>Kidney Function:</strong> Supports kidney function in filtering waste from blood</p>
                  <p><strong>Liver Support:</strong> Helps liver process and eliminate toxins</p>
                </div>
              </div>
            </div>
          </div>

          {/* Natural Detoxification */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Natural Detoxification Process</h2>
            <div className="space-y-6 text-gray-700">
              <p className="text-lg">
                The body has natural detoxification systems, and ionized water can enhance these processes through 
                improved hydration and cellular function.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-900 mb-3">Primary Detox Organs:</h3>
                  <ul className="space-y-2 text-green-800">
                    <li>• <strong>Liver:</strong> Processes and neutralizes toxins</li>
                    <li>• <strong>Kidneys:</strong> Filter waste from blood</li>
                    <li>• <strong>Lungs:</strong> Eliminate gaseous waste</li>
                    <li>• <strong>Skin:</strong> Releases toxins through sweat</li>
                    <li>• <strong>Colon:</strong> Eliminates solid waste</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3">How Ionized Water Helps:</h3>
                  <ul className="space-y-2 text-blue-800">
                    <li>• <strong>Enhanced Hydration:</strong> Supports all detox organs</li>
                    <li>• <strong>Better Circulation:</strong> Improves toxin transport</li>
                    <li>• <strong>Cellular Function:</strong> Optimizes cell detox processes</li>
                    <li>• <strong>Antioxidant Support:</strong> Protects cells during detox</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Detoxification Benefits</h2>
            <div className="space-y-6 text-gray-700">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-900 mb-3">Improved Energy</h3>
                  <p className="text-green-800 text-sm">
                    By removing toxins that can cause fatigue, ionized water may help improve energy levels and overall vitality.
                  </p>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3">Better Digestion</h3>
                  <p className="text-blue-800 text-sm">
                    Enhanced hydration supports digestive function and helps eliminate waste more efficiently.
                  </p>
                </div>
                
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-purple-900 mb-3">Clearer Skin</h3>
                  <p className="text-purple-800 text-sm">
                    Supporting skin detoxification through improved hydration may help achieve clearer, healthier skin.
                  </p>
                </div>
                
                <div className="bg-orange-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-orange-900 mb-3">Reduced Inflammation</h3>
                  <p className="text-orange-800 text-sm">
                    By supporting the body's natural detox processes, ionized water may help reduce inflammation.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Scientific Understanding */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Scientific Understanding</h2>
            <div className="space-y-6 text-gray-700">
              <p className="text-lg">
                The detoxifying properties of ionized water are supported by its unique molecular structure and antioxidant content.
              </p>
              
              <div className="bg-yellow-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-yellow-900 mb-4">Key Mechanisms:</h3>
                <div className="space-y-3 text-yellow-800">
                  <p><strong>Micro-clustered molecules:</strong> Better cellular penetration and hydration</p>
                  <p><strong>Molecular hydrogen (H₂):</strong> Antioxidant protection during detox processes</p>
                  <p><strong>Alkaline pH:</strong> Supports optimal cellular function and pH balance</p>
                  <p><strong>Negative ORP:</strong> Reduces oxidative stress during detoxification</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


