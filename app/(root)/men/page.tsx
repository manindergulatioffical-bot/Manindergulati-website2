import { CategoryPage } from "@/components/categories/category-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Men's Fashion",
  description: "Discover premium men’s fashion by Maninder Gulati — shop handcrafted clothing, casual wear, formal styles & accessories made with quality and style.",
  keywords: ["men's fashion", "men's clothing", "formal wear", "casual styles", "men's accessories", "premium men's fashion", "handcrafted men's clothing", "Maninder Gulati men"],
  openGraph: {
    title: "Men's Fashion - Maninder Gulati",
    description: "Discover premium men's fashion collections by Maninder Gulati. Shop the latest trends in men's clothing, formal wear, casual styles, and accessories.",
    url: "https://manindergulati.com/men",
    images: [
      {
        url: "/mens-fashion-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Men's Fashion Collection",
      },
    ],
  },
  alternates: {
    canonical: "/men",
  },
};

export default async function CateegoryPage() {
  return <div>
      <h1 className="text-center text-3xl md:text-5xl font-cormorant font-semibold mt-8 mb-4">
        Men’s Fashion Collection by Maninder Gulati
      </h1>
    <CategoryPage gender="men" />;
  </div> 
}
