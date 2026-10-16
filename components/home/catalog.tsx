import { getCategoryRows } from "@/lib/projects";
import { ProjectCard } from "@/components/home/project-card";
import { ProjectRow, ProjectRowItem } from "@/components/home/project-row";
import { Reveal } from "@/components/ui/reveal";

export function Catalog() {
  const rows = getCategoryRows();

  return (
    <section id="projects" aria-labelledby="projects-title" className="scroll-mt-8 py-10 lg:py-14">
      <div className="shell">
        <Reveal>
          <p className="eyebrow">Browse the catalogue</p>
          <h2 id="projects-title" className="display mt-2 text-4xl uppercase sm:text-5xl">
            Projects
          </h2>
        </Reveal>
      </div>

      {rows.length === 0 ? (
        <p className="shell mt-8 text-muted">No projects are published yet.</p>
      ) : (
        <div className="mt-8 space-y-10 sm:space-y-12">
          {rows.map(({ category, projects }) => (
            <Reveal as="section" key={category.id} className="space-y-3">
              <div className="shell flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="text-lg font-bold sm:text-xl">{category.title}</h3>
                <p className="text-sm text-muted">
                  {category.description} · {projects.length} {projects.length === 1 ? "title" : "titles"}
                </p>
              </div>
              <div className="mx-auto max-w-[88rem]">
                <ProjectRow label={category.title}>
                  {projects.map((project) => (
                    <ProjectRowItem key={project.slug}>
                      <ProjectCard project={project} />
                    </ProjectRowItem>
                  ))}
                </ProjectRow>
              </div>
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}
