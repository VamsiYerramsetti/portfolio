import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-2xl px-5 py-24">
      <h1 className="font-display text-4xl tracking-tight">Not found</h1>
      <p className="mt-3 text-[color:var(--muted)]">The page you’re looking for doesn’t exist.</p>
      <Link href="/" className="mt-8 inline-flex text-sm text-[color:var(--muted)] hover:text-[color:var(--ink)] transition">← Back home</Link>
    </main>
  );
}
