import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Claude Architect Prep',
    short_name: 'Architect Prep',
    description:
      'The #1 exam prep platform for the Claude Certified Architect (Foundations) certification.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0f1117',
    theme_color: '#D97757',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    categories: ['education'],
  };
}
