"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ShoppingBag } from "lucide-react";
import { business, primaryNav } from "@/content/site";
import { useBag } from "@/context/BagContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { count, open: openBag } = useBag();

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-paper/90 backdrop-blur">
      <div className="container-edge flex h-16 items-center justify-between md:h-20">
        <Link href="/" className="font-display text-2xl tracking-tight md:text-3xl">
          {business.name.toUpperCase()}
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {primaryNav.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-ink/70 transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          <button
            aria-label={`Open bag, ${count} items`}
            onClick={openBag}
            className="relative text-ink/70 transition-colors hover:text-ink"
          >
            <ShoppingBag size={19} strokeWidth={1.75} />
            {count > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center bg-blood text-[10px] text-paper">
                {count}
              </span>
            )}
          </button>
          <Link
            href="/shop"
            className="bg-ink px-5 py-2.5 text-sm text-paper transition-colors hover:bg-blood"
          >
            Shop the drop
          </Link>
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <button
            aria-label={`Open bag, ${count} items`}
            onClick={openBag}
            className="relative text-ink/70"
          >
            <ShoppingBag size={20} strokeWidth={1.75} />
            {count > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center bg-blood text-[10px] text-paper">
                {count}
              </span>
            )}
          </button>
          <button aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((v) => !v)}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-ink/10 bg-paper md:hidden">
          <nav className="container-edge flex flex-col gap-4 py-6">
            {primaryNav.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-base text-ink/80"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/shop"
              onClick={() => setOpen(false)}
              className="mt-2 bg-ink px-5 py-3 text-center text-sm text-paper"
            >
              Shop the drop
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
