import { Heart } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { Product } from "@/server/db";
import Link from "next/link";
import { cn, decryptImageUrl } from "@/lib/utils";

const ProductCard = ({
  product,
  isInWishlist,
}: {
  product: Product;
  isInWishlist: boolean;
}) => {
  return (
    <Link
      href={`/product/${product.id}`}
      className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
    >
      {/* Product Image */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <div className="relative h-full w-full group">
          <Image
            src={decryptImageUrl(product.images[0]).url}
            alt={product.name}
            fill  
            sizes="(max-width: 600px) 100vw, 600px"
            className={cn(
              "object-cover object-top transition-all duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] absolute opacity-100",
              {
                "group-hover:opacity-0": product.images[1],
              }
            )}
          />

          {product.images[1] && (
            <Image
              src={decryptImageUrl(product.images[1]).url}
              alt={product.name}
              sizes="(max-width: 600px) 100vw, 600px"
              fill
              className="object-cover object-top transition-all duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] absolute opacity-0 group-hover:opacity-100"
            />
          )}
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {/* Show NEW badge for recently created products (within 30 days) */}
          {new Date().getTime() - new Date(product.createdAt).getTime() <
            15 * 24 * 60 * 60 * 1000 && (
            <span className="bg-green-500 text-white text-xs font-medium px-2 py-1 rounded">
              NEW
            </span>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 transition-opacity duration-300">
          <Button size="sm" variant="secondary" className="p-2 rounded-xl">
            <Heart
              className={`size-5  ${
                isInWishlist ? "fill-red-500 text-red-500" : "text-gray-500"
              }`}
            />
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-medium text-lg mb-2 tracking-wide line-clamp-1">
          {product.name}
        </h3>

        {/* Description */}
        {product.description && (
          <p className="text-sm text-gray-600 mb-2 line-clamp-1">
            {product.description}
          </p>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
