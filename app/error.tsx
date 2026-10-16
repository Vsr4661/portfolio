"use client";

import { LinkButton, buttonClass } from "@/components/ui/button";

export default function Error({ retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return (
    <section className="shell flex min-h-[70svh] flex-col items-start justify-center pt-24">
      <p className="eyebrow">Something went wrong</p>
      <h1 className="display mt-3 text-5xl uppercase sm:text-6xl">Playback interrupted</h1>
      <p className="mt-4 max-w-md text-muted">This section failed to load. Try again, or go back to the home page.</p>
      <div className="mt-8 flex flex-col gap-3 xs:flex-row">
        <button type="button" onClick={() => retry()} className={buttonClass("primary", "lg")}>
          Try again
        </button>
        <LinkButton href="/" variant="secondary" size="lg">
          Back to home
        </LinkButton>
      </div>
    </section>
  );
}
