"use client";

import { motion } from "framer-motion";

/**
 * Rendered fresh by app/template.tsx on every navigation (App Router
 * gives template.tsx a new instance per route change, unlike layout.tsx
 * which persists). The red panel briefly covers the viewport, then
 * sweeps off to reveal the page underneath — the same color block from
 * the homepage hero, doing double duty as the site's navigation motif.
 */
export default function RouteTransition() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-100 overflow-hidden">
      <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1], delay: 0.08 }}
        style={{ transformOrigin: "right" }}
        className="absolute inset-0 bg-blood"
      />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.5, times: [0, 0.5, 1] }}
        className="absolute inset-0 flex items-center justify-center font-display text-2xl tracking-tight text-paper"
      >
        STRAY CO.
      </motion.span>
    </div>
  );
}
