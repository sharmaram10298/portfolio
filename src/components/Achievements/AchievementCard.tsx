import { motion } from 'framer-motion';
import { Zap, MapPin, Shield, Bell, CreditCard } from 'lucide-react';
import type { Achievement } from '@/types/index';
import { scaleIn } from '@/lib/animations';

const iconMap: Record<string, React.ReactNode> = {
  Zap: <Zap size={28} className="text-accent-primary" />,
  MapPin: <MapPin size={28} className="text-accent-primary" />,
  Shield: <Shield size={28} className="text-accent-primary" />,
  Bell: <Bell size={28} className="text-accent-primary" />,
  CreditCard: <CreditCard size={28} className="text-accent-primary" />,
};

export function AchievementCard({ title, icon, description }: Achievement) {
  return (
    <motion.div
      variants={scaleIn}
      className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg p-6 flex flex-col gap-4 h-full"
    >
      <div className="w-12 h-12 rounded-xl bg-accent-primary/10 flex items-center justify-center">
        {iconMap[icon] ?? <Zap size={28} className="text-accent-primary" />}
      </div>
      <h3 className="font-bold text-text-primary text-base">{title}</h3>
      <p className="text-text-secondary text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}
