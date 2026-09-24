import { testimonials } from "@/content/testimonials";
import Reveal, { RevealGroup, RevealItem } from "@/components/Reveal";

export default function Testimonials() {
  return (
    <section id="reviews" className="border-b border-ink/10 bg-paper">
      <div className="container-edge py-16 md:py-24">
        <Reveal>
          <h2 className="mb-12 font-display text-4xl leading-none md:mb-16 md:text-5xl">
            From people who wear it daily
          </h2>
        </Reveal>

        <RevealGroup className="grid gap-10 md:grid-cols-3 md:gap-0">
          {testimonials.map((review, i) => (
            <RevealItem
              key={review.id}
              className={`pt-6 md:px-8 md:pt-0 ${
                i > 0 ? "border-t border-ink/10 md:border-l md:border-t-0" : "md:pl-0"
              }`}
            >
              <figure>
                <blockquote className="text-lg leading-snug text-ink/85">“{review.quote}”</blockquote>
                <figcaption className="mt-5 text-sm text-ink/55">
                  {review.name} — {review.place}
                </figcaption>
              </figure>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
