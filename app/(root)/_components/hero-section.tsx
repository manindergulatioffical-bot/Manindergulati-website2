"use client";

import { Button } from "@/components/ui/button";
import { bannerImage } from "@/data/home";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.controls = false;
    }
  }, []);

  return (
    <section className="relative w-full h-[70vh] sm:h-[80vh] md:h-screen overflow-hidden flex items-center justify-center">
      {/* 🔹 Background Banner */}
      <div className="absolute inset-0">
        <Image
          src={bannerImage}
          alt="Luxury fashion banner - Maninder Gulati"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      {/* 🔹 Overlay for contrast */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* 🔹 Text Content */}
      <div className="relative z-10 text-center px-4 sm:px-8 max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-cormorant font-semibold text-white leading-tight tracking-wide">
          Maninder Gulati
        </h1>

        <p className="mt-4 text-sm sm:text-base md:text-lg text-gray-200 font-dmsans">
          Redefining contemporary luxury — where tradition meets elegance.
        </p>

        <div className="mt-8">
          <Button
            size="lg"
            variant="outline"
            className="px-8 py-3 sm:px-10 sm:py-4 text-sm sm:text-base border-white text-white hover:bg-white hover:text-black transition-all duration-300 font-dmsans"
            asChild
          >
            <Link href="/women">Shop Now</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
