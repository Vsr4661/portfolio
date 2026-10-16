import Image from "next/image";
import type { Project } from "@/lib/types";
import { PosterPlaceholder } from "@/components/ui/poster-placeholder";
import { Reveal } from "@/components/ui/reveal";

export function ScreensGallery({ project }: { project: Project }) {
  const desktop = project.screenshots.filter((shot) => shot.device === "desktop");
  const mobile = project.screenshots.filter((shot) => shot.device === "mobile");

  if (project.screenshots.length === 0) {
    return (
      <div className="grid gap-6 rounded-lg border border-dashed border-line p-6 sm:grid-cols-[12rem_1fr] sm:items-center">
        <div className="relative aspect-[3/4] overflow-hidden rounded-md">
          <PosterPlaceholder title={project.title} note="Not yet published" />
        </div>
        <div>
          <p className="font-semibold">Screenshots have not been published yet.</p>
          <p className="mt-2 text-sm text-muted">
            This project runs locally, and no public demo exists. Images from a simulator or device will appear here once
            they are added. Until then, the source code is the best way to review it.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {desktop.length > 0 && (
        <ul className="grid gap-4 sm:grid-cols-2">
          {desktop.map((shot, index) => (
            <Reveal as="li" key={shot.src} delay={(index % 2) * 0.06} className={index === 0 ? "sm:col-span-2" : undefined}>
              <figure>
                <a
                  href={shot.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/shot block overflow-hidden rounded-md ring-1 ring-ink/10 transition-shadow hover:ring-ink/30"
                >
                  <span className="sr-only">Open full-size screenshot: {shot.caption} (opens in a new tab)</span>
                  <div className="relative" style={{ aspectRatio: `${shot.width} / ${shot.height}` }}>
                    <Image
                      src={shot.src}
                      alt={shot.alt}
                      fill
                      sizes={index === 0 ? "(min-width: 1408px) 1280px, 100vw" : "(min-width: 640px) 50vw, 100vw"}
                      className="object-cover object-top transition-transform duration-700 ease-[var(--ease-cinema)] group-hover/shot:scale-[1.02] motion-reduce:transform-none"
                    />
                  </div>
                </a>
                <figcaption className="mt-2 text-sm text-muted">{shot.caption}</figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      )}

      {mobile.length > 0 && (
        <div>
          <h3 className="eyebrow mb-3">{desktop.length > 0 ? "Responsive preview" : "App screens"}</h3>
          <ul className="flex flex-wrap gap-6">
            {mobile.map((shot) => (
              <Reveal as="li" key={shot.src} className="w-44 sm:w-52">
                <figure>
                  <div className="relative overflow-hidden rounded-[1.6rem] border-[6px] border-surface-2 shadow-[0_24px_48px_-20px_rgb(0_0_0/0.9)]" style={{ aspectRatio: `${shot.width} / ${shot.height}` }}>
                    <Image src={shot.src} alt={shot.alt} fill sizes="208px" className="object-cover object-top" />
                  </div>
                  <figcaption className="mt-2 text-sm text-muted">{shot.caption}</figcaption>
                </figure>
              </Reveal>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
