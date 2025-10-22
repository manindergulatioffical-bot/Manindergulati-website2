CREATE TYPE "public"."product_size" AS ENUM('S', 'M', 'L');--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "description" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "gender_type" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "sizes" "product_size"[] NOT NULL;