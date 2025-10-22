import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb Loading */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center space-x-1 sm:space-x-2">
            <Skeleton className="h-4 w-12" />
            <span className="text-gray-300">/</span>
            <Skeleton className="h-4 w-16" />
            <span className="text-gray-300">/</span>
            <Skeleton className="h-4 w-20" />
            <span className="text-gray-300">/</span>
            <Skeleton className="h-4 w-24" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Left Panel - Images Loading */}
          <div className="space-y-4">
            {/* Mobile Layout Loading */}
            <div className="block lg:hidden">
              {/* Main Image */}
              <div className="relative w-full aspect-[3/4] mb-4">
                <Skeleton className="w-full h-full rounded-lg" />
              </div>

              {/* Mobile Thumbnails */}
              <div className="grid grid-cols-4 gap-3">
                {Array.from({ length: 4 }).map((_, index) => (
                  <Skeleton key={index} className="aspect-square rounded-lg" />
                ))}
              </div>
            </div>

            {/* Desktop Layout Loading */}
            <div className="hidden lg:flex gap-4">
              {/* Vertical Thumbnails */}
              <div className="flex flex-col gap-3 w-20">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Skeleton key={index} className="aspect-square rounded-lg" />
                ))}
              </div>

              {/* Main Image */}
              <div className="flex-1">
                <div className="relative w-full aspect-[3/4]">
                  <Skeleton className="w-full h-full rounded-lg" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Product Info Loading */}
          <div className="space-y-6 sm:space-y-8">
            {/* Product Header Loading */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1 pr-4">
                  {/* Product Name */}
                  <Skeleton className="h-8 sm:h-10 lg:h-12 w-3/4" />
                  <Skeleton className="h-8 sm:h-10 lg:h-12 w-1/2" />

                  {/* Product Description */}
                  <div className="space-y-2 mt-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                    <Skeleton className="h-4 w-3/5" />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Skeleton className="w-10 h-10 rounded-md" />
                  <Skeleton className="w-10 h-10 rounded-md" />
                </div>
              </div>
            </div>

            {/* Separator */}
            <div className="border-t border-gray-200"></div>

            {/* Product Options Loading */}
            <div className="space-y-6">
              {/* Price Loading */}
              <div className="space-y-2">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-8 w-24" />
              </div>

              {/* Size Selection Loading */}
              <div className="space-y-3">
                <Skeleton className="h-6 w-32" />
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Skeleton key={index} className="h-8 w-12 rounded-full" />
                  ))}
                </div>
              </div>

              {/* Color Selection Loading */}
              <div className="space-y-3">
                <Skeleton className="h-6 w-28" />
                <div className="flex gap-3">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <Skeleton key={index} className="w-8 h-8 rounded-full" />
                  ))}
                </div>
              </div>

              {/* Action Buttons Loading */}
              <div className="pt-4 space-y-3">
                <Skeleton className="w-full sm:w-48 h-12 rounded-md" />
                <Skeleton className="w-full sm:w-40 h-11 rounded-md" />
              </div>
            </div>

            {/* Additional Product Details Loading */}
            <div className="space-y-4 pt-6 border-t border-gray-200">
              <Skeleton className="h-6 w-32" />
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <div className="flex justify-between items-center">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <div className="flex justify-between items-center">
                  <Skeleton className="h-4 w-18" />
                  <Skeleton className="h-4 w-14" />
                </div>
              </div>
            </div>

            {/* Shipping Info Loading */}
            <div className="space-y-3 pt-4 border-t border-gray-200">
              <Skeleton className="h-5 w-28" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section Loading */}
        <div className="space-y-6">
          <Skeleton className="h-8 w-48 mx-auto" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="space-y-3">
                <Skeleton className="aspect-[3/4] w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-5 w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
