"use client";
import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export const SearchIcon = () => {
  const [searchQuery, setSearchQuery] = useState("");
  // Dummy data for search suggestions
  const searchSuggestions = [
    { id: 1, title: "Summer Collection 2024", type: "Collection" },
    { id: 2, title: "Men's Casual Shirts", type: "Category" },
    { id: 3, title: "Women's Dresses", type: "Category" },
    { id: 4, title: "New Arrivals", type: "Collection" },
    { id: 5, title: "Sale Items", type: "Collection" },
  ];

  const popularSearches = [
    "Denim Jackets",
    "Summer Dresses",
    "Casual Shirts",
    "Sneakers",
    "Accessories",
  ];
  
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Search className="w-5 h-5 cursor-pointer hover:text-gray-600 transition-colors" />
      </SheetTrigger>
      <SheetContent
        side="right"
        className="px-2 sm:w-[540px] overflow-y-auto"
      >
        <SheetHeader>
          <SheetTitle>Search</SheetTitle>
          <SheetDescription />
        </SheetHeader>
        <div className="mt-6 space-y-6 pb-6">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search for products, collections..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Popular Searches */}
          <div>
            <h3 className="font-semibold mb-3">Popular Searches</h3>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((search, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-sm bg-transparent"
                  onClick={() => setSearchQuery(search)}
                >
                  {search}
                </Button>
              ))}
            </div>
          </div>

          {/* Search Suggestions */}
          <div>
            <h3 className="font-semibold mb-3">Collections & Categories</h3>
            <div className="space-y-2">
              {searchSuggestions.map((suggestion) => (
                <div
                  key={suggestion.id}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
                >
                  <div>
                    <div className="font-medium">{suggestion.title}</div>
                    <div className="text-sm text-gray-500">
                      {suggestion.type}
                    </div>
                  </div>
                  <ChevronDown className="h-4 w-4 rotate-[-90deg]" />
                </div>
              ))}
            </div>
          </div>

          {/* Trending Now */}
          <div>
            <h3 className="font-semibold mb-3">Trending Now</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Image
                  src="https://placehold.co/120x120"
                  alt="Trending Item"
                  width={120}
                  height={120}
                  className="w-full h-24 object-cover rounded-lg"
                />
                <div className="text-sm font-medium">Summer Essentials</div>
              </div>
              <div className="space-y-2">
                <Image
                  src="https://placehold.co/120x120"
                  alt="Trending Item"
                  width={120}
                  height={120}
                  className="w-full h-24 object-cover rounded-lg"
                />
                <div className="text-sm font-medium">New Arrivals</div>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}; 