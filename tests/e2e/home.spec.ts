import { expect, test } from '@playwright/test';

test('doorway fills the opening and hands off to Home content', async ({
  page,
}) => {
  await page.goto('/');

  const portal = page.locator('[data-entry-portal]');
  const header = page.locator('.site-header');
  await expect(portal).toBeVisible();
  await expect(header).toHaveCSS('pointer-events', 'none');

  const viewportHeight = page.viewportSize()?.height ?? 1;
  const portalHeight = await portal.evaluate((element) => element.scrollHeight);
  expect(portalHeight).toBeGreaterThan(viewportHeight * 3);

  await page.locator('#arrival').scrollIntoViewIfNeeded();
  await expect(
    page.getByRole('heading', { name: 'A home begins' }),
  ).toBeVisible();
  await expect(header).toHaveCSS('pointer-events', 'auto');
});

test('Transformation uses heritage imagery without horizontal overflow', async ({
  page,
}) => {
  await page.goto('/');
  await page
    .getByRole('heading', { name: 'See heritage take root.' })
    .scrollIntoViewIfNeeded();

  const afterImage = page.locator(
    'img[src="/images/sirpi-heritage-transformation.webp"]',
  );
  await expect(afterImage).toBeVisible();
  await expect(afterImage).toHaveJSProperty('complete', true);

  const hasOverflow = await page.evaluate(
    () =>
      document.documentElement.scrollWidth >
      document.documentElement.clientWidth,
  );
  expect(hasOverflow).toBe(false);
});

test('reduced motion skips the pinned doorway sequence', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');

  await expect(page.locator('.site-header')).toHaveCSS(
    'pointer-events',
    'auto',
  );
  const portal = page.locator('[data-entry-portal]');
  const viewportHeight = page.viewportSize()?.height ?? 1;
  const portalHeight = await portal.evaluate((element) => element.scrollHeight);
  expect(portalHeight).toBeLessThanOrEqual(viewportHeight + 1);
});
