"use client";

import { useEffect, useState } from "react";

export const Popup = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem("hasSeenPopup");
    if (!hasSeenPopup) {
      setTimeout(() => setIsVisible(true), 1500); // show after 1.5s
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem("hasSeenPopup", "true");
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="relative bg-white text-black w-full max-w-md rounded-2xl p-6 shadow-2xl text-center animate-fade-in">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-4 text-gray-400 hover:text-black text-xl"
        >
          ✕
        </button>

        {/* Content */}
        <h2 className="font-cormorant text-2xl sm:text-3xl font-semibold">
          Exclusive Launch Offer 🎉
        </h2>
        <p className="mt-3 text-gray-600 font-dmsans text-sm sm:text-base">
          Get <span className="font-semibold text-black">10% off</span> your
          first luxury purchase. Join our WhatsApp list for early access and
          private previews.
        </p>

        <a
          href="https://wa.me/918488070070"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-block bg-black text-white px-6 py-3 rounded-full text-sm sm:text-base hover:bg-gray-800 transition-all duration-300 font-dmsans"
        >
          Join on WhatsApp
        </a>
      </div>
    </div>
  );
};
