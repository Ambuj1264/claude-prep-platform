import Link from 'next/link';
import { Brain } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy — Claude Architect',
  description: 'Privacy Policy for Claude Architect Foundations Exam Prep Platform.',
};

export default function PrivacyPage() {
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
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: 8, color: 'var(--text-primary)' }}>Privacy Policy</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: 40 }}>Last updated: May 2025</p>

        <Section title="1. Information We Collect">
          <p>When you sign in with Google, we collect your name, email address, and profile image solely for account creation and identification purposes. We do not collect any additional personal data beyond what Google provides during the OAuth flow.</p>
          <p style={{ marginTop: 12 }}>We also collect payment-related information (order ID, payment ID, amount, coupon used) via Razorpay to confirm and record your purchase. We do not store card numbers or any sensitive payment details — all payment processing is handled entirely by Razorpay.</p>
        </Section>

        <Section title="2. How We Use Your Information">
          <ul style={{ paddingLeft: '1.5rem', lineHeight: 2 }}>
            <li>To authenticate your account via Google OAuth.</li>
            <li>To grant or revoke access to premium content based on payment status.</li>
            <li>To maintain a record of your transactions for billing and support purposes.</li>
            <li>To improve the platform and fix technical issues.</li>
          </ul>
          <p style={{ marginTop: 12 }}>We do not sell, rent, or share your personal information with any third parties for marketing purposes.</p>
        </Section>

        <Section title="3. Data Storage">
          <p>Your account data is stored securely in MongoDB Atlas (hosted on AWS). Payment records are stored in our database after Razorpay confirms a successful transaction. All database connections use TLS encryption in transit.</p>
        </Section>

        <Section title="4. Cookies & Sessions">
          <p>We use secure HTTP-only session cookies to keep you logged in. These cookies are managed by NextAuth and do not track you across other websites. No third-party tracking or advertising cookies are used.</p>
        </Section>

        <Section title="5. Third-Party Services">
          <ul style={{ paddingLeft: '1.5rem', lineHeight: 2 }}>
            <li><strong>Google OAuth</strong> — for authentication.</li>
            <li><strong>Razorpay</strong> — for payment processing.</li>
            <li><strong>Vercel</strong> — for hosting and serving the platform.</li>
            <li><strong>MongoDB Atlas</strong> — for database storage.</li>
          </ul>
          <p style={{ marginTop: 12 }}>Each of these services has its own privacy policy and handles data in accordance with applicable laws.</p>
        </Section>

        <Section title="6. Data Retention">
          <p>We retain your account information for as long as your account is active. If you wish to delete your account and all associated data, please contact us at the email below and we will process the request within 7 business days.</p>
        </Section>

        <Section title="7. Children's Privacy">
          <p>This platform is not directed at children under the age of 13. We do not knowingly collect personal information from anyone under 13.</p>
        </Section>

        <Section title="8. Changes to This Policy">
          <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated date. Continued use of the platform after changes constitutes acceptance of the revised policy.</p>
        </Section>

        <Section title="9. Contact">
          <p>For any privacy-related questions or data deletion requests, please contact us at <a href="mailto:support@claude-prep-platform.vercel.app" style={{ color: 'var(--color-primary)' }}>support@claude-prep-platform.vercel.app</a> or visit our <Link href="/contact" style={{ color: 'var(--color-primary)' }}>Contact page</Link>.</p>
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
