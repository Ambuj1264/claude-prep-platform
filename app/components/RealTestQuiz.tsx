'use client';
import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ScreenshotProtect } from './ScreenshotProtect';
import { AuthModal } from './AuthModal';
import {
  CheckCircle, XCircle, ChevronRight, ChevronLeft,
  RotateCcw, Trophy, Loader2, ArrowRight,
  BookOpen, Target, Clock,
} from 'lucide-react';
import type { RealQuestion } from '@/app/lib/data/realQuestions';

type AnswerKey = 'A' | 'B' | 'C' | 'D';
type AnswerMap = Record<number, AnswerKey>;

const DOMAIN_COLORS: Record<string, string> = {
  'Context Management':    '#6366f1',
  'Ambiguity Handling':    '#f59e0b',
  'Tool Use':              '#10b981',
  'Agentic Workflows':     '#ef4444',
  'Structured Extraction': '#8b5cf6',
  'MCP':                   '#0ea5e9',
  'Claude Code':           '#d97757',
};

export function RealTestQuiz() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [questions, setQuestions] = useState<RealQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [accessState, setAccessState] = useState<'loading' | 'ok' | 'unauth' | 'nopremium'>('loading');

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<AnswerKey | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [finished, setFinished] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [startTime] = useState(Date.now());
  const [elapsed, setElapsed] = useState(0);

  // Timer
  useEffect(() => {
    if (finished) return;
    const id = setInterval(() => setElapsed(Math.floor((Date.now() - startTime) / 1000)), 1000);
    return () => clearInterval(id);
  }, [finished, startTime]);

  const fetchQuestions = useCallback(async () => {
    try {
      const res = await fetch('/api/real-questions');
      if (res.status === 401) { setAccessState('unauth'); return; }
      if (res.status === 403) { setAccessState('nopremium'); return; }
      const data = await res.json();
      setQuestions(data.questions);
      setAccessState('ok');
    } catch {
      setAccessState('unauth');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (status === 'loading') return;
    if (status === 'unauthenticated') { setAccessState('unauth'); setLoading(false); return; }
    fetchQuestions();
  }, [status, fetchQuestions]);

  function handleSelect(key: AnswerKey) {
    if (revealed) return;
    setSelected(key);
  }

  function handleCheck() {
    if (!selected) return;
    setRevealed(true);
    setAnswers(prev => ({ ...prev, [questions[current].id]: selected }));
  }

  function handleNext() {
    if (current + 1 >= questions.length) {
      setFinished(true);
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
      setRevealed(false);
    }
  }

  function handleRestart() {
    setCurrent(0);
    setSelected(null);
    setRevealed(false);
    setAnswers({});
    setFinished(false);
    setReviewMode(false);
  }

  function formatTime(s: number) {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  }

  // ── Gated states ──────────────────────────────────────────────
  if (loading || status === 'loading') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 300 }}>
        <Loader2 size={28} style={{ animation: 'spin 1s linear infinite', color: 'var(--color-primary)' }} />
      </div>
    );
  }

  if (accessState === 'unauth') {
    return (
      <AuthModal reason="realtest" onClose={() => router.push('/')} />
    );
  }

  if (accessState === 'nopremium') {
    return (
      <GateCard
        title="Premium Access Required"
        body="These are real exam questions available exclusively to premium members. Unlock once, access forever."
        action={{ label: 'Get Premium Access — $60', onClick: () => router.push('/checkout') }}
        secondary={{ label: 'View Dashboard', onClick: () => router.push('/dashboard') }}
      />
    );
  }

  // ── Results screen ────────────────────────────────────────────
  if (finished && !reviewMode) {
    const correct = questions.filter(q => answers[q.id] === q.answer).length;
    const pct = Math.round((correct / questions.length) * 100);
    const passed = pct >= 70;

    const domainStats: Record<string, { total: number; correct: number }> = {};
    questions.forEach(q => {
      const d = q.domain ?? 'General';
      if (!domainStats[d]) domainStats[d] = { total: 0, correct: 0 };
      domainStats[d].total++;
      if (answers[q.id] === q.answer) domainStats[d].correct++;
    });

    return (
      <ScreenshotProtect>
      <div className="animate-fade-in">
        {/* Score hero */}
        <div className="glass-card" style={{ padding: '40px', textAlign: 'center', marginBottom: 24 }}>
          <div style={{ marginBottom: 16 }}>
            <Trophy size={48} style={{ color: passed ? '#f59e0b' : 'var(--text-muted)' }} />
          </div>
          <div style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', fontWeight: 800, color: passed ? '#22c55e' : '#ef4444', lineHeight: 1 }}>
            {pct}%
          </div>
          <div style={{ fontSize: '1.25rem', fontWeight: 700, marginTop: 8, marginBottom: 4 }}>
            {passed ? '🎉 Passed!' : 'Keep Practicing'}
          </div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            {correct} / {questions.length} correct · {formatTime(elapsed)}
          </div>
          <div style={{
            display: 'inline-block', marginTop: 16,
            padding: '4px 16px', borderRadius: 9999,
            background: passed ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.12)',
            color: passed ? '#22c55e' : '#ef4444',
            fontSize: '0.8rem', fontWeight: 600,
          }}>
            {passed ? '✓ Above 70% pass threshold' : '✗ Below 70% pass threshold'}
          </div>
        </div>

        {/* Domain breakdown */}
        <div className="glass-card" style={{ padding: '28px', marginBottom: 24 }}>
          <h3 style={{ fontWeight: 700, marginBottom: 20, fontSize: '1rem', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Target size={16} style={{ color: 'var(--color-primary)' }} /> Domain Breakdown
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {Object.entries(domainStats).map(([domain, { total, correct }]) => {
              const dpct = Math.round((correct / total) * 100);
              const color = DOMAIN_COLORS[domain] ?? 'var(--color-primary)';
              return (
                <div key={domain}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: '0.875rem' }}>
                    <span style={{ fontWeight: 600 }}>{domain}</span>
                    <span style={{ color: 'var(--text-muted)' }}>{correct}/{total} · {dpct}%</span>
                  </div>
                  <div style={{ height: 6, borderRadius: 3, background: 'var(--bg-surface)', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${dpct}%`, background: color, borderRadius: 3, transition: 'width 0.8s ease' }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button
            className="btn-ghost"
            onClick={() => { setReviewMode(true); setReviewIndex(0); }}
            style={{ fontSize: '0.9rem' }}
          >
            <BookOpen size={16} /> Review Answers
          </button>
          <button className="btn-primary" onClick={handleRestart} style={{ fontSize: '0.9rem' }}>
            <RotateCcw size={16} /> Retake Test
          </button>
        </div>
      </div>
      </ScreenshotProtect>
    );
  }

  // ── Review mode ───────────────────────────────────────────────
  if (finished && reviewMode) {
    const q = questions[reviewIndex];
    const userAns = answers[q.id];
    return (
      <ScreenshotProtect>
      <div className="animate-fade-in">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <button className="btn-ghost" onClick={() => setReviewMode(false)} style={{ fontSize: '0.8125rem' }}>
            ← Back to Results
          </button>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
            Review {reviewIndex + 1} / {questions.length}
          </span>
        </div>
        <QuizQuestion
          q={q}
          selected={userAns ?? null}
          revealed
          onSelect={() => {}}
        />
        <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
          <button className="btn-ghost" onClick={() => setReviewIndex(i => Math.max(0, i - 1))} disabled={reviewIndex === 0}>
            <ChevronLeft size={16} /> Prev
          </button>
          {reviewIndex + 1 < questions.length ? (
            <button className="btn-primary" onClick={() => setReviewIndex(i => i + 1)}>
              Next <ChevronRight size={16} />
            </button>
          ) : (
            <button className="btn-primary" onClick={() => setReviewMode(false)}>
              <CheckCircle size={16} /> Done
            </button>
          )}
        </div>
      </div>
      </ScreenshotProtect>
    );
  }

  // ── Quiz ──────────────────────────────────────────────────────
  const q = questions[current];
  const progress = ((current) / questions.length) * 100;
  const domain = q.domain ?? 'General';
  const domainColor = DOMAIN_COLORS[domain] ?? 'var(--color-primary)';

  return (
    <ScreenshotProtect>
    <div className="animate-fade-in">
      {/* Header bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{
            padding: '3px 10px', borderRadius: 9999, fontSize: '0.75rem', fontWeight: 700,
            background: `${domainColor}18`, color: domainColor, border: `1px solid ${domainColor}30`,
          }}>
            {domain}
          </span>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
            Q{current + 1} of {questions.length}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)', fontSize: '0.8rem' }}>
          <Clock size={13} /> {formatTime(elapsed)}
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ height: 4, background: 'var(--bg-surface)', borderRadius: 2, marginBottom: 28, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${progress}%`, background: `linear-gradient(90deg, var(--color-primary), ${domainColor})`, borderRadius: 2, transition: 'width 0.3s ease' }} />
      </div>

      <QuizQuestion q={q} selected={selected} revealed={revealed} onSelect={handleSelect} />

      {/* Action buttons */}
      <div style={{ marginTop: 20, display: 'flex', gap: 10, alignItems: 'center' }}>
        {!revealed ? (
          <button
            className="btn-primary"
            onClick={handleCheck}
            disabled={!selected}
            style={{ fontSize: '0.9rem', opacity: selected ? 1 : 0.5 }}
          >
            Check Answer
          </button>
        ) : (
          <button className="btn-primary" onClick={handleNext} style={{ fontSize: '0.9rem' }}>
            {current + 1 >= questions.length ? (
              <><Trophy size={16} /> See Results</>
            ) : (
              <>Next Question <ChevronRight size={16} /></>
            )}
          </button>
        )}
        <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
          {Object.keys(answers).length} answered
        </span>
      </div>
    </div>
    </ScreenshotProtect>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function QuizQuestion({
  q,
  selected,
  revealed,
  onSelect,
}: {
  q: RealQuestion;
  selected: AnswerKey | null;
  revealed: boolean;
  onSelect: (k: AnswerKey) => void;
}) {
  return (
    <div>
      <div className="glass-card" style={{ padding: '28px', marginBottom: 16 }}>
        <p style={{ fontSize: '1rem', fontWeight: 600, lineHeight: 1.7, color: 'var(--text-primary)', margin: 0 }}>
          {q.question}
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {q.options.map(opt => {
          const isSelected = selected === opt.key;
          const isCorrect = opt.key === q.answer;
          const isWrong = revealed && isSelected && !isCorrect;
          const showCorrect = revealed && isCorrect;

          let bg = 'var(--bg-surface)';
          let border = 'var(--surface-border)';
          let textColor = 'var(--text-primary)';

          if (showCorrect) {
            bg = 'rgba(34,197,94,0.1)';
            border = '#22c55e';
            textColor = '#22c55e';
          } else if (isWrong) {
            bg = 'rgba(239,68,68,0.1)';
            border = '#ef4444';
            textColor = '#ef4444';
          } else if (isSelected && !revealed) {
            bg = 'var(--color-primary-glow)';
            border = 'var(--color-primary)';
          }

          return (
            <button
              key={opt.key}
              onClick={() => onSelect(opt.key)}
              disabled={revealed}
              style={{
                display: 'flex', alignItems: 'flex-start', gap: 14,
                padding: '14px 18px', borderRadius: 12,
                background: bg, border: `1.5px solid ${border}`,
                cursor: revealed ? 'default' : 'pointer',
                color: textColor, textAlign: 'left',
                transition: 'all 0.15s ease',
                width: '100%',
              }}
            >
              <span style={{
                width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 800, fontSize: '0.8rem',
                background: showCorrect ? '#22c55e' : isWrong ? '#ef4444' : isSelected ? 'var(--color-primary)' : 'var(--bg-base)',
                color: (showCorrect || isWrong || isSelected) ? 'white' : 'var(--text-muted)',
                transition: 'all 0.15s ease',
              }}>
                {opt.key}
              </span>
              <span style={{ flex: 1, fontSize: '0.9rem', lineHeight: 1.6, paddingTop: 3 }}>{opt.text}</span>
              {showCorrect && <CheckCircle size={18} style={{ flexShrink: 0, marginTop: 3 }} />}
              {isWrong && <XCircle size={18} style={{ flexShrink: 0, marginTop: 3 }} />}
            </button>
          );
        })}
      </div>

      {revealed && (
        <div style={{
          marginTop: 16, padding: '14px 18px', borderRadius: 10,
          background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <CheckCircle size={16} style={{ color: '#22c55e', flexShrink: 0 }} />
          <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            <strong style={{ color: '#22c55e' }}>Correct answer: {q.answer}</strong>
            {' · '}
            {q.options.find(o => o.key === q.answer)?.text}
          </span>
        </div>
      )}
    </div>
  );
}

function GateCard({
  title, body, action, secondary,
}: {
  title: string;
  body: string;
  action: { label: string; onClick: () => void };
  secondary?: { label: string; onClick: () => void };
}) {
  return (
    <div className="glass-card" style={{ padding: '48px 40px', textAlign: 'center', maxWidth: 520, margin: '40px auto' }}>
      <div style={{
        width: 56, height: 56, borderRadius: 14, margin: '0 auto 20px',
        background: 'var(--color-primary)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 8px 24px rgba(217,119,87,0.35)',
      }}>
        <ArrowRight size={24} color="white" />
      </div>
      <h2 style={{ fontSize: '1.375rem', fontWeight: 800, marginBottom: 12 }}>{title}</h2>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: 1.7, marginBottom: 28 }}>{body}</p>
      <button className="btn-primary" onClick={action.onClick} style={{ fontSize: '0.9375rem', padding: '12px 24px', marginBottom: secondary ? 10 : 0 }}>
        {action.label} <ArrowRight size={16} />
      </button>
      {secondary && (
        <div>
          <button className="btn-ghost" onClick={secondary.onClick} style={{ fontSize: '0.875rem' }}>
            {secondary.label}
          </button>
        </div>
      )}
    </div>
  );
}
