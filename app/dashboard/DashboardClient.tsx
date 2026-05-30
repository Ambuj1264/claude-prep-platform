'use client';
import { signOut } from 'next-auth/react';
import { Brain, CheckCircle, Clock, Tag, ArrowRight, LogOut } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface Transaction {
  id: string;
  orderId: string;
  paymentId: string | null;
  amount: number;
  currency: string;
  status: string;
  couponCode: string | null;
  couponDiscount: number | null;
  createdAt: string;
}

interface Props {
  user: { name: string; email: string; image: string | null; hasPremiumAccess: boolean };
  transactions: Transaction[];
}

export function DashboardClient({ user, transactions }: Props) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', padding: '0 0 64px' }}>
      {/* Header */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'var(--bg-base)', borderBottom: '1px solid var(--surface-border)',
      }}>
        <div className="page-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60 }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Brain size={17} color="white" />
            </div>
            <span style={{ fontWeight: 800, fontSize: '1.0625rem', color: 'var(--text-primary)' }}>Claude Architect</span>
          </Link>
          <button
            className="btn-ghost"
            onClick={() => signOut({ callbackUrl: '/' })}
            style={{ fontSize: '0.8125rem' }}
          >
            <LogOut size={14} /> Sign out
          </button>
        </div>
      </header>

      <main className="page-container" style={{ paddingTop: 32 }}>
        {/* Profile */}
        <div className="glass-card" style={{ padding: '28px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 20 }}>
          {user.image && (
            <Image src={user.image} alt={user.name} width={64} height={64} style={{ borderRadius: '50%' }} />
          )}
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: '1.125rem' }}>{user.name}</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{user.email}</div>
          </div>
          {user.hasPremiumAccess ? (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '6px 14px', borderRadius: 9999,
              background: 'var(--color-primary-glow)', border: '1px solid rgba(217,119,87,0.3)',
              color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.8rem',
            }}>
              <CheckCircle size={14} /> Premium
            </div>
          ) : (
            <Link href="/checkout" className="btn-primary" style={{ fontSize: '0.875rem', textDecoration: 'none' }}>
              Upgrade
            </Link>
          )}
        </div>

        {/* Premium content access */}
        {user.hasPremiumAccess ? (
          <div className="glass-card" style={{ padding: '28px', marginBottom: 24 }}>
            <h2 style={{ fontWeight: 700, marginBottom: 16, fontSize: '1.125rem', display: 'flex', alignItems: 'center', gap: 8 }}>
              <CheckCircle size={18} style={{ color: 'var(--color-primary)' }} />
              Real Test Questions Unlocked
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: 20, lineHeight: 1.6 }}>
              You have full access to all premium exam content including real test questions and detailed explanations.
            </p>
            <Link href="/" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              Start Practicing <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="glass-card" style={{ padding: '28px', marginBottom: 24, borderColor: 'rgba(217,119,87,0.2)' }}>
            <h2 style={{ fontWeight: 700, marginBottom: 12, fontSize: '1.125rem' }}>Unlock Real Test Questions</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: 20 }}>
              Get access to real exam questions and pass the Claude Certified Architect exam.
            </p>
            <Link href="/checkout" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              Get Premium Access — $60 <ArrowRight size={16} />
            </Link>
          </div>
        )}

        {/* Payment history */}
        <div className="glass-card" style={{ padding: '28px' }}>
          <h2 style={{ fontWeight: 700, marginBottom: 20, fontSize: '1.125rem' }}>Payment History</h2>
          {transactions.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>No transactions yet.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {transactions.map(t => (
                <div key={t.id} style={{
                  padding: '16px', borderRadius: 10,
                  background: 'var(--bg-surface)', border: '1px solid var(--surface-border)',
                  display: 'flex', alignItems: 'center', gap: 16,
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>
                        ${t.amount} {t.currency}
                      </span>
                      {t.couponCode && (
                        <span style={{
                          display: 'inline-flex', alignItems: 'center', gap: 4,
                          padding: '2px 8px', borderRadius: 9999,
                          background: 'var(--color-primary-glow)', color: 'var(--color-primary)',
                          fontSize: '0.7rem', fontWeight: 600,
                        }}>
                          <Tag size={10} /> {t.couponCode}
                        </span>
                      )}
                    </div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                      {new Date(t.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem', marginTop: 2, fontFamily: 'monospace' }}>
                      {t.orderId}
                    </div>
                  </div>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    padding: '4px 12px', borderRadius: 9999, fontSize: '0.75rem', fontWeight: 600,
                    background: t.status === 'paid' ? 'rgba(34,197,94,0.1)' : 'rgba(100,116,139,0.1)',
                    color: t.status === 'paid' ? '#22c55e' : 'var(--text-muted)',
                  }}>
                    {t.status === 'paid' ? <CheckCircle size={12} /> : <Clock size={12} />}
                    {t.status}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
