// Fallback dataset used until Supabase is configured. Mirrors the seed in supabase/schema.sql
// so the site looks alive on first launch and during local dev without env vars.

import type { Product, ArchiveItem, Artisan, BlogPost } from "./supabase/types";
import { productImages, archiveImages } from "./images";

const now = new Date().toISOString();

export const fallbackProducts: Product[] = [
  {
    id: "fb-1",
    slug: "melhfa-aurassienne",
    category: "heritage",
    title: {
      ar: "الملحفة الأوراسية الأصيلة",
      fr: "Melhfa aurassienne authentique",
      en: "Authentic Aurès Melhfa",
    },
    short_description: {
      ar: "ملحفة منسوجة يدويًا بألوان الأوراس التقليدية",
      fr: "Melhfa tissée à la main aux couleurs traditionnelles des Aurès",
      en: "Hand-woven melhfa in traditional Aurès colors",
    },
    story: {
      ar: "تُنسج الملحفة على نول تقليدي خلال عدة أسابيع، باستخدام صباغة طبيعية مستخرجة من نباتات المنطقة.",
      fr: "La melhfa est tissée sur un métier traditionnel pendant plusieurs semaines, avec des teintures naturelles extraites des plantes de la région.",
      en: "The melhfa is woven on a traditional loom over several weeks, with natural dyes from regional plants.",
    },
    symbolism: {
      ar: "الأحمر يرمز للحياة والخصوبة، والأسود للأرض والثبات.",
      fr: "Le rouge symbolise la vie et la fertilité, le noir la terre et la stabilité.",
      en: "Red symbolizes life and fertility, black the earth and stability.",
    },
    occasion: {
      ar: "الأعراس والمناسبات الكبرى",
      fr: "Mariages et grandes occasions",
      en: "Weddings and major celebrations",
    },
    artisan_name: "فاطمة الزهراء",
    price_dzd: 18500,
    sizes: ["S", "M", "L", "XL"],
    images: [productImages.kaftan_styled, productImages.embroidered_garment, productImages.textile_stack],
    in_stock: true,
    featured: true,
    created_at: now,
  },
  {
    id: "fb-2",
    slug: "qachabia-moderne",
    category: "modern",
    title: {
      ar: "قشابية عصرية مستوحاة",
      fr: "Qachabia contemporaine",
      en: "Contemporary Qachabia",
    },
    short_description: {
      ar: "إعادة تأويل عصرية للقشابية التقليدية بقماش خفيف",
      fr: "Réinterprétation moderne de la qachabia avec un tissu léger",
      en: "Modern reinterpretation in lightweight fabric",
    },
    story: {
      ar: "يعيد هذا التصميم اكتشاف القشابية بقصّة معاصرة، مع الحفاظ على التفاصيل الزخرفية الأصلية.",
      fr: "Ce design redécouvre la qachabia avec une coupe contemporaine, tout en préservant les détails ornementaux originaux.",
      en: "This design reimagines the qachabia with a contemporary cut while preserving the original ornamental details.",
    },
    symbolism: {
      ar: "الزخارف الهندسية تستلهم من الفن الشاوي",
      fr: "Les motifs géométriques s'inspirent de l'art chaoui",
      en: "Geometric motifs draw from Chaoui art",
    },
    occasion: {
      ar: "الاستعمال اليومي والمناسبات شبه الرسمية",
      fr: "Usage quotidien et occasions semi-formelles",
      en: "Daily wear and semi-formal occasions",
    },
    artisan_name: "خديجة بن صالح",
    price_dzd: 9800,
    sizes: ["S", "M", "L"],
    images: [productImages.kaftan_detail, productImages.embroidery_linen, productImages.embroidery_threadwork],
    in_stock: true,
    featured: true,
    created_at: now,
  },
  {
    id: "fb-3",
    slug: "khit-rrouh-pendant",
    category: "accessories",
    title: {
      ar: "قلادة خيط الروح",
      fr: "Pendentif Khit Rrouh",
      en: "Khit Rrouh pendant",
    },
    short_description: {
      ar: "قلادة فضية مستوحاة من الحلي الأمازيغية",
      fr: "Pendentif en argent inspiré des bijoux amazighs",
      en: "Silver pendant inspired by Amazigh jewelry",
    },
    story: {
      ar: "تُنحت بالطرق التقليدي وتُزيّن بنقوش رمزية تحمي صاحبتها.",
      fr: "Forgé à la main avec des motifs symboliques protecteurs.",
      en: "Hand-forged with symbolic protective motifs.",
    },
    symbolism: {
      ar: "الرموز الهندسية رموز حماية وحياة",
      fr: "Les symboles géométriques évoquent protection et vie",
      en: "The geometric symbols evoke protection and life",
    },
    occasion: {
      ar: "هدية رمزية، مناسبات الزواج والاحتفال",
      fr: "Cadeau symbolique, mariages et célébrations",
      en: "A symbolic gift, weddings and celebrations",
    },
    artisan_name: "يمينة العوراسي",
    price_dzd: 4200,
    sizes: null,
    images: [productImages.silver_pendant_malachite, productImages.silver_necklace],
    in_stock: true,
    featured: false,
    created_at: now,
  },
  {
    id: "fb-4",
    slug: "khimar-chaoui-embroidered",
    category: "accessories",
    title: {
      ar: "خمار شاوي مطرز",
      fr: "Khimar chaoui brodé",
      en: "Embroidered Chaoui Khimar",
    },
    short_description: {
      ar: "خمار شاوي تقليدي مطرز بخيوط ملونة على قماش فاخر، يجمع بين الأناقة والتراث الأصيل.",
      fr: "Khimar chaoui traditionnel brodé de fils colorés sur un tissu raffiné, alliant élégance et patrimoine authentique.",
      en: "Traditional Chaoui khimar embroidered with colored threads on premium fabric, blending elegance with authentic heritage.",
    },
    story: {
      ar: "تصميم خفيف ومريح يناسب الاستخدام اليومي والمناسبات. قماش فاخر مطرز يدويًا بخيوط ملونة عالية الجودة، بأبعاد 100 × 100 سم تقريبًا. يُغسل يدويًا بالماء البارد.",
      fr: "Un design léger et confortable adapté à l'usage quotidien comme aux grandes occasions. Tissu raffiné brodé à la main de fils colorés de haute qualité, dimensions d'environ 100 × 100 cm. Lavage à la main à l'eau froide.",
      en: "A light, comfortable design suited to both daily wear and special occasions. Premium fabric hand-embroidered with high-quality colored threads, about 100 × 100 cm. Hand-wash in cold water.",
    },
    symbolism: {
      ar: "تطريز شاوي أصيل بخيوط زاهية يعكس التراث الأوراسي.",
      fr: "Une broderie chaoui authentique aux fils éclatants qui reflète le patrimoine des Aurès.",
      en: "Authentic Chaoui embroidery in vivid threads that reflects the heritage of the Aurès.",
    },
    occasion: {
      ar: "الاستخدام اليومي والمناسبات",
      fr: "Usage quotidien et occasions",
      en: "Daily wear and occasions",
    },
    artisan_name: null,
    price_dzd: 2500,
    sizes: null,
    images: [productImages.embroidery_linen, productImages.embroidery_threadwork, productImages.textile_stack],
    in_stock: true,
    featured: true,
    created_at: now,
  },
  {
    id: "fb-5",
    slug: "hzam-chaoui-multifil",
    category: "accessories",
    title: {
      ar: "حزام شاوي متعدد الخيوط",
      fr: "Ceinture chaoui multi-fils",
      en: "Multi-thread Chaoui Belt",
    },
    short_description: {
      ar: "حزام تقليدي شاوي مصنوع يدويًا من خيوط ملونة متداخلة، يزيّن الملابس التقليدية النسائية ويضيف لمسة جمالية تراثية أصيلة.",
      fr: "Ceinture chaoui traditionnelle faite main à partir de fils colorés entrelacés, qui orne les tenues féminines traditionnelles et ajoute une touche esthétique patrimoniale authentique.",
      en: "Traditional Chaoui belt handmade from interwoven colored threads, adorning traditional women's attire with an authentic heritage touch.",
    },
    story: {
      ar: "مشغول يدويًا بإتقان من خيوط قطنية متعددة الألوان، بطول 150 سم قابل للتعديل ليلائم جميع المقاسات. يُغسل يدويًا بماء بارد.",
      fr: "Confectionnée à la main avec soin à partir de fils de coton multicolores, longueur 150 cm ajustable pour convenir à toutes les tailles. Lavage à la main à l'eau froide.",
      en: "Carefully handmade from multicolored cotton threads, 150 cm adjustable length to fit all sizes. Hand-wash in cold water.",
    },
    symbolism: {
      ar: "مزيج متناغم من الألوان التقليدية المستوحاة من التراث الشاوي.",
      fr: "Un mélange harmonieux de couleurs traditionnelles inspirées du patrimoine chaoui.",
      en: "A harmonious blend of traditional colors inspired by Chaoui heritage.",
    },
    occasion: {
      ar: "يكمّل الزيّ التقليدي في المناسبات",
      fr: "Complète la tenue traditionnelle lors des occasions",
      en: "Completes traditional attire for occasions",
    },
    artisan_name: null,
    price_dzd: 2800,
    sizes: null,
    images: [productImages.embroidery_threadwork, productImages.textile_stack, productImages.embroidery_linen],
    in_stock: true,
    featured: true,
    created_at: now,
  },
  {
    id: "fb-6",
    slug: "libas-chaoui-complet",
    category: "heritage",
    title: {
      ar: "لباس تقليدي شاوي كامل",
      fr: "Tenue chaoui traditionnelle complète",
      en: "Complete Traditional Chaoui Outfit",
    },
    short_description: {
      ar: "زيّ تقليدي شاوي أصيل يعكس جمال التراث الجزائري وخصوصية الثقافة الشاوية، يجمع بين الألوان الزاهية والتطريز اليدوي الفاخر والإكسسوارات التقليدية.",
      fr: "Tenue chaoui traditionnelle authentique reflétant la beauté du patrimoine algérien et la singularité de la culture chaoui, alliant couleurs vives, broderie main raffinée et accessoires traditionnels.",
      en: "Authentic traditional Chaoui outfit reflecting the beauty of Algerian heritage and the distinctiveness of Chaoui culture, combining vivid colors, fine hand embroidery and traditional accessories.",
    },
    story: {
      ar: "تصميم متكامل يجمع بين الصدرة والتطريز التقليدي، والحزام المزخرف، والأكمام الواسعة المطرزة بحواف ملونة، لتنسيق مثالي بين القطع المختلفة في جميع المناسبات. يُغسل يدويًا بالماء البارد.",
      fr: "Un ensemble complet réunissant le plastron et la broderie traditionnelle, la ceinture ornée et les manches amples brodées aux bords colorés, pour une harmonie parfaite en toutes occasions. Lavage à la main à l'eau froide.",
      en: "A complete ensemble bringing together the embroidered bodice, the ornate belt, and wide sleeves with colored trims, for perfect harmony across all occasions. Hand-wash in cold water.",
    },
    symbolism: {
      ar: "تطريز يدوي فاخر مع إكسسوارات من الفضة التقليدية يعكس أصالة الزيّ الشاوي.",
      fr: "Broderie main raffinée et accessoires en argent traditionnel reflétant l'authenticité de la tenue chaoui.",
      en: "Fine hand embroidery with traditional silver accessories reflecting the authenticity of Chaoui dress.",
    },
    occasion: {
      ar: "الأعراس والمناسبات الكبرى",
      fr: "Mariages et grandes occasions",
      en: "Weddings and major celebrations",
    },
    artisan_name: null,
    price_dzd: 18500,
    sizes: ["S", "M", "L", "XL"],
    images: [productImages.kaftan_styled, productImages.embroidered_garment, productImages.kaftan_detail],
    in_stock: true,
    featured: true,
    created_at: now,
  },
];

export const fallbackArchive: ArchiveItem[] = [
  {
    id: "fa-1",
    slug: "timeline-1900-melhfa",
    kind: "timeline",
    title: {
      ar: "الملحفة في بدايات القرن العشرين",
      fr: "La melhfa au début du XXe siècle",
      en: "The melhfa in the early 20th century",
    },
    description: {
      ar: "كانت الملحفة قطعة محورية في الزيّ النسائي، تُنسج محليًا وتعكس الانتماء القبلي.",
      fr: "La melhfa était une pièce centrale du costume féminin, tissée localement et reflétant l'appartenance tribale.",
      en: "The melhfa was a central piece of women's dress, locally woven and reflecting tribal belonging.",
    },
    year: 1900,
    media_url: archiveImages.woman_hillside,
    created_at: now,
  },
  {
    id: "fa-2",
    slug: "symbol-color-red",
    kind: "symbol",
    title: {
      ar: "رمزية اللون الأحمر",
      fr: "Symbolique du rouge",
      en: "Symbolism of red",
    },
    description: {
      ar: "الأحمر في اللباس الأوراسي يرمز للحياة، الخصوبة، والحماية من العين.",
      fr: "Le rouge dans le costume aurassien symbolise la vie, la fertilité et la protection contre le mauvais œil.",
      en: "Red in the Aurès costume symbolizes life, fertility, and protection from the evil eye.",
    },
    year: null,
    media_url: archiveImages.village_textiles,
    created_at: now,
  },
  {
    id: "fa-3",
    slug: "interview-fatima-zahra",
    kind: "interview",
    title: {
      ar: "مقابلة: فاطمة الزهراء — حرفية النسيج",
      fr: "Entretien : Fatima Zahra, artisane tisseuse",
      en: "Interview: Fatima Zahra, weaver",
    },
    description: {
      ar: "تروي فاطمة الزهراء كيف تعلمت النسيج من جدّتها، وكيف تنقل المعرفة اليوم لبناتها.",
      fr: "Fatima Zahra raconte comment elle a appris le tissage de sa grand-mère, et comment elle transmet aujourd'hui ce savoir à ses filles.",
      en: "Fatima Zahra recounts learning weaving from her grandmother and passing the knowledge on to her daughters.",
    },
    year: null,
    media_url: archiveImages.woman_desert,
    created_at: now,
  },
];

export const fallbackArtisans: Artisan[] = [
  {
    id: "art-1",
    name: "فاطمة الزهراء",
    bio: {
      ar: "حرفية نسيج بخبرة 25 سنة، متخصصة في الملحفة الأوراسية التقليدية.",
      fr: "Tisseuse de 25 ans d'expérience, spécialisée dans la melhfa aurassienne.",
      en: "Weaver with 25 years experience, specialized in the Aurès melhfa.",
    },
    village: "مشونش",
    years_experience: 25,
    photo_url: null,
    created_at: now,
  },
  {
    id: "art-2",
    name: "خديجة بن صالح",
    bio: {
      ar: "حرفية تطريز ومصممة، تجمع بين الأصالة والتصميم المعاصر.",
      fr: "Brodeuse et designer, combinant authenticité et design contemporain.",
      en: "Embroiderer and designer combining authenticity with contemporary design.",
    },
    village: "مشونش",
    years_experience: 18,
    photo_url: null,
    created_at: now,
  },
];

export const fallbackPosts: BlogPost[] = [
  {
    id: "p-ar",
    slug: "introducing-anamil",
    locale: "ar",
    title: "مرحبًا بكم في أنامل الأوراس والزيبان",
    excerpt: "لماذا أنشأنا هذه المنصة، وما الذي يميزها عن متجر تقليدي.",
    body: "هذا المشروع ليس متجرًا فقط. هو محاولة لإنقاذ تراثٍ يتلاشى، وتمكين نساء يصنعنه بأيديهن.\n\nنبدأ ببسكرة، بمنطقة مشونش، ثم نتوسع.",
    cover_image: null,
    reading_minutes: 4,
    published_at: now,
    created_at: now,
  },
  {
    id: "p-fr",
    slug: "introducing-anamil",
    locale: "fr",
    title: "Bienvenue chez Anamil El Aouras Wa El Zibane",
    excerpt:
      "Pourquoi nous avons créé cette plateforme, et ce qui la distingue d'une boutique classique.",
    body: "Ce projet n'est pas qu'une boutique. C'est une tentative de sauver un patrimoine qui s'efface et d'émanciper des femmes qui le créent de leurs mains.\n\nNous commençons à Biskra, dans la région de Mchounèche, puis nous élargirons.",
    cover_image: null,
    reading_minutes: 4,
    published_at: now,
    created_at: now,
  },
  {
    id: "p-en",
    slug: "introducing-anamil",
    locale: "en",
    title: "Welcome to Anamil El Aouras Wa El Zibane",
    excerpt:
      "Why we built this platform and what sets it apart from a regular store.",
    body: "This project is not just a store. It is an attempt to save a fading heritage and empower the women who make it with their hands.\n\nWe begin in Biskra, in the Mchounèche region, and will expand from there.",
    cover_image: null,
    reading_minutes: 4,
    published_at: now,
    created_at: now,
  },
];
