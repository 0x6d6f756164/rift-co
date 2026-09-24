"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus, Check } from "lucide-react";
import { useState } from "react";
import type { Product, Size } from "@/content/products";
import { isInStock } from "@/content/products";
import { useBag } from "@/context/BagContext";

function firstAvailableSize(product: Product): Size | undefined {
  const entry = (Object.entries(product.stock) as [Size, number | undefined][]).find(
    ([, qty]) => (qty ?? 0) > 0
  );
  return entry?.[0];
}

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useBag();
  const [justAdded, setJustAdded] = useState(false);
  const inStock = isInStock(product);
  const quickSize = firstAvailableSize(product);

  function handleQuickAdd(e: React.MouseEvent) {
    e.preventDefault();
    if (!quickSize) return;
    addItem(product, quickSize);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  }

  return (
    <div className="group">
      <Link href={`/shop/${product.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-bone">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
          {!inStock && (
            <span className="absolute left-3 top-3 bg-paper px-2 py-1 text-[11px] uppercase tracking-wide text-ink/70">
              Sold out
            </span>
          )}
          <button
            aria-label={inStock ? `Quick add ${product.name} to bag` : `${product.name} is sold out`}
            onClick={handleQuickAdd}
            disabled={!inStock}
            className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center bg-paper text-ink transition-colors hover:bg-blood hover:text-paper disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-paper disabled:hover:text-ink"
          >
            {justAdded ? <Check size={18} strokeWidth={2} /> : <Plus size={18} strokeWidth={1.75} />}
          </button>
        </div>
        <div className="mt-4 flex items-start justify-between">
          <div>
            <h3 className="text-base">{product.name}</h3>
            <p className="text-sm text-ink/55">{product.category}</p>
          </div>
          <p className="text-sm">${product.price}</p>
        </div>
      </Link>
    </div>
  );
}
