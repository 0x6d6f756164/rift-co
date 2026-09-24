"use client";

import { useState } from "react";
import { Check, Minus, Plus } from "lucide-react";
import type { Product, Size } from "@/content/products";
import { useBag } from "@/context/BagContext";

const ALL_SIZES: Size[] = ["XS", "S", "M", "L", "XL"];

export default function SizePicker({ product }: { product: Product }) {
  const { addItem } = useBag();
  const availableSizes = ALL_SIZES.filter((s) => s in product.stock);
  const [size, setSize] = useState<Size | null>(null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const stockForSize = size ? product.stock[size] ?? 0 : 0;
  const canAdd = size !== null && stockForSize > 0;

  function handleAdd() {
    if (!size || !canAdd) return;
    addItem(product, size, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div>
      <p className="mb-3 text-sm text-ink/60">Size</p>
      <div className="flex flex-wrap gap-2">
        {availableSizes.map((s) => {
          const stock = product.stock[s] ?? 0;
          const disabled = stock === 0;
          const selected = size === s;
          return (
            <button
              key={s}
              disabled={disabled}
              onClick={() => {
                setSize(s);
                setQty(1);
              }}
              className={`h-11 min-w-11 border px-3 text-sm transition-colors ${
                disabled
                  ? "cursor-not-allowed border-ink/10 text-ink/25 line-through"
                  : selected
                    ? "border-ink bg-ink text-paper"
                    : "border-ink/25 hover:border-ink"
              }`}
            >
              {s}
            </button>
          );
        })}
      </div>

      {size && stockForSize > 0 && stockForSize <= 4 && (
        <p className="mt-3 text-xs text-blood">Only {stockForSize} left in size {size}</p>
      )}

      <div className="mt-6 flex items-center gap-4">
        <div className="flex items-center gap-4 border border-ink/20 px-3 py-2.5">
          <button
            aria-label="Decrease quantity"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="text-ink/60 hover:text-ink"
          >
            <Minus size={14} />
          </button>
          <span className="w-4 text-center text-sm">{qty}</span>
          <button
            aria-label="Increase quantity"
            onClick={() => setQty((q) => Math.min(stockForSize || 1, q + 1))}
            className="text-ink/60 hover:text-ink"
          >
            <Plus size={14} />
          </button>
        </div>

        <button
          onClick={handleAdd}
          disabled={!canAdd}
          className="flex flex-1 items-center justify-center gap-2 bg-ink px-6 py-3.5 text-sm text-paper transition-colors hover:bg-blood disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-ink"
        >
          {added ? (
            <>
              <Check size={16} /> Added
            </>
          ) : size === null ? (
            "Select a size"
          ) : !canAdd ? (
            "Sold out in this size"
          ) : (
            "Add to bag"
          )}
        </button>
      </div>
    </div>
  );
}
