import Image from "next/image";
import Link from "next/link";
import { projects } from "@/content/projects";

const [riff, fd] = projects;

export function Work() {
  return (
    <section id="work" aria-labelledby="work-title">
      <div className="wrap work-intro">
        <h2 id="work-title" className="display">Two products, built properly.</h2>
      </div>

      {/* ---------- Riff ---------- */}
      <article className="stage stage-riff" aria-labelledby="riff-title">
        <div className="wrap stage-grid">
          <div className="stage-copy">
            <h3 id="riff-title" className="display">{riff.name}</h3>
            <p className="stage-tag">{riff.tagline}</p>
            <p className="stage-sum">{riff.summary}</p>
            <p className="stage-meta">
              <span>Flask</span><span>SQLite</span><span>Mutagen</span><span>Vanilla JS</span>
            </p>
            <div className="stage-actions">
              <Link className="btn btn-primary" href="/work/riff">Read the case study</Link>
              <a className="link-quiet" href={riff.repo}>Source on GitHub</a>
            </div>
          </div>
          <div className="shots">
            <figure className="shot shot-a">
              <Image src="/images/riff-home.webp" width={1260} height={400} sizes="(min-width: 960px) 55vw, 100vw" alt="Riff's home screen: a search bar, Songs and Playlists tabs, and a track list with album art." />
              <figcaption>Library view, screenshot from the repository</figcaption>
            </figure>
            <figure className="shot shot-b">
              <Image src="/images/riff-playlist.webp" width={1720} height={470} sizes="(min-width: 960px) 55vw, 100vw" alt="A Riff playlist page listing titles, artists and durations." />
              <figcaption>Playlist view, screenshot from the repository</figcaption>
            </figure>
          </div>
        </div>
      </article>

      {/* ---------- FD CrossFit ---------- */}
      <article className="stage stage-fd" aria-labelledby="fd-title">
        <div className="wrap stage-grid">
          <figure className="concept stage-art">
            <Image src="/images/fd-logo.webp" width={1408} height={768} sizes="(min-width: 960px) 40vw, 100vw" alt="Concept board for the FD CrossFit interface: a home page with workout and membership panels, coach profiles, testimonials and pricing, in black with mint accents." />
            <figcaption><b>Design concept board.</b> The direction for the interface, not a screenshot of the shipped app.</figcaption>
          </figure>
          <div className="stage-copy">
            <h3 id="fd-title">{fd.name}</h3>
            <p className="stage-tag">{fd.tagline}</p>
            <p className="stage-sum">{fd.summary}</p>
            <p className="stage-meta">
              <span>Next.js 15</span><span>FastAPI</span><span>PostgreSQL</span><span>Docker</span><span>EN / FA</span>
            </p>
            <div className="stage-actions">
              <Link className="btn btn-primary" href="/work/fd-crossfit">Read the case study</Link>
              {fd.live && <a className="btn btn-ghost" href={fd.live}>Open the live site</a>}
              <a className="link-quiet" href={fd.repo}>Source on GitHub</a>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
