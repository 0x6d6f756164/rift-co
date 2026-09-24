import type { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";
import Reveal from "@/components/Reveal";
import { business, contact, socials } from "@/content/site";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact — Stray Co.",
};

export default function ContactPage() {
  return (
    <main className="container-edge py-16 md:py-24">
      <div className="grid gap-16 md:grid-cols-2 md:gap-24">
        <Reveal>
          <h1 className="font-display text-5xl leading-none md:text-6xl">Get in touch</h1>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink/65">
            Questions about an order, wholesale, or just want to say hi — reach {business.shortName}
            {" "}directly.
          </p>

          <ul className="mt-10 space-y-5 text-sm">
            <li className="flex items-start gap-3">
              <Mail size={18} strokeWidth={1.5} className="mt-0.5 text-blood" />
              <a href={`mailto:${contact.email}`} className="hover:underline">
                {contact.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Phone size={18} strokeWidth={1.5} className="mt-0.5 text-blood" />
              <span>{contact.phone}</span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin size={18} strokeWidth={1.5} className="mt-0.5 text-blood" />
              <span>{contact.address}</span>
            </li>
          </ul>

          <div className="mt-10 flex gap-5 text-sm">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="text-ink/60 underline underline-offset-4 hover:text-ink"
              >
                {social.label}
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </main>
  );
}
