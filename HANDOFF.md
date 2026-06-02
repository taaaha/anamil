# Anamil — Deploy & Client Handoff

Quick reference for shipping updates and giving the site to your client.

---

## A · Push this update live (2 min)

Your GitHub repo is already connected to Vercel, so **pushing to GitHub auto-deploys**. In the project folder:

```cmd
git add .
git commit -m "Overhaul: auth, Amazigh design system, mobile-first header"
git push
```

Then watch Vercel → **Deployments** — a new build starts automatically. ~2 min to "Ready". Refresh your live URL.

---

## B · Confirm the login fix landed

The "Invalid path specified in request URL" error is now **fixed in code** — the app strips any stray `/rest/v1/` or trailing slash from your Supabase URL automatically. After the push above:

1. Go to `https://YOUR-SITE/ar/login`
2. **Sign in** tab → enter the admin email/password you created in Supabase
3. You should land on `/ar/admin`

If it still fails, double-check in Vercel → Settings → Environment Variables that `NEXT_PUBLIC_SUPABASE_URL` starts with `https://` and contains your project ref. (It no longer matters if it has `/rest/v1/` — the code handles that — but `https://` must be there.)

---

## C · Lock down the admin (do this before sharing signup with the public)

Right now **any account that logs in is treated as admin** (fine while you're the only user). Once the client or customers start signing up, restrict admin access:

1. Vercel → Settings → Environment Variables → **Add**
   - **Key:** `ADMIN_EMAILS`
   - **Value:** your admin email(s), comma-separated, e.g. `you@example.com,client@example.com`
2. Redeploy (Deployments → ⋯ → Redeploy)

Now only those emails reach `/admin`; everyone else who signs up lands on their normal `/account` page.

---

## D · Give it to your client (1 min)

1. **Pick a clean URL** (if you haven't): Vercel → Settings → Domains → add `anamil-elaouras.vercel.app` (or any free name).
2. **Send the client:**
   - The live URL
   - A test customer flow: "Open the site → switch language top-right → browse Shop → submit a Contact message"
   - If they want admin access: create them a user in Supabase → Authentication → Users → Add user (check **Auto Confirm**), add their email to `ADMIN_EMAILS`, give them `https://YOUR-SITE/ar/login`.

---

## E · What works now (100% except payment)

| Feature | Status |
|---|---|
| Trilingual AR / FR / EN + RTL | ✅ |
| Mobile-first responsive + drawer nav | ✅ |
| Visible language switch (desktop dropdown + mobile pills) | ✅ |
| Shop catalog + filters + product detail | ✅ |
| Anthropology archive | ✅ |
| Storytelling, Empowerment, Tourism pages | ✅ |
| Blog (list + post) | ✅ |
| Tourism booking form → saves to DB | ✅ |
| Contact form → saves to DB | ✅ |
| Customer signup + login + account page | ✅ |
| Admin dashboard (counts, products, bookings, messages) | ✅ |
| **Payment / checkout** | ⏳ **Intentionally not built** |

**Why no payment:** real checkout needs a registered business + a payment provider (Stripe internationally, or CIB / Edahabia / SATIM for Algeria). That's a production-phase task with legal/KYC steps. Right now products show a price and an "Add to cart" + WhatsApp-order path, which is enough for client preview and early orders.

---

## F · Managing content

Use the **Supabase Table Editor** (supabase.com → your project → Table Editor):
- `products`, `archive_items`, `artisans`, `blog_posts` — add/edit rows
- Multilingual fields are JSON: `{"ar": "...", "fr": "...", "en": "..."}`
- For product images: paste an image URL into the `images` array. Unsplash URLs and Supabase Storage URLs both work.

Bookings and contact messages arrive in `tourism_bookings` and `contact_submissions`, viewable in the in-site admin too.

---

## G · The logo

Save the client's logo as `public/logo.png`, then `git add . && git commit -m "logo" && git push`. It appears in the header, footer, and login panel automatically. Until then a styled fallback mark shows (never a broken image).
