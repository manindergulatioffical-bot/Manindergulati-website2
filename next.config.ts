import type { NextConfig } from "next";
import { getEnv } from "./lib/env"; // ✅ use getEnv instead

const env = getEnv(); // ✅ runtime-safe

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        port: "",
        pathname: "/**",
      },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy:
      "default-src 'self'; script-src 'none'; sandbox;",
  },
  env: {
    JWT_SECRET: env.JWT_SECRET,
    NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY: env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
    NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT: env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT,
  },
};

export default nextConfig;
