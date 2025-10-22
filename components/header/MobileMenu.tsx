"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from 'lucide-react';
import { navlinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const MobileMenu = () => {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Menu className="size-5 text-black" />
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] p-0 flex flex-col">
        <SheetHeader className="p-6 flex-shrink-0">
          <SheetTitle className="text-center text-lg">Menu</SheetTitle>
          <SheetDescription />
        </SheetHeader>
        <div className="flex-1 overflow-y-auto">
          <NavLinks onClick={() => setOpen(false)} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

const NavLinks = ({ onClick }: { onClick: () => void }) => {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col pb-6 text-black">
      {navlinks.map((link) => {
        if (link.children) {
          return (
            <Collapsible key={link.label}>
              <CollapsibleTrigger className="flex items-center justify-between w-full px-6 py-4 transition-colors border-b hover:cursor-pointer focus:outline-none">
                <span className="font-medium">{link.label}</span>
                <ChevronDown className="size-4 transition-transform data-[state=open]:rotate-180" />
              </CollapsibleTrigger>
              <CollapsibleContent className="px-6 py-2 flex flex-col gap-2">
                {link.children.map((child) => (
                  <Link
                    key={child.label}
                    href={child.href}
                    className={`text-gray-600 hover:text-black transition-colors py-2 ${
                      pathname === child.href
                        ? "font-bold underline underline-offset-4"
                        : ""
                    }`}
                    onClick={onClick}
                  >
                    &nbsp;&nbsp;&nbsp; {child.label}
                  </Link>
                ))}
              </CollapsibleContent>
            </Collapsible>
          );
        }

        return (
          <Link
            key={link.label}
            href={link.href}
            className={`px-6 py-4 transition-colors ${
              pathname === link.href
                ? "font-bold underline underline-offset-4"
                : "font-medium"
            }`}
            onClick={onClick}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
};

export { MobileMenu };
