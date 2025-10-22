import Imagekit from "imagekit";
import { env } from "@/lib/env";

const imageKit = new Imagekit({
  publicKey: env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
  privateKey: env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT,
});

export async function deleteImages(images: string[]) {
  imageKit.bulkDeleteFiles(images, function (error) {
    if (error) console.log(error);
  });
};

export async function deleteImage(image: string) {
  imageKit.deleteFile(image, function (error) {
    if (error) console.log(error);
  });
};  