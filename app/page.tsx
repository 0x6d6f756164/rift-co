import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import WhyUs from "@/components/WhyUs";
import ProductGrid from "@/components/ProductGrid";
import Newsletter from "@/components/Newsletter";
import { getFeaturedProducts } from "@/content/products";

export default function Home() {
  const featured = getFeaturedProducts();

  return (
    <main>
      <Hero />
      <Ticker />
      <section className="border-b border-ink/10 bg-paper">
        <div className="container-edge py-16 md:py-24">
          <ProductGrid
            products={featured}
            heading="Fresh in this week"
            viewAllHref="/shop"
            viewAllLabel="View the full shop"
          />
        </div>
      </section>
      <WhyUs />
      <Newsletter />
    </main>
  );
}
