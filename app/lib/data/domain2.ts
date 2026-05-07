import { Question } from '../types';

export const domain2Questions: Question[] = [
  {
    "id": 201,
    "domain": 2,
    "scenario": "S1 Customer Support Resolution Agent",
    "question": "A support agent has four MCP tools: `get_customer`, `lookup_order`, `process_refund`, `escalate_to_human`. In production, Claude calls `lookup_order` when the user asks \"Who is customer 44192?\" about 31% of the time, returning an order not found error. The `get_customer` description reads: \"Retrieves customer data.\" The `lookup_order` description reads: \"Looks up order information by ID.\" What is the most effective first fix?",
    "options": [
      {
        "letter": "A",
        "text": "Rewrite both descriptions to be 3–4 sentences each, explicitly stating what each tool accepts (customer ID vs. order ID), when to use it, and what it does not return."
      },
      {
        "letter": "B",
        "text": "Add a routing classifier tool that inspects the user query and emits a structured \"intent\" field before any tool call."
      },
      {
        "letter": "C",
        "text": "Set `tool_choice` to `{\"type\":\"tool\",\"name\":\"get_customer\"}` whenever the user message contains the word \"customer.\""
      },
      {
        "letter": "D",
        "text": "Consolidate `get_customer` and `lookup_order` into one `lookup_entity` tool that takes an `entity_type` parameter."
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "B",
        "reason": "A routing classifier is textbook over-engineering — it adds another tool that can itself misfire and doesn't address the root cause, which is inadequate descriptions."
      },
      {
        "letter": "C",
        "reason": "Forcing a specific tool by keyword match is brittle and sidesteps the LLM's actual selection capability; \"customer\" legitimately appears in order-status questions too."
      },
      {
        "letter": "D",
        "reason": "Consolidating an overloaded entity tool adds a new branching parameter that itself needs differentiation logic; it also removes scoping that may matter for downstream permissioning. **Pattern/Trap:** P5 Tool Description Primacy + P3 Over-Engineering Distractor ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 202,
    "domain": 2,
    "scenario": "S6 Structured Data Extraction",
    "question": "An extraction pipeline calls a `record_invoice` tool to return parsed invoice data. When an invoice field like `po_number` is absent from the source document, the tool schema marks it `required`, and Claude fabricates a plausible-looking PO number about 8% of the time. What is the correct fix?",
    "options": [
      {
        "letter": "A",
        "text": "Increase the temperature to 0 so the model stops hallucinating values."
      },
      {
        "letter": "B",
        "text": "Add a post-hoc validator that cross-checks the PO number against a database and retries on mismatch."
      },
      {
        "letter": "C",
        "text": "Make `po_number` nullable in the schema and instruct the description to return `null` when the field is not present in the source."
      },
      {
        "letter": "D",
        "text": "Add `\"strict\": true` to the tool definition so the API rejects invalid inputs."
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "Temperature 0 reduces randomness but does not change the model's incentive to fill required fields; it often produces the same fabricated value deterministically."
      },
      {
        "letter": "B",
        "reason": "Retry-on-mismatch only helps if a correct value exists somewhere to retrieve; when the source truly lacks the PO, retries produce the same fabrication or a new one."
      },
      {
        "letter": "D",
        "reason": "`strict: true` validates Claude's output against the schema but does not make a required-but-absent field nullable — it would in fact enforce the fabrication. **Pattern/Trap:** P14 Nullable Field Prevention + P13 Retry Futility ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 203,
    "domain": 2,
    "scenario": "S4 Developer Productivity with Claude",
    "question": "A developer asks Claude Code to rename a function across a TypeScript monorepo with ~4,200 files. Which sequence best reflects Anthropic's recommended incremental-exploration pattern?",
    "options": [
      {
        "letter": "A",
        "text": "`Bash(\"grep -rn 'oldName' src/\")` → `Bash(\"sed -i 's/oldName/newName/g' ...\")`"
      },
      {
        "letter": "B",
        "text": "`Glob(\"**/*.ts\")` → `Read` every file → `Write` each file back with the rename applied."
      },
      {
        "letter": "C",
        "text": "`Agent(subagent)` where the subagent spawns another subagent per directory to parallelize."
      },
      {
        "letter": "D",
        "text": "`Glob(\"**/*.ts\")` → `Grep(pattern=\"oldName\", output_mode=\"files_with_matches\")` → `Read` matched files → `Edit` each with `old_string`/`new_string`."
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "Anthropic explicitly instructs Claude Code to avoid `grep` and `sed` via Bash; heredoc-style commands bypass permission caching and skip the safety property that `Edit` fails fast when `old_string` is not found."
      },
      {
        "letter": "B",
        "reason": "Reading and rewriting thousands of files is wasteful — Edit sends ~2 lines versus Write sending the whole file, and Glob alone does not narrow to files that actually contain `oldName`."
      },
      {
        "letter": "C",
        "reason": "Subagents in Claude Code cannot spawn other subagents (no nested delegation via the Agent tool), and parallelizing before narrowing with Grep front-loads cost. **Pattern/Trap:** P2 First Step Proportionality + P3 Over-Engineering Distractor ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 204,
    "domain": 2,
    "scenario": "S3 Multi-Agent Research System",
    "question": "A coordinator agent delegates to four specialized subagents (web_search, document_analysis, synthesis, report). The report subagent produces summaries that reference statistics the coordinator discussed earlier in its own conversation but never passed in the subagent's prompt. What is happening?",
    "options": [
      {
        "letter": "A",
        "text": "The subagent is inheriting the coordinator's context window and the statistics are stale."
      },
      {
        "letter": "B",
        "text": "The subagent receives a fresh context by default and is fabricating plausible-sounding statistics because the coordinator did not pass them in the subagent's prompt."
      },
      {
        "letter": "C",
        "text": "The Anthropic API is auto-merging parallel subagent contexts after the last tool call completes."
      },
      {
        "letter": "D",
        "text": "The report subagent's `tool_choice` is set to `any`, which causes it to invent statistics to justify a tool call."
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "Default subagents do not inherit context; the coordinator must explicitly pass any facts the subagent needs."
      },
      {
        "letter": "C",
        "reason": "There is no cross-subagent context merging; each subagent returns only its final result to the parent."
      },
      {
        "letter": "D",
        "reason": "`tool_choice: any` forces tool selection but does not cause data fabrication on its own — the absence of grounding data does. **Pattern/Trap:** P6 Context Inheritance Misconception ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 205,
    "domain": 2,
    "scenario": "S1 Customer Support Resolution Agent",
    "question": "The `process_refund` MCP tool sometimes returns a transient 503 from an upstream payments API. Ops wants Claude to retry automatically but not on validation errors (like invalid amount). How should the MCP server signal this distinction?",
    "options": [
      {
        "letter": "A",
        "text": "Return `isError: true` in both cases, with descriptive text in the `content` array explaining the category so the model can decide whether to self-correct and retry."
      },
      {
        "letter": "B",
        "text": "Return a JSON-RPC protocol error with code `-32603` for transient issues and `-32602` for validation errors."
      },
      {
        "letter": "C",
        "text": "Return `isError: false` for transient errors (so Claude keeps going) and `isError: true` for validation errors."
      },
      {
        "letter": "D",
        "text": "Add a custom top-level `isRetryable` boolean to the tool response and rely on clients to honor it."
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "B",
        "reason": "Protocol errors bypass the model's ability to reason about the failure; the spec explicitly says they are \"less likely to result in successful recovery\" because they indicate request-structure issues."
      },
      {
        "letter": "C",
        "reason": "Returning `isError: false` for a real failure is deceptive — the model will treat the (absent) result as success and produce incorrect downstream behavior."
      },
      {
        "letter": "D",
        "reason": "The MCP spec does not define a formal `isRetryable` field; adding a proprietary top-level key is non-standard and will be ignored by compliant clients. **Pattern/Trap:** Structured Error Signaling (isError contract) ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 206,
    "domain": 2,
    "scenario": "S2 Code Generation with Claude Code",
    "question": "A team wants every developer on the repo to automatically get access to the same set of MCP servers (GitHub, Postgres, internal docs) when they run Claude Code. Where should the configuration live?",
    "options": [
      {
        "letter": "A",
        "text": "`~/.claude.json` committed to a shared dotfiles repo each developer clones."
      },
      {
        "letter": "B",
        "text": "`.claude/settings.local.json` checked into the repo."
      },
      {
        "letter": "C",
        "text": "`managed-mcp.json` in `/Library/Application Support/ClaudeCode/` on each machine."
      },
      {
        "letter": "D",
        "text": "`.mcp.json` at the project root, checked into the repository."
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "`~/.claude.json` is the user-level file scoped to a single developer's machine and is not intended to be shared; it stores per-user, cross-project MCP server entries."
      },
      {
        "letter": "B",
        "reason": "`.claude/settings.local.json` is meant for per-checkout overrides and is conventionally git-ignored; using it would defeat the \"shared across team\" requirement."
      },
      {
        "letter": "C",
        "reason": "`managed-mcp.json` is for enterprise/IT-deployed lockdown policies and takes exclusive control when present — it is the wrong mechanism for normal team sharing and would block users from adding personal servers. **Pattern/Trap:** P15 Configuration Hierarchy ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 207,
    "domain": 2,
    "scenario": "S3 Multi-Agent Research System",
    "question": "The research coordinator currently exposes 34 MCP tools to every subagent so they can \"do whatever they need.\" Tool-selection accuracy on the web_search subagent has dropped from 94% to 71% since 12 new tools were added. What is the best architectural fix?",
    "options": [
      {
        "letter": "A",
        "text": "Tell each subagent in its system prompt which tools to prefer, leaving all 34 loaded."
      },
      {
        "letter": "B",
        "text": "Use `tool_choice: {\"type\":\"any\"}` so subagents are forced to choose quickly."
      },
      {
        "letter": "C",
        "text": "Scope each subagent's `tools:` allowlist to only the 3–6 tools relevant to its role."
      },
      {
        "letter": "D",
        "text": "Switch all subagents to a model with a larger context window so all 34 tool definitions fit without degradation."
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "System-prompt preference instructions are secondary to the tool descriptions themselves and do not remove the attention cost of 34 definitions sitting in context."
      },
      {
        "letter": "B",
        "reason": "`any` forces a tool call but does not improve which tool is chosen; the selection is still made against 34 candidates."
      },
      {
        "letter": "D",
        "reason": "A larger context window does not fix attention quality — the \"lost in the middle\" phenomenon and selection degradation persist regardless of window size. **Pattern/Trap:** P11 Scoped Access + P8 Larger Context Window Fallacy ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 208,
    "domain": 2,
    "scenario": "S5 Claude Code for CI/CD",
    "question": "A GitHub Action runs Claude Code with `claude -p \"review this PR\"`. The `.mcp.json` at the repo root references `\"headers\": {\"Authorization\": \"Bearer ${GITHUB_TOKEN}\"}`. On the runner, the job fails with a config parse error. What is the most likely cause?",
    "options": [
      {
        "letter": "A",
        "text": "`.mcp.json` does not support environment variable expansion in `headers`."
      },
      {
        "letter": "B",
        "text": "`${GITHUB_TOKEN}` is unset in the runner's shell because the secret was not exported as an env var to the Claude Code step."
      },
      {
        "letter": "C",
        "text": "`-p` mode ignores `.mcp.json` entirely; you must pass `--mcp-config` explicitly."
      },
      {
        "letter": "D",
        "text": "GitHub Actions masks secrets, which breaks the expansion step."
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "`.mcp.json` does support expansion in `headers`; that is a documented supported location."
      },
      {
        "letter": "C",
        "reason": "`-p` mode loads `.mcp.json` normally; `--mcp-config` is for custom paths, not a requirement in print mode."
      },
      {
        "letter": "D",
        "reason": "Secret masking redacts values in logs but does not prevent expansion at runtime when the env var is actually set. **Pattern/Trap:** P15 Configuration Hierarchy + env expansion semantics ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 209,
    "domain": 2,
    "scenario": "S6 Structured Data Extraction",
    "question": "A team builds an extractor that must always return a JSON object matching a fixed schema. Which combination best guarantees structured, validated output on every call?",
    "options": [
      {
        "letter": "A",
        "text": "`tool_choice: {\"type\":\"any\"}` with a single tool definition marked `\"strict\": true`."
      },
      {
        "letter": "B",
        "text": "`tool_choice: {\"type\":\"auto\"}` with a single tool and a strong system prompt instructing Claude to \"always call the tool.\""
      },
      {
        "letter": "C",
        "text": "`tool_choice: {\"type\":\"none\"}` with a system prompt that demands JSON output."
      },
      {
        "letter": "D",
        "text": "Two tools with overlapping descriptions so Claude picks whichever matches best."
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "B",
        "reason": "`auto` leaves the decision to the model, which may occasionally produce natural language instead of a tool call; prompt instructions alone are not a hard guarantee."
      },
      {
        "letter": "C",
        "reason": "`none` prevents all tool use; Claude would return freeform JSON with no schema validation."
      },
      {
        "letter": "D",
        "reason": "Overlapping descriptions degrade tool selection and add failure modes; more tools is the wrong direction for a single-schema extractor. **Pattern/Trap:** P1 Prompt vs Programmatic Enforcement ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 210,
    "domain": 2,
    "scenario": "S4 Developer Productivity with Claude",
    "question": "A developer wants to change a single import statement in a 1,200-line file. Which approach does Anthropic recommend?",
    "options": [
      {
        "letter": "A",
        "text": "`Read` the file, then `Write` the full file back with the import replaced."
      },
      {
        "letter": "B",
        "text": "`Bash(\"sed -i '1s/.*/import X from \\\"y\\\";/' file.ts\")`."
      },
      {
        "letter": "C",
        "text": "`Read` the file, then `Edit` with `old_string` as the current import line and `new_string` as the replacement."
      },
      {
        "letter": "D",
        "text": "`Grep` for the import, then `MultiEdit` with 1,200 operations to rewrite line-by-line."
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "`Write` replaces the whole file, wasting tokens and losing the safety property that Edit fails when the old content is absent."
      },
      {
        "letter": "B",
        "reason": "Anthropic's Claude Code system prompt explicitly instructs the model to avoid `sed` via Bash and to use `Edit` instead."
      },
      {
        "letter": "D",
        "reason": "MultiEdit with 1,200 operations is absurd for a one-line change and still does not match the intended single-replacement semantics. **Pattern/Trap:** P2 First Step Proportionality ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 211,
    "domain": 2,
    "scenario": "S1 Customer Support Resolution Agent",
    "question": "The support agent's `process_refund` tool is described as: \"Issues a refund for an order.\" In staging, Claude calls it after vague requests like \"fix my problem\" 14% of the time, issuing unauthorized refunds. Policy requires refunds only after identity verification. What is the correct enforcement mechanism?",
    "options": [
      {
        "letter": "A",
        "text": "Append to the system prompt: \"Never call process_refund without identity verification.\""
      },
      {
        "letter": "B",
        "text": "Lower the model temperature so it adheres more strictly to instructions."
      },
      {
        "letter": "C",
        "text": "Add the phrase \"do not call unless verified\" to the tool description."
      },
      {
        "letter": "D",
        "text": "Implement a server-side pre-check in the MCP tool that verifies identity state before executing; return `isError: true` with an explicit \"identity not verified\" message otherwise."
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "System-prompt rules are suggestions to a probabilistic model; a 14% error rate on a financial action is unacceptable and will persist with prompt-only controls."
      },
      {
        "letter": "B",
        "reason": "Temperature affects sampling variance, not rule adherence; the model can deterministically choose the wrong action at temperature 0."
      },
      {
        "letter": "C",
        "reason": "Tool descriptions influence selection but do not enforce anything at execution time; a single bad selection still causes the refund. **Pattern/Trap:** P1 Prompt vs Programmatic Enforcement ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 212,
    "domain": 2,
    "scenario": "General",
    "question": "An MCP tool returns search results. When zero documents match, which response design best prevents hallucination?",
    "options": [
      {
        "letter": "A",
        "text": "Return `{\"content\":[], \"isError\": false}`."
      },
      {
        "letter": "B",
        "text": "Return `{\"content\":[{\"type\":\"text\",\"text\":\"No documents matched query 'X' across index 'Y'. This is a valid empty result, not an error.\"}], \"isError\": false}`."
      },
      {
        "letter": "C",
        "text": "Return a JSON-RPC error with code `-32603` and no content."
      },
      {
        "letter": "D",
        "text": "Return `{\"content\":[{\"type\":\"text\",\"text\":\"null\"}], \"isError\": true}`."
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "Empty content arrays are a known trigger for hallucination because the model has no textual grounding and may confabulate results to fill the gap."
      },
      {
        "letter": "C",
        "reason": "\"No results\" is not a protocol error — it's a valid tool outcome; using JSON-RPC errors here loses the distinction between \"tool could not run\" and \"tool ran and found nothing.\""
      },
      {
        "letter": "D",
        "reason": "Setting `isError: true` for a legitimate empty result miscategorizes the response and may trigger unwanted retry/self-correction behavior. **Pattern/Trap:** P14 Nullable Field Prevention (empty-result variant) ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 213,
    "domain": 2,
    "scenario": "S2 Code Generation with Claude Code",
    "question": "A developer adds three new MCP servers via `claude mcp add --scope user ...`. A teammate clones the same repo but cannot see the servers. Why?",
    "options": [
      {
        "letter": "A",
        "text": "MCP servers added with `--scope user` live in `~/.claude.json` and are private to the user's machine — not shared via git."
      },
      {
        "letter": "B",
        "text": "The `.mcp.json` file is in `.gitignore` by default."
      },
      {
        "letter": "C",
        "text": "`--scope user` encrypts server definitions to the user's local keychain."
      },
      {
        "letter": "D",
        "text": "The teammate must run `claude mcp sync` to pull user-scope servers from the Anthropic cloud."
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "B",
        "reason": "`.mcp.json` is expected to be committed to the repo; it is not gitignored by default."
      },
      {
        "letter": "C",
        "reason": "There is no keychain encryption; `~/.claude.json` is a plain JSON file."
      },
      {
        "letter": "D",
        "reason": "There is no `claude mcp sync` command and Anthropic does not host user MCP configs in a cloud registry. **Pattern/Trap:** P15 Configuration Hierarchy ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 214,
    "domain": 2,
    "scenario": "S3 Multi-Agent Research System",
    "question": "The document_analysis subagent must summarize 12 PDFs but should not modify any files or run commands. Which tool configuration follows least-privilege?",
    "options": [
      {
        "letter": "A",
        "text": "`tools: Read, Grep, Glob` — omit Write, Edit, Bash entirely."
      },
      {
        "letter": "B",
        "text": "Include all tools but set `permissionMode: \"acceptEdits\"` to confirm each write."
      },
      {
        "letter": "C",
        "text": "Include all tools and rely on a system-prompt instruction to \"only read files.\""
      },
      {
        "letter": "D",
        "text": "Include `Bash` so the subagent can run `cat` on PDFs for faster throughput."
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "B",
        "reason": "`acceptEdits` auto-approves file edits and some Bash — it is broader than needed and does not constrain the tool surface; also, it does not auto-approve MCP tools anyway."
      },
      {
        "letter": "C",
        "reason": "System-prompt constraints are probabilistic; the tool surface itself is the hard boundary."
      },
      {
        "letter": "D",
        "reason": "`Bash` is the broadest privilege in Claude Code and grants arbitrary execution; also, `Read` natively handles PDFs with page selection, making Bash+cat both unsafe and unnecessary. **Pattern/Trap:** P11 Scoped Access / Least Privilege ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 215,
    "domain": 2,
    "scenario": "S1 Customer Support Resolution Agent",
    "question": "Two tools exist: `lookup_customer_by_email(email)` and `lookup_customer_by_phone(phone)`. Usage analysis shows 84% of queries arrive with either an email or a phone, and Claude occasionally picks the wrong tool when both keywords appear in the message. An architect proposes merging them into `lookup_customer(identifier, identifier_type)`. Is this the right move?",
    "options": [
      {
        "letter": "A",
        "text": "Yes — fewer tools always reduces selection errors."
      },
      {
        "letter": "B",
        "text": "No — instead use `tool_choice: {\"type\":\"any\"}` and let Claude try both tools until one succeeds."
      },
      {
        "letter": "C",
        "text": "Yes, and add a third `lookup_customer_by_name` tool so all access patterns are covered."
      },
      {
        "letter": "D",
        "text": "No — keep them separate and instead tighten each description to state exactly which input type each accepts and which it rejects."
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "\"Fewer tools is always better\" is a fallacy — excessive consolidation creates parameter-branching and description ambiguity that hurt reliability."
      },
      {
        "letter": "B",
        "reason": "`any` forces a tool call but does not let the model try multiple tools sequentially in a single turn; it also burns latency and cost on guesswork."
      },
      {
        "letter": "C",
        "reason": "Adding a third tool without first fixing descriptions multiplies the selection surface and does not address the current ambiguity. **Pattern/Trap:** P5 Tool Description Primacy + P3 Over-Engineering (consolidation variant) ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 216,
    "domain": 2,
    "scenario": "S5 Claude Code for CI/CD",
    "question": "A CI job uses Claude Code's headless mode to triage incoming issues. Security requires that only the `mcp__github__*` tools and the `Read`, `Grep`, `Glob` built-ins are available — no Bash, no Write, no Edit. What is the correct invocation?",
    "options": [
      {
        "letter": "A",
        "text": "`claude -p \"triage\" --permission-mode bypassPermissions`"
      },
      {
        "letter": "B",
        "text": "`claude -p \"triage\" --disallowedTools \"Bash\"`"
      },
      {
        "letter": "C",
        "text": "`claude -p \"triage\" --allowedTools \"mcp__github__* Read Grep Glob\"`"
      },
      {
        "letter": "D",
        "text": "`claude -p \"triage\"` and rely on the `.claude/settings.json` `permissions.deny` list."
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "`bypassPermissions` auto-approves everything including Bash and file edits — the opposite of the security requirement."
      },
      {
        "letter": "B",
        "reason": "Denying only Bash still leaves Write, Edit, and every other tool enabled by default; an allowlist is required, not a partial denylist."
      },
      {
        "letter": "D",
        "reason": "Relying on settings-file denials without an explicit allowlist leaves the surface implicit and fragile; settings can be overridden and the enumerated deny list is easy to under-specify. **Pattern/Trap:** P11 Scoped Access / Least Privilege ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 217,
    "domain": 2,
    "scenario": "S3 Multi-Agent Research System",
    "question": "The coordinator must expose a library of 600 reference papers as browsable content to subagents but does not want them consumed as tool calls. Which MCP primitive is correct?",
    "options": [
      {
        "letter": "A",
        "text": "Tools — define 600 `read_paper_X` tools, one per paper."
      },
      {
        "letter": "B",
        "text": "Resources — expose each paper under a URI (e.g., `paper://arxiv/2401.12345`) so hosts can attach them as context."
      },
      {
        "letter": "C",
        "text": "Prompts — register each paper as a user-invokable slash command."
      },
      {
        "letter": "D",
        "text": "Sampling — ask the host LLM to summarize each paper on demand."
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "Creating 600 tools would catastrophically degrade selection and is semantically wrong — reading a paper is not an action with side effects."
      },
      {
        "letter": "C",
        "reason": "Prompts are pre-defined templates for user invocation, not a content catalog."
      },
      {
        "letter": "D",
        "reason": "Sampling is a server-to-client capability to request LLM generation from the host; it is not a storage/retrieval primitive. **Pattern/Trap:** P5/P3 Primitive Selection (Resources vs Tools) ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 218,
    "domain": 2,
    "scenario": "S2 Code Generation with Claude Code",
    "question": "A developer's `.mcp.json` defines a `github` server, and their `~/.claude.json` also defines a server named `github`. When Claude Code starts in the project, which `github` server does it use?",
    "options": [
      {
        "letter": "A",
        "text": "Both are merged; tools from each appear prefixed."
      },
      {
        "letter": "B",
        "text": "Project scope takes precedence over user scope when the server names match, so the `.mcp.json` definition is used."
      },
      {
        "letter": "C",
        "text": "User scope always wins because it reflects personal configuration."
      },
      {
        "letter": "D",
        "text": "Claude Code refuses to start and prints a name-collision error."
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "The scopes do not merge on name collision — only the highest-precedence definition is used."
      },
      {
        "letter": "C",
        "reason": "User scope is lower-precedence than project scope precisely so teams can override personal configs for project work."
      },
      {
        "letter": "D",
        "reason": "Name collisions are resolved silently by precedence; they do not cause startup failures. **Pattern/Trap:** P15 Configuration Hierarchy ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 219,
    "domain": 2,
    "scenario": "S6 Structured Data Extraction",
    "question": "An extractor pipeline uses 23 tools. Ops notices that at temperatures 0 and 0.3, tool-selection accuracy is nearly identical (both poor, ~68%), but the model often picks a tool whose description starts with \"Retrieves...\" regardless of intent. What is the likely root cause?",
    "options": [
      {
        "letter": "A",
        "text": "Model temperature is too low; raise it to 0.7."
      },
      {
        "letter": "B",
        "text": "The schema version is outdated; migrate to JSON Schema 2020-12."
      },
      {
        "letter": "C",
        "text": "Descriptions share a common lead verb (\"Retrieves...\"), reducing keyword differentiation; rewrite to use distinct, intent-specific verbs and front-load the distinguishing information."
      },
      {
        "letter": "D",
        "text": "The system prompt is too short; add more general instructions at the top."
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "Temperature affects sampling variance, not the underlying selection signal — the problem persists at any temperature."
      },
      {
        "letter": "B",
        "reason": "Schema-draft version has no effect on selection quality; it affects validation only."
      },
      {
        "letter": "D",
        "reason": "Anthropic explicitly treats tool descriptions as the primary selection mechanism; system-prompt additions are secondary and do not override keyword-level ambiguity. **Pattern/Trap:** P5 Tool Description Primacy ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 220,
    "domain": 2,
    "scenario": "S1 Customer Support Resolution Agent",
    "question": "The `escalate_to_human` tool succeeds but the ticketing backend occasionally times out at the network layer, returning no response for ~45 seconds. Which behavior should the MCP server exhibit?",
    "options": [
      {
        "letter": "A",
        "text": "Return `isError: false` with empty content so Claude moves on."
      },
      {
        "letter": "B",
        "text": "Return a JSON-RPC `-32000` error so Claude stops the conversation."
      },
      {
        "letter": "C",
        "text": "Crash the MCP server process to trigger Claude Code to reconnect."
      },
      {
        "letter": "D",
        "text": "Return `isError: true` with text like \"Escalation queue unreachable (timeout after 45s). Safe to retry after a short delay.\" — so the model can self-correct."
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "Reporting failure as success causes silent loss of the escalation and misleads the model into thinking the human was notified."
      },
      {
        "letter": "B",
        "reason": "JSON-RPC protocol errors signal structural problems the model cannot fix; using them for a transient network timeout misuses the channel and loses the self-correction opportunity."
      },
      {
        "letter": "C",
        "reason": "Crashing the server is a reliability anti-pattern; stdio servers are not auto-reconnected, and HTTP reconnect has limited retry semantics. **Pattern/Trap:** Structured Error Signaling (isError contract) ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 221,
    "domain": 2,
    "scenario": "S4 Developer Productivity with Claude",
    "question": "In an interactive Claude Code session, a developer sees tool-call results referencing outdated file contents. Investigation shows the session has been running for 8 hours across three distinct tasks and the model is recalling stale file state from earlier. What is the most appropriate remediation?",
    "options": [
      {
        "letter": "A",
        "text": "Continue the session and rely on Read to refresh state when needed."
      },
      {
        "letter": "B",
        "text": "Increase `MAX_MCP_OUTPUT_TOKENS` so more context fits."
      },
      {
        "letter": "C",
        "text": "Start a fresh session; resume only when the prior context is still directly relevant."
      },
      {
        "letter": "D",
        "text": "Fork the subagent so both conversations share the cache."
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "Read can refresh file state, but the stale prior turns remain in context and continue to bias the model's reasoning."
      },
      {
        "letter": "B",
        "reason": "`MAX_MCP_OUTPUT_TOKENS` caps per-call output size; it does not address stale conversation history or attention degradation."
      },
      {
        "letter": "D",
        "reason": "Fork mode inherits the entire stale history byte-for-byte — the opposite of the fix needed. **Pattern/Trap:** P18 Fresh Session vs Resume ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 222,
    "domain": 2,
    "scenario": "S3 Multi-Agent Research System",
    "question": "The synthesis subagent receives inputs from three earlier subagents and is expected to preserve exact numeric figures. On spot-check, about 6% of numbers drift (e.g., $1.24B becomes $1.2B) after a second synthesis pass. What is the correct mitigation?",
    "options": [
      {
        "letter": "A",
        "text": "Add a fourth pass to \"review and correct\" the summary."
      },
      {
        "letter": "B",
        "text": "Have the coordinator pass raw numeric findings directly to the final report stage rather than summarizing them through multiple intermediate agents."
      },
      {
        "letter": "C",
        "text": "Lower the temperature of the synthesis subagent to 0."
      },
      {
        "letter": "D",
        "text": "Increase the context window of the synthesis subagent."
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "A self-review pass by the same model class tends to confirm the already-drifted numbers; self-review has limited ability to catch its own upstream distortions."
      },
      {
        "letter": "C",
        "reason": "Temperature 0 makes drift deterministic but does not prevent it — the drift is an artifact of summarization, not sampling."
      },
      {
        "letter": "D",
        "reason": "The inputs are not too large; the problem is that they are being re-summarized, not that they were truncated. **Pattern/Trap:** P16 Progressive Summarization Risk + P10 Root Cause vs Symptom ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 223,
    "domain": 2,
    "scenario": "S5 Claude Code for CI/CD",
    "question": "A team wants to use a popular community MCP server that fetches web content to enrich PR reviews. The repo is on a private codebase. Which design consideration is most important?",
    "options": [
      {
        "letter": "A",
        "text": "Community MCP servers are tested by Anthropic before listing, so trust is fine."
      },
      {
        "letter": "B",
        "text": "Setting `permissionMode: \"bypassPermissions\"` is safe as long as the server is popular."
      },
      {
        "letter": "C",
        "text": "The server should run in the Claude Code main process to reduce latency."
      },
      {
        "letter": "D",
        "text": "Any server that fetches untrusted external content creates prompt-injection risk in the Claude Code session; sandbox the server, restrict its tool permissions via `allowedTools`, and treat its output as untrusted."
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "Anthropic does not verify community MCP servers; the directory is community-curated."
      },
      {
        "letter": "B",
        "reason": "`bypassPermissions` disables safety prompts globally and is explicitly over-broad; \"popular\" is not a trust signal."
      },
      {
        "letter": "C",
        "reason": "MCP servers run as separate processes (stdio) or remote endpoints (HTTP); there is no \"main process\" execution mode, and co-locating would worsen the blast radius if anything. **Pattern/Trap:** P11 Scoped Access + prompt-injection risk ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 224,
    "domain": 2,
    "scenario": "S2 Code Generation with Claude Code",
    "question": "A developer runs `claude mcp add --transport stdio --env API_KEY=sk-test-1234 mytool -- node server.js` and wonders why their teammate sees the server but fails to connect after cloning the repo. What happened?",
    "options": [
      {
        "letter": "A",
        "text": "`--env` only sets the value at invocation time on the local machine; the secret is stored in the user's local config and not replicated to others. The correct pattern is `${API_KEY}` in `.mcp.json` and each developer sets the env var locally."
      },
      {
        "letter": "B",
        "text": "The teammate needs to run `claude mcp sync` to pull the env var."
      },
      {
        "letter": "C",
        "text": "The server name `mytool` conflicts with a reserved name."
      },
      {
        "letter": "D",
        "text": "Stdio MCP servers cannot use environment variables."
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "B",
        "reason": "There is no `claude mcp sync` command."
      },
      {
        "letter": "C",
        "reason": "`mytool` is not a reserved name; MCP does not enforce any such reservation."
      },
      {
        "letter": "D",
        "reason": "Stdio servers fully support environment variables via the `env` object and `${VAR}` expansion. **Pattern/Trap:** P15 Configuration Hierarchy (secrets handling) ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 225,
    "domain": 2,
    "scenario": "General",
    "question": "A team has built a single `universal_data_tool(action, resource, params)` that does CRUD across five backend systems. Tool-selection accuracy looks fine (~96%), but parameter errors (wrong `action`/`resource` combos) now account for 22% of failures. What is the right redesign?",
    "options": [
      {
        "letter": "A",
        "text": "Split the universal tool into purpose-specific tools with explicit names (e.g., `create_customer`, `update_order`, `delete_invoice`) and concrete parameter schemas."
      },
      {
        "letter": "B",
        "text": "Keep the universal tool and add a long natural-language description of which combos are valid."
      },
      {
        "letter": "C",
        "text": "Raise model temperature so it explores more parameter combinations."
      },
      {
        "letter": "D",
        "text": "Add `\"strict\": true` and hope validation surfaces the bad combos."
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "B",
        "reason": "A long description is exactly the kind of probabilistic control that a deterministic schema would replace; 22% parameter errors indicate the model cannot reliably follow such prose."
      },
      {
        "letter": "C",
        "reason": "Higher temperature increases parameter error rates, not decreases them."
      },
      {
        "letter": "D",
        "reason": "`strict: true` rejects invalid inputs but does not help the model choose valid ones; the failures simply shift from silent to loud without fixing the root cause. **Pattern/Trap:** P5/P10 Splitting vs Consolidating (root cause) ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 226,
    "domain": 2,
    "scenario": "S4 Developer Productivity with Claude",
    "question": "A developer needs to find every file importing a deprecated module across 15,000 files and list just the file paths. Which tool invocation is most efficient?",
    "options": [
      {
        "letter": "A",
        "text": "`Bash(\"find . -name '*.ts' -exec grep -l 'deprecatedModule' {} \\\\;\")`"
      },
      {
        "letter": "B",
        "text": "`Glob(\"**/*.ts\")` then `Read` each file."
      },
      {
        "letter": "C",
        "text": "`Grep(pattern=\"from ['\\\"]deprecatedModule['\\\"]\", type=\"ts\", output_mode=\"files_with_matches\")`."
      },
      {
        "letter": "D",
        "text": "`Agent(general-purpose)` with instructions to \"find the files.\""
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "Anthropic's system prompt tells Claude to avoid `find` and `grep` via Bash; also, shelling out bypasses the permission cache and is materially slower than ripgrep."
      },
      {
        "letter": "B",
        "reason": "Reading every file is wildly wasteful and will blow out context on 15,000 files — Grep returns paths without reading content bodies."
      },
      {
        "letter": "D",
        "reason": "Delegating to a general-purpose subagent introduces coordination overhead for what is a single direct tool call. **Pattern/Trap:** P2 First Step Proportionality + built-in tool selection ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 227,
    "domain": 2,
    "scenario": "S1 Customer Support Resolution Agent",
    "question": "The support agent handles refunds, returns, and billing disputes. Product wants a single flow where, during a refund conversation, the agent can also verify identity and check loyalty-tier discounts — without adding every tool to every other flow. What is the best tool-distribution design?",
    "options": [
      {
        "letter": "A",
        "text": "Give every agent every tool so any flow can do anything at runtime."
      },
      {
        "letter": "B",
        "text": "Create narrow, read-only cross-role tools (e.g., `verify_identity`, `get_loyalty_tier`) and include them in the refund agent's scoped allowlist alongside refund-specific tools."
      },
      {
        "letter": "C",
        "text": "Build one mega-tool `handle_customer_interaction(intent, params)` with a large `intent` enum."
      },
      {
        "letter": "D",
        "text": "Use `tool_choice: {\"type\":\"any\"}` so Claude is forced to find something workable."
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "Giving every agent every tool produces selection degradation (the exact problem scoped access solves) and violates least privilege."
      },
      {
        "letter": "C",
        "reason": "A mega-tool with a big `intent` enum moves selection to parameter-level and suffers the same failure modes as any other universal tool."
      },
      {
        "letter": "D",
        "reason": "`any` forces a tool call but does nothing about which tools are available; it is irrelevant to the distribution question. **Pattern/Trap:** P11 Scoped Access (cross-role helpers) --- ## Coverage Summary (Corrected) ### Corrections applied from original | Change | Questions affected | |---|---| | Correct answer moved B → A (swap A↔B options) | Q1, Q5, Q9 | | Correct answer moved B → D (swap B↔D options) | Q6, Q11, Q15, Q20, Q23 | | Correct answer moved C → D (swap C↔D options) | Q3 | | No change | Q2, Q4, Q7, Q8, Q10, Q12, Q13, Q14, Q16, Q17, Q18, Q19, Q21, Q22, Q24, Q25, Q26, Q27 | ### Verified answer-letter distribution | Letter | Questions | Count | |---|---|---| | **A** | Q1, Q5, Q9, Q13, Q14, Q24, Q25 | **7** ✓ | | **B** | Q4, Q8, Q12, Q17, Q18, Q22, Q27 | **7** ✓ | | **C** | Q2, Q7, Q10, Q16, Q19, Q21, Q26 | **7** ✓ | | **D** | Q3, Q6, Q11, Q15, Q20, Q23 | **6** ✓ | | **Total** | | **27** ✓ | **Previous distribution:** A=2, B=17, C=8, D=0 **Corrected distribution:** A=7, B=7, C=7, D=6 ### Task statement coverage | Task | Questions | Count | |---|---|---| | 2.1 Tool interface design & descriptions | Q1, Q15, Q17, Q19, Q25 | 5 | | 2.2 Structured error responses | Q5, Q12, Q20 | 3 | | 2.3 Tool distribution & tool_choice | Q7, Q9, Q14, Q27 | 4 | | 2.4 MCP server integration | Q6, Q8, Q13, Q16, Q18, Q23, Q24 | 7 | | 2.5 Built-in tools (Read/Write/Edit/Bash/Grep/Glob) | Q3, Q10, Q21, Q26 | 4 | | Cross-cutting | Q2, Q4, Q11, Q22 | 4 | ### Pattern distribution | Pattern | Questions | |---|---| | P5 Tool Description Primacy | Q1, Q15, Q19, Q25 | | P3 Over-Engineering Distractor | Q1, Q3, Q15, Q17 | | P11 Scoped Access / Least Privilege | Q7, Q14, Q16, Q23, Q27 | | P15 Configuration Hierarchy | Q6, Q8, Q13, Q18, Q24 | | P1 Prompt vs Programmatic Enforcement | Q9, Q11 | | P2 First Step Proportionality | Q3, Q10, Q26 | | P10 Root Cause vs Symptom | Q22, Q25 | | P14 Nullable Field Prevention | Q2, Q12 | | P13 Retry Futility | Q2 | | P6 Context Inheritance Misconception | Q4 | | P8 Larger Context Window Fallacy | Q7 | | P16 Progressive Summarization Risk | Q22 | | P18 Fresh Session vs Resume | Q21 | | Structured Error (isError) | Q5, Q20 |"
      }
    ],
    "pattern": ""
  }
];
