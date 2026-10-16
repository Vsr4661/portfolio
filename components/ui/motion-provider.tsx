"use client";

import { LazyMotion, MotionConfig, MotionGlobalConfig, domAnimation } from "motion/react";

// Visitors who prefer reduced motion get every entrance in its final state
// immediately. Set at module load so it applies before the first animation.
if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  MotionGlobalConfig.skipAnimations = true;
}

/**
 * Loads only the DOM animation feature set and makes every motion
 * component respect the visitor's reduced-motion preference.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
