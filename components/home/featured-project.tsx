import Image from "next/image";
import { Code2, ExternalLink, Info } from "lucide-react";
import { getCoverImage, getFeaturedProject } from "@/lib/projects";
import { AnchorButton, LinkButton } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Tag } from "@/components/ui/tag";

export function FeaturedProject() {
  const project = getFeaturedProject();
  const main = getCoverImage(project);
  const desktopShots = project.screenshots.filter((shot) => shot.device === "desktop" && shot.src !== main?.src);
  const mobileShots = project.screenshots.filter((shot) => shot.device === "mobile");
  // A phone overlay only adds information when the main image is a desktop screen.
  // A composed cover is built from the first three screens, so the strip starts after them.
  const stripStart = project.cover ? 3 : 0;
  const overlay = !project.cover && main?.device === "desktop" ? mobileShots[0] : undefined;

  return (
    <section id="featured" aria-labelledby="featured-title" className="shell scroll-mt-4 py-14 lg:py-20">
      <Reveal>
        <p className="eyebrow flex items-center gap-2">
          <span aria-hidden className="inline-block h-3.5 w-1 rounded-sm bg-accent" />
          Featured project
        </p>
      </Reveal>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
        <Reveal className="relative">
          {main && (
            <figure className="overflow-hidden rounded-lg ring-1 ring-ink/10">
              <div className="relative aspect-[16/10]">
                <Image src={main.src} alt={main.alt} fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover object-top" />
              </div>
              <figcaption className="sr-only">{main.caption}</figcaption>
            </figure>
          )}
          {overlay && (
            <figure className="absolute -right-2 -bottom-6 hidden w-[22%] overflow-hidden rounded-xl shadow-[0_24px_48px_-12px_rgb(0_0_0/0.9)] ring-4 ring-canvas sm:block lg:-right-6">
              <div className="relative aspect-[390/844]">
                <Image src={overlay.src} alt={overlay.alt} fill sizes="15vw" className="object-cover object-top" />
              </div>
              <figcaption className="sr-only">{overlay.caption}</figcaption>
            </figure>
          )}
        </Reveal>

        <Reveal delay={0.1} className="flex flex-col justify-center">
          <h2 id="featured-title" className="display text-5xl uppercase sm:text-6xl">
            {project.title}
          </h2>
          <p className="mt-3 flex flex-wrap items-center gap-x-2 text-sm text-muted">
            <span className={`font-semibold ${project.live ? "text-success" : "text-ink"}`}>{project.status}</span>
            <span aria-hidden>•</span>
            <span>{project.kind}</span>
            <span aria-hidden>•</span>
            <span>{project.date}</span>
          </p>
          <p className="mt-5 text-base leading-relaxed text-ink/90 sm:text-lg">{project.summary}</p>

          <h3 className="eyebrow mt-6">Built with</h3>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <li key={tech}>
                <Tag>{tech}</Tag>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
            <LinkButton href={`/projects/${project.slug}`} variant="primary" size="lg">
              <Info aria-hidden className="size-5" />
              Case Study
            </LinkButton>
            {project.live && (
              <AnchorButton href={project.live} external variant="secondary" size="lg">
                <ExternalLink aria-hidden className="size-5" />
                Live Demo
                <span className="sr-only"> (opens in a new tab)</span>
              </AnchorButton>
            )}
            {project.repo && (
              <AnchorButton href={project.repo} external variant="ghost" size="lg">
                <Code2 aria-hidden className="size-5" />
                GitHub
                <span className="sr-only"> repository (opens in a new tab)</span>
              </AnchorButton>
            )}
          </div>
        </Reveal>
      </div>

      {desktopShots.length > 0 ? (
        <ul className="mt-12 hidden gap-3 sm:grid sm:grid-cols-3" aria-label={`More ${project.title} screens`}>
          {desktopShots.slice(0, 3).map((shot, index) => (
            <Reveal as="li" key={shot.src} delay={index * 0.06}>
              <figure>
                <div className="relative aspect-[16/10] overflow-hidden rounded-md ring-1 ring-ink/10">
                  <Image src={shot.src} alt={shot.alt} fill sizes="30vw" className="object-cover object-top" />
                </div>
                <figcaption className="mt-2 text-xs text-muted">{shot.caption}</figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      ) : (
        mobileShots.length > stripStart && (
          <ul className="mt-12 hidden gap-4 sm:grid sm:grid-cols-4" aria-label={`More ${project.title} screens`}>
            {mobileShots.slice(stripStart, stripStart + 4).map((shot, index) => (
              <Reveal as="li" key={shot.src} delay={index * 0.06}>
                <figure>
                  <div style={{ aspectRatio: `${shot.width} / ${shot.height}` }} className="relative overflow-hidden rounded-[1.4rem] border-[5px] border-surface-2 shadow-[0_24px_48px_-20px_rgb(0_0_0/0.9)]">
                    <Image src={shot.src} alt={shot.alt} fill sizes="20vw" className="object-cover object-top" />
                  </div>
                  <figcaption className="mt-2 text-xs text-muted">{shot.caption}</figcaption>
                </figure>
              </Reveal>
            ))}
          </ul>
        )
      )}
    </section>
  );
}
