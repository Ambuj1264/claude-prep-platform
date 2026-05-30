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
import { Brain, BookOpen, Home, ArrowLeft, LogIn, LayoutDashboard, LogOut, User, FileText } from 'lucide-react';
import Image from 'next/image';

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
                  {user?.image ? (
                    <Image src={user.image} alt={user.name ?? ''} width={32} height={32} style={{ borderRadius: '50%', border: '2px solid var(--color-primary)' }} />
                  ) : (
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <User size={16} color="white" />
                    </div>
                  )}
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
                      onClick={() => { router.push('/dashboard'); setUserMenuOpen(false); }}
                      style={{ width: '100%', justifyContent: 'flex-start', fontSize: '0.8125rem', borderRadius: 6 }}
                    >
                      <LayoutDashboard size={14} /> Dashboard
                    </button>
                    <button
                      className="btn-ghost"
                      onClick={() => { signOut({ callbackUrl: '/' }); setUserMenuOpen(false); }}
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
        <div className="page-container">
          Claude Architect Foundations · Official Exam Prep
        </div>
      </footer>

      {/* Close user menu on outside click */}
      {userMenuOpen && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 90 }}
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
