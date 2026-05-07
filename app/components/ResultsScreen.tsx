'use client';
import { useQuiz } from './QuizProvider';
import { Trophy, RefreshCw, Home, CheckCircle, XCircle, TrendingUp } from 'lucide-react';
import { domains } from '../lib/data';

export function ResultsScreen({ onHome, onRetry }: { onHome: () => void; onRetry: () => void }) {
  const { session, score, resetQuiz } = useQuiz();
  if (!session) return null;

  const total = session.questions.length;
  const pct = Math.round((score / total) * 100);
  const passed = pct >= 70;

  // Per-domain breakdown
  const byDomain = domains.map(d => {
    const qs = session.questions.filter(q => q.domain === d.id);
    const correct = session.answers.filter(a => {
      const q = session.questions.find(q => q.id === a.questionId);
      return q?.domain === d.id && a.isCorrect;
    }).length;
    return { domain: d, total: qs.length, correct };
  }).filter(x => x.total > 0);

  function handleHome() { resetQuiz(); onHome(); }
  function handleRetry() { resetQuiz(); onRetry(); }

  return (
    <div className="animate-scale-in" style={{ maxWidth: 680, margin: '0 auto' }}>
      {/* Score hero */}
      <div className="glass-card" style={{
        padding: '40px 32px',
        textAlign: 'center',
        marginBottom: 24,
        background: passed
          ? 'rgba(16,185,129,0.06)'
          : 'rgba(244,63,94,0.06)',
        borderColor: passed
          ? 'rgba(16,185,129,0.25)'
          : 'rgba(244,63,94,0.25)',
      }}>
        <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'center' }}>
          <div style={{
            width: 80, height: 80, borderRadius: '50%',
            background: passed ? 'rgba(16,185,129,0.15)' : 'rgba(244,63,94,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Trophy size={36} style={{ color: passed ? 'var(--color-correct)' : 'var(--color-wrong)' }} />
          </div>
        </div>
        <div style={{
          fontSize: '4rem', fontWeight: 800, lineHeight: 1,
          color: passed ? 'var(--color-correct)' : 'var(--color-wrong)',
          marginBottom: 8,
        }}>
          {pct}%
        </div>
        <div style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: 4 }}>
          {passed ? '🎉 Excellent Work!' : 'Keep Practicing!'}
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          {score} correct out of {total} questions
          {passed ? ' — You\'re exam ready!' : ' — Target 70%+ to pass.'}
        </p>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 24 }}>
        {[
          { label: 'Correct', value: score, icon: <CheckCircle size={18} style={{ color: 'var(--color-correct)' }} /> },
          { label: 'Incorrect', value: total - score, icon: <XCircle size={18} style={{ color: 'var(--color-wrong)' }} /> },
          { label: 'Score', value: `${pct}%`, icon: <TrendingUp size={18} style={{ color: 'var(--color-primary)' }} /> },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 6 }}>{s.icon}</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{s.value}</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Domain breakdown */}
      {byDomain.length > 1 && (
        <div className="glass-card" style={{ padding: '24px', marginBottom: 24 }}>
          <h3 style={{ fontWeight: 700, marginBottom: 16, fontSize: '0.9375rem' }}>Domain Breakdown</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {byDomain.map(({ domain: d, total: t, correct: c }) => {
              const p = t > 0 ? Math.round((c / t) * 100) : 0;
              return (
                <div key={d.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: '0.875rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>{d.shortName}</span>
                    <span style={{ fontWeight: 600, color: p >= 70 ? 'var(--color-correct)' : 'var(--color-wrong)' }}>
                      {c}/{t} ({p}%)
                    </span>
                  </div>
                  <div className="progress-bar" style={{ height: 6 }}>
                    <div className="progress-fill" style={{
                      width: `${p}%`,
                      background: p >= 70 ? 'var(--color-correct)' : `linear-gradient(90deg, ${d.color}, ${d.color}aa)`,
                    }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Actions */}
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
        <button className="btn-ghost" onClick={handleHome} id="btn-home">
          <Home size={16} /> Back to Home
        </button>
        <button className="btn-primary" onClick={handleRetry} id="btn-retry">
          <RefreshCw size={16} /> Try Again
        </button>
      </div>
    </div>
  );
}
