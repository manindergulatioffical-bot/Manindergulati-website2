"use client";

import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";


export const Popup = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Always show 2s after page load (even on refresh)
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []); // no localStorage check, so it triggers every load

  const handleClose = () => setIsVisible(false);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="relative w-full max-w-sm sm:max-w-md bg-white rounded-2xl shadow-2xl text-center p-6 sm:p-8 animate-fade-in">
        {/* ❌ Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-5 text-gray-400 hover:text-black text-2xl transition"
          aria-label="Close popup"
        >
          ✕
        </button>

        {/* ✨ Heading */}
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 font-cormorant tracking-wide leading-snug">
          NEED HELP<br />FINDING SOMETHING?
        </h2>

        {/* 💬 WhatsApp Button */}
        <a
          href="https://wa.me/918488070070"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 mb-3 inline-flex items-center justify-center gap-2 bg-black text-white px-5 sm:px-8 py-3 sm:py-4 rounded-md text-sm sm:text-base font-dmsans font-medium hover:bg-gray-800 transition-all shadow-md"
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
