import type { ReactNode } from "react";
import { OFFICIAL_DOC_ALIASES } from "@/content/docLinks";

const isWordChar = (ch: string | undefined) => {
  if (!ch) return false;
  return /[A-Za-z0-9_]/.test(ch);
};

const needsWordBoundary = (term: string) => /^[A-Za-z0-9_]+$/.test(term);

export function OfficialDocText({ text }: { text: string }) {
  const nodes: ReactNode[] = [];

  const haystack = text;
  const lowerHaystack = haystack.toLowerCase();

  // Prefer longer terms first to avoid partial matches (e.g., "Azure" inside "Azure OpenAI").
  const aliases = [...OFFICIAL_DOC_ALIASES].sort((a, b) => b.term.length - a.term.length);

  let cursor = 0;
  while (cursor < haystack.length) {
    let best:
      | {
          start: number;
          end: number;
          term: string;
          url: string;
        }
      | undefined;

    for (const { term, url } of aliases) {
      const needle = term.toLowerCase();
      const start = lowerHaystack.indexOf(needle, cursor);
      if (start === -1) continue;

      const end = start + term.length;

      if (needsWordBoundary(term)) {
        const prev = haystack[start - 1];
        const next = haystack[end];
        if (isWordChar(prev) || isWordChar(next)) continue;
      }

      if (!best || start < best.start || (start === best.start && end - start > best.end - best.start)) {
        best = { start, end, term, url };
      }
    }

    if (!best) {
      nodes.push(haystack.slice(cursor));
      break;
    }

    if (best.start > cursor) nodes.push(haystack.slice(cursor, best.start));

    const matchedText = haystack.slice(best.start, best.end);
    nodes.push(
      <a
        key={`${best.url}-${best.start}-${best.end}`}
        className="underline decoration-[color:var(--stroke)] hover:decoration-[color:var(--accent)]"
        href={best.url}
        target="_blank"
        rel="noopener noreferrer"
        title={`Open official documentation for ${matchedText}`}
        aria-label={`Open official documentation for ${matchedText}`}
      >
        {matchedText}
      </a>
    );

    cursor = best.end;
  }

  return <>{nodes}</>;
}
