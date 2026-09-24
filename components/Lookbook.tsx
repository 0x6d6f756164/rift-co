import Image from "next/image";
import { lookbookIntro, lookbookShots } from "@/content/lookbook";
import Reveal, { RevealGroup, RevealItem } from "@/components/Reveal";

export default function Lookbook({ dark = true }: { dark?: boolean }) {
  return (
    <section
      id="lookbook"
      className={`border-b border-ink/10 ${dark ? "bg-ink text-paper" : "bg-paper text-ink"}`}
    >
      <div className="container-edge py-16 md:py-24">
        <Reveal className="mb-12 max-w-lg md:mb-16">
          <h2 className="font-display text-4xl leading-none md:text-5xl">{lookbookIntro.heading}</h2>
          <p className={`mt-4 text-sm leading-relaxed ${dark ? "text-paper/65" : "text-ink/65"}`}>
            {lookbookIntro.body}
          </p>
        </Reveal>

        <RevealGroup className="grid gap-4 md:grid-cols-12">
          {lookbookShots.map((shot) => (
            <RevealItem
              key={shot.id}
              className={`relative overflow-hidden ${
                shot.span === "wide" ? "md:col-span-7 aspect-[4/5]" : "md:col-span-5 aspect-[4/5]"
              }`}
            >
              <Image
                src={shot.image}
                alt={shot.caption}
                fill
                sizes="(min-width: 768px) 55vw, 100vw"
                className="object-cover"
              />
              <span className="absolute bottom-3 left-3 bg-ink/70 px-2 py-1 text-xs text-paper">
                {shot.caption}
              </span>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
