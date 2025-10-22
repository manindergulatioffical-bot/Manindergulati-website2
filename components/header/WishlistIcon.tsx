"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Heart, X } from 'lucide-react';
import WishlistItems from "./WishlistItem";
import { useWishlist } from "@/context/wishlist";
import { Button } from "@/components/ui/button";

export const WishlistIcon = () => {
  const { wishlistIds } = useWishlist();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="relative p-2 hover:bg-gray-100">
          <Heart className="w-5 h-5 cursor-pointer transition-colors" />
          {wishlistIds.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
              {wishlistIds.length > 99 ? '99+' : wishlistIds.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:w-[540px] p-0 flex flex-col">
        <SheetHeader className="px-6 py-4 border-b bg-white sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div>
              <SheetTitle className="text-xl font-semibold">
                My Wishlist
              </SheetTitle>
              <SheetDescription className="text-sm text-gray-600">
                {wishlistIds.length === 0 
                  ? "No items saved yet" 
                  : `${wishlistIds.length} ${wishlistIds.length === 1 ? 'item' : 'items'} saved`
                }
              </SheetDescription>
            </div>
            <SheetClose asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </SheetClose>
          </div>
        </SheetHeader>
        
        <div className="flex-1 overflow-hidden">
          <WishlistItems wishlistIds={wishlistIds} />
        </div>
      </SheetContent>
    </Sheet>
  );
};
