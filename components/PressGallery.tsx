import { Image } from "@imagekit/next";

export const PressGallery = () => {
  return (
    <div className="bg-muted">
      <div className="max-w-7xl w-full mx-auto px-4 grid grid-cols-4 lg:grid-cols-6 gap-4 py-2 ">
        {/* Row 1 */}
        <Image
          src={
            "https://ik.imagekit.io/7uouyh55b/maninder_gulati/press/press-4.jpg?updatedAt=1756828972840"
          }
          alt="Press Image"
          width={1000}
          height={700}
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover col-span-2 w-full h-full border"
        />
        <Image
          src={
            "https://ik.imagekit.io/7uouyh55b/maninder_gulati/press/press-2.jpg?updatedAt=1756828972840"
          }
          alt="Press Image"
          width={700}
          height={1000}
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover col-span-1 h-full w-full border"
        />
        <Image
          src={
            "https://ik.imagekit.io/7uouyh55b/maninder_gulati/press/press-9.jpg?updatedAt=1756828972840"
          }
          alt="Press Image"
          width={700}
          height={1000}
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover col-span-1 h-full w-full border"
        />
        {/* Row 2 */}
        <Image
          src={
            "https://ik.imagekit.io/7uouyh55b/maninder_gulati/press/press-10.jpg?updatedAt=1756828972840"
          }
          alt="Press Image"
          width={700}
          height={1000}
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover col-span-2 h-full w-full border"
        />
        <Image
          src={
            "https://ik.imagekit.io/7uouyh55b/maninder_gulati/press/press-1.jpg?updatedAt=1756828972840"
          }
          alt="Press Image"
          width={700}
          height={1000}
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover col-span-2 h-full w-full border"
        />
        {/* Row 3 */}
        <Image
          src={
            "https://ik.imagekit.io/7uouyh55b/maninder_gulati/press/press-13.jpg?updatedAt=1756828972840"
          }
          alt="Press Image"
          width={700}
          height={1000}
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover col-span-2 h-full w-full border"
        />
        <Image
          src={
            "https://ik.imagekit.io/7uouyh55b/maninder_gulati/press/press-14.jpg?updatedAt=1756828972840"
          }
          alt="Press Image"
          width={700}
          height={1000}
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover col-span-2 h-full w-full border"
        />
        {/* Row 4 */}
        <Image
          src={
            "https://ik.imagekit.io/7uouyh55b/maninder_gulati/press/press-3.jpg?updatedAt=1756828972840"
          }
          alt="Press Image"
          width={700}
          height={1000}
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover col-span-1 h-full w-full border"
        />{" "}
        <Image
          src={
            "https://ik.imagekit.io/7uouyh55b/maninder_gulati/press/press-15.jpg?updatedAt=1756828972840"
          }
          alt="Press Image"
          width={700}
          height={1000}
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover col-span-1 h-full w-full border"
        />
        <Image
          src={
            "https://ik.imagekit.io/7uouyh55b/maninder_gulati/press/press-12.jpg?updatedAt=1756828972840"
          }
          alt="Press Image"
          width={700}
          height={1000}
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover col-span-2 h-full w-full border"
        />
        {/* Row 5 */}
        <Image
          src={
            "https://ik.imagekit.io/7uouyh55b/maninder_gulati/press/press-11.jpg?updatedAt=1756828972840"
          }
          alt="Press Image"
          width={700}
          height={1000}
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover col-span-2 h-full w-full border"
        />
        <Image
          src={
            "https://ik.imagekit.io/7uouyh55b/maninder_gulati/press/press-7.jpg?updatedAt=1756828972840"
          }
          alt="Press Image"
          width={700}
          height={1000}
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover col-span-2 h-full w-full border"
        />
        {/* Row 6 */}
        <Image
          src={
            "https://ik.imagekit.io/7uouyh55b/maninder_gulati/press/press-5.jpg?updatedAt=1756828972840"
          }
          alt="Press Image"
          width={700}
          height={1000}
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover col-span-1 h-full w-full border"
        />
        <Image
          src={
            "https://ik.imagekit.io/7uouyh55b/maninder_gulati/press/press-6.jpg?updatedAt=1756828972840"
          }
          alt="Press Image"
          width={700}
          height={1000}
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover col-span-2 h-full w-full border"
        />
        <Image
          src={
            "https://ik.imagekit.io/7uouyh55b/maninder_gulati/press/press-8.jpg?updatedAt=1756828972840"
          }
          alt="Press Image"
          width={700}
          height={1000}
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover col-span-1 h-full w-full border"
        />
      </div>
    </div>
  );
};
