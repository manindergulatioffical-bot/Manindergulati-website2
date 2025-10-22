ALTER TABLE "activity" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "activity" CASCADE;--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "category" SET NOT NULL;--> statement-breakpoint
DROP TYPE "public"."activity_type";