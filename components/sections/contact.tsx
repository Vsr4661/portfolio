import { Code2, Download, Link2, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { AnchorButton } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { CopyEmail } from "@/components/sections/copy-email";

export function Contact() {
  const channels = [
    { href: `mailto:${profile.email}`, label: "Email", value: profile.email, icon: Mail, external: false },
    { href: profile.linkedin, label: "LinkedIn", value: "vaibhav-singh-r-09ab28237", icon: Link2, external: true },
    { href: profile.github, label: "GitHub", value: "Vsr4661", icon: Code2, external: true },
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="shell scroll-mt-4 py-14 lg:py-20">
      <Reveal className="relative isolate overflow-hidden rounded-xl bg-surface px-5 py-10 ring-1 ring-ink/5 sm:px-10 sm:py-14 lg:px-14">
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(60%_80%_at_100%_0%,rgb(229_9_20/0.25),transparent_60%)]" />
        <p className="eyebrow">Coming up next</p>
        <h2 id="contact-title" className="display mt-2 max-w-3xl text-4xl uppercase sm:text-6xl">
          Let&apos;s work together
        </h2>
        <p className="mt-4 max-w-2xl text-base text-ink/85 sm:text-lg">
          I&apos;m looking for Software Developer, Frontend Developer, Full-Stack Developer and SDE roles. The quickest way
          to reach me is email.
        </p>

        <div className="mt-8 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
          <AnchorButton href={`mailto:${profile.email}`} variant="accent" size="lg">
            <Mail aria-hidden className="size-5" />
            Email me
          </AnchorButton>
          <CopyEmail email={profile.email} />
          <AnchorButton href={profile.resume} download={profile.resumeFileName} variant="ghost" size="lg">
            <Download aria-hidden className="size-5" />
            Resume (PDF)
          </AnchorButton>
        </div>

        <ul className="mt-10 grid gap-3 border-t border-line/60 pt-8 sm:grid-cols-3">
          {channels.map(({ href, label, value, icon: Icon, external }) => (
            <li key={label}>
              <a
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group/channel flex min-h-14 items-center gap-3 rounded-md p-2 transition-colors hover:bg-ink/5"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-surface-2 ring-1 ring-line">
                  <Icon aria-hidden className="size-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs text-muted">{label}</span>
                  <span className="block truncate font-medium group-hover/channel:underline">{value}</span>
                </span>
                {external && <span className="sr-only">(opens in a new tab)</span>}
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
