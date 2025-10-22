import { Header } from "@/components/header"; // ✅ import your header
import { Footer } from "@/components/footer";
import { ImageKitProvider } from "@imagekit/next";
import { getEnv } from "@/lib/env";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const env = getEnv(); // ✅ runtime-safe

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ImageKitProvider urlEndpoint={env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}>
          <Header />      {/* ✅ Add your header here */}
          {children}
          <Footer />
        </ImageKitProvider>
      </body>
    </html>
  );
};

export default Layout;
