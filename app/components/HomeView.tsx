'use client';
import { domains, allQuestions } from '../lib/data';
import { BookOpen, Layers, Brain, Zap, FileText, Lock, Star } from 'lucide-react';
import { FaqSection } from './FaqSection';

interface Props {
  onStartQuiz: () => void;
  onOpenNotes: () => void;
  onRealTestQuestions: () => void;
}

export function HomeView({ onStartQuiz, onOpenNotes, onRealTestQuestions }: Props) {
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

        <p style={{ color: 'var(--text-secondary)', fontSize: '1.0625rem', maxWidth: 520, margin: '0 auto 28px', lineHeight: 1.65 }}>
          Scenario-based questions across all 5 domains with detailed explanations, pattern analysis, and premium study notes.
        </p>

        {/* Real Test Questions — hero CTA */}
        <div style={{ margin: '0 auto 32px', maxWidth: 560 }}>
          <button
            onClick={onRealTestQuestions}
            id="btn-real-test"
            style={{
              width: '100%', padding: '20px 32px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14,
              borderRadius: 16, fontWeight: 800, cursor: 'pointer', fontSize: '1.2rem',
              background: 'linear-gradient(135deg, #d97757 0%, #c2643d 100%)',
              color: 'white', border: 'none',
              boxShadow: '0 8px 32px rgba(217,119,87,0.45)',
              transition: 'transform 0.15s, box-shadow 0.15s',
              letterSpacing: '-0.01em',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
              (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 12px 40px rgba(217,119,87,0.55)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.transform = '';
              (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 32px rgba(217,119,87,0.45)';
            }}
          >
            <FileText size={24} />
            <span>Real Test Questions</span>
            <span style={{
              padding: '3px 10px', borderRadius: 9999,
              background: 'rgba(255,255,255,0.25)', fontSize: '0.75rem',
              fontWeight: 700, letterSpacing: '0.02em',
            }}>
              PREMIUM
            </span>
          </button>

          {/* Trust row */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 16, marginTop: 10, flexWrap: 'wrap',
          }}>
            {[
              { icon: <Lock size={11} />, label: 'Login required' },
              { icon: <Star size={11} />, label: '60 real exam questions' },
              { icon: <FileText size={11} />, label: 'Detailed explanations' },
            ].map(({ icon, label }) => (
              <span key={label} style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                fontSize: '0.75rem', color: 'var(--text-muted)',
              }}>
                {icon} {label}
              </span>
            ))}
          </div>
        </div>

        {/* Secondary actions */}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn-primary" onClick={onStartQuiz} id="btn-start-quiz" style={{ padding: '11px 24px', fontSize: '0.9375rem' }}>
            <Brain size={17} /> Start Practice
          </button>
          <button className="btn-ghost" onClick={onOpenNotes} id="btn-open-notes" style={{ padding: '11px 20px', fontSize: '0.9375rem' }}>
            <BookOpen size={17} /> Premium Notes
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
      <FaqSection />

      {/* GEO: About section — entity-rich content for AI search engines */}
      <section aria-labelledby="about-heading" style={{ marginTop: 48, marginBottom: 32 }}>
        <h2 id="about-heading" style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: 12, color: 'var(--text-primary)' }}>
          About the Claude Certified Architect Foundations Exam
        </h2>
        <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          {[
            {
              title: 'What is the Certification?',
              body: 'The Claude Certified Architect (Foundations) is Anthropic\'s official credential for professionals who design and deploy Claude AI systems. It validates expertise in model selection, MCP integrations, agentic patterns, and safe AI deployment.',
            },
            {
              title: 'Who Should Take This Exam?',
              body: 'Software engineers, AI architects, product managers, and technical leads building applications with Claude AI. It\'s ideal for anyone integrating Claude into production systems or seeking official Anthropic certification.',
            },
            {
              title: 'How to Prepare Effectively',
              body: 'Focus on all 5 domains, especially MCP and agentic patterns which have the highest question density. Practice scenario-based questions rather than memorizing docs. Aim for consistent 75%+ on practice tests before sitting the exam.',
            },
          ].map(({ title, body }) => (
            <div key={title} className="glass-card" style={{ padding: '20px 24px' }}>
              <h3 style={{ fontWeight: 700, fontSize: '0.9375rem', marginBottom: 8, color: 'var(--text-primary)' }}>{title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.7 }}>{body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
