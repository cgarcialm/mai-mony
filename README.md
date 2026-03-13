# Mai Mony

Personal finance tracking app. Single-user. Tracks spending (Chase CC) and investments (Schwab brokerage — ESPP, RSU, holdings).

## Stack

| Layer | Tool |
|---|---|
| Frontend | Next.js 14 App Router + TypeScript + Tailwind CSS |
| UI | shadcn/ui (pastel-neon / matrix theme) |
| Database | Supabase (PostgreSQL, free tier) |
| Bank/investment data | Plaid (sandbox → dev mode) |
| Email alerts | Resend (free tier, 3k/mo) |
| AI analysis | Claude API (on-demand only) |
| Hosting + cron | Vercel (free tier, daily cron max) |
| Auth | Single-user middleware password (`APP_PASSWORD` env var, httpOnly Secure cookie) |

## Theme

Pastel neon on dark: lavender `#C4B5FD`, light green `#86EFAC`, light blue `#7DD3FC`. Matrix/futuristic accents — monospace fonts, subtle scanlines, dark background.

## Getting Started

```bash
npm install
cp .env.example .env.local   # fill in env vars
npm run dev
```

## Environment Variables

See `.env.example` for all required variables.

## Project Structure

```
app/(auth)/login/       — login page
app/(app)/              — protected shell (middleware-gated)
  page.tsx              — dashboard
  transactions/         — transaction list
  investments/          — portfolio snapshot
  budgets/              — thresholds
  analyze/              — Claude AI analysis
app/api/plaid/          — link-token, exchange-token, webhook, sync
app/api/cron/           — daily-sync
app/api/analyze/        — Claude API
lib/                    — plaid.ts, supabase.ts, resend.ts, claude.ts
middleware.ts           — auth gate
supabase/migrations/    — DB schema
```

## Roadmap

See [DECISIONS.md](./DECISIONS.md) for architecture decisions and the phased build plan.
