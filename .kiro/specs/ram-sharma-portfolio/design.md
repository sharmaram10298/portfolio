# Design Document — Ram R. Sharma Portfolio

## Overview

A single-page application (SPA) portfolio for Ram R. Sharma, a Backend Developer specializing in Laravel, API architecture, and AWS. The application is built with React 18 + Vite + TypeScript + Tailwind CSS + Framer Motion + Shadcn UI. It presents a dark-mode-first, premium SaaS aesthetic with glassmorphism cards, animated particles, smooth scrolling, and full responsiveness across mobile, tablet, and desktop.

The portfolio is entirely static — no backend, no SSR. All data (projects, skills, experience, services, achievements) lives in typed TypeScript data files. The contact form submits to a third-party email service (EmailJS or Formspree). SEO is handled via `react-helmet-async`.

### Key Design Goals

- **Zero runtime type errors**: strict TypeScript throughout, no `any`.
- **Performance**: Lighthouse ≥ 85 desktop / ≥ 80 mobile via lazy images, code splitting, and minimal bundle size.
- **Accessibility**: WCAG 2.1 AA contrast, keyboard navigation, ARIA labels.
- **Maintainability**: all content in data files; adding a new project or skill requires only a data change.
- **Correctness**: property-based tests validate data integrity, form validation logic, and animation data contracts.

---

## Architecture

### High-Level Component Tree

```
App
├── ThemeProvider          (context: theme state + toggle)
├── SEOHead                (react-helmet-async: title, meta, OG tags)
├── Navbar                 (fixed, scroll-aware, mobile drawer)
├── main
│   ├── HeroSection
│   │   ├── ParticleCanvas
│   │   ├── TypingAnimator
│   │   ├── HeroButtons    (Download Resume, Contact Me)
│   │   ├── SocialLinks
│   │   └── StatsCards
│   ├── AboutSection
│   │   ├── ProfileImage
│   │   └── SpecializationCards
│   ├── SkillsSection
│   │   ├── CategoryTabs
│   │   └── SkillCard[]    (GlassmorphismCard + ProgressBar)
│   ├── ExperienceSection
│   │   └── TimelineEntry[]
│   ├── ProjectsSection
│   │   ├── FilterBar
│   │   └── ProjectCard[]  (GlassmorphismCard + HoverOverlay)
│   ├── ServicesSection
│   │   └── ServiceCard[]
│   ├── AchievementsSection
│   │   └── AchievementCard[]
│   └── ContactSection
│       ├── ContactForm    (react-hook-form + zod)
│       └── ContactInfo
└── Footer
    ├── QuickLinks
    ├── SocialLinks
    └── BackToTop
```

### Data Flow

```
Static Data Files (src/data/)
        │
        ▼
Section Components  ──►  Framer Motion (animations)
        │                       │
        ▼                       ▼
  Rendered DOM          IntersectionObserver
                         (scroll triggers)

ThemeProvider (React Context)
        │
        ▼
  <html> class="dark"|"light"
        │
        ▼
  Tailwind dark: variants + CSS variables
```

### Routing

No React Router is needed. All navigation is anchor-based smooth scrolling. The `id` attributes on each `<section>` element serve as scroll targets.

```
#home  #about  #skills  #experience  #projects  #services  #achievements  #contact
```

---

## Components and Interfaces

### ThemeProvider

Manages dark/light mode. Reads from `localStorage` on mount (before first paint via a blocking inline script in `index.html`), writes on toggle.

```typescript
interface ThemeContextValue {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}
```

The blocking script in `index.html` (before `<body>`) prevents flash of incorrect theme:

```html
<script>
  (function () {
    const stored = localStorage.getItem('theme');
    const preferred = stored ?? 'dark';
    document.documentElement.classList.add(preferred);
  })();
</script>
```

### Navbar

```typescript
interface NavLink {
  label: string;
  href: string; // e.g. '#about'
}

interface NavbarProps {
  links: NavLink[];
}
```

- Uses `useScrollSpy` hook to track active section.
- Uses `useScrollPosition` hook to detect scroll > 80px for background fill.
- Mobile drawer managed by local `useState<boolean>`.
- Smooth scroll via `element.scrollIntoView({ behavior: 'smooth' })` wrapped in a 600ms ease-in-out CSS scroll-behavior override.

### HeroSection

```typescript
interface HeroStats {
  label: string;
  value: string;
}

interface HeroData {
  name: string;
  tagline: string;
  roles: string[];       // Typing_Animator cycles through these
  stats: HeroStats[];
  resumeUrl: string;
  githubUrl: string;
  linkedinUrl: string;
}
```

### TypingAnimator

```typescript
interface TypingAnimatorProps {
  strings: string[];
  typingSpeed: number;   // ms per character (80)
  deletingSpeed: number; // ms per character (40)
  pauseAfterType: number; // ms (1500)
}
```

Implemented as a pure state machine using `useReducer`:

```
States: TYPING | PAUSING | DELETING | SWITCHING
```

### ParticleCanvas

```typescript
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
}

interface ParticleCanvasProps {
  count: number;         // 60–120
  connectionDistance: number; // 120
  accentColor: string;   // CSS color token resolved at runtime
}
```

Uses `requestAnimationFrame` loop. Respects `prefers-reduced-motion` via `window.matchMedia`. Canvas is absolutely positioned, `pointer-events: none`, resizes on `window.resize`.

### GlassmorphismCard

Reusable wrapper component. Applies Tailwind classes:

```
bg-white/5 dark:bg-white/5
backdrop-blur-md
border border-white/10
rounded-2xl
shadow-lg
```

Hover glow via Framer Motion `whileHover` with a box-shadow transition.

### SkillCard

```typescript
interface Skill {
  name: string;
  icon: string;          // path to SVG or icon component name
  proficiency: number;   // 1–100
  category: SkillCategory;
}

type SkillCategory =
  | 'Backend Frameworks'
  | 'Databases'
  | 'Cloud & DevOps'
  | 'APIs & Integrations'
  | 'Languages';
```

Progress bar animation triggered by `useInView` from Framer Motion. Animates from 0 to `proficiency` over 800ms.

### TimelineEntry

```typescript
interface ExperienceEntry {
  company: string;
  role: string;
  period: string;        // e.g. "Jan 2023 – Present"
  location: string;
  responsibilities: string[]; // min 3 items
}
```

Odd entries animate from left (x: -60), even from right (x: 60), triggered by `useInView`.

### ProjectCard

```typescript
interface Project {
  id: string;
  name: string;
  description: string;   // 2–3 sentences
  features: string[];    // 3–5 items
  techStack: string[];   // used for filter tags
  screenshotUrl: string;
  githubUrl: string | null;
  liveDemoUrl: string | null;
}
```

Filter logic: `activeTag === 'All' || project.techStack.includes(activeTag)`.

Framer Motion `layout` prop on the grid container enables animated reflow on filter change.

### ContactForm

```typescript
interface ContactFormData {
  name: string;          // required, max 100
  email: string;         // required, valid email
  subject: string;       // required, max 150
  message: string;       // required, min 20, max 2000
}
```

Uses `react-hook-form` + `zod` schema validation. Submission via EmailJS (or Formspree as fallback). Toast notifications via Shadcn UI `useToast`.

### ServiceCard

```typescript
interface Service {
  id: string;
  title: string;
  icon: string;
  description: string;   // 40–80 words
}
```

### AchievementCard

```typescript
interface Achievement {
  id: string;
  title: string;
  icon: string;
  description: string;   // 20–50 words
}
```

---

## Data Models

All data lives in `src/data/`. Each file exports a typed constant. No data is fetched from a network at runtime.

### File Structure

```
src/
  data/
    hero.ts          // HeroData
    about.ts         // AboutData
    skills.ts        // Skill[]
    experience.ts    // ExperienceEntry[]
    projects.ts      // Project[]
    services.ts      // Service[]
    achievements.ts  // Achievement[]
    navigation.ts    // NavLink[]
```

### Validation Invariants (enforced by TypeScript + runtime assertions in dev)

| Data File | Key Invariants |
|-----------|---------------|
| `skills.ts` | `proficiency` ∈ [1, 100]; category is one of the 5 defined values |
| `projects.ts` | `features.length` ∈ [3, 5]; `description` is 2–3 sentences |
| `experience.ts` | `responsibilities.length` ≥ 3; entries ordered reverse-chronologically |
| `services.ts` | exactly 5 entries |
| `achievements.ts` | exactly 5 entries |
| `hero.ts` | `stats.length` === 4; `roles.length` ≥ 1 |

### Theme System

CSS custom properties defined in `src/styles/globals.css`:

```css
:root {
  --color-bg-primary: #ffffff;
  --color-bg-secondary: #f8fafc;
  --color-accent-primary: #4f46e5;   /* indigo */
  --color-accent-secondary: #6366f1;
  --color-text-primary: #0f172a;
  --color-text-secondary: #475569;
}

.dark {
  --color-bg-primary: #0a0f1e;       /* deep navy */
  --color-bg-secondary: #0d1526;
  --color-accent-primary: #3b82f6;   /* electric blue */
  --color-accent-secondary: #06b6d4; /* cyan */
  --color-text-primary: #f1f5f9;
  --color-text-secondary: #94a3b8;
}
```

Tailwind config extends these tokens:

```typescript
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      'bg-primary': 'var(--color-bg-primary)',
      'bg-secondary': 'var(--color-bg-secondary)',
      'accent-primary': 'var(--color-accent-primary)',
      'accent-secondary': 'var(--color-accent-secondary)',
    },
    animation: {
      'fade-in': 'fadeIn 0.6s ease-in-out',
      'slide-left': 'slideLeft 0.6s ease-in-out',
      'slide-right': 'slideRight 0.6s ease-in-out',
    }
  }
}
```

### Animation Architecture

All scroll-triggered animations use Framer Motion's `useInView` hook with `once: true` (animate once when entering viewport). The `motion` component wraps section children.

**Standard entrance variants:**

```typescript
export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeInOut' } },
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeInOut' } },
};

export const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeInOut' } },
};

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};
```

**Hero stagger sequence** (150ms between groups):

```typescript
const heroStaggerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 }
  }
};
```

**Particle canvas** uses a separate `requestAnimationFrame` loop, not Framer Motion, for performance.

### Form Handling

Zod schema:

```typescript
const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Max 100 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(1, 'Subject is required').max(150, 'Max 150 characters'),
  message: z.string().min(20, 'Min 20 characters').max(2000, 'Max 2000 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;
```

Submission flow:

```
User submits form
  → react-hook-form validates via zod resolver
  → if invalid: show inline errors, do NOT submit
  → if valid: call submitContactForm(data)
    → EmailJS sendForm()
      → success: show success toast, reset form
      → error: show error toast, preserve field values
```

### SEO Implementation

`react-helmet-async` wraps all meta tags in `SEOHead` component:

```typescript
interface SEOProps {
  title: string;
  description: string;
  ogImage: string;
  ogUrl: string;
}
```

Static files at project root:
- `public/robots.txt` — `User-agent: *\nDisallow:`
- `public/sitemap.xml` — lists all section anchor URLs

### File / Folder Structure

```
/
├── public/
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── resume.pdf
│   └── images/
│       ├── profile.jpg
│       └── projects/
│           ├── locomate.png
│           ├── spotly.png
│           ├── agmine.png
│           ├── interview-ms.png
│           ├── italy-tour.png
│           └── cmm-news.png
├── src/
│   ├── components/
│   │   ├── ui/              # Shadcn UI primitives (Button, Input, Textarea, Toast)
│   │   ├── common/
│   │   │   ├── GlassmorphismCard.tsx
│   │   │   ├── SEOHead.tsx
│   │   │   └── SectionWrapper.tsx
│   │   ├── Navbar/
│   │   │   ├── Navbar.tsx
│   │   │   ├── MobileDrawer.tsx
│   │   │   └── NavLink.tsx
│   │   ├── Hero/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── ParticleCanvas.tsx
│   │   │   ├── TypingAnimator.tsx
│   │   │   └── StatsCard.tsx
│   │   ├── About/
│   │   │   └── AboutSection.tsx
│   │   ├── Skills/
│   │   │   ├── SkillsSection.tsx
│   │   │   ├── SkillCard.tsx
│   │   │   └── ProgressBar.tsx
│   │   ├── Experience/
│   │   │   ├── ExperienceSection.tsx
│   │   │   └── TimelineEntry.tsx
│   │   ├── Projects/
│   │   │   ├── ProjectsSection.tsx
│   │   │   ├── ProjectCard.tsx
│   │   │   └── FilterBar.tsx
│   │   ├── Services/
│   │   │   ├── ServicesSection.tsx
│   │   │   └── ServiceCard.tsx
│   │   ├── Achievements/
│   │   │   ├── AchievementsSection.tsx
│   │   │   └── AchievementCard.tsx
│   │   ├── Contact/
│   │   │   ├── ContactSection.tsx
│   │   │   ├── ContactForm.tsx
│   │   │   └── ContactInfo.tsx
│   │   └── Footer/
│   │       └── Footer.tsx
│   ├── context/
│   │   └── ThemeContext.tsx
│   ├── data/
│   │   ├── hero.ts
│   │   ├── about.ts
│   │   ├── skills.ts
│   │   ├── experience.ts
│   │   ├── projects.ts
│   │   ├── services.ts
│   │   ├── achievements.ts
│   │   └── navigation.ts
│   ├── hooks/
│   │   ├── useScrollSpy.ts
│   │   ├── useScrollPosition.ts
│   │   └── useTypingAnimation.ts
│   ├── lib/
│   │   ├── animations.ts    # Framer Motion variant definitions
│   │   ├── emailjs.ts       # EmailJS wrapper
│   │   └── utils.ts         # cn() helper, misc utilities
│   ├── styles/
│   │   └── globals.css      # CSS custom properties, base styles
│   ├── types/
│   │   └── index.ts         # All shared TypeScript interfaces
│   ├── App.tsx
│   └── main.tsx
├── index.html               # includes blocking theme script
├── tailwind.config.ts
├── tsconfig.json            # strict: true
├── vite.config.ts
└── package.json             # exact version pins
```

---

## Correctness Properties


*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Theme Initialization from Storage

*For any* valid theme value (`'dark'` or `'light'`) stored in `localStorage` under the key `'theme'`, when `ThemeProvider` mounts, the initial theme state should equal the stored value.

**Validates: Requirements 2.2**

---

### Property 2: Theme Toggle Round-Trip

*For any* initial theme value, toggling the theme twice should return to the original theme value; toggling once should produce the opposite value (`'dark'` ↔ `'light'`).

**Validates: Requirements 2.3**

---

### Property 3: SEO Metadata Length Constraints

*For any* `SEOProps` object used to render `SEOHead`, the `description` field length shall be ≤ 150 characters, the `ogDescription` field length shall be ≤ 200 characters, and the `ogImage` field shall start with `'https://'`.

**Validates: Requirements 3.2, 3.3**

---

### Property 4: Project Images Use Lazy Loading

*For any* `Project` object in the projects data array, when its card is rendered, the `<img>` element for the project screenshot shall have the attribute `loading="lazy"`.

**Validates: Requirements 3.6**

---

### Property 5: At Most One Active Navigation Link

*For any* scroll position on the page, the number of navigation links with the active/highlighted state shall be exactly 0 or 1 — never more than one link active simultaneously.

**Validates: Requirements 4.8**

---

### Property 6: Typing Animator Cycles All Role Strings

*For any* non-empty array of role strings passed to `TypingAnimator`, the animator state machine shall eventually reach a fully-typed state for every string in the array before cycling back to the first string, and shall never skip a string.

**Validates: Requirements 5.2**

---

### Property 7: Hero Stats Data Completeness

*For any* `HeroStats` array used in `HeroSection`, every item shall have a non-empty `label` string and a non-empty `value` string.

**Validates: Requirements 5.8**

---

### Property 8: Particle Count Within Bounds

*For any* particle system initialization with a configured count `n` where `n ∈ [40, 120]`, the resulting particle array length shall equal `n`; each particle's `radius` shall be in `[1, 3]`; and each particle's speed magnitude (`√(vx² + vy²)`) shall be in `[0.2, 0.8]`.

**Validates: Requirements 5.9, 15.1**

---

### Property 9: Skill Data Integrity

*For any* `Skill` object in the skills data array: `name` shall be non-empty, `icon` shall be non-empty, `proficiency` shall be in `[1, 100]`, and `category` shall be one of the five defined `SkillCategory` values. The set of distinct categories across all skills shall have exactly 5 members.

**Validates: Requirements 7.1, 7.2, 7.6**

---

### Property 10: Experience Entry Data Completeness

*For any* `ExperienceEntry` object in the experience data array: `company`, `role`, `period`, and `location` shall all be non-empty strings, and `responsibilities.length` shall be ≥ 3.

**Validates: Requirements 8.3**

---

### Property 11: Experience Reverse Chronological Order

*For any* adjacent pair of entries `(entries[i], entries[i+1])` in the experience data array, the start year/month of `entries[i]` shall be greater than or equal to the start year/month of `entries[i+1]` (most recent first).

**Validates: Requirements 8.1**

---

### Property 12: Project Data Completeness

*For any* `Project` object in the projects data array: `name` and `description` shall be non-empty, `features.length` shall be in `[3, 5]`, and `techStack.length` shall be ≥ 1.

**Validates: Requirements 9.2**

---

### Property 13: Project Filter Correctness

*For any* non-empty array of `Project` objects and any filter tag `t` (where `t !== 'All'`), the result of `filterProjects(projects, t)` shall contain exactly those projects where `project.techStack.includes(t)` — no more, no fewer.

**Validates: Requirements 9.6, 9.7**

---

### Property 14: Filter Tag Derivation

*For any* non-empty array of `Project` objects, the derived filter tag set shall equal `{'All'} ∪ (union of all project.techStack arrays)` — every tag that appears in any project's tech stack shall appear in the filter bar, and no tag shall appear that does not appear in any project's tech stack.

**Validates: Requirements 9.5**

---

### Property 15: Services Data Count and Description Word Count

*For any* `services` data array used in `ServicesSection`: the array length shall equal exactly 5, and for every `Service` object, the word count of `description` shall be in `[40, 80]`.

**Validates: Requirements 10.1, 10.2**

---

### Property 16: Achievements Data Count and Description Word Count

*For any* `achievements` data array used in `AchievementsSection`: the array length shall equal exactly 5, and for every `Achievement` object, the word count of `description` shall be in `[20, 50]`.

**Validates: Requirements 11.1, 11.2**

---

### Property 17: Contact Form Validation Correctness

*For any* `ContactFormData` object, the Zod validation schema shall return `success: true` if and only if: `name.length ∈ [1, 100]`, `email` matches a valid email format, `subject.length ∈ [1, 150]`, and `message.length ∈ [20, 2000]`. Any object violating any single constraint shall return `success: false`.

**Validates: Requirements 12.1, 12.3**

---

### Property 18: Informational Images Have Alt Attributes

*For any* image data object in the portfolio (profile photo, project screenshots) that conveys information, the rendered `<img>` element shall have a non-empty `alt` attribute string.

**Validates: Requirements 6.2, 14.3**

---

### Property 19: Icon-Only Buttons Have ARIA Labels

*For any* icon-only interactive element (theme toggle button, social icon links, hamburger menu button) rendered in the application, the element shall have a non-empty `aria-label` attribute.

**Validates: Requirements 14.6**

---

### Property 20: Particle Connection Distance Logic

*For any* two `Particle` objects `p1` and `p2`, the function `shouldConnect(p1, p2)` shall return `true` if and only if the Euclidean distance between their centers is ≤ 120px.

**Validates: Requirements 15.2**

---

### Property 21: Specialization Card Description Length

*For any* specialization card object in the about data, `description.length` shall be ≤ 120 characters.

**Validates: Requirements 6.3**

---

### Property 22: Availability Note Length

*For any* availability note string used in the contact section data, its length shall be ≤ 120 characters.

**Validates: Requirements 12.6**

---

## Error Handling

### Theme Initialization Errors

- If `localStorage` is unavailable (e.g., private browsing with storage blocked), `ThemeProvider` catches the `SecurityError` and defaults to `'dark'`.
- If the stored theme value is neither `'dark'` nor `'light'`, it is treated as invalid and defaults to `'dark'`.

### Image Load Failures

- Profile photo: `onError` handler replaces `src` with a placeholder avatar SVG (inline data URI or `/images/avatar-placeholder.svg`).
- Project screenshots: `onError` handler replaces `src` with a generic project placeholder image.

### Contact Form Submission Errors

- Network failure or EmailJS error: caught in the `try/catch` around the submission call. Error toast is shown via Shadcn `useToast`. Form field values are preserved (react-hook-form state is not reset on error).
- Validation errors: Zod resolver surfaces field-level errors; react-hook-form renders them inline below each field. Form is not submitted.

### Particle Canvas Errors

- If `canvas.getContext('2d')` returns `null` (unsupported browser), the component renders nothing (returns `null`) and logs a warning in development.
- If `window.matchMedia` is unavailable, `prefers-reduced-motion` defaults to `false` (animations run).

### Data Integrity (Development Only)

In development mode (`import.meta.env.DEV`), runtime assertions validate all data files on module load:

```typescript
// Example: src/data/skills.ts
if (import.meta.env.DEV) {
  skills.forEach((skill) => {
    console.assert(skill.proficiency >= 1 && skill.proficiency <= 100,
      `Skill "${skill.name}" proficiency out of range: ${skill.proficiency}`);
  });
}
```

These assertions are tree-shaken out of production builds.

### Lazy Image Loading Fallback

For browsers that do not support `loading="lazy"`, images load eagerly (native browser fallback). No polyfill is needed — the attribute is simply ignored by unsupported browsers.

---

## Testing Strategy

### Dual Testing Approach

Both unit/example-based tests and property-based tests are used. Unit tests cover specific behaviors and integration points; property tests verify universal invariants across generated inputs.

### Property-Based Testing Library

**Vitest** (test runner) + **fast-check** (property-based testing library for TypeScript/JavaScript).

- Minimum **100 iterations** per property test (fast-check default is 100; configured via `fc.configureGlobal({ numRuns: 100 })`).
- Each property test is tagged with a comment referencing the design property.
- Tag format: `// Feature: ram-sharma-portfolio, Property N: <property_text>`

### Unit / Example-Based Tests

Focused on:
- Specific content checks (exact title text, exact summary text, exact copyright notice)
- Integration points (ThemeProvider + localStorage, ContactForm + EmailJS mock)
- Edge cases (null githubUrl → disabled button, null liveDemoUrl → disabled button, empty filter result → empty state message)
- DOM structure (semantic HTML elements present, ARIA attributes present)
- Static file content (robots.txt directives, sitemap.xml section URLs)

### Property-Based Tests

Each of the 22 correctness properties above maps to a single property-based test using fast-check generators:

| Property | fast-check Generators Used |
|----------|---------------------------|
| 1 (Theme init) | `fc.constantFrom('dark', 'light')` |
| 2 (Theme toggle round-trip) | `fc.constantFrom('dark', 'light')` |
| 3 (SEO metadata lengths) | `fc.string({ maxLength: 200 })`, `fc.webUrl()` |
| 4 (Lazy loading) | `fc.record({ ...projectShape })` |
| 5 (Active nav link) | `fc.integer({ min: 0, max: 10000 })` (scroll position) |
| 6 (Typing animator cycles) | `fc.array(fc.string({ minLength: 1 }), { minLength: 1 })` |
| 7 (Hero stats completeness) | `fc.array(fc.record({ label: fc.string({ minLength: 1 }), value: fc.string({ minLength: 1 }) }))` |
| 8 (Particle count/bounds) | `fc.integer({ min: 40, max: 120 })` |
| 9 (Skill data integrity) | `fc.record({ name: fc.string({ minLength: 1 }), proficiency: fc.integer({ min: 1, max: 100 }), ... })` |
| 10 (Experience completeness) | `fc.record({ ...experienceShape })` |
| 11 (Experience order) | `fc.array(fc.record({ ...experienceShape }))` |
| 12 (Project completeness) | `fc.record({ ...projectShape })` |
| 13 (Filter correctness) | `fc.array(fc.record({ ...projectShape }))`, `fc.string()` |
| 14 (Filter tag derivation) | `fc.array(fc.record({ ...projectShape }), { minLength: 1 })` |
| 15 (Services count/words) | `fc.array(fc.record({ ...serviceShape }), { minLength: 5, maxLength: 5 })` |
| 16 (Achievements count/words) | `fc.array(fc.record({ ...achievementShape }), { minLength: 5, maxLength: 5 })` |
| 17 (Form validation) | `fc.record({ name: fc.string(), email: fc.string(), subject: fc.string(), message: fc.string() })` |
| 18 (Alt attributes) | `fc.record({ src: fc.webUrl(), alt: fc.string({ minLength: 1 }) })` |
| 19 (ARIA labels) | `fc.string({ minLength: 1 })` (aria-label value) |
| 20 (Particle connection) | `fc.record({ x: fc.float(), y: fc.float() })` × 2 |
| 21 (Specialization desc length) | `fc.string({ maxLength: 120 })` |
| 22 (Availability note length) | `fc.string({ maxLength: 120 })` |

### Integration Tests

- Lighthouse CI audit (performance score thresholds)
- EmailJS form submission (with test API key in CI environment)
- End-to-end smoke test: page loads, all 8 sections visible, no console errors (Playwright or Cypress)

### Test File Structure

```
src/
  __tests__/
    unit/
      ThemeProvider.test.tsx
      TypingAnimator.test.tsx
      ContactForm.test.tsx
      SEOHead.test.tsx
      ProjectCard.test.tsx
      FilterBar.test.tsx
      Footer.test.tsx
    property/
      theme.property.test.ts        // Properties 1, 2
      seo.property.test.ts          // Properties 3, 4
      navbar.property.test.ts       // Property 5
      typingAnimator.property.test.ts // Property 6
      hero.property.test.ts         // Properties 7, 8
      skills.property.test.ts       // Property 9
      experience.property.test.ts   // Properties 10, 11
      projects.property.test.ts     // Properties 12, 13, 14
      services.property.test.ts     // Property 15
      achievements.property.test.ts // Property 16
      contactForm.property.test.ts  // Property 17
      accessibility.property.test.ts // Properties 18, 19
      particles.property.test.ts    // Property 20
      about.property.test.ts        // Property 21
      contact.property.test.ts      // Property 22
```

### Key Design Decisions and Tradeoffs

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Animation library | Framer Motion only | Requirement 1.3 mandates it; avoids bundle bloat from multiple animation libs |
| Form validation | react-hook-form + zod | Type-safe schema, excellent DX, minimal re-renders vs. Formik |
| Email service | EmailJS | Client-side only, no backend needed; free tier sufficient for portfolio |
| SEO | react-helmet-async | Standard SPA SEO solution; async version avoids race conditions |
| Particle system | Custom canvas, not a library | Full control over behavior, no extra dependency, ~100 lines of code |
| Typing animation | Custom useReducer hook | Avoids react-typed or similar libraries; keeps bundle lean |
| Data layer | Static TS files | Zero network latency, full type safety, easy to update |
| Scroll spy | Custom useScrollSpy hook | IntersectionObserver-based; more performant than scroll event listeners |
| Theme flash prevention | Blocking inline script in index.html | Only reliable way to prevent FOICT in a Vite SPA |
| Image optimization | `loading="lazy"` + WebP format | Native lazy loading, no polyfill needed for modern browsers |
