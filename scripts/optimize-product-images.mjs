// One-off: resize + compress the client's product photos to web-friendly WebP.
// Usage: node scripts/optimize-product-images.mjs <srcDir> <outDir>
import sharp from "sharp";
import { readdir, mkdir } from "node:fs/promises";
import path from "node:path";

const srcDir = process.argv[2];
const outDir = process.argv[3];
const MAX_W = 1400; // plenty for a product hero; collages stay legible
const QUALITY = 80;

await mkdir(outDir, { recursive: true });
const files = (await readdir(srcDir)).filter((f) => /\.(png|jpe?g|webp)$/i.test(f));

for (const file of files) {
  const base = path.parse(file).name;
  const out = path.join(outDir, `${base}.webp`);
  const info = await sharp(path.join(srcDir, file))
    .resize({ width: MAX_W, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(out);
  console.log(`${file} -> ${base}.webp  ${(info.size / 1024).toFixed(0)} KB  ${info.width}x${info.height}`);
}
console.log(`Done: ${files.length} images -> ${outDir}`);
