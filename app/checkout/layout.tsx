import type { Metadata } from 'next';
import { SITE_URL, SITE_NAME, OG_IMAGE } from '../lib/seo';

export const metadata: Metadata = {
  title: 'Get Premium Access — Claude Architect Prep',
  description:
    'Unlock 150+ real exam questions, all 5 domains, premium study notes, and timed simulations for the Claude Certified Architect (Foundations) exam. One-time payment, unlimited access. 50% off today.',
  alternates: {
    canonical: `${SITE_URL}/checkout`,
  },
  openGraph: {
    title: 'Get Premium Access — Claude Architect Prep',
    description: 'One-time payment. Unlimited access. 150+ exam questions, 5 domains, detailed explanations. 50% off today with code CLAUDEEXAM.',
    url: `${SITE_URL}/checkout`,
    siteName: SITE_NAME,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Claude Architect Prep Premium Access' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Get Premium Access — Claude Architect Prep',
    description: 'Unlimited access to all Claude Foundations exam prep content. 50% off today.',
    images: [OG_IMAGE],
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
