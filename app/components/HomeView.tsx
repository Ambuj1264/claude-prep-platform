'use client';
import { domains, allQuestions } from '../lib/data';
import { BookOpen, Layers, Brain, ChevronRight, Zap } from 'lucide-react';

interface Props {
  onStartQuiz: () => void;
  onOpenNotes: () => void;
}

export function HomeView({ onStartQuiz, onOpenNotes }: Props) {
  const totalQ = allQuestions.length;

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <div style={{ textAlign: 'center', padding: '48px 0 40px' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '6px 14px', borderRadius: 9999,
          background: 'var(--color-primary-glow)', border: '1px solid rgba(217,119,87,0.25)',
          marginBottom: 20, fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-secondary)',
        }}>
          <Zap size={12} /> Claude Certified Architect · Foundations
        </div>

        <h1 style={{
          fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, lineHeight: 1.15,
          color: 'var(--text-primary)', marginBottom: 16, letterSpacing: '-0.02em'
        }}>
          Master the Exam.<br />Pass with Confidence.
        </h1>

        <p style={{ color: 'var(--text-secondary)', fontSize: '1.0625rem', maxWidth: 520, margin: '0 auto 32px', lineHeight: 1.65 }}>
          Scenario-based questions across all 5 domains with detailed explanations, pattern analysis, and premium study notes.
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn-primary" onClick={onStartQuiz} id="btn-start-quiz" style={{ padding: '12px 28px', fontSize: '1rem' }}>
            <Brain size={18} /> Start Practice
          </button>
          <button className="btn-ghost" onClick={onOpenNotes} id="btn-open-notes" style={{ padding: '12px 24px', fontSize: '1rem' }}>
            <BookOpen size={18} /> Premium Notes
          </button>
        </div>
      </div>

      {/* Stats bar */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: 12, marginBottom: 40,
      }}>
        {[
          { label: 'Questions', value: totalQ, sub: 'Total' },
          { label: 'Domains', value: 5, sub: 'Coverage' },
          { label: 'Patterns', value: 20, sub: 'Tracked' },
          { label: 'Pass Rate', value: '70%', sub: 'Required' },
        ].map(s => (
          <div key={s.label} className="stat-card glass-card" style={{ padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-primary)' }}>{s.value}</div>
            <div style={{ fontWeight: 600, fontSize: '0.875rem', marginTop: 2 }}>{s.label}</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Domain cards */}
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: 16 }}>
          <Layers size={18} style={{ display: 'inline', marginRight: 8, verticalAlign: 'middle' }} />
          Exam Domains
        </h2>
        <div style={{ display: 'grid', gap: 12 }}>
          {domains.map(d => (
            <div key={d.id} className="glass-card" style={{ padding: '20px 24px' }}>
              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{
                  width: 42, height: 42, borderRadius: 10, flexShrink: 0,
                  background: `${d.color}18`, border: `1px solid ${d.color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.875rem', fontWeight: 800, color: d.color,
                }}>
                  D{d.id}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                    <div style={{ fontWeight: 700, fontSize: '0.9375rem' }}>{d.name}</div>
                    <span style={{
                      padding: '2px 8px', borderRadius: 9999,
                      background: `${d.color}15`, color: d.color,
                      fontSize: '0.75rem', fontWeight: 600, flexShrink: 0,
                    }}>
                      {d.questions.length}Q
                    </span>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.55, marginTop: 4 }}>
                    {d.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
