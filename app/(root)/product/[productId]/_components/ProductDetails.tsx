"use client";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Heart, ChevronLeft, ChevronRight, Share2 } from "lucide-react";
import { cn, decryptImageUrl, handleQuery } from "@/lib/utils";
import { api } from "@/trpc/react";
import Link from "next/link";
import Loading from "./loading";
import { useWishlist } from "@/context/wishlist";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/server/db/schema";
import { toast } from "sonner";

export function ProductDetailPage({ productId }: { productId: string }) {
  const { data: product, isLoading } = api.products.getProductById.useQuery(
    {
      id: productId,
    },
    {
      retry: false,
      throwOnError: false,
    }
  );

  if (isLoading) return <Loading />;
  if (!product) return <div>Product not found</div>;

  const css = `.scrollbar-thin {
  scrollbar-width: thin;
}

.scrollbar-thumb-gray-300::-webkit-scrollbar-thumb {
  background-color: #d1d5db;
  border-radius: 0.375rem;
}

.scrollbar-track-gray-100::-webkit-scrollbar-track {
  background-color: #f3f4f6;
}

.scrollbar-thin::-webkit-scrollbar {
  width: 6px;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background-color: #d1d5db;
  border-radius: 0.375rem;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background-color: #f3f4f6;
}`;

  return (
    <div className="min-h-screen bg-white">
      <style>{css}</style>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-gray-600 mb-6 sm:mb-8 overflow-x-auto">
          <Link
            href="/"
            className="hover:text-black transition-colors whitespace-nowrap"
          >
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <Link
            href={`/${product.gender}`}
            className="hover:text-black transition-colors capitalize whitespace-nowrap"
          >
            {product.gender}
          </Link>
          <span className="text-gray-400">/</span>
          <Link
            href={`/${product.gender}?category=${product.category}`}
            className="hover:text-black transition-colors capitalize whitespace-nowrap"
          >
            {product.category}
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-black font-medium truncate max-w-[120px] sm:max-w-none">
            {product.name}
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          <LeftPanel product={product} />
          <RightPanel product={product} />
        </div>
      </div>
    </div>
  );
}

const LeftPanel = ({ product }: { product: Product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // ✅ Memoize URLs so they don’t get recomputed
  const images = useMemo(
    () => product.images.map((img) => decryptImageUrl(img).url),
    [product.images]
  );

  // ✅ Preload next image for instant navigation
  useEffect(() => {
    if (images.length > 1) {
      const next = new window.Image();
      next.src = images[(currentImageIndex + 1) % images.length];
    }
  }, [currentImageIndex, images]);

  const handlePreviousImage = () =>
    setCurrentImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );

  const handleNextImage = () =>
    setCurrentImageIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );

  const handleThumbnailClick = (index: number) =>
    setCurrentImageIndex(index);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      handlePreviousImage();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      handleNextImage();
    }
  };

  return (
    <div className="space-y-4" onKeyDown={handleKeyDown} tabIndex={0}>
      {/* Mobile Layout */}
      <div className="block lg:hidden">
        <div className="relative w-full aspect-[3/4] group mb-4">
          <Image
            src={images[currentImageIndex]}
            alt={product.name}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain"
            priority={currentImageIndex === 0} // ✅ only first
            unoptimized // ✅ test without Next.js optimization
          />

          {images.length > 1 && (
            <>
              <button
                onClick={handlePreviousImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all"
                aria-label="Next image"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </>
          )}

          {images.length > 1 && (
            <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
              {currentImageIndex + 1} / {images.length}
            </div>
          )}
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="grid grid-cols-4 gap-3">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => handleThumbnailClick(index)}
                className={cn(
                  "relative aspect-square rounded-lg overflow-hidden border-2 transition-all",
                  currentImageIndex === index
                    ? "border-black ring-2 ring-black ring-offset-2"
                    : "border-gray-200 hover:border-gray-300"
                )}
              >
                <Image
                  src={image}
                  alt={`${product.name} view ${index + 1}`}
                  fill
                  sizes="25vw"
                  className="object-cover"
                  loading="lazy"
                  unoptimized
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex gap-4">
        {images.length > 1 && (
          <div className="flex flex-col gap-3 w-20 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => handleThumbnailClick(index)}
                className={cn(
                  "relative aspect-square rounded-lg overflow-hidden border-2 transition-all flex-shrink-0",
                  currentImageIndex === index
                    ? "border-black ring-2 ring-black ring-offset-2"
                    : "border-gray-200 hover:border-gray-300"
                )}
              >
                <Image
                  src={image}
                  alt={`${product.name} view ${index + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover"
                  loading="lazy"
                  unoptimized
                />
              </button>
            ))}
          </div>
        )}

        <div className="flex-1 relative w-full aspect-[3/4] group">
          <Image
            src={images[currentImageIndex]}
            alt={product.name}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain"
            priority={currentImageIndex === 0}
            unoptimized
          />

          {images.length > 1 && (
            <>
              <button
                onClick={handlePreviousImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {images.length > 1 && (
            <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
              {currentImageIndex + 1} / {images.length}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const RightPanel = ({ product }: { product: Product }) => {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.success(`${product.name} has been removed from your wishlist.`);
    } else {
      addToWishlist(product.id);
      toast.success(`${product.name} has been added to your wishlist.`);
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    const title = product.name;
    const text = `Check out this product: ${product.name}`;

    // Check if Web Share API is supported
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url,
        });
      } catch (error) {
        // User cancelled sharing or error occurred
        console.log("Error sharing:", error);
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(url);
        toast.success("Product link has been copied to your clipboard.");
      } catch {
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = url;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        toast.success("Product link has been copied to your clipboard.");
      }
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Product Header */}
      <div className="space-y-3 sm:space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1 pr-4">
            <div className="flex items-center justify-between">
              <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-light tracking-wide text-gray-900 leading-tight">
                {product.name}
              </h1>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShare}
                  className="w-10 h-10 p-0 bg-transparent"
                >
                  <Share2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleWishlistToggle}
                  className={cn(
                    "w-10 h-10 p-0",
                    isInWishlist(product.id) &&
                      "bg-red-50 border-red-200 text-red-600"
                  )}
                >
                  <Heart
                    className={cn(
                      "w-4 h-4",
                      isInWishlist(product.id) && "fill-red-500"
                    )}
                  />
                </Button>
              </div>
            </div>
            <p className="text-sm sm:text-base text-gray-800 whitespace-pre-line">
              {product.description}
            </p>
          </div>
        </div>
      </div>

      <Separator />

      {/* Product Options */}
      <div className="flex items-end justify-between">
        {/* Size Selection */}
        {product.sizes && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-medium text-gray-900">
                Available Sizes
              </h3>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {product.sizes.map((size) => (
                <Badge key={size} variant="outline" className="text-sm">
                  {size}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
      <Separator />
      {/* Add to Wishlist Button */}
      <div className="pt-4 flex justify-between gap-2 md:gap-8 md:flex-row flex-col">
        {/* Product Details */}
        <Button className="flex-1" onClick={() => handleQuery(product)}>
          Query Now
        </Button>
        <Button
          variant="outline"
          onClick={handleWishlistToggle}
          className={cn(
            "flex-1 px-6 py-3 text-sm font-medium transition-all",
            isInWishlist(product.id)
              ? "bg-red-50 border-red-200 text-red-600 hover:bg-red-100"
              : "hover:bg-gray-50"
          )}
        >
          <Heart
            className={cn(
              "w-4 h-4 mr-2",
              isInWishlist(product.id) && "fill-red-500"
            )}
          />
          {isInWishlist(product.id)
            ? "Remove from Wishlist"
            : "Add to Wishlist"}
        </Button>
      </div>
    </div>
  );
};
