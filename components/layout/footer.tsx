import Link from "next/link";
import { profile } from "@/data/profile";
import { Wordmark } from "@/components/layout/wordmark";

const nav = [
  { href: "/", label: "Home" },
  { href: "/#projects", label: "Projects" },
  { href: "/#skills", label: "Skills" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

const social = [
  { href: profile.github, label: "GitHub" },
  { href: profile.linkedin, label: "LinkedIn" },
  { href: profile.crio, label: "Crio Portfolio" },
];

async function CopyrightYear() {
  "use cache";
  return <>{new Date().getFullYear()}</>;
}

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line/60 bg-black/30">
      <div className="shell grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div className="space-y-4">
          <div aria-hidden>
            <Wordmark />
          </div>
          <p className="max-w-xs text-sm text-muted">
            {profile.name} — {profile.role.toLowerCase()} building web and mobile applications.
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="eyebrow mb-3">Navigate</h2>
          <ul className="space-y-1 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-flex min-h-7 items-center text-muted transition-colors hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="eyebrow mb-3">Profiles</h2>
          <ul className="space-y-1 text-sm">
            {social.map((item) => (
              <li key={item.href}>
                <a href={item.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-7 items-center text-muted transition-colors hover:text-ink">
                  {item.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="eyebrow mb-3">Contact</h2>
          <ul className="space-y-1 text-sm">
            <li>
              <a href={`mailto:${profile.email}`} className="inline-flex min-h-7 items-center break-all text-muted transition-colors hover:text-ink">
                {profile.email}
              </a>
            </li>
            <li>
              <a href={profile.resume} download={profile.resumeFileName} className="inline-flex min-h-7 items-center text-muted transition-colors hover:text-ink">
                Download resume (PDF)
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line/40">
        <p className="shell py-6 text-xs text-subtle">
          © <CopyrightYear /> {profile.name}. An independent portfolio, not affiliated with any streaming service.
        </p>
      </div>
    </footer>
  );
}
