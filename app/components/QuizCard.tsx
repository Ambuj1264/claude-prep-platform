'use client';
import { useState } from 'react';
import { useQuiz } from './QuizProvider';
import { CheckCircle, XCircle, ChevronRight, AlertCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { domains } from '../lib/data';

export function QuizCard({ onDone }: { onDone: () => void }) {
  const { currentQ, currentAnswer, session, submitAnswer, nextQuestion, score, progress } = useQuiz();
  const [selected, setSelected] = useState<'A' | 'B' | 'C' | 'D' | null>(null);

  if (!currentQ || !session) return null;

  const answered = !!currentAnswer;
  const domain = domains.find(d => d.id === currentQ.domain);
  const isLast = session.currentIndex >= session.questions.length - 1;

  function handleSelect(letter: 'A' | 'B' | 'C' | 'D') {
    if (answered) return;
    setSelected(letter);
    submitAnswer(letter);
  }

  function handleNext() {
    setSelected(null);
    if (isLast) { onDone(); return; }
    nextQuestion();
  }

  function getOptionClass(letter: 'A' | 'B' | 'C' | 'D') {
    if (!answered) return 'option-btn';
    if (letter === currentQ?.correctAnswer) return 'option-btn reveal-correct';
    if (letter === currentAnswer?.selectedAnswer && !currentAnswer.isCorrect) return 'option-btn selected-wrong';
    return 'option-btn';
  }

  return (
    <div className="animate-slide-up" style={{ maxWidth: 800, margin: '0 auto' }}>
      {/* Progress header */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {domain && (
              <span style={{
                padding: '3px 10px', borderRadius: 9999,
                background: `${domain.color}18`, border: `1px solid ${domain.color}30`,
                fontSize: '0.75rem', fontWeight: 600, color: domain.color,
              }}>
                {domain.shortName}
              </span>
            )}
            <span style={{ color: 'var(--text-muted)', fontSize: '0.8125rem' }}>
              Q{session.currentIndex + 1} / {session.questions.length}
            </span>
          </div>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 600 }}>
            Score: {score}/{session.answers.length}
          </span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Question card */}
      <div className="glass-card" style={{ padding: '28px 32px', marginBottom: 20 }}>
        <div className="react-markdown" style={{
          marginBottom: 8,
          fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.06em',
          textTransform: 'uppercase', color: 'var(--text-muted)',
        }}>
          Scenario: <ReactMarkdown components={{p: 'span'}}>{currentQ.scenario}</ReactMarkdown>
        </div>
        <div className="react-markdown" style={{ fontSize: '1rem', lineHeight: 1.7, fontWeight: 400 }}>
          <ReactMarkdown>{currentQ.question}</ReactMarkdown>
        </div>
      </div>

      {/* Options */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
        {currentQ.options.map(opt => (
          <button
            key={opt.letter}
            className={getOptionClass(opt.letter)}
            onClick={() => handleSelect(opt.letter)}
            disabled={answered}
            id={`option-${opt.letter}`}
          >
            <span className="option-letter">{opt.letter}</span>
            <div className="react-markdown" style={{ flex: 1 }}>
              <ReactMarkdown>{opt.text}</ReactMarkdown>
            </div>
            {answered && opt.letter === currentQ.correctAnswer && (
              <CheckCircle size={18} style={{ color: 'var(--color-correct)', flexShrink: 0 }} />
            )}
            {answered && opt.letter === currentAnswer?.selectedAnswer && !currentAnswer.isCorrect && (
              <XCircle size={18} style={{ color: 'var(--color-wrong)', flexShrink: 0 }} />
            )}
          </button>
        ))}
      </div>

      {/* Explanation */}
      {answered && (
        <div
          className={`explanation-card ${currentAnswer?.isCorrect ? 'explanation-correct' : 'explanation-wrong'}`}
          style={{ marginTop: 0, marginBottom: 20 }}
        >
          <div style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
            {currentAnswer?.isCorrect
              ? <CheckCircle size={20} style={{ color: 'var(--color-correct)', flexShrink: 0, marginTop: 2 }} />
              : <XCircle size={20} style={{ color: 'var(--color-wrong)', flexShrink: 0, marginTop: 2 }} />
            }
            <div>
              <div style={{ fontWeight: 700, marginBottom: 6, fontSize: '0.9375rem' }}>
                {currentAnswer?.isCorrect ? '✓ Correct!' : `✗ Correct answer: ${currentQ.correctAnswer}`}
              </div>
              <div className="react-markdown" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.65 }}>
                <ReactMarkdown>{currentQ.explanation}</ReactMarkdown>
              </div>
            </div>
          </div>

          {currentQ.whyWrong.length > 0 && (
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 14, marginTop: 4 }}>
              <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: 10, letterSpacing: '0.04em' }}>
                WHY THE DISTRACTORS ARE WRONG
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {currentQ.whyWrong.map(w => (
                  <div key={w.letter} style={{ display: 'flex', gap: 10, fontSize: '0.875rem' }}>
                    <span style={{
                      minWidth: 22, height: 22, borderRadius: '50%',
                      background: 'rgba(244,63,94,0.15)', border: '1px solid rgba(244,63,94,0.3)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-wrong)', flexShrink: 0,
                    }}>{w.letter}</span>
                    <div className="react-markdown" style={{ color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                      <ReactMarkdown>{w.reason}</ReactMarkdown>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ marginTop: 14, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            <span className="pattern-pill">
              <AlertCircle size={11} />
              {currentQ.pattern}
            </span>
          </div>
        </div>
      )}

      {/* Next button */}
      {answered && (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button className="btn-primary" onClick={handleNext} id="btn-next">
            {isLast ? 'See Results' : 'Next Question'}
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
