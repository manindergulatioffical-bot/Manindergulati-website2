"use client";
import { decryptImageUrl, handleQuery, sendMessageToWhatsapp } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Heart,
  MessageCircle,
  Trash2,
  ShoppingBag,
  ArrowRight,
  X,
} from "lucide-react";
import Image from "next/image";
import { useWishlist } from "@/context/wishlist";
import { api } from "@/trpc/react";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

export default function WishlistItems({
  wishlistIds,
}: {
  wishlistIds: string[];
}) {
  const { removeFromWishlist } = useWishlist();

  const handleRemoveFromWishlist = (productId: string) => {
    removeFromWishlist(productId);
    toast.success("Item removed from wishlist");
  };

  const MAX_ITEMS = 15;

  const handleCheckout = () => {
    if (wishlistIds.length === 0) return;

    const limitedIds = wishlistIds.slice(0, MAX_ITEMS);
    const productList = limitedIds
      .map((id, index) => `${index + 1}. *${window.origin}/product/${id}*`)
      .join("\n");

    const message = `🛒 *Wishlist Enquiry*\n\nI'm interested in the following products from my wishlist:\n\n${productList}\n\nCould you please provide more details regarding availability, price, and delivery options?\n\nThank you!`;

    sendMessageToWhatsapp(message);

    if (wishlistIds.length > MAX_ITEMS) {
      alert(
        `Only the first ${MAX_ITEMS} items were included due to WhatsApp message size limits.`
      );
    }
  };

  if (wishlistIds.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full px-6 py-12 text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <Heart className="h-12 w-12 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Your wishlist is empty
        </h3>
        <p className="text-gray-500 mb-8 max-w-sm">
          Save items you love to your wishlist and never lose track of them
        </p>
        <Button className="w-full max-w-xs">
          <ShoppingBag className="w-4 h-4 mr-2" />
          Start Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto px-6 py-4">
        <div className="space-y-4">
          {wishlistIds.map((itemId) => (
            <WishlistItem
              key={itemId}
              itemId={itemId}
              handleRemoveFromWishlist={handleRemoveFromWishlist}
            />
          ))}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="border-t bg-white px-6 py-4 space-y-3">
        <Button
          className="w-full hover:cursor-pointer"
          size="lg"
          onClick={handleCheckout}
        >
          Checkout Wishlist
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
        <p className="text-xs text-gray-500 text-center">
          Share your wishlist with friends and family
        </p>
      </div>
    </div>
  );
}

const WishlistItem = ({
  itemId,
  handleRemoveFromWishlist,
}: {
  itemId: string;
  handleRemoveFromWishlist: (productId: string) => void;
}) => {
  const {
    data: item,
    isLoading,
    error,
  } = api.products.getProductById.useQuery(
    { id: itemId },
    {
      retry: 1,
      throwOnError: false,
    }
  );


  const handleRemove = () => {
    handleRemoveFromWishlist(itemId);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-xl bg-white">
        <Skeleton className="w-20 h-20 rounded-lg flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-1/3" />
        </div>
        <div className="flex flex-col space-y-2">
          <Skeleton className="h-9 w-20" />
          <Skeleton className="h-9 w-10" />
        </div>
      </div>
    );
  }

  // Error state or item not found
  if (error || !item) {
    return (
      <div className="flex items-center space-x-4 p-4 border border-red-200 rounded-xl bg-red-50">
        <div className="w-20 h-20 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <X className="w-8 h-8 text-red-400" />
        </div>
        <div className="flex-1">
          <h4 className="font-medium text-red-900">Item unavailable</h4>
          <p className="text-sm text-red-600">
            This item is no longer available
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleRemove}
          className="border-red-200 text-red-600 hover:bg-red-100"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="group flex items-center space-x-4 p-4 border border-gray-200 rounded-xl bg-white hover:shadow-md transition-all duration-200 hover:border-gray-300">
      {/* Product Image */}
      <div className="relative w-20 h-20 flex-shrink-0">
        <Image
          src={decryptImageUrl(item.images[0]).url || "/placeholder.svg"}
          alt={item.name}
          fill
          sizes="80px"
          className="object-cover rounded-lg"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-gray-900 truncate group-hover:text-black transition-colors">
          {item.name}
        </h4>
        <p className="text-sm text-gray-500 capitalize mt-1">
          {item.category || "Uncategorized"}
        </p>
        {item.gender && (
          <p className="text-xs text-gray-400 capitalize mt-1">{item.gender}</p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col space-y-2 flex-shrink-0">
        <Button
          size="sm"
          className="w-full min-w-[80px] text-xs"
          onClick={() => handleQuery(item)}
        >
          <MessageCircle className="w-3 h-3 mr-1" />
          Query
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleRemove}
          className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};
