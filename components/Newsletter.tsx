"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }

  return (
    <section className="border-b border-ink/10 bg-blood text-paper">
      <div className="container-edge grid gap-8 py-16 md:grid-cols-2 md:items-center md:py-24">
        <h2 className="font-display text-4xl leading-[0.95] md:text-5xl">
          Get first access to restocks and small-batch drops
        </h2>

        {submitted ? (
          <p className="text-base">
            You&apos;re on the list — watch for an email before the next drop goes public.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="w-full border border-paper/40 bg-transparent px-4 py-3 text-sm text-paper placeholder:text-paper/50 focus:border-paper focus:outline-none"
            />
            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-paper px-6 py-3 text-sm text-blood transition-colors hover:bg-ink hover:text-paper"
            >
              Join the list
              <ArrowRight size={16} strokeWidth={2} />
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
