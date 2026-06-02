'use client';
import { useState, useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Brain, Tag, CheckCircle, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => void;
  prefill: { name?: string; email?: string };
  theme: { color: string };
}

interface RazorpayInstance {
  open: () => void;
}

// Base price in USD
const BASE_USD = 60;
const COUPON_USD = 30; // 50% off
const AUTO_COUPON = 'CLAUDEEXAM';
// INR conversion rate
const USD_TO_INR = 84;

function detectIsIndia(): boolean {
  try {
    const locale = navigator.language || '';
    const region = new Intl.Locale(locale).region ?? '';
    if (region === 'IN') return true;
  } catch {}
  // fallback: check timezone
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz.startsWith('Asia/Kolkata') || tz.startsWith('Asia/Calcutta')) return true;
  } catch {}
  return false;
}

export default function CheckoutPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [coupon, setCoupon] = useState(AUTO_COUPON);
  const [couponStatus, setCouponStatus] = useState<'idle' | 'valid' | 'invalid'>('idle');
  const [couponApplied, setCouponApplied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isIndia, setIsIndia] = useState(false);

  useEffect(() => {
    setIsIndia(detectIsIndia());
  }, []);

  // Auto-apply the default coupon on mount
  useEffect(() => {
    fetch('/api/coupon', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: AUTO_COUPON }),
    })
      .then(r => r.json())
      .then(data => {
        if (data.valid) { setCouponStatus('valid'); setCouponApplied(true); }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, []);

  useEffect(() => {
    if (status === 'unauthenticated') signIn('google');
    if (status === 'authenticated') {
      const user = session.user as typeof session.user & { hasPremiumAccess?: boolean };
      if (user?.hasPremiumAccess) router.replace('/dashboard');
    }
  }, [status, session, router]);

  // Price logic
  const usdPrice = couponApplied ? COUPON_USD : BASE_USD;
  const displaySymbol = isIndia ? '₹' : '$';
  const displayAmount = isIndia ? Math.round(usdPrice * USD_TO_INR) : usdPrice;
  const displayOriginal = isIndia ? Math.round(BASE_USD * USD_TO_INR) : BASE_USD;

  function formatPrice(amount: number) {
    return `${displaySymbol}${amount.toLocaleString()}`;
  }

  async function applyCoupon() {
    const res = await fetch('/api/coupon', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: coupon }),
    });
    const data = await res.json();
    if (data.valid) {
      setCouponStatus('valid');
      setCouponApplied(true);
    } else {
      setCouponStatus('invalid');
      setCouponApplied(false);
    }
  }

  async function handlePay() {
    setLoading(true);
    try {
      const res = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ coupon, isIndia }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      const rzp = new window.Razorpay({
        key: data.key,
        amount: data.amount * 100,
        currency: data.currency,
        name: 'Claude Architect Prep',
        description: 'Premium Access — Real Test Questions',
        order_id: data.orderId,
        handler: async (response) => {
          const verifyRes = await fetch('/api/payment/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(response),
          });
          if (verifyRes.ok) {
            router.push('/dashboard?success=1');
          }
        },
        prefill: {
          name: session?.user?.name ?? '',
          email: session?.user?.email ?? '',
        },
        theme: { color: '#d97757' },
      });
      rzp.open();
    } catch (err) {
      alert((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  if (status === 'loading') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Loader2 size={32} style={{ animation: 'spin 1s linear infinite', color: 'var(--color-primary)' }} />
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div className="glass-card" style={{ maxWidth: 480, width: '100%', padding: '40px', borderRadius: 20 }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32 }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Brain size={18} color="white" />
          </div>
          <span style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-primary)' }}>Claude Architect</span>
        </div>

        {/* Sale banner */}
        <div style={{
          marginBottom: 20, padding: '10px 16px', borderRadius: 10,
          background: 'linear-gradient(135deg, #ff4d4d 0%, #ff8c00 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          boxShadow: '0 4px 16px rgba(255,77,77,0.35)',
        }}>
          <span style={{ fontSize: '1.1rem' }}>🔥</span>
          <span style={{ fontWeight: 800, color: 'white', fontSize: '0.9rem', letterSpacing: '0.03em' }}>
            LIMITED SALE — 50% OFF APPLIED!
          </span>
          <span style={{
            background: 'rgba(255,255,255,0.25)', color: 'white',
            borderRadius: 9999, padding: '2px 8px', fontSize: '0.7rem', fontWeight: 700,
          }}>LIVE</span>
        </div>

        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: 8 }}>Premium Access</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 28, fontSize: '0.9rem', lineHeight: 1.6 }}>
          Unlock real exam questions, detailed explanations, and full access to all 5 domains.
        </p>

        {/* What's included */}
        {['Real exam-style test questions', 'Detailed answer explanations', 'All 5 domain coverage', 'Unlimited access, no expiry'].map(item => (
          <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <CheckCircle size={16} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
            <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{item}</span>
          </div>
        ))}

        {/* Price display */}
        <div style={{
          margin: '28px 0 20px', padding: '20px', borderRadius: 12,
          background: 'var(--color-primary-glow)', border: '1px solid rgba(217,119,87,0.2)',
          textAlign: 'center',
        }}>
          {couponApplied ? (
            <div>
              <span style={{ textDecoration: 'line-through', color: 'var(--text-muted)', fontSize: '1rem' }}>
                {formatPrice(displayOriginal)}
              </span>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-primary)', lineHeight: 1.1 }}>
                {formatPrice(displayAmount)}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4 }}>
                🎉 50% off applied · You save {formatPrice(displayOriginal - displayAmount)}
              </div>
            </div>
          ) : (
            <div>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-primary)', lineHeight: 1.1 }}>
                {formatPrice(displayAmount)}
              </div>
              {isIndia && (
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 6 }}>
                  ≈ $60 USD · One-time payment
                </div>
              )}
            </div>
          )}
        </div>

        {/* Coupon */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <Tag size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                value={coupon}
                onChange={e => { setCoupon(e.target.value); setCouponStatus('idle'); setCouponApplied(false); }}
                placeholder="Coupon code"
                style={{
                  width: '100%', padding: '10px 12px 10px 34px',
                  borderRadius: 8, border: `1px solid ${couponStatus === 'valid' ? 'var(--color-primary)' : couponStatus === 'invalid' ? '#ef4444' : 'var(--surface-border)'}`,
                  background: 'var(--bg-surface)', color: 'var(--text-primary)', fontSize: '0.875rem',
                  outline: 'none',
                }}
              />
            </div>
            <button onClick={applyCoupon} className="btn-ghost" style={{ padding: '10px 16px', fontSize: '0.875rem', flexShrink: 0 }}>
              Apply
            </button>
          </div>
          {couponStatus === 'valid' && <p style={{ color: 'var(--color-primary)', fontSize: '0.8rem', marginTop: 6 }}>Coupon applied!</p>}
          {couponStatus === 'invalid' && <p style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: 6 }}>Invalid coupon code.</p>}
        </div>

        {/* Pay button */}
        <button
          className="btn-primary"
          onClick={handlePay}
          disabled={loading}
          style={{ width: '100%', padding: '14px', fontSize: '1rem', justifyContent: 'center' }}
        >
          {loading ? <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> : null}
          Pay {formatPrice(displayAmount)} · Get Instant Access
        </button>

        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <Link href="/" style={{ color: 'var(--text-muted)', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <ArrowLeft size={12} /> Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
