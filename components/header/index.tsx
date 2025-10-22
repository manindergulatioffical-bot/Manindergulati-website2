import {
  Logo,
  MobileMenu,
  NavLinks,
  // SearchIcon,
  WishlistIcon,
} from "./components";

export function Header() {
  return (
    <header className="border-b bg-white relative">
      <div className="container mx-auto py-4 md:py-6 px-4">
        <div className="flex items-center justify-between md:mb-8">
          {/* Menu Bar */}
          <div>
            <div className="md:hidden">
              <MobileMenu />
            </div>
          </div>

          {/* Logo */}
          <Logo />

          {/* Icons */}
          <div className="flex items-center space-x-4">
            {/* <SearchIcon /> */}
            <WishlistIcon />
          </div>
        </div>
        <div className="hidden md:flex justify-center">
          <NavLinks />
        </div>
      </div>
    </header>
  );
}
