import Link from "next/link";
import Image from "next/image";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { projects } from "@/content/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { SkillsGrid } from "@/components/SkillsGrid";
import { LinkedInCarousel } from "@/components/LinkedInCarousel";
import { site } from "@/content/site";
import { Duration } from "@/components/Duration";
import { WorkTimeline } from "@/components/WorkTimeline";

export default function Home() {
  return (
    <main>
      <Nav />

      <section className="mx-auto max-w-6xl px-5 pt-16">
        <div className="grid gap-10 items-start lg:grid-cols-[1.15fr_.85fr] md:grid-cols-2 sm:grid-cols-1">
          <Reveal>
            <h1 className="font-display text-4xl sm:text-5xl tracking-tight leading-[1.05]">
              {site.role}
              <span className="block text-xl sm:text-2xl text-[color:var(--muted)] mt-1 mb-2">
                {site.company}
              </span>
              <span
                className="block text-[color:var(--muted)] mt-3 text-xl sm:text-2xl leading-tight"
                dangerouslySetInnerHTML={{ __html: site.tagline }}
              />
            </h1>

            <div className="mt-8 rounded-xl2 border border-[color:var(--stroke)] bg-[color:var(--surface)] p-4 shadow-soft filter brightness-95">
              <p className="text-sm sm:text-base text-[color:var(--muted)] leading-relaxed">
                If you’d like to hear more about my journey, check out this podcast on Spotify we recorded with Rabobank’s CITO:{" "}
                <a
                  className="inline-block font-light text-[color:var(--muted)] underline decoration-[color:var(--accent)] decoration-1 underline-offset-4 transition-transform duration-700 ease-out hover:-translate-y-0.5 hover:text-[color:var(--ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)]"
                  href="https://www.linkedin.com/posts/alexanderzwart_techtalks-podcast-itinnovation-activity-7269668490788179968-ES8G?utm_source=share&utm_medium=member_desktop&rcm=ACoAADFgBC4ByaFkTQsv9_2Bn0zMMAbg_35fOtE"
                  target="_blank"
                  rel="noreferrer"
                >
                  Alexander Zwart
                </a>
                , where we explore my background, experiences, projects and insights.
              </p>
              <div className="mt-4 overflow-hidden rounded-xl">
                <iframe
                  className="w-full"
                  src="https://open.spotify.com/embed/episode/7dytp5KD4z3bdMSWFfZrt4?utm_source=generator&theme=0"
                  width="100%"
                  height="152"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  title="Spotify podcast episode"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-xl2 border border-[color:var(--stroke)] bg-[color:var(--surface)] shadow-soft p-6 filter brightness-95">
              <div className="flex items-center gap-4">
                {/* 👉 Replace this with your headshot: /public/images/headshot.jpg */}
                <div className="h-36 w-36 sm:h-44 sm:w-44 rounded-2xl overflow-hidden border border-[color:var(--stroke)] bg-white/40">
                  <Image
                    src={process.env.NEXT_PUBLIC_BASE_PATH ? `${process.env.NEXT_PUBLIC_BASE_PATH}/images/headshot.png` : "/images/headshot.png"}
                    alt="Headshot"
                    width={384}
                    height={384}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-display text-xl">{site.name}</div>
                  <div className="text-sm text-[color:var(--muted)]">{site.location}</div>
                  <div className="mt-3 text-sm">
                    <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                      <a
                        className="inline-flex items-center gap-2 text-[color:var(--muted)] hover:text-[color:var(--ink)] transition"
                        href={site.links.linkedin}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Image src={process.env.NEXT_PUBLIC_BASE_PATH ? `${process.env.NEXT_PUBLIC_BASE_PATH}/icons/linkedin.svg` : "/icons/linkedin.svg"} alt="" width={16} height={16} />
                        <span className="underline decoration-[color:var(--stroke)] hover:decoration-[color:var(--accent)]">LinkedIn</span>
                      </a>
                      <a
                        className="inline-flex items-center gap-2 text-[color:var(--muted)] hover:text-[color:var(--ink)] transition"
                        href={site.links.github}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Image src={process.env.NEXT_PUBLIC_BASE_PATH ? `${process.env.NEXT_PUBLIC_BASE_PATH}/icons/github.svg` : "/icons/github.svg"} alt="" width={16} height={16} />
                        <span className="underline decoration-[color:var(--stroke)] hover:decoration-[color:var(--accent)]">GitHub</span>
                      </a>
                      <a
                        className="inline-flex items-center gap-2 text-[color:var(--muted)] hover:text-[color:var(--ink)] transition"
                        href={`mailto:${site.links.email}`}
                      >
                        <Image src={process.env.NEXT_PUBLIC_BASE_PATH ? `${process.env.NEXT_PUBLIC_BASE_PATH}/icons/email.svg` : "/icons/email.svg"} alt="" width={16} height={16} />
                        <span className="underline decoration-[color:var(--stroke)] hover:decoration-[color:var(--accent)]">Email</span>
                      </a>
                      <a
                        className="inline-flex items-center gap-2 text-[color:var(--muted)] hover:text-[color:var(--ink)] transition"
                        href="https://open.spotify.com/artist/6XaNXEfQxuGqvzcHEwX6Qw"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Image src={process.env.NEXT_PUBLIC_BASE_PATH ? `${process.env.NEXT_PUBLIC_BASE_PATH}/icons/spotify.svg` : "/icons/spotify.svg"} alt="" width={16} height={16} />
                        <span className="underline decoration-[color:var(--stroke)] hover:decoration-[color:var(--accent)]">Playlist</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <p className="mt-5 text-[color:var(--muted)] leading-relaxed">
                &quot;Highly motivated, proactive, committed, innovative, talented with a wide knowledge base and a relentless work ethic&quot; are a few of the phrases my managers, stakeholders and superiors have used to describe me.
                <br />
                <br />
                What I may lack in experience, I make up for with a high degree of adaptability and neuroplasticity.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="#work"
                  className="rounded-full border border-[color:var(--stroke)] bg-gradient-to-br from-[#f5e9da] to-[#e7d7c1] px-5 py-3 text-sm font-medium transition-all duration-700 hover:shadow-xl hover:bg-gradient-to-br hover:from-[#e7d7c1] hover:to-[#f5e9da] hover:text-[color:var(--ink)] hover:scale-110 hover:-translate-y-1 focus:scale-110 focus:-translate-y-1 active:scale-100"
                >
                  Selected work
                </Link>
                <Link
                  href="/lors"
                  className="rounded-full border border-[color:var(--stroke)] bg-gradient-to-br from-[#f5e9da] to-[#e7d7c1] px-5 py-3 text-sm font-medium transition-all duration-700 hover:shadow-xl hover:bg-gradient-to-br hover:from-[#e7d7c1] hover:to-[#f5e9da] hover:text-[color:var(--ink)] hover:scale-110 hover:-translate-y-1 focus:scale-110 focus:-translate-y-1 active:scale-100"
                >
                  LORs
                </Link>
                <a
                  href="/CV_Vamsi_Krishna_Y.pdf"
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-[color:var(--stroke)] bg-gradient-to-br from-[#f5e9da] to-[#e7d7c1] px-5 py-3 text-sm font-medium transition-all duration-700 hover:shadow-xl hover:bg-gradient-to-br hover:from-[#e7d7c1] hover:to-[#f5e9da] hover:text-[color:var(--ink)] hover:scale-110 hover:-translate-y-1 focus:scale-110 focus:-translate-y-1 active:scale-100"
                >
                  Download CV
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="experience" className="mx-auto max-w-6xl px-5 mt-16">
        <Reveal>
          <h2 className="font-display text-3xl tracking-tight">Work Experience</h2>
          <WorkTimeline />
        </Reveal>
      </section>

      <section id="education" className="mx-auto max-w-6xl px-5 mt-16">
        <Reveal>
          <h2 className="font-display text-3xl tracking-tight">Education</h2>
          <div className="mt-4 space-y-6">
            <div className="rounded-xl2 border border-[color:var(--stroke)] bg-[color:var(--surface)] p-6 shadow-soft">
              <div className="font-display text-xl">BSc Computer Science, Radboud University Nijmegen</div>
              <div className="text-sm text-[color:var(--muted)]">Sept 2019 – Sept 2022 · Nijmegen, Netherlands</div>
              <div className="mt-2 text-[color:var(--muted)]">
                Minor: Artificial Intelligence<br />
                Tracks: Data Science & Cyber security<br />
                <div className="flex items-center gap-2 mt-1">
                  <span>
                    Thesis topic: Automated Tongue Image Analysis for autoimmune disease detection with supervised machine learning models (Grade: 9/10).
                  </span>
                </div>
                <div className="mt-1 flex">
                  <a
                    href="https://www.cs.ru.nl/bachelors-theses/2022/Vamsi_Yerramsetti___1032599___ATIA_-_Automated_Tongue_Image_Analysis_for_autoimmune_disease_detection_with_supervised_machine_learning_models.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-1 rounded bg-[color:var(--surface)] text-[color:var(--muted)] text-[12px] font-medium border border-[color:var(--stroke-light)] hover:bg-[color:var(--surface-alt)] transition"
                    style={{ marginLeft: 0, boxShadow: 'none', letterSpacing: '0.01em' }}
                  >
                    View Thesis
                  </a>
                </div>
              </div>
            </div>
            <div className="rounded-xl2 border border-[color:var(--stroke)] bg-[color:var(--surface)] p-6 shadow-soft">
              <div className="font-display text-xl">Honours Academy of Science, Radboud University Nijmegen</div>
              <div className="text-sm text-[color:var(--muted)]">Sept 2020 – June 2022 · Nijmegen, Netherlands</div>
              <div className="mt-2 text-[color:var(--muted)]">
                Selected for a two-year honors program for talented and motivated students to dive deeper into scientific and technical research.<br />
                Specialized research incubator supporting students in building proposals/thesis with academic training and funding under mentorship of esteemed experts and organizations worldwide.
              </div>
              <div className="mt-1 flex">
                <a
                  href="https://www.researchgate.net/publication/353884834_Developing_an_in_vitro_lung_tumour_organoid-on-_a-chip_model_with_automated_microscopy_and_data-analysis_for_immunotherapy_drug_testing_on_squamous_cell_lung_cancer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-1 rounded bg-[color:var(--surface)] text-[color:var(--muted)] text-[12px] font-medium border border-[color:var(--stroke-light)] hover:bg-[color:var(--surface-alt)] transition"
                  style={{ marginLeft: 0, boxShadow: 'none', letterSpacing: '0.01em' }}
                >
                  View Publication
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
      <section id="work" className="mx-auto max-w-6xl px-5 mt-16">
        <Reveal>
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="font-display text-3xl tracking-tight">Top projects</h2>
            </div>
            <Link className="text-sm text-[color:var(--muted)] hover:text-[color:var(--ink)] transition" href="/projects/">All projects →</Link>
          </div>
        </Reveal>

        <div className="mt-8 grid md:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={0.05 * i}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </section>

      <section id="skills" className="mx-auto max-w-6xl px-5 mt-16">
        <Reveal>
          <h2 className="font-display text-3xl tracking-tight">Skillset</h2>
        </Reveal>
        <div className="mt-7">
          <Reveal delay={0.05}>
            <SkillsGrid />
          </Reveal>
        </div>
      </section>

      <section id="posts" className="mx-auto max-w-6xl px-5 mt-16">
        <Reveal>
          <h2 className="font-display text-3xl tracking-tight">Updates</h2>
        </Reveal>
        <div className="mt-7">
          <Reveal delay={0.05}>
            <LinkedInCarousel activityIds={site.linkedinActivityIds} />
          </Reveal>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-6xl px-5 mt-16">
        <Reveal>
          <div className="rounded-xl2 border border-[color:var(--stroke)] bg-[color:var(--surface)] p-8 shadow-soft">
            <h2 className="font-display text-3xl tracking-tight">Let’s innovate</h2>
            <div className="mt-6 flex flex-wrap gap-3">
              <a className="rounded-full border border-[color:var(--stroke)] bg-gradient-to-br from-[#f5e9da] to-[#e7d7c1] px-5 py-3 text-sm font-medium transition-all duration-700 hover:shadow-xl hover:bg-gradient-to-br hover:from-[#e7d7c1] hover:to-[#f5e9da] hover:text-[color:var(--ink)] hover:scale-110 hover:-translate-y-1 focus:scale-110 focus:-translate-y-1 active:scale-100" href={`mailto:${site.links.email}`}>Email me</a>
              <a className="rounded-full border border-[color:var(--stroke)] bg-gradient-to-br from-[#f5e9da] to-[#e7d7c1] px-5 py-3 text-sm font-medium transition-all duration-700 hover:shadow-xl hover:bg-gradient-to-br hover:from-[#e7d7c1] hover:to-[#f5e9da] hover:text-[color:var(--ink)] hover:scale-110 hover:-translate-y-1 focus:scale-110 focus:-translate-y-1 active:scale-100" href={site.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
              <a className="rounded-full border border-[color:var(--stroke)] bg-gradient-to-br from-[#f5e9da] to-[#e7d7c1] px-5 py-3 text-sm font-medium transition-all duration-700 hover:shadow-xl hover:bg-gradient-to-br hover:from-[#e7d7c1] hover:to-[#f5e9da] hover:text-[color:var(--ink)] hover:scale-110 hover:-translate-y-1 focus:scale-110 focus:-translate-y-1 active:scale-100" href={site.links.github} target="_blank" rel="noreferrer">GitHub</a>
              <a
                href="/project-media/CV%20.Vamsi.Krishna.Y.pdf"
                download
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-[color:var(--stroke)] bg-gradient-to-br from-[#f5e9da] to-[#e7d7c1] px-5 py-3 text-sm font-medium transition-all duration-700 hover:shadow-xl hover:bg-gradient-to-br hover:from-[#e7d7c1] hover:to-[#f5e9da] hover:text-[color:var(--ink)] hover:scale-110 hover:-translate-y-1 focus:scale-110 focus:-translate-y-1 active:scale-100"
              >
                Download CV
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      <Footer />
    </main>
  );
}
