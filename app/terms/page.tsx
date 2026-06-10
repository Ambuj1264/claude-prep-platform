import Link from 'next/link';
import { Brain } from 'lucide-react';

import type { Metadata } from 'next';
import { SITE_URL } from '../lib/seo';

export const metadata: Metadata = {
  title: 'Terms & Conditions — Claude Architect Prep',
  description:
    'Terms and Conditions for Claude Architect Prep — an independent educational platform for the Claude Certified Architect (Foundations) exam. Not affiliated with Anthropic.',
  alternates: { canonical: `${SITE_URL}/terms` },
  robots: { index: true, follow: false },
};

export default function TermsPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', padding: '0 0 64px' }}>
      {/* Header */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'var(--bg-base)', borderBottom: '1px solid var(--surface-border)',
      }}>
        <div className="page-container" style={{ display: 'flex', alignItems: 'center', height: 60 }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Brain size={17} color="white" />
            </div>
            <span style={{ fontWeight: 800, fontSize: '1.0625rem', color: 'var(--text-primary)' }}>Claude Architect</span>
          </Link>
        </div>
      </header>

      <main className="page-container" style={{ paddingTop: 48, maxWidth: 760 }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: 8, color: 'var(--text-primary)' }}>Terms &amp; Conditions</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: 40 }}>Last updated: June 2025</p>

        {/* Educational Disclaimer Banner */}
        <div style={{
          background: 'rgba(59,130,246,0.07)',
          border: '1px solid rgba(59,130,246,0.25)',
          borderRadius: 10,
          padding: '16px 20px',
          marginBottom: 36,
        }}>
          <p style={{ fontWeight: 700, color: '#2563EB', marginBottom: 6 }}>📚 Independent Educational Platform — Not Affiliated with Anthropic</p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: 1.75 }}>
            Claude Architect Prep is an <strong>independent, unofficial, third-party study platform</strong> intended solely for personal educational and exam-preparation purposes. It is <strong>not affiliated with, endorsed by, licensed by, or in any way officially connected to Anthropic PBC</strong> or any of its subsidiaries. References to &quot;Claude,&quot; &quot;Claude Certified Architect,&quot; &quot;Anthropic,&quot; and related terms are used for descriptive, nominative-fair-use purposes only to identify the subject matter of study. All such marks are the property of their respective owners.
          </p>
        </div>

        <Section title="1. Acceptance of Terms">
          <p>By accessing or using Claude Architect Prep (&quot;the Platform&quot;), you agree to be bound by these Terms &amp; Conditions. If you do not agree, please do not use the Platform.</p>
        </Section>

        <Section title="2. Educational Purpose Only">
          <p>The Platform is provided <strong>strictly for personal, non-commercial, educational use</strong>. All content — including practice questions, explanations, study notes, and domain guides — is created independently to help individuals prepare for third-party certification exams. The Platform does not offer professional advice, business consulting, legal guidance, or any service beyond educational study materials.</p>
          <p style={{ marginTop: 12 }}>You may not use the Platform or any of its content for any commercial purpose, resale, redistribution, professional training services, or as a substitute for official Anthropic documentation or certification materials.</p>
        </Section>

        <Section title="3. No Affiliation with Anthropic">
          <p>Claude Architect Prep is <strong>not affiliated with, sponsored by, endorsed by, or officially connected to Anthropic PBC</strong> in any way. The certification exam referred to on this platform (&quot;Claude Certified Architect Foundations&quot;) is administered solely by Anthropic. We make no claim to represent or speak on behalf of Anthropic.</p>
          <p style={{ marginTop: 12 }}>Anthropic may change, update, retire, or alter the exam at any time. We make no warranty that our content reflects the current or future state of the official certification exam.</p>
        </Section>

        <Section title="4. Description of Service">
          <p>Claude Architect Prep is an online exam preparation platform offering free practice questions and premium paid content including real exam-style questions, detailed explanations, study notes, and timed simulations — all designed for personal educational use only.</p>
        </Section>

        <Section title="5. Account Registration">
          <p>You must sign in with a valid Google account to access premium content. You are responsible for maintaining the confidentiality of your account and for all activities that occur under your account. You agree to provide accurate information and to notify us immediately of any unauthorized use.</p>
        </Section>

        <Section title="6. Premium Access &amp; Payment">
          <p>Access to premium educational content requires a one-time payment. All prices are displayed at checkout before you complete a purchase. By proceeding with payment, you agree to pay the full amount shown.</p>
          <p style={{ marginTop: 12 }}>Payments are processed securely by Razorpay. We do not store your payment card details.</p>
        </Section>

        <Section title="7. No Refund Policy">
          <div style={{
            background: 'rgba(239,68,68,0.07)',
            border: '1px solid rgba(239,68,68,0.25)',
            borderRadius: 10,
            padding: '16px 20px',
            marginBottom: 16,
          }}>
            <p style={{ color: '#DC2626', fontWeight: 700, fontSize: '1rem', marginBottom: 6 }}>⚠️ All Sales Are Final — No Refunds</p>
            <p style={{ color: 'var(--text-secondary)' }}>All payments made on Claude Architect Prep are <strong>non-refundable</strong>. Once premium access is granted, no refund or credit will be issued under any circumstances, including but not limited to: change of mind, failure to pass the exam, duplicate purchases, or dissatisfaction with content. Please review the free content before purchasing to ensure the Platform meets your needs.</p>
          </div>
          <p>If you believe you were charged in error, contact us within 7 days of the transaction and we will investigate.</p>
        </Section>

        <Section title="8. Intellectual Property">
          <p>All independently created content on the Platform — including original practice questions, explanations, notes, code examples, and design — is the intellectual property of Claude Architect Prep and is protected by applicable copyright laws. You may not reproduce, distribute, copy, sell, or exploit any content from the Platform without express written permission.</p>
          <p style={{ marginTop: 12 }}>This Platform does not claim ownership over any Anthropic trademarks, official exam content, or proprietary Anthropic materials. Any references to Anthropic products or the Claude certification are made under nominative fair use for descriptive purposes.</p>
        </Section>

        <Section title="9. Prohibited Conduct">
          <ul style={{ paddingLeft: '1.5rem', lineHeight: 2 }}>
            <li>Sharing your account credentials with others.</li>
            <li>Screenshotting, recording, or distributing premium educational content.</li>
            <li>Using automated tools to scrape or download content.</li>
            <li>Attempting to bypass authentication or payment gates.</li>
            <li>Misrepresenting affiliation with Anthropic or Claude Architect Prep.</li>
            <li>Using the Platform for any commercial, business, or resale purpose.</li>
          </ul>
          <p style={{ marginTop: 12 }}>Violation of these rules may result in immediate account termination without refund.</p>
        </Section>

        <Section title="10. Disclaimer of Warranties">
          <p>The Platform is provided &quot;as is&quot; without warranties of any kind. We do not guarantee that using the Platform will result in passing the Claude Certified Architect exam. Exam content, structure, and passing criteria may change at Anthropic&apos;s discretion at any time, and we make no representation that our material is current, complete, or officially aligned with any version of the exam.</p>
        </Section>

        <Section title="11. Limitation of Liability">
          <p>To the fullest extent permitted by law, Claude Architect Prep, its owner, operators, and contributors shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the Platform, including loss of data, loss of profits, or failure to pass any examination. The Platform is an independent educational tool and accepts no responsibility for exam outcomes.</p>
        </Section>

        <Section title="12. Changes to Terms">
          <p>We reserve the right to update these Terms at any time. Continued use of the Platform after any changes constitutes your acceptance of the new Terms.</p>
        </Section>

        <Section title="13. Governing Law">
          <p>These Terms are governed by the laws of India. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts of India.</p>
        </Section>

        <Section title="14. Contact">
          <p>For questions about these Terms, please visit our <Link href="/contact" style={{ color: 'var(--color-primary)' }}>Contact page</Link> or email us at <a href="mailto:placedai@outlook.com" style={{ color: 'var(--color-primary)' }}>placedai@outlook.com</a>.</p>
        </Section>
      </main>

      <Footer />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 36 }}>
      <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>{title}</h2>
      <div style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: 1.75 }}>{children}</div>
    </div>
  );
}

function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--surface-border)', padding: '20px 0', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8125rem' }}>
      <div className="page-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px 20px' }}>
        <span>© 2025 Claude Architect Prep — Independent Educational Platform</span>
        <Link href="/privacy" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Privacy Policy</Link>
        <Link href="/terms" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Terms &amp; Conditions</Link>
        <Link href="/contact" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Contact Us</Link>
      </div>
    </footer>
  );
}
