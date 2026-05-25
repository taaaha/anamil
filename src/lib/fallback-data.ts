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
