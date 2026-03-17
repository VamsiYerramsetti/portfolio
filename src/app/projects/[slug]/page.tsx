import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { LinkedInCarousel } from "@/components/LinkedInCarousel";
import { Reveal } from "@/components/Reveal";
import { projects } from "@/content/projects";
import { getOfficialDocUrl } from "@/content/docLinks";
import { OfficialDocText } from "@/components/OfficialDocText";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return notFound();

  // Custom content for Code Compass AI
  const isCodeCompass = project.slug === "code-compass-ai";
  const isNorthAmericaSustainability = project.slug === "north-american-sustainability-platform";
  const isOrganoidOnChip = project.slug === "organoid-on-chip-immunotherapy";
  const isATIA = project.slug === "atia-tongue-image-analysis";
  const isUKAccident = project.slug === "uk-accident-prone-zone-detector";
  const isLoanProspecting = project.slug === "automated-loan-prospecting-dashboard";

  const databricksUrl = getOfficialDocUrl("Databricks");
  const powerBiUrl = getOfficialDocUrl("Power BI");
  const egdUrl = getOfficialDocUrl("EGD");
  const gdprUrl = getOfficialDocUrl("GDPR");
  const entraIdUrl = getOfficialDocUrl("Entra ID");
  const dbscanUrl = getOfficialDocUrl("DBSCAN");
  const kMeansUrl = getOfficialDocUrl("K-means");
  const gridSearchCvUrl = getOfficialDocUrl("GridSearchCV");
  const resNet50Url = getOfficialDocUrl("ResNet-50");
  const grabCutUrl = getOfficialDocUrl("GrabCut");
  const adamUrl = getOfficialDocUrl("Adam");

  return (
    <main>
      <Nav />
      <section className="mx-auto max-w-6xl px-5 pt-12">
        <Link href="/projects/" className="text-sm text-[color:var(--muted)] hover:text-[color:var(--ink)] transition">← All projects</Link>

        <h1 className="mt-4 font-display text-4xl tracking-tight">{project.title}</h1>
        <p className="mt-3 text-[color:var(--muted)] max-w-3xl leading-relaxed">
          <OfficialDocText text={project.summary} />
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((t) => {
            const url = getOfficialDocUrl(t);
            const className =
              "text-xs rounded-full border border-[color:var(--stroke)] px-3 py-1 bg-white/30" +
              (url ? " hover:bg-white/40 hover:text-[color:var(--ink)] transition" : "");

            return url ? (
              <a
                key={t}
                className={className}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open official documentation for ${t}`}
                title={`Open official documentation for ${t}`}
              >
                {t}
              </a>
            ) : (
              <span key={t} className={className}>
                {t}
              </span>
            );
          })}
        </div>

        <div className="mt-10 grid lg:grid-cols-[1.2fr_.8fr] gap-10">
          <div className="rounded-xl2 border border-[color:var(--stroke)] bg-[color:var(--surface)] p-7 shadow-soft">
            <h2 className="font-display text-2xl">Narrative</h2>
            {isCodeCompass ? (
              <p className="mt-3 text-[color:var(--muted)] leading-relaxed">
                Code Compass AI was developed to address the challenge of understanding and optimizing large{" "}
                {databricksUrl ? (
                  <a
                    className="underline decoration-[color:var(--stroke)] hover:decoration-[color:var(--accent)]"
                    href={databricksUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Databricks
                  </a>
                ) : (
                  "Databricks"
                )}{" "}
                notebook repositories. Teams struggled with fragmented code, lack of context, and slow onboarding. The project aimed to provide a secure, context-aware assistant that could semantically search, explain, and connect code across notebooks, improving productivity and code quality without exposing sensitive production data.
              </p>
            ) : isNorthAmericaSustainability ? (
              <p className="mt-3 text-[color:var(--muted)] leading-relaxed">
                The North America Agrifinance team calculated carbon scores manually for 100+ clients, which was slow, inconsistent, and hard to scale. I led the design and deployment of an automated, compliance‑ready scoring system that unified fragmented data, standardized calculations, and produced actionable sustainability insights.
              </p>
            ) : isOrganoidOnChip ? (
              <div className="mt-3 text-[color:var(--muted)] leading-relaxed space-y-3">
                <p>
                  Honours project designing an in vitro lung squamous‑cell tumouroid‑on‑chip system with automated microscopy and computational analysis to evaluate drug and immune‑cell responses under controlled microfluidic conditions.
                </p>
                <div className="space-y-2">
                  <p>Conventional 2D cultures and animal models fail to replicate tumour 3D structure, perfusion, and immune interactions—limiting predictive value for immunotherapy.</p>
                  <p>Organoid variability and lack of automated monitoring reduce reliability and throughput.</p>
                  <p>
                    <span className="font-medium">Why it matters:</span> Squamous{" "}
                    <a
                      className="underline decoration-[color:var(--stroke)] hover:decoration-[color:var(--accent)]"
                      href="https://www.cancer.gov/types/lung/patient/non-small-cell-lung-treatment-pdq"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="NSCLC (non-small-cell lung cancer)"
                    >
                      NSCLC
                    </a>{" "}
                    has limited treatment options and inconsistent response to immunotherapies—improved models enable better drug evaluation and potential personalization.
                  </p>
                </div>

                <div className="pt-1">
                  <a
                    href="https://doi.org/10.13140/RG.2.2.29432.57608"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center px-3 py-1 rounded bg-[color:var(--surface)] text-[color:var(--muted)] text-[12px] font-medium border border-[color:var(--stroke)] hover:bg-white/30 transition"
                  >
                    View publication
                  </a>
                </div>
              </div>
            ) : isATIA ? (
              <div className="mt-4 grid sm:grid-cols-2 gap-4">
                <Reveal delay={0.02}>
                  <div className="rounded-xl2 border border-[color:var(--stroke)] bg-white/20 p-4">
                    <div className="text-xs uppercase tracking-wide text-[color:var(--muted)]">Problem</div>
                    <p className="mt-2 text-sm text-[color:var(--muted)] leading-relaxed">
                      Chronic gastritis diagnosis often relies on invasive{" "}
                      {egdUrl ? (
                        <a
                          className="underline decoration-[color:var(--stroke)] hover:decoration-[color:var(--accent)]"
                          href={egdUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="EGD (upper GI endoscopy)"
                        >
                          EGD
                        </a>
                      ) : (
                        "EGD"
                      )}{" "}
                      and scarce clinical capacity. Tongue changes (color/texture) can provide a non‑invasive signal, but the analysis is rarely standardized or automated. This project builds automated tongue image analysis with supervised ML models to support autoimmune‑disease screening.
                    </p>
                  </div>
                </Reveal>
                <Reveal delay={0.08}>
                  <div className="rounded-xl2 border border-[color:var(--stroke)] bg-white/20 p-4">
                    <div className="text-xs uppercase tracking-wide text-[color:var(--muted)]">Why it matters</div>
                    <p className="mt-2 text-sm text-[color:var(--muted)] leading-relaxed">
                      A fast, camera‑based app can help triage patients and reduce unnecessary procedures. The same pipeline can generalize to other autoimmune conditions with visible tongue manifestations.
                    </p>

                    <div className="pt-3">
                      <a
                        href="/project-media/BSc_Thesis_ATIA_Poster_Radboud.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center px-3 py-1 rounded bg-[color:var(--surface)] text-[color:var(--muted)] text-[12px] font-medium border border-[color:var(--stroke)] hover:bg-white/30 transition"
                      >
                        View thesis
                      </a>
                    </div>
                  </div>
                </Reveal>
              </div>
            ) : isUKAccident ? (
              <div className="mt-4 grid sm:grid-cols-2 gap-4">
                <Reveal delay={0.02}>
                  <div className="rounded-xl2 border border-[color:var(--stroke)] bg-white/20 p-4">
                    <div className="text-xs uppercase tracking-wide text-[color:var(--muted)]">Problem</div>
                    <p className="mt-2 text-sm text-[color:var(--muted)] leading-relaxed">
                      Road-safety teams need reliable ways to pinpoint locations with disproportionately high accident risk—accounting for traffic flow (exposure), not just raw accident counts.
                    </p>
                  </div>
                </Reveal>
                <Reveal delay={0.08}>
                  <div className="rounded-xl2 border border-[color:var(--stroke)] bg-white/20 p-4">
                    <div className="text-xs uppercase tracking-wide text-[color:var(--muted)]">Why it matters</div>
                    <p className="mt-2 text-sm text-[color:var(--muted)] leading-relaxed">
                      True hotspots enable targeted infrastructure upgrades, smarter resource allocation, and evidence-based policy—especially for low-traffic areas with outsized risk.
                    </p>
                  </div>
                </Reveal>
              </div>
            ) : isLoanProspecting ? (
              <div className="mt-4 grid sm:grid-cols-2 gap-4">
                <Reveal delay={0.02}>
                  <div className="rounded-xl2 border border-[color:var(--stroke)] bg-white/20 p-4">
                    <div className="text-xs uppercase tracking-wide text-[color:var(--muted)]">Problem</div>
                    <p className="mt-2 text-sm text-[color:var(--muted)] leading-relaxed">
                      The Startup &amp; Scale-up team relied on manual, fragmented tools (Salesforce, Siebel, Chronos, and ad-hoc news searches) to identify prospects—limiting coverage and slowing outreach.
                    </p>
                  </div>
                </Reveal>
                <Reveal delay={0.08}>
                  <div className="rounded-xl2 border border-[color:var(--stroke)] bg-white/20 p-4">
                    <div className="text-xs uppercase tracking-wide text-[color:var(--muted)]">Solution</div>
                    <p className="mt-2 text-sm text-[color:var(--muted)] leading-relaxed">
                      Built a unified prospecting system that automated ingestion, standardized prospect criteria, and exposed portfolio + prospect insights through a streamlined{" "}
                      {powerBiUrl ? (
                        <a
                          className="underline decoration-[color:var(--stroke)] hover:decoration-[color:var(--accent)]"
                          href={powerBiUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Power BI
                        </a>
                      ) : (
                        "Power BI"
                      )}{" "}
                      dashboard and a user-controlled front end.
                    </p>
                    <div className="pt-3 text-xs text-[color:var(--muted)]">
                      <span className="font-medium text-[color:var(--ink)]">Role:</span> Product Owner &amp; ML Engineer
                    </div>
                  </div>
                </Reveal>
              </div>
            ) : (
              <p className="mt-3 text-[color:var(--muted)] leading-relaxed">
                Describe the problem context, constraints, and why it mattered. Then explain the approach at a system level: data sources, modeling choices, validation, deployment, and monitoring.
              </p>
            )}

            <h3 className="mt-6 font-display text-xl">Approach</h3>
            {isATIA ? (
              <Reveal delay={0.03}>
                <div className="mt-4 rounded-xl2 border border-[color:var(--stroke)] bg-[color:var(--surface)] shadow-soft overflow-hidden">
                  <div className="divide-y divide-[color:var(--stroke)]">
                    <div className="grid sm:grid-cols-[220px_1fr] gap-3 p-4">
                      <div className="text-sm font-medium text-[color:var(--ink)]">Problem framing &amp; success metrics</div>
                      <div className="text-sm text-[color:var(--muted)] leading-relaxed">
                        Supervised binary classification (infected vs healthy). Reported accuracy, precision, recall, F1, AUC, and confusion matrices; prioritized recall to minimize false negatives.
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-[220px_1fr] gap-3 p-4">
                      <div className="text-sm font-medium text-[color:var(--ink)]">Data &amp; feature pipeline</div>
                      <div className="text-sm text-[color:var(--muted)] leading-relaxed">
                        300 tongue images (TongueSetA + TongueSetB) → preprocessing (224×224 resize, Gaussian blur) →{" "}
                        {grabCutUrl ? (
                          <a
                            className="underline decoration-[color:var(--stroke)] hover:decoration-[color:var(--accent)]"
                            href={grabCutUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            GrabCut
                          </a>
                        ) : (
                          "GrabCut"
                        )}{" "}
                        segmentation → feature extraction for classical ML (geometric, chromatic, textural) + direct-image training for deep learning.
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-[220px_1fr] gap-3 p-4">
                      <div className="text-sm font-medium text-[color:var(--ink)]">Model development + evaluation</div>
                      <div className="text-sm text-[color:var(--muted)] leading-relaxed">
                        Trained and compared supervised ML classifiers with 10‑fold{" "}
                        {gridSearchCvUrl ? (
                          <a
                            className="underline decoration-[color:var(--stroke)] hover:decoration-[color:var(--accent)]"
                            href={gridSearchCvUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            GridSearchCV
                          </a>
                        ) : (
                          "GridSearchCV"
                        )}{" "}
                        (LogReg, KNN, SVC linear/RBF, Decision Tree, Random Forest). Deep model: transfer learning with pre‑trained{" "}
                        {resNet50Url ? (
                          <a
                            className="underline decoration-[color:var(--stroke)] hover:decoration-[color:var(--accent)]"
                            href={resNet50Url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            ResNet‑50
                          </a>
                        ) : (
                          "ResNet‑50"
                        )}{" "}
                        (frozen layers + sigmoid head),{" "}
                        {adamUrl ? (
                          <a
                            className="underline decoration-[color:var(--stroke)] hover:decoration-[color:var(--accent)]"
                            href={adamUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            ADAM
                          </a>
                        ) : (
                          "ADAM"
                        )}
                        , 100 epochs, mini‑batch training.
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-[220px_1fr] gap-3 p-4">
                      <div className="text-sm font-medium text-[color:var(--ink)]">Validation, robustness, reproducibility</div>
                      <div className="text-sm text-[color:var(--muted)] leading-relaxed">
                        Used a fixed 90/10 split with three seeds averaged and ROC/AUC reporting at a 0.5 threshold; addressed overfitting via CV/regularization and class imbalance via metric focus and per‑class analysis.
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ) : isLoanProspecting ? (
              <Reveal delay={0.03}>
                <div className="mt-4 rounded-xl2 border border-[color:var(--stroke)] bg-[color:var(--surface)] shadow-soft overflow-hidden">
                  <div className="divide-y divide-[color:var(--stroke)]">
                    <div className="grid sm:grid-cols-[220px_1fr] gap-3 p-4">
                      <div className="text-sm font-medium text-[color:var(--ink)]">Success metrics</div>
                      <div className="text-sm text-[color:var(--muted)] leading-relaxed">
                        Reduce manual prospecting time, expand coverage, centralize portfolio visibility, and automate refresh cycles across internal + external sources.
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-[220px_1fr] gap-3 p-4">
                      <div className="text-sm font-medium text-[color:var(--ink)]">Data integration</div>
                      <div className="text-sm text-[color:var(--muted)] leading-relaxed">
                        Integrated internal (CDF/GDP/Salesforce) with external intelligence (Crunchbase, Dealroom, Gain.pro, Jiggr). Added preprocessing for fuzzy matching, criteria standardization, transition-theme tagging, and life-phase mapping.
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-[220px_1fr] gap-3 p-4">
                      <div className="text-sm font-medium text-[color:var(--ink)]">Architecture</div>
                      <div className="text-sm text-[color:var(--muted)] leading-relaxed">
                        Azure pipeline: Web App → Storage → Databricks ETL → SQL DB → Power BI.
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-[220px_1fr] gap-3 p-4">
                      <div className="text-sm font-medium text-[color:var(--ink)]">Governance</div>
                      <div className="text-sm text-[color:var(--muted)] leading-relaxed">
                        Applied CloudGuide/{gdprUrl ? (
                          <a
                            className="underline decoration-[color:var(--stroke)] hover:decoration-[color:var(--accent)]"
                            href={gdprUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            GDPR
                          </a>
                        ) : (
                          "GDPR"
                        )}{" "}
                        requirements, added Databricks job monitoring + ETL unit tests, and secured access via{" "}
                        {entraIdUrl ? (
                          <a
                            className="underline decoration-[color:var(--stroke)] hover:decoration-[color:var(--accent)]"
                            href={entraIdUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Entra ID
                          </a>
                        ) : (
                          "Entra ID"
                        )}{" "}
                        with governed app settings.
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ) : isUKAccident ? (
              <Reveal delay={0.03}>
                <div className="mt-4 rounded-xl2 border border-[color:var(--stroke)] bg-[color:var(--surface)] shadow-soft overflow-hidden">
                  <div className="divide-y divide-[color:var(--stroke)]">
                    <div className="grid sm:grid-cols-[220px_1fr] gap-3 p-4">
                      <div className="text-sm font-medium text-[color:var(--ink)]">Problem framing &amp; metric</div>
                      <div className="text-sm text-[color:var(--muted)] leading-relaxed">
                        Computed a risk weight per location so low-traffic but dangerous sites are not overshadowed by busy urban roads.
                        <div className="mt-2 flex items-center gap-2 flex-wrap">
                          <span className="font-medium text-[color:var(--ink)]">risk =</span>
                          <span className="inline-flex flex-col items-center leading-none font-medium text-[color:var(--ink)]">
                            <span className="px-1">accidents</span>
                            <span className="h-px w-full bg-[color:var(--stroke)]" />
                            <span className="px-1">traffic flow</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-[220px_1fr] gap-3 p-4">
                      <div className="text-sm font-medium text-[color:var(--ink)]">Data &amp; feature pipeline</div>
                      <div className="text-sm text-[color:var(--muted)] leading-relaxed">
                        Rounded coordinates (2 decimals) and grouped by location to reduce scale (~1.6M points → ~100k unique locations), merged accident + traffic-flow data, removed missing values, and built weighted lat/long points for clustering.
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-[220px_1fr] gap-3 p-4">
                      <div className="text-sm font-medium text-[color:var(--ink)]">Models</div>
                      <div className="text-sm text-[color:var(--muted)] leading-relaxed">
                        Used{" "}
                        {dbscanUrl ? (
                          <a
                            className="underline decoration-[color:var(--stroke)] hover:decoration-[color:var(--accent)]"
                            href={dbscanUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            DBSCAN
                          </a>
                        ) : (
                          "DBSCAN"
                        )}{" "}
                        for noise-aware density detection, and a custom{" "}
                        {kMeansUrl ? (
                          <a
                            className="underline decoration-[color:var(--stroke)] hover:decoration-[color:var(--accent)]"
                            href={kMeansUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            K-means
                          </a>
                        ) : (
                          "K-means"
                        )}{" "}
                        density-ranking variant (K=100) to enforce small regions, rank cluster densities, and select the top 7 highest-risk clusters.
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-[220px_1fr] gap-3 p-4">
                      <div className="text-sm font-medium text-[color:var(--ink)]">Validation</div>
                      <div className="text-sm text-[color:var(--muted)] leading-relaxed">
                        Compared cluster stability and overlap across both methods and inspected rare high-weight outliers (low-traffic but high-risk zones) to validate that hotspots were not artifacts.
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ) : (
              <ul className="mt-3 list-disc pl-5 text-[color:var(--muted)] space-y-2">
                {isCodeCompass ? (
                  <>
                    <li>Framed the problem around repository-wide semantic search and persona-based code explanations</li>
                    <li>Designed a pipeline using LangChain, Azure OpenAI, and Chroma Vector DB for deep retrieval and context linking</li>
                    <li>Developed privacy-first architecture—no access to production data, only code and metadata</li>
                    <li>Implemented Markdown-to-HTML rendering for rich, copyable code blocks</li>
                    <li>Validated with internal users and iterated on feedback for usability and security</li>
                  </>
                ) : isNorthAmericaSustainability ? (
                  <>
                    <li>
                      <span className="font-medium">Goal &amp; metrics</span>
                      <div className="mt-2">Reduce per‑client scoring from ~30 minutes to near‑real‑time with compliance, transparency, and repeatability (&gt;80% time reduction, full auditability, 100+ client scale).</div>
                    </li>
                    <li>
                      <span className="font-medium">Data &amp; feature pipeline design</span>
                      <div className="mt-2">Built an end‑to‑end ingestion + transformation pipeline, added validation rules, and standardized inputs for repeatable scoring and audit‑ready traceability.</div>
                    </li>
                    <li>
                      <span className="font-medium">Model logic / algorithmic layer</span>
                      <div className="mt-2">Implemented a modular scoring engine (rules‑based + data‑driven) that produced standardized carbon‑impact metrics and recommendations, with room for future ML integration.</div>
                    </li>
                  </>
                ) : isOrganoidOnChip ? (
                  <>
                    <li>
                      <span className="font-medium">System design &amp; metrics</span>
                      <div className="mt-2">Designed a PDMS microfluidic chip with Matrigel wells, perfused media, an immune‑cell‑permeable membrane, and a micro‑needle‑based breathing mechanism.</div>
                    </li>
                    <li>
                      <span className="font-medium">Data &amp; feature pipeline</span>
                      <div className="mt-2">Time‑lapse fluorescence imaging → automated segmentation → growth/intensity/cell‑count features → structured storage → interactive Python analysis.</div>
                    </li>
                  </>
                ) : (
                  <>
                    <li>Problem framing and success metrics</li>
                    <li>Data & feature pipeline design</li>
                    <li>Model development + evaluation</li>
                    <li>Validation, compliance, monitoring</li>
                  </>
                )}
              </ul>
            )}

            <h3 className="mt-6 font-display text-xl">Outcome</h3>
            {isCodeCompass ? (
              <p className="mt-3 text-[color:var(--muted)] leading-relaxed">
                Code Compass AI delivered repository-wide semantic search, context-aware explanations, and persona-based guidance. It improved onboarding speed, code discoverability, and developer productivity. The privacy-first design ensured compliance, and the project was awarded “most viable innovation” in an internal challenge.
              </p>
            ) : isNorthAmericaSustainability ? (
              <p className="mt-3 text-[color:var(--muted)] leading-relaxed">
                Reduced per‑client scoring from ~30 minutes to ~5 minutes, eliminating 350+ hours of manual effort across 100+ clients. Improved accuracy and auditability, and delivered portfolio‑level insights via dashboards for faster, higher‑quality sustainability advisory.
              </p>
            ) : isOrganoidOnChip ? (
              <p className="mt-3 text-[color:var(--muted)] leading-relaxed">
                Delivered a reproducible tumouroid‑on‑chip concept with an integrated data pipeline, reducing manual imaging dependence and enabling faster interpretation of immunotherapy response dynamics.
              </p>
            ) : isATIA ? (
              <div className="mt-4 space-y-4">
                <Reveal delay={0.03}>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                    {[
                      { k: "Accuracy", v: "90%" },
                      { k: "Precision", v: "81.81%" },
                      { k: "Recall", v: "90%" },
                      { k: "F1", v: "85.71%" },
                      { k: "AUC", v: "0.90" },
                    ].map((m) => (
                      <div
                        key={m.k}
                        className="rounded-xl2 border border-[color:var(--stroke)] bg-white/20 p-4"
                      >
                        <div className="text-xs uppercase tracking-wide text-[color:var(--muted)]">{m.k}</div>
                        <div className="mt-2 font-display text-2xl text-[color:var(--ink)]">{m.v}</div>
                      </div>
                    ))}
                  </div>
                </Reveal>

                <Reveal delay={0.08}>
                  <div className="rounded-xl2 border border-[color:var(--stroke)] bg-[color:var(--surface)] p-4 shadow-soft">
                    <p className="text-sm text-[color:var(--muted)] leading-relaxed">
                      <span className="font-medium text-[color:var(--ink)]">Best model:</span>{" "}
                      {resNet50Url ? (
                        <a
                          className="underline decoration-[color:var(--stroke)] hover:decoration-[color:var(--accent)]"
                          href={resNet50Url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          ResNet‑50
                        </a>
                      ) : (
                        "ResNet‑50"
                      )}{" "}
                      transfer learning.
                      <span className="ml-2"><span className="font-medium text-[color:var(--ink)]">Strong baselines:</span> Logistic Regression and SVC (RBF) reached ~87% accuracy and ~0.85 AUC.</span>
                    </p>
                    <p className="mt-2 text-sm text-[color:var(--muted)] leading-relaxed">
                      What moved the needle: robust segmentation, targeted feature design, CV‑driven hyperparameter tuning, and transfer learning.
                    </p>
                  </div>
                </Reveal>
              </div>
            ) : isLoanProspecting ? (
              <div className="mt-3 space-y-4 text-[color:var(--muted)]">
                <div>
                  <div className="text-sm font-medium text-[color:var(--ink)]">Business impact</div>
                  <ul className="mt-2 list-disc pl-5 space-y-2">
                    <li>Significant reduction in manual search and data-gathering effort</li>
                    <li>First unified internal + external prospecting view for the S&amp;S team</li>
                    <li>Automated, scalable prospect discovery across the Dutch ecosystem</li>
                  </ul>
                </div>
                <div>
                  <div className="text-sm font-medium text-[color:var(--ink)]">Technical impact</div>
                  <ul className="mt-2 list-disc pl-5 space-y-2">
                    <li>Unified 7+ heterogeneous data sources into one system</li>
                    <li>Delivered automated refresh and scheduling via a user-controlled front end</li>
                    <li>Reusable architecture for future ML/analytics features</li>
                  </ul>
                </div>
              </div>
            ) : isUKAccident ? (
              <div className="mt-4 space-y-4">
                <Reveal delay={0.03}>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[
                      { k: "Records", v: "1.6M+" },
                      { k: "Locations", v: "~100k" },
                      { k: "Hotspots", v: "7" },
                    ].map((m) => (
                      <div
                        key={m.k}
                        className="rounded-xl2 border border-[color:var(--stroke)] bg-white/20 p-4"
                      >
                        <div className="text-xs uppercase tracking-wide text-[color:var(--muted)]">{m.k}</div>
                        <div className="mt-2 font-display text-2xl text-[color:var(--ink)]">{m.v}</div>
                      </div>
                    ))}
                  </div>
                </Reveal>

                <Reveal delay={0.08}>
                  <div className="rounded-xl2 border border-[color:var(--stroke)] bg-[color:var(--surface)] p-4 shadow-soft">
                    <p className="text-sm text-[color:var(--muted)] leading-relaxed">
                      DBSCAN and the custom K-means method independently converged on nearly identical <span className="font-medium text-[color:var(--ink)]">7 hotspots</span>, demonstrating robustness across approaches.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {[
                        "London",
                        "Liverpool",
                        "Manchester",
                        "Stoke‑on‑Trent",
                        "Boston",
                        "+2 smaller areas",
                      ].map((c) => (
                        <span
                          key={c}
                          className="text-xs rounded-full border border-[color:var(--stroke)] px-3 py-1 bg-white/30 text-[color:var(--muted)]"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                    <p className="mt-3 text-sm text-[color:var(--muted)] leading-relaxed">
                      The weighting showed that low-traffic but vulnerable regions can drive significant risk—not only major cities.
                    </p>
                  </div>
                </Reveal>
              </div>
            ) : (
              <p className="mt-3 text-[color:var(--muted)] leading-relaxed">
                Add outcomes here (quantified where possible), like throughput improvements, time-to-decision reductions, or developer productivity gains.
              </p>
            )}
          </div>

          <aside className="rounded-xl2 border border-[color:var(--stroke)] bg-[color:var(--surface)] p-7 shadow-soft">
            <h2 className="font-display text-2xl">Highlights</h2>
            <ul className="mt-4 space-y-2">
              {project.highlights.map((h, idx) => (
                <li key={h} className={
                  h === "Awarded most viable innovation (internal challenge)" ? "text-[color:var(--muted)] font-bold" : "text-[color:var(--muted)]"
                }>• <OfficialDocText text={h} /></li>
              ))}
            </ul>

            <div className="mt-8">
              <h3 className="font-display text-xl">Media</h3>
              {(() => {
                // Combine all media and LinkedIn embeds
                const allMedia: string[] = [];
                if (project.media && project.media.length > 0) {
                  project.media.forEach((item) => {
                    item.split("||").forEach((src) => {
                      allMedia.push(src.trim());
                    });
                  });
                }
                // Add hardcoded LinkedIn embeds for each project
                if (isNorthAmericaSustainability) {
                  allMedia.push("7211407218154332163", "7220356729732038657");
                }
                if (isOrganoidOnChip) {
                  allMedia.push("<iframe src=\"https://www.linkedin.com/embed/feed/update/urn:li:share:6808069220140621824?collapsed=1\" height=\"645\" width=\"504\" frameborder=\"0\" allowfullscreen=\"\" title=\"Embedded post\"></iframe>");
                }
                if (isCodeCompass) {
                  allMedia.push("https://www.linkedin.com/posts/vamsi-y_marathon-innovation-agenticai-ugcPost-7386053433939881985--RC7");
                }
                if (isATIA) {
                  allMedia.push("https://www.linkedin.com/posts/vamsi-y_machinelearning-deeplearning-research-activity-6973918596053745664-fNvN");
                }
                if (isLoanProspecting) {
                  allMedia.push("https://www.linkedin.com/posts/vamsi-y_datascience-financeinnovation-rabobank-activity-7315453093981106177-fHk6");
                }
                return (
                  <div className="mt-4">
                    <LinkedInCarousel activityIds={allMedia} />
                  </div>
                );
              })()}
            </div>
          </aside>
        </div>
      </section>
      <Footer />
    </main>
  );
}
