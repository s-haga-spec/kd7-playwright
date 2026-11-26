import { test, expect } from '@playwright/test';
import { login } from './helpers/login';
import { saveEvidence } from './helpers/evidence';

test('指導コックピット表示確認', async ({ page }) => {

  await login(page);

  await page.keyboard.press('Escape');

  await expect(
    page.getByRole('link', {
      name: /^全て/,
    })
  ).toBeVisible();

  // ホーム全体
  await saveEvidence(
    page,
    '00_home'
  );
});

test('指導コックピットタブ切替確認', async ({ page }) => {

  await login(page);

  const allTab = page.getByRole('link', {
    name: /^全て/,
  });

  const deptTab = page.getByRole('link', {
    name: /^部門 \d+/,
  });

  const classTab = page.getByRole('link', {
    name: /^クラス運用/,
  });

  const approvalTab = page.getByRole('link', {
    name: /^承認 \d+/,
  });

  // 全て
  await saveEvidence(
    page,
    '01_cockpit_all',
    true
  );

  // 部門
  await deptTab.click();

  await expect(deptTab)
    .toHaveClass(/active/);

  await page.waitForTimeout(1000);

  await saveEvidence(
    page,
    '02_cockpit_department',
    true
  );

  // クラス運用
  await classTab.click();

  await expect(classTab)
    .toHaveClass(/active/);

  await page.waitForTimeout(1000);

  await saveEvidence(
    page,
    '03_cockpit_class',
    true
  );

  // 承認
  await approvalTab.click();

  await expect(approvalTab)
    .toHaveClass(/active/);

  await page.waitForTimeout(1000);

  await saveEvidence(
    page,
    '04_cockpit_approval',
    true
  );

  // 全てに戻る
  await allTab.click();

  await expect(allTab)
    .toHaveClass(/active/);

  await page.waitForTimeout(1000);

  await saveEvidence(
    page,
    '05_cockpit_all_return',
    true
  );
});