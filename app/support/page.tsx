import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { contact } from "@/content/site";

export const metadata: Metadata = {
  title: "Support — Rift Co.",
};

export default function SupportPage() {
  return (
    <main className="container-edge py-16 md:py-24">
      <Reveal>
        <h1 className="font-display text-5xl leading-none md:text-6xl">Support</h1>
      </Reveal>

      <div className="mt-14 grid gap-14 md:grid-cols-2 md:gap-20">
        <Reveal>
          <section id="shipping" className="scroll-mt-24">
            <h2 className="font-display text-2xl">Shipping &amp; returns</h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-ink/70">
              <p>
                Domestic orders ship within 48 hours and typically arrive in 3–5 business
                days. Tracking goes out by email the moment a label is created.
              </p>
              <p>
                You have 30 days from delivery to send something back — worn or not. Email{" "}
                <a href={`mailto:${contact.supportEmail}`} className="underline underline-offset-4">
                  {contact.supportEmail}
                </a>{" "}
                with your order number and we&apos;ll send a prepaid label.
              </p>
              <p>Refunds land back on the original payment method within 5–7 business days of us receiving the return.</p>
            </div>
          </section>
        </Reveal>

        <Reveal delay={0.1}>
          <section id="size-guide" className="scroll-mt-24">
            <h2 className="font-display text-2xl">Size guide</h2>
            <p className="mt-4 text-sm leading-relaxed text-ink/70">
              Most pieces run true to size with a slightly roomy, layer-friendly cut. If
              you're between sizes, size down for a closer fit or stay true to size for
              room to layer.
            </p>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[420px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-ink/15 text-left text-ink/50">
                    <th className="py-2 pr-4 font-normal">Size</th>
                    <th className="py-2 pr-4 font-normal">Chest (in)</th>
                    <th className="py-2 pr-4 font-normal">Waist (in)</th>
                    <th className="py-2 font-normal">Best for</th>
                  </tr>
                </thead>
                <tbody className="text-ink/70">
                  {[
                    ["XS", "34–36", "28–30", "Slim frame"],
                    ["S", "37–39", "30–32", "Slim–regular"],
                    ["M", "40–42", "32–34", "Regular"],
                    ["L", "43–45", "35–37", "Regular–broad"],
                    ["XL", "46–48", "38–40", "Broad frame"],
                  ].map((row) => (
                    <tr key={row[0]} className="border-b border-ink/10">
                      {row.map((cell, i) => (
                        <td key={i} className={`py-2.5 ${i === 0 ? "pr-4 text-ink" : i === 3 ? "" : "pr-4"}`}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </Reveal>
      </div>
    </main>
  );
}
