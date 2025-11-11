'use client';

import { FormEvent, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { api, ApiRequestError } from '@/lib/api';
import { authStorage } from '@/lib/authStorage';

type RegisterResponse = {
  token: string;
  user: {
    id: string;
    email: string;
    full_name: string;
    phone?: string | null;
    email_verified?: boolean;
    created_at?: string;
    updated_at?: string;
    last_login?: string | null;
  };
};

export default function RegisterPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isDisabled = useMemo(() => {
    if (isSubmitting) return true;
    if (!fullName.trim() || !email.trim() || password.length < 8) return true;
    if (!phone.trim() || phone.trim().length < 5) return true;
    if (password !== confirmPassword) return true;
    return false;
  }, [isSubmitting, fullName, email, phone, password, confirmPassword]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await api.post<
        RegisterResponse,
        { email: string; password: string; full_name: string; phone: string }
      >('/auth/register', {
        email,
        password,
        full_name: fullName,
        phone: phone.trim(),
      });

      authStorage.save(response);
      router.push('/login?signup=success');
    } catch (err) {
      if (err instanceof ApiRequestError) {
        setError(err.message || 'Unable to create account. Please try again.');
      } else {
        setError('Unable to create account. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-x-0 -top-32 -z-10 h-96 bg-[radial-gradient(circle_at_top,_rgba(15,76,129,0.12),_transparent_60%)]" />
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-4 py-20 sm:px-6 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-[1.2fr_440px] lg:items-center">
          <div className="space-y-8 text-slate-900">
            <div className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-medium uppercase tracking-[0.3em] text-slate-500">
              Exclusive membership
            </div>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Your Ionora journey starts here.
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
              Create an account to curate favourites, book service support, and unlock concierge guidance.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-xl shadow-slate-900/5">
            <div className="mb-8 space-y-2 text-center">
              <h2 className="text-2xl font-semibold text-slate-900">Join the Ionora Circle</h2>
              <p className="text-sm text-slate-600">
                A few details is all it takes to start your premium experience.
              </p>
            </div>

            <form className="space-y-6" onSubmit={onSubmit} noValidate>
              <div className="space-y-2">
                <label htmlFor="full_name" className="block text-sm font-medium text-slate-700">
                  Full name
                </label>
                <input
                  id="full_name"
                  name="full_name"
                  type="text"
                  autoComplete="name"
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-inner outline-none transition focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-900/5"
                  placeholder="Your name"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                />
              <p
                className={`text-xs ${
                  fullName.trim().length === 0 ? 'text-red-500' : 'text-slate-500'
                }`}
              >
                {fullName.trim().length === 0 ? 'Full name is required.' : 'Enter your full name.'}
              </p>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-inner outline-none transition focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-900/5"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              <p
                className={`text-xs ${
                  email.trim().length === 0 ? 'text-red-500' : 'text-slate-500'
                }`}
              >
                {email.trim().length === 0
                  ? 'Email address is required.'
                  : 'We will send confirmations to this email.'}
              </p>
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="block text-sm font-medium text-slate-700">
                  Phone number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  minLength={5}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-inner outline-none transition focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-900/5"
                  placeholder="+91 12345 67890"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                />
              <p
                className={`text-xs ${
                  phone.trim().length === 0 || phone.trim().length < 5
                    ? 'text-red-500'
                    : 'text-slate-500'
                }`}
              >
                {phone.trim().length === 0
                  ? 'Phone number is required.'
                  : phone.trim().length < 5
                    ? 'Phone number must be at least 5 characters long.'
                    : 'We will use this number for delivery and service updates.'}
              </p>
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  minLength={8}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-inner outline-none transition focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-900/5"
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <p
                  className={`text-xs ${
                    password && password.length < 8 ? 'text-red-500' : 'text-slate-500'
                  }`}
                >
                  {password && password.length < 8
                    ? 'Password must be at least 8 characters long.'
                    : 'Use at least 8 characters for security.'}
                </p>
              </div>

              <div className="space-y-2">
                <label htmlFor="confirm_password" className="block text-sm font-medium text-slate-700">
                  Confirm password
                </label>
                <input
                  id="confirm_password"
                  name="confirm_password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-inner outline-none transition focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-900/5"
                  placeholder="Repeat your password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                />
                {password && confirmPassword && password !== confirmPassword && (
                  <p className="text-xs text-red-500">Passwords do not match.</p>
                )}
                {(!confirmPassword || password === confirmPassword) && (
                  <p className="text-xs text-slate-500">Retype your password to confirm.</p>
                )}
              </div>

              {error && (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isDisabled}
                className="flex w-full items-center justify-center rounded-2xl bg-slate-900 px-4 py-3 text-base font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 disabled:cursor-not-allowed disabled:bg-slate-400 disabled:shadow-none"
              >
                {isSubmitting ? 'Creating account…' : 'Create account'}
              </button>
            </form>

            <div className="mt-8 text-center text-sm text-slate-600">
              Already have an account?{' '}
              <Link href="/login" className="font-semibold text-slate-900 hover:text-slate-700">
                Sign in instead
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}


