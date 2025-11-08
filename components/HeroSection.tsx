'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-bg">
      {/* Main content area */}
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4px)] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        {/* Central product image */}
        <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <div className="relative aspect-[3/4] w-full">
            <Image
              src="/images/products/medisoul/kyronblack5.png"
              alt="Premium Black Water Ionizer - Kyron Black 5"
              fill
              className="object-contain drop-shadow-2xl"
              priority
              sizes="(max-width: 480px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, (max-width: 1280px) 100vw, 100vw"
            />
          </div>
        </div>

        {/* Simple call-to-action */}
        <div className="text-center space-y-4 sm:space-y-6 md:space-y-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-primary tracking-wide drop-shadow-lg">
            Pure Water, Pure Life
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center">
            <Link 
              href="/products"
              className="px-6 sm:px-8 md:px-10 lg:px-12 py-2 sm:py-3 md:py-4 bg-primary text-bg font-medium hover:bg-primary/90 transition-colors duration-200 rounded-lg shadow-lg text-sm sm:text-base md:text-lg"
            >
              Shop Products
            </Link>
            <Link 
              href="/about"
              className="px-6 sm:px-8 md:px-10 lg:px-12 py-2 sm:py-3 md:py-4 border-2 border-primary text-primary font-medium hover:bg-primary hover:text-bg transition-colors duration-200 rounded-lg shadow-lg text-sm sm:text-base md:text-lg"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}