import { GlassmorphismCard } from '@/components/common/GlassmorphismCard';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';
import type { HeroStats } from '@/types/index';

export function StatsCard({ label, value }: HeroStats) {
  return (
    <motion.div variants={fadeInUp}>
      <GlassmorphismCard className="p-4 text-center min-w-[120px]">
        <div className="text-2xl font-bold text-accent-primary">{value}</div>
        <div className="text-xs text-text-secondary mt-1">{label}</div>
      </GlassmorphismCard>
    </motion.div>
  );
}
