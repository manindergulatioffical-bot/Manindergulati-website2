ALTER TYPE "public"."activity" RENAME TO "activity_type";--> statement-breakpoint
ALTER TYPE "public"."gender" RENAME TO "gender_type";--> statement-breakpoint
ALTER TABLE "products" RENAME COLUMN "gender" TO "gender_type";