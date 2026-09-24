import type { Metadata } from "next";
import Lookbook from "@/components/Lookbook";

export const metadata: Metadata = {
  title: "Lookbook — Stray Co.",
};

export default function LookbookPage() {
  return (
    <main>
      <Lookbook />
    </main>
  );
}
