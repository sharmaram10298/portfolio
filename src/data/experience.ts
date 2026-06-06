import type { ExperienceEntry } from '@/types/index';

export const experiences: ExperienceEntry[] = [
  // ─── Most Recent ──────────────────────────────────────────────────────────
  {
    company: 'TagDog Media Pvt. Ltd. / Neoxuse Spotly Media LLP',
    role: 'Backend Developer',
    period: 'May 2024 – Present',
    location: 'Mumbai, India',
    responsibilities: [
      'Developing backend APIs for LOCOMATE — a real-world locomotion-based virtual mall application using Node.js, REST APIs, GPS Tracking, and Real-time Systems.',
      'Built Node.js APIs to process real-time user movement data (GPS, steps, heading) and designed coordinate-mapping logic to convert real-world movement into virtual indoor navigation.',
      'Implemented APIs for indoor routing, store discovery, and dynamic path updates with real-time movement tracking and continuous position updates.',
      'Developed and maintained scalable backend systems for SPOTLY — a high-traffic entertainment app using Core PHP, MySQL, Firebase, and AWS.',
      'Built and optimized secure REST APIs with JWT authentication for mobile and web integration; deployed and managed applications on AWS EC2, S3, and RDS.',
      'Implemented real-time push notifications using Firebase Cloud Messaging (FCM) and managed hosting environments using cPanel and WHM.',
    ],
  },

  // ─── Previous ─────────────────────────────────────────────────────────────
  {
    company: 'Hands In Technology',
    role: 'Backend Developer',
    period: 'Dec 2023 – May 2024',
    location: 'Mumbai, India',
    responsibilities: [
      'Developed backend systems using PHP (Laravel) and built REST APIs integrated with MySQL databases.',
      'Implemented authentication and backend logic for web applications following clean code practices using SOLID and DRY principles.',
      'Managed hosting and domain configuration using cPanel and GoDaddy.',
    ],
  },
];

if (import.meta.env.DEV) {
  experiences.forEach((entry, i) => {
    console.assert(
      entry.responsibilities.length >= 3,
      `Experience[${i}] "${entry.company}" must have at least 3 responsibilities, got ${entry.responsibilities.length}`,
    );
  });
}
