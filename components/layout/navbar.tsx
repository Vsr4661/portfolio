"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { Download, Menu, X } from "lucide-react";
import { profile } from "@/data/profile";
import { Wordmark } from "@/components/layout/wordmark";

const links = [
  { href: "/", label: "Home" },
  { href: "/#projects", label: "Projects" },
  { href: "/#skills", label: "Skills" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

/**
 * On the home page, section links scroll directly to their section. The
 * scroll starts after the mobile menu has closed, because unmounting the
 * menu cancels a smooth scroll that is already in progress.
 */
function NavLink({
  href,
  onHome,
  onClick,
  ...props
}: { href: string; onHome: boolean; className: string; onClick?: () => void; children: React.ReactNode }) {
  if (!onHome) return <Link href={href} onClick={onClick} {...props} />;

  const id = href === "/" ? null : href.slice(2);
  const fragment = id ? `#${id}` : "#top";
  return (
    <a
      href={fragment}
      onClick={(event) => {
        event.preventDefault();
        onClick?.();
        const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
        // Wait for the mobile menu's exit animation (250 ms) before scrolling.
        window.setTimeout(
          () => {
            const target = id ? document.getElementById(id) : null;
            if (target) target.scrollIntoView({ behavior, block: "start" });
            else window.scrollTo({ top: 0, behavior });
            history.replaceState(null, "", id ? fragment : "/");
          },
          onClick ? 260 : 0,
        );
      }}
      {...props}
    />
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu after navigating to another route.
  const [menuPath, setMenuPath] = useState(pathname);
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const solid = scrolled || open;
  const onHome = pathname === "/";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500 ease-[var(--ease-cinema)] ${
        solid
          ? "bg-canvas/92 shadow-[0_1px_0_0_rgb(255_255_255/0.06)] backdrop-blur-md"
          : "bg-linear-to-b from-black/80 via-black/40 to-transparent"
      }`}
    >
      <nav aria-label="Primary" className="shell flex h-16 items-center gap-6 lg:h-[4.5rem]">
        <Link href="/" className="shrink-0 rounded-sm">
          <Wordmark />
          <span className="sr-only">, home</span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <NavLink
                href={link.href}
                onHome={onHome}
                className="rounded-sm px-3 py-2 text-sm text-ink/80 transition-colors hover:text-ink"
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-2">
          <a
            href={profile.resume}
            download={profile.resumeFileName}
            className="inline-flex min-h-10 items-center gap-2 rounded-[var(--radius-card)] bg-accent px-3 text-sm font-semibold text-ink transition-colors hover:bg-accent-hover sm:px-4"
          >
            <Download aria-hidden className="size-4" />
            Resume
            <span className="sr-only"> (PDF download)</span>
          </a>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex size-11 items-center justify-center rounded-[var(--radius-card)] text-ink transition-colors hover:bg-ink/10 md:hidden"
          >
            {open ? <X aria-hidden className="size-6" /> : <Menu aria-hidden className="size-6" />}
          </button>
        </div>
      </nav>

      <AnimatePresence initial={false}>
        {open && (
          <m.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-line/60 bg-canvas md:hidden"
          >
            <ul className="shell flex flex-col py-3">
              {links.map((link) => (
                <li key={link.href}>
                  <NavLink
                    href={link.href}
                    onHome={onHome}
                    onClick={() => setOpen(false)}
                    className="flex min-h-12 items-center rounded-sm px-2 text-lg font-medium text-ink/90 hover:bg-ink/5 hover:text-ink"
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
