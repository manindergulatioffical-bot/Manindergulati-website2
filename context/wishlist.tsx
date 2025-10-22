"use client";

import React, {
  createContext,
  useEffect,
  useState,
  ReactNode,
  use,
} from "react";

const WISHLIST_KEY = "wishlist_items";

function getWishlistIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const items = localStorage.getItem(WISHLIST_KEY);
    return items ? JSON.parse(items) : [];
  } catch {
    return [];
  }
}

function addToWishlist(itemId: string): void {
  if (typeof window === "undefined") return;
  const current = getWishlistIds();
  if (!current.includes(itemId)) {
    const updated = [...current, itemId];
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(updated));
  }
}

function removeFromWishlist(itemId: string): void {
  if (typeof window === "undefined") return;
  const current = getWishlistIds();
  const updated = current.filter((id) => id !== itemId);
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(updated));
}

function clearWishlist(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(WISHLIST_KEY);
}

function isInWishlist(itemId: string): boolean {
  if (typeof window === "undefined") return false;
  const current = getWishlistIds();
  return current.includes(itemId);
}

type WishlistContextType = {
  wishlistIds: string[];
  addToWishlist: (itemId: string) => void;
  removeFromWishlist: (itemId: string) => void;
  clearWishlist: () => void;
  isInWishlist: (itemId: string) => boolean;
  refreshWishlist: () => void;
};

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);

  useEffect(() => {
    setWishlistIds(getWishlistIds());
  }, []);

  // Listen to localStorage changes (for multi-tab sync)
  useEffect(() => {
    function handleStorage(e: StorageEvent) {
      if (e.key === WISHLIST_KEY) {
        setWishlistIds(getWishlistIds());
      }
    }
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const handleAddToWishlist = (itemId: string) => {
    addToWishlist(itemId);
    setWishlistIds(getWishlistIds());
  };

  const handleRemoveFromWishlist = (itemId: string) => {
    removeFromWishlist(itemId);
    setWishlistIds(getWishlistIds());
  };

  const handleClearWishlist = () => {
    clearWishlist();
    setWishlistIds([]);
  };

  const handleIsInWishlist = (itemId: string) => {
    return isInWishlist(itemId);
  };

  const refreshWishlist = () => {
    setWishlistIds(getWishlistIds());
  };

  return (
    <WishlistContext
      value={{
        wishlistIds,
        addToWishlist: handleAddToWishlist,
        removeFromWishlist: handleRemoveFromWishlist,
        clearWishlist: handleClearWishlist,
        isInWishlist: handleIsInWishlist,
        refreshWishlist,
      }}
    >
      {children}
    </WishlistContext>
  );
}

export function useWishlist() {
  const context = use(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
