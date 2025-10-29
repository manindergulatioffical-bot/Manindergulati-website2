"use client";

import Image from "next/image";
import { bannerImage } from "@/data/home";

export function HeroSection() {
  return (
    <section className="relative w-full h-[90vh] sm:h-[95vh] md:h-screen overflow-hidden">
      <Image
        src={bannerImage}
        alt="Luxury Ethnic Fashion - Maninder Gulati"
        fill
        priority
        className="object-cover object-center w-full h-full"
        sizes="100vw"
      />
    </section>
  );
}
