// Shared TypeScript interfaces for Ram R. Sharma Portfolio
// Requirement 1.6 — strict TypeScript, zero `any` usages

// ─── Navigation ──────────────────────────────────────────────────────────────

export interface NavLink {
  label: string;
  href: string; // e.g. '#about'
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export interface HeroStats {
  label: string;
  value: string;
}

export interface HeroData {
  name: string;
  tagline: string;
  roles: string[];
  stats: HeroStats[];
  resumeUrl: string;
  githubUrl: string;
  linkedinUrl: string;
}

// ─── Skills ───────────────────────────────────────────────────────────────────

export type SkillCategory =
  | 'Backend Frameworks'
  | 'Databases'
  | 'Cloud & DevOps'
  | 'APIs & Integrations'
  | 'Languages';

export interface Skill {
  name: string;
  icon: string;        // path to SVG or icon component name
  proficiency: number; // 1–100
  category: SkillCategory;
}

// ─── Experience ───────────────────────────────────────────────────────────────

export interface ExperienceEntry {
  company: string;
  role: string;
  period: string;              // e.g. "Jan 2023 – Present"
  location: string;
  responsibilities: string[]; // min 3 items
}

// ─── Projects ─────────────────────────────────────────────────────────────────

export interface Project {
  id: string;
  name: string;
  description: string;    // 2–3 sentences
  features: string[];     // 3–5 items
  techStack: string[];    // used for filter tags
  screenshotUrl: string;
  githubUrl: string | null;
  liveDemoUrl: string | null;
}

// ─── Services ─────────────────────────────────────────────────────────────────

export interface Service {
  id: string;
  title: string;
  icon: string;
  description: string; // 40–80 words
}

// ─── Achievements ─────────────────────────────────────────────────────────────

export interface Achievement {
  id: string;
  title: string;
  icon: string;
  description: string; // 20–50 words
}

// ─── Contact ──────────────────────────────────────────────────────────────────

export interface ContactFormData {
  name: string;    // required, max 100
  email: string;   // required, valid email
  subject: string; // required, max 150
  message: string; // required, min 20, max 2000
}

// ─── SEO ──────────────────────────────────────────────────────────────────────

export interface SEOProps {
  title: string;
  description: string;
  ogImage: string;
  ogUrl: string;
}

// ─── Theme ────────────────────────────────────────────────────────────────────

export interface ThemeContextValue {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

// ─── Particle Canvas ──────────────────────────────────────────────────────────

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
}

export interface ParticleCanvasProps {
  count: number;              // 60–120
  connectionDistance: number; // 120
  accentColor: string;        // CSS color token resolved at runtime
}

// ─── Typing Animator ──────────────────────────────────────────────────────────

export interface TypingAnimatorProps {
  strings: string[];
  typingSpeed: number;    // ms per character (80)
  deletingSpeed: number;  // ms per character (40)
  pauseAfterType: number; // ms (1500)
}

// ─── About ────────────────────────────────────────────────────────────────────

export interface SpecializationCard {
  title: string;
  description: string; // ≤ 120 characters
  icon: string;
}

export interface AboutData {
  summary: string;
  profileImageUrl: string;
  roleTitle: string;
  specializations: SpecializationCard[];
}
