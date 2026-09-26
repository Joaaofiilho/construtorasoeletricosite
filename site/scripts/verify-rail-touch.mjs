import { chromium, expect } from '@playwright/test';

const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  for (const options of [
    { reducedMotion: 'no-preference' },
    { reducedMotion: 'reduce' },
    { javaScriptEnabled: false },
  ]) {
    const page = await browser.newPage({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
      ...options,
    });
    await page.goto(process.env.TEST_URL ?? 'http://localhost:3000');
    const session = await page.context().newCDPSession(page);
    const scroller = page.locator('#page-scroll');
    const rail = await page.locator('.build-rail').boundingBox();
    async function swipe(x, direction) {
      const y = rail.y + (direction < 0 ? rail.height * 0.8 : 10);
      await session.send('Input.dispatchTouchEvent', {
        type: 'touchStart',
        touchPoints: [{ x, y }],
      });
      for (let i = 1; i <= 8; i++) {
        await session.send('Input.dispatchTouchEvent', {
          type: 'touchMove',
          touchPoints: [{ x, y: y + direction * i * 10 }],
        });
        await page.waitForTimeout(25);
      }
      await session.send('Input.dispatchTouchEvent', {
        type: 'touchEnd',
        touchPoints: [],
      });
    }
    // Exercise both the house and the text portions of the banner.
    for (const x of [70, 270]) {
      await scroller.evaluate((el) =>
        el.scrollTo({ top: 0, behavior: 'instant' }),
      );
      await swipe(x, -1);
      await expect
        .poll(() => scroller.evaluate((el) => el.scrollTop))
        .toBeGreaterThan(30);
      await page.waitForTimeout(500);
      const before = await scroller.evaluate((el) => el.scrollTop);
      await swipe(x, 1);
      await expect
        .poll(() => scroller.evaluate((el) => el.scrollTop))
        .toBeLessThan(before);
    }
    // Let the native swipe momentum finish before checking the page end.
    await page.waitForTimeout(1000);
    await scroller.evaluate((el) =>
      el.scrollTo({ top: el.scrollHeight, behavior: 'instant' }),
    );
    const footer = await page.locator('.footer').boundingBox();
    if (footer.y + footer.height > rail.y + 1)
      throw new Error('Banner obscures the footer at the end of the page');
    await page.close();
    console.log(
      `Banner touch scrolling in both directions and footer clearance passed: ${JSON.stringify(options)}`,
    );
  }
} finally {
  await browser.close();
}
