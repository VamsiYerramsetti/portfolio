"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "./utils";
import type { Project } from "@/content/projects";
import { getOfficialDocUrl } from "@/content/docLinks";
import { OfficialDocText } from "@/components/OfficialDocText";

export function ProjectCard({ project, className }: { project: Project; className?: string }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className={cn(
        "group relative rounded-xl2 border border-[color:var(--stroke)] bg-[color:var(--surface)] p-6 shadow-soft overflow-hidden transition-[filter] duration-300 hover:brightness-90",
        className
      )}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute -left-1/2 top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:animate-sheen" />
      </div>
      <div className="relative">
        <h3 className="font-display text-xl tracking-tight">{project.title}</h3>
        <p className="mt-2 text-[color:var(--muted)] leading-relaxed">
          <OfficialDocText text={project.summary} />
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
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
        <Link
          href={`/projects/${project.slug}`}
          className="mt-6 inline-flex items-center gap-2 text-sm text-[color:var(--ink)] font-medium"
        >
          Read case study <span className="opacity-60">→</span>
        </Link>
      </div>
    </motion.div>
  );
}
