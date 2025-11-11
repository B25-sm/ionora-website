'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { api, ApiRequestError } from '@/lib/api';
import { authStorage } from '@/lib/authStorage';

type LoginResponse = {
  token: string;
  user: {
    id: string;
    email: string;
    full_name?: string;
    phone?: string | null;
    email_verified?: boolean;
    created_at?: string;
    updated_at?: string;
    last_login?: string | null;
  };
};

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [flashMessage, setFlashMessage] = useState<string | null>(null);

  useEffect(() => {
    const signupStatus = searchParams.get('signup');

    if (signupStatus === 'success' && !flashMessage) {
      setFlashMessage('Account created successfully. Please sign in to continue.');

      const params = new URLSearchParams(searchParams.toString());
      params.delete('signup');

      const nextQuery = params.toString();

      router.replace(`/login${nextQuery ? `?${nextQuery}` : ''}`, { scroll: false });
    }
  }, [flashMessage, router, searchParams]);

  const isDisabled = useMemo(
    () => !email.trim() || !password.trim() || isSubmitting,
    [email, password, isSubmitting],
  );

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await api.post<LoginResponse, { email: string; password: string }>(
        '/auth/login',
        { email, password },
      );

      authStorage.save(response);
      router.push('/');
    } catch (err) {
      if (err instanceof ApiRequestError) {
        setError(err.message || 'Unable to log in. Please try again.');
      } else {
        setError('Unable to log in. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-x-0 -top-32 -z-10 h-96 bg-[radial-gradient(circle_at_top,_rgba(15,76,129,0.12),_transparent_60%)]" />
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-4 py-20 sm:px-6 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-[1.1fr_420px] lg:items-center">
          <div className="space-y-8 text-slate-900">
            <div className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-medium uppercase tracking-[0.3em] text-slate-500">
              Premium access
            </div>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Welcome back to Ionora.
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
              Pick up where you left off—favourites, carts, and concierge updates are waiting.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-xl shadow-slate-900/5">
            <div className="mb-8 space-y-2 text-center">
              <h2 className="text-2xl font-semibold text-slate-900">Sign in to Ionora</h2>
              <p className="text-sm text-slate-600">
                Enter your credentials to access your premium dashboard.
              </p>
            </div>

            {flashMessage && (
              <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 shadow shadow-emerald-900/10">
                {flashMessage}
              </div>
            )}

            <form className="space-y-6" onSubmit={onSubmit} noValidate>
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
                  ? 'Email address is required to sign in.'
                  : 'Use the email linked to your Ionora account.'}
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
                  autoComplete="current-password"
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-inner outline-none transition focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-900/5"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              <p
                className={`text-xs ${
                  password.trim().length === 0 ? 'text-red-500' : 'text-slate-500'
                }`}
              >
                {password.trim().length === 0
                  ? 'Password cannot be empty.'
                  : 'Keep your credentials confidential.'}
              </p>
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
                {isSubmitting ? 'Signing in…' : 'Sign in'}
              </button>
            </form>

            <div className="mt-8 space-y-3 text-center text-sm text-slate-600">
              <Link href="/forgot-password" className="font-medium text-slate-900 hover:text-slate-700">
                Forgot your password?
              </Link>
              <div>
                Need an account?{' '}
                <Link href="/register" className="font-semibold text-slate-900 hover:text-slate-700">
                  Create one
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}


