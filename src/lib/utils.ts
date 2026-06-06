// Utility helpers for Ram R. Sharma Portfolio
// Requirement 1.6 — strict TypeScript, zero `any` usages

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Project } from '@/types/index';

// ─── Class Name Helper ────────────────────────────────────────────────────────

/**
 * Merges Tailwind CSS class names with conflict resolution.
 * Combines clsx (conditional classes) with tailwind-merge (deduplication).
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

// ─── Project Filter Utilities ─────────────────────────────────────────────────

/**
 * Filters projects by a given tech-stack tag.
 * When tag is 'All', all projects are returned unchanged.
 * Otherwise, only projects whose techStack includes the tag are returned.
 *
 * Validates: Requirements 9.6
 */
export function filterProjects(projects: Project[], tag: string): Project[] {
  if (tag === 'All') {
    return projects;
  }
  return projects.filter((project) => project.techStack.includes(tag));
}

/**
 * Derives the sorted list of unique filter tags from a project array.
 * Always prepends 'All' as the first entry.
 * The remaining tags are the sorted union of all project techStack arrays.
 *
 * Validates: Requirements 9.5
 */
export function deriveFilterTags(projects: Project[]): string[] {
  const tagSet = new Set<string>();
  for (const project of projects) {
    for (const tag of project.techStack) {
      tagSet.add(tag);
    }
  }
  const sortedTags = Array.from(tagSet).sort();
  return ['All', ...sortedTags];
}
