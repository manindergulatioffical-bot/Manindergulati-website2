import { Image } from "@imagekit/next";
import { Button } from "@/components/ui/button";
import { Title } from "@/components/Title";
import { categoryCards } from "@/data/home";
import Link from "next/link";

export function CategoryCards() {
  return (
    <section className="">
      <div className="container mx-auto px-4">
        <Title
          title="Shop by Style"
          description="Explore men's, women's, and the freshest new collections"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:h-150">
          {categoryCards.map((card) => (
            <CategoryCard key={card.title} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}

const CategoryCard = ({
  title,
  description,
  buttonText,
  image,
  href,
}: {
  title: string;
  description: string;
  buttonText: string;
  image: string;
  href: string;
}) => {
  return (
    <Link
      href={href}
      className="bg-black rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 relative group cursor-pointer transform h-120 md:h-auto block"
    >
      <div className="relative overflow-hidden w-full h-full">
        <Image
          src={image}
          alt={title}
          width={300}
          height={500}
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />

        {/* Enhanced gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

        {/* Content overlay */}
        <div className="absolute bottom-0 p-6 transform transition-transform duration-300 w-full">
          <div className="space-y-3">
            <h3 className="text-2xl font-bold text-white leading-tight">
              {title}
            </h3>
            <p className="text-gray-200 text-sm leading-relaxed line-clamp-2">
              {description}
            </p>
            <Button
              variant="secondary"
              className="w-full bg-white/90 hover:bg-white text-gray-900 font-medium backdrop-blur-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              {buttonText}
            </Button>
          </div>
        </div>
      </div>

      {/* Subtle border highlight on hover */}
      <div className="absolute inset-0 rounded-xl ring-1 ring-black/5 group-hover:ring-black/10 transition-all duration-300" />
    </Link>
  );
};
