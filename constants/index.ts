export const LOGO_URL = "/logo.png";
export const WHATSAPP_NUMBER = "+918920791499";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export const CONTACT_INFO = {
  address:
    "1st Floor, Vardhman Plaza, Shop No.104, near Maharaja Agrasen Adarsh School, GU-Block, AU Block, Ranikhet, Pitampura, New Delhi, Delhi, 110088",
  phone: "+91 7065070555",
  email: "shelacreation@gmail.com",
};

export type Navlink =
  | { label: string; href: string; children?: undefined }
  | { label: string; children: Array<{ label: string; href: string }> };

export const navlinks: Navlink[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Men",
    children: [
      {
        label: "Casual Wear",
        href: "/men?category=casual-wear",
      },
      {
        label: "Formal Wear",
        href: "/men?category=formal-wear",
      },
      {
        label: "Ethnic Wear",
        href: "/men?category=ethnic-wear",
      },
      {
        label: "Indo Western",
        href: "/men?category=indo-western",
      },
    ],
  },
  {
    label: "Women",
    children: [
      {
        label: "Western",
        href: "/women?category=western",
      },
      {
        label: "Ethnic",
        href: "/women?category=ethnic",
      },
      {
        label: "Indo Western",
        href: "/women?category=indo-western",
      },
      {
        label: "Sarees",
        href: "/women?category=sarees",
      },
      {
        label: "Kaftans",
        href: "/women?category=kaftans",
      },
    ],
  },
  {
    label: "Kids",
    href: "/kids",
  },
  {
    label: "Latest",
    href: "/latest",
  },
  {
    label: "Wedding",
    href: "/wedding",
  },
  {
    label: "Press",
    href: "/press",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export const socialLinks = [
  // {
  //   label: "Facebook",
  //   href: "https://www.facebook.com",
  // },
  {
    label: "Instagram",
    href: "https://www.instagram.com/manindergulatiofficial",
  },
  // {
  //   label: "Youtube",
  //   href: "https://www.youtube.com",
  // },
];
