"use client";

import { Button } from "@/components/ui/button";
import { Product } from "@/server/db";
import { useWishlist } from "@/context/wishlist";
import ProductCard from "./product-card";

interface ProductGridProps {
  products: Product[];
  onLoadMore?: () => void;
  totalProducts: number;
  isLoading?: boolean;
}

export function ProductGrid({
  products,
  onLoadMore,
  totalProducts,
  isLoading = false,
}: ProductGridProps) {
  const { isInWishlist } = useWishlist();

  return (
    <div className="">
      {/* Products Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
        {products.map((product, index) => (
          <ProductCard key={product.id + String(index)} product={product} isInWishlist={isInWishlist(product.id)} />
        ))}
      </div>


      {/* Load More Button */}
      {products.length < totalProducts && (
        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="px-8 bg-transparent"
            onClick={onLoadMore}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Load More Products"}
          </Button>
        </div>
      )}
    </div>
  );
}
