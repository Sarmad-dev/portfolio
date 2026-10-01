/**
 * All site content lives here. Edit this file to update the portfolio.
 * Anything marked `// TODO: replace` is placeholder copy.
 */

export type Project = {
  title: string;
  kicker: string;
  description: string;
  highlights?: string[];
  tags: string[];
  href?: string;
  featured?: boolean;
  placeholder?: boolean;
};

export type Experience = {
  role: string;
  company: string;
  period: string;
  description: string;
};

export type SkillGroup = {
  title: string;
  icon: "core" | "web" | "mobile" | "systems";
  items: string[];
};

export const profile = {
  name: "Muhammad Sarmad",
  firstName: "Muhammad",
  lastName: "Sarmad",
  initials: "MS",
  role: "Full-stack & systems engineer", // TODO: replace
  tagline:
    "I build fast, engine-first software — from Rust cores compiled to WebAssembly to the polished interfaces people actually touch.", // TODO: replace
  location: "Remote", // TODO: replace
  availability: "Open to new projects", // TODO: replace
};

export const links = {
  github: "https://github.com/Sarmad-dev",
  email: "", // TODO: replace — e.g. "you@example.com" (contact button hides while empty)
  linkedin: "", // TODO: replace — e.g. "https://www.linkedin.com/in/your-handle"
  resume: "", // TODO: replace — e.g. "/resume.pdf" (drop the file into /public)
};

export const about = {
  // TODO: replace — write this in your own voice.
  statement:
    "I care about the layer underneath the interface: data models, layout engines, and the invisible machinery that makes software feel instant. Then I sweat the pixels on top.",
  // TODO: replace
  paragraphs: [
    "My recent work centres on a cross-platform office SDK: a UI-independent Rust core with bindings for the web, Node, and mobile, and TypeScript SDKs for React, React Native and Electron.",
    "I enjoy problems where performance and correctness both matter — incremental computation, virtualised rendering, undo/redo that never lies — and shipping them behind APIs that are pleasant to use.",
  ],
  // TODO: replace
  stats: [
    { value: "3", label: "document formats, one engine" },
    { value: "6", label: "platform targets" },
    { value: "∞", label: "undo steps that behave" },
  ],
};

// TODO: replace — adjust to your real stack
export const skills: SkillGroup[] = [
  {
    title: "Systems",
    icon: "systems",
    items: ["Rust", "WebAssembly", "N-API", "Incremental computation", "Layout engines"],
  },
  {
    title: "Frontend",
    icon: "web",
    items: ["TypeScript", "React", "Next.js", "GSAP", "Three.js / R3F"],
  },
  {
    title: "Cross-platform",
    icon: "mobile",
    items: ["React Native", "Expo", "Electron", "Native bindings"],
  },
  {
    title: "Backend & tooling",
    icon: "core",
    items: ["Node.js", "PostgreSQL", "CI/CD", "Testing", "Docker"],
  },
];

export const marquee = [
  "Rust",
  "WebAssembly",
  "TypeScript",
  "React",
  "React Native",
  "Electron",
  "Node.js",
  "Next.js",
  "GSAP",
  "Three.js",
];

export const projects: Project[] = [
  {
    title: "Cross-Platform Office SDK",
    kicker: "Featured · Engine-first SDK",
    featured: true,
    href: "https://github.com/Sarmad-dev", // TODO: replace with the repo / product URL
    description:
      "An engine-first SDK for Word, Excel and PowerPoint documents. A UI-independent Rust core owns canonical document models and DOCX/XLSX/PPTX import/export, then ships everywhere through WebAssembly, Node (N-API) and mobile bindings, with TypeScript SDKs for React, React Native/Expo and Electron.",
    highlights: [
      "Incremental Word layout & pagination",
      "Virtualised spreadsheet rendering + calculation engine",
      "PowerPoint scene graph",
      "Command/transaction history",
      "Search & navigation engine: regex, replace, and replace-all as one undo step",
      "Incremental, cache-aware search index",
    ],
    tags: ["Rust", "WebAssembly", "TypeScript", "React", "React Native", "Electron"],
  },
  {
    title: "Project Two", // TODO: replace
    kicker: "Web app", // TODO: replace
    placeholder: true,
    description:
      "Placeholder — a short, outcome-focused description of what you built, for whom, and why it mattered.", // TODO: replace
    tags: ["Next.js", "PostgreSQL", "Tailwind"], // TODO: replace
  },
  {
    title: "Project Three", // TODO: replace
    kicker: "Mobile", // TODO: replace
    placeholder: true,
    description:
      "Placeholder — describe the problem, your role, and one concrete result (a metric, a launch, a user win).", // TODO: replace
    tags: ["React Native", "Expo", "TypeScript"], // TODO: replace
  },
  {
    title: "Project Four", // TODO: replace
    kicker: "Open source", // TODO: replace
    placeholder: true,
    description:
      "Placeholder — a library, tool or experiment you're proud of. Link the repo so people can dig in.", // TODO: replace
    tags: ["Rust", "CLI"], // TODO: replace
  },
];

// TODO: replace — all entries below are placeholders
export const experience: Experience[] = [
  {
    role: "Lead Engineer",
    company: "Cross-Platform Office SDK",
    period: "20XX — Present",
    description:
      "Placeholder — architecture of the Rust core, WebAssembly/N-API bindings and TypeScript SDKs.",
  },
  {
    role: "Full-stack Engineer",
    company: "Company Name",
    period: "20XX — 20XX",
    description: "Placeholder — what you owned, what you shipped, what improved.",
  },
  {
    role: "Software Engineer",
    company: "Company Name",
    period: "20XX — 20XX",
    description: "Placeholder — key responsibilities and a measurable achievement.",
  },
  {
    role: "Education / Early career",
    company: "Institution",
    period: "20XX — 20XX",
    description: "Placeholder — degree, bootcamp, or the moment you got hooked on building.",
  },
];

export const nav = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];
