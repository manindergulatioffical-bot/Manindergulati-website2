import { NextResponse } from "next/server";
import { getUploadAuthParams } from "@imagekit/next/server";
import { z } from "zod";

// Define schema
const envSchema = z.object({
  NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY: z.string(),
  IMAGEKIT_PRIVATE_KEY: z.string(),
});

// Function to safely get env at runtime
function getEnv() {
  return envSchema.parse(process.env);
}

export async function GET() {
  try {
    const env = getEnv(); // ✅ parse environment at runtime

    const { token, expire, signature } = getUploadAuthParams({
      publicKey: env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
      privateKey: env.IMAGEKIT_PRIVATE_KEY,
    });

    return NextResponse.json({
      token,
      expire,
      signature,
      publicKey: env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
    });
  } catch (error) {
    console.error("Error generating auth params:", error);
    return NextResponse.json(
      { error: "Failed to generate authentication parameters" },
      { status: 500 }
    );
  }
}
