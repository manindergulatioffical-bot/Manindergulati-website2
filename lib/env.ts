// lib/env.ts
import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
  NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY: z.string(),
  NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT: z.string(),
  IMAGEKIT_PRIVATE_KEY: z.string(),
    NODE_ENV: z.enum(['development', 'production', 'test']),
});

export function getEnv() {
  return envSchema.parse(process.env); // ✅ runtime-safe
}
