-- Anamil — Chaoui collection: real product photos + new products + archive
-- Run ONCE in Supabase → SQL Editor → New query → paste → Run.
-- Safe to re-run: image updates are idempotent; new rows skip on conflict.
--
-- Images are served from the deployed site at /products/*.webp
-- (committed under public/products/). No Supabase Storage needed.
--
-- ⚠️ PRICES for the 6 NEW products are PROPOSED ESTIMATES — review/adjust them
-- to your real prices before relying on them (here, or in Admin → Products).

-- ─── 1) Real photos for the 3 products already added ───────────────
update public.products set images = array['/products/10.webp'] where slug = 'khimar-chaoui-embroidered';
update public.products set images = array['/products/9.webp']  where slug = 'hzam-chaoui-multifil';
update public.products set images = array['/products/7.webp']  where slug = 'libas-chaoui-complet';

-- ─── 2) Six new products ───────────────────────────────────────────
insert into public.products
  (slug, category, title, short_description, story, symbolism, occasion, artisan_name, price_dzd, sizes, images, in_stock, featured)
values
  (
    'haqiba-chaoui-embroidered',
    'accessories',
    '{"ar":"حقيبة شاوية مطرزة","fr":"Sac chaoui brodé","en":"Embroidered Chaoui Bag"}',
    '{"ar":"حقيبة يدوية مطرزة بنقوش أمازيغية وخرز فضي وشرّابات ملونة، متوفرة بعدة تصاميم.","fr":"Sac fait main brodé de motifs amazighs, perles argentées et pompons colorés, disponible en plusieurs modèles.","en":"Handmade bag embroidered with Amazigh motifs, silver beads and colorful tassels, available in several styles."}',
    '{"ar":"تُطرّز كل حقيبة يدويًا على قماش متين بنقوش هندسية تستلهم من الزرابي الأوراسية، مع زخارف فضية وشرّابات.","fr":"Chaque sac est brodé à la main sur un tissu résistant avec des motifs géométriques inspirés des tapis des Aurès, ornés de pièces argentées et de pompons.","en":"Each bag is hand-embroidered on durable fabric with geometric motifs inspired by Aurès rugs, finished with silver ornaments and tassels."}',
    '{"ar":"النقوش الهندسية رموز حماية وانتماء في الثقافة الأمازيغية.","fr":"Les motifs géométriques sont des symboles de protection et d''appartenance dans la culture amazighe.","en":"The geometric motifs are symbols of protection and belonging in Amazigh culture."}',
    '{"ar":"الاستخدام اليومي والمناسبات","fr":"Usage quotidien et occasions","en":"Daily use and occasions"}',
    null,
    4500,
    null,
    array['/products/1.webp'],
    true,
    true
  ),
  (
    'qilada-chaoui-silver',
    'accessories',
    '{"ar":"قلادة شاوية فضية","fr":"Collier chaoui en argent","en":"Silver Chaoui Necklace"}',
    '{"ar":"قلادة بحجر أحمر ونقوش فضية وخرز ملوّن وقطع نقدية تقليدية، مستوحاة من الحلي الأوراسية.","fr":"Collier à pierre rouge, motifs argentés, perles colorées et pièces traditionnelles, inspiré des bijoux des Aurès.","en":"Necklace with a red stone, silver motifs, colored beads and traditional coins, inspired by Aurès jewelry."}',
    '{"ar":"تُجمع القلادة يدويًا من خرز ملوّن وقطع فضية معلّقة حول حجر مركزي أحمر يتدلّى منه زخارف.","fr":"Le collier est assemblé à la main à partir de perles colorées et de pièces en argent autour d''une pierre rouge centrale ornée de pendeloques.","en":"The necklace is hand-assembled from colored beads and hanging silver pieces around a central red stone with dangling ornaments."}',
    '{"ar":"الفضة والحجر الأحمر رمزا الحماية والحياة في التقليد الأمازيغي.","fr":"L''argent et la pierre rouge symbolisent la protection et la vie dans la tradition amazighe.","en":"Silver and the red stone symbolize protection and life in Amazigh tradition."}',
    '{"ar":"المناسبات والأعراس وهدية رمزية","fr":"Occasions, mariages et cadeau symbolique","en":"Occasions, weddings and a symbolic gift"}',
    null,
    4200,
    null,
    array['/products/2.webp'],
    true,
    false
  ),
  (
    'libas-chaoui-noir',
    'heritage',
    '{"ar":"لباس شاوي أسود مطرز","fr":"Tenue chaoui noire brodée","en":"Black Embroidered Chaoui Outfit"}',
    '{"ar":"زيّ شاوي أسود كامل (خمار وفستان) مطرز بالرمز الأمازيغي وحواف بألوان التراث وشرّابات.","fr":"Tenue chaoui noire complète (khimar et robe) brodée du symbole amazigh, avec bordures aux couleurs du patrimoine et pompons.","en":"Complete black Chaoui set (khimar and dress) embroidered with the Amazigh symbol, with heritage-colored trims and tassels."}',
    '{"ar":"يجمع هذا الزيّ بين الخمار والفستان، مطرّزًا بالرمز الأمازيغي (آزا) وزخارف نجمية، مع حواف بألوان الأحمر والأصفر والأخضر وشرّابات يدوية.","fr":"Cette tenue réunit le khimar et la robe, brodée du symbole amazigh (Aza) et de motifs étoilés, avec des bordures rouge, jaune et vert et des pompons faits main.","en":"This set pairs the khimar with the dress, embroidered with the Amazigh symbol (Aza) and star motifs, with red, yellow and green trims and handmade tassels."}',
    '{"ar":"الرمز الأمازيغي (آزا) يرمز للحرية والإنسان الحر.","fr":"Le symbole amazigh (Aza) représente la liberté et l''homme libre.","en":"The Amazigh symbol (Aza) represents freedom and the free person."}',
    '{"ar":"الأعراس والمناسبات الكبرى","fr":"Mariages et grandes occasions","en":"Weddings and major celebrations"}',
    null,
    16000,
    array['S','M','L','XL'],
    array['/products/3.webp'],
    true,
    true
  ),
  (
    'khimar-chaoui-noir',
    'accessories',
    '{"ar":"خمار شاوي أسود مطرز","fr":"Khimar chaoui noir brodé","en":"Black Embroidered Chaoui Khimar"}',
    '{"ar":"خمار أسود مطرز بخيوط برتقالية وحمراء بنقوش هندسية دقيقة، مع شرّابات على الأطراف.","fr":"Khimar noir brodé de fils orange et rouge aux motifs géométriques fins, avec des pompons sur les bords.","en":"Black khimar embroidered with orange and red threads in fine geometric motifs, with tassels along the edges."}',
    '{"ar":"خمار خفيف من قماش أسود مطرّز يدويًا بنقوش متقاطعة دقيقة، يُنهى بشرّابات على الحواف. يُغسل يدويًا بالماء البارد.","fr":"Khimar léger en tissu noir brodé à la main de motifs croisés fins, fini de pompons sur les bords. Lavage à la main à l''eau froide.","en":"Light black-fabric khimar hand-embroidered with fine cross motifs, finished with tassels along the edges. Hand-wash in cold water."}',
    '{"ar":"النقوش المتقاطعة تستلهم من فن التطريز الشاوي الأصيل.","fr":"Les motifs croisés s''inspirent de l''art de la broderie chaoui authentique.","en":"The cross motifs draw on authentic Chaoui embroidery art."}',
    '{"ar":"الاستخدام اليومي والمناسبات","fr":"Usage quotidien et occasions","en":"Daily wear and occasions"}',
    null,
    2500,
    null,
    array['/products/4.webp'],
    true,
    false
  ),
  (
    'fustan-chaoui-embroidered',
    'heritage',
    '{"ar":"فستان شاوي مطرز","fr":"Robe chaoui brodée","en":"Embroidered Chaoui Dress"}',
    '{"ar":"فستان طويل أسود مطرز بنقوش حمراء وبرتقالية على الصدر والأكمام والأطراف، مع حزام مطرز.","fr":"Robe longue noire brodée de motifs rouge et orange au plastron, aux manches et aux ourlets, avec une ceinture brodée.","en":"Long black dress embroidered with red and orange motifs on the bodice, sleeves and hems, with an embroidered belt."}',
    '{"ar":"فستان واسع بقصّة تقليدية، مطرّز يدويًا بنقوش هندسية على الصدر والأكمام والذيل، مع حزام مطرّز يبرز الخصر.","fr":"Robe ample à la coupe traditionnelle, brodée à la main de motifs géométriques au plastron, aux manches et au bas, avec une ceinture brodée qui souligne la taille.","en":"A flowing dress with a traditional cut, hand-embroidered with geometric motifs on the bodice, sleeves and hem, with an embroidered belt that defines the waist."}',
    '{"ar":"النقوش الهندسية الحمراء ترمز للحياة والخصوبة في التراث الأوراسي.","fr":"Les motifs géométriques rouges symbolisent la vie et la fertilité dans le patrimoine des Aurès.","en":"The red geometric motifs symbolize life and fertility in Aurès heritage."}',
    '{"ar":"المناسبات والاحتفالات","fr":"Occasions et célébrations","en":"Occasions and celebrations"}',
    null,
    12000,
    array['S','M','L','XL'],
    array['/products/5.webp'],
    true,
    false
  ),
  (
    'bernous-chaoui-embroidered',
    'heritage',
    '{"ar":"برنوس شاوي مطرز","fr":"Burnous chaoui brodé","en":"Embroidered Chaoui Burnous"}',
    '{"ar":"برنوس رمادي بقبّعة، مطرز بنقوش معيّنية ملوّنة وحواف بألوان التراث وشرّابات.","fr":"Burnous gris à capuche, brodé de motifs en losange colorés, avec bordures aux couleurs du patrimoine et pompons.","en":"Grey hooded burnous, embroidered with colorful diamond motifs, with heritage-colored trims and tassels."}',
    '{"ar":"برنوس واسع من قماش رمادي بقبّعة، مزيّن بنقوش معيّنية ملوّنة على الظهر والحواف، مع شرّابات يدوية على الأطراف.","fr":"Burnous ample en tissu gris à capuche, orné de motifs en losange colorés au dos et sur les bords, avec des pompons faits main.","en":"A wide grey-fabric hooded burnous, adorned with colorful diamond motifs on the back and edges, with handmade tassels along the trims."}',
    '{"ar":"المعيّن رمز للخصوبة والحماية في الزخرفة الأمازيغية.","fr":"Le losange est un symbole de fertilité et de protection dans l''ornement amazigh.","en":"The diamond is a symbol of fertility and protection in Amazigh ornamentation."}',
    '{"ar":"المناسبات والطقس البارد","fr":"Occasions et temps frais","en":"Occasions and cooler weather"}',
    null,
    14000,
    null,
    array['/products/6.webp'],
    true,
    false
  )
on conflict (slug) do nothing;

-- ─── 3) Two heritage reference photos → Archive ────────────────────
insert into public.archive_items (slug, kind, title, description, year, media_url)
values
  (
    'photo-aures-celebration',
    'photo',
    '{"ar":"احتفال تقليدي في الأوراس","fr":"Célébration traditionnelle dans les Aurès","en":"Traditional celebration in the Aurès"}',
    '{"ar":"نساء بالزيّ الشاوي التقليدي يؤدّين رقصة احتفالية بين الجبال، مشهد يجسّد حيوية التراث الأوراسي.","fr":"Des femmes en tenue chaoui traditionnelle exécutent une danse de fête au milieu des montagnes, une scène qui incarne la vitalité du patrimoine des Aurès.","en":"Women in traditional Chaoui dress perform a festive dance amid the mountains, a scene that embodies the vitality of Aurès heritage."}',
    null,
    '/products/11.webp'
  ),
  (
    'photo-aures-women-costume',
    'photo',
    '{"ar":"نساء أوراسيات بالزيّ التقليدي","fr":"Femmes aurassiennes en costume traditionnel","en":"Aurès women in traditional costume"}',
    '{"ar":"صورة توثيقية لامرأة وفتاة بالزيّ الأوراسي الكامل، بالحلي الفضية والعمامة الملوّنة والمنسوجات التقليدية.","fr":"Photographie documentaire d''une femme et d''une fille en costume aurassien complet, avec bijoux d''argent, turban coloré et textiles traditionnels.","en":"A documentary photograph of a woman and a girl in full Aurès costume, with silver jewelry, a colorful turban and traditional textiles."}',
    null,
    '/products/12.webp'
  )
on conflict (slug) do nothing;
