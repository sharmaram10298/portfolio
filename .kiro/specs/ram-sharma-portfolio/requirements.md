# Requirements Document

## Introduction

A premium, modern developer portfolio website for Ram R. Sharma — a Backend Developer with 2+ years of experience specializing in Laravel, API architecture, and AWS cloud deployment. The portfolio is built with React.js, TypeScript, Tailwind CSS, Framer Motion, and Shadcn UI. It features a dark modern SaaS design with glassmorphism effects, gradient backgrounds, animated particles, smooth scrolling, dark/light mode toggle, and full responsiveness. The goal is to present Ram as a senior-level engineer from a top product company, showcasing his skills, experience, projects, services, and achievements in a visually compelling and SEO-optimized single-page application.

---

## Glossary

- **Portfolio_App**: The React.js + TypeScript single-page application being built.
- **Hero_Section**: The top-most section of the page containing the primary introduction.
- **Typing_Animator**: The component responsible for the animated typing effect in the Hero Section.
- **Skills_Section**: The section displaying categorized technology skills with animated progress indicators.
- **Experience_Timeline**: The section displaying work history in a vertical timeline layout.
- **Projects_Section**: The section displaying featured projects with screenshots, descriptions, and links.
- **Services_Section**: The section listing professional services offered.
- **Achievements_Section**: The section highlighting key technical achievements.
- **Contact_Section**: The section containing the contact form and social links.
- **Theme_Controller**: The component managing dark/light mode state across the entire application.
- **Particle_Background**: The animated particle canvas rendered behind the Hero Section.
- **Glassmorphism_Card**: A UI card component using frosted-glass visual styling (backdrop blur, semi-transparent background, border highlight).
- **Resume_File**: The downloadable PDF resume file for Ram R. Sharma.
- **SEO_Metadata**: HTML meta tags, Open Graph tags, and structured data for search engine optimization.
- **Smooth_Scroller**: The mechanism enabling smooth animated scrolling between sections via navigation links.
- **Navbar**: The fixed top navigation bar with section links and theme toggle.
- **Toast_Notification**: A brief, non-blocking UI message confirming form submission or errors.

---

## Requirements

### Requirement 1: Application Foundation and Tech Stack

**User Story:** As a developer, I want the portfolio built on a modern, typed React stack, so that the codebase is maintainable, scalable, and performant.

#### Acceptance Criteria

1. THE Portfolio_App SHALL be bootstrapped with Vite and React 18+ using TypeScript as the primary language.
2. THE Portfolio_App SHALL use Tailwind CSS for all utility-based styling, with no inline style attributes used for layout or spacing.
3. THE Portfolio_App SHALL integrate Framer Motion for all animation and transition effects; no other animation library shall be introduced.
4. THE Portfolio_App SHALL use Shadcn UI components as the base component library for all interactive UI primitives (buttons, inputs, dialogs, toasts).
5. THE Portfolio_App SHALL be a single-page application (SPA) with client-side routing only; no server-side rendering framework (e.g., Next.js) shall be used.
6. THE Portfolio_App SHALL pass TypeScript strict-mode compilation (`"strict": true` in tsconfig) with zero type errors and zero `any` type usages in production source files.
7. THE Portfolio_App SHALL declare all third-party dependencies with exact version pins in `package.json` (no `^` or `~` range specifiers).

---

### Requirement 2: Global Theme and Visual Design

**User Story:** As a visitor, I want a visually stunning dark-mode-first design, so that the portfolio feels premium and professional.

#### Acceptance Criteria

1. THE Portfolio_App SHALL default to dark mode on first load when no theme preference is stored in localStorage.
2. THE Theme_Controller SHALL read the stored theme value from localStorage on application mount and apply it before the first paint, so that no flash of incorrect theme is visible.
3. WHEN the user toggles the theme, THE Theme_Controller SHALL apply the new theme class to the root `<html>` element and all section backgrounds SHALL reflect the new theme within 300ms, without a full page reload.
4. THE Portfolio_App SHALL apply a visually distinct dark-mode color scheme using deep navy as the primary background, electric blue as the primary accent, and cyan as the secondary accent.
5. THE Portfolio_App SHALL apply a visually distinct light-mode color scheme using white as the primary background, soft gray as the secondary background, and indigo as the primary accent.
6. THE Glassmorphism_Card SHALL display a frosted-glass appearance: a blurred backdrop, a semi-transparent fill that differs from the page background, and a visible 1px border with a lighter tone than the card fill.
7. THE Portfolio_App SHALL render a visually distinct background pattern (gradient mesh or similar) at section dividers so that adjacent sections are clearly separated without a hard line.

---

### Requirement 3: SEO and Performance Optimization

**User Story:** As Ram, I want the portfolio to rank well in search engines and load quickly, so that recruiters and clients can find and access it easily.

#### Acceptance Criteria

1. THE Portfolio_App SHALL include a `<title>` tag with the exact value: "Ram R. Sharma — Backend Developer | Laravel | API Architect | AWS".
2. THE Portfolio_App SHALL include Open Graph meta tags for `og:title`, `og:description`, `og:image`, and `og:url`; `og:description` SHALL be 200 characters or fewer; `og:image` SHALL be an absolute URL.
3. THE Portfolio_App SHALL include a `<meta name="description">` tag whose content is 150 characters or fewer.
4. THE Portfolio_App SHALL include a `robots.txt` file at the root with the directives `User-agent: *` and an empty `Disallow` field, permitting all crawlers.
5. THE Portfolio_App SHALL achieve a Lighthouse performance score of 85 or above on desktop and 80 or above on mobile.
6. THE Portfolio_App SHALL defer loading of project screenshot images until they are within the viewport; images outside the viewport SHALL NOT initiate network requests on initial page load.
7. THE Portfolio_App SHALL use semantic HTML5 elements (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`) for all major layout regions.
8. THE Portfolio_App SHALL include a `sitemap.xml` file at the root listing all navigable section anchor URLs.

---

### Requirement 4: Navbar

**User Story:** As a visitor, I want a fixed navigation bar with smooth scroll links, so that I can jump to any section instantly from anywhere on the page.

#### Acceptance Criteria

1. THE Navbar SHALL be fixed to the top of the viewport and remain visible during scrolling.
2. THE Navbar SHALL contain anchor links to the following sections in order: Home, About, Skills, Experience, Projects, Services, Achievements, Contact.
3. WHEN a visitor clicks a Navbar anchor link, THE Navbar SHALL initiate a smooth scroll animation to the target section that completes within 600ms using an ease-in-out curve.
4. WHEN the page is scrolled past 80px from the top, THE Navbar SHALL display a visible background fill (with reduced opacity relative to the page background) so that it is visually distinct from the underlying content.
5. THE Navbar SHALL include the Theme_Controller toggle button (sun/moon icon) on the right side.
6. WHEN the viewport width is below 768px, THE Navbar SHALL collapse navigation links into a hamburger menu icon; WHEN the user clicks the hamburger icon, THE Navbar SHALL open a full-width mobile drawer containing all navigation links.
7. WHEN the mobile drawer is open and the user clicks a navigation link or clicks outside the drawer, THE Navbar SHALL close the mobile drawer.
8. WHEN a section's top edge enters the top 50% of the viewport during scrolling, THE Navbar SHALL apply an underline accent to the corresponding navigation link and remove it from all other links.

---

### Requirement 5: Hero Section

**User Story:** As a visitor, I want an impactful hero section with animated text and clear call-to-action buttons, so that I immediately understand who Ram is and how to engage with him.

#### Acceptance Criteria

1. THE Hero_Section SHALL display Ram's full name "Ram R. Sharma" as the primary heading using a font size of at least 3.5rem on desktop (≥1280px viewports).
2. THE Typing_Animator SHALL cycle through the following role strings in a continuous loop: "Backend Developer", "Laravel Developer", "API Architect", "AWS Cloud Enthusiast" — with a typing speed of 80ms per character, a deletion speed of 40ms per character, and a 1500ms pause after each string is fully typed before deletion begins.
3. THE Hero_Section SHALL display the tagline: "Building scalable APIs and cloud-native backends that power modern applications."
4. WHEN a visitor clicks the "Download Resume" button, THE Hero_Section SHALL initiate a file download of the Resume_File (PDF) to the visitor's device without navigating away from the page.
5. WHEN a visitor clicks the "Contact Me" button, THE Hero_Section SHALL initiate a smooth scroll animation to the Contact_Section.
6. THE Hero_Section SHALL display a GitHub icon-link; WHEN clicked, it SHALL open Ram's GitHub profile URL (`https://github.com/ramsharma`) in a new browser tab.
7. THE Hero_Section SHALL display a LinkedIn icon-link; WHEN clicked, it SHALL open Ram's LinkedIn profile URL in a new browser tab.
8. THE Hero_Section SHALL display four statistics cards with the following exact labels and values: "2+ Years Experience", "15+ Projects Delivered", "10+ Technologies", "5+ Happy Clients".
9. THE Particle_Background SHALL render between 60 and 120 animated floating particles behind the Hero_Section content using an HTML `<canvas>` element.
10. WHEN the Hero_Section first mounts in the DOM, THE Hero_Section SHALL stagger the entrance animations of the following elements in order — heading, subtitle/tagline, buttons, social links, statistics cards — with a 150ms delay between each group's animation start.

---

### Requirement 6: About Section

**User Story:** As a recruiter, I want to read a professional summary about Ram, so that I can quickly assess his background and specializations.

#### Acceptance Criteria

1. THE About_Section SHALL display a professional summary paragraph with the exact text: "I'm Ram R. Sharma, a Backend Developer with 2+ years of experience building scalable RESTful APIs, microservices, and cloud-native applications. I specialize in Laravel and PHP ecosystems and deploy production workloads on AWS EC2, S3, and RDS."
2. THE About_Section SHALL display a profile photo with a visible circular border rendered as a multi-color gradient ring; the image SHALL include a descriptive `alt` attribute; IF the image fails to load, THE About_Section SHALL display a placeholder avatar in its place.
3. THE About_Section SHALL display three specialization highlight cards with the following titles and descriptions (each description SHALL be 120 characters or fewer): "Backend Development" — "Designing and building high-performance server-side systems and RESTful APIs."; "Cloud Deployment" — "Deploying and managing scalable applications on AWS EC2, S3, and RDS."; "API Architecture" — "Architecting clean, versioned, and documented APIs for web and mobile clients."
4. THE About_Section SHALL display Ram's role title: "Backend Developer | Laravel Developer | API Architect | AWS Cloud Enthusiast".
5. WHEN at least 50% of the About_Section is visible in the viewport, THE About_Section SHALL animate the text content in from the left and the profile image and specialization cards in from the right; each animation SHALL complete within 600ms.

---

### Requirement 7: Skills Section

**User Story:** As a technical evaluator, I want to see Ram's skills organized by category with visual proficiency indicators, so that I can quickly assess his technical depth.

#### Acceptance Criteria

1. THE Skills_Section SHALL organize skills into exactly five category tabs or headings: "Backend Frameworks", "Databases", "Cloud & DevOps", "APIs & Integrations", "Languages".
2. THE Skills_Section SHALL display each skill as a Glassmorphism_Card containing: the technology name as visible text, a recognizable logo or icon for the technology, and an animated horizontal progress bar or radial/circular indicator showing proficiency level.
3. THE Skills_Section SHALL include the following technologies under their respective categories:
   - Backend Frameworks: PHP, Laravel, CodeIgniter, CakePHP, Node.js, Express.js, FastAPI, Django
   - Databases: MySQL, MongoDB, Firebase
   - Cloud & DevOps: AWS EC2, AWS S3, AWS RDS, Git, GitHub
   - APIs & Integrations: REST APIs, OpenAI APIs, Postman
   - Languages: PHP, JavaScript, TypeScript, Python
4. WHEN a skill card's progress indicator enters the viewport, THE Skills_Section SHALL animate the indicator from 0% to its defined target value over exactly 800ms.
5. WHEN a visitor hovers over a skill card, THE Skills_Section SHALL apply a visible glowing border effect using the primary accent color to that card within 150ms of hover start.
6. THE Skills_Section SHALL assign a proficiency percentage (between 1 and 100) to each skill; this value SHALL be defined in the component's data layer and SHALL be the target value used by the progress animation in criterion 4.

---

### Requirement 8: Experience Timeline

**User Story:** As a recruiter, I want to see Ram's work history in a clear timeline, so that I can evaluate his career progression.

#### Acceptance Criteria

1. THE Experience_Timeline SHALL display work history in reverse chronological order (most recent first).
2. THE Experience_Timeline SHALL include the following three positions in order from top to bottom:
   - **TagDog Media Pvt Ltd** — Backend Developer (most recent)
   - **Neoxuse Spotly Media LLP** — Backend Developer
   - **Hands In Technology** — Backend Developer / Intern (earliest)
3. EACH timeline entry SHALL display: company name, job title, employment period (month/year range), location, and a bullet-point list of at least three key responsibilities or achievements.
4. THE Experience_Timeline SHALL render a continuous vertical line connecting all entries; WHEN each entry's dot marker enters the viewport, THE Experience_Timeline SHALL animate the dot marker scaling from 0 to full size over 300ms.
5. WHEN a timeline entry enters the viewport, THE Experience_Timeline SHALL animate odd-numbered entries (1-indexed from top) sliding in 60px from the left with a simultaneous fade from 0 to full opacity, and even-numbered entries sliding in 60px from the right with the same fade, each completing within 400ms.

---

### Requirement 9: Featured Projects Section

**User Story:** As a potential client or employer, I want to browse Ram's featured projects with details and links, so that I can evaluate the quality and scope of his work.

#### Acceptance Criteria

1. THE Projects_Section SHALL display the following six projects: Locomate, Spotly, Agmine, Interview Management System, Italy Tour App, CMM News.
2. EACH project card SHALL display: a project screenshot or mockup image, the project name, a short description of 2–3 sentences, a key features list of 3–5 bullet points, tech stack tags, a GitHub link button, and a Live Demo link button.
3. THE Projects_Section SHALL render projects in a responsive grid: 3 columns on desktop (≥1280px), 2 columns on tablet (≥768px), 1 column on mobile (<768px).
4. WHEN a visitor hovers over a project card, THE Projects_Section SHALL display an overlay showing the project's short description and the GitHub and Live Demo action buttons, fading in over 250ms.
5. THE Projects_Section SHALL include a filter bar whose tags are derived from the union of all tech stack tags displayed across all project cards, plus an "All" tag that resets the filter; only one tag may be active at a time.
6. WHEN a filter tag is selected, THE Projects_Section SHALL hide project cards whose tech stack does not include the selected tag and show only matching cards, animating the layout transition using Framer Motion layout animations.
7. IF no projects match the active filter tag, THEN THE Projects_Section SHALL display an empty-state message: "No projects found for this technology."
8. IF a project does not have a live demo URL, THEN THE Projects_Section SHALL render the Live Demo button in a disabled state; WHEN a visitor hovers or focuses the disabled button, a "Coming Soon" tooltip SHALL appear.
9. IF a project does not have a GitHub URL, THEN THE Projects_Section SHALL render the GitHub button in a disabled state; WHEN a visitor hovers or focuses the disabled button, a "Private Repo" tooltip SHALL appear.

---

### Requirement 10: Services Section

**User Story:** As a potential client, I want to understand what services Ram offers, so that I can determine if he is the right fit for my project.

#### Acceptance Criteria

1. THE Services_Section SHALL display exactly five service cards with the following titles: "API Development & Integration", "Backend Development", "AWS Cloud Deployment", "AI Integration", "Database Design & Optimization".
2. EACH service card SHALL display: a recognizable icon relevant to the service domain, the service title as visible text, and a description of 2–3 sentences (40–80 words).
3. THE Services_Section SHALL render service cards in a responsive grid: 3 columns on desktop (≥1280px), 2 columns on tablet (≥768px), 1 column on mobile (<768px).
4. WHEN a visitor hovers over a service card, THE Services_Section SHALL apply a visible gradient border glow to the card and translate the card 4px upward, both within 200ms of hover start.
5. WHEN the Services_Section enters the viewport, THE Services_Section SHALL animate each card entering from opacity 0 to full opacity, staggered with a 100ms delay between each card's animation start, each card's animation completing within 400ms.

---

### Requirement 11: Achievements Section

**User Story:** As a technical evaluator, I want to see Ram's key technical achievements highlighted, so that I can understand the complexity of problems he has solved.

#### Acceptance Criteria

1. THE Achievements_Section SHALL display exactly five achievement items with the following titles: "Real-time Systems", "GPS Tracking Integration", "JWT Authentication Systems", "Firebase Push Notifications", "Payment Gateway Integrations".
2. EACH achievement item SHALL display: a recognizable icon, the achievement title as visible text, and a description of 1–2 sentences (20–50 words) describing the technical challenge solved.
3. THE Achievements_Section SHALL render achievement items in a responsive grid: 3 columns on desktop (≥1280px), 2 columns on tablet (≥768px), 1 column on mobile (<768px).
4. WHEN the Achievements_Section enters the viewport, THE Achievements_Section SHALL animate each achievement item scaling from 0.8 to 1.0 and fading from 0 to full opacity over 400ms, with a 80ms stagger delay between each item.

---

### Requirement 12: Contact Section

**User Story:** As a recruiter or client, I want to contact Ram directly from the portfolio, so that I can reach out without leaving the page.

#### Acceptance Criteria

1. THE Contact_Section SHALL display a contact form with the following fields and constraints: Name (required, max 100 characters), Email (required, must match a valid email format), Subject (required, max 150 characters), Message (required, min 20 characters, max 2000 characters).
2. WHEN the visitor submits the form and the submission service returns a success response, THE Contact_Section SHALL display a Toast_Notification with a success message, and all form fields SHALL reset to empty.
3. IF the visitor submits the form with one or more invalid or empty required fields, THEN THE Contact_Section SHALL display an inline validation error message below each invalid field; the form SHALL NOT be submitted; validation SHALL also trigger on individual field blur.
4. THE Contact_Section SHALL display the following social/contact links: Email address (mailto link), LinkedIn profile URL, GitHub profile URL, WhatsApp link using the `https://wa.me/` format with Ram's phone number.
5. EACH social link in the Contact_Section SHALL open in a new browser tab.
6. THE Contact_Section SHALL display an availability note of 120 characters or fewer, such as "Open to freelance projects and full-time opportunities."
7. WHEN the Contact_Section enters the viewport, THE Contact_Section SHALL animate the form sliding in from the left and the contact info panel sliding in from the right, each completing within 600ms.
8. IF the form submission service returns an error response or a network failure occurs, THEN THE Contact_Section SHALL display a Toast_Notification with an error message, and all form field values SHALL be preserved so the visitor does not lose their input.

---

### Requirement 13: Footer

**User Story:** As a visitor, I want a clean footer with quick links and copyright information, so that the page ends professionally.

#### Acceptance Criteria

1. THE Footer SHALL display Ram's name and role title as a brand statement of 20 words or fewer.
2. THE Footer SHALL display the copyright notice: "© 2024 Ram R. Sharma. All rights reserved."
3. THE Footer SHALL include quick navigation links to the following sections: About, Skills, Experience, Projects, Contact.
4. THE Footer SHALL include social icon links for GitHub, LinkedIn, and WhatsApp; EACH link SHALL open in a new browser tab.
5. WHEN a visitor clicks the "Back to Top" button in the Footer, THE Footer SHALL initiate a smooth scroll animation to the top of the Hero_Section.

---

### Requirement 14: Responsiveness and Accessibility

**User Story:** As a visitor on any device, I want the portfolio to be fully usable and readable, so that I have a consistent experience regardless of screen size or assistive technology.

#### Acceptance Criteria

1. THE Portfolio_App SHALL be fully responsive across the following breakpoints: mobile (320px–767px), tablet (768px–1279px), desktop (1280px+); at each breakpoint, there SHALL be no horizontal scrolling, no content overflow beyond the viewport width, no overlapping elements, and all content SHALL reflow within the viewport width.
2. THE Portfolio_App SHALL maintain a minimum tap target size of 44×44px for all interactive elements on mobile.
3. THE Portfolio_App SHALL provide a descriptive `alt` attribute for all informational images; decorative images SHALL use an empty `alt=""` attribute.
4. THE Portfolio_App SHALL ensure all text meets WCAG 2.1 AA color contrast ratio (minimum 4.5:1 for normal text, 3:1 for large text) in both dark and light modes.
5. THE Portfolio_App SHALL support keyboard navigation for all interactive elements (buttons, links, form fields) with focus indicators that have a minimum 3:1 contrast ratio between the focus indicator color and adjacent colors, and tab order SHALL follow the visual reading order of the page.
6. THE Portfolio_App SHALL use ARIA labels on icon-only buttons (e.g., theme toggle, social icon links).

---

### Requirement 15: Animated Particle Background

**User Story:** As a visitor, I want the hero section to have a dynamic animated background, so that the portfolio feels alive and visually engaging.

#### Acceptance Criteria

1. THE Particle_Background SHALL render between 40 and 120 particles (inclusive) that move continuously in randomized directions; each particle SHALL have a radius between 1px and 3px; particle speed SHALL be between 0.2px/frame and 0.8px/frame; particles SHALL bounce off canvas edges.
2. THE Particle_Background SHALL draw a semi-transparent line between any two particles whose center-to-center distance is 120px or fewer, creating a network effect.
3. THE Particle_Background SHALL render particles and connecting lines using the design system's primary accent color token; particle and line opacity SHALL be between 0.2 and 0.6.
4. WHEN the user's device reports `prefers-reduced-motion: reduce`, THE Particle_Background SHALL render all particles and lines as static (frozen in place, no movement or animation frame loop).
5. THE Particle_Background SHALL be rendered on an HTML `<canvas>` element that is positioned absolutely behind all Hero_Section content; the canvas SHALL have `pointer-events: none` so it does not intercept mouse or touch events; WHEN the viewport is resized, THE Particle_Background SHALL resize the canvas to match the new viewport dimensions without reloading the page.
