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
  },
  {
    slug: "resume-factory",
    title: "Resume Factory v2",
    kind: "Human-in-the-loop document agent",
    summary:
      "Local-first LangGraph state machine with interrupt() review gates and a SQLite checkpointer. The model may select and rephrase — never add facts — and a compile → measure → retry loop enforces one page of LaTeX.",
    status: "Shipped",
    stack: ["Python", "LangGraph", "Reflex", "SQLite", "LaTeX", "Tailscale"],
    repoUrl: "https://github.com/akjoshi12/resume-factory",
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
  },
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
