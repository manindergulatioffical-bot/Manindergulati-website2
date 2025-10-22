// app/components/Header.tsx
"use client";

import Script from "next/script";
import {
  Logo,
  MobileMenu,
  NavLinks,
  WishlistIcon,
} from "./components";

export function Header() {
  return (
    <>
      {/* Google Analytics */}
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-8DKJRE5K9G"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-8DKJRE5K9G');
        `}
      </Script>

      {/* Header */}
      <header className="border-b bg-white relative">
        <div className="container mx-auto py-4 md:py-6 px-4">
          <div className="flex items-center justify-between md:mb-8">
            {/* Menu Bar */}
            <div className="md:hidden">
              <MobileMenu />
            </div>

            {/* Logo */}
            <Logo />

            {/* Icons */}
            <div className="flex items-center space-x-4">
              <WishlistIcon />
            </div>
          </div>

          <div className="hidden md:flex justify-center">
            <NavLinks />
          </div>
        </div>
      </header>
    </>
  );
}
