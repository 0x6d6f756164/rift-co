// Generic, site-wide info that has no better home elsewhere.
// Edit this file to rebrand the store — name, copy, links, nav, footer.
// Product data lives in `content/products.ts`, reviews in
// `content/testimonials.ts`, and lookbook imagery in `content/lookbook.ts`.

export const business = {
  name: "Stray Co.",
  shortName: "Stray",
  tagline: "Clothes that don't stay put",
  description:
    "Utility-built streetwear for people who don't plan on staying still. Designed in-house, tested outside.",
  foundedStory:
    "Stray Co. started as three duffel bags of samples sold out of a van outside a warehouse show. We still design that way — a small run, worn hard, fixed if it fails, kept if it earns a place in rotation.",
};

export const contact = {
  email: "hello@strayco.example",
  supportEmail: "support@strayco.example",
  phone: "+1 (555) 019-4477",
  address: "412 Freight St, Unit 3, Portland, OR",
};

export const socials = [
  { label: "Instagram", href: "https://instagram.com/strayco" },
  { label: "TikTok", href: "https://tiktok.com/@strayco" },
];

// Primary navigation, shared by the navbar and mobile menu.
export const primaryNav = [
  { label: "Shop", href: "/shop" },
  { label: "Lookbook", href: "/lookbook" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// Footer link columns.
export const footerNav = [
  {
    heading: "Shop",
    links: [
      { label: "Outerwear", href: "/shop" },
      { label: "Tops", href: "/shop" },
      { label: "Bottoms", href: "/shop" },
      { label: "Accessories", href: "/shop" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Shipping & returns", href: "/contact" },
      { label: "Size guide", href: "/contact" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Our story", href: "/about" },
      { label: "Lookbook", href: "/lookbook" },
    ],
  },
];

// Mirrors the color tokens defined in `app/globals.css` under `@theme`.
// Tailwind reads the CSS version to generate utility classes (bg-ink,
// text-blood, etc) — this object is only for places that need the raw
// hex value in JS/TS (canvas, SVG generation, meta theme-color, charts).
// Keep the two in sync if you change the palette.
export const palette = {
  ink: "#0A0A0A",
  paper: "#F4F2ED",
  bone: "#ECE8DF",
  blood: "#E23A24",
  steel: "#8C8880",
};
