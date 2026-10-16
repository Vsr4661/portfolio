import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/reveal";

export function CaseSection({ id, number, title, children }: { id: string; number: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={`${id}-title`} className="border-t border-line/50 py-10 sm:py-12">
      <Reveal className="grid gap-6 lg:grid-cols-[14rem_1fr] lg:gap-10">
        <h2 id={`${id}-title`} className="flex items-baseline gap-3 lg:flex-col lg:gap-1">
          <span aria-hidden className="display text-2xl text-accent">{number}</span>
          <span className="text-xl font-bold sm:text-2xl">{title}</span>
        </h2>
        <div className="min-w-0">{children}</div>
      </Reveal>
    </section>
  );
}
