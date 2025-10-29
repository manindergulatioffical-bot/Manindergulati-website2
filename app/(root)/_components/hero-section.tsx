"use client";

import { bannerImage } from "@/data/home";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-black">
      {/* 🔹 Container that adapts to screen size */}
      <div className="relative w-full h-[60vh] sm:h-[80vh] md:h-[100vh] flex items-center justify-center">
        <Image
          src={bannerImage}
          alt="Maninder Gulati Banner"
          fill
          priority
          className="object-contain object-center w-full h-full"
          sizes="100vw"
        />
      </div>
    </section>
  );
}
