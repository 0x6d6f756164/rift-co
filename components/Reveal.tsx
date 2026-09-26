"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { motionConfig } from "@/content/site";

const variants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
      transition={{ duration: motionConfig.revealDuration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Wraps a list and staggers its direct RevealItem children's entrance.
 *
 * `immediate`: use for content that's already on screen when it mounts
 * (e.g. a re-filtered grid) rather than content the user scrolls to.
 * `whileInView` depends on an IntersectionObserver crossing a viewport
 * boundary — for content that's already visible when React mounts it,
 * that boundary was already crossed, so it may never (re-)fire. Give
 * the wrapper a fresh `key` when its contents change (e.g. `key={category}`)
 * so `initial` actually resets and the entrance replays every time.
 */
export function RevealGroup({
  children,
  className,
  stagger = motionConfig.revealStagger,
  immediate = false,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  immediate?: boolean;
}) {
  const trigger = immediate
    ? { animate: "visible" as const }
    : { whileInView: "visible" as const, viewport: { once: true, margin: "-80px" } };

  return (
    <motion.div
      className={className}
      initial="hidden"
      {...trigger}
      transition={{ staggerChildren: stagger }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={variants}
      transition={{ duration: motionConfig.revealDuration * 0.85, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
