'use client';
import { useState } from 'react';
import { premiumNotes, noteCategories } from '../lib/data/notes';
import { ChevronDown, ChevronRight, BookOpen, Lightbulb, Star, AlertTriangle } from 'lucide-react';
import { Note } from '../lib/types';

const priorityConfig = {
  critical: { label: 'Critical', icon: <AlertTriangle size={11} />, cls: 'priority-critical' },
  high:     { label: 'High',     icon: <Star size={11} />,          cls: 'priority-high' },
  medium:   { label: 'Medium',   icon: <BookOpen size={11} />,      cls: 'priority-medium' },
  low:      { label: 'Low',      icon: <BookOpen size={11} />,      cls: 'priority-medium' },
};

function NoteCard({ note }: { note: Note }) {
  const [open, setOpen] = useState(false);
  const pc = priorityConfig[note.priority];

  return (
    <div className="glass-card" style={{ overflow: 'hidden', marginBottom: 12 }}>
      <div className="collapsible-header" onClick={() => setOpen(o => !o)}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1 }}>
          {note.pattern && (
            <span style={{
              width: 36, height: 36, borderRadius: 8,
              background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.6875rem', fontWeight: 800, color: '#a5b4fc', flexShrink: 0,
            }}>
              {note.pattern.split(' ')[0]}
            </span>
          )}
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.9375rem', lineHeight: 1.3 }}>{note.title}</div>
            <div style={{ marginTop: 4, display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
              <span className="pattern-pill" style={{ fontSize: '0.7rem' }}>{note.category}</span>
              <span className={`domain-badge ${pc.cls}`} style={{ fontSize: '0.7rem', padding: '2px 8px' }}>
                {pc.icon} {pc.label}
              </span>
            </div>
          </div>
        </div>
        {open ? <ChevronDown size={16} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
               : <ChevronRight size={16} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />}
      </div>

      {open && (
        <div className="animate-slide-up" style={{ padding: '0 20px 20px' }}>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 16, fontSize: '0.9rem' }}>
            {note.content}
          </p>

          <div style={{
            background: 'rgba(255,255,255,0.04)', borderRadius: 10,
            padding: '14px 16px', marginBottom: 14,
            border: '1px solid var(--surface-border)',
          }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: 10 }}>
              KEY POINTS
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {note.keyPoints.map((p, i) => (
                <li key={i} style={{ display: 'flex', gap: 10, fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                  <span style={{ color: 'var(--color-primary)', fontWeight: 700, flexShrink: 0, marginTop: 1 }}>→</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>

          {note.interviewTip && (
            <div style={{
              background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.25)',
              borderRadius: 10, padding: '12px 16px',
              display: 'flex', gap: 10,
            }}>
              <Lightbulb size={16} style={{ color: 'var(--color-accent)', flexShrink: 0, marginTop: 2 }} />
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                <strong style={{ color: 'var(--color-accent)' }}>Exam Tip: </strong>
                {note.interviewTip}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function PremiumNotes() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const categories = ['All', ...noteCategories];

  const filtered = activeCategory === 'All'
    ? premiumNotes
    : premiumNotes.filter(n => n.category === activeCategory);

  const criticalCount = premiumNotes.filter(n => n.priority === 'critical').length;

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: 6 }}>Premium Notes</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          {premiumNotes.length} exam patterns · {criticalCount} critical for the exam
        </p>
      </div>

      {/* Category filter */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={activeCategory === cat ? 'btn-primary' : 'btn-ghost'}
            style={{ fontSize: '0.8125rem', padding: '6px 14px' }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Notes list */}
      <div>
        {filtered.map(note => <NoteCard key={note.id} note={note} />)}
      </div>
    </div>
  );
}
