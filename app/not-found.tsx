import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container-edge flex min-h-[60vh] flex-col items-start justify-center py-24">
      <p className="text-sm text-ink/50">404</p>
      <h1 className="mt-2 font-display text-5xl leading-none md:text-6xl">
        This one wandered off
      </h1>
      <p className="mt-5 max-w-sm text-sm text-ink/60">
        The page you&apos;re looking for isn&apos;t here. It might have moved, or never existed.
      </p>
      <Link
        href="/"
        className="mt-8 bg-ink px-6 py-3 text-sm text-paper transition-colors hover:bg-blood"
      >
        Back to home
      </Link>
    </main>
  );
}
