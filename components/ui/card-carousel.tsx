"use client";

import React from "react";
import { Image } from "@imagekit/next";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";
interface CarouselProps {
  images: { src: string; alt: string }[];
  autoplayDelay?: number;
}

export const CardCarousel: React.FC<CarouselProps> = ({
  images,
  autoplayDelay = 1500,
}) => {
  const css = `
  .swiper {
    width: 100%;
    padding-bottom: 50px;
  }
  
  .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 350px;
    /* height: 300px; */
    /* margin: 20px; */
  }
  
  .swiper-slide img {
    display: block;
    width: 100%;
  }
  
  
  .swiper-3d .swiper-slide-shadow-left {
    background-image: none;
  }
  .swiper-3d .swiper-slide-shadow-right{
    background: none;
  }

  @media (max-width: 768px) {
    .swiper-slide {
      width: 280px;
    }
  }
  `;
  return (
    <section className="">
      <style>{css}</style>
      <div className="mx-auto w-full max-w-6xl relative">
        <div className="absolute h-full w-20 bg-gradient-to-r from-transparent via-white/90 to-transparent -left-10 z-10"></div>
        <div className="absolute h-full w-20 bg-gradient-to-r from-transparent via-white/90 to-transparent -right-10 z-10"></div>
        <div className="w-full">
          <Swiper
            spaceBetween={60}
            autoplay={{
              delay: autoplayDelay,
              disableOnInteraction: false,
            }}
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 90,
              modifier: 3,
            }}          
            modules={[EffectCoverflow, Autoplay]}
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="size-full rounded-3xl overflow-hidden">
                  <Image
                    src={image.src}
                    width={500}
                    height={500}
                    className="size-full rounded-xl"
                    alt={image.alt}
                    priority
                  />
                </div>
              </SwiperSlide>
            ))}
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="size-full rounded-3xl overflow-hidden">
                  <Image
                    src={image.src}
                    width={200}
                    height={200}
                    className="size-full rounded-3xl object-cover"
                    alt={image.alt}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};
