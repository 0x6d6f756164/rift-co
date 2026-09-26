import Link from "next/link";
import type { Product } from "@/content/products";
import ProductCard from "@/components/ProductCard";
import Reveal, { RevealGroup, RevealItem } from "@/components/Reveal";

export default function ProductGrid({
  products,
  heading,
  viewAllHref,
  viewAllLabel = "View all",
  immediate = false,
}: {
  products: Product[];
  heading?: string;
  viewAllHref?: string;
  viewAllLabel?: string;
  /** Pass true for content that's already on screen when it mounts (e.g. a re-filtered grid). */
  immediate?: boolean;
}) {
  return (
    <div>
      {(heading || viewAllHref) && (
        <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-4 md:mb-16">
          {heading && <h2 className="font-display text-4xl leading-none md:text-5xl">{heading}</h2>}
          {viewAllHref && (
            <Link
              href={viewAllHref}
              className="text-sm text-ink/70 underline underline-offset-4 hover:text-ink"
            >
              {viewAllLabel}
            </Link>
          )}
        </Reveal>
      )}

      <RevealGroup immediate={immediate} className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <RevealItem key={product.id}>
            <ProductCard product={product} />
          </RevealItem>
        ))}
      </RevealGroup>

      {products.length === 0 && (
        <p className="py-12 text-center text-sm text-ink/50">No pieces in this category yet.</p>
      )}
    </div>
  );
}
