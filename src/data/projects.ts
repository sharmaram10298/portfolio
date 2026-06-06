import type { Project } from '@/types/index';

export const projects: Project[] = [
  {
    id: 'locomate',
    name: 'Locomate',
    description:
      'A real-world locomotion-based virtual mall application that converts physical movement (GPS, steps, heading) into indoor virtual navigation. Users can walk through a virtual mall in real time.',
    features: [
      'Real-time GPS tracking and user movement processing via Node.js APIs',
      'Coordinate-mapping logic converting real-world movement to virtual indoor navigation',
      'Indoor routing, store discovery, and dynamic path update APIs',
      'Continuous position updates with real-time movement tracking',
      'RESTful API consumed by mobile clients',
    ],
    techStack: ['Node.js', 'REST APIs', 'GPS Tracking', 'Real-time Systems', 'JavaScript'],
    screenshotUrl: '/images/projects/locomate.png',
    githubUrl: null,
    liveDemoUrl: null,
  },
  {
    id: 'spotly',
    name: 'Spotly',
    description:
      'A high-traffic entertainment and social media discovery app with scalable backend systems, JWT-authenticated APIs, Firebase notifications, and AWS cloud infrastructure.',
    features: [
      'Scalable REST APIs with JWT authentication for mobile and web integration',
      'MySQL database integration with optimized queries for performance',
      'Real-time push notifications via Firebase Cloud Messaging (FCM)',
      'Deployed and managed on AWS EC2, S3, and RDS',
      'Hosted and configured using cPanel and WHM',
    ],
    techStack: ['Core PHP', 'MySQL', 'Firebase', 'AWS', 'REST APIs'],
    screenshotUrl: '/images/projects/spotly.png',
    githubUrl: null,
    liveDemoUrl: null,
  },
  {
    id: 'agmine',
    name: 'Agmine',
    description:
      'A complete agricultural management system including frontend, backend, and admin panel with Razorpay payment gateway integration and dynamic AJAX-powered features.',
    features: [
      'Complete system: frontend, backend, and admin panel',
      'Razorpay payment gateway integration',
      'Dynamic features using AJAX and JavaScript',
      'Laravel MVC architecture with MySQL database',
      'Admin panel for content and user management',
    ],
    techStack: ['Laravel', 'MySQL', 'Razorpay', 'JavaScript', 'AJAX'],
    screenshotUrl: '/images/projects/agmine.png',
    githubUrl: null,
    liveDemoUrl: null,
  },
  {
    id: 'interview-ms',
    name: 'Interview Management System',
    description:
      'An interview scheduling and tracking system with an admin panel for managing candidates and interviews, built with Laravel, JavaScript, and MySQL.',
    features: [
      'Interview scheduling and tracking system',
      'Admin panel for managing candidates and interviews',
      'Backend logic with Laravel and MySQL integration',
      'JavaScript-powered dynamic UI interactions',
    ],
    techStack: ['Laravel', 'JavaScript', 'MySQL'],
    screenshotUrl: '/images/projects/interview-ms.png',
    githubUrl: 'https://github.com/sharmaram10298',
    liveDemoUrl: null,
  },
  {
    id: 'italy-tour',
    name: 'Italy Tour App',
    description:
      'A travel application backend with APIs and admin panel built for managing user data, itineraries, and application flow for an Italy tour booking platform.',
    features: [
      'Backend APIs for travel application',
      'Admin panel for content and user management',
      'User data management and application flow',
      'Laravel MVC with MySQL database',
    ],
    techStack: ['Laravel', 'MySQL', 'REST APIs'],
    screenshotUrl: '/images/projects/italy-tour.png',
    githubUrl: 'https://github.com/sharmaram10298',
    liveDemoUrl: null,
  },
  {
    id: 'cmm-news',
    name: 'CMM News',
    description:
      'A news publishing platform with home page module and admin panel for managing content flow and backend logic, built with Laravel.',
    features: [
      'Home page module development',
      'Admin panel for editorial and content management',
      'Backend logic and content flow management',
      'Laravel-based clean MVC architecture',
    ],
    techStack: ['Laravel', 'MySQL', 'PHP'],
    screenshotUrl: '/images/projects/cmm-news.png',
    githubUrl: 'https://github.com/sharmaram10298',
    liveDemoUrl: null,
  },
];

if (import.meta.env.DEV) {
  projects.forEach((project, i) => {
    console.assert(
      project.features.length >= 3 && project.features.length <= 5,
      `Project[${i}] "${project.name}" features must be 3–5 items, got ${project.features.length}`,
    );
    console.assert(
      project.techStack.length >= 1,
      `Project[${i}] "${project.name}" must have at least 1 tech stack item`,
    );
  });
  console.assert(projects.length === 6, `projects must have exactly 6 items, got ${projects.length}`);
}
