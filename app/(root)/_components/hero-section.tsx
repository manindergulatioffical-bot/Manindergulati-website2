"use client";

import Image from "next/image";
import { bannerImage } from "@/data/home";

export function HeroSection() {
  return (
    <section className="relative w-full  sm:h-[100vh] md:h-[100vh] overflow-hidden flex items-center justify-center">
      {/* Banner Image - Always fills, no white space */}
      <div className="absolute inset-0">
        <Image
          src={bannerImage}
          alt="Luxury fashion banner - Maninder Gulati"
          fill
          priority
          className="object-contain md:object-cover object-center w-full h-full"
          sizes="100vw"
        />
      </div>
    </section>
  );
}
