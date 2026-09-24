"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const headlineLines = ["CLOTHES THAT", "DON'T STAY PUT"];

const lineVariants = {
  hidden: { y: "110%" },
  visible: (i: number) => ({
    y: "0%",
    transition: { duration: 0.8, delay: 0.15 + i * 0.1, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export default function Hero() {
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imageWrapRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  return (
    <section id="top" className="border-b border-ink/10">
      <div className="grid md:grid-cols-12">
        {/* Dark panel: headline + supporting copy */}
        <div className="flex flex-col justify-between bg-ink px-6 py-14 text-paper md:col-span-7 md:px-10 md:py-20">
          <h1 className="font-display text-[13vw] leading-[0.9] tracking-tight md:text-[4.6vw]">
            {headlineLines.map((line, i) => (
              <span key={line} className="block overflow-hidden">
                <motion.span
                  className="block"
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={lineVariants}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-10 grid gap-8 border-t border-paper/15 pt-8 sm:grid-cols-2 md:mt-16"
          >
            <p className="text-sm leading-relaxed text-paper/70">
              Utility fabrics, reinforced seams, cuts that move with you
              — not against you.
            </p>
            <p className="text-sm leading-relaxed text-paper/70">
              Every piece is tested on the street before it ever reaches
              a rack. No showroom-only design.
            </p>
          </motion.div>
        </div>

        {/* Image panel with a subtle scroll parallax */}
        <div ref={imageWrapRef} className="relative min-h-[360px] overflow-hidden md:col-span-5 md:min-h-0">
          <motion.div style={{ y: imageY }} className="absolute inset-0 -top-[10%] h-[120%]">
            <Image
              src="/images/hero/hero-portrait.svg"
              alt="Abstract placeholder artwork standing in for a Stray Co. campaign photo"
              fill
              sizes="(min-width: 768px) 42vw, 100vw"
              className="object-cover"
              priority
            />
          </motion.div>
        </div>
      </div>

      {/* Statement strip */}
      <div className="grid md:grid-cols-12">
        <div className="flex items-center bg-paper px-6 py-8 md:col-span-5 md:px-10 md:py-10">
          <p className="max-w-xs text-sm leading-relaxed text-ink/70">
            Founded on the belief that great clothing earns its keep —
            from the first wear to the hundredth.{" "}
            <Link href="/about" className="text-ink underline underline-offset-4">
              Read why we started
            </Link>
            .
          </p>
        </div>
        <div className="flex flex-col justify-center gap-5 bg-blood px-6 py-10 text-paper md:col-span-7 md:px-10 md:py-10">
          <p className="font-display text-[9vw] leading-[0.95] md:text-[3.1vw]">
            BUILT FOR THE ONES WHO NEVER
            STAY IN ONE PLACE
          </p>
          <Link
            href="/shop"
            className="w-fit border border-paper px-5 py-2.5 text-sm transition-colors hover:bg-paper hover:text-blood"
          >
            View the collection
          </Link>
        </div>
      </div>
    </section>
  );
}
