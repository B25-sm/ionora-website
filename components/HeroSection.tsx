'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-bg">
      {/* Main content area */}
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4px)] px-2 xs:px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 3xl:px-24 4xl:px-32 5xl:px-40 6xl:px-48">
        {/* Central product image */}
        <div className="relative w-full max-w-xs xs:max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl 3xl:max-w-4xl 4xl:max-w-5xl 5xl:max-w-6xl 6xl:max-w-7xl mb-8 xs:mb-10 sm:mb-12 md:mb-16 lg:mb-20 xl:mb-24 2xl:mb-28 3xl:mb-32 4xl:mb-40 5xl:mb-48 6xl:mb-56">
          <div className="relative aspect-[3/4] w-full">
            <Image
              src="/images/products/medisoul/kyronblack5.png"
              alt="Premium Black Water Ionizer - Kyron Black 5"
              fill
              className="object-contain drop-shadow-2xl"
              priority
              sizes="(max-width: 360px) 100vw, (max-width: 480px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, (max-width: 1280px) 100vw, (max-width: 1536px) 100vw, (max-width: 1920px) 100vw, (max-width: 2560px) 100vw, (max-width: 3840px) 100vw, 100vw"
            />
          </div>
        </div>

        {/* Simple call-to-action */}
        <div className="text-center space-y-4 xs:space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12 xl:space-y-14 2xl:space-y-16 3xl:space-y-20 4xl:space-y-24 5xl:space-y-28 6xl:space-y-32">
          <h1 className="text-responsive-2xl xs:text-responsive-3xl sm:text-responsive-4xl md:text-responsive-5xl lg:text-responsive-6xl xl:text-responsive-7xl font-light text-primary tracking-wide drop-shadow-lg">
            Pure Water, Pure Life
          </h1>
          
          <div className="flex flex-col xs:flex-row gap-3 xs:gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 2xl:gap-14 3xl:gap-16 4xl:gap-20 5xl:gap-24 6xl:gap-28 justify-center">
            <Link 
              href="/products"
              className="px-6 xs:px-8 sm:px-10 md:px-12 lg:px-14 xl:px-16 2xl:px-18 3xl:px-20 4xl:px-24 5xl:px-28 6xl:px-32 py-2 xs:py-3 sm:py-4 md:py-5 lg:py-6 xl:py-7 2xl:py-8 3xl:py-9 4xl:py-10 5xl:py-12 6xl:py-14 bg-primary text-bg font-medium hover:bg-primary/90 transition-colors duration-200 rounded-lg shadow-lg text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl 3xl:text-5xl 4xl:text-6xl 5xl:text-7xl 6xl:text-8xl"
            >
              Shop Products
            </Link>
            <Link 
              href="/about"
              className="px-6 xs:px-8 sm:px-10 md:px-12 lg:px-14 xl:px-16 2xl:px-18 3xl:px-20 4xl:px-24 5xl:px-28 6xl:px-32 py-2 xs:py-3 sm:py-4 md:py-5 lg:py-6 xl:py-7 2xl:py-8 3xl:py-9 4xl:py-10 5xl:py-12 6xl:py-14 border-2 border-primary text-primary font-medium hover:bg-primary hover:text-bg transition-colors duration-200 rounded-lg shadow-lg text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl 3xl:text-5xl 4xl:text-6xl 5xl:text-7xl 6xl:text-8xl"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}