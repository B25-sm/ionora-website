"use client";

import { useCallback, useEffect, useRef, useState, FormEvent } from "react";
import Image from "next/image";
import { api, ApiRequestError } from "@/lib/api";

const SESSION_KEY = "ionora.callback.modal.shown";
const SESSION_TIMESTAMP_KEY = "ionora.callback.modal.timestamp";
const POPUP_DELAY = 20_000;
const MIN_TIME_AFTER_CLOSED = 2 * 60 * 1000; // 2 minutes (120 seconds) after user closes/rejects
const MIN_TIME_AFTER_SUBMITTED = 5 * 60 * 1000; // 5 minutes after form is submitted

const isBrowser = () => typeof window !== "undefined";

const CallbackModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const timerRef = useRef<number | null>(null);
  const hasScheduledRef = useRef(false);
  
  // Form state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [state, setState] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    // Track when user closes/rejects the modal
    if (isBrowser()) {
      sessionStorage.setItem(SESSION_KEY, "closed");
      sessionStorage.setItem(SESSION_TIMESTAMP_KEY, Date.now().toString());
      console.log("[CallbackModal] Modal closed by user - will show again after 2 minutes");
    }
  }, []);

  const openModal = useCallback(() => {
    console.log("[CallbackModal] Opening modal");
    setIsOpen(true);
    if (isBrowser()) {
      sessionStorage.setItem(SESSION_KEY, "shown");
      sessionStorage.setItem(SESSION_TIMESTAMP_KEY, Date.now().toString());
    }
  }, []);

  // Main effect to schedule the modal
  useEffect(() => {
    if (!isBrowser()) return;
    
    // Prevent double scheduling (React Strict Mode)
    if (hasScheduledRef.current) {
      console.log("[CallbackModal] Already scheduled, skipping");
      return;
    }

    console.log("[CallbackModal] Component mounted");
    
    // Check sessionStorage with time-based logic
    try {
      const existingValue = sessionStorage.getItem(SESSION_KEY);
      const timestampStr = sessionStorage.getItem(SESSION_TIMESTAMP_KEY);
      console.log("[CallbackModal] SessionStorage value:", existingValue);
      console.log("[CallbackModal] Timestamp:", timestampStr);
      
      if (existingValue && timestampStr) {
        const lastActionTime = parseInt(timestampStr, 10);
        const timeSinceLastAction = Date.now() - lastActionTime;
        
        if (existingValue === "submitted") {
          // If form was submitted, wait 5 minutes
          if (timeSinceLastAction < MIN_TIME_AFTER_SUBMITTED) {
            const minutesRemaining = Math.ceil((MIN_TIME_AFTER_SUBMITTED - timeSinceLastAction) / 60000);
            console.log(`[CallbackModal] Form was submitted ${Math.floor(timeSinceLastAction / 1000)}s ago. Will show again in ${minutesRemaining} minute(s)`);
            return;
          } else {
            console.log("[CallbackModal] Enough time has passed since submission, allowing modal to show again");
            sessionStorage.removeItem(SESSION_KEY);
            sessionStorage.removeItem(SESSION_TIMESTAMP_KEY);
          }
        } else if (existingValue === "closed") {
          // If user closed/rejected, wait 2 minutes (120 seconds)
          if (timeSinceLastAction < MIN_TIME_AFTER_CLOSED) {
            const secondsRemaining = Math.ceil((MIN_TIME_AFTER_CLOSED - timeSinceLastAction) / 1000);
            console.log(`[CallbackModal] Modal was closed ${Math.floor(timeSinceLastAction / 1000)}s ago. Will show again in ${secondsRemaining} second(s) (2 minutes)`);
            console.log("[CallbackModal] To force show: window.openCallbackModal()");
            console.log("[CallbackModal] To reset: window.resetCallbackModal(); window.location.reload();");
            return;
          } else {
            console.log("[CallbackModal] 2 minutes have passed since close, allowing modal to show again");
            // Clear the old value so it can show again
            sessionStorage.removeItem(SESSION_KEY);
            sessionStorage.removeItem(SESSION_TIMESTAMP_KEY);
          }
        } else if (existingValue === "shown") {
          // If just shown (not closed), allow it to show again after a short delay
          if (timeSinceLastAction < 30000) { // 30 seconds
            console.log(`[CallbackModal] Modal was just shown ${Math.floor(timeSinceLastAction / 1000)}s ago, waiting...`);
            return;
          } else {
            // Clear if it's been a while
            sessionStorage.removeItem(SESSION_KEY);
            sessionStorage.removeItem(SESSION_TIMESTAMP_KEY);
          }
        }
      }
    } catch (error) {
      console.error("[CallbackModal] Error accessing sessionStorage:", error);
      // Continue anyway if sessionStorage fails
    }

    // Mark as scheduled immediately to prevent double scheduling
    hasScheduledRef.current = true;
    
    console.log(`[CallbackModal] Scheduling modal in ${POPUP_DELAY / 1000} seconds`);
    
    // Schedule the modal
    timerRef.current = window.setTimeout(() => {
      console.log("[CallbackModal] Timer fired!");
      openModal();
    }, POPUP_DELAY);
    
    console.log(`[CallbackModal] Timer ID: ${timerRef.current}`);

    // Cleanup on unmount
    return () => {
      if (timerRef.current !== null) {
        console.log("[CallbackModal] Cleaning up timer on unmount");
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [openModal]);

  // Manual open handler
  const handleManualOpen = useCallback(() => {
    if (!isBrowser()) return;
    console.log("[CallbackModal] Manual open triggered");
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    openModal();
  }, [openModal]);

  // Expose global functions for testing
  useEffect(() => {
    if (!isBrowser()) return;
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).openCallbackModal = handleManualOpen;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).resetCallbackModal = () => {
      if (isBrowser()) {
        sessionStorage.removeItem(SESSION_KEY);
        sessionStorage.removeItem(SESSION_TIMESTAMP_KEY);
        hasScheduledRef.current = false;
        console.log("[CallbackModal] Reset - reload page to see modal again");
      }
    };
    
    console.log("[CallbackModal] Test functions available:");
    console.log("  - window.openCallbackModal() - Open modal immediately");
    console.log("  - window.resetCallbackModal() - Reset sessionStorage");
  }, [handleManualOpen]);

  // Listen for manual open event
  useEffect(() => {
    if (!isBrowser()) return;
    window.addEventListener('callback:open', handleManualOpen);
    return () => {
      window.removeEventListener('callback:open', handleManualOpen);
    };
  }, [handleManualOpen]);

  // Manage body overflow when modal is open
  useEffect(() => {
    if (!isBrowser()) return;
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      if (isBrowser()) {
        document.body.style.overflow = "";
      }
    };
  }, [isOpen]);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setName("");
      setPhone("");
      setState("");
      setError(null);
      setSuccess(false);
    }
  }, [isOpen]);

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      // Submit to backend API (no token required - works without login)
      await api.post<
        { callbackRequest: unknown },
        { name: string; phone: string; state: string }
      >(
        "/public/callback-request",
        {
          name: name.trim(),
          phone: phone.trim(),
          state: state.trim(),
        }
      );

      // Success - mark as submitted and close after a delay
      setSuccess(true);
      if (isBrowser()) {
        sessionStorage.setItem(SESSION_KEY, "submitted");
        sessionStorage.setItem(SESSION_TIMESTAMP_KEY, Date.now().toString());
      }

      // Close modal after 2 seconds
      setTimeout(() => {
        closeModal();
      }, 2000);
    } catch (err) {
      if (err instanceof ApiRequestError) {
        // Handle validation errors
        if (err.details && typeof err.details === "object" && "errors" in err.details) {
          const errors = (err.details as { errors?: Array<{ msg?: string }> }).errors;
          if (errors && errors.length > 0) {
            setError(errors.map((e) => e.msg || "Validation error").join(", "));
          } else {
            setError(err.message || "Unable to submit callback request. Please try again.");
          }
        } else {
          setError(err.message || "Unable to submit callback request. Please try again.");
        }
      } else {
        setError("Unable to submit callback request. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[1200] flex items-center justify-center bg-black/50 p-2 sm:p-3">
      <div className="relative w-full max-w-md max-h-[90vh] rounded-2xl border border-gray-200 bg-white shadow-2xl flex flex-col overflow-hidden backdrop-blur-sm">
        <button
          type="button"
          onClick={closeModal}
          aria-label="Close request a call back modal"
          className="absolute right-2 top-2 z-20 text-xl text-gray-400 transition-all hover:text-gray-600 hover:bg-gray-100 rounded-full w-7 h-7 flex items-center justify-center"
        >
          &times;
        </button>

        {/* Header with Logo */}
        <div className="flex-shrink-0 px-4 pt-4 pb-2.5 sm:px-5 sm:pt-5 sm:pb-3 border-b border-gray-100">
          <div className="flex flex-col items-center justify-center space-y-1.5 sm:space-y-2">
            <div className="relative w-28 h-8 sm:w-32 sm:h-9 transition-transform hover:scale-105">
              <Image
                src="/images/ionora-logo.png"
                alt="IONORA - The Elite Market Place"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="space-y-0.5 text-center">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900 tracking-tight">
                Let our water experts call you back
              </h2>
              <p className="text-xs sm:text-sm text-gray-500">
                Request A Call Back
              </p>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="w-full flex-1 min-h-0 p-4 sm:p-5 overflow-y-auto">
          {success ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Request Submitted Successfully!
              </h3>
              <p className="text-sm text-gray-600">
                Our water experts will call you back shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="callback-name"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="callback-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 placeholder-gray-400 outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label
                  htmlFor="callback-phone"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  id="callback-phone"
                  type="tel"
                  required
                  minLength={7}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 placeholder-gray-400 outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
                  placeholder="Enter your phone number"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Phone number must be at least 7 characters long
                </p>
              </div>

              <div>
                <label
                  htmlFor="callback-state"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  State <span className="text-red-500">*</span>
                </label>
                <input
                  id="callback-state"
                  type="text"
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 placeholder-gray-400 outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
                  placeholder="Enter your state"
                />
              </div>

              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting || !name.trim() || !phone.trim() || !state.trim()}
                className="w-full rounded-lg bg-gray-900 px-4 py-3 text-base font-semibold text-white shadow-lg shadow-gray-900/20 transition hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:shadow-none"
              >
                {isSubmitting ? "Submitting..." : "Submit Request"}
              </button>

              <p className="text-xs text-center text-gray-500">
                You don&apos;t need to log in to submit a callback request
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default CallbackModal;
