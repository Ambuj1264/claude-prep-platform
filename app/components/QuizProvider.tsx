'use client';
import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { domains, allQuestions } from '../lib/data';
import { Question, UserAnswer, QuizSession } from '../lib/types';

interface QuizCtx {
  session: QuizSession | null;
  startQuiz: (domainId: number | null, shuffle?: boolean) => void;
  submitAnswer: (letter: 'A' | 'B' | 'C' | 'D') => void;
  nextQuestion: () => void;
  resetQuiz: () => void;
  currentQ: Question | null;
  currentAnswer: UserAnswer | null;
  progress: number; // 0-100
  score: number;
  totalAnswered: number;
}

const Ctx = createContext<QuizCtx>({} as QuizCtx);

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export function QuizProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<QuizSession | null>(null);

  const startQuiz = useCallback((domainId: number | null, doShuffle = true) => {
    const qs = domainId
      ? (domains.find(d => d.id === domainId)?.questions ?? [])
      : allQuestions;
    const questions = doShuffle ? shuffle(qs) : qs;
    setSession({
      domainId, questions, currentIndex: 0,
      answers: [], startTime: Date.now(), isComplete: false,
    });
  }, []);

  const submitAnswer = useCallback((letter: 'A' | 'B' | 'C' | 'D') => {
    setSession(s => {
      if (!s || s.isComplete) return s;
      const q = s.questions[s.currentIndex];
      if (!q) return s;
      // prevent double-answering
      if (s.answers.find(a => a.questionId === q.id)) return s;
      const ans: UserAnswer = {
        questionId: q.id,
        selectedAnswer: letter,
        isCorrect: letter === q.correctAnswer,
        timeSpent: Date.now() - s.startTime,
      };
      return { ...s, answers: [...s.answers, ans] };
    });
  }, []);

  const nextQuestion = useCallback(() => {
    setSession(s => {
      if (!s) return s;
      const next = s.currentIndex + 1;
      return { ...s, currentIndex: next, isComplete: next >= s.questions.length };
    });
  }, []);

  const resetQuiz = useCallback(() => setSession(null), []);

  const currentQ = session?.questions[session.currentIndex] ?? null;
  const currentAnswer = session
    ? (session.answers.find(a => a.questionId === currentQ?.id) ?? null)
    : null;
  const totalAnswered = session?.answers.length ?? 0;
  const score = session?.answers.filter(a => a.isCorrect).length ?? 0;
  const progress = session
    ? Math.round((session.currentIndex / session.questions.length) * 100)
    : 0;

  return (
    <Ctx.Provider value={{ session, startQuiz, submitAnswer, nextQuestion, resetQuiz, currentQ, currentAnswer, progress, score, totalAnswered }}>
      {children}
    </Ctx.Provider>
  );
}

export const useQuiz = () => useContext(Ctx);
