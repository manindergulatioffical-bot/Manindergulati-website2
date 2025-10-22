import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string(),
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY: z.string(),
  NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT: z.string(),
  IMAGEKIT_PRIVATE_KEY: z.string(),
  JWT_SECRET: z.string(),
});

export function getEnv() {
  return envSchema.parse(process.env); // ✅ runs at runtime
}