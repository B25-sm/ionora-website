import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-[#B45253]/20 bg-gradient-to-r from-white to-[#FFE797]">
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
          <p className="text-[#B45253]/70">Premium marketplace for world-class water ionizers.</p>
        </div>
        <div>
          <div className="font-semibold text-[#B45253] mb-3">Quick Links</div>
          <ul className="space-y-2 text-[#B45253]/70">
            <li><a href="/" className="hover:text-[#B45253] transition">Home</a></li>
            <li><a href="/brands" className="hover:text-[#B45253] transition">Brands</a></li>
            <li><a href="/products" className="hover:text-[#B45253] transition">Products</a></li>
            <li><a href="/technology" className="hover:text-[#B45253] transition">Technology</a></li>
            <li><a href="/about" className="hover:text-[#B45253] transition">About</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-[#B45253] mb-3">Brands</div>
          <ul className="space-y-2 text-[#B45253]/70">
            <li>Life Ionizers</li>
            <li>Mediqua</li>
            <li>Medisoul</li>
            <li>Alkamedi</li>
            <li>IonoraX</li>
            <li>HydraPlus</li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-[#B45253] mb-3">Contact</div>
          <p className="text-[#B45253]/70">support@ionora.com<br/>+91 79930 04900</p>
          <div className="mt-3 text-[#B45253]/50 text-sm">© 2025 IONORA • All Rights Reserved</div>
        </div>
      </div>
    </footer>
  );
}
