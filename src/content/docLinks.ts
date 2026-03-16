export type OfficialDocLink = {
  label: string;
  url: string;
};

const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "");

// Official docs / canonical project docs (no Wikipedia).
// Keep this intentionally small: only link terms that a general audience may not recognize.
const LINKS: Record<string, OfficialDocLink> = {
  // Core site stack
  nextjs: { label: "Next.js", url: "https://nextjs.org/docs" },
  typescript: { label: "TypeScript", url: "https://www.typescriptlang.org/docs/" },
  docker: { label: "Docker", url: "https://docs.docker.com/" },
  dockercompose: { label: "Docker Compose", url: "https://docs.docker.com/compose/" },
  framermotion: { label: "Framer Motion", url: "https://www.framer.com/motion/" },
  github: { label: "GitHub", url: "https://docs.github.com/" },
  githubpages: { label: "GitHub Pages", url: "https://docs.github.com/pages" },

  // Data / ML stack mentioned across projects
  python: { label: "Python", url: "https://docs.python.org/3/" },
  azure: { label: "Azure", url: "https://learn.microsoft.com/azure/" },
  azureopenai: { label: "Azure OpenAI", url: "https://learn.microsoft.com/azure/ai-services/openai/" },
  azureopenaicognitivesearch: {
    label: "Azure OpenAI & Cognitive Search",
    url: "https://learn.microsoft.com/azure/search/",
  },
  databricks: { label: "Databricks", url: "https://docs.databricks.com/" },
  langchain: { label: "LangChain", url: "https://python.langchain.com/docs/" },
  chromavectordb: { label: "Chroma Vector DB", url: "https://docs.trychroma.com/" },
  semanticsearch: { label: "Semantic Search", url: "https://learn.microsoft.com/azure/search/semantic-search-overview" },
  powerbi: { label: "Power BI", url: "https://learn.microsoft.com/power-bi/" },
  powerautomate: { label: "Power Automate", url: "https://learn.microsoft.com/power-automate/" },
  powerplatform: { label: "Power Platform", url: "https://learn.microsoft.com/power-platform/" },
  airflow: { label: "Apache Airflow", url: "https://airflow.apache.org/docs/" },
  sql: { label: "SQL (PostgreSQL)", url: "https://www.postgresql.org/docs/current/sql.html" },
  git: { label: "Git", url: "https://git-scm.com/docs" },
  cicdpipelines: { label: "CI/CD pipelines", url: "https://docs.github.com/actions" },
  tensorflow: { label: "TensorFlow", url: "https://www.tensorflow.org/api_docs" },
  huggingface: { label: "Hugging Face", url: "https://huggingface.co/docs" },

  // ML/DS methods & acronyms (only where they appear on-page)
  rag: { label: "RAG (Retrieval-Augmented Generation)", url: "https://python.langchain.com/docs/tutorials/rag/" },
  rags: { label: "RAGs (Retrieval-Augmented Generation)", url: "https://python.langchain.com/docs/tutorials/rag/" },
  dbscan: { label: "DBSCAN", url: "https://scikit-learn.org/stable/modules/generated/sklearn.cluster.DBSCAN.html" },
  kmeans: { label: "K-means", url: "https://scikit-learn.org/stable/modules/generated/sklearn.cluster.KMeans.html" },
  gridsearchcv: { label: "GridSearchCV", url: "https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.GridSearchCV.html" },
  resnet50: { label: "ResNet-50", url: "https://keras.io/api/applications/resnet/#resnet50-function" },
  rocauc: { label: "ROC/AUC", url: "https://scikit-learn.org/stable/modules/model_evaluation.html#roc-metrics" },
  grabcut: { label: "GrabCut", url: "https://docs.opencv.org/4.x/d8/d83/tutorial_py_grabcut.html" },
  adam: { label: "Adam optimizer", url: "https://keras.io/api/optimizers/adam/" },

  // Conferences / events referenced in project copy
  dsfc: { label: "DSFC (Data Science in Finance Conference)", url: "https://www.dsfc.nl/" },
  dsfc2025: { label: "DSFC 2025", url: "https://www.dsfc.nl/" },
  datascienceinfinanceconference: { label: "Data Science in Finance Conference", url: "https://www.dsfc.nl/" },

  // Governance / compliance terms referenced in project pages
  gdpr: { label: "GDPR", url: "https://eur-lex.europa.eu/eli/reg/2016/679/oj" },
  entraid: { label: "Microsoft Entra ID", url: "https://learn.microsoft.com/entra/identity/" },

  // Medical acronyms referenced in case studies
  egd: { label: "EGD (Upper GI endoscopy)", url: "https://www.niddk.nih.gov/health-information/diagnostic-tests/upper-gi-endoscopy" },
  nsclc: { label: "NSCLC (Non-small cell lung cancer)", url: "https://www.cancer.gov/types/lung/patient/non-small-cell-lung-treatment-pdq" },

  // Work timeline / process
  scrum: { label: "Scrum", url: "https://scrumguides.org/scrum-guide.html" },
  django: { label: "Django", url: "https://docs.djangoproject.com/en/stable/" },
  pytorch: { label: "PyTorch", url: "https://pytorch.org/docs/stable/index.html" },
  mlops: { label: "MLOps", url: "https://ml-ops.org/" },
};

export function getOfficialDocLink(term: string): OfficialDocLink | undefined {
  return LINKS[normalize(term)];
}

export function getOfficialDocUrl(term: string): string | undefined {
  return getOfficialDocLink(term)?.url;
}

const mustUrl = (term: string) => {
  const url = getOfficialDocUrl(term);
  if (!url) throw new Error(`Missing official doc URL mapping for: ${term}`);
  return url;
};

// Aliases used for linkifying terms inside free-form text (project summaries, highlights, etc.).
// Keep this list curated to avoid turning paragraphs into link soup.
export const OFFICIAL_DOC_ALIASES: Array<{ term: string; url: string }> = [
  { term: "DBSCAN", url: mustUrl("DBSCAN") },
  { term: "K-means", url: mustUrl("K-means") },
  { term: "GridSearchCV", url: mustUrl("GridSearchCV") },
  { term: "ROC/AUC", url: mustUrl("ROC/AUC") },
  { term: "ResNet-50", url: mustUrl("ResNet-50") },
  { term: "ResNet‑50", url: mustUrl("ResNet-50") },
  { term: "GrabCut", url: mustUrl("GrabCut") },
  { term: "ADAM", url: mustUrl("Adam") },
  { term: "Databricks", url: mustUrl("Databricks") },
  { term: "Azure OpenAI", url: mustUrl("Azure OpenAI") },
  { term: "LangChain", url: mustUrl("LangChain") },
  { term: "Chroma Vector DB", url: mustUrl("Chroma Vector DB") },
  { term: "Semantic Search", url: mustUrl("Semantic Search") },
  { term: "RAG", url: mustUrl("RAG") },
  { term: "Power BI", url: mustUrl("Power BI") },
  { term: "Power Platform", url: mustUrl("Power Platform") },
  { term: "GDPR", url: mustUrl("GDPR") },
  { term: "Entra ID", url: mustUrl("Entra ID") },
  { term: "EGD", url: mustUrl("EGD") },
  { term: "NSCLC", url: mustUrl("NSCLC") },
  { term: "Scrum", url: mustUrl("Scrum") },
  { term: "SCRUM", url: mustUrl("Scrum") },
  { term: "Django", url: mustUrl("Django") },
  { term: "PyTorch", url: mustUrl("PyTorch") },
  { term: "MLOps", url: mustUrl("MLOps") },
  { term: "DSFC", url: mustUrl("DSFC") },
  { term: "DSFC 2025", url: mustUrl("DSFC 2025") },
];
