"use client";

import Link from "next/link";
import { useCallback, useRef } from "react";
import { site } from "@/content/site";

export function Nav() {
  const headerRef = useRef<HTMLElement | null>(null);

  const onNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
      if (!hash.startsWith("#")) return;
      const id = hash.slice(1);
      const el = document.getElementById(id);
      if (!el) return;

      e.preventDefault();

      const headerHeight = headerRef.current?.getBoundingClientRect().height ?? 0;
      const viewportHeight = window.innerHeight;
      const visibleHeight = Math.max(0, viewportHeight - headerHeight);
      const desiredTopInViewport = headerHeight + visibleHeight * 0.35;

      const elTop = el.getBoundingClientRect().top + window.scrollY;
      const top = Math.max(0, elTop - desiredTopInViewport);

      window.history.pushState(null, "", hash);
      window.scrollTo({ top, behavior: "smooth" });
    },
    []
  );

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 backdrop-blur-xl bg-[color:var(--bg)]/65 border-b border-[color:var(--stroke)]"
    >
      <div className="mx-auto max-w-6xl px-5 py-4 flex items-center justify-between">
        <Link href="/" className="font-display text-lg tracking-tight">
          {site.name}
        </Link>
        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[color:var(--muted)]">
          <Link href="/#experience" className="hover:text-[color:var(--ink)] transition">Work Experience</Link>
          <Link href="/#education" className="hover:text-[color:var(--ink)] transition">Education</Link>
          <Link href="/#work" className="hover:text-[color:var(--ink)] transition">Selected work</Link>
          <Link href="/#skills" className="hover:text-[color:var(--ink)] transition">Skillset</Link>
          <Link href="/#posts" className="hover:text-[color:var(--ink)] transition">Updates</Link>
          <Link href="/#contact" className="hover:text-[color:var(--ink)] transition">Contact</Link>
          <Link href="/lors" className="hover:text-[color:var(--ink)] transition">Letters of Recommendation</Link>
        </nav>
      </div>
    </header>
  );
}
