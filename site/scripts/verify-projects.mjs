import { chromium, expect } from '@playwright/test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';

const origin = process.env.TEST_URL ?? 'http://localhost:3000';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
await fs.mkdir('outputs', { recursive: true });

try {
  for (const { name, viewport, javaScriptEnabled } of [
    {
      name: 'desktop',
      viewport: { width: 1440, height: 1000 },
      javaScriptEnabled: true,
    },
    {
      name: 'mobile',
      viewport: { width: 360, height: 800 },
      javaScriptEnabled: true,
    },
    {
      name: 'no-js',
      viewport: { width: 360, height: 800 },
      javaScriptEnabled: false,
    },
  ]) {
    const page = await browser.newPage({
      viewport,
      javaScriptEnabled,
      reducedMotion: 'reduce',
    });
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(origin);
    const projectsLink = page
      .getByRole('navigation', { name: 'Navegação principal' })
      .getByRole('link', { name: 'Projetos', exact: true });
    await expect(projectsLink).toBeVisible();
    await projectsLink.click();
    await expect(page).toHaveURL(`${origin}/projetos`);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      'Projetos',
    );
    await expect(page).toHaveTitle(/Projetos.*Soelétrico/);
    await expect(
      page.getByRole('link', { name: 'Projetos', exact: true }),
    ).toHaveAttribute('aria-current', 'page');

    for (const [id, title] of [
      ['casas', 'Casas'],
      ['obras-comerciais', 'Obras comerciais'],
      ['galpoes', 'Galpões'],
    ]) {
      await page
        .getByRole('navigation', { name: 'Tipos de projeto' })
        .getByRole('link', { name: title, exact: true })
        .click();
      const section = page.locator(`#${id}`);
      await expect(
        section.getByRole('heading', { name: title, exact: true }),
      ).toBeVisible();
      await expect(section).toBeInViewport();
      await expect(section.locator('figcaption')).toContainText(
        'Imagem ilustrativa',
      );
      await expect
        .poll(() =>
          section
            .locator('img')
            .evaluate((img) => img.complete && img.naturalWidth > 0),
        )
        .toBe(true);
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
        false,
      );
    }

    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await page.screenshot({
      path: `outputs/projects-${name}-top.png`,
      fullPage: true,
    });

    await page
      .getByRole('link', { name: 'Voltar à página inicial', exact: true })
      .click();
    await expect(page).toHaveURL(`${origin}/`);
    for (const id of ['casas', 'obras-comerciais', 'galpoes']) {
      await page.locator(`.service-list a[href="/projetos#${id}"]`).click();
      await expect(page).toHaveURL(`${origin}/projetos#${id}`);
      await expect(page.locator(`#${id}`)).toBeInViewport();
      await page.goBack();
    }
    await page
      .getByRole('link', { name: 'Conheça nossos projetos', exact: true })
      .click();
    await expect(page).toHaveURL(`${origin}/projetos`);
    assert.deepEqual(errors, [], 'No browser runtime errors');
    await page.close();
    console.log(
      `${name}: project navigation, categories, photos, return links and layout passed`,
    );
  }
} finally {
  await browser.close();
}
