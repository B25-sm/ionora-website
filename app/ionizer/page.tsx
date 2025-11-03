import React from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Zap, Droplets } from 'lucide-react';

export default function IonizerPage() {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Ionizer</h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Discover the science behind water ionization and how ionizers transform ordinary tap water into powerful alkaline and acidic streams.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* What is Ionized Water */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Droplets className="h-8 w-8 text-blue-600" />
              What is Ionized Water?
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Ionized water, also known as <strong>Oxidation Reduced Water</strong>, is created through the process of electrolysis. 
                In this process, tap water passes through electrically charged platinum-coated titanium plates, where the electrolyzer 
                separates tap water into two distinct streams.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">The Process:</h3>
                <ul className="space-y-2 text-blue-800">
                  <li>• Tap water enters the ionizer</li>
                  <li>• Passes through platinum-coated titanium plates</li>
                  <li>• Electrical current separates water into two streams</li>
                  <li>• Alkaline stream (cathode) and acidic stream (anode)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* How Ionizer Works */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Zap className="h-8 w-8 text-green-600" />
              How Ionizer Works
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                The ionization process involves <strong>electrolysis</strong> at the anode and cathode, creating two distinct water streams 
                with different chemical properties.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">Cathode (-) Alkaline Stream</h4>
                  <p className="text-sm text-green-800">
                    Water is reduced (gains electrons), producing hydrogen gas (H₂) and hydroxide ions (OH⁻) that make water alkaline.
                  </p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-red-900 mb-2">Anode (+) Acidic Stream</h4>
                  <p className="text-sm text-red-800">
                    Water is oxidized (loses electrons), producing oxygen gas (O₂) and hydrogen ions (H⁺) that make water acidic.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <BookOpen className="h-8 w-8 text-purple-600" />
            Learn More About Ionization
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link 
              href="/ionizer/ph" 
              className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all group"
            >
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">What is pH</h3>
              <p className="text-sm text-gray-600 mt-1">Understanding pH levels and hydrogen ion concentration</p>
            </Link>
            <Link 
              href="/ionizer/orp" 
              className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all group"
            >
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">What is ORP</h3>
              <p className="text-sm text-gray-600 mt-1">Oxidation-Reduction Potential and antioxidant properties</p>
            </Link>
            <Link 
              href="/ionizer/what-is-ionizer" 
              className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all group"
            >
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">What is Ionizer</h3>
              <p className="text-sm text-gray-600 mt-1">Understanding water ionizer machines and technology</p>
            </Link>
            <Link 
              href="/ionizer/how-it-works" 
              className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all group"
            >
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">How Ionizer Works</h3>
              <p className="text-sm text-gray-600 mt-1">Detailed electrolysis process and chemical reactions</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


