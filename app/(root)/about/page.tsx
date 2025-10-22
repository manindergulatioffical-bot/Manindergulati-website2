import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Award, Users, Globe, Heart } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Maninder Gulati's journey in sustainable fashion. Discover our story, values, and commitment to quality craftsmanship. Founded in 2015, we create timeless fashion with passion and purpose.",
  keywords: [
    "about us",
    "our story",
    "sustainable fashion",
    "quality craftsmanship",
    "fashion brand",
    "Maninder Gulati story",
    "fashion values",
    "ethical fashion",
  ],
  openGraph: {
    title: "About Us - Maninder Gulati",
    description:
      "Learn about Maninder Gulati's journey in sustainable fashion. Discover our story, values, and commitment to quality craftsmanship.",
    url: "https://manindergulati.com/about",
    images: [
      {
        url: "/about-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "About Maninder Gulati",
      },
    ],
  },
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPageContent() {
  return (
    <div>
      {/* Hero Section with Image */}
      <section className="relative h-[70vh] overflow-hidden">
        <Image
          src="https://placehold.co/1200x800/6366f1/ffffff"
          alt="Our Story"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-primary bg-opacity-40"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-7xl font-light tracking-wider mb-6 uppercase">
              Our Story
            </h1>
            <p className="text-xl md:text-2xl font-light tracking-wide max-w-3xl mx-auto">
              Crafting timeless fashion with passion, purpose, and
              sustainability at heart
            </p>
          </div>
        </div>
      </section>

      {/* Main About Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Introduction */}
            <div className="text-center mb-16">
              <h2 className="text-4xl font-light tracking-wider mb-6 text-gray-900 uppercase">
                About Brand
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                With a legacy spanning over 25 years, the name Maninder Gulati
                stands as a symbol of excellence, innovation, and refined
                craftsmanship in the Indian fashion industry.
              </p>
            </div>

            {/* Our Journey */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
              <div>
                <h3 className="text-3xl font-light tracking-wide mb-6 text-gray-900 uppercase">
                  Our Journey
                </h3>
                <div className="space-y-6 text-gray-600 leading-relaxed">
                  <p>
                    Today, Maninder Gulati is not just a name it's a brand, a
                    benchmark, and a belief system. The same man who started
                    with a single machine now leads a creative empire that
                    designs everything possible in the fashion industry - from
                    bridal couture to western wear, accessories to occasion
                    wear, menswear to kidswear. But no matter how far the
                    journey has come, the heart of it remains the same: A deep
                    love for design, and a promise to always craft with soul.
                  </p>
                  <p>
                    Over the years, we have remained rooted in our values while
                    continuously adapting to the dynamic world of fashion. Our
                    work is a reflection of Indian artistry with a global
                    perspective created not just to dress, but to express.
                  </p>
                </div>
              </div>
              <div className="relative">
                <Image
                  src="/logo.png"
                  alt="Our Atelier"
                  width={600}
                  height={400}
                  className="w-full h-96 object-contain rounded-lg"
                  quality={100}
                />
              </div>
            </div>

            {/* Our Values */}
            <div className="mb-20">
              <h3 className="text-3xl font-light tracking-wide mb-12 text-gray-900 uppercase text-center">
                Our Values
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-gray-700" />
                  </div>
                  <h4 className="text-xl font-medium mb-3 tracking-wide uppercase">
                    Quality
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    We believe in creating pieces that last, using only the
                    finest materials and time-honored techniques.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="w-8 h-8 text-gray-700" />
                  </div>
                  <h4 className="text-xl font-medium mb-3 tracking-wide uppercase">
                    Sustainability
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Environmental responsibility is at the core of everything we
                    do, from design to delivery.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-gray-700" />
                  </div>
                  <h4 className="text-xl font-medium mb-3 tracking-wide uppercase">
                    Community
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    We support local artisans and communities, fostering fair
                    trade and ethical practices.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-gray-700" />
                  </div>
                  <h4 className="text-xl font-medium mb-3 tracking-wide uppercase">
                    Passion
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Every design is crafted with love and attention to detail,
                    reflecting our passion for fashion.
                  </p>
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div className="bg-gray-50 rounded-lg p-12 mb-20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-4xl font-light text-gray-900 mb-2">
                    2000
                  </div>
                  <p className="text-gray-600 uppercase text-sm tracking-wide">
                    Founded
                  </p>
                </div>
                <div>
                  <div className="text-4xl font-light text-gray-900 mb-2">
                    Worldwide
                  </div>
                  <p className="text-gray-600 uppercase text-sm tracking-wide">
                    Serving Customers Globally
                  </p>
                </div>
                <div>
                  <div className="text-4xl font-light text-gray-900 mb-2">
                    500K+
                  </div>
                  <p className="text-gray-600 uppercase text-sm tracking-wide">
                    Happy Customers
                  </p>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <h3 className="text-3xl font-light tracking-wide mb-6 text-gray-900 uppercase">
                Join Our Journey
              </h3>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
                Be part of the sustainable fashion movement. Discover our
                collections and join thousands of customers who choose style
                with purpose.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="px-8" asChild>
                  <Link href="/women">Shop Collections</Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 bg-transparent"
                  asChild
                >
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
