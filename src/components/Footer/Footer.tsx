import { Github, Linkedin, MessageCircle, ArrowUp } from 'lucide-react';

const quickLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const socialLinks = [
  {
    icon: <Github size={18} />,
    href: 'https://github.com/sharmaram10298',
    label: 'GitHub profile',
  },
  {
    icon: <Linkedin size={18} />,
    href: 'https://www.linkedin.com/feed/',
    label: 'LinkedIn profile',
  },
  {
    icon: <MessageCircle size={18} />,
    href: 'https://wa.me/918779169391',
    label: 'WhatsApp contact',
  },
];

export function Footer() {
  const handleBackToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-bg-secondary border-t border-white/10 py-12 px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-bold text-text-primary">Ram R. Sharma</h3>
            <p className="text-text-secondary text-sm leading-relaxed">
              Backend Developer crafting scalable APIs and cloud-native solutions.
            </p>
            {/* Social links */}
            <div className="flex gap-3 mt-2">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-text-secondary hover:text-accent-primary hover:border-accent-primary/40 transition-colors"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-text-primary text-sm">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-text-secondary text-sm hover:text-accent-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Back to top */}
          <div className="flex flex-col gap-3 md:items-end">
            <button
              onClick={handleBackToTop}
              aria-label="Back to top"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 text-text-secondary hover:text-accent-primary hover:border-accent-primary/40 transition-colors text-sm min-h-[44px]"
            >
              <ArrowUp size={16} />
              Back to Top
            </button>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-6 text-center">
          <p className="text-text-secondary text-xs">
            © 2024 Ram R. Sharma. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
