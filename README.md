# Rift Co. — prototype storefront

A virtual clothing store prototype: Next.js 16 (App Router, TypeScript),
Tailwind CSS v4, lucide-react, and framer-motion for the animation layer.

## Setup

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Fixes in this round

- **Footer links that went nowhere sensible.** "Shipping & returns" and
  "Size guide" both pointed at `/contact`, which isn't what either of
  those means. They now go to a real `/support` page
  (`app/support/page.tsx`) with actual content, anchored at
  `#shipping` and `#size-guide`.
- **Shop category filter breaking after one click.** The grid used
  `whileInView` (a scroll-triggered reveal) for content that's already
  on screen when it's re-filtered — no real scrolling happens, so the
  second click had nothing new to trigger it. `RevealGroup` now takes
  an `immediate` prop that swaps `whileInView` for a plain mount-time
  `animate`, and `ShopClient` gives the grid a fresh `key={active}` per
  filter so it's a clean remount every time — deterministic, not
  dependent on viewport/IntersectionObserver state. See the comment in
  `components/Reveal.tsx` and `app/shop/ShopClient.tsx`.
- **Footer category links not applying the filter.** They pointed at
  `/shop?category=X`, but the shop page never read the query string.
  `ShopClient` now reads `?category=` via `useSearchParams` (wrapped in
  `<Suspense>` in `app/shop/page.tsx`, which the App Router requires)
  to set the initial filter — the URL is only read once, on mount;
  clicking filters afterward stays instant client state.
- **Transition speed.** The route wipe and scroll reveals were tuned
  down and centralized into `motionConfig` in `content/site.ts` — one
  place to retime everything instead of hunting through components.
- **Tab icon.** `app/icon.svg` — Next's file-based icon convention, no
  extra code needed. A red crack/rift mark on black; swap the file for
  a different mark whenever you want.
- **Renamed Stray Co. → Rift Co.** everywhere (copy, contact info,
  socials, page titles, package name).

## Structure

```
app/
  layout.tsx          — fonts, metadata, persistent navbar/footer/bag drawer
  template.tsx          — mounts RouteTransition on every navigation
  providers.tsx          — wraps the app in BagProvider
  globals.css            — Tailwind v4 theme + base styles
  icon.svg                — tab icon
  page.tsx                — home
  shop/page.tsx            — Suspense wrapper (required for useSearchParams)
  shop/ShopClient.tsx       — actual shop UI: category filter + grid
  shop/[slug]/page.tsx      — product detail (async params, per Next 16)
  lookbook/page.tsx
  about/page.tsx
  contact/page.tsx           — contact info + message form
  support/page.tsx            — shipping & returns, size guide
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
- **Shop filtering is client-side state**, not a URL push per click —
  so filtering is instant and doesn't trigger the route transition
  (reserved for actual page-to-page navigation). The URL is only read
  once on load, to support deep links like the footer's category links.

## Animation

All animation runs through `framer-motion`, with shared timing in
`content/site.ts` → `motionConfig`:

- `Hero.tsx` — the headline splits into two lines that slide up into
  place on load (clipped by an `overflow-hidden` wrapper so the motion
  reads as a reveal, not a jump), and the hero image gets a subtle
  scroll-linked parallax via `useScroll` / `useTransform`.
- `RouteTransition.tsx` — the full-screen wipe described above.
- `Reveal.tsx` — a small reusable set (`Reveal`, `RevealGroup`,
  `RevealItem`) built on `whileInView`, used to fade+lift section
  headings and grid items into place as you scroll. Grids use
  `RevealGroup`/`RevealItem` together so children stagger in rather
  than all animating at once. `RevealGroup` also takes an `immediate`
  flag for content that's already on screen when it mounts (see the
  Shop fix above) rather than content the user scrolls to.
- `ShopClient` — the active category filter is a `layoutId`-based pill
  that physically slides between buttons instead of just swapping
  background color.
- Product cards use a plain CSS scale-on-hover (no framer-motion
  needed for something that simple) plus a quick-add button that
  swaps to a checkmark for a second after adding.

## Content files (`content/`)

This is the part meant to make re-skinning the store fast — you
shouldn't need to touch component code for everyday changes:

- **`content/site.ts`** — business name, tagline, description, contact
  info, social links, primary nav, footer columns, a `palette` mirror,
  and `motionConfig` (animation timing). The palette here is a mirror
  for JS/TS contexts (favicons, canvas, etc) — the source of truth
  Tailwind actually reads is the `@theme` block in `app/globals.css`.
  Change both if you change the brand colors.
- **`content/products.ts`** — the catalog *and* inventory: every
  product's name, price, description, image path, and per-size stock
  count (`{ S: 4, M: 9, ... }`). Sizes with `0` show as sold out and
  disable in the size picker; omit a size entirely if you don't make
  that cut. `featured: true` puts a product in the homepage grid.
- **`content/lookbook.ts`** — the lookbook gallery images and captions.
- **`content/testimonials.ts`** — customer quotes.
- **`content/why-us.ts`** — the four value-prop cards, referencing
  lucide icon names as strings (mapped to components in `WhyUs.tsx`).

## Notes / things I'd flag

- **No checkout.** The bag is fully interactive (add, remove, adjust
  quantity, live subtotal) but the checkout button is intentionally
  disabled — wiring up real payments is a much bigger scope decision.
- **No ESLint config.** Left out to keep the dependency list smaller
  for a prototype; happy to add `eslint-config-next` back if wanted.
- **lucide-react dropped brand/logo icons** (Instagram, TikTok, etc.)
  a while back, so social links in the footer/contact page are plain
  text rather than icon buttons.
- **Support page content is placeholder copy** (shipping timelines,
  size chart numbers) — swap in your real policy text and measurements
  whenever you have them.
