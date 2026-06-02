import type { Metadata } from 'next';
import AppClient from './components/AppClient';
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, OG_IMAGE } from './lib/seo';

export const metadata: Metadata = {
  title: 'Claude Architect Prep — #1 Exam Study Platform for Claude Certified Architect Foundations',
  description:
    'Pass the Claude Certified Architect (Foundations) exam with confidence. 150+ scenario-based questions, detailed explanations across all 5 domains, premium study notes, and real exam simulations. 50% off today.',
  keywords: [
    'Claude Certified Architect exam prep',
    'Claude Foundations certification',
    'Anthropic certification study guide',
    'Claude AI exam questions',
    'Claude Certified Architect practice test',
    'MCP certification exam',
    'agentic AI certification',
    'Claude Code certification',
    'Anthropic AI exam',
    'Claude architect foundations study',
  ],
  authors: [{ name: 'Claude Architect Prep' }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    title: 'Claude Architect Prep — Pass the Foundations Exam with Confidence',
    description:
      '150+ real exam questions, all 5 domains, detailed explanations. The only dedicated prep platform for the Claude Certified Architect (Foundations) certification.',
    siteName: SITE_NAME,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Claude Architect Prep — Exam Study Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Claude Architect Prep — #1 Foundations Exam Study Platform',
    description:
      'Master the Claude Certified Architect (Foundations) exam. 150+ questions, 5 domains, detailed explanations. 50% off today.',
    images: [OG_IMAGE],
  },
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
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${SITE_URL}/?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
        width: 512,
        height: 512,
      },
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'placedai@outlook.com',
        contactType: 'customer support',
      },
    },
    {
      '@type': 'Course',
      '@id': `${SITE_URL}/#course`,
      name: 'Claude Certified Architect (Foundations) Exam Prep',
      description:
        'Comprehensive exam preparation course for the Anthropic Claude Certified Architect Foundations certification. Covers all 5 exam domains with 150+ scenario-based questions, detailed explanations, and real exam simulations.',
      provider: {
        '@type': 'Organization',
        name: SITE_NAME,
        url: SITE_URL,
      },
      url: SITE_URL,
      courseMode: 'online',
      educationalLevel: 'Professional',
      teaches: [
        'Claude AI fundamentals and architecture',
        'Model Context Protocol (MCP)',
        'Agentic AI design patterns',
        'Claude Code and developer tools',
        'Responsible AI and safety principles',
        'Anthropic certification exam strategies',
      ],
      hasCourseInstance: {
        '@type': 'CourseInstance',
        courseMode: 'online',
        courseWorkload: 'PT10H',
      },
      offers: {
        '@type': 'Offer',
        url: `${SITE_URL}/checkout`,
        price: '30',
        priceCurrency: 'USD',
        priceValidUntil: '2025-12-31',
        availability: 'https://schema.org/InStock',
        category: 'Educational',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is the Claude Certified Architect (Foundations) certification?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The Claude Certified Architect (Foundations) is Anthropic\'s official certification that validates your knowledge of Claude AI models, the Model Context Protocol (MCP), agentic AI architectures, Claude Code, and responsible AI principles. It is the entry-level certification in Anthropic\'s certification program.',
          },
        },
        {
          '@type': 'Question',
          name: 'How many domains does the Claude Foundations exam cover?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The Claude Certified Architect (Foundations) exam covers 5 domains: (1) Claude AI Models and Capabilities, (2) Model Context Protocol (MCP), (3) Agentic AI Design Patterns, (4) Claude Code and Developer Tools, and (5) Responsible AI and Safety. Each domain has a specific weight in the final exam score.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the passing score for the Claude Architect Foundations exam?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The required passing score for the Claude Certified Architect (Foundations) exam is 70%. The exam consists of scenario-based multiple-choice questions testing practical knowledge across all 5 domains.',
          },
        },
        {
          '@type': 'Question',
          name: 'What does Claude Architect Prep include?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Claude Architect Prep includes 150+ scenario-based practice questions covering all 5 exam domains, 60 real exam-style test questions with a timed simulation, detailed answer explanations for every question, premium study notes for each domain, and unlimited access with no expiry. Premium access is available for a one-time payment.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the Model Context Protocol (MCP) and why is it on the exam?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The Model Context Protocol (MCP) is an open standard developed by Anthropic that enables Claude AI models to securely connect to external data sources, tools, and services. It is a core part of building agentic AI applications with Claude, which is why it is a dedicated exam domain in the Foundations certification.',
          },
        },
        {
          '@type': 'Question',
          name: 'How is Claude Code different from regular Claude AI?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Claude Code is Anthropic\'s specialized CLI tool that brings Claude AI directly into software development workflows. It can read codebases, write and edit files, run terminal commands, manage git operations, and integrate with IDEs like VS Code and JetBrains. It is distinct from the Claude chat interface and is covered as its own domain in the Foundations exam.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is Claude Architect Prep worth it for the Anthropic certification?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Claude Architect Prep is the only dedicated study platform for the Claude Certified Architect (Foundations) certification. It provides real exam-style questions with explanations that go beyond documentation reading, helping you understand the patterns and decision frameworks tested in the actual exam.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I access Claude Architect Prep on mobile?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Claude Architect Prep is fully responsive and works on desktop, tablet, and mobile browsers. You can study on any device without installing an app.',
          },
        },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: SITE_URL,
        },
      ],
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AppClient />
    </>
  );
}
