'use client';
import { useState } from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import { QuizProvider } from './components/QuizProvider';
import { ThemeToggle } from './components/ThemeToggle';
import { HomeView } from './components/HomeView';
import { DomainSelector } from './components/DomainSelector';
import { QuizCard } from './components/QuizCard';
import { ResultsScreen } from './components/ResultsScreen';
import { PremiumNotes } from './components/PremiumNotes';
import { useQuiz } from './components/QuizProvider';
import { Brain, BookOpen, Home, ArrowLeft } from 'lucide-react';

type View = 'home' | 'select' | 'quiz' | 'results' | 'notes';

function App() {
  const [view, setView] = useState<View>('home');
  const { session, resetQuiz } = useQuiz();

  function goHome() { resetQuiz(); setView('home'); }

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
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              background: 'none', border: 'none', cursor: 'pointer', padding: 0,
            }}
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
              className="btn-primary"
              onClick={() => setView('select')}
              style={{ fontSize: '0.8125rem', padding: '7px 14px' }}
              id="nav-practice"
            >
              <Brain size={14} /> Practice
            </button>
          </nav>
        </div>
      </header>

      {/* Main */}
      <main className="page-container" style={{ position: 'relative', zIndex: 1, paddingTop: 32, paddingBottom: 64 }}>
        {view === 'home' && (
          <HomeView
            onStartQuiz={() => setView('select')}
            onOpenNotes={() => setView('notes')}
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

        {view === 'quiz' && session && !session.isComplete && (
          <QuizCard onDone={() => setView('results')} />
        )}

        {(view === 'results' || (view === 'quiz' && session?.isComplete)) && (
          <ResultsScreen
            onHome={goHome}
            onRetry={() => setView('select')}
          />
        )}

        {view === 'notes' && <PremiumNotes />}
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
