import type { HeroData } from '@/types/index';

export const heroData: HeroData = {
  name: 'Ram R. Sharma',
  tagline: 'Building scalable REST APIs & real-time systems with PHP, Laravel, Node.js and AWS.',
  roles: [
    'Backend Developer',
    'Laravel Developer',
    'API Architect',
    'AWS Cloud Enthusiast',
  ],
  stats: [
    { label: 'Years Experience', value: '2+' },
    { label: 'Projects Delivered', value: '15+' },
    { label: 'Technologies', value: '10+' },
    { label: 'Happy Clients', value: '5+' },
  ],
  resumeUrl: '/resume.pdf',
  githubUrl: 'https://github.com/sharmaram10298',
  linkedinUrl: 'https://www.linkedin.com/feed/',
};

if (import.meta.env.DEV) {
  console.assert(heroData.stats.length === 4, 'Hero stats must have exactly 4 items');
  console.assert(heroData.roles.length >= 1, 'Hero roles must have at least 1 item');
}
