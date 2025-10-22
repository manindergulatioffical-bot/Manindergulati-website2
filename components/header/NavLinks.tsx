"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { navlinks } from "@/constants";
import { usePathname, useRouter } from "next/navigation";

export const NavLinks = () => {
  const currentPath = usePathname();
  const router = useRouter();

  return (
    <nav className="flex items-center space-x-8">
      {navlinks.map((link) => {
        if (link.children) {
          return (
            <DropdownMenu key={link.label}>
              <DropdownMenuTrigger className="flex items-center text-gray-700 hover:text-black transition-colors pb-1 hover:cursor-pointer focus:border-none ">
                {link.label}
                <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {link.children.map((child) => (
                  <DropdownMenuItem key={child.label}>
                    <div
                      onClick={() => {
                        router.push(child.href);
                      }}
                    >
                      {child.label}
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          );
        }
        return (
          <Link
            key={link.label}
            href={link.href}
            className={` transition-colors pb-1 ${
              currentPath === link.href
                ? "font-medium underline underline-offset-6 text-primary"
                : "text-gray-700 hover:text-black hover:underline underline-offset-6"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
};
