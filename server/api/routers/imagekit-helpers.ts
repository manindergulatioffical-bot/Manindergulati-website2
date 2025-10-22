// server/api/routers/imagekit-helpers.ts
import ImageKit from "imagekit";
import { getEnv } from "@/lib/env";

export function getImageKitInstance() {
  const env = getEnv();

  return new ImageKit({
    publicKey: env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
    privateKey: env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT,
  });
}

// Delete multiple images
export async function deleteImages(fileIds: string[]) {
  const imagekit = getImageKitInstance();

  return Promise.all(
    fileIds.map(async (fileId) => {
      try {
        return await imagekit.deleteFile(fileId);
      } catch (error) {
        console.error("Failed to delete ImageKit file:", fileId, error);
        throw error;
      }
    })
  );
}

// Existing auth helper
export function generateImageKitAuthParams() {
  const imagekit = getImageKitInstance();
  const { token, expire, signature } = imagekit.getAuthenticationParameters();
  const env = getEnv();
  return { token, expire, signature, publicKey: env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY };
}
