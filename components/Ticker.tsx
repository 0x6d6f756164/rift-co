const items = [
  "Fall drop live now",
  "Free shipping over $120",
  "Restocked: Field Jacket",
  "Made from recycled cotton",
  "30-day wear-it-or-return-it",
];

export default function Ticker() {
  const doubled = [...items, ...items, ...items, ...items];

  return (
    <div className="overflow-hidden border-b border-ink/10 bg-ink py-3">
      <div className="flex w-max animate-marquee gap-10">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-10 whitespace-nowrap text-sm text-paper/80">
            {item}
            <span className="text-blood">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}
