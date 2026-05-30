import Link from 'next/link';
import { Brain, Mail, Clock, MessageSquare } from 'lucide-react';

export const metadata = {
  title: 'Contact Us — Claude Architect',
  description: 'Get in touch with the Claude Architect team for support or queries.',
};

export default function ContactPage() {
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

      <main className="page-container" style={{ paddingTop: 48, maxWidth: 640 }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: 8, color: 'var(--text-primary)' }}>Contact Us</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.7, marginBottom: 40 }}>
          Have a question, found an issue, or need help with your account? We're here to help.
        </p>

        {/* Contact cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 40 }}>

          <div className="glass-card" style={{ padding: '24px 28px', display: 'flex', alignItems: 'flex-start', gap: 18 }}>
            <div style={{ width: 44, height: 44, borderRadius: 11, background: 'var(--color-primary-glow)', border: '1px solid rgba(217,119,87,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Mail size={20} color="var(--color-primary)" />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 4, color: 'var(--text-primary)' }}>Email Support</div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: 8, lineHeight: 1.6 }}>
                For account access issues, payment queries, or general support, email us directly.
              </p>
              <a
                href="mailto:placedai@outlook.com"
                style={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none' }}
              >
                placedai@outlook.com
              </a>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '24px 28px', display: 'flex', alignItems: 'flex-start', gap: 18 }}>
            <div style={{ width: 44, height: 44, borderRadius: 11, background: 'var(--color-primary-glow)', border: '1px solid rgba(217,119,87,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Clock size={20} color="var(--color-primary)" />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 4, color: 'var(--text-primary)' }}>Response Time</div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.6 }}>
                We typically respond within <strong>24–48 hours</strong> on business days (Monday–Friday). Queries sent over the weekend will be addressed the following Monday.
              </p>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '24px 28px', display: 'flex', alignItems: 'flex-start', gap: 18 }}>
            <div style={{ width: 44, height: 44, borderRadius: 11, background: 'var(--color-primary-glow)', border: '1px solid rgba(217,119,87,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <MessageSquare size={20} color="var(--color-primary)" />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 4, color: 'var(--text-primary)' }}>What to Include</div>
              <ul style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 2, paddingLeft: '1.25rem' }}>
                <li>Your registered email address</li>
                <li>Order ID or payment reference (for billing issues)</li>
                <li>A clear description of the problem or question</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Refund notice */}
        <div style={{
          background: 'rgba(239,68,68,0.07)',
          border: '1px solid rgba(239,68,68,0.25)',
          borderRadius: 12,
          padding: '20px 24px',
          marginBottom: 40,
        }}>
          <p style={{ fontWeight: 700, color: '#DC2626', marginBottom: 6 }}>⚠️ Refund Policy</p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.7 }}>
            All payments are <strong>non-refundable</strong>. Please review our free content before purchasing to ensure the platform meets your expectations. If you believe you were charged in error, contact us within 7 days of the transaction with your payment details.
          </p>
        </div>

        <div style={{ textAlign: 'center' }}>
          <Link href="/" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-flex' }}>
            ← Back to Home
          </Link>
        </div>
      </main>

      <Footer />
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
