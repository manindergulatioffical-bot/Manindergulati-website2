import { NextResponse } from "next/server";
import { getUploadAuthParams } from "@imagekit/next/server";
import { getEnv } from "@/lib/env";

export async function GET() {
  try {
    const env = getEnv(); // ✅ parse env at runtime

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
