import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from './components/AuthProvider';
import { Analytics } from '@vercel/analytics/next';
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, OG_IMAGE } from './lib/seo';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Claude Architect Prep — Claude Certified Architect Foundations Exam Study Platform',
    template: '%s | Claude Architect Prep',
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'Claude Certified Architect',
    'Anthropic certification',
    'Claude AI exam prep',
    'Claude Foundations exam',
    'MCP certification',
    'agentic AI certification',
    'Claude Code exam',
    'Anthropic exam study',
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: 'Claude Architect Prep — Foundations Exam Study Platform',
    description: SITE_DESCRIPTION,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Claude Architect Prep — Study Platform for Claude Certified Architect Foundations',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Claude Architect Prep — Foundations Exam Study Platform',
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
  verification: {
    google: '',
  },
  category: 'education',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href={SITE_URL} />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="theme-color" content="#D97757" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <AuthProvider>{children}</AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
