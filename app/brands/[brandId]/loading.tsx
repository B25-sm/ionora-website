export default function LoadingBrand() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pb-24">
      <div className="pt-28 mx-auto max-w-7xl px-4">
        <div className="h-40 rounded-3xl bg-white/5 border border-white/10 animate-pulse" />
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_,i)=>(
            <div key={i} className="h-80 rounded-3xl bg-white/5 border border-white/10 animate-pulse" />
          ))}
        </div>
      </div>
    </main>
  );
}
