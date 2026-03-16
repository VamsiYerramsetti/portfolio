import Link from "next/link";
import Image from "next/image";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { lors } from "@/content/lors.generated";
import { withBasePath } from "@/content/basePath";

const initialFromName = (name?: string) => {
  const fallback = (name ?? "?").trim().slice(0, 1).toUpperCase() || "?";
  if (!name) return fallback;

  const tokens = name
    .replace(/[.·,_/\\()-]+/g, " ")
    .split(/\s+/)
    .map((t) => t.trim())
    .filter(Boolean);

  const honorifics = new Set(["dr", "prof", "drprof", "mr", "ms", "mrs"]);
  while (tokens.length > 0) {
    const t = tokens[0].toLowerCase();
    if (honorifics.has(t)) tokens.shift();
    else break;
  }

  const first = tokens[0];
  return (first?.slice(0, 1).toUpperCase() || fallback) as string;
};

export default function LorsPage() {
  return (
    <main>
      <Nav />
      <section className="mx-auto max-w-6xl px-5 pt-12">
        <Link href="/" className="text-sm text-[color:var(--muted)] hover:text-[color:var(--ink)] transition">
          ← Back home
        </Link>

        <h1 className="mt-4 font-display text-4xl tracking-tight">Letters of Recommendation</h1>
        <p className="mt-3 text-[color:var(--muted)] max-w-3xl leading-relaxed">
          A curated set of recommendation letters and performance reports.
        </p>

        {lors.length === 0 ? (
          <div className="mt-8 rounded-xl2 border border-[color:var(--stroke)] bg-[color:var(--surface)] p-6 shadow-soft">
            <p className="text-[color:var(--muted)]">
              No documents found yet. Add PDFs to the <span className="font-medium text-[color:var(--ink)]">LORS for website</span> folder,
              then restart the dev server (or rebuild) to regenerate this page.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid md:grid-cols-2 gap-5">
            {lors.map((item, i) => (
              <Reveal key={item.slug} delay={0.04 * i} hoverLift={6}>
                <div className="rounded-xl2 border border-[color:var(--stroke)] bg-[color:var(--surface)] p-6 shadow-soft overflow-hidden">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xs uppercase tracking-wide text-[color:var(--muted)]">{item.kind}</div>
                      <h2 className="mt-2 font-display text-2xl tracking-tight">{item.title}</h2>
                      <p className="mt-2 text-sm text-[color:var(--muted)] leading-relaxed">
                        {item.blurb}
                      </p>
                    </div>
                    <a
                      href={withBasePath(item.fileUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 rounded-full border border-[color:var(--stroke)] bg-white/30 px-4 py-2 text-sm font-medium hover:bg-white/40 transition"
                    >
                      Open PDF
                    </a>
                  </div>

                  <div className="mt-5 overflow-hidden rounded-xl2 border border-[color:var(--stroke)] bg-white/10">
                    <iframe
                      src={withBasePath(item.fileUrl)}
                      title={`${item.title} preview`}
                      className="w-full"
                      style={{ height: 260 }}
                      loading="lazy"
                    />
                  </div>

                  {((item as any).people?.length ?? 0) > 0 || item.person ? (
                    <div className="mt-5 space-y-3">
                      {(((item as any).people as any[]) ?? (item.person ? [item.person] : [])).map((person, idx) => (
                        <div
                          key={`${item.slug}-person-${idx}-${person?.name ?? "unknown"}`}
                          className="rounded-xl2 border border-[color:var(--stroke)] bg-white/20 p-4"
                        >
                          <div className="flex items-center gap-3">
                            {person?.imageUrl ? (
                              <div className="h-12 w-12 rounded-xl overflow-hidden border border-[color:var(--stroke)] bg-white/40">
                                <Image
                                  src={withBasePath(person.imageUrl)}
                                  alt={person?.name ? `${person.name} photo` : "Recommender"}
                                  width={96}
                                  height={96}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                            ) : (
                              <div className="h-12 w-12 rounded-xl border border-[color:var(--stroke)] bg-white/40 flex items-center justify-center text-sm font-medium text-[color:var(--muted)]">
                                {initialFromName(person?.name)}
                              </div>
                            )}
                            <div className="min-w-0">
                              <div className="font-medium truncate">{person?.name ?? "Recommender"}</div>
                              {person?.title ? (
                                <div className="text-sm text-[color:var(--muted)] leading-snug">
                                  {person.title}
                                </div>
                              ) : null}
                              {person?.company ? (
                                <div className="text-sm text-[color:var(--muted)] leading-snug">
                                  {person.company}
                                </div>
                              ) : null}

              {person?.tags && person.tags.length > 0 ? (
                <div className="mt-2 flex flex-wrap gap-2">
                  {person.tags.slice(0, 3).map((tag: string) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[color:var(--stroke)] bg-white/10 px-2.5 py-1 text-xs text-[color:var(--muted)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}
                            </div>
                          </div>

                          {person?.description ? (
                            <p className="mt-3 text-sm text-[color:var(--muted)] leading-relaxed">
                              {person.description}
                              {person?.links && person.links.length > 0 ? (
                                <span className="ml-3 inline-flex items-center gap-4">
                                  {person.links.map((l: any) => (
                                    <a
                                      key={l.url}
                                      href={l.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="whitespace-nowrap font-medium text-[color:var(--muted)] hover:text-[color:var(--ink)] transition underline decoration-[color:var(--stroke)] hover:decoration-[color:var(--accent)]"
                                    >
                                      {l.label}
                                    </a>
                                  ))}
                                </span>
                              ) : null}
                            </p>
                          ) : person?.links && person.links.length > 0 ? (
                            <div className="mt-3 flex items-center gap-4 text-sm">
                              {person.links.map((l: any) => (
                                <a
                                  key={l.url}
                                  href={l.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="whitespace-nowrap font-medium text-[color:var(--muted)] hover:text-[color:var(--ink)] transition underline decoration-[color:var(--stroke)] hover:decoration-[color:var(--accent)]"
                                >
                                  {l.label}
                                </a>
                              ))}
                            </div>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-5 text-sm text-[color:var(--muted)]">
                      Add optional recommender details in <span className="font-medium text-[color:var(--ink)]">src/content/lors.meta.json</span>.
                    </p>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </section>
      <Footer />
    </main>
  );
}
