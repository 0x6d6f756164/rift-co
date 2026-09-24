// Icon names reference lucide-react components — see the mapping in
// components/WhyUs.tsx.

export interface ValueProp {
  icon: "ShieldCheck" | "Recycle" | "Truck" | "RotateCcw";
  title: string;
  body: string;
}

export const valueProps: ValueProp[] = [
  {
    icon: "ShieldCheck",
    title: "Reinforced by design",
    body: "Double-stitched seams and bar-tacked stress points, so the pieces you wear hardest last longest.",
  },
  {
    icon: "Recycle",
    title: "Low-impact materials",
    body: "Recycled cotton blends and plant-based dyes, sourced from mills we've actually visited.",
  },
  {
    icon: "Truck",
    title: "Shipped in two days",
    body: "Domestic orders leave the warehouse within 48 hours. Tracking lands in your inbox the same day.",
  },
  {
    icon: "RotateCcw",
    title: "Wear it before you keep it",
    body: "30 days to live in a piece. If it doesn't earn a place in rotation, send it back — worn or not.",
  },
];
