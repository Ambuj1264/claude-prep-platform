import { Domain } from '../types';
import { domain1Questions } from './domain1';
import { domain2Questions } from './domain2';
import { domain3Questions } from './domain3';
import { domain4Questions } from './domain4';
import { domain5Questions } from './domain5';

export const domains: Domain[] = [
  {
    id: 1,
    name: 'Agentic Architecture & System Design',
    shortName: 'Agentic Architecture',
    description: 'Multi-agent coordination, tool orchestration, agent loops, stop reason handling, and session management patterns.',
    icon: 'cpu',
    color: 'var(--domain-1)',
    gradient: 'var(--domain-1)',
    questions: domain1Questions,
  },
  {
    id: 2,
    name: 'Tool Design & MCP Integration',
    shortName: 'Tool Design & MCP',
    description: 'MCP tool definitions, descriptions, error contracts, configuration hierarchy, and structured output via tool use.',
    icon: 'wrench',
    color: 'var(--domain-2)',
    gradient: 'var(--domain-2)',
    questions: domain2Questions,
  },
  {
    id: 3,
    name: 'Claude Code Configuration & Workflows',
    shortName: 'Claude Code Config',
    description: 'CLAUDE.md hierarchy, skills, rules, path-scoped configs, CI/CD integration, plan mode, and session management.',
    icon: 'settings',
    color: 'var(--domain-3)',
    gradient: 'var(--domain-3)',
    questions: domain3Questions,
  },
  {
    id: 4,
    name: 'Prompt Engineering & Structured Output',
    shortName: 'Prompt Engineering',
    description: 'Few-shot examples, tool_choice, JSON schemas, batch API, self-review limitations, and multi-pass review.',
    icon: 'message-square',
    color: 'var(--domain-4)',
    gradient: 'var(--domain-4)',
    questions: domain4Questions,
  },
  {
    id: 5,
    name: 'Context Management & Reliability',
    shortName: 'Context & Reliability',
    description: 'Progressive summarization, lost-in-the-middle, error propagation, escalation triggers, and metric design.',
    icon: 'shield',
    color: 'var(--domain-5)',
    gradient: 'var(--domain-5)',
    questions: domain5Questions,
  },
];

export const allQuestions = domains.flatMap(d => d.questions);

export function getQuestionsByDomain(domainId: number) {
  return domains.find(d => d.id === domainId)?.questions ?? [];
}

export function getDomainById(domainId: number) {
  return domains.find(d => d.id === domainId);
}

export { domain1Questions, domain2Questions, domain3Questions, domain4Questions, domain5Questions };
