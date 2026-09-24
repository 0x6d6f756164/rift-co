"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useBag } from "@/context/BagContext";

export default function BagDrawer() {
  const { items, isOpen, close, removeItem, updateQty, subtotal } = useBag();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
            className="fixed inset-0 z-[70] bg-ink/50"
          />
          <motion.aside
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="fixed right-0 top-0 z-[80] flex h-full w-full max-w-sm flex-col bg-paper text-ink shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
              <h2 className="font-display text-2xl">Your bag</h2>
              <button aria-label="Close bag" onClick={close} className="text-ink/60 hover:text-ink">
                <X size={22} />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
                <p className="text-sm text-ink/60">Your bag is empty.</p>
                <Link
                  href="/shop"
                  onClick={close}
                  className="text-sm underline underline-offset-4 hover:text-blood"
                >
                  Browse the collection
                </Link>
              </div>
            ) : (
              <>
                <ul className="flex-1 overflow-y-auto px-6 py-4">
                  {items.map((item) => (
                    <li
                      key={`${item.productId}-${item.size}`}
                      className="flex gap-4 border-b border-ink/10 py-5 first:pt-0"
                    >
                      <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden bg-bone">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-sm">{item.name}</p>
                            <p className="text-xs text-ink/50">Size {item.size}</p>
                          </div>
                          <button
                            aria-label={`Remove ${item.name}`}
                            onClick={() => removeItem(item.productId, item.size)}
                            className="text-ink/40 hover:text-blood"
                          >
                            <X size={15} />
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 border border-ink/15 px-2 py-1">
                            <button
                              aria-label="Decrease quantity"
                              onClick={() => updateQty(item.productId, item.size, item.qty - 1)}
                              className="text-ink/60 hover:text-ink"
                            >
                              <Minus size={13} />
                            </button>
                            <span className="w-4 text-center text-xs">{item.qty}</span>
                            <button
                              aria-label="Increase quantity"
                              onClick={() => updateQty(item.productId, item.size, item.qty + 1)}
                              className="text-ink/60 hover:text-ink"
                            >
                              <Plus size={13} />
                            </button>
                          </div>
                          <p className="text-sm">${item.price * item.qty}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-ink/10 px-6 py-6">
                  <div className="mb-4 flex items-center justify-between text-sm">
                    <span className="text-ink/60">Subtotal</span>
                    <span>${subtotal}</span>
                  </div>
                  <button
                    disabled
                    title="Prototype only — checkout isn't wired up"
                    className="w-full cursor-not-allowed bg-ink px-5 py-3 text-sm text-paper opacity-50"
                  >
                    Checkout
                  </button>
                  <p className="mt-2 text-center text-xs text-ink/40">
                    Prototype bag — checkout isn&apos;t wired up yet.
                  </p>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
