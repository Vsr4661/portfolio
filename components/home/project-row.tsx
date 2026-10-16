"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Horizontally scrolling row with native touch swiping and scroll snapping.
 * Arrow buttons appear only when there is more content in that direction.
 */
export function ProjectRow({ label, children }: { label: string; children: ReactNode }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const update = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setCanPrev(track.scrollLeft > 4);
    setCanNext(track.scrollLeft + track.clientWidth < track.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    update();
    const observer = new ResizeObserver(update);
    observer.observe(track);
    track.addEventListener("scroll", update, { passive: true });
    return () => {
      observer.disconnect();
      track.removeEventListener("scroll", update);
    };
  }, [update]);

  const scroll = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollBy({ left: direction * track.clientWidth * 0.85, behavior: reduce ? "auto" : "smooth" });
  };

  const arrow =
    "absolute top-0 bottom-0 z-10 hidden w-12 items-center justify-center bg-canvas/70 text-ink opacity-0 transition-opacity duration-200 hover:bg-canvas/90 focus-visible:opacity-100 group-hover/row:opacity-100 md:flex";

  return (
    <div className="group/row relative">
      {canPrev && (
        <button type="button" onClick={() => scroll(-1)} aria-label={`Scroll ${label} left`} className={`${arrow} left-0 rounded-r`}>
          <ChevronLeft aria-hidden className="size-8" />
        </button>
      )}
      <ul
        ref={trackRef}
        className="no-scrollbar -my-6 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto overscroll-x-contain px-4 py-6 sm:scroll-px-8 sm:gap-4 sm:px-8 xl:scroll-px-14 xl:px-14"
      >
        {children}
      </ul>
      {canNext && (
        <button type="button" onClick={() => scroll(1)} aria-label={`Scroll ${label} right`} className={`${arrow} right-0 rounded-l`}>
          <ChevronRight aria-hidden className="size-8" />
        </button>
      )}
    </div>
  );
}

export function ProjectRowItem({ children }: { children: ReactNode }) {
  return (
    <li className="w-[80%] shrink-0 snap-start xs:w-[62%] sm:w-[44%] md:w-[36%] lg:w-[28%] xl:w-[23%]">{children}</li>
  );
}
