-- Anamil — add 3 new products (Chaoui collection)
-- Run ONCE in Supabase → SQL Editor → New query → paste → Run.
-- Safe to re-run: existing slugs are skipped (on conflict do nothing).
--
-- Images currently use the site's existing stock photos as placeholders.
-- To swap in the real product photos: Admin → Products → Edit → paste the
-- real image URLs (one per line), or replace the array[...] values below.

insert into public.products
  (slug, category, title, short_description, story, symbolism, occasion, artisan_name, price_dzd, sizes, images, in_stock, featured)
values
  -- 1) خمار شاوي مطرز — 2 500 دج
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
    array[
      'https://images.unsplash.com/photo-1771409046903-1ffb0f45cda9',
      'https://images.unsplash.com/photo-1680034976848-d9fe95466aba',
      'https://images.unsplash.com/photo-1569909115134-a0426936c879'
    ],
    true,
    true
  ),
  -- 2) حزام شاوي متعدد الخيوط — 2 800 دج
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
    array[
      'https://images.unsplash.com/photo-1680034976848-d9fe95466aba',
      'https://images.unsplash.com/photo-1569909115134-a0426936c879',
      'https://images.unsplash.com/photo-1771409046903-1ffb0f45cda9'
    ],
    true,
    true
  ),
  -- 3) لباس تقليدي شاوي كامل — 18 500 دج
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
    array[
      'https://images.unsplash.com/photo-1768913652736-40fd397ec20d',
      'https://images.unsplash.com/photo-1775836069889-7acb6490c6de',
      'https://images.unsplash.com/photo-1672837350483-1131c1c31422'
    ],
    true,
    true
  )
on conflict (slug) do nothing;
