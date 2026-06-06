import type { Skill, SkillCategory } from '@/types/index';

export const skills: Skill[] = [
  // ─── Backend Frameworks ───────────────────────────────────────────────────
  { name: 'PHP',          icon: 'Code2',      proficiency: 90, category: 'Backend Frameworks' },
  { name: 'Laravel',      icon: 'Layers',     proficiency: 92, category: 'Backend Frameworks' },
  { name: 'CodeIgniter',  icon: 'Flame',      proficiency: 75, category: 'Backend Frameworks' },
  { name: 'CakePHP',      icon: 'Cake',       proficiency: 65, category: 'Backend Frameworks' },
  { name: 'Node.js',      icon: 'Server',     proficiency: 70, category: 'Backend Frameworks' },
  { name: 'Express.js',   icon: 'Zap',        proficiency: 68, category: 'Backend Frameworks' },
  { name: 'FastAPI',      icon: 'Gauge',      proficiency: 60, category: 'Backend Frameworks' },
  { name: 'Django',       icon: 'Globe',      proficiency: 55, category: 'Backend Frameworks' },

  // ─── Databases ────────────────────────────────────────────────────────────
  { name: 'MySQL',        icon: 'Database',   proficiency: 88, category: 'Databases' },
  { name: 'MongoDB',      icon: 'Leaf',       proficiency: 72, category: 'Databases' },
  { name: 'Firebase',     icon: 'Flame',      proficiency: 75, category: 'Databases' },

  // ─── Cloud & DevOps ───────────────────────────────────────────────────────
  { name: 'AWS EC2',      icon: 'Cloud',      proficiency: 80, category: 'Cloud & DevOps' },
  { name: 'AWS S3',       icon: 'HardDrive',  proficiency: 82, category: 'Cloud & DevOps' },
  { name: 'AWS RDS',      icon: 'Database',   proficiency: 78, category: 'Cloud & DevOps' },
  { name: 'Git',          icon: 'GitBranch',  proficiency: 88, category: 'Cloud & DevOps' },
  { name: 'GitHub',       icon: 'Github',     proficiency: 87, category: 'Cloud & DevOps' },

  // ─── APIs & Integrations ──────────────────────────────────────────────────
  { name: 'REST APIs',    icon: 'Network',    proficiency: 92, category: 'APIs & Integrations' },
  { name: 'OpenAI APIs',  icon: 'Brain',      proficiency: 70, category: 'APIs & Integrations' },
  { name: 'Postman',      icon: 'Send',       proficiency: 85, category: 'APIs & Integrations' },

  // ─── Languages ────────────────────────────────────────────────────────────
  { name: 'PHP',          icon: 'Code2',      proficiency: 90, category: 'Languages' },
  { name: 'JavaScript',   icon: 'FileCode',   proficiency: 78, category: 'Languages' },
  { name: 'TypeScript',   icon: 'FileType',   proficiency: 72, category: 'Languages' },
  { name: 'Python',       icon: 'Terminal',   proficiency: 65, category: 'Languages' },
];

// Validate all valid categories at runtime in dev
const validCategories: SkillCategory[] = [
  'Backend Frameworks',
  'Databases',
  'Cloud & DevOps',
  'APIs & Integrations',
  'Languages',
];

if (import.meta.env.DEV) {
  skills.forEach((skill, i) => {
    console.assert(
      skill.proficiency >= 1 && skill.proficiency <= 100,
      `Skill[${i}] "${skill.name}" proficiency must be 1–100, got ${skill.proficiency}`,
    );
    console.assert(
      validCategories.includes(skill.category),
      `Skill[${i}] "${skill.name}" has invalid category: ${skill.category}`,
    );
  });
}
