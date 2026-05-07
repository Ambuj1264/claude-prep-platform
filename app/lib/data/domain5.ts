import { Question } from '../types';

export const domain5Questions: Question[] = [
  {
    "id": 501,
    "domain": 5,
    "scenario": "S1 — Customer Support Resolution Agent",
    "question": "A support agent has been running for 47 turns with a customer disputing a charge. To stay under the context budget, the orchestration layer applies progressive summarization every 10 turns, replacing prior turns with a 200-token summary. On turn 48, the agent confidently tells the customer \"we'll process your refund as discussed,\" but the most recent summary reads only \"agent acknowledged dispute and discussed refund options with customer.\" The original turn-12 commitment was \"refund of $147.83 to card ending 4412 within 3 business days.\" What is the most appropriate fix?",
    "options": [
      {
        "letter": "A",
        "text": "Raise the summarization interval from every 10 turns to every 20 turns so more raw context is retained between compactions."
      },
      {
        "letter": "B",
        "text": "Maintain a persistent \"case facts\" block (refund amount, card last-4, promised timeline, ticket ID) that is extracted on first mention and re-injected verbatim into every prompt, separate from the rolling summary."
      },
      {
        "letter": "C",
        "text": "Switch to a model with a larger context window so summarization is unnecessary for sessions under 100 turns."
      },
      {
        "letter": "D",
        "text": "Instruct the summarizer in its system prompt to \"preserve all important details\" before each compaction step."
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "Less frequent summarization only delays the loss; once any summarization occurs, numerical specifics are still vulnerable. It also makes the eventual compaction more lossy because more must be condensed at once."
      },
      {
        "letter": "C",
        "reason": "Larger context windows exhibit the same recall degradation (\"context rot\") and do not address the structural problem that summaries discard transactional detail."
      },
      {
        "letter": "D",
        "reason": "A vague natural-language instruction like \"preserve important details\" is a prompt-only mitigation that fails unpredictably; the summarizer cannot reliably distinguish which numbers will matter on turn 48 when summarizing turn 12. **Pattern/Trap:** P16 Progressive Summarization Risk; P1 Prompt vs Programmatic Enforcement ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 502,
    "domain": 5,
    "scenario": "S3 — Multi-Agent Research System",
    "question": "A lead research agent receives reports from six subagents and concatenates them (in order of completion) into a 78,000-token aggregated input before producing the final synthesis. Evaluation shows the synthesis reliably reflects subagent #1 (early in the input) and subagent #6 (late in the input), but routinely omits findings from subagents #3 and #4 — the middle of the aggregate. Which change most directly addresses this failure mode?",
    "options": [
      {
        "letter": "A",
        "text": "Re-run the missing subagents to confirm their findings are reproducible before including them in the synthesis."
      },
      {
        "letter": "B",
        "text": "Reduce each subagent's report to a 500-token summary so the aggregate fits in 25,000 tokens total."
      },
      {
        "letter": "C",
        "text": "Have each subagent produce a structured \"key findings\" header (5–8 bullet claims with source IDs) and prepend all six headers to the top of the aggregated input, with full reports following."
      },
      {
        "letter": "D",
        "text": "Sort subagent reports alphabetically by topic so position is deterministic across runs."
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "Reproducibility is not the issue — the findings exist in the input but are positionally disadvantaged. Re-running wastes tokens and budget without changing the geometry that caused the omission."
      },
      {
        "letter": "B",
        "reason": "Aggressive compression risks dropping the same details the synthesis needs and does not eliminate the middle position; subagents #3 and #4 will still be middle in a smaller aggregate."
      },
      {
        "letter": "D",
        "reason": "Alphabetical ordering makes position deterministic but does not place high-signal content at boundary positions. Whichever topics fall in the middle still get under-attended. **Pattern/Trap:** P17 Lost in the Middle ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 503,
    "domain": 5,
    "scenario": "S1 — Customer Support Resolution Agent",
    "question": "A support agent uses an `order_lookup` tool that returns 43 fields per order (line items, tax breakdowns, fulfillment events, internal warehouse codes, marketing attribution). The agent typically only needs 5 fields (order ID, status, total, ship date, tracking number). After 8 lookups in a session, tool results consume 31% of the context window, and the agent begins missing earlier conversation details. What is the best first remediation?",
    "options": [
      {
        "letter": "A",
        "text": "Modify the tool wrapper to project only the 5 required fields by default, with a parameter to opt into the full schema when needed."
      },
      {
        "letter": "B",
        "text": "Increase the model's context window tier and accept the higher per-call cost as the price of reliability."
      },
      {
        "letter": "C",
        "text": "Add a system-prompt instruction telling the agent to \"ignore irrelevant fields in tool results.\""
      },
      {
        "letter": "D",
        "text": "After each tool call, run a separate Claude call to summarize the tool output into 200 tokens before appending it to context."
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "B",
        "reason": "A larger window delays the symptom but compounds cost, and recall still degrades over long sessions (\"context rot\"). It treats the symptom rather than the root cause of irrelevant tokens."
      },
      {
        "letter": "C",
        "reason": "The model still pays attention cost on tokens it sees, regardless of instructions to ignore them. Prompt-only mitigations cannot reduce token consumption."
      },
      {
        "letter": "D",
        "reason": "A per-call summarization step adds latency and another LLM dependency that can itself drop critical fields like the tracking number; the verbose data was unnecessary in the first place. **Pattern/Trap:** P10 Root Cause vs Symptom; P3 Over-Engineering Distractor ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 504,
    "domain": 5,
    "scenario": "General",
    "question": "A team building a chat agent on the Messages API observes that on the second user turn, the assistant frequently \"forgets\" facts established in turn 1. Inspection shows the client sends only the most recent user message in each `messages` array, relying on the model's \"memory.\" Which statement correctly characterizes the problem and fix?",
    "options": [
      {
        "letter": "A",
        "text": "The Messages API maintains a hidden session cache keyed by API key; the team should pass a `session_id` header so prior turns are auto-loaded."
      },
      {
        "letter": "B",
        "text": "The team should use the prompt-caching feature, which causes the API to retain prior turns server-side between calls."
      },
      {
        "letter": "C",
        "text": "The model's context window is shared across recent calls from the same key, so adding a longer `system` prompt restating the facts will resolve the issue."
      },
      {
        "letter": "D",
        "text": "The Messages API is stateless; every request must include the full prior conversation (all user and assistant turns) in the `messages` array, or earlier facts are not available to the model."
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "There is no `session_id` mechanism on the Messages API and no hidden server-side conversation cache keyed by API key. This option fabricates a feature."
      },
      {
        "letter": "B",
        "reason": "Prompt caching reduces cost and latency by caching token prefixes, but the client must still send those tokens in each request. Caching does not make the API stateful."
      },
      {
        "letter": "C",
        "reason": "Restating facts in the system prompt could partly help but is brittle and does not address that assistant turns (decisions, commitments, tool results) are also lost. The structural fix is sending full conversation history. **Pattern/Trap:** P6 Context Inheritance Misconception ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 505,
    "domain": 5,
    "scenario": "S1 — Customer Support Resolution Agent",
    "question": "A customer writes: \"This is the third time I've contacted you. I want to speak to a human agent now.\" The agent has full capability to issue the duplicate-shipment refund the customer is requesting and the policy clearly applies. What should the agent do?",
    "options": [
      {
        "letter": "A",
        "text": "Acknowledge the frustration, issue the refund immediately since policy permits it, and only escalate if the customer remains dissatisfied after the resolution."
      },
      {
        "letter": "B",
        "text": "Hand off to a human agent immediately, summarizing the case and the customer's explicit request, even though the agent could resolve it."
      },
      {
        "letter": "C",
        "text": "Ask one more clarifying question to confirm the refund details before deciding whether to escalate or resolve."
      },
      {
        "letter": "D",
        "text": "Issue the refund and send confirmation, noting in the ticket that the human-agent request was overridden because the issue was resolvable."
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "Resolving despite an explicit human-agent request ignores a hard trigger. The \"offer to resolve\" pattern applies when the customer is frustrated but has not explicitly requested escalation."
      },
      {
        "letter": "C",
        "reason": "Asking another question delays handoff and ignores the explicit request, likely intensifying frustration. The trigger is unambiguous and a clarification is not warranted."
      },
      {
        "letter": "D",
        "reason": "\"Overriding\" an explicit human-agent request is the worst pattern: it disregards the customer's stated preference and creates a paper trail of policy violation, even when the outcome is correct. **Pattern/Trap:** P20 Explicit Escalation Criteria ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 506,
    "domain": 5,
    "scenario": "S1 — Customer Support Resolution Agent",
    "question": "A team adds an automated escalation rule: if a sentiment classifier scores the customer's message below −0.6, the agent immediately routes to a human. Post-launch, escalation volume jumps 40%, but human agents report that 60% of escalated cases involved straightforward, in-policy issues the bot could have resolved. Meanwhile, several calmly worded but truly out-of-policy cases were not escalated. What is the underlying problem?",
    "options": [
      {
        "letter": "A",
        "text": "Sentiment is a noisy proxy that correlates with frustration but not with whether the issue is resolvable; escalation should be driven by explicit criteria (human request, policy gap, inability to make progress) rather than emotional tone."
      },
      {
        "letter": "B",
        "text": "The sentiment threshold is too aggressive at −0.6; lowering to −0.8 will fix the false positives."
      },
      {
        "letter": "C",
        "text": "The sentiment classifier needs to be fine-tuned on customer-support transcripts to improve precision."
      },
      {
        "letter": "D",
        "text": "Sentiment-based escalation works in principle but should be combined with a self-reported confidence score from the agent."
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "B",
        "reason": "Tuning the threshold trades one error type for another but does not fix the categorical mismatch between sentiment and resolvability."
      },
      {
        "letter": "C",
        "reason": "A more accurate sentiment classifier still answers the wrong question. Improving classification of an irrelevant signal does not produce a correct escalation decision."
      },
      {
        "letter": "D",
        "reason": "Self-reported model confidence is itself unreliable as an escalation gate — models are often confidently wrong and uncertainly right. Layering two unreliable proxies does not produce a reliable trigger. **Pattern/Trap:** P4 Sentiment/Confidence Trap; P20 Explicit Escalation Criteria ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 507,
    "domain": 5,
    "scenario": "S1 — Customer Support Resolution Agent",
    "question": "A customer asks the support agent to match a competitor's lower price on a TV. The agent's policy document covers price-matching against the company's own past prices and against authorized resellers, but is silent on third-party competitors. The agent confidently quotes a 12% discount based on what \"seems consistent with the spirit of the policy.\" How should the agent's behavior be corrected?",
    "options": [
      {
        "letter": "A",
        "text": "Add the competitor price-match scenario to the policy document so the agent has explicit guidance."
      },
      {
        "letter": "B",
        "text": "Lower the agent's response temperature to 0 to reduce creative interpretation of policy."
      },
      {
        "letter": "C",
        "text": "Update the system prompt with explicit escalation criteria, including \"if a customer asks about a scenario the policy does not address, escalate to a human agent\" plus 2–3 few-shot examples covering policy-gap cases."
      },
      {
        "letter": "D",
        "text": "Instruct the agent to apply policies \"conservatively\" when there is uncertainty."
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "Expanding the policy is a separate business decision that may take weeks; meanwhile the agent will keep improvising on other gaps. The escalation pattern is the architectural fix and applies to all future gaps."
      },
      {
        "letter": "B",
        "reason": "Temperature 0 makes the wrong behavior deterministic, not correct. The model still lacks instruction that gaps require escalation rather than interpretation."
      },
      {
        "letter": "D",
        "reason": "\"Conservatively\" is vague and the model's notion of conservative may still produce a fabricated discount. Without explicit criteria and examples, the abstract instruction fails predictably. **Pattern/Trap:** P20 Explicit Escalation Criteria; P1 Prompt vs Programmatic Enforcement ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 508,
    "domain": 5,
    "scenario": "S1 — Customer Support Resolution Agent",
    "question": "A customer provides only the name \"Maria Garcia.\" The customer-lookup tool returns three matching accounts with different emails and order histories. The agent picks the account with the most recent order and proceeds to discuss it. Which response represents the correct pattern?",
    "options": [
      {
        "letter": "A",
        "text": "Use a heuristic — most recent order, highest lifetime value, or closest geographic match — to pick the most likely account, since asking for clarification creates friction."
      },
      {
        "letter": "B",
        "text": "Pick any of the three accounts and proceed; if the customer corrects, the agent can switch accounts mid-conversation."
      },
      {
        "letter": "C",
        "text": "Escalate immediately to a human agent because account ambiguity is inherently outside agent capability."
      },
      {
        "letter": "D",
        "text": "Ask the customer for an additional identifier (email, order number, last 4 of payment method, ZIP code) to disambiguate before discussing any account-specific information."
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "Heuristic selection optimizes for friction at the expense of correctness and privacy. \"Most recent order\" can easily be the wrong Maria Garcia, and the agent will reveal her details to the wrong person."
      },
      {
        "letter": "B",
        "reason": "Speaking about one account before disambiguation leaks information about that account to a person who may not be its owner. Mid-conversation correction does not undo the disclosure."
      },
      {
        "letter": "C",
        "reason": "Disambiguation by asking for one more identifier is well within agent capability and does not require human escalation. Escalating here over-uses scarce human capacity. **Pattern/Trap:** P20 Explicit Escalation Criteria; P11 Scoped Access / Least Privilege ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 509,
    "domain": 5,
    "scenario": "S3 — Multi-Agent Research System",
    "question": "A research subagent's web-search tool intermittently fails. The subagent currently catches all exceptions and returns the string `\"search unavailable\"` to the lead agent. Downstream, the lead agent cannot distinguish a transient network blip (worth retrying) from an authentication failure (needs config fix) from a query that simply returned zero results. Reports come back with unexplained gaps. What is the right error contract?",
    "options": [
      {
        "letter": "A",
        "text": "Have the subagent suppress the error entirely and return an empty result list, so the lead agent treats failures as \"no findings.\""
      },
      {
        "letter": "B",
        "text": "Return a structured error object including `failure_type` (timeout / auth / rate_limit / empty_result), `attempted_query`, `partial_results` if any, and `suggested_alternatives`, so the lead agent can decide whether to retry, reroute, or annotate."
      },
      {
        "letter": "C",
        "text": "Have each subagent independently retry up to 50 times with exponential backoff before reporting any failure."
      },
      {
        "letter": "D",
        "text": "Replace the search tool with a more reliable provider so error-handling logic becomes unnecessary."
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "Conflating failures with empty results is a silent-suppression anti-pattern: the report will look complete but is missing data the user assumes was searched."
      },
      {
        "letter": "C",
        "reason": "Aggressive retry without classification wastes budget on permanent failures (auth, malformed query) and delays the lead agent's ability to adapt."
      },
      {
        "letter": "D",
        "reason": "No provider is perfectly reliable, so error handling cannot be eliminated. This treats the tool as the root cause when the architectural defect is the error contract itself. **Pattern/Trap:** P10 Root Cause vs Symptom ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 510,
    "domain": 5,
    "scenario": "S3 — Multi-Agent Research System",
    "question": "A subagent calls a document-retrieval API that has a 2% transient timeout rate. Currently, every timeout is propagated up to the lead agent, which then must decide whether to retry, reroute, or fail. Retries from the lead level cost one full round-trip of LLM reasoning each. How should error handling be redesigned?",
    "options": [
      {
        "letter": "A",
        "text": "The subagent should locally retry transient failures (timeouts, 5xx) with exponential backoff up to a small bounded limit, propagating to the lead agent only unrecoverable errors with a description of what was attempted and what failed."
      },
      {
        "letter": "B",
        "text": "The lead agent should retry every error it receives once, regardless of failure type, since most errors at this scale are transient."
      },
      {
        "letter": "C",
        "text": "The subagent should treat every timeout as a permanent failure and immediately propagate, since retries hide real problems."
      },
      {
        "letter": "D",
        "text": "Add a third-tier \"retry agent\" between subagent and lead whose sole responsibility is retry orchestration."
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "B",
        "reason": "Blind lead-level retry of every error wastes LLM budget on permanent failures and conflates retryable with non-retryable."
      },
      {
        "letter": "C",
        "reason": "Propagating every timeout floods the lead with noise and makes the system brittle to normal network jitter. A 2% transient rate is exactly the case bounded local retry was designed for."
      },
      {
        "letter": "D",
        "reason": "A separate retry agent adds an LLM-mediated hop for what is a deterministic concern. Retry belongs in the data path as code, not as a third agent. **Pattern/Trap:** P3 Over-Engineering Distractor; P13 Retry Futility ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 511,
    "domain": 5,
    "scenario": "S3 — Multi-Agent Research System",
    "question": "A research orchestrator queries an internal knowledge base via a `kb_search` subagent. For one query, the subagent returns `{\"results\": []}`. The orchestrator treats this identically to \"search failed\" and re-issues the query through a different subagent, then a third, accumulating cost without progress. Which design correction addresses the root issue?",
    "options": [
      {
        "letter": "A",
        "text": "Configure the orchestrator to never retry searches, since the first answer is usually correct."
      },
      {
        "letter": "B",
        "text": "Have `kb_search` retry internally until at least one result is returned, then propagate."
      },
      {
        "letter": "C",
        "text": "Introduce a confidence score on every search result and only re-query when confidence is below 0.7."
      },
      {
        "letter": "D",
        "text": "Have `kb_search` distinguish in its return value between an access failure (timeout, auth, malformed) and a successful query that returned zero matches, so the orchestrator can treat them differently."
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "Never retrying makes the system fragile to genuine transient failures. The defect is conflation, not retry itself."
      },
      {
        "letter": "B",
        "reason": "Forcing the subagent to keep searching until it finds something will hallucinate or loosen queries until a result appears, corrupting the research."
      },
      {
        "letter": "C",
        "reason": "A confidence score on results does not distinguish \"no documents matched\" from \"search service unreachable.\" It addresses a different problem. **Pattern/Trap:** P10 Root Cause vs Symptom ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 512,
    "domain": 5,
    "scenario": "S3 — Multi-Agent Research System",
    "question": "A team's subagents wrap all tool calls in `try/except Exception: pass` blocks because \"we don't want one bad search to crash the whole research run.\" After three weeks in production, the team notices reports occasionally cite sources that do not exist, and one report claimed comprehensive coverage of a topic when in fact 4 of 7 subagents had silently failed. What pattern is this and how should it be fixed?",
    "options": [
      {
        "letter": "A",
        "text": "The subagents need higher timeout values so fewer exceptions occur."
      },
      {
        "letter": "B",
        "text": "The lead agent should run a self-review pass after synthesis to catch any inconsistencies."
      },
      {
        "letter": "C",
        "text": "Silent error suppression is an anti-pattern; subagents should propagate structured error context (failure type, attempted operation, partial results) and the lead agent should annotate the final report with coverage information distinguishing well-supported findings from gap areas."
      },
      {
        "letter": "D",
        "text": "Switch to a single-agent architecture so there are no subagent failures to suppress."
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "Longer timeouts reduce one failure mode but do not address the structural defect of suppressing whatever errors do occur."
      },
      {
        "letter": "B",
        "reason": "Self-review by the same model that produced the synthesis is unreliable and cannot detect missing data — the model has no way to know what 4 failed subagents would have found."
      },
      {
        "letter": "D",
        "reason": "Removing parallelism trades throughput and quality for an avoidable problem. Subagent architectures are correct; suppressing their errors is the defect. **Pattern/Trap:** P19 Self-Review Limitation ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 513,
    "domain": 5,
    "scenario": "S2 — Code Generation with Claude Code",
    "question": "A developer is using Claude Code to refactor a 180-file Java service. Around the 90-minute mark, Claude begins giving inconsistent answers about which classes implement a given interface, sometimes referencing \"typical Spring patterns\" rather than the specific classes it had identified earlier. The developer's first instinct is to upgrade to a model with a 1M-token context window. What is the better remediation?",
    "options": [
      {
        "letter": "A",
        "text": "Restart the session from scratch and re-explore the codebase, since context-window upgrades only delay the problem."
      },
      {
        "letter": "B",
        "text": "Maintain a scratchpad file (e.g., `claude-progress.md`) that records key findings — interface implementers, file paths, conventions discovered — and have Claude reference it for subsequent questions, optionally using `/compact` with custom instructions to preserve those findings."
      },
      {
        "letter": "C",
        "text": "Increase the temperature so the model relies less on memorized patterns and more on the codebase."
      },
      {
        "letter": "D",
        "text": "Have the developer manually re-paste the full file list at the start of every prompt."
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "A blank restart loses all prior exploration work. A scratchpad allows resuming with the high-signal findings already captured, which is far more efficient."
      },
      {
        "letter": "C",
        "reason": "Temperature does not control reliance on memorized patterns versus context. The model defaulted to \"typical patterns\" because specific findings degraded, not because of sampling stochasticity."
      },
      {
        "letter": "D",
        "reason": "Manual re-pasting reintroduces the same volume of low-signal tokens that caused degradation. The fix is condensing key findings, not re-injecting raw content. **Pattern/Trap:** P8 Larger Context Window Fallacy ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 514,
    "domain": 5,
    "scenario": "S2 — Code Generation with Claude Code",
    "question": "During a 4-hour Claude Code session migrating a database schema, the IDE crashes and the session is lost. The developer had been tracking progress informally in chat. To make future crashes recoverable, which design is best?",
    "options": [
      {
        "letter": "A",
        "text": "Periodically have Claude write a structured state manifest (completed steps, pending steps, modified files, commands run, key decisions, unresolved questions) to a project file; on resume, start a fresh session and have Claude load the manifest as its first action."
      },
      {
        "letter": "B",
        "text": "Disable auto-save in the IDE so partial state is never persisted in a corrupted form."
      },
      {
        "letter": "C",
        "text": "Keep one extremely long session open indefinitely and never close the IDE, treating session continuity as the recovery strategy."
      },
      {
        "letter": "D",
        "text": "On crash, attempt to restore the previous session's exact context window from disk cache and resume mid-thought."
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "B",
        "reason": "Disabling auto-save addresses one symptom and prevents the manifest pattern itself, since the manifest needs to be persisted regularly."
      },
      {
        "letter": "C",
        "reason": "Indefinite sessions accumulate context degradation and are still vulnerable to crashes. Session continuity is not a recovery strategy; it is the absence of one."
      },
      {
        "letter": "D",
        "reason": "Restoring exact context window state is fragile and ties recovery to internal model state that may not be portable across versions. Manifests are the durable abstraction. **Pattern/Trap:** P18 Fresh Session vs Resume ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 515,
    "domain": 5,
    "scenario": "S2 — Code Generation with Claude Code",
    "question": "A Claude Code agent is asked to \"find all callers of `processPayment` and assess whether each handles the new `RetryableException`.\" Naive execution would have the main agent grep, open dozens of files, read each, and accumulate ~60K tokens of source code in its context before any analysis. Which approach best preserves the main agent's context for the higher-level decision?",
    "options": [
      {
        "letter": "A",
        "text": "Run the entire exploration in the main agent but ask it to be terse in its narration."
      },
      {
        "letter": "B",
        "text": "Use prompt caching on the file reads so the tokens cost less and become acceptable."
      },
      {
        "letter": "C",
        "text": "Spawn a subagent for the exploration phase whose sole task is to grep, read, and return a structured list of `{file, line, handles_retryable: bool, evidence}`; the main agent receives only that summary, not the raw file contents."
      },
      {
        "letter": "D",
        "text": "Read all files into the main context first, then ask the agent to summarize them in place to free up tokens."
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "Terseness in narration does not reduce the tokens consumed by file reads themselves — those still enter context. The structural problem is unaddressed."
      },
      {
        "letter": "B",
        "reason": "Prompt caching reduces cost and latency on repeat reads but does not reduce the in-context token footprint. The main agent still pays the attention cost on cached tokens."
      },
      {
        "letter": "D",
        "reason": "In-context summarization happens after the tokens have already been read, and the summarization step itself can drop critical evidence. Avoiding the bloat at all (via subagent isolation) is strictly better. **Pattern/Trap:** P3 Over-Engineering Distractor ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 516,
    "domain": 5,
    "scenario": "S4 — Developer Productivity with Claude",
    "question": "A developer's Claude Code session is approaching the auto-compaction threshold. They are mid-way through implementing API changes and want to ensure the compaction preserves the specific endpoints modified, the new request schemas, and the open TODO items, while it is acceptable to discard exploratory tangents and earlier discussion of unrelated files. What is the best action?",
    "options": [
      {
        "letter": "A",
        "text": "Run `/clear` to fully reset the context and re-explain the task from memory."
      },
      {
        "letter": "B",
        "text": "Wait for auto-compaction to trigger with default behavior, since auto-compaction is generally well-tuned."
      },
      {
        "letter": "C",
        "text": "Run `/compact Focus on the API endpoints modified, new request schemas, and remaining TODO items` before auto-compaction triggers."
      },
      {
        "letter": "D",
        "text": "Switch to a fresh session and copy the relevant parts manually from the prior session into the new one."
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "`/clear` discards everything, including the API changes still in flight. It is appropriate between unrelated tasks, not mid-implementation."
      },
      {
        "letter": "B",
        "reason": "Default auto-compaction may discard endpoint-specific details since it has no signal that those particular facts matter more than others. Custom instructions are the available control."
      },
      {
        "letter": "D",
        "reason": "Manual copy-paste is brittle and time-consuming, and it often misses dependencies (helper functions, decisions). The platform offers `/compact` precisely so this manual work is not necessary. **Pattern/Trap:** P16 Progressive Summarization Risk ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 517,
    "domain": 5,
    "scenario": "S6 — Structured Data Extraction",
    "question": "An invoice-extraction system reports 97% overall accuracy on a held-out validation set of 10,000 invoices. The product team is satisfied. A customer using the system for international suppliers later reports widespread errors on VAT-line extraction. Investigation reveals: the validation set was 92% domestic invoices (where accuracy is 98.5%), 8% international (where accuracy on the VAT field is 71%). What measurement change is needed?",
    "options": [
      {
        "letter": "A",
        "text": "Increase the validation set size from 10,000 to 50,000 to make the aggregate metric more reliable."
      },
      {
        "letter": "B",
        "text": "Stratify accuracy measurement by document type (domestic vs international, plus other meaningful segments) and by field, with stratum sample sizes large enough to detect failure modes; route the field-level metrics — not the aggregate — to the production dashboard."
      },
      {
        "letter": "C",
        "text": "Replace the aggregate accuracy metric with a single F1 score, which handles imbalanced classes better."
      },
      {
        "letter": "D",
        "text": "Continue using aggregate accuracy but add a customer-feedback channel to surface field-level issues retroactively."
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "Larger samples make the aggregate more precise, not more informative. A 50,000-invoice aggregate of 97% will still hide the 71% international VAT subgroup."
      },
      {
        "letter": "C",
        "reason": "F1 addresses class imbalance in a single classification task; it does not address segment-level differences across document types and field types."
      },
      {
        "letter": "D",
        "reason": "Customer feedback is a slow, lagging signal that surfaces failures only after revenue impact. Stratified offline measurement should detect them before deployment. **Pattern/Trap:** P12 Aggregate Metric Masking ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 518,
    "domain": 5,
    "scenario": "S5 — Claude Code for CI/CD",
    "question": "A team monitors extraction error rates in production by reviewing a sample of outputs every week. They currently sample 200 random outputs uniformly. The volume is dominated by one document type (85%), and rare document types are almost never sampled — but rare types are where novel errors typically appear first. What sampling change best supports both error-rate measurement and novel-pattern detection?",
    "options": [
      {
        "letter": "A",
        "text": "Use stratified random sampling across document types, with each stratum sampled in proportion that ensures statistical power for that stratum (often oversampling rare types relative to their natural frequency, then reweighting for the global error-rate estimate)."
      },
      {
        "letter": "B",
        "text": "Increase the uniform sample to 2,000 per week so rare types are sampled by chance."
      },
      {
        "letter": "C",
        "text": "Switch to sampling only the rarest document types, since common types are well understood."
      },
      {
        "letter": "D",
        "text": "Have Claude self-flag outputs it is uncertain about and review only those."
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "B",
        "reason": "Even at 2,000 samples, a document type at 0.5% frequency would only contribute ~10 samples — too few for reliable per-stratum estimates and still likely to miss novel patterns."
      },
      {
        "letter": "C",
        "reason": "Sampling only rare types loses error-rate visibility on the common types that drive most volume and revenue. Both ends matter; stratification covers both."
      },
      {
        "letter": "D",
        "reason": "Self-flagged uncertainty is an unreliable proxy — models are often confidently wrong on novel patterns precisely because the model has no internal signal that the pattern is novel. **Pattern/Trap:** P12 Aggregate Metric Masking; P4 Sentiment/Confidence Trap ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 519,
    "domain": 5,
    "scenario": "S6 — Structured Data Extraction",
    "question": "An extraction pipeline outputs values for 12 fields per document. Stakeholders need a human review workflow that catches likely errors without reviewing every document. The team has labeled validation data per field and observes that field-level confidence scores from the model, after calibration on the validation set, correlate well with field-level error rates. What is the right human-review design?",
    "options": [
      {
        "letter": "A",
        "text": "Send every document to human review, since extraction is too important to trust."
      },
      {
        "letter": "B",
        "text": "Send a fixed 10% of documents to human review, randomly sampled."
      },
      {
        "letter": "C",
        "text": "Send documents whose overall (document-level) confidence score falls below 0.85 to review."
      },
      {
        "letter": "D",
        "text": "Compute calibrated confidence per field; route any extraction to review if any field falls below its field-specific threshold or if multiple sources within the document contradict each other; document-level confidence is not used as the routing signal."
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "100% review eliminates the value of automation. The point is to spend human attention where it provides the most marginal value."
      },
      {
        "letter": "B",
        "reason": "Random sampling treats every document equally regardless of likely error, missing the bulk of high-risk extractions while wasting reviewer time on obvious low-risk ones."
      },
      {
        "letter": "C",
        "reason": "Document-level confidence at 0.85 hides field-specific risk. A document where 11 fields are highly confident and 1 critical field is uncertain may still score above 0.85 overall, escaping review. **Pattern/Trap:** P12 Aggregate Metric Masking ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 520,
    "domain": 5,
    "scenario": "S3 — Multi-Agent Research System",
    "question": "A multi-agent research system synthesizes findings from five subagents into a final report. Each subagent currently returns a free-text prose summary. The final report frequently states claims without traceable sources, and post-hoc citation attempts often hallucinate URLs. What change to subagent output most directly preserves provenance through synthesis?",
    "options": [
      {
        "letter": "A",
        "text": "Add a final \"citation agent\" that reads the report and re-derives citations from web search."
      },
      {
        "letter": "B",
        "text": "Have each subagent return a free-text summary plus a list of URLs it consulted, appended at the end."
      },
      {
        "letter": "C",
        "text": "Have each subagent return structured `claim → source` mappings (claim text, source URL, document name, supporting excerpt) that are preserved through the synthesis prompt and rendered into citations in the final report."
      },
      {
        "letter": "D",
        "text": "Have the lead agent ask the user to verify each claim manually after the report is produced."
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "Post-hoc citation re-derivation is exactly what produces hallucinated URLs — the citation agent has no ground truth for which source actually supported a claim and must guess."
      },
      {
        "letter": "B",
        "reason": "A bare URL list at the end of a prose summary loses the binding between specific claims and specific sources. The synthesizer cannot tell which URL backs which sentence."
      },
      {
        "letter": "D",
        "reason": "Pushing verification to the user destroys the value of the system and does not address the architectural defect; provenance should be machine-tracked. **Pattern/Trap:** P10 Root Cause vs Symptom ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 521,
    "domain": 5,
    "scenario": "S3 — Multi-Agent Research System",
    "question": "Two subagents return conflicting statistics on the same question: the World Bank reports 7.2% for 2023, the IMF reports 6.8% for 2023. The synthesis prompt is currently told to \"produce a coherent answer.\" The final report quotes \"approximately 7%\" without attribution to either source. A reviewer flags this as misleading. What is the right pattern?",
    "options": [
      {
        "letter": "A",
        "text": "Have the synthesis prompt pick the source with higher historical accuracy and quote only that figure."
      },
      {
        "letter": "B",
        "text": "Annotate the conflict explicitly in the final report (\"World Bank reports 7.2%; IMF reports 6.8%; sources differ on methodology\") and surface the divergence to the reader rather than collapsing it into a midpoint."
      },
      {
        "letter": "C",
        "text": "Average the two figures and present the mean as the consensus value."
      },
      {
        "letter": "D",
        "text": "Drop both figures from the report and replace with a qualitative phrase like \"around 7%.\""
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "\"Higher historical accuracy\" is rarely available, often domain-dependent, and silently picks one number over another without showing the user the disagreement exists."
      },
      {
        "letter": "C",
        "reason": "Averaging two methodologically different estimates produces a number neither source endorses and obscures the disagreement. It manufactures false precision."
      },
      {
        "letter": "D",
        "reason": "Replacing a precise but contested figure with a vague qualitative phrase reduces information content without resolving the conflict, and still hides the divergence from the reader. **Pattern/Trap:** P9 Consensus Review Fallacy ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 522,
    "domain": 5,
    "scenario": "S3 — Multi-Agent Research System",
    "question": "A research synthesis report flags a \"contradiction\" between two sources: Source X says \"smartphone penetration is 78%\" and Source Y says \"smartphone penetration is 91%.\" Investigation shows Source X is from 2019 and Source Y is from 2024 — both correct for their time. The system has no awareness of this. What design change prevents this misinterpretation?",
    "options": [
      {
        "letter": "A",
        "text": "Require each subagent's structured output to include `publication_date` and `data_collection_date` per claim, and instruct the synthesis prompt to treat differing temporal coverage as different facts rather than as contradictions."
      },
      {
        "letter": "B",
        "text": "Drop the older source whenever two sources disagree numerically, since the newer is presumed correct."
      },
      {
        "letter": "C",
        "text": "Add a disclaimer at the top of every report stating that all figures may be outdated."
      },
      {
        "letter": "D",
        "text": "Have the synthesis model use its training-data knowledge of typical timeframes to guess which source is more recent."
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "B",
        "reason": "Dropping the older source loses historical trend information and makes assumptions (\"newer is correct\") that are not always true."
      },
      {
        "letter": "C",
        "reason": "A blanket disclaimer does not help the user reason about specific figures and does not prevent the system from labeling time-shifted measurements as contradictions."
      },
      {
        "letter": "D",
        "reason": "Guessing dates from training-data priors is unreliable and can be confidently wrong. Dates are observable metadata that should be captured at extraction, not inferred at synthesis. **Pattern/Trap:** P10 Root Cause vs Symptom ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 523,
    "domain": 5,
    "scenario": "S6 — Structured Data Extraction",
    "question": "A reporting system aggregates three content types into a single output: financial figures (12 metrics across 4 quarters), news developments (7 narrative items), and technical specifications (a list of 15 named parameters). The current implementation renders all three as flowing prose, and users complain that financial comparisons are hard to follow and technical specs are easy to misread. What is the best fix?",
    "options": [
      {
        "letter": "A",
        "text": "Render everything as a single flat bulleted list with one bullet per item."
      },
      {
        "letter": "B",
        "text": "Apply heavier prose with more transition sentences so the financial and technical sections feel less abrupt."
      },
      {
        "letter": "C",
        "text": "Use a single Markdown table for the entire report with three columns (financial / news / technical)."
      },
      {
        "letter": "D",
        "text": "Render each content type in the structure that fits it: financial figures as a table (quarters as columns, metrics as rows), news developments as prose paragraphs, and technical specifications as a structured list with parameter names bolded."
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "Flat bullets destroy the row/column structure of financial data and the narrative flow of news. Uniform rendering is what the question is critiquing, not solving."
      },
      {
        "letter": "B",
        "reason": "Heavier prose worsens the financial-comparison problem (numbers get harder to scan when buried in sentences) and adds noise to technical specs."
      },
      {
        "letter": "C",
        "reason": "A three-column shared table forces incompatible content types into the same grid; news paragraphs do not align row-wise with financial metrics or technical parameters. **Pattern/Trap:** P3 Over-Engineering Distractor --- ## Coverage Summary (Corrected) ### Corrections applied from original | Change | Detail | |---|---| | Q16 options C↔D swapped | Correct answer changed from D to C. \"Run /compact...\" moved from option D to option C. \"Switch to fresh session and copy manually\" moved from C to D. All reasoning labels updated accordingly. | | No formation errors | Domain 5 had no in-question rewrites or malformed questions | ### Note on original coverage summary The original artifact's coverage summary stated A=6, B=5, C=5, D=7. The actual count from question text was A=6, B=6, C=5, D=6. After the Q16 rotation: A=6, B=6, C=6, D=5. ### Verified answer-letter distribution | Letter | Questions | Count | |---|---|---| | **A** | Q3, Q6, Q10, Q14, Q18, Q22 | **6** ✓ | | **B** | Q1, Q5, Q9, Q13, Q17, Q21 | **6** ✓ | | **C** | Q2, Q7, Q12, Q15, Q16, Q20 | **6** ✓ | | **D** | Q4, Q8, Q11, Q19, Q23 | **5** ✓ | | **Total** | | **23** ✓ | **Previous distribution (actual):** A=6, B=6, C=5, D=6 **Corrected distribution:** A=6, B=6, C=6, D=5 ### Task statement coverage | Task | Questions | Count | |---|---|---| | 5.1 Conversation context preservation | Q1, Q2, Q3, Q4 | 4 | | 5.2 Escalation & ambiguity resolution | Q5, Q6, Q7, Q8 | 4 | | 5.3 Error propagation in multi-agent systems | Q9, Q10, Q11, Q12 | 4 | | 5.4 Large codebase exploration context | Q13, Q14, Q15, Q16 | 4 | | 5.5 Human review workflows & confidence calibration | Q17, Q18, Q19 | 3 | | 5.6 Provenance & multi-source synthesis | Q20, Q21, Q22, Q23 | 4 | ### Pattern distribution | Pattern | Questions | |---|---| | P1 Prompt vs Programmatic Enforcement | Q1, Q7 | | P3 Over-Engineering Distractor | Q3, Q10, Q15, Q23 | | P4 Sentiment/Confidence Trap | Q6, Q18 | | P6 Context Inheritance Misconception | Q4 | | P8 Larger Context Window Fallacy | Q13 | | P9 Consensus Review Fallacy | Q21 | | P10 Root Cause vs Symptom | Q3, Q9, Q11, Q20, Q22 | | P11 Scoped Access / Least Privilege | Q8 | | P12 Aggregate Metric Masking | Q17, Q18, Q19 | | P13 Retry Futility | Q10 | | P16 Progressive Summarization Risk | Q1, Q16 | | P17 Lost in the Middle | Q2 | | P18 Fresh Session vs Resume | Q14 | | P19 Self-Review Limitation | Q12 | | P20 Explicit Escalation Criteria | Q5, Q6, Q7, Q8 |"
      }
    ],
    "pattern": ""
  }
];
