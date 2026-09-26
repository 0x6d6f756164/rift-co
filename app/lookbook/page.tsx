import type { Metadata } from "next";
import Lookbook from "@/components/Lookbook";

export const metadata: Metadata = {
  title: "Lookbook — Rift Co.",
};

export default function LookbookPage() {
  return (
    <main>
      <Lookbook />
    </main>
  );
}
