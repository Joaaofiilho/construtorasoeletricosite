import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const origin = process.env.TEST_URL ?? 'http://localhost:3000';
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
await fs.mkdir('outputs', { recursive: true });
const results = [];
async function scroll(page, fraction) {
  await page.evaluate((f) => {
    const shell = document.getElementById('page-scroll');
    if (innerWidth <= 800)
      shell.scrollTo({
        top: (shell.scrollHeight - shell.clientHeight) * f,
        behavior: 'instant',
      });
    else
      window.scrollTo({
        top: (document.documentElement.scrollHeight - innerHeight) * f,
        behavior: 'instant',
      });
  }, fraction);
  await page.waitForTimeout(650);
}
async function checkLayout(page) {
  const layout = await page.evaluate(() => {
    const shell = document.getElementById('page-scroll');
    const rail = document.querySelector('.build-rail').getBoundingClientRect();
    const rect = shell.getBoundingClientRect();
    return {
      width: innerWidth,
      docOverflow: document.documentElement.scrollWidth > innerWidth + 1,
      shellOverflow: shell.scrollWidth > shell.clientWidth + 1,
      overlap:
        innerWidth <= 800
          ? rect.bottom > rail.top + 1
          : rect.right > rail.left + 1,
    };
  });
  const railBottom = await page
    .locator('.rail-copy')
    .evaluate((el) => el.getBoundingClientRect().bottom);
  assert.ok(
    railBottom <= page.viewportSize().height,
    'Rail status must fit viewport height',
  );
  assert.equal(layout.docOverflow, false, `Document overflow ${layout.width}`);
  assert.equal(layout.shellOverflow, false, `Content overflow ${layout.width}`);
  assert.equal(
    layout.overlap,
    false,
    `House rail covers content ${layout.width}`,
  );
}
try {
  for (const { name, viewport } of [
    { name: 'desktop', viewport: { width: 1440, height: 1000 } },
    { name: 'mobile', viewport: { width: 360, height: 800 } },
    { name: 'tablet', viewport: { width: 900, height: 1000 } },
    { name: 'landscape', viewport: { width: 844, height: 390 } },
  ]) {
    const page = await browser.newPage({ viewport });
    const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await page.goto(origin, { waitUntil: 'networkidle' });
    await page.waitForSelector('[data-mode=live]');
    await checkLayout(page);
    assert.equal(await page.locator('h1').count(), 1);
    assert.equal(
      await page.locator('.house-progress').getAttribute('aria-valuenow'),
      '0',
    );
    await page.screenshot({ path: `outputs/${name}-top.png` });
    for (const f of [0.2, 0.42, 0.65, 1]) {
      await scroll(page, f);
      await checkLayout(page);
    }
    assert.equal(
      await page.locator('.house-progress').getAttribute('aria-valuenow'),
      '100',
    );
    await page.screenshot({ path: `outputs/${name}-end.png` });
    const images = await page
      .locator('main img')
      .evaluateAll((imgs) =>
        imgs.every((img) => img.complete && img.naturalWidth > 0),
      );
    assert.equal(images, true, 'All photos load');
    const links = await page
      .locator('a[href*="wa.me"]')
      .evaluateAll((els) => els.map((el) => el.href));
    assert.ok(links.length >= 3);
    assert.ok(
      links.every((link) => new URL(link).pathname === '/5585999350248'),
    );
    assert.equal(
      await page.locator('a[href="mailto:soeletrico@gmail.com"]').count(),
      1,
    );
    await scroll(page, 0);
    assert.equal(
      await page.locator('.house-progress').getAttribute('aria-valuenow'),
      '0',
    );
    await page.goto(`${origin}/#projeto`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1100);
    const pos = await page.locator('#projeto').boundingBox();
    assert.ok(pos.y >= -1 && pos.y < 100, 'Project anchor scrolls correctly');
    await page.screenshot({ path: `outputs/${name}-project.png` });
    assert.deepEqual(errors, [], 'No uncaught browser errors');
    results.push(
      `${name}: scroll phases/reverse, native anchor, geometry, images and contacts passed`,
    );
    await page.close();
  }
  for (const { name, options } of [
    { name: 'reduced', options: { reducedMotion: 'reduce' } },
    { name: 'no-js', options: { javaScriptEnabled: false } },
    { name: 'no-webgl', options: {} },
  ]) {
    const page = await browser.newPage({
      viewport: { width: 360, height: 800 },
      ...options,
    });
    if (name === 'no-webgl')
      await page.addInitScript(() => {
        // oxlint-disable-next-line typescript/unbound-method -- Retain native method to call with each canvas receiver.
        const original = HTMLCanvasElement.prototype.getContext;
        HTMLCanvasElement.prototype.getContext = function (kind, ...args) {
          return kind.startsWith('webgl')
            ? null
            : original.call(this, kind, ...args);
        };
      });
    await page.goto(origin, { waitUntil: 'networkidle' });
    assert.equal(
      await page.locator('.build-rail').getAttribute('data-mode'),
      'static',
    );
    assert.equal(await page.locator('.house-fallback').isVisible(), true);
    const loaded = await page
      .locator('.house-fallback')
      .evaluate((img) => img.complete && img.naturalWidth > 0);
    assert.ok(loaded, 'Fallback image loads');
    if (name !== 'no-webgl')
      assert.equal(await page.locator('.reveal-pending').count(), 0);
    await checkLayout(page);
    await page.goto(`${origin}/#projeto`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1200);
    assert.ok(
      await page
        .locator('#project-title')
        .evaluate((el) => getComputedStyle(el).opacity === '1'),
      'Project heading is revealed',
    );
    await page.screenshot({ path: `outputs/${name}.png` });
    results.push(
      `${name}: visible content, static house, native anchor and reserved space passed`,
    );
    await page.close();
  }
  const toggle = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
  });
  await toggle.goto(origin, { waitUntil: 'networkidle' });
  await toggle.waitForSelector('[data-mode=live]');
  await toggle.goto(`${origin}/#projeto`, { waitUntil: 'networkidle' });
  await toggle.waitForTimeout(1100);
  await toggle.setViewportSize({ width: 360, height: 800 });
  await toggle.waitForTimeout(500);
  const portraitProject = await toggle.locator('#projeto').boundingBox();
  assert.ok(
    portraitProject.y < 200 && portraitProject.y > -300,
    'Rotation must preserve the current project section',
  );
  await toggle.setViewportSize({ width: 844, height: 390 });
  await toggle.waitForTimeout(500);
  const landscapeProject = await toggle.locator('#projeto').boundingBox();
  assert.ok(
    landscapeProject.y < 150 && landscapeProject.y > -300,
    'Reverse rotation must preserve the project section',
  );
  await toggle.setViewportSize({ width: 1440, height: 1000 });
  await toggle.emulateMedia({ reducedMotion: 'reduce' });
  await toggle.waitForSelector('[data-mode=static]');
  assert.equal(await toggle.locator('canvas').count(), 0);
  await toggle.emulateMedia({ reducedMotion: 'no-preference' });
  await toggle.waitForSelector('[data-mode=live]');
  await toggle
    .locator('canvas')
    .evaluate((canvas) =>
      canvas
        .getContext('webgl2')
        .getExtension('WEBGL_lose_context')
        .loseContext(),
    );
  await toggle.waitForSelector('[data-mode=static]');
  assert.equal(await toggle.locator('.house-fallback').isVisible(), true);
  results.push(
    'Live motion preference changes and WebGL context loss recover to static house',
  );
  await toggle.close();
  console.log(results.join('\n'));
  await fs.writeFile(
    'outputs/verification.json',
    JSON.stringify(
      { date: new Date().toISOString(), origin, results },
      null,
      2,
    ),
  );
} finally {
  await browser.close();
}
