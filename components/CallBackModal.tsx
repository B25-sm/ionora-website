"use client";

import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { authStorage } from "@/lib/authStorage";
import { ApiRequestError, api } from "@/lib/api";

const SESSION_KEY = "ionora.callback.modal.shown";
const POPUP_DELAY = 20_000;

const isBrowser = () => typeof window !== "undefined";

const CallbackModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const timerRef = useRef<number | null>(null);
  const closeTimeoutRef = useRef<number | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null && isBrowser()) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const clearCloseTimeout = useCallback(() => {
    if (closeTimeoutRef.current !== null && isBrowser()) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }, []);

  const closeModal = useCallback(() => {
    clearCloseTimeout();
    setIsOpen(false);
    setIsSubmitting(false);
    setSubmitError(null);
    setIsSuccess(false);
  }, [clearCloseTimeout]);

  const scheduleModal = useCallback(() => {
    if (!isBrowser()) return;
    if (!authStorage.token()) return;
    if (sessionStorage.getItem(SESSION_KEY)) return;

    clearTimer();
    timerRef.current = window.setTimeout(() => {
      if (!authStorage.token()) return;
      setIsOpen(true);
      sessionStorage.setItem(SESSION_KEY, "shown");
    }, POPUP_DELAY);
  }, [clearTimer]);

  useEffect(() => {
    if (!isBrowser()) return;

    if (authStorage.token()) {
      if (sessionStorage.getItem(SESSION_KEY) !== "submitted") {
        sessionStorage.removeItem(SESSION_KEY);
      }
      scheduleModal();
    }

    const handleAuthChange = () => {
      const hasToken = Boolean(authStorage.token());

      if (hasToken) {
        if (sessionStorage.getItem(SESSION_KEY) !== "submitted") {
          sessionStorage.removeItem(SESSION_KEY);
        }
        scheduleModal();
      } else {
        clearTimer();
        sessionStorage.removeItem(SESSION_KEY);
        setIsOpen(false);
      }
    };

    window.addEventListener("auth:changed", handleAuthChange);

    return () => {
      clearTimer();
      clearCloseTimeout();
      window.removeEventListener("auth:changed", handleAuthChange);
    };
  }, [clearTimer, scheduleModal, clearCloseTimeout]);

  useEffect(() => {
    if (!isBrowser()) return;
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      if (!isBrowser()) return;
      document.body.style.overflow = "";
      clearTimer();
      clearCloseTimeout();
    };
  }, [isOpen, clearTimer, clearCloseTimeout]);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (isSubmitting) return;

      if (!isBrowser()) return;

      const token = authStorage.token();

      if (!token) {
        setSubmitError("Please log in to submit a callback request.");
        return;
      }

      const formData = new FormData(event.currentTarget);
      const name = String(formData.get("name") ?? "").trim();
      const phone = String(formData.get("phone") ?? "").trim();
      const state = String(formData.get("state") ?? "").trim();

      if (!name || !phone || !state) {
        setSubmitError("All fields are required.");
        return;
      }

      setSubmitError(null);
      setIsSuccess(false);
      setIsSubmitting(true);

      try {
        await api.post<{ callbackRequest: unknown }>(
          "/user/callback-request",
          { name, phone, state },
          { token },
        );

        sessionStorage.setItem(SESSION_KEY, "submitted");
        setIsSuccess(true);
        event.currentTarget.reset();

        clearCloseTimeout();
        closeTimeoutRef.current = window.setTimeout(() => {
          setIsSuccess(false);
          closeModal();
        }, 2000);
      } catch (error) {
        console.error("Callback request submission error:", error);
        let message = "Something went wrong. Please try again.";
        if (error instanceof ApiRequestError) {
          message = error.message;
        }
        setSubmitError(message);
      } finally {
        setIsSubmitting(false);
      }
    },
    [clearCloseTimeout, closeModal, isSubmitting],
  );

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[1200] flex items-center justify-center bg-black/50 px-4">
      <div className="relative w-full max-w-md rounded-[32px] border-[6px] border-primary-500 bg-white p-6 shadow-2xl sm:p-8">
        <button
          type="button"
          onClick={closeModal}
          aria-label="Close request a call back modal"
          className="absolute right-4 top-4 text-2xl text-gray-400 transition-colors hover:text-gray-600"
        >
          &times;
        </button>

        <div className="space-y-6 text-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 sm:text-2xl">
              Let our water experts call you back:
            </h2>
          </div>

          <div className="flex h-48 w-full items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-white">
            <Image
              src="/images/ionora-logo.png"
              alt="Ionora water ionizers"
              width={400}
              height={240}
              className="max-h-full w-auto object-contain"
              priority
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Request A Call Back:
            </h3>
          </div>

          <form className="space-y-4 text-left" onSubmit={handleSubmit}>
            {submitError && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                {submitError}
              </p>
            )}
            {isSuccess && (
              <p className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-600">
                Thank you! Our team will reach out shortly.
              </p>
            )}
            <label className="block">
              <span className="mb-1 block text-sm font-semibold text-gray-700">
                Name <span className="text-red-500">*</span>
              </span>
              <input
                type="text"
                name="name"
                required
                placeholder="Full Name"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-semibold text-gray-700">
                Phone <span className="text-red-500">*</span>
              </span>
              <div className="flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
                <span className="text-sm font-medium text-gray-600">+91</span>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="081234 56789"
                  className="flex-1 border-none bg-transparent text-sm text-gray-900 outline-none focus:ring-0"
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-semibold text-gray-700">
                State <span className="text-red-500">*</span>
              </span>
              <input
                type="text"
                name="state"
                required
                placeholder="Enter your state"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-primary-500 px-4 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CallbackModal;


