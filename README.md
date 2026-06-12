# Claude Architect Prep

> The #1 exam prep platform for the **Claude Certified Architect (Foundations)** certification by Anthropic.

**Live site:** [claudecertifiedarchitect.online](https://claudecertifiedarchitect.online)

---

## Overview

Claude Architect Prep is a full-stack SaaS exam preparation platform built for developers and AI practitioners targeting Anthropic's **Claude Certified Architect (Foundations)** certification. The platform delivers 150+ scenario-based practice questions, per-domain study notes, a timed real-exam simulation, and a payment-gated premium experience — all in a responsive, dark/light-mode web app.

The certification validates proficiency across five official exam domains: Claude AI models and capabilities, the Model Context Protocol (MCP), agentic AI design patterns, Claude Code and developer tools, and responsible AI & safety principles.

---

## Features

| Feature | Details |
|---|---|
| Practice questions | 150+ scenario-based MCQs across all 5 domains |
| Real exam simulation | 60-question timed test mirroring the actual exam format |
| Answer explanations | Detailed rationale + "why wrong" breakdowns for every option |
| Premium study notes | Structured domain notes with key points, patterns, and exam tips |
| Domain selector | Filter practice sessions by individual exam domain |
| Progress tracking | Per-session score, domain breakdown, and time tracking |
| Authentication | Email/password auth via NextAuth |
| Payment | Razorpay-powered one-time payment with coupon support |
| SEO | Full metadata, JSON-LD structured data, sitemap, robots, llms.txt |
| AI discoverability | `llms.txt` standard for AI crawler indexing |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Auth | NextAuth.js |
| Database | MongoDB (Mongoose) |
| Payments | Razorpay |
| Deployment | Vercel |
| Analytics | Microsoft Clarity |

---

## Exam Domains Covered

### Domain 1 — Claude Models & Capabilities
Claude AI model families (Haiku, Sonnet, Opus), Claude 3 and Claude 3.5 generations, extended thinking, context window sizes, multimodal capabilities, and model selection for production use cases.

### Domain 2 — Model Context Protocol (MCP)
MCP architecture, MCP servers and clients, tool definitions, agentic AI integration with MCP, Anthropic MCP ecosystem, and security considerations.

### Domain 3 — Agentic AI Design Patterns
Agentic workflow design, orchestrator and subagent patterns, multi-agent systems, tool use and function calling, agent memory and state management, and agentic architecture patterns.

### Domain 4 — Claude Code & Developer Tools
Claude Code CLI, slash commands, hooks, IDE integrations (VS Code, JetBrains), Claude Code settings and permissions, and developer workflow automation.

### Domain 5 — Responsible AI & Safety
Constitutional AI, RLHF, Anthropic's responsible AI principles, Claude safety mechanisms, harm avoidance, prompt injection defenses, and AI ethics certification topics.

---

## Project Structure

```
claude-prep-platform/
├── app/
│   ├── api/
│   │   ├── coupon/          # Coupon validation endpoint
│   │   ├── payment/         # Razorpay order creation & verification
│   │   └── real-questions/  # Gated premium question delivery
│   ├── components/
│   │   ├── AppClient.tsx    # Root client shell
│   │   ├── HomeView.tsx     # Landing page & pricing
│   │   ├── QuizCard.tsx     # Question card component
│   │   ├── QuizProvider.tsx # Quiz state context
│   │   ├── RealTestQuiz.tsx # Timed exam simulation
│   │   ├── ResultsScreen.tsx
│   │   ├── PremiumNotes.tsx
│   │   ├── DomainSelector.tsx
│   │   ├── AuthModal.tsx
│   │   └── AuthProvider.tsx
│   ├── lib/
│   │   ├── data/            # Question banks (domain1–5), notes, realQuestions
│   │   ├── models/          # Mongoose models (User, Transaction)
│   │   ├── db.ts            # MongoDB connection
│   │   ├── seo.ts           # Global SEO constants & keyword bank
│   │   └── types.ts         # Shared TypeScript interfaces
│   ├── checkout/            # Checkout page & layout
│   ├── dashboard/           # Authenticated user dashboard
│   ├── contact/
│   ├── privacy/
│   ├── terms/
│   ├── layout.tsx           # Root layout with font, theme, analytics
│   ├── page.tsx             # Home page with JSON-LD schema
│   ├── robots.ts
│   ├── sitemap.ts
│   └── manifest.ts
├── public/
│   ├── llms.txt             # AI crawler discoverability (llms.txt standard)
│   └── favicon.svg
├── auth.ts                  # NextAuth configuration
└── proxy.ts
```

---

## Keywords

Keywords are organised by intent cluster. These are tracked in [`app/lib/seo.ts`](app/lib/seo.ts) and used across page metadata and JSON-LD.

### Brand & Product
- Claude Architect Prep
- Claude Certified Architect exam prep
- Anthropic certification study platform

### Certification — Exact Match
- Claude Certified Architect Foundations
- Claude Certified Architect certification
- Anthropic Claude certification
- Claude Foundations exam
- Claude Foundations certification
- Claude Certified Architect exam

### Practice Tests & Study Material
- Claude Certified Architect practice test
- Claude Certified Architect practice questions
- Claude Certified Architect study guide
- Claude Foundations practice exam
- Anthropic exam practice questions
- Claude AI exam questions

### Domain 1 — Claude Models & Capabilities
- Claude AI models
- Claude 3 Haiku Sonnet Opus
- Claude 3.5 Sonnet exam
- Anthropic Claude capabilities
- Claude extended thinking
- Claude context window exam
- Claude multimodal AI certification

### Domain 2 — Model Context Protocol
- Model Context Protocol exam
- MCP certification
- MCP exam questions
- Anthropic MCP study guide
- MCP server certification
- MCP agentic AI

### Domain 3 — Agentic AI Design Patterns
- Agentic AI certification
- Agentic AI design patterns exam
- Claude agent architecture
- Multi-agent systems Claude
- Claude tool use exam
- Orchestrator subagent Claude
- Agentic workflow certification

### Domain 4 — Claude Code & Developer Tools
- Claude Code certification
- Claude Code exam prep
- Claude Code CLI exam
- Claude Code developer tools
- Claude Code hooks exam
- Claude Code slash commands

### Domain 5 — Responsible AI & Safety
- Responsible AI certification
- Claude safety exam
- Anthropic responsible AI
- Claude constitutional AI exam
- AI safety certification
- Claude RLHF exam

### Long-Tail / Buyer Intent
- How to pass Claude Certified Architect exam
- Claude Foundations exam tips
- Claude Certified Architect study material
- Best Claude certification course
- Claude AI exam prep course
- Anthropic certification how to pass
- Claude architect exam domains
- Is Claude Certified Architect worth it

> **Note:** Semrush MCP live keyword data (search volume, KD, CPC) requires an upgraded Semrush plan. Visit [semrush.com/mcp-access](https://www.semrush.com/mcp-access) to enable it and enrich this section with live metrics.

---

## SEO & Discoverability

- **Metadata** — title, description, Open Graph, and Twitter card on every page
- **JSON-LD** — `WebSite`, `Organization`, `Course`, `FAQPage`, `SoftwareApplication`, and `BreadcrumbList` schema on the home page
- **Sitemap** — auto-generated at `/sitemap.xml` via `app/sitemap.ts`
- **Robots** — `/robots.txt` via `app/robots.ts`; `/dashboard` and `/api/` are disallowed
- **llms.txt** — `public/llms.txt` follows the emerging standard for AI crawler discoverability (ChatGPT, Claude, Perplexity, Gemini)
- **Analytics** — Microsoft Clarity for session replay and heatmaps
- **Canonical URLs** — set on all indexable pages via `buildCanonical()` from `app/lib/seo.ts`

---

## Target Audience

- Software engineers and solution architects preparing for the Anthropic Claude Certified Architect (Foundations) exam
- AI practitioners building production systems with Claude APIs
- Developers working with MCP, agentic AI, and Claude Code
- Teams evaluating Anthropic certifications for professional development

---

## Getting Started

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
# Fill in: MONGODB_URI, NEXTAUTH_SECRET, NEXTAUTH_URL, RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

| Variable | Description |
|---|---|
| `MONGODB_URI` | MongoDB connection string |
| `NEXTAUTH_SECRET` | NextAuth secret |
| `NEXTAUTH_URL` | Base URL for NextAuth callbacks |
| `RAZORPAY_KEY_ID` | Razorpay public key |
| `RAZORPAY_KEY_SECRET` | Razorpay secret key |

---

## Deployment

Deployed on **Vercel** at [claudecertifiedarchitect.online](https://claudecertifiedarchitect.online). Merging to `master` triggers an automatic production deployment.

---

## Contact

- **Site:** https://claudecertifiedarchitect.online
- **Email:** placedai@outlook.com
- **Twitter:** [@claudearchprep](https://twitter.com/claudearchprep)
