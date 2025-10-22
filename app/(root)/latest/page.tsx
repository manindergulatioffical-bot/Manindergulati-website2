// import { SpecialCategory } from "@/components/categories/special-category";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Latest Collections",
  description:
    "Explore the latest fashion collections by Maninder Gulati. Discover new arrivals, trending styles, and fresh designs in men's and women's fashion. Stay ahead with our newest releases.",
  keywords: [
    "latest collections",
    "new arrivals",
    "trending styles",
    "fresh designs",
    "new fashion",
    "latest fashion",
    "Maninder Gulati latest",
    "new releases",
  ],
  openGraph: {
    title: "Latest Collections - Maninder Gulati",
    description:
      "Explore the latest fashion collections by Maninder Gulati. Discover new arrivals, trending styles, and fresh designs in men's and women's fashion.",
    url: "https://manindergulati.com/latest",
    images: [
      {
        url: "/latest-collections-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Latest Collections",
      },
    ],
  },
  alternates: {
    canonical: "/latest",
  },
};

const bgImage =
  "https://ik.imagekit.io/7uouyh55b/maninder_gulati/home/coming_soon_banner.png?updatedAt=1755068323965";

function LatestPage() {
  // return <SpecialCategory type="latest" />;

  return (
    <div className="text-center text-xl md:text-4xl font-medium flex items-center justify-center h-auto">
      <div className="relative w-full h-full">
        <div className="absolute top-0 left-0 inset-0 z-10 w-full h-full flex items-center justify-center">
          <h1 className="text-white text-4xl font-bold">Coming soon</h1>
        </div> 
        <Image src={bgImage} alt="Coming soon" width={1000} height={700} className="object-cover w-full" />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
    </div>
  );
}

export default LatestPage;
