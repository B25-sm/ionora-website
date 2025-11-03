import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Droplets, Shield, Heart, Zap } from 'lucide-react';

export default function PropertiesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Properties of Ionized Water</h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Discover the unique properties that make ionized water beneficial for health and wellness
          </p>
        </div>

        {/* Main Properties Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Link 
            href="/properties/micro-cluster" 
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all group"
          >
            <div className="flex items-center gap-3 mb-4">
              <Droplets className="h-8 w-8 text-blue-600" />
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600">Micro Cluster</h3>
            </div>
            <p className="text-gray-600">Smaller water molecule clusters for better cellular absorption and hydration</p>
          </Link>

          <Link 
            href="/properties/molecular-hydrogen" 
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all group"
          >
            <div className="flex items-center gap-3 mb-4">
              <Zap className="h-8 w-8 text-green-600" />
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-green-600">Molecular Hydrogen</h3>
            </div>
            <p className="text-gray-600">Powerful antioxidant that selectively neutralizes harmful free radicals</p>
          </Link>

          <Link 
            href="/properties/anti-oxidation" 
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all group"
          >
            <div className="flex items-center gap-3 mb-4">
              <Shield className="h-8 w-8 text-purple-600" />
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-purple-600">Anti Oxidation</h3>
            </div>
            <p className="text-gray-600">Protects against oxidative stress and cellular damage</p>
          </Link>

          <Link 
            href="/properties/alkalinization" 
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all group"
          >
            <div className="flex items-center gap-3 mb-4">
              <Heart className="h-8 w-8 text-red-600" />
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-red-600">Alkalinization</h3>
            </div>
            <p className="text-gray-600">Higher pH helps balance body acidity and supports optimal health</p>
          </Link>

          <Link 
            href="/properties/detoxifying" 
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all group"
          >
            <div className="flex items-center gap-3 mb-4">
              <Droplets className="h-8 w-8 text-orange-600" />
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-orange-600">Detoxifying</h3>
            </div>
            <p className="text-gray-600">Enhanced ability to flush toxins and waste from the body</p>
          </Link>

          <Link 
            href="/properties/hydration" 
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all group"
          >
            <div className="flex items-center gap-3 mb-4">
              <Droplets className="h-8 w-8 text-cyan-600" />
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-cyan-600">Hydration</h3>
            </div>
            <p className="text-gray-600">Superior hydration properties for better cellular function</p>
          </Link>

          <Link 
            href="/properties/anti-inflammatory" 
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all group"
          >
            <div className="flex items-center gap-3 mb-4">
              <Heart className="h-8 w-8 text-pink-600" />
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-pink-600">Anti-Inflammatory</h3>
            </div>
            <p className="text-gray-600">Reduces inflammation and supports immune system function</p>
          </Link>

          <Link 
            href="/properties/free-radicals" 
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all group"
          >
            <div className="flex items-center gap-3 mb-4">
              <Zap className="h-8 w-8 text-yellow-600" />
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-yellow-600">Free Radicals</h3>
            </div>
            <p className="text-gray-600">Understanding free radicals and their impact on human health</p>
          </Link>
        </div>

        {/* Health Benefits Overview */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Health Benefits Overview</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Neutralizes Excess Acidity</h3>
              <p className="text-blue-800 text-sm">Higher pH helps balance excess acid from diet and supports acid reflux relief</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-2">Acts as an Antioxidant</h3>
              <p className="text-green-800 text-sm">Molecular hydrogen and negative ORP help fight free radicals and reduce oxidative stress</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-900 mb-2">Supports Hydration</h3>
              <p className="text-purple-800 text-sm">Micro-clustered molecules make water easier to absorb into cells for quicker hydration</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <h3 className="font-semibold text-orange-900 mb-2">Detoxification Support</h3>
              <p className="text-orange-800 text-sm">Deep hydration helps the body eliminate toxins more efficiently through urine and sweat</p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <h3 className="font-semibold text-red-900 mb-2">Bone Health Support</h3>
              <p className="text-red-800 text-sm">May help reduce calcium loss from bones and support bone density over time</p>
            </div>
            <div className="bg-pink-50 p-4 rounded-lg">
              <h3 className="font-semibold text-pink-900 mb-2">Skin Health & Anti-Aging</h3>
              <p className="text-pink-800 text-sm">Rich hydration plus antioxidant properties help keep skin clearer and younger-looking</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


