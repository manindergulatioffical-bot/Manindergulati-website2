"use client";

import { bannerImage } from "@/data/home";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative w-full h-[70vh] sm:h-[80vh] md:h-screen overflow-hidden">
      {/* 🔹 Fullscreen Responsive Image */}
      <Image
        src={bannerImage}
        alt="Luxury fashion banner - Maninder Gulati"
        fill
        priority
        className="object-cover object-center w-full h-full"
        sizes="100vw"
      />
    </section>
  );
}
