import type { AboutData } from '@/types/index';

export const aboutData: AboutData = {
  summary:
    "Backend Developer with 2+ years of experience building scalable REST APIs using Core PHP, Laravel, and Node.js. Experienced in developing high-performance backend systems, real-time applications, and mobile API integrations. Skilled in AWS deployment (EC2, S3, RDS), database optimization, and secure authentication systems. Currently working on real-time movement-based virtual navigation systems. Open to remote opportunities and flexible with international time zones.",
  profileImageUrl: '/images/profile.jpg',
  roleTitle: 'Backend Developer | Laravel Developer | API Architect | AWS Cloud Enthusiast',
  specializations: [
    {
      title: 'Backend Development',
      description: 'Designing and building high-performance server-side systems and RESTful APIs.',
      icon: 'Server',
    },
    {
      title: 'Cloud Deployment',
      description: 'Deploying and managing scalable applications on AWS EC2, S3, and RDS.',
      icon: 'Cloud',
    },
    {
      title: 'API Architecture',
      description: 'Architecting clean, versioned, and documented APIs for web and mobile clients.',
      icon: 'GitBranch',
    },
  ],
};
