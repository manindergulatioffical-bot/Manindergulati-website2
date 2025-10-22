"use client";
import { navlinks, socialLinks } from "@/constants";
import Link from "next/link";
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from "react";

export function Footer() {
  return (
    <footer className="bg-[#172f31] text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between gap-8 md:gap-12">
          {/* Left Side - Logo */}
          <div className="flex-1 md:max-w-md">
            <div className="mb-6 h-full flex flex-col justify-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 text-center md:text-left">
                Maninder Gulati
              </h2>
              <p className="text-gray-200 text-sm md:max-w-md text-center md:text-left">
                Discover the latest fashion trends and timeless styles. Quality
                clothing for every occasion.
              </p>
            </div>
          </div>

          {/* Right Side - All Sections */}
          <div className="flex flex-col sm:flex-row sm:justify-between gap-8 sm:gap-6 md:gap-8 flex-1 md:max-w-2xl">
            {/* All Links with Dropdowns */}
            <AllLinks />
            {/* Social Links */}
            <SocialLinks />
            {/* Legal Links */}
            <LegalLinks />
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Maninder Gulati. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

const AllLinks = () => {
  const [openDropdowns, setOpenDropdowns] = useState<Record<number, boolean>>({});

  const toggleDropdown = (index: number) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="flex-1">
      <h3 className="text-lg font-semibold mb-3 text-white">All Links</h3>
      <div className="space-y-2">
        {navlinks.map((link, idx) => {
          if (link.children) {
            const isOpen = openDropdowns[idx];
            return (
              <div key={idx} className="space-y-1">
                <button
                  onClick={() => toggleDropdown(idx)}
                  className="flex items-center justify-between w-full text-left text-sm font-medium text-gray-300 uppercase tracking-wide hover:text-white transition-colors"
                >
                  {link.label}
                  {isOpen ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>
                {isOpen && (
                  <div className="space-y-1 ml-2 animate-in slide-in-from-top-2 duration-200">
                    {link.children.map((child, childIdx) => (
                      <Link
                        key={childIdx}
                        href={child.href}
                        className="text-gray-400 hover:text-white transition-colors text-sm block py-1"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          }
          return (
            <Link
              key={idx}
              href={link.href}
              className="text-gray-300 hover:text-white transition-colors font-medium block py-1 text-sm"
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

const SocialLinks = () => {
  return (
    <div className="flex-1">
      <h3 className="text-lg font-semibold mb-3 text-white">Social Links</h3>
      <ul className="space-y-2">
        {socialLinks.map((link, idx) => (
          <li key={idx}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

const LegalLinks = () => {
  const legalLinks = [
    {
      label: "Privacy Policy",
      href: "/privacy-policy",
    },
    {
      label: "Terms & Conditions",
      href: "/terms-and-conditions",
    },
  ];

  return (
    <div className="flex-1">
      <h3 className="text-lg font-semibold mb-3 text-white">Legal Links</h3>
      <ul className="space-y-2">
        {legalLinks.map((link, idx) => (
          <li key={idx}>
            <a
              href={link.href}
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
