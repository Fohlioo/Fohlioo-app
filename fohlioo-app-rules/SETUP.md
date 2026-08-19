# Cursor rules — setup

## How to install these

1. Unzip this into the root of your `fohlioo-app` repository, so you end
   up with:
   ```
   fohlioo-app/
   ├── .cursor/
   │   └── rules/
   │       ├── 00-project-overview.mdc
   │       ├── 10-stack-and-conventions.mdc
   │       └── 20-auth-architecture.mdc
   ├── app/
   ├── ...
   ```
2. Cursor picks up `.cursor/rules/*.mdc` automatically — no config needed.
   All three files have `alwaysApply: true`, so they're in context for
   every chat/agent session in this repo, not just when editing matching
   files.
3. Restart Cursor (or reload the window) if it doesn't pick them up
   immediately after adding.

## What's in each file

- **00-project-overview.mdc** — what Fohlioo is, the three-repo split,
  non-negotiables (behavioural-first segmentation, shopper/brand
  separation, extension as source of truth for anonymous activity)
- **10-stack-and-conventions.mdc** — Next.js 14 App Router, TypeScript,
  Tailwind, Supabase Auth, folder structure, naming conventions
- **20-auth-architecture.mdc** — the full extension handoff spec: signup
  fields, the one-time code exchange flow, what belongs in this repo vs
  fohlioo-api vs fohlioo-extension, and open items that need a manual
  decision rather than being silently implemented

## Before you start building auth with the agent

Two schema pieces in `20-auth-architecture.mdc` need to actually exist in
Supabase before the agent can build against them:

1. `profiles` table (role, first_name, marketing_opt_in)
2. `extension_auth_codes` table (the one-time code store)
3. `alter table shoppers add column user_id ...` — this one touches the
   table fohlioo-api already owns, so run it there, not from this repo

I can generate the actual migration SQL for these three right now if
you want it before you open Cursor — say the word and I'll write it as a
follow-up to fohlioo-api's `supabase/schema.sql` rather than a new file,
so there's one source of truth for the schema.
