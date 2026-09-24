import { ShieldCheck, Recycle, Truck, RotateCcw, type LucideIcon } from "lucide-react";
import { valueProps } from "@/content/why-us";
import Reveal, { RevealGroup, RevealItem } from "@/components/Reveal";

const icons: Record<string, LucideIcon> = { ShieldCheck, Recycle, Truck, RotateCcw };

export default function WhyUs({ heading = "Why people stay with Stray" }: { heading?: string }) {
  return (
    <section id="why" className="border-b border-ink/10 bg-paper">
      <div className="container-edge py-16 md:py-24">
        <Reveal className="mb-12 max-w-lg md:mb-16">
          <h2 className="font-display text-4xl leading-none md:text-5xl">{heading}</h2>
        </Reveal>

        <RevealGroup className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {valueProps.map((point, i) => {
            const Icon = icons[point.icon];
            return (
              <RevealItem
                key={point.title}
                className={`pt-6 lg:px-8 lg:pt-0 ${
                  i > 0 ? "border-t border-ink/10 lg:border-l lg:border-t-0" : ""
                } ${i === 0 ? "lg:pl-0" : ""}`}
              >
                <Icon size={26} strokeWidth={1.5} className="mb-5 text-blood" />
                <h3 className="mb-2 text-lg">{point.title}</h3>
                <p className="text-sm leading-relaxed text-ink/65">{point.body}</p>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
