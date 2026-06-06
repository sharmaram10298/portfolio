import { useState } from 'react';
import { Menu, Sun, Moon } from 'lucide-react';
import { navLinks } from '@/data/navigation';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';
import { NavLink } from './NavLink';
import { MobileDrawer } from './MobileDrawer';

const sectionIds = navLinks.map((l) => l.href.replace('#', ''));

export function Navbar() {
  const scrollY = useScrollPosition();
  const activeId = useScrollSpy(sectionIds);
  const { theme, toggleTheme } = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isScrolled = scrollY > 80;

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-30 transition-all duration-300',
          isScrolled
            ? 'bg-bg-primary/80 backdrop-blur-md border-b border-white/10 shadow-lg'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-lg font-bold text-text-primary hover:text-accent-primary transition-colors"
          >
            Ram R. Sharma
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                label={link.label}
                isActive={activeId === link.href.replace('#', '')}
              />
            ))}
          </nav>

          {/* Right side: theme toggle + hamburger */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-lg hover:bg-white/10 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              {theme === 'dark' ? (
                <Sun size={18} className="text-text-primary" />
              ) : (
                <Moon size={18} className="text-text-primary" />
              )}
            </button>

            {/* Hamburger — mobile only */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open navigation menu"
            >
              <Menu size={20} className="text-text-primary" />
            </button>
          </div>
        </div>
      </header>

      <MobileDrawer
        isOpen={drawerOpen}
        links={navLinks}
        activeId={activeId}
        onClose={() => setDrawerOpen(false)}
      />
    </>
  );
}
