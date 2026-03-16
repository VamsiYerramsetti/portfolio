"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Duration } from "@/components/Duration";
import { getOfficialDocUrl } from "@/content/docLinks";

export function WorkTimeline() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const rafId = useRef<number | null>(null);

  const scrumUrl = getOfficialDocUrl("Scrum");
  const djangoUrl = getOfficialDocUrl("Django");
  const pytorchUrl = getOfficialDocUrl("PyTorch");
  const mlopsUrl = getOfficialDocUrl("MLOps");

  const scheduleUpdate = () => {
    if (rafId.current != null) return;
    rafId.current = window.requestAnimationFrame(() => {
      rafId.current = null;

      const scroller = scrollerRef.current;
      if (!scroller) return;

      const scrollerRect = scroller.getBoundingClientRect();
      const centerX = scrollerRect.left + scrollerRect.width / 2;

      let bestIndex = 0;
      let bestDistance = Number.POSITIVE_INFINITY;

      for (let i = 0; i < cardRefs.current.length; i += 1) {
        const el = cardRefs.current[i];
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const elCenterX = rect.left + rect.width / 2;
        const distance = Math.abs(elCenterX - centerX);
        if (distance < bestDistance) {
          bestDistance = distance;
          bestIndex = i;
        }
      }

      setActiveIndex((prev) => (prev === bestIndex ? prev : bestIndex));
    });
  };

  useEffect(() => {
    scheduleUpdate();
    const onResize = () => scheduleUpdate();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      if (rafId.current != null) window.cancelAnimationFrame(rafId.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cardBase = useMemo(
    () =>
      "rounded-xl2 border border-[color:var(--stroke)] bg-[color:var(--surface)] p-5 shadow-soft",
    []
  );

  const inactive = "";
  const active = "";

  return (
    <div className="mt-6 relative">
      <div className="hidden md:block absolute left-0 right-0 top-1/2 h-px bg-[color:var(--stroke)]" />

      <div
        ref={scrollerRef}
        onScroll={scheduleUpdate}
        className="flex gap-4 overflow-x-auto overflow-y-hidden rounded-xl2 pb-6 pr-12 md:pr-20 snap-x snap-mandatory md:h-[560px]"
      >
        {/* 0 — MOCIA (top) */}
        <div className="group relative min-w-[270px] md:min-w-[320px] snap-start md:h-full">
          <div
            className={
              "hidden md:block absolute left-4 top-1/2 z-10 h-3 w-3 -translate-y-1/2 rounded-full border border-[color:var(--stroke)] bg-[color:var(--accent)]"
            }
          />
          <div
            ref={(el) => {
              cardRefs.current[0] = el;
            }}
            className={cardBase + " md:absolute md:left-12 md:right-0 md:top-24"}
          >
            <div className="font-medium">Machine learning research Intern</div>
            <div className="text-sm text-[color:var(--muted)]">MOCIA · Internship</div>
            <div className="mt-2 text-sm">Sep 2021 – Feb 2022 · 6 mos</div>
            <div className="text-sm text-[color:var(--muted)]">Nijmegen, Gelderland, Netherlands</div>
          </div>

          <div className="pointer-events-none absolute left-0 right-0 top-full z-20 mt-2 opacity-0 transition-opacity duration-500 delay-[750ms] group-hover:opacity-100 group-hover:delay-0 md:top-1/2 md:mt-0 md:translate-y-6">
            <div className="mx-auto w-[min(420px,100%)] rounded-xl2 border border-[color:var(--stroke)] bg-gradient-to-br from-[#f5e9da] to-[#e7d7c1] p-4 shadow-soft">
              <p className="text-sm text-[color:var(--muted)] leading-relaxed">
                Interned with the MOCIA work package 2 team to develop and test predictive computational models by combining advanced machine learning techniques with conventional statistical approaches that have been employed for precision medicine.
              </p>
            </div>
          </div>
        </div>

        {/* 1 — Optimal Planet (bottom) */}
        <div className="group relative min-w-[270px] md:min-w-[320px] snap-start md:h-full">
          <div
            className={
              "hidden md:block absolute left-4 top-1/2 z-10 h-3 w-3 -translate-y-1/2 rounded-full border border-[color:var(--stroke)] bg-[color:var(--accent)]"
            }
          />
          <div
            ref={(el) => {
              cardRefs.current[1] = el;
            }}
            className={cardBase + " md:absolute md:left-12 md:right-0 md:bottom-24"}
          >
            <div className="font-medium">Software Engineer Intern</div>
            <div className="text-sm text-[color:var(--muted)]">Optimal Planet · Internship</div>
            <div className="mt-2 text-sm">Jan 2022 – Jun 2022 · 6 mos</div>
            <div className="text-sm text-[color:var(--muted)]">Nijmegen, Gelderland, Netherlands</div>
          </div>

          <div className="pointer-events-none absolute left-0 right-0 top-full z-20 mt-2 opacity-0 transition-opacity duration-500 delay-[750ms] group-hover:opacity-100 group-hover:delay-0 md:top-1/2 md:mt-0 md:-translate-y-[calc(100%+1.25rem)]">
            <div className="mx-auto w-[min(360px,100%)] rounded-xl2 border border-[color:var(--stroke)] bg-gradient-to-br from-[#f5e9da] to-[#e7d7c1] p-4 shadow-soft">
              <p className="text-sm text-[color:var(--muted)] leading-relaxed">
                Developed city-wide sustainability scanning tools for Optimal Planet in{" "}
                {scrumUrl ? (
                  <a
                    className="underline decoration-[color:var(--stroke)] hover:decoration-[color:var(--accent)]"
                    href={scrumUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    SCRUM
                  </a>
                ) : (
                  "SCRUM"
                )}{" "}
                teams at GipHouse. Redesigned the website using{" "}
                {djangoUrl ? (
                  <a
                    className="underline decoration-[color:var(--stroke)] hover:decoration-[color:var(--accent)]"
                    href={djangoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Django
                  </a>
                ) : (
                  "Django"
                )}
                , HTML, CSS, and JS.
              </p>
            </div>
          </div>
        </div>

        {/* 2 — Ca’ Foscari (top) */}
        <div className="group relative min-w-[270px] md:min-w-[320px] snap-start md:h-full">
          <div
            className={
              "hidden md:block absolute left-4 top-1/2 z-10 h-3 w-3 -translate-y-1/2 rounded-full border border-[color:var(--stroke)] bg-[color:var(--accent)]"
            }
          />
          <div
            ref={(el) => {
              cardRefs.current[2] = el;
            }}
            className={cardBase + " md:absolute md:left-12 md:right-0 md:top-24"}
          >
            <div className="font-medium">Computer vision research Intern</div>
            <div className="text-sm text-[color:var(--muted)]">Università Ca’ Foscari Venezia · Internship</div>
            <div className="mt-2 text-sm">Feb 2022 – Mar 2022 · 2 mos</div>
            <div className="text-sm text-[color:var(--muted)]">Venice, Veneto, Italy</div>
          </div>

          <div className="pointer-events-none absolute left-0 right-0 top-full z-20 mt-2 opacity-0 transition-opacity duration-500 delay-[750ms] group-hover:opacity-100 group-hover:delay-0 md:top-1/2 md:mt-0 md:translate-y-6">
            <div className="mx-auto w-[min(380px,100%)] rounded-xl2 border border-[color:var(--stroke)] bg-gradient-to-br from-[#f5e9da] to-[#e7d7c1] p-4 shadow-soft">
              <p className="text-sm text-[color:var(--muted)] leading-relaxed">
                Studied and implemented a computer-vision approach to solve jigsaw puzzles using GANs in Prof. Dr. Marcello Pelillo’s lab. Utilized{" "}
                {pytorchUrl ? (
                  <a
                    className="underline decoration-[color:var(--stroke)] hover:decoration-[color:var(--accent)]"
                    href={pytorchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    PyTorch
                  </a>
                ) : (
                  "PyTorch"
                )}{" "}
                and modern machine learning concepts, balancing efficiency with algorithmic complexity.
              </p>
            </div>
          </div>
        </div>

        {/* 3 — Rabobank (bottom) */}
        <div className="relative min-w-[270px] md:min-w-[420px] snap-start md:h-full">
          <div
            className={
              "hidden md:block absolute left-4 top-1/2 z-10 h-3 w-3 -translate-y-1/2 rounded-full border border-[color:var(--stroke)] bg-[color:var(--accent)]"
            }
          />
          <div
            ref={(el) => {
              cardRefs.current[3] = el;
            }}
            className={cardBase + " md:absolute md:left-12 md:right-0 md:bottom-0"}
          >
            <div className="font-medium">Rabobank</div>
            <div className="text-sm text-[color:var(--muted)]">
              Full-time · <Duration from="2022-10-01" fallback="3 yrs 6 mos" />
            </div>
            <div className="text-sm text-[color:var(--muted)]">Utrecht, Netherlands</div>

            <div className="mt-4 border-t border-[color:var(--stroke)] pt-4">
              <div className="font-medium">Machine Learning Engineer II</div>
              <div className="mt-1 text-sm">
                Aug 2024 – Present · <Duration from="2024-08-01" fallback="1 yr 8 mos" />
              </div>
              <p className="mt-2 text-[12px] text-[color:var(--muted)] leading-relaxed">
                We develop and optimize models to prevent over-crediting by predicting customer defaults and aiding loan approvals through data analysis, engineering, and validation with cross-functional teams in an{" "}
                {mlopsUrl ? (
                  <a
                    className="underline decoration-[color:var(--stroke)] hover:decoration-[color:var(--accent)]"
                    href={mlopsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    MLOps
                  </a>
                ) : (
                  "MLOps"
                )}{" "}
                environment.
              </p>
            </div>

            <div className="mt-4 border-t border-[color:var(--stroke)] pt-4">
              <div className="font-medium">Machine Learning Engineer I</div>
              <div className="mt-1 text-sm">Oct 2022 – Aug 2024 · 1 yr 11 mos</div>
              <ul className="mt-2 list-disc pl-5 text-[12px] text-[color:var(--muted)] leading-relaxed">
                <li>Product Owner and ML engineer of the “Automated loan prospecting dashboard for Dutch Start-up and Scale-ups” project.</li>
                <li>Solution Architect and ML engineer of the North American Rabobank Sustainability team’s “Farmer Sustainability Platform”.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
