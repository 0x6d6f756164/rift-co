import RouteTransition from "@/components/RouteTransition";
import type { ReactNode } from "react";

export default function Template({ children }: { children: ReactNode }) {
  return (
    <>
      <RouteTransition />
      {children}
    </>
  );
}
