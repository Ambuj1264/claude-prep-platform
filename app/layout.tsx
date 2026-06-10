import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { AuthProvider } from './components/AuthProvider';
import { Analytics } from '@vercel/analytics/next';
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, OG_IMAGE, TWITTER_HANDLE, GLOBAL_KEYWORDS } from './lib/seo';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Claude Architect Prep — Claude Certified Architect Foundations Exam Study Platform',
    template: '%s | Claude Architect Prep',
  },
  description: SITE_DESCRIPTION,
  keywords: GLOBAL_KEYWORDS,
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
    site: TWITTER_HANDLE,
    title: 'Claude Architect Prep — Foundations Exam Study Platform',
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
  verification: {
    google: 'UMmlhDmdEU-TeuKW5JYRn8pa2pgORMIqmjZ108HNFTg',
  },
  category: 'education',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#D97757" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <AuthProvider>{children}</AuthProvider>
        <Analytics />
        {/* Microsoft Clarity — session recording & heatmaps */}
        <Script
          id="ms-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){
  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window,document,"clarity","script","x4ymrddej4");`,
          }}
        />
      </body>
    </html>
  );
}
