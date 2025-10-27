import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-primary/20 bg-bg">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <Image
              src="/images/ionora-logo.png"
              alt="IONORA"
              width={120}
              height={36}
              className="h-9 w-auto"
              priority
            />
          </div>
          <p className="text-primary/70">Premium marketplace for world-class water ionizers.</p>
        </div>
        <div>
          <div className="font-semibold text-primary mb-3">Quick Links</div>
          <ul className="space-y-2 text-primary/70">
            <li><a href="/" className="hover:text-primary transition">Home</a></li>
            <li><a href="/brands" className="hover:text-primary transition">Brands</a></li>
            <li><a href="/products" className="hover:text-primary transition">Products</a></li>
            <li><a href="/technology" className="hover:text-primary transition">Technology</a></li>
            <li><a href="/about" className="hover:text-primary transition">About</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-primary mb-3">Brands</div>
          <ul className="space-y-2 text-primary/70">
            <li>Life Ionizers</li>
            <li>Mediqua</li>
            <li>Medisoul</li>
            <li>Alkamedi</li>
            <li>IonoraX</li>
            <li>HydraPlus</li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-primary mb-3">Contact</div>
          <p className="text-primary/70">support@ionora.com<br/>+91 79930 04900</p>
          <div className="mt-3 text-primary/50 text-sm">© 2025 IONORA • All Rights Reserved</div>
        </div>
      </div>
    </footer>
  );
}
