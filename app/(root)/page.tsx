import { HeroSection } from "./_components/hero-section"
import { ProductShowcase } from "./_components/product-showcase"
import { CategoryCards } from "./_components/category-cards"
import { SocialMediaSection } from "./_components/social-media-section"
import { OutfitSlider } from "./_components/outfit-slider"
import type { Metadata } from "next";
import WhatsAppButton from "./_components/whatsapp-button";

export const metadata: Metadata = {
  title: "Home",
  description: "Discover premium fashion & lifestyle with Maninder Gulati. Explore handcrafted collections, men's & women's clothing, and wedding styles online.",
  keywords: ["home", "fashion", "premium clothing", "latest collections", "trending styles", "handcrafted fashion", "Maninder Gulati"],
  openGraph: {
    title: "Maninder Gulati - Premium Fashion & Lifestyle",
    description: "Welcome to Maninder Gulati - Premium Fashion & Lifestyle. Discover our latest collections, trending styles, and handcrafted fashion pieces.",
    url: "https://manindergulati.com",
      type: "website",
    images: [
      {
        url: "/home-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Maninder Gulati Home Page",
      },
    ],
  },
  alternates: {
    canonical: "/",
  },
};

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <ProductShowcase />
      <CategoryCards />
      <OutfitSlider />
      <SocialMediaSection />
      <WhatsAppButton />
    </div>
  )
}