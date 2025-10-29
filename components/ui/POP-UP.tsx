"use client";

import { useState, useEffect } from "react";

export const Popup = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show on every page reload after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => setIsVisible(false);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="relative w-full max-w-sm sm:max-w-md bg-white shadow-2xl p-6 sm:p-8 text-center border border-gray-200">
        {/* ❌ Close Button */}
        <button
          onClick={handleClose}
          aria-label="Close popup"
          className="absolute top-3 right-4 text-gray-400 hover:text-black text-2xl transition"
        >
          ✕
        </button>

        {/* 🛍️ Heading */}
        <h2 className="text-sm sm:text-base text-gray-700 mb-1">
          Want to join our exclusive inner circle?
        </h2>
        <h1 className="text-lg sm:text-xl font-semibold text-gray-900 tracking-wide mb-2">
          REGISTER TO GET 10% OFF
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 mb-5">
          & more premium deals on your first order!
        </p>

        {/* 📩 Input Fields */}
        <form className="space-y-3">
          <input
            type="email"
            placeholder="Enter Email"
            className="w-full border border-gray-300 text-sm sm:text-base px-3 py-2 sm:py-2.5 rounded focus:outline-none focus:border-black"
            required
          />
          <input
            type="tel"
            placeholder="Enter Phone"
            className="w-full border border-gray-300 text-sm sm:text-base px-3 py-2 sm:py-2.5 rounded focus:outline-none focus:border-black"
            required
          />

          {/* 🖤 Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 sm:py-2.5 text-sm sm:text-base font-medium hover:bg-gray-800 transition-all"
          >
            GET COUPON CODE
          </button>
        </form>

        {/* ⚙️ Notes */}
        <p className="text-[10px] sm:text-xs text-gray-500 mt-3">
          *Only applicable on your first purchase
        </p>
        <p className="text-[10px] sm:text-xs text-gray-500 mt-1">
          *T&amp;C apply
        </p>
      </div>
    </div>
  );
};
