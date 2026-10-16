import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/lib/types";
import { getCategoryTitle, getCoverImage } from "@/lib/projects";
import { PosterPlaceholder } from "@/components/ui/poster-placeholder";
import { Tag } from "@/components/ui/tag";

/**
 * Poster-style card. The image zooms and the summary panel slides up on hover
 * or keyboard focus (lg and up). Below lg, the same information is always
 * visible, so nothing depends on hover.
 */
export function ProjectCard({ project, sizes }: { project: Project; sizes?: string }) {
  const cover = getCoverImage(project);
  const category = getCategoryTitle(project);

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group/card block h-full rounded-[var(--radius-card)] bg-surface outline-offset-4 ring-1 ring-ink/5 transition-[transform,box-shadow] duration-500 ease-[var(--ease-cinema)] hover:-translate-y-1 hover:shadow-[0_24px_48px_-20px_rgb(0_0_0/0.9)] hover:ring-ink/15 focus-visible:-translate-y-1 motion-reduce:hover:translate-y-0"
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-t-[var(--radius-card)] bg-surface-2">
        {cover ? (
          <Image
            src={cover.src}
            alt=""
            fill
            sizes={sizes ?? "(min-width: 1024px) 24vw, (min-width: 640px) 45vw, 80vw"}
            className="object-cover object-top transition-transform duration-700 ease-[var(--ease-cinema)] group-hover/card:scale-[1.06] group-focus-visible/card:scale-[1.06] motion-reduce:transform-none"
          />
        ) : (
          <PosterPlaceholder title={project.title} />
        )}
        <div aria-hidden className="absolute inset-0 bg-linear-to-t from-black/85 via-black/10 to-transparent" />
        <span className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
          <Tag tone="accent">{category}</Tag>
        </span>
        <h3 className="display absolute right-3 bottom-2.5 left-3 text-2xl text-ink drop-shadow-[0_2px_8px_rgb(0_0_0/0.8)] sm:text-[1.7rem]">
          {project.title}
        </h3>

        {/* Hover / focus information panel (desktop) */}
        <div className="pointer-events-none absolute inset-0 hidden flex-col justify-end bg-black/80 p-4 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100 group-focus-visible/card:opacity-100 lg:flex">
          <p className="display text-2xl">{project.title}</p>
          <p className="mt-2 line-clamp-3 text-sm text-ink/85">{project.tagline}</p>
          <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-ink">
            View case study <ArrowRight aria-hidden className="size-4" />
          </span>
        </div>
      </div>

      <div className="space-y-2.5 p-3.5">
        <p className="flex flex-wrap items-center gap-x-2 text-xs text-muted">
          <span className={`font-semibold ${project.live ? "text-success" : "text-ink/80"}`}>{project.status.split(" — ")[0]}</span>
          <span aria-hidden>•</span>
          <span>{project.kind}</span>
          <span aria-hidden>•</span>
          <span>{project.date}</span>
        </p>
        <p className="line-clamp-2 text-sm text-ink/85 lg:hidden">{project.tagline}</p>
        <ul className="flex flex-wrap gap-1.5" aria-label="Technologies">
          {project.stack.slice(0, 3).map((tech) => (
            <li key={tech}>
              <Tag tone="outline">{tech}</Tag>
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
}
