import { cn } from '@/lib/utils';

interface NavLinkProps {
  href: string;
  label: string;
  isActive: boolean;
  onClick?: () => void;
}

export function NavLink({ href, label, isActive, onClick }: NavLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    onClick?.();
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={cn(
        'relative text-sm font-medium transition-colors duration-200 hover:text-accent-primary',
        isActive ? 'text-accent-primary' : 'text-text-secondary',
        'after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-accent-primary after:transition-transform after:duration-200',
        isActive && 'after:scale-x-100'
      )}
    >
      {label}
    </a>
  );
}
