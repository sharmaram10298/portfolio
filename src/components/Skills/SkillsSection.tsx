import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { skills } from '@/data/skills';
import { staggerContainer, fadeInUp } from '@/lib/animations';
import { SkillCard } from './SkillCard';
import type { SkillCategory } from '@/types/index';

const categories: SkillCategory[] = [
  'Backend Frameworks',
  'Databases',
  'Cloud & DevOps',
  'APIs & Integrations',
  'Languages',
];

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>('Backend Frameworks');
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const filtered = skills.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" ref={ref} className="py-20 px-4 md:px-8 lg:px-16 bg-bg-primary">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-3xl md:text-4xl font-bold text-text-primary text-center mb-12"
        >
          Technical <span className="text-accent-primary">Skills</span>
        </motion.h2>

        {/* Category tabs */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="flex flex-wrap gap-2 justify-center mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 min-h-[44px] ${
                activeCategory === cat
                  ? 'bg-accent-primary text-white shadow-lg shadow-accent-primary/30'
                  : 'bg-white/5 text-text-secondary hover:bg-white/10 border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Skills grid */}
        <motion.div
          key={activeCategory}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {filtered.map((skill) => (
            <motion.div key={skill.name + skill.category} variants={fadeInUp}>
              <SkillCard name={skill.name} proficiency={skill.proficiency} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
