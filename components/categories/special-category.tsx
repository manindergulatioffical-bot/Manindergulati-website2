"use client";

import { api } from "@/trpc/react";
import { ProductGrid } from "./product-grid";
import { Skeleton } from "../ui/skeleton";
import { useState, useEffect, Suspense } from "react";
import { Product } from "@/server/db";
import CategoryTitle from "../ui/category-title";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface SpecialCategoryProps {
  type: "wedding" | "latest";
}

function SpecialCategoryContent({ type }: SpecialCategoryProps) {
  const [selectedGender, setSelectedGender] = useState<"men" | "women" | "both">("both");
  const [page, setPage] = useState(1);
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  // Use the existing getProducts router with different parameters based on type
  const { data: products, isLoading } = api.products.getProducts.useQuery({
    gender: selectedGender === "both" ? undefined : selectedGender,
    subcategory: type === "wedding" ? "wedding" : undefined,
    page,
    limit: 12,
  });

  // Reset products when gender changes
  useEffect(() => {
    setAllProducts([]);
    setPage(1);
  }, [selectedGender]);

  // Accumulate products when new data comes in
  useEffect(() => {
    if (products) {
      if (page === 1) {
        setAllProducts(products.products);
      } else {
        setAllProducts((prev) => [...prev, ...products.products]);
      }
    }
  }, [products, page]);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  const getTitle = () => {
    if (type === "latest") {
      return "Latest Items";
    } else {
      return "Wedding Collection";
    }
  };

  return (
    <div className="bg-white">
      <CategoryTitle>{getTitle()}</CategoryTitle>
      <div className="container mx-auto px-4 pb-8">
        {/* Gender Filter */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-xl md:text-2xl font-light tracking-wider">
              {type === "latest"
                ? `Latest Items - ${selectedGender}`
                : `Wedding Collection - ${selectedGender}`}
            </h2>
            <p className="text-gray-600 mt-1">
              Showing {products?.total || 0}{" "}
              {products?.total === 1 ? "product" : "products"}
            </p>
          </div>
          <div className="w-48">
            <Select 
              value={selectedGender} 
              onValueChange={(value) => setSelectedGender(value as "men" | "women" | "both")}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="both">Both</SelectItem>
                <SelectItem value="men">Men</SelectItem>
                <SelectItem value="women">Women</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {isLoading && page === 1 ? (
          <Loading />
        ) : allProducts.length > 0 ? (
          <ProductGrid
            products={allProducts}
            onLoadMore={handleLoadMore}
            isLoading={isLoading}
            totalProducts={products?.total || allProducts.length + 1}
          />
        ) : (
          <div className="text-center text-xl font-light tracking-wider">
            <div>No products found</div>
            <div>
              <span className="">
                Try selecting a different gender filter or check back later
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function SpecialCategory({ type }: SpecialCategoryProps) {
  return (
    <Suspense fallback={<Loading />}>
      <SpecialCategoryContent type={type} />
    </Suspense>
  );
}

const Loading = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
        <Skeleton className="w-full h-[450px]" />
        <Skeleton className="w-full h-[450px]" />
        <Skeleton className="w-full h-[450px]" />
        <Skeleton className="w-full h-[450px]" />
      </div>
    </div>
  );
};

export default SpecialCategory;
