# FlyRank — Frontend AI Engineering Coursework

**StudyFlow** is an independent React + TypeScript demonstration for FlyRank Frontend AI Engineering coursework. It combines a routed capstone skeleton, a validated settings form, and three custom ARIA patterns in one browser application. It is **not** the original assignment reference application.

## Scope by assignment

| Assignment | Implemented source | Evidence still needed |
|---|---|---|
| FE-01 — Environment and AI Toolchain | README, MIT license, `.gitignore`, `CLAUDE.md`, TypeScript toolchain | Publish as its own GitHub repo; 3 Conventional Commits; real agent/editor screenshot |
| FE-03 — AI-assisted Workflow Drill | Validated Settings form; source comparison and prompt artifacts | Two independently run and measured Git branches and 300–500 word comparison |
| FE-04 — Capstone Skeleton, Deployed | Six routes, placeholder insights, design tokens/Tailwind, fetched static health data | Build and verify on Vercel/Netlify, 375px and 1280px screenshots, real live URL |
| FE-05 — Accessible Component Fundamentals | Custom modal, tabs and disclosures, keyboard test source | Execute keyboard tests and add shadcn/ui-generated dialog/tabs plus source-level comparison |
| React App Development with AI | StudyFlow React task board + settings + navigation | Verify similarity against trainer's reference application; provide real AI prompts, correction history, and demo |

**Status:** Work in progress. The repository and code alone are not proof of a successful build, a deployed URL, a shadcn installation or a completed FlyRank portal submission.

## Local run

Requires Node.js LTS and npm. From this directory:

```bash
npm install
npm run typecheck
npm test
npm run build
npm run dev
```

Use `http://localhost:5173`. The health route requests `/health.json` over HTTP; it does not probe a backend.

## Routes

- `/`: overview
- `/tasks`: interactive task board
- `/insights`: honest routed placeholder
- `/settings`: validated form with browser-local settings
- `/playground`: hand-written modal, tabs, disclosures
- `/health`: JSON fetch with loading/error/success states

## shadcn/ui follow-up

Following [the official Vite integration guide](https://ui.shadcn.com/docs/installation/vite), **once package installation is possible**:

```bash
npx shadcn@latest init
npx shadcn@latest add dialog tabs
```

Compare generated Radix-based code with `src/playground/Dialog.tsx` and `src/playground/Tabs.tsx`, then write concrete differences in `NOTES.md`. This step is **not yet executed**.

## Recommended deployment

Create a dedicated public GitHub repo for this capstone (the current protected working branch is not a substitute for FE-01's own repo). Connect to Vercel or Netlify, build `npm run build`, output `dist`, and configure an SPA fallback so deep links work. Commit only non-sensitive config. Verify preview on each push before adding the live URL to the FE-04 Notion page.

Author: Abdullah Ragab.
