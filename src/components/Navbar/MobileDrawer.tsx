import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import type { NavLink as NavLinkType } from '@/types/index';
import { NavLink } from './NavLink';

interface MobileDrawerProps {
  isOpen: boolean;
  links: NavLinkType[];
  activeId: string;
  onClose: () => void;
}

export function MobileDrawer({ isOpen, links, activeId, onClose }: MobileDrawerProps) {
  // Close on outside click / escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          {/* Drawer */}
          <motion.div
            className="fixed inset-x-0 top-0 z-50 bg-bg-primary border-b border-white/10 p-6"
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ type: 'tween', duration: 0.25 }}
          >
            <div className="flex justify-end mb-6">
              <button
                onClick={onClose}
                aria-label="Close navigation menu"
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X size={20} className="text-text-primary" />
              </button>
            </div>
            <nav className="flex flex-col gap-6">
              {links.map((link) => (
                <NavLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  isActive={activeId === link.href.replace('#', '')}
                  onClick={onClose}
                />
              ))}
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
