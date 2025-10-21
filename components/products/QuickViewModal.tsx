'use client';
import Image from 'next/image';
import { X } from 'lucide-react';

type Product = any;

type Props = {
  product?: Product | null;
  onClose: () => void;
};

export default function QuickViewModal({ product, onClose }: Props) {
  if (!product) return null;

  const gallery: string[] = [product.image, ...(product.gallery || [])];

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-[92vw] max-w-5xl rounded-3xl border border-white/15 bg-white/5 backdrop-blur-xl p-4 md:p-6 text-white">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded-xl bg-white/10 border border-white/15 hover:bg-white/15"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid md:grid-cols-2 gap-6">
          {/* left: gallery */}
          <div className="space-y-3">
            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-white/10 bg-white/5">
              <Image src={gallery[0]} alt={product.name} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-contain p-6" />
            </div>
            <div className="grid grid-cols-4 gap-3">
              {gallery.slice(1,5).map((src, i) => (
                <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-white/10 bg-white/5">
                  <Image src={src} alt={`${product.name} ${i}`} fill sizes="(max-width: 768px) 25vw, 12.5vw" className="object-contain p-2" />
                </div>
              ))}
            </div>
          </div>

          {/* right: info */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold">{product.name}</h3>
            {product.series && <p className="text-white/70 mt-1">{product.series}</p>}
            {product.price && <p className="mt-3 text-lg">{product.price}</p>}

            {product.features?.length ? (
              <ul className="mt-4 list-disc list-inside space-y-1 text-white/85">
                {product.features.slice(0,6).map((f:string, i:number) => <li key={i}>{f}</li>)}
              </ul>
            ) : null}

            {product.specs ? (
              <div className="mt-6 grid grid-cols-2 gap-3">
                {Object.entries(product.specs).slice(0,8).map(([k,v]) => (
                  <div key={k} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                    <div className="text-white/60 text-xs">{k}</div>
                    <div className="font-medium">{String(v)}</div>
                  </div>
                ))}
              </div>
            ) : null}

            {/* WhatsApp Contact Button */}
            <div className="mt-6">
              <button
                onClick={() => {
                  const message = `Hi! I'm interested in the ${product.name} water ionizer. Could you please provide more details about pricing and availability?`;
                  const encodedMessage = encodeURIComponent(message);
                  const whatsappUrl = `https://wa.me/917993004900?text=${encodedMessage}`;
                  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
                }}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-semibold hover:from-emerald-500 hover:to-emerald-400 transition-all duration-200 hover:scale-105"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                Chat on WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
