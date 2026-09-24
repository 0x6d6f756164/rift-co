export interface LookbookShot {
  id: string;
  image: string;
  caption: string;
  span: "wide" | "narrow";
}

export const lookbookIntro = {
  heading: "Shot on location, not on a set",
  body: "Every lookbook is shot wherever the team happens to be that season — this one's from three days in a coastal freight town.",
};

export const lookbookShots: LookbookShot[] = [
  { id: "l1", image: "/images/lookbook/lookbook-1.svg", caption: "Field Jacket, dockside", span: "wide" },
  { id: "l2", image: "/images/lookbook/lookbook-2.svg", caption: "Ridge Cargo, warehouse district", span: "narrow" },
  { id: "l3", image: "/images/lookbook/lookbook-3.svg", caption: "Trail Beanie, early shift", span: "narrow" },
  { id: "l4", image: "/images/lookbook/lookbook-4.svg", caption: "Utility Vest, freight yard", span: "wide" },
];
