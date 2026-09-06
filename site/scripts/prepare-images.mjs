import sharp from 'sharp';
import fs from 'node:fs/promises';
const source = process.argv[2] ?? 'assets/originals';
const photos = [
  ['hero', 'hero-house-pool-max-8134745.jpg'],
  ['detail', 'interior-pool-max-8134753.jpg'],
  ['project', 'tropical-villa-vero-28915352.jpg'],
];
await fs.mkdir('public/images', { recursive: true });
for (const [name, file] of photos) {
  for (const width of [768, 1536, 2560]) {
    await sharp(`${source}/${file}`)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(`public/images/${name}-${width}.webp`);
  }
}
console.log('Prepared 9 responsive WebP images.');
