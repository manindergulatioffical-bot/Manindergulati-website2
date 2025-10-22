"use client";

import { api } from "@/trpc/react";
import { ProductGrid } from "./product-grid";
import { useSearchParams } from "next/navigation";
import { Skeleton } from "../ui/skeleton";
import { useState, useEffect, Suspense } from "react";
import { Product } from "@/server/db";
import Link from "next/link";
import CategoryTitle from "../ui/category-title";

interface CategoryPageProps {
  gender: "men" | "women";
}

function CategoryPageContent({ gender }: CategoryPageProps) {
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const category = searchParams.get("category") || "all";

  const { data: products, isLoading } = api.products.getProducts.useQuery({
    gender,
    subcategory: category,
    page,
    limit: 12,
  });

  // Reset products when category changes
  useEffect(() => {
    setAllProducts([]);
    setPage(1);
  }, [category]);

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

  return (
    <div className="bg-white">
      <CategoryTitle>
        {gender === "men" ? "Men's" : "Women's"} {"Wear"}
      </CategoryTitle>
      {/* Results Header */}
      <div className="flex justify-between items-center container mx-auto px-4">
        <div>
          <h2 className="text-xl md:text-2xl font-light tracking-wider">
            {category === "all"
              ? `All ${gender}`
              : `Category: ${category.replace("-", " ")}`}
          </h2>
          <p className="text-gray-600 mt-1">
            Showing {products?.total || 0}{" "}
            {products?.total === 1 ? "product" : "products"}
          </p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        {isLoading && allProducts.length === 0 ? (
          <Loading />
        ) : allProducts.length > 0 ? (
          <ProductGrid
            products={allProducts}
            onLoadMore={handleLoadMore}
            isLoading={isLoading}
            totalProducts={products?.total || allProducts.length + 1}
          />
        ) : (
          <div className="text-center text-xl font-light tracking-wider ">
            <div>No products found with this category</div>
            <div>
              <span className="">
                Go back to{" "}
                <Link href={`/${gender}`} className="text-blue-500 underline">
                  {gender === "men" ? "Men's" : "Women's"}
                </Link>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function CategoryPage({ gender }: CategoryPageProps) {
  return (
    <Suspense fallback={<Loading />}>
      <CategoryPageContent gender={gender} />
    </Suspense>
  );
}

const Loading = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
        <Skeleton className="w-full h-[300px] md:h-[450px]" />
        <Skeleton className="w-full h-[300px] md:h-[450px]" />

        <Skeleton className="w-full h-[300px] md:h-[450px]" />
        <Skeleton className="w-full h-[300px] md:h-[450px]" />
      </div>
    </div>
  );
};
