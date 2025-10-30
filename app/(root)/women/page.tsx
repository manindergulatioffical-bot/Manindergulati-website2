import { CategoryPage } from "@/components/categories/category-page";
import { WomenBanner } from "@/components/ui/Womenbanner";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Women's Fashion",
  description: "Discover premium women's fashion collections by Maninder Gulati. Shop the latest trends in women's clothing, dresses, formal wear, casual styles, and accessories. Handcrafted with elegance and style.",
  keywords: ["women's fashion", "women's clothing", "dresses", "formal wear", "casual styles", "women's accessories", "premium women's fashion", "handcrafted women's clothing", "Maninder Gulati women"],
  openGraph: {
    title: "Women's Fashion - Maninder Gulati",
    description: "Discover premium women's fashion collections by Maninder Gulati. Shop the latest trends in women's clothing, dresses, formal wear, casual styles, and accessories.",
    url: "https://manindergulati.com/women",
    images: [
      {
        url: "/womens-fashion-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Women's Fashion Collection",
      },
    ],
  },
  alternates: {
    canonical: "/women",
  },
};

export default async function CateegoryPage() {
  return <div>
      <WomenBanner />
<CategoryPage gender="women" />;
  </div> 
}
