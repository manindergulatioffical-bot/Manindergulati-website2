import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { WHATSAPP_NUMBER } from "@/constants";
import { toast } from "sonner";
import { upload } from "@imagekit/next";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const sendMessageToWhatsapp = (message: string) => {
  const whatsappMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;
  window.open(whatsappUrl, "_blank");
};

export const encryptImageUrl = (url: string, fileId: string) => {
  return btoa(url + "--" + fileId);
};

export const decryptImageUrl = (encryptedUrl: string) => {
  const decodedUrl = atob(encryptedUrl);
  const parts = decodedUrl.split("--");

  return { url: parts[0], fileId: parts[1] };
};

export const authenticator = async (): Promise<{
  signature: string;
  expire: number;
  token: string;
  publicKey: string;
} | null> => {
  try {
    const response = await fetch("/api/get-image-auth");
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    const { signature, expire, token, publicKey } = data;

    // Validate that all required parameters are present
    if (!signature || !expire || !token || !publicKey) {
      throw new Error("Missing authentication parameters in response");
    }

    return { signature, expire, token, publicKey };
  } catch (error) {
    console.error("Authentication error:", error);
    toast.error("Authentication error", {
      description: error instanceof Error ? error.message : String(error),
    });
    return null;
  }
};

export async function uploadImage(
  files: ImageFile[]
): Promise<string[] | null> {
  const images: string[] = [];
  for (const file of files) {
    try {
      let authParams;
      try {
        authParams = await authenticator();
        if (!authParams) {
          return null;
        }
      } catch (authError) {
        console.error("Failed to authenticate for upload:", authError);
        return null;
      }

      const { signature, expire, token, publicKey } = authParams;
      const uploadResponse = await upload({
        expire,
        token,
        signature,
        publicKey,
        file: file.file,
        fileName: file.name,
        folder: "maninder_gulati/products/",
      });
      if (!uploadResponse || !uploadResponse.url || !uploadResponse.fileId) {
        console.error("Failed to upload image:", file.name);
        continue;
      }
      images.push(encryptImageUrl(uploadResponse.url, uploadResponse.fileId));
      toast.success(`Image ${file.name} uploaded successfully!`);
    } catch (error) {
      console.error("Upload error for file:", file.name, error);
      toast.error("Upload error", {
        description: `Failed to upload ${file.name}: ${
          error instanceof Error ? error.message : String(error)
        }`,
      });
    }
  }
  if (images.length === 0) {
    console.error("No images uploaded successfully.");
    return null;
  }
  return images;
}

export const handleQuery = (item: {
  id: string;
  name: string;
  images: string[];
  category: string;
}) => {
  const message = `*Product Enquiry*\n\n*Product Name:* ${
    item.name
  }\n*Product Url:* ${
    window.location.origin + "/product/" + item.id
  }\n\nHello, I'm interested in this product. Could you please provide more details regarding availability, price, and delivery options?\n\nThank you!`;
  sendMessageToWhatsapp(message);
};
