"use client";

import Image from "next/image";
import { bannerImage } from "@/data/home";

export function HeroSection() {
  return (
    <section className="relative w-full bg-white px-2 sm:px-4 md:px-8 py-4 sm:py-6 md:py-8">
      <div className="relative w-full">
        <Image
          src={bannerImage}
          alt="Luxury Ethnic Fashion - Maninder Gulati"
          width={1920} // high-res width
          height={1080} // auto height scaling
          priority
          className="w-full h-auto object-contain object-center"
          sizes="100vw"
        />
      </div>
    </section>
  );
}
