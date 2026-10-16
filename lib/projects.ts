import { categories, projects } from "@/data/projects";
import type { Category, Project } from "@/lib/types";

export function getAllProjects(): Project[] {
  return projects;
}

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getFeaturedProject(): Project {
  const featured = projects.find((project) => project.categories.includes("featured"));
  if (!featured) throw new Error("At least one project must be in the 'featured' category.");
  return featured;
}

/** Categories that contain at least one project, in display order. Empty rows are never returned. */
export function getCategoryRows(): { category: Category; projects: Project[] }[] {
  return categories
    .map((category) => ({
      category,
      projects: projects.filter((project) => project.categories.includes(category.id)),
    }))
    .filter((row) => row.projects.length > 0);
}

export function getCategoryTitle(project: Project): string {
  const primary = project.categories.find((id) => id !== "featured") ?? project.categories[0];
  return categories.find((category) => category.id === primary)?.title.replace(" Projects", "") ?? "";
}

/** Projects sharing a category first, then the rest; never includes the current project. */
export function getRelatedProjects(slug: string, limit = 3): Project[] {
  const current = getProject(slug);
  if (!current) return [];
  const others = projects.filter((project) => project.slug !== slug);
  const score = (project: Project) =>
    project.categories.filter((id) => id !== "featured" && current.categories.includes(id)).length;
  return [...others].sort((a, b) => score(b) - score(a)).slice(0, limit);
}

export function getCoverImage(project: Project) {
  if (project.cover) return project.cover;
  return project.screenshots.find((shot) => shot.device === "desktop") ?? project.screenshots[0];
}
