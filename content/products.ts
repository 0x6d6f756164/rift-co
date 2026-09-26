// Product catalog + inventory. Add, remove, or restock items here —
// the shop grid, product pages, and homepage "featured" section all
// read from this one list.

export type Category = "Outerwear" | "Tops" | "Bottoms" | "Accessories";
export type Size = "XS" | "S" | "M" | "L" | "XL";

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: Category;
  price: number; // USD
  description: string;
  details: string[];
  /** Path under /public, e.g. "/images/products/field-jacket.svg" */
  image: string;
  /** Units left per size. Omit a size if it's not made in that cut. */
  stock: Partial<Record<Size, number>>;
  featured?: boolean;
}

export const products: Product[] = [
  {
    id: "p1",
    slug: "field-jacket",
    name: "Field Jacket",
    category: "Outerwear",
    price: 128,
    description:
      "A four-pocket shell in waxed cotton twill, cut roomy enough to layer under without losing shape.",
    details: ["12oz waxed cotton twill", "Corozo buttons", "Storm flap over the zip", "Made in Portugal"],
    image: "/images/products/field-jacket.svg",
    stock: { S: 4, M: 9, L: 7, XL: 2 },
    featured: true,
  },
  {
    id: "p2",
    slug: "ridge-cargo-pant",
    name: "Ridge Cargo Pant",
    category: "Bottoms",
    price: 98,
    description:
      "Straight-leg cargos in a brushed ripstop, with a gusseted crotch for range of motion you can actually use.",
    details: ["Brushed cotton ripstop", "Gusseted crotch", "YKK zippers", "Garment-dyed"],
    image: "/images/products/ridge-cargo-pant.svg",
    stock: { XS: 3, S: 6, M: 11, L: 8, XL: 4 },
    featured: true,
  },
  {
    id: "p3",
    slug: "waxed-trucker",
    name: "Waxed Trucker",
    category: "Outerwear",
    price: 145,
    description:
      "A boxier trucker silhouette in the same waxed twill as the Field Jacket, built for a colder drop.",
    details: ["12oz waxed cotton twill", "Corduroy collar", "Snap front", "Made in Portugal"],
    image: "/images/products/waxed-trucker.svg",
    stock: { S: 2, M: 5, L: 0, XL: 1 },
  },
  {
    id: "p4",
    slug: "overdyed-tee",
    name: "Overdyed Tee",
    category: "Tops",
    price: 42,
    description:
      "Garment-dyed heavyweight cotton, overdyed by hand so no two runs land exactly the same.",
    details: ["230gsm cotton jersey", "Garment-dyed, hand-finished", "Pre-shrunk"],
    image: "/images/products/overdyed-tee.svg",
    stock: { XS: 8, S: 14, M: 20, L: 15, XL: 6 },
    featured: true,
  },
  {
    id: "p5",
    slug: "utility-vest",
    name: "Utility Vest",
    category: "Outerwear",
    price: 86,
    description:
      "Six-pocket vest built to carry what you'd otherwise leave behind, layers flat under the Field Jacket.",
    details: ["Cotton canvas shell", "Six exterior pockets", "Adjustable side straps"],
    image: "/images/products/utility-vest.svg",
    stock: { S: 3, M: 0, L: 3, XL: 0 },
  },
  {
    id: "p6",
    slug: "trail-beanie",
    name: "Trail Beanie",
    category: "Accessories",
    price: 28,
    description: "Ribbed merino wool, unlined, cut short enough to not fight your hood.",
    details: ["100% merino wool", "One size", "Unlined"],
    image: "/images/products/trail-beanie.svg",
    stock: { M: 17 },
    featured: true,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getProductsByCategory(category?: string): Product[] {
  if (!category) return products;
  return products.filter((p) => p.category === category);
}

export function totalStock(product: Product): number {
  return Object.values(product.stock).reduce((sum, n) => sum + (n ?? 0), 0);
}

export function isInStock(product: Product): boolean {
  return totalStock(product) > 0;
}

export const categories: Category[] = ["Outerwear", "Tops", "Bottoms", "Accessories"];
