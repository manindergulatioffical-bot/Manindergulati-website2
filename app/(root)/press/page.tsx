import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Calendar } from "lucide-react";
import Link from "next/link";
import { lookBooks } from "@/data/press";
import { PressGallery } from "@/components/PressGallery";

export const metadata: Metadata = {
  title: "Press & Media",
  description:
    "Press room for Maninder Gulati. Access press releases, media kit, brand assets, and company information. Connect with our PR team for interviews, collaborations, and media inquiries.",
  keywords: [
    "press",
    "media",
    "press releases",
    "media kit",
    "brand assets",
    "PR",
    "public relations",
    "media inquiries",
    "Maninder Gulati press",
    "fashion press",
  ],
  openGraph: {
    title: "Press & Media - Maninder Gulati",
    description:
      "Press room for Maninder Gulati. Access press releases, media kit, brand assets, and company information.",
    url: "https://manindergulati.com/press",
    images: [
      {
        url: "/press-media-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Press & Media Room",
      },
    ],
  },
  alternates: {
    canonical: "/press",
  },
};

export default function PressPage() {
  return (
    <div>
      {/* Page Header */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-light tracking-wider mb-4 text-gray-900 uppercase">
              Press & Media
            </h1>
            <p className="text-lg text-gray-600 font-medium tracking-wide">
              Media resources and brand information
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Introduction */}
            <div className="text-center mb-16">
              <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
                As seen in top fashion features Spotted in leading style
                magazines Featured in press for festive must-haves A media-loved
                pick for elegant celebrations
              </p>
            </div>

            {/* Look Books */}
            <div className="mb-16">
              <h3 className="text-2xl font-light tracking-wide mb-8 text-gray-900 uppercase text-center">
                Latest Look Books
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {lookBooks.map((lookBook) => (
                  <Card
                    key={lookBook.title}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary">{lookBook.badge}</Badge>
                        <Calendar className="w-4 h-4 text-gray-400" />
                      </div>
                      <CardTitle className="text-lg">
                        {lookBook.title}
                      </CardTitle>
                      <CardDescription>{lookBook.date}</CardDescription>
                    </CardHeader>
                    <CardContent className="h-full flex flex-col justify-between">
                      <p className="text-gray-600 text-sm mb-4">
                        {lookBook.description}
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        asChild
                      >
                        <Link href={lookBook.link} target="_blank">
                          <Download className="w-4 h-4 mr-2" />
                          Download Book
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <PressGallery />

      {/* Call to Action */}
      <div className="text-center py-10">
        <h3 className="text-2xl font-light tracking-wide mb-6 text-gray-900 uppercase">
          Get in Touch
        </h3>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Ready to collaborate or need more information? Our PR team is here to
          help with your media inquiries, interview requests, and partnership
          opportunities.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="px-8" asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

