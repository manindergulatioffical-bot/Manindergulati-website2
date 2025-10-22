import { NextResponse } from "next/server";
import { getUploadAuthParams } from "@imagekit/next/server";
import { getEnv } from "@/lib/env";

export async function GET() {
  try {
    const env = getEnv(); // ✅ runtime-safe

    const { token, expire, signature } = getUploadAuthParams({
      publicKey: env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
      privateKey: env.IMAGEKIT_PRIVATE_KEY,
    });

    return NextResponse.json({ token, expire, signature, publicKey: env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY });
  } catch (error) {
    console.error("ImageKit auth error:", error);
    return NextResponse.json({ error: "Failed to generate auth params" }, { status: 500 });
  }
}
