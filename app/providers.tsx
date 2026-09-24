"use client";

import type { ReactNode } from "react";
import { BagProvider } from "@/context/BagContext";

export default function Providers({ children }: { children: ReactNode }) {
  return <BagProvider>{children}</BagProvider>;
}
