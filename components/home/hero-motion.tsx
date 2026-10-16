"use client";

import * as m from "motion/react-m";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

/** Staggered entrance for hero text. Short, and runs once. */
export function HeroStagger({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <m.div
      className={className}
      initial="hidden"
      animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }}
    >
      {children}
    </m.div>
  );
}

/**
 * Hero items slide in but stay painted from the first frame, so the largest
 * text block is not delayed until hydration. Pass `fade` to also fade in.
 */
export function HeroItem({ children, className, fade = false }: { children: ReactNode; className?: string; fade?: boolean }) {
  return (
    <m.div
      data-reveal
      className={className}
      variants={{
        hidden: fade ? { opacity: 0, y: 18 } : { y: 18 },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
      }}
    >
      {children}
    </m.div>
  );
}

/** The featured visual: a slow settle from a slight zoom. It is never hidden, so it can paint immediately. */
export function HeroVisual({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <m.div
      data-reveal
      className={className}
      initial={{ scale: 1.04, y: 12 }}
      animate={{ scale: 1, y: 0 }}
      transition={{ duration: 1.1, delay: 0.25, ease }}
    >
      {children}
    </m.div>
  );
}
