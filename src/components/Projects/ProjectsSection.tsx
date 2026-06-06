import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { projects } from '@/data/projects';
import { filterProjects, deriveFilterTags } from '@/lib/utils';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { FilterBar } from './FilterBar';
import { ProjectCard } from './ProjectCard';

const allTags = deriveFilterTags(projects);

export function ProjectsSection() {
  const [activeTag, setActiveTag] = useState('All');
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const filtered = filterProjects(projects, activeTag);

  return (
    <section id="projects" ref={ref} className="py-20 px-4 md:px-8 lg:px-16 bg-bg-primary">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-3xl md:text-4xl font-bold text-text-primary text-center mb-12"
        >
          Featured <span className="text-accent-primary">Projects</span>
        </motion.h2>

        <FilterBar tags={allTags} activeTag={activeTag} onTagChange={setActiveTag} />

        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.p
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center text-text-secondary py-16"
            >
              No projects found for this technology.
            </motion.p>
          ) : (
            <motion.div
              key={activeTag}
              layout
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              {filtered.map((project) => (
                <motion.div key={project.id} layout variants={fadeInUp}>
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
