"use client";

import { Title } from "@/components/Title";
import { CardCarousel } from "@/components/ui/card-carousel";
import { outfitSliderImages } from "@/data/home";

function OutfitSlider() {
  return (
    <section className="py-16">
      <div className="container">
        <Title
          title="Roll the Looks"
          description="Swipe through looks that define this season's vibe"
        />
        <div className="flex items-center justify-center w-full overflow-hidden">
          <CardCarousel
            images={outfitSliderImages.map((item) => ({
              src: item.image,
              alt: item.id.toString(),
            }))}
          />
        </div>
      </div>
    </section>
  );
}

export { OutfitSlider };
