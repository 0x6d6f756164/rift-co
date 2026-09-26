"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import ProductGrid from "@/components/ProductGrid";
import Reveal from "@/components/Reveal";
import { categories, getProductsByCategory, type Category } from "@/content/products";

function isCategory(value: string | null): value is Category {
  return !!value && (categories as readonly string[]).includes(value);
}

export default function ShopClient() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category");
  const [active, setActive] = useState<Category | "All">(
    isCategory(initialCategory) ? initialCategory : "All"
  );

  const products = useMemo(
    () => getProductsByCategory(active === "All" ? undefined : active),
    [active]
  );

  const filters: (Category | "All")[] = ["All", ...categories];

  return (
    <main className="container-edge py-16 md:py-24">
      <Reveal className="mb-10 md:mb-14">
        <h1 className="font-display text-5xl leading-none md:text-6xl">The full collection</h1>
        <p className="mt-4 max-w-md text-sm text-ink/60">
          Discover the entirety of our catalogue & find what suits your taste the best!
        </p>
      </Reveal>

      <div className="mb-12 flex flex-wrap gap-2 md:mb-16">
        {filters.map((filter) => {
          const isActive = active === filter;
          return (
            <button
              key={filter}
              onClick={() => setActive(filter)}
              className={`relative overflow-hidden border px-4 py-2 text-sm transition-colors ${
                isActive ? "border-ink text-paper" : "border-ink/20 text-ink/70 hover:border-ink"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="shop-filter-pill"
                  className="absolute inset-0 -z-10 bg-ink"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              {filter}
            </button>
          );
        })}
      </div>

      {/* key={active} forces a clean remount per filter change, so the
          entrance animation (via `immediate`) replays deterministically
          instead of depending on IntersectionObserver / viewport state
          that's already been "used up" from the first scroll-reveal. */}
      <ProductGrid key={active} products={products} immediate />
    </main>
  );
}
