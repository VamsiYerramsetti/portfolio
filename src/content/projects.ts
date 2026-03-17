export type Project = {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  highlights: string[];
  media?: string[];
};

// 👉 Edit these projects. Keep it high-level (no sensitive info).
export const projects: Project[] = [
  {
    slug: "code-compass-ai",
    title: "Code Compass AI",
    summary: "The secure assistant for Databricks notebooks with deep cross-notebook understanding across your entire repository that helps teams understand, search, and optimize code with context-aware, persona-based explanations.",
    tags: ["GenAI", "RAG", "Databricks", "Azure OpenAI", "LangChain", "Python", "Chroma Vector DB", "Semantic Search", "DAPT25 vitality innovation winner"],
    highlights: [
      "Semantic search and repository-wide retrieval",
      "Persona-based responses for all skill levels",
      "Privacy-first design—no production data access",
      "Markdown-to-HTML rendering with copyable code blocks",
      "Awarded most viable innovation (internal challenge)",
    ],
      media: [
        "/project-media/code_compass.drawio.png||/project-media/code-compass-ui-screenshot.png",
        "https://www.linkedin.com/posts/vamsi-y_marathon-innovation-agenticai-ugcPost-7386053433939881985--RC7"
      ],
  },
  {
    slug: "north-american-sustainability-platform",
    title: "North American Sustainability Platform",
    summary: "We revamped and deployed a data‑driven, automated carbon‑score calculation system that transformed the Rabo North American Agrifinance team’s manual workflow for 100+ farmers into a predictive, insight‑focused process for sustainable loan sanctioning.",
    tags: ["Power Platform", "Compliance", "Automation", "Sustainability", "Analytics Engineering", "ETL Pipelines"],
    highlights: [
      "Automated a 30-minute manual workflow down to ~5 minutes",
      "Eliminated 350+ hours of manual effort across 100+ clients",
      "Delivered full auditability and compliance-ready scoring outputs",
      "Built monitoring dashboards for pipeline health and anomaly detection",
      "Role: Solution architect and ML engineer",
    ],
    media: [],
  },
  {
    slug: "automated-loan-prospecting-dashboard",
    title: "Automated Loan Prospecting Dashboard",
    summary: "Automated loan prospect identification for the Dutch startup & scale-up market by unifying internal banking signals with external startup intelligence, enabling predictive lead prioritization and faster, data-driven outreach via a Power BI dashboard + front-end app.",
    tags: ["Custom Loan Prospecting", "Big Data", "Power BI", "Azure", "Data Integration", "Automation", "Lead Scoring", "Risk Analytics", "DSFC 2025"],
    highlights: [
      "Replaced fragmented manual prospecting (Salesforce/Siebel/Chronos/news) with a unified prospecting view",
      "Integrated 7+ heterogeneous sources (internal + external APIs) into a single refreshable pipeline",
      "Delivered a user-controlled Azure architecture: Web App → Storage → Databricks ETL → SQL → Power BI",
      "Presented live at Data Science in Finance Conference (DSFC 2025)",
      "Role: Product Owner & ML Engineer",
    ],
    media: [
      "/project-media/LPscreenshot1.png||/project-media/LPscreenshot2.png",
      "https://www.linkedin.com/posts/vamsi-y_datascience-financeinnovation-rabobank-activity-7315453093981106177-fHk6"
    ],
  },
  {
    slug: "atia-tongue-image-analysis",
    title: "ATIA — Automated Tongue Image Analysis",
    summary: "Automated tongue image analysis for autoimmune disease screening (chronic gastritis use case), combining supervised ML classifiers with ResNet‑50 transfer learning for strong performance on limited medical image data.",
    tags: ["Machine Learning", "Deep Learning", "Computer Vision", "Medical AI", "Transfer Learning", "ROC/AUC"],
    highlights: [
      "Built an end-to-end diagnostic pipeline spanning segmentation, feature engineering, modeling, and rigorous evaluation",
      "Benchmarked supervised ML classifiers (LogReg/SVM/RF/KNN) as strong baselines under class imbalance",
      "Showed transfer learning outperforming classical ML on limited medical images; SVC/RF remained viable lightweight alternatives",
      "Achieved a 9/10 thesis grade (top 2% percentile)",
      "Positioned for mobile screening and multi-disease extension",
    ],
    media: [
      "/project-media/BSc_Thesis_ATIA_Poster_Radboud.pdf",
      "https://www.linkedin.com/posts/vamsi-y_machinelearning-deeplearning-research-activity-6973918596053745664-fNvN"
    ],
  },
  {
    slug: "uk-accident-prone-zone-detector",
    title: "Identifying Accident‑Prone Areas in the United Kingdom",
    summary: "Data-mining project analyzing 1.6M+ UK accident records and national traffic-flow statistics to detect high-risk road locations using DBSCAN and a custom K-means density-ranking variant.",
    tags: ["Python", "Geospatial Analytics", "Clustering", "DBSCAN", "K-means", "Data Mining"],
    highlights: [
      "Analyzed 1.6M+ UK accident records merged with traffic-flow statistics",
      "Weighted risk formulation: accidents ÷ traffic flow to surface true hotspots",
      "DBSCAN and a custom density-ranking K-means method converged on 7 stable hotspots",
      "Achieved a 9/10 project grade",
    ],
    media: ["/project-media/Data Mining Final Report-G4.pdf"],
  },
  {
    slug: "organoid-on-chip-immunotherapy",
    title: "Organoid‑on‑Chip for Immunotherapy Testing",
    summary: "Honours project designing an in vitro lung squamous‑cell tumouroid‑on‑chip system with automated microscopy and computational analysis to evaluate drug and immune‑cell responses under controlled microfluidic conditions.",
    tags: ["Microfluidics", "Automated Microscopy", "Python", "Data Pipeline", "Immunotherapy"],
    highlights: [
      "Proposed and defended a full tumour‑on‑chip + analytics workflow",
      "Emphasis on modern data workflows, microfluidics, and automation",
    ],
    media: [],
  },
];
