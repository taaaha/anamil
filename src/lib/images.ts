// Curated, verified Unsplash photos. All URLs return HTTP 200.
// Append width/crop params at call sites: `${url}?w=1600&auto=format&fit=crop&q=80`

export const heroImages = {
  primary: "https://images.unsplash.com/photo-1699817702889-01bc4c1a45d9", // wooden weaving loom
  portrait: "https://images.unsplash.com/photo-1760541168403-5b0e28eadb4b", // traditional dress portrait
};

export const archiveImages = {
  woman_hillside: "https://images.unsplash.com/photo-1750981078726-f151600e663b",
  woman_desert: "https://images.unsplash.com/photo-1685367136664-2c991e9fcb63",
  village_textiles: "https://images.unsplash.com/photo-1760727751677-34fbd56ba9e6",
  canyon: "https://images.unsplash.com/photo-1704990095563-b4308ef8714a",
  desert_rock: "https://images.unsplash.com/photo-1687893721485-7cb3f9a83d87",
};

export const productImages = {
  kaftan_detail: "https://images.unsplash.com/photo-1672837350483-1131c1c31422",
  kaftan_styled: "https://images.unsplash.com/photo-1768913652736-40fd397ec20d",
  embroidered_garment: "https://images.unsplash.com/photo-1775836069889-7acb6490c6de",
  silver_pendant_malachite: "https://images.unsplash.com/photo-1771246148027-5f57a3ae6511",
  silver_necklace: "https://images.unsplash.com/photo-1777732784920-ef354c5d22b1",
  embroidery_threadwork: "https://images.unsplash.com/photo-1680034976848-d9fe95466aba",
  embroidery_linen: "https://images.unsplash.com/photo-1771409046903-1ffb0f45cda9",
  textile_stack: "https://images.unsplash.com/photo-1569909115134-a0426936c879",
};

export function unsplash(url: string, w = 1200, h?: number) {
  const params = [`w=${w}`, "auto=format", "fit=crop", "q=80"];
  if (h) params.push(`h=${h}`);
  return `${url}?${params.join("&")}`;
}
