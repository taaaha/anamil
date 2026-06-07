-- Anamil El Aouras Wa El Zibane — full schema
-- Run this in the Supabase SQL Editor after creating the project.

-- ─── Extensions ────────────────────────────────────────────────────
create extension if not exists "pgcrypto";

-- ─── Products (e-commerce) ─────────────────────────────────────────
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  category text not null check (category in ('heritage', 'modern', 'accessories')),
  title jsonb not null default '{}'::jsonb,
  short_description jsonb not null default '{}'::jsonb,
  story jsonb not null default '{}'::jsonb,
  symbolism jsonb not null default '{}'::jsonb,
  occasion jsonb not null default '{}'::jsonb,
  artisan_name text,
  price_dzd integer not null default 0,
  sizes text[],
  images text[],
  in_stock boolean not null default true,
  featured boolean not null default false,
  created_at timestamptz not null default now()
);

-- ─── Archive items (anthropological documentation) ─────────────────
create table if not exists public.archive_items (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  kind text not null check (kind in ('photo', 'interview', 'timeline', 'symbol', 'map')),
  title jsonb not null default '{}'::jsonb,
  description jsonb not null default '{}'::jsonb,
  year integer,
  media_url text,
  created_at timestamptz not null default now()
);

-- ─── Artisans (women empowerment profiles) ─────────────────────────
create table if not exists public.artisans (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  bio jsonb not null default '{}'::jsonb,
  village text,
  years_experience integer,
  photo_url text,
  created_at timestamptz not null default now()
);

-- ─── Blog posts (per-locale rows) ──────────────────────────────────
create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null,
  locale text not null check (locale in ('ar', 'fr', 'en')),
  title text not null,
  excerpt text not null,
  body text not null,
  cover_image text,
  reading_minutes integer not null default 5,
  published_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  unique (slug, locale)
);

-- ─── Tourism bookings ──────────────────────────────────────────────
create table if not exists public.tourism_bookings (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text,
  experience text not null,
  preferred_date date not null,
  party_size integer not null default 1,
  notes text,
  status text not null default 'new' check (status in ('new', 'confirmed', 'cancelled')),
  created_at timestamptz not null default now()
);

-- ─── Contact form submissions ──────────────────────────────────────
create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  status text not null default 'new' check (status in ('new', 'read', 'archived')),
  created_at timestamptz not null default now()
);

-- ─── Row-Level Security ────────────────────────────────────────────
alter table public.products enable row level security;
alter table public.archive_items enable row level security;
alter table public.artisans enable row level security;
alter table public.blog_posts enable row level security;
alter table public.tourism_bookings enable row level security;
alter table public.contact_submissions enable row level security;

-- Public can read content tables
drop policy if exists "products_public_read" on public.products;
create policy "products_public_read" on public.products for select using (true);

drop policy if exists "archive_public_read" on public.archive_items;
create policy "archive_public_read" on public.archive_items for select using (true);

drop policy if exists "artisans_public_read" on public.artisans;
create policy "artisans_public_read" on public.artisans for select using (true);

drop policy if exists "blog_public_read" on public.blog_posts;
create policy "blog_public_read" on public.blog_posts for select using (true);

-- Public can INSERT bookings + contact messages (write-only)
drop policy if exists "bookings_public_insert" on public.tourism_bookings;
create policy "bookings_public_insert" on public.tourism_bookings for insert with check (true);

drop policy if exists "contact_public_insert" on public.contact_submissions;
create policy "contact_public_insert" on public.contact_submissions for insert with check (true);

-- Authenticated users (admin) can do everything
drop policy if exists "products_admin_all" on public.products;
create policy "products_admin_all" on public.products for all to authenticated using (true) with check (true);

drop policy if exists "archive_admin_all" on public.archive_items;
create policy "archive_admin_all" on public.archive_items for all to authenticated using (true) with check (true);

drop policy if exists "artisans_admin_all" on public.artisans;
create policy "artisans_admin_all" on public.artisans for all to authenticated using (true) with check (true);

drop policy if exists "blog_admin_all" on public.blog_posts;
create policy "blog_admin_all" on public.blog_posts for all to authenticated using (true) with check (true);

drop policy if exists "bookings_admin_all" on public.tourism_bookings;
create policy "bookings_admin_all" on public.tourism_bookings for all to authenticated using (true) with check (true);

drop policy if exists "contact_admin_all" on public.contact_submissions;
create policy "contact_admin_all" on public.contact_submissions for all to authenticated using (true) with check (true);

-- ─── Seed data (placeholders so the site looks alive on first launch) ──
insert into public.products (slug, category, title, short_description, story, symbolism, occasion, artisan_name, price_dzd, sizes, images, featured)
values
  (
    'melhfa-aurassienne',
    'heritage',
    '{"ar":"الملحفة الأوراسية الأصيلة","fr":"Melhfa aurassienne authentique","en":"Authentic Aurès Melhfa"}',
    '{"ar":"ملحفة منسوجة يدويًا بألوان الأوراس التقليدية","fr":"Melhfa tissée à la main aux couleurs traditionnelles des Aurès","en":"Hand-woven melhfa in traditional Aurès colors"}',
    '{"ar":"تُنسج الملحفة على نول تقليدي خلال عدة أسابيع، باستخدام صباغة طبيعية مستخرجة من نباتات المنطقة.","fr":"La melhfa est tissée sur un métier traditionnel pendant plusieurs semaines, avec des teintures naturelles extraites des plantes de la région.","en":"The melhfa is woven on a traditional loom over several weeks, with natural dyes from regional plants."}',
    '{"ar":"الأحمر يرمز للحياة والخصوبة، والأسود للأرض والثبات.","fr":"Le rouge symbolise la vie et la fertilité, le noir la terre et la stabilité.","en":"Red symbolizes life and fertility, black the earth and stability."}',
    '{"ar":"الأعراس والمناسبات الكبرى","fr":"Mariages et grandes occasions","en":"Weddings and major celebrations"}',
    'فاطمة الزهراء',
    18500,
    array['S','M','L','XL'],
    array[]::text[],
    true
  ),
  (
    'qachabia-moderne',
    'modern',
    '{"ar":"قشابية عصرية مستوحاة","fr":"Qachabia contemporaine","en":"Contemporary Qachabia"}',
    '{"ar":"إعادة تأويل عصرية للقشابية التقليدية بقماش خفيف","fr":"Réinterprétation moderne de la qachabia avec un tissu léger","en":"Modern reinterpretation in lightweight fabric"}',
    '{"ar":"يعيد هذا التصميم اكتشاف القشابية بقصّة معاصرة، مع الحفاظ على التفاصيل الزخرفية الأصلية.","fr":"Ce design redécouvre la qachabia avec une coupe contemporaine, tout en préservant les détails ornementaux originaux.","en":"This design reimagines the qachabia with a contemporary cut while preserving the original ornamental details."}',
    '{"ar":"الزخارف الهندسية تستلهم من الفن الشاوي","fr":"Les motifs géométriques s''inspirent de l''art chaoui","en":"Geometric motifs draw from Chaoui art"}',
    '{"ar":"الاستعمال اليومي والمناسبات شبه الرسمية","fr":"Usage quotidien et occasions semi-formelles","en":"Daily wear and semi-formal occasions"}',
    'خديجة بن صالح',
    9800,
    array['S','M','L'],
    array[]::text[],
    true
  ),
  (
    'khit-rrouh-pendant',
    'accessories',
    '{"ar":"قلادة خيط الروح","fr":"Pendentif Khit Rrouh","en":"Khit Rrouh pendant"}',
    '{"ar":"قلادة فضية مستوحاة من الحلي الأمازيغية","fr":"Pendentif en argent inspiré des bijoux amazighs","en":"Silver pendant inspired by Amazigh jewelry"}',
    '{"ar":"تُنحت بالطرق التقليدي وتُزيّن بنقوش رمزية تحمي صاحبتها.","fr":"Forgé à la main avec des motifs symboliques protecteurs.","en":"Hand-forged with symbolic protective motifs."}',
    '{"ar":"الرموز الهندسية رموز حماية وحياة","fr":"Les symboles géométriques évoquent protection et vie","en":"The geometric symbols evoke protection and life"}',
    '{"ar":"هدية رمزية، مناسبات الزواج والاحتفال","fr":"Cadeau symbolique, mariages et célébrations","en":"A symbolic gift, weddings and celebrations"}',
    'يمينة العوراسي',
    4200,
    null,
    array[]::text[],
    false
  ),
  (
    'khimar-chaoui-embroidered',
    'accessories',
    '{"ar":"خمار شاوي مطرز","fr":"Khimar chaoui brodé","en":"Embroidered Chaoui Khimar"}',
    '{"ar":"خمار شاوي تقليدي مطرز بخيوط ملونة على قماش فاخر، يجمع بين الأناقة والتراث الأصيل.","fr":"Khimar chaoui traditionnel brodé de fils colorés sur un tissu raffiné, alliant élégance et patrimoine authentique.","en":"Traditional Chaoui khimar embroidered with colored threads on premium fabric, blending elegance with authentic heritage."}',
    '{"ar":"تصميم خفيف ومريح يناسب الاستخدام اليومي والمناسبات. قماش فاخر مطرز يدويًا بخيوط ملونة عالية الجودة، بأبعاد 100 × 100 سم تقريبًا. يُغسل يدويًا بالماء البارد.","fr":"Un design léger et confortable adapté à l''usage quotidien comme aux grandes occasions. Tissu raffiné brodé à la main de fils colorés de haute qualité, dimensions d''environ 100 × 100 cm. Lavage à la main à l''eau froide.","en":"A light, comfortable design suited to both daily wear and special occasions. Premium fabric hand-embroidered with high-quality colored threads, about 100 × 100 cm. Hand-wash in cold water."}',
    '{"ar":"تطريز شاوي أصيل بخيوط زاهية يعكس التراث الأوراسي.","fr":"Une broderie chaoui authentique aux fils éclatants qui reflète le patrimoine des Aurès.","en":"Authentic Chaoui embroidery in vivid threads that reflects the heritage of the Aurès."}',
    '{"ar":"الاستخدام اليومي والمناسبات","fr":"Usage quotidien et occasions","en":"Daily wear and occasions"}',
    null,
    2500,
    null,
    array['/products/10.webp'],
    true
  ),
  (
    'hzam-chaoui-multifil',
    'accessories',
    '{"ar":"حزام شاوي متعدد الخيوط","fr":"Ceinture chaoui multi-fils","en":"Multi-thread Chaoui Belt"}',
    '{"ar":"حزام تقليدي شاوي مصنوع يدويًا من خيوط ملونة متداخلة، يزيّن الملابس التقليدية النسائية ويضيف لمسة جمالية تراثية أصيلة.","fr":"Ceinture chaoui traditionnelle faite main à partir de fils colorés entrelacés, qui orne les tenues féminines traditionnelles et ajoute une touche esthétique patrimoniale authentique.","en":"Traditional Chaoui belt handmade from interwoven colored threads, adorning traditional women''s attire with an authentic heritage touch."}',
    '{"ar":"مشغول يدويًا بإتقان من خيوط قطنية متعددة الألوان، بطول 150 سم قابل للتعديل ليلائم جميع المقاسات. يُغسل يدويًا بماء بارد.","fr":"Confectionnée à la main avec soin à partir de fils de coton multicolores, longueur 150 cm ajustable pour convenir à toutes les tailles. Lavage à la main à l''eau froide.","en":"Carefully handmade from multicolored cotton threads, 150 cm adjustable length to fit all sizes. Hand-wash in cold water."}',
    '{"ar":"مزيج متناغم من الألوان التقليدية المستوحاة من التراث الشاوي.","fr":"Un mélange harmonieux de couleurs traditionnelles inspirées du patrimoine chaoui.","en":"A harmonious blend of traditional colors inspired by Chaoui heritage."}',
    '{"ar":"يكمّل الزيّ التقليدي في المناسبات","fr":"Complète la tenue traditionnelle lors des occasions","en":"Completes traditional attire for occasions"}',
    null,
    2800,
    null,
    array['/products/9.webp'],
    true
  ),
  (
    'libas-chaoui-complet',
    'heritage',
    '{"ar":"لباس تقليدي شاوي كامل","fr":"Tenue chaoui traditionnelle complète","en":"Complete Traditional Chaoui Outfit"}',
    '{"ar":"زيّ تقليدي شاوي أصيل يعكس جمال التراث الجزائري وخصوصية الثقافة الشاوية، يجمع بين الألوان الزاهية والتطريز اليدوي الفاخر والإكسسوارات التقليدية.","fr":"Tenue chaoui traditionnelle authentique reflétant la beauté du patrimoine algérien et la singularité de la culture chaoui, alliant couleurs vives, broderie main raffinée et accessoires traditionnels.","en":"Authentic traditional Chaoui outfit reflecting the beauty of Algerian heritage and the distinctiveness of Chaoui culture, combining vivid colors, fine hand embroidery and traditional accessories."}',
    '{"ar":"تصميم متكامل يجمع بين الصدرة والتطريز التقليدي، والحزام المزخرف، والأكمام الواسعة المطرزة بحواف ملونة، لتنسيق مثالي بين القطع المختلفة في جميع المناسبات. يُغسل يدويًا بالماء البارد.","fr":"Un ensemble complet réunissant le plastron et la broderie traditionnelle, la ceinture ornée et les manches amples brodées aux bords colorés, pour une harmonie parfaite en toutes occasions. Lavage à la main à l''eau froide.","en":"A complete ensemble bringing together the embroidered bodice, the ornate belt, and wide sleeves with colored trims, for perfect harmony across all occasions. Hand-wash in cold water."}',
    '{"ar":"تطريز يدوي فاخر مع إكسسوارات من الفضة التقليدية يعكس أصالة الزيّ الشاوي.","fr":"Broderie main raffinée et accessoires en argent traditionnel reflétant l''authenticité de la tenue chaoui.","en":"Fine hand embroidery with traditional silver accessories reflecting the authenticity of Chaoui dress."}',
    '{"ar":"الأعراس والمناسبات الكبرى","fr":"Mariages et grandes occasions","en":"Weddings and major celebrations"}',
    null,
    18500,
    array['S','M','L','XL'],
    array['/products/7.webp'],
    true
  )
on conflict (slug) do nothing;

-- Note: 6 additional products + 2 archive photos (the rest of the Chaoui
-- collection) live in supabase/add-products.sql so they can be applied to an
-- existing database too. Run that file after this one on a fresh install.

insert into public.archive_items (slug, kind, title, description, year)
values
  (
    'timeline-1900-melhfa',
    'timeline',
    '{"ar":"الملحفة في بدايات القرن العشرين","fr":"La melhfa au début du XXe siècle","en":"The melhfa in the early 20th century"}',
    '{"ar":"كانت الملحفة قطعة محورية في الزيّ النسائي، تُنسج محليًا وتعكس الانتماء القبلي.","fr":"La melhfa était une pièce centrale du costume féminin, tissée localement et reflétant l''appartenance tribale.","en":"The melhfa was a central piece of women''s dress, locally woven and reflecting tribal belonging."}',
    1900
  ),
  (
    'symbol-color-red',
    'symbol',
    '{"ar":"رمزية اللون الأحمر","fr":"Symbolique du rouge","en":"Symbolism of red"}',
    '{"ar":"الأحمر في اللباس الأوراسي يرمز للحياة، الخصوبة، والحماية من العين.","fr":"Le rouge dans le costume aurassien symbolise la vie, la fertilité et la protection contre le mauvais œil.","en":"Red in the Aurès costume symbolizes life, fertility, and protection from the evil eye."}',
    null
  ),
  (
    'interview-fatima-zahra',
    'interview',
    '{"ar":"مقابلة: فاطمة الزهراء — حرفية النسيج","fr":"Entretien : Fatima Zahra, artisane tisseuse","en":"Interview: Fatima Zahra, weaver"}',
    '{"ar":"تروي فاطمة الزهراء كيف تعلمت النسيج من جدّتها، وكيف تنقل المعرفة اليوم لبناتها.","fr":"Fatima Zahra raconte comment elle a appris le tissage de sa grand-mère, et comment elle transmet aujourd''hui ce savoir à ses filles.","en":"Fatima Zahra recounts learning weaving from her grandmother and passing the knowledge on to her daughters."}',
    null
  )
on conflict (slug) do nothing;

insert into public.artisans (name, bio, village, years_experience)
values
  (
    'فاطمة الزهراء',
    '{"ar":"حرفية نسيج بخبرة 25 سنة، متخصصة في الملحفة الأوراسية التقليدية.","fr":"Tisseuse de 25 ans d''expérience, spécialisée dans la melhfa aurassienne.","en":"Weaver with 25 years experience, specialized in the Aurès melhfa."}',
    'مشونش',
    25
  ),
  (
    'خديجة بن صالح',
    '{"ar":"حرفية تطريز ومصممة، تجمع بين الأصالة والتصميم المعاصر.","fr":"Brodeuse et designer, combinant authenticité et design contemporain.","en":"Embroiderer and designer combining authenticity with contemporary design."}',
    'مشونش',
    18
  )
on conflict do nothing;

insert into public.blog_posts (slug, locale, title, excerpt, body, reading_minutes)
values
  (
    'introducing-anamil',
    'ar',
    'مرحبًا بكم في أنامل الأوراس والزيبان',
    'لماذا أنشأنا هذه المنصة، وما الذي يميزها عن متجر تقليدي.',
    E'هذا المشروع ليس متجرًا فقط. هو محاولة لإنقاذ تراثٍ يتلاشى، وتمكين نساء يصنعنه بأيديهن.\n\nنبدأ ببسكرة، بمنطقة مشونش، ثم نتوسع.',
    4
  ),
  (
    'introducing-anamil',
    'fr',
    'Bienvenue chez Anamil El Aouras Wa El Zibane',
    'Pourquoi nous avons créé cette plateforme, et ce qui la distingue d''une boutique classique.',
    E'Ce projet n''est pas qu''une boutique. C''est une tentative de sauver un patrimoine qui s''efface et d''émanciper des femmes qui le créent de leurs mains.\n\nNous commençons à Biskra, dans la région de Mchounèche, puis nous élargirons.',
    4
  ),
  (
    'introducing-anamil',
    'en',
    'Welcome to Anamil El Aouras Wa El Zibane',
    'Why we built this platform and what sets it apart from a regular store.',
    E'This project is not just a store. It is an attempt to save a fading heritage and empower the women who make it with their hands.\n\nWe begin in Biskra, in the Mchounèche region, and will expand from there.',
    4
  )
on conflict (slug, locale) do nothing;
