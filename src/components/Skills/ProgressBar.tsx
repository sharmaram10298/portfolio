import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface ProgressBarProps {
  proficiency: number; // 1-100
}

export function ProgressBar({ proficiency }: ProgressBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
      <motion.div
        className="h-full rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary"
        initial={{ width: '0%' }}
        animate={isInView ? { width: `${proficiency}%` } : { width: '0%' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      />
    </div>
  );
}
