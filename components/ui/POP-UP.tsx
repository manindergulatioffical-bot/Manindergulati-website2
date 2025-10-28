"use client";

import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

export const Popup = () => {
  const [isVisible, setIsVisible] = useState(false);

  // ✅ Always show popup 2s after each page load
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => setIsVisible(false);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="relative w-full max-w-sm sm:max-w-md bg-white shadow-2xl text-center p-6 sm:p-8 animate-fade-in">
        {/* ❌ Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-4 text-gray-400 hover:text-black text-2xl transition"
          aria-label="Close popup"
        >
          ✕
        </button>

        {/* ✨ Heading */}
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 font-cormorant tracking-wide leading-snug">
          Let us help you find your perfect look
          <br />
          <span className="block mt-1 text-sm sm:text-base text-gray-700 font-dmsans">
            Looking for something unique?
          </span>
        </h2>

        {/* 💬 WhatsApp Button */}
        <a
          href="https://wa.me/917065070555"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 mb-3 inline-flex items-center justify-center gap-2 bg-black text-white px-5 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-dmsans font-medium hover:bg-gray-800 transition-all shadow-md"
        >
          <FaWhatsapp className="text-xl sm:text-2xl text-green-400" />
          CHAT FOR BEST PRICE
        </a>

        {/* 📝 Note */}
        <p className="text-gray-600 text-xs sm:text-sm font-dmsans leading-relaxed">
          Connect with our team for assistance, early deliveries, or customisations.
        </p>
      </div>
    </div>
  );
};
