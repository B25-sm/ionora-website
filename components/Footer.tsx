import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative mt-12 xs:mt-14 sm:mt-16 md:mt-18 lg:mt-20 xl:mt-24 2xl:mt-28 3xl:mt-32 4xl:mt-40 5xl:mt-48 6xl:mt-56 border-t border-primary/10 bg-bg">
      <div className="max-w-7xl mx-auto px-2 xs:px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 3xl:px-24 4xl:px-32 5xl:px-40 6xl:px-48 py-6 xs:py-8 sm:py-10 md:py-12 lg:py-14 xl:py-16 2xl:py-18 3xl:py-20 4xl:py-24 5xl:py-28 6xl:py-32">
        <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-4 4xl:grid-cols-4 5xl:grid-cols-4 6xl:grid-cols-4 gap-6 xs:gap-8 sm:gap-10 md:gap-12 lg:gap-14 xl:gap-16 2xl:gap-18 3xl:gap-20 4xl:gap-24 5xl:gap-28 6xl:gap-32">
          
          {/* Brand Section */}
          <div className="xs:col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-2 xl:col-span-2 2xl:col-span-2 3xl:col-span-2 4xl:col-span-2 5xl:col-span-2 6xl:col-span-2">
            <div className="flex items-center gap-2 xs:gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-7 2xl:gap-8 3xl:gap-9 4xl:gap-10 5xl:gap-12 6xl:gap-14 mb-2 xs:mb-3 sm:mb-4 md:mb-5 lg:mb-6 xl:mb-7 2xl:mb-8 3xl:mb-9 4xl:mb-10 5xl:mb-12 6xl:mb-14">
              <Image
                src="/images/ionora-logo.png"
                alt="IONORA"
                width={120}
                height={36}
                className="h-6 xs:h-8 sm:h-10 md:h-12 lg:h-14 xl:h-16 2xl:h-18 3xl:h-20 4xl:h-24 5xl:h-28 6xl:h-32 w-auto"
                priority
              />
            </div>
            <p className="text-primary/70 text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl 4xl:text-5xl 5xl:text-6xl 6xl:text-7xl">Premium marketplace for world-class water ionizers.</p>
          </div>
          
          {/* Navigation Links */}
          <div>
            <h4 className="font-semibold text-primary mb-2 xs:mb-3 sm:mb-4 md:mb-5 lg:mb-6 xl:mb-7 2xl:mb-8 3xl:mb-9 4xl:mb-10 5xl:mb-12 6xl:mb-14 text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl 4xl:text-5xl 5xl:text-6xl 6xl:text-7xl">Quick Links</h4>
            <nav className="space-y-1 xs:space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-5 xl:space-y-6 2xl:space-y-7 3xl:space-y-8 4xl:space-y-9 5xl:space-y-10 6xl:space-y-12">
              {[
                { href: '/', label: 'Home' },
                { href: '/brands', label: 'Brands' },
                { href: '/products', label: 'Products' },
                { href: '/technology', label: 'Technology' },
                { href: '/about', label: 'About' }
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-primary/70 hover:text-primary transition-colors duration-200 text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl 4xl:text-5xl 5xl:text-6xl 6xl:text-7xl"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="font-semibold text-primary mb-2 xs:mb-3 sm:mb-4 md:mb-5 lg:mb-6 xl:mb-7 2xl:mb-8 3xl:mb-9 4xl:mb-10 5xl:mb-12 6xl:mb-14 text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl 4xl:text-5xl 5xl:text-6xl 6xl:text-7xl">Contact</h4>
            <div className="space-y-1 xs:space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-5 xl:space-y-6 2xl:space-y-7 3xl:space-y-8 4xl:space-y-9 5xl:space-y-10 6xl:space-y-12 text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl 4xl:text-5xl 5xl:text-6xl 6xl:text-7xl">
              <p className="text-primary/70">support@ionora.com</p>
              <p className="text-primary/70">Toll Free: 1800 1234 706</p>
            </div>
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="mt-4 xs:mt-6 sm:mt-8 md:mt-10 lg:mt-12 xl:mt-14 2xl:mt-16 3xl:mt-18 4xl:mt-20 5xl:mt-24 6xl:mt-28 pt-3 xs:pt-4 sm:pt-5 md:pt-6 lg:pt-7 xl:pt-8 2xl:pt-9 3xl:pt-10 4xl:pt-12 5xl:pt-14 6xl:pt-16 border-t border-primary/10">
          <div className="flex flex-col xs:flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row 2xl:flex-row 3xl:flex-row 4xl:flex-row 5xl:flex-row 6xl:flex-row justify-between items-center gap-2 xs:gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-7 2xl:gap-8 3xl:gap-9 4xl:gap-10 5xl:gap-12 6xl:gap-14 text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl 4xl:text-5xl 5xl:text-6xl 6xl:text-7xl text-primary/50">
            <div>© 2025 IONORA • All Rights Reserved</div>
            <div className="flex items-center gap-3 xs:gap-4 sm:gap-5 md:gap-6 lg:gap-7 xl:gap-8 2xl:gap-9 3xl:gap-10 4xl:gap-12 5xl:gap-14 6xl:gap-16">
              <Link href="/privacy" className="hover:text-primary/70 transition-colors duration-200">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-primary/70 transition-colors duration-200">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
