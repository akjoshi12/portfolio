// Single source of truth for all site copy.
// Optional fields (repoUrl, demoUrl, facts) hide their UI when absent — never fill with "#" or "TODO".
// Every number in `facts` must come from the REAL METRICS list in the v2 brief.

export type Status = "Shipped" | "In progress" | "Exploration";

export interface Fact {
  value: string;
  label: string;
}

export interface Project {
  slug: string;
  title: string;
  kind: string;
  summary: string;
  status: Status;
  stack: string[];
  facts?: Fact[];
  repoUrl?: string;
  demoUrl?: string;
  // Small animated visual on the home card; each one depicts something real about the project.
  viz?: "strategies" | "graph" | "tests" | "readability";
}

export interface EarlierProject {
  title: string;
  summary: string;
  stack: string[];
  url?: string;
}

export interface Role {
  title: string;
  org: string;
  place?: string;
  when: string;
  detail?: string;
  secondary?: boolean;
}

export const site = {
  name: "Atri Joshi",
  url: "https://atrijoshi.vercel.app",
  title: "Atri Joshi — Data & AI Engineer",
  description:
    "Data + AI engineer in Toronto. I build data pipelines and LLM systems — RAG, agents, evaluation harnesses — and measure whether they actually work.",
  location: "Toronto",
  status: "Open to roles",
  headline: "I build data and LLM systems — and measure whether they actually work.",
  lede:
    "Two years of data engineering (PySpark, SQL, Databricks, Snowflake) underneath LLM systems: RAG, agents, and the evaluation harnesses that keep them honest — built local-first on Apple Silicon.",
  email: "atrijoshi12@gmail.com",
  linkedin: "https://www.linkedin.com/in/atrijoshi/",
  github: "https://github.com/akjoshi12",
  resume: "/resume.pdf",
};

export const featured: Project[] = [
  {
    slug: "aura",
    title: "AURA v2",
    kind: "Emotional-support RAG system",
    summary:
      "Strategy-aware support chatbot built on ESConv's 8-strategy taxonomy. A strategy labeler unlocks large unlabeled dialogue corpora; a held-out gold set and adversarial / clean / messy buckets keep evaluation honest.",
    status: "In progress",
    stack: ["Python", "RAG", "LLM labeling", "Cohen's κ", "Groq", "Llama-3.1-8B"],
    facts: [
      { value: "8", label: "support strategies" },
      { value: "4", label: "source datasets" },
      { value: "300", label: "turn gold set" },
    ],
    repoUrl: "https://github.com/akjoshi12/AURA-V2",
    viz: "strategies",
  },
  {
    slug: "resume-factory",
    title: "Resume Factory v2",
    kind: "Human-in-the-loop document agent",
    summary:
      "Local-first LangGraph pipeline with two human review gates and a SQLite checkpointer. Every rephrased bullet is verified against its source — no invented facts — then compiled to one page of LaTeX and scored with a transparent ATS-match proxy.",
    status: "Shipped",
    stack: ["Python", "LangGraph", "Reflex", "SQLite", "LaTeX", "Tailscale"],
    repoUrl: "https://github.com/akjoshi12/resume-factory",
    viz: "graph",
  },
  {
    slug: "redline",
    title: "Project Redline",
    kind: "Local LLM stress-test & benchmark harness",
    summary:
      "Three-phase hardware-saturation and EvalPlus-based benchmark harness for a ~27B local model on an M4 Max. Every phase is gated by green tests — which is how a corrupted timer and a silent validation fallback got caught.",
    status: "In progress",
    stack: ["Python", "LM Studio", "EvalPlus", "powermetrics", "pytest"],
    facts: [
      { value: "23", label: "passing tests · Phase 1" },
      { value: "53×", label: "discrepancy caught" },
    ],
    repoUrl: "https://github.com/akjoshi12/redline",
    viz: "tests",
  },
  {
    slug: "minuteminders",
    title: "MinuteMinders",
    kind: "AI meeting assistant · team lead",
    summary:
      "Audio → diarized transcript → summary and action items. Led an 8-engineer team; shipped with Jenkins CI, SonarQube quality gates and Prometheus monitoring.",
    status: "Shipped",
    stack: ["Whisper", "Pyannote", "Mistral API", "FastAPI", "React", "Jenkins"],
    facts: [
      { value: "0.0746", label: "WER" },
      { value: "0.2932", label: "CER" },
      { value: "8", label: "engineers led" },
    ],
    demoUrl: "https://minuteminders.web.app/",
    viz: "readability",
  },
];

// Hero readout — every value here must also appear in REAL METRICS.
export const readout: { key: string; value: string }[] = [
  { key: "aura.strategies", value: "8" },
  { key: "aura.gold_set", value: "300 turns" },
  { key: "aura.source_corpus", value: "500k turns" },
  { key: "redline.phase_1", value: "23 tests passing" },
  { key: "redline.discrepancy", value: "53× caught" },
  { key: "minuteminders.wer", value: "0.0746" },
  { key: "minuteminders.fre", value: "50.53 vs 63.55" },
];

// ESConv support-strategy taxonomy (Liu et al., 2021) — AURA's label space.
export const esconvStrategies = [
  "Question",
  "Restatement",
  "Reflection of feelings",
  "Self-disclosure",
  "Affirmation",
  "Suggestions",
  "Information",
  "Others",
];

export const earlier: EarlierProject[] = [
  { title: "Multimodal Sentiment", summary: "Text + image embeddings for sentiment on Yelp reviews.", stack: ["Multimodal embeddings", "NLP"] },
  { title: "GCP Recommender", summary: "Recommendation pipeline with Spark on Dataproc.", stack: ["PySpark", "GCP Dataproc"] },
  { title: "Explainable Pricing", summary: "Price model where every prediction ships with a SHAP explanation.", stack: ["XGBoost", "SHAP"] },
  { title: "Third Eye", summary: "Computer-vision mobile app that turns a camera feed into spoken guidance.", stack: ["Computer vision", "Mobile"] },
];

export const principles = [
  {
    title: "Gate every phase with a test",
    body: "Nothing moves to the next phase until the suite is green.",
    proof: "Redline Phase 1 closed on 23 passing tests.",
    slug: "redline",
  },
  {
    title: "Measure before claiming",
    body: "Numbers get validated against a second source before they go anywhere.",
    proof: "Redline's validation caught a silent fallback masking a 53× discrepancy.",
    slug: "redline",
  },
  {
    title: "No new facts",
    body: "Generation is constrained to what's already true, and the constraint is enforced in code.",
    proof: "Resume Factory may rephrase bullets — it can't introduce facts, numbers or skills.",
    slug: "resume-factory",
  },
];

export const stack = [
  { depth: "Core", items: ["Python", "SQL", "RAG", "LangChain / LangGraph", "LLM evaluation", "Local inference (LM Studio, MLX)"] },
  { depth: "Working", items: ["PySpark", "Databricks", "scikit-learn", "XGBoost / SHAP", "FastAPI", "Reflex", "ChromaDB"] },
  { depth: "Familiar", items: ["Snowflake", "Azure Data Factory", "GCP / Dataproc", "Power BI (DAX)", "R"] },
];

export const experience: Role[] = [
  { title: "Shift Supervisor", org: "Paragon Protection", when: "Apr 2026 — Present", secondary: true },
  { title: "AI Research Intern", org: "Toronto Business College", place: "Toronto", when: "Jan 2025 — Apr 2025" },
  {
    title: "Associate Consultant",
    org: "Teklink Software",
    place: "Hyderabad",
    when: "Jul 2022 — Aug 2023",
    detail: "Data pipelines and ETL, SQL validation, bronze / silver / gold data-quality tiering.",
  },
  {
    title: "Research Intern",
    org: "Tech Mahindra",
    place: "Pune",
    when: "Jun 2021 — Jun 2022",
    detail: "SQL, Python and Flask reporting dashboards; client-facing meetings.",
  },
];

export const education: Role[] = [
  { title: "PG Diploma, AI & Data Science", org: "Loyalist College", place: "Toronto", when: "Sep 2023 — Apr 2025" },
  { title: "B.Tech, Computer Science", org: "Rashtriya Raksha University", when: "Aug 2018 — Jun 2022" },
];

// ---------- Case studies (/work/<slug>) ----------
// Optional sections (measured, didntWork) are omitted from the page when absent.

export interface DiagramNode {
  label: string;
  sub?: string;
}

export interface Diagram {
  title: string;
  nodes: DiagramNode[];
  // Feedback edges drawn back from node `from` to node `to` (indices into nodes).
  loops?: { from: number; to: number; label: string }[];
}

export interface CaseStudy {
  problem: string;
  approach: string[];
  diagram: Diagram;
  decisions: { title: string; body: string }[];
  measured?: { facts?: Fact[]; notes: string[] };
  didntWork?: string[];
  next?: string;
}

export const caseStudies: Record<string, CaseStudy> = {
  aura: {
    problem:
      "Support chatbots can sound warm while doing the wrong thing — reassuring when the person needs a question, advising when they need to be heard. AURA v2 makes the support strategy explicit. The catch: most large emotional-support datasets, including my own 500k-turn corpus, have no strategy labels at all.",
    approach: [
      "Adopt ESConv's 8 support strategies as the single label space for retrieval, generation and evaluation.",
      "Unify ESConv, AugESC, ExTES and nart-100k-synthetic into one JSONL schema, tiered Gold / Silver / Bronze by provenance.",
      "Balance across 10 topic categories with a ≤15% cap per topic, so no single theme dominates retrieval.",
      "Train a strategy labeler on ESConv's human annotations, then label the unlabeled sources with two LLMs and measure their agreement with Cohen's κ.",
    ],
    diagram: {
      title: "AURA v2 pipeline",
      nodes: [
        { label: "Corpus tiers", sub: "Gold · Silver · Bronze" },
        { label: "Strategy labeler", sub: "dual-LLM · Cohen's κ" },
        { label: "Retrieval", sub: "strategy-aware" },
        { label: "Generation", sub: "LLM response" },
        { label: "Eval buckets", sub: "adversarial/clean/messy" },
      ],
      loops: [{ from: 4, to: 2, label: "iterate" }],
    },
    decisions: [
      {
        title: "Quantized large model over a fine-tuned small one",
        body: "In v1 (2024) I chose a quantized larger model over a fine-tuned smaller one because it handled multi-turn context better.",
      },
      {
        title: "No Graph RAG",
        body: "Considered and rejected in v1: the structure of the corpus didn't suit a graph-based retriever.",
      },
      {
        title: "Label agreement before label volume",
        body: "Two LLM labelers plus Cohen's κ makes disagreement visible instead of silently trusting a single labeler.",
      },
    ],
    measured: {
      facts: [
        { value: "8", label: "support strategies" },
        { value: "4", label: "source datasets" },
        { value: "10", label: "topic categories" },
        { value: "≤15%", label: "per-topic cap" },
        { value: "300", label: "turn gold set" },
        { value: "500k", label: "turn source corpus" },
      ],
      notes: [
        "A 300-turn manually labeled gold set is held out for validating the labeler — it is never used for training.",
        "Evaluation inputs are split into adversarial, clean and messy buckets so failures can be attributed, not averaged away.",
        "No end-to-end quality score yet. It will appear here once the eval harness has produced one.",
      ],
    },
    didntWork: [
      "Fine-tuning (v1): measured quality degraded after fine-tuning, so I abandoned it.",
      "Graph RAG (v1): rejected — the corpus structure didn't fit it.",
      "Using the 500k-turn corpus as-is: without strategy labels it couldn't train or evaluate a strategy-aware system. That gap is why the labeler exists.",
    ],
    next: "Finish the evaluation harness, then ship a hosted demo on Groq (Llama-3.1-8B).",
  },

  "resume-factory": {
    problem:
      "Tailoring a résumé per posting is slow, and an unconstrained LLM will happily invent a skill or a number to fit the job description. LaTeX adds a second failure mode: one extra bullet and the page spills to two.",
    approach: [
      "A quick scan before generating anything: match %, an Apply / Stretch / Skip verdict, strengths, gaps and missing tools.",
      "A local-first LangGraph state machine — 12 nodes, interrupt() at two human review gates (résumé, then cover letter).",
      "The model may only select and rephrase bullets from master_resume.json; a claim verifier rejects any number, named entity or tool absent from the source.",
      "A hard one-page constraint: render Jinja → LaTeX → PDF, measure, and trim deterministically — no model call — until it fits.",
      "A SQLite checkpointer, so a run paused at review survives restarts and resumes days later exactly where it stopped.",
    ],
    diagram: {
      title: "Resume Factory v2 pipeline",
      nodes: [
        { label: "Quick scan", sub: "Apply / Stretch / Skip" },
        { label: "Tailor", sub: "select + rephrase" },
        { label: "Verify claims", sub: "no invented facts" },
        { label: "Render + score", sub: "one page · ATS match" },
        { label: "Human review", sub: "interrupt() · SQLite" },
        { label: "Cover letter", sub: "same checks · 2nd gate" },
      ],
      loops: [
        { from: 2, to: 1, label: "violation → retry ≤3×" },
        { from: 4, to: 1, label: "reject + feedback" },
      ],
    },
    decisions: [
      {
        title: "Constrain the model, don't just prompt it",
        body: "Selection from a fixed pool plus a claim verifier turns \"don't make things up\" from a request into a property of the system. If retries run out, the text falls back to the approved source and the violations are shown.",
      },
      {
        title: "Humans at the gates, not after the fact",
        body: "interrupt() pauses the graph where judgment matters; the checkpointer means pausing costs nothing.",
      },
      {
        title: "Proxy scores with their working shown",
        body: "No applicant tracking system emits a score, so the ATS match is an explicit proxy: 45% posting tools, 35% requirement keywords, 10% job title, 10% clean parse — and tools you've never used cap it.",
      },
      {
        title: "Private by default, reachable anywhere",
        body: "The app stays on the Mac, kept alive by launchd and reached over Tailscale. Local LM Studio model first, with an optional OpenAI-compatible gateway — no résumé data leaves the machine unless you choose it.",
      },
    ],
    measured: {
      notes: [
        "Page count is measured after every compile — the one-page rule is checked, not assumed.",
        "Parse-back: text is extracted from the generated PDF with two different extractors and checked for name, employers, dates and schools.",
        "Graph tests run with a stubbed model against real LaTeX.",
      ],
    },
  },

  redline: {
    problem:
      "Claims about how a local model performs under load are easy to make and hard to trust. Before running an evolutionary code-solving swarm on a local ~27B model, I needed to characterize the serving stack — with every claim traceable to logged data.",
    approach: [
      "Three phases: saturate the hardware, characterize the serving stack, then reuse the harness for an EvalPlus-based evolutionary code-solving benchmark.",
      "Target: a ~27B Qwen-based model served by LM Studio on an M4 Max.",
      "System telemetry from powermetrics, logged alongside model output as JSONL.",
      "Each phase is gated: the next one doesn't start until the test run is green.",
    ],
    diagram: {
      title: "Redline harness",
      nodes: [
        { label: "Workload", sub: "saturation · EvalPlus" },
        { label: "LM Studio", sub: "~27B · M4 Max" },
        { label: "Telemetry", sub: "powermetrics" },
        { label: "JSONL log", sub: "every run recorded" },
        { label: "Validation", sub: "cross-check" },
        { label: "Test gate", sub: "green → next phase" },
      ],
      loops: [{ from: 5, to: 0, label: "next phase" }],
    },
    decisions: [
      {
        title: "Gate phases on tests",
        body: "A green run is the only way forward — results from an unvalidated harness don't count.",
      },
      {
        title: "Build on EvalPlus",
        body: "The evolutionary code-solving benchmark is built on EvalPlus, an established code-evaluation harness.",
      },
      {
        title: "Log everything as JSONL",
        body: "Every claim traces back to a logged record, so a number can always be re-derived.",
      },
    ],
    measured: {
      facts: [
        { value: "23", label: "passing tests · Phase 1" },
        { value: "53×", label: "discrepancy caught" },
      ],
      notes: [
        "Phase 1 is complete.",
        "Benchmark results are not shown yet — real measurement runs are in progress, and nothing goes here until they finish.",
      ],
    },
    didntWork: [
      "Timing: reasoning-token emissions corrupted the timer, so early latency numbers were wrong.",
      "Telemetry: a broken permissions rule made GPU and thermal readings come back null.",
      "Validation: a silent fallback was masking a 53× discrepancy. The gate caught it before any result was reported.",
    ],
    next: "Complete the real measurement runs, then publish results — only measured numbers.",
  },

  minuteminders: {
    problem:
      "Meetings produce hours of audio and very few written action items. MinuteMinders turns a recording into a speaker-labeled transcript, a summary and a list of action items.",
    approach: [
      "Speech-to-text with Whisper; speaker diarization with Pyannote.",
      "Summaries and action items from the Mistral API via prompt engineering, with spaCy for text processing.",
      "FastAPI + MySQL backend and a React / Vite frontend.",
      "Jenkins CI triggered by GitHub webhooks, SonarQube quality gates and Prometheus monitoring.",
      "Led an 8-engineer team across roughly 15.4k lines of code.",
    ],
    diagram: {
      title: "MinuteMinders pipeline",
      nodes: [
        { label: "Audio", sub: "meeting recording" },
        { label: "Whisper", sub: "speech-to-text" },
        { label: "Pyannote", sub: "diarization" },
        { label: "Mistral API", sub: "summary + actions" },
        { label: "FastAPI", sub: "MySQL" },
        { label: "React UI", sub: "Vite" },
      ],
    },
    decisions: [
      {
        title: "Diarization as its own stage",
        body: "Pyannote diarization runs as its own stage after Whisper, so the transcript records who said what.",
      },
      {
        title: "Prompting a hosted model instead of training one",
        body: "Summaries and action items come from the Mistral API through prompt engineering.",
      },
      {
        title: "Quality gates in CI",
        body: "With eight people committing, SonarQube gates and Prometheus monitoring kept the codebase and the service observable.",
      },
    ],
    measured: {
      facts: [
        { value: "0.0746", label: "WER" },
        { value: "0.2932", label: "CER" },
        { value: "50.53", label: "Flesch Reading Ease" },
        { value: "63.55", label: "FRE · Copilot baseline" },
        { value: "8", label: "engineers" },
        { value: "~15.4k", label: "lines of code" },
      ],
      notes: [
        "Transcription accuracy is reported as word and character error rate.",
        "Readability of summaries was scored with Flesch Reading Ease against a Copilot baseline.",
      ],
    },
    didntWork: [
      "Readability: our summaries scored 50.53 on Flesch Reading Ease versus 63.55 for the Copilot baseline — the baseline was more readable.",
    ],
    next: "Shipped and live.",
  },
};
