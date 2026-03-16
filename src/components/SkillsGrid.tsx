"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { site } from "@/content/site";
import { getOfficialDocUrl } from "@/content/docLinks";

export function SkillsGrid() {
  const [tab, setTab] = useState<"tech" | "soft">("tech");

  const SoftSkillIcon = ({ skillKey }: { skillKey: string }) => {
    const common = {
      width: 22,
      height: 22,
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "opacity-90",
    } as const;

    const strokeProps = {
      stroke: "currentColor",
      strokeWidth: 1.8,
      strokeLinecap: "round",
      strokeLinejoin: "round",
    } as const;

    switch (skillKey) {
      case "execution":
        return (
          <svg {...common}>
            <path {...strokeProps} d="M20 7l-9.5 9.5L4 10" />
            <path {...strokeProps} d="M7 20h10" />
          </svg>
        );
      case "teamfirst":
        return (
          <svg {...common}>
            <path
              {...strokeProps}
              d="M12 8.2c.8-1 2.2-1.1 3.1-.3.9.8 1 2.2.2 3.1L12 14.3 8.7 11c-.8-.9-.7-2.3.2-3.1.9-.8 2.3-.7 3.1.3z"
            />
            <circle {...strokeProps} cx="8" cy="15" r="2.2" />
            <circle {...strokeProps} cx="16" cy="15" r="2.2" />
            <path {...strokeProps} d="M4.5 20c.6-2.2 2.2-3.7 5.5-3.7" />
            <path {...strokeProps} d="M19.5 20c-.6-2.2-2.2-3.7-5.5-3.7" />
          </svg>
        );
      case "creativity":
        return (
          <svg {...common}>
            <path {...strokeProps} d="M12 3a6 6 0 0 0-3 11.2V17a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2.8A6 6 0 0 0 12 3z" />
            <path {...strokeProps} d="M10 21h4" />
            <path {...strokeProps} d="M9.5 12.5h5" />
          </svg>
        );
      case "leadership":
        return (
          <svg {...common}>
            <path {...strokeProps} d="M12 3l2.5 5.2 5.7.8-4.1 4 1 5.7-5.1-2.7-5.1 2.7 1-5.7-4.1-4 5.7-.8L12 3z" />
          </svg>
        );
      case "ownership":
        return (
          <svg {...common}>
            <path {...strokeProps} d="M7 10V8a5 5 0 0 1 10 0v2" />
            <path {...strokeProps} d="M6.5 10h11A2.5 2.5 0 0 1 20 12.5v6A2.5 2.5 0 0 1 17.5 21h-11A2.5 2.5 0 0 1 4 18.5v-6A2.5 2.5 0 0 1 6.5 10z" />
            <path {...strokeProps} d="M12 14v3" />
          </svg>
        );
      case "communication":
        return (
          <svg {...common}>
            <path {...strokeProps} d="M7 8h10a4 4 0 0 1 4 4v0a4 4 0 0 1-4 4h-4l-3 3v-3H7a4 4 0 0 1-4-4v0a4 4 0 0 1 4-4z" />
            <path {...strokeProps} d="M8 12h8" />
          </svg>
        );
      case "stakeholders":
        return (
          <svg {...common}>
            <path {...strokeProps} d="M9 11a3 3 0 1 0-6 0c0 1.9 1.4 3 3 3s3-1.1 3-3z" />
            <path {...strokeProps} d="M21 11a3 3 0 1 0-6 0c0 1.9 1.4 3 3 3s3-1.1 3-3z" />
            <path {...strokeProps} d="M12 10.5a3 3 0 1 0-6 0c0 1.9 1.4 3 3 3s3-1.1 3-3z" />
            <path {...strokeProps} d="M2.5 20c.6-2.3 2.5-4 5-4" />
            <path {...strokeProps} d="M21.5 20c-.6-2.3-2.5-4-5-4" />
            <path {...strokeProps} d="M7.5 20c.7-2.6 2.8-4.5 5.5-4.5S17.8 17.4 18.5 20" />
          </svg>
        );
      case "collaboration":
        return (
          <svg {...common}>
            <path {...strokeProps} d="M8 12a3 3 0 0 1 3-3h2" />
            <path {...strokeProps} d="M16 12a3 3 0 0 1-3 3h-2" />
            <path {...strokeProps} d="M10 14l-1 1a3 3 0 0 1-4.2 0 3 3 0 0 1 0-4.2l1-1" />
            <path {...strokeProps} d="M14 10l1-1a3 3 0 0 1 4.2 0 3 3 0 0 1 0 4.2l-1 1" />
          </svg>
        );
      case "product":
        return (
          <svg {...common}>
            <path {...strokeProps} d="M12 3l8 4v10l-8 4-8-4V7l8-4z" />
            <path {...strokeProps} d="M12 3v18" />
            <path {...strokeProps} d="M20 7l-8 4-8-4" />
          </svg>
        );
      case "delivery":
        return (
          <svg {...common}>
            <path {...strokeProps} d="M7 7h10v10H7V7z" />
            <path {...strokeProps} d="M9 12h6" />
            <path {...strokeProps} d="M9 15h4" />
            <path {...strokeProps} d="M9 9h6" />
            <path {...strokeProps} d="M6 7V5h12v2" />
          </svg>
        );
      case "adaptability":
        return (
          <svg {...common}>
            <path {...strokeProps} d="M20 12a8 8 0 0 1-14.7 4" />
            <path {...strokeProps} d="M4 12a8 8 0 0 1 14.7-4" />
            <path {...strokeProps} d="M6 16v-3h-3" />
            <path {...strokeProps} d="M18 8V11h3" />
          </svg>
        );
      case "presenting":
        return (
          <svg {...common}>
            <path {...strokeProps} d="M4 6h16v10H4V6z" />
            <path {...strokeProps} d="M8 20h8" />
            <path {...strokeProps} d="M12 16v4" />
            <path {...strokeProps} d="M7 13l3-3 2 2 4-4" />
          </svg>
        );
      default:
        return (
          <svg {...common}>
            <path {...strokeProps} d="M12 20V10" />
            <path {...strokeProps} d="M12 7h.01" />
            <path {...strokeProps} d="M4 4h16v16H4V4z" />
          </svg>
        );
    }
  };

  return (
    <div>
      <div
        className={
          "inline-flex rounded-full border p-1 transition-colors " +
          (tab === "soft"
            ? "border-[color:var(--stroke)] bg-gradient-to-br from-[#f5e9da] to-[#e7d7c1]"
            : "border-[color:var(--stroke)] bg-white/30")
        }
      >
        <button
          type="button"
          onClick={() => setTab("tech")}
          aria-pressed={tab === "tech"}
          className={
            "rounded-full px-4 py-2 text-sm font-medium transition " +
            (tab === "tech"
              ? "bg-[color:var(--surface)] text-[color:var(--ink)] shadow-soft"
              : "text-[color:var(--muted)] hover:text-[color:var(--ink)]")
          }
        >
          Tech stack
        </button>
        <button
          type="button"
          onClick={() => setTab("soft")}
          aria-pressed={tab === "soft"}
          className={
            "rounded-full px-4 py-2 text-sm font-medium transition " +
            (tab === "soft"
              ? "bg-[color:var(--surface)] text-[color:var(--ink)] shadow-soft"
              : "text-[color:var(--muted)] hover:text-[color:var(--ink)]")
          }
        >
          Soft skills
        </button>
      </div>

      <div className="mt-5">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
          >
            {tab === "tech"
              ? site.skills.map((s) => {
                  const url = getOfficialDocUrl(s.label);
                  const baseClassName =
                    "rounded-xl2 border border-[color:var(--stroke)] bg-[color:var(--surface)] px-4 py-4 shadow-soft flex items-center gap-3" +
                    (url ? " hover:brightness-95" : "");

                  const contents = (
                    <>
                      <div className="h-9 w-9 rounded-xl bg-white/40 border border-[color:var(--stroke)] flex items-center justify-center overflow-hidden">
                        <Image
                          src={`/icons/${s.icon}`}
                          alt={s.label}
                          width={24}
                          height={24}
                          className="opacity-90"
                        />
                      </div>
                      <div className="text-sm font-medium leading-tight">{s.label}</div>
                    </>
                  );

                  return url ? (
                    <motion.a
                      key={s.key}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -4, scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 320, damping: 18 }}
                      className={baseClassName}
                      title={`Open official documentation for ${s.label}`}
                      aria-label={`Open official documentation for ${s.label}`}
                    >
                      {contents}
                    </motion.a>
                  ) : (
                    <motion.div
                      key={s.key}
                      whileHover={{ y: -4, scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 320, damping: 18 }}
                      className={baseClassName}
                      title={s.label}
                    >
                      {contents}
                    </motion.div>
                  );
                })
              : site.softSkills.map((s) => (
                  <motion.div
                    key={s.key}
                    whileHover={{ y: -4, scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 320, damping: 18 }}
                    className="rounded-xl2 border border-[color:var(--stroke)] bg-gradient-to-br from-[#f5e9da] to-[#e7d7c1] px-4 py-4 shadow-soft flex items-center gap-3 text-[color:var(--ink)]"
                    title={s.label}
                  >
                    <div className="h-9 w-9 rounded-xl bg-white/40 border border-[color:var(--stroke)] flex items-center justify-center overflow-hidden text-[color:var(--ink)]">
                      <SoftSkillIcon skillKey={s.key} />
                    </div>
                    <div className="text-sm font-medium leading-tight">{s.label}</div>
                  </motion.div>
                ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
