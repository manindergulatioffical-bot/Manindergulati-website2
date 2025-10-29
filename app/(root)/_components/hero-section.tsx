"use client";

import Image from "next/image";
import { bannerImage } from "@/data/home";

export function HeroSection() {
  return (
    <section className="relative w-full bg-white px-2 sm:px-4 md:px-8 py-4 sm:py-6 md:py-8">
      <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[90vh] rounded-none overflow-hidden">
        <Image
          src={bannerImage}
          alt="Luxury Ethnic Fashion - Maninder Gulati"
          fill
          priority
          className="object-contain object-center w-full h-full"
          sizes="100vw"
        />
      </div>
    </section>
  );
}
