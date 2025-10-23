import Script from "next/script";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header"; // ✅ import header
import { ImageKitProvider } from "@imagekit/next";
import { getEnv } from "@/lib/env";


const Layout = ({ children }: { children: React.ReactNode }) => {
  const env = getEnv();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Analytics */}
        <Script 
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-8DKJRE5K9G"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-8DKJRE5K9G');
          `}
        </Script>
      </head>
      <body>
        <ImageKitProvider urlEndpoint={env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}>
          <Header /> {/* ✅ Add header here */}
          {children}
        </ImageKitProvider>
        <Footer />
      </body>
    </html>
  );
};

export default Layout;
