'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#FFE797] to-[#B45253]">
      {/* Top accent bar */}
      <div className="h-1 bg-[#B45253]"></div>
      
      {/* Main content area */}
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4px)] px-4">
        {/* Central product image */}
        <div className="relative w-full max-w-md mb-12">
          <div className="relative aspect-[3/4] w-full">
            <Image
              src="/images/products/medisoul/kyronblack5.png"
              alt="Premium Black Water Ionizer - Kyron Black 5"
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>
        </div>

        {/* Simple call-to-action */}
        <div className="text-center space-y-6">
          <h1 className="text-2xl md:text-3xl font-light text-[#B45253] tracking-wide drop-shadow-lg">
            Pure Water, Pure Life
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/products"
              className="px-8 py-3 bg-[#B45253] text-white font-medium hover:bg-[#B45253]/90 transition-colors duration-200 rounded-lg shadow-lg"
            >
              Shop Products
            </Link>
            <Link 
              href="/about"
              className="px-8 py-3 border-2 border-[#B45253] text-[#B45253] font-medium hover:bg-[#B45253] hover:text-white transition-colors duration-200 rounded-lg shadow-lg"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}