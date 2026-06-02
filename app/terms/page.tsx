import Link from 'next/link';
import { Brain } from 'lucide-react';

import type { Metadata } from 'next';
import { SITE_URL } from '../lib/seo';

export const metadata: Metadata = {
  title: 'Terms & Conditions — Claude Architect Prep',
  description: 'Read the Terms and Conditions governing use of Claude Architect Prep, the exam preparation platform for the Claude Certified Architect Foundations certification.',
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
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: 8, color: 'var(--text-primary)' }}>Terms & Conditions</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: 40 }}>Last updated: May 2025</p>

        <Section title="1. Acceptance of Terms">
          <p>By accessing or using Claude Architect ("the Platform"), you agree to be bound by these Terms & Conditions. If you do not agree, please do not use the Platform.</p>
        </Section>

        <Section title="2. Description of Service">
          <p>Claude Architect is an online exam preparation platform for the Anthropic Claude Certified Architect (Foundations) certification. The Platform offers free practice questions and premium paid content including real exam-style questions with detailed explanations.</p>
        </Section>

        <Section title="3. Account Registration">
          <p>You must sign in with a valid Google account to access premium content. You are responsible for maintaining the confidentiality of your account and for all activities that occur under your account. You agree to provide accurate information and to notify us immediately of any unauthorized use.</p>
        </Section>

        <Section title="4. Premium Access & Payment">
          <p>Access to real exam questions requires a one-time payment. All prices are displayed at checkout before you complete a purchase. By proceeding with payment, you agree to pay the full amount shown.</p>
          <p style={{ marginTop: 12 }}>Payments are processed securely by Razorpay. We do not store your payment card details.</p>
        </Section>

        <Section title="5. No Refund Policy">
          <div style={{
            background: 'rgba(239,68,68,0.07)',
            border: '1px solid rgba(239,68,68,0.25)',
            borderRadius: 10,
            padding: '16px 20px',
            marginBottom: 16,
          }}>
            <p style={{ color: '#DC2626', fontWeight: 700, fontSize: '1rem', marginBottom: 6 }}>⚠️ All Sales Are Final — No Refunds</p>
            <p style={{ color: 'var(--text-secondary)' }}>All payments made on Claude Architect are <strong>non-refundable</strong>. Once premium access is granted, no refund or credit will be issued under any circumstances, including but not limited to: change of mind, failure to pass the exam, duplicate purchases, or dissatisfaction with content. Please review the free content before purchasing to ensure the Platform meets your needs.</p>
          </div>
          <p>If you believe you were charged in error, contact us within 7 days of the transaction and we will investigate.</p>
        </Section>

        <Section title="6. Intellectual Property">
          <p>All content on the Platform — including questions, explanations, notes, code, and design — is the intellectual property of Claude Architect and is protected by applicable copyright laws. You may not reproduce, distribute, copy, sell, or exploit any content from the Platform without express written permission.</p>
        </Section>

        <Section title="7. Prohibited Conduct">
          <ul style={{ paddingLeft: '1.5rem', lineHeight: 2 }}>
            <li>Sharing your account credentials with others.</li>
            <li>Screenshotting, recording, or distributing premium exam content.</li>
            <li>Using automated tools to scrape or download content.</li>
            <li>Attempting to bypass authentication or payment gates.</li>
            <li>Misrepresenting affiliation with Anthropic or Claude Architect.</li>
          </ul>
          <p style={{ marginTop: 12 }}>Violation of these rules may result in immediate account termination without refund.</p>
        </Section>

        <Section title="8. Disclaimer of Warranties">
          <p>The Platform is provided "as is" without warranties of any kind. We do not guarantee that using the Platform will result in passing the Claude Certified Architect exam. Exam content and structure may change at Anthropic's discretion, and we make no representation that our material is current or complete.</p>
        </Section>

        <Section title="9. Limitation of Liability">
          <p>To the fullest extent permitted by law, Claude Architect shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the Platform, including loss of data, loss of profits, or failure to pass any examination.</p>
        </Section>

        <Section title="10. Changes to Terms">
          <p>We reserve the right to update these Terms at any time. Continued use of the Platform after any changes constitutes your acceptance of the new Terms.</p>
        </Section>

        <Section title="11. Governing Law">
          <p>These Terms are governed by the laws of India. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts of India.</p>
        </Section>

        <Section title="12. Contact">
          <p>For questions about these Terms, please visit our <Link href="/contact" style={{ color: 'var(--color-primary)' }}>Contact page</Link>.</p>
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
        <span>© 2025 Claude Architect</span>
        <Link href="/privacy" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Privacy Policy</Link>
        <Link href="/terms" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Terms & Conditions</Link>
        <Link href="/contact" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Contact Us</Link>
      </div>
    </footer>
  );
}
