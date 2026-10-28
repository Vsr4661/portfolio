import type { Experience, SkillGroup, SkillSource } from "@/lib/types";

/**
 * Profile facts. Sources: Crio portfolio record (vsr4661, fetched 2026-10-16)
 * and the resume PDF shipped in /public/resume.
 */
export const profile = {
  name: "Vaibhav Singh Rathore",
  shortName: "Vaibhav",
  role: "Software Developer",
  positioning: "I build web and mobile applications and enjoy working through technical problems.",
  location: "Gurgaon, India",
  email: "vsr4661@gmail.com",
  github: "https://github.com/Vsr4661",
  linkedin: "https://www.linkedin.com/in/vaibhav-singh-r-09ab28237/",
  crio: "https://www.crio.do/learn/portfolio/vsr4661/",
  resume: "/resume/Vaibhav_Singh_Rathore_Resume.pdf",
  resumeFileName: "Vaibhav_Singh_Rathore_Resume.pdf",
  photo: {
    // Background removed (subject cut out) so it sits on the site's own backdrop.
    src: "/profile/vaibhav-portrait.png",
    alt: "Portrait of Vaibhav Singh Rathore in a white shirt, smiling.",
    width: 587,
    height: 635,
  },
  education: {
    degree: "B.Tech, Computer Science & Engineering",
    institution: "Jain University, Bangalore",
    period: "2021 – 2025",
    status: "Completed 2025",
  },
  about: [
    "I'm a software developer with a B.Tech in Computer Science and Engineering, completed in 2025. I build interfaces with React, React Native and TypeScript, and I like turning a rough idea into something people can click through and use.",
    "My recent projects cover both ends of an app: React and React Native interfaces, and the APIs behind them in Node.js and Django — with databases, real-time updates, tests and CI. I also practise data structures and algorithms in Java.",
  ],
  interests: [
    "Frontend architecture and component design",
    "Cross-platform mobile apps with React Native",
    "Accessible, responsive interfaces",
    "Problem solving with data structures and algorithms",
  ],
  /** Counts taken from the Crio portfolio record on 2026-10-16. */
  stats: [
    { value: "109", label: "DSA problems solved", source: "Crio" },
    { value: "19", label: "Crio-verified skills", source: "Crio" },
    { value: "2025", label: "B.Tech CSE graduate", source: "Resume" },
  ],
  certifications: ["UpGrad — Object Oriented Principles in Java", "UpGrad — Object Oriented Analysis & Design"],
} as const;

/** From the resume PDF. Edit or remove entries here. */
export const experience: Experience[] = [
  {
    organisation: "AppBrew",
    role: "Software Engineer Intern",
    period: "Jun 2026 – Present",
    location: "India",
    points: [
      "Works on a React Native e-commerce platform with TypeScript, Shopify GraphQL, Zustand, GitHub Actions and Fastlane.",
      "Launched The Amyra Store app on iOS and Android and built configurable commerce features such as an estimated-delivery-date widget and colour swatches.",
    ],
  },
  {
    organisation: "Intellect Partners",
    role: "Patent Engineer Trainee",
    period: "Jan 2025 – Aug 2025",
    location: "Delhi, India",
    points: ["Drafted and reviewed patent applications and ran prior-art searches for software systems."],
  },
  {
    organisation: "MXtechlabs",
    role: "Java Developer Intern",
    period: "Jun 2023 – Aug 2023",
    location: "Remote",
    points: ["Built modular backend features in Java following an Agile process."],
  },
];

export const skillSourceLabels: Record<SkillSource, { label: string; description: string }> = {
  crio: { label: "Crio verified", description: "Verified through Crio's project-based assessments" },
  project: { label: "Used in projects", description: "Used in a project shown on this site" },
  resume: { label: "Resume", description: "Listed on the resume" },
  learning: { label: "Learning", description: "Currently learning; not yet used in a published project" },
};

export const skillGroups: SkillGroup[] = [
  {
    id: "languages",
    title: "Languages",
    skills: [
      { name: "JavaScript", sources: ["crio", "project"] },
      { name: "TypeScript", sources: ["project", "resume"] },
      { name: "Java", sources: ["resume"] },
      { name: "Python", sources: ["project"] },
      { name: "HTML", sources: ["crio", "project"] },
      { name: "CSS", sources: ["crio", "project"] },
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    skills: [
      { name: "React.js", sources: ["project", "resume"] },
      { name: "React Native", sources: ["project", "resume"] },
      { name: "Expo & Expo Router", sources: ["project"] },
      { name: "TanStack Query", sources: ["project"] },
      { name: "Zustand", sources: ["project", "resume"] },
      { name: "React Router", sources: ["project"] },
      { name: "Context API", sources: ["project"] },
      { name: "Tailwind CSS", sources: ["project", "resume"] },
      { name: "Framer Motion", sources: ["project"] },
      { name: "MapLibre GL", sources: ["project"] },
      { name: "Bootstrap", sources: ["crio", "project"] },
      { name: "Responsive Design", sources: ["crio", "project"] },
      { name: "CSS Flexbox", sources: ["crio", "project"] },
      { name: "CSS Positioning", sources: ["crio"] },
      { name: "Next.js", sources: ["project"] },
    ],
  },
  {
    id: "backend",
    title: "Backend & APIs",
    skills: [
      { name: "REST APIs", sources: ["crio", "project"] },
      { name: "HTTP", sources: ["crio"] },
      { name: "Django", sources: ["project"] },
      { name: "Django REST Framework", sources: ["project"] },
      { name: "Node.js", sources: ["project"] },
      { name: "Express.js", sources: ["project", "resume"] },
      { name: "Socket.IO", sources: ["project"] },
      { name: "JWT authentication", sources: ["project"] },
      { name: "Zod", sources: ["project"] },
      { name: "GraphQL", sources: ["resume"] },
    ],
  },
  {
    id: "databases",
    title: "Databases",
    skills: [
      { name: "PostgreSQL", sources: ["project"] },
      { name: "Prisma", sources: ["project"] },
      { name: "Redis", sources: ["project"] },
      { name: "MySQL", sources: ["resume"] },
      { name: "SQLite", sources: ["resume"] },
    ],
  },
  {
    id: "tools",
    title: "Developer Tools",
    skills: [
      { name: "Git", sources: ["crio", "resume"] },
      { name: "GitHub", sources: ["resume"] },
      { name: "Linux", sources: ["crio", "resume"] },
      { name: "Browser Developer Tools", sources: ["crio"] },
      { name: "VS Code", sources: ["crio", "resume"] },
      { name: "Vite", sources: ["project"] },
      { name: "Vercel", sources: ["project", "resume"] },
      { name: "Docker & Docker Compose", sources: ["project"] },
      { name: "Render", sources: ["project"] },
      { name: "Netlify & Netlify CLI", sources: ["crio"] },
      { name: "Postman", sources: ["resume"] },
      { name: "GitHub Actions", sources: ["project", "resume"] },
      { name: "Jest", sources: ["project"] },
    ],
  },
  {
    id: "fundamentals",
    title: "DSA & CS Fundamentals",
    skills: [
      { name: "Data Structures & Algorithms (109 problems)", sources: ["crio", "resume"] },
      { name: "Object-Oriented Programming", sources: ["resume"] },
      { name: "HTTP Protocols", sources: ["crio", "resume"] },
    ],
  },
];
