# Sify — portfolio

Next.js 15 (App Router), React 19, TypeScript. No backend, no CMS.

## Run
    npm install
    npm run dev          # http://localhost:3000
    npm run build && npm start
    npm run lint && npm run typecheck

## Edit content
- Contact and identity: `src/config/site.ts` (or env vars, see `.env.example`)
- Projects, features and their status: `src/content/projects.ts`
- Tech map: `src/content/stack.ts`
- Change / Adapt / Evolve / Learn timeline: `src/content/path.ts`
- Design tokens: top of `src/app/globals.css`

## Easter eggs
- `` ` `` or Ctrl/Cmd+K opens a terminal (`help` lists commands)
- Konami code, or the `noir` command, toggles the noir palette
- The bench in the footer

## Deploy
Import the repo on Vercel with default Next.js settings. Set `NEXT_PUBLIC_SITE_URL` to the real domain.
