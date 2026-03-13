# Architecture Decisions

## Auth
Single-user middleware password. `APP_PASSWORD` env var checked in `middleware.ts`. Sets an httpOnly Secure cookie on success. No DB, no user table.

**Why:** App is for one person. Full auth stack is overkill and adds cost/complexity.

## Frontend
Next.js 14 App Router + TypeScript + Tailwind CSS.

**Why:** App Router enables server components and route-level middleware. TypeScript catches mistakes early. Tailwind enables rapid custom theming.

## UI Components
shadcn/ui. Pastel-neon theme (lavender `#C4B5FD`, light green `#86EFAC`, light blue `#7DD3FC`) with matrix/futuristic accents (dark bg, monospace fonts, subtle scanlines).

**Why:** shadcn/ui gives full control over component source. Theme reflects personal aesthetic preference.

## Database
Supabase (PostgreSQL, free tier).

**Why:** Free tier covers this scale. PostgreSQL is solid. Supabase provides auto-generated types and a JS client.

## Bank / Investment Data
Plaid — sandbox first, then dev mode for real accounts (Chase CC + Schwab brokerage).

**Why:** Plaid is the standard for US bank connectivity. Sandbox lets us build and test without real credentials.

## Email
Resend — free tier (3k/mo).

**Why:** Simple API. Free tier is plenty for personal use (budget alerts only).

## AI
Claude API — on-demand only, never scheduled.

**Why:** Scheduled AI calls would burn tokens unnecessarily. User triggers analysis manually.

## Hosting + Cron
Vercel free tier. Daily cron is the max on free tier.

**Why:** Zero cost. Daily sync is sufficient for personal finance tracking.

## Dark Mode
Included in design system but low priority.

---

## Phased Roadmap

Each feature is a branch (`feature/<name>`) merged to `main` via PR.

### Feature 1 — Scaffold ✅ (branch: `feature/scaffold`)
- [x] Init Next.js 14 project (TypeScript, Tailwind, App Router, ESLint)
- [x] Install + configure shadcn/ui
- [x] Apply pastel-neon + matrix theme (CSS variables, custom Tailwind config)
- [x] Implement single-user auth (middleware.ts + login page + httpOnly cookie)
- [x] Basic app shell layout (sidebar nav, header)
- [x] Supabase project setup + client lib (`lib/supabase.ts`)
- [x] Vercel deploy + env vars configured

### Feature 2 — Plaid Sandbox (branch: `feature/plaid-sandbox`)
Connect a sandbox account first to see exactly what data Plaid returns before designing the schema.
- [ ] Plaid client (`lib/plaid.ts`)
- [ ] `/api/plaid/create-link-token` + `/api/plaid/exchange-token`
- [ ] Plaid Link UI flow (sandbox test account)
- [ ] Inspect raw data: transactions, accounts, holdings
- [ ] Document data shape to inform schema design

### Feature 3 — Database Schema (branch: `feature/db-schema`)
Designed based on actual Plaid data shape from Feature 2.
- [ ] Supabase migration: `accounts`, `transactions`, `holdings`, `budgets`, `notifications`
- [ ] Types generated from Supabase schema (`types/database.ts`)

### Feature 4 — Plaid Production (branch: `feature/plaid-prod`)
- [ ] Connect real Chase CC account
- [ ] Connect real Schwab brokerage account
- [ ] `/api/plaid/webhook` — sync transactions + holdings to Supabase
- [ ] `/api/cron/daily-sync` — fallback full sync

### Feature 5 — Dashboard + Transactions (branch: `feature/dashboard`)
- [ ] Spending by month/category/merchant charts
- [ ] Transaction list with search + category filter

### Feature 6 — Investments (branch: `feature/investments`)
- [ ] Schwab portfolio snapshot (ESPP, RSU, holdings, values)

### Feature 7 — Budgets + Alerts (branch: `feature/budgets`)
- [ ] Category budget thresholds
- [ ] Resend email alerts on threshold breach
- [ ] In-app notification center

### Feature 8 — AI Analysis (branch: `feature/ai-analysis`)
- [ ] `/api/analyze` — Claude API call with transaction + holdings context
- [ ] "Analyze my finances" button + inline response on dashboard
