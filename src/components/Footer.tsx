import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-[color:var(--stroke)] mt-20">
      <div className="mx-auto max-w-6xl px-5 py-10 text-sm text-[color:var(--muted)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>© {new Date().getFullYear()} {site.name}.</div>
        <div className="flex gap-4">
          <a className="hover:text-[color:var(--ink)] transition" href={site.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a className="hover:text-[color:var(--ink)] transition" href={site.links.github} target="_blank" rel="noreferrer">GitHub</a>
          <a className="hover:text-[color:var(--ink)] transition" href={`mailto:${site.links.email}`}>Email</a>
        </div>
      </div>
    </footer>
  );
}
