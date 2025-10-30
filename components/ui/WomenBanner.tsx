"use client";

import Image from "next/image";

export const WomenBanner = () => {
  return (
    <div className="relative w-full">
      <Image
        src="https://ik.imagekit.io/ftwqtijhy/White%20Blue%20Professional%20Website%20Developer%20LinkedIn%20Banner.png?updatedAt=1761813883355" // 👈 change to your image path
        alt="Women's Wear Banner"
        width={1920}
        height={600}
        priority
        className="w-full h-auto object-cover"
      />
    </div>
  );
};
