import { Suspense } from "react";
import ShopClient from "./ShopClient";

// useSearchParams (inside ShopClient) requires a Suspense boundary in
// the App Router — it's how a category deep-link from the footer
// (/shop?category=Outerwear) gets picked up on first render.
export default function ShopPage() {
  return (
    <Suspense fallback={<main className="container-edge py-16 md:py-24" />}>
      <ShopClient />
    </Suspense>
  );
}
