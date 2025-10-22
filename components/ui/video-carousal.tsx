"use client";

import React, { useEffect, useRef } from "react";
import { Video } from "@imagekit/next";
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
  videos: { src: string; }[];
  autoplayDelay?: number;
}

export const VideoCarousal: React.FC<CarouselProps> = ({
  videos,
  autoplayDelay = 2000,
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
      width: 300px;
    }
  }
  `;
  return (
    <section className="">
      <style>{css}</style>
      <div className="mx-auto w-full  relative">
        <div className="w-full">
          <Swiper
            spaceBetween={60}
            autoplay={{
              delay: autoplayDelay,
              disableOnInteraction: true,
              pauseOnMouseEnter: true
            }}
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 0,
              modifier: 4,
            }}
            
            modules={[EffectCoverflow, Autoplay]}
          >
            {videos.map((video, index) => (
              <SwiperSlide key={index}>
                <div className="size-full rounded-3xl overflow-hidden">
                  <ReelCard videoSrc={video.src} />
                </div>
              </SwiperSlide>
            ))}
            {videos.map((video, index) => (
              <SwiperSlide key={index}>
                <div className="size-full rounded-3xl overflow-hidden">
                  <ReelCard videoSrc={video.src} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};


const ReelCard = ({ videoSrc }: { videoSrc: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.controls = false;
    }
  }, []);
  return (
    <div className="w-full aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl bg-accent">
      <Video
        src={videoSrc}
        alt="Reel"
        quality={100}
        style={{
          objectFit: "cover",
        }}
        className="w-full h-full object-cover"
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
      />
    </div>
  );
};
