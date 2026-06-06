import type { Service } from '@/types/index';

export const services: Service[] = [
  {
    id: 'api-development',
    title: 'API Development & Integration',
    icon: 'Code2',
    description:
      'I design and build robust, versioned RESTful APIs that serve as the backbone of web and mobile applications. From authentication flows and rate limiting to third-party service integrations — including payment gateways, OpenAI, and Firebase — I deliver clean, well-documented APIs that are easy to consume and maintain.',
  },
  {
    id: 'backend-development',
    title: 'Backend Development',
    icon: 'Server',
    description:
      'I architect and develop high-performance server-side systems using Laravel and PHP, following SOLID principles and clean architecture patterns. Whether it is building multi-tenant SaaS platforms, real-time event-driven systems, or complex business logic engines, I deliver maintainable backends that scale with your product.',
  },
  {
    id: 'aws-cloud-deployment',
    title: 'AWS Cloud Deployment',
    icon: 'Cloud',
    description:
      'I deploy and manage production-grade applications on AWS, leveraging EC2 for compute, S3 for object storage, and RDS for managed relational databases. I configure auto-scaling groups, IAM policies, and environment pipelines to ensure your infrastructure is secure, cost-efficient, and resilient under load.',
  },
  {
    id: 'ai-integration',
    title: 'AI Integration',
    icon: 'Brain',
    description:
      'I integrate large language model APIs — primarily OpenAI — into existing backend systems to automate content generation, intelligent search, and conversational workflows. I handle prompt engineering, token optimization, and response parsing to deliver AI features that are reliable, cost-aware, and production-ready.',
  },
  {
    id: 'database-design',
    title: 'Database Design & Optimization',
    icon: 'Database',
    description:
      'I design normalized relational schemas for MySQL and RDS that balance data integrity with query performance. I apply indexing strategies, query profiling, and caching layers to eliminate bottlenecks in high-read workloads, ensuring your database remains fast and consistent as data volumes grow.',
  },
];

if (import.meta.env.DEV) {
  console.assert(services.length === 5, `services must have exactly 5 items, got ${services.length}`);
}
