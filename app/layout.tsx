import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from './components/AuthProvider';

export const metadata: Metadata = {
  title: 'Claude Architect Foundations — Exam Prep',
  description: 'Premium study platform for the Claude Certified Architect (Foundations) certification. Master all 5 domains with scenario-based questions, detailed explanations, and pattern analysis.',
  keywords: 'Claude AI, Anthropic, certification, exam prep, agentic AI, MCP, Claude Code',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
