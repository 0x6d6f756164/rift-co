#!/usr/bin/env python3
"""
Generates the placeholder artwork under /public/images.

Every image is a plain, dependency-free SVG — no font files, no network
calls, no binary image libraries — so they render identically everywhere
and never 404. They're deliberately abstract (duotone shapes + a
monogram) rather than fake photography, so it's obvious at a glance
which pieces are placeholders once you start dropping in real product
photography.

Run with: npm run generate:placeholders  (or `python3 scripts/generate-placeholders.py`)
Re-run any time after editing content/products.ts or content/lookbook.ts
to regenerate art for new items.
"""

import math
import os
import random
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "public", "images")

INK = "#0A0A0A"
PAPER = "#F4F2ED"
BONE = "#ECE8DF"
BLOOD = "#E23A24"
STEEL = "#8C8880"


def monogram(name: str) -> str:
    words = [w for w in name.split() if w]
    letters = "".join(w[0] for w in words[:2]).upper()
    return letters or "SC"


def shape_layer(rng: random.Random, width: int, height: int, accent: str, count: int, opacity: float) -> str:
    parts = []
    for _ in range(count):
        kind = rng.choice(["circle", "line", "arc"])
        if kind == "circle":
            r = rng.uniform(min(width, height) * 0.08, min(width, height) * 0.32)
            cx = rng.uniform(-r * 0.3, width + r * 0.3)
            cy = rng.uniform(-r * 0.3, height + r * 0.3)
            parts.append(
                f'<circle cx="{cx:.1f}" cy="{cy:.1f}" r="{r:.1f}" '
                f'fill="none" stroke="{accent}" stroke-width="{rng.uniform(1, 2.5):.1f}" opacity="{opacity}" />'
            )
        elif kind == "line":
            x1, y1 = rng.uniform(0, width), rng.uniform(0, height)
            angle = rng.uniform(0, math.pi)
            length = rng.uniform(height * 0.4, height * 1.1)
            x2 = x1 + math.cos(angle) * length
            y2 = y1 + math.sin(angle) * length
            parts.append(
                f'<line x1="{x1:.1f}" y1="{y1:.1f}" x2="{x2:.1f}" y2="{y2:.1f}" '
                f'stroke="{accent}" stroke-width="{rng.uniform(0.75, 1.5):.1f}" opacity="{opacity}" />'
            )
        else:
            cx = rng.uniform(width * 0.2, width * 0.8)
            cy = rng.uniform(height * 0.2, height * 0.8)
            r = rng.uniform(min(width, height) * 0.25, min(width, height) * 0.5)
            start = rng.uniform(0, 360)
            sweep = rng.uniform(60, 200)
            large = 1 if sweep > 180 else 0
            sx = cx + r * math.cos(math.radians(start))
            sy = cy + r * math.sin(math.radians(start))
            ex = cx + r * math.cos(math.radians(start + sweep))
            ey = cy + r * math.sin(math.radians(start + sweep))
            parts.append(
                f'<path d="M {sx:.1f} {sy:.1f} A {r:.1f} {r:.1f} 0 {large} 1 {ex:.1f} {ey:.1f}" '
                f'fill="none" stroke="{accent}" stroke-width="{rng.uniform(1, 2):.1f}" opacity="{opacity}" />'
            )
    return "\n".join(parts)


def base_svg(seed: str, width: int, height: int, label: str | None = None, sublabel: str | None = None) -> str:
    rng = random.Random(seed)
    bg = INK
    diag_id = f"diag-{abs(hash(seed)) % 100000}"

    layers = []
    layers.append(shape_layer(rng, width, height, BLOOD, rng.randint(3, 5), 0.55))
    layers.append(shape_layer(rng, width, height, BONE, rng.randint(4, 7), 0.18))

    # One dominant, larger blood-colored arc or circle as the focal shape.
    focal_r = min(width, height) * rng.uniform(0.28, 0.4)
    focal_cx = rng.uniform(width * 0.3, width * 0.7)
    focal_cy = rng.uniform(height * 0.25, height * 0.6)
    focal = (
        f'<circle cx="{focal_cx:.1f}" cy="{focal_cy:.1f}" r="{focal_r:.1f}" '
        f'fill="{BLOOD}" opacity="0.14" />'
        f'<circle cx="{focal_cx:.1f}" cy="{focal_cy:.1f}" r="{focal_r:.1f}" '
        f'fill="none" stroke="{BLOOD}" stroke-width="2" opacity="0.7" />'
    )

    text_block = ""
    if label:
        font_size = width * 0.05
        text_block += (
            f'<g transform="translate({width * 0.08:.1f}, {height * 0.86:.1f})">'
            f'<text font-family="Arial, Helvetica, sans-serif" font-weight="900" '
            f'font-size="{font_size:.1f}" fill="{PAPER}" letter-spacing="-1" '
            f'transform="scale(0.9,1.08)">{label}</text>'
            "</g>"
        )
    if sublabel:
        font_size = width * 0.028
        text_block += (
            f'<text x="{width * 0.08:.1f}" y="{height * 0.93:.1f}" '
            f'font-family="Arial, Helvetica, sans-serif" font-size="{font_size:.1f}" '
            f'fill="{STEEL}" letter-spacing="1">{sublabel.upper()}</text>'
        )

    return f'''<svg width="{width}" height="{height}" viewBox="0 0 {width} {height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="{diag_id}" width="14" height="14" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
      <line x1="0" y1="0" x2="0" y2="14" stroke="{PAPER}" stroke-opacity="0.04" stroke-width="6" />
    </pattern>
  </defs>
  <rect width="{width}" height="{height}" fill="{bg}" />
  <rect width="{width}" height="{height}" fill="url(#{diag_id})" />
  {focal}
  {layers[0]}
  {layers[1]}
  {text_block}
</svg>'''


def write(path: str, content: str) -> None:
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w") as f:
        f.write(content)
    print(f"wrote {os.path.relpath(path, ROOT)}")


def main() -> None:
    # Hero portrait — no text, it sits behind real headline copy on the page.
    write(
        os.path.join(OUT, "hero", "hero-portrait.svg"),
        base_svg("hero-portrait", 900, 1200),
    )

    # Products — import here (not top-level) so this script has no
    # hard dependency on the TS build step; it just reads the same data.
    products = [
        ("field-jacket", "Field Jacket", "Outerwear"),
        ("ridge-cargo-pant", "Ridge Cargo Pant", "Bottoms"),
        ("waxed-trucker", "Waxed Trucker", "Outerwear"),
        ("overdyed-tee", "Overdyed Tee", "Tops"),
        ("utility-vest", "Utility Vest", "Outerwear"),
        ("trail-beanie", "Trail Beanie", "Accessories"),
    ]
    for slug, name, category in products:
        write(
            os.path.join(OUT, "products", f"{slug}.svg"),
            base_svg(slug, 700, 875, label=monogram(name), sublabel=category),
        )

    for i in range(1, 5):
        write(
            os.path.join(OUT, "lookbook", f"lookbook-{i}.svg"),
            base_svg(f"lookbook-{i}", 1200, 1500),
        )


if __name__ == "__main__":
    main()
