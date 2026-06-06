import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassmorphismCardProps {
  children: React.ReactNode;
  className?: string;
}

export function GlassmorphismCard({ children, className }: GlassmorphismCardProps) {
  return (
    <motion.div
      className={cn(
        'bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg',
        className
      )}
      whileHover={{
        boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)',
        borderColor: 'rgba(59, 130, 246, 0.4)',
      }}
      transition={{ duration: 0.15 }}
    >
      {children}
    </motion.div>
  );
}
