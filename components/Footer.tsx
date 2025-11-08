import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative mt-12 sm:mt-16 md:mt-20 lg:mt-24 border-t border-primary/10 bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-6 sm:py-8 md:py-10 lg:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10">
          
          {/* Brand Section */}
          <div className="sm:col-span-2 md:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <Image
                src="/images/ionora-logo.png"
                alt="IONORA"
                width={120}
                height={36}
                className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto"
                priority
              />
            </div>
            <p className="text-primary/70 text-sm sm:text-base md:text-lg">Premium marketplace for world-class water ionizers.</p>
          </div>
          
          {/* Navigation Links */}
          <div>
            <h4 className="font-semibold text-primary mb-3 sm:mb-4 text-sm sm:text-base md:text-lg">Quick Links</h4>
            <nav className="space-y-2">
              {[
                { href: '/', label: 'Home' },
                { href: '/brands', label: 'Brands' },
                { href: '/products', label: 'Products' },
                { href: '/technology', label: 'Technology' },
                { href: '/service', label: 'Service' },
                { href: '/about', label: 'About' },
                { href: '/warranty-replacement-policy', label: 'Warranty & Replacement' }
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-primary/70 hover:text-primary transition-colors duration-200 text-sm sm:text-base"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="font-semibold text-primary mb-3 sm:mb-4 text-sm sm:text-base md:text-lg">Contact</h4>
            <div className="space-y-2 text-sm sm:text-base">
              <p className="text-primary/70">IONORA INTERNATIONAL PRIVATE LIMITED</p>
              <p className="text-primary/70">PNO-66, SY NO-11/3 SA SOCIETY, KONDAPUR, MADHAPUR, Shaikpet, Hyderabad, Telangana-500081, India.</p>
              <p className="text-primary/70">info@ionora.in</p>
            </div>
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="mt-6 sm:mt-8 md:mt-10 pt-4 sm:pt-5 md:pt-6 border-t border-primary/10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 text-xs sm:text-sm text-primary/50">
            <div>© 2025 IONORA • All Rights Reserved</div>
            <div className="flex items-center gap-4 sm:gap-6">
              <Link href="/privacy-policy" className="hover:text-primary/70 transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-primary/70 transition-colors duration-200">
                Terms
              </Link>
              <Link href="/warranty-replacement-policy" className="hover:text-primary/70 transition-colors duration-200">
                Warranty & Replacement
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
