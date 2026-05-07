import { Question } from '../types';

export const domain3Questions: Question[] = [
  {
    "id": 301,
    "domain": 3,
    "scenario": "S2 Code Generation with Claude Code",
    "question": "A platform team has a monorepo at `/repo` with `./CLAUDE.md` (200 lines of org-wide conventions), `./services/billing/CLAUDE.md` (150 lines of billing-specific rules), and each engineer has `~/.claude/CLAUDE.md` with personal formatting preferences. An engineer launches `claude` from `/repo/services/billing` and asks \"why are my personal shell aliases not showing up in context?\" They run `/memory` and see all three files listed. Billing rules conflict with the personal file's linting preference; Claude follows the billing file. What is the most accurate explanation?",
    "options": [
      {
        "letter": "A",
        "text": "All three files are concatenated into context; when rules conflict, more-specific project/directory context effectively wins over user-level preferences because later or more-specific content has greater influence."
      },
      {
        "letter": "B",
        "text": "Personal `~/.claude/CLAUDE.md` is only loaded when working from the home directory, not from a project subdirectory."
      },
      {
        "letter": "C",
        "text": "Project-level `CLAUDE.md` files override and replace user-level files entirely, so the personal file is silently discarded."
      },
      {
        "letter": "D",
        "text": "Claude Code loads files in alphabetical order, and `billing` sorts after `home`, so the billing file overwrites personal preferences."
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "B",
        "reason": "`~/.claude/CLAUDE.md` loads for every session regardless of CWD; it is the global user memory."
      },
      {
        "letter": "C",
        "reason": "Project files do not replace user files — they concatenate. The engineer saw all three in `/memory`, which disproves overriding."
      },
      {
        "letter": "D",
        "reason": "Loading order follows a documented hierarchy (managed → project → user → local), not alphabetical file-name sort. **Pattern/Trap:** P15 Configuration Hierarchy; P6 Context Inheritance Misconception ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 302,
    "domain": 3,
    "scenario": "S5 Claude Code for CI/CD",
    "question": "A CI pipeline runs `claude -p \"Review this PR diff\" --output-format json` on every pull request. Reviews are inconsistent: some runs flag import ordering, others don't; 14% of runs produce different severity ratings on identical diffs. The team has a local `~/.claude/CLAUDE.md` on the CI runner with personal preferences, plus `./CLAUDE.md` with review standards, plus a teammate's MCP server auto-discovered on the runner. What single flag change produces the most reproducible CI behavior?",
    "options": [
      {
        "letter": "A",
        "text": "Add `--resume <fixed-session-id>` so every run continues the same conversation."
      },
      {
        "letter": "B",
        "text": "Switch to `--output-format stream-json` to serialize events deterministically."
      },
      {
        "letter": "C",
        "text": "Add `--bare` so auto-discovery of CLAUDE.md, hooks, skills, and MCP servers is skipped, and pass context explicitly via `--append-system-prompt-file`."
      },
      {
        "letter": "D",
        "text": "Set `--permission-mode plan` so the run never writes and therefore can't diverge."
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "Resuming a fixed session across unrelated PRs bleeds review context between PRs; each CI run should be a fresh session for review-isolation reasons."
      },
      {
        "letter": "B",
        "reason": "`stream-json` changes the output shape for observability but does nothing to reduce input nondeterminism from auto-discovered config."
      },
      {
        "letter": "D",
        "reason": "Plan mode restricts writes but doesn't fix variable input context; the review output would still drift. **Pattern/Trap:** P15 Configuration Hierarchy; P18 Fresh Session vs Resume ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 303,
    "domain": 3,
    "scenario": "S2 Code Generation with Claude Code",
    "question": "A team of 40 engineers has a 900-line `./CLAUDE.md` covering API conventions, test patterns, deployment notes, database migration rules, and security policy. Engineers complain Claude frequently ignores the \"always add integration tests\" rule buried around line 620. Token usage is also high — 8% of every session's context is consumed by this file. What is the best refactor?",
    "options": [
      {
        "letter": "A",
        "text": "Switch the entire file to bullet points so Claude scans it faster, keeping all 900 lines."
      },
      {
        "letter": "B",
        "text": "Append `@large-rules.md` imports so the CLAUDE.md itself is short, while the imported file stays 900 lines."
      },
      {
        "letter": "C",
        "text": "Keep CLAUDE.md as-is and tell engineers to re-prompt Claude when it misses a rule."
      },
      {
        "letter": "D",
        "text": "Move always-applicable rules to a concise root `CLAUDE.md` (~180 lines), move procedural playbooks (e.g., migration workflow) into `.claude/skills/<name>/SKILL.md` files, and move file-type-specific rules into `.claude/rules/*.md` with `paths:` globs."
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "Format doesn't fix the core problem: the file is too long; the model's adherence degrades regardless of bullet vs. prose when guidance exceeds the effective attention budget."
      },
      {
        "letter": "B",
        "reason": "`@imports` are **expanded into context at launch** — they organize files but do not reduce total tokens or improve adherence."
      },
      {
        "letter": "C",
        "reason": "Re-prompting is a prompt-only symptomatic fix; the root cause (oversized always-loaded memory) remains. **Pattern/Trap:** P3 Over-Engineering Distractor; P17 Lost in the Middle; P10 Root Cause vs Symptom ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 304,
    "domain": 3,
    "scenario": "S4 Developer Productivity with Claude",
    "question": "An engineer runs `/memory` and sees only `./CLAUDE.md` listed — no user-level file, despite having `~/.claude/CLAUDE.md` with 60 lines of personal preferences they wrote last week. The file exists and `cat ~/.claude/CLAUDE.md` shows content. What is the most likely root cause?",
    "options": [
      {
        "letter": "A",
        "text": "The user file needs to be renamed to `USER.md` to be recognized."
      },
      {
        "letter": "B",
        "text": "The `claudeMdExcludes` setting at the project or user level has a glob matching the personal file, silently excluding it."
      },
      {
        "letter": "C",
        "text": "Claude Code only loads user memory when invoked with `--user-memory` explicitly."
      },
      {
        "letter": "D",
        "text": "User-level CLAUDE.md is deprecated; only `.claude/CLAUDE.md` at project level is supported now."
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "The file must be named `CLAUDE.md` (or `CLAUDE.local.md` for personal per-project); `USER.md` is not a recognized name."
      },
      {
        "letter": "C",
        "reason": "No `--user-memory` flag exists; user memory auto-loads by default."
      },
      {
        "letter": "D",
        "reason": "User-level `~/.claude/CLAUDE.md` is fully supported and is the documented location for personal global preferences. **Pattern/Trap:** P15 Configuration Hierarchy; P10 Root Cause vs Symptom ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 305,
    "domain": 3,
    "scenario": "S2 Code Generation with Claude Code",
    "question": "A team wants TypeScript files in `src/api/**/*.ts` to follow strict error-handling rules (custom `AppError` class, no raw `throw`), but these rules should NOT apply to test files or other file types. They want the rules to load *only* when Claude actually touches a matching file, keeping baseline context lean. Which implementation is correct?",
    "options": [
      {
        "letter": "A",
        "text": "Create `.claude/rules/api-errors.md` with frontmatter `paths: [\"src/api/**/*.ts\"]` containing the rules."
      },
      {
        "letter": "B",
        "text": "Append the rules to the root `CLAUDE.md` under a heading \"Only for src/api/**/*.ts files\" and trust Claude to self-scope."
      },
      {
        "letter": "C",
        "text": "Create `src/api/CLAUDE.md` with the rules — subdirectory files provide perfect glob-pattern scoping."
      },
      {
        "letter": "D",
        "text": "Create `.claude/skills/api-errors/SKILL.md` with `allowed-tools: Edit` and expect Claude to invoke it automatically on every edit."
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "B",
        "reason": "CLAUDE.md is always loaded in full; self-scoping via a prose heading is prompt-only enforcement, inconsistent in practice, and consumes tokens even when not relevant."
      },
      {
        "letter": "C",
        "reason": "Subdirectory CLAUDE.md loads for *any* file read in that subtree (not just `.ts`), so tests under `src/api` would also trigger it — the scope is directory-only, not glob."
      },
      {
        "letter": "D",
        "reason": "`allowed-tools` does not restrict — it pre-approves. Skills are invoked on semantic match, not automatically on every edit to a path; use rules for path-gated always-on guidance. **Pattern/Trap:** P1 Prompt vs Programmatic Enforcement; P15 Configuration Hierarchy ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 306,
    "domain": 3,
    "scenario": "S5 Claude Code for CI/CD",
    "question": "A CI job runs `claude -p \"Review this PR diff\" --output-format json` and parses `.result` with jq. The team wants a strict schema — an array of findings each with `severity`, `file`, `line`, `message` — to feed into their code-quality dashboard. Currently ~22% of runs emit prose that breaks jq parsing. What is the correct fix?",
    "options": [
      {
        "letter": "A",
        "text": "Add `--json-schema '{...}'` with the desired schema; parse `.structured_output` instead of `.result`."
      },
      {
        "letter": "B",
        "text": "Add `--append-system-prompt \"Always output valid JSON\"` and hope adherence improves."
      },
      {
        "letter": "C",
        "text": "Parse `.result` with a regex-based fallback extractor."
      },
      {
        "letter": "D",
        "text": "Switch to `--output-format stream-json` and reconstruct the array from tool-use events."
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "B",
        "reason": "Prompt-only enforcement of JSON produces exactly the 22%-drift problem they already see; `--json-schema` is the programmatic fix."
      },
      {
        "letter": "C",
        "reason": "A regex fallback is a symptom-level workaround that papers over a configuration gap and will break again on new prose patterns."
      },
      {
        "letter": "D",
        "reason": "`stream-json` is for streaming observability events, not schema-enforced structured results; reconstructing from tool-use events is an over-engineered workaround when `--json-schema` exists. **Pattern/Trap:** P1 Prompt vs Programmatic Enforcement; P3 Over-Engineering Distractor ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 307,
    "domain": 3,
    "scenario": "S4 Developer Productivity with Claude",
    "question": "An engineer is asked to \"refactor the authentication layer to use OAuth2 across 17 files, including session management, token refresh, and middleware integration.\" They are unfamiliar with this codebase. Which approach best matches Anthropic's documented workflow?",
    "options": [
      {
        "letter": "A",
        "text": "Ask Claude directly in normal mode: \"implement OAuth2 everywhere\" and let it proceed."
      },
      {
        "letter": "B",
        "text": "Start with direct execution and make changes incrementally, letting the implementation reveal the natural service boundaries."
      },
      {
        "letter": "C",
        "text": "Use direct execution with comprehensive upfront instructions detailing exactly how each service should be structured."
      },
      {
        "letter": "D",
        "text": "Enter plan mode (Shift+Tab twice), ask Claude to explore the auth layer and produce a plan, review the plan, then exit to normal mode to implement."
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "Direct execution on a large, cross-cutting, architecturally ambiguous refactor is the canonical mis-application; the docs say plan mode is most useful when the change modifies multiple files and you're unfamiliar with the code."
      },
      {
        "letter": "B",
        "reason": "Incremental direct execution risks discovering cross-file dependencies late, causing costly rework that plan mode would have prevented."
      },
      {
        "letter": "C",
        "reason": "Comprehensive upfront instructions assume you already know the right structure without exploring the code — exactly what plan mode's read-only exploration phase avoids. **Pattern/Trap:** P2 First Step Proportionality ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 308,
    "domain": 3,
    "scenario": "S2 Code Generation with Claude Code",
    "question": "An engineer has this in `.claude/skills/deploy/SKILL.md`: ```yaml --- name: deploy description: Deploy the service to staging allowed-tools: Bash(kubectl *) Bash(helm *) --- ``` They expected Claude to be *restricted* to only these tools while the skill runs. In practice, Claude still used `Read` and `Write` without prompting. Which statement is correct?",
    "options": [
      {
        "letter": "A",
        "text": "`allowed-tools` restricts tool access to only the listed tools; this is a bug — file an issue."
      },
      {
        "letter": "B",
        "text": "The skill syntax is wrong — restriction requires `denied-tools` frontmatter."
      },
      {
        "letter": "C",
        "text": "Restriction only takes effect when the skill runs with `context: fork`."
      },
      {
        "letter": "D",
        "text": "`allowed-tools` **pre-approves** the listed tools so Claude won't prompt for permission; it does NOT restrict other tools. Use permission deny rules to actually block tools."
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "This is expected behavior, not a bug; the misconception is widespread but the docs are explicit."
      },
      {
        "letter": "B",
        "reason": "No `denied-tools` frontmatter exists in SKILL.md; restriction is configured at permission-settings level."
      },
      {
        "letter": "C",
        "reason": "`context: fork` isolates conversation context into a subagent; it doesn't change `allowed-tools` semantics. **Pattern/Trap:** P11 Scoped Access / Least Privilege; P1 Prompt vs Programmatic Enforcement ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 309,
    "domain": 3,
    "scenario": "S4 Developer Productivity with Claude",
    "question": "A team wants a `/deploy` slash command available *only* in the `payments-service` repo for all team members. Another engineer, working on their personal side project, should NOT see this command. Where should the skill/command live?",
    "options": [
      {
        "letter": "A",
        "text": "`~/.claude/commands/deploy.md` committed to the engineer's dotfiles repo."
      },
      {
        "letter": "B",
        "text": "`.claude/skills/deploy/SKILL.md` in the `payments-service` repo, checked into git."
      },
      {
        "letter": "C",
        "text": "`/etc/claude-code/commands/deploy.md` on every engineer's machine."
      },
      {
        "letter": "D",
        "text": "Inside the root `CLAUDE.md` as a prose instruction starting with \"when the user says `/deploy`\"."
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "`~/.claude/commands/` is user-scoped — it applies across ALL projects for that one engineer, which is the opposite of the requirement."
      },
      {
        "letter": "C",
        "reason": "`/etc/claude-code/` holds managed policy CLAUDE.md, not commands/skills, and requires admin provisioning on every machine — wrong mechanism and wrong scope."
      },
      {
        "letter": "D",
        "reason": "Recognising `/deploy` in prose is simulation of a slash command; it isn't reliably invokable and doesn't appear in the `/` menu. **Pattern/Trap:** P15 Configuration Hierarchy; P1 Prompt vs Programmatic Enforcement ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 310,
    "domain": 3,
    "scenario": "S5 Claude Code for CI/CD",
    "question": "A GitHub Actions job runs the same Claude Code review command on 30 PRs per day. Engineers notice that when PR #412 is reviewed right after PR #411 (a follow-up change), Claude sometimes references issues from #411 as if they exist in #412. What is the correct architectural fix?",
    "options": [
      {
        "letter": "A",
        "text": "Add `--resume` so context carries intentionally and Claude learns the project over time."
      },
      {
        "letter": "B",
        "text": "Lower the temperature via `--model` override so Claude is more deterministic across PRs."
      },
      {
        "letter": "C",
        "text": "Increase the model's context window so both PRs fit together."
      },
      {
        "letter": "D",
        "text": "Run each PR review as a **fresh** session (no `--resume`/`--continue`) so context is isolated per PR; if a PR truly builds on a previous review, explicitly pass those findings in the prompt."
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "`--resume` causes exactly this bleed. Review quality degrades because Claude becomes biased toward prior findings on unrelated diffs."
      },
      {
        "letter": "B",
        "reason": "Temperature is not controlled via `--model`, and determinism is not the issue — context isolation is."
      },
      {
        "letter": "C",
        "reason": "Larger context doesn't fix confusion about WHICH PR is under review; it may worsen it via more noisy history. **Pattern/Trap:** P18 Fresh Session vs Resume; P19 Self-Review Limitation; P8 Larger Context Window Fallacy ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 311,
    "domain": 3,
    "scenario": "S2 Code Generation with Claude Code",
    "question": "An engineer is building a skill that does thorough cross-codebase research (\"find all call sites of the deprecated `LegacyAuth` class and report where they're used\"). They want the research to run in an isolated context so the main conversation isn't polluted with hundreds of file contents. Which SKILL.md frontmatter achieves this?",
    "options": [
      {
        "letter": "A",
        "text": "`allowed-tools: Read Grep Glob` — limits the tools so the context stays small."
      },
      {
        "letter": "B",
        "text": "`disable-model-invocation: true` — prevents Claude from auto-loading the skill body."
      },
      {
        "letter": "C",
        "text": "`context: fork` combined with `agent: Explore` — runs the skill as a forked subagent using the Explore agent type."
      },
      {
        "letter": "D",
        "text": "`user-invocable: false` — hides the skill from the `/` menu so it won't pollute."
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "`allowed-tools` pre-approves tools; it doesn't prevent the read results from filling main-conversation context."
      },
      {
        "letter": "B",
        "reason": "`disable-model-invocation` hides the skill from Claude's auto-invocation menu; it doesn't change where the skill body runs when invoked."
      },
      {
        "letter": "D",
        "reason": "`user-invocable: false` only hides the skill from the `/` menu; Claude can still auto-invoke it, and all reads still land in the main context. **Pattern/Trap:** P15 Configuration Hierarchy; P11 Scoped Access / Least Privilege ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 312,
    "domain": 3,
    "scenario": "S4 Developer Productivity with Claude",
    "question": "An engineer's session has been active for 3 hours and they've been iterating on a complex feature. They ran `/compact` and noticed that a critical rule from a subdirectory `services/auth/CLAUDE.md` (loaded earlier when Claude read `login.ts`) seemed to disappear afterward. Root `./CLAUDE.md` rules survived. Why?",
    "options": [
      {
        "letter": "A",
        "text": "`/compact` has a bug that only affects nested CLAUDE.md files."
      },
      {
        "letter": "B",
        "text": "Root `CLAUDE.md` is re-read from disk and re-injected after compaction; nested subdirectory CLAUDE.md files are summarized away and reload only on the next file read in that subtree."
      },
      {
        "letter": "C",
        "text": "Nested CLAUDE.md files are never loaded at all; the engineer imagined the rule."
      },
      {
        "letter": "D",
        "text": "`/compact` discards rules that were loaded more than 30 minutes before compaction."
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "This is documented behavior, not a bug; the summarization is intentional."
      },
      {
        "letter": "C",
        "reason": "Subdirectory CLAUDE.md files do load on demand when Claude reads files in that subtree; `/memory` would have shown it."
      },
      {
        "letter": "D",
        "reason": "`/compact` doesn't use a time-based cutoff; it summarizes the entire conversation history except for re-injected root memory and pinned skills. **Pattern/Trap:** P16 Progressive Summarization Risk; P15 Configuration Hierarchy ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 313,
    "domain": 3,
    "scenario": "S2 Code Generation with Claude Code",
    "question": "An engineer has 11 independent style rules they want enforced: \"React components use named exports,\" \"Python tests use pytest fixtures,\" \"Go files must have package comment,\" etc. Each applies to a different file pattern. They currently put all 11 rules in root `./CLAUDE.md` (~140 lines). Baseline context is bloated and adherence is 63%. What is the best restructure?",
    "options": [
      {
        "letter": "A",
        "text": "Split into 11 separate entries in `.claude/rules/*.md`, each with a `paths:` glob matching only its relevant file type; remove them from root `CLAUDE.md`."
      },
      {
        "letter": "B",
        "text": "Move all 11 rules into `~/.claude/CLAUDE.md` — user scope is less visible and won't bloat project context."
      },
      {
        "letter": "C",
        "text": "Put all 11 rules inside a single `.claude/skills/style/SKILL.md` and set `user-invocable: false` so Claude auto-invokes on edits."
      },
      {
        "letter": "D",
        "text": "Keep in root CLAUDE.md but add `@imports` to 11 separate files for organization."
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "B",
        "reason": "User scope still loads into context on every session; moving doesn't reduce bloat, just relocates it, and it removes team visibility."
      },
      {
        "letter": "C",
        "reason": "`user-invocable: false` hides from the `/` menu but does not auto-invoke on every edit; skill invocation is semantic, not path-triggered. Skills are for procedures, rules for conventions."
      },
      {
        "letter": "D",
        "reason": "`@imports` are expanded into context at launch — the token cost is identical to inlining; only organization improves, not bloat or adherence. **Pattern/Trap:** P15 Configuration Hierarchy; P17 Lost in the Middle ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 314,
    "domain": 3,
    "scenario": "S5 Claude Code for CI/CD",
    "question": "A nightly CI job generates unit tests for changed files. It produces test files that duplicate existing tests about 18% of the time. The current command is `claude -p --append-system-prompt \"Write unit tests for the changed files.\"`. What is the best fix?",
    "options": [
      {
        "letter": "A",
        "text": "Add `--permission-mode dontAsk` to prevent Claude from editing tests."
      },
      {
        "letter": "B",
        "text": "Resume the previous CI session with `--resume` so Claude remembers which tests it wrote."
      },
      {
        "letter": "C",
        "text": "Pipe existing test files into the prompt via `@tests/test_parsers.py` references (or include their content) so Claude matches style and avoids duplicating coverage."
      },
      {
        "letter": "D",
        "text": "Use a larger model so Claude's general knowledge of test patterns improves."
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "`dontAsk` restricts tool use; it doesn't give Claude knowledge of existing tests. The root cause is missing context, not excess permission."
      },
      {
        "letter": "B",
        "reason": "CI sessions should be isolated per run; `--resume` reuses stale state across unrelated change sets and doesn't reliably include the latest tests from a different run."
      },
      {
        "letter": "D",
        "reason": "Model size doesn't substitute for project-specific context; the test file contents are what Claude needs to see. **Pattern/Trap:** P10 Root Cause vs Symptom; P6 Context Inheritance Misconception ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 315,
    "domain": 3,
    "scenario": "S4 Developer Productivity with Claude",
    "question": "An engineer writes `claude --resume` expecting the picker to open and list recent sessions. Instead, Claude immediately drops into the most recent session. What flag did they likely confuse?",
    "options": [
      {
        "letter": "A",
        "text": "`--resume` always drops straight into the latest session; there is no picker."
      },
      {
        "letter": "B",
        "text": "The picker only appears when there are more than 10 sessions to choose from."
      },
      {
        "letter": "C",
        "text": "There is no picker; they must manually browse `~/.claude/projects/` JSONL files."
      },
      {
        "letter": "D",
        "text": "`--continue` (`-c`) drops into the most recent session non-interactively; `--resume` (`-r`) opens an interactive picker (or takes an explicit ID/name). They likely ran `--continue`."
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "`--resume` does show a picker; dropping straight in is `--continue` behavior."
      },
      {
        "letter": "B",
        "reason": "No minimum-session threshold gates the picker; it opens on every `--resume` call."
      },
      {
        "letter": "C",
        "reason": "The picker exists and is the supported UX; manually reading JSONL isn't required. **Pattern/Trap:** P18 Fresh Session vs Resume ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 316,
    "domain": 3,
    "scenario": "S2 Code Generation with Claude Code",
    "question": "An engineer is building a feature and notices three problems in Claude's output simultaneously: (1) the function name doesn't match project convention, (2) the error message is in the wrong format, and (3) there's a genuine logic bug where the boundary condition is off. All three are independent (fixing one doesn't change the others). What's the best iteration pattern?",
    "options": [
      {
        "letter": "A",
        "text": "Fix all three in a single follow-up prompt — they're independent so it's efficient."
      },
      {
        "letter": "B",
        "text": "Start a fresh session for each fix to maximize context isolation."
      },
      {
        "letter": "C",
        "text": "Fix sequentially with one correction at a time over three turns to avoid confusing Claude."
      },
      {
        "letter": "D",
        "text": "Run `/compact` first to clear out the previous output, then fix."
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "B",
        "reason": "Three fresh sessions would discard the entire context of the feature being built — a high-cost overreaction for three small, independent corrections."
      },
      {
        "letter": "C",
        "reason": "Strict sequentialism is reserved for interacting issues; using it on independent issues wastes turns and adds noise."
      },
      {
        "letter": "D",
        "reason": "`/compact` summarizes; it doesn't fix the underlying issues and risks losing useful recent state. **Pattern/Trap:** P2 First Step Proportionality; P3 Over-Engineering Distractor ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 317,
    "domain": 3,
    "scenario": "S2 Code Generation with Claude Code",
    "question": "A team notices Claude produces \"looks-right\" code for their email-validation function but it fails 30% of real inputs. They've been prompting: \"implement `validateEmail(address: str) -> bool`.\" What improvement most directly addresses this per Anthropic guidance?",
    "options": [
      {
        "letter": "A",
        "text": "Add \"please be careful and thorough\" to increase Claude's caution."
      },
      {
        "letter": "B",
        "text": "Switch to a larger model to improve reasoning."
      },
      {
        "letter": "C",
        "text": "Provide explicit input/output examples: `user@example.com → True`, `invalid → False`, `user@.com → False`, and ask Claude to run tests after implementing."
      },
      {
        "letter": "D",
        "text": "Run `/compact` to ensure the prompt is the only thing in context."
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "Sentiment prompts (\"be careful\") don't reliably improve correctness; they're the classic confidence trap."
      },
      {
        "letter": "B",
        "reason": "Model upgrade is a heavyweight change that doesn't address the missing-success-criteria root cause."
      },
      {
        "letter": "D",
        "reason": "`/compact` doesn't define what \"correct\" means for the function; compaction is for context management, not specification clarity. **Pattern/Trap:** P4 Sentiment/Confidence Trap; P10 Root Cause vs Symptom ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 318,
    "domain": 3,
    "scenario": "S5 Claude Code for CI/CD",
    "question": "A team uses `claude -p \"Review\"` in a CI pipeline with `--output-format json --json-schema '{...}'` to produce structured findings. They want to extract the schema-conformant data for their dashboard. Which field contains it?",
    "options": [
      {
        "letter": "A",
        "text": "`.result` — the structured payload is always serialized here."
      },
      {
        "letter": "B",
        "text": "`.structured_output` — populated only when `--json-schema` is passed, containing the schema-conformant object."
      },
      {
        "letter": "C",
        "text": "`.data.findings` — a fixed nested key used by the review subsystem."
      },
      {
        "letter": "D",
        "text": "`.stdout` — the JSON is embedded in the tool's stdout capture."
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "`.result` is the free-form text result (a natural-language summary), not the schema-bound object."
      },
      {
        "letter": "C",
        "reason": "No fixed `data.findings` key exists in the Claude Code JSON contract."
      },
      {
        "letter": "D",
        "reason": "The JSON output IS the stdout; there is no `.stdout` sub-field. **Pattern/Trap:** P15 Configuration Hierarchy ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 319,
    "domain": 3,
    "scenario": "S4 Developer Productivity with Claude",
    "question": "An engineer is about to start building a complex feature spec. Per Anthropic best practices, they want Claude to interview them first to surface edge cases and tradeoffs. Which is the correct pattern?",
    "options": [
      {
        "letter": "A",
        "text": "Write a detailed 2-page spec yourself first, then paste it to Claude for implementation."
      },
      {
        "letter": "B",
        "text": "Start in plan mode with a minimal prompt and ask Claude to interview you using `AskUserQuestion`, iterating until the spec is complete, then write it to `SPEC.md` and start a **fresh session** to execute it."
      },
      {
        "letter": "C",
        "text": "Give Claude autonomy to guess requirements and iterate via code-level corrections."
      },
      {
        "letter": "D",
        "text": "Resume the previous feature's session so Claude remembers the whole project history while interviewing."
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "Pre-writing a 2-page spec skips the entire interview value — surfacing the hard parts the engineer hadn't considered."
      },
      {
        "letter": "C",
        "reason": "Letting Claude guess is the anti-pattern the interview exists to prevent; corrections at code level are vastly more expensive than spec-level."
      },
      {
        "letter": "D",
        "reason": "Resuming prior sessions carries bias and irrelevant context into a new feature's interview; fresh context is the explicit recommendation. **Pattern/Trap:** P18 Fresh Session vs Resume; P2 First Step Proportionality ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 320,
    "domain": 3,
    "scenario": "S5 Claude Code for CI/CD",
    "question": "A CI script captures `session_id` from a first `-p` run and then calls `--resume \"$session_id\"` in a follow-up `-p` invocation to add categorization. The team wonders whether `--resume` works in headless (`-p`) CI mode. Which statement is accurate?",
    "options": [
      {
        "letter": "A",
        "text": "`-p` sessions can't be resumed; `--resume` requires an interactive session."
      },
      {
        "letter": "B",
        "text": "Sessions expire in headless mode after 60 seconds, making resume unreliable."
      },
      {
        "letter": "C",
        "text": "`-p` sessions don't appear in the `--resume` picker, but you can resume them by passing the session ID captured from JSON output; this is a documented CI pattern."
      },
      {
        "letter": "D",
        "text": "Resuming in `-p` only works if both commands omit `--output-format json`."
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "Resume works fully in `-p`; this is explicitly supported."
      },
      {
        "letter": "B",
        "reason": "No 60-second expiry exists; sessions persist on local disk."
      },
      {
        "letter": "D",
        "reason": "`--output-format json` and `--resume` compose freely; there's no mutual exclusion. **Pattern/Trap:** P18 Fresh Session vs Resume ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 321,
    "domain": 3,
    "scenario": "S2 Code Generation with Claude Code",
    "question": "A team has a `.claude/skills/migrate-db/SKILL.md` with the playbook for running database migrations. Over time the description grew and auto-invocation accuracy dropped: Claude sometimes invokes it when the user asked about migrations in general (not to run one). Which fix aligns with how skill discovery works?",
    "options": [
      {
        "letter": "A",
        "text": "Shorten and front-load the description with the precise use case (\"Use ONLY when the user asks to execute a database migration\"); consider `when_to_use` for trigger phrases."
      },
      {
        "letter": "B",
        "text": "Move the skill to `.claude/skills/_hidden/migrate-db/SKILL.md` so Claude doesn't find it."
      },
      {
        "letter": "C",
        "text": "Delete the description entirely so Claude can't match against it."
      },
      {
        "letter": "D",
        "text": "Set `allowed-tools: Bash(migrate *)` so the skill can only run in the right environment."
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "B",
        "reason": "Subdirectory name doesn't hide skills from discovery; Claude Code recursively discovers `.claude/skills/`."
      },
      {
        "letter": "C",
        "reason": "If description is omitted, the first markdown paragraph is used — so Claude still has something to match on, often worse."
      },
      {
        "letter": "D",
        "reason": "`allowed-tools` influences which tools are available when invoked; it doesn't influence *whether* Claude invokes the skill. **Pattern/Trap:** P5 Tool Description Primacy ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 322,
    "domain": 3,
    "scenario": "S2 Code Generation with Claude Code",
    "question": "An engineer wants to create a custom Python helper that Claude can call during skill execution. They place `helper.py` next to `SKILL.md` in `.claude/skills/analyze/`. Inside SKILL.md they reference it. What's the correct way to reference the bundled file?",
    "options": [
      {
        "letter": "A",
        "text": "Use the substitution `${CLAUDE_SKILL_DIR}/helper.py` so the path resolves to the skill's directory regardless of where the repo is cloned."
      },
      {
        "letter": "B",
        "text": "Hard-code the absolute path `/Users/alice/proj/.claude/skills/analyze/helper.py` in the SKILL.md."
      },
      {
        "letter": "C",
        "text": "Put the file under `/tmp/claude-skills/` so any session can find it."
      },
      {
        "letter": "D",
        "text": "Move the helper into the root of the repo; skills can't access bundled files."
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "B",
        "reason": "Hard-coded absolute paths break on every other developer's machine and in CI."
      },
      {
        "letter": "C",
        "reason": "`/tmp/` is ephemeral and unrelated to skill discovery; not how skills bundle resources."
      },
      {
        "letter": "D",
        "reason": "Skills can and do bundle scripts in their directory — this is the documented pattern. **Pattern/Trap:** P15 Configuration Hierarchy ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 323,
    "domain": 3,
    "scenario": "S4 Developer Productivity with Claude",
    "question": "An engineer keeps asking Claude to \"fix the failing login test.\" Over 4 turns, Claude has now altered the test file to make it pass instead of fixing the underlying bug, despite repeated instruction. What does Anthropic's guidance recommend?",
    "options": [
      {
        "letter": "A",
        "text": "Keep correcting Claude in the same session; eventually it will converge."
      },
      {
        "letter": "B",
        "text": "Increase the model size mid-session via `/model`."
      },
      {
        "letter": "C",
        "text": "Delete the test file and ask Claude to regenerate both test and implementation simultaneously."
      },
      {
        "letter": "D",
        "text": "Commit the failing test as a checkpoint first, then in a fresh session tell Claude \"do not modify tests; iterate on implementation until tests pass.\""
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "Corrections past ~2 attempts indicate cluttered context; official guidance is to reset, not persist."
      },
      {
        "letter": "B",
        "reason": "Model size doesn't address the behavioral pattern; instruction clarity and context freshness do."
      },
      {
        "letter": "C",
        "reason": "Regenerating both simultaneously abandons the safety net that tests provide in TDD. **Pattern/Trap:** P18 Fresh Session vs Resume; P20 Explicit Escalation Criteria ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 324,
    "domain": 3,
    "scenario": "S5 Claude Code for CI/CD",
    "question": "A CI review job posts comments on PRs. The team notices duplicate review comments across consecutive runs on the same PR (e.g., \"use const instead of let\" posted twice). They want Claude to suppress findings already posted in prior reviews. Which pattern is correct?",
    "options": [
      {
        "letter": "A",
        "text": "Resume the session used for the previous review so Claude remembers what it already said."
      },
      {
        "letter": "B",
        "text": "Lower the temperature so Claude produces identical output and a downstream dedup script becomes trivial."
      },
      {
        "letter": "C",
        "text": "Before the review call, fetch existing PR comments via `gh pr view --comments` and pass them into the prompt as \"already-posted findings — do not repeat,\" keeping the session itself fresh."
      },
      {
        "letter": "D",
        "text": "Add `--permission-mode plan` so Claude can't post duplicates by writing."
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "Cross-PR session reuse causes findings from other PRs to bleed in; the problem here is duplicate across runs on the same PR, solved by explicitly providing prior findings, not by session resume."
      },
      {
        "letter": "B",
        "reason": "Determinism doesn't eliminate true duplicates; it just produces the same duplicate reliably."
      },
      {
        "letter": "D",
        "reason": "Plan mode prevents writes but CI isn't posting from inside Claude — a separate step does. This doesn't address the deduplication requirement. **Pattern/Trap:** P18 Fresh Session vs Resume; P10 Root Cause vs Symptom ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 325,
    "domain": 3,
    "scenario": "S2 Code Generation with Claude Code",
    "question": "A project has: ``` /repo/CLAUDE.md                    (root, 180 lines) /repo/.claude/rules/ts-api.md      (paths: [\"src/api/**/*.ts\"]) /repo/.claude/rules/all-tests.md   (no paths frontmatter) /repo/services/auth/CLAUDE.md      (subdirectory, 90 lines) ``` The engineer launches `claude` from `/repo`. Which files are loaded into context at session start?",
    "options": [
      {
        "letter": "A",
        "text": "All four files are loaded at session start."
      },
      {
        "letter": "B",
        "text": "`/repo/CLAUDE.md` and `/repo/.claude/rules/all-tests.md` are loaded at start; the path-scoped rule and the subdirectory CLAUDE.md load on-demand when Claude reads a matching file."
      },
      {
        "letter": "C",
        "text": "Only `/repo/CLAUDE.md` is loaded at start; everything else requires `/memory` to activate."
      },
      {
        "letter": "D",
        "text": "Only the root CLAUDE.md and the two rules files load; subdirectory CLAUDE.md files are never loaded."
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "Path-scoped rules and subdirectory CLAUDE.md are lazily loaded, not eager."
      },
      {
        "letter": "C",
        "reason": "`/memory` is a diagnostic/viewer, not an activator; rules and subtree memory load automatically under their documented triggers."
      },
      {
        "letter": "D",
        "reason": "Subdirectory CLAUDE.md files do load — just on-demand when their subtree is touched. **Pattern/Trap:** P15 Configuration Hierarchy; P6 Context Inheritance Misconception ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 326,
    "domain": 3,
    "scenario": "S4 Developer Productivity with Claude",
    "question": "An engineer fixes a typo in a comment. They ask, \"Should I use plan mode?\" Per Anthropic best practices, what's the guidance?",
    "options": [
      {
        "letter": "A",
        "text": "Always use plan mode — safety first."
      },
      {
        "letter": "B",
        "text": "Skip plan mode. The docs state plainly: \"If you could describe the diff in one sentence, skip the plan.\" Plan mode adds overhead for small, clearly-scoped changes."
      },
      {
        "letter": "C",
        "text": "Use plan mode only when editing Python, not other languages."
      },
      {
        "letter": "D",
        "text": "Use plan mode for all changes to files over 50 lines."
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "\"Always\" overfits overhead to trivial changes, wasting engineering time; the docs caution against this."
      },
      {
        "letter": "C",
        "reason": "Language is not a criterion; task complexity and uncertainty are."
      },
      {
        "letter": "D",
        "reason": "File length is not the documented heuristic; change scope and architectural uncertainty are. **Pattern/Trap:** P2 First Step Proportionality; P3 Over-Engineering Distractor ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 327,
    "domain": 3,
    "scenario": "S2 Code Generation with Claude Code",
    "question": "A team wants team-shared procedures (e.g., \"standard steps to deprecate an API endpoint\") available to Claude, but **not** always loaded into context — they have 14 such procedures and loading them all would consume ~6% of the context window even when irrelevant. Where should these procedures live?",
    "options": [
      {
        "letter": "A",
        "text": "Inlined into root `CLAUDE.md` under section headers."
      },
      {
        "letter": "B",
        "text": "In `~/.claude/CLAUDE.md` so they're user-scoped and don't bloat project context."
      },
      {
        "letter": "C",
        "text": "In `.claude/rules/` with `paths: [\"**/*\"]` so they load everywhere."
      },
      {
        "letter": "D",
        "text": "As `.claude/skills/<name>/SKILL.md` files committed to the repo — descriptions are always in context (~1,536 chars max each) but full bodies load only on invocation."
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "Inlining into CLAUDE.md loads all 14 procedures always, the exact problem to avoid."
      },
      {
        "letter": "B",
        "reason": "User scope loads into every session's context just like project scope; relocation doesn't fix bloat."
      },
      {
        "letter": "C",
        "reason": "`paths: [\"**/*\"]` matches every file, so the rule loads effectively always — identical bloat to option A. **Pattern/Trap:** P15 Configuration Hierarchy; P3 Over-Engineering Distractor ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 328,
    "domain": 3,
    "scenario": "S5 Claude Code for CI/CD",
    "question": "A team uses `claude -p \"Review\"` in a self-hosted GitHub runner. Occasionally Claude uses their local MCP server configured in `~/.claude/` for staging database access — which is unsafe in CI. They also want CI to not pull personal CLAUDE.md from the runner's home directory. What's the correct mitigation?",
    "options": [
      {
        "letter": "A",
        "text": "Delete `~/.claude/` on the runner after every job."
      },
      {
        "letter": "B",
        "text": "Add `--permission-mode dontAsk` to block unsafe MCP usage."
      },
      {
        "letter": "C",
        "text": "Pass `--bare` on the CI invocation so auto-discovery of CLAUDE.md, hooks, skills, plugins, MCP servers, and auto-memory is skipped; provide explicit context via `--append-system-prompt-file` and `--mcp-config` if MCP is genuinely needed."
      },
      {
        "letter": "D",
        "text": "Use `--output-format json` so MCP server calls are suppressed."
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "Deleting state destructively on a shared runner is brittle and has side effects on other jobs."
      },
      {
        "letter": "B",
        "reason": "`dontAsk` auto-approves nothing beyond explicit rules — it doesn't prevent auto-discovery of an MCP that's in the allow list."
      },
      {
        "letter": "D",
        "reason": "Output format is unrelated to MCP auto-discovery; it only shapes the result payload. **Pattern/Trap:** P11 Scoped Access / Least Privilege; P15 Configuration Hierarchy ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 329,
    "domain": 3,
    "scenario": "S4 Developer Productivity with Claude",
    "question": "An engineer made a complex multi-file change. They want to explore an alternative implementation branch from a specific point in the session **without losing the current session's history**. Which mechanism is correct?",
    "options": [
      {
        "letter": "A",
        "text": "Run `/clear` — this creates a parallel session automatically."
      },
      {
        "letter": "B",
        "text": "Use session forking via `/branch` in-session, or CLI `claude --resume <id> --fork-session`. The fork gets a new session ID; the original session's ID and history remain untouched."
      },
      {
        "letter": "C",
        "text": "Run `/compact` to snapshot the current state and then start a new session — the snapshot forks implicitly."
      },
      {
        "letter": "D",
        "text": "Copy `~/.claude/projects/<proj>/sessions/<id>.jsonl` manually, rename it, and resume — there is no forking feature."
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "`/clear` wipes context, it doesn't create a fork."
      },
      {
        "letter": "C",
        "reason": "`/compact` summarizes the current session; it doesn't produce a separate branchable session."
      },
      {
        "letter": "D",
        "reason": "Forking is a first-class feature; manual file copying isn't required and is fragile. **Pattern/Trap:** P18 Fresh Session vs Resume ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 330,
    "domain": 3,
    "scenario": "S5 Claude Code for CI/CD",
    "question": "A CI pipeline wants to (1) provide project context to every review, (2) ensure the review command is reproducible across developer laptops and the runner, and (3) avoid letting any teammate's personal settings influence reviews. Which setup best satisfies all three?",
    "options": [
      {
        "letter": "A",
        "text": "Commit a `REVIEW.md` in the repo; invoke `claude --bare -p \"Review the PR\" --append-system-prompt-file REVIEW.md --output-format json --json-schema '{...}'` in CI."
      },
      {
        "letter": "B",
        "text": "Ship a `.claude/CLAUDE.md` with review rules and rely on default `claude -p` auto-discovery; trust that no one has personal CLAUDE.md."
      },
      {
        "letter": "C",
        "text": "Inline the entire review rules as a 4,000-line `--append-system-prompt \"...\"` string in the CI YAML."
      },
      {
        "letter": "D",
        "text": "Resume a fixed session ID that one senior engineer pre-seeded with review rules; this way rules \"stick\" across runs."
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "B",
        "reason": "Without `--bare`, `~/.claude/CLAUDE.md` on a developer laptop or runner is auto-discovered, defeating reproducibility and isolation."
      },
      {
        "letter": "C",
        "reason": "Inline 4,000-line YAML strings are unmaintainable, break YAML escaping, and hurt readability — a committed `REVIEW.md` file is the documented pattern."
      },
      {
        "letter": "D",
        "reason": "Reusing a single session across runs causes cross-PR contamination and makes review findings non-isolated. **Pattern/Trap:** P18 Fresh Session vs Resume; P15 Configuration Hierarchy; P1 Prompt vs Programmatic Enforcement --- ## Coverage Summary (Corrected) ### Corrections applied from original | Change | Questions affected | |---|---| | Correct answer moved B → A (swap A↔B options) | Q1, Q6 | | Correct answer moved B → C (swap B↔C options) | Q2, Q11, Q14, Q17, Q20, Q24, Q28 | | Correct answer moved B → D (swap B↔D options) | Q10, Q15, Q27 | | No change | Q3, Q4, Q5, Q7, Q8, Q9, Q12, Q13, Q16, Q18, Q19, Q21, Q22, Q23, Q25, Q26, Q29, Q30 | ### Verified answer-letter distribution | Letter | Questions | Count | |---|---|---| | **A** | Q1, Q5, Q6, Q13, Q16, Q21, Q22, Q30 | **8** ✓ | | **B** | Q4, Q9, Q12, Q18, Q19, Q25, Q26, Q29 | **8** ✓ | | **C** | Q2, Q11, Q14, Q17, Q20, Q24, Q28 | **7** ✓ | | **D** | Q3, Q7, Q8, Q10, Q15, Q23, Q27 | **7** ✓ | | **Total** | | **30** ✓ | **Previous distribution:** A=6, B=20, C=0, D=4 **Corrected distribution:** A=8, B=8, C=7, D=7 ### Task statement coverage | Task | Questions | Count | |---|---|---| | 3.1 CLAUDE.md hierarchy, @import, .claude/rules/, /memory | Q1, Q4, Q12, Q25 | 4 | | 3.2 Custom slash commands & skills (scope, frontmatter) | Q8, Q9, Q11, Q21, Q22, Q27 | 6 | | 3.3 Path-specific rules (glob vs subdirectory CLAUDE.md) | Q3, Q5, Q13 | 3 | | 3.4 Plan mode vs direct execution | Q7, Q26 | 2 | | 3.5 Iterative refinement (examples, TDD, interview, batching) | Q16, Q17, Q19, Q23 | 4 | | 3.6 CI/CD integration (-p, --json-schema, session isolation) | Q2, Q6, Q10, Q14, Q15, Q18, Q20, Q24, Q28, Q29, Q30 | 11 | ### Pattern distribution | Pattern | Questions | |---|---| | P15 Configuration Hierarchy | Q1, Q2, Q4, Q5, Q9, Q11, Q12, Q13, Q18, Q22, Q25, Q27, Q28, Q30 | | P18 Fresh Session vs Resume | Q2, Q10, Q15, Q19, Q20, Q23, Q24, Q29, Q30 | | P1 Prompt vs Programmatic Enforcement | Q5, Q6, Q8, Q9, Q30 | | P2 First Step Proportionality | Q7, Q16, Q19, Q26 | | P3 Over-Engineering Distractor | Q3, Q6, Q16, Q26, Q27 | | P4 Sentiment/Confidence Trap | Q17 | | P5 Tool Description Primacy | Q21 | | P6 Context Inheritance Misconception | Q1, Q14, Q25 | | P8 Larger Context Window Fallacy | Q10 | | P10 Root Cause vs Symptom | Q3, Q4, Q14, Q17, Q24 | | P11 Scoped Access / Least Privilege | Q8, Q11, Q28 | | P16 Progressive Summarization Risk | Q12 | | P17 Lost in the Middle | Q3, Q13 | | P19 Self-Review Limitation | Q10 | | P20 Explicit Escalation Criteria | Q23 |"
      }
    ],
    "pattern": ""
  }
];
