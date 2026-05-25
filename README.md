# Anamil El Aouras Wa El Zibane

Trilingual (Arabic / French / English) cultural-economic platform for the traditional women's costume of Mchounèche, Biskra, Algeria.

## What it does

10 sections, fully responsive, free to host:

- **Home** — hero, pillars, featured products
- **About** — vision, goals, audience
- **Heritage Archive** — anthropological documentation
- **Shop** — products with filters, categories, story per piece
- **Story** — narrative per garment
- **Empowerment** — artisan profiles, training
- **Tourism** — workshop booking form
- **Blog** — multilingual articles
- **FAQ** — accordion
- **Contact** — form + WhatsApp + map
- **Login + Admin** — Supabase auth + dashboard

## Stack (all free)

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS 4
- next-intl (i18n + RTL)
- Supabase (PostgreSQL + auth + storage)
- Vercel (hosting + CDN + SSL)

## Quick start

```bash
npm install
cp .env.example .env.local   # fill in Supabase keys
npm run dev
```

The site works **without** Supabase configured — it falls back to seed data so you can iterate on UI before setting up the database.

## Deploy

See [DEPLOY.md](./DEPLOY.md) for the full 20-minute walkthrough.

## Adding content

While in MVP phase: use the Supabase Table Editor. JSONB columns expect `{"ar": "…", "fr": "…", "en": "…"}`.

When ready: extend the admin pages under `src/app/[locale]/admin/` with create/edit forms — the auth, RLS, and routing are already in place.
