import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Maninder Gulati. Contact us for product inquiries, styling advice, order support, or any questions about our premium fashion collections. We're here to help!",
  keywords: ["contact us", "customer support", "product inquiries", "styling advice", "order support", "fashion consultation", "Maninder Gulati contact"],
  openGraph: {
    title: "Contact Us - Maninder Gulati",
    description: "Get in touch with Maninder Gulati. Contact us for product inquiries, styling advice, order support, or any questions about our premium fashion collections.",
    url: "https://manindergulati.com/contact",
    images: [
      {
        url: "/contact-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Maninder Gulati",
      },
    ],
  },
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 