"use client";

import Image from "next/image";
import { bannerImage } from "@/data/home";

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[90vh] lg:h-[100vh]">
        <Image
          src={bannerImage}
          alt="Luxury Ethnic Fashion - Maninder Gulati"
          fill
          priority
          className="object-contain sm:object-cover object-center w-full h-full"
          sizes="100vw"
        />
      </div>
    </section>
  );
}
