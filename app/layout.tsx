import type { Metadata } from "next";
import { Cinzel, Poppins } from "next/font/google";
import "./globals.css";
import { TRPCReactProvider } from "@/trpc/react";
import { Toaster } from "@/components/ui/sonner";
import { WishlistProvider } from "@/context/wishlist";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Maninder Gulati - Premium Fashion & Lifestyle",
    template: "%s | Maninder Gulati",
  },
  description:
    "Discover premium fashion collections by Maninder Gulati. Shop the latest trends in men's and women's clothing, wedding collections, and lifestyle products. Handcrafted with quality and style.",
  keywords: [
    "fashion",
    "clothing",
    "premium fashion",
    "wedding collection",
    "men's fashion",
    "women's fashion",
    "handcrafted",
    "Maninder Gulati",
    "lifestyle",
  ],
  authors: [{ name: "Maninder Gulati" }],
  creator: "Maninder Gulati",
  publisher: "Maninder Gulati Official",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://manindergulati.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://manindergulati.com",
    title: "Maninder Gulati - Premium Fashion & Lifestyle",
    description:
      "Discover premium fashion collections by Maninder Gulati. Shop the latest trends in men's and women's clothing, wedding collections, and lifestyle products.",
    siteName: "Maninder Gulati Official",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Maninder Gulati Fashion Brand",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Maninder Gulati - Premium Fashion & Lifestyle",
    description:
      "Discover premium fashion collections by Maninder Gulati. Shop the latest trends in men's and women's clothing, wedding collections, and lifestyle products.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${cinzel.variable} ${poppins.variable} antialiased`}>
        <TRPCReactProvider>
          <WishlistProvider>{children}</WishlistProvider>
        </TRPCReactProvider>
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
