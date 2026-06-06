import type { Achievement } from '@/types/index';

export const achievements: Achievement[] = [
  {
    id: 'realtime-systems',
    title: 'Real-time Systems',
    icon: 'Zap',
    description:
      'Engineered WebSocket-based real-time event broadcasting for live order tracking in a logistics platform, supporting thousands of concurrent connections with sub-second latency.',
  },
  {
    id: 'gps-tracking',
    title: 'GPS Tracking Integration',
    icon: 'MapPin',
    description:
      'Integrated high-frequency GPS data pipelines using Firebase and third-party location APIs, enabling real-time fleet tracking with sub-second location updates across mobile and web clients.',
  },
  {
    id: 'jwt-authentication',
    title: 'JWT Authentication Systems',
    icon: 'Shield',
    description:
      'Designed and implemented stateless JWT authentication with refresh token rotation and role-based access control across multiple Laravel API services, significantly improving security posture.',
  },
  {
    id: 'firebase-notifications',
    title: 'Firebase Push Notifications',
    icon: 'Bell',
    description:
      'Built a scalable push notification delivery system using Firebase Cloud Messaging, handling targeted and broadcast notifications for Android and iOS users across multiple production applications.',
  },
  {
    id: 'payment-gateways',
    title: 'Payment Gateway Integrations',
    icon: 'CreditCard',
    description:
      'Integrated Razorpay and other payment gateway APIs with idempotent transaction handling and webhook verification, enabling secure in-app payments with full audit trails.',
  },
];

if (import.meta.env.DEV) {
  console.assert(achievements.length === 5, `achievements must have exactly 5 items, got ${achievements.length}`);
}
