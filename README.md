# Stray Co. — prototype storefront

A virtual clothing store prototype: Next.js 16 (App Router, TypeScript),
Tailwind CSS v4, lucide-react, and framer-motion for the animation layer.

## Setup

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Structure

```
app/
  layout.tsx          — fonts, metadata, persistent navbar/footer/bag drawer
  template.tsx          — mounts RouteTransition on every navigation
  providers.tsx          — wraps the app in BagProvider
  globals.css            — Tailwind v4 theme + base styles
  page.tsx                — home
  shop/page.tsx            — full collection, client-side category filter
  shop/[slug]/page.tsx      — product detail (async params, per Next 16)
  lookbook/page.tsx
  about/page.tsx
  contact/page.tsx
  not-found.tsx
components/     — presentational + interactive pieces (see below)
content/        — editable site data (see below)
context/BagContext.tsx — mock cart state (see below)
scripts/generate-placeholders.py
public/images/  — generated placeholder art
```

## The "webapp" feel — routing, transitions, and the bag

Instead of a single scrolling page, this is a real multi-route app, kept
smooth in a few ways:

- **Layout persists, only the page swaps.** The navbar, footer, and bag
  drawer live in `app/layout.tsx`, so they never remount between pages —
  only the route content underneath changes.
- **A branded route transition.** `app/template.tsx` is a Next.js
  convention that gets a fresh instance on every navigation (unlike
  `layout.tsx`, which persists). It mounts `RouteTransition.tsx`, which
  sweeps the same red panel from the homepage hero across the screen on
  every navigation — a deliberate, on-brand motion instead of a generic
  spinner or blank flash.
- **A working (mocked) bag.** `context/BagContext.tsx` is a small React
  context + `useState` — no backend, nothing persisted — that tracks
  items, sizes, and quantities. The navbar's bag icon shows a live
  count; clicking it opens `BagDrawer.tsx`, a framer-motion slide-in
  panel. Product cards have a one-click "quick add" (grabs the first
  in-stock size); the product page has a full size picker
  (`SizePicker.tsx`) that respects per-size stock from
  `content/products.ts` and disables sold-out sizes.
- **Shop filtering is client-side state**, not URL params — so clicking
  a category is instant and doesn't trigger the route transition (which
  is reserved for actual page-to-page navigation).

## Animation

All animation runs through `framer-motion`:

- `Hero.tsx` — the headline splits into two lines that slide up into
  place on load (clipped by an `overflow-hidden` wrapper so the motion
  reads as a reveal, not a jump), and the hero image gets a subtle
  scroll-linked parallax via `useScroll` / `useTransform`.
- `RouteTransition.tsx` — the full-screen wipe described above.
- `Reveal.tsx` — a small reusable set (`Reveal`, `RevealGroup`,
  `RevealItem`) built on `whileInView`, used to fade+lift section
  headings and grid items into place as you scroll. Grids use
  `RevealGroup`/`RevealItem` together so children stagger in rather
  than all animating at once.
- `ShopPage` — the active category filter is a `layoutId`-based pill
  that physically slides between buttons instead of just swapping
  background color.
- Product cards use a plain CSS scale-on-hover (no framer-motion
  needed for something that simple) plus a quick-add button that
  swaps to a checkmark for a second after adding.

If any of this feels like too much motion once you're actually using
it, `Reveal`'s `viewport={{ once: true }}` means everything only
animates in once per page load — nothing re-triggers on scroll-up.

## Content files (`content/`)

This is the part meant to make re-skinning the store fast — you
shouldn't need to touch component code for everyday changes:

- **`content/site.ts`** — business name, tagline, description, contact
  info, social links, primary nav, footer columns, and a `palette`
  object. Note the palette here is a *mirror* for JS/TS contexts
  (favicons, canvas, etc) — the source of truth Tailwind actually reads
  is the `@theme` block in `app/globals.css`. Change both if you change
  the brand colors.
- **`content/products.ts`** — the catalog *and* inventory: every
  product's name, price, description, image path, and per-size stock
  count (`{ S: 4, M: 9, ... }`). Sizes with `0` show as sold out and
  disable in the size picker; omit a size entirely if you don't make
  that cut. `featured: true` puts a product in the homepage grid.
- **`content/lookbook.ts`** — the lookbook gallery images and captions.
- **`content/testimonials.ts`** — customer quotes.
- **`content/why-us.ts`** — the four value-prop cards, referencing
  lucide icon names as strings (mapped to components in `WhyUs.tsx`).
