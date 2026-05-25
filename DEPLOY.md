# Deploy guide — Anamil El Aouras Wa El Zibane

Everything below is free. Total setup time: **~20 minutes**.

You'll end up with:
- Live URL: `anamil-elaouras.vercel.app` (or any subdomain you pick)
- Postgres database with content, bookings, messages, auth
- Admin panel at `/{locale}/admin`

---

## 1 · Create the Supabase project (5 min)

1. Go to **https://supabase.com** → sign up (free, no card)
2. Click **New project**
   - Name: `anamil`
   - Database password: generate one, **save it somewhere**
   - Region: pick **Europe (Frankfurt)** for best latency from Algeria
   - Plan: **Free**
3. Wait ~2 min for the project to provision.

### Run the schema

1. In the left sidebar → **SQL Editor** → **New query**
2. Open `supabase/schema.sql` in this repo, copy the **entire file**, paste it in the editor, click **Run**.
3. You should see "Success. No rows returned." and 6 new tables in **Table Editor**.

### Grab your API keys

1. **Project Settings** → **API**
2. Copy the **Project URL** and the **anon public** key
3. Copy the **service_role** key (keep this one secret — server only)

---

## 2 · Create the admin user (1 min)

1. In Supabase → **Authentication** → **Users** → **Add user** → **Create new user**
2. Email + password — these are your admin login credentials
3. **Auto Confirm User**: ON (so you skip the email verification flow)

That's it. Any user you create here can sign in at `/{locale}/login` and access the admin.

---

## 3 · Local test (2 min)

1. Open `.env.local` in this folder and fill in the 3 Supabase values:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=ey…
   SUPABASE_SERVICE_ROLE_KEY=ey…
   ```
2. Run:
   ```
   npm run dev
   ```
3. Open http://localhost:3000 — you should see the Arabic homepage.
4. Try `/ar/login` with the admin user you created → should land on `/ar/admin`.

---

## 4 · Push to GitHub (3 min)

```bash
git init
git add .
git commit -m "Initial commit"
gh repo create anamil --public --source=. --push
```

(Or create the repo manually on github.com and `git push` to it.)

---

## 5 · Deploy to Vercel (5 min)

1. Go to **https://vercel.com** → sign in with GitHub (free, no card)
2. **Add New** → **Project** → pick your `anamil` repo → **Import**
3. **Framework**: Next.js (auto-detected) — leave the build/output settings as-is
4. **Environment Variables** — add these 4:
   - `NEXT_PUBLIC_SUPABASE_URL` → your project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` → anon key
   - `SUPABASE_SERVICE_ROLE_KEY` → service role key
   - `NEXT_PUBLIC_SITE_URL` → leave blank for now, fill in after the first deploy
5. Click **Deploy**
6. Wait ~2 min — when done, click the URL. Site is live.

Your free URL is `anamil-XXX.vercel.app` (Vercel picks the suffix; you can change it in **Project Settings → Domains** — `anamil-elaouras.vercel.app` is yours if available).

### Add the site URL env var

After the first deploy:
1. Copy your final Vercel URL
2. Vercel → **Settings → Environment Variables** → set `NEXT_PUBLIC_SITE_URL` to that URL
3. **Deployments** → click the latest → **Redeploy**

---

## 6 · Going to production (when client is ready)

When the client wants a real domain (e.g. `anamil.dz` or `anamil-elaouras.com`):

1. Buy the domain (Namecheap, OVH, Cloudflare Registrar — ~$10–15/year)
2. Vercel → **Project → Settings → Domains** → **Add** → enter the domain
3. Vercel gives you DNS records to add at your registrar — usually one A record + one CNAME
4. Wait 5–60 min for DNS propagation, done. Free SSL is auto-provisioned.

**Zero code changes needed.** Vercel just serves the same build at the new domain.

---

## 7 · Managing content

For the test/MVP phase, content can be added via Supabase:

1. **Table Editor** in Supabase
2. Click any table (`products`, `archive_items`, `blog_posts`, etc.)
3. **Insert row** → fill the JSONB fields with `{"ar": "…", "fr": "…", "en": "…"}` for multilingual columns

When you're ready to invest more, the admin UI inside this repo at `/{locale}/admin` can be extended into a full CRUD interface — the auth, RLS, and routing are already wired up. For now it shows dashboards, products list, bookings, and messages.

---

## What's NOT included (intentionally, for MVP)

- ❌ Real payment integration (Stripe / CIB) — needs a registered business
- ❌ Real shipping calculation — needs a logistics partner
- ❌ Email notifications (booking confirmations) — needs Resend/SendGrid; the data is stored, just not emailed
- ❌ 3D product viewer — placeholder for later
- ❌ Production-grade admin CRUD UI — use Supabase Table Editor for now

These can be added once the client commits to production.

---

## Troubleshooting

**"Supabase not configured" on `/admin`**
You didn't set the env vars. Restart `npm run dev` after editing `.env.local`.

**Login fails with no error**
Make sure you created the user with "Auto Confirm User: ON".

**Build fails on Vercel**
Check that all 4 env vars are set in Vercel's project settings, not just locally.

**RTL is broken on a page**
Hard refresh (Ctrl+Shift+R). Make sure `html lang="ar" dir="rtl"` is in the rendered HTML.

**Booking/contact forms don't save**
RLS policies in `schema.sql` allow public INSERT. If you customized the SQL, make sure those policies still exist.
