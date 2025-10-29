"use client";

import Image from "next/image";
import { bannerImage } from "@/data/home";

export function HeroSection() {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Full image fill */}
      <div className="absolute inset-0">
        <Image
          src={bannerImage}
          alt="Luxury fashion banner - Maninder Gulati"
          fill
          priority
          className="object-cover object-center w-full h-full"
          sizes="100vw"
        />
      </div>
    </section>
  );
}
