# CLAUDE.md — Instructions for Claude Code

## Project
Mai Mony — personal finance tracking app. Single user (the developer). See README.md and DECISIONS.md for full context.

## Rules

### Branching & PRs
- **ALL work happens on branches. Never commit directly to `main` — not even docs, config, or minor fixes.**
- Each feature (from the roadmap in DECISIONS.md) gets its own branch: `feature/<name>` (e.g. `feature/scaffold`, `feature/db-schema`).
- Work is merged to `main` via PR only.
- Within a feature branch, commit at meaningful sub-steps — each commit should represent a coherent, working increment (e.g. "add login page", "add auth middleware", "add app shell layout").
- After completing a feature: open a PR to `main`, summarize what was done, show the next feature, and wait for explicit user confirmation before starting the next branch.

### Quality Gates
Before opening a PR:
1. `npm run lint` — must pass with no errors
2. `npm run build` — must pass with no type errors
3. If tests exist: `npm test` — all tests must pass

Write tests for any non-trivial logic (API routes, utility functions, auth middleware). Use Jest + React Testing Library.

### Documentation
- Keep README.md, DECISIONS.md, and this file updated as the project evolves.
- Update the checklist in DECISIONS.md when features are completed.

### Code Style
- TypeScript strict mode. No `any` unless unavoidable.
- Prefer server components and server actions over client-side data fetching where possible.
- Use shadcn/ui components. Do not introduce other UI libraries.
- Tailwind for all styling. No CSS modules or styled-components.
- Env vars: never hardcode secrets. Always use `.env.local` and document in `.env.example`.

### Costs
- Everything must stay on free tiers. Flag any choice that has a cost implication before implementing.

### Auth
- Auth is a single `APP_PASSWORD` env var checked in `middleware.ts`. Do not add user management, sessions tables, or OAuth providers.

### AI (Claude API)
- Claude API calls happen only in `/api/analyze`. Never add scheduled or automatic Claude calls.

## Environment Variables
See `.env.example` for all required variables. Copy to `.env.local` and fill in values before running the app.
