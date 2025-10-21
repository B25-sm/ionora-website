import Link from 'next/link';

export default function BrandNotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 grid place-items-center">
      <div className="text-center">
        <h1 className="text-5xl font-extrabold text-white">Brand not found</h1>
        <p className="mt-3 text-white/70">Please check the URL or explore available brands.</p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/brands" className="rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-white/90 hover:bg-white/20">Browse Brands</Link>
          <Link href="/" className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-white font-semibold">Go Home</Link>
        </div>
      </div>
    </main>
  );
}
