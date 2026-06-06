# Implementation Plan: Ram R. Sharma Portfolio

## Overview

A dark-mode-first, single-page portfolio application built with React 18 + Vite + TypeScript + Tailwind CSS + Framer Motion + Shadcn UI. All content lives in static TypeScript data files. The contact form submits via EmailJS. SEO is handled by react-helmet-async. Property-based tests use Vitest + fast-check to validate all 22 correctness properties defined in the design.

---

## Tasks

- [x] 1. Project scaffolding, configuration, and static assets
  - [x] 1.1 Bootstrap Vite + React 18 + TypeScript project with exact dependency version pins
    - Run `npm create vite@latest` with React + TypeScript template
    - Pin all dependencies in `package.json` (no `^` or `~` specifiers) per Requirement 1.7
    - Set `"strict": true` in `tsconfig.json` per Requirement 1.6
    - Install and configure Tailwind CSS, Framer Motion, Shadcn UI, react-hook-form, zod, EmailJS, react-helmet-async, Vitest, fast-check
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.6, 1.7_

  - [x] 1.2 Configure Tailwind CSS with design system tokens and custom animations
    - Create `tailwind.config.ts` extending CSS custom property tokens (`bg-primary`, `bg-secondary`, `accent-primary`, `accent-secondary`)
    - Add custom animation keyframes: `fade-in`, `slide-left`, `slide-right`
    - _Requirements: 1.2, 2.4, 2.5_

  - [x] 1.3 Create `src/styles/globals.css` with CSS custom properties for both themes
    - Define `:root` (light) and `.dark` (dark) CSS variable sets per design spec
    - Deep navy `#0a0f1e`, electric blue `#3b82f6`, cyan `#06b6d4` for dark mode
    - White, soft gray, indigo `#4f46e5` for light mode
    - _Requirements: 2.4, 2.5_

  - [x] 1.4 Add blocking theme script to `index.html` and configure semantic HTML structure
    - Insert inline `<script>` before `<body>` that reads `localStorage.getItem('theme')` and applies class to `<html>` to prevent flash of incorrect theme
    - Add `<main>` wrapper and section `id` anchors: `#home #about #skills #experience #projects #services #achievements #contact`
    - _Requirements: 2.2, 3.7, 4.2_

  - [x] 1.5 Add static public assets: `robots.txt`, `sitemap.xml`, `resume.pdf` placeholder, and project image placeholders
    - `public/robots.txt`: `User-agent: *\nDisallow:` per Requirement 3.4
    - `public/sitemap.xml`: list all 8 section anchor URLs per Requirement 3.8
    - `public/resume.pdf`: placeholder PDF file
    - `public/images/profile.jpg` and `public/images/projects/` directory with 6 project image placeholders
    - _Requirements: 3.4, 3.8, 5.4_


- [x] 2. TypeScript types, shared interfaces, and animation variants
  - [x] 2.1 Create `src/types/index.ts` with all shared TypeScript interfaces
    - Define: `NavLink`, `HeroStats`, `HeroData`, `Skill`, `SkillCategory`, `ExperienceEntry`, `Project`, `Service`, `Achievement`, `ContactFormData`, `SEOProps`, `ThemeContextValue`, `Particle`, `ParticleCanvasProps`, `TypingAnimatorProps`
    - Ensure zero `any` usages; all types must pass strict-mode compilation
    - _Requirements: 1.6_

  - [x] 2.2 Create `src/lib/animations.ts` with all Framer Motion variant definitions
    - Export: `fadeInUp`, `slideInLeft`, `slideInRight`, `staggerContainer`, `scaleIn`, `heroStaggerVariants`
    - Match exact timing values from design: 0.6s fade, 0.4s slide, 0.15s hero stagger, 0.1s general stagger
    - _Requirements: 5.10, 6.5, 8.5, 10.5, 11.4, 12.7_

  - [x] 2.3 Create `src/lib/utils.ts` with `cn()` helper and miscellaneous utilities
    - Implement `cn()` using `clsx` + `tailwind-merge` for conditional class merging
    - Add `filterProjects(projects, tag)` pure function used by Projects filter logic
    - Add `deriveFilterTags(projects)` pure function returning `['All', ...uniqueTechTags]`
    - _Requirements: 9.5, 9.6_


- [ ] 3. Static data files
  - [-] 3.1 Create `src/data/navigation.ts` and `src/data/hero.ts`
    - `navigation.ts`: export `NavLink[]` with 8 entries (Home → Contact) matching `#id` hrefs
    - `hero.ts`: export `HeroData` with exact name, tagline, 4 role strings, 4 stats cards, resume/GitHub/LinkedIn URLs
    - Stats: "2+ Years Experience", "15+ Projects Delivered", "10+ Technologies", "5+ Happy Clients"
    - Roles: "Backend Developer", "Laravel Developer", "API Architect", "AWS Cloud Enthusiast"
    - Add DEV-only runtime assertions for `stats.length === 4` and `roles.length >= 1`
    - _Requirements: 5.1, 5.2, 5.3, 5.6, 5.7, 5.8_

  - [-] 3.2 Create `src/data/about.ts`
    - Export `AboutData` with exact summary paragraph text, profile image path, role title, and 3 specialization cards
    - Each specialization card description must be ≤ 120 characters
    - _Requirements: 6.1, 6.3, 6.4_

  - [-] 3.3 Create `src/data/skills.ts`
    - Export `Skill[]` with all technologies across 5 categories per Requirement 7.3
    - Each skill: `name`, `icon`, `proficiency` (1–100), `category`
    - Add DEV-only assertions: proficiency in [1,100], category is valid enum value
    - _Requirements: 7.1, 7.2, 7.3, 7.6_

  - [ ] 3.4 Create `src/data/experience.ts`
    - Export `ExperienceEntry[]` with 3 entries in reverse chronological order: TagDog Media, Neoxuse Spotly, Hands In Technology
    - Each entry: company, role, period, location, responsibilities (≥ 3 bullet points)
    - Add DEV-only assertions: responsibilities.length >= 3
    - _Requirements: 8.1, 8.2, 8.3_

  - [~] 3.5 Create `src/data/projects.ts`
    - Export `Project[]` with 6 projects: Locomate, Spotly, Agmine, Interview Management System, Italy Tour App, CMM News
    - Each project: id, name, description (2–3 sentences), features (3–5 items), techStack, screenshotUrl, githubUrl (nullable), liveDemoUrl (nullable)
    - Add DEV-only assertions: features.length in [3,5], techStack.length >= 1
    - _Requirements: 9.1, 9.2_

  - [~] 3.6 Create `src/data/services.ts` and `src/data/achievements.ts`
    - `services.ts`: export exactly 5 `Service[]` entries with titles, icons, descriptions (40–80 words)
    - `achievements.ts`: export exactly 5 `Achievement[]` entries with titles, icons, descriptions (20–50 words)
    - Add DEV-only assertions for array lengths and word counts
    - _Requirements: 10.1, 10.2, 11.1, 11.2_


- [ ] 4. Theme system and global context
  - [~] 4.1 Create `src/context/ThemeContext.tsx` with `ThemeProvider` and `useTheme` hook
    - Read `localStorage.getItem('theme')` on mount; default to `'dark'` if absent or invalid
    - Wrap `localStorage` access in try/catch for private browsing `SecurityError`
    - Apply theme class to `document.documentElement` on mount and on every toggle
    - Write new theme to `localStorage` on toggle
    - Export `ThemeContextValue` interface and `useTheme()` hook
    - _Requirements: 2.1, 2.2, 2.3_

  - [ ]* 4.2 Write property tests for theme system (Properties 1 and 2)
    - **Property 1: Theme Initialization from Storage** — for any `'dark'|'light'` value in localStorage, ThemeProvider initial state equals stored value
    - **Property 2: Theme Toggle Round-Trip** — toggling twice returns to original; toggling once produces opposite value
    - Use `fc.constantFrom('dark', 'light')` generator
    - Tag: `// Feature: ram-sharma-portfolio, Property 1` and `Property 2`
    - File: `src/__tests__/property/theme.property.test.ts`
    - **Validates: Requirements 2.2, 2.3**


- [ ] 5. SEO and common shared components
  - [~] 5.1 Create `src/components/common/SEOHead.tsx` using react-helmet-async
    - Render `<title>`, `<meta name="description">`, `og:title`, `og:description`, `og:image`, `og:url` tags
    - Accept `SEOProps` interface; wire up with exact title: "Ram R. Sharma — Backend Developer | Laravel | API Architect | AWS"
    - _Requirements: 3.1, 3.2, 3.3_

  - [ ]* 5.2 Write property tests for SEO metadata (Properties 3 and 4)
    - **Property 3: SEO Metadata Length Constraints** — description ≤ 150 chars, ogDescription ≤ 200 chars, ogImage starts with `'https://'`
    - **Property 4: Project Images Use Lazy Loading** — any rendered Project card `<img>` has `loading="lazy"`
    - Use `fc.string({ maxLength: 200 })` and `fc.webUrl()` generators
    - File: `src/__tests__/property/seo.property.test.ts`
    - **Validates: Requirements 3.2, 3.3, 3.6**

  - [~] 5.3 Create `src/components/common/GlassmorphismCard.tsx` and `src/components/common/SectionWrapper.tsx`
    - `GlassmorphismCard`: apply `bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg`; Framer Motion `whileHover` box-shadow glow
    - `SectionWrapper`: semantic `<section>` with `id` prop, consistent padding, and `useInView` trigger
    - _Requirements: 2.6, 3.7_

  - [ ]* 5.4 Write unit tests for SEOHead and GlassmorphismCard
    - Verify exact `<title>` text rendered by SEOHead
    - Verify glassmorphism CSS classes are applied
    - File: `src/__tests__/unit/SEOHead.test.tsx`
    - _Requirements: 3.1, 2.6_


- [ ] 6. Custom hooks
  - [~] 6.1 Create `src/hooks/useScrollPosition.ts`
    - Listen to `window.scroll` event (passive) and return current `scrollY` value
    - Used by Navbar to detect scroll > 80px for background fill
    - _Requirements: 4.4_

  - [~] 6.2 Create `src/hooks/useScrollSpy.ts`
    - Use `IntersectionObserver` to track which section's top edge is in the top 50% of the viewport
    - Return the `id` of the currently active section
    - _Requirements: 4.8_

  - [~] 6.3 Create `src/hooks/useTypingAnimation.ts`
    - Implement state machine with `useReducer`: states `TYPING | PAUSING | DELETING | SWITCHING`
    - Typing speed: 80ms/char, deleting speed: 40ms/char, pause after type: 1500ms
    - Cycle through all strings continuously without skipping any
    - _Requirements: 5.2_

  - [ ]* 6.4 Write property test for TypingAnimator cycling (Property 6)
    - **Property 6: Typing Animator Cycles All Role Strings** — for any non-empty string array, state machine eventually reaches fully-typed state for every string before cycling back
    - Use `fc.array(fc.string({ minLength: 1 }), { minLength: 1 })` generator
    - File: `src/__tests__/property/typingAnimator.property.test.ts`
    - **Validates: Requirements 5.2**


- [ ] 7. Navbar component
  - [~] 7.1 Create `src/components/Navbar/NavLink.tsx`, `MobileDrawer.tsx`, and `Navbar.tsx`
    - `Navbar.tsx`: fixed positioning, 8 anchor links, theme toggle button (sun/moon icon with `aria-label`), scroll-aware background fill at > 80px
    - Smooth scroll via `element.scrollIntoView({ behavior: 'smooth' })` completing within 600ms
    - Active link underline accent driven by `useScrollSpy` hook
    - `MobileDrawer.tsx`: full-width drawer on viewports < 768px, hamburger icon with `aria-label`, closes on link click or outside click
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8_

  - [ ]* 7.2 Write property test for active navigation link (Property 5)
    - **Property 5: At Most One Active Navigation Link** — for any scroll position, active link count is exactly 0 or 1
    - Use `fc.integer({ min: 0, max: 10000 })` generator for scroll position
    - File: `src/__tests__/property/navbar.property.test.ts`
    - **Validates: Requirements 4.8**

  - [ ]* 7.3 Write unit tests for Navbar
    - Verify all 8 nav links render with correct hrefs
    - Verify hamburger menu opens/closes mobile drawer
    - Verify theme toggle button has `aria-label`
    - File: `src/__tests__/unit/Navbar.test.tsx`
    - _Requirements: 4.2, 4.6, 14.6_


- [ ] 8. Hero Section
  - [~] 8.1 Create `src/components/Hero/ParticleCanvas.tsx`
    - Render `<canvas>` absolutely positioned with `pointer-events: none`
    - Initialize 60–120 particles with radius 1–3px, speed 0.2–0.8px/frame
    - `requestAnimationFrame` loop: move particles, bounce off edges, draw connection lines for distance ≤ 120px
    - Respect `prefers-reduced-motion`: freeze all particles when `reduce` is detected
    - Resize canvas on `window.resize` without page reload
    - Handle `getContext('2d') === null` gracefully (return null, log warning in DEV)
    - _Requirements: 5.9, 15.1, 15.2, 15.3, 15.4, 15.5_

  - [ ]* 8.2 Write property tests for particle system (Properties 8 and 20)
    - **Property 8: Particle Count Within Bounds** — for any count n ∈ [40,120], particle array length equals n; each radius ∈ [1,3]; each speed magnitude ∈ [0.2,0.8]
    - **Property 20: Particle Connection Distance Logic** — `shouldConnect(p1, p2)` returns true iff Euclidean distance ≤ 120px
    - Use `fc.integer({ min: 40, max: 120 })` and `fc.record({ x: fc.float(), y: fc.float() })` generators
    - File: `src/__tests__/property/particles.property.test.ts`
    - **Validates: Requirements 5.9, 15.1, 15.2**

  - [~] 8.3 Create `src/components/Hero/TypingAnimator.tsx`
    - Consume `useTypingAnimation` hook; render animated role string with blinking cursor
    - Accept `TypingAnimatorProps`: strings, typingSpeed (80), deletingSpeed (40), pauseAfterType (1500)
    - _Requirements: 5.2_

  - [~] 8.4 Create `src/components/Hero/StatsCard.tsx` and `src/components/Hero/HeroSection.tsx`
    - `StatsCard`: render label + value in a glassmorphism card
    - `HeroSection`: compose ParticleCanvas, heading (≥ 3.5rem on desktop), TypingAnimator, tagline, HeroButtons (Download Resume + Contact Me), SocialLinks (GitHub + LinkedIn with `aria-label`), StatsCards (4 items)
    - Stagger entrance animations: heading → subtitle → buttons → social links → stats cards, 150ms between groups
    - "Download Resume" triggers file download without navigation; "Contact Me" smooth-scrolls to `#contact`
    - GitHub and LinkedIn links open in new tab
    - _Requirements: 5.1, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8, 5.10_

  - [ ]* 8.5 Write property tests for Hero stats (Property 7)
    - **Property 7: Hero Stats Data Completeness** — every HeroStats item has non-empty label and non-empty value
    - Use `fc.array(fc.record({ label: fc.string({ minLength: 1 }), value: fc.string({ minLength: 1 }) }))` generator
    - File: `src/__tests__/property/hero.property.test.ts`
    - **Validates: Requirements 5.8**


- [ ] 9. About Section
  - [~] 9.1 Create `src/components/About/AboutSection.tsx`
    - Display exact summary paragraph text from `about.ts`
    - Profile photo with circular gradient ring border; `alt` attribute; `onError` fallback to placeholder avatar
    - Role title text
    - 3 specialization highlight cards (GlassmorphismCard)
    - Animate text from left, image + cards from right when ≥ 50% visible; each animation ≤ 600ms
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

  - [ ]* 9.2 Write property test for specialization card description length (Property 21)
    - **Property 21: Specialization Card Description Length** — for any specialization card object, description.length ≤ 120 characters
    - Use `fc.string({ maxLength: 120 })` generator
    - File: `src/__tests__/property/about.property.test.ts`
    - **Validates: Requirements 6.3**

  - [ ]* 9.3 Write unit tests for AboutSection
    - Verify exact summary paragraph text is rendered
    - Verify profile image has non-empty `alt` attribute
    - Verify 3 specialization cards render with correct titles
    - File: `src/__tests__/unit/AboutSection.test.tsx`
    - _Requirements: 6.1, 6.2, 6.3_


- [ ] 10. Skills Section
  - [~] 10.1 Create `src/components/Skills/ProgressBar.tsx` and `src/components/Skills/SkillCard.tsx`
    - `ProgressBar`: animated horizontal bar from 0% to target `proficiency` over 800ms, triggered by `useInView`
    - `SkillCard`: GlassmorphismCard wrapping technology name, icon, and ProgressBar; hover glow border using primary accent color within 150ms
    - _Requirements: 7.2, 7.4, 7.5_

  - [~] 10.2 Create `src/components/Skills/SkillsSection.tsx` with category tabs
    - 5 category tabs: "Backend Frameworks", "Databases", "Cloud & DevOps", "APIs & Integrations", "Languages"
    - Render filtered `SkillCard[]` for active category
    - All technologies from Requirement 7.3 present in data
    - _Requirements: 7.1, 7.3_

  - [ ]* 10.3 Write property test for skill data integrity (Property 9)
    - **Property 9: Skill Data Integrity** — for any Skill object: name non-empty, icon non-empty, proficiency ∈ [1,100], category is one of 5 valid values; distinct categories across all skills = 5
    - Use `fc.record({ name: fc.string({ minLength: 1 }), proficiency: fc.integer({ min: 1, max: 100 }), ... })` generator
    - File: `src/__tests__/property/skills.property.test.ts`
    - **Validates: Requirements 7.1, 7.2, 7.6**


- [ ] 11. Experience Section
  - [~] 11.1 Create `src/components/Experience/TimelineEntry.tsx` and `src/components/Experience/ExperienceSection.tsx`
    - `TimelineEntry`: display company, role, period, location, responsibilities bullet list
    - Continuous vertical connecting line; dot marker scales 0 → full size over 300ms on viewport entry
    - Odd entries (1-indexed) slide in from left (x: -60), even from right (x: 60), fade 0 → 1, each ≤ 400ms
    - `ExperienceSection`: render entries from `experience.ts` in reverse chronological order
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

  - [ ]* 11.2 Write property tests for experience data (Properties 10 and 11)
    - **Property 10: Experience Entry Data Completeness** — company, role, period, location all non-empty; responsibilities.length ≥ 3
    - **Property 11: Experience Reverse Chronological Order** — for any adjacent pair (entries[i], entries[i+1]), start date of entries[i] ≥ entries[i+1]
    - Use `fc.record({ ...experienceShape })` and `fc.array(...)` generators
    - File: `src/__tests__/property/experience.property.test.ts`
    - **Validates: Requirements 8.1, 8.3**


- [ ] 12. Projects Section
  - [~] 12.1 Create `src/components/Projects/FilterBar.tsx`
    - Derive filter tags from union of all project `techStack` arrays plus "All" tag
    - Only one tag active at a time; "All" resets filter
    - _Requirements: 9.5_

  - [~] 12.2 Create `src/components/Projects/ProjectCard.tsx`
    - Display screenshot (`loading="lazy"`), name, description, features list, tech stack tags, GitHub button, Live Demo button
    - Hover overlay fades in over 250ms showing description + action buttons
    - Disabled GitHub button with "Private Repo" tooltip when `githubUrl === null`
    - Disabled Live Demo button with "Coming Soon" tooltip when `liveDemoUrl === null`
    - _Requirements: 9.2, 9.4, 9.8, 9.9_

  - [~] 12.3 Create `src/components/Projects/ProjectsSection.tsx`
    - Responsive grid: 3 cols desktop, 2 cols tablet, 1 col mobile
    - Filter logic: `filterProjects(projects, activeTag)` from `src/lib/utils.ts`
    - Framer Motion `layout` prop on grid container for animated reflow
    - Empty state message: "No projects found for this technology." when no matches
    - _Requirements: 9.3, 9.6, 9.7_

  - [ ]* 12.4 Write property tests for project data and filter logic (Properties 12, 13, 14)
    - **Property 12: Project Data Completeness** — name and description non-empty, features.length ∈ [3,5], techStack.length ≥ 1
    - **Property 13: Project Filter Correctness** — `filterProjects(projects, t)` returns exactly projects where `techStack.includes(t)`
    - **Property 14: Filter Tag Derivation** — derived tag set equals `{'All'} ∪ union(all techStack arrays)`
    - Use `fc.array(fc.record({ ...projectShape }), { minLength: 1 })` and `fc.string()` generators
    - File: `src/__tests__/property/projects.property.test.ts`
    - **Validates: Requirements 9.2, 9.5, 9.6, 9.7**

  - [ ]* 12.5 Write unit tests for ProjectCard and FilterBar
    - Verify `loading="lazy"` on screenshot `<img>`
    - Verify disabled state and tooltip text for null GitHub/LiveDemo URLs
    - Verify "No projects found" empty state message
    - File: `src/__tests__/unit/ProjectCard.test.tsx`, `src/__tests__/unit/FilterBar.test.tsx`
    - _Requirements: 9.4, 9.7, 9.8, 9.9_


- [ ] 13. Services Section
  - [~] 13.1 Create `src/components/Services/ServiceCard.tsx` and `src/components/Services/ServicesSection.tsx`
    - `ServiceCard`: icon, title, description (40–80 words); hover: gradient border glow + translate 4px up within 200ms
    - `ServicesSection`: responsive grid (3/2/1 cols), stagger entrance animation 100ms delay per card, each card ≤ 400ms
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_

  - [ ]* 13.2 Write property test for services data (Property 15)
    - **Property 15: Services Data Count and Description Word Count** — array length = 5; every Service description word count ∈ [40,80]
    - Use `fc.array(fc.record({ ...serviceShape }), { minLength: 5, maxLength: 5 })` generator
    - File: `src/__tests__/property/services.property.test.ts`
    - **Validates: Requirements 10.1, 10.2**

- [ ] 14. Achievements Section
  - [~] 14.1 Create `src/components/Achievements/AchievementCard.tsx` and `src/components/Achievements/AchievementsSection.tsx`
    - `AchievementCard`: icon, title, description (20–50 words)
    - `AchievementsSection`: responsive grid (3/2/1 cols), scale 0.8 → 1.0 + fade 0 → 1 over 400ms, 80ms stagger between items
    - _Requirements: 11.1, 11.2, 11.3, 11.4_

  - [ ]* 14.2 Write property test for achievements data (Property 16)
    - **Property 16: Achievements Data Count and Description Word Count** — array length = 5; every Achievement description word count ∈ [20,50]
    - Use `fc.array(fc.record({ ...achievementShape }), { minLength: 5, maxLength: 5 })` generator
    - File: `src/__tests__/property/achievements.property.test.ts`
    - **Validates: Requirements 11.1, 11.2**


- [ ] 15. Contact Section
  - [~] 15.1 Create `src/lib/emailjs.ts` EmailJS wrapper
    - Export `submitContactForm(data: ContactFormData): Promise<void>`
    - Wrap `emailjs.sendForm()` call; throw on error so caller can catch
    - _Requirements: 12.2, 12.8_

  - [~] 15.2 Create Zod schema and `src/components/Contact/ContactForm.tsx`
    - Define `contactSchema` with exact constraints: name max 100, email valid format, subject max 150, message min 20 max 2000
    - Use `react-hook-form` with `zodResolver`; inline validation errors below each field; validate on blur
    - On success: show Shadcn success toast, reset all fields
    - On error/network failure: show Shadcn error toast, preserve field values
    - _Requirements: 12.1, 12.2, 12.3, 12.8_

  - [~] 15.3 Create `src/components/Contact/ContactInfo.tsx` and `src/components/Contact/ContactSection.tsx`
    - `ContactInfo`: email (mailto), LinkedIn, GitHub, WhatsApp (`https://wa.me/` format) — all open in new tab; availability note ≤ 120 chars
    - `ContactSection`: form slides in from left, info panel from right, each ≤ 600ms on viewport entry
    - _Requirements: 12.4, 12.5, 12.6, 12.7_

  - [ ]* 15.4 Write property tests for contact form validation (Property 17) and availability note (Property 22)
    - **Property 17: Contact Form Validation Correctness** — Zod schema returns success iff name ∈ [1,100], valid email, subject ∈ [1,150], message ∈ [20,2000]; any single violation returns failure
    - **Property 22: Availability Note Length** — for any availability note string, length ≤ 120 characters
    - Use `fc.record({ name: fc.string(), email: fc.string(), subject: fc.string(), message: fc.string() })` and `fc.string({ maxLength: 120 })` generators
    - File: `src/__tests__/property/contactForm.property.test.ts`, `src/__tests__/property/contact.property.test.ts`
    - **Validates: Requirements 12.1, 12.3, 12.6**

  - [ ]* 15.5 Write unit tests for ContactForm
    - Verify inline errors appear for each invalid field on submit
    - Verify form does not submit when validation fails
    - Verify success toast and field reset on successful submission (mock EmailJS)
    - Verify error toast and field value preservation on failed submission
    - File: `src/__tests__/unit/ContactForm.test.tsx`
    - _Requirements: 12.2, 12.3, 12.8_


- [ ] 16. Footer
  - [~] 16.1 Create `src/components/Footer/Footer.tsx`
    - Brand statement (≤ 20 words), copyright "© 2024 Ram R. Sharma. All rights reserved."
    - Quick nav links: About, Skills, Experience, Projects, Contact
    - Social icon links: GitHub, LinkedIn, WhatsApp — all open in new tab with `aria-label`
    - "Back to Top" button smooth-scrolls to `#home`
    - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.5_

  - [ ]* 16.2 Write unit tests for Footer
    - Verify exact copyright notice text
    - Verify 5 quick nav links with correct hrefs
    - Verify social links open in new tab and have `aria-label`
    - File: `src/__tests__/unit/Footer.test.tsx`
    - _Requirements: 13.2, 13.3, 13.4_

- [~] 17. Checkpoint — Core sections complete
  - Ensure all tests pass, ask the user if questions arise.


- [ ] 18. Accessibility and cross-cutting concerns
  - [~] 18.1 Audit and apply ARIA labels to all icon-only interactive elements
    - Theme toggle button: `aria-label="Toggle theme"`
    - Hamburger menu button: `aria-label="Open navigation menu"`
    - Social icon links (GitHub, LinkedIn, WhatsApp): descriptive `aria-label` on each
    - Verify all interactive elements have minimum 44×44px tap target on mobile
    - _Requirements: 14.2, 14.6_

  - [~] 18.2 Audit all informational images for non-empty `alt` attributes; mark decorative images with `alt=""`
    - Profile photo: descriptive alt text
    - Project screenshots: project name as alt text
    - Decorative background elements: `alt=""`
    - _Requirements: 14.3_

  - [ ]* 18.3 Write property tests for accessibility (Properties 18 and 19)
    - **Property 18: Informational Images Have Alt Attributes** — any image data object with informational content renders `<img>` with non-empty `alt`
    - **Property 19: Icon-Only Buttons Have ARIA Labels** — any icon-only interactive element has non-empty `aria-label`
    - Use `fc.record({ src: fc.webUrl(), alt: fc.string({ minLength: 1 }) })` and `fc.string({ minLength: 1 })` generators
    - File: `src/__tests__/property/accessibility.property.test.ts`
    - **Validates: Requirements 6.2, 14.3, 14.6**

  - [~] 18.4 Verify keyboard navigation tab order follows visual reading order
    - Ensure all buttons, links, and form fields are reachable via Tab key
    - Focus indicators meet 3:1 contrast ratio requirement
    - _Requirements: 14.5_


- [ ] 19. App wiring and final integration
  - [~] 19.1 Create `src/App.tsx` composing all sections and providers
    - Wrap app in `HelmetProvider` (react-helmet-async) and `ThemeProvider`
    - Render `SEOHead` with exact title and meta values
    - Compose: `Navbar`, `<main>` containing all 8 sections in order, `Footer`
    - Ensure `<header>`, `<main>`, `<section>`, `<article>`, `<footer>` semantic elements are used
    - _Requirements: 1.5, 3.1, 3.7_

  - [~] 19.2 Configure `vite.config.ts` for code splitting and performance
    - Enable manual chunk splitting for vendor libraries (framer-motion, react, shadcn)
    - Ensure project screenshot images use `loading="lazy"` (already in ProjectCard)
    - _Requirements: 3.5, 3.6_

  - [~] 19.3 Verify TypeScript strict-mode compilation passes with zero errors and zero `any` usages
    - Run `tsc --noEmit` and resolve all type errors
    - Search for any `any` type usages in `src/` and replace with proper types
    - _Requirements: 1.6_

  - [ ]* 19.4 Write unit tests for TypingAnimator component
    - Verify component renders current role string
    - Verify blinking cursor is present
    - File: `src/__tests__/unit/TypingAnimator.test.tsx`
    - _Requirements: 5.2_

- [~] 20. Final checkpoint — All tests pass
  - Ensure all tests pass, ask the user if questions arise.


---

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP build
- Each task references specific requirements for full traceability
- All 22 correctness properties from the design document are covered by property-based tests
- Property tests use Vitest + fast-check with minimum 100 iterations per property (`fc.configureGlobal({ numRuns: 100 })`)
- Each property test file includes a tag comment: `// Feature: ram-sharma-portfolio, Property N: <property_text>`
- Unit tests cover specific content, integration points, edge cases, and DOM structure
- Two checkpoints (tasks 17 and 20) ensure incremental validation
- All data lives in `src/data/` — adding a new project or skill requires only a data file change
- The blocking inline script in `index.html` (task 1.4) is critical for preventing flash of incorrect theme

---

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.2", "1.3", "1.4", "1.5"] },
    { "id": 1, "tasks": ["2.1", "2.2", "2.3"] },
    { "id": 2, "tasks": ["3.1", "3.2", "3.3", "3.4", "3.5", "3.6"] },
    { "id": 3, "tasks": ["4.1", "5.1", "5.3", "6.1", "6.2", "6.3"] },
    { "id": 4, "tasks": ["4.2", "5.2", "5.4", "6.4", "7.1", "8.1", "8.3"] },
    { "id": 5, "tasks": ["7.2", "7.3", "8.2", "8.4", "9.1", "10.1", "11.1", "12.1", "13.1", "14.1", "15.1", "15.2", "16.1"] },
    { "id": 6, "tasks": ["8.5", "9.2", "9.3", "10.2", "10.3", "11.2", "12.2", "12.3", "13.2", "14.2", "15.3", "16.2"] },
    { "id": 7, "tasks": ["12.4", "12.5", "13.2", "14.2", "15.4", "15.5", "18.1", "18.2"] },
    { "id": 8, "tasks": ["18.3", "18.4"] },
    { "id": 9, "tasks": ["19.1", "19.2"] },
    { "id": 10, "tasks": ["19.3", "19.4"] }
  ]
}
```
