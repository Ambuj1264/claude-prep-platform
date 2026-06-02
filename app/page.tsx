'use client';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ThemeProvider } from './components/ThemeProvider';
import { QuizProvider } from './components/QuizProvider';
import { ThemeToggle } from './components/ThemeToggle';
import { HomeView } from './components/HomeView';
import { DomainSelector } from './components/DomainSelector';
import { QuizCard } from './components/QuizCard';
import { ResultsScreen } from './components/ResultsScreen';
import { PremiumNotes } from './components/PremiumNotes';
import { RealTestQuiz } from './components/RealTestQuiz';
import { AuthModal } from './components/AuthModal';
import { useQuiz } from './components/QuizProvider';
import { Brain, BookOpen, Home, ArrowLeft, LogIn, LayoutDashboard, LogOut, User, FileText, Flame } from 'lucide-react';

type View = 'home' | 'select' | 'quiz' | 'results' | 'notes' | 'real-test';

function App() {
  const [view, setView] = useState<View>('home');
  const { session: quizSession, resetQuiz } = useQuiz();
  const { data: authSession, status } = useSession();
  const router = useRouter();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  function goHome() { resetQuiz(); setView('home'); }

  function handleRealTestQuestions() {
    setView('real-test');
  }

  type SessionUser = { name?: string | null; email?: string | null; image?: string | null; hasPremiumAccess?: boolean };
  const user: SessionUser | undefined = authSession?.user as SessionUser | undefined;

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      {/* Background blobs */}
      <div className="bg-blobs">
        <div className="bg-blob bg-blob-1" />
        <div className="bg-blob bg-blob-2" />
        <div className="bg-blob bg-blob-3" />
      </div>

      {/* Header */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'var(--bg-base)',
        borderBottom: '1px solid var(--surface-border)',
      }}>
        {/* Sale announcement bar */}
        <div
          onClick={() => router.push('/checkout')}
          style={{
            background: '#1a1009',
            borderBottom: '1px solid rgba(217,119,87,0.25)',
            padding: '8px 16px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
            userSelect: 'none', flexWrap: 'wrap',
          }}
        >
          {/* Live pulse dot */}
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{
              width: 7, height: 7, borderRadius: '50%',
              background: '#d97757', display: 'inline-block',
              boxShadow: '0 0 0 0 rgba(217,119,87,0.6)',
              animation: 'salePulse 1.6s ease-in-out infinite',
            }} />
            <span style={{ color: '#d97757', fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Sale Live
            </span>
          </span>

          <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.75rem' }}>|</span>

          <span style={{ color: 'rgba(255,255,255,0.9)', fontWeight: 600, fontSize: '0.8rem' }}>
            🔥 Hurry up — limited time offer
          </span>

          <span style={{
            background: 'linear-gradient(135deg, #d97757, #c2643d)',
            color: 'white', borderRadius: 6, padding: '3px 10px',
            fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.06em',
          }}>50% OFF</span>

          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem' }}>
            Code <span style={{ color: '#d97757', fontWeight: 700 }}>CLAUDEEXAM</span> · auto-applied
          </span>

          <span style={{
            color: '#d97757', fontSize: '0.78rem', fontWeight: 600,
            display: 'flex', alignItems: 'center', gap: 4,
          }}>
            Get access →
          </span>
        </div>

        <div className="page-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60 }}>
          {/* Logo */}
          <button
            onClick={goHome}
            style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            id="logo-btn"
          >
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: 'var(--color-primary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Brain size={17} color="white" />
            </div>
            <span style={{ fontWeight: 800, fontSize: '1.0625rem', color: 'var(--text-primary)' }}>
              Claude Architect
            </span>
            <span style={{
              background: 'linear-gradient(135deg, #ff4d4d, #ff8c00)',
              color: 'white', borderRadius: 9999, padding: '2px 8px',
              fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.05em',
              boxShadow: '0 2px 8px rgba(255,77,77,0.4)',
              animation: 'pulse 2s ease-in-out infinite',
            }}>SALE</span>
          </button>

          {/* Nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {view !== 'home' && (
              <button className="btn-ghost" onClick={goHome} style={{ fontSize: '0.8125rem' }}>
                <Home size={14} /> Home
              </button>
            )}
            <button
              className={`btn-ghost ${view === 'notes' ? 'active' : ''}`}
              onClick={() => setView('notes')}
              style={{ fontSize: '0.8125rem' }}
              id="nav-notes"
            >
              <BookOpen size={14} /> Notes
            </button>
            <button
              className={`btn-ghost ${view === 'real-test' ? 'active' : ''}`}
              onClick={() => setView('real-test')}
              style={{ fontSize: '0.8125rem' }}
              id="nav-real-test"
            >
              <FileText size={14} /> Real Test
            </button>
            <button
              className="btn-primary"
              onClick={() => setView('select')}
              style={{ fontSize: '0.8125rem', padding: '7px 14px' }}
              id="nav-practice"
            >
              <Brain size={14} /> Practice
            </button>

            <ThemeToggle />

            {/* Auth buttons */}
            {status === 'loading' ? (
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--bg-surface)', animation: 'pulse 1.5s ease-in-out infinite' }} />
            ) : authSession ? (
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setUserMenuOpen(v => !v)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: 8 }}
                >
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <User size={16} color="white" />
                  </div>
                </button>
                {userMenuOpen && (
                  <div style={{
                    position: 'absolute', right: 0, top: '100%', marginTop: 8,
                    background: 'var(--bg-surface)', border: '1px solid var(--surface-border)',
                    borderRadius: 10, padding: 8, minWidth: 180, zIndex: 100,
                    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                  }}>
                    <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--surface-border)', marginBottom: 4 }}>
                      <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-primary)' }}>{user?.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{user?.email}</div>
                    </div>
                    <button
                      className="btn-ghost"
                      onClick={() => { setUserMenuOpen(false); window.location.href = '/dashboard'; }}
                      style={{ width: '100%', justifyContent: 'flex-start', fontSize: '0.8125rem', borderRadius: 6 }}
                    >
                      <LayoutDashboard size={14} /> Dashboard
                    </button>
                    <button
                      className="btn-ghost"
                      onClick={() => { setUserMenuOpen(false); signOut({ callbackUrl: window.location.origin + '/' }); }}
                      style={{ width: '100%', justifyContent: 'flex-start', fontSize: '0.8125rem', borderRadius: 6 }}
                    >
                      <LogOut size={14} /> Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                className="btn-ghost"
                onClick={() => setShowAuthModal(true)}
                style={{ fontSize: '0.8125rem' }}
                id="btn-login"
              >
                <LogIn size={14} /> Login
              </button>
            )}
          </nav>
        </div>
      </header>

      {/* Main */}
      <main className="page-container" style={{ position: 'relative', zIndex: 1, paddingTop: 32, paddingBottom: 64 }}>
        {view === 'home' && (
          <HomeView
            onStartQuiz={() => setView('select')}
            onOpenNotes={() => setView('notes')}
            onRealTestQuestions={handleRealTestQuestions}
          />
        )}

        {view === 'select' && (
          <div>
            <button className="btn-ghost" onClick={goHome} style={{ marginBottom: 24, fontSize: '0.8125rem' }}>
              <ArrowLeft size={14} /> Back
            </button>
            <DomainSelector onStart={() => setView('quiz')} />
          </div>
        )}

        {view === 'quiz' && quizSession && !quizSession.isComplete && (
          <QuizCard onDone={() => setView('results')} />
        )}

        {(view === 'results' || (view === 'quiz' && quizSession?.isComplete)) && (
          <ResultsScreen
            onHome={goHome}
            onRetry={() => setView('select')}
          />
        )}

        {view === 'notes' && <PremiumNotes />}

        {view === 'real-test' && (
          <div>
            <div style={{ marginBottom: 24 }}>
              <button className="btn-ghost" onClick={goHome} style={{ fontSize: '0.8125rem' }}>
                <Home size={14} /> Home
              </button>
            </div>
            <div style={{ marginBottom: 20 }}>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: 6 }}>
                Real Test Questions
              </h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                60 exam-style questions · Timed · With answer explanations
              </p>
            </div>
            <RealTestQuiz />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer style={{
        position: 'relative', zIndex: 1,
        borderTop: '1px solid var(--surface-border)',
        padding: '20px 0', textAlign: 'center',
        color: 'var(--text-muted)', fontSize: '0.8125rem',
      }}>
        <div className="page-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px 20px' }}>
          <span>© 2025 Claude Architect Foundations · Official Exam Prep</span>
          <a href="/privacy" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Privacy Policy</a>
          <a href="/terms" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Terms & Conditions</a>
          <a href="/contact" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Contact Us</a>
        </div>
      </footer>

      {/* Close user menu on outside click */}
      {userMenuOpen && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 40 }}
          onClick={() => setUserMenuOpen(false)}
        />
      )}

      {/* Auth modal */}
      {showAuthModal && (
        <AuthModal reason="general" onClose={() => setShowAuthModal(false)} />
      )}
    </div>
  );
}

export default function Page() {
  return (
    <ThemeProvider>
      <QuizProvider>
        <App />
      </QuizProvider>
    </ThemeProvider>
  );
}
