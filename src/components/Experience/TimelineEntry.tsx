import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Calendar, Building2 } from 'lucide-react';
import type { ExperienceEntry } from '@/types/index';
import { GlassmorphismCard } from '@/components/common/GlassmorphismCard';

interface TimelineEntryProps {
  entry: ExperienceEntry;
  index: number; // 0-based; odd/even determined by (index + 1) % 2
}

export function TimelineEntry({ entry, index }: TimelineEntryProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // 1-indexed: index 0 → entry 1 (odd) → slide from left
  const isOdd = (index + 1) % 2 !== 0;
  const xOffset = isOdd ? -60 : 60;

  return (
    <div ref={ref} className="relative flex gap-6 pb-12 last:pb-0">
      {/* Timeline line + dot */}
      <div className="flex flex-col items-center">
        <motion.div
          className="w-4 h-4 rounded-full bg-accent-primary border-2 border-bg-primary flex-shrink-0 mt-1"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
        <div className="w-0.5 flex-1 bg-gradient-to-b from-accent-primary/50 to-transparent mt-2" />
      </div>

      {/* Content */}
      <motion.div
        className="flex-1 pb-2"
        initial={{ opacity: 0, x: xOffset }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: xOffset }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
      >
        <GlassmorphismCard className="p-6">
          <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
            <div>
              <h3 className="text-lg font-bold text-text-primary">{entry.role}</h3>
              <div className="flex items-center gap-1.5 text-accent-primary font-medium text-sm mt-0.5">
                <Building2 size={14} />
                {entry.company}
              </div>
            </div>
            <div className="flex flex-col items-end gap-1 text-xs text-text-secondary">
              <div className="flex items-center gap-1">
                <Calendar size={12} />
                {entry.period}
              </div>
              <div className="flex items-center gap-1">
                <MapPin size={12} />
                {entry.location}
              </div>
            </div>
          </div>
          <ul className="space-y-2">
            {entry.responsibilities.map((resp, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                <span className="text-accent-primary mt-1 flex-shrink-0">▸</span>
                {resp}
              </li>
            ))}
          </ul>
        </GlassmorphismCard>
      </motion.div>
    </div>
  );
}
