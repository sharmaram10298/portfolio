import { GlassmorphismCard } from '@/components/common/GlassmorphismCard';
import { ProgressBar } from './ProgressBar';
import type { Skill } from '@/types/index';

export function SkillCard({ name, proficiency }: Pick<Skill, 'name' | 'proficiency'>) {
  return (
    <GlassmorphismCard className="p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-text-primary">{name}</span>
        <span className="text-xs text-text-secondary">{proficiency}%</span>
      </div>
      <ProgressBar proficiency={proficiency} />
    </GlassmorphismCard>
  );
}
