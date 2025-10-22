import {
  pgTable,
  text,
  varchar,
  timestamp,
  json,
  pgEnum,
  uuid,
  boolean,
} from "drizzle-orm/pg-core";

// Define the gender enum
export const genderTypeEnum = pgEnum("gender_type", ["men", "women"]);
export const productSizeEnum = pgEnum("product_size", ["S", "M", "L"]);
export type ProductSizeEnum = (typeof productSizeEnum.enumValues)[number];

// Admin users table
export const adminUsers = pgTable("admin_users", {
  id: uuid("id").primaryKey().defaultRandom(),
  username: varchar("username", { length: 100 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  email: varchar("email", { length: 255 }),
  role: varchar("role", { length: 50 }).notNull().default("admin"),
  isActive: boolean("is_active").notNull().default(true),
  lastLoginAt: timestamp("last_login_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Products table
export const products = pgTable("products", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description").notNull(),
  images: json("images").$type<string[]>().notNull(),
  sizes: productSizeEnum("sizes").array().notNull(),
  gender: genderTypeEnum("gender_type").notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Type exports for TypeScript
export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
export type AdminUser = typeof adminUsers.$inferSelect;
export type NewAdminUser = typeof adminUsers.$inferInsert;
