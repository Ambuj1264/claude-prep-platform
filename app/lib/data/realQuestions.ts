export interface RealQuestion {
  id: number;
  question: string;
  options: { key: 'A' | 'B' | 'C' | 'D'; text: string }[];
  answer: 'A' | 'B' | 'C' | 'D';
  domain?: string;
}

export const realQuestions: RealQuestion[] = [
  {
    id: 1,
    question:
      "After a 40-minute session helping plan a dinner party, the conversation has grown to 78,000 tokens. What approach best balances information preservation with token reduction?",
    options: [
      { key: 'A', text: "Store the full conversation externally and use semantic search to retrieve relevant sections on demand." },
      { key: 'B', text: "Summarize the entire conversation history into a single condensed paragraph." },
      { key: 'C', text: "Extract critical structured data (allergies, serving counts, user-defined terms), summarize general discussion, and retain recent exchanges verbatim." },
      { key: 'D', text: "Implement a sliding window retaining only the most recent 20,000 tokens." },
    ],
    answer: 'C',
    domain: 'Context Management',
  },
  {
    id: 2,
    question:
      "After deploying an updated system prompt, users report that Claude contradicts advice given in earlier sessions. What is the best approach to resolve this?",
    options: [
      { key: 'A', text: "Add a transition message when sessions resume." },
      { key: 'B', text: "Version system prompts and associate each conversation with the prompt version under which it started." },
      { key: 'C', text: "Regenerate summaries of existing conversations." },
      { key: 'D', text: "Add instructions to maintain consistency with prior statements." },
    ],
    answer: 'B',
    domain: 'Context Management',
  },
  {
    id: 3,
    question:
      "A user says they have very low risk tolerance, then later asks how to maximize returns. What should the agent do?",
    options: [
      { key: 'A', text: "Provide recommendations for both scenarios simultaneously." },
      { key: 'B', text: "Recommend a balanced portfolio that satisfies both goals." },
      { key: 'C', text: "Surface the contradiction and ask which goal matters more." },
      { key: 'D', text: "Proceed with the most recent preference stated by the user." },
    ],
    answer: 'C',
    domain: 'Context Management',
  },
  {
    id: 4,
    question:
      "An interactive storytelling agent struggles to maintain character and plot consistency as context approaches the limit. What is the best strategy to preserve story continuity?",
    options: [
      { key: 'A', text: "Separate persistent story elements into a retained 'story bible' section." },
      { key: 'B', text: "Keep only the most recent 25 turns of conversation." },
      { key: 'C', text: "Summarize entire history every 20 turns." },
      { key: 'D', text: "Store all history in a vector database." },
    ],
    answer: 'A',
    domain: 'Context Management',
  },
  {
    id: 5,
    question:
      "You are building a music discovery assistant with specific genre preferences and playlist-building rules. Where should persistent behavioral instructions be placed for maximum effectiveness?",
    options: [
      { key: 'A', text: "In the system prompt." },
      { key: 'B', text: "Prepend instructions to each user message." },
      { key: 'C', text: "Put instructions in the first assistant message." },
      { key: 'D', text: "Store them in environment variables." },
    ],
    answer: 'A',
    domain: 'Context Management',
  },
  {
    id: 6,
    question:
      "Users report that a music assistant forgets playlist preferences from earlier in the same conversation. What is the most likely cause?",
    options: [
      { key: 'A', text: "The application isn't including prior messages in the messages array." },
      { key: 'B', text: "The context window has been exceeded." },
      { key: 'C', text: "A missing session_id parameter." },
      { key: 'D', text: "The application requires a vector database for memory." },
    ],
    answer: 'A',
    domain: 'Context Management',
  },
  {
    id: 7,
    question:
      "A user sends the vague message 'Set up my focus music.' The agent is unsure whether to create a playlist, play tracks immediately, or start a preference configuration flow. What should the agent do?",
    options: [
      { key: 'A', text: "Create a Focus playlist automatically." },
      { key: 'B', text: "Play focus tracks immediately." },
      { key: 'C', text: "Start preference configuration." },
      { key: 'D', text: "Ask one clarifying question about what action type the user wants." },
    ],
    answer: 'D',
    domain: 'Ambiguity Handling',
  },
  {
    id: 8,
    question:
      "A customer service agent follows guidelines well for the first 20 turns but gradually drifts from them after 25-30 turns. What is the most effective fix?",
    options: [
      { key: 'A', text: "Move guidelines into the first user message." },
      { key: 'B', text: "Regenerate non-compliant responses until they are compliant." },
      { key: 'C', text: "Start a new conversation every 20 turns." },
      { key: 'D', text: "Reinforce critical guidelines at natural breakpoints in the conversation." },
    ],
    answer: 'D',
    domain: 'Context Management',
  },
  {
    id: 9,
    question:
      "A RAG-powered assistant retrieves large document chunks that crowd out conversation history, causing the agent to lose track of user preferences. What is the best solution?",
    options: [
      { key: 'A', text: "Use a sliding window for recent RAG results while preserving conversation history." },
      { key: 'B', text: "Favor RAG results over conversation history." },
      { key: 'C', text: "Consolidate all RAG results into one summary document." },
      { key: 'D', text: "Use semantic deduplication to remove redundant content." },
    ],
    answer: 'A',
    domain: 'Context Management',
  },
  {
    id: 10,
    question:
      "A literary discussion assistant has accumulated 85k tokens of history. The user wants to continue the conversation. What is the best context management approach?",
    options: [
      { key: 'A', text: "Progressive summarization preserving conclusions and retaining recent exchanges verbatim." },
      { key: 'B', text: "Semantic retrieval replacing linear history." },
      { key: 'C', text: "Rolling truncation from the oldest messages." },
      { key: 'D', text: "Use XML tags to wrap conclusions for easy extraction." },
    ],
    answer: 'A',
    domain: 'Context Management',
  },
  {
    id: 11,
    question:
      "An agent asks too many clarifying questions before acting, frustrating users. What is the best approach to reduce friction while maintaining accuracy?",
    options: [
      { key: 'A', text: "Implement an ambiguity classifier to decide when to ask." },
      { key: 'B', text: "Limit to one clarifying question per turn." },
      { key: 'C', text: "Make reasonable assumptions, state them explicitly, and invite corrections." },
      { key: 'D', text: "Use default interpretations without stating assumptions." },
    ],
    answer: 'C',
    domain: 'Ambiguity Handling',
  },
  {
    id: 12,
    question:
      "A personal assistant ignores preference updates made mid-conversation (e.g., 'Actually, I prefer formal tone'). What is the most effective fix?",
    options: [
      { key: 'A', text: "Prune outdated turns from conversation history." },
      { key: 'B', text: "Add system prompt instructions about respecting updates." },
      { key: 'C', text: "Use few-shot examples showing preference updates being respected." },
      { key: 'D', text: "Maintain a structured state object that is updated and injected each turn." },
    ],
    answer: 'D',
    domain: 'Context Management',
  },
  {
    id: 13,
    question:
      "A shipping webhook sends real-time updates but the agent can only respond reactively. How should webhook-triggered shipping status updates be injected into the agent's context?",
    options: [
      { key: 'A', text: "Generate an unsolicited response to the user on each webhook event." },
      { key: 'B', text: "Put shipping status in the system prompt and update it on every request." },
      { key: 'C', text: "Append the status update to the next user message." },
      { key: 'D', text: "Call get_order_status at the start of every turn." },
    ],
    answer: 'C',
    domain: 'Tool Use',
  },
  {
    id: 14,
    question:
      "A home renovation assistant follows its guidelines closely at first but drifts into making unsolicited suggestions after many turns. What is the most likely cause?",
    options: [
      { key: 'A', text: "Attention mechanisms weaken naturally over long conversations." },
      { key: 'B', text: "System prompts are only sent once and not re-evaluated." },
      { key: 'C', text: "System prompts only establish initial behavior." },
      { key: 'D', text: "Accumulated assistant responses dilute system prompt influence." },
    ],
    answer: 'D',
    domain: 'Context Management',
  },
  {
    id: 15,
    question:
      "A venue booking agent receives: 'Book something for my event.' Multiple clarifications are needed (date, venue type, budget). What is the best approach?",
    options: [
      { key: 'A', text: "Show an intake form first before doing anything else." },
      { key: 'B', text: "Ask one compound clarification question covering all unknowns." },
      { key: 'C', text: "State reasonable assumptions, proceed with booking research, and reserve questions for irreversible actions." },
      { key: 'D', text: "Use sensible defaults without stating any assumptions." },
    ],
    answer: 'C',
    domain: 'Ambiguity Handling',
  },
  {
    id: 16,
    question:
      "A policy states that refunds over $500 must be escalated, but agents sometimes bypass this. What is the most reliable way to enforce this constraint?",
    options: [
      { key: 'A', text: "Add few-shot examples showing the correct escalation behavior." },
      { key: 'B', text: "Intercept tool calls and programmatically enforce the escalation rule." },
      { key: 'C', text: "Return an error from the refund tool when the amount exceeds $500." },
      { key: 'D', text: "Strengthen the wording of the escalation rule in the prompt." },
    ],
    answer: 'B',
    domain: 'Agentic Workflows',
  },
  {
    id: 17,
    question:
      "After investigating a billing dispute, the agent must hand off to a human agent. What context should be passed?",
    options: [
      { key: 'A', text: "Original complaint plus tool output excerpts." },
      { key: 'B', text: "Diagnosis and refund amount only." },
      { key: 'C', text: "Structured summary with customer ID, root cause, refund amount, and recommended action." },
      { key: 'D', text: "The full conversation transcript." },
    ],
    answer: 'C',
    domain: 'Agentic Workflows',
  },
  {
    id: 18,
    question:
      "An agent must escalate a complex refund mid-investigation. What is the best approach to ensure continuity for the human agent?",
    options: [
      { key: 'A', text: "Attempt the refund anyway before escalating." },
      { key: 'B', text: "Save conversation history and pass a reference ID to the human agent." },
      { key: 'C', text: "Compile a structured handoff summary before calling escalate_to_human." },
      { key: 'D', text: "Pass only the original customer message to the human agent." },
    ],
    answer: 'C',
    domain: 'Agentic Workflows',
  },
  {
    id: 19,
    question:
      "A customer says 'I want to speak to a real person NOW' at the very start of a support conversation. What should the agent do?",
    options: [
      { key: 'A', text: "Try to help the customer first before escalating." },
      { key: 'B', text: "Ask one targeted clarifying question." },
      { key: 'C', text: "Gather full account context before escalating." },
      { key: 'D', text: "Immediately call escalate_to_human with the conversation context." },
    ],
    answer: 'D',
    domain: 'Agentic Workflows',
  },
  {
    id: 20,
    question:
      "During a multi-step identity verification flow, the agent keeps asking for the customer's name even though it was provided earlier. What is the most likely cause?",
    options: [
      { key: 'A', text: "The prompt is missing memory instructions." },
      { key: 'B', text: "Claude only remembers two turns of history." },
      { key: 'C', text: "Conversation history isn't being passed in subsequent API requests." },
      { key: 'D', text: "The verification tool clears state after each validation step." },
    ],
    answer: 'C',
    domain: 'Agentic Workflows',
  },
  {
    id: 21,
    question:
      "An MCP tool returns generic error strings that all look the same regardless of error type. This prevents the agent from deciding whether to retry or escalate. What is the best fix?",
    options: [
      { key: 'A', text: "Add few-shot examples showing how to handle different error types." },
      { key: 'B', text: "Create a separate analyze_error tool." },
      { key: 'C', text: "Add structured error metadata including category, retryable flag, and cause description." },
      { key: 'D', text: "Automatically retry every error." },
    ],
    answer: 'C',
    domain: 'Tool Use',
  },
  {
    id: 22,
    question:
      "Multiple lookup_order tool calls have filled the context window with large verbose responses. More lookups are needed. What should the agent do before continuing?",
    options: [
      { key: 'A', text: "Move all tool responses to a vector database." },
      { key: 'B', text: "Continue as-is since context will auto-compress." },
      { key: 'C', text: "Keep only return-relevant fields and remove verbose details from existing responses." },
      { key: 'D', text: "Replace structured responses with prose summaries." },
    ],
    answer: 'C',
    domain: 'Tool Use',
  },
  {
    id: 23,
    question:
      "What is the most reliable escalation strategy for determining when a case genuinely requires a human agent?",
    options: [
      { key: 'A', text: "Use a rules engine only." },
      { key: 'B', text: "Escalate when a sentiment threshold is crossed." },
      { key: 'C', text: "Escalate after three consecutive failed tool calls." },
      { key: 'D', text: "Escalate when the user requests a human, policy exceptions are required, or meaningful progress cannot be made." },
    ],
    answer: 'D',
    domain: 'Agentic Workflows',
  },
  {
    id: 30,
    question:
      "Testing reveals that when source documents are missing certain specifications, the model fabricates plausible-sounding values to satisfy your schema's required fields. What schema design change most effectively addresses this hallucination behavior?",
    options: [
      { key: 'A', text: "Add a confidence field and filter low-confidence extractions." },
      { key: 'B', text: "Implement semantic validation against source text." },
      { key: 'C', text: "Instruct the model to only extract explicit information and use placeholders." },
      { key: 'D', text: "Change fields that may not exist from required to optional." },
    ],
    answer: 'D',
    domain: 'Structured Extraction',
  },
  {
    id: 31,
    question:
      "The process_refund tool returns transient technical errors and permanent business errors. What is the most effective way to reduce wasted retries while improving customer-facing response quality?",
    options: [
      { key: 'A', text: "Add a check_refund_eligibility tool before processing refunds." },
      { key: 'B', text: "Return structured error responses with retriable: false for business errors and customer-friendly explanations." },
      { key: 'C', text: "Automatic retries for technical errors only." },
      { key: 'D', text: "Use few-shot examples for parsing error text." },
    ],
    answer: 'B',
    domain: 'Tool Use',
  },
  {
    id: 32,
    question:
      "During a multi-step identity verification flow, the agent forgets earlier answers and asks for the customer's name again. What is the most likely cause?",
    options: [
      { key: 'A', text: "Claude's memory is limited to two turns." },
      { key: 'B', text: "Conversation history isn't being passed in subsequent API requests." },
      { key: 'C', text: "The verification tool clears state after each validation." },
      { key: 'D', text: "The prompt lacks memory instructions." },
    ],
    answer: 'B',
    domain: 'Agentic Workflows',
  },
  {
    id: 33,
    question:
      "Multiple lookup_order calls have filled the context with large tool responses. Before additional lookups, what is the best approach?",
    options: [
      { key: 'A', text: "Move all responses to a vector database." },
      { key: 'B', text: "Proceed without modifying context." },
      { key: 'C', text: "Extract only return-relevant fields and remove verbose details." },
      { key: 'D', text: "Replace structured responses with prose summaries." },
    ],
    answer: 'C',
    domain: 'Tool Use',
  },
  {
    id: 34,
    question:
      "A refund exceeds the agent's authorization limit and must be escalated. What context should be passed to the human agent?",
    options: [
      { key: 'A', text: "Complete transcript and all tool results." },
      { key: 'B', text: "Diagnosis and refund amount only." },
      { key: 'C', text: "Original complaint and duplicate transaction excerpts." },
      { key: 'D', text: "Structured summary with customer ID, root cause, refund amount, and recommended action." },
    ],
    answer: 'D',
    domain: 'Agentic Workflows',
  },
  {
    id: 35,
    question:
      "Monitoring shows 12% of extractions fail Pydantic validation with errors like 'expected float for quantity, got 2 to 3'. Retrying without modification produces identical failures. What is the most effective recovery approach?",
    options: [
      { key: 'A', text: "Pre-process source documents to standardize problematic formats before extraction." },
      { key: 'B', text: "Set temperature to 0 to eliminate output variability and ensure consistent formatting." },
      { key: 'C', text: "Send a follow-up request including the validation error, asking the model to correct its output." },
      { key: 'D', text: "Implement a secondary pipeline using a larger model tier to reprocess documents that fail validation." },
    ],
    answer: 'C',
    domain: 'Structured Extraction',
  },
  {
    id: 36,
    question:
      "A product catalog extraction pipeline encounters items with conflicting specification values across different sections of the same document. What is the most effective approach?",
    options: [
      { key: 'A', text: "Include extraction instructions specifying to prefer values from the detailed specs table when multiple values exist, keeping the single-value schema." },
      { key: 'B', text: "Implement schema validation that rejects results containing conflicting values." },
      { key: 'C', text: "Change to an array field that captures all values found with their source locations." },
      { key: 'D', text: "Add a conflict_detected boolean field to flag ambiguous extractions." },
    ],
    answer: 'A',
    domain: 'Structured Extraction',
  },
  {
    id: 37,
    question:
      "A billing dispute requires manager approval beyond the agent's authority. How should the workflow handle escalation?",
    options: [
      { key: 'A', text: "Attempt the refund first before escalating." },
      { key: 'B', text: "Escalate with only the original customer message." },
      { key: 'C', text: "Store full conversation history and pass a reference ID." },
      { key: 'D', text: "Compile a structured handoff with customer details, order info, and issue summary." },
    ],
    answer: 'D',
    domain: 'Agentic Workflows',
  },
  {
    id: 38,
    question:
      "How should MCP tool errors be communicated back to the agent to enable proper error handling?",
    options: [
      { key: 'A', text: "Return the error message with isError: true in the tool response." },
      { key: 'B', text: "Return a success response with a status field indicating failure." },
      { key: 'C', text: "Throw exceptions that propagate to the orchestration layer." },
      { key: 'D', text: "Log the error and return an empty result." },
    ],
    answer: 'A',
    domain: 'Tool Use',
  },
  {
    id: 39,
    question:
      "A customer wants to speak to a human, but their return is straightforward and can be processed immediately by the agent. What should the agent do?",
    options: [
      { key: 'A', text: "Acknowledge frustration, explain it can be resolved immediately, and offer the choice of completion or escalation." },
      { key: 'B', text: "Ask more clarifying questions first." },
      { key: 'C', text: "Process the refund immediately without asking." },
      { key: 'D', text: "Escalate immediately without attempting resolution." },
    ],
    answer: 'A',
    domain: 'Agentic Workflows',
  },
  {
    id: 40,
    question:
      "After lookup_order returns order details, how does the agent decide whether to call process_refund or escalate_to_human?",
    options: [
      { key: 'A', text: "An orchestration layer decides automatically based on predefined rules." },
      { key: 'B', text: "A pre-planned tool sequence determines the next call." },
      { key: 'C', text: "A decision tree maps order states to actions." },
      { key: 'D', text: "The model reasons over the order details added to context to determine the appropriate next tool." },
    ],
    answer: 'D',
    domain: 'Agentic Workflows',
  },
  {
    id: 41,
    question:
      "How should returning customers be handled when their previous sessions contain stale tool results?",
    options: [
      { key: 'A', text: "Resume with full history and prefer the latest tool results." },
      { key: 'B', text: "Start a new session, inject a structured summary of prior context, then make fresh tool calls." },
      { key: 'C', text: "Remove old tool results but keep the conversation history." },
      { key: 'D', text: "Re-run all previous tools automatically on session resume." },
    ],
    answer: 'B',
    domain: 'Agentic Workflows',
  },
  {
    id: 42,
    question:
      "Which escalation strategy most reliably identifies cases that genuinely require human intervention?",
    options: [
      { key: 'A', text: "Escalate when a sentiment threshold is crossed." },
      { key: 'B', text: "Use a rules engine with predefined escalation conditions." },
      { key: 'C', text: "Escalate when customer requests a human, policy exceptions are needed, or meaningful progress cannot be made." },
      { key: 'D', text: "Escalate after three consecutive failed tool calls." },
    ],
    answer: 'C',
    domain: 'Agentic Workflows',
  },
  {
    id: 43,
    question:
      "A frustrated customer explicitly requests a human before any investigation has occurred. What should the agent do?",
    options: [
      { key: 'A', text: "Gather account context before escalating to provide a better handoff." },
      { key: 'B', text: "Immediately call escalate_to_human with the conversation history." },
      { key: 'C', text: "Ask one targeted clarifying question first." },
      { key: 'D', text: "Try to convince them to continue with the agent." },
    ],
    answer: 'B',
    domain: 'Agentic Workflows',
  },
  {
    id: 44,
    question:
      "Uniform MCP error responses prevent the agent from distinguishing between retryable and permanent errors. What is the best improvement?",
    options: [
      { key: 'A', text: "Add structured metadata including errorCategory, isRetryable flag, and cause description." },
      { key: 'B', text: "Retry everything automatically and let the model figure it out." },
      { key: 'C', text: "Add prompt examples showing how to handle each error type." },
      { key: 'D', text: "Add a separate analyze_error tool to classify errors." },
    ],
    answer: 'A',
    domain: 'Tool Use',
  },
  {
    id: 45,
    question:
      "The agent can verify refund eligibility but cannot process the refund because of a system timeout. What is the best response to the customer?",
    options: [
      { key: 'A', text: "Escalate to a human agent immediately." },
      { key: 'B', text: "Promise the refund will be processed automatically later." },
      { key: 'C', text: "Explain eligibility, acknowledge the system issue, and offer escalation or retry later." },
      { key: 'D', text: "Keep retrying the tool call until it succeeds." },
    ],
    answer: 'C',
    domain: 'Agentic Workflows',
  },
  {
    id: 46,
    question:
      "A saved code exploration session has 3 modified files out of 12 previously analyzed. What best balances efficiency and accuracy when resuming?",
    options: [
      { key: 'A', text: "Start the session over from scratch." },
      { key: 'B', text: "Resume and inform the agent which files changed for targeted re-analysis." },
      { key: 'C', text: "Resume without mentioning any changes and let the agent discover them." },
      { key: 'D', text: "Re-read all 12 files to ensure nothing is missed." },
    ],
    answer: 'B',
    domain: 'Claude Code',
  },
  {
    id: 47,
    question:
      "Which request benefits most from an explicit multi-phase workflow?",
    options: [
      { key: 'A', text: "Rename a function everywhere it appears in the codebase." },
      { key: 'B', text: "Improve error handling across a complex data processing module." },
      { key: 'C', text: "Both tasks benefit equally from a multi-phase approach." },
      { key: 'D', text: "Neither task requires a multi-phase workflow." },
    ],
    answer: 'B',
    domain: 'Claude Code',
  },
  {
    id: 48,
    question:
      "How should an agent decompose the task of adding comprehensive tests to a large legacy codebase?",
    options: [
      { key: 'A', text: "Read all files first to build complete understanding before writing any tests." },
      { key: 'B', text: "Start alphabetically through directories." },
      { key: 'C', text: "Follow a fixed schedule organized by directory." },
      { key: 'D', text: "Map structure with Glob/Grep, prioritize high-impact areas, and revise as dependencies are discovered." },
    ],
    answer: 'D',
    domain: 'Claude Code',
  },
  {
    id: 49,
    question:
      "How should an agent locate the source of an unfamiliar production error message in a large microservices codebase?",
    options: [
      { key: 'A', text: "Read all services systematically from the most likely candidates." },
      { key: 'B', text: "Search error handling imports across all services." },
      { key: 'C', text: "Search common error directories like /errors or /exceptions." },
      { key: 'D', text: "Grep for distinctive text from the error message and inspect matches." },
    ],
    answer: 'D',
    domain: 'Claude Code',
  },
  {
    id: 50,
    question:
      "Which tool should be used to locate all occurrences of eval() across a large codebase?",
    options: [
      { key: 'A', text: "Use Grep to search for 'eval(' across all files." },
      { key: 'B', text: "Use Glob to find filenames containing 'eval' in their name." },
      { key: 'C', text: "Use Bash ls -R | grep eval." },
      { key: 'D', text: "Trace imports manually to find usages." },
    ],
    answer: 'A',
    domain: 'Claude Code',
  },
  {
    id: 53,
    question:
      "Engineers frequently ask the agent to cross-reference code changes with Jira tickets during reviews. What is the most effective approach to enable this?",
    options: [
      { key: 'A', text: "Build a custom MCP server wrapping Jira's API with tools designed specifically for this team's code review workflow." },
      { key: 'B', text: "Integrate an existing Jira MCP server that exposes tickets, comments, and metadata through discoverable tool interfaces." },
      { key: 'C', text: "Export Jira tickets to markdown files in the repository that the agent accesses using the Read tool." },
      { key: 'D', text: "Use the Bash tool with curl to call Jira's REST API, including authentication headers and parsing JSON responses inline." },
    ],
    answer: 'B',
    domain: 'MCP',
  },
  {
    id: 54,
    question:
      "An engineer asks the agent to find all callers of a function before removing it. The function is defined in a core library but also exposed through wrapper modules that rename it. What exploration strategy will most reliably identify all callers?",
    options: [
      { key: 'A', text: "Use Grep to find all files that import from the library or wrapper modules, then read each file to check usage." },
      { key: 'B', text: "Use Grep to search for the function's original name across the codebase." },
      { key: 'C', text: "Search for the function name in project documentation to find integration points." },
      { key: 'D', text: "Read the library and wrapper modules to identify all exposed names, then Grep for each name across the codebase." },
    ],
    answer: 'D',
    domain: 'Claude Code',
  },
  {
    id: 55,
    question:
      "Your productivity agent connects to three MCP servers: an issue tracker, a documentation wiki, and a database explorer. What architectural change best leverages MCP capabilities to reduce exploratory calls and context usage?",
    options: [
      { key: 'A', text: "Add a prepare_investigation tool to each server that accepts a natural language question and returns relevant content summaries." },
      { key: 'B', text: "Expose each server's content catalog as MCP resources — issue summaries, documentation hierarchy, database schemas." },
      { key: 'C', text: "Add an orchestrator that routes questions to a single server based on keywords." },
      { key: 'D', text: "Consolidate all three servers into a unified MCP server with cross-referencing capabilities." },
    ],
    answer: 'B',
    domain: 'MCP',
  },
  {
    id: 56,
    question:
      "Your agent has analyzed a complex service module. A developer wants to compare two testing strategies independently before committing to one. How should you manage the sessions?",
    options: [
      { key: 'A', text: "Export the analysis session's key findings to a file, then create two new sessions that reference this file." },
      { key: 'B', text: "Resume the analysis session with fork_session enabled, creating a separate branch for each testing strategy." },
      { key: 'C', text: "Continue in the original session, developing end-to-end tests first, then snapshot tests sequentially." },
      { key: 'D', text: "Start two fresh sessions, having each re-read the relevant source files before beginning." },
    ],
    answer: 'B',
    domain: 'Claude Code',
  },
  {
    id: 57,
    question:
      "You've configured your Claude agent with three MCP servers: one for git operations, one for Jira, and one for documentation search. How does the agent access tools across these servers?",
    options: [
      { key: 'A', text: "The agent queries each server sequentially to determine which handles each tool." },
      { key: 'B', text: "The agent automatically selects the most relevant server and loads only that server's tools." },
      { key: 'C', text: "Tools from all configured MCP servers are discovered at connection time and available simultaneously to the agent." },
      { key: 'D', text: "You must specify which MCP server to use for each turn, and the agent can only access one server's tools at a time." },
    ],
    answer: 'C',
    domain: 'MCP',
  },
  {
    id: 58,
    question:
      "An engineer previously analyzed a legacy authentication module and identified two distinct refactoring approaches. Today they want to explore both approaches in depth before deciding. What is the most effective way to structure this?",
    options: [
      { key: 'A', text: "Use fork_session to create two branches from yesterday's analysis, exploring one approach in each fork." },
      { key: 'B', text: "Resume yesterday's session and explore both approaches sequentially within the same thread." },
      { key: 'C', text: "Resume yesterday's session to explore the first approach, then start a new session for the second, manually recreating context." },
      { key: 'D', text: "Start two fresh sessions, manually providing a summary of yesterday's findings to establish context." },
    ],
    answer: 'A',
    domain: 'Claude Code',
  },
  {
    id: 59,
    question:
      "An engineer asks the agent to understand how the caching layer works before adding a new cache invalidation trigger. What is the most effective next step?",
    options: [
      { key: 'A', text: "Use Grep to search for 'invalidate' and 'expire' patterns across all files, then read only those specific line ranges." },
      { key: 'B', text: "Use the Read tool to sequentially load all files, building complete understanding across the full implementation." },
      { key: 'C', text: "Use Glob to find files matching common caching patterns and prioritize the largest files first." },
      { key: 'D', text: "Analyze imports and class hierarchies to identify the base cache class, read that file to understand the interface, then trace specific invalidation implementations." },
    ],
    answer: 'D',
    domain: 'Claude Code',
  },
  {
    id: 60,
    question:
      "After adding an MCP server with specialized code refactoring tools (extract_function, rename_variable, inline_function), you notice the agent still uses basic text manipulation. What is the most effective way to improve adoption?",
    options: [
      { key: 'A', text: "Implement a request classifier that detects refactoring intent and automatically routes those requests to the MCP server." },
      { key: 'B', text: "Accept this as expected behavior since simpler tools like sed are more predictable." },
      { key: 'C', text: "Enhance the MCP tool descriptions to explain when each tool is preferable and clarify expected inputs and outputs." },
      { key: 'D', text: "Remove the Write tool from the agent's configuration for refactoring sessions so it must use MCP tools." },
    ],
    answer: 'C',
    domain: 'MCP',
  },
  {
    id: 61,
    question:
      "Monitoring shows 12% of extractions fail Pydantic validation with errors like 'expected float for quantity, got 2 to 3'. Retrying without modification produces identical failures. What is the most effective recovery approach?",
    options: [
      { key: 'A', text: "Set temperature to 0 to eliminate output variability." },
      { key: 'B', text: "Pre-process source documents to standardize problematic formats before extraction." },
      { key: 'C', text: "Send a follow-up request including the validation error, asking the model to correct its output." },
      { key: 'D', text: "Implement a secondary pipeline using a larger model tier to reprocess failed documents." },
    ],
    answer: 'C',
    domain: 'Structured Extraction',
  },
  {
    id: 62,
    question:
      "Your extraction pipeline occasionally receives responses that don't parse as valid JSON. What is the most reliable approach to ensure valid schema-compliant structured data?",
    options: [
      { key: 'A', text: "Define a tool with a JSON schema and use tool_use to force structured output." },
      { key: 'B', text: "Use regex extraction as a fallback parser." },
      { key: 'C', text: "Retry the request on every parse error." },
      { key: 'D', text: "Add explicit formatting instructions to the prompt." },
    ],
    answer: 'A',
    domain: 'Structured Extraction',
  },
  {
    id: 63,
    question:
      "Multiple extraction tools exist and tool_choice='auto' sometimes returns conversational text instead of calling a tool. What is the most effective fix?",
    options: [
      { key: 'A', text: "Classify the input type first, then force the identified tool." },
      { key: 'B', text: "Set tool_choice: 'any' with all extraction tools defined." },
      { key: 'C', text: "Consolidate all tools into one unified schema." },
      { key: 'D', text: "Keep auto and strengthen the system prompt instructions." },
    ],
    answer: 'B',
    domain: 'Structured Extraction',
  },
  {
    id: 64,
    question:
      "Contracts contain amendments and the model inconsistently extracts either original or amended values. What is the most effective approach?",
    options: [
      { key: 'A', text: "Always extract the latest amendment value." },
      { key: 'B', text: "Flag ambiguous extractions for manual review." },
      { key: 'C', text: "Redesign the schema to capture multiple values with source location and effective date." },
      { key: 'D', text: "Remove superseded sections from documents before extraction." },
    ],
    answer: 'C',
    domain: 'Structured Extraction',
  },
  {
    id: 65,
    question:
      "300 of 10,000 documents fail with context_length_exceeded errors. What is the most cost-effective approach to handle these failures?",
    options: [
      { key: 'A', text: "Reprocess all 10,000 documents with a larger context model." },
      { key: 'B', text: "Increase max_tokens for the entire batch." },
      { key: 'C', text: "Reprocess the entire batch with prompt caching enabled." },
      { key: 'D', text: "Resubmit only the 300 failed documents after chunking them into smaller sections." },
    ],
    answer: 'D',
    domain: 'Structured Extraction',
  },
  {
    id: 66,
    question:
      "How do you ensure extract_metadata runs before lookup_citations when enrichment depends on extracted metadata?",
    options: [
      { key: 'A', text: "Reorder tools in the tool list and use tool_choice: 'auto'." },
      { key: 'B', text: "Use tool_choice: 'any' with prompt instructions about ordering." },
      { key: 'C', text: "Force extract_metadata first, then perform enrichment in subsequent turns after receiving the metadata." },
      { key: 'D', text: "Force extract_metadata for every API call regardless of context." },
    ],
    answer: 'C',
    domain: 'Tool Use',
  },
];
