# Anamil — Deploy & Client Handoff

Quick reference for shipping updates and giving the site to your client.

---

## ⚠️ FIRST: Run the new database migration (one time, 2 min)

This update adds a shopping cart, orders, and full admin editing. It needs one new
database table. **Do this once, before pushing the code:**

1. Open your repo file `supabase/orders.sql` (or open it on GitHub)
2. Copy the entire contents
3. Supabase → **SQL Editor** → **New query** → paste → **Run**
4. You should see "Success." and a new **orders** table appears in Table Editor

This also tightens security: it removes the old "any logged-in user can edit content"
rule. Admin edits now go through a secure server key. **So you must also confirm
`SUPABASE_SERVICE_ROLE_KEY` is set in Vercel** (you added it during first setup — it's
the `sb_secret_...` value). Without it, the admin can't save changes.

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
| **Shopping cart** (add, qty, remove, persists) | ✅ |
| **Checkout → saves order to DB** (pay-on-delivery) | ✅ |
| **Customer order history** in /account | ✅ |
| **Admin: create / edit / delete products** | ✅ |
| **Admin: create / edit / delete blog, archive, artisans** | ✅ |
| **Admin: manage orders / bookings / messages** (status updates) | ✅ |
| **Admin notification badges** (new orders/bookings/messages) | ✅ |
| **Online card payment** | ⏳ **Intentionally not built** |

**Why no online payment:** real card payment needs a registered business + a provider
(SATIM / CIB / Edahabia for Algeria, or Stripe internationally) with legal/KYC steps.
Instead, checkout works on a **pay-on-delivery** model: the customer fills shipping
details, the order is saved to the database, the admin sees it instantly (with a "new"
badge), and the business contacts the customer to confirm. This is exactly how most
Algerian e-commerce works today and is fully functional for real orders.

**How the shopping flow works now:**
1. Customer browses Shop → opens a product → picks size → **Add to cart**
2. Cart icon (top-right) shows count → opens a drawer → **Checkout**
3. Customer enters name/phone/address → **Place order** → confirmation screen
4. Order lands in **Admin → Orders** with a "new" badge; admin updates status
   (new → confirmed → shipped → delivered)
5. Logged-in customers see their orders under **My account**

**About email/SMS notifications:** the admin is notified *in-app* (dashboard badges +
Orders list). Automatic email/SMS to the client on each order is a small add-on that
needs an email service (e.g. Resend) — ask when you want it wired up.

---

## F · Managing content (now fully in-site)

Log in at `/ar/login`, then use the **admin dashboard** — no Supabase needed for daily work:

- **Products** → Add new / Edit / Delete, with all three languages, price, sizes, images, stock + featured toggles
- **Blog / Archive / Artisans** → same Add / Edit / Delete
- **Orders / Bookings / Messages** → change status from a dropdown; new ones show a red badge on the dashboard
- For images: paste an image URL (Unsplash, or upload to Supabase Storage and paste that URL). One URL per line for products.

The Supabase Table Editor still works as a backup/bulk-edit tool, but you no longer need it for normal updates.

---

## G · The logo

Save the client's logo as `public/logo.png`, then `git add . && git commit -m "logo" && git push`. It appears in the header, footer, and login panel automatically. Until then a styled fallback mark shows (never a broken image).
