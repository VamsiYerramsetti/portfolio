"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const splitStacked = (src: string) =>
  src
    .split("||")
    .map((s) => s.trim())
    .filter(Boolean);

const isImageSrc = (src: string) => {
  const lower = src.toLowerCase().split("?")[0];
  return (
    lower.endsWith(".png") ||
    lower.endsWith(".jpg") ||
    lower.endsWith(".jpeg") ||
    lower.endsWith(".webp") ||
    lower.endsWith(".gif") ||
    lower.endsWith(".svg")
  );
};

const isPdfSrc = (src: string) => src.toLowerCase().split("?")[0].endsWith(".pdf");

const parseIframeAttrs = (raw: string) => {
  const trimmed = raw.trim();
  const srcMatch = trimmed.match(/\bsrc\s*=\s*"([^"]+)"/i);
  const heightMatch = trimmed.match(/\bheight\s*=\s*"(\d+)"/i);
  const titleMatch = trimmed.match(/\btitle\s*=\s*"([^"]+)"/i);

  return {
    src: srcMatch?.[1],
    height: heightMatch ? Number(heightMatch[1]) : undefined,
    title: titleMatch?.[1],
  };
};

const toEmbedSrc = (raw: string) => {
  const trimmed = raw.trim();

  // Allow passing the full iframe HTML; extract src="..." if present.
  const candidate = parseIframeAttrs(trimmed).src ?? trimmed;

  // Allow relative URLs (e.g., PDFs under /project-media).
  if (candidate.startsWith("/")) return candidate;

  // LinkedIn embed URL already.
  if (/^https?:\/\/www\.linkedin\.com\/embed\/feed\/update\//i.test(candidate)) {
    return candidate.includes("collapsed=")
      ? candidate
      : `${candidate}${candidate.includes("?") ? "&" : "?"}collapsed=1`;
  }

  // Standard LinkedIn post URL (e.g., /posts/...-activity-<id>-...). Extract activity id.
  if (/^https?:\/\/www\.linkedin\.com\/posts\//i.test(candidate)) {
    const activity = candidate.match(/activity-(\d+)/i)?.[1];
    if (activity) return `https://www.linkedin.com/embed/feed/update/urn:li:activity:${activity}?collapsed=1`;

    const share = candidate.match(/share-(\d+)/i)?.[1];
    if (share) return `https://www.linkedin.com/embed/feed/update/urn:li:share:${share}?collapsed=1`;

    const ugcPost =
      candidate.match(/ugcpost-(\d+)/i)?.[1] ?? candidate.match(/ugcPost-(\d+)/i)?.[1];
    if (ugcPost) return `https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:${ugcPost}?collapsed=1`;
  }

  // LinkedIn feed URL that contains a URN.
  if (/^https?:\/\/www\.linkedin\.com\/feed\/update\//i.test(candidate)) {
    const m = candidate.match(/(urn:li:(?:activity|share|ugcPost):\d+)/i);
    if (m?.[1]) {
      const base = `https://www.linkedin.com/embed/feed/update/${m[1]}`;
      return base.includes("?") ? base : `${base}?collapsed=1`;
    }
  }

  // Full URL already (non-LinkedIn or otherwise).
  if (/^https?:\/\//i.test(candidate)) return candidate;

  // Full URN (e.g., urn:li:share:..., urn:li:ugcPost:..., urn:li:activity:...)
  if (candidate.startsWith("urn:li:")) {
    const base = `https://www.linkedin.com/embed/feed/update/${candidate}`;
    return base.includes("?") ? base : `${base}?collapsed=1`;
  }

  // Otherwise treat as a raw activity id.
  return `https://www.linkedin.com/embed/feed/update/urn:li:activity:${candidate}?collapsed=1`;
};

const keyFor = (raw: string) => {
  const trimmed = raw.trim();
  return parseIframeAttrs(trimmed).src ?? trimmed;
};

/**
 * LinkedInCarousel
 * - Rotates through curated LinkedIn post embeds (Option A).
 * - Uses official LinkedIn embed endpoint: https://www.linkedin.com/embed/feed/update/urn:li:activity:<id>
 *
 * Notes:
 * - iFrames are heavy; we only mount the active slide and a neighbor.
 * - If a post is not public or embeddable, LinkedIn may show an error.
 */
export function LinkedInCarousel({ activityIds }: { activityIds: string[] }) {
  const [index, setIndex] = useState(0);
  const [maxEmbedHeight, setMaxEmbedHeight] = useState(520);

  // Debug: Log incoming media
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log("LinkedInCarousel media:", activityIds);
  }, [activityIds]);

  const slides = useMemo(
    () => activityIds.map((id) => {
      const src = toEmbedSrc(id);
      const type = isImageSrc(src)
        ? "image"
        : isPdfSrc(src)
        ? "pdf"
        : src.includes("linkedin.com/embed/feed/update")
        ? "linkedin"
        : "other";
      // Debug: Log each slide
      // eslint-disable-next-line no-console
      console.log(`Slide:`, { id, src, type });
      return {
        id: keyFor(id),
        src,
        height: parseIframeAttrs(id).height,
        title: parseIframeAttrs(id).title,
        type,
      };
    }),
    [activityIds]
  );

  useEffect(() => {
    if (slides.length <= 1) return;

    const t = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 7000);
    return () => clearInterval(t);
  }, [slides.length]);

  useEffect(() => {
    const compute = () => {
      // Keep embeds reasonably sized across screens.
      // LinkedIn iframes can be very tall; we cap height to avoid dominating the page.
      const h = typeof window !== "undefined" ? window.innerHeight : 900;
      const auto = Math.floor(h * 0.58);
      setMaxEmbedHeight(Math.max(380, Math.min(520, auto)));
    };

    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  if (!slides.length) return null;

  const current = slides[index];
  const stacked = splitStacked(current.src);
  const isStackedImages = stacked.length > 1 && stacked.every(isImageSrc);
  const slideHeight = Math.min(maxEmbedHeight, 520);

  return (
    <div className="rounded-xl2 border border-[color:var(--stroke)] bg-[color:var(--surface)] shadow-soft overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-[color:var(--stroke)]">
        <div />
        <div className="flex gap-1">
          {slides.map((s, i) => (
            <button
              key={s.id}
              className={`h-2 w-2 rounded-full transition ${i === index ? "bg-[color:var(--ink)]" : "bg-[color:var(--stroke)]"}`}
              onClick={() => setIndex(i)}
              aria-label={`Go to post ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="relative p-4">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-xl overflow-hidden"
          >
            {isStackedImages ? (
              <div className="w-full bg-[color:var(--surface)]" style={{ height: slideHeight }}>
                <div className="h-full flex flex-col gap-2">
                  {stacked.map((src, i) => (
                    <div key={`${src}-${i}`} className="relative w-full flex-1 min-h-0">
                      <Image
                        src={src}
                        alt={current.title ?? `Media ${index + 1}.${i + 1}`}
                        fill
                        sizes="100vw"
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : current.type === "image" ? (
              <div className="relative w-full bg-[color:var(--surface)]" style={{ height: slideHeight }}>
                <Image
                  src={current.src}
                  alt={current.title ?? `Media ${index + 1}`}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  unoptimized
                />
              </div>
            ) : current.type === "pdf" ? (
              <iframe
                src={current.src}
                title={current.title ?? `PDF ${index + 1}`}
                className="w-full"
                style={{ height: Math.min(current.height ?? 580, maxEmbedHeight) }}
                frameBorder={0}
                allowFullScreen
                loading="lazy"
              />
            ) : (
              <iframe
                src={current.src}
                title={current.title ?? `LinkedIn post ${index + 1}`}
                className="w-full"
                style={{ height: Math.min(current.height ?? 580, maxEmbedHeight) }}
                frameBorder={0}
                allowFullScreen
                loading="lazy"
              />
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-4 flex items-center justify-between">
          <button
            className="text-sm text-[color:var(--muted)] hover:text-[color:var(--ink)] transition"
            onClick={() => setIndex((i) => (i - 1 + slides.length) % slides.length)}
          >
            ← Previous
          </button>
          <button
            className="text-sm text-[color:var(--muted)] hover:text-[color:var(--ink)] transition"
            onClick={() => setIndex((i) => (i + 1) % slides.length)}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
