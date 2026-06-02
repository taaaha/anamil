-- ═══════════════════════════════════════════════════════════════
-- Anamil — Orders + security hardening migration
-- Run this in the Supabase SQL Editor AFTER schema.sql.
-- Safe to run more than once.
-- ═══════════════════════════════════════════════════════════════

-- ─── Orders ────────────────────────────────────────────────────
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  customer_email text not null,
  customer_phone text,
  shipping_address text,
  city text,
  country text default 'Algérie',
  items jsonb not null default '[]'::jsonb,
  total_dzd integer not null default 0,
  status text not null default 'new'
    check (status in ('new', 'confirmed', 'shipped', 'delivered', 'cancelled')),
  notes text,
  created_at timestamptz not null default now()
);

create index if not exists orders_email_idx on public.orders (customer_email);
create index if not exists orders_status_idx on public.orders (status);

alter table public.orders enable row level security;

-- Anyone can place an order (write-only for the public).
drop policy if exists "orders_public_insert" on public.orders;
create policy "orders_public_insert"
  on public.orders for insert with check (true);

-- A signed-in customer can read THEIR OWN orders (matched by email).
drop policy if exists "orders_select_own" on public.orders;
create policy "orders_select_own"
  on public.orders for select to authenticated
  using (auth.jwt() ->> 'email' = customer_email);

-- NOTE: Admin reads/writes for orders go through the service-role key
-- on the server (bypasses RLS). No broad authenticated policy here.

-- ─── Security hardening ────────────────────────────────────────
-- Earlier schema.sql granted ALL authenticated users full write access
-- to content tables. Now that customers can sign up, that's too broad.
-- Remove those policies — admin mutations use the service-role key instead.
-- Public READ + public INSERT (bookings/contact) policies stay intact.

drop policy if exists "products_admin_all" on public.products;
drop policy if exists "archive_admin_all" on public.archive_items;
drop policy if exists "artisans_admin_all" on public.artisans;
drop policy if exists "blog_admin_all" on public.blog_posts;
drop policy if exists "bookings_admin_all" on public.tourism_bookings;
drop policy if exists "contact_admin_all" on public.contact_submissions;

-- Done. Verify in Table Editor that an "orders" table now exists.
