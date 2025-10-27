import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Leaf, Droplets, Zap } from 'lucide-react';

export default function FoodLivestockAgriculturalPage() {
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
            <Leaf className="h-10 w-10 text-green-600" />
            Electrolysis Ionized Water for Food, Livestock & Agricultural
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Applications of ionized water in agriculture, livestock management, and food production
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          {/* Agricultural Applications */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Agricultural Applications</h2>
            <div className="space-y-6 text-gray-700">
              <p className="text-lg">
                Ionized water has numerous applications in agriculture, from crop irrigation to soil treatment and plant health management.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-900 mb-3">Crop Irrigation</h3>
                  <ul className="space-y-2 text-green-800">
                    <li>• <strong>Alkaline Water (pH 8-9):</strong> Promotes plant growth and health</li>
                    <li>• <strong>Better Nutrient Absorption:</strong> Enhanced mineral uptake by plants</li>
                    <li>• <strong>Improved Soil pH:</strong> Helps balance acidic soils</li>
                    <li>• <strong>Reduced Water Usage:</strong> More efficient hydration</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3">Plant Health</h3>
                  <ul className="space-y-2 text-blue-800">
                    <li>• <strong>Disease Prevention:</strong> Acidic water for plant disinfection</li>
                    <li>• <strong>Pest Control:</strong> Natural pest management</li>
                    <li>• <strong>Growth Enhancement:</strong> Improved plant vigor</li>
                    <li>• <strong>Yield Increase:</strong> Better crop production</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Livestock Applications */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Livestock Applications</h2>
            <div className="space-y-6 text-gray-700">
              <p className="text-lg">
                Ionized water provides significant benefits for livestock health, productivity, and overall well-being.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-orange-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-orange-900 mb-3">Animal Hydration</h3>
                  <ul className="space-y-2 text-orange-800">
                    <li>• <strong>Better Absorption:</strong> Micro-clustered molecules for improved hydration</li>
                    <li>• <strong>Health Benefits:</strong> Antioxidant properties support immune function</li>
                    <li>• <strong>Digestive Health:</strong> Improved gut health and nutrient absorption</li>
                    <li>• <strong>Stress Reduction:</strong> Better overall animal welfare</li>
                  </ul>
                </div>
                
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-purple-900 mb-3">Sanitation & Hygiene</h3>
                  <ul className="space-y-2 text-purple-800">
                    <li>• <strong>Equipment Cleaning:</strong> Acidic water for disinfection</li>
                    <li>• <strong>Facility Sanitization:</strong> Chemical-free cleaning solutions</li>
                    <li>• <strong>Water Treatment:</strong> Improved water quality for animals</li>
                    <li>• <strong>Disease Prevention:</strong> Reduced pathogen transmission</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Food Production */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Food Production Applications</h2>
            <div className="space-y-6 text-gray-700">
              <p className="text-lg">
                Ionized water plays a crucial role in food processing, preservation, and safety throughout the food production chain.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-900 mb-3">Food Processing</h3>
                  <ul className="space-y-2 text-green-800">
                    <li>• <strong>Washing & Cleaning:</strong> Effective removal of contaminants</li>
                    <li>• <strong>Preservation:</strong> Extended shelf life of products</li>
                    <li>• <strong>Quality Maintenance:</strong> Better texture and appearance</li>
                    <li>• <strong>Safety Enhancement:</strong> Reduced microbial contamination</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3">Aquaculture</h3>
                  <ul className="space-y-2 text-blue-800">
                    <li>• <strong>Water Treatment:</strong> Improved water quality for fish</li>
                    <li>• <strong>Disease Prevention:</strong> Reduced pathogen levels</li>
                    <li>• <strong>Growth Enhancement:</strong> Better fish health and growth</li>
                    <li>• <strong>Environmental Safety:</strong> Chemical-free treatment</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Zap className="h-8 w-8 text-yellow-600" />
              Key Benefits
            </h2>
            <div className="space-y-6 text-gray-700">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-900 mb-3">Environmental Benefits</h3>
                  <ul className="space-y-2 text-green-800">
                    <li>• Reduced chemical usage</li>
                    <li>• Lower environmental impact</li>
                    <li>• Sustainable practices</li>
                    <li>• Water conservation</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3">Economic Benefits</h3>
                  <ul className="space-y-2 text-blue-800">
                    <li>• Lower operating costs</li>
                    <li>• Reduced chemical expenses</li>
                    <li>• Improved productivity</li>
                    <li>• Better product quality</li>
                  </ul>
                </div>
                
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-purple-900 mb-3">Health Benefits</h3>
                  <ul className="space-y-2 text-purple-800">
                    <li>• Safer food products</li>
                    <li>• Reduced chemical residues</li>
                    <li>• Better animal welfare</li>
                    <li>• Improved food safety</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Implementation */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Implementation Considerations</h2>
            <div className="space-y-6 text-gray-700">
              <p className="text-lg">
                When implementing ionized water systems in agricultural and livestock operations, consider these important factors.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-yellow-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-yellow-900 mb-3">System Requirements:</h3>
                  <ul className="space-y-2 text-yellow-800">
                    <li>• Appropriate system sizing</li>
                    <li>• Water quality testing</li>
                    <li>• pH level monitoring</li>
                    <li>• Regular maintenance</li>
                  </ul>
                </div>
                
                <div className="bg-orange-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-orange-900 mb-3">Best Practices:</h3>
                  <ul className="space-y-2 text-orange-800">
                    <li>• Gradual implementation</li>
                    <li>• Staff training</li>
                    <li>• Performance monitoring</li>
                    <li>• Quality control measures</li>
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
