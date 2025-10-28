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
    <section className="relative h-screen bg-gray-100 flex items-center justify-center">
      <div className="absolute inset-0">
        <Image
          src={bannerImage}
          alt="Banner Image"
          width={1000}
          height={1000}
          className="w-full h-full object-cover object-top"
        />
      </div>
      <div className="absolute inset-0 bg-black/30" />
      <div className="text-center relative z-10 px-4 md:px-8">
        <h1 className="text-4xl md:text-6xl  mb-8 text-white">
          Maninder Gulati
        </h1>
        <Button size="lg" variant={"outline"} className="px-8 py-3" asChild>
          <Link href="/women">Shop Now</Link>
        </Button>
      </div>
    </section>
  );
}
