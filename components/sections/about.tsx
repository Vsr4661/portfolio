import { Award, Code2, Download, ExternalLink, GraduationCap, Link2 } from "lucide-react";
import { experience, profile } from "@/data/profile";
import { AnchorButton } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="shell scroll-mt-4 py-14 lg:py-20">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <Reveal>
          <p className="eyebrow">Behind the scenes</p>
          <h2 id="about-title" className="display mt-2 text-4xl uppercase sm:text-5xl">
            About
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-ink/90 sm:text-lg">
            {profile.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <h3 className="eyebrow mt-8">Engineering interests</h3>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {profile.interests.map((interest) => (
              <li key={interest} className="flex gap-2.5 text-muted">
                <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                {interest}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
            <AnchorButton href={profile.resume} download={profile.resumeFileName} variant="accent">
              <Download aria-hidden className="size-4" />
              Resume (PDF)
            </AnchorButton>
            <AnchorButton href={profile.github} external variant="secondary">
              <Code2 aria-hidden className="size-4" />
              GitHub
              <span className="sr-only"> (opens in a new tab)</span>
            </AnchorButton>
            <AnchorButton href={profile.linkedin} external variant="secondary">
              <Link2 aria-hidden className="size-4" />
              LinkedIn
              <span className="sr-only"> (opens in a new tab)</span>
            </AnchorButton>
            <AnchorButton href={profile.crio} external variant="ghost">
              <ExternalLink aria-hidden className="size-4" />
              Crio Portfolio
              <span className="sr-only"> (opens in a new tab)</span>
            </AnchorButton>
          </div>
        </Reveal>

        <div className="space-y-4">
          <Reveal delay={0.08} className="rounded-lg bg-surface p-5 ring-1 ring-ink/5 sm:p-6">
            <h3 className="flex items-center gap-2 font-bold">
              <GraduationCap aria-hidden className="size-5 text-accent-ink" />
              Education
            </h3>
            <p className="mt-3 font-semibold">{profile.education.degree}</p>
            <p className="text-sm text-muted">
              {profile.education.institution} · {profile.education.period}
            </p>
            <p className="mt-2 inline-flex rounded-sm bg-success/15 px-2 py-0.5 text-xs font-semibold text-success">
              {profile.education.status}
            </p>
          </Reveal>

          <Reveal delay={0.12} className="rounded-lg bg-surface p-5 ring-1 ring-ink/5 sm:p-6">
            <h3 className="font-bold">Experience</h3>
            <ol className="mt-4 space-y-5">
              {experience.map((item) => (
                <li key={item.organisation} className="relative border-l border-line pl-4">
                  <span aria-hidden className="absolute top-1.5 -left-[0.3rem] size-2.5 rounded-full bg-accent" />
                  <p className="font-semibold">
                    {item.role} <span className="text-muted">· {item.organisation}</span>
                  </p>
                  <p className="text-xs text-subtle">
                    {item.period} · {item.location}
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-muted">
                    {item.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={0.16} className="rounded-lg bg-surface p-5 ring-1 ring-ink/5 sm:p-6">
            <h3 className="flex items-center gap-2 font-bold">
              <Award aria-hidden className="size-5 text-accent-ink" />
              Certifications
            </h3>
            <ul className="mt-3 space-y-1 text-sm text-muted">
              {profile.certifications.map((cert) => (
                <li key={cert}>{cert}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
