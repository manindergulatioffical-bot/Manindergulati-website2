import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { count } from "drizzle-orm";
import { products } from "@/server/db/schema";

export const statsRouter = createTRPCRouter({
  quickStats: publicProcedure.query(async ({ ctx }) => {
    // Get total number of products
    const totalProductsResult = await ctx.db
      .select({ count: count() })
      .from(products);

    // Get number of unique categories
    const categoriesResult = await ctx.db
      .select({ category: products.category })
      .from(products)
      .groupBy(products.category);

    return {
      totalProducts: totalProductsResult[0]?.count ?? 0,
      categories: categoriesResult.length,
    };
  }),
});
