import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';
const browser = await chromium.launch({
  channel: 'chrome',
  headless: true,
  args: [
    '--enable-webgl',
    '--use-gl=angle',
    '--use-angle=swiftshader',
    '--enable-unsafe-swiftshader',
  ],
});
const page = await browser.newPage({
  viewport: { width: 1440, height: 1000 },
  deviceScaleFactor: 1,
});
page.on('pageerror', (e) => console.log('PAGE ERROR:', e.message));
await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
await page.waitForSelector('[data-mode="live"]', { timeout: 30000 });
await fs.mkdir('outputs', { recursive: true });
await page.screenshot({ path: 'outputs/desktop-top.png' });
await page.evaluate(() =>
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' }),
);
await page.waitForTimeout(600);
await page.screenshot({ path: 'outputs/desktop-end.png' });
await page.locator('.house-visual').evaluate((el) => {
  el.style.width = '400px';
  el.style.height = '350px';
});
await page.waitForTimeout(300);
const data = await page
  .locator('.house-mount canvas')
  .evaluate((canvas) => canvas.toDataURL('image/png'));
await fs.writeFile(
  'public/images/house-complete.png',
  Buffer.from(data.split(',')[1], 'base64'),
);
console.log('Rendered actual 3D model fallback and captured desktop states.');
console.log(await page.locator('.build-rail').innerText());
await page.close();
await browser.close();
