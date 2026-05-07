import { Question } from '../types';

export const domain4Questions: Question[] = [
  {
    "id": 401,
    "domain": 4,
    "scenario": "S5 (Claude Code for CI/CD)",
    "question": "A code-review bot built on Claude Sonnet 4.5 produces ~38% false-positive findings on pull requests. Developers have begun marking the bot's comments as \"noise\" and ignoring entire review threads. The team's first instinct is to add the line \"Be conservative and only flag high-confidence issues\" to the system prompt. After deploying that change, the false-positive rate is unchanged but recall on real bugs dropped ~22%. What is the most effective next step?",
    "options": [
      {
        "letter": "A",
        "text": "Replace the conservative-tone instruction with an explicit severity rubric defining each level with one-sentence criteria plus 1–2 concrete code examples per level, and an explicit \"Do NOT report\" exclusion list."
      },
      {
        "letter": "B",
        "text": "Add `temperature=0` and increase `max_tokens` so the model has more room to deliberate before committing to a finding."
      },
      {
        "letter": "C",
        "text": "Route the bot's output through a second Claude instance asked \"Is this finding important?\" and drop anything it marks unimportant."
      },
      {
        "letter": "D",
        "text": "Switch to Claude Opus 4.5 because larger models are inherently more conservative about flagging issues."
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "B",
        "reason": "Temperature and token budget do not address criterion ambiguity; the model already finds the issues, the problem is which findings get reported."
      },
      {
        "letter": "C",
        "reason": "A second self-review instance with the same vague criterion inherits the same ambiguity and adds latency and cost without fixing the root cause."
      },
      {
        "letter": "D",
        "reason": "Larger models are not inherently \"more conservative\"; they follow vague instructions even more faithfully, often worsening the recall regression. **Pattern/Trap:** P10 Root Cause vs Symptom; P20 Explicit Escalation Criteria ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 402,
    "domain": 4,
    "scenario": "S6 (Structured Data Extraction)",
    "question": "A medical-records extraction pipeline uses a JSON schema with a required `dosage_mg` field of type `number`. The source documents include free-text notes like \"about a teaspoon\" or \"patient unsure\". The model is fabricating numeric values when the dose is non-numeric or missing, producing plausibly wrong outputs that pass schema validation. What is the correct schema-level fix?",
    "options": [
      {
        "letter": "A",
        "text": "Add a regex pattern constraint to `dosage_mg` to reject obviously fabricated round numbers like 5 or 10."
      },
      {
        "letter": "B",
        "text": "Move `dosage_mg` out of `required` and add an `extraction_notes` string for the model to explain itself in."
      },
      {
        "letter": "C",
        "text": "Change `dosage_mg` to type `[\"number\", \"null\"]`, keep it `required`, and add a description: \"Return null if no confirmed numeric dose appears in the source. Do not estimate or convert informal measurements.\""
      },
      {
        "letter": "D",
        "text": "Add a post-validation Python check that re-prompts the model whenever `dosage_mg` looks suspicious."
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "Regex on numbers cannot distinguish a fabricated value from a real one; \"5 mg\" is a perfectly valid real dose."
      },
      {
        "letter": "B",
        "reason": "Optional-and-omitted forces every consumer to handle missing-key vs null-value vs present-value, and `extraction_notes` doesn't suppress fabrication — it just adds a side channel."
      },
      {
        "letter": "D",
        "reason": "Post-hoc retries can't conjure information that isn't in the source; this is retry futility bolted onto the wrong layer. **Pattern/Trap:** P14 Nullable Field Prevention; P1 Prompt vs Programmatic Enforcement ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 403,
    "domain": 4,
    "scenario": "S5 (Claude Code for CI/CD)",
    "question": "A code-review system flags TODO comments and descriptive comments (\"// returns user object\") as bugs while routinely missing comments that no longer match the code's behavior (e.g., \"// retries 3 times\" above a function that retries 5). The team has tried adding \"Don't flag harmless comments\" to the prompt with no improvement. What is the most reliable fix?",
    "options": [
      {
        "letter": "A",
        "text": "Increase the system prompt detail to enumerate every harmless comment style (TODO, FIXME, NOTE, descriptive, license headers, etc.) with negative phrasing."
      },
      {
        "letter": "B",
        "text": "Add 3–4 few-shot examples showing pairs of (acceptable comment → no flag, with reasoning) and (misleading comment → flag, with reasoning), each wrapped in `<example>` tags."
      },
      {
        "letter": "C",
        "text": "Lower `temperature` to 0 so the model is more deterministic in its flagging decisions."
      },
      {
        "letter": "D",
        "text": "Switch the review tool to a tool with `tool_choice: \"any\"` so the model is forced to produce structured output."
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "Negative enumerations multiply contradictions and Anthropic explicitly recommends \"replace don't-do-this with do-this\"; the model still cannot distinguish *misleading* from *descriptive* without examples."
      },
      {
        "letter": "C",
        "reason": "Determinism doesn't fix a categorization the model cannot make; it just makes the wrong answer reproducible."
      },
      {
        "letter": "D",
        "reason": "`tool_choice: \"any\"` enforces output shape, not classification correctness — a perfectly-shaped wrong answer is still wrong. **Pattern/Trap:** P1 Prompt vs Programmatic Enforcement; P3 Over-Engineering Distractor ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 404,
    "domain": 4,
    "scenario": "S6 (Structured Data Extraction)",
    "question": "An invoice-extraction service uses a tool with `strict: true` and a JSON schema enforcing `line_items: array`, `subtotal: number`, `tax: number`, `total: number`. Schema validation passes 100% of the time but ~9% of invoices have a `total` that does not equal `sum(line_items.amount) + tax`. The schema enforcement is working correctly. What is the root cause and best mitigation?",
    "options": [
      {
        "letter": "A",
        "text": "Strict schemas are misconfigured — add a `multipleOf: 0.01` constraint to all numeric fields."
      },
      {
        "letter": "B",
        "text": "The model is rounding inconsistently — set `temperature=0` and the totals will balance."
      },
      {
        "letter": "C",
        "text": "Strict mode is failing — open a support ticket with Anthropic about constrained-decoding accuracy."
      },
      {
        "letter": "D",
        "text": "Strict mode is working correctly but only eliminates syntax errors, not semantic errors; add a `calculated_total` field the model must compute from line items, then post-validate `calculated_total == subtotal + tax` and retry with the discrepancy as feedback."
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "`multipleOf` constrains decimal precision, not arithmetic consistency between fields."
      },
      {
        "letter": "B",
        "reason": "Temperature affects sampling variance, not the model's choice of whether to ground numbers in source arithmetic."
      },
      {
        "letter": "C",
        "reason": "Anthropic's docs are explicit that strict mode guarantees format adherence, not semantic correctness — there is no bug to file. **Pattern/Trap:** P1 Prompt vs Programmatic Enforcement; P3 Over-Engineering Distractor ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 405,
    "domain": 4,
    "scenario": "S6 (Structured Data Extraction)",
    "question": "A team needs to extract product attributes from 80,000 supplier PDFs nightly. Their SLA is \"results available within 30 hours of file arrival.\" They currently use the synchronous Messages API at 1× pricing. What batching strategy meets the SLA at minimum cost?",
    "options": [
      {
        "letter": "A",
        "text": "Submit one batch of all 80,000 documents per night and rely on the 24-hour processing window."
      },
      {
        "letter": "B",
        "text": "Submit batches every 4 hours, since worst-case latency = 4h queue wait + 24h processing ceiling = 28h ≤ 30h SLA."
      },
      {
        "letter": "C",
        "text": "Submit batches every 6 hours to amortize overhead; 6h + 24h = 30h exactly meets the SLA."
      },
      {
        "letter": "D",
        "text": "Use the synchronous API with parallel workers — Batch API can't meet SLAs under 36h."
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "A once-nightly submission gives zero margin: a file arriving 1 minute after submission waits ~24h before its batch starts, then up to 24h to process, blowing the SLA."
      },
      {
        "letter": "C",
        "reason": "Exactly hitting the SLA leaves zero headroom for the documented \"processing may be slowed based on demand\" warning and the no-SLA caveat."
      },
      {
        "letter": "D",
        "reason": "Batch easily meets a 30h SLA at half the cost; abandoning batch for synchronous is over-correction. **Pattern/Trap:** P7 Batch API Latency Trap ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 406,
    "domain": 4,
    "scenario": "S5 (Claude Code for CI/CD)",
    "question": "A code-review platform runs the same Claude prompt twice on every PR — first to generate findings, then in the same conversation appending \"Now critically review your findings and remove any that are incorrect.\" The team reports that this self-review barely changes the output. Why?",
    "options": [
      {
        "letter": "A",
        "text": "The same instance retains the reasoning context, prior assumptions, and biases that produced the original findings — it tends to defend rather than reverse its prior output, so genuine independent review requires a fresh API invocation with no inherited context."
      },
      {
        "letter": "B",
        "text": "Self-review needs `extended thinking` enabled; once thinking blocks are added, the second pass becomes adversarial."
      },
      {
        "letter": "C",
        "text": "Self-review only works after at least 3 turns of conversation history — two turns is not enough for the model to distance itself."
      },
      {
        "letter": "D",
        "text": "The system prompt is missing the `<self_review>` XML tag that Anthropic requires for adversarial evaluation."
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "B",
        "reason": "Extended thinking improves single-pass reasoning depth but produces the same biased perspective; it is not a substitute for independent review."
      },
      {
        "letter": "C",
        "reason": "There is no turn-count threshold; the bias is structural to context inheritance, not a function of conversation length."
      },
      {
        "letter": "D",
        "reason": "No such required tag exists in Anthropic's documentation; the answer fabricates an API contract. **Pattern/Trap:** P19 Self-Review Limitation; P6 Context Inheritance Misconception ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 407,
    "domain": 4,
    "scenario": "S6 (Structured Data Extraction)",
    "question": "An engineer is designing a tool definition for extracting customer-complaint categories. The current schema has `category: enum[\"billing\", \"technical\", \"account\"]`. Customer-success has identified ~6% of complaints don't fit any of these and the model currently misclassifies them into the closest existing value. What's the cleanest schema design?",
    "options": [
      {
        "letter": "A",
        "text": "Add 12 more enum values to cover edge cases discovered in production logs."
      },
      {
        "letter": "B",
        "text": "Remove the enum constraint and let the model emit any category string as free text."
      },
      {
        "letter": "C",
        "text": "Add `\"other\"` to the enum and a sibling field `category_other_detail: [\"string\", \"null\"]` with a description: \"If category is 'other', describe the actual category in 3–8 words; otherwise null.\""
      },
      {
        "letter": "D",
        "text": "Keep the current 3-value enum and add a confidence score so downstream logic can route low-confidence cases to humans."
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "Expanding the enum to 15 values trades one classification problem for a harder one and still won't cover the long tail."
      },
      {
        "letter": "B",
        "reason": "Free text destroys the downstream typed pipeline (routing, aggregation, dashboards) and makes near-duplicate categories proliferate."
      },
      {
        "letter": "D",
        "reason": "Confidence scores from LLMs are notoriously poorly calibrated and don't solve the underlying \"model has no way to express 'doesn't fit'\" problem. **Pattern/Trap:** P4 Sentiment/Confidence Trap; P14 Nullable Field Prevention ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 408,
    "domain": 4,
    "scenario": "S1 (Customer Support Resolution Agent)",
    "question": "A support agent uses three tools: `get_account_status`, `lookup_billing_history`, and `escalate_to_human`. Logs show that for ambiguous escalation-worthy cases, the model occasionally returns a natural-language reply (\"I'd recommend escalating this to a human\") instead of calling `escalate_to_human`. The team wants to guarantee a tool call on these cases. Which configuration change is most appropriate?",
    "options": [
      {
        "letter": "A",
        "text": "Set `tool_choice: {\"type\": \"tool\", \"name\": \"escalate_to_human\"}` for all turns to force escalation."
      },
      {
        "letter": "B",
        "text": "Set `tool_choice: \"any\"` on the API call, which forces the model to call one of the available tools but lets it choose which."
      },
      {
        "letter": "C",
        "text": "Add the line \"You MUST call a tool, never reply in text\" to the system prompt; `tool_choice` defaults are sufficient."
      },
      {
        "letter": "D",
        "text": "Remove the natural-language fallback by setting `max_tokens: 1` so the model can't produce a text reply."
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "Forcing `escalate_to_human` on every turn would escalate every conversation, including ones where the model should call `get_account_status` first."
      },
      {
        "letter": "C",
        "reason": "Prompt-level enforcement of tool use is unreliable; `tool_choice: \"auto\"` (the default with tools provided) explicitly allows text responses regardless of prompt instructions."
      },
      {
        "letter": "D",
        "reason": "`max_tokens: 1` would truncate tool-use blocks too, breaking the API call entirely. **Pattern/Trap:** P1 Prompt vs Programmatic Enforcement; P15 Configuration Hierarchy ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 409,
    "domain": 4,
    "scenario": "S6 (Structured Data Extraction)",
    "question": "An extraction pipeline retries failed schema validations up to 3 times, appending the validator error to the prompt each retry. Metrics show that 91% of \"missing required field\" failures retry to success, but 87% of \"value not found in source document\" failures retry to failure or fabrication. What architectural change is most appropriate?",
    "options": [
      {
        "letter": "A",
        "text": "Increase the retry budget to 5 — most failures are recoverable with more attempts."
      },
      {
        "letter": "B",
        "text": "Lower temperature on retries from 0.3 to 0 to make the model more deterministic."
      },
      {
        "letter": "C",
        "text": "Add an extended-thinking step before each retry so the model reasons more carefully."
      },
      {
        "letter": "D",
        "text": "Differentiate transient/format errors (retry with feedback) from data-absence errors (return null and log) — fabrication failures indicate retry futility because the information isn't in the source."
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "Adding retries to a futile retry loop multiplies cost and latency without raising success rate; the 87% failure rate signals the loop is the wrong tool."
      },
      {
        "letter": "B",
        "reason": "Determinism cannot conjure information that isn't in the source — it just locks in one fabrication instead of varying them."
      },
      {
        "letter": "C",
        "reason": "Extended thinking improves reasoning over available evidence; it doesn't create evidence the source lacks. **Pattern/Trap:** P13 Retry Futility; P10 Root Cause vs Symptom ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 410,
    "domain": 4,
    "scenario": "S5 (Claude Code for CI/CD)",
    "question": "A team's code-review system runs three parallel Claude instances with the same prompt and reports a finding only when ≥2 agents agree. After three months, the false-positive rate has dropped to ~12% but a recurring class of bugs (off-by-one in pagination handlers) is still missed by all three reviewers in 30% of cases. Why is consensus failing here?",
    "options": [
      {
        "letter": "A",
        "text": "Three reviewers is too few — five-agent consensus is needed for off-by-one detection."
      },
      {
        "letter": "B",
        "text": "Consensus voting introduces majority bias; the system should use unanimous-only flagging."
      },
      {
        "letter": "C",
        "text": "Identical prompts across instances mean shared training-data priors and identical blind spots produce *correlated* errors, not independent confirmation. The fix is specialized agents with non-overlapping mandates plus a cross-file integration pass."
      },
      {
        "letter": "D",
        "text": "Pagination bugs require domain-specific tools that consensus voting cannot substitute for."
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "More copies of the same biased reviewer don't add independence; the marginal correlation remains."
      },
      {
        "letter": "B",
        "reason": "Tightening to unanimous voting reduces false positives but worsens recall on exactly the case described — all three reviewers share the blind spot."
      },
      {
        "letter": "D",
        "reason": "Specialized prompts handle this without external tools; the limitation is prompt diversity, not tool availability. **Pattern/Trap:** P9 Consensus Review Fallacy; P19 Self-Review Limitation ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 411,
    "domain": 4,
    "scenario": "S6 (Structured Data Extraction)",
    "question": "A team submits a 60,000-document batch at 9 PM. At 6 AM the next morning they discover the prompt referenced the wrong field name (`invoice_total` instead of `total_amount`) and ~40% of outputs will be wrong. The `processing_status` is still `in_progress` with most requests not yet executed. What is the correct operational response?",
    "options": [
      {
        "letter": "A",
        "text": "Cancel the batch (since most work is still queued), fix the prompt, and resubmit a new batch with the corrected prompt; the Batches API has no in-flight prompt update endpoint."
      },
      {
        "letter": "B",
        "text": "Let the batch complete, then PATCH the prompt via the batch update endpoint and re-process affected requests."
      },
      {
        "letter": "C",
        "text": "Submit a parallel correction batch with the fixed prompt and merge the results when both finish."
      },
      {
        "letter": "D",
        "text": "Open a support ticket with Anthropic asking them to update the in-flight prompt."
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "B",
        "reason": "No batch update/PATCH endpoint exists in the Anthropic API; this option fabricates a capability that does not exist."
      },
      {
        "letter": "C",
        "reason": "Submitting a parallel batch doubles cost and consumes rate-limit capacity for a batch whose results will be discarded."
      },
      {
        "letter": "D",
        "reason": "Anthropic Support cannot modify the contents of an in-flight batch — this is a structural API limitation, not a permissions issue. **Pattern/Trap:** P7 Batch API Latency Trap; P15 Configuration Hierarchy ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 412,
    "domain": 4,
    "scenario": "S3 (Multi-Agent Research System)",
    "question": "A research orchestrator dispatches sub-tasks to specialist agents and parses their natural-language responses with regex to populate a planning data structure. Parse failures (~14%) cause cascading task-graph corruption. The team is debating fixes. What is the most reliable approach?",
    "options": [
      {
        "letter": "A",
        "text": "Add stricter regex with more fallback patterns to handle the 14% of edge cases."
      },
      {
        "letter": "B",
        "text": "Define each sub-task response as a JSON tool with a typed schema (`findings`, `confidence`, `next_steps`, `unresolved_questions`) and call it with `tool_choice: \"any\"` so every specialist returns schema-compliant structured output the orchestrator can consume directly."
      },
      {
        "letter": "C",
        "text": "Add a second LLM pass that converts the natural-language response to JSON, with retries on parse failure."
      },
      {
        "letter": "D",
        "text": "Increase the specialist agents' `max_tokens` so their responses are more complete and parseable."
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "Regex fragility against open-ended LLM output is the root cause; more regex compounds the problem."
      },
      {
        "letter": "C",
        "reason": "A second LLM pass to convert NL → JSON adds latency, cost, and a new failure mode while not eliminating the original brittleness."
      },
      {
        "letter": "D",
        "reason": "Token budget doesn't make natural language deterministically parseable; longer responses can be *less* parseable. **Pattern/Trap:** P1 Prompt vs Programmatic Enforcement; P5 Tool Description Primacy ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 413,
    "domain": 4,
    "scenario": "S6 (Structured Data Extraction)",
    "question": "A team is designing a tool definition for medical-claim extraction. They've drafted a one-sentence description: \"Extracts diagnosis codes from clinical notes.\" The tool is occasionally called when a billing tool would be correct, and it occasionally fabricates ICD-10 codes for vague symptoms. What is Anthropic's recommended fix?",
    "options": [
      {
        "letter": "A",
        "text": "Add few-shot routing examples to the system prompt so the model learns when to call this tool vs. the billing tool."
      },
      {
        "letter": "B",
        "text": "Add a regex post-validator that rejects fabricated ICD-10 codes."
      },
      {
        "letter": "C",
        "text": "Lower temperature to 0 to reduce fabrication."
      },
      {
        "letter": "D",
        "text": "Expand the tool description to 3–4+ sentences covering what the tool does, when it should be used, when it should NOT be used, what each parameter means, and important caveats including \"return an empty array if no confirmed diagnosis is documented.\""
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "Few-shot routing examples paper over a tool-description problem; Anthropic's guidance is to fix descriptions first because examples consume tokens and cannot disambiguate inherently overlapping tools."
      },
      {
        "letter": "B",
        "reason": "Post-validation catches malformed codes but cannot tell whether a syntactically valid code was actually documented in the note."
      },
      {
        "letter": "C",
        "reason": "Temperature reduces sampling variance, not the model's choice of whether to invent an ICD-10 from vague text. **Pattern/Trap:** P5 Tool Description Primacy; P3 Over-Engineering Distractor ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 414,
    "domain": 4,
    "scenario": "S5 (Claude Code for CI/CD)",
    "question": "A code-review architecture analyzes each file in isolation, then aggregates findings. A recent bug — a parameter renamed in one file but still referenced under the old name in three caller files — was missed by every per-file reviewer. Each reviewer's local analysis was correct in isolation. What architectural change closes this gap?",
    "options": [
      {
        "letter": "A",
        "text": "Add a \"shared blind spot\" verification agent whose only job is to check the per-file findings against each other."
      },
      {
        "letter": "B",
        "text": "Increase the per-file reviewers' `max_tokens` so they consider more context."
      },
      {
        "letter": "C",
        "text": "Add a cross-file integration pass: an agent receives the union of related files in its context window and looks for problems visible only across files (renamed parameters, unused arguments, type mismatches between caller and callee)."
      },
      {
        "letter": "D",
        "text": "Run five identical reviewers per file and require unanimous agreement before flagging."
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "A meta-reviewer of per-file findings still has only the per-file findings as input — it cannot detect issues that no per-file reviewer surfaced."
      },
      {
        "letter": "B",
        "reason": "More tokens per file doesn't bring other files into context; the issue is which files are in scope, not how much room each gets."
      },
      {
        "letter": "D",
        "reason": "N copies of the same per-file reviewer share the per-file blind spot — consensus on file-local context cannot manifest cross-file information. **Pattern/Trap:** P9 Consensus Review Fallacy; P17 Lost in the Middle ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 415,
    "domain": 4,
    "scenario": "S6 (Structured Data Extraction)",
    "question": "A pipeline extracts shipment data into a schema with 22 fields. Three fields (`hazmat_class`, `customs_value`, `consignee_tax_id`) are present in only ~30% of source documents. The current schema marks them all `required: true`. The model is fabricating values for these fields when they're absent. What is the best schema redesign?",
    "options": [
      {
        "letter": "A",
        "text": "Remove the three sparse fields from `required` and from the schema entirely; consumers can derive them downstream."
      },
      {
        "letter": "B",
        "text": "Keep them in the schema but remove from `required`, and change types to `[\"string\", \"null\"]` (or appropriate type union with null), with descriptions instructing the model to return null when not documented and never to infer or estimate."
      },
      {
        "letter": "C",
        "text": "Add a `missing_fields: array` and require the model to list any field it couldn't extract."
      },
      {
        "letter": "D",
        "text": "Run extraction twice and accept only fields that match across both runs."
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "Removing the fields entirely loses signal when they *are* present and pushes the absence-handling problem to consumers without solving it."
      },
      {
        "letter": "C",
        "reason": "A side-channel `missing_fields` array is unstructured and doesn't prevent fabrication in the primary fields when the model \"thinks\" it found something."
      },
      {
        "letter": "D",
        "reason": "Duplicate extraction doubles cost and latency for a problem the schema can solve cleanly; Best-of-N is a verification pattern, not a replacement for nullable design. **Pattern/Trap:** P14 Nullable Field Prevention; P13 Retry Futility ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 416,
    "domain": 4,
    "scenario": "General",
    "question": "A team enables `extended thinking` on a Claude review agent with `tool_choice: {\"type\": \"tool\", \"name\": \"submit_review\"}` to force structured output. The API call returns an error. What is the correct interpretation?",
    "options": [
      {
        "letter": "A",
        "text": "Forced tool selection (`tool_choice: \"any\"` or `tool_choice: {\"type\": \"tool\", ...}`) is incompatible with extended thinking; only `auto` and `none` are supported. Switch to `tool_choice: \"auto\"` and instruct the model in a user message to call `submit_review`."
      },
      {
        "letter": "B",
        "text": "Extended thinking requires `temperature: 1`; setting it to 0 (the team's default) caused the error."
      },
      {
        "letter": "C",
        "text": "Extended thinking requires the tool name to be prefixed with `thinking_`."
      },
      {
        "letter": "D",
        "text": "The error is a transient API issue — retry with exponential backoff."
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "B",
        "reason": "Temperature requirements for extended thinking concern values, not the choice of `tool_choice` mode; the error here is structural."
      },
      {
        "letter": "C",
        "reason": "No naming convention requirement exists in the API; the option is fabricated."
      },
      {
        "letter": "D",
        "reason": "This is a deterministic configuration error, not a transient one — retries will fail identically. **Pattern/Trap:** P15 Configuration Hierarchy; P3 Over-Engineering Distractor ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 417,
    "domain": 4,
    "scenario": "S6 (Structured Data Extraction)",
    "question": "A team is benchmarking three approaches to producing JSON output from Claude for a contract-review tool: (1) prompt-only (\"Respond with JSON matching this schema...\"), (2) tool use with `strict: true` and `tool_choice: \"any\"`, (3) tool use with `strict: false`. Schema-validity rates over 10,000 calls are 94.1%, 100%, and 99.4% respectively. The team wants to choose option 1 because it's \"simpler\". What is the right rebuttal?",
    "options": [
      {
        "letter": "A",
        "text": "Prompt-only achieves 94.1% which is sufficient; the 5.9% can be retried."
      },
      {
        "letter": "B",
        "text": "Tool use with `strict: false` at 99.4% is the best balance because strict mode adds latency."
      },
      {
        "letter": "C",
        "text": "Switch to prompt-only with `temperature: 0` — it will reach 100% validity."
      },
      {
        "letter": "D",
        "text": "Tool use with strict schemas + `tool_choice: \"any\"` is Anthropic's most reliable structured-output mechanism, with constrained decoding mathematically guaranteeing schema compliance; the simplicity argument is false economy because the 5.9% syntactic failure rate creates downstream fragility that exceeds the integration overhead of tool use."
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "A 5.9% failure rate at 10,000 calls is 590 broken integrations per run — not a tail-risk to be papered over with retries."
      },
      {
        "letter": "B",
        "reason": "Strict mode does not measurably increase latency; the 0.6% gap represents real production failures, and `strict: true` is the recommended default."
      },
      {
        "letter": "C",
        "reason": "`temperature: 0` reduces variance but does not guarantee schema compliance — that requires constrained decoding, which only the tool-use path provides. **Pattern/Trap:** P1 Prompt vs Programmatic Enforcement; P12 Aggregate Metric Masking ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 418,
    "domain": 4,
    "scenario": "S5 (Claude Code for CI/CD)",
    "question": "A team's PR-review system is showing a pattern: on long PRs (>800 lines changed), the model frequently dismisses real issues in the *middle* of the diff as \"intentional\" while flagging issues at the start and end accurately. They've tried adding \"review every line equally carefully\" to the prompt with no effect. What is the most effective architectural fix?",
    "options": [
      {
        "letter": "A",
        "text": "Add a `detected_pattern` field to the output schema for the model to self-report dismissal patterns."
      },
      {
        "letter": "B",
        "text": "Increase `max_tokens` so the model has more room to discuss middle-of-diff issues."
      },
      {
        "letter": "C",
        "text": "Split long diffs into smaller chunks (per-file or per-hunk) reviewed by independent per-file agents, then a cross-file integration pass — addressing the lost-in-the-middle effect through architecture rather than prompt instructions."
      },
      {
        "letter": "D",
        "text": "Switch to a model with a larger context window and include the entire repository."
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "A `detected_pattern` field is a useful logging idiom for offline analysis but doesn't change the within-call attention distribution that caused the dismissals."
      },
      {
        "letter": "B",
        "reason": "More output tokens don't redistribute input attention; the bias is in how the model attends to the input, not how much output it can produce."
      },
      {
        "letter": "D",
        "reason": "Larger context windows make the lost-in-the-middle effect *worse*, not better, by enlarging the under-attended region. **Pattern/Trap:** P17 Lost in the Middle; P8 Larger Context Window Fallacy ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 419,
    "domain": 4,
    "scenario": "S6 (Structured Data Extraction)",
    "question": "A team wants to extract structured data from documents and is debating between (a) prompt-only with `\"Respond in JSON\"`, (b) tool use with `tool_choice: \"auto\"`, and (c) tool use with `tool_choice: \"any\"`. With option (b), they observe ~7% of responses contain natural-language preamble before the tool call or a text-only response. What's happening?",
    "options": [
      {
        "letter": "A",
        "text": "Tool definitions are missing required fields — fix the schema and the preambles will stop."
      },
      {
        "letter": "B",
        "text": "`tool_choice: \"auto\"` allows the model to either call a tool OR respond in text — this is documented behavior. To guarantee a tool call, use `tool_choice: \"any\"` or `tool_choice: {\"type\": \"tool\", \"name\": \"...\"}`."
      },
      {
        "letter": "C",
        "text": "The 7% rate indicates a temperature that is too high; setting `temperature: 0` will eliminate it."
      },
      {
        "letter": "D",
        "text": "The tool descriptions are too short; expanding them will force tool use."
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "The behavior is the documented contract of `auto`, not a schema bug."
      },
      {
        "letter": "C",
        "reason": "Temperature affects sampling variance, not the auto-vs-required choice axis controlled by `tool_choice`."
      },
      {
        "letter": "D",
        "reason": "Tool descriptions are extremely important for *which* tool is called, but they don't override the `tool_choice: \"auto\"` permission to respond in text. **Pattern/Trap:** P15 Configuration Hierarchy; P5 Tool Description Primacy ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 420,
    "domain": 4,
    "scenario": "S1 (Customer Support Resolution Agent)",
    "question": "A support agent escalates conversations to humans inconsistently. The system prompt says \"Escalate when the customer is frustrated or the issue is complex.\" Sentiment-analysis logs show the model escalates 8% of conversations, but human auditors say the *correct* escalation rate should be ~22%. What is the most reliable fix?",
    "options": [
      {
        "letter": "A",
        "text": "Replace the vague criteria with explicit, observable triggers: \"Escalate when ANY of: (1) customer has used a refund/cancel/lawsuit keyword; (2) the issue has been re-opened ≥2 times; (3) the resolution requires changes the available tools cannot perform; (4) customer explicitly requests a human.\" Provide 3 few-shot examples covering edge cases."
      },
      {
        "letter": "B",
        "text": "Lower the sentiment threshold for \"frustrated\" so more conversations meet the bar."
      },
      {
        "letter": "C",
        "text": "Add a confidence score to the escalate decision and escalate when confidence > 0.7."
      },
      {
        "letter": "D",
        "text": "Run a second Claude instance asking \"Should this be escalated?\" and OR the two decisions."
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "B",
        "reason": "Sentiment-classifier threshold tuning treats the symptom; the root cause is the criterion itself being vague, not its threshold."
      },
      {
        "letter": "C",
        "reason": "Self-reported confidence from LLMs is poorly calibrated; this just adds another vague subjective scalar."
      },
      {
        "letter": "D",
        "reason": "Two instances with the same vague criterion produce correlated errors, not independent confirmation; OR-ing decisions inflates false positives without fixing the criterion. **Pattern/Trap:** P20 Explicit Escalation Criteria; P4 Sentiment/Confidence Trap ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 421,
    "domain": 4,
    "scenario": "S6 (Structured Data Extraction)",
    "question": "An extraction system reports an aggregate accuracy of 96% across 50,000 invoices in a nightly batch. Finance flags that on the ~3,200 international invoices the accuracy is only 71%. The aggregate metric had been masking a domain-specific failure. What is the most appropriate response?",
    "options": [
      {
        "letter": "A",
        "text": "The 96% aggregate is acceptable; international invoices are an edge case."
      },
      {
        "letter": "B",
        "text": "Add `temperature: 0` to make extraction more deterministic across all invoices."
      },
      {
        "letter": "C",
        "text": "Switch to a more capable model for the entire pipeline."
      },
      {
        "letter": "D",
        "text": "Segment evaluation by document subtype (domestic vs. international, by country, by currency), build targeted few-shot examples for international cases, and re-evaluate the segment-level metrics; aggregate metrics mask domain-specific failure."
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "A 71% accuracy is unacceptably low for production finance data regardless of slice size; \"edge case\" reasoning normalizes systematic failures."
      },
      {
        "letter": "B",
        "reason": "Determinism doesn't improve accuracy on a domain the model is mishandling; it locks in the wrong answer."
      },
      {
        "letter": "C",
        "reason": "Upgrading the model for all 50,000 invoices is wasteful when 94% of the volume is already extracted correctly; targeted few-shot is the proportional fix. **Pattern/Trap:** P12 Aggregate Metric Masking; P2 First Step Proportionality ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 422,
    "domain": 4,
    "scenario": "S6 (Structured Data Extraction)",
    "question": "A team is designing a self-correction validation pattern for invoice extraction. They want the model to detect its own arithmetic inconsistencies. Which schema design best implements this?",
    "options": [
      {
        "letter": "A",
        "text": "Add a `confidence: number` field and reject any extraction with confidence < 0.9."
      },
      {
        "letter": "B",
        "text": "Add `stated_total` (verbatim from document) and `calculated_total` (model-computed from line items) plus a `conflict_detected: boolean` field the model must set to true when the values disagree; downstream code validates the boolean and triggers retry-with-feedback or human review when set."
      },
      {
        "letter": "C",
        "text": "Add a `notes: string` field where the model can mention any concerns it has."
      },
      {
        "letter": "D",
        "text": "Add an `extraction_quality: enum[\"high\", \"medium\", \"low\"]` field and route low-quality extractions to humans."
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "Self-reported confidence from LLMs is poorly calibrated; rejecting on confidence < 0.9 will simultaneously discard correct extractions and accept fabrications labeled \"high confidence.\""
      },
      {
        "letter": "C",
        "reason": "Free-text `notes` is unstructured and unparseable, so downstream code cannot mechanically act on it."
      },
      {
        "letter": "D",
        "reason": "A 3-level qualitative enum is just confidence-binning under a different name and shares the same calibration problem. **Pattern/Trap:** P4 Sentiment/Confidence Trap; P14 Nullable Field Prevention ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 423,
    "domain": 4,
    "scenario": "S3 (Multi-Agent Research System)",
    "question": "A research orchestrator runs three specialist agents in parallel and synthesizes their findings. The team observes that when all three agree, the synthesis is correct ~96% of the time, but when even one agent dissents the synthesis is correct only ~58% of the time. The team wants to use unanimous agreement as a green-light signal. What is the most accurate critique?",
    "options": [
      {
        "letter": "A",
        "text": "Three agents is too few; expand to seven to make consensus more reliable."
      },
      {
        "letter": "B",
        "text": "Unanimous agreement should override any dissent; the dissenter is the noise."
      },
      {
        "letter": "C",
        "text": "If all three agents share the same prompt and same model, unanimous agreement is *correlated* confirmation, not independent — when they share a blind spot, all three are wrong together. The 96% figure is calibrated against the kinds of cases where this prompt happens to work; deploy it as a heuristic for human-review triage, not as a correctness guarantee."
      },
      {
        "letter": "D",
        "text": "Unanimous agreement is fine; just track which agents disagree most often and remove them."
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "More copies of correlated reviewers don't add independence; the marginal correlation of a 7th agent is near zero."
      },
      {
        "letter": "B",
        "reason": "Dissent is often the *signal*, not the noise — minority-opinion findings frequently identify shared blind spots in the majority."
      },
      {
        "letter": "D",
        "reason": "Removing the dissenter optimizes for echo chamber; this destroys the calibration value of disagreement. **Pattern/Trap:** P9 Consensus Review Fallacy; P19 Self-Review Limitation ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 424,
    "domain": 4,
    "scenario": "S6 (Structured Data Extraction)",
    "question": "A team submits a 12,000-document batch. After it ends, `request_counts` shows 11,840 succeeded, 120 errored (`invalid_request_error`), 30 errored (server error), and 10 expired. The team's billing dashboard shows charges only for the 11,840 succeeded. What is the correct interpretation and recovery strategy?",
    "options": [
      {
        "letter": "A",
        "text": "Errored, canceled, and expired requests are not billed. For the 120 `invalid_request_error` cases, fix the request bodies (likely prompt or schema issues specific to those inputs) and resubmit by `custom_id`; for the 30 server errors, resubmit as-is; for the 10 expired requests, re-queue."
      },
      {
        "letter": "B",
        "text": "All 12,000 requests are billed because the batch was submitted; the dashboard is delayed."
      },
      {
        "letter": "C",
        "text": "Cancel any related in-flight batches because the error rate exceeded a 1% threshold."
      },
      {
        "letter": "D",
        "text": "Resubmit the entire 12,000-document batch with a new prompt to be safe."
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "B",
        "reason": "Anthropic does not bill non-succeeded requests; the dashboard reflects actual billing accurately."
      },
      {
        "letter": "C",
        "reason": "No 1% threshold exists in the API; 1.3% failure is well within normal operational variance."
      },
      {
        "letter": "D",
        "reason": "Resubmitting all 12,000 wastes 11,840 successful and already-paid extractions and doubles cost for no benefit. **Pattern/Trap:** P7 Batch API Latency Trap; P15 Configuration Hierarchy ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 425,
    "domain": 4,
    "scenario": "S5 (Claude Code for CI/CD)",
    "question": "A team builds a code-review architecture with one Claude agent that generates findings, then in the same conversation appends \"Now act as a senior reviewer and disprove any finding you cannot defend.\" The disprove step removes ~3% of findings. They argue this is a low-cost adversarial review. What is the most accurate evaluation?",
    "options": [
      {
        "letter": "A",
        "text": "The 3% reduction is meaningful; this is a working adversarial pattern."
      },
      {
        "letter": "B",
        "text": "The same conversation retains generation context, so the \"senior reviewer\" persona is biased toward defending its own prior findings; 3% is the rate at which the model reverses *itself*, not the rate of incorrect findings."
      },
      {
        "letter": "C",
        "text": "Adversarial review only works with `extended thinking` enabled."
      },
      {
        "letter": "D",
        "text": "The disprove step should be applied as a separate API call with a fresh system prompt, fresh user message containing only the findings and the source code, and ideally a different model to break correlated biases."
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "A 3% self-reversal rate measures sycophantic editing tolerance, not correctness; it does not validate the architecture."
      },
      {
        "letter": "B",
        "reason": "Diagnoses the problem correctly but stops short of the architectural fix; the question asks for the most accurate full evaluation including the remedy."
      },
      {
        "letter": "C",
        "reason": "Extended thinking improves single-pass reasoning depth but still operates within the same instance and context — it is not a substitute for independent review. **Pattern/Trap:** P19 Self-Review Limitation; P6 Context Inheritance Misconception ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 426,
    "domain": 4,
    "scenario": "S5 (Claude Code for CI/CD)",
    "question": "A team wants to reduce API costs for automated analysis. Currently, real-time Claude calls power two workflows: (1) a blocking pre-merge check that must complete before developers can merge, and (2) a technical debt report generated overnight for review the next morning. A manager proposes switching both to the Message Batches API for its 50% cost savings. How should you evaluate this proposal?",
    "options": [
      {
        "letter": "A",
        "text": "Switch both workflows to batch processing with status polling to check for completion."
      },
      {
        "letter": "B",
        "text": "Use batch processing for the technical debt reports only; keep real-time calls for pre-merge checks."
      },
      {
        "letter": "C",
        "text": "Keep real-time calls for both workflows to avoid batch result ordering issues."
      },
      {
        "letter": "D",
        "text": "Switch both to batch processing with a timeout fallback to real-time if batches take too long."
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "Relying on \"often faster\" batch completion isn't acceptable for blocking workflows; there is no guaranteed latency SLA and developers cannot wait up to 24 hours to merge."
      },
      {
        "letter": "C",
        "reason": "Batch results can be correlated using `custom_id` fields; result ordering is not a legitimate concern."
      },
      {
        "letter": "D",
        "reason": "Adds unnecessary complexity when the simpler solution is matching each API to its appropriate use case. **Pattern/Trap:** P7 Batch API Latency Trap ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 427,
    "domain": 4,
    "scenario": "S6 (Structured Data Extraction)",
    "question": "A team builds an extractor that must always return a JSON object matching a fixed schema. They set `tool_choice: \"auto\"` and provide one tool definition. They observe ~7% of calls return plain text instead of a tool call. The team is surprised because they assumed providing tools makes the model always call them. Which explanation is correct?",
    "options": [
      {
        "letter": "A",
        "text": "The model has a bug when only one tool is provided; use at least two tools."
      },
      {
        "letter": "B",
        "text": "The tool schema has an error causing the model to fall back to text."
      },
      {
        "letter": "C",
        "text": "`tool_choice: \"auto\"` explicitly allows the model to either call a tool OR respond in text; to guarantee a tool call use `tool_choice: \"any\"` or force a specific tool with `tool_choice: {\"type\": \"tool\", \"name\": \"...\"}`."
      },
      {
        "letter": "D",
        "text": "The 7% represents rate-limited calls; add retry logic with exponential backoff."
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "Single-tool configurations work normally; the behavior is about `tool_choice` mode, not the number of tools."
      },
      {
        "letter": "B",
        "reason": "A schema error would produce a different failure mode (validation error or malformed call), not a fallback to plain text."
      },
      {
        "letter": "D",
        "reason": "Rate limiting returns HTTP 429 errors, not plain-text responses in place of tool calls. **Pattern/Trap:** P15 Configuration Hierarchy; P1 Prompt vs Programmatic Enforcement ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 428,
    "domain": 4,
    "scenario": "S6 (Structured Data Extraction)",
    "question": "A team is preparing a 90,000-document overnight extraction batch. A pilot of 100 representative documents on the synchronous Messages API shows ~12% of outputs have a recurring error: line items missing their currency field. They have 3 hours until the batch must submit to meet SLA. What is the right action?",
    "options": [
      {
        "letter": "A",
        "text": "Refine the prompt and schema now (add an explicit \"currency is required for every line item, infer from header if not specified per line\" instruction plus 2–3 few-shot examples), re-pilot on the 100 documents, then submit the full 90,000-document batch — prompt iteration must happen *before* batch submission because there is no in-flight prompt update and validation is asynchronous."
      },
      {
        "letter": "B",
        "text": "Submit the batch as-is and fix the 12% with a follow-up batch."
      },
      {
        "letter": "C",
        "text": "Submit the batch and PATCH the prompt mid-flight when the issue manifests at scale."
      },
      {
        "letter": "D",
        "text": "Skip the pilot and submit directly; 12% is acceptable."
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "B",
        "reason": "A follow-up batch doubles cost and adds another full processing window of latency for problems already known and fixable now."
      },
      {
        "letter": "C",
        "reason": "No PATCH/update endpoint exists for in-flight batches; the option fabricates a capability."
      },
      {
        "letter": "D",
        "reason": "A known 12% defect rate on 90,000 documents is 10,800 broken records; \"acceptable\" without remediation violates SLA quality requirements. **Pattern/Trap:** P7 Batch API Latency Trap; P2 First Step Proportionality ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 429,
    "domain": 4,
    "scenario": "S6 (Structured Data Extraction)",
    "question": "An extraction pipeline retries failed schema validations. After analyzing 30 days of logs, the team finds that retries 1, 2, and 3 succeed at rates 73%, 41%, and 9% respectively for format errors, but 4%, 3%, and 2% for \"field not found in source\" errors. What is the most defensible retry policy?",
    "options": [
      {
        "letter": "A",
        "text": "Always retry 3 times — the marginal success rate is positive on every retry."
      },
      {
        "letter": "B",
        "text": "Retry up to 5 times because retry-with-feedback is Anthropic's recommended pattern."
      },
      {
        "letter": "C",
        "text": "Retry 0 times — retries add cost without solving real problems."
      },
      {
        "letter": "D",
        "text": "Cap retries at 2 for format errors (where marginal benefit is meaningful) and 0 for data-absence errors (where information is genuinely not in the source and retries produce fabrication); detect the error class via the validation message and route accordingly."
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "A 2-3% success rate on data-absence retries is fabrication noise, not real recovery; treating it as success poisons the dataset."
      },
      {
        "letter": "B",
        "reason": "Anthropic's pattern recommends retries *with a maximum cap*, never unconditional retries, and explicitly distinguishes when retries are futile."
      },
      {
        "letter": "C",
        "reason": "Discarding retries entirely sacrifices the 73% recovery on format errors — a real and well-calibrated benefit. **Pattern/Trap:** P13 Retry Futility; P10 Root Cause vs Symptom ---"
      }
    ],
    "pattern": ""
  },
  {
    "id": 430,
    "domain": 4,
    "scenario": "S5 (Claude Code for CI/CD)",
    "question": "A team's PR-review system uses a single Claude agent with a 12-page system prompt that lists every kind of issue to look for. Recall on critical bugs is 81%; the team wants 95%. They are debating between (a) further expanding the prompt to cover more issue types, (b) using extended thinking with `budget_tokens: 12000`, and (c) splitting the work across multiple specialized agents. Which approach is most aligned with Anthropic's documented Code Review architecture?",
    "options": [
      {
        "letter": "A",
        "text": "Option (a) — exhaustive prompts are the simplest approach and avoid orchestration overhead."
      },
      {
        "letter": "B",
        "text": "Option (b) — extended thinking provides the deepest single-pass analysis and is functionally equivalent to multi-agent review."
      },
      {
        "letter": "C",
        "text": "Option (c) — multiple specialized agents each scoped to a different failure mode (data-handling, off-by-one, API misuse, security) running in parallel, combined with a cross-file integration pass and an adversarial verification step, then aggregate by deduplicating and ranking by severity."
      },
      {
        "letter": "D",
        "text": "None of the above — recall above 81% is impossible without retraining the base model."
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "whyWrong": [
      {
        "letter": "A",
        "reason": "A 12-page prompt is already showing diminishing returns; further expansion increases contradictions and hits attention-distribution limits without adding genuinely new perspectives."
      },
      {
        "letter": "B",
        "reason": "Extended thinking improves single-pass reasoning depth but operates within the same instance, same prompt, and same blind spots — it is not equivalent to independent specialized review."
      },
      {
        "letter": "D",
        "reason": "Anthropic's reported architecture demonstrably exceeds 81% recall on substantive findings without retraining; the option fabricates a ceiling. **Pattern/Trap:** P19 Self-Review Limitation; P9 Consensus Review Fallacy --- ## Coverage Summary (Corrected) ### Corrections applied from original | Change | Questions affected | |---|---| | Formation error fixed (in-question rewrite removed) | Q11 | | Answer content corrected | Q11 (final clean version used; correct answer unchanged) | | No other changes | Q1–Q10, Q12–Q30 | ### Verified answer-letter distribution | Letter | Questions | Count | |---|---|---| | **A** | Q1, Q6, Q11, Q16, Q20, Q24, Q28 | **7** ✓ | | **B** | Q3, Q5, Q8, Q12, Q15, Q19, Q22, Q26 | **8** ✓ | | **C** | Q2, Q7, Q10, Q14, Q18, Q23, Q27, Q30 | **8** ✓ | | **D** | Q4, Q9, Q13, Q17, Q21, Q25, Q29 | **7** ✓ | | **Total** | | **30** ✓ | **Distribution was already balanced — no rotations required.** ### Task statement coverage | Task | Questions | Count | |---|---|---| | 4.1 Explicit criteria, false-positive reduction | Q1, Q3, Q20, Q25 | 4 | | 4.2 Few-shot prompting | Q3, Q13, Q20, Q21 | 4 | | 4.3 Tool use, JSON schemas, tool_choice | Q2, Q7, Q8, Q12, Q13, Q15, Q16, Q17, Q19, Q27 | 10 | | 4.4 Validation, retry, feedback loops | Q4, Q9, Q22, Q25, Q29 | 5 | | 4.5 Batch processing strategies | Q5, Q11, Q19, Q24, Q26, Q28 | 6 | | 4.6 Multi-instance / multi-pass review | Q6, Q10, Q14, Q18, Q23, Q30 | 6 | ### Pattern distribution | Pattern | Questions | |---|---| | P1 Prompt vs Programmatic Enforcement | Q2, Q3, Q4, Q8, Q12, Q17, Q27 | | P2 First Step Proportionality | Q21, Q28 | | P3 Over-Engineering Distractor | Q3, Q4, Q13, Q16 | | P4 Sentiment/Confidence Trap | Q7, Q20, Q22 | | P5 Tool Description Primacy | Q12, Q13, Q19 | | P6 Context Inheritance Misconception | Q6, Q25 | | P7 Batch API Latency Trap | Q5, Q11, Q24, Q26, Q28 | | P8 Larger Context Window Fallacy | Q18 | | P9 Consensus Review Fallacy | Q10, Q14, Q23, Q30 | | P10 Root Cause vs Symptom | Q1, Q9, Q29 | | P12 Aggregate Metric Masking | Q17, Q21 | | P13 Retry Futility | Q9, Q15, Q29 | | P14 Nullable Field Prevention | Q2, Q7, Q15, Q22 | | P15 Configuration Hierarchy | Q8, Q11, Q16, Q19, Q24, Q27 | | P17 Lost in the Middle | Q14, Q18 | | P19 Self-Review Limitation | Q6, Q10, Q23, Q25, Q30 | | P20 Explicit Escalation Criteria | Q1, Q20 |"
      }
    ],
    "pattern": ""
  }
];
