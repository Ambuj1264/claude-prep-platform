'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'What is the Claude Certified Architect (Foundations) certification?',
    a: "The Claude Certified Architect (Foundations) is Anthropic's official certification that validates your expertise in Claude AI models, the Model Context Protocol (MCP), agentic AI architectures, Claude Code, and responsible AI principles. It is the entry-level credential in Anthropic's professional certification track.",
  },
  {
    q: 'How many domains does the Claude Foundations exam cover?',
    a: 'The exam covers 5 domains: (1) Claude AI Models and Capabilities — understanding model families, context windows, and multimodal features; (2) Model Context Protocol (MCP) — designing secure tool integrations; (3) Agentic AI Design Patterns — multi-agent orchestration and memory; (4) Claude Code and Developer Tools — CLI workflows and IDE integrations; and (5) Responsible AI and Safety — constitutional AI, harm avoidance, and safe deployment.',
  },
  {
    q: 'What is the passing score for the Claude Architect Foundations exam?',
    a: 'The required passing score is 70%. The exam uses scenario-based multiple-choice questions that test practical decision-making, not just memorization.',
  },
  {
    q: 'What is the Model Context Protocol (MCP)?',
    a: "MCP (Model Context Protocol) is an open standard by Anthropic that lets Claude AI connect to external data sources, APIs, databases, and tools in a secure, standardized way. It uses a client-server architecture where MCP servers expose resources and tools that Claude can invoke during agentic workflows. It's a core pillar of the Foundations exam.",
  },
  {
    q: 'How is Claude Code different from the Claude chat interface?',
    a: 'Claude Code is a CLI (command-line interface) tool that embeds Claude AI directly into developer workflows. Unlike the chat interface, Claude Code can autonomously read your entire codebase, create and edit files, run terminal commands, manage git branches, and integrate with VS Code and JetBrains IDEs. It is designed for software engineering tasks at scale.',
  },
  {
    q: 'Does Claude Architect Prep include real exam questions?',
    a: 'Yes. Premium access includes 60 real exam-style questions in a timed simulation that mirrors the actual Foundations exam experience, plus 150+ scenario-based practice questions across all 5 domains with detailed explanations.',
  },
  {
    q: 'What are agentic AI design patterns covered in the exam?',
    a: 'The exam covers patterns such as: multi-agent orchestration (coordinator + specialist agents), memory architectures (in-context vs. external memory), tool use and function calling, human-in-the-loop approval workflows, parallel vs. sequential agent pipelines, and error handling in long-running agentic tasks.',
  },
  {
    q: 'Is there a refund policy for Claude Architect Prep?',
    a: 'All purchases are non-refundable. We recommend exploring the free practice questions before purchasing to confirm the platform fits your learning style.',
  },
];

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      aria-labelledby="faq-heading"
      style={{ marginTop: 64, marginBottom: 32 }}
      itemScope
      itemType="https://schema.org/FAQPage"
    >
      <h2
        id="faq-heading"
        style={{ fontSize: '1.375rem', fontWeight: 800, marginBottom: 6, color: 'var(--text-primary)' }}
      >
        Frequently Asked Questions
      </h2>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: 24, lineHeight: 1.6 }}>
        Everything you need to know about the Claude Certified Architect Foundations exam and this study platform.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="glass-card"
            itemScope
            itemProp="mainEntity"
            itemType="https://schema.org/Question"
            style={{ borderRadius: 12, overflow: 'hidden' }}
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
              style={{
                width: '100%', textAlign: 'left',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '16px 20px', background: 'none', border: 'none', cursor: 'pointer',
                gap: 12,
              }}
            >
              <span
                itemProp="name"
                style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: 1.5 }}
              >
                {faq.q}
              </span>
              <ChevronDown
                size={16}
                aria-hidden="true"
                style={{
                  flexShrink: 0, color: 'var(--text-muted)',
                  transform: open === i ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s',
                }}
              />
            </button>

            {open === i && (
              <div
                itemScope
                itemProp="acceptedAnswer"
                itemType="https://schema.org/Answer"
                style={{ padding: '0 20px 18px', borderTop: '1px solid var(--surface-border)' }}
              >
                <p
                  itemProp="text"
                  style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.75, marginTop: 14 }}
                >
                  {faq.a}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
