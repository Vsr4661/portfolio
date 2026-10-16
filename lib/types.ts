export type CategoryId = "featured" | "frontend" | "full-stack" | "mobile" | "learning";

export interface Category {
  id: CategoryId;
  title: string;
  description: string;
}

export interface Screenshot {
  src: string;
  alt: string;
  width: number;
  height: number;
  device: "desktop" | "mobile";
  caption: string;
}

export interface ExternalLink {
  label: string;
  href: string;
}

export interface Feature {
  title: string;
  detail: string;
}

export interface Challenge {
  problem: string;
  solution: string;
}

export interface Project {
  slug: string;
  title: string;
  /** One line shown on cards. */
  tagline: string;
  /** Two or three sentences shown in the hero and featured block. */
  summary: string;
  kind: "Web app" | "Full-stack web app" | "Full-stack mobile app" | "Mobile app" | "Static website";
  date: string;
  categories: CategoryId[];
  stack: string[];
  /** Plain-language availability, e.g. "Live on Vercel". */
  status: string;
  live?: string;
  repo?: string;
  /** Explains why a live or repo link is absent. */
  linkNotes: string[];
  /** Optional poster used for cards and heroes, e.g. several real screens composed together. Not shown in the gallery. */
  cover?: Screenshot;
  screenshots: Screenshot[];
  purpose: string;
  goals: string[];
  features: Feature[];
  architecture: {
    summary: string;
    flow: string[];
  };
  /** Only decisions and fixes visible in the code or commit history. */
  challenges: Challenge[];
  /** What the code demonstrates. Personal lessons are left to the owner. */
  demonstrates: string[];
  lessons?: string[];
  improvements: string[];
  /** Where each claim on the page was verified. */
  sources: ExternalLink[];
  /** Information the owner still needs to supply. */
  missing: string[];
}

export type SkillSource = "crio" | "project" | "resume" | "learning";

export interface Skill {
  name: string;
  sources: SkillSource[];
}

export interface SkillGroup {
  id: string;
  title: string;
  skills: Skill[];
}

export interface Experience {
  organisation: string;
  role: string;
  period: string;
  location: string;
  points: string[];
}
