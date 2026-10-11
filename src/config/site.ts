/**
 * Single place for identity and contact details.
 * Defaults come from the public README on github.com/Sify1999.
 * Override any of them with environment variables (see .env.example).
 * Leave email empty to hide the email link entirely.
 */
const telegramHandle = (process.env.NEXT_PUBLIC_TELEGRAM ?? "Sify1666").replace(/^@/, "");
const email = process.env.NEXT_PUBLIC_EMAIL ?? "Sify_st@yahoo.com";

export const site = {
  name: "Sify",
  title: "Sify — full-stack developer",
  description:
    "Sify builds products end to end: a self-hosted music player in Flask, and a bilingual gym platform in Next.js, FastAPI and PostgreSQL.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  github: "https://github.com/Sify1999",
  telegram: telegramHandle ? { handle: telegramHandle, url: `https://t.me/${telegramHandle}` } : null,
  email: email || null,
} as const;
