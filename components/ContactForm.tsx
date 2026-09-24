"use client";

import { useState, type FormEvent } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="border border-ink/15 bg-bone px-6 py-8 text-sm">
        Thanks — that&apos;s a mock submit for now, but the form itself is fully wired up and
        ready for a real endpoint whenever you add one.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm text-ink/60">
          Name
        </label>
        <input
          id="name"
          required
          type="text"
          className="w-full border border-ink/20 bg-transparent px-4 py-3 text-sm focus:border-ink focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm text-ink/60">
          Email
        </label>
        <input
          id="email"
          required
          type="email"
          className="w-full border border-ink/20 bg-transparent px-4 py-3 text-sm focus:border-ink focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm text-ink/60">
          Message
        </label>
        <textarea
          id="message"
          required
          rows={5}
          className="w-full resize-none border border-ink/20 bg-transparent px-4 py-3 text-sm focus:border-ink focus:outline-none"
        />
      </div>
      <button type="submit" className="bg-ink px-6 py-3 text-sm text-paper transition-colors hover:bg-blood">
        Send message
      </button>
    </form>
  );
}
