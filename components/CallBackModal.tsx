"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

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
    
    (window as any).openCallbackModal = handleManualOpen;
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
        <div className="w-full flex-1 min-h-0 p-3 sm:p-4">
          <iframe
            src="https://app.ionorainternational.com/forms/wtl/ee5b8e9ca2f1345950875cd6a662a22e"
            width="100%"
            height="100%"
            frameBorder="0"
            sandbox="allow-top-navigation allow-forms allow-scripts allow-same-origin allow-popups"
            allowFullScreen
            className="w-full h-full rounded-lg border-0"
            title="Request a Call Back Form"
            style={{ minHeight: '400px' }}
          />
        </div>
      </div>
    </div>
  );
};

export default CallbackModal;
