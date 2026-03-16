import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { projects } from "@/content/projects";
import { ProjectCard } from "@/components/ProjectCard";

export default function ProjectsPage() {
  return (
    <main>
      <Nav />
      <section className="mx-auto max-w-6xl px-5 pt-12">
        <h1 className="font-display text-4xl tracking-tight">Projects</h1>
        <p className="mt-3 text-[color:var(--muted)] max-w-2xl">A compact archive of the work I’m proud of. Each item focuses on the problem, constraints, approach and outcomes.</p>
        <div className="mt-8 grid md:grid-cols-3 gap-5">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
        <div className="mt-10">
          <Link href="/" className="text-sm text-[color:var(--muted)] hover:text-[color:var(--ink)] transition">← Back home</Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
