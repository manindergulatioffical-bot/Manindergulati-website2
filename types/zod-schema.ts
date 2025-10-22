import { z } from "zod";

export const insertProductSchema = z.object({
  name: z.string().min(1, {
    message: "Product name is required",
  }),
  description: z.string().min(1, {
    message: "Description is required",
  }),
  gender: z.enum(["men", "women"], {
    message: "Please select a gender category.",
  }),
  category: z.string().min(1, {
    message: "Category is required",
  }),
  images: z.array(z.string()).min(1, {
    message: "At least one image is required.",
  }),
  sizes: z.array(z.enum(["S", "M", "L"])).min(1, {
    message: "At least one size is required.",
  }),
});

export const editProductSchema = insertProductSchema.extend({
  id: z.string(),
  images: z.array(z.string()).optional(),
});

export type InsertProductSchema = z.infer<typeof insertProductSchema>;
export type EditProductSchema = z.infer<typeof editProductSchema>;
