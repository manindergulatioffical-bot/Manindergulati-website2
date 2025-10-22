import { SpecialCategory } from "@/components/categories/special-category";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wedding Collections",
  description: "Discover exquisite wedding collections by Maninder Gulati. Shop bridal wear, groom's attire, wedding party outfits, and special occasion dresses. Handcrafted with elegance for your special day.",
  keywords: ["wedding collections", "bridal wear", "groom's attire", "wedding party outfits", "special occasion dresses", "wedding fashion", "bridal fashion", "Maninder Gulati wedding"],
  openGraph: {
    title: "Wedding Collections - Maninder Gulati",
    description: "Discover exquisite wedding collections by Maninder Gulati. Shop bridal wear, groom's attire, wedding party outfits, and special occasion dresses.",
    url: "https://manindergulati.com/wedding",
    images: [
      {
        url: "/wedding-collections-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Wedding Collections",
      },
    ],
  },
  alternates: {
    canonical: "/wedding",
  },
};

function Wedding() {
  return <SpecialCategory type="wedding" />;
}

export default Wedding;
