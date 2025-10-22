import z from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { and, count, eq, desc, ilike, or } from "drizzle-orm";
import { products } from "@/server/db";
import { TRPCError } from "@trpc/server";
import { decryptImageUrl } from "@/lib/utils";

import { editProductSchema, insertProductSchema } from "@/types/zod-schema";
import { deleteImages, generateImageKitAuthParams } from "./imagekit-helpers";
export const productsRouter = createTRPCRouter({
  getProducts: publicProcedure
    .input(
      z.object({
        gender: z.enum(["men", "women"]).optional(),
        query: z.string().optional(),
        subcategory: z.string().optional(),
        page: z.number().min(1).default(1),
        limit: z.number().min(1).max(50).default(12),
      })
    )
    .query(async ({ ctx, input }) => {
      const offset = (input.page - 1) * input.limit;
      const whereClause = [];

      if (input.gender) {
        whereClause.push(eq(products.gender, input.gender));
      }

      if (input.subcategory && input.subcategory !== "all") {
        whereClause.push(eq(products.category, input.subcategory));
      }

      if (input.query) {
        whereClause.push(
          or(
            ilike(products.name, `%${input.query}%`),
            ilike(products.description, `%${input.query}%`)
          )
        );
      }

      const allProducts = await ctx.db
        .select()
        .from(products)
        .where(and(...whereClause))
        .orderBy(desc(products.createdAt))
        .limit(input.limit)
        .offset(offset);

      // Get total count of all products matching the filter criteria
      const totalCount = await ctx.db
        .select({ count: count() })
        .from(products)
        .where(and(...whereClause));

      return { products: allProducts, total: totalCount[0].count };
    }),

  createProduct: protectedProcedure
    .input(insertProductSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        // Validate input
        if (!input.name.trim()) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Product name is required and cannot be empty",
          });
        }

        if (!input.description.trim()) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Product description is required and cannot be empty",
          });
        }

        if (!input.category.trim()) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Product category is required and cannot be empty",
          });
        }

        if (input.images.length === 0) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "At least one product image is required",
          });
        }
        // Save product to database
        await ctx.db.insert(products).values({
          name: input.name,
          description: input.description,
          gender: input.gender,
          category: input.category,
          images: input.images,
          sizes: input.sizes,
        });

        return {
          success: true,
          message: "Product created successfully",
        };
      } catch (error) {
        // If it's already a TRPCError, re-throw it
        if (error instanceof TRPCError) {
          throw error;
        }

        // Handle database-specific errors
        if (error instanceof Error) {
          if (error.message.includes("duplicate key")) {
            throw new TRPCError({
              code: "CONFLICT",
              message: "A product with this name already exists",
            });
          }

          if (error.message.includes("foreign key")) {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "Invalid category or gender value provided",
            });
          }

          if (error.message.includes("not null")) {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message:
                "Required fields are missing. Please check all required fields.",
            });
          }
        }

        // Generic error fallback
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create product. Please try again later.",
          cause: error,
        });
      }
    }),

  getProductById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        const product = await ctx.db
          .select()
          .from(products)
          .where(eq(products.id, input.id.trim()));

        if (!product[0]) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Product not found",
          });
        }

        return product[0];
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }

        // throw new TRPCError({
        //   code: "INTERNAL_SERVER_ERROR",
        //   message: "Failed to retrieve product",
        //   cause: error,
        // });
      }
    }),

  deleteProduct: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const product = await ctx.db
          .delete(products)
          .where(eq(products.id, input.id.trim()))
          .returning();

        const images = product[0].images.map((image) => {
          const file = decryptImageUrl(image);
          return file.fileId;
        });

        await deleteImages(images);

        return {
          success: true,
          message: "Product deleted successfully",
          product: product[0],
        };
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to delete product",
          cause: error,
        });
      }
    }),

  editProduct: protectedProcedure
    .input(editProductSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        // First, get the existing product to check old images
        const existingProduct = await ctx.db
          .select()
          .from(products)
          .where(eq(products.id, input.id.trim()));

        if (!existingProduct[0]) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Product not found",
          });
        }

        let newImages: string[] = existingProduct[0].images;

        if (input.images && input.images.length > 0) {
          const deletedImages = existingProduct[0].images.map((image) => {
            const file = decryptImageUrl(image);
            return file.fileId;
          });

          await deleteImages(deletedImages);
          newImages = input.images;
        }

        // Update the product with new data
        await ctx.db
          .update(products)
          .set({
            name: input.name,
            description: input.description,
            category: input.category,
            gender: input.gender,
            images: newImages,
            sizes: input.sizes,
            updatedAt: new Date(),
          })
          .where(eq(products.id, input.id.trim()))
          .returning();

        return {
          success: true,
          message: "Product updated successfully",
        };
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update product",
          cause: error,
        });
      }
    }),


});
