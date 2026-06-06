import { motion } from 'framer-motion';
import { Code2, Server, Cloud, Brain, Database } from 'lucide-react';
import type { Service } from '@/types/index';
import { fadeInUp } from '@/lib/animations';

const iconMap: Record<string, React.ReactNode> = {
  Code2: <Code2 size={28} className="text-accent-primary" />,
  Server: <Server size={28} className="text-accent-primary" />,
  Cloud: <Cloud size={28} className="text-accent-primary" />,
  Brain: <Brain size={28} className="text-accent-primary" />,
  Database: <Database size={28} className="text-accent-primary" />,
};

export function ServiceCard({ title, icon, description }: Service) {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -4, boxShadow: '0 0 24px rgba(59, 130, 246, 0.25)' }}
      transition={{ duration: 0.2 }}
      className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg p-6 flex flex-col gap-4 h-full transition-colors hover:border-accent-primary/40"
    >
      <div className="w-12 h-12 rounded-xl bg-accent-primary/10 flex items-center justify-center">
        {iconMap[icon] ?? <Code2 size={28} className="text-accent-primary" />}
      </div>
      <h3 className="font-bold text-text-primary text-base">{title}</h3>
      <p className="text-text-secondary text-sm leading-relaxed flex-1">{description}</p>
    </motion.div>
  );
}
