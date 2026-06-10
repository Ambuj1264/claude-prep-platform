export const SITE_URL = 'https://claudecertifiedarchitect.online';
export const SITE_NAME = 'Claude Architect Prep';
export const SITE_DESCRIPTION =
  'The #1 exam prep platform for the Claude Certified Architect (Foundations) certification. Master all 5 domains with 150+ scenario-based questions, detailed explanations, and premium study notes.';

export const OG_IMAGE = `${SITE_URL}/og-image.png`;
export const TWITTER_HANDLE = '@claudearchprep';

/**
 * Core keyword bank — sourced from all 5 official exam domains.
 * Used across page metadata, JSON-LD, and page copy.
 */
export const GLOBAL_KEYWORDS = [
  // Brand / product
  'Claude Architect Prep',
  'Claude Certified Architect exam prep',
  'Anthropic certification study platform',

  // Certification — exact match
  'Claude Certified Architect Foundations',
  'Claude Certified Architect certification',
  'Anthropic Claude certification',
  'Claude Foundations exam',
  'Claude Foundations certification',
  'Anthropic Foundations certification',
  'Claude Certified Architect exam',

  // Practice tests / study material
  'Claude Certified Architect practice test',
  'Claude Certified Architect practice questions',
  'Claude Certified Architect study guide',
  'Claude Foundations practice exam',
  'Anthropic exam practice questions',
  'Claude AI exam questions',
  'Claude AI certification questions',

  // Domain 1 — Claude Models & Capabilities
  'Claude AI models',
  'Claude 3 Haiku Sonnet Opus',
  'Claude 3.5 Sonnet exam',
  'Anthropic Claude capabilities',
  'Claude extended thinking',
  'Claude context window exam',
  'Claude multimodal AI certification',

  // Domain 2 — Model Context Protocol (MCP)
  'Model Context Protocol exam',
  'MCP certification',
  'MCP exam questions',
  'Anthropic MCP study guide',
  'MCP server certification',
  'Model Context Protocol tutorial',
  'MCP agentic AI',

  // Domain 3 — Agentic AI Design Patterns
  'agentic AI certification',
  'agentic AI design patterns exam',
  'Claude agent architecture',
  'multi-agent systems Claude',
  'Claude tool use exam',
  'orchestrator subagent Claude',
  'agentic workflow certification',

  // Domain 4 — Claude Code & Developer Tools
  'Claude Code certification',
  'Claude Code exam prep',
  'Claude Code CLI exam',
  'Anthropic Claude Code study',
  'Claude Code developer tools',
  'Claude Code hooks exam',
  'Claude Code slash commands',

  // Domain 5 — Responsible AI & Safety
  'responsible AI certification',
  'Claude safety exam',
  'Anthropic responsible AI',
  'Claude constitutional AI exam',
  'AI safety certification',
  'Claude RLHF exam',

  // Long-tail buyer intent
  'how to pass Claude Certified Architect exam',
  'Claude Foundations exam tips',
  'Claude Certified Architect study material',
  'best Claude certification course',
  'Claude AI exam prep course',
  'Anthropic certification how to pass',
  'Claude architect exam domains',
  'Claude Foundations exam difficulty',
  'is Claude Certified Architect worth it',
];

export function buildCanonical(path: string) {
  return `${SITE_URL}${path}`;
}
