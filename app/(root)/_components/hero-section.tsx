"use client";

import { bannerImage } from "@/data/home";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* 🔹 Responsive container */}
      <div className="relative w-full h-[60vh] sm:h-[80vh] md:h-[100vh]">
        <Image
          src={bannerImage}
          alt="Maninder Gulati Luxury Banner"
          fill
          priority
          className="object-cover object-center w-full h-full"
          sizes="100vw"
        />
      </div>
    </section>
  );
}
