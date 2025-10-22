// server/api/routers/imagekit-helpers.ts
import { getUploadAuthParams } from "@imagekit/next/server";
import { getEnv } from "@/lib/env";

export function generateImageKitAuthParams() {
  const env = getEnv(); // ✅ runtime-safe

  const { token, expire, signature } = getUploadAuthParams({
    publicKey: env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
    privateKey: env.IMAGEKIT_PRIVATE_KEY,
  });

  return {
    token,
    expire,
    signature,
    publicKey: env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
  };
}
