export const SITE_URL = 'https://claude-prep-platform.vercel.app';
export const SITE_NAME = 'Claude Architect Prep';
export const SITE_DESCRIPTION =
  'The #1 exam prep platform for the Claude Certified Architect (Foundations) certification. Master all 5 domains with 150+ scenario-based questions, detailed explanations, and premium study notes.';

export const OG_IMAGE = `${SITE_URL}/og-image.png`;
export const TWITTER_HANDLE = '@claudearchprep';

export function buildCanonical(path: string) {
  return `${SITE_URL}${path}`;
}
