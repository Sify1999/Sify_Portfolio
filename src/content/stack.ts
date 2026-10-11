/**
 * The technical map. Only technologies that appear in Sify's repositories
 * or are named as current learning in the GitHub profile README.
 */
export type Node = {
  id: string;
  label: string;
  group: "language" | "frontend" | "backend" | "data" | "delivery";
  note: string;
  projects: string[];
  learning?: boolean;
};

export const groups: Record<Node["group"], string> = {
  language: "Languages",
  frontend: "Frontend",
  backend: "Backend",
  data: "Data",
  delivery: "Delivery",
};

export const nodes: Node[] = [
  { id: "python", label: "Python", group: "language", note: "Flask, FastAPI and small automation scripts.", projects: ["Riff", "FD CrossFit", "CurrencyScraperToman"] },
  { id: "ts", label: "TypeScript", group: "language", note: "Typed React on the FD CrossFit frontend.", projects: ["FD CrossFit"] },
  { id: "js", label: "JavaScript", group: "language", note: "Riff's player is written in plain JavaScript, no framework.", projects: ["Riff"] },
  { id: "csharp", label: "C#", group: "language", note: "Windows desktop utilities. Still learning.", projects: ["To-Do-List", "Weather-App", "CSharp-PasswordGen"], learning: true },

  { id: "next", label: "Next.js 15", group: "frontend", note: "App Router, locale-aware routing.", projects: ["FD CrossFit"] },
  { id: "react", label: "React 19", group: "frontend", note: "Modals, carousels, the workout builder.", projects: ["FD CrossFit"] },
  { id: "tailwind", label: "Tailwind CSS", group: "frontend", note: "Logical properties for RTL.", projects: ["FD CrossFit"] },
  { id: "i18n", label: "next-intl", group: "frontend", note: "English and Persian messages.", projects: ["FD CrossFit"] },

  { id: "flask", label: "Flask", group: "backend", note: "Sessions, uploads, playlist routes.", projects: ["Riff"] },
  { id: "fastapi", label: "FastAPI", group: "backend", note: "Async API with JWT auth and role checks.", projects: ["FD CrossFit"] },
  { id: "sqlalchemy", label: "SQLAlchemy + Alembic", group: "backend", note: "Async ORM and migrations.", projects: ["FD CrossFit"] },
  { id: "mutagen", label: "Mutagen", group: "backend", note: "ID3 tags and embedded cover art.", projects: ["Riff"] },

  { id: "sqlite", label: "SQLite", group: "data", note: "Riff's library and playlists.", projects: ["Riff"] },
  { id: "postgres", label: "PostgreSQL 16", group: "data", note: "Users, workouts, records. JSONB for movements.", projects: ["FD CrossFit"] },

  { id: "docker", label: "Docker Compose", group: "delivery", note: "Database, API and frontend in one command.", projects: ["FD CrossFit"] },
  { id: "vercel", label: "Vercel", group: "delivery", note: "FD CrossFit's frontend.", projects: ["FD CrossFit"] },
  { id: "pythonanywhere", label: "PythonAnywhere", group: "delivery", note: "Where Riff runs, because it needs a persistent disk.", projects: ["Riff"] },
];

/** Edges describe how the pieces actually connect inside the two products. */
export const links: [string, string][] = [
  ["python", "flask"], ["python", "fastapi"], ["python", "mutagen"],
  ["flask", "sqlite"], ["flask", "mutagen"], ["js", "flask"],
  ["fastapi", "sqlalchemy"], ["sqlalchemy", "postgres"],
  ["ts", "react"], ["react", "next"], ["next", "tailwind"], ["next", "i18n"], ["next", "fastapi"],
  ["docker", "postgres"], ["docker", "fastapi"], ["docker", "next"],
  ["vercel", "next"], ["pythonanywhere", "flask"],
];
