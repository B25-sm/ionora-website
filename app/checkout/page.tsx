'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Check, Loader2, MapPin, Plus, X } from 'lucide-react';

import { useCart } from '@/components/cart/CartProvider';
import { api, ApiRequestError } from '@/lib/api';
import { authStorage } from '@/lib/authStorage';

type Address = {
  id: string;
  address_type: 'billing' | 'shipping' | 'home' | 'office' | 'other';
  full_address: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  is_default: boolean;
  created_at?: string;
};

type CheckoutIssue = {
  product_id: string;
  issue: string;
  message: string;
};

type CheckoutSummary = {
  subtotal: number;
  tax: number;
  shipping: number;
  discount?: number;
  total: number;
};

type CheckoutValidationResponse = {
  valid: boolean;
  items: {
    id: string;
    product_id: string;
    quantity: number;
    name: string;
    description?: string;
    price: number;
    final_price: number;
    discount_percentage: number;
    stock_quantity: number;
    images?: string[] | null;
    is_active: boolean;
    item_total: number;
  }[];
  summary: CheckoutSummary;
  issues: CheckoutIssue[];
};

type CreateOrderResponse = {
  order: {
    id: string;
    order_number: string;
    totals: CheckoutSummary & { coupon?: unknown };
    coupon: null | {
      code: string;
      discount_type: string;
      discount_value: number;
      min_order_value: number;
      max_uses: number | null;
      remaining_uses: number | null;
      valid_from: string | null;
      valid_until: string | null;
    };
  };
  razorpay_order_id: string;
  amount: number;
  currency: string;
  key_id?: string;
};

type ProcessPaymentResponse = {
  message: string;
  order: {
    id: string;
    order_number: string;
    status: string;
    payment_status: string;
    total_amount: string;
    items: {
      product_id: string;
      quantity: number;
      price_at_purchase: number;
      subtotal: number;
      name: string;
      final_price: number;
    }[];
  };
};

type RazorpaySuccessPayload = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

type RazorpayOptions = {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description?: string;
  order_id: string;
  handler: (response: RazorpaySuccessPayload) => void;
  prefill?: {
    name?: string | null;
    email?: string | null;
    contact?: string | null;
  };
  notes?: Record<string, string | number | boolean | null | undefined>;
  theme?: { color?: string };
  modal?: {
    ondismiss?: () => void;
    confirm_close?: boolean;
  };
};

type RazorpayInstance = {
  open: () => void;
  close: () => void;
  on: (
    event: 'payment.failed',
    handler: (response: { error: { description: string; reason: string } }) => void,
  ) => void;
};

const RAZORPAY_SDK_URL = 'https://checkout.razorpay.com/v1/checkout.js';

const loadRazorpayScript = (() => {
  let promise: Promise<void> | null = null;

  return () => {
    if (typeof window === 'undefined') {
      return Promise.reject(new Error('Razorpay SDK can only be loaded in the browser.'));
    }

    if (window.Razorpay) {
      return Promise.resolve();
    }

    if (!promise) {
      promise = new Promise<void>((resolve, reject) => {
        const script = document.createElement('script');
        script.src = RAZORPAY_SDK_URL;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load Razorpay SDK.'));
        document.body.appendChild(script);
      });
    }

    return promise;
  };
})();

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);

const getErrorMessage = (error: unknown, fallback = 'Something went wrong. Please try again.') => {
  if (error instanceof ApiRequestError) {
    return error.message;
  }
  if (error instanceof Error) {
    return error.message || fallback;
  }
  return fallback;
};

type AddressFormState = {
  full_address: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  is_default: boolean;
};

const initialAddressState: AddressFormState = {
  full_address: '',
  city: '',
  state: '',
  pincode: '',
  country: 'India',
  is_default: true,
};

export default function CheckoutPage() {
  const router = useRouter();
  const {
    items,
    summary,
    loading: cartLoading,
    error: cartError,
    refresh,
    isAuthenticated,
    initialized: cartInitialized,
  } = useCart();

  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState(authStorage.user());

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [addressForm, setAddressForm] = useState<AddressFormState>(initialAddressState);
  const [showAddressForm, setShowAddressForm] = useState(false);

  const [addressesLoading, setAddressesLoading] = useState(false);
  const [addressesError, setAddressesError] = useState<string | null>(null);

  const [validationLoading, setValidationLoading] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [validation, setValidation] = useState<CheckoutValidationResponse | null>(null);

  const [processing, setProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState<
    'idle' | 'creating-order' | 'awaiting-payment' | 'verifying-payment' | 'completed'
  >('idle');
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [orderResult, setOrderResult] = useState<ProcessPaymentResponse | null>(null);

  const hasCartItems = items.length > 0;
  const shouldRedirectToCart =
    cartInitialized && !cartLoading && !cartError && !hasCartItems && processingStage !== 'completed';
  const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ?? '';

  const canSubmit =
    !processing &&
    hasCartItems &&
    Boolean(selectedAddressId) &&
    !!validation &&
    validation.valid &&
    !validationLoading;

  useEffect(() => {
    setToken(authStorage.token());
    setUser(authStorage.user());

    const handleAuthChanged = () => {
      setToken(authStorage.token());
      setUser(authStorage.user());
    };

    window.addEventListener('auth:changed', handleAuthChanged);

    return () => {
      window.removeEventListener('auth:changed', handleAuthChanged);
    };
  }, []);

  const fetchAddresses = useCallback(async () => {
    if (!token) return;
    setAddressesLoading(true);
    setAddressesError(null);

    try {
      const response = await api.get<{ addresses: Address[] }>('/user/addresses', {
        token,
        cache: 'no-store',
      });
      const sorted = response.addresses ?? [];
      setAddresses(sorted);

      if (sorted.length > 0) {
        const defaultAddress = sorted.find((addr) => addr.is_default);
        setSelectedAddressId((prev) => prev ?? defaultAddress?.id ?? sorted[0].id);
      } else {
        setSelectedAddressId(null);
        setShowAddressForm(true);
      }
    } catch (error) {
      setAddressesError(getErrorMessage(error, 'Unable to load addresses.'));
    } finally {
      setAddressesLoading(false);
    }
  }, [token]);

  const validateCheckout = useCallback(async () => {
    if (!token) return;
    setValidationLoading(true);
    setValidationError(null);

    try {
      const response = await api.post<CheckoutValidationResponse>(
        '/checkout/validate',
        {},
        {
          token,
          cache: 'no-store',
        },
      );
      setValidation(response);
    } catch (error) {
      setValidationError(getErrorMessage(error, 'Unable to validate cart for checkout.'));
    } finally {
      setValidationLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (!token) return;
    fetchAddresses();
    validateCheckout();
  }, [token, fetchAddresses, validateCheckout]);

  useEffect(() => {
    if (shouldRedirectToCart) {
      router.replace('/cart');
    }
  }, [shouldRedirectToCart, router]);

  useEffect(() => {
    if (
      validation &&
      validation.issues.length > 0 &&
      validation.issues.some((issue) => issue.issue === 'stock')
    ) {
      refresh();
    }
  }, [validation, refresh]);

  const handleAddressFormChange = (field: keyof AddressFormState, value: string | boolean) => {
    setAddressForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmitAddress = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!token) {
      setAddressesError('Please sign in to add an address.');
      return;
    }

    const trimmedAddress = addressForm.full_address.trim();
    const trimmedCity = addressForm.city.trim();
    const trimmedState = addressForm.state.trim();
    const trimmedPincode = addressForm.pincode.trim();
    const trimmedCountry = addressForm.country.trim();

    if (!trimmedAddress || !trimmedCity || !trimmedState || !trimmedPincode || !trimmedCountry) {
      setAddressesError('All address fields are required.');
      return;
    }

    setAddressesError(null);
    setAddressesLoading(true);

    try {
      const response = await api.post<{ address: Address }>(
        '/user/address',
        {
          address_type: 'shipping',
          full_address: trimmedAddress,
          city: trimmedCity,
          state: trimmedState,
          pincode: trimmedPincode,
          country: trimmedCountry,
          is_default: addressForm.is_default,
        },
        { token },
      );

      const newAddress = response.address;
      setAddresses((prev) => [newAddress, ...prev]);
      setSelectedAddressId(newAddress.id);
      setShowAddressForm(false);
      setAddressForm(initialAddressState);
    } catch (error) {
      setAddressesError(getErrorMessage(error, 'Unable to save address.'));
    } finally {
      setAddressesLoading(false);
    }
  };

  const currencySummary = useMemo(() => {
    const activeSummary = validation?.summary ?? summary;
    return {
      subtotal: formatCurrency(activeSummary.subtotal),
      tax: formatCurrency(activeSummary.tax),
      shipping: activeSummary.shipping === 0 ? 'Free' : formatCurrency(activeSummary.shipping),
      total: formatCurrency(activeSummary.total),
      discount:
        activeSummary.discount && activeSummary.discount > 0
          ? formatCurrency(activeSummary.discount)
          : null,
    };
  }, [summary, validation]);

  const startPayment = async () => {
    if (!token) {
      setPaymentError('Please sign in to complete your order.');
      return;
    }

    if (!selectedAddressId) {
      setPaymentError('Please select a shipping address.');
      return;
    }

    setProcessing(true);
    setPaymentError(null);
    setProcessingStage('creating-order');

    try {
      const order = await api.post<CreateOrderResponse>(
        '/checkout/create-order',
        {
          shipping_address_id: selectedAddressId,
          payment_method: 'razorpay',
        },
        { token },
      );

      const publicKey = order.key_id ?? razorpayKey;

      if (!publicKey) {
        throw new Error('Razorpay key is not configured.');
      }

      await loadRazorpayScript();

      if (!window.Razorpay) {
        throw new Error('Razorpay SDK not available.');
      }

      setProcessingStage('awaiting-payment');

      await new Promise<void>((resolve, reject) => {
        let paymentHandled = false;

        const razorpay = new window.Razorpay({
          key: publicKey,
          amount: order.amount,
          currency: order.currency,
          name: 'Ionora',
          description: `Order ${order.order.order_number}`,
          order_id: order.razorpay_order_id,
          prefill: {
            name: user?.full_name ?? null,
            email: user?.email ?? null,
          },
          notes: {
            order_id: order.order.id,
          },
          modal: {
            confirm_close: true,
            ondismiss: () => {
              if (!paymentHandled) {
                setProcessing(false);
                setProcessingStage('idle');
                setPaymentError('Payment cancelled.');
                reject(new Error('Payment cancelled'));
              }
            },
          },
          handler: async (response: RazorpaySuccessPayload) => {
            paymentHandled = true;

            try {
              setProcessingStage('verifying-payment');
              const verification = await api.post<ProcessPaymentResponse>(
                '/checkout/payment',
                {
                  order_id: order.order.id,
                  ...response,
                },
                { token },
              );

              setOrderResult(verification);
              setProcessingStage('completed');
              setProcessing(false);
              refresh();
              resolve();
            } catch (error) {
              setProcessing(false);
              setProcessingStage('idle');
              const message = getErrorMessage(error, 'Unable to verify payment.');
              setPaymentError(message);
              reject(error instanceof Error ? error : new Error(message));
            }
          },
        });

        razorpay.on('payment.failed', ({ error: err }) => {
          paymentHandled = true;
          setProcessing(false);
          setProcessingStage('idle');
          setPaymentError(
            `Payment failed${err?.description ? `: ${err.description}` : ''}`,
          );
          reject(new Error(err?.description || 'Payment failed'));
        });

        razorpay.open();
      });
    } catch (error) {
      if (!(error instanceof Error && error.message === 'Payment cancelled')) {
        setPaymentError(getErrorMessage(error, 'Unable to complete checkout.'));
      }
      setProcessing(false);
      setProcessingStage('idle');
    }
  };

  if (!isAuthenticated) {
    return (
      <section className="min-h-[calc(100dvh-6rem)] bg-gradient-to-b from-[#0A0F2C] via-[#1a1f3c] to-[#0A0F2C] text-white flex items-center">
        <div className="max-w-3xl mx-auto px-6 py-24 text-center space-y-6">
          <h1 className="text-3xl sm:text-4xl font-semibold">Sign in to checkout</h1>
          <p className="text-white/70 text-base sm:text-lg">
            Your cart and saved addresses are linked to your Ionora account. Please sign in to
            complete your purchase.
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

  if (cartError) {
    return (
      <section className="min-h-[calc(100dvh-6rem)] bg-gradient-to-b from-[#0A0F2C] via-[#1a1f3c] to-[#0A0F2C] text-white flex items-center">
        <div className="max-w-2xl mx-auto px-6 py-20 text-center space-y-6">
          <h1 className="text-3xl font-semibold">We ran into an issue</h1>
          <p className="text-white/70">{cartError}</p>
          <Link
            href="/cart"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold hover:opacity-90 transition"
          >
            Return to cart
          </Link>
        </div>
      </section>
    );
  }

  if (orderResult && processingStage === 'completed') {
    return (
      <section className="min-h-[calc(100dvh-6rem)] bg-gradient-to-b from-[#0A0F2C] via-[#1a1f3c] to-[#0A0F2C] text-white flex items-center">
        <div className="max-w-3xl mx-auto px-6 py-20 text-center space-y-8">
          <div className="mx-auto h-16 w-16 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-400/50">
            <Check className="h-8 w-8 text-emerald-400" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold">Payment successful!</h1>
            <p className="text-white/70">Order {orderResult.order.order_number} is confirmed.</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-4 text-left">
            <div className="flex items-center justify-between text-sm text-white/80">
              <span>Total paid</span>
              <span>{formatCurrency(Number(orderResult.order.total_amount))}</span>
            </div>
            <div className="text-sm text-white/60">
              We have emailed your order confirmation. Our concierge team will contact you to arrange
              delivery and installation.
            </div>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold hover:opacity-90 transition"
          >
            Continue shopping
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-[calc(100dvh-6rem)] bg-gradient-to-b from-[#0A0F2C] via-[#1a1f3c] to-[#0A0F2C] text-white">
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16 space-y-10">
        <header className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-semibold">Checkout</h1>
          <p className="text-white/60 text-sm sm:text-base">
            Complete your purchase securely with Razorpay. We&apos;ll confirm your order instantly.
          </p>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-8 lg:gap-12">
          <div className="space-y-8">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 lg:p-8 space-y-6">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-emerald-300" />
                  Shipping address
                </h2>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddressForm((prev) => !prev);
                    setAddressesError(null);
                  }}
                  className="inline-flex items-center gap-2 text-sm text-emerald-300 hover:text-emerald-200 transition"
                >
                  {showAddressForm ? (
                    <>
                      <X className="h-4 w-4" />
                      Cancel
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4" />
                      Add new address
                    </>
                  )}
                </button>
              </div>

              {addressesError && (
                <div className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {addressesError}
                </div>
              )}

              {addressesLoading && addresses.length === 0 ? (
                <div className="flex items-center justify-center py-10">
                  <Loader2 className="h-6 w-6 animate-spin text-white/70" />
                </div>
              ) : null}

              {showAddressForm && (
                <form className="space-y-4" onSubmit={handleSubmitAddress}>
                  <div>
                    <label className="block text-sm text-white/70 mb-2">Full address</label>
                    <textarea
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                      rows={3}
                      value={addressForm.full_address}
                      onChange={(event) =>
                        handleAddressFormChange('full_address', event.target.value)
                      }
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-white/70 mb-2">City</label>
                      <input
                        type="text"
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                        value={addressForm.city}
                        onChange={(event) => handleAddressFormChange('city', event.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-white/70 mb-2">State</label>
                      <input
                        type="text"
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                        value={addressForm.state}
                        onChange={(event) => handleAddressFormChange('state', event.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-white/70 mb-2">Pincode</label>
                      <input
                        type="text"
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                        value={addressForm.pincode}
                        onChange={(event) =>
                          handleAddressFormChange('pincode', event.target.value)
                        }
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-white/70 mb-2">Country</label>
                      <input
                        type="text"
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                        value={addressForm.country}
                        onChange={(event) =>
                          handleAddressFormChange('country', event.target.value)
                        }
                        required
                      />
                    </div>
                  </div>
                  <label className="inline-flex items-center gap-2 text-sm text-white/70">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-white/30 bg-white/10 text-emerald-400 focus:ring-emerald-400/60"
                      checked={addressForm.is_default}
                      onChange={(event) =>
                        handleAddressFormChange('is_default', event.target.checked)
                      }
                    />
                    Make this my default shipping address
                  </label>
                  <button
                    type="submit"
                    disabled={addressesLoading}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 px-5 py-3 text-sm font-semibold text-[#062031] hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {addressesLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Check className="h-4 w-4" />
                        Save address
                      </>
                    )}
                  </button>
                </form>
              )}

              {!showAddressForm && addresses.length === 0 && !addressesLoading ? (
                <div className="text-sm text-white/60">
                  No shipping addresses yet. Add one to continue checkout.
                </div>
              ) : null}

              {!showAddressForm && addresses.length > 0 ? (
                <div className="space-y-4">
                  {addresses.map((address) => (
                    <label
                      key={address.id}
                      className={`block rounded-2xl border px-4 py-4 transition ${
                        selectedAddressId === address.id
                          ? 'border-emerald-400/70 bg-emerald-400/10'
                          : 'border-white/10 bg-white/5 hover:border-white/30'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <input
                          type="radio"
                          name="shipping_address"
                          value={address.id}
                          checked={selectedAddressId === address.id}
                          onChange={() => setSelectedAddressId(address.id)}
                          className="mt-1 h-4 w-4 border-white/30 bg-white/10 text-emerald-400 focus:ring-emerald-400/60"
                        />
                        <div className="space-y-1 text-sm">
                          <div className="font-medium text-white">
                            {address.address_type.toUpperCase()}
                            {address.is_default ? (
                              <span className="ml-2 inline-flex items-center rounded-full bg-emerald-400/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-200">
                                Default
                              </span>
                            ) : null}
                          </div>
                          <div className="text-white/70 whitespace-pre-line">
                            {address.full_address}
                          </div>
                          <div className="text-white/50">
                            {address.city}, {address.state} {address.pincode}, {address.country}
                          </div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 lg:p-8 space-y-6">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-xl font-semibold">Order review</h2>
                <Link
                  href="/cart"
                  className="text-sm text-emerald-300 hover:text-emerald-200 transition"
                >
                  Edit cart
                </Link>
              </div>

              {validationLoading ? (
                <div className="flex items-center gap-3 text-sm text-white/70">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Recalculating totals...
                </div>
              ) : null}

              {validationError ? (
                <div className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {validationError}
                </div>
              ) : null}

              {validation?.issues && validation.issues.length > 0 ? (
                <div className="rounded-xl border border-amber-400/40 bg-amber-400/10 px-4 py-3 text-sm text-amber-100 space-y-1">
                  <div className="font-semibold text-amber-200">Heads up before paying:</div>
                  <ul className="list-disc list-inside space-y-1">
                    {validation.issues.map((issue) => (
                      <li key={`${issue.product_id}-${issue.issue}`}>{issue.message}</li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="border border-white/10 rounded-2xl px-4 py-3 flex items-center justify-between text-sm"
                  >
                    <div className="flex-1">
                      <div className="font-medium text-white">{item.product.name}</div>
                      <div className="text-white/50">Qty {item.quantity}</div>
                    </div>
                    <div className="text-white font-semibold">{formatCurrency(item.item_total)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="bg-white/5 border border-white/10 rounded-3xl p-6 lg:p-8 space-y-6 h-fit sticky top-24">
            <div>
              <h2 className="text-2xl font-semibold mb-1">Payment summary</h2>
              <p className="text-white/60 text-sm">
                Razorpay secures your payment. We only charge once the transaction is confirmed.
              </p>
            </div>
            <div className="space-y-3 text-sm text-white/80">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{currencySummary.subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated tax</span>
                <span>{currencySummary.tax}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{currencySummary.shipping}</span>
              </div>
              {currencySummary.discount ? (
                <div className="flex justify-between text-emerald-300">
                  <span>Discount</span>
                  <span>-{currencySummary.discount}</span>
                </div>
              ) : null}
              <div className="border-t border-white/10 my-4"></div>
              <div className="flex justify-between text-base font-semibold text-white">
                <span>Total</span>
                <span>{currencySummary.total}</span>
              </div>
            </div>
            {paymentError ? (
              <div className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {paymentError}
              </div>
            ) : null}
            <button
              type="button"
              onClick={startPayment}
              disabled={!canSubmit}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 px-6 py-3.5 text-base font-semibold text-[#062031] hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {processing ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  {processingStage === 'creating-order'
                    ? 'Creating order...'
                    : processingStage === 'verifying-payment'
                      ? 'Verifying payment...'
                      : 'Waiting for payment...'}
                </>
              ) : (
                'Pay securely with Razorpay'
              )}
            </button>
            <p className="text-xs text-white/50">
              By placing this order you agree to our{' '}
              <Link href="/privacy-policy" className="text-white hover:text-emerald-300 underline">
                privacy policy
              </Link>{' '}
              and{' '}
              <Link href="/warranty-replacement-policy" className="text-white hover:text-emerald-300 underline">
                warranty terms
              </Link>
              .
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}


