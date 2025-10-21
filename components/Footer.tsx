export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-white/5 backdrop-blur-xl">
      <div className="page-wrap py-10 md:py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        <div>
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">IONORA</div>
          <p className="mt-3 text-white/70">Premium marketplace for world-class water ionizers.</p>
        </div>
        <div>
          <div className="font-semibold text-white mb-3">Quick Links</div>
          <ul className="space-y-2 text-white/80">
            <li><a href="/">Home</a></li>
            <li><a href="/brands">Brands</a></li>
            <li><a href="/products">Products</a></li>
            <li><a href="/technology">Technology</a></li>
            <li><a href="/about">About</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-white mb-3">Brands</div>
          <ul className="space-y-2 text-white/80">
            <li>Life Ionizers</li><li>Mediqua</li><li>Medisoul</li><li>Alkamedi</li><li>IonoraX</li><li>HydraPlus</li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-white mb-3">Contact</div>
          <p className="text-white/80">support@ionora.com<br/>+91 79930 04900</p>
          <div className="mt-3 text-white/60 text-sm">© 2025 IONORA • All Rights Reserved</div>
        </div>
      </div>
    </footer>
  );
}
