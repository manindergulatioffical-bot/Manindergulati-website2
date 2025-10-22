import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ImageKitProvider } from "@imagekit/next";
import { env } from "@/lib/env";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ImageKitProvider urlEndpoint={env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}>
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </ImageKitProvider>
  );
};

export default Layout;
