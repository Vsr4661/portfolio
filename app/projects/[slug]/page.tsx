import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, Code2, ExternalLink, Info } from "lucide-react";
import { getAllProjects, getCoverImage, getProject, getRelatedProjects } from "@/lib/projects";
import { ProjectCard } from "@/components/home/project-card";
import { CaseSection } from "@/components/project/section";
import { ScreensGallery } from "@/components/project/screens-gallery";
import { AnchorButton } from "@/components/ui/button";
import { HeroItem, HeroStagger, HeroVisual } from "@/components/home/hero-motion";
import { PosterPlaceholder } from "@/components/ui/poster-placeholder";
import { Tag } from "@/components/ui/tag";

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  "use cache";
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };

  const cover = getCoverImage(project);
  const title = `${project.title} — Case Study`;
  return {
    title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "article",
      title,
      description: project.summary,
      url: `/projects/${project.slug}`,
      ...(cover ? { images: [{ url: cover.src, width: cover.width, height: cover.height, alt: cover.alt }] } : {}),
    },
    twitter: { card: "summary_large_image", title, description: project.summary },
  };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  "use cache";
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const all = getAllProjects();
  const index = all.findIndex((item) => item.slug === project.slug);
  const previous = all[(index - 1 + all.length) % all.length];
  const next = all[(index + 1) % all.length];
  const related = getRelatedProjects(project.slug);
  const cover = getCoverImage(project);
  const showOwnerNotes = process.env.NODE_ENV === "development" && project.missing.length > 0;

  return (
    <article>
      {/* Header */}
      <header className="relative isolate overflow-hidden pt-24 pb-10 sm:pt-28 lg:pt-32">
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(70%_60%_at_90%_0%,rgb(229_9_20/0.22),transparent_60%)]" />
        <div className="shell">
          <Link
            href="/#projects"
            className="inline-flex min-h-11 items-center gap-2 rounded-sm text-sm font-medium text-muted transition-colors hover:text-ink"
          >
            <ArrowLeft aria-hidden className="size-4" />
            Back to all projects
          </Link>

          <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <HeroStagger>
              <HeroItem>
                <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
                  <span className={`font-semibold ${project.live ? "text-success" : "text-ink"}`}>{project.status}</span>
                  <span aria-hidden>•</span>
                  <span>{project.kind}</span>
                  <span aria-hidden>•</span>
                  <span>{project.date}</span>
                </p>
              </HeroItem>
              <HeroItem>
                <h1 className="display mt-3 text-[clamp(2.75rem,8vw,5.5rem)] uppercase">{project.title}</h1>
              </HeroItem>
              <HeroItem>
                <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink/90">{project.summary}</p>
              </HeroItem>
              <HeroItem>
                <div className="mt-7 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
                  {project.live && (
                    <AnchorButton href={project.live} external variant="primary" size="lg">
                      <ExternalLink aria-hidden className="size-5" />
                      Live Demo
                      <span className="sr-only"> (opens in a new tab)</span>
                    </AnchorButton>
                  )}
                  {project.repo && (
                    <AnchorButton href={project.repo} external variant="secondary" size="lg">
                      <Code2 aria-hidden className="size-5" />
                      View on GitHub
                      <span className="sr-only"> (opens in a new tab)</span>
                    </AnchorButton>
                  )}
                </div>
                {project.linkNotes.length > 0 && (
                  <ul className="mt-5 space-y-2 text-sm text-muted">
                    {project.linkNotes.map((note) => (
                      <li key={note} className="flex gap-2">
                        <Info aria-hidden className="mt-0.5 size-4 shrink-0 text-ink/70" />
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </HeroItem>
            </HeroStagger>

            <HeroVisual>
              <div className="relative aspect-[16/10] overflow-hidden rounded-lg shadow-[0_40px_80px_-30px_rgb(0_0_0/0.9),0_0_0_1px_rgb(255_255_255/0.08)]">
                {cover ? (
                  <Image src={cover.src} alt={cover.alt} fill preload loading="eager" sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover object-top" />
                ) : (
                  <PosterPlaceholder title={project.title} note="Screenshots not yet published" />
                )}
              </div>
            </HeroVisual>
          </div>
        </div>
      </header>

      <div className="shell">
        {showOwnerNotes && (
          <aside className="mb-6 rounded-md border border-amber-400/40 bg-amber-400/10 p-4 text-sm text-amber-100">
            <p className="font-semibold">Owner notes (development only, hidden in production)</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {project.missing.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </aside>
        )}

        <CaseSection id="stack" number="01" title="Technology">
          <ul className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <li key={tech}>
                <Tag>{tech}</Tag>
              </li>
            ))}
          </ul>
        </CaseSection>

        <CaseSection id="purpose" number="02" title="Purpose & goals">
          <p className="max-w-3xl text-base leading-relaxed text-ink/90 sm:text-lg">{project.purpose}</p>
          <ul className="mt-5 grid gap-2 sm:grid-cols-2">
            {project.goals.map((goal) => (
              <li key={goal} className="flex gap-2.5 text-muted">
                <Check aria-hidden className="mt-0.5 size-5 shrink-0 text-accent-ink" />
                <span>{goal}</span>
              </li>
            ))}
          </ul>
        </CaseSection>

        <CaseSection id="features" number="03" title="Implemented features">
          <ul className="grid gap-3 sm:grid-cols-2">
            {project.features.map((feature) => (
              <li key={feature.title} className="rounded-md bg-surface p-4 ring-1 ring-ink/5">
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{feature.detail}</p>
              </li>
            ))}
          </ul>
        </CaseSection>

        <CaseSection id="screens" number="04" title="Screens">
          <ScreensGallery project={project} />
        </CaseSection>

        <CaseSection id="architecture" number="05" title="Architecture & data flow">
          <p className="max-w-3xl leading-relaxed text-ink/90">{project.architecture.summary}</p>
          <ol className="mt-6 space-y-0">
            {project.architecture.flow.map((step, stepIndex) => (
              <li key={step} className="relative flex gap-4 pb-5 last:pb-0">
                {stepIndex < project.architecture.flow.length - 1 && (
                  <span aria-hidden className="absolute top-8 bottom-0 left-[0.9375rem] w-px bg-line" />
                )}
                <span aria-hidden className="flex size-8 shrink-0 items-center justify-center rounded-full bg-surface-2 text-xs font-bold text-ink ring-1 ring-line">
                  {stepIndex + 1}
                </span>
                <code className="pt-1 font-mono text-sm break-words text-ink/90">{step}</code>
              </li>
            ))}
          </ol>
        </CaseSection>

        <CaseSection id="challenges" number="06" title="Challenges & solutions">
          <p className="mb-5 text-sm text-subtle">Taken from the source code and commit history.</p>
          <ul className="space-y-4">
            {project.challenges.map((challenge) => (
              <li key={challenge.problem} className="grid gap-3 rounded-md bg-surface p-4 ring-1 ring-ink/5 md:grid-cols-2 md:gap-6">
                <div>
                  <p className="eyebrow text-accent-ink">Challenge</p>
                  <p className="mt-1.5 text-ink/90">{challenge.problem}</p>
                </div>
                <div>
                  <p className="eyebrow text-success">Solution</p>
                  <p className="mt-1.5 text-ink/90">{challenge.solution}</p>
                </div>
              </li>
            ))}
          </ul>
        </CaseSection>

        <CaseSection id="learnings" number="07" title="Learnings & next steps">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="eyebrow">{project.lessons ? "Lessons learned" : "What this project demonstrates"}</h3>
              <ul className="mt-3 space-y-2">
                {(project.lessons ?? project.demonstrates).map((item) => (
                  <li key={item} className="flex gap-2.5 text-ink/90">
                    <Check aria-hidden className="mt-0.5 size-5 shrink-0 text-success" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="eyebrow">Possible improvements</h3>
              <ul className="mt-3 space-y-2">
                {project.improvements.map((item) => (
                  <li key={item} className="flex gap-2.5 text-ink/90">
                    <ArrowRight aria-hidden className="mt-0.5 size-5 shrink-0 text-muted" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CaseSection>

        <CaseSection id="sources" number="08" title="Links & sources">
          {project.sources.length === 0 ? (
            <p className="text-muted">No public links yet: the source is private and the app isn&apos;t deployed.</p>
          ) : (
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {project.sources.map((source) => (
                <li key={source.href}>
                  <a href={source.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1.5 text-ink underline decoration-line underline-offset-4 hover:decoration-ink">
                    {source.label}
                    <ExternalLink aria-hidden className="size-4" />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </CaseSection>
      </div>

      {/* Related + sequential navigation */}
      <section aria-labelledby="related-title" className="mt-6 border-t border-line/50 bg-black/20 py-12">
        <div className="shell">
          <h2 id="related-title" className="text-xl font-bold sm:text-2xl">More like this</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <li key={item.slug}>
                <ProjectCard project={item} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw" />
              </li>
            ))}
          </ul>

          <nav aria-label="Project navigation" className="mt-10 grid gap-3 sm:grid-cols-2">
            <Link href={`/projects/${previous.slug}`} className="group/nav flex min-h-16 items-center gap-3 rounded-md bg-surface p-4 ring-1 ring-ink/5 transition-colors hover:bg-surface-2">
              <ArrowLeft aria-hidden className="size-5 text-muted transition-transform group-hover/nav:-translate-x-1 motion-reduce:transform-none" />
              <span>
                <span className="block text-xs text-muted">Previous</span>
                <span className="font-semibold">{previous.title}</span>
              </span>
            </Link>
            <Link href={`/projects/${next.slug}`} className="group/nav flex min-h-16 items-center justify-end gap-3 rounded-md bg-surface p-4 text-right ring-1 ring-ink/5 transition-colors hover:bg-surface-2">
              <span>
                <span className="block text-xs text-muted">Next</span>
                <span className="font-semibold">{next.title}</span>
              </span>
              <ArrowRight aria-hidden className="size-5 text-muted transition-transform group-hover/nav:translate-x-1 motion-reduce:transform-none" />
            </Link>
          </nav>
        </div>
      </section>
    </article>
  );
}
