import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';
const source = 'assets/ouro-verde';
const sources = JSON.parse(await fs.readFile(`${source}/sources.json`, 'utf8'));
// Omit promotional artwork and travel/guest photos from the architecture gallery.
const selected = sources.filter(
  (_, i) => i < 39 || [40, 42, 43, 44].includes(i),
);
const output = 'public/images/ouro-verde';
await fs.mkdir(output, { recursive: true });
const photos = [];
for (const photo of selected) {
  const file = `${source}/${photo.name}${path.extname(new URL(photo.source).pathname)}`;
  const sizes = [];
  for (const width of [768, 1536, 2560]) {
    const info = await sharp(file)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(`${output}/${photo.name}-${width}.webp`);
    if (!sizes.some((size) => size.width === info.width))
      sizes.push({ width: info.width, file: `${photo.name}-${width}.webp` });
  }
  const { width, height } = await sharp(
    `${output}/${photo.name}-1536.webp`,
  ).metadata();
  photos.push({
    name: photo.name,
    src: `/images/ouro-verde/${photo.name}-1536.webp`,
    srcSet: sizes
      .map((s) => `/images/ouro-verde/${s.file} ${s.width}w`)
      .join(', '),
    alt: `${photo.label} — Casa de Alto Padrão no Ouro Verde`,
    caption: photo.label,
    width,
    height,
  });
}
await fs.writeFile(
  'lib/ouro-verde-photos.json',
  JSON.stringify(photos, null, 2) + '\n',
);
console.log(`Prepared ${photos.length} architecture photographs.`);
