import { Glyph } from "./Glyph";
import { phases, type PhaseKey } from "@/content/path";
import { site } from "@/config/site";

export function Path() {
  return (
    <section id="path" className="section path" aria-labelledby="path-title">
      <div className="wrap">
        <h2 id="path-title" className="display">Change, adapt, evolve, learn.</h2>
        <p className="path-note">
          The idea I work by, mapped onto my repositories. Ordered by how far each project reaches,
          not by date.
        </p>
        <ol className="steps">
          {phases.map((p) => (
            <li className="step" key={p.key}>
              <Glyph phase={p.key as PhaseKey} size={34} />
              <h3>{p.word}</h3>
              <p className="step-line">{p.line}</p>
              <p className="step-body">{p.body}</p>
              <p className="step-repos">
                {p.repos.map((r) => (
                  <a key={r} href={`${site.github}/${r}`}>{r}</a>
                ))}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
