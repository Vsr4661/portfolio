import { BadgeCheck, FileText, FolderGit2, Sprout } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { skillGroups, skillSourceLabels } from "@/data/profile";
import type { Skill, SkillSource } from "@/lib/types";
import { Reveal } from "@/components/ui/reveal";

const icons: Record<SkillSource, LucideIcon> = {
  crio: BadgeCheck,
  project: FolderGit2,
  resume: FileText,
  learning: Sprout,
};

const iconColour: Record<SkillSource, string> = {
  crio: "text-accent-ink",
  project: "text-success",
  resume: "text-muted",
  learning: "text-amber-300",
};

function SkillChip({ skill }: { skill: Skill }) {
  const learning = skill.sources.includes("learning");
  const label = skill.sources.map((source) => skillSourceLabels[source].label).join(", ");
  return (
    <li
      className={`inline-flex min-h-9 items-center gap-2 rounded-[var(--radius-card)] px-3 py-1.5 text-sm ${
        learning ? "border border-dashed border-amber-300/50 text-ink/80" : "bg-surface-2 text-ink"
      }`}
    >
      <span>{skill.name}</span>
      <span className="flex items-center gap-1">
        {skill.sources.map((source) => {
          const Icon = icons[source];
          return <Icon key={source} aria-hidden className={`size-3.5 ${iconColour[source]}`} />;
        })}
      </span>
      <span className="sr-only">({label})</span>
    </li>
  );
}

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="shell scroll-mt-4 py-14 lg:py-20">
      <Reveal>
        <p className="eyebrow">What I work with</p>
        <h2 id="skills-title" className="display mt-2 text-4xl uppercase sm:text-5xl">
          Skills
        </h2>
        <p className="mt-3 max-w-2xl text-muted">
          Each skill shows where it is backed up. Dashed skills are ones I&apos;m still learning and haven&apos;t used in a
          published project yet.
        </p>

        <ul aria-label="Legend" className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
          {(Object.keys(skillSourceLabels) as SkillSource[]).map((source) => {
            const Icon = icons[source];
            return (
              <li key={source} className="flex items-center gap-1.5" title={skillSourceLabels[source].description}>
                <Icon aria-hidden className={`size-4 ${iconColour[source]}`} />
                {skillSourceLabels[source].label}
              </li>
            );
          })}
        </ul>
      </Reveal>

      <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {skillGroups.map((group, index) => (
          <Reveal key={group.id} delay={(index % 3) * 0.06} className="rounded-lg bg-surface p-5 ring-1 ring-ink/5 sm:p-6">
            <h3 className="text-lg font-bold">{group.title}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <SkillChip key={skill.name} skill={skill} />
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
