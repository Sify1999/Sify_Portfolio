/**
 * Project content. Every claim here is traceable to either the public
 * repository README or to what Sify has said about the project.
 * `status` labels keep shipped work and planned work visibly separate.
 */
export type Status = "built" | "in-progress" | "planned";

export type Feature = { label: string; status: Status };

export type Project = {
  slug: "riff" | "fd-crossfit";
  name: string;
  tagline: string;
  summary: string;
  why: string;
  repo: string;
  live: string | null;
  stack: { group: string; items: string[] }[];
  features: Feature[];
  decisions: { title: string; body: string }[];
  status: { label: string; note: string };
};

export const projects: Project[] = [
  {
    slug: "riff",
    name: "Riff",
    tagline: "Your music collection, streamed from your own machine.",
    summary:
      "A self-hosted music player. Upload MP3s, build playlists and play them in a responsive browser UI. Metadata and cover art are read straight from the files.",
    why: "Streaming services own your library. Riff keeps it on a disk you control, with just enough product around it to feel like a real player.",
    repo: "https://github.com/Sify1999/Riff",
    live: null,
    stack: [
      { group: "Backend", items: ["Python", "Flask", "Jinja2", "SQLite", "Mutagen"] },
      { group: "Frontend", items: ["Vanilla JavaScript", "HTML5", "CSS3"] },
      { group: "Hosting", items: ["PythonAnywhere"] },
    ],
    features: [
      { label: "MP3 upload with progress tracking", status: "built" },
      { label: "Album art extracted from embedded tags", status: "built" },
      { label: "Playlists: create, edit, delete with confirmation", status: "built" },
      { label: "Real-time song search", status: "built" },
      { label: "Play, pause, previous, next, loop, volume", status: "built" },
      { label: "Accounts with sessions and per-user ownership", status: "built" },
      { label: "Responsive layout with iOS safe-area handling", status: "built" },
      { label: "Favorites, shuffle, recently played", status: "planned" },
      { label: "Lyrics and theme customisation", status: "planned" },
    ],
    decisions: [
      {
        title: "Local files plus SQLite, on purpose",
        body: "The library lives on the filesystem and the metadata in SQLite. That keeps the app tiny and private, and it is also why Vercel was the wrong host: serverless storage is ephemeral. Riff moved to PythonAnywhere, where the filesystem persists.",
      },
      {
        title: "Absolute paths for WSGI",
        body: "Relative upload paths worked in a local shell and returned a 500 under WSGI, because the working directory differs. Every storage path is now anchored to the directory of app.py.",
      },
      {
        title: "Metadata from the file itself",
        body: "Title, artist and cover art come from ID3 tags through Mutagen, so a track needs no manual data entry after upload.",
      },
    ],
    status: {
      label: "Working app, still being refined",
      note: "Deployed to a free hosting tier, so there is no public demo link on this site. The repository has the full source and screenshots.",
    },
  },
  {
    slug: "fd-crossfit",
    name: "FD CrossFit",
    tagline: "A bilingual platform for a CrossFit gym, from workout programming to the athlete's dashboard.",
    summary:
      "A full-stack web app for a gym in Iran. Coaches build structured workouts, athletes log personal records and see the programme, and the whole interface works in English and Persian with proper right-to-left layout.",
    why: "A gym runs on a daily workout, a roster and a few records. FD puts those in one place for both coaches and athletes, in the language the members actually speak.",
    repo: "https://github.com/Sify1999/FDCrossfit",
    live: "https://fd-crossfit.vercel.app",
    stack: [
      { group: "Frontend", items: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "next-intl"] },
      { group: "Backend", items: ["Python 3.12", "FastAPI", "SQLAlchemy (async)", "Alembic", "Pydantic"] },
      { group: "Data and auth", items: ["PostgreSQL 16", "JWT access and refresh tokens", "bcrypt"] },
      { group: "Delivery", items: ["Docker Compose", "Multi-stage Dockerfiles", "uv", "Vercel (frontend)"] },
    ],
    features: [
      { label: "Register, login and token refresh with JWT", status: "built" },
      { label: "Roles: member, coach, admin", status: "built" },
      { label: "Persian and English with RTL support", status: "built" },
      { label: "Structured workout builder: single movement, complex, conditioning, free text", status: "built" },
      { label: "Coach roster with search, and athlete personal records", status: "built" },
      { label: "Dashboard with a rolling 30-day workout picker", status: "built" },
      { label: "Dockerised stack with migrations on start", status: "built" },
      { label: "Training tracks: rooms with cycles and admin-approved join requests", status: "in-progress" },
      { label: "Working contact form by email", status: "planned" },
      { label: "Memberships, bookings, admin dashboard", status: "planned" },
      { label: "Online payments through Iranian gateways", status: "planned" },
      { label: "Automated tests (pytest and Vitest)", status: "planned" },
    ],
    decisions: [
      {
        title: "RTL from day one",
        body: "Layout uses logical CSS properties (text-start, ms-, ps-) instead of left and right, and all navigation goes through one locale-aware router. Adding Persian did not mean rewriting components.",
      },
      {
        title: "Workouts as flexible JSON",
        body: "Movements live in JSONB, so a new field such as rest time rides along without a migration. The movement name is snapshotted next to its id so old workouts never change when the library does.",
      },
      {
        title: "Services behind thin routers",
        body: "Business logic sits in a services layer, schemas are separate from models, and coach-only endpoints share one dependency. Saves are non-optimistic: the API call comes first and the state updates on success.",
      },
      {
        title: "One config, two hosts",
        body: "The frontend runs on Vercel and in Docker. Next's standalone output is switched on only when not on Vercel, so one codebase serves both.",
      },
      {
        title: "Pointer-drag carousels that survive touch and RTL",
        body: "The coach and testimonial carousels use pointer capture and refs rather than state for drag position, and flip direction with the locale.",
      },
    ],
    status: {
      label: "Live frontend, backend still growing",
      note: "Authentication, the workout builder and the records tooling work. Payments, email and the admin dashboard are on the roadmap and are not presented here as finished.",
    },
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
