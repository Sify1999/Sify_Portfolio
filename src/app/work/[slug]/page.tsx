import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Features } from "@/components/Features";
import { getProject, projects } from "@/content/projects";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: project.name, description: project.summary, alternates: { canonical: `/work/${slug}` } };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const next = projects[(projects.findIndex((p) => p.slug === slug) + 1) % projects.length];
  const isFd = project.slug === "fd-crossfit";

  return (
    <div className={isFd ? "theme-fd" : undefined}>
      <header className="wrap detail-hero">
        <Link href="/#work" className="detail-back link-quiet">Back to all work</Link>
        <h1 className="display">{project.name}</h1>
        <p className="detail-tag">{project.tagline}</p>
        <div className="detail-actions">
          {project.live && <a className="btn btn-primary" href={project.live}>Open the live site</a>}
          <a className={`btn ${project.live ? "btn-ghost" : "btn-primary"}`} href={project.repo}>Source on GitHub</a>
        </div>
      </header>

      <div className="wrap detail-cols">
        <div>
          <section className="detail-block" aria-labelledby="what">
            <h2 id="what">What it is</h2>
            <p>{project.summary}</p>
          </section>
          <section className="detail-block" aria-labelledby="why">
            <h2 id="why">Why it exists</h2>
            <p>{project.why}</p>
          </section>
          <section className="detail-block" aria-labelledby="status">
            <h2 id="status">Where it stands</h2>
            <p className="status-note"><b>{project.status.label}</b><span>{project.status.note}</span></p>
          </section>
          <section className="detail-block" aria-labelledby="stack">
            <h2 id="stack">Stack</h2>
            <dl className="detail-stack">
              {project.stack.map((s) => (
                <div key={s.group}><dt>{s.group}</dt><dd>{s.items.join(", ")}</dd></div>
              ))}
            </dl>
          </section>
        </div>
        <div>
          <section className="detail-block" aria-labelledby="decisions">
            <h2 id="decisions">Decisions worth explaining</h2>
            <div className="decisions">
              {project.decisions.map((d) => (
                <div key={d.title}><h3>{d.title}</h3><p>{d.body}</p></div>
              ))}
            </div>
          </section>
          <section className="detail-block" aria-labelledby="features">
            <h2 id="features">Features and status</h2>
            <Features items={project.features} />
          </section>
        </div>
      </div>

      {project.slug === "riff" && (
        <div className="wrap detail-shots">
          <figure className="shot">
            <Image src="/images/riff-home.webp" width={1260} height={400} sizes="(min-width: 1240px) 1160px, 100vw" alt="Riff's home screen with search, Songs and Playlists tabs and a track list." />
            <figcaption>Library view, screenshot from the repository</figcaption>
          </figure>
          <figure className="shot">
            <Image src="/images/riff-playlist.webp" width={1720} height={470} sizes="(min-width: 1240px) 1160px, 100vw" alt="A Riff playlist with titles, artists and track lengths." />
            <figcaption>Playlist view, screenshot from the repository</figcaption>
          </figure>
        </div>
      )}
      {isFd && (
        <div className="wrap detail-shots">
          <figure className="concept">
            <Image src="/images/fd-logo.webp" width={1408} height={768} sizes="(min-width: 1240px) 1160px, 100vw" alt="Concept board for the FD CrossFit interface in black and mint." />
            <figcaption><b>Design concept board.</b> The visual direction, not a screenshot of the shipped app.</figcaption>
          </figure>
        </div>
      )}

      <aside className="wrap next-project" aria-label="Next project">
        <Link href={`/work/${next.slug}`}>
          <span className="muted">Next project</span>
          <p className="display">{next.name}</p>
        </Link>
      </aside>
    </div>
  );
}
