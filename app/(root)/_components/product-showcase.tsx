import { Image } from "@imagekit/next";
import { productImages } from "@/data/home";
import Link from "next/link";

export function ProductShowcase() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {productImages.map((image, index) => (
            <div
              key={index}
              className="relative w-full aspect-[9/16] overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-20" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent z-20" />

              <Image
                src={image.imageSrc}
                alt="Product"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                quality={100}
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                className="relative z-10 group-hover:scale-105 transition-all duration-300"
              />
              <div className="absolute bottom-2 left-0 right-0 p-4 text-white text-center z-30 w-full">
                <Link href={image.href}>
                  <p className="text-lg font-medium uppercase tracking-widest">
                    {image.label}
                  </p>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
