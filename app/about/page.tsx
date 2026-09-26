import type { Metadata } from "next";
import WhyUs from "@/components/WhyUs";
import Testimonials from "@/components/Testimonials";
import Reveal from "@/components/Reveal";
import { business } from "@/content/site";

export const metadata: Metadata = {
  title: "About — Rift Co.",
};

export default function AboutPage() {
  return (
    <main>
      <section className="border-b border-ink/10 bg-ink text-paper">
        <div className="container-edge py-16 md:py-24">
          <Reveal>
            <h1 className="max-w-2xl font-display text-5xl leading-[0.95] md:text-6xl">
              {business.foundedStory.split(".")[0]}.
            </h1>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-paper/70">
              {business.foundedStory}
            </p>
          </Reveal>
        </div>
      </section>

      <WhyUs heading="How that plays out" />
      <Testimonials />
    </main>
  );
}
