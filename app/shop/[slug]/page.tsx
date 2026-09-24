import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductBySlug, products, totalStock } from "@/content/products";
import SizePicker from "@/components/SizePicker";
import Reveal from "@/components/Reveal";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} — Stray Co.`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const stock = totalStock(product);

  return (
    <main className="container-edge py-12 md:py-16">
      <Link href="/shop" className="mb-8 inline-block text-sm text-ink/60 hover:text-ink">
        ← Back to shop
      </Link>

      <div className="grid gap-10 md:grid-cols-2 md:gap-16">
        <Reveal>
          <div className="relative aspect-[4/5] overflow-hidden bg-bone">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-cover"
              priority
            />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-sm text-ink/50">{product.category}</p>
          <h1 className="mt-1 font-display text-4xl leading-none md:text-5xl">{product.name}</h1>
          <p className="mt-4 text-xl">${product.price}</p>

          <p className="mt-6 text-sm leading-relaxed text-ink/70">{product.description}</p>

          <ul className="mt-6 space-y-1.5 border-y border-ink/10 py-5 text-sm text-ink/60">
            {product.details.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>

          <div className="mt-8">
            <SizePicker product={product} />
          </div>

          {stock > 0 && stock <= 10 && (
            <p className="mt-4 text-xs text-ink/45">{stock} total units left across all sizes.</p>
          )}
        </Reveal>
      </div>
    </main>
  );
}
