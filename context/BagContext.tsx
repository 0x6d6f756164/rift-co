"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Product, Size } from "@/content/products";

export interface BagItem {
  productId: string;
  slug: string;
  name: string;
  price: number;
  size: Size;
  image: string;
  qty: number;
}

interface BagContextValue {
  items: BagItem[];
  isOpen: boolean;
  open: () => void;
  close: () => void;
  addItem: (product: Product, size: Size, qty?: number) => void;
  removeItem: (productId: string, size: Size) => void;
  updateQty: (productId: string, size: Size, qty: number) => void;
  count: number;
  subtotal: number;
}

const BagContext = createContext<BagContextValue | null>(null);

export function BagProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<BagItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const addItem = useCallback((product: Product, size: Size, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === product.id && i.size === size);
      if (existing) {
        return prev.map((i) =>
          i.productId === product.id && i.size === size ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [
        ...prev,
        {
          productId: product.id,
          slug: product.slug,
          name: product.name,
          price: product.price,
          size,
          image: product.image,
          qty,
        },
      ];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((productId: string, size: Size) => {
    setItems((prev) => prev.filter((i) => !(i.productId === productId && i.size === size)));
  }, []);

  const updateQty = useCallback((productId: string, size: Size, qty: number) => {
    setItems((prev) =>
      prev
        .map((i) => (i.productId === productId && i.size === size ? { ...i, qty } : i))
        .filter((i) => i.qty > 0)
    );
  }, []);

  const count = useMemo(() => items.reduce((sum, i) => sum + i.qty, 0), [items]);
  const subtotal = useMemo(() => items.reduce((sum, i) => sum + i.qty * i.price, 0), [items]);

  const value = useMemo(
    () => ({ items, isOpen, open, close, addItem, removeItem, updateQty, count, subtotal }),
    [items, isOpen, open, close, addItem, removeItem, updateQty, count, subtotal]
  );

  return <BagContext.Provider value={value}>{children}</BagContext.Provider>;
}

export function useBag(): BagContextValue {
  const ctx = useContext(BagContext);
  if (!ctx) throw new Error("useBag must be used inside <BagProvider>");
  return ctx;
}
