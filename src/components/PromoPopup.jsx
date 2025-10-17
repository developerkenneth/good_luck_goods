import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FaTimes } from "react-icons/fa";

export default function AdPopup({
  interval = 10000,
  initialDelay = 10000,
  adContent = null,
}) {
  const [visible, setVisible] = useState(false);
  const intervalRef = useRef(null);
  const firstTimeoutRef = useRef(null);
  const modalRef = useRef(null);

  // Prevent background scroll when popup is visible
  useEffect(() => {
    if (visible) {
      document.documentElement.classList.add("overflow-hidden");
    } else {
      document.documentElement.classList.remove("overflow-hidden");
    }
    return () => document.documentElement.classList.remove("overflow-hidden");
  }, [visible]);

  // Show ad periodically
  useEffect(() => {
    // Show first ad after initialDelay
    firstTimeoutRef.current = setTimeout(() => {
      setVisible(true);

      // Repeat every interval
      intervalRef.current = setInterval(() => {
        setVisible(true);
      }, interval);
    }, initialDelay);

    return () => {
      clearTimeout(firstTimeoutRef.current);
      clearInterval(intervalRef.current);
    };
  }, [interval, initialDelay]);

  // Close when pressing ESC
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setVisible(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Click outside to close
  useEffect(() => {
    const onDocClick = (e) => {
      if (!visible) return;
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setVisible(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [visible]);

  // Default Ad Content
  const DefaultAd = () => (
    <div className="flex flex-col md:flex-row gap-4 items-center">
      <div className="w-full md:w-44 h-44 md:h-36 rounded-lg overflow-hidden shadow-inner">
        <img
          src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=60"
          alt="promo"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
          Limited time offer — 20% off selected items!
        </h3>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
          Hot deals on electronics, fashion and more. Tap below to shop before
          the offer ends.
        </p>

        <div className="mt-4 flex items-center gap-3">
          <a
            href="/shop?promo=fall20"
            className="inline-block bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-md text-sm shadow"
          >
            Shop Now
          </a>
          <button
            onClick={() => setVisible(false)}
            className="text-sm text-gray-600 dark:text-gray-300 underline"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(
    <>
      {visible && (
        <div
          aria-hidden={!visible}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

          {/* Modal */}
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            className="relative z-10 max-w-xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-5 md:p-6 transform transition-all duration-300 ease-out opacity-100 scale-100 animate-fade-in"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="inline-block w-10 h-10 rounded-full bg-pink-50 dark:bg-pink-900 text-pink-600 dark:text-pink-200 flex items-center justify-center font-bold">
                  AD
                </span>
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    Sponsored
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Limited time promotion
                  </p>
                </div>
              </div>

              <button
                aria-label="Close ad"
                onClick={() => setVisible(false)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
              >
                <FaTimes />
              </button>
            </div>

            {/* Content */}
            <div className="mt-4">{adContent ? adContent : <DefaultAd />}</div>
          </div>
        </div>
      )}
    </>,
    document.body
  );
}
