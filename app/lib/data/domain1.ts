import { Question } from '../types';

export const domain1Questions: Question[] = [
  {
    "id": 101,
    "domain": 1,
    "scenario": "S1 Customer Support Resolution Agent",
    "question": "Your support agent loop calls `messages.create`, checks `response.stop_reason`, executes any tools, and sends back `tool_result` blocks. In production, the loop occasionally exits after Claude calls `lookup_order` but before calling `process_refund` or replying to the customer. Logs show `stop_reason: \"end_turn\"` on those turns. What is the most likely root cause?",
    "options": [
      {
        "letter": "A",
        "text": "The agent hit its `max_tokens` limit while composing the refund reasoning and silently truncated."
      },
      {
        "letter": "B",
        "text": "A `PostToolUse` hook is rewriting the tool result and blocking the next turn."
      },
      {
        "letter": "C",
        "text": "The agent loop is terminating correctly — `end_turn` means Claude produced a final natural-language answer for the user, so the model decided no further tool call was needed for that case."
      },
      {
        "letter": "D",
        "text": "`stop_reason: \"end_turn\"` indicates a server-side timeout and the request should be retried."
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "`max_tokens` produces `stop_reason: \"max_tokens\"`, not `end_turn`; the two are distinct values and the logs show `end_turn`."
      },
      {
        "letter": "B",
        "reason": "`PostToolUse` runs after tool execution and cannot change `stop_reason`; it can only append `additionalContext` to conversation state."
      },
      {
        "letter": "D",
        "reason": "`end_turn` is a normal completion signal, not a timeout; Anthropic has no \"retry end_turn\" semantic. **Pattern/Trap:** P10 Root Cause vs Symptom ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 102,
    "domain": 1,
    "scenario": "S3 Multi-Agent Research System",
    "question": "Your research coordinator spawns three subagents via the Task/Agent tool for a market-analysis query. The coordinator has already gathered a list of 12 target companies and stored them in its conversation. Subagent 1 returns findings about only 3 of those companies; when asked why, its logs show it only \"knew about\" companies it inferred from the short task prompt. What is the correct fix?",
    "options": [
      {
        "letter": "A",
        "text": "Serialize the full 12-company list into the `prompt` string passed to the Agent tool call, since subagents do not inherit the coordinator's conversation history."
      },
      {
        "letter": "B",
        "text": "Switch the subagent to Opus so it has a larger effective context window."
      },
      {
        "letter": "C",
        "text": "Increase the subagent's `maxTurns` so it can iterate longer and discover the remaining companies."
      },
      {
        "letter": "D",
        "text": "Add a `PostToolUse` hook on the Agent tool that attaches the coordinator's transcript to the subagent input."
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "B",
        "reason": "Context window size is irrelevant when the parent history was never passed; a larger window stays empty."
      },
      {
        "letter": "C",
        "reason": "More turns cannot reveal information the subagent never received; the constraint is missing input, not insufficient iteration."
      },
      {
        "letter": "D",
        "reason": "`PostToolUse` fires after the tool (subagent) has already executed and cannot inject data into the subagent's starting prompt. **Pattern/Trap:** P6 Context Inheritance Misconception ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 103,
    "domain": 1,
    "scenario": "S1 Customer Support Resolution Agent",
    "question": "Policy requires that `process_refund` never run for amounts above $500 without a manager-approval token. Currently the system prompt says \"Never refund more than $500 without approval.\" A quarterly audit found 14 refunds of $500–$4,000 approved without tokens. Which change most reliably closes the gap?",
    "options": [
      {
        "letter": "A",
        "text": "Strengthen the system prompt with bold, capitalized warnings and add three few-shot examples of correct refusals."
      },
      {
        "letter": "B",
        "text": "Lower the agent's temperature to 0 to make refund decisions more deterministic."
      },
      {
        "letter": "C",
        "text": "Have a second Claude instance review every refund decision before it executes and veto if it disagrees."
      },
      {
        "letter": "D",
        "text": "Add a `PreToolUse` hook on `process_refund` that inspects `input.amount` and returns `permissionDecision: \"deny\"` when `amount > 500 && !input.approval_token`."
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "LLMs probabilistically violate prompt rules; strengthening prose cannot guarantee enforcement of a monetary policy."
      },
      {
        "letter": "B",
        "reason": "Lower temperature biases toward likely tokens but does not enforce any specific rule; the model can still emit a $2,000 refund tool call confidently."
      },
      {
        "letter": "C",
        "reason": "A reviewer LLM introduces its own error rate, doubles cost, and still relies on probabilistic judgment — the audit problem persists, only shifted. **Pattern/Trap:** P1 Prompt vs Programmatic Enforcement ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 104,
    "domain": 1,
    "scenario": "General",
    "question": "An extraction pipeline processes PDFs and calls `messages.create` with `tool_use` forced via `tool_choice`. Roughly 3% of requests return `stop_reason: \"max_tokens\"` mid-way through a `tool_use` block, producing invalid JSON and downstream parse errors. Which response is correct?",
    "options": [
      {
        "letter": "A",
        "text": "Treat `max_tokens` as equivalent to `end_turn` and parse whatever JSON was produced."
      },
      {
        "letter": "B",
        "text": "Catch the error, re-issue the request with a higher `max_tokens`, and if the partial tool_use is still present, continue the conversation with a `tool_result` marked `is_error: true`."
      },
      {
        "letter": "C",
        "text": "Delete the partial tool_use block from the assistant turn and retry with the same parameters."
      },
      {
        "letter": "D",
        "text": "Add a `PostToolUse` hook that repairs truncated JSON before it reaches the parser."
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "`max_tokens` and `end_turn` are semantically different; treating them the same produces malformed outputs and silent data corruption."
      },
      {
        "letter": "C",
        "reason": "If you retain the assistant turn with a `tool_use` block but do not follow it with a `tool_result`, the API rejects the next request with `invalid_request_error`."
      },
      {
        "letter": "D",
        "reason": "`PostToolUse` fires after a tool executes; it cannot intercept an LLM output block that was truncated before a tool ever ran. **Pattern/Trap:** P10 Root Cause vs Symptom ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 105,
    "domain": 1,
    "scenario": "S3 Multi-Agent Research System",
    "question": "Your research coordinator decomposes queries into 3–10 parallel subagents. For a new query class (\"summarize regulatory changes across 5 named jurisdictions\"), a colleague proposes hard-coding the five subagent invocations in a script. Which decomposition strategy best fits?",
    "options": [
      {
        "letter": "A",
        "text": "Dynamic orchestrator-worker decomposition so the coordinator decides at runtime how many subagents to spawn."
      },
      {
        "letter": "B",
        "text": "Static prompt chaining (hard-coded sequence) because the five jurisdictions are known in advance and the subtasks are predictable."
      },
      {
        "letter": "C",
        "text": "A single agent with a 200K context window that reads all jurisdictions sequentially."
      },
      {
        "letter": "D",
        "text": "Evaluator-optimizer loop where one agent proposes summaries and another critiques until convergence."
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "Dynamic decomposition is appropriate when subtasks cannot be predicted; here they can, so the extra orchestration overhead adds cost without benefit."
      },
      {
        "letter": "C",
        "reason": "Single-agent sequential reading foregoes parallelism for 5 independent jurisdictions and increases latency ~5x for no accuracy gain."
      },
      {
        "letter": "D",
        "reason": "Evaluator-optimizer addresses quality iteration on a single artifact, not breadth decomposition across independent jurisdictions. **Pattern/Trap:** P3 Over-Engineering Distractor ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 106,
    "domain": 1,
    "scenario": "S2 Code Generation with Claude Code",
    "question": "A team shares a repo that defines two subagents via `.claude/agents/reviewer.md` and `.claude/agents/test-writer.md`. A developer committed `~/.claude/agents/reviewer.md` with different instructions on their laptop and wonders why teammates see different behavior. Which statement is correct?",
    "options": [
      {
        "letter": "A",
        "text": "`~/.claude/agents/` is user-level and never shared via git; teammates only see `.claude/agents/` in the repo."
      },
      {
        "letter": "B",
        "text": "User-level agents in `~/.claude/agents/` are automatically synced when the repo is cloned."
      },
      {
        "letter": "C",
        "text": "`.claude/agents/` is gitignored by default; agents must be placed at `~/.claude/agents/` to be shared."
      },
      {
        "letter": "D",
        "text": "Both locations are merged and the union is shared with teammates via Claude's cloud sync."
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "B",
        "reason": "There is no automatic sync of `~/.claude/` across machines; that directory is private to each user."
      },
      {
        "letter": "C",
        "reason": "`.claude/settings.local.json` is gitignored by default, but `.claude/settings.json`, `.claude/agents/`, and `.claude/commands/` are the intended shared path."
      },
      {
        "letter": "D",
        "reason": "Claude Code does not operate a cloud-sync service for agents; shared config flows through git only. **Pattern/Trap:** P15 Configuration Hierarchy ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 107,
    "domain": 1,
    "scenario": "S1 Customer Support Resolution Agent",
    "question": "The support agent has `allowedTools: [\"get_customer\", \"lookup_order\", \"process_refund\", \"escalate_to_human\"]`. A user writes: \"Please escalate this to a human — I want a supervisor now.\" Claude responds by apologizing and offering a $20 credit instead. Which change is most aligned with best practice?",
    "options": [
      {
        "letter": "A",
        "text": "Add a system-prompt rule: \"If the user requests escalation, call escalate_to_human immediately and do not offer alternatives.\""
      },
      {
        "letter": "B",
        "text": "Remove `process_refund` from `allowedTools` so Claude cannot offer credits."
      },
      {
        "letter": "C",
        "text": "Lower temperature to 0."
      },
      {
        "letter": "D",
        "text": "Add a `PostToolUse` hook that rewrites credit offers into escalations."
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "B",
        "reason": "Removing `process_refund` breaks legitimate refund handling for every other case and does not teach the agent to escalate — it just narrows the menu."
      },
      {
        "letter": "C",
        "reason": "Temperature 0 does not teach escalation behavior; the model can still deterministically pick \"offer credit\" if that is the highest-likelihood path."
      },
      {
        "letter": "D",
        "reason": "`PostToolUse` cannot rewrite an assistant message that was never a tool call; credits here were conversational, not tool outputs. **Pattern/Trap:** P20 Explicit Escalation Criteria ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 108,
    "domain": 1,
    "scenario": "General",
    "question": "An architect designs an agent loop and insists the loop should also exit when `stop_reason == \"pause_turn\"`. In what situation is that stop reason emitted, and what is the correct handling?",
    "options": [
      {
        "letter": "A",
        "text": "`pause_turn` means the user paused the session; the agent should halt until resumed."
      },
      {
        "letter": "B",
        "text": "`pause_turn` is returned by server-executed tools (web_search, code_execution) when their internal iteration cap is hit; the client should resend the conversation including the paused assistant response to continue."
      },
      {
        "letter": "C",
        "text": "`pause_turn` indicates rate limiting; the client should back off exponentially."
      },
      {
        "letter": "D",
        "text": "`pause_turn` means Claude refused; treat it identically to `refusal`."
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "There is no user-pause mechanic that surfaces as `pause_turn`; that is an API-level signal, not a UI state."
      },
      {
        "letter": "C",
        "reason": "Rate limiting surfaces as HTTP 429 with retry headers, not as a `stop_reason`."
      },
      {
        "letter": "D",
        "reason": "`refusal` is its own distinct stop reason with different semantics (safety); conflating them loses error fidelity. **Pattern/Trap:** P10 Root Cause vs Symptom ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 109,
    "domain": 1,
    "scenario": "S3 Multi-Agent Research System",
    "question": "Your coordinator runs an 8-subagent research task. After all subagents return, the coordinator produces a final report. Average coordinator token usage is 180K tokens per run and the team wants to reduce it by 30%. Which approach preserves accuracy best?",
    "options": [
      {
        "letter": "A",
        "text": "Instruct subagents to return compressed, structured findings (key facts, citations, confidence) rather than raw search dumps."
      },
      {
        "letter": "B",
        "text": "Replace the coordinator model with Haiku to shrink the summary size."
      },
      {
        "letter": "C",
        "text": "Move the coordinator to the Batch API."
      },
      {
        "letter": "D",
        "text": "Run each subagent twice and majority-vote the outputs before returning to the coordinator."
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "B",
        "reason": "Downgrading the coordinator model harms synthesis quality; the post notes coordinator capability is the single biggest predictor of final answer quality."
      },
      {
        "letter": "C",
        "reason": "Batch API is for high-latency asynchronous jobs; a user-facing research task cannot tolerate 24-hour batch windows."
      },
      {
        "letter": "D",
        "reason": "Duplicated subagent runs double token cost, the opposite of the goal, and consensus suppresses intermittent useful signal. **Pattern/Trap:** P7 Batch API Latency Trap ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 110,
    "domain": 1,
    "scenario": "S4 Developer Productivity with Claude",
    "question": "A developer starts a debugging session at 9 AM, steps away, and resumes at 3 PM. She runs `claude --resume <session_id>`. The session's conversation history refers to files that have since been edited by a teammate on a different branch. Which is the best practice?",
    "options": [
      {
        "letter": "A",
        "text": "Always resume; Claude tracks file state automatically and will detect mismatches."
      },
      {
        "letter": "B",
        "text": "Use `fork_session` to get a clean state while keeping the original history."
      },
      {
        "letter": "C",
        "text": "Resume only when the prior context is still valid; if the code has meaningfully diverged, start a fresh session to avoid stale assumptions poisoning the reasoning."
      },
      {
        "letter": "D",
        "text": "Run `--resume` with `--clear-context` to reset tool results while keeping messages."
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "The SDK does not automatically re-verify file state against old tool results; stale reads remain in the transcript as if current."
      },
      {
        "letter": "B",
        "reason": "`fork_session` copies existing state into a new session id; it does not clean stale file reads — it duplicates them."
      },
      {
        "letter": "D",
        "reason": "There is no `--clear-context` flag that selectively drops tool results while retaining messages. **Pattern/Trap:** P18 Fresh Session vs Resume ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 111,
    "domain": 1,
    "scenario": "S5 Claude Code for CI/CD",
    "question": "A CI pipeline runs Claude Code non-interactively with `-p` to auto-fix lint warnings. The team wants to prevent Claude from ever writing to `node_modules/` or `.env*` files. Which configuration reliably enforces this?",
    "options": [
      {
        "letter": "A",
        "text": "A `PreToolUse` hook matching `Write|Edit` that inspects the target path and returns `permissionDecision: \"deny\"` for forbidden paths."
      },
      {
        "letter": "B",
        "text": "A system prompt directive: \"Never edit node_modules or .env files.\""
      },
      {
        "letter": "C",
        "text": "A `Notification` hook that warns the user when forbidden paths are touched."
      },
      {
        "letter": "D",
        "text": "A `PermissionRequest` hook to pop up a confirmation dialog."
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "B",
        "reason": "Prompts cannot guarantee path-level enforcement against a probabilistic model, especially across thousands of CI runs."
      },
      {
        "letter": "C",
        "reason": "`Notification` hooks are informational and fire after actions are taken; they do not block."
      },
      {
        "letter": "D",
        "reason": "`PermissionRequest` hooks do not fire in non-interactive (`-p`) mode; Anthropic's docs explicitly direct users to `PreToolUse` for automated decisions. **Pattern/Trap:** P1 Prompt vs Programmatic Enforcement ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 112,
    "domain": 1,
    "scenario": "S3 Multi-Agent Research System",
    "question": "You define a subagent with `AgentDefinition` fields including `description` and `prompt`. Other developers notice Claude is not routing relevant queries to this subagent. Which field is most commonly the root cause?",
    "options": [
      {
        "letter": "A",
        "text": "`prompt` — it needs to be longer to give Claude more to work with."
      },
      {
        "letter": "B",
        "text": "`description` — it is used by the coordinator to auto-route to this subagent; vague or missing descriptions prevent delegation."
      },
      {
        "letter": "C",
        "text": "`tools` — subagents cannot be invoked unless `tools` is empty."
      },
      {
        "letter": "D",
        "text": "`model` — routing requires an explicit `model` override."
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "`prompt` is the subagent's system prompt (internal instructions); it does not affect whether the coordinator chooses the subagent."
      },
      {
        "letter": "C",
        "reason": "Empty `tools` is not required for invocation; it just restricts what the subagent can do once invoked."
      },
      {
        "letter": "D",
        "reason": "`model` is optional; routing works fine with the default inherited model. **Pattern/Trap:** P5 Tool Description Primacy ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 113,
    "domain": 1,
    "scenario": "S2 Code Generation with Claude Code",
    "question": "A Claude Code agent completes a multi-step refactor. Your project defines `PreToolUse` hooks that gate `Write` and `Bash`. A new subagent you defined also writes files but the hooks do not run when that subagent writes. Why?",
    "options": [
      {
        "letter": "A",
        "text": "Subagents inherit parent hooks automatically, so the hooks are running but failing silently."
      },
      {
        "letter": "B",
        "text": "Hooks must be redefined inside each `AgentDefinition.hooks` field or they do not apply."
      },
      {
        "letter": "C",
        "text": "`PreToolUse` hooks only fire for the top-level agent; subagent tool calls bypass them entirely."
      },
      {
        "letter": "D",
        "text": "`PreToolUse` hooks configured via `settingSources: [\"project\"]` in the parent SDK options apply to the entire session tree, including subagents, provided the subagent's tool calls happen in the same process."
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "Hooks are not \"silently failing\"; Anthropic's docs show hook errors surface in `hook_feedback` or `tool_result` content, not silently."
      },
      {
        "letter": "B",
        "reason": "`AgentDefinition` has no `hooks` field; hooks are configured at the session level, not per AgentDefinition."
      },
      {
        "letter": "C",
        "reason": "Subagent tool calls do fire `PreToolUse`; the common bug is forgetting to include `settingSources` so the hook file never loads at all. **Pattern/Trap:** P10 Root Cause vs Symptom ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 114,
    "domain": 1,
    "scenario": "S6 Structured Data Extraction",
    "question": "You extract invoices into a schema with required fields `invoice_number`, `total`, `vendor_tax_id`. About 12% of source PDFs omit the tax ID. Current schema marks all three as required; Claude is fabricating plausible tax IDs when absent. Which fix is best?",
    "options": [
      {
        "letter": "A",
        "text": "Add a system prompt: \"Do not hallucinate.\""
      },
      {
        "letter": "B",
        "text": "Re-run extractions that produce tax IDs through a second review agent."
      },
      {
        "letter": "C",
        "text": "Change the schema to make `vendor_tax_id` nullable and instruct the model to emit `null` when not present in the source."
      },
      {
        "letter": "D",
        "text": "Lower temperature to 0 so outputs become deterministic."
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "Generic \"do not hallucinate\" prompts do not fix a structural contradiction where the schema demands a value the source lacks."
      },
      {
        "letter": "B",
        "reason": "A reviewer agent cannot verify a tax ID it also cannot see in the source; it faces the same information gap."
      },
      {
        "letter": "D",
        "reason": "Temperature 0 makes fabrication deterministic, not accurate; the model can consistently produce the same wrong tax ID. **Pattern/Trap:** P14 Nullable Field Prevention ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 115,
    "domain": 1,
    "scenario": "S1 Customer Support Resolution Agent",
    "question": "Your agent's `get_customer` MCP tool description reads: \"Gets customer.\" The agent calls it unnecessarily (including for anonymous FAQ questions), driving up costs by 40%. What should you try first?",
    "options": [
      {
        "letter": "A",
        "text": "Add a classifier LLM in front of the agent to decide whether customer lookup is needed."
      },
      {
        "letter": "B",
        "text": "Rewrite the tool description to specify when to use it: \"Retrieves authenticated customer record. Only call when the user has provided an order ID, email, or account number AND the task requires personal account data.\""
      },
      {
        "letter": "C",
        "text": "Remove `get_customer` from `allowedTools` and let the agent ask the user for details directly."
      },
      {
        "letter": "D",
        "text": "Reduce the main model from Sonnet to Haiku to make calls cheaper."
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "A classifier LLM is an over-engineered addition that duplicates the LLM's native routing capability; descriptions are the correct lever."
      },
      {
        "letter": "C",
        "reason": "Removing the tool breaks legitimate customer lookups; the problem is over-use, not existence."
      },
      {
        "letter": "D",
        "reason": "Model downgrade may degrade quality across all tasks and does not address the misrouting cause. **Pattern/Trap:** P5 Tool Description Primacy, P2 First Step Proportionality ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 116,
    "domain": 1,
    "scenario": "S2 Code Generation with Claude Code",
    "question": "A developer is mid-refactor at turn 47 and wants to explore an alternative database choice without losing the current work. Which command supports this best?",
    "options": [
      {
        "letter": "A",
        "text": "`claude --resume <session_id>` and edit the last message."
      },
      {
        "letter": "B",
        "text": "`claude --new` to start fresh, then paste relevant context manually."
      },
      {
        "letter": "C",
        "text": "`claude --resume <session_id> --fork-session` so the new session clones the transcript up to the current point, leaving the original session intact."
      },
      {
        "letter": "D",
        "text": "`claude --resume <session_id> --bypass-permissions` to freely change tools."
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "Resuming and editing modifies the single session history and loses the original path the team may want to keep."
      },
      {
        "letter": "B",
        "reason": "Starting fresh loses prior reasoning and forces manual recovery, which risks omissions."
      },
      {
        "letter": "D",
        "reason": "`--bypass-permissions` has nothing to do with branching; it disables permission checks. **Pattern/Trap:** P18 Fresh Session vs Resume ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 117,
    "domain": 1,
    "scenario": "S3 Multi-Agent Research System",
    "question": "The team proposes giving subagents access to the `Agent` tool so they can spawn sub-subagents. What is the documented behavior and recommendation?",
    "options": [
      {
        "letter": "A",
        "text": "Recursive Agent spawning is supported and recommended for deep research trees."
      },
      {
        "letter": "B",
        "text": "Subagents can technically include `Agent` in `tools`, but Anthropic explicitly recommends against it; sub-subagent spawning is unsupported and can cause runaway token usage."
      },
      {
        "letter": "C",
        "text": "Subagents inherit the `Agent` tool by default; removing it requires `disallowedTools: [\"Agent\"]`."
      },
      {
        "letter": "D",
        "text": "Sub-subagents are allowed but inherit the root coordinator's conversation history."
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "Anthropic's docs explicitly caution against recursive spawning; the multi-agent research post describes a two-level hub-and-spoke, not arbitrary depth."
      },
      {
        "letter": "C",
        "reason": "Subagents do not receive `Agent` in inherited tools when they have no way to spawn; the default for subagents excludes Agent to prevent recursion."
      },
      {
        "letter": "D",
        "reason": "Even if spawning were allowed, sub-subagents would not inherit the root's history — the only channel is the prompt string. **Pattern/Trap:** P3 Over-Engineering Distractor ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 118,
    "domain": 1,
    "scenario": "S1 Customer Support Resolution Agent",
    "question": "Aggregate agent resolution rate is 92%. Product leadership is happy until a segment analysis shows refund cases resolve at 63% while FAQ cases resolve at 98%. What is the correct architectural response?",
    "options": [
      {
        "letter": "A",
        "text": "Celebrate the 92% and move on — aggregate is acceptable."
      },
      {
        "letter": "B",
        "text": "Investigate the refund segment specifically; aggregate accuracy is masking a poorly performing subpath that likely needs its own tool, hook, or subagent."
      },
      {
        "letter": "C",
        "text": "Retrain the model on more FAQ data to further lift the easier segment."
      },
      {
        "letter": "D",
        "text": "Increase temperature to encourage more creative refund solutions."
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "Ignoring segment gaps means refund users experience near-coin-flip support quality while leadership reports success."
      },
      {
        "letter": "C",
        "reason": "Retraining on the strong segment widens the gap; it does not address the weak segment."
      },
      {
        "letter": "D",
        "reason": "Higher temperature reduces determinism on a policy-heavy task, worsening refund accuracy. **Pattern/Trap:** P12 Aggregate Metric Masking ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 119,
    "domain": 1,
    "scenario": "S3 Multi-Agent Research System",
    "question": "The coordinator returns its final report, but key numerical findings in the middle of the 12,000-token synthesis get dropped when downstream summarization runs. What is the most effective mitigation at the coordinator output stage?",
    "options": [
      {
        "letter": "A",
        "text": "Progressively summarize multiple times to tighten the report."
      },
      {
        "letter": "B",
        "text": "Use a larger-context model and let it summarize."
      },
      {
        "letter": "C",
        "text": "Position the most critical findings, numbers, and dates at the beginning and end of the report; avoid burying them in the middle to mitigate \"lost in the middle\" effects."
      },
      {
        "letter": "D",
        "text": "Encode the findings as base64 so the summarizer cannot drop them."
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "Progressive summarization degrades precision on numbers and dates with each pass; it compounds the problem."
      },
      {
        "letter": "B",
        "reason": "Larger context does not improve attention quality in the middle; the failure mode persists regardless of window size."
      },
      {
        "letter": "D",
        "reason": "Base64 obscures the content from the model entirely, preventing any useful summarization; it is not a serious mitigation. **Pattern/Trap:** P17 Lost in the Middle, P16 Progressive Summarization Risk ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 120,
    "domain": 1,
    "scenario": "S6 Structured Data Extraction",
    "question": "Your extraction agent occasionally emits dates in `MM/DD/YYYY` when source documents use ISO format and vice versa, producing 6% downstream parse failures. Which approach uses Agent SDK hooks most appropriately?",
    "options": [
      {
        "letter": "A",
        "text": "A `PostToolUse` hook on the extraction tool that normalizes all dates to ISO 8601 before the result enters downstream storage."
      },
      {
        "letter": "B",
        "text": "A `PreToolUse` hook that rewrites the user prompt."
      },
      {
        "letter": "C",
        "text": "A `Notification` hook that pings Slack on each inconsistency."
      },
      {
        "letter": "D",
        "text": "Add a system prompt saying \"always use ISO format.\""
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "B",
        "reason": "`PreToolUse` runs before execution and rewriting the user prompt does not deterministically normalize output format."
      },
      {
        "letter": "C",
        "reason": "Notifying Slack records the problem but does not fix it; data still flows in mixed formats."
      },
      {
        "letter": "D",
        "reason": "Prompt instructions for formatting are probabilistically followed; 6% deviation is consistent with that weakness. **Pattern/Trap:** P1 Prompt vs Programmatic Enforcement ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 121,
    "domain": 1,
    "scenario": "General",
    "question": "An agent loop receives `stop_reason: \"refusal\"`. Which handling is correct?",
    "options": [
      {
        "letter": "A",
        "text": "Retry the same prompt — refusals are usually transient."
      },
      {
        "letter": "B",
        "text": "Treat it as a terminal state: exit the loop and surface an appropriate message; do not resubmit tool results because there is no tool_use block to satisfy."
      },
      {
        "letter": "C",
        "text": "Continue the loop with an empty `tool_result`."
      },
      {
        "letter": "D",
        "text": "Escalate to a more capable model automatically."
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "Refusals are policy-driven, not transient; retrying the identical prompt typically yields the same result and wastes spend."
      },
      {
        "letter": "C",
        "reason": "There is no `tool_use` block to match, so sending a `tool_result` produces `invalid_request_error`."
      },
      {
        "letter": "D",
        "reason": "Automatic model-escalation on refusals is an attempt to evade safety controls; it is neither a recommended nor reliable pattern. **Pattern/Trap:** P10 Root Cause vs Symptom ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 122,
    "domain": 1,
    "scenario": "S1 Customer Support Resolution Agent",
    "question": "A developer proposes consolidating four tools (`get_customer`, `lookup_order`, `process_refund`, `escalate_to_human`) into a single `support_action` tool with a `type` parameter to \"simplify\" the tool list. What is the trade-off most relevant here?",
    "options": [
      {
        "letter": "A",
        "text": "Consolidation improves accuracy because Claude picks one tool name."
      },
      {
        "letter": "B",
        "text": "The Agent SDK requires at most three tools, so consolidation is mandatory."
      },
      {
        "letter": "C",
        "text": "Consolidation typically degrades tool-selection accuracy and hides preconditions better expressed in per-tool descriptions and schemas; four well-described tools are generally preferable."
      },
      {
        "letter": "D",
        "text": "Consolidation reduces latency proportional to the number of tools removed."
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "Selection accuracy depends on description quality, not the number of tools on the menu; one vaguely described tool is worse than four precisely described ones."
      },
      {
        "letter": "B",
        "reason": "There is no such limit; Claude regularly uses dozens of tools."
      },
      {
        "letter": "D",
        "reason": "Latency is driven by turns and token count; tool count is not a major factor. **Pattern/Trap:** P3 Over-Engineering Distractor, P5 Tool Description Primacy ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 123,
    "domain": 1,
    "scenario": "S3 Multi-Agent Research System",
    "question": "Your coordinator spawns a synthesis subagent whose job is to combine earlier subagent outputs and produce a final report. The coordinator currently asks that same synthesis subagent to also self-review its report for accuracy. Quality is mediocre. Which change is most effective?",
    "options": [
      {
        "letter": "A",
        "text": "Delegate the review to an independent, separately-instantiated reviewer subagent rather than having the author self-review."
      },
      {
        "letter": "B",
        "text": "Tell the synthesis agent to \"be more critical.\""
      },
      {
        "letter": "C",
        "text": "Run the synthesis subagent three times and majority-vote the outputs."
      },
      {
        "letter": "D",
        "text": "Have the coordinator review by reading the report aloud in its response."
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "B",
        "reason": "\"Be more critical\" is a prompt tweak that does not overcome the structural bias of same-instance self-review."
      },
      {
        "letter": "C",
        "reason": "Majority voting on the same model/prompt suppresses intermittent but correct minority signals; it masks rare bugs rather than revealing them."
      },
      {
        "letter": "D",
        "reason": "The coordinator reading text aloud adds no evaluative capability and does not constitute independent review. **Pattern/Trap:** P19 Self-Review Limitation, P9 Consensus Review Fallacy ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 124,
    "domain": 1,
    "scenario": "S5 Claude Code for CI/CD",
    "question": "A CI job runs Claude Code to triage failing tests. The team wants runtime limits: no more than 25 turns per job. Where should this be enforced?",
    "options": [
      {
        "letter": "A",
        "text": "Include the limit in the system prompt."
      },
      {
        "letter": "B",
        "text": "Configure a `Stop` hook that counts turns internally."
      },
      {
        "letter": "C",
        "text": "Manually abort after 25 turns via a shell timer."
      },
      {
        "letter": "D",
        "text": "Set `maxTurns` in the `ClaudeAgentOptions` (or `AgentDefinition` if run as a subagent) so the loop terminates automatically at the programmatic boundary."
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "Prompt-level turn limits are not enforced; the model does not track turns reliably."
      },
      {
        "letter": "B",
        "reason": "`Stop` hooks fire when a turn ends; they do not provide a cleaner mechanism than the built-in `maxTurns` option."
      },
      {
        "letter": "C",
        "reason": "A shell timer on wall-clock time is a crude proxy; a slow single turn can burn the budget while a fast 30-turn job runs fine. **Pattern/Trap:** P1 Prompt vs Programmatic Enforcement ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 125,
    "domain": 1,
    "scenario": "S1 Customer Support Resolution Agent",
    "question": "Your agent handles refunds. After refund processing, the workflow must also (a) send a confirmation email and (b) update CRM. Currently the system prompt instructs Claude to \"remember to always send email and update CRM after a refund.\" In production, one of these steps is missed in 9% of cases. Which is the best fix?",
    "options": [
      {
        "letter": "A",
        "text": "Add the two steps as bullet points to the system prompt in bold."
      },
      {
        "letter": "B",
        "text": "Implement a structured handoff: make `process_refund` return a `next_actions` array, and enforce via a `PostToolUse` hook that queues required follow-ups (`send_confirmation_email`, `update_crm`) or blocks finalization until they complete."
      },
      {
        "letter": "C",
        "text": "Have the agent apologize to the user and retry."
      },
      {
        "letter": "D",
        "text": "Deploy a second Claude agent to audit completed refunds weekly."
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "Bullet points and bolding do not make a rule programmatically enforceable; 9% drift is consistent with prompt-only controls."
      },
      {
        "letter": "C",
        "reason": "Apologies do not prevent the next omission; they convert a reliability issue into a customer-experience issue."
      },
      {
        "letter": "D",
        "reason": "Weekly audits catch problems after the fact and do not prevent missed steps in the moment. **Pattern/Trap:** P1 Prompt vs Programmatic Enforcement ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 126,
    "domain": 1,
    "scenario": "S3 Multi-Agent Research System",
    "question": "A colleague proposes an \"orchestrator-workers\" multi-agent design for a coding task that requires editing three tightly-coupled files across the repo. Anthropic's own guidance on this pattern suggests:",
    "options": [
      {
        "letter": "A",
        "text": "Orchestrator-workers is ideal because each file can be edited in parallel."
      },
      {
        "letter": "B",
        "text": "Use three independent sessions and manually merge."
      },
      {
        "letter": "C",
        "text": "Orchestrator-workers always outperforms single-agent by ~90%."
      },
      {
        "letter": "D",
        "text": "Multi-agent architectures are poorly suited to tasks requiring shared context or tight inter-agent dependencies, such as most coding tasks with cross-file coupling; a single agent is usually preferable."
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "Parallel edits across tightly-coupled files produce merge conflicts and inconsistent changes; parallelism is inappropriate where dependencies are tight."
      },
      {
        "letter": "B",
        "reason": "Independent sessions plus manual merge is the exact anti-pattern the pattern guidance warns against."
      },
      {
        "letter": "C",
        "reason": "The ~90% figure is specific to breadth-first research queries on Anthropic's internal eval, not a universal result; it does not apply to coding. **Pattern/Trap:** P3 Over-Engineering Distractor ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 127,
    "domain": 1,
    "scenario": "General",
    "question": "Two `PreToolUse` hooks are registered on `Write`. Hook A always returns `{permissionDecision: \"allow\", updatedInput: {...pathA}}`; Hook B returns `{permissionDecision: \"allow\", updatedInput: {...pathB}}`. Which statement best describes SDK behavior?",
    "options": [
      {
        "letter": "A",
        "text": "Hooks run sequentially in registration order and the first result wins."
      },
      {
        "letter": "B",
        "text": "Conflicts cause the tool call to be denied automatically."
      },
      {
        "letter": "C",
        "text": "Both inputs are merged field-wise."
      },
      {
        "letter": "D",
        "text": "Hooks run in parallel; when multiple return `updatedInput`, the last one to finish wins and order is non-deterministic. Avoid multiple writers to the same field."
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "Registration order is not preserved; parallel execution means \"first\" is meaningless in the sequential sense."
      },
      {
        "letter": "B",
        "reason": "There is no automatic conflict-deny; only an explicit `deny` decision blocks the call, and deny beats allow."
      },
      {
        "letter": "C",
        "reason": "The SDK does not do field-wise merging of `updatedInput`; last-writer-wins is a whole-object overwrite. **Pattern/Trap:** P1 Prompt vs Programmatic Enforcement ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 128,
    "domain": 1,
    "scenario": "S4 Developer Productivity with Claude",
    "question": "A developer wants a pre-commit guardrail: before Claude runs `git commit`, a Python script should validate that no `console.log` statements were added. Which mechanism is most appropriate?",
    "options": [
      {
        "letter": "A",
        "text": "A `PreToolUse` hook matching `Bash` with a command hook that inspects the pending command and greps the staged diff, denying if a `console.log` is found."
      },
      {
        "letter": "B",
        "text": "A `PostToolUse` hook that warns after the commit completes."
      },
      {
        "letter": "C",
        "text": "A system prompt rule that says \"do not commit console.log statements.\""
      },
      {
        "letter": "D",
        "text": "Turn off the `Bash` tool and require the developer to commit manually."
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "B",
        "reason": "`PostToolUse` cannot block the commit; it only sees results after execution and cannot undo them."
      },
      {
        "letter": "C",
        "reason": "Prompt rules are probabilistic and do not enforce deterministic pre-commit gates."
      },
      {
        "letter": "D",
        "reason": "Disabling Bash removes useful functionality broadly instead of narrowly enforcing the specific rule. **Pattern/Trap:** P1 Prompt vs Programmatic Enforcement ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 129,
    "domain": 1,
    "scenario": "S1 Customer Support Resolution Agent",
    "question": "The agent reports `confidence: 0.94` in its final message when resolving refund cases. Correlating with audit outcomes, refunds labeled \"high confidence\" have only a 71% correctness rate while low-confidence refunds have 68%. The team wants to use the confidence score to auto-approve. What is the best assessment?",
    "options": [
      {
        "letter": "A",
        "text": "0.94 confidence is reliable; auto-approve above 0.9."
      },
      {
        "letter": "B",
        "text": "Use a second LLM to re-grade the confidence score before using it as a gate."
      },
      {
        "letter": "C",
        "text": "The issue is a temperature problem; setting temperature to 0 will fix calibration."
      },
      {
        "letter": "D",
        "text": "LLM self-reported confidence is typically poorly calibrated. The near-identical correctness across bands indicates the signal has limited discriminative value; do not use it as a gating threshold without calibration and independent validation."
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "The empirical data contradicts the assumption; 71% correctness is not acceptable for auto-approval of refunds."
      },
      {
        "letter": "B",
        "reason": "A second LLM inherits the same calibration weakness; stacking self-reports does not produce a well-calibrated number."
      },
      {
        "letter": "C",
        "reason": "Temperature affects output variability, not the calibration of a model's self-reported score; the miscalibration would persist. **Pattern/Trap:** P4 Sentiment/Confidence Trap ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 130,
    "domain": 1,
    "scenario": "S3 Multi-Agent Research System",
    "question": "Your coordinator invokes a `web_researcher` subagent with only the prompt \"Research recent trends.\" The subagent returns generic, unfocused findings. Which decomposition improvement is most impactful?",
    "options": [
      {
        "letter": "A",
        "text": "Switch the subagent to Opus."
      },
      {
        "letter": "B",
        "text": "Provide a detailed subagent brief in the prompt: objective, output format, tool/source guidance, scope boundaries, and success criteria — per Anthropic's multi-agent research system guidance."
      },
      {
        "letter": "C",
        "text": "Increase `maxTurns` from 10 to 30."
      },
      {
        "letter": "D",
        "text": "Add two more web-search subagents in parallel."
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "Opus cannot infer the missing brief; the model upgrade pays for capability on a mis-specified task."
      },
      {
        "letter": "C",
        "reason": "More turns expand generic output without improving direction."
      },
      {
        "letter": "D",
        "reason": "Adding parallel subagents with the same vague brief multiplies the cost of generic output. **Pattern/Trap:** P5 Tool Description Primacy, P2 First Step Proportionality ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 131,
    "domain": 1,
    "scenario": "S1 Customer Support Resolution Agent",
    "question": "Two tools are currently separated by role: `get_customer_basic` for agents and `get_customer_full` for managers. About 80% of refund cases require only name + order history, which is in `basic`. However, some legitimate refund flows need `full`. The team debates least-privilege design. Which option best balances security and functionality?",
    "options": [
      {
        "letter": "A",
        "text": "Give all agents `get_customer_full` and rely on prompts to restrict use."
      },
      {
        "letter": "B",
        "text": "Remove `get_customer_full` entirely; agents should ask managers manually for every case."
      },
      {
        "letter": "C",
        "text": "Keep `get_customer_basic` as the default for agents with a scoped, purpose-restricted `get_customer_full` callable only via a tool whose `PreToolUse` hook enforces justification capture and refund-case verification."
      },
      {
        "letter": "D",
        "text": "Merge both tools into one and let Claude decide which fields to request."
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "Prompts cannot guarantee restriction; exposing full data broadly violates least privilege and creates compliance risk."
      },
      {
        "letter": "B",
        "reason": "Blanket removal blocks 20% of legitimate work and forces human bottlenecks on routine cases."
      },
      {
        "letter": "D",
        "reason": "Collapsing tools removes the enforcement seam; Claude's \"decision\" is not a security boundary. **Pattern/Trap:** P11 Scoped Access / Least Privilege ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 132,
    "domain": 1,
    "scenario": "S5 Claude Code for CI/CD",
    "question": "A flaky integration test passes on 3 of 5 re-runs. The agent is configured to \"retry on failure up to 5 times and report the consensus result.\" The bug being masked is an intermittent race condition. What is the architectural problem?",
    "options": [
      {
        "letter": "A",
        "text": "Five retries is not enough; increase to ten."
      },
      {
        "letter": "B",
        "text": "The retries should use the Batch API."
      },
      {
        "letter": "C",
        "text": "Switch to a larger model to improve reliability."
      },
      {
        "letter": "D",
        "text": "Consensus-on-retry masks intermittent bugs rather than surfacing them. The CI agent should flag any failure, not vote it away; retry-and-consensus suppresses exactly the signal engineers need."
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "More retries increase the probability of hiding the bug; a 30% flake rate vanishes quickly under majority voting."
      },
      {
        "letter": "B",
        "reason": "Batch API introduces latency unsuitable for CI and does not address the consensus-masking problem."
      },
      {
        "letter": "C",
        "reason": "The issue is in the test subject (race condition), not model capability; no model choice changes CI consensus semantics. **Pattern/Trap:** P9 Consensus Review Fallacy ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 133,
    "domain": 1,
    "scenario": "S6 Structured Data Extraction",
    "question": "A required field `ein` (US Employer Identification Number) is absent from 40% of source invoices. The team tries retrying the extraction up to 3 times hoping to get a valid EIN. After retry logic went live, the EIN population rate rose to 97%. A sample audit shows most of the newly-populated EINs are fabricated. What went wrong?",
    "options": [
      {
        "letter": "A",
        "text": "The retry count is insufficient; 5 retries would produce cleaner outputs."
      },
      {
        "letter": "B",
        "text": "The temperature is too low; raise it to encourage diverse retry outputs."
      },
      {
        "letter": "C",
        "text": "Retrying does not help when the information is absent from the source; the field should be made nullable and schema/prompt explicitly instructed to return `null` when absent. The rising \"success rate\" is a hallucination indicator, not improvement."
      },
      {
        "letter": "D",
        "text": "The extractor should pull EINs from an external database automatically."
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "More retries amplify fabrication, making the audit failure worse; population rate is a misleading success metric."
      },
      {
        "letter": "B",
        "reason": "Higher temperature increases fabrication variability, not accuracy; it makes the problem worse."
      },
      {
        "letter": "D",
        "reason": "Silent automatic external enrichment is a material scope change that introduces its own correctness and privacy issues; it is not a fix to the extraction itself. **Pattern/Trap:** P13 Retry Futility, P14 Nullable Field Prevention ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 134,
    "domain": 1,
    "scenario": "S3 Multi-Agent Research System",
    "question": "You enable a `SubagentStop` hook to log per-subagent token usage. It fires reliably. A developer also wants a `SubagentStart` hook to inject a common style guide into every subagent. Which is correct?",
    "options": [
      {
        "letter": "A",
        "text": "The style guide should be added to the coordinator's system prompt so subagents \"inherit\" it."
      },
      {
        "letter": "B",
        "text": "Place the style guide in `~/.claude/CLAUDE.md` to force per-subagent inheritance from the user home."
      },
      {
        "letter": "C",
        "text": "Use a `Notification` hook to display the style guide in the UI."
      },
      {
        "letter": "D",
        "text": "Add the style guide to each `AgentDefinition.prompt` (and/or via `SubagentStart` where supported) because subagents do not inherit the parent's system prompt."
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "Parent system prompts are invisible to subagents by design; the guide would never reach them."
      },
      {
        "letter": "B",
        "reason": "User-level `CLAUDE.md` at `~/.claude/` is personal and not loaded into subagents unless settings explicitly wire it in; project-level `CLAUDE.md` is more appropriate but still not automatic for every subagent context."
      },
      {
        "letter": "C",
        "reason": "`Notification` hooks are UI-facing and do not enter subagent context. **Pattern/Trap:** P6 Context Inheritance Misconception ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 135,
    "domain": 1,
    "scenario": "S2 Code Generation with Claude Code",
    "question": "A developer designs a long-running refactor agent and wants to handle crashes gracefully. Which session strategy best supports reliable recovery?",
    "options": [
      {
        "letter": "A",
        "text": "Persist the `session_id` returned in the SDK's init message; on crash, invoke `--resume <session_id>` to reload the full transcript and continue from the last state."
      },
      {
        "letter": "B",
        "text": "Serialize the entire conversation to a local JSON file and rebuild it manually on recovery."
      },
      {
        "letter": "C",
        "text": "Rely on memory-only sessions and re-prompt on crash."
      },
      {
        "letter": "D",
        "text": "Always start a fresh session after any crash to avoid stale state."
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "B",
        "reason": "Manual JSON serialization duplicates what the SDK already does automatically and risks schema drift."
      },
      {
        "letter": "C",
        "reason": "Memory-only sessions lose all context on crash, forcing expensive re-prompting and rework."
      },
      {
        "letter": "D",
        "reason": "Starting fresh throws away valid context; resume is the correct default when the prior context is still valid. **Pattern/Trap:** P18 Fresh Session vs Resume ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 136,
    "domain": 1,
    "scenario": "S1 Customer Support Resolution Agent",
    "question": "Your agent's `allowedTools` includes MCP-namespaced tools like `mcp__billing__process_refund`. A `PreToolUse` hook is configured with `matcher: \"process_refund\"`. It never fires. Why?",
    "options": [
      {
        "letter": "A",
        "text": "MCP tools cannot be hooked."
      },
      {
        "letter": "B",
        "text": "Hooks must be registered before the MCP server starts."
      },
      {
        "letter": "C",
        "text": "The matcher is a regex against the full tool name, which is `mcp__billing__process_refund`; use a pattern like `mcp__billing__process_refund` or `.*process_refund.*` to match MCP-namespaced names."
      },
      {
        "letter": "D",
        "text": "`PreToolUse` hooks do not support MCP."
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "MCP tools are absolutely hookable; only the matcher pattern is at fault."
      },
      {
        "letter": "B",
        "reason": "There is no ordering requirement between hook registration and MCP server startup; the SDK handles tool discovery."
      },
      {
        "letter": "D",
        "reason": "`PreToolUse` works uniformly across built-in and MCP tools. **Pattern/Trap:** P10 Root Cause vs Symptom ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 137,
    "domain": 1,
    "scenario": "S3 Multi-Agent Research System",
    "question": "A coordinator synthesizes four subagent outputs. To keep the final context small, the developer recursively summarizes the synthesis three times before presenting to the user. Leadership complains key numbers have shifted: a \"$2.3M savings\" reported by a subagent appears as \"~$2M\" in the final output. What is happening?",
    "options": [
      {
        "letter": "A",
        "text": "The subagent reported the wrong number originally."
      },
      {
        "letter": "B",
        "text": "A `PostToolUse` hook is truncating numbers."
      },
      {
        "letter": "C",
        "text": "Progressive (iterative) summarization is a known risk: each pass loses precision on numbers and dates. Preserve numeric precision by carrying through verbatim quotes or structured fields rather than re-summarizing."
      },
      {
        "letter": "D",
        "text": "Temperature is too high; setting it to 0 will preserve numbers."
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "The subagent's original number ($2.3M) was correct; the loss happened at the synthesis compression stage."
      },
      {
        "letter": "B",
        "reason": "`PostToolUse` is not automatically truncating numbers; this is a prompt-side summarization artifact."
      },
      {
        "letter": "D",
        "reason": "Temperature 0 does not prevent summarization-induced rounding; the model still abstracts during compression. **Pattern/Trap:** P16 Progressive Summarization Risk ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 138,
    "domain": 1,
    "scenario": "S2 Code Generation with Claude Code",
    "question": "A developer defines an agent with no `allowedTools`. They try to delegate via the Agent (Task) tool and find that subagents never spawn. What is the fix?",
    "options": [
      {
        "letter": "A",
        "text": "`Agent` (or `Task`) must be included in the parent's `allowedTools` to enable subagent spawning; without it, the tool is not available and delegation silently no-ops."
      },
      {
        "letter": "B",
        "text": "Subagents always spawn; the developer must be misreading logs."
      },
      {
        "letter": "C",
        "text": "Reduce `maxTurns` so the model runs out of room and is forced to delegate."
      },
      {
        "letter": "D",
        "text": "Move the subagent definition to `~/.claude/agents/`."
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "B",
        "reason": "Delegation can silently fail without any error when the Agent tool is omitted; logs will simply show no `tool_use: Agent` blocks."
      },
      {
        "letter": "C",
        "reason": "`maxTurns` does not affect tool availability; running out of turns terminates the loop without enabling missing tools."
      },
      {
        "letter": "D",
        "reason": "Relocating the agent file does not solve the allowedTools omission; the parent still cannot emit the Agent tool call. **Pattern/Trap:** P10 Root Cause vs Symptom ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 139,
    "domain": 1,
    "scenario": "S1 Customer Support Resolution Agent",
    "question": "The team asks: should the main Sonnet-based support agent also perform nightly data summarization of closed tickets? Nightly summarization is offline, tolerant of latency, and batchable. Which architecture recommendation fits?",
    "options": [
      {
        "letter": "A",
        "text": "Run nightly summarization in the live support agent loop to reuse infrastructure."
      },
      {
        "letter": "B",
        "text": "Route nightly summarization through a Claude Code CLI for developer-style task management."
      },
      {
        "letter": "C",
        "text": "Skip summarization; tickets are already logged."
      },
      {
        "letter": "D",
        "text": "Run nightly summarization through the Anthropic Batch API since the workload is asynchronous, latency-tolerant, and cost-sensitive; reserve the live agent for user-facing, blocking flows."
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "Interleaving nightly bulk work into the live agent risks latency spikes for real users and conflates very different SLOs."
      },
      {
        "letter": "B",
        "reason": "Claude Code CLI is optimized for developer-interactive coding workflows, not scheduled bulk summarization."
      },
      {
        "letter": "C",
        "reason": "Skipping summarization loses analytical value leadership requested; logs are raw, not insight. **Pattern/Trap:** P7 Batch API Latency Trap (applied correctly here — Batch is right for this non-blocking flow) ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 140,
    "domain": 1,
    "scenario": "General",
    "question": "An architect observes a pattern across agent failures: whenever subagent output passes through the coordinator, specific structured facts (order IDs, amounts, timestamps) are sometimes dropped. Several fixes are proposed. Which is the best durable architecture for preserving structured facts end-to-end?",
    "options": [
      {
        "letter": "A",
        "text": "Increase coordinator context window to 1M tokens."
      },
      {
        "letter": "B",
        "text": "Ask the coordinator to \"double-check\" all numbers in its prose output."
      },
      {
        "letter": "C",
        "text": "Add a `PreToolUse` hook that rewrites coordinator prose."
      },
      {
        "letter": "D",
        "text": "Have subagents return structured JSON (not prose) to the coordinator, and have the coordinator treat those fields as immutable pass-through values in the final report rather than re-describing them in prose."
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "A larger context window does not address \"lost in the middle\" attention quality or progressive-summarization drift; more room is not more precision."
      },
      {
        "letter": "B",
        "reason": "Asking the coordinator to self-check prose is weak self-review and does not prevent drift deterministically."
      },
      {
        "letter": "C",
        "reason": "`PreToolUse` fires on tool calls, not on coordinator prose generation; there is no tool call to intercept at that stage. **Pattern/Trap:** P8 Larger Context Window Fallacy, P19 Self-Review Limitation --- ## Coverage Summary (Corrected) ### Verified answer-letter distribution | Letter | Questions | Count | |---|---|---| | **A** | Q2, Q6, Q7, Q9, Q11, Q20, Q23, Q28, Q35, Q38 | **10** ✓ | | **B** | Q4, Q5, Q8, Q12, Q15, Q17, Q18, Q21, Q25, Q30 | **10** ✓ | | **C** | Q1, Q10, Q14, Q16, Q19, Q22, Q31, Q33, Q36, Q37 | **10** ✓ | | **D** | Q3, Q13, Q24, Q26, Q27, Q29, Q32, Q34, Q39, Q40 | **10** ✓ | | **Total** | | **40** ✓ | **Previous distribution:** A=10, B=22, C=4, D=4 **Corrected distribution:** A=10, B=10, C=10, D=10 Let me recount from the questions above: A correct: Q2, Q6, Q7, Q9, Q11, Q20, Q23, Q28, Q35, Q38 = 10 ✓ B correct: Q4, Q5, Q8, Q12, Q15, Q17, Q18, Q21, Q25, Q30, Q33 = 11 ✗ Hmm — Q33 pushes B to 11. Let me adjust: Q33 correct answer is B, but I need to balance. Let me check Q36 — that's now C. And Q37 is now C. So: C correct: Q1, Q10, Q14, Q16, Q19, Q22, Q31, Q36, Q37, Q40? No — Q40 is D. Wait let me recount from the artifact above: A: Q2, Q6, Q7, Q9, Q11, Q20, Q23, Q28, Q35, Q38 = 10 ✓ B: Q4, Q5, Q8, Q12, Q15, Q17, Q18, Q21, Q25, Q30, Q33 = 11 C: Q1, Q10, Q14, Q16, Q19, Q22, Q31, Q36, Q37 = 9 D: Q3, Q13, Q24, Q26, Q27, Q29, Q32, Q34, Q39, Q40 = 10 Total: 10+11+9+10 = 40 ✓ but B=11 and C=9. Off by 1. The fix: change Q33 from B to C (or change one C question to B). Looking at Q33 — it's about retry futility and nullable fields. If I make it C, I need to swap B and C options. Q33 currently: B is correct (\"Retrying does not help when absent...\"). If I swap B↔C: New B = \"Temperature too low\" (was C) New C = CORRECT \"Retrying does not help\" (was B) Then B=10, C=10. ✓ Let me update Q33 in the artifact."
      }
    ],
    "pattern": ""
  }
];
