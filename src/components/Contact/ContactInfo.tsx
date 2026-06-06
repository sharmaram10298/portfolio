import { Mail, Linkedin, Github, MessageCircle, Briefcase, Phone } from 'lucide-react';

export function ContactInfo() {
  const links = [
    {
      icon: <Mail size={20} />,
      label: 'Email',
      href: 'mailto:sharmaram10298@gmail.com',
      text: 'sharmaram10298@gmail.com',
    },
    {
      icon: <Phone size={20} />,
      label: 'Phone',
      href: 'tel:+918779169391',
      text: '+91 8779169391',
    },
    {
      icon: <MessageCircle size={20} />,
      label: 'WhatsApp',
      href: 'https://wa.me/918779169391',
      text: 'WhatsApp: +91 8779169391',
    },
    {
      icon: <Linkedin size={20} />,
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/feed/',
      text: 'linkedin.com/in/ram-r-sharma',
    },
    {
      icon: <Github size={20} />,
      label: 'GitHub',
      href: 'https://github.com/sharmaram10298',
      text: 'github.com/sharmaram10298',
    },
    {
      icon: <Briefcase size={20} />,
      label: 'Naukri Profile',
      href: 'https://www.naukri.com/mnjuser/profile',
      text: 'naukri.com — Ram R. Sharma',
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-xl font-bold text-text-primary mb-2">Get In Touch</h3>
        <p className="text-text-secondary text-sm leading-relaxed">
          Open to freelance projects and full-time opportunities.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className="flex items-center gap-3 text-text-secondary hover:text-accent-primary transition-colors group"
          >
            <div className="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center text-accent-primary group-hover:bg-accent-primary/20 transition-colors flex-shrink-0">
              {link.icon}
            </div>
            <span className="text-sm">{link.text}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
