'use client';
import { useQuiz } from './QuizProvider';
import { domains } from '../lib/data';
import { ChevronRight, Shuffle, BookOpen } from 'lucide-react';

export function DomainSelector({ onStart }: { onStart: () => void }) {
  const { startQuiz } = useQuiz();

  function handleStart(domainId: number | null) {
    startQuiz(domainId, true);
    onStart();
  }

  return (
    <div className="animate-scale-in" style={{ maxWidth: 720, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: 8 }}>
          Choose Your Practice Mode
        </h2>
        <p style={{ color: 'var(--text-secondary)' }}>
          Select a domain to focus your study, or take a full mixed exam.
        </p>
      </div>

      {/* All domains card */}
      <div
        className="glass-card"
        onClick={() => handleStart(null)}
        style={{
          padding: '24px 28px',
          marginBottom: 20,
          cursor: 'pointer',
          borderColor: 'rgba(99,102,241,0.4)',
          background: 'rgba(99,102,241,0.08)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12,
              background: 'linear-gradient(135deg,#6366f1,#7c3aed)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Shuffle size={20} color="white" />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1.0625rem' }}>Full Mixed Exam</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: 2 }}>
                All 5 domains · {domains.reduce((a, d) => a + d.questions.length, 0)} questions shuffled
              </div>
            </div>
          </div>
          <ChevronRight size={20} style={{ color: 'var(--text-muted)' }} />
        </div>
      </div>

      {/* Per-domain cards */}
      <div style={{ display: 'grid', gap: 12 }}>
        {domains.map(d => (
          <div
            key={d.id}
            className="glass-card"
            onClick={() => handleStart(d.id)}
            style={{ padding: '20px 24px', cursor: 'pointer' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: `${d.color}22`,
                  border: `1px solid ${d.color}44`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.875rem', fontWeight: 700, color: d.color,
                }}>
                  D{d.id}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9375rem' }}>{d.shortName}</div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.8125rem', marginTop: 2 }}>
                    {d.questions.length} questions
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  padding: '3px 10px', borderRadius: 9999,
                  background: `${d.color}18`, border: `1px solid ${d.color}30`,
                  fontSize: '0.75rem', fontWeight: 600, color: d.color,
                }}>
                  Domain {d.id}
                </div>
                <ChevronRight size={16} style={{ color: 'var(--text-muted)' }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 16, textAlign: 'center' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.8125rem' }}>
          <BookOpen size={12} style={{ display: 'inline', marginRight: 4 }} />
          Questions are shuffled on every attempt for varied practice
        </p>
      </div>
    </div>
  );
}
