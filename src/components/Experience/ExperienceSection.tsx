import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { experiences } from '@/data/experience';
import { fadeInUp } from '@/lib/animations';
import { TimelineEntry } from './TimelineEntry';

export function ExperienceSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="experience" ref={ref} className="py-20 px-4 md:px-8 lg:px-16 bg-bg-secondary">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-3xl md:text-4xl font-bold text-text-primary text-center mb-16"
        >
          Work <span className="text-accent-primary">Experience</span>
        </motion.h2>

        <div className="relative">
          {experiences.map((entry, index) => (
            <TimelineEntry key={entry.company} entry={entry} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
