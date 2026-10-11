import { site } from "@/config/site";

export function About() {
  return (
    <section id="about" className="section about" aria-labelledby="about-title">
      <div className="wrap about-grid">
        <h2 id="about-title" className="display">I learn by building the real thing.</h2>
        <div>
          <div className="about-body">
            <p>
              My GitHub starts with small C# desktop tools and Python scripts. It continues with a Flask
              app that handles uploads, metadata and playlists, and arrives at a full-stack platform with
              a typed frontend, an async API, a PostgreSQL database and a Docker setup.
            </p>
            <p>
              Each project is a step past the last one, and each one taught me something the tutorials
              skipped: why a serverless host cannot keep your music files, why a relative path breaks under
              WSGI, why right-to-left layout has to be designed in on day one.
            </p>
            <p>
              I&rsquo;m still learning C# and Python in depth, and I&rsquo;m open to collaborating on C++, C# and
              Python projects.
            </p>
          </div>
          <dl className="ledger">
            <div><dt>Public repositories</dt><dd>12, on <a href={site.github}>GitHub</a></dd></div>
            <div><dt>Shipped and live</dt><dd>FD CrossFit frontend on Vercel</dd></div>
            <div><dt>Currently learning</dt><dd>C# and Python</dd></div>
            <div><dt>Interface languages</dt><dd>English and Persian, including right-to-left</dd></div>
          </dl>
        </div>
      </div>
    </section>
  );
}
