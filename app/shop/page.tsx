"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import ProductGrid from "@/components/ProductGrid";
import Reveal from "@/components/Reveal";
import { categories, getProductsByCategory, type Category } from "@/content/products";

export default function ShopPage() {
  const [active, setActive] = useState<Category | "All">("All");

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
          Everything currently in production, filtered by category.
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
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              {filter}
            </button>
          );
        })}
      </div>

      <ProductGrid products={products} key={active}/>
    </main>
  );
}
