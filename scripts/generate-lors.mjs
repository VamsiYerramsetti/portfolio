import fs from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const inputDir = path.join(repoRoot, "LORS for website");
const publicDir = path.join(repoRoot, "public");
const outputDir = path.join(publicDir, "lors");
const generatedPath = path.join(repoRoot, "src", "content", "lors.generated.ts");
const metaPath = path.join(repoRoot, "src", "content", "lors.meta.json");

const exists = (p) => {
  try {
    fs.accessSync(p);
    return true;
  } catch {
    return false;
  }
};

const slugify = (value) =>
  value
    .trim()
    .toLowerCase()
    .replace(/\.pdf$/i, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .replace(/-{2,}/g, "-");

const inferKind = (name) => {
  const lower = name.toLowerCase();
  if (/(lor|recommendation)/.test(lower)) return "Letter of Recommendation";
  if (/laudatio|laudation/.test(lower)) return "Laudation";
  if (/performance|internship/.test(lower)) return "Performance report";
  return "Document";
};

const normalizeText = (value) =>
  value
    .replace(/\r\n/g, "\n")
    .replace(/[\t ]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

const pickBlurb = ({ filename, kind, rawText }) => {
  const fallback = `${kind} (PDF): ${filename.replace(/\.pdf$/i, "")}`;
  if (!rawText) return fallback;

  const text = normalizeText(rawText);
  if (!text) return fallback;

  // Prefer an early informative line (avoid headers/footers).
  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .filter((l) => l.length >= 25);

  const blacklist = [/^page\s+\d+/i, /^confidential/i, /^date\s*:/i];
  const firstGood = lines.find((l) => !blacklist.some((re) => re.test(l)));
  const candidate = firstGood ?? lines[0];
  if (!candidate) return fallback;

  // Compress to a single sentence-ish snippet.
  const one = candidate.replace(/\s+/g, " ").trim();
  const clipped = one.length > 140 ? `${one.slice(0, 137).trim()}…` : one;
  return clipped;
};

const readMeta = () => {
  if (!exists(metaPath)) return {};
  try {
    return JSON.parse(fs.readFileSync(metaPath, "utf8"));
  } catch {
    return {};
  }
};

const main = async () => {
  if (!exists(inputDir)) {
    const empty = `export type LorPerson = {\n  name?: string;\n  title?: string;\n  company?: string;\n  description?: string;\n  tags?: string[];\n  links?: { label: string; url: string }[];\n  imageUrl?: string;\n};\n\nexport type LorItem = {\n  slug: string;\n  title: string;\n  kind: string;\n  blurb: string;\n  fileUrl: string;\n  // Back-compat: older metadata uses 'person'
  person?: LorPerson;\n  // Preferred: allow multiple people for a single document
  people?: LorPerson[];\n};\n\nexport const lors: LorItem[] = [];\n`;
    fs.mkdirSync(path.dirname(generatedPath), { recursive: true });
    fs.writeFileSync(generatedPath, empty);
    console.log(`[generate-lors] Input folder not found: ${inputDir}`);
    console.log(`[generate-lors] Wrote empty data file: ${generatedPath}`);
    return;
  }

  fs.mkdirSync(outputDir, { recursive: true });

  const meta = readMeta();

  const entries = fs
    .readdirSync(inputDir)
    .filter((f) => f.toLowerCase().endsWith(".pdf"))
    .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));

  const seen = new Set();
  const items = [];

  // Lazy-load to keep startup fast.
  const loadPdfParse = async () => {
    const mod = await import("pdf-parse");
    return mod.default ?? mod;
  };

  const extractTextFromPdf = async (pdfPath) => {
    try {
      const pdfParse = await loadPdfParse();
      const buf = fs.readFileSync(pdfPath);
      const data = await pdfParse(buf);
      return data?.text ?? "";
    } catch {
      return "";
    }
  };

  const promises = entries.map(async (filename, inputIndex) => {
    const sourcePath = path.join(inputDir, filename);
    const baseSlug = slugify(filename);
    let slug = baseSlug;
    let counter = 2;
    while (seen.has(slug)) {
      slug = `${baseSlug}-${counter}`;
      counter += 1;
    }
    seen.add(slug);

    const targetName = `${slug}.pdf`;
    const targetPath = path.join(outputDir, targetName);

    fs.copyFileSync(sourcePath, targetPath);

    const override = meta?.[slug] ?? meta?.[filename] ?? {};

    const kind = override.kind ?? inferKind(filename);
    const rawText = await extractTextFromPdf(sourcePath);
    const blurb = override.blurb ?? pickBlurb({ filename, kind, rawText });

    return {
      inputIndex,
      slug,
      title: override.title ?? filename.replace(/\.pdf$/i, ""),
      kind,
      blurb,
      fileUrl: `/lors/${encodeURIComponent(targetName)}`,
      person: override.person,
      people: override.people,
    };
  });

  const resolved = await Promise.all(promises);

  // Ordering: keep original order, but push Laudatio items to the end.
  resolved.sort((a, b) => {
    const aIsLaudation = ["laudation", "laudatio"].includes(a.kind.toLowerCase());
    const bIsLaudation = ["laudation", "laudatio"].includes(b.kind.toLowerCase());
    if (aIsLaudation !== bIsLaudation) return aIsLaudation ? 1 : -1;

    const aOrder = Number.isFinite(meta?.[a.slug]?.order) ? Number(meta[a.slug].order) : undefined;
    const bOrder = Number.isFinite(meta?.[b.slug]?.order) ? Number(meta[b.slug].order) : undefined;
    if (aOrder != null || bOrder != null) {
      if (aOrder == null) return 1;
      if (bOrder == null) return -1;
      if (aOrder !== bOrder) return aOrder - bOrder;
    }

    return a.inputIndex - b.inputIndex;
  });

  for (const it of resolved) {
    // eslint-disable-next-line no-unused-vars
    const { inputIndex, ...rest } = it;
    items.push(rest);
  }

  const out = `export type LorPerson = {\n  name?: string;\n  title?: string;\n  company?: string;\n  description?: string;\n  tags?: string[];\n  links?: { label: string; url: string }[];\n  imageUrl?: string;\n};\n\nexport type LorItem = {\n  slug: string;\n  title: string;\n  kind: string;\n  blurb: string;\n  fileUrl: string;\n  // Back-compat: older metadata uses 'person'
  person?: LorPerson;\n  // Preferred: allow multiple people for a single document
  people?: LorPerson[];\n};\n\nexport const lors: LorItem[] = ${JSON.stringify(items, null, 2)};\n`;

  fs.mkdirSync(path.dirname(generatedPath), { recursive: true });
  fs.writeFileSync(generatedPath, out);

  console.log(`[generate-lors] Copied ${items.length} PDF(s) to ${outputDir}`);
  console.log(`[generate-lors] Wrote data file: ${generatedPath}`);
};

main();
