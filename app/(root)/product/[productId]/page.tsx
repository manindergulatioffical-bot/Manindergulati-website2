import { api } from "@/trpc/server";
import { ProductDetailPage } from "./_components/ProductDetails";
import type { Metadata } from "next";

interface ProductPageProps {
  params: Promise<{ productId: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { productId } = await params;
  const product = await api.products.getProductById({
    id: productId,
  });

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The product you are looking for does not exist.",
      alternates: {
        canonical: `/product/${productId}`,
      },
    };
  }
  
  return {
    title: `Product - ${product.name}`,
    description: product.description,
    keywords: ["product", "fashion product", "handcrafted", "premium fashion", "Maninder Gulati", productId],
    openGraph: {
      title: `Product - ${product.name} | Maninder Gulati`,
      description: product.description,
      url: `https://manindergulati.com/product/${productId}`,
      images: [
        {
          url: `/product-${productId}-og-image.jpg`,
          width: 1200,
          height: 630,
          alt: `Product ${product.name}`,
        },
      ],
    },
    alternates: {
      canonical: `/product/${productId}`,
    },
  };
}

async function ProductPage({ params }: ProductPageProps) {
  const { productId } = await params;
  return <ProductDetailPage productId={productId} />;
}

export default ProductPage;
