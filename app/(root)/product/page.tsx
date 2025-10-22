import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description: "Browse our complete collection of premium fashion products by Maninder Gulati. Find the perfect clothing, accessories, and lifestyle products for every occasion.",
  keywords: ["products", "fashion products", "clothing", "accessories", "lifestyle products", "Maninder Gulati products", "premium fashion"],
  openGraph: {
    title: "Products - Maninder Gulati",
    description: "Browse our complete collection of premium fashion products by Maninder Gulati. Find the perfect clothing, accessories, and lifestyle products for every occasion.",
    url: "https://manindergulati.com/product",
    images: [
      {
        url: "/products-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Maninder Gulati Products",
      },
    ],
  },
  alternates: {
    canonical: "/product",
  },
};

function ProductPage() {
  return <div>Product Not found</div>;
}

export default ProductPage;
