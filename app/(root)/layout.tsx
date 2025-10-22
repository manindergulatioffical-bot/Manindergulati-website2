import { Footer } from "@/components/footer";
import { ImageKitProvider } from "@imagekit/next";
import { getEnv } from "@/lib/env";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const env = getEnv(); // ✅ runtime-safe

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ImageKitProvider publicKey={env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY}>
          {children}
        </ImageKitProvider>
        <Footer />
      </body>
    </html>
  );
};

export default Layout;
