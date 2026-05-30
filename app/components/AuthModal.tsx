'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Brain, X, Shield, Star, FileText, Loader2 } from 'lucide-react';

interface Props {
  onClose: () => void;
  /** If set, shown as the reason why login is needed */
  reason?: 'realtest' | 'general';
}

export function AuthModal({ onClose, reason = 'general' }: Props) {
  const [loading, setLoading] = useState(false);

  async function handleGoogleSignIn() {
    setLoading(true);
    await signIn('google', { callbackUrl: window.location.href });
  }

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          background: 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
        }}
      />

      {/* Modal card */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 1001,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px',
        pointerEvents: 'none',
      }}>
        <div
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--surface-border)',
            borderRadius: 24,
            padding: '40px 36px',
            width: '100%', maxWidth: 420,
            boxShadow: '0 24px 64px rgba(0,0,0,0.35)',
            pointerEvents: 'auto',
            position: 'relative',
            animation: 'modalIn 0.2s ease',
          }}
        >
          <style>{`
            @keyframes modalIn {
              from { opacity: 0; transform: scale(0.95) translateY(8px); }
              to   { opacity: 1; transform: scale(1)    translateY(0);   }
            }
          `}</style>

          {/* Close */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: 16, right: 16,
              background: 'var(--bg-base)', border: '1px solid var(--surface-border)',
              borderRadius: '50%', width: 32, height: 32,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: 'var(--text-muted)',
            }}
          >
            <X size={15} />
          </button>

          {/* Logo */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
            <div style={{
              width: 56, height: 56, borderRadius: 14,
              background: 'var(--color-primary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(217,119,87,0.35)',
            }}>
              <Brain size={28} color="white" />
            </div>
          </div>

          <h2 style={{ textAlign: 'center', fontSize: '1.375rem', fontWeight: 800, marginBottom: 8, color: 'var(--text-primary)' }}>
            {reason === 'realtest' ? 'Unlock Real Test Questions' : 'Sign in to Claude Architect'}
          </h2>
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: 28 }}>
            {reason === 'realtest'
              ? 'Sign in with Google to access 60 real exam questions with detailed explanations.'
              : 'Sign in to track your progress, save results, and access premium content.'}
          </p>

          {/* Feature pills */}
          {reason === 'realtest' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 28 }}>
              {[
                { icon: <FileText size={14} />, text: '60 real exam-style questions' },
                { icon: <Star size={14} />, text: 'Detailed answer explanations' },
                { icon: <Shield size={14} />, text: 'Secure · No spam · Cancel anytime' },
              ].map(({ icon, text }) => (
                <div key={text} style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '10px 14px', borderRadius: 10,
                  background: 'var(--bg-base)',
                  border: '1px solid var(--surface-border)',
                }}>
                  <span style={{ color: 'var(--color-primary)', flexShrink: 0 }}>{icon}</span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{text}</span>
                </div>
              ))}
            </div>
          )}

          {/* Google sign-in button */}
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            style={{
              width: '100%', padding: '14px 20px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
              borderRadius: 12, fontWeight: 700, fontSize: '1rem', cursor: loading ? 'wait' : 'pointer',
              background: 'var(--bg-base)',
              color: 'var(--text-primary)',
              border: '1.5px solid var(--surface-border)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              transition: 'box-shadow 0.15s, transform 0.15s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)';
              (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
              (e.currentTarget as HTMLButtonElement).style.transform = '';
            }}
          >
            {loading ? (
              <Loader2 size={20} style={{ animation: 'spin 1s linear infinite', color: 'var(--text-muted)' }} />
            ) : (
              <GoogleIcon />
            )}
            {loading ? 'Redirecting…' : 'Continue with Google'}
          </button>

          <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 16, lineHeight: 1.5 }}>
            By signing in you agree to our terms. We only use your Google account for authentication.
          </p>
        </div>
      </div>
    </>
  );
}

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}
