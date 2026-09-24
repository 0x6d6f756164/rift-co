import Link from "next/link";
import { business, footerNav, socials } from "@/content/site";

export default function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="container-edge grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-4">
          <p className="font-display text-2xl">{business.name.toUpperCase()}</p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper/60">
            {business.description}
          </p>
          <div className="mt-6 flex gap-5">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-paper/60 underline underline-offset-4 hover:text-paper"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-8">
          {footerNav.map((col) => (
            <div key={col.heading}>
              <p className="mb-4 text-sm text-paper/50">{col.heading}</p>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-paper/75 hover:text-paper">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="container-edge flex flex-col gap-2 border-t border-paper/10 py-6 text-xs text-paper/45 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} {business.name}.</p>
        <p>Prototype build — not a live store.</p>
      </div>
    </footer>
  );
}
