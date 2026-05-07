export interface Option {
  letter: 'A' | 'B' | 'C' | 'D';
  text: string;
}

export interface Question {
  id: number;
  domain: number;
  scenario: string;
  question: string;
  options: Option[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  whyWrong: { letter: string; reason: string }[];
  pattern: string;
}

export interface Domain {
  id: number;
  name: string;
  shortName: string;
  description: string;
  icon: string;
  color: string;
  gradient: string;
  questions: Question[];
}

export interface UserAnswer {
  questionId: number;
  selectedAnswer: 'A' | 'B' | 'C' | 'D';
  isCorrect: boolean;
  timeSpent: number;
}

export interface QuizSession {
  domainId: number | null; // null = all domains
  questions: Question[];
  currentIndex: number;
  answers: UserAnswer[];
  startTime: number;
  isComplete: boolean;
}

export interface Note {
  id: string;
  title: string;
  category: string;
  content: string;
  keyPoints: string[];
  interviewTip?: string;
  pattern?: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
}
