'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';

import { useCart } from '@/components/cart/CartProvider';

const currency = (value: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);

const placeholderImage = '/images/products/life/MXL-5.png';

export default function CartPage() {
  const {
    items,
    summary,
    loading,
    error,
    isAuthenticated,
    updateItemQuantity,
    removeItem,
    clear,
  } = useCart();

  const [updatingItemId, setUpdatingItemId] = useState<string | null>(null);
  const [removingItemId, setRemovingItemId] = useState<string | null>(null);
  const [clearing, setClearing] = useState(false);

  if (!isAuthenticated) {
    return (
      <section className="min-h-[calc(100dvh-6rem)] bg-gradient-to-b from-[#0A0F2C] via-[#1a1f3c] to-[#0A0F2C] text-white flex items-center">
        <div className="max-w-3xl mx-auto px-6 py-24 text-center space-y-6">
          <h1 className="text-3xl sm:text-4xl font-semibold">Sign in to view your cart</h1>
          <p className="text-white/70 text-base sm:text-lg">
            Your cart is linked to your Ionora account. Please sign in to review saved items and
            continue shopping.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Link
              href="/login"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow-lg shadow-blue-500/30 hover:opacity-90 transition"
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-white/20 text-white hover:bg-white/10 transition"
            >
              Create an account
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const handleChangeQuantity = async (id: string, next: number) => {
    if (next < 1) return;
    setUpdatingItemId(id);
    try {
      await updateItemQuantity(id, next);
    } finally {
      setUpdatingItemId(null);
    }
  };

  const handleRemoveItem = async (id: string) => {
    setRemovingItemId(id);
    try {
      await removeItem(id);
    } finally {
      setRemovingItemId(null);
    }
  };

  const handleClear = async () => {
    setClearing(true);
    try {
      await clear();
    } finally {
      setClearing(false);
    }
  };

  const isEmpty = !loading && items.length === 0;

  return (
    <section className="min-h-[calc(100dvh-6rem)] bg-gradient-to-b from-[#0A0F2C] via-[#1a1f3c] to-[#0A0F2C] text-white">
      <div className="max-w-7xl mx-auto px-6 py-10 lg:py-16">
        <header className="flex items-center justify-between flex-wrap gap-4 mb-10">
          <div>
            <h1 className="text-3xl sm:text-4xl font-semibold">Your Shopping Cart</h1>
            <p className="text-white/60 text-sm sm:text-base mt-2">
              Review your selections, update quantities, or continue to checkout.
            </p>
          </div>
          {items.length > 0 && (
            <button
              onClick={handleClear}
              disabled={clearing || loading}
              className="px-5 py-2.5 rounded-xl border border-white/20 text-white/80 hover:bg-white/10 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {clearing ? 'Clearing...' : 'Clear cart'}
            </button>
          )}
        </header>

        {error && (
          <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </div>
        )}

        {loading && items.length === 0 ? (
          <div className="flex justify-center items-center py-20">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-blue-400"></div>
          </div>
        ) : isEmpty ? (
          <div className="bg-white/5 border border-white/10 rounded-3xl p-10 text-center space-y-4">
            <Image
              src="/images/ionora-logo.png"
              alt="Ionora"
              width={140}
              height={40}
              className="mx-auto opacity-80"
            />
            <h2 className="text-2xl font-semibold">Your cart is empty</h2>
            <p className="text-white/70">
              Explore our premium ionizers and accessories to add them to your cart.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold hover:opacity-90 transition"
            >
              Browse products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-8 lg:gap-12">
            <div className="bg-white/5 border border-white/10 rounded-3xl divide-y divide-white/10 overflow-hidden">
              {items.map((item) => {
                const image = item.product.images?.[0] ?? placeholderImage;
                return (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row sm:items-center gap-6 p-6"
                  >
                    <div className="relative w-full sm:w-32 h-36 sm:h-32 bg-white/5 rounded-2xl overflow-hidden border border-white/10 flex-shrink-0">
                      <Image
                        src={image}
                        alt={item.product.name}
                        fill
                        sizes="(max-width: 640px) 100vw, 128px"
                        className="object-contain"
                      />
                    </div>
                    <div className="flex-1 space-y-3">
                      <div>
                        {item.product.category && (
                          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-wide text-white/60">
                            {item.product.category}
                          </span>
                        )}
                        <h3 className="text-lg font-semibold">{item.product.name}</h3>
                        {item.product.description && (
                          <p className="text-white/60 text-sm mt-1">{item.product.description}</p>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-4">
                        <p className="text-sm text-white/60">
                          Unit price:{' '}
                          <span className="font-medium text-white">
                            {currency(item.product.final_price)}
                          </span>
                        </p>
                        <p className="text-sm text-white/60">
                          Total:{' '}
                          <span className="font-medium text-white">
                            {currency(item.item_total)}
                          </span>
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center gap-4">
                        <div className="inline-flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                          <button
                            type="button"
                            onClick={() => handleChangeQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1 || updatingItemId === item.id}
                            className="p-1 rounded-lg hover:bg-white/10 transition disabled:opacity-50"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="min-w-[2ch] text-center font-medium">
                            {updatingItemId === item.id ? '…' : item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleChangeQuantity(item.id, item.quantity + 1)}
                            disabled={updatingItemId === item.id}
                            className="p-1 rounded-lg hover:bg-white/10 transition disabled:opacity-50"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleRemoveItem(item.id)}
                          disabled={removingItemId === item.id}
                          className="inline-flex items-center gap-2 text-sm text-red-300 hover:text-red-200 transition disabled:opacity-50"
                        >
                          <Trash2 className="h-4 w-4" />
                          {removingItemId === item.id ? 'Removing...' : 'Remove'}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <aside className="bg-white/5 border border-white/10 rounded-3xl p-6 lg:p-8 space-y-6 h-fit">
              <div>
                <h2 className="text-2xl font-semibold mb-1">Order summary</h2>
                <p className="text-white/60 text-sm">
                  Taxes are estimates and will be finalized during checkout.
                </p>
              </div>
              <div className="space-y-3 text-sm text-white/80">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{currency(summary.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated tax (18%)</span>
                  <span>{currency(summary.tax)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{summary.shipping === 0 ? 'Free' : currency(summary.shipping)}</span>
                </div>
                <div className="border-t border-white/10 my-4"></div>
                <div className="flex justify-between text-base font-semibold text-white">
                  <span>Total</span>
                  <span>{currency(summary.total)}</span>
                </div>
              </div>
              <Link
                href={items.length > 0 ? '/checkout' : '#'}
                className={`w-full inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 text-[#062031] font-semibold transition ${
                  items.length === 0 || loading
                    ? 'opacity-60 cursor-not-allowed pointer-events-none'
                    : 'hover:opacity-90'
                }`}
                aria-disabled={items.length === 0 || loading}
              >
                Proceed to checkout
              </Link>
              <p className="text-xs text-white/50">
                Need help ordering?{' '}
                <Link href="/service" className="text-white hover:text-accent underline">
                  Contact our concierge team
                </Link>
              </p>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}


