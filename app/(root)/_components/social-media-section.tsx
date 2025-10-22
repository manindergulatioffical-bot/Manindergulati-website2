"use client";

import { Title } from "@/components/Title";
import { ReelsData } from "@/data/home";
import { VideoCarousal } from "@/components/ui/video-carousal";

export function SocialMediaSection() {
  return (
    <section className="">
      <div className="container mx-auto px-4">
        <Title
          title="Reel Looks"
          description="Scroll less, style more—our hottest reels, right here"
        />
      </div>
      <VideoCarousal videos={ReelsData.map((vid)=>({src: vid}))}/>
    </section>
  );
}
